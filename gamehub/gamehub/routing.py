# mysite/routing.py
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chat.routing
import defaultgame.routing
import war.routing

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            defaultgame.routing.websocket_urlpatterns
        )
    ),
        'websocket': AuthMiddlewareStack(
        URLRouter(
            war.routing.websocket_urlpatterns
        )
    ),
})
