terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
  backend "s3" {
    bucket = "wondertix-states"
    key    = "states"
    region = "us-west-2"
  }
}

provider "aws" {
  region = "us-west-2"
}

provider "aws" {
  alias  = "us-east"
  region = "us-east-1"
}

module "s3" {
  source         = "./modules/s3"
  AWS_S3_BUCKET  = var.AWS_S3_BUCKET
  CLOUDFRONT_ARN = module.cloudfront.cloudfront_arn
}

module "cloudfront" {
  source        = "./modules/cloudfront"
  BUCKET_DOMAIN = module.s3.BUCKET_DOMAIN
  BUCKET_NAME   = module.s3.BUCKET_NAME
  CERT_ARN      = data.aws_acm_certificate.prod.arn
}

module "route53" {
  source  = "./modules/route53"
  ZONE_ID = data.aws_route53_zone.select.zone_id
  ROUTE   = terraform.workspace == "www" ? var.AWS_S3_BUCKET : module.s3.BUCKET_NAME
  CF_DOMAIN = module.cloudfront.cloudfront_domain_name
  CF_HOSTED_ZONE = module.cloudfront.cloudfront_hosted_zone
}
