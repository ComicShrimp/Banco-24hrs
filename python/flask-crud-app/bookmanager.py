from flask import Flask
from flask import render_template
from flask import request
import sqlite3

app = Flask(__name__)
#Conexão sqlite3
conn = sqlite3.connect('people.db')
cur = conn.cursor()

@app.route("/", methods=["GET", "POST"])
def home():
    if request.form:
        print(request.form)
    return render_template("home.html")
  
if __name__ == "__main__":
    app.run(debug=True)


#trocar pra json
def cadastro(nome,imagem,cartao,saldo):
    cur.execute('INSERT INTO conta (nome,imagem,cartao,saldo) VALUES('+nome+','+imagem+','+cartao+','+saldo,')')

def extrato()


cur.execute('SELECT * FROM person ORDER BY l')
people = cur.fetchall()



Conta = {
  "nome": "Nome do cliente",
  "imagem": "http://urldafoto"
  "cartao": 123456789,
  "saldo": 123.45,
  "ultimaTransacao": {
  "operacao": "Titulo",
  "valor": -45.67,
  "saldo": 456.98
  }