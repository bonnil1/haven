from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from dotenv import load_dotenv
import textwrap
import smtplib
import os

load_dotenv()

# need to figure out what format attachment would be
# include date, time, ticket # ? > timestamped when email is sent ... 
def send_contactus_email(Email: str, FirstName: str, LastName: str, Issue: str, Description: str, Attachment_filename: str = None, Attachment_data: bytes = None):
    sender_email = os.getenv("GMAIL_UN")
    sender_password = os.getenv("GMAIL_PW")
    support_email = "bonnieliu759@yahoo.com"

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

    if Attachment_data and Attachment_filename:
        part = MIMEApplication(Attachment_data, Name=Attachment_filename)
        part['Content-Disposition'] = f'attachment; filename="{Attachment_filename}"'
        msg.attach(part)

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, support_email, msg.as_string())
    except smtplib.SMTPException as e:
        raise Exception(f"Failed to send email: {e}")