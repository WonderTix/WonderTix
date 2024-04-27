# GCP Virtual Private Cloud (VPC)
# VPCs provide networking services to GCP resources, allowing you to define a network
# space and control traffic flow between resources, such as VM instances, databases,
# and load balancers.
#
# https://cloud.google.com/vpc/docs
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_network

resource "google_compute_network" "vpc" {
    auto_create_subnetworks                   = true
    delete_default_routes_on_create           = false
    description                               = "Default network for the project"
    enable_ula_internal_ipv6                  = false
    gateway_ipv4                              = null
    # id                                        = "projects/wondertix-app/global/networks/default"
    internal_ipv6_range                       = null
    mtu                                       = 0
    name                                      = "default"
    network_firewall_policy_enforcement_order = "AFTER_CLASSIC_FIREWALL"
    # numeric_id                                = "914625452179786127"
    project                                   = "wondertix-app"
    routing_mode                              = "REGIONAL"
    # self_link                                 = "https://www.googleapis.com/compute/v1/projects/wondertix-app/global/networks/default"
}