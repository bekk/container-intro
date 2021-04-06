# Part 2


## Init Dockerfile
- Lag en ny fil som heter `Dockerfile`
- Skriv `FROM node:15` på første linje. Dette betyr at vi bruker et offentlig image fra [docker hub](https://hub.docker.com/_/node) som utgangspunkt for vårt image.
- Bygg et nytt docker image ved å kjøre kommandoen `docker build -t dockerintro .`. [-t](https://docs.docker.com/engine/reference/commandline/build/) gir imaget en tag (navn). `.` betyr: "Let etter en Dockerfile i denne mappa".
- Sjekk om imaget ditt ligger der ved å kjøre kommandoen `docker image ls`.


## En kommando i Dockerfile
Vi kan få imaget vårt til å gjøre litt forskjellige ting. Først kan vi se hva som skjer når vi kjører imaget som det er i dag. 
Du kjører imaget ved å bruke kommandoen: `docker run dockerintro`.

Neste steg er å se om vi kan få den til å gjøre noe mer. 
Prøv å legge inn linjen `CMD echo "Hello World"` i `Dockerfile`. Bygg deretter imaget på nytt og kjør det (`docker build -t dockerintro . && docker run dockerintro` er en nyttig kommando :) ).

Tadaa! 
Da har vi en dockerfile og vi kan kjøre en kommando i den. 


Hva tror du skjer hvis vi bytter ut `CMD echo "Hello World"` med `CMD npm start`? Prøv det og gå så videre til del 3.