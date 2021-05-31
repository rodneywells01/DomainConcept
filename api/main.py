from flask import Flask, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
"postgresql://postgres:postgres@postgres:5432/digitalplanner" #TODO - do not store here 
db = SQLAlchemy(app)
migrate = Migrate(app, db)


@app.route("/")
def hello_world():
    return "Index Page"


@app.route('/hello')
def hello():
    return {"message": "hello, world!"}


@app.route('/domain', methods=['POST', 'GET'])    
def handle_domain():
    if request.method == 'POST':
        data = request.get_json()
        print("I'd make a new domain....if I wanted to bother writing this!")
        return {"message": "We made a new domain"}
    elif request.method == 'GET':
        domains = DomainModel.query.all()
        return {
            "count": len(domains),
            "domains": [
                {
                    "name": domain.name.strip(),
                    "category": domain.category.strip(),
                    "photo_url": domain.photo_url.strip(),
                    "description": domain.description.strip(),
                } for domain in domains
            ]
        }
    else:
        raise Exception("Method was not get or post!")

@app.route('/domain/categories', methods=["GET"])
def get_domains_by_category():
    if request.method != "GET":
        raise Exception("Can't support a non GET method on this endpoint!")

    # Querying docs - https://flask-sqlalchemy.palletsprojects.com/en/2.x/queries/
    domains_in_category_order = DomainModel\
        .query\
        .order_by(DomainModel.category)\
        .all()

    domains_by_category = dict()
    for domain in domains_in_category_order:
        serializable_domain = {
            "name": domain.name.strip(),
            "category": domain.category.strip(),
            "photo_url": domain.photo_url.strip(),
            "description": domain.description.strip(),
        }
        if serializable_domain["category"] in domains_by_category:
            domains_by_category[serializable_domain["category"]].append(serializable_domain)
        else:
            domains_by_category[serializable_domain["category"]] = [serializable_domain]




    return {
        "count": len(domains_by_category),
        "domains_by_category": domains_by_category
    }

class DomainModel(db.Model):
    __tablename__ = 'domain'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    category = db.Column(db.String())
    photo_url = db.Column(db.String())
    description = db.Column(db.String())

    def __init__(self, name, category, photo_url, description):
        self.name = name
        self.category = category
        self.photo_url = photo_url
        self.description = description



    def __repr__(self):
        return f"<Domain {self.name} />"

