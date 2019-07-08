from rest_framework import generics, permissions
from rest_framework.response import Response

from .serializers import GameSerializer

from .serializers import TurnSerializer
from games.models import Games
from games.models import Players
from memory.models import Turns
from rest_framework import viewsets, permissions


class GamesViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.filter(name="Memory")
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer


class TurnsViewSet(viewsets.ModelViewSet):
    queryset = Turns.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TurnSerializer
