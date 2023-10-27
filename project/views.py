from django.http import JsonResponse
from django.db.models import Q, Exists, OuterRef, Count, F
from django.core.cache import cache

from .models import (
    User,
    Video,
    Comment,
    Watched,
    Message,
)

from .decorator import auth_pass

import hashlib
import os
import threading
from google.oauth2 import id_token
from google.auth.transport import requests

from .func import (
    validate_email,
    validate_username,
    validate_name,
    generate_access_token,
    generate_ws_access_token,
    send_mail_otp,
    verify_otp,
    upload_video_to_s3,
    upload_file_to_cloud,
    upload_file_to_local,
)

SECRET_KEY = os.environ.get("SECRET_KEY")
DEFAULT_AVATAR = os.environ.get("DEFAULT_AVATAR")


def register(request):
    if request.method == "POST":
        try:
            username = request.POST["username"].lower().strip()
            password = request.POST["password"]
            email = request.POST["email"].lower().strip()
            name = request.POST["name"].strip()
        except Exception:
            return JsonResponse(
                {"success": False, "message": "Fill all fields"}, status=400
            )

        validator = [
            (*validate_username(username), "username"),
            (*validate_name(name), "name"),
            (*validate_email(email), "email"),
        ]

        for success, message, field in validator:
            if not success:
                return JsonResponse(
                    {
                        "success": False,
                        "fields": {
                            field: message,
                        },
                    },
                    status=400,
                )

        check_exists = (
            (
                User.objects.filter(username=username).exists(),
                "User with this username already exists",
            ),
            (
                User.objects.filter(email=email).exists(),
                "User with this email already exists",
            ),
        )

        for exists, message in check_exists:
            if exists:
                return JsonResponse({"success": False, "message": message}, status=400)

        user = User.objects.create(
            username=username,
            password=hashlib.sha512(
                (password + SECRET_KEY).encode("utf-8")
            ).hexdigest(),
            email=email,
            name=name,
            avatar=DEFAULT_AVATAR,
        )

        userJSON = {
            "uid": user.pk,
            "username": user.username,
            "email": user.email,
            "name": user.name,
            "avatar": user.avatar or DEFAULT_AVATAR,
            "followers": 0,
            "following": 0,
            "liked": 0,
            "videos": 0,
            "is_premium": user.is_premium,
        }

        return JsonResponse(
            {
                "success": True,
                "message": "User created",
                "token": generate_access_token(user.pk),
                "user": userJSON,
            },
            status=201,
        )

    return JsonResponse({"success": False, "message": "Method not allowed"})


def login(request):
    if request.method == "POST":
        try:
            login_id = request.POST["login_id"].lower().strip()
            password = request.POST["password"]
        except KeyError:
            return JsonResponse(
                {"success": False, "message": "Fill all fields"}, status=400
            )

        try:
            user = User.objects.get(Q(username=login_id) | Q(email=login_id))
        except User.DoesNotExist:
            return JsonResponse(
                {
                    "success": False,
                    "fields": {
                        "password": "Wrong password",
                    },
                },
                status=401,
            )

        userJSON = {
            "uid": user.pk,
            "username": user.username,
            "email": user.email,
            "name": user.name,
            "avatar": user.avatar or DEFAULT_AVATAR,
            "followers": user.followers.count(),
            "following": user.following.count(),
            "likes": Watched.objects.filter(video__owner=user, liked=True).count(),
            "is_premium": user.is_premium,
            "videos": user.videos.count(),
        }

        if (
            user.password
            == hashlib.sha512((password + SECRET_KEY).encode("utf-8")).hexdigest()
        ):
            return JsonResponse(
                {
                    "success": True,
                    "message": "User logged in",
                    "token": generate_access_token(user.pk),
                    "user": userJSON,
                },
                status=200,
            )
        else:
            return JsonResponse(
                {
                    "success": False,
                    "fields": {
                        "password": "Wrong password",
                    },
                },
                status=401,
            )

    return JsonResponse({"success": False, "message": "Method not allowed"}, status=405)


def google_auth(request):
    if request.method == "POST":
        try:
            g_token = request.POST["g_token"].strip()
        except KeyError:
            return JsonResponse(
                {"success": False, "message": "Fill all fields"}, status=400
            )

        try:
            G_CLIENT_ID = os.environ.get("G_CLIENT_ID")
            idinfo = id_token.verify_oauth2_token(
                g_token, requests.Request(), G_CLIENT_ID
            )
            email = idinfo["email"]
            try:  # login
                user = User.objects.annotate(
                    liked=Count("watched", filter=Q(watched__liked=True))
                ).get(email=email)
                userJSON = {
                    "uid": user.pk,
                    "username": user.username,
                    "email": user.email,
                    "name": user.name,
                    "avatar": user.avatar or DEFAULT_AVATAR,
                    "followers": user.followers.count(),
                    "following": user.following.count(),
                    "liked": user.liked,
                    "is_premium": user.is_premium,
                    "videos": user.videos.count(),
                }
                return JsonResponse(
                    {
                        "success": True,
                        "message": "User logged in",
                        "token": generate_access_token(user.pk),
                        "user": userJSON,
                    },
                    status=200,
                )

            except User.DoesNotExist:  # register
                username = email.split("@")[0]
                # name = idinfo["name"]
                name = (
                    idinfo.get("family_name", "") + " " + idinfo.get("given_name", "")
                )
                avatar = idinfo["picture"]

                user = User.objects.create(
                    username=username,
                    email=email,
                    name=name,
                    avatar=avatar,
                )
                userJSON = {
                    "uid": user.pk,
                    "username": user.username,
                    "email": user.email,
                    "name": user.name,
                    "avatar": user.avatar or DEFAULT_AVATAR,
                    "followers": 0,
                    "following": 0,
                    "liked": 0,
                    "videos": 0,
                    "is_premium": False,
                }
                return JsonResponse(
                    {
                        "success": True,
                        "message": "User created",
                        "token": generate_access_token(user.pk),
                        "user": userJSON,
                    },
                    status=201,
                )
        except Exception as e:
            return JsonResponse(
                {"success": False, "message": "Wrong token"}, status=401
            )
    return JsonResponse({"success": False, "message": "Method not allowed"}, status=405)


def reset_password(request):
    if request.method == "POST":
        try:
            email = request.POST["email"].lower().strip()
        except KeyError:
            return JsonResponse(
                {"success": False, "message": "Fill all fields"}, status=400
            )

        if "otp" in request.POST:  # step 2
            otp = request.POST["otp"]
            if verify_otp(email, otp):
                try:
                    new_password = request.POST["new_password"]
                    user = User.objects.get(email=email)
                    user.password = hashlib.sha512(
                        (new_password + SECRET_KEY).encode("utf-8")
                    ).hexdigest()
                    user.save()
                    return JsonResponse(
                        {"success": True, "message": "Password changed"}, status=200
                    )
                except KeyError:
                    return JsonResponse(
                        {"success": False, "message": "Fill all fields"}, status=400
                    )
            else:
                return JsonResponse(
                    {"success": False, "message": "Wrong OTP"}, status=401
                )

        else:  # step 1
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return JsonResponse(
                    {
                        "success": False,
                        "message": "User not found with this email",
                    },
                    status=404,
                )

            if cache.get(email):
                return JsonResponse(
                    {
                        "success": False,
                        "message": "OTP already sent. If you don't receive it, try again in 5 minutes.",
                    },
                    status=401,
                )
            t = threading.Thread(target=send_mail_otp, args=(user.email,))
            t.start()

            return JsonResponse(
                {
                    "success": True,
                    "message": "OTP sent. If you don't receive it, try again in 5 minutes.",
                },
                status=200,
            )

    return JsonResponse({"success": False, "message": "Method not allowed"}, status=405)


@auth_pass(["POST", "GET"])
def edit_profile(request):
    if request.method == "POST":
        try:
            password = request.POST["password"]
            name = request.POST.get("name", "").strip()
            username = request.POST.get("username", "").strip()
            email = request.POST.get("email", "").strip()
            avatar = request.FILES.get("avatar", None)
            new_password = request.POST.get("new_password", "").strip()
        except KeyError:
            return JsonResponse(
                {"success": False, "message": "Enter your password"}, status=400
            )

        validator = [
            validate_username(username) if username else (True, ""),
            validate_email(email) if email else (True, ""),
            validate_name(name) if name else (True, ""),
        ]

        for success, message in validator:
            if not success:
                return JsonResponse({"success": False, "message": message}, status=400)

        check_exists = [
            (
                User.objects.filter(username=username)
                .exclude(pk=request.user.pk)
                .exists(),
                "User with this username already exists",
            ),
            (
                User.objects.filter(email=email).exclude(pk=request.user.pk).exists(),
                "User with this email already exists",
            ),
        ]

        for exists, message in check_exists:
            if exists:
                return JsonResponse({"success": False, "message": message}, status=400)

        if (
            hashlib.sha512((password + SECRET_KEY).encode("utf-8")).hexdigest()
            != request.user.password
        ):
            return JsonResponse(
                {"success": False, "message": "Wrong password"}, status=401
            )

        if new_password:
            request.user.password = hashlib.sha512(
                (new_password + SECRET_KEY).encode("utf-8")
            ).hexdigest()

        if name:
            request.user.name = name
        if username:
            request.user.username = username
        if email:
            request.user.email = email
        if avatar:
            request.user.avatar = upload_file_to_cloud(avatar)
        request.user.save()
        return JsonResponse(
            {"success": True, "message": "User info updated"}, status=200
        )
    elif request.method == "GET":
        return JsonResponse(
            {
                "success": True,
                "user": {
                    "name": request.user.name,
                    "username": request.user.username,
                    "email": request.user.email,
                    "avatar": request.user.avatar,
                },
            },
            status=200,
        )


@auth_pass(["GET"])
def get_user_info(request, uid):
    try:
        user = User.objects.prefetch_related("videos", "videos__watched_set").get(
            pk=uid
        )
    except User.DoesNotExist:
        return JsonResponse({"success": False, "message": "User not found"}, status=404)
    result = {
        "name": user.name,
        "username": user.username,
        "avatar": user.avatar or DEFAULT_AVATAR,
        "is_premium": user.is_premium,
        "followers": user.followers.count(),
        "following": user.following.count(),
        "likes": sum([video.likes_count for video in user.videos.all()]),
        "show_liked_videos": user.show_liked_videos,
        "show_watched_videos": user.show_watched_videos,
    }
    if user == request.user:
        result["email"] = user.email
        result["videos"] = {
            "publicVideos": [video.json() for video in user.videos.filter(is_private=False)],
            "privateVideos": [video.json() for video in user.videos.filter(is_private=True)],
            "likedVideos": [watched.video.json() for watched in Watched.objects.filter(user=user, liked=True)],
            "watchedVideos": [watched.video.json() for watched in Watched.objects.filter(user=user)],
        }
    else:
        result["videos"] = {
            "publicVideos": [video.json() for video in user.videos.filter(
                is_private=False,
                is_premium=request.user.is_premium
            )],
            "likedVideos": [watched.video.json() for watched in Watched.objects.filter(
                user=user,
                user__show_liked_videos=True,
                liked=True,
                video__is_premium=request.user.is_premium,
            )],
            "watchedVideos": [watched.video.json() for watched in Watched.objects.filter(
                user=user,
                user__show_watched_videos=True,
                video__is_premium=request.user.is_premium,
            )],
        }

    return JsonResponse({
        "success": True,
        "user": result,
    })


@auth_pass(["POST"])
def post_video(request):
    try:
        description = request.POST["description"]
        is_premium = request.POST.get("is_premium") == "true"
        is_private = request.POST.get("is_private") == "true"
        video = request.FILES["video"]
    except KeyError:
        return JsonResponse(
            {"success": False, "message": "Fill all fields"}, status=400
        )

    content_type_allow_list = ("video/mp4",)

    if video.content_type not in content_type_allow_list:
        return JsonResponse(
            {
                "success": False,
                "message": "File type not allowed, just "
                + ", ".join(content_type_allow_list),
            },
            status=400,
        )

    try:
        link, thumbnail = upload_file_to_local(video)
        link = "https://kitkot.q2k.dev/videos/" + link
        thumbnail = "https://kitkot.q2k.dev/thumbnails/" + thumbnail
    except Exception:
        return JsonResponse(
            {"success": False, "message": "Error uploading video"}, status=500
        )

    video = Video.objects.create(
        owner=request.user,
        description=description,
        link=link,
        thumbnail=thumbnail,
        is_premium=is_premium,
        is_private=is_private,
    )

    return JsonResponse({"success": True, "message": "Video posted"}, status=201)


@auth_pass(["GET"])
def get_videos(request):
    watched = Watched.objects.filter(user=request.user).values_list(
        "video_id", flat=True
    )
    videos = (
        Video.objects.exclude(pk__in=watched)
        .exclude(owner=request.user)
        .order_by("-id")
        .annotate(
            owner_name=F("owner__name"),
            owner_avatar=F("owner__avatar"),
            owner_preminum=F("owner__is_premium"),
            is_followed=Exists(request.user.following.filter(pk=OuterRef("owner_id"))),
            is_liked=Exists(
                Watched.objects.filter(
                    user=request.user, video=OuterRef("pk"), liked=True
                )
            ),
            likes=Count("watched", filter=Q(watched__liked=True)),
            views=Count("watched"),
            comments_count=Count("comments"),
        )
        .values(
            "id",
            "description",
            "link",
            "owner_name",
            "owner_avatar",
            "owner_preminum",
            "is_followed",
            "is_liked",
            "likes",
            "views",
            "comments_count",
            "is_premium",
        )
    )
    if not request.user.is_premium:
        videos = videos.filter(is_premium=False)

    result = []
    for video in videos:
        result.append(
            {
                "id": video["id"],
                "description": video["description"],
                "uri": video["link"],
                "owner": {
                    "name": video["owner_name"],
                    "avatar": video["owner_avatar"],
                    "is_premium": video["owner_preminum"],
                    "is_followed": video["is_followed"],
                },
                "is_liked": video["is_liked"],
                "likes": video["likes"],
                "views": video["views"],
                "comments": video["comments_count"],
                "is_premium": video["is_premium"],
            }
        )

    return JsonResponse({"success": True, "videos": result}, status=200)


@auth_pass(["GET"])
def get_videos_by_owner(request, owner_id):
    try:
        owner = User.objects.get(pk=owner_id)
    except User.DoesNotExist:
        return JsonResponse({"success": False, "message": "User not found"})

    videos = (
        owner.videos.all()
        .order_by("-id")
        .annotate(
            is_liked=Exists(
                Watched.objects.filter(
                    user=request.user, video=OuterRef("pk"), liked=True
                )
            ),
            liked=Count("watched", filter=Q(watched__liked=True)),
            watched_count=Count("watched"),
        )
        .values(
            "id",
            "description",
            "link",
            "is_liked",
            "liked",
            "watched_count",
            "is_premium",
        )
    )
    if not request.user.is_premium:
        videos = videos.filter(is_premium=False)

    return JsonResponse({"success": True, "videos": list(videos)})


@auth_pass(["POST"])
def like_toggle(request):
    try:
        video_id = request.POST["video_id"]
        video = Video.objects.get(pk=video_id)
    except Exception:
        return JsonResponse({"success": False, "message": "Video not found"})

    if video.owner == request.user:
        return JsonResponse(
            {"success": False, "message": "You can't like your own video"}
        )

    watched, _ = Watched.objects.get_or_create(user=request.user, video=video)
    watched.liked = not watched.liked
    watched.save()

    return JsonResponse({"success": True, "message": "OK", "liked": watched.liked})


@auth_pass(["POST"])
def follow_toggle(request):
    try:
        other_user_id = request.POST["other_user_id"]
        other_user = User.objects.get(pk=other_user_id)
    except Exception:
        return JsonResponse({"success": False, "message": "User not found"})

    if other_user == request.user:
        return JsonResponse({"success": False, "message": "You can't follow yourself"})

    if other_user in request.user.following.all():
        request.user.following.remove(other_user)
        followed = False
    else:
        request.user.following.add(other_user)
        followed = True

    return JsonResponse({"success": True, "message": "OK", "followed": followed})


@auth_pass(["POST"])
def post_comment(request):
    try:
        video_id = request.POST["video_id"]
        video = Video.objects.get(pk=video_id)
        content = request.POST["content"]
    except Exception:
        return JsonResponse({"success": False, "message": "Invalid video or content"})

    if not Watched.objects.filter(user=request.user, video=video).exists():
        return JsonResponse(
            {"success": False, "message": "You must watch the video before commenting"}
        )

    comment = Comment.objects.create(
        owner=request.user,
        video=video,
        content=content,
    )

    return JsonResponse(
        {
            "success": True,
            "message": "Comment posted",
            "comment": {
                "owner": {
                    "name": request.user.name,
                    "avatar": request.user.avatar or DEFAULT_AVATAR,
                },
                "comment": content,
                "datetime": comment.created_at,
            }
        }
    )


@auth_pass(["GET"])
def get_comments(request):
    try:
        video_id = request.GET["video_id"]
        video = Video.objects.get(pk=video_id)
    except Video.DoesNotExist:
        return JsonResponse({"success": False, "message": "Video not found"})

    comments = (
        video.comments.all()
        .select_related("owner")
        .order_by("-id")
    )
    comments = [{
        "owner": {
            "name": comment.owner.name,
            "avatar": comment.owner.avatar or DEFAULT_AVATAR,
        },
        "comment": comment.content,
        "datetime": comment.created_at,
    } for comment in comments]

    return JsonResponse({"success": True, "comments": comments})


@auth_pass(["POST"])
def send_message(request):
    try:
        receiver = User.objects.get(pk=request.POST["receiver_id"])
        content = request.POST["content"]
    except Exception:
        return JsonResponse(
            {"success": False, "message": "Invalid receiver or content"}
        )

    Message.objects.create(
        sender=request.user,
        receiver=receiver,
        content=content,
    )

    return JsonResponse(
        {
            "success": True,
            "message": "Message sent",
        }
    )


@auth_pass(["GET"])
def get_messages(request, receiver_id):
    try:
        receiver = User.objects.get(pk=receiver_id)
    except Exception:
        return JsonResponse({"success": False, "message": "Invalid receiver"})

    messages = (
        Message.objects.filter(
            Q(sender=request.user, receiver=receiver)
            | Q(sender=receiver, receiver=request.user)
        )
        .order_by("id")
        .values(
            "content",
            "sender_id",
            "created_at",
        )
    )

    messages = [
        {
            "content": message["content"],
            "created_by_self": message["sender_id"] == request.user.id,
            "created_at": message["created_at"].strftime("%d/%m/%Y %H:%M:%S"),
        }
        for message in messages
    ]

    return JsonResponse({"success": True, "messages": messages})


@auth_pass(["GET"])
def get_ws_access_token(request):
    return JsonResponse({
        "success": True,
        "token": generate_ws_access_token(request.user.pk),
    })


@auth_pass(["GET"])
def watch_video(request, video_id):
    try:
        video = Video.objects.get(pk=video_id)
    except Exception:
        return JsonResponse({"success": False, "message": "Video not found"})

    if video.owner == request.user:
        return JsonResponse(
            {"success": False, "message": "You can't watch your own video"}
        )

    Watched.objects.get_or_create(user=request.user, video=video)

    return JsonResponse({"success": True, "message": "OK"})