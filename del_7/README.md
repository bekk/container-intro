# Del 7

## Ut i skyen

La oss kjøre ting i skyen. Dagens cloud of choice er AWS.
Logg inn på

- https://bekk-skyskolen.signin.aws.amazon.com/console. Evt. velg IAM user når du logger inn i AWS consolet og skriv `bekk-skyskolen` i Account ID-feltet.
- Brukernavn: eposten din.
- Passord: Spør Halvor

I dag skal vi såkalt "clickopse" oss gjennom en del ting. Jeg vil bare nevne at dette ofte er fyfy på prosjekt, men vi gir oss selv lov til det i dag.

### Sette opp cli

Gå inn hit for å lage en access key og access secret. Velg "other" i dropdown-menyen https://us-east-1.console.aws.amazon.com/iam/home#/security_credentials/access-key-wizard.

I CLIen din skriv `aws configure` og fyll inn. Velg region `eu-west-1` og output velger du selv (blankt er fint.).

### Laste opp imaget vårt til et private repository.

**NB! Husk på å være i riktig region**

Først skal vi bygge og laste opp imaget vårt. Gå til `Amazon Elastic Container Registry` og lag et nytt private repository. Gi det et navn med ditt eget navn så du finner det igjen.
Trykk deg inn på repoet ditt og velg `View push commands`. Følg disse.

### App runner

Neste er å kjøre ting!
Gå til `AWS App Runner` og velg `Create service`. Velg imaget du lagde i forrige steg. Set deployment settings til automatic. For Service Role velger du Use existing role og den
som heter.`AppRunnerECRAccessRole`. Next.

Deretter, sett virtual cpu og minne til det laveste, tenk på port og et navn som er unikt for deg. Se over og og lag tjenesten din. Sjekk at URLen fungerer.

Tøft da!

### Kulere addresse.

Denne AWS-kontoen eier domenet bekk.cloud. Vi kan jo prøve å få en noe kulere URL til sakene våre.

Gå til `Custom Domains` og sett opp et nytt domene velg noe med `bekk.cloud`, f.eks. `halvor-containerintro.bekk.cloud`. Gå deretter til Route53, `Hosted zones`, `bekk.cloud`.
Velg create records og legg inn det du du fikk fra apprunner som CNAME records. Deretter venter vi på at det valideres (følg med i App Runner).
