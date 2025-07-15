resource "azurerm_storage_account" "function_storage" {
  name                     = "jogfuncstorageacct"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
resource "azurerm_linux_function_app" "weather_function" {
  name                       = "weather-function-app-jorgen3"
  location                   = var.location
  resource_group_name        = var.resource_group_name
  storage_account_name       = azurerm_storage_account.function_storage.name
  storage_account_access_key = azurerm_storage_account.function_storage.primary_access_key
  service_plan_id            = azurerm_service_plan.service_plan_NAVN.id

  site_config {
    application_stack {
      docker {
        registry_url      = azurerm_container_registry.container_registry_NAVN.login_server
        image_name        = "weather-function"
        image_tag         = "latest"
        registry_username = azurerm_container_registry.container_registry_NAVN.admin_username
        registry_password = azurerm_container_registry.container_registry_NAVN.admin_password
      }
    }
  }

  app_settings = {
    "FUNCTIONS_WORKER_RUNTIME"             = "python"
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "true"
  }
}





