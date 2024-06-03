# Google Cloud Storage Service
# 
# Cloud Storage is a managed service for storing unstructured data. 
# This configuration defines a Cloud Storage service, specifying how your containerized applications are deployed
# and managed on Google Cloud Platform (GCP).
# 
# References:
# https://cloud.google.com/storage/?hl=en
# https://registry.terraform.io/prov# iders/hashicorp/google/latest/docs/resources/storage_bucket

resource "google_storage_bucket" "slack-notifs" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US"
    name                        = "slack-notifs"
    project                     = "wondertix-app"
    public_access_prevention    = "inherited"
    requester_pays              = false
    rpo                         = "DEFAULT"
    storage_class               = "STANDARD"
    uniform_bucket_level_access = false
}

resource "google_storage_bucket" "image-upload-wondertix-dev" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US-WEST1"
    name                        = "image-upload-wondertix-dev"
    project                     = "wondertix-app"
    public_access_prevention    = "inherited"
    requester_pays              = false
    storage_class               = "STANDARD"
    uniform_bucket_level_access = false
}

resource "google_storage_bucket" "image-upload-wondertix-local" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US-WEST1"
    name                        = "image-upload-wondertix-local"
    project                     = "wondertix-app"
    public_access_prevention    = "inherited"
    requester_pays              = false
    storage_class               = "STANDARD"
    uniform_bucket_level_access = false
}

resource "google_storage_bucket" "image-upload-wondertix-prod" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US-WEST1"
    name                        = "image-upload-wondertix-prod"
    project                     = "wondertix-app"
    public_access_prevention    = "inherited"
    requester_pays              = false
    storage_class               = "STANDARD"
    uniform_bucket_level_access = false
}

resource "google_storage_bucket" "image-upload-wondertix-staging" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US-WEST1"
    name                        = "image-upload-wondertix-staging"
    project                     = "wondertix-app"
    public_access_prevention    = "inherited"
    requester_pays              = false
    storage_class               = "STANDARD"
    uniform_bucket_level_access = false
}

resource "google_storage_bucket" "runapps_default-tomuod" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US-WEST1"
    name                        = "runapps_default-tomuod"
    project                     = "wondertix-app"
    public_access_prevention    = "inherited"
    requester_pays              = false
    storage_class               = "STANDARD"
    uniform_bucket_level_access = true

    versioning {
        enabled = true
    }
}

resource "google_storage_bucket" "wondertix-app_cloudbuild" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US"
    name                        = "wondertix-app_cloudbuild"
    project                     = "wondertix-app"
    public_access_prevention    = "inherited"
    requester_pays              = false
    rpo                         = "DEFAULT"
    storage_class               = "STANDARD"
    uniform_bucket_level_access = false
}

resource "google_storage_bucket" "wtix-npm-cache" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US-WEST2"
    name                        = "wtix-npm-cache"
    project                     = "wondertix-app"
    public_access_prevention    = "enforced"
    requester_pays              = false
    storage_class               = "STANDARD"
    uniform_bucket_level_access = true
}

resource "google_storage_bucket" "gcf-v2-sources-131818279954-us-west1" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US-WEST1"
    name                        = "gcf-v2-sources-131818279954-us-west1"
    project                     = "wondertix-app"
    public_access_prevention    = "inherited"
    requester_pays              = false
    storage_class               = "STANDARD"
    uniform_bucket_level_access = true

    cors {
        max_age_seconds = 0
        method          = [
            "GET",
        ]
        origin          = [
            "https://*.cloud.google.com",
            "https://*.corp.google.com",
            "https://*.corp.google.com:*",
            "https://*.cloud.google",
            "https://*.byo# id.goog",
        ]
        response_header = []
    }

    lifecycle_rule {
        action {
            storage_class = null
            type          = "Delete"
        }
        condition {
            age                        = 0
            created_before             = null
            custom_time_before         = null
            days_since_custom_time     = 0
            days_since_noncurrent_time = 0
            matches_prefix             = []
            matches_storage_class      = []
            matches_suffix             = []
            no_age                     = false
            noncurrent_time_before     = null
            num_newer_versions         = 3
            with_state                 = "ARCHIVED"
        }
    }

    versioning {
        enabled = true
    }
}

resource "google_storage_bucket" "gcf-v2-uploads-131818279954-us-west1" {
    default_event_based_hold    = false
    enable_object_retention     = false
    force_destroy               = false
    labels                      = {}
    location                    = "US-WEST1"
    name                        = "gcf-v2-uploads-131818279954-us-west1"
    project                     = "wondertix-app"
    public_access_prevention    = "inherited"
    requester_pays              = false
    storage_class               = "STANDARD"
    uniform_bucket_level_access = true

    cors {
        max_age_seconds = 0
        method          = [
            "PUT",
        ]
        origin          = [
            "https://*.cloud.google.com",
            "https://*.corp.google.com",
            "https://*.corp.google.com:*",
            "https://*.cloud.google",
            "https://*.byo# id.goog",
        ]
        response_header = [
            "content-type",
        ]
    }

    lifecycle_rule {
        action {
            storage_class = null
            type          = "Delete"
        }
        condition {
            age                        = 1
            created_before             = null
            custom_time_before         = null
            days_since_custom_time     = 0
            days_since_noncurrent_time = 0
            matches_prefix             = []
            matches_storage_class      = []
            matches_suffix             = []
            no_age                     = false
            noncurrent_time_before     = null
            num_newer_versions         = 0
            with_state                 = "ANY"
        }
    }
}