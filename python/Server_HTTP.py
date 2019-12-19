# Código para um simples servidor HTTP

import Server_class
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

PORT = 8080
IP = "127.0.0.1"

http = HTTPServer((IP, PORT), Server_class.SimpleHTTPRequestHandler)
http.serve_forever()
