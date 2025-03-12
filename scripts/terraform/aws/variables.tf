variable "aws_access_key" {}
variable "aws_secret_key" {}

variable "aws_region" {}
variable "vpc_id" {}
variable "subnet_id" {}
variable "execution_role_arn" {}

variable "database_url" {}
variable "image" {}
variable "api_image" {
  default = ""
}

variable "port" {
  default = 443
}

variable "ecs_task_container_name" {
  default = "port-connect-client"
}
