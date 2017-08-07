from django.conf.urls import include, url
from rest_framework.authtoken import views as drf_views

from .models import Location, Product

from rest_framework import routers, serializers, viewsets


router = routers.DefaultRouter()


class ProductSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Product
		fields = ('product_id', 'description')

class ProductViewSet(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

router.register(r'products', ProductViewSet)


class LocationSerializer(serializers.HyperlinkedModelSerializer):
	product = ProductSerializer()

	class Meta:
		model = Location
		fields = ('id', 'product', 'longitude', 'latitude', 'elevation', 'datetime')

class LocationViewSet(viewsets.ModelViewSet):
	queryset = Location.objects.all()
	serializer_class = LocationSerializer

router.register(r'locations', LocationViewSet)

urlpatterns = [
	url(r'^', include(router.urls)),
]