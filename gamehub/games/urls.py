from django.urls import path, include
# from .api import ValidateAPI
# from .api import AddPlayerAPI
# from .api import LoginAPI
# from .api import UserAPI
# from knox import views as knox_views

from rest_framework import routers
# from rest_framework import RestRouter
from .api import GamesViewSet

from .api import PlayersViewSet
# from .api import ActivePlayersViewSet
# from .api import TurnsViewSet
# from .api import GamesViewSetActive

router = routers.DefaultRouter()
# router = routers.RestRouter()
router.register('api/games', GamesViewSet, 'games')
router.register('api/activegames', PlayersViewSet, 'players')
# router.register('api/activeplayers', ActivePlayersViewSet, 'players')
# router.register('api/deleteall', ActivePlayersViewSet, 'games')
# router.register('api/memory/turns', TurnsViewSet, 'turns')
# router.register('api/defaultgame/testing', GamesViewSetActive, 'games')
# router.register('api/goofspiel/game/turn', GoofspielViewSet, 'goofspiel')

urlpatterns = router.urls
