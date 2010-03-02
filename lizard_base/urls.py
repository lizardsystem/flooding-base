from django.conf.urls.defaults import *
from django.conf import settings


urlpatterns = patterns(
    '',
    url(r'^$',
        'lizard_base.views.service_uberservice',
        name='base_service_uberservice'),

    url(r'^configuration/$',
        'lizard_base.views.service_get_configurations',
        name='base_service_get_configurations'),

    url(r'^configuration/(?P<configuration_id>\d+)/filter/$',
        'lizard_base.views.service_get_filters',
        name='base_service_get_filters'),

    url(r'^configuration/(?P<configuration_id>\d+)/filter/(?P<filter_id>[_A-Za-z0-9]*)/location/$',
        'lizard_base.views.service_get_locations',
        name='base_service_get_locations'),

    url(r'^configuration/(?P<configuration_id>\d+)/filter/(?P<filter_id>[_A-Za-z0-9]*)/parameter/$',
        'lizard_base.views.service_get_parameters',
        name='base_service_get_parameters'),

    url(r'^configuration/(?P<configuration_id>\d+)/location/(?P<location_id>[_/A-Za-z0-9]*)/$',
        'lizard_base.views.service_get_location',
        name='base_service_get_location'),

    url(r'^configuration/(?P<configuration_id>\d+)/timeseries/$',
        'lizard_base.views.service_get_timeseries',
        name='base_service_get_timeseries'),
    )


if settings.DEBUG:
    # Add this also to the projects that use lizard-ui
    urlpatterns += patterns('',
        (r'', include('staticfiles.urls')),
    )
