resource "azurerm_storage_account" "function_storage" {
  name                     = "jogfuncstorageacct"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
resource "azurerm_storage_blob" "function_package" {
  name                   = "quotes_function.zip"
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

