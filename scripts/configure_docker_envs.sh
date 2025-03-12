#!/bin/bash
set -e

aws s3 cp ${AWS_IRI_TERRAFORM_STATE_S3} ./iri-terraform-state.json

AWS_ECR_REPOSITORY=$(cat ./iri-terraform-state.json | jq --raw-output '.outputs.ecr_pcc.value')
IMAGE=${AWS_ECR_REPOSITORY}:${IMAGE_TAG}
AWS_ECR_ROLE=$(cat ./iri-terraform-state.json | jq --raw-output '.outputs.ghactions_ecr_role.value')
AWS_ECR_PCA_REPOSITORY=$(cat ./iri-terraform-state.json | jq --raw-output '.outputs.ecr_pca.value')

echo "AWS_ECR_REPOSITORY=${AWS_ECR_REPOSITORY}" >> ${GITHUB_ENV}
echo "AWS_ECR_PCA_REPOSITORY=${AWS_ECR_PCA_REPOSITORY}" >> ${GITHUB_ENV}
echo "IMAGE=${IMAGE}" >> ${GITHUB_ENV}
echo "AWS_ECR_ROLE=${AWS_ECR_ROLE}" >> ${GITHUB_ENV}
