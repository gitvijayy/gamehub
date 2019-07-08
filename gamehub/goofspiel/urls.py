from django.urls import path, include


from rest_framework import routers

from .api import GamesViewSet
from .api import RoundsViewSet
from .api import PlayersViewSet
from .api import TurnsViewSet


router = routers.DefaultRouter()
router.register('api/goofspiel/games', GamesViewSet, 'games')
router.register('api/goofspiel/activegames', PlayersViewSet, 'players')
router.register('api/goofspiel/rounds', RoundsViewSet, 'rounds')
router.register('api/goofspiel/turns', TurnsViewSet, 'turns')


urlpatterns = router.urls
