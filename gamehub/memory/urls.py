from django.urls import path, include


from rest_framework import routers

from .api import GamesViewSet


from .api import TurnsViewSet


router = routers.DefaultRouter()

router.register('api/memory/turns', TurnsViewSet, 'turns')
router.register('api/memory/games', GamesViewSet, 'games')


urlpatterns = router.urls
