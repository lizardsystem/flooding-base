DEBUG = True
TEMPLATE_DEBUG = True
DATABASE_ENGINE = 'sqlite3'
DATABASE_NAME = 'test.db'
SITE_ID = 1
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'lizard_base']
ROOT_URLCONF = ['lizard_base.urls']
