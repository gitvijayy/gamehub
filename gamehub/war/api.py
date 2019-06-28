from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import viewsets, permissions

from .serializers import PlayerSerializer
from .serializers import GameSerializer
from .serializers import RoundSerializer
from .serializers import TurnSerializer

from war.models import Players
from war.models import Turns
from war.models import Games
from war.models import Rounds
from war.models import Turns

class GamesViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer

class RoundsViewSet(viewsets.ModelViewSet):
    queryset = Rounds.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RoundSerializer

class TurnsViewSet(viewsets.ModelViewSet):
    queryset = Turns.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TurnSerializer

class PlayersViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PlayerSerializer

    def get_queryset(self):
        return self.request.user.userswar.all()
