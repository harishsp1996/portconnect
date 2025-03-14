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

resource "aws_instance" "ec2_instance" {
  ami           = "ami-0912f71e06545ad88"  # Replace with a valid AMI
  instance_type = "t3.medium"
  key_name      = "CICD" # Ensure this key pair exists in AWS

  # Use existing security group
  vpc_security_group_ids = [data.aws_security_group.existing_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo amazon-linux-extras enable docker
              sudo yum install -y docker
              sudo service docker start
              sudo usermod -aG docker ec2-user
              sudo chmod 666 /var/run/docker.sock  # Ensure ec2-user can run docker

              # Run the Docker container
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
