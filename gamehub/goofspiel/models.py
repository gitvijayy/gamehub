from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from games.models import Games as Games1
# Create your models here.


class Games(models.Model):
    no_of_players = models.IntegerField(default=2)
    status = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Players(models.Model):
    game_id = models.ForeignKey(
        Games, related_name="players", on_delete=models.CASCADE, null=True)
    player = models.ForeignKey(
        User, related_name="users", on_delete=models.CASCADE, null=True)
    # player = models.ManyToManyField(Games)
    created_at = models.DateTimeField(auto_now_add=True)


class Rounds(models.Model):
    game_id = models.ForeignKey(
        Games, related_name="rounds", on_delete=models.CASCADE, null=True)
    prizeCard = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Turns(models.Model):
    round_id = models.ForeignKey(
        Rounds, related_name="turns", on_delete=models.CASCADE, null=True)
    player = models.ForeignKey(
        User, related_name="players", on_delete=models.CASCADE, null=True)
    action = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
