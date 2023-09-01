# Delivery App - Birita Go

Essa é uma implementação de uma aplicação fullstack, com uso de React, Node.js com Express.js, e banco de dados MySQL. </br>É um aplicativo de delivery de bebidas que contempla 3 fluxos de uso: fluxo do cliente, do vendedor e do administrador; contando com diversas funcionalidades.

A aplicação foi construída com a arquitetura MSC (model-service-controller) e foi Dockerizada.</br>
Tudo isso com validações e testes pensados para os casos de uso da aplicação, garantindo a qualidade e integridade do código.

O foco dessa projeto foi praticar a construção de uma aplicação fullstack completa robusta, construindo e integrando front e back-end.

## Funcionalidades
- Cadastro e login na plataforma
- Redirecionamento no aplicativo de acordo com as credenciais de login (cliente, vendedor ou administrador)
- Validação de token para qualquer operação da aplicação
- Consulta de produtos disponíveis e adição ao carrinho
- Checagem do pedido e remoção de itens do carrinho
- Consulta de vendedores disponíveis e finalização de uma venda
- Consulta de pedidos e seus detalhes
- Acompanhamento e alteração do status do pedido
- Armazenamento dos dados das operações no LocalStorage
- Logout da plataforma
- Registro de novos vendedores pelo administrador
- Consulta e remoção de usuários do sistema pelo administrador

## Documentação

A documentação completa da API, com todas as operações possíveis, pode ser consultada na [aqui :)](https://delivery-app-back-b4w6.onrender.com/swagger/)
![](swagger-store.png)


## Instalação e execução local

Para rodar esta aplicação é necessário ter o Docker e o Docker Compose (v1.29 ou superior) instalados em sua máquina.

1. Clone o repositório e entre no diretório
```bash
  git clone git@github.com:lzaghi/react-sql-delivery-app.git
  cd react-sql-delivery-app
```

2. Instale as dependências 
```bash
  npm install
```

3. Suba os containeres do front, back e banco de dados
```bash
  docker-compose up -d --build
```

A aplicação já estará rodando! :)</br>
Acesse ```http://localhost:3000``` para a experiência de usuário. O back-end estará rodando em ```http://localhost:3001```.

## Tecnologias utilizadas

React.js, Node.js, Express.js, MySQL, Docker, JWT, RTL, Mocha, Chai, Sinon, Arquitetura MSC, API RESTful, Swagger

O deploy foi feito nas plataformas PlanetScale (banco de dados), Render (back-end) e Vercel (front-end)
<!--
## Qualidade de Código

Análise SonarCloud

![](sonarcloud.png)
-->
