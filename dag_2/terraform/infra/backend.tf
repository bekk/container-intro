terraform {
  backend "azurerm" {
    resource_group_name  = "faggruppe-sky-jog"
    storage_account_name = "jogstorageacct"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}
