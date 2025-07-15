// Legg merke til at det ikke er definert en "default" verdi for disse variablene, så de må settes i en terraform.tfvars-fil fordi de er sensitive
variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

//Denne variabelen er sensitiv og må settes i terraform.tfvars-filen
variable "tenant_id" {
  description = "Azure Tenant ID"
  type        = string
}

// Disse variablene har en default verdi, så de trenger ikke å settes i terraform.tfvars-filen
// Ikke sentitive og kan brukes direkte i koden
variable "resource_group_name" {
  default = "din-resource-group"
}

variable "location" {
  default = "northeurope" # Endre denne hvis du ikke ønsker å bruke "northeurope"
}
