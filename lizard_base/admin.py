from django.contrib import admin

from lizard_base.models import Configuration
from lizard_base.models import DataSourceEI
from lizard_base.models import DataSourceDummy
from lizard_base.models import GroupConfigurationPermission
from lizard_base.models import Setting
from lizard_base.models import Map
from lizard_base.models import Site
from lizard_base.models import Application
from lizard_base.models import SubApplication


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
