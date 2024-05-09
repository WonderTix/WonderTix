terraform {
  required_version = ">= 1.8.2"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 5.26.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.6.1"
    }
  }

  backend "gcs" {
    bucket      = "runapps_default-tomuod"
    prefix      = "terraform/tfstate/"
    credentials = "../service-account-key.json"
  }
}

provider "google" {
  credentials = file("../service-account-key.json")
  project     = var.project
}

provider "random" {
  # Configuration options
}


resource "random_string" "revision_suffix" {
  length  = 7     # Length of the random string
  special = false # Set to true if you want to include special characters
  upper   = false # Set to true if you want to include uppercase letters
}