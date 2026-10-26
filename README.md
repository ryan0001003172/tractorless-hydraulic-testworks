# Tractorless Hydraulic Testworks

Você é um desenvolvedor front-end sênior e designer web. Crie um site institucional

completo, moderno e responsivo para a empresa **HidroTech**, especializada em

bancadas de teste para sistemas hidráulicos fechados de implementos agrícolas.

## Sobre a empresa

- Nome: HidroTech

- Segmento: desenvolvimento e aprimoramento de bancadas de ensaio hidráulico para

  implementos agrícolas, que dispensam o uso de trator como fonte de acionamento.

- Slogan sugerido: "Tecnologia que move a água" ou "Ensaios hidráulicos sem trator"

- Público-alvo: fabricantes e oficinas de implementos agrícolas, centros de ensaio,

  instituições de ensino técnico.

- Cidade/região de atuação: [preencher]

- Contexto (opcional, use no "Sobre" ou no rodapé): projeto desenvolvido no âmbito do

  Projeto Integrador 2026/02, Escola SENAI Engº Octávio Marcondes Ferraz (SP).

  [EXEMPLO: confirme se esta menção deve aparecer]

## O problema e a solução (base para os textos do site)

Hoje, os testes de sistemas hidráulicos de implementos podem depender de um trator

para fornecer potência e rotação. Isso gera custo de combustível, manutenção,

desgaste de componentes e depende da disponibilidade da máquina.

A HidroTech propõe uma bancada própria de ensaios, em ambiente controlado, com:

- controle de pressão, vazão e rotação;

- mais segurança e repetibilidade dos ensaios;

- menor custo de implantação e operação;

- dimensionamento adequado às condições reais dos testes, sem o

  superdimensionamento da proposta inicial;

- base para automação futura e monitoramento de pressão, temperatura, vazão e rotação.

## Dados técnicos de referência (usar com precisão, sem inventar outros)

- Bomba hidráulica: L2F160, deslocamento de 160 cm³/volta.

- Acionamento: motor elétrico com transmissão mecânica (redução de velocidade).

- Vazão: aproximadamente 150 L/min.

- Pressão: até 150 bar, para os testes estáticos previstos.

- Motores hidráulicos: 2 unidades de cerca de 250 cm³/volta, com cerca de 300 rpm.

- Vazão por motor: cerca de 75 L/min (total de 150 L/min).

- Escopo do projeto: motor elétrico, redução, acoplamentos, eixo, mancais, sistema

  hidráulico, controle de rotação por inversor de frequência, proteção elétrica e

  dispositivos de segurança.

- Não invente certificações, normas, preços, prazos, clientes ou resultados de ensaio.

  O que não estiver acima deve ser marcado com [EXEMPLO].

## Identidade visual

- Se houver imagem de referência anexa, extraia dela a paleta e reproduza o logo

  fielmente no cabeçalho e no rodapé. Se for foto de produto ou local, use-a como

  imagem principal do hero.

- Estilo: ficha técnica e desenho de engenharia hidráulica. Evite o visual genérico de

  site de template (cards arredondados iguais, degradê azul/roxo, ícones em círculo,

  tudo centralizado).

- Hero com um esquema de princípio animado da bancada: reservatório, filtro, motor

  elétrico, bomba L2F160, válvula de alívio, dois motores hidráulicos, manômetros e

  medidor de vazão, com tags de equipamento (B-101, M-201 etc.) e um carimbo de

  desenho no canto.

- Tipografia: uma fonte condensada industrial para títulos, uma sans legível para o

  texto e uma mono para tags e valores técnicos.

- Modo claro (papel de prancheta com grade sutil) e modo escuro (cianótipo, azul de

  planta). Um único acento forte (laranja) usado com parcimônia.

## Estrutura (página única com navegação por âncoras)

1. Cabeçalho fixo: logo, menu (Início, Sobre, Serviços, Diferenciais, Galeria,

   Depoimentos, Contato), alternador de tema e botão "Solicite um orçamento".

2. Hero: título forte, subtítulo sobre ensaios sem trator, botões (orçamento e

   WhatsApp), esquema da bancada e faixa de fatos (atendimento, visita técnica,

   orçamento por escrito, garantia).

3. Sobre nós: o problema, a proposta, missão, visão e valores.

4. Serviços em tabela de tags, com título, descrição e aplicações:

   - Bancada de teste completa para sistema hidráulico fechado;

   - Acionamento: motor elétrico, redução, acoplamentos, eixo e mancais;

   - Sistema hidráulico: bomba, válvulas, filtros e reservatório;

   - Controle de rotação por inversor de frequência;

   - Proteção elétrica e dispositivos de segurança;

   - Instrumentação e monitoramento de pressão, temperatura, vazão e rotação.

5. Calculadora "Dimensionamento rápido da bancada", com manômetro animado:

   - Entradas (sliders): vazão (L/min), pressão (bar), deslocamento da bomba

     (cm³/volta), deslocamento do motor hidráulico (cm³/volta), número de motores

     e rendimento. Valores iniciais: 150 L/min, 150 bar, 160, 250, 2 motores.

   - Saídas: rotação teórica da bomba = Q×1000 ÷ deslocamento (rpm); vazão por

     motor; rotação de cada motor = (Q ÷ nº de motores)×1000 ÷ deslocamento (rpm);

     potência hidráulica (kW) = pressão(bar) × Q(L/min) ÷ 600; potência no eixo

     estimada = potência hidráulica ÷ rendimento (com conversão para cv).

   - Aviso visível: estimativa teórica, sem perdas por rendimento volumétrico e de

     tubulação; o dimensionamento final exige projeto.

6. Diferenciais: redução de custo (sem combustível e desgaste de trator), segurança,

   repetibilidade dos ensaios, controle preciso e preparo para automação. Números

   de destaque como [EXEMPLO].

7. Galeria: molduras de desenho numeradas (Fig. 1, Fig. 2...) prontas para receber

   fotos e desenhos da bancada.

8. Depoimentos: carrossel com 3 exemplos marcados como fictícios.

9. Perguntas frequentes (acordeão), incluindo: "Preciso de um trator para testar?",

   "Quais variáveis posso controlar?", "A bancada aceita monitoramento

   e automação?", "Como funciona o orçamento?".

10. Contato: formulário (nome, e-mail, telefone, mensagem), telefone, e-mail,

    endereço, link para o mapa e botão flutuante de WhatsApp.

11. Rodapé: logo, links, redes sociais, direitos autorais.

## Requisitos técnicos

- HTML5, CSS3 e JavaScript puro, em um arquivo autocontido ou em index.html,

  css/style.css e js/main.js.

- Mobile-first e totalmente responsivo; sem rolagem horizontal no celular.

- Menu hambúrguer no celular, rolagem suave, animações discretas, respeitando

  prefers-reduced-motion.

- SEO básico: title, meta description, Open Graph, textos alternativos, hierarquia

  correta de títulos.

- Acessibilidade: bom contraste, navegação por teclado, labels nos formulários.

- Formulário validado no navegador. Se não houver serviço de envio, avise na própria

  página que é demonstração e nunca diga que a mensagem foi enviada.

## Conteúdo

- Todos os textos em português do Brasil, tom técnico e direto, sem exageros.

- Marque com [EXEMPLO] tudo o que for dado fictício, para eu substituir.

## Entrega

- Código completo e funcionando, pronto para abrir no navegador.

- Ao final, liste em poucas linhas o que preciso personalizar (contatos, redes,

  textos, fotos, números e depoimentos).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/99fb3bbd-de9d-50bd-938c-1a540345180a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
