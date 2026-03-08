from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# SendGrid config
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', '')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', '')

app = FastAPI()
api_router = APIRouter(prefix="/api")

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

# Email sending function
def send_contact_email(name: str, email: str, subject: str, message: str):
    try:
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
            <div style="padding: 10px; text-align: center; color: #71717A; font-size: 12px;">
                <p>Sent from your marketing website contact form</p>
            </div>
        </body>
        </html>
        """

        mail = Mail(
            from_email=SENDER_EMAIL,
            to_emails=RECIPIENT_EMAIL,
            subject=f"Contact Form: {subject}",
            html_content=html_content
        )
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(mail)
        logger.info(f"Email sent. Status: {response.status_code}")
        return response.status_code == 202
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

# Routes
@api_router.get("/")
async def root():
    return {"message": "Affiliate Marketing API"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "affiliate-marketing-api"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(request: ContactRequest, background_tasks: BackgroundTasks):
    contact = ContactMessage(
        name=request.name,
        email=request.email,
        subject=request.subject,
        message=request.message
    )

    doc = contact.model_dump()
    await db.contacts.insert_one(doc)

    # Send email in background
    if SENDGRID_API_KEY and SENDER_EMAIL and RECIPIENT_EMAIL:
        background_tasks.add_task(
            send_contact_email,
            request.name,
            request.email,
            request.subject,
            request.message
        )
        return ContactResponse(
            status="success",
            message="Message sent successfully! We'll get back to you soon."
        )
    else:
        return ContactResponse(
            status="success",
            message="Message received! We'll get back to you soon."
        )

@api_router.get("/contacts", response_model=List[ContactMessage])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(100)
    return contacts

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
