variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

variable "tenant_id" {
  description = "Azure Tenant ID"
  type        = string
}

variable "resource_group_name" {
  default = "faggruppe-sky-NAVN"
}
variable "location" {
  default = "northeurope"
}