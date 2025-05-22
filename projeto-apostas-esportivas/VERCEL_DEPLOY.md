# Instruções para Deploy na Vercel

Este documento contém instruções detalhadas para realizar o deploy da Plataforma de Visualização de Apostas Esportivas na Vercel.

## Pré-requisitos

1. Uma conta na [Vercel](https://vercel.com)
2. Acesso ao código-fonte do projeto
3. Conta no GitHub (opcional, para integração contínua)

## Passos para Deploy

### 1. Preparação do Projeto

O projeto já está configurado para deploy na Vercel, com as seguintes características:

- Estrutura Next.js App Router
- Diretivas 'use client' nos componentes que utilizam hooks
- Build otimizado para produção
- Variáveis de ambiente configuradas

### 2. Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente na Vercel:

```
GITHUB_ID=seu_github_client_id
GITHUB_SECRET=seu_github_client_secret
NEXTAUTH_SECRET=uma_string_secreta_para_sessoes
NEXTAUTH_URL=https://seu-dominio-na-vercel.vercel.app
API_KEY=sua_chave_da_the_odds_api
```

### 3. Deploy via Dashboard da Vercel

1. Faça login na [Vercel](https://vercel.com)
2. Clique em "New Project"
3. Importe o repositório do GitHub (se disponível) ou faça upload do código
4. Configure as variáveis de ambiente mencionadas acima
5. Clique em "Deploy"

### 4. Deploy via CLI da Vercel

Alternativamente, você pode usar a CLI da Vercel:

```bash
# Instalar a CLI da Vercel
npm install -g vercel

# Login na Vercel
vercel login

# Deploy do projeto (na raiz do projeto)
vercel

# Para ambiente de produção
vercel --prod
```

### 5. Configurações Adicionais

- **Domínio Personalizado**: Na dashboard da Vercel, vá para "Settings" > "Domains" para configurar um domínio personalizado
- **Integrações**: Configure integrações com serviços de análise, monitoramento ou CMS na seção "Integrations"
- **Equipe**: Adicione membros da equipe para colaboração em "Team"

### 6. Verificação Pós-Deploy

Após o deploy, verifique:

- Funcionalidade de autenticação com GitHub
- Integração com The Odds API
- Responsividade em dispositivos móveis
- Performance geral da aplicação

## Manutenção e Updates

Para atualizações futuras:

1. Se integrado com GitHub, basta fazer push para o branch principal
2. Se usando upload manual, repita o processo de deploy com o código atualizado
3. A Vercel mantém histórico de deploys, permitindo rollback se necessário

## Suporte

Para suporte adicional:

- Documentação da Vercel: [https://vercel.com/docs](https://vercel.com/docs)
- Documentação do Next.js: [https://nextjs.org/docs](https://nextjs.org/docs)
