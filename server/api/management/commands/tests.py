from django.core.management import call_command
from django.test import TestCase

from api.models import Product, Location

class ImportLocationsTest(TestCase):
    def test_create_four_product(self):
    	call_command('importlocations', 'initial.txt')
    	self.assertEquals(Product.objects.count(), 4)

    def test_create_seventeen_locations(self):
    	call_command('importlocations', 'initial.txt')
    	self.assertEquals(Location.objects.count(), 17)