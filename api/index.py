from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import os
import uuid
import logging
from datetime import datetime, timezone

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lazy MongoDB connection
_db = None

def get_db():
    global _db
    if _db is None:
        mongo_url = os.environ.get('MONGO_URL', '')
        if mongo_url:
            try:
                from pymongo import MongoClient
                client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
                _db = client[os.environ.get('DB_NAME', 'test_database')]
            except Exception as e:
                logger.error(f"MongoDB connection failed: {e}")
                _db = False
        else:
            _db = False
    return _db if _db else None

# Models
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    subject: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)

class ContactResponse(BaseModel):
    status: str
    message: str

def send_contact_email(name: str, email: str, subject: str, message: str):
    try:
        from sendgrid import SendGridAPIClient
        from sendgrid.helpers.mail import Mail

        api_key = os.environ.get('SENDGRID_API_KEY', '')
        sender = os.environ.get('SENDER_EMAIL', '')
        recipient = os.environ.get('RECIPIENT_EMAIL', '')

        if not all([api_key, sender, recipient]):
            return False

        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #050505; color: #D4FF00; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">New Contact Form Submission</h1>
            </div>
            <div style="padding: 20px; background: #f4f4f5;">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Subject:</strong> {subject}</p>
                <div style="background: white; padding: 15px; border-left: 4px solid #D4FF00; margin-top: 10px;">
                    <p><strong>Message:</strong></p>
                    <p>{message}</p>
                </div>
            </div>
        </body>
        </html>
        """
        mail = Mail(from_email=sender, to_emails=recipient,
                    subject=f"Contact Form: {subject}", html_content=html_content)
        sg = SendGridAPIClient(api_key)
        response = sg.send(mail)
        return response.status_code == 202
    except Exception as e:
        logger.error(f"Email failed: {e}")
        return False

# Routes — NO /api prefix (Vercel file-based routing already provides /api)
@app.get("/api")
@app.get("/api/")
async def root():
    return {"message": "Affiliate Marketing API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "affiliate-marketing-api"}

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(request: ContactRequest):
    contact = ContactMessage(
        name=request.name,
        email=request.email,
        subject=request.subject,
        message=request.message
    )

    doc = contact.model_dump()
    db = get_db()
    if db is not None:
        try:
            db.contacts.insert_one(doc)
        except Exception as e:
            logger.error(f"MongoDB insert failed: {e}")

    email_sent = send_contact_email(request.name, request.email, request.subject, request.message)

    return ContactResponse(
        status="success",
        message="Message sent successfully! We'll get back to you soon." if email_sent
        else "Message received! We'll get back to you soon."
    )

@app.get("/api/contacts", response_model=List[ContactMessage])
async def get_contacts():
    db = get_db()
    if db is None:
        return []
    try:
        contacts = list(db.contacts.find({}, {"_id": 0}).limit(100))
        return contacts
    except Exception as e:
        logger.error(f"MongoDB query failed: {e}")
        return []
