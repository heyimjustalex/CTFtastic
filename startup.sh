#!/bin/bash

#install docker

sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

#install minikube

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

#build images

#TODO

#add docker to special user group 

sudo usermod -aG docker $USER && newgrp docker

#install helm

curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

#install kubectl

curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

#install yq

wget https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O /usr/bin/yq && chmod +x /usr/bin/yq

#start minikube and install ingress addon

minikube start
minikube addons enable ingress
minikube ssh 'mkdir registry'
minikube ssh 'mkdir workspace'

#load images to minikube

# TODO

#start application

yq -i ".host = \"$1\"" ./infra/helm_charts/teamchallenges/values.yaml

helm install ctftastic ./infra/helm_charts/ctftastic --set ingress.hosts.host=$1

kubectl port-forward --address 0.0.0.0 service/ingress-nginx-controller -n ingress-nginx 8000:80