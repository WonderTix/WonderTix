variable "ZONE_ID" {
  type        = string
  description = "Route53 Zone ID"
}

variable "CF_DOMAIN" {
  type        = string
  description = "Cloudfront domain"
}

variable "CF_HOSTED_ZONE" {
  type        = string
  description = "Cloudfront hosted zone"
}

variable "ROUTE" {
  type        = string
  description = "Route address for Route53"
}
