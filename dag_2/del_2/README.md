# Del 2
## Importere eksisterende ressurser inn i tfstate

Okei! Da har vi forhåpentligvis fått opp det vi trenger for å begynne å terraforme skyen ordentlig! 

Vi kan begynne med å importere ting vi tok opp tidligere. Det var et container registry, web app og en app service plan.


service plan:
```
az appservice plan show \
  --name DIN_PLAN \
  --resource-group faggruppe-sky-NAVN \
  --query id
```

Du skal da få en lang string som output, bruk denne for å importere:

```
terraform import azurerm_app_service_plan.service_plan_NAVN <lang_string>
```

Gjør det samme med de andre ressursene:

```
az webapp show \
  --name <web-app-name> \
  --resource-group <resource-group-name> \
  --query id \
  --output tsv
```

Container registry:

```
az acr show \
  --name <acr-name> \
  --resource-group <resource-group-name> \
  --query id \
  --output tsv

```

```
terraform import azurerm_container_registry.container_registry_NAVN <lang_string>
```

Og for web app har jeg gjort det litt annerledes så du må lete bittelitt. Prøv å finne ut hva slags ressurs du skal importere selv. Prøv å søk etter "terraform azure app service" og finn ut hva slags ressurs du skal importere.

```
terraform import <FINN_DENNE_RESSURSEN>.app_service_NAVN \
$(az webapp show --name <web-app-navn> --resource-group faggruppe-sky-<navn> --query id --output tsv)

```

Du skal da ha importert alt du trenger, så vi hopper videre til del 3! :D 
Du trenger ikke bytte directory/mappe i terminalen, bli i ```terraform/infra```.

