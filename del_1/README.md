# Del 1
## Prepping

Føst av alt må vi sørge for at vi har de avhengighetene vi trenger.

- Installer [Docker Desktop](https://docs.docker.com/engine/install/), [Podman](https://podman.io/getting-started/installation) eller noe annet lignende.
- Installer Node/npm: https://nodejs.org/en/download/ (eller bruk nvm eller lignende for å holde styr på npm-installasjonene) `brew install node` er en fin måte å gjøre det på mac.
- installer aws cli. https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html eller `brew install awscli` på mac.
- last ned litt images i forkant. `docker pull nginx:latest`, `docker pull sonarqube:latest`, `docker pull node:19` og `docker pull node:19-alpine` trenger vi i dag.

## Se på hva vi har å jobbe med.
- Kjør `npm install` i terminalen
- Ta en titt på `server.js` for å se vår flotte tjeneste. Test alle tre endepunktene ved å kjøre `node server.js`. Hva forventer du at de returnerer?
