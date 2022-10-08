# CTFtastic

## ABOUT TOOLS

### CONTAINERS

Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels. Because all of the containers share the services of a single operating system kernel, they use fewer resources than virtual machines.

### DOCKER

Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called containers. For our needs we will use Docker runtime and Docker Swarm.

### TERRAFORM

Terraform is an open-source, IAC (Infrastructure as Code), software tool created by HashiCorp. It will help us to provide container infrastructure in a declarative manner.

## INFRASTRUCTURE

Our GUI application with simple backend will be a main component from which CTF admin will be able to control the rest of the infrastructure. It will be containerized aswell and sit on the main Docker Swarm node among challenges containers, however isolated from them.

The rest of the containers are going to be deployed with Terraform and scripts. Each set of challenges for each team will have its own docker network.

CTF Admin is required to use provided base image when creating CTF challenges (for now we will only support Jeopardy). It is required because provided images will have resource monitoring software installed.

#### SOURCES

https://www.docker.com/

https://www.terraform.io/
