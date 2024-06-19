project = "wondertix-app"


######################### VPC ###############################
network_name                              = "default"
network_description                       = "Default network for the project"
routing_mode                              = "REGIONAL"
auto_create_subnetworks                   = true
mtu                                       = 0
enable_ula_internal_ipv6                  = false
internal_ipv6_range                       = null
delete_default_routes_on_create           = false
network_firewall_policy_enforcement_order = "AFTER_CLASSIC_FIREWALL"


###################### SQL INSTANCE ##########################
database_region     = "us-west1"
database_version    = "POSTGRES_15"
deletion_protection = true
instance_type       = "CLOUD_SQL_INSTANCE"
maintenance_version = "POSTGRES_15_5.R20240130.00_05"
# Settings Configuration
activation_policy           = "ALWAYS"
connector_enforcement       = "NOT_REQUIRED"
deletion_protection_enabled = true
disk_autoresize             = true
disk_autoresize_limit       = 0
disk_size                   = 10
disk_type                   = "PD_SSD"
edition                     = "ENTERPRISE"
pricing_plan                = "PER_USE"
# Backup Configuration
backup_binary_log_enabled             = false
backup_enabled                        = true
backup_location                       = "us"
backup_point_in_time_recovery_enabled = true
backup_transaction_log_retention_days = 7
backup_retained_backups               = 7
backup_retention_unit                 = "COUNT"
# Insights Configuration
record_application_tags = false
record_client_address   = false
query_string_length     = 1024
# IP Configuration
enable_private_path_for_google_cloud_services = true
private_network                               = "projects/wondertix-app/global/networks/default"
require_ssl                                   = false
# Maintenance Window
maintenance_window_hour = 0


###################### CLOUD RUN ##########################
service_account_name  = "131818279954-compute@developer.gserviceaccount.com"
container_concurrency = 80
timeout_seconds       = 300
namespace             = "wondertix-app"
startup_probe_config = {
  failure_threshold     = 1
  initial_delay_seconds = 0
  period_seconds        = 240
  timeout_seconds       = 240
}
tcp_socket_config = {
  port = 8080
}