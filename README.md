# Painel Spinning

Painel pessoal da bicicleta Gallant Connect Max e da cinta cardíaca, via Bluetooth. Funciona como app instalado no Android (PWA).

## Arquivos
- `index.html`: o painel
- `manifest.webmanifest`: nome, cores e ícones do app
- `sw.js`: deixa o app abrir sem internet
- `icons/`: ícones do app

## Publicar no GitHub Pages
1. No GitHub, crie um repositório novo (por exemplo `spinning`), público.
2. Envie todos os arquivos desta pasta para a raiz do repositório (Add file > Upload files).
3. Vá em Settings > Pages. Em "Build and deployment", escolha "Deploy from a branch", branch `main`, pasta `/ (root)`, e salve.
4. Espere cerca de 1 minuto. O endereço será `https://SEU-USUARIO.github.io/spinning/`.

## Instalar no celular
1. Abra o endereço no Chrome do Android.
2. Toque nos três pontinhos e em "Instalar app" (ou "Adicionar à tela inicial").
3. Abra pelo ícone novo.

## Atualizar depois
1. Substitua o arquivo alterado no repositório.
2. Se mudou `index.html`, `manifest.webmanifest` ou os ícones, edite `sw.js` e aumente o número em `VERSAO` (`spinning-v2`, `spinning-v3`...).
3. Abra o app com internet. A versão nova entra na abertura seguinte.

## Observações
- O histórico de treinos fica guardado só no celular, no armazenamento do app.
- Exporte o TCX dos treinos importantes. Limpar os dados do app apaga o histórico.
