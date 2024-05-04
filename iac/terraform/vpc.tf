# GCP Virtual Private Cloud (VPC)
#
# VPCs provide networking services to GCP resources, allowing you to define a network
# space and control traffic flow between resources, such as VM instances, databases,
# and load balancers.
#
# References:
# https://cloud.google.com/vpc/docs
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_network

resource "google_compute_network" "vpc" {
  name                                      = var.network_name
  project                                   = var.project
  description                               = var.network_description
  routing_mode                              = var.routing_mode
  auto_create_subnetworks                   = var.auto_create_subnetworks
  mtu                                       = var.mtu
  enable_ula_internal_ipv6                  = var.enable_ula_internal_ipv6
  internal_ipv6_range                       = var.internal_ipv6_range
  delete_default_routes_on_create           = var.delete_default_routes_on_create
  network_firewall_policy_enforcement_order = var.network_firewall_policy_enforcement_order
}