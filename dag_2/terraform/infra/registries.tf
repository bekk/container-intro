resource "azurerm_container_registry" "container_registry_NAVN" {
  name                = "ditt-container-registry"
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Basic"

  admin_enabled = true
}
