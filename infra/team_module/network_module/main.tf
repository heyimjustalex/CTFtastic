terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = ">= 2.13.0"
    }
  }
}

resource "random_string" "random_str" {
  length = 12
  special = false
  keepers = {
    test = "1"
  }
}

resource "docker_network" "team_network" {
  name = join("_", ["team_network", "${random_string.random_str.result}"])
  driver = "bridge" 
}