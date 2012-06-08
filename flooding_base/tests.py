# Smoke test: just import everything and see if smoke comes out:

import flooding_base
import flooding_base.admin
import flooding_base.dummydatabaseconnector
import flooding_base.eidatabaseconnector
import flooding_base.jdbctest
import flooding_base.models
import flooding_base.urls
import flooding_base.views

from django.utils.unittest import TestCase

# Simple test, for testing
class TrivialTest(TestCase):
    def testAddition(self):
        self.assertEquals(1+1, 2)

