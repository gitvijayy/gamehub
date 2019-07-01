from django.db import models

from django.contrib.auth.models import User

from games.models import Games
from games.models import Players
# Create your models here.


class Turns(models.Model):
    game_id = models.ForeignKey(
        Games, related_name="currentgame", on_delete=models.CASCADE, null=True)
    player = models.ForeignKey(
        User, related_name="currentuser", on_delete=models.CASCADE, null=True)
    action = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
