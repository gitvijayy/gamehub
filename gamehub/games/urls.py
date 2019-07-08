from django.urls import path, include

from rest_framework import routers
from .api import GamesViewSet

from .api import PlayersViewSet
from .api import ActivePlayersViewSet


router = routers.DefaultRouter()

router.register('api/games', GamesViewSet, 'games')
router.register('api/activegames', PlayersViewSet, 'players')
router.register('api/activeplayers', ActivePlayersViewSet, 'players')


urlpatterns = router.urls
