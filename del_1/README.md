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

- Kjør `npm install` i terminalen
- Ta en titt på `src/App.js` for å se vår flotte React-applikasjon. Test appen ved å kjøre `npm start`. Hva forventer du at du ser i nettleseren?

Kanskje går det ikke? Trolig har du ikke Node installert på maskinen, eller en versjon som ikke er kompatibel. Det går fint, da vi ikke fokuserer på appens innhold.
Ta gjerne likevel noen andres skjerm for å ha _noe_ aning om hva vi skal deploye. En av fordelene med å kjøre apper som en container,
er at vi ikke behøver samme versjoner av ulik software og pakker på vår egen maskin. I stedet defineres riktige versjoner i oppskriften eller Dockerfile, slik det blir "konsistent".

### Lag en Dockerfile

Lag en Dockerfile med dette innholdet. Denne skal så bygges og kjøres som en container lokalt.

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
```

### Oppgave 2: Bygg og kjør containeren

Bygg Docker image og kjør containeren lokalt.

<details>
<summary>💡 Hint</summary>
Bruk disse kommandoene:
- `docker build` for å bygge image
- `docker run` for å kjøre containeren
- Husk å mappe port 80 fra containeren til en lokal port
</details>

<details>
<summary>🔧 Fasit</summary>

```bash
# Bygg image
docker build -t docker-workshop .

# Kjør container
docker run -p 3000:3000 docker-workshop
```

Nå kan du åpne http://localhost:3000 i nettleseren for å se appen!

</details>

### Oppgave 3: Utforsk containeren

Hvordan kan du se hva som skjer inne i containeren?

<details>
<summary>💡 Hint</summary>
Prøv disse kommandoene:
- `docker ps` - se kjørende containere
- `docker logs` - se loggene
- `docker exec` - kjøre kommandoer inne i containeren
</details>

<details>
<summary>🔧 Fasit</summary>

```bash
# Se kjørende containere
docker ps

# Se logger fra containeren
docker logs <container-id>

# Gå inn i containeren
docker exec -it <container-id> sh

# Se filstrukturen inne i containeren
docker exec <container-id> ls -la /usr/share/nginx/html
```

</details>
