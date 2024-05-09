variable "project" {
  description = "The GCP project ID where the resources will be allocated."
  type        = string
}


######################### VPC ###############################
variable "network_name" {
  description = "Name of the VPC network."
  type        = string
  default     = "default"
}

variable "network_description" {
  description = "Description for the VPC network."
  type        = string
  default     = "Default network for the project"
}

variable "routing_mode" {
  description = "The network routing mode (REGIONAL or GLOBAL)."
  type        = string
  default     = "REGIONAL"
}

variable "auto_create_subnetworks" {
  description = "Indicates whether to automatically create subnetworks."
  type        = bool
  default     = true
}

variable "mtu" {
  description = "The Maximum Transmission Unit (MTU) size for the network. Set to 0 to use the default MTU size."
  type        = number
  default     = 0
}

variable "enable_ula_internal_ipv6" {
  description = "Enable or disable the usage of internal IPv6 Unique Local Addresses (ULA) on the network."
  type        = bool
  default     = false
}

variable "internal_ipv6_range" {
  description = "Custom internal IPv6 range. Set to null if no custom range is defined."
  type        = string
  default     = null
}

variable "delete_default_routes_on_create" {
  description = "Indicates whether default routes are deleted on creation."
  type        = bool
  default     = false
}

variable "network_firewall_policy_enforcement_order" {
  description = "Order of firewall policy enforcement."
  type        = string
  default     = "AFTER_CLASSIC_FIREWALL"
}


###################### SQL INSTANCE ##########################
variable "database_region" {
  description = "The region where the instance is located."
}

variable "database_version" {
  description = "The version of PostgreSQL to use."
}

variable "deletion_protection" {
  description = "Whether deletion protection is enabled for the instance."
  type        = bool
}

variable "instance_type" {
  description = "The type of instance to create."
}

variable "maintenance_version" {
  description = "The specific maintenance version of PostgreSQL to use."
}

variable "activation_policy" {
  description = "The activation policy for the instance."
}

variable "connector_enforcement" {
  description = "The connector enforcement setting."
}

variable "deletion_protection_enabled" {
  description = "Whether deletion protection is enabled in settings."
  type        = bool
}

variable "disk_autoresize" {
  description = "Whether disk autoresize is enabled."
  type        = bool
}

variable "disk_autoresize_limit" {
  description = "The maximum size to which the disk can grow."
  type        = number
}

variable "disk_size" {
  description = "The size of the disk in GB."
  type        = number
}

variable "disk_type" {
  description = "The type of disk to use."
}

variable "edition" {
  description = "The edition of the instance."
}

variable "pricing_plan" {
  description = "The pricing plan for the instance."
}

variable "backup_binary_log_enabled" {
  description = "Whether binary log is enabled for backups."
  type        = bool
}

variable "backup_enabled" {
  description = "Whether backups are enabled."
  type        = bool
}

variable "backup_location" {
  description = "The location for backups."
}

variable "backup_point_in_time_recovery_enabled" {
  description = "Whether point-in-time recovery is enabled for backups."
  type        = bool
}

variable "backup_transaction_log_retention_days" {
  description = "The retention period for transaction logs in days."
  type        = number
}

variable "backup_retained_backups" {
  description = "The number of retained backups."
  type        = number
}

variable "backup_retention_unit" {
  description = "The retention unit for backups."
}

variable "query_string_length" {
  description = "The maximum length of a query string to log."
  type        = number
}

variable "record_application_tags" {
  description = "Whether to record application tags."
  type        = bool
}

variable "record_client_address" {
  description = "Whether to record client addresses."
  type        = bool
}

variable "enable_private_path_for_google_cloud_services" {
  description = "Whether private paths are enabled for Google Cloud services."
  type        = bool
}

variable "private_network" {
  description = "The private network to which the instance should be attached."
}

variable "require_ssl" {
  description = "Whether SSL is required."
  type        = bool
}

variable "maintenance_window_hour" {
  description = "The hour of the day when maintenance should occur."
  type        = number
}


###################### CLOUD RUN ##########################
variable "service_account_name" {
  description = "The service account used by the Cloud Run services."
  type        = string
}

variable "container_concurrency" {
  description = "The number of requests that can be processed simultaneously by a single container instance."
  type        = number
}

variable "timeout_seconds" {
  description = "The maximum duration in seconds that a request can take before being terminated by Cloud Run."
  type        = number
}

variable "namespace" {
  description = "The namespace in which the services are deployed."
  type        = string
}

variable "startup_probe_config" {
  description = "Default configuration for startup probes."
  type = object({
    failure_threshold     = number
    initial_delay_seconds = number
    period_seconds        = number
    timeout_seconds       = number
  })
  default = {
    failure_threshold     = 1
    initial_delay_seconds = 0
    period_seconds        = 240
    timeout_seconds       = 240
  }
}

variable "tcp_socket_config" {
  description = "Configuration for TCP socket in startup probes"
  type = object({
    port = number
  })
  default = {
    port = 8080
  }
}