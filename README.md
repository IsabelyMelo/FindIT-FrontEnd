# FindIT UEMG – Front-End

O **FindIT UEMG** é o front-end de um sistema acadêmico para gerenciamento de **Achados e Perdidos** da Universidade do Estado de Minas Gerais (UEMG).  
Este repositório contém exclusivamente a interface e a navegação do sistema, desenvolvidas em **React 18**, com foco em usabilidade, organização visual e fluxo básico de interação do usuário.  


## Objetivo do Projeto
Fornecer uma interface funcional para que usuários possam navegar entre as páginas de login, cadastro, home e consulta de itens encontrados, simulando o funcionamento de um sistema real de achados e perdidos.

## Funcionalidades Principais (Front-End)

Como este repositório inclui apenas o front-end, as funcionalidades abaixo estão implementadas de forma **visual e simulada**, sem lógica de persistência:

- **Login:** formulário para acesso ao sistema.
- **Cadastro:** criação de conta com validação básica.
- **Home:** apresentação do sistema e navegação para as demais páginas.
- **Últimos Itens Encontrados:** cards e filtros que simulam busca e visualização de itens.
- **Footer:** informações de contato fixas em todas as páginas.

## Páginas do Sistema

### **1. Login**
Formulário com e-mail e senha, botão para entrar e link para cadastro. Layout centralizado e minimalista.

### **2. Cadastro**
Formulário com nome, e-mail, confirmação, senha e opção de administrador. Redireciona ao login após o registro.

### **3. Home**
Página principal após login, com chamada para ação (“Procurar agora”), imagem ilustrativa e menu superior com navegação.

### **4. Últimos Itens Encontrados**
Página extensa com listagem de cards, filtros, busca e ordenação. Permite rolagem completa e apresenta itens em diferentes categorias.

### **5. Footer**
Rodapé presente em todas as telas, com informações de contato institucional.

---

## Tecnologias Utilizadas

### **Front-End**
- React 18  
- React DOM  
- React Router DOM 6  

### **Ferramentas de Build**
- Vite  
- Esbuild  
- Rollup  

### **Desenvolvimento**
- TypeScript  
- ESLint  
- Babel  
- npm (package-lock.json)



## Como Executar o Projeto

1. Instale as dependências:
   ```
   npm install
   ```
2. Execute o ambiente de desenvolvimento:
   ```
   npm run dev
   ```
3. Acesse no navegador:
   ```
   http://localhost:5173/
   ```



## Status do Projeto
Em desenvolvimento 



## Desenvolvedores
Caio Cezar Dias \
Isabely Toledo de Melo \
Rafael Batista Alves \
Thaissa Fernandes Silva 

