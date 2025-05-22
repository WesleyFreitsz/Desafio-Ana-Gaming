# Plataforma de Visualização de Apostas Esportivas

## Descrição do Desafio 📰
O objetivo deste desafio é desenvolver uma Plataforma de Visualização de Apostas Esportivas. A aplicação terá uma interface interativa e organizada, com foco em UX/UI para facilitar a navegação do usuário.

## Objetivo da Aplicação
A aplicação deve permitir que os usuários visualizem apostas esportivas online, filtrar por ligas específicas e também explorar odds específicas.

## Estrutura de Páginas
| Rota | Propósito | Principais Funcionalidades |
|------|-----------|----------------------------|
| / Home (Dashboard) | Visão geral rápida | • Destaque de categorias de esportes<br>• Jogos recentes, próximos e melhores odds<br>• Acesso rápido às categorias favoritas |
| /sports Esportes | Navegação por esporte | • Lista de esportes (Futebol, Basquete, Tênis…)<br>• Filtro e busca por esporte<br>• Seleção de um esporte leva às ligas correspondentes |
| /sports/<sport> Ligas | Detalhe do esporte | • Lista de ligas daquele esporte<br>• Jogos recentes e futuros por liga<br>• Link para detalhes de cada partida |
| /match/<id> Odd Detalhada | Informações completas da partida | • Times/atletas, data e hora<br>• Todas as odds disponíveis<br>• Estatísticas adicionais (se existir na API) |

## Deploy
- **Repositório Público**: A aplicação deverá estar em um repositório público no GitHub ou outra plataforma de versionamento.
- **Vercel**: Realizar o deploy da aplicação na plataforma Vercel.

## Requisitos Técnicos 😁
### Ferramentas e Tecnologias Obrigatórias
- ReactJS ou Next.js para desenvolver a aplicação.
- Hooks do React: Extensivo uso de hooks como useState, useMemo, useRef, useEffect, useContext, useCallback, entre outros.
- Gerenciamento de Estado: Utilização da Context API ou uma biblioteca adicional para controle de dados.
- API Fetch: Consumo de dados externos utilizando a Web Fetch API para consultas dinâmicas.
- Componentização: Boas práticas na criação e separação de Client e Server Components.

## Diferenciais 💖
- TypeScript: tipagem estática em todo o projeto.
- Estilização: uso de Tailwind CSS ou Styled Components.
- Testes automatizados para os componentes principais.
- Configuração de ESLint e Prettier para padronização de código.
- Otimização de SEO para melhorar a indexação e o desempenho nos buscadores.

## Desafio Extra 🏹
Implementar autenticação via OAuth do GitHub, adicionando um middleware que permita o acesso apenas a usuários autenticados.

## Critérios de Avaliação 📊
- Implementação correta da visualização de jogos e odd's.
- Clareza e organização da estrutura de código e arquitetura.
- Integração correta com a API para exibição de dados.
- Boa usabilidade e organização da interface do usuário.
- Criatividade e soluções adicionais que agreguem valor.

## Referências de interfaces 👁️
- https://oddsscanner.com/br/
- https://oddspedia.com/br/odds
- https://www.oddsview.com/odds

## Sugestões de API's 🍽️
- https://sportsbookapi.com/sportsbooks/
- https://rapidapi.com/collection/sports-odds-betting-apis
- https://the-odds-api.com/
