from django.urls import path, include


from rest_framework import routers

from .api import GamesViewSet
from .api import RoundsViewSet
from .api import PlayersViewSet
from .api import TurnsViewSet


router = routers.DefaultRouter()

router.register('api/war/games', GamesViewSet, 'games')
router.register('api/war/activegames', PlayersViewSet, 'players')
router.register('api/war/rounds', RoundsViewSet, 'rounds')
router.register('api/war/turns', TurnsViewSet, 'turns')


urlpatterns = router.urls
