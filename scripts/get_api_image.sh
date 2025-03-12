#!/bin/bash

AWS_ECR_PCA_REPOSITORY_NAME=$(sed -e 's#.*\/\(\)#\1#' <<< ${AWS_ECR_PCA_REPOSITORY})
API_IMAGE_METADATA=$(aws ecr describe-images --region $AWS_REGION --repository-name $AWS_ECR_PCA_REPOSITORY_NAME \
--query 'sort_by(imageDetails,& imagePushedAt)[-1]' | jq --raw-output '.')

API_IMAGE_TAG=$(jq --raw-output '.imageTags[0]' <<< $API_IMAGE_METADATA)
API_IMAGE="$AWS_ECR_PCA_REPOSITORY:$API_IMAGE_TAG"

echo -e "\
api_image          = \"${API_IMAGE}\"
" >> ./scripts/terraform/aws/variables.tfvars
