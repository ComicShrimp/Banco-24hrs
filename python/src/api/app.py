#pylint: disable-all
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import ARRAY
import os
# import database

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
# databse
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin@localhost:5432/teste'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db init
db = SQLAlchemy(app)
# init marshmallow
ma = Marshmallow(app)

# product Class/Model


class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), unique=True)
    imagem = db.Column(db.String(100))
    numeroCartao = db.Column(db.Integer)
    senha = db.Column(db.Integer)
    numeroConta = db.Column(db.Integer, unique=True)
    saldo = db.Column(db.Float)

    def __init__(self, nome, imagem, numeroCartao, senha, numeroConta, saldo):
        self.nome = nome
        self.imagem = imagem
        self.numeroCartao = numeroCartao
        self.senha = senha
        self.numeroConta = numeroConta
        self.saldo = saldo

# product schema


class ClienteSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nome', 'imagem', 'numeroCartao',
                  'senha', 'numeroConta', 'saldo')


# Init schema
cliente_schema = ClienteSchema()
clientes_schema = ClienteSchema(many=True)


@app.route('/health', methods=['GET'])
def healthCheck():
    return jsonify({"mesaage": "server is running"})


@app.route('/cadastro', methods=['POST'])
def add_product():
    nome = request.json['nome']
    imagem = request.json['imagem']
    senha = request.json['senha']
    cartao = request.json['cartao']
    conta = request.json['conta']
    saldo = request.json['saldo']

    new_client = Cliente(nome, imagem, senha, cartao, conta, saldo)
    db.session.add(new_client)
    db.session.commit()

    return product_schema.jsonify(new_product)


@app.route('/<int:num>', methods=['GET'])
def get_single_product(num):
    senha = request.json['senha']

    if not senha:
        return jsonify({"mensagem": "Digite a Senha"})

    cliente = cliente.query.filter_by(numeroConta=num).first()
    if cliente is not None:
        return client_schema.jsonify(product)
    else:
        return jsonify({"Error": "product with that key can not be found"})


@app.route('/<int:num>/extrato', methods=['GET'])
def update_product(num):
    return jsonify({"Mensagem": "Metodo não implementado"})


@app.route('/product/<int:num>', methods=['DELETE'])
def delete_single_product(num):
    product = Product.query.get(num)
    if product is not None:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"deletion": "product has been deleted"})
    else:
        return jsonify({"Error": "product with that key can not be found"})
