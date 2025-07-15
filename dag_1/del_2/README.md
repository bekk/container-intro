# Del 2

## Ut i skyen

La oss deploye ting i skyen. Dagens cloud of choice er Microsoft Azure!

Logg inn på https://portal.azure.com med Bekk-brukeren din.

I dag skal vi klikke oss gjennom oppsettet, dette blir populært kalt for "clickops". Tidvis kan dette være _fyfy_ ute på oppdrag
da det er lite reproduserbart, men vi gir oss selv lov til det i dag for å lære hvordan ting henger sammen i skyen.

### Lag din egen gruppe i Azure

For å gruppere ressurser i Azure må alle ting opprettes i en "Resource Group".
Lag din egen Resource Group ved å klikke i Azure portalen, navngi den etter deg selv.
Gjerne `faggruppe-sky--<navn>`.

Velg at gruppen skal ligge i **North Europe**.

### Klargjør et container registry for tjenesten din

For å kunne laste opp et Docker image til Azure må vi først ha et "Container Registry" å laste det opp til.
Opprett et Container Registry i Azure portalen, husk å legge det til din egen Resource Group og riktig location.

Navnet på registryet må være globalt unikt, da det blir del av en URL. Jeg kaller mitt for `faggruppe<navn>`, ettersom navnet ikke kan ikkeholde bindestreker.

Velg "Basic" som pricing plan, slik at lommaboken til noen™ ikke blør mer enn den trenger. Domain level og role assignment kan man la stå.

### Sette opp cli slik at Docker kan snakke med Azure

Kjør kommandoen i en terminal:

```bash
az login
```

Dette vil autentisere akkurat dette terminalvinduet til å snakke med Azure.

Logg inn i registryet med Azure CLI:

```bash
az acr login --name <navnet på ditt registry>
```

Denne kommandoen sørger for at Docker-klienten din kan snakke direkte med registryet, slik at du kan
pushe og hente images fra registryet.

### Laste opp imaget vårt til et container registry.

For å laste opp et image til et registry må vi først tagge imaget med et navn som tilhører det.
Alle images i et registry har en unik URL, denne URL-en er også navnet på imaget.

Adressen til mitt registry er `<faggruppe<navn>>.azurecr.io`, navnet på imaget mitt kan f.eks. være `containerintro`, og tag-en kan være `latest`. Dermed kan navnet på et image jeg vil laste opp kan da være f.eks `faggruppe<navn>.azurecr.io/containerintro:latest`.

Bruk `docker tag <source_image> <target_image>` til å gi imaget ditt et nytt navn. Her er førstnevnte imaget du vil tagge, og target
blir det nye navnet. Du kan bruke `docker images` til å se om det virket, du burde da ha to images med forskjellige navn og samme `Image ID`.

Last opp imaget til Azure med `docker push <image>`

Sjekk registeret Azure portalen for å se om du finner imaget ditt!
Du må gå til Services -> Repositories for å finne de.
