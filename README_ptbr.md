# Tomato-X - idioma: português br
## Filosofia
Tomato-X é uma estrutura experimental de backend Node.js focada na configuração em vez de código.

Em vez de escrever manualmente rotas, controladores e código de colagem repetitivo, você descreve sua API usando arquivos JSON e estrutura de pastas, e a estrutura faz o resto.

O objetivo não é substituir as estruturas existentes, mas explorar uma maneira diferente de construir backends: mais declarativos, mais modulares e mais reutilizáveis.

## Como funciona
O Tomato-X é construído em torno de três ideias principais:

- Core: lê pastas e arquivos JSON e os transforma em uma API em execução
- Distros: módulos plugáveis que adicionam comportamento e recursos
- API orientada por estrutura: o sistema de arquivos define o que existe
- Seu projeto se torna uma composição de configurações e distros, não uma lógica dispersa.

Núcleo (JSONs + pastas)
O Core verifica a estrutura do seu projeto e a interpreta como uma definição de API.

Uma pasta simples pode descrever:

recursos
entidades
DTOs
operações expostas
Sem rotas explícitas. Sem controladores manuscritos.

# Distros
Distros são módulos reutilizáveis que estendem o Tomato-X.

Uma distro pode:

adicionar suporte a banco de dados
gerar controladores
definir regras de roteamento
introduzir tipos de dados personalizados
Tudo o que é comum em todos os projetos pode se tornar uma distro.

Isso torna os recursos portáteis e reutilizáveis, em vez de fortemente acoplados a uma base de código.

Reutilização primeiro
No Tomato-X, quase tudo pode ser reutilizado:

tipos de dados
lógica de banco de dados
padrões de rota
comportamentos comuns
Os projetos não são reescritos. Eles estão montados.

## Quando faz sentido
projetos pequenos a médios
desenvolvedores cansados de clichês
sistemas orientados por configuração
experimentos arquitetônicos
## Quando não o faz
fluxos de solicitação altamente personalizados
lógica por rota muito específica
casos que exigem controle manual completo
## Status
Este projeto é experimental e está em evolução.

Ideias, feedback e contribuições são bem-vindos.

Se o conceito ressoa com você, uma estrela ajuda ⭐
