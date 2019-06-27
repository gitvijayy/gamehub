from django.db import models

# Create your models here.
from django.contrib.auth.models import User
# Create your models here.


class PlayerOnline(models.Model):
    player = models.ForeignKey(
        User, related_name="onlineplayer", on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=500, default="Active")
    # player = models.ManyToManyField(Games)
    created_at = models.DateTimeField(auto_now_add=True)
