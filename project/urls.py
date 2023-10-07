"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from project.views import (
    register,
    login,
    google_auth,
    reset_password,
    edit_profile,
    get_user_info,
    post_video,
    get_videos,
    get_videos_by_owner,
    post_comment,
    get_comments,
    get_messages,
    send_message,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/register/', register),
    path('api/login/', login),
    path('api/google-auth/', google_auth),
    path('api/reset-password/', reset_password),
    path('api/edit-profile/', edit_profile),
    path('api/<int:uid>/info/', get_user_info),

    path('api/post-video/', post_video),
    path('api/videos/', get_videos),
    path('api/<int:owner_id>/videos/', get_videos_by_owner),
    path('api/post-comment/', post_comment),
    path('api/<int:video_id>/comments/', get_comments),

    path('api/send-message/', send_message),
    path('api/<int:receiver_id>/messages/', get_messages),
]
