# Del 5

## Image størrelse

Hvor stort er imaget ditt? Hvis du har glemt kommandoen for å liste images, se i `del_2`.
Dette er jo ganske stort er det ikke? Spesielt med tanke på hvor mye kode vi kjører?

For å redusere image-størrelsen er det flere ting man kan gjøre. De to viktigste er:

- Ikke kopier over unødvendige ting. Vi har løst dette med å ha to spesifikke `COPY`-kommandoer. Hvis vi hadde brukt `COPY . .` hadde vi kopiert alt fra cwd-en (current working directory) over.
  Veldig praktisk, men hvis du har masse bilder og greier i mappa er jo dette ikke vits.
- Bruk et mindre base-image. `node:20` er ganske stort og har masse greier i seg. Gå tilbake til [docker hub](https://hub.docker.com/_/node) og se om du finner et annet image du kan bruke _(hint: alpine er en linux-distro som er kjent for å være liten og grei å bruke)_.
  Bygg deretter og se hvor stort det blir.

## Layers

Hadde det ikke vært digg å ikke måtte gjøre den NPM installen hver eneste gang? Og hvorfor er det sånn at noen av disse byggene har tatt så mye lengere tid enn andre?

La oss se litt på layers.

- Først, prøv å kjøre docker build kommandoen fra steget over. Ser du at vi får flere hits med `CACHED` i loggen? Noe som dette:

```
± % docker build -t dockerintro .                                       !10044
[+] Building 0.8s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                      0.0s
 => => transferring dockerfile: 43B                                       0.0s
 => [internal] load .dockerignore                                         0.0s
 => => transferring context: 2B                                           0.0s
 => [internal] load metadata for docker.io/library/node:15-slim           0.6s
 => [internal] load build context                                         0.0s
 => => transferring context: 100B                                         0.0s
 => [1/5] FROM docker.io/library/node:15-slim@sha256:dad3f800e7cfaa0f2d1  0.0s
 => => resolve docker.io/library/node:15-slim@sha256:dad3f800e7cfaa0f2d1  0.0s
 => CACHED [2/5] WORKDIR /usr/src/app                                     0.0s
 => CACHED [3/5] COPY package*.json ./                                    0.0s
 => CACHED [4/5] COPY server.js .                                         0.0s
 => CACHED [5/5] RUN npm install                                          0.0s
 => exporting to image                                                    0.0s
 => => exporting layers                                                   0.0s
 => => writing image sha256:cbea23e22e8e913c757f50a177bd883b27041e4f6286  0.0s
 => => naming to docker.io/library/dockerintro                            0.0s
```

- La oss nå gjøre en liten endring i `server.js`. Jeg la inn `// min kommentar` på en av de blanke linjene selv. Hva skjedde nå? Hvilke layers ble bygd på nytt? Hvorfor det?
- La oss prøve noe. Bytt rekkefølge på ting i Dockerfile så vi i stedet har:

```
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY server.js .
CMD npm start
```

Hva er forskjellen?

- Prøv nå å kjøre bygget to ganger, så vi får opp CACHED igjen.
- Gjør nå en ny mini-endring i `server.js` og gjør et nytt bygg. Ble de samme lagene bygd på nytt eller er det en forskjell?
- Noter deg et punkt eller to om hva dette kan være nyttig for, så tar vi det opp etterpå.
