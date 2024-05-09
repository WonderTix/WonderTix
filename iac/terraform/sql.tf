# GCP SQL Instances
#
# Cloud SQL instances provide fully managed relational database services in GCP.
# This configuration specifies the instance settings, database version, and
# machine type, among other options.
#
# References:
# https://cloud.google.com/sql/docs/postgres
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance

resource "google_sql_database_instance" "dev" {
  database_version    = var.database_version
  deletion_protection = var.deletion_protection
  instance_type       = var.instance_type
  maintenance_version = var.maintenance_version
  name                = "wtix-db-dev"
  project             = var.project
  region              = var.database_region

  settings {
    activation_policy           = var.activation_policy
    availability_type           = "ZONAL"
    connector_enforcement       = var.connector_enforcement
    deletion_protection_enabled = var.deletion_protection_enabled
    disk_autoresize             = var.disk_autoresize
    disk_autoresize_limit       = var.disk_autoresize_limit
    disk_size                   = var.disk_size
    disk_type                   = var.disk_type
    edition                     = var.edition
    pricing_plan                = var.pricing_plan
    tier                        = "db-g1-small"
    user_labels                 = {}

    backup_configuration {
      binary_log_enabled             = var.backup_binary_log_enabled
      enabled                        = var.backup_enabled
      location                       = var.backup_location
      point_in_time_recovery_enabled = var.backup_point_in_time_recovery_enabled
      // Set backup start time to 15:00 UTC to align with 8:00 Pacific Daylight Time,
      // which is UTC-7 during daylight savings time. ADJUST THIS TIME when daylight
      // savings time begins or ends to maintin desired local backup time!
      start_time                     = "15:00"
      transaction_log_retention_days = var.backup_transaction_log_retention_days

      backup_retention_settings {
        retained_backups = var.backup_retained_backups
        retention_unit   = var.backup_retention_unit
      }
    }

    insights_config {
      query_insights_enabled  = true
      query_plans_per_minute  = 5
      query_string_length     = var.query_string_length
      record_application_tags = var.record_application_tags
      record_client_address   = var.record_client_address
    }

    ip_configuration {
      enable_private_path_for_google_cloud_services = var.enable_private_path_for_google_cloud_services
      ipv4_enabled                                  = true
      private_network                               = var.private_network
      require_ssl                                   = var.require_ssl

      authorized_networks {
        name  = "Ben Williams IP"
        value = "174.127.156.153"
      }
    }

    location_preference {
      zone = "us-west1-c"
    }

    maintenance_window {
      hour = var.maintenance_window_hour
    }
  }
}

resource "google_sql_database_instance" "stg" {
  database_version    = var.database_version
  deletion_protection = var.deletion_protection
  instance_type       = var.instance_type
  maintenance_version = var.maintenance_version
  name                = "wtix-db-stg"
  project             = var.project
  region              = var.database_region

  settings {
    activation_policy           = var.activation_policy
    availability_type           = "ZONAL"
    connector_enforcement       = var.connector_enforcement
    deletion_protection_enabled = var.deletion_protection_enabled
    disk_autoresize             = var.disk_autoresize
    disk_autoresize_limit       = var.disk_autoresize_limit
    disk_size                   = var.disk_size
    disk_type                   = var.disk_type
    edition                     = var.edition
    pricing_plan                = var.pricing_plan
    tier                        = "db-f1-micro"
    user_labels                 = {}

    backup_configuration {
      binary_log_enabled             = var.backup_binary_log_enabled
      enabled                        = var.backup_enabled
      location                       = var.backup_location
      point_in_time_recovery_enabled = var.backup_point_in_time_recovery_enabled
      // Set backup start time to 15:00 UTC to align with 8:00 Pacific Daylight Time,
      // which is UTC-7 during daylight savings time. ADJUST THIS TIME when daylight
      // savings time begins or ends to maintin desired local backup time!
      start_time                     = "17:00"
      transaction_log_retention_days = var.backup_transaction_log_retention_days

      backup_retention_settings {
        retained_backups = var.backup_retained_backups
        retention_unit   = var.backup_retention_unit
      }
    }

    insights_config {
      query_insights_enabled  = false
      query_plans_per_minute  = 0
      query_string_length     = var.query_string_length
      record_application_tags = var.record_application_tags
      record_client_address   = var.record_client_address
    }

    ip_configuration {
      enable_private_path_for_google_cloud_services = var.enable_private_path_for_google_cloud_services
      ipv4_enabled                                  = true
      private_network                               = var.private_network
      require_ssl                                   = var.require_ssl

      authorized_networks {
        name  = "Ben IP"
        value = "174.127.156.153"
      }
      authorized_networks {
        name  = "sql connect at time 2023-12-31 09:14:45.524051+00:00"
        value = "34.168.241.83"
      }
      authorized_networks {
        name  = "sql connect at time 2023-12-31 09:17:09.517919+00:00"
        value = "34.168.241.83"
      }
      authorized_networks {
        name  = "sql connect at time 2023-12-31 09:18:42.635802+00:00"
        value = "34.168.241.83"
      }
    }

    location_preference {
      zone = "us-west1-c"
    }

    maintenance_window {
      hour = var.maintenance_window_hour
    }
  }
}


resource "google_sql_database_instance" "prd" {
  database_version    = var.database_version
  deletion_protection = var.deletion_protection
  instance_type       = var.instance_type

  maintenance_version = var.maintenance_version
  name                = "wtix-db-prd"

  project = var.project
  region  = var.database_region

  settings {
    activation_policy           = var.activation_policy
    availability_type           = "REGIONAL"
    connector_enforcement       = var.connector_enforcement
    deletion_protection_enabled = var.deletion_protection_enabled
    disk_autoresize             = var.disk_autoresize
    disk_autoresize_limit       = var.disk_autoresize_limit
    disk_size                   = var.disk_size
    disk_type                   = var.disk_type
    edition                     = var.edition
    pricing_plan                = var.pricing_plan
    tier                        = "db-f1-micro"
    user_labels                 = {}

    backup_configuration {
      binary_log_enabled             = var.backup_binary_log_enabled
      enabled                        = var.backup_enabled
      location                       = var.backup_location
      point_in_time_recovery_enabled = var.backup_point_in_time_recovery_enabled
      // Set backup start time to 15:00 UTC to align with 8:00 Pacific Daylight Time,
      // which is UTC-7 during daylight savings time. ADJUST THIS TIME when daylight
      // savings time begins or ends to maintin desired local backup time!
      start_time                     = "08:00"
      transaction_log_retention_days = var.backup_transaction_log_retention_days

      backup_retention_settings {
        retained_backups = var.backup_retained_backups
        retention_unit   = var.backup_retention_unit
      }
    }

    insights_config {
      query_insights_enabled  = false
      query_plans_per_minute  = 0
      query_string_length     = var.query_string_length
      record_application_tags = var.record_application_tags
      record_client_address   = var.record_client_address
    }

    ip_configuration {
      enable_private_path_for_google_cloud_services = var.enable_private_path_for_google_cloud_services
      ipv4_enabled                                  = false
      private_network                               = var.private_network
      require_ssl                                   = var.require_ssl
    }

    location_preference {
      zone = "us-west1-c"
    }

    maintenance_window {
      hour = var.maintenance_window_hour
    }
  }
}

