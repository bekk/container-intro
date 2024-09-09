# Del 6

## Offentlige images

En av de store fordelene med Docker er hvor lett man kan ta i bruk offentlige images. Enten det er for å gjøre konfigurasjonen vår enklere, eller for å kjøre fulle applikasjoner andre har satt opp som vi ønsker å ta i bruk.

Her skal vi se på et par eksempler, så vi får kjent litt på fordelene og hvordan det er å jobbe med.

### Nginx static website

Hvis vi ønsker å lage en enkel webserver som kjører statiske filer er nginx en god kandidat. Nginx håndterer statisk innhold veldig raskt og det er ganske enkelt.
I tillegg har vi da en enkel måte vi kan kjøre flere av appene våre på sammen. Det gjør det enklere for nye kollegaer å sette opp en ny tjeneste, eller å sette seg inn i noe eksisterende.

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
      <li>
        <a href="http://nginx.org/en/docs/beginners_guide.html#static">
          her ligger nginx static content info
        </a>
      </li>
    </ul>
  </body>
</html>
```

Deretter skal vi lage oss en Dockerfile.
Prøv å sette dette sammen selv til å starte med.
Som base image bruker vi `nginx:latest`. Se i lenken fra nettsiden for å finne ut hvor du legger de statiske filene oppsett av nginx configurasjonsfilen.
Se om du kan få nettsiden til å kjøre!

Tre tips på veien 💡:

- Legg `nginx.conf` i `/etc/nginx`.
- Nginx starter litt rart. Du kan bruke kommandoen `CMD ["nginx", "-g", "daemon off;"]` for å starte nginx i imaget.
- Hvilken port eksponeres her? I forrige oppgave satte vi eksplisitt port 9000. Standardporten til nginx er port 80. Når du brukte `-p 9000:9000` tidligere betyr det egentlig at du kobler port 9000 på maskinen din til port 9000 i containeren.

Lykke til!
