provider "aws" {
  region = "ap-south-1"  # Mumbai Region
}

# Fetch existing security group
data "aws_security_group" "existing_sg" {
  filter {
    name   = "group-name"
    values = ["ec2_security_group"]  # Ensure this SG exists in AWS
  }

  filter {
    name   = "vpc-id"
    values = ["vpc-01d85217c7e5d29ed"]  # Use your actual VPC ID
  }
}

# Fetch the latest Amazon Linux 2 AMI
data "aws_ami" "latest_amazon_linux" {
  most_recent = true
  owners      = ["amazon"]  # Official Amazon AMIs
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_instance" "ec2_instance" {
  ami                    = data.aws_ami.latest_amazon_linux.id
  instance_type          = "t3.medium"
  key_name               = "CICD" # Ensure this key pair exists in AWS
  vpc_security_group_ids = [data.aws_security_group.existing_sg.id]

  # Ensure security group is fetched before creating the instance
  depends_on = [data.aws_security_group.existing_sg]

  user_data = <<-EOF
              #!/bin/bash
              exec > /var/log/user-data.log 2>&1
              set -x

              echo "Updating system packages..."
              sudo yum update -y

              echo "Installing Docker..."
              sudo amazon-linux-extras enable docker
              sudo yum install -y docker
              sudo systemctl start docker
              sudo systemctl enable docker

              echo "Configuring Docker permissions..."
              sudo usermod -aG docker ec2-user
              sudo chmod 666 /var/run/docker.sock

              # Wait for Docker to be ready
              sleep 10

              echo "Pulling and running the Docker container..."
              docker stop portconnect || true
              docker rm portconnect || true
              docker pull harishsp1996/portconnect:latest
              docker run -d --name portconnect -p 80:80 harishsp1996/portconnect:latest
  EOF

  tags = {
    Name = "Docker-EC2-Instance"
  }
}

output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.ec2_instance.public_ip
}

output "instance_id" {
  description = "ID of the created EC2 instance"
  value       = aws_instance.ec2_instance.id
}
