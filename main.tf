provider "aws" {
  region = "ap-south-1"  # Mumbai Region
}

resource "aws_security_group" "ec2_sg" {
  name        = "ec2_security_group"
  description = "Allow inbound SSH and HTTP"

  # Allow SSH from anywhere (Change to your IP for security)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Change this to your IP for security
  }

  # Allow HTTP access
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outgoing traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "ec2_instance" {
  ami           = "ami-0912f71e06545ad88"  # Replace with a valid Amazon Linux AMI ID
  instance_type = "t3.medium"
  key_name      = "CICD" # Ensure this key pair exists in AWS
  security_groups = [aws_security_group.ec2_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo amazon-linux-extras enable docker
              sudo yum install -y docker
              sudo service docker start
              sudo usermod -aG docker ec2-user
              EOF

  tags = {
    Name = "Docker-EC2-Instance"
  }
}

output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.ec2_instance.public_ip
}

