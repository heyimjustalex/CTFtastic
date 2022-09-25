terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = ">= 2.13.0"
    }
  }
}

resource "docker_image" "nginx" {
  name         = "nginx:latest"
  keep_locally = true //prob needs to be false on prod
}

module "network_mod" {
  source = "./network_module"
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.latest
  count = var.challenge_count
  name  = "test_${count.index}_${module.network_mod.network_name}"
  ports {
    internal = 80
  }
  networks_advanced {
    name = module.network_mod.network_name
  }
}