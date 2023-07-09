resource "aws_s3_bucket" "frontend" {
  bucket = "${terraform.workspace}.${var.AWS_S3_BUCKET}"
}

resource "aws_s3_bucket_public_access_block" "block_frontend" {
  bucket              = aws_s3_bucket.frontend.bucket
  block_public_acls   = true
  block_public_policy = true
}

resource "aws_s3_bucket_acl" "frontend-acl" {
  bucket = aws_s3_bucket.frontend.bucket
  acl    = "private"
}

resource "aws_s3_bucket_policy" "frontend_policy" {
  bucket = aws_s3_bucket.frontend.bucket
  policy = data.aws_iam_policy_document.iam_policy.json
}

data "aws_iam_policy_document" "iam_policy" {
  statement {
    sid     = "1"
    actions = ["S3:GetObject"]
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.frontend.id}/*",
    ]
    principals {
      type        = "AWS"
      identifiers = [var.CLOUDFRONT_ARN]
    }
  }
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.bucket
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_object" "frontend" {
  for_each     = fileset("../client/build", "**/*.*")
  bucket       = aws_s3_bucket.frontend.bucket
  key          = each.value
  source       = "../client/build/${each.value}"
  etag         = filemd5("../client/build/${each.value}")
  content_type = lookup(var.mime_types, split(".", each.value)[length(split(".", each.value)) - 1])
}

output "BUCKET_NAME" {
  value = aws_s3_bucket.frontend.id
}

output "BUCKET_DOMAIN" {
  value = aws_s3_bucket.frontend.bucket_regional_domain_name
}
