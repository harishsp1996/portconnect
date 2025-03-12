# Terraform script for AWS backend remote state

Creates an AWS S3 bucket for storing the Terraform backend state file and a DynamoDB table for state locking.
Do not destroy!

## Run

1. Copy and edit `variables.example.tfvars` -> `variables.tfvars`

2. Run
   ```bash
      /scripts/terraform/aws-remote-state> terraform init
      /scripts/terraform/aws-remote-state> terraform apply -var-file="variables.tfvars"
   ```
