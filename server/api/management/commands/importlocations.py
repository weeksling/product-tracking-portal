from django.core.management.base import BaseCommand, CommandError
from api.models import Location, Product



import os

class Command(BaseCommand):
    help = 'Attempts to import locations and products from provided file.'

    def add_arguments(self, parser):
        parser.add_argument('file', type=str)

    def handle(self, *args, **options):
        module_dir = os.getcwd()  # get current directory
        file_path = os.path.join(module_dir, options['file'])

        with open(file_path) as f:
            content = f.readlines()
        # you may also want to remove whitespace characters like `\n` at the end of each line
        lines = [x.strip() for x in content]

        lines.pop(0)
        

        for curr_line in lines :
            fields = curr_line.split('\t')
            try:
                product = Product.objects.get(product_id = fields[0])
            except :
                product = None
            if not product :
                print('adding product')
                product = Product(product_id=fields[0], description=fields[1])
                product.save()

            location = Location(product=product, datetime=fields[2], \
                longitude=fields[3], latitude=fields[4], elevation=fields[5])
            location.save()
        
        
