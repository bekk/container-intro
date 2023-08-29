# Del 6

## Offentlige images

En av de store fordelene med Docker er hvor lett man kan ta i bruk offentlige images. Enten det er for å gjøre konfigurasjonen vår enklere, eller for å kjøre fulle applikasjoner
andre har satt opp og vi ønsker å ta i bruk.

Her skal vi se på et par eksempler, så vi får kjent litt på fordelene og hvordan det er å jobbe med.

### Nginx static website

Hvis vi ønsker å lage en enkel webserver som kjører statiske filer er nginx en god kandidat. Nginx håndterer statisk innhold veldig raskt og det er ganske enkelt.
I tillegg har vi da en enkel måte vi kan kjøre flere av appene våre på, likt. Det gjør det enklere for nye kollegaer å sette opp en ny tjeneste, eller å sette seg inn i noe eksisterende.

La oss lage en helt enkel statisk nettside og bruke nginx og docker til å kjøre det.
Først trenger vi en nettside. Lag en fil som heter `index.html` med følgende innhold:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Her er det mye flott</title>
  </head>
  <body>
    <h1>Nyttige lenker</h1>
    <ul>
      <li><a href="https://nrk.no">her er det nyheter</a></li>
      <li><a href="http://nginx.org/en/docs/beginners_guide.html#static">her ligger nginx static content info</a></li>
    </ul>
  </body>
</html>
```

Deretter skal vi lage oss en Dockerfile.
Prøv å sette dette sammen selv til å starte med.
Som base image bruker vi `nginx:latest`. Se i lenken fra nettsiden for å finne ut hvor du legger de statiske filene oppsett ac nginx configurasjonsfilen.
Se om du kan få nettsiden opp og kjøre!

Tre tips på veien 💡:

- Legg `nginx.conf` i `/etc/nginx`.
- Nginx starter litt rart. Du kan bruke kommandoen `nginx -g daemon off;` for å starte nginx i imaget.
- Hvilken port eksponeres her? I forrige oppgave satte vi eksplisitt port 9000. Standardporten til nginx er port 80. Når du brukte `-p 9000:9000` tidligere betyr det egentlig at du
  kobler port 9000 på maskinen din til port 9000 i containeren.

Lykke til!

### Postgres

For å teste ut litt nyttige verktøy skal vi se på postgres! Si at at du bruker postgres på prosjektet ditt. Hvis du skal teste ut noe lokalt, hvordan gjør du det? Du vil jo gjerne ikke rote til databasen som brukes av alle andre. Da er det nyttig å se litt på hvordan vi kan lage vår egen lille database, enkelt!

Først la oss starte opp en postgres-instans:

```bash
docker run \
    --name myPostgresDb \
    -p 5432:5432 \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB=postgresDB \
    -d \
    postgres
```

Kjør en `docker ps` og sjekk at den kjører som forventa. Kjør en `docker logs MyPostgresDb` for å se loggene hvis du ønsker det.

Neste kan jo være å få pgAdmin opp å gå. PgAdmin er et UI vi kan bruke til å administrere postgres databasene våre. Man kan jo installere det på mange måter, men vi kjører det selvfølgelig opp med docker!

```bash
    docker run \
  -p 5050:80 \
  -e "PGADMIN_DEFAULT_EMAIL=name@example.com" \
  -e "PGADMIN_DEFAULT_PASSWORD=admin" \
  -d dpage/pgadmin4
```

Prøv å åpne localhost:5050 her bør du finne pgadmin nå! logg inn med det du satt i argumentene over. Prøv å legg til databasen din! for å treffe nettverksinterfacet til containeren din er det litt forskjellig ut ifra hvordan du kjører containerne dine. F.eks. med podman er det `host.containers.internal`.

### Sonarqube

For å teste ut en litt mer offentlig tjeneste skal vi prøve oss på Sonarqube! En tjeneste man kan sjekke kvalitet på kode med. Ikke en billig eller simpel tjeneste, men kanskje litt kul.
Og vi kan i det minste teste den!

Her skal vi ikke bygge noe eget docker image men heller bruke et offisielt et for en demo av produktet. Av ressurser her brukte jeg i all hovedsak: https://docs.sonarqube.org/latest/try-out-sonarqube/.

#### Kjør opp tjenesten lokalt

Først får vi ting opp å gå lokalt. Guiden foreslår `docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest` noe som høres finfint ut.

Prøv å gå inn på localhost:9000 nå og se hva vi har kjørende. Ganske kult, hva? Logg inn med admin/admin og sett et nytt passord.

#### Analyse

Deretter må vi jo prøve å analysere et eller annet. Trykk på new project og manually. Lag et token og ta vare på det.
Så må vi kjøre analyse-verktøyet da! Men vi gidder jo ikke laste ned masse greier og lagre det på maskinen vår. Docker to the rescue!

Vi kan kjøre analyseverktøyen på repoet til denne workshoppen med:

```bash
docker run --platform linux/amd64 --network=host\
--rm \
-e SONAR_HOST_URL="http://localhost:9000" \
-e SONAR_SCANNER_OPTS="-Dsonar.projectKey=<NAVNET_DU_SATTE>" \
-e SONAR_TOKEN="<TOKENET_DU_FIKK>" \
-v "<DER_DU_HAR_KLONA_DETTE_REPOET>:/usr/src" \
sonarsource/sonar-scanner-cli
```

Legg merke til et par ting her. For det første bruker vi nok et offentlig image, bare et annet et. Vi konfigurerer det gjennom -e som står for environment og lager altså
miljøvariabler inne i containeren. Det andre viktige er `--network=host`. Dette gjør at containeren vi kjører nå har samme nettverk som maskinen vår. Hvis ikke ville `localhost`
vært en referanse til seg selv inne i containeren og ikke maskinen vår.

Funka det? Kult, ikke sant? Er dette relevant for deg på prosjekt? I så fall, hvorfor? Hvorfor ikke?
