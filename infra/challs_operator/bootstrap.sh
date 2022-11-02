#!/bin/sh
export FLASK_APP=./chall_operator.py
pipenv run flask --debug run -h 0.0.0.0