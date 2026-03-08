from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
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

# Lazy DB
_db = None
def get_db():
    global _db
    if _db is None:
        mongo_url = os.environ.get("MONGO_URL", "")
        if mongo_url:
            try:
                from pymongo import MongoClient
                _db = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)[
                    os.environ.get("DB_NAME", "test_database")
                ]
            except Exception:
                _db = False
        else:
            _db = False
    return _db if _db else None


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    subject: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)


class ContactResponse(BaseModel):
    status: str
    message: str


@app.get("/api")
@app.get("/api/")
def root():
    return {"message": "Affiliate Marketing API"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


@app.post("/api/contact", response_model=ContactResponse)
def submit_contact(request: ContactRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "name": request.name,
        "email": request.email,
        "subject": request.subject,
        "message": request.message,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    db = get_db()
    if db is not None:
        try:
            db.contacts.insert_one(doc)
        except Exception as e:
            logger.error(f"DB error: {e}")

    # Lazy SendGrid
    email_sent = False
    try:
        api_key = os.environ.get("SENDGRID_API_KEY", "")
        sender = os.environ.get("SENDER_EMAIL", "")
        recipient = os.environ.get("RECIPIENT_EMAIL", "")
        if all([api_key, sender, recipient]):
            from sendgrid import SendGridAPIClient
            from sendgrid.helpers.mail import Mail
            mail = Mail(
                from_email=sender,
                to_emails=recipient,
                subject=f"Contact Form: {request.subject}",
                html_content=f"<p><b>From:</b> {request.name} ({request.email})</p><p>{request.message}</p>",
            )
            sg = SendGridAPIClient(api_key)
            resp = sg.send(mail)
            email_sent = resp.status_code == 202
    except Exception as e:
        logger.error(f"Email error: {e}")

    return ContactResponse(
        status="success",
        message="Message sent successfully!" if email_sent else "Message received! We'll get back to you soon.",
    )
