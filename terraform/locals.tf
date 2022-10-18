locals {
  create_default_resource = terraform.workspace == "www" ? 1 : 0
}
