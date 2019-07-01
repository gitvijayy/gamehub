from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Games(models.Model):
    no_of_players = models.IntegerField(default=2)
    status = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Players(models.Model):
    game_id = models.ForeignKey(
        Games, related_name="playerswar", on_delete=models.CASCADE, null=True)
    player = models.ForeignKey(
        User, related_name="userswar", on_delete=models.CASCADE, null=True)
    deck = models.CharField(max_length=500)
    deck_length = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


class Rounds(models.Model):
    game_id = models.ForeignKey(
        Games, related_name="round", on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=200, default='new')
    created_at = models.DateTimeField(auto_now_add=True)


class Turns(models.Model):
    round_id = models.ForeignKey(
        Rounds, related_name="turns", on_delete=models.CASCADE, null=True)
    player = models.ForeignKey(
        User, related_name="playerswar", on_delete=models.CASCADE, null=True)
    action = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

# Create your models here.
