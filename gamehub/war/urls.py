from django.urls import path, include
# from .api import ValidateAPI
# from .api import AddPlayerAPI
# from .api import LoginAPI
# from .api import UserAPI
# from knox import views as knox_views

from rest_framework import routers
# from rest_framework import RestRouter
from .api import GamesViewSet
from .api import RoundsViewSet
from .api import PlayersViewSet
# from .api import TurnsViewSet
# from .api import GamesViewSetActive

router = routers.DefaultRouter()
# router = routers.RestRouter()
router.register('api/war/games', GamesViewSet, 'games')
router.register('api/war/activegames', PlayersViewSet, 'players')
router.register('api/war/rounds', RoundsViewSet, 'rounds')
# router.register('api/war/turns', TurnsViewSet, 'turns')
# router.register('api/defaultgame/testing', GamesViewSetActive, 'games')
# router.register('api/goofspiel/game/turn', GoofspielViewSet, 'goofspiel')

urlpatterns = router.urls