# Desafio Frontend - Bootcamp Cielo 2023

Olá,

O objetivo deste sistema é **transformar um JSON**, recebido de uma API, **em valor analítico para o cliente final**.

Optou-se por desenvolver um **dashboard**, com a utilização de gráficos e cards informativos, e uma tabela que exibe todos os dados lidos da API, para possibilitar a consulta dos dados de forma integral.

Em caso de dúvidas, fique à vontade para entrar em contato: `cmsouza1998@gmail.com`
## 💡 Funcionalidades do projeto
- ✅  **API que fornece o JSON** disponibilizado no desafio
- ✅  **Dashboard** com os principais dados, possibilitando uma consulta rápida aos principais indicadores
    - Indicação da quantidade de pagamentos, total bruto, total líquido e valor médio
    - Gráfico explicitando as diferentes marcas de cartão utilizadas
    - Gráfico explicitando os diferentes canais de transação utilizados
    - Card com as 3 maiores vendas recebidas no JSON
    - Card com um resumo do status das vendas
- ✅  Disponibilização de todos os dados recebidos em forma de **tabela**, possibilitando a consulta integral aos dados recebidos da requisição 
    - Construção de uma tabela resumo, com os principais campos do JSON
    - Modal de detalhes com todos os dados recebidos na requisição

## 🛠️ Abrir e rodar o projeto

### Pré-requisitos do projeto
- Versão `18+` do Node.js
- A porta `5000` deve estar liberada para uso, pois a requisição do JSON ficará nessa porta.

### Passo a Passo
1. Certifique-se de que você tenha o Node.js instalado em seu computador;
2. Configure e inicie a API que fornecerá o JSON: `https://github.com/cmdsouza/api-bootcamp-cielo`
3. Clone este repositório em seu computador;
4. Entre no diretório e instale as dependências do projeto: `npm install`
5. Inicie o projeto: `npm run dev`
6. Abra o projeto no endereço indicado no terminal e divirta-se 😁

## 🧑‍💻 Técnicas, tecnologias e bibliotecas
O projeto foi desenvolvido com **React** e **Typescript**. Durante o desenvolvimento, também foram utilizados:
- `Vite`: utilizado para construção do projeto React;
- `MUI`: biblioteca utilizada para a interface do projeto;
- `React router DOM`: utilizado para criar rotas na aplicação;
- `Axios`: utilizado para a requisição da API;
- `Recharts`: biblioteca utilizada na criação de gráficos.
- `Jest`: biblioteca utilizada para testes unitários.

## 🖼️ Screenshots
### 1️⃣ Dashboard
![Modal de detalhes](https://i.imgur.com/OJk92bO.png)

### 2️⃣ Tabela de detalhes
![Modal de detalhes](https://i.imgur.com/q0nBKvA.png)

### 3️⃣ Modal
![Modal de detalhes](https://i.imgur.com/NLVPaiM.png)

### 4️⃣ Sidebar
![Modal de detalhes](https://i.imgur.com/PvzTy4O.png)

## ➕ Melhorias futuras
Por causa do curto tempo de desenvolvimento do projeto ou pelo tamanho do JSON de exemplo, algumas funcionalidades não foram desenvolvidas, mas poderão ser inclusas no projeto futuramente. Alguns exemplos são:
- Inclusão de gráficos de linha nos cards de informação, mostrando a evolução do dado ao longo do tempo;
- Refatoração de partes do código para melhor componetização dos elementos; 
- Inclusão de filtros de dados (por data, texto, etc.).
## 😃 Obrigado!
Agredeço a oportunidade de participar do bootcamp e poder desenvolver esse projeto! Foram duas semanas de muitos desafios e de muita aprendizagem. Com certeza levarei essa experiência para a vida!
## 👦 Autor

Desenvolvido por [@cmdsouza](https://github.com/cmdsouza)
