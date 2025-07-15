terraform {
  backend "azurerm" {
    resource_group_name  = "din-resource-group"
    storage_account_name = "dintfstateaccount"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}
