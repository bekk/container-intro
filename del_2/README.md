# Del 2

## Init Dockerfile og bygg

- Lag en ny fil som heter `Dockerfile`
- Skriv `FROM node:20` på første linje. Dette betyr at vi bruker et offentlig image fra [Docker Hub](https://hub.docker.com/_/node) som "base image" for vårt image. Med andre ord tar vi et base-image som har litt grunnleggende ting vi trenger og så bygger vi videre på det.
- Bygg et nytt docker image ved å kjøre kommandoen `docker build -t dockerintro .`.

Her gir [-t](https://docs.docker.com/engine/reference/commandline/build/) gir imaget en tag (navn). `.` betyr: "Let etter en Dockerfile i denne mappa".

- Sjekk om imaget ditt bygde ved å kjøre kommandoen `docker image ls`.

## Kjør containeren vår

Akkurat nå er imaget vårt helt tomt. La oss lage en kjørende instans av imaget vårt, kalt en container og få det til å gjøre litt forskjellige ting.

Først kan vi se hva som skjer når vi kjører imaget med kun den først `FROM`-linja. Hva tror du kommer til å skje?

Kjør imaget ved å bruke kommandoen: `docker run dockerintro`.

## Får vi den til å gjøre noe mer fornuftig?

La oss få imaget til å gjøre et eller annet.
Prøv å legge inn linjen `CMD echo "Hello World"` i `Dockerfile`. Bygg deretter imaget på nytt og kjør det. Hva forventer du at skjer? (`docker build -t dockerintro . && docker run dockerintro` er en nyttig kommando :) ).

## Kjøre tjenesten?

Hva tror du skjer hvis vi bytter ut `CMD echo "Hello World"` med `CMD npm start`? Feiler det 🔴? Hvorfor det?

Gå videre til del 3 for en forklaring! 🏃‍♂️
