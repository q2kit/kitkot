from django.core.cache import cache

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

import requests
import os
import random
import re
import jwt
import datetime
import boto3
from uuid import uuid4
import ffmpeg


def validate_email(email):
    if re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
        return True, ""
    else:
        return False, "Invalid email"


def validate_username(username):
    if re.match(r"^[a-zA-Z0-9_]{3,}$", username):
        return True, ""
    else:
        return (
            False,
            "Invalid username, should be at least 3 characters and only contain letters, numbers and _",
        )


def validate_name(name):
    if re.match(r"^[a-zA-Z0-9_ ]+$", name):
        return True, ""
    else:
        return False, "Invalid name, should only contain letters, numbers and _"


def send_mail_otp(email):
    otp = str(random.randint(100000, 999999))
    cache.set(email, otp)

    SMTP_HOST = os.environ.get("SMTP_HOST")
    SMTP_ACCOUNT = os.environ.get("SMTP_ACCOUNT")
    SMTP_PASS = os.environ.get("SMTP_PASS")
    SMTP_SENDER = os.environ.get("SMTP_SENDER")
    SENDER_NAME = "KitKot Team"
    SUBJECT = "KitKot - OTP"
    MESSAGE = f"""
        <html>
            <head></head>
            <body style="font-size: 16px">
                <p>Your OTP code is: <b>{otp}</b>.</p>
                <p>Please use this code to reset your password.</p>
                <br>
                <p style="font-size: 13px"><i>If you did not request this, please ignore this email. Thank you :)</i></p>
            </body>
        </html>
    """

    msg = MIMEMultipart()
    msg["From"] = formataddr((SENDER_NAME, SMTP_SENDER))
    msg["To"] = email
    msg["Subject"] = SUBJECT
    msg.attach(MIMEText(MESSAGE, "html"))

    try:
        with smtplib.SMTP(SMTP_HOST, 587) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.login(SMTP_ACCOUNT, SMTP_PASS)
            smtp.sendmail(SMTP_SENDER, email, msg.as_string())
    except Exception as e:
        cache.delete(email)


def verify_otp(email, otp):
    if cache.get(email) == otp:
        cache.delete(email)
        return True
    else:
        return False


def generate_access_token(uid):
    SECRET_KEY = os.environ.get("SECRET_KEY")
    return jwt.encode(
        {
            "uid": uid,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30),
            "iat": datetime.datetime.utcnow(),
        },
        SECRET_KEY,
        algorithm="HS256",
    )


def generate_ws_access_token(id):
    SECRET_KEY = os.environ.get("WS_SECRET_KEY")
    return jwt.encode(
        {
            "id": id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            "iat": datetime.datetime.utcnow(),
        },
        SECRET_KEY,
        algorithm="HS256",
    )


def verify_access_token(token):
    SECRET_KEY = os.environ.get("SECRET_KEY")
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return data["uid"]
    except:
        return None


def upload_video_to_s3(video):
    AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
    AWS_FOLDER_VIDEOS = os.environ.get("AWS_FOLDER_VIDEOS")
    s3 = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )

    postfix = video.name.split(".")[-1]
    filename = AWS_FOLDER_VIDEOS + "/" + str(uuid4().hex) + "." + postfix
    s3.upload_fileobj(
        video,
        AWS_STORAGE_BUCKET_NAME,
        filename,
        ExtraArgs={
            "ContentType": video.content_type,
        },
    )

    return f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{filename}"


def upload_file_to_cloud(file):
    url = "http://localhost:8080/"
    files = {
        "file": file,
    }
    return requests.post(url, files=files).text


def upload_file_to_local(file):
    root_folder = "/var/www/kitkot.q2k.dev/videos"
    filename = str(uuid4().hex) + "." + file.name.split(".")[-1]
    filepath = os.path.join(root_folder, filename)
    with open(filepath, "wb+") as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    return filename, create_thumbnail(filepath)


def create_thumbnail(filepath):
    thumbnail = str(uuid4().hex) + ".jpg"
    ffmpeg.input(filepath).filter("scale", 320, -1).output(
        os.path.join("/var/www/kitkot.q2k.dev/thumbnails", thumbnail), vframes=1
    ).run()
    return thumbnail
