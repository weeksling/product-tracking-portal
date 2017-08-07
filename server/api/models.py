# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Product (models.Model) :
	description = models.CharField(max_length=200)
	product_id = models.AutoField(primary_key=True)

	def __str__(self) :
		return self.description

@python_2_unicode_compatible
class Location (models.Model) :
	id = models.AutoField(primary_key=True)

	datetime = models.DateTimeField()
	latitude = models.DecimalField(max_digits=9, decimal_places=7)
	longitude= models.DecimalField(max_digits=9, decimal_places=7)
	elevation= models.IntegerField()

	product = models.ForeignKey(Product)

	date_created = models.DateTimeField(auto_now_add=True)
	last_modified= models.DateTimeField(auto_now = True)

	def __str__(self) :
		return str(self.latitude) + " | " + str(self.longitude) + " | " \
			+ str(self.elevation) + " @ " + str(self.datetime)

