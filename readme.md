# Product Tracking Portal (React, Redux, and Django REST API)
This project is a simple product tracking system to allow users to record package locations and times.

## Requirements
  - Python 2.7
  - Node 4.6.1

## Getting Started

### Setting up the Django server
First, pull the repository to your local machine

```
git clone https://github.com/weeksling/product-tracking-portal\
cd product-tracking-portal
```


Once you have the source code, you will want to active the virtualenv:

```
. /venv/bin/activate
```

Then, navigate into the server/ directory, and install all requirements.

```
cd server/
pip install -r requirements.txt
```

### Adding some data
Inside the server/ folder, run the following commands

```
python manage.py migrate

python manage.py importlocations initial.txt
```

The first command will run all migrations and set up your database.

The second command will import the fixture data from the file that you specify. The example fiile provided (initial.txt) contains the proper format.


### Starting the Django server

To start the API server, simply run:
```
python manage.py runserver
```

This will start a development server at localhost:8000/




