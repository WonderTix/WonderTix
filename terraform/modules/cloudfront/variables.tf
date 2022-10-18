variable "BUCKET_NAME" {
  type        = string
  description = "wondertix frontend"
  default     = "ticketing.portlandplayhouse.org"
}

variable "BUCKET_DOMAIN" {
  type        = string
  description = "Regional bucket domain name"
}

variable "CERT_ARN" {
  type        = string
  description = "ARN for the domain certificate"
}
