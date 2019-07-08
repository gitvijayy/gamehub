from django.db import models

from django.contrib.auth.models import User
from games.models import Games
from games.models import Players


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
