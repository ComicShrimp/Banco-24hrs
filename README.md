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
- Numero do Cartão (16 digitos)
- Senha (Até 10 digitos)
- Numero da Conta (5 digitos)
- Saldo
- Extrato (Deve-se manter, no minimo, as 5 ultimas trasações)

_Obs:_ O extrato deve ser guardado, ou manipulado, como um array de objetos com os campos `operacao`, `valor` e `saldo`

## Padronização de Nomes

Cada banco deverar possuir um unico numero de prefixo, tanto no numero do cartão, quanto no numero da conta. Segue a tabela com o nome e o prefixo de cada banco, ou seja, um numero que semore estará presente no inicio. Exemplo: Numero de conta: 56789 é do Banco do Brasil por possuir o prefixo "5". Segue abaixo a tabela completa:

| Linguagem  | Nome do Banco   | Prefixo Conta/Cartão |
| ---------- | --------------- | -------------------- |
| JavaScript | Banco do Brasil | "5"                  |
| PHP        | Itaú            | "4"                  |
| Python     | Bradesco        | "3"                  |

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
	"imagem": "http://urldafoto",
  "senha": "1234567890",
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

Deve ser Enviado um Json com a senha:
```json
{
	"senha": "123456789"
}
```

Deve ser retornado um Json com estes campos:

```json
{
  "nome": "Nome do cliente",
  "imagem": "http://urldafoto"
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
  "senha": "1234567890"
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

## Metodo Saque

Metodo POST:

```
http://ip:porta/numero_da_conta/saque
```

_Obs:_ O valor do saque deve ser absoluto e nunca negativo.
Deve ser enviado um Json contendo os dados necessários:

```json
{
  "senha": "1234567890",
  "valor": "123.65"
}
```

Deve retornar um json contendo a confirmação:

```json
{
	"mensagem": "Saque Realizado com sucesso"
}
```

## Metodo Depósito

Metodo POST:

```
http://ip:porta/numero_da_conta/deposito
```

_Obs:_ O valor do saque deve ser absoluto e nunca negativo.
Deve ser enviado um Json contendo os dados necessários:

```json
{
  "remetente": "Nome de pessoa que fez deposito",
  "valor": 213.54
}
```

_Recomendação:_ A mensagem pode ser guardada no extrato da seguinte maneira: "Deposito de nome_da_pessoa".

## Considerações finais

O metodo de trasferência não irá existir, pois, o frontend será encarregado de realizar o saque na conta da pessoa, que está fazendo o depósito, e depositar na conta de destino.
