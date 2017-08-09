from django.conf.urls import include, url
from rest_framework.authtoken import views as drf_views

from .models import Location, Product

import rest_framework_filters as filters

from rest_framework import routers, serializers, viewsets


router = routers.DefaultRouter()


class ProductSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Product
		fields = ('product_id', 'description')

class ProductFilter(filters.FilterSet):
    class Meta:
        model = Product
        fields = {'product_id': ['exact']}

class ProductViewSet(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer
	filter_backends = (filters.backends.DjangoFilterBackend,)
	filter_class = ProductFilter


router.register(r'products', ProductViewSet)




class LocationSerializer(serializers.HyperlinkedModelSerializer):
	product = ProductSerializer()

	class Meta:
		model = Location
		fields = ('id', 'product', 'longitude', 'latitude', 'elevation', 'datetime')

class LocationFilter(filters.FilterSet):
    product = filters.RelatedFilter(ProductFilter, name='product', queryset=Product.objects.all())

    class Meta:
        model = Location
        fields = ['id']

class LocationViewSet(viewsets.ModelViewSet):
	queryset = Location.objects.all()
	serializer_class = LocationSerializer
	filter_backends = (filters.backends.DjangoFilterBackend,)
	filter_class = LocationFilter

router.register(r'locations', LocationViewSet)



urlpatterns = [
	url(r'^', include(router.urls)),
]

