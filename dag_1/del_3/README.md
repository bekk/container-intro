# Del 3

Nå har vi nesten alle puslebrikkene på plass, alt som gjenstår er å kjøre appen vår!

### Azure App Service

For å kjøre en Container så lett som mulig i Azure kan vi bruke en "Azure App Service".

Opprett en App Service i portalen:

- Velg "Web App"
- Gi den et unikt navn, navnet blir del av URL-en til tjenesten din!
- "Other" deployment
- Huk vekk "Try a unique default hostname (preview)"
- Velg at typen skal være "Container"
- Operativsystem skal være "Linux"
- Velg riktig Location, det viktigste er at det er samme som de andre ressursene dine.
- Velg en pricing plan med omhu. Basic er nok fint!
- Hopp over de neste stegene. Database behøver vi ikke, container velger vi etterpå, og nettverkspolicy er allerede bra.

### Legg appen i prod!

Nå mangler vi bare å koble App Service-ressursen vår med registryet vårt, så er vi klare.

Når vi bruker App Service-ressursen og vil at den skal hente et image fra vårt registryet, så må den ha tilgang til å lese images herfra. Gå til registryet-ressursen i Azure-portalen, finn Access Keys i navigasjonsmenyen og skru på Admin user.
I praksis har vi da et brukernavn og passord som gir full tilgang til registeret. "Managed identity", som er alternativet i vårt tilfelle, er et bedre valg fra et sikkerhetsperspektiv, men for å gjøre det enkelt og fort er admin-valget best 👍👍

Naviger til App Servicen vår i Azure-portalen, og finn Deployment Center.
Prøv å koble til registryet ditt!

Finn domenet ditt i Overview og prøv å åpne. Antageligvis mangler vi noe.
Sjekk loggen i Log stream om du skjønner hva som er feil, og prøv gjerne å søke deg frem til løsningen dersom du har tid.

<details>
<summary>Løsning</summary>
By default så leter App Services etter trafikk på port 8000. Derfor må vi eksplisitt definere portnummer, slik det matcher
det containeren kjører. Gå til Environment variables under Settings og sett nøkkelparet `WEBSITES_PORT=3000`.
</details>

Gå tilbake på domenet og/eller loggen, og se om noe har endret seg! Det _bør_ i hvert fall fungere :)
