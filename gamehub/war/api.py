from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import viewsets, permissions

from .serializers import PlayerSerializer
from .serializers import GameSerializer
# from .serializers import TurnSerializer

from war.models import Players
from war.models import Turns
from war.models import Games

class GamesViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer

class PlayersViewSet(viewsets.ModelViewSet):
    queryset = Players.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PlayerSerializer

