#!/bin/bash
set -e

aws s3 cp ${AWS_IRI_TERRAFORM_STATE_S3} ./iri-terraform-state.json


VPC_ID=$(cat ./iri-terraform-state.json | jq --raw-output '.outputs.vpc_id.value')
SUBNET_ID=$(cat ./iri-terraform-state.json | jq --raw-output '.outputs.subnet_pc.value')

DATABASE_URL=$(cat ./iri-terraform-state.json | jq --raw-output '.outputs.database.value')
DATABASE_USER=port_connect_dev
DATABASE_TABLE=port_connect_dev
DATABASE_PASS=$(cat ./iri-terraform-state.json | jq --raw-output '.outputs.database_pc_pass.value')

AWS_ECS_EXECUTION_ROLE=$(cat ./iri-terraform-state.json | jq --raw-output '.outputs.ecs_task_execution_role.value')

AWS_ECR_REPOSITORY=$(cat ./iri-terraform-state.json | jq --raw-output '.outputs.ecr_pcc.value')
IMAGE=${AWS_ECR_REPOSITORY}:${IMAGE_TAG}


echo -e "\
access_key=\"${AWS_ACCESS_KEY}\"
secret_key=\"${AWS_SECRET_KEY}\"\
" > ./scripts/terraform/aws/backend-config.hcl

echo -e "\
aws_access_key     = \"${AWS_ACCESS_KEY}\"
aws_secret_key     = \"${AWS_SECRET_KEY}\"
aws_region         = \"${AWS_REGION}\"
vpc_id             = \"${VPC_ID}\"
subnet_id          = \"${SUBNET_ID}\"
database_url       = \"postgresql://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_URL}/${DATABASE_TABLE}\"
image              = \"${IMAGE}\"
execution_role_arn = \"${AWS_ECS_EXECUTION_ROLE}\"\
" > ./scripts/terraform/aws/variables.tfvars
