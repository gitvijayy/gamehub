"""
WSGI config for gamehub project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""


from django.core.wsgi import get_wsgi_application
import os
# path = '/home/vijaysrinivasan/Desktop/Projects/gamehub/gamehub/'
# if path not in sys.path:
#     sys.path.append(path)

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gamehub.settings')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gamehub.settings")

application = get_wsgi_application()
