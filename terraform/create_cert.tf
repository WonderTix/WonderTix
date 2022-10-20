resource "aws_acm_certificate" "cert" {
  count = local.create_default_resource

  provider                  = aws.us-east
  domain_name               = var.AWS_S3_BUCKET
  validation_method         = "DNS"
  subject_alternative_names = ["*.${var.AWS_S3_BUCKET}"]

  tags = {
    Environment = "production"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "validate_cert" {
  for_each = local.create_default_resource == 0 ? tomap({}) : {
    for dvo in aws_acm_certificate.cert[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.prod[0].zone_id
}

resource "aws_acm_certificate_validation" "prod" {
  count = local.create_default_resource

  provider                = aws.us-east
  certificate_arn         = aws_acm_certificate.cert[count.index].arn
  validation_record_fqdns = [for record in aws_route53_record.validate_cert : record.fqdn]
}
  
data "aws_acm_certificate" "prod" {
  depends_on = [aws_route53_record.validate_cert]
  provider = aws.us-east
  domain  = var.AWS_S3_BUCKET
  types   = ["AMAZON_ISSUED"]
  most_recent = true
}
