from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import GameSerializer
from .serializers import RoundSerializer
from .serializers import PlayerSerializer
from .serializers import TurnSerializer
from goofspiel.models import Games
from goofspiel.models import Rounds
from goofspiel.models import Players
from goofspiel.models import Turns
from rest_framework import viewsets, permissions


class GamesViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.filter(name="Goofspiel")
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
        return self.request.user.users.all()
