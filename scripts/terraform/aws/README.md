# Terraform script for deploying AWS infrastructure

Creates an ECS cluster with a service and task running, and all required networking resources.

1. Copy and edit `backend-config.example.hcl` -> `backend-config.hcl` and `variables.example.tfvars` -> `variables.tfvars`
2. Run
   ```bash
    /scripts/terraform/aws> terraform init -backend-config="backend-config.hcl"
    /scripts/terraform/aws> terraform apply/destroy -var-file="variables-tfvars"
   ```
