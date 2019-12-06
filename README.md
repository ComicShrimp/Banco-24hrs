# Banco 24 hrs

Cada pasta corresponde a um componente do banco, cada um feito em uma linguagem diferente para demonstrar o uso das API's.

# Linguagens/Frameworks utilizados

- Javascript (Electron para Frontend e Node para Backend)
- Python
- PHP

# Padronização dos Dados

Todo servidor de Banco deve ter um banco de dados que guarde, no minimo, os seguintes campos:

- Nome
- Imagem (Apenas a URL, pois será carregado no frontend)
- Numero do Cartão (9 digitos)
- Numero da Conta (5 digitos)
- Saldo
- Extrato (Deve-se manter, no minimo, as 5 ultimas trasações)

_Obs:_ O extrato deve ser guardado, ou manipulado, como um array de objetos com os campos `operacao`, `valor` e `saldo`

# Padronização das Rotas e requisições

Todos os serviços fornecidos pelos endpoints devem seguir esta mesma estruturação:

## Cadastro de Clientes

Metodo POST:

```
http://ip:porta/cadastro
```

Este metodo recebe como parâmetro um json com as seguintes informações:

```json
{
  "nome": "Nome do cliente",
  "cartao": 123456789,
  "conta": 12345,
  "saldo": 123.45
}
```

Podem existir campos adicionais, porem, eles não devem ser obrigatórios.

# Consulta de Cliente

Metodo GET:

```
http://ip:porta/numero_da_conta
```

Deve ser retornado um Json com estes campos:

```json
{
  "nome": "Nome do cliente",
  "cartao": 123456789,
  "saldo": 123.45,
  "ultimaTransacao": {
    "operacao": "Titulo",
    "valor": -45.67,
    "saldo": 456.98
  }
}
```

# Metodo de Extrato

Metodo GET:

```
http://ip:porta/numero_da_conta/extrato
```

Deve ser enviado também um corpo em json com a informação de quantos extratos deseja receber.

```json
{
  "qtd": 5
}
```

Campos de retorno:

```json
{
  "nome": "Nome do Cliente",
  "saldo": 123.45,
  "extrato": [
    {
      "operacao": "titulo",
      "valor": 1234.56,
      "saldo": 325.76
    },
    {
      "operacao": "titulo",
      "valor": 873.56,
      "saldo": 735.76
    },
    ...
  ]
}
```
