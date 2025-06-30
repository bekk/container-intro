# Del 7

## Ut i skyen

La oss kjøre ting i skyen. Dagens cloud of choice er Microsoft Azure!

Logg inn på https://portal.azure.com med Bekk-brukeren din.

I dag skal vi klikke oss gjennom oppsettet, dette blir populært kalt for "clickops". Jeg vil bare nevne at dette ofte er _fyfy_ ute på oppdrag, men vi gir oss selv lov til det i dag for å lære hvordan ting henger sammen i skyen.

### Lag din egen gruppe i Azure

For å gruppere ressurser i Azure må alle ting opprettes i en "Resource Group".
Lag din egen Resource Group ved å klikke i Azure portalen, navngi den etter deg selv.
Jeg ville kalt min typ. `oppdrift-ole-anders`.

Velg at gruppen skal ligge i **North Europe**.

### Klargjør et container registry for tjenesten din

For å kunne laste opp et Docker image til Azure må vi først ha et "Container Registry" å laste det opp til.
Opprett et Container Registry i Azure portalen, husk å legge det til din egen Resource Group og riktig location.

Navnet på registryet må være globalt unikt, da det blir del av en URL. Jeg kaller mitt for `oppdriftoleanders`, ettersom navnet ikke kan ikkeholde bindestreker.

Velg "Basic" som pricing plan, slik at lommaboken min ikke blør mer enn den trenger.

### Sette opp cli slik at Docker kan snakke med Azure

Kjør kommandoen i en terminal:

```bash
az login
```

Dette vil autentisere akkurat dette terminalvinduet til å snakke med Azure.

Log inn i registryet med Azure CLI:

```bash
az acr login --name <navnet på ditt registry>
```

### Laste opp imaget vårt til et container registry.

For å laste opp et image til et registry må vi først tagge imaget med et navn som tilhører det.
Alle images i et registry har en unik URL, denne URL-en er også navnet på imaget.

Adressen til mitt registry er `oppdriftoleanders.azurecr.io`, navnet på imaget mitt lkan være `containerintro`, og tag-en kan være `latest`. Dermed kan navnet på et image jeg vil laste opp kan da være f.eks `oppdriftoleanders.azurecr.io/containerintro:latest`.

Bruk `docker tag ...` til å gi imaget ditt et nytt navn. Du kan bruke `docker image ls` til å se om det virket, du burde da ha to images med forskjellige navn og samme `Image ID`.

Last opp imaget til Azure med `docker push ...`.

Sjekk Azure portalen for å se om du finner imaget ditt!
