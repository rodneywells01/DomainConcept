from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Index Page"


@app.route('/hello')
def hello():
    return {"message": "hello, world!"}