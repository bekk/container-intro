# Del 3

Okei! Da er du kommet så langt! Da er neste steg å få opp en splitter ny komponent i skyen, *ved bruk av kun terraform!*

Vi trenger først et sted å lagre funksjonen. Gå inn i terraform sin egen dokumentasjon og se hva du må ha med:
https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_account

Jeg vet at man kan spare 5 min på å lese dokumentasjon på å debugge i et par timer (veldig fan av det selv), men må øve litt på det også. Her holder vi det så enkelt som mulig og fyller kun inn det som er *required*.


Lag en ny fil som heter function.tf og legg inn disse:
```
resource "azurerm_storage_account" "function_storage" {
  FYLL MEG UT
}
```
```
resource "azurerm_function_app" "weather_function" {
  name                       = "weather-function-app-jorgen" # Denne må være GLOABL unik, det betyr at i hele Azure (ja ALLE! :o )må denne være unik
  location                   = var.location
  resource_group_name        = var.resource_group_name
  app_service_plan_id        = azurerm_service_plan.service_plan_NAVN.id
  storage_account_name       = azurerm_storage_account.function_storage.name
  storage_account_access_key = azurerm_storage_account.function_storage.primary_access_key
  version                    = "~4"

  app_settings = {
    FUNCTIONS_WORKER_RUNTIME     = "python"
    AzureWebJobsStorage          = azurerm_storage_account.function_storage.primary_connection_string
    WEBSITE_RUN_FROM_PACKAGE     = "../del_3/weather_function.zip"
  }

  site_config {
    always_on = true
  }
}
```
