FROM python:3.8-alpine

RUN apk update
RUN pip install --no-cache-dir pipenv
COPY ./challs_operator/requirements.txt  ./
RUN pip install -r requirements.txt

RUN apk add curl
RUN apk add openssl
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | sh

RUN apk add img

WORKDIR /usr/src/app
COPY ./helm_charts ./challs_operator/bootstrap.sh ./challs_operator/chall_operator.py ./challs_operator/Dockerfile.test ./
RUN chmod 700 ./bootstrap.sh

EXPOSE 5000
ENTRYPOINT ["/usr/src/app/bootstrap.sh"]