### PEDROFLIX
Projeto criado para colocar em prática alguns estudos realizados e para crescimento pessoal.
Trata-se de uma plataforma de streaming totalmente funcional (ainda em desenvolvimento).

Deploy disponível em: [Pedroflix](https://pedroflix-five.vercel.app/)

# INSTALAÇÃO
Para rodar o projeto em ambiente local, será necessário:
Rodar o comando "npm i" - instala as dependências necessárias do projeto.
Utilize "npm run dev" para iniciar o projeto localmente.
Para configurar seu banco de dados crie o arquivo .env e utilize as variáveis de ambiente:
MYSQLHOST=*Nome do host.
MYSQLPASSWORD=*Senha do banco
MYSQLUSER=*Usuário
MYSQLDATABASE=*Nome da database
MYSQLPORT=*Porta do Banco de dados
NEXT_PUBLIC_BACKEND_URL=*URL do banco de dados
SECRET=*segredo para maior segurança dos tokens

# TECNOLOGIAS
- [x] Next.js
- [x] Express
- [x] Typescript
- [x] MySQL
- [X] Utilizar armazenamento na nuvem
- [x] JWT+COOKIES - para validação de login

Futuras tecnologias:

- [] Bcrypt Hash - para encriptação de senha
- [] Implantação de cards e player
- [] Testes Unitários