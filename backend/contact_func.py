from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from dotenv import load_dotenv
from typing import List, Dict
import textwrap
import smtplib
import os

load_dotenv()

def send_contactus_email(Email: str, FirstName: str, LastName: str, Issue: str, Description: str, attachments: List[Dict[str, any]] = []):
    sender_email = os.getenv("GMAIL_UN") #replace with official Haven email 
    sender_password = os.getenv("GMAIL_PW")
    support_email = "bonnieliu759@yahoo.com" #replace with official Haven support email

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = support_email
    msg['Subject'] = f"Haven Support Needed From: {Email}"

    body = textwrap.dedent(f"""\
    Customer First Name: {FirstName}
    Customer Last Name: {LastName}

    Customer Issue: {Issue}

    Issue Description:
    {Description}

    """)
    msg.attach(MIMEText(body, 'plain'))

    for file in attachments: 
        part = MIMEApplication(file["content"], Name=file["filename"])
        part['Content-Disposition'] = f'attachment; filename="{file["filename"]}"'
        msg.attach(part)

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, support_email, msg.as_string())
    except smtplib.SMTPException as e:
        raise Exception(f"Failed to send email: {e}")
    
    #MIMEApplication wraps binary content into email attachment 