resource "aws_cloudwatch_log_group" "port_connect_client_logs" {
  name = "AWS-DEV-PCC"

  retention_in_days = 7
}

resource "aws_cloudwatch_log_group" "port_connect_api_logs" {
  name = "AWS-DEV-PCA"

  retention_in_days = 7
}
