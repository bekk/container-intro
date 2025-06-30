# Del 8

## Run it!

Nå har vi nesten alle puslebrikkene på plass, alt som gjenstår er å kjøre appen vår!

### Azure App Service

For å kjøre en Container så lett som mulig i Azure kan vi bruke en "Azure App Service".

Opprett en App Service i portalen:

- Gi den et unik navn, navnet blir del av URL-en til tjenesten din!
- Huk vekk "Try a unique default hostname (preview)"
- Velg at typen skal være "Container"
- Operativsystem skal være "Linux"
- Velg riktig Location, det viktigste er at det er samme som de andre ressursene dine.
- Velg en pricing plan med omhu.

### Legg appen i prod!

Nå mangler vi bare å koble App Servicen vår med Container Registryet vårt, så er vi klare.

Naviger til App Servicen i Azure Portalen, og finn Deployment Center.

Prøv å koble til registryet ditt!

Sjekk i "Log stream" om du kan se noe gjenkjennelig som tyder på at appen kjører.

### En siste avsjekk

Vi må nesten se appen i prod på sitt eget domene også?

I "Overview" på App Servicen vil du finne en lenke til doment til appen din, virker den?

Hvis den ikke gjør det, er det noe vi har måttet gjøre tidligere i workshoppen som vi har glemt denne gangen?
