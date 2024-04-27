terraform {
  required_version = ">= 1.8.2"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 5.26.0"
    }
  }
}

provider "google" {
  credentials = file("../service-account-key.json")
  project     = "wondertix-app"
}
