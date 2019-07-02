from django.db import models

# Create your models here.
# from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Games(models.Model):
    name = models.CharField(max_length=500, blank=True)
    no_of_players = models.IntegerField(default=2)
    status = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    extras = models.CharField(max_length=500, blank=True)


class Players(models.Model):
    game_id = models.ForeignKey(
        Games, related_name="game", on_delete=models.CASCADE, null=True)
    player = models.ForeignKey(
        User, related_name="user", on_delete=models.CASCADE, null=True)
    # player = models.ManyToManyField(Games)
    created_at = models.DateTimeField(auto_now_add=True)


class OnlinePlayers(models.Model):
    user = models.ForeignKey(
        User, related_name="onlineuser", on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=500, blank=True)
