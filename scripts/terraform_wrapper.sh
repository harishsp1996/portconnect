#!/bin/bash
set -e

error_msg="ECS TaskSet: empty output"

cd ./scripts/terraform/aws/

terraform init -backend-config=backend-config.hcl
terraform apply -var-file=variables.tfvars --auto-approve 2>&1 | tee tf_output

ecs_error=$(cat tf_output | grep "$error_msg")

if ! [[ -z "$ecs_error" ]]; then
    echo "Success: (ECS TaskSet Error) - ignore (this is a known issue)"
    exit 0
else
    echo "Error: terraform apply failed"
    exit 1
fi
