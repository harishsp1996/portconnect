resource "aws_ecs_cluster" "port_connect_cluster" {
  name = "DEV-PC-Cluster"
}

resource "aws_ecs_cluster_capacity_providers" "port_connect_fargate" {
  cluster_name = aws_ecs_cluster.port_connect_cluster.name

  capacity_providers = [
    "FARGATE_SPOT",
    "FARGATE",
  ]
}

resource "aws_ecs_task_definition" "port_connect_task_definition" {
  family                   = "port-connect"
  cpu                      = 256
  memory                   = 512
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"

  execution_role_arn = var.execution_role_arn

  container_definitions = jsonencode([
    {
      "name" : var.ecs_task_container_name,
      "image" : var.image,
      "essential" : true,
      "environment" : [],
      "portMappings" : [
        {
          "containerPort" : var.port,
          "hostPort" : var.port,
          "protocol" : "tcp"
        }
      ],
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-group" : aws_cloudwatch_log_group.port_connect_client_logs.name,
          "awslogs-region" : var.aws_region,
          "awslogs-stream-prefix" : "port-connect-client"
        }
      },
      "command" : [
        "start"
      ]
    },
    {
      "name" : "port-connect-api",
      "image" : var.api_image,
      "essential" : true,
      "environment" : [],
      "portMappings" : [
        {
          "containerPort" : 8181,
          "hostPort" : 8181,
          "protocol" : "tcp"
        }
      ],
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-group" : aws_cloudwatch_log_group.port_connect_api_logs.name,
          "awslogs-region" : var.aws_region,
          "awslogs-stream-prefix" : "port-connect-api"
        }
      },
      "command" : [
        "start"
      ]
    }
  ])
}

data "aws_subnet" "private1" {
  id = var.subnet_id
}

resource "aws_ecs_service" "port_connect_service" {
  name            = "port-connect"
  cluster         = aws_ecs_cluster.port_connect_cluster.id
  task_definition = aws_ecs_task_definition.port_connect_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [data.aws_subnet.private1.id]
    security_groups = [aws_security_group.port_connect_client_security_group.id]
  }

  load_balancer {
    container_name   = var.ecs_task_container_name
    target_group_arn = aws_lb_target_group.port_connect_client_lb_target_group.arn
    container_port   = var.port
  }
}

resource "aws_ecs_task_set" "port_connect_client_task_set" {
  service         = aws_ecs_service.port_connect_service.name
  cluster         = aws_ecs_cluster.port_connect_cluster.arn
  task_definition = aws_ecs_task_definition.port_connect_task_definition.arn

  wait_until_stable = true
}
