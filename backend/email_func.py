from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import smtplib
import os

load_dotenv()

def send_verification_email(user_email: str, name: str):
    sender_email = os.getenv("GMAIL_UN")
    sender_password = os.getenv("GMAIL_PW")

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = user_email
    msg['Subject'] = "Verify Your Email - Haven App"

    verification_url = f"http://localhost:3000/signup/pw?email={user_email}"

    body = f"""
    Hello {name},

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
            server.sendmail(sender_email, user_email, msg.as_string())
    except smtplib.SMTPException as e:
        raise Exception(f"Failed to send email: {e}")
