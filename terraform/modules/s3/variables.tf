variable "AWS_S3_BUCKET" {
  type        = string
  description = "wontertix frontend"
  default     = "ticketing.portlandplayhouse.org"
}

variable "CLOUDFRONT_ARN" {
  type        = string
  description = "ARN for Cloudfront object"
}

variable "mime_types" {
  default = {
    htm  = "text/html"
    html = "text/html"
    css  = "text/css"
    ttf  = "font/ttf"
    js   = "application/javascript"
    map  = "application/javascript"
    json = "application/json"
    txt  = "text/plain"
    ico  = "image/x-icon"
    svg  = "image/svg+xml"
    map  = "application/json"
    jpg  = "image/jpeg"
    jpeg = "image/jpeg"
    png  = "image/png"
  }
}
