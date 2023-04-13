# Del 3


## Lokale filer til imaget
Når du forsøkte å kjøre med `npm start` fikk du sannsynsligvis en feilmelding med en tekst i duren `enoent ENOENT: no such file or directory, open '//package.json'`. 
Dette er fordi det ikke ligger noen filer i imaget. server.js og package.json ligger lokalt på din maskin. Vi må derfor overføre de filene til imaget. 

- La oss lage oss en arbeidsmappe på Dockerimaget vårt. Legg inn en linje med `WORKDIR /usr/src/app` på andre linje i `Dockerfile`.
- Vi kan bruke docker-kommandoen `COPY` for å overføre det vi vil over til imaget vårt. Legg til en linje med `COPY package*.json .`.
- Lag en tilsvarende linje under for å overføre `server.js`. 
- Endre det etter `CMD` i kommandoen til images til `pwd && ls` så ser vi hva som ligger der nå. 


## installere dependencies
Det neste vi trenger å gjøre er å installere express i imaget. 

- Endre `CMD` kommandoen til `CMD npm start` for å starte applikasjonen vår. Hvis du bygger og kjører vil du se at den feiler da express ikke er installert. 
Vi legger også på `-it` i docker run kommandoen vår, så den blir `docker run -it dockerintro`. Dette kobler sammen shellet vårt med shellet i containeren. 
- For å installere express så installerer vi dependenciene våre. Vi har tidligere introdusert `CMD`. Det er kommandoen imaget kjører når en container blir starta. 
Vi har også andre verktøy i docker, bl.a `RUN` som er en kommando for å kjøre noe under bygging. Legg inn `RUN npm install` i Dockerfile for å få til dette. 
Prøv selv å tenke hvor det er logisk at dette legges til. Blir du usikker så kan du sniktitte på part_4. 

### NB
Her kan det være at containeren din ikke lar seg drepe med CTRL+C. I så fall gjør du følgende:
- Åpne et nytt terminal-vindu.
- Bruk `docker ps` til å finne containeren din. Kopier `CONTAINER ID`. 
- Kjør `docker stop <CONTAINER ID>`. 
- husk å legge til `-it` i docker run kommandoen din.


Da kjører applikasjonen vår! Men likevel fungerer det ikke å gå inn på http://0.0.0.0:9000. Hvorfor det?