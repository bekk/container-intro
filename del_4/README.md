# Del 4

## Exec inn i containeren

I containeren selv så kjører webserveren på port 9000.
Vi kan jo sjekke dette.

- Åpne en ny terminal, med containeren din kjørende i en annen.
- Bruk `docker ps` for å finne ID-en til din container
- Vi kan starte et shell i containeren med kommandoen `docker exec -it <container id> /bin/bash`.
  Her executer vi applikasjonen bash i containeren vår med interactive mode som gjør at inputen vår blir videresendt til containeren.
- Hvis du gjør følgende kommando hva tror du at du får tilbake `curl http://0.0.0.0:9000`? Hva med `curl http://localhost:9000/random`?

## Port forward

Docker har funksjonalitet for å nettopp mappe porter fra en container til host-maskinen.
Prøv å starte containeren din med `docker run -it -p 9000:9000 dockerintro`. Hva skjer nå hvis du går til http://0.0.0.0:9000 på din maskin?
