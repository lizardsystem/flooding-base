from django.contrib import admin

from lizard.base.models import Configuration
from lizard.base.models import DataSourceEI
from lizard.base.models import DataSourceDummy
from lizard.base.models import GroupConfigurationPermission
from lizard.base.models import Setting
from lizard.base.models import Map
from lizard.base.models import Site
from lizard.base.models import Application
from lizard.base.models import SubApplication


class ConfigurationAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'datasourcetype', 'hasDataSource', )


class DataSourceEIAdmin(admin.ModelAdmin):
    list_display = ('configuration', 'id', 'connectorurl',
                    'databaseurl', 'databaseurltagname',
                    'usecustomfilterresponse')

admin.site.register(Application)
admin.site.register(SubApplication)
admin.site.register(Configuration, ConfigurationAdmin)
admin.site.register(DataSourceEI, DataSourceEIAdmin)
admin.site.register(DataSourceDummy)
admin.site.register(GroupConfigurationPermission)
admin.site.register(Setting)
admin.site.register(Map)
admin.site.register(Site)
