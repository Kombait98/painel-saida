
# 🏫 Sistema de Saída Escolar

Uma aplicação web desenvolvida para agilizar, organizar e modernizar o processo de saída de alunos em escolas. O sistema conecta a portaria às salas de aula, permitindo que o porteiro chame os alunos e os professores respondam em tempo real.

## ✨ Funcionalidades

- **Painel da Portaria (Mobile First):** Visão agrupada por turmas (formato sanfona). Permite chamar o aluno, chamar novamente e confirmar a entrega ao responsável.
- **Painel da Sala de Aula (Desktop/Tablet):** Alertas visuais automáticos das turmas que possuem alunos solicitados. Permite ao professor responder se o aluno "Já saiu" ou se está "Se arrumando".
- **Comunicação de Status:** Fluxo completo de status (`sala` ➔ `chamado` ➔ `se_arrumando` ➔ `a_caminho` ➔ `entregue`).

## 🛠️ Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** (App Router) - Framework React
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização da interface
- **JavaScript** - Lógica da aplicação
- **Node.js (Next API Routes)** - Mock de API para simulação de banco de dados

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 1. Instalação
Clone o repositório e instale as dependências:

```bash
# Clone este repositório
git clone [https://github.com/SEU_USUARIO/sistema-saida-escolar.git](https://github.com/SEU_USUARIO/sistema-saida-escolar.git)

# Acesse a pasta do projeto
cd sistema-saida-escolar

# Instale as dependências
npm install



### 2. Executando Localmente (Apenas no seu PC)

Se deseja apenas ver rodando no navegador do seu computador:

```bash
npm run dev

```

Acesse: [http://localhost:3000](http://localhost:3000?utm_source=gemini)

### 3. Executando na Rede Local (Para testar no Celular/Tablet)

Para acessar o painel do porteiro pelo seu celular, o servidor precisa ser exposto na sua rede Wi-Fi:

```bash
npm run dev -- -H 0.0.0.0

```

> **⚠️ Atenção (Erro Blocked cross-origin):**
> As versões mais recentes do Next.js bloqueiam o acesso de outros IPs por segurança. Se você tentar acessar pelo celular (ex: `http://192.168.1.10:3000`) e os dados não carregarem, adicione o IP do seu celular no arquivo `next.config.mjs`:
> ```javascript
> /** @type {import('next').NextConfig} */
> const nextConfig = {
>   allowedDevOrigins: ['SEU_IP_AQUI'], // Ex: '192.168.1.10'
> };
> export default nextConfig;
> 
> ```
> 
> 
> Após isso, reinicie o servidor.

---

## 🏗️ Estrutura do Projeto

* `/src/app/api/alunos` - Rota da API que simula o banco de dados.
* `/src/app/portaria` - Interface dedicada ao porteiro.
* `/src/app/sala` - Interface dedicada ao professor em sala de aula.
* `/src/app/page.js` - Menu inicial de navegação.

## 🔮 Próximos Passos (Evolução para Produção)

Para implementar este sistema em um ambiente escolar real, recomenda-se:

1. Substituir o banco de dados em memória por um SGBD real (PostgreSQL, MySQL, etc).
2. Substituir as requisições em intervalo (*Short Polling*) por **WebSockets** (ex: Socket.io) ou **Server-Sent Events (SSE)** para comunicação instantânea e menor consumo de rede.
3. Adicionar um sistema de Autenticação (Login) para professores e porteiros.

```

Não se esqueça de editar o link `[https://github.com/SEU_USUARIO/sistema-saida-escolar.git](https://github.com/SEU_USUARIO/sistema-saida-escolar.git)` no passo de instalação, colocando o link real do seu repositório no GitHub!

```