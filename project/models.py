from django.db import models

from datetime import datetime


class User(models.Model):
    username = models.CharField(max_length=255, null=True, blank=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    avatar = models.CharField(max_length=255, null=True, blank=True)
    following = models.ManyToManyField("self", symmetrical=False, related_name="followers", blank=True)
    is_premium = models.BooleanField(default=False)
    message_notification = models.BooleanField(default=False)
    like_notification = models.BooleanField(default=False)
    comment_notification = models.BooleanField(default=False)
    show_liked_videos = models.BooleanField(default=False)
    show_watched_videos = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    

class Video(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="videos")
    description = models.CharField(max_length=1000)
    link = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    thumbnail = models.CharField(max_length=255, null=True, blank=True)
    is_premium = models.BooleanField(default=False)
    is_private = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id) + " - " + self.description + "(" + self.owner.name + ")"
    
    @property
    def likes_count(self):
        return self.watched_set.filter(liked=True).count()
    
    @property
    def comments_count(self):
        return self.comments.count()
    
    @property
    def views_count(self):
        return self.watched_set.count()

    def json(self):
        return {
            "id": self.id,
            "owner": {
                "id": self.owner.id,
                "name": self.owner.name,
                "avatar": self.owner.avatar,
                "is_premium": self.owner.is_premium,
            },
            "description": self.description,
            "link": self.link,
            "created_at": self.created_at,
            "thumbnail": self.thumbnail,
            "is_premium": self.is_premium,
            "is_private": self.is_private,
            "likes": self.likes_count,
            "comments": self.comments_count,
            "views": self.views_count,
        }

class Comment(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="comments")
    content = models.CharField(max_length=1000)
    created_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return str(self.id) + " - " + self.owner.name
    

class Watched(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)

    def __str__(self):
        return self.user.name + " - " + str(self.video.id)


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    content = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.sender.name + " - " + self.receiver.name