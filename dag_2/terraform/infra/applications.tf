resource "azurerm_service_plan" "service_plan_NAVN" {
  name                = "din-service-plan"
  resource_group_name = var.resource_group_name
  location            = var.location
  os_type             = "Linux"
  sku_name            = "B1"
}


# Gjør om denne til azurerm_linux_web_app etter import
resource "azurerm_app_service" "app_service_NAVN" {
  name                = "din-app-service"
  resource_group_name = var.resource_group_name
  location            = var.location
  app_service_plan_id = azurerm_service_plan.service_plan_NAVN.id


  app_settings = {
    "WEBSITES_PORT" = "3000"
  }
}


# resource "azurerm_linux_web_app" "web_app_NAVN" {
#   name                = "din-web-app"
#   resource_group_name = var.resource_group_name
#   location            = var.location
#   service_plan_id     = azurerm_service_plan.service_plan_NAVN.id

#   site_config {
#     application_stack {
#       docker_image_name        = "${azurerm_container_registry.container_registry_NAVN.login_server}/docker-workshop:latest" // Hvis noen av dere har noe annet en docker-workshop, så bytt det ut her
#       docker_registry_url      = "https://${azurerm_container_registry.container_registry_NAVN.login_server}"
#       docker_registry_username = azurerm_container_registry.container_registry_NAVN.admin_username
#       docker_registry_password = azurerm_container_registry.container_registry_NAVN.admin_password
#     }
#   }

#   app_settings = {
#     "WEBSITES_PORT" = "3000"
#   }
  
# }

