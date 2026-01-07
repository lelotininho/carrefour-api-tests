# Testes Automatizados da API de Usuários

## 1. Contexto
Este projeto contém uma suíte de testes automatizados para a API [Serverest](https://serverest.dev/#/), que simula operações de gerenciamento de usuários.  
A API expõe endpoints RESTful para criação, leitura, atualização e exclusão de usuários.

Endpoints cobertos:
- GET /usuarios → lista todos os usuários
- POST /usuarios → cria um novo usuário
- GET /usuarios/{id} → retorna detalhes de um usuário específico
- PUT /usuarios/{id} → atualiza informações de um usuário
- DELETE /usuarios/{id} → exclui um usuário

## 2. Requisitos
- Autenticação via token JWT
- Limite de taxa: 100 requisições por minuto
- Criação de usuário exige os campos obrigatórios:
  - nome (string)
  - email (string)
  - password (string)
  - administrador (string: "true" ou "false")

## 3. Configuração do Ambiente
### Pré-requisitos
- Node.js >= 18
- NPM >= 8

### Instalação
```bash
git clone https://github.com/seu-usuario/carrefour-api-tests.git
cd carrefour-api-tests
npm install

## 4. Execução dos Testes 

### Rodar todos os testes: 
npm test 

### Gerar relatório de cobertura: 
npm test -- --coverage 
O relatório em HTML será gerado na pasta coverage/. 

### Executar por nome do teste: 
npx jest -t "sem token" 

### Executar por diretório: 
npx jest src/tests/users 

## 5. Casos de Teste Cobertos
###GET /usuarios

Lista usuários com token válido
Nega acesso sem token (401/403)
Valida rate limit (100 req/min)

### POST /usuarios

Criação com dados válidos (201)
Falha com payload inválido (400)
Falha ao criar email duplicado (400/409)
Cenário sem token (401/403 ou 201 dependendo da versão da API)

### GET /usuarios/{id}

Retorna detalhes de usuário existente (200)
Retorna erro para ID inexistente (400/404)

### PUT /usuarios/{id}

Atualiza usuário com payload válido (200)
Falha com payload inválido (400)
Nega sem token (401/403)

### DELETE /usuarios/{id}

Exclui usuário existente (200/204)
Retorna erro para ID inexistente (200/404)
Cenário sem token (401/403 ou 200/204 dependendo da versão da API)

## 6. Integração CI/CD
Este projeto possui pipeline configurada com GitHub Actions para rodar os testes automaticamente a cada commit ou pull request.
O workflow está definido em .github/workflows/tests.yml e executa:

Instalação das dependências
Execução dos testes com Jest
Geração de relatório de cobertura como artefato

## 7. Entrega
Código fonte completo disponível neste repositório
Documentação de ambiente e execução neste README
Pipeline CI/CD ativa com relatório de testes