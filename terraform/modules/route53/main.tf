resource "aws_route53_record" "a" {
  zone_id = var.ZONE_ID
  name    = var.ROUTE
  type    = "A"

  alias {
    name                   = var.CF_DOMAIN
    zone_id                = var.CF_HOSTED_ZONE
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "aaaa" {
  zone_id = var.ZONE_ID
  name    = var.ROUTE
  type    = "AAAA"

  alias {
    name                   = var.CF_DOMAIN
    zone_id                = var.CF_HOSTED_ZONE
    evaluate_target_health = false
  }
}
