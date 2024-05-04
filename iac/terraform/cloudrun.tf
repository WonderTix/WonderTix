# Google Cloud Run Service
#
# Google Cloud Run is a fully managed platform for deploying and scaling containerized applications.
# This configuration defines a Cloud Run service, specifying how your containerized applications are deployed
# and managed on Google Cloud Platform (GCP).
#
# References:
# https://cloud.google.com/run
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_service

resource "google_cloud_run_service" "slack_notifs" {
  autogenerate_revision_name = false
  location                   = "us-west2"
  name                       = "slack-notifs"
  project                    = var.project
  metadata {
    annotations = {}
    labels      = {}
    namespace   = "wondertix-app"
  }

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"     = "100"
        "run.googleapis.com/client-name"       = "cloud-console"
        "run.googleapis.com/startup-cpu-boost" = "false"
      }
      labels = {
        "client.knative.dev/nonce"            = "ad9c2c22-018b-4140-8c1e-33379f4264da"
        "run.googleapis.com/startupProbeType" = "Default"
      }
      name             = null
      namespace        = null
      resource_version = null
      self_link        = null
      uid              = null
    }
    spec {
      container_concurrency = 80
      service_account_name  = "131818279954-compute@developer.gserviceaccount.com"
      timeout_seconds       = 300

      containers {
        args    = []
        command = []
        image   = "us-east1-docker.pkg.dev/gcb-release/cloud-build-notifiers/slack:latest"
        name    = "slack-1"

        env {
          name  = "CONFIG_PATH"
          value = "gs://slack-notifs/slack-config.yaml"
        }
        env {
          name  = "PROJECT_ID"
          value = "wondertix-app"
        }

        ports {
          container_port = 8080
          name           = "http1"
          protocol       = null
        }

        resources {
          limits = {
            "cpu"    = "1000m"
            "memory" = "512Mi"
          }
          requests = {}
        }

        startup_probe {
          failure_threshold     = 1
          initial_delay_seconds = 0
          period_seconds        = 240
          timeout_seconds       = 240

          tcp_socket {
            port = 8080
          }
        }
      }
    }
  }

  traffic {
    latest_revision = true
    percent         = 100
    revision_name   = null
    tag             = null
    url             = null
  }
}


resource "google_cloud_run_service" "wtix_client_dev" {
  autogenerate_revision_name = false
  location                   = "us-west1"
  name                       = "wtix-client-dev"
  project                    = var.project

  metadata {
    annotations = {}
    labels      = {}
    namespace   = "wondertix-app"
  }

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"     = "10"
        "autoscaling.knative.dev/minScale"     = "1"
        "run.googleapis.com/client-name"       = "gcloud"
        "run.googleapis.com/client-version"    = "473.0.0"
        "run.googleapis.com/startup-cpu-boost" = "true"
      }
      labels = {
        "run.googleapis.com/startupProbeType" = "Default"
      }
      name             = "wtix-client-dev-9c3723f"
      namespace        = null
      resource_version = null
      self_link        = null
      uid              = null
    }
    spec {
      container_concurrency = 80
      service_account_name  = "131818279954-compute@developer.gserviceaccount.com"
      timeout_seconds       = 300

      containers {
        args    = []
        command = []
        image   = "us-west2-docker.pkg.dev/wondertix-app/wtix-dev/client-img-dev:9c3723f"
        name    = "client-img-dev-1"

        env {
          name  = "ENV"
          value = "dev"
        }
        env {
          name  = "REACT_APP_AUTH0_CLIENT_ID"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "AUTH0_CLIENT_ID"
            }
          }
        }
        env {
          name  = "REACT_APP_PUBLIC_STRIPE_KEY"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "PUBLIC_STRIPE_KEY"
            }
          }
        }
        env {
          name  = "REACT_APP_WEBSOCKET_URL"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "WEBSOCKET_URL"
            }
          }
        }

        ports {
          container_port = 8080
          name           = "http1"
          protocol       = null
        }

        resources {
          limits = {
            "cpu"    = "2"
            "memory" = "2Gi"
          }
          requests = {}
        }

        startup_probe {
          failure_threshold     = 1
          initial_delay_seconds = 0
          period_seconds        = 240
          timeout_seconds       = 240

          tcp_socket {
            port = 8080
          }
        }
      }
    }
  }

  traffic {
    latest_revision = false
    percent         = 100
    revision_name   = "wtix-client-dev-9c3723f"
    tag             = null
    url             = null
  }
}


resource "google_cloud_run_service" "wtix_client_prd" {
  autogenerate_revision_name = false
  location                   = "us-west1"
  name                       = "wtix-client-prd"
  project                    = var.project
  metadata {
    annotations = {}
    labels      = {}
    namespace   = "wondertix-app"
  }

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"     = "10"
        "autoscaling.knative.dev/minScale"     = "1"
        "run.googleapis.com/client-name"       = "gcloud"
        "run.googleapis.com/client-version"    = "458.0.1"
        "run.googleapis.com/startup-cpu-boost" = "true"
      }
      labels = {
        "run.googleapis.com/startupProbeType" = "Default"
      }
      name             = "wtix-client-prd-4b99c98"
      namespace        = null
      resource_version = null
      self_link        = null
      uid              = null
    }
    spec {
      container_concurrency = 80
      service_account_name  = "131818279954-compute@developer.gserviceaccount.com"
      timeout_seconds       = 300

      containers {
        args    = []
        command = []
        image   = "us-west2-docker.pkg.dev/wondertix-app/wtix-prd/client-img-prd:4b99c98"
        name    = null

        env {
          name  = "ENV"
          value = "prd"
        }
        env {
          name  = "REACT_APP_AUTH0_CLIENT_ID"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "AUTH0_CLIENT_ID"
            }
          }
        }
        env {
          name  = "REACT_APP_PUBLIC_STRIPE_KEY"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "PUBLIC_STRIPE_KEY"
            }
          }
        }

        ports {
          container_port = 8080
          name           = "http1"
          protocol       = null
        }

        resources {
          limits = {
            "cpu"    = "4"
            "memory" = "4Gi"
          }
          requests = {}
        }

        startup_probe {
          failure_threshold     = 1
          initial_delay_seconds = 0
          period_seconds        = 240
          timeout_seconds       = 240

          tcp_socket {
            port = 8080
          }
        }
      }
    }
  }

  traffic {
    latest_revision = false
    percent         = 100
    revision_name   = "wtix-client-prd-4b99c98"
    tag             = null
    url             = null
  }
}


resource "google_cloud_run_service" "wtix_client_stg" {
  autogenerate_revision_name = false
  location                   = "us-west1"
  name                       = "wtix-client-stg"
  project                    = "wondertix-app"
  metadata {
    annotations = {}
    labels      = {}
    namespace   = "wondertix-app"
  }

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"     = "10"
        "autoscaling.knative.dev/minScale"     = "1"
        "run.googleapis.com/client-name"       = "gcloud"
        "run.googleapis.com/client-version"    = "473.0.0"
        "run.googleapis.com/startup-cpu-boost" = "true"
      }
      labels = {
        "run.googleapis.com/startupProbeType" = "Default"
      }
      name             = "wtix-client-stg-9c3723f"
      namespace        = null
      resource_version = null
      self_link        = null
      uid              = null
    }
    spec {
      container_concurrency = 80
      service_account_name  = "131818279954-compute@developer.gserviceaccount.com"
      timeout_seconds       = 300

      containers {
        args    = []
        command = []
        image   = "us-west2-docker.pkg.dev/wondertix-app/wtix-stg/client-img-stg:9c3723f"
        name    = null

        env {
          name  = "ENV"
          value = "stg"
        }
        env {
          name  = "REACT_APP_AUTH0_CLIENT_ID"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "AUTH0_CLIENT_ID"
            }
          }
        }
        env {
          name  = "REACT_APP_PUBLIC_STRIPE_KEY"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "PUBLIC_STRIPE_KEY"
            }
          }
        }
        env {
          name  = "REACT_APP_WEBSOCKET_URL"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "WEBSOCKET_URL"
            }
          }
        }

        ports {
          container_port = 8080
          name           = "http1"
          protocol       = null
        }

        resources {
          limits = {
            "cpu"    = "4"
            "memory" = "4Gi"
          }
          requests = {}
        }

        startup_probe {
          failure_threshold     = 1
          initial_delay_seconds = 0
          period_seconds        = 240
          timeout_seconds       = 240

          tcp_socket {
            port = 8080
          }
        }
      }
    }
  }

  traffic {
    latest_revision = false
    percent         = 100
    revision_name   = "wtix-client-stg-9c3723f"
    tag             = null
    url             = null
  }
}


resource "google_cloud_run_service" "wtix_server_dev" {
  autogenerate_revision_name = false
  location                   = "us-west1"
  name                       = "wtix-server-dev"
  project                    = var.project
  metadata {
    annotations = {}
    labels      = {}
    namespace   = "wondertix-app"
  }

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"        = "10"
        "autoscaling.knative.dev/minScale"        = "1"
        "run.googleapis.com/client-name"          = "gcloud"
        "run.googleapis.com/client-version"       = "473.0.0"
        "run.googleapis.com/cloudsql-instances"   = "wondertix-app:us-west1:wtix-db-dev"
        "run.googleapis.com/startup-cpu-boost"    = "true"
        "run.googleapis.com/vpc-access-connector" = "projects/wondertix-app/locations/us-west1/connectors/default-connector"
        "run.googleapis.com/vpc-access-egress"    = "private-ranges-only"
      }
      labels = {
        "run.googleapis.com/startupProbeType" = "Default"
      }
      name             = "wtix-server-dev-9c3723f"
      namespace        = null
      resource_version = null
      self_link        = null
      uid              = null
    }
    spec {
      container_concurrency = 80
      service_account_name  = "131818279954-compute@developer.gserviceaccount.com"
      timeout_seconds       = 300

      containers {
        args    = []
        command = []
        image   = "us-west2-docker.pkg.dev/wondertix-app/wtix-dev/server-img-dev:9c3723f"
        name    = "server-img-dev-1"

        env {
          name  = "AUTH0_AUDIENCE"
          value = "https://wtix-server-dev-3ps4rkx4ga-uw.a.run.app"
        }
        env {
          name  = "AUTH0_URL"
          value = "https://wtix-dev.us.auth0.com"
        }
        env {
          name  = "DATABASE_URL"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "DATABASE_URL"
            }
          }
        }
        env {
          name  = "DB_DATABASE"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "DB_DATABASE"
            }
          }
        }
        env {
          name  = "DB_HOST"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "DB_HOST"
            }
          }
        }
        env {
          name  = "DB_PASSWORD"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "DB_PASSWORD"
            }
          }
        }
        env {
          name  = "DB_PORT"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "DB_PORT"
            }
          }
        }
        env {
          name  = "DB_USER"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "DB_USER"
            }
          }
        }
        env {
          name  = "ENV"
          value = "dev"
        }
        env {
          name  = "FRONTEND_URL"
          value = "https://dev.wondertix.com"
        }
        env {
          name  = "GCLOUD_BUCKET"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "GCLOUD_BUCKET"
            }
          }
        }
        env {
          name  = "GCLOUD_KEY"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "GCLOUD_KEY"
            }
          }
        }
        env {
          name  = "PRIVATE_STRIPE_KEY"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "PRIVATE_STRIPE_KEY"
            }
          }
        }
        env {
          name  = "PRIVATE_STRIPE_WEBHOOK"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "PRIVATE_STRIPE_WEBHOOK"
            }
          }
        }
        env {
          name  = "ROOT_URL"
          value = "https://wtix-server-dev-3ps4rkx4ga-uw.a.run.app"
        }
        env {
          name  = "SHOULD_SEED"
          value = "true"
        }
        env {
          name  = "WEBSOCKET_URL"
          value = null

          value_from {
            secret_key_ref {
              key  = "dev"
              name = "WEBSOCKET_URL"
            }
          }
        }

        ports {
          container_port = 8080
          name           = "http1"
          protocol       = null
        }

        resources {
          limits = {
            "cpu"    = "1"
            "memory" = "4Gi"
          }
          requests = {}
        }

        startup_probe {
          failure_threshold     = 1
          initial_delay_seconds = 0
          period_seconds        = 240
          timeout_seconds       = 240

          tcp_socket {
            port = 8080
          }
        }
      }
    }
  }

  traffic {
    latest_revision = false
    percent         = 100
    revision_name   = "wtix-server-dev-9c3723f"
    tag             = null
    url             = null
  }
}


resource "google_cloud_run_service" "wtix_server_prd" {
  autogenerate_revision_name = false
  location                   = "us-west1"
  name                       = "wtix-server-prd"
  project                    = var.project
  metadata {
    annotations = {}
    labels      = {}
    namespace   = "wondertix-app"
  }

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"        = "10"
        "autoscaling.knative.dev/minScale"        = "1"
        "run.googleapis.com/client-name"          = "gcloud"
        "run.googleapis.com/client-version"       = "466.0.0"
        "run.googleapis.com/cloudsql-instances"   = "wondertix-app:us-west1:wtix-db-prd"
        "run.googleapis.com/startup-cpu-boost"    = "true"
        "run.googleapis.com/vpc-access-connector" = "projects/wondertix-app/locations/us-west1/connectors/default-connector"
        "run.googleapis.com/vpc-access-egress"    = "private-ranges-only"
      }
      labels = {
        "run.googleapis.com/startupProbeType" = "Default"
      }
      name             = "wtix-server-prd-f0cfa4a"
      namespace        = null
      resource_version = null
      self_link        = null
      uid              = null
    }
    spec {
      container_concurrency = 80
      service_account_name  = "131818279954-compute@developer.gserviceaccount.com"
      timeout_seconds       = 300

      containers {
        args    = []
        command = []
        image   = "us-west2-docker.pkg.dev/wondertix-app/wtix-prd/server-img-prd:f0cfa4a"
        name    = "server-img-prd-1"

        env {
          name  = "AUTH0_AUDIENCE"
          value = "https://wtix-server-prd-3ps4rkx4ga-uw.a.run.app"
        }
        env {
          name  = "AUTH0_URL"
          value = "https://wtix-prd.us.auth0.com"
        }
        env {
          name  = "DATABASE_URL"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "DATABASE_URL"
            }
          }
        }
        env {
          name  = "DB_DATABASE"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "DB_DATABASE"
            }
          }
        }
        env {
          name  = "DB_HOST"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "DB_HOST"
            }
          }
        }
        env {
          name  = "DB_PASSWORD"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "DB_PASSWORD"
            }
          }
        }
        env {
          name  = "DB_PORT"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "DB_PORT"
            }
          }
        }
        env {
          name  = "DB_USER"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "DB_USER"
            }
          }
        }
        env {
          name  = "ENV"
          value = "prd"
        }
        env {
          name  = "FRONTEND_URL"
          value = "https://www.wondertix.com"
        }
        env {
          name  = "GCLOUD_BUCKET"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "GCLOUD_BUCKET"
            }
          }
        }
        env {
          name  = "GCLOUD_KEY"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "GCLOUD_KEY"
            }
          }
        }
        env {
          name  = "PRIVATE_STRIPE_KEY"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "PRIVATE_STRIPE_KEY"
            }
          }
        }
        env {
          name  = "PRIVATE_STRIPE_WEBHOOK"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "PRIVATE_STRIPE_WEBHOOK"
            }
          }
        }
        env {
          name  = "ROOT_URL"
          value = "https://wtix-server-prd-3ps4rkx4ga-uw.a.run.app"
        }
        env {
          name  = "SHOULD_SEED"
          value = "false"
        }
        env {
          name  = "WEBSOCKET_URL"
          value = null

          value_from {
            secret_key_ref {
              key  = "prd"
              name = "WEBSOCKET_URL"
            }
          }
        }

        ports {
          container_port = 8080
          name           = "http1"
          protocol       = null
        }

        resources {
          limits = {
            "cpu"    = "2"
            "memory" = "4Gi"
          }
          requests = {}
        }

        startup_probe {
          failure_threshold     = 1
          initial_delay_seconds = 0
          period_seconds        = 240
          timeout_seconds       = 240

          tcp_socket {
            port = 8080
          }
        }
      }
    }
  }

  traffic {
    latest_revision = false
    percent         = 100
    revision_name   = "wtix-server-prd-f0cfa4a"
    tag             = null
    url             = null
  }
}


resource "google_cloud_run_service" "wtix_server_stg" {
  autogenerate_revision_name = false
  location                   = "us-west1"
  name                       = "wtix-server-stg"
  project                    = "wondertix-app"
  metadata {
    annotations = {}
    labels      = {}
    namespace   = "wondertix-app"
  }

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"        = "10"
        "autoscaling.knative.dev/minScale"        = "1"
        "run.googleapis.com/client-name"          = "gcloud"
        "run.googleapis.com/client-version"       = "473.0.0"
        "run.googleapis.com/cloudsql-instances"   = "wondertix-app:us-west1:wtix-db-stg"
        "run.googleapis.com/startup-cpu-boost"    = "true"
        "run.googleapis.com/vpc-access-connector" = "projects/wondertix-app/locations/us-west1/connectors/default-connector"
        "run.googleapis.com/vpc-access-egress"    = "private-ranges-only"
      }
      labels = {
        "run.googleapis.com/startupProbeType" = "Default"
      }
      name             = "wtix-server-stg-9c3723f"
      namespace        = null
      resource_version = null
      self_link        = null
      uid              = null
    }
    spec {
      container_concurrency = 80
      service_account_name  = "131818279954-compute@developer.gserviceaccount.com"
      timeout_seconds       = 300

      containers {
        args    = []
        command = []
        image   = "us-west2-docker.pkg.dev/wondertix-app/wtix-stg/server-img-stg:9c3723f"
        name    = "server-img-stg-1"

        env {
          name  = "AUTH0_AUDIENCE"
          value = "https://wtix-server-stg-3ps4rkx4ga-uw.a.run.app"
        }
        env {
          name  = "AUTH0_URL"
          value = "https://wtix-stg.us.auth0.com"
        }
        env {
          name  = "DATABASE_URL"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "DATABASE_URL"
            }
          }
        }
        env {
          name  = "DB_DATABASE"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "DB_DATABASE"
            }
          }
        }
        env {
          name  = "DB_HOST"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "DB_HOST"
            }
          }
        }
        env {
          name  = "DB_PASSWORD"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "DB_PASSWORD"
            }
          }
        }
        env {
          name  = "DB_PORT"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "DB_PORT"
            }
          }
        }
        env {
          name  = "DB_USER"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "DB_USER"
            }
          }
        }
        env {
          name  = "ENV"
          value = "stg"
        }
        env {
          name  = "FRONTEND_URL"
          value = "https://stg.wondertix.com"
        }
        env {
          name  = "GCLOUD_BUCKET"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "GCLOUD_BUCKET"
            }
          }
        }
        env {
          name  = "GCLOUD_KEY"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "GCLOUD_KEY"
            }
          }
        }
        env {
          name  = "PRIVATE_STRIPE_KEY"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "PRIVATE_STRIPE_KEY"
            }
          }
        }
        env {
          name  = "PRIVATE_STRIPE_WEBHOOK"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "PRIVATE_STRIPE_WEBHOOK"
            }
          }
        }
        env {
          name  = "ROOT_URL"
          value = "https://wtix-server-stg-3ps4rkx4ga-uw.a.run.app"
        }
        env {
          name  = "SHOULD_SEED"
          value = "false"
        }
        env {
          name  = "WEBSOCKET_URL"
          value = null

          value_from {
            secret_key_ref {
              key  = "stg"
              name = "WEBSOCKET_URL"
            }
          }
        }

        ports {
          container_port = 8080
          name           = "http1"
          protocol       = null
        }

        resources {
          limits = {
            "cpu"    = "2"
            "memory" = "4Gi"
          }
          requests = {}
        }

        startup_probe {
          failure_threshold     = 1
          initial_delay_seconds = 0
          period_seconds        = 240
          timeout_seconds       = 240

          tcp_socket {
            port = 8080
          }
        }
      }
    }
  }

  traffic {
    latest_revision = false
    percent         = 100
    revision_name   = "wtix-server-stg-9c3723f"
    tag             = null
    url             = null
  }
}