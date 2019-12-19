from http.server import  HTTPServer, BaseHTTPRequestHandler
import os
import json
import array


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):

        #Consulta ao cliente
        if self.path == '/'+conta.numero:
        
        elif self.path == '/'+conta.numero+'/extrato':

        else:
            self.path = 'index.html'

        try:
            file = open(os.curdir + os.sep + self.path)
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(file.read().encode())
            file.close()

        except IOError:
            self.send_error(404, 'File Not Found: {}'.format(self.path))

    def do_POST(self):
        if self.path == '/cadastro'

        elif self.path == '/'+conta.numero+'/saque':
            
        elif self.path == '/'+conta.numero+'/deposito':

        else:
            self.path = 'index.html'


        try:
            file = open(os.curdir + os.sep + self.path)
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(file.read().encode())
            file.close()

        except IOError:
            self.send_error(404, 'File Not Found: {}'.format(self.path))


class Conta:
    def __init__(self, nome,senha,cartao,conta,saldo):
        self.nome = nome
        self.imagem = imagem
        self.cartao = cartao
        self.senha = senha
        self.conta = conta
        self.saldo = Saldo(saldo)
        self.operacao = Operacao('')
        self.valor = Valor('')
        self.extrato = [operacao[],valor[],saldo[]]
    
    ## como faço pra ter essa sequencia de saldo, valor e operacao dentro do json?
    def getExtrato():
        retorno = {
                "nome": self.nome,
                "saldo": self.saldo,
                "extrato": [

        return 

    def deposito(self,valor):
        self.saldo = valor
    
    def saque(self,valor):
        if(valor < self.saldo):
            self.saldo = self.saldo - valor
    
    
    
    def

class Operacao:
    def __init__(self,data)
    self.data = data


class Valor:
    def __init__(self,valor)
    self.valor = valor

class Saldo:
    def __init__(self,saldo)
    self.saldo = saldo
        




        
    