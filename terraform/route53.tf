resource "aws_route53_zone" "prod" {
  count = local.create_default_resource
  name = var.AWS_S3_BUCKET
}

data "aws_route53_zone" "select" {
  depends_on = [aws_route53_zone.prod]
  name = var.AWS_S3_BUCKET
  private_zone = false
}

resource "aws_route53_record" "cname" {
  count = local.create_default_resource
  zone_id = aws_route53_zone.prod[count.index].zone_id
  name    = "www.${var.AWS_S3_BUCKET}"
  type    = "CNAME"
  ttl     = "5"

  records        = [var.AWS_S3_BUCKET]
}
