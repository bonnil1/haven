from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import smtplib
import os

load_dotenv()

def send_verification_email(Email: str, FirstName: str, token: str):
    sender_email = os.getenv("GMAIL_UN")
    sender_password = os.getenv("GMAIL_PW")

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = Email
    msg['Subject'] = "Verify Your Email - Haven App"

    verification_url = f"http://localhost:3000/signup/pw?token={token}"

    body = f"""
    Hello {FirstName},

    Welcome to Haven!

    Please verify your email by clicking the link: {verification_url}.

    We look forward to working with you.

    Haven Team.
    """
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, Email, msg.as_string())
    except smtplib.SMTPException as e:
        raise Exception(f"Failed to send email: {e}")