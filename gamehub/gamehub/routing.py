# mysite/routing.py
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chat.routing
import defaultgame.routing
import goofspiel.routing
import games.routing

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    # 'websocket': AuthMiddlewareStack(
    #     URLRouter(
    #         chat.routing.websocket_urlpatterns
    #     )
    # ),
    # 'websocket': AuthMiddlewareStack(
    #     URLRouter(
    #         defaultgame.routing.websocket_urlpatterns
    #     )
    # ),
    # 'websocket': AuthMiddlewareStack(
    #     URLRouter(
    #         goofspiel.routing.websocket_urlpatterns
    #     )
    # ),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            games.routing.websocket_urlpatterns
        )
    )
})
