# Del 1 - Bygge image og kjøre container lokalt

## Prepping

Først av alt må vi sørge for at vi har de avhengighetene vi trenger.

- Installer [Docker Desktop](https://docs.docker.com/engine/install/), [Podman](https://podman.io/getting-started/installation) eller noe annet lignende.
- installer Azure CLI. https://learn.microsoft.com/en-us/cli/azure/install-azure-cli eller `brew install azure-cli` på Mac.

## Hva er images og containers?

Containere opprettes fra det Docker kaller for images. En analogi fra objektorientert programmering er at man kan se på imaget som en klasse, og containeren som en instans av denne klassen. Man kan lage flere containere fra samme image, på samme måte som at man kan lage flere instanser av samme klasse.

Man kan bruke ferdige images for å lage containere, f.eks. en ferdigpakket web server eller applikasjon. Disse hentes gjerne fra et eller annet register på internett. I denne workshopen vil vi heller bygge imaget selv ettersom vi har en egen applikasjon.

Docker holder en oversikt over alle imagene man har lokalt på maskinen:

`docker image ls`

Dersom du tidligere har rørt Docker i sommer, f.eks. for å kjøre noe lokalt, bør du få opp images du tidligere har bygget eller hentet.

Hvordan kan vi og andre bygge slike images?
Et image lages med en oppskrift. En oppskrift som forteller hva man skal ta utgangspunkt i, hvilke brukere som skal være tilgjengelig i containeren, hvilke filer man ønsker å ha med, hvilke prosesser man ønsker å starte, og så videre. Denne oppskriften kalles for en Dockerfile.

## Se på hva vi har å jobbe med

- Ta en titt på `src/App.js` for å se på React-applikasjonen.
- Kjør `npm install` fra `del_1`-mappen i terminalen. Test så appen ved å kjøre `npm start`.

Kanskje går det ikke? Trolig har du ikke Node installert på maskinen, eller en versjon som ikke er kompatibel. Det går fint, da vi ikke fokuserer på appens innhold.

Ta gjerne likevel noen andres skjerm for å ha _noe_ aning om hva vi skal deploye. En av fordelene med å kjøre apper som en container,
er at vi ikke behøver samme versjoner av ulik software og pakker på vår egen maskin. I stedet defineres riktige versjoner i oppskriften eller Dockerfile, slik det blir "konsistent".

## Bygg og kjør containeren

### Lag en Dockerfile

Lag en Dockerfile inne i `del_1`-mappen med dette innholdet.

```
# Vi henter et "minimalt" node 20 image
FROM node:20-alpine AS build
# Setter arbeidskatalogen i containeren
WORKDIR /app
# Kopierer kun package.json og package-lock.json først for å utnytte cache
COPY package\*.json ./
# Installerer avhengigheter
RUN npm install
# Kopierer resten av prosjektfilene inn i containeren
COPY . .
# Bygger React-applikasjonen (output havner i /app/build)
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

Bygg Docker image og kjør containeren lokalt. Vi må også mappe port 3000 fra containeren til lokal port.
Port 3000 kommer av at det er default port for Create React App.

<details>
<summary>Fasit</summary>

```bash
# Bygg image
docker build -t docker-workshop .

# Kjør container
docker run -p 3000:3000 docker-workshop
```

</details>

Dersom du har en Macbook med M1/2-chip, altså ARM, må du gjøre noen justeringer.

<details>
<summary>Forklaring og løsning</summary>

```bash
# Bygg plattform-spesifikt image
docker buildx build --platform linux/amd64 -t docker-workshop .

# Kjør container
docker run -p 3000:3000 docker-workshop
```

Kort og simpel ChatGPT-oversatt forklaring fra linken under:

Docker løser "det fungerer på min maskin"-problemet ved å pakke apper og avhengigheter i containere, som kjører likt på tvers av miljøer. Men containere deler vertens operativsystemkjerne, så de må være kompatible med maskinens arkitektur. Derfor kan du f.eks. ikke kjøre en Linux/amd64-container direkte på en ARM64-maskin uten emulering.

[Offisiell dokumentasjon](https://docs.docker.com/build/building/multi-platform/)

</details>

<br/>
Nå kan du åpne http://localhost:3000 i nettleseren for å se appen!

Dersom du er nysgjerrig kan du se litt nøyere på hva containeren inneholder.
Prøv disse kommandoene om du vil:

```bash
# Se kjørende containere
docker ps

# Se logger fra containeren
docker logs <container-id>
```
