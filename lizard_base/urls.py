from django.conf.urls.defaults import *
from django.conf import settings

from django.contrib import admin

admin.autodiscover()


urlpatterns = patterns(
    '',
    # The old lizard.base urls that were previously mounted under /service.
    # We now mount them there directly.
    url(r'^service/$',
        'lizard_base.views.service_uberservice',
        name='base_service_uberservice'),

    url(r'^service/configuration/$',
        'lizard_base.views.service_get_configurations',
        name='base_service_get_configurations'),

    url(r'^service/configuration/(?P<configuration_id>\d+)/filter/$',
        'lizard_base.views.service_get_filters',
        name='base_service_get_filters'),

    url(r'^service/configuration/(?P<configuration_id>\d+)/filter/(?P<filter_id>[_A-Za-z0-9]*)/location/$',
        'lizard_base.views.service_get_locations',
        name='base_service_get_locations'),

    url(r'^service/configuration/(?P<configuration_id>\d+)/filter/(?P<filter_id>[_A-Za-z0-9]*)/parameter/$',
        'lizard_base.views.service_get_parameters',
        name='base_service_get_parameters'),

    url(r'^service/configuration/(?P<configuration_id>\d+)/location/(?P<location_id>[_/A-Za-z0-9]*)/$',
        'lizard_base.views.service_get_location',
        name='base_service_get_location'),

    url(r'^service/configuration/(?P<configuration_id>\d+)/timeseries/$',
        'lizard_base.views.service_get_timeseries',
        name='base_service_get_timeseries'),

    # URLs that were previously defined in the old lizard root urls.py but
    # that have to do with base.

    url(r'^$',
        'lizard_base.views.gui',
        name='root_url'),

    url(r'^get_config.js$',
        'lizard_base.views.gui_config',
        name='gui_config'),

    url(r'^get_translated_strings.js$',
        'lizard_base.views.gui_translated_strings',
        name='gui_translated_strings'),

    url(r'^admin/(.*)', admin.site.root),

    url(r'^admin/$',
        admin.site.root,
        name='admin_url'), #manually name admin root

    url(r'^help/$',
        'lizard_base.views.help',
        name='help_url'),

    url(r'^userconfiguration/$',
        'lizard_base.views.userconfiguration',
        name='userconfiguration_url'),

    url(r'^base/testdatabase/$',
        'lizard_base.views.testdatabase_list',
        name='testdatabase_list',
        ),

    url(r'^base/testdatabase/(?P<configuration_id>\d+)/$',
        'lizard_base.views.testdatabase',
        name='testdatabase_detail'),

    url(r'^accounts/login/$',
        'django.contrib.auth.views.login',
        {'template_name': 'registration/login_user.html'},
        name='login_url'),

    url(r'^accounts/logout/$',
        'django.contrib.auth.views.logout',
        name='logout_url'),

    url(r'^accounts/password_change/$',
        'django.contrib.auth.views.password_change',
        name='password_change_url'),

    url(r'^accounts/password_change_done/$',
        'django.contrib.auth.views.password_change_done'),


    )



if settings.DEBUG:
    # Add this also to the projects that use this application.
    urlpatterns += patterns('',
        (r'', include('staticfiles.urls')),
    )
