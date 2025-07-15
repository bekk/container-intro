# Del 3

Okei! Da er du kommet så langt! Da er neste steg å få opp en splitter ny komponent i skyen, *ved bruk av kun terraform!*

Vi trenger først et sted å lagre funksjonen. Gå inn i terraform sin egen dokumentasjon og se hva du må ha med:
https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_account

Jeg vet at man kan spare 5 min på å lese dokumentasjon på å debugge i et par timer (veldig fan av det selv), men må øve litt på det også. Her holder vi det så enkelt som mulig og fyller kun inn det som er *required*.

### Del 3.1
Lag en ny fil som heter function.tf og legg inn disse:
```
resource "azurerm_storage_account" "function_storage" {
  FYLL MEG UT
}
```

### Del 3.2
Nå begynner du å bli dreven jo! Så her kommer en ordentlig utfordring. Du skal selv deploye en azure function som et endepunkt som du kan bruke i din egen web-app. Dette *skal* være en vanskelig oppgave, det er siste og det er helt greit at du ikke blir ferdig med den.  <br/> <br/>
Du kan legge merke til at det ligger en mappe her som heter azure-function. Det er en flask app som henter quotes fra et api. 

Her er det meningen at du skal møte utfordring.
```
cd dag_2/del_3/azure-function
```
```
zip -r functionapp.zip ./*
```



Under er et forslag til hvordan du kan gå frem, opprett en blob storage container som skal holde på zip-en og spinne opp en azure function.
```
resource "azurerm_storage_blob" "function_package" {
  name                   = "azure-function.zip"
  storage_account_name   = azurerm_storage_account.function_storage.name
  storage_container_name = azurerm_storage_container.package_container.name
  type                   = "Block"
  source                 = "${path.module}/../del_3/quotes_function.zip"
}

resource "azurerm_storage_container" "package_container" {
  name                  = "functionpackages"
  storage_account_name  = azurerm_storage_account.function_storage.name
  container_access_type = "private"
}

resource "azurerm_function_app" "quotes_function" {
  name                       = "quotes-function-app-NAVN"
  location                   = var.location
  resource_group_name        = var.resource_group_name
  app_service_plan_id        = azurerm_service_plan.service_plan_NAVN.id
  storage_account_name       = azurerm_storage_account.function_storage.name
  storage_account_access_key = azurerm_storage_account.function_storage.primary_access_key
  version                    = "~4"

  app_settings = {
    FUNCTIONS_WORKER_RUNTIME     = "python"
    AzureWebJobsStorage          = azurerm_storage_account.function_storage.primary_connection_string
    WEBSITE_RUN_FROM_PACKAGE     = azurerm_storage_blob.function_package.url
  }

  site_config {
    always_on = true
  }
}

```
