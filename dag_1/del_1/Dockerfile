# Bruker et lite Node 20-image for å bygge appen
FROM node:20-alpine AS build

# Setter arbeidskatalogen til /app inne i containeren
WORKDIR /app

# Kopierer kun package.json og package-lock.json først (for å utnytte cache)
COPY package*.json ./

# Installerer avhengigheter (npm install)
RUN npm install

# Kopierer resten av prosjektfilene inn i containeren
COPY . .

# Bygger React-applikasjonen (lager produksjonsklare filer i /app/build)
RUN npm run build

# Starter et nytt, rent Node 20-image for produksjon
FROM node:20-alpine AS prod

# Setter arbeidskatalogen til /app
WORKDIR /app

# Installerer "serve" som kan servere statiske filer
RUN npm install -g serve

# Kopierer de ferdigbygde filene fra build-steget over til produksjonscontaineren
COPY --from=build /app/build ./build

# Åpner port 3000 i containeren (slik at vi kan nå appen utenfra)
EXPOSE 3000

# Starter serveren som viser React-appen på port 3000
CMD ["serve", "-s", "build", "-l", "3000"]