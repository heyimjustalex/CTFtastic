#!/bin/bash

mkdir -p /home/docker/registry/certs
cd /home/docker/registry/certs
openssl req \
 -x509 -newkey rsa:4096 -days 365 -config openssl.conf \
 -keyout certs/domain.key -out certs/domain.crt
