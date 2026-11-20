# Ivani Mello Studio de Beleza

Sistema web desenvolvido para auxiliar no gerenciamento do Ivani Mello Studio de Beleza, facilitando a organização dos clientes, procedimentos, produtos e agendamentos do salão.

O projeto foi desenvolvido com o objetivo de substituir a agenda de papel utilizada atualmente, permitindo que as informações sejam cadastradas, consultadas e organizadas de maneira mais prática.

## Sobre o projeto

O sistema possui duas partes principais:

- **Área pública:** apresenta o salão, seus trabalhos, serviços, informações de contato e localização. Os visitantes podem entrar em contato diretamente pelo WhatsApp ou Instagram.
- **Área administrativa:** ambiente restrito à administradora, onde é possível gerenciar os clientes, procedimentos, produtos e agendamentos.

O sistema não possui cadastro de clientes nem agendamento público. Todos os registros são realizados diretamente pela administradora após efetuar o login.

## Funcionalidades

### Área pública

- Apresentação do salão e de seus serviços.
- Galeria de trabalhos realizados.
- Informações sobre a profissional e o studio.
- Informações de contato.
- Acesso ao WhatsApp e Instagram.
- Mapa com a localização do salão.
- Acesso à tela de login administrativo.

### Área administrativa

- **Dashboard:** apresenta um resumo das informações do salão, incluindo quantidade de clientes, procedimentos, produtos e agendamentos do dia.
- **Clientes:** permite cadastrar, consultar, editar e excluir clientes.
- **Procedimentos:** permite cadastrar e gerenciar os serviços oferecidos pelo salão, incluindo informações como nome, descrição, preço e duração.
- **Produtos:** permite cadastrar e gerenciar os produtos utilizados ou comercializados pelo salão.
- **Agenda:** permite criar, consultar, atualizar e excluir agendamentos, relacionando cada atendimento a um cliente e a um procedimento.
- **Autenticação:** acesso restrito por login e senha, permitindo somente a entrada da administradora.

## Tecnologias utilizadas

### Frontend

| Tecnologia | Utilização |
|---|---|
| Next.js | Framework utilizado para desenvolver a aplicação web e organizar as páginas e rotas. |
| React | Biblioteca utilizada para construir a interface através de componentes. |
| TypeScript | Adiciona tipagem ao JavaScript, ajudando a evitar erros durante o desenvolvimento. |
| Bootstrap | Utilizado para auxiliar na construção dos layouts e na responsividade das telas. |
| CSS | Utilizado para personalizar o visual da aplicação. |

### Backend

| Tecnologia | Utilização |
|---|---|
| NestJS | Framework utilizado para desenvolver a API e organizar as funcionalidades do servidor. |
| TypeScript | Linguagem utilizada no desenvolvimento do backend. |
| Prisma ORM | Responsável pela comunicação entre a aplicação e o banco de dados. |
| SQLite | Banco de dados utilizado para armazenar as informações do sistema. |
| JWT | Utilizado para autenticação e controle de acesso às rotas protegidas. |
| bcryptjs | Utilizado para comparar senhas com seus respectivos hashes. |

## Banco de dados

O banco de dados utilizado é o SQLite, com o Prisma ORM para realizar as operações de consulta, cadastro, atualização e exclusão de informações.

As principais entidades do sistema são:

- **User:** armazena os dados de acesso da administradora, como nome, e-mail, senha e perfil de acesso.
- **Cliente:** armazena os dados dos clientes do salão, como nome, telefone, e-mail e observações.
- **Produto:** armazena os produtos cadastrados, incluindo nome, descrição, preço e quantidade em estoque.
- **Procedimento:** armazena os serviços oferecidos pelo salão, incluindo nome, descrição, preço e duração.
- **Agendamento:** registra os atendimentos, relacionando o cliente, o procedimento, a data, o horário, o status e as observações.

O relacionamento entre as entidades permite que cada agendamento esteja associado a um cliente e a um procedimento.

## Funcionamento da autenticação

A autenticação é realizada através de e-mail e senha.

O funcionamento ocorre da seguinte maneira:

1. A administradora acessa a tela de login.
2. Informa seu e-mail e senha.
3. O backend verifica se o usuário existe e valida a senha utilizando o bcryptjs.
4. Caso as credenciais estejam corretas e o usuário possua o perfil de administrador, o sistema gera um token JWT.
5. O frontend utiliza esse token nas requisições à API.
6. O backend verifica o token e as permissões antes de permitir o acesso às funcionalidades protegidas.

O sistema utiliza controle de acesso por perfil, garantindo que somente usuários com a permissão `ADMIN` possam acessar as funcionalidades administrativas.

Não existe cadastro público de usuários.

## Organização do projeto

O projeto é dividido em duas aplicações: frontend e backend.

### Frontend

Desenvolvido com Next.js, possui a seguinte organização geral:

- `app/`: contém as páginas e rotas da aplicação.
- `app/admin/`: contém as páginas da área administrativa.
- `app/login/`: contém a tela de autenticação.
- `app/components/`: contém componentes reutilizáveis.
- `public/assets/`: armazena imagens, logotipo e outros arquivos utilizados no site.

### Backend

Desenvolvido com NestJS, possui uma organização baseada em módulos:

- `src/auth/`: responsável pela autenticação, geração e validação dos tokens e controle de permissões.
- `src/clientes/`: responsável pelo gerenciamento dos clientes.
- `src/produtos/`: responsável pelo gerenciamento dos produtos.
- `src/procedimentos/`: responsável pelo gerenciamento dos procedimentos.
- `src/agendamentos/`: responsável pelo gerenciamento dos agendamentos.
- `src/users/`: responsável pelas operações relacionadas aos usuários.
- `src/database/`: contém a configuração e o serviço de acesso ao banco de dados.
- `src/dtos/`: contém os objetos utilizados para validar e organizar os dados recebidos pela API.

## Comunicação entre frontend e backend

O frontend realiza requisições HTTP para a API desenvolvida com NestJS.

O backend recebe as requisições, verifica os dados recebidos, executa as operações necessárias utilizando o Prisma e retorna as informações ao frontend.

Durante o desenvolvimento, os endereços utilizados são:

- **Frontend:** `http://localhost:3001`
- **Backend:** `http://localhost:3000`
- **API:** `http://localhost:3000/api`

As rotas da API são organizadas por funcionalidades, como clientes, produtos, procedimentos, agendamentos e autenticação.

## Como executar o projeto

Para executar o sistema localmente, é necessário ter instalado:

- Node.js
- npm
- Git

### 1. Backend

Entre na pasta do backend e instale as dependências:

```bash
npm install
```

Gere o cliente do Prisma:

```bash
npx prisma generate
```

Caso esteja configurando o banco de dados pela primeira vez, execute as migrations:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run start:dev
```

O backend ficará disponível em:

`http://localhost:3000`

### 2. Frontend

Entre na pasta do frontend e instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

O frontend ficará disponível na porta configurada para a aplicação, atualmente `3001`.

**Observação:** as configurações de conexão com o banco de dados e a chave utilizada pelo JWT devem estar definidas no arquivo de variáveis de ambiente do backend, conforme a configuração do projeto.

## Objetivo final

O objetivo do Ivani Mello Studio de Beleza é facilitar a administração do salão, centralizando as informações em um único sistema.

Com isso, a administradora consegue manter os dados dos clientes organizados, acompanhar os procedimentos, controlar os produtos e consultar os horários dos atendimentos, tornando a rotina do salão mais prática e organizada.

---

**Projeto desenvolvido como parte de um trabalho acadêmico.**