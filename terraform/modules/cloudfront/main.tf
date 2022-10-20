resource "aws_cloudfront_origin_access_identity" "prod" {
  comment = "Origin Access ID for Production"
}

locals {
  s3_origin_id = "S3-${terraform.workspace}"
}

resource "aws_cloudfront_distribution" "frontend" {
  origin {
    domain_name = var.BUCKET_DOMAIN
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.prod.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Production frontend"
  default_root_object = "index.html" 

  aliases = terraform.workspace == "www" ? [trim(var.BUCKET_NAME, "www."), var.BUCKET_NAME] : [var.BUCKET_NAME]
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }
  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA"]
    }
  }
  tags = {
    Environment = "production"
  }
  viewer_certificate {
    acm_certificate_arn      = var.CERT_ARN
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }
}

output "cloudfront_arn" {
  value = aws_cloudfront_origin_access_identity.prod.iam_arn
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.frontend.domain_name
}

output "cloudfront_hosted_zone" {
  value = aws_cloudfront_distribution.frontend.hosted_zone_id
}
