data "aws_vpc" "dev" {
  id = var.vpc_id
}

resource "aws_security_group" "port_connect_client_security_group" {
  name        = "dev-pc-service-access"
  description = "Allow HTTP and ICMP to CP service"
  vpc_id      = data.aws_vpc.dev.id

  ingress {
    from_port   = var.port
    to_port     = var.port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "port_connect_client_lb" {
  name               = "port-connect-client-internal"
  internal           = true
  load_balancer_type = "network"
  subnets            = [data.aws_subnet.private1.id]
}

resource "aws_lb_target_group" "port_connect_client_lb_target_group" {
  name        = "port-connect-client"
  port        = var.port
  protocol    = "TCP"
  target_type = "ip"
  vpc_id      = data.aws_vpc.dev.id
}

resource "aws_lb_listener" "port_connect_client_lb_listener" {
  load_balancer_arn = aws_lb.port_connect_client_lb.arn
  port              = var.port
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.port_connect_client_lb_target_group.arn
  }
}
