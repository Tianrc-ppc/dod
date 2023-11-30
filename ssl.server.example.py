import flask

app = flask.Flask(__name__, static_folder='dist', static_url_path='/')


@app.errorhandler(404)
def handler_404(_):
    return flask.redirect('/index.html')


@app.errorhandler(400)
def handler_400(_):
    return '<p align=\'center\'>client error</p>'


@app.errorhandler(500)
def handler_500(_):
    return '<p align=\'center\'>server error</p>'


def server_runner(server):
    with open('ssl.cert.unsafe.pem', 'r') as _:
        cert = 'ssl.cert.unsafe.pem'
    with open('ssl.key.unsafe.pem', 'r') as _:
        key = 'ssl.key.unsafe.pem'
    server(('0.0.0.0', 8443), app, certfile=cert, keyfile=key).serve_forever()


if __name__ == '__main__':
    from gevent import pywsgi
    server_runner(pywsgi.WSGIServer)
