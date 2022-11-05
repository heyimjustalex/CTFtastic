from flask import Flask, jsonify, request, make_response
from kubernetes import client, config, utils
import os
import yaml
import subprocess

app = Flask(__name__)

keys_validation_start = set(['teamName', 'teamHash', 'challenges'])
keys_validation_stop = set(['teamName'])

@app.route('/startchall', methods=['POST'])
def run_team_challenge():
    try:
        request_json = request.get_json()
    except RuntimeError:
        return make_response('failed to parse json', 400)

    if not keys_validation_start.issubset(request_json.keys()):
        return make_response('No required fields in json request body', 400)

    request_json['host'] = 'ctftastic'
    team_name = request_json['teamName']
    with open('./teamchallenges/values.yaml', 'w') as f:
        yaml.dump(request_json, f, allow_unicode=True)
    config.load_incluster_config()

    result = subprocess.run(['helm', 'install', f'{team_name}', './teamchallenges'], capture_output=True)

    if result != 0:
        return make_response(f'Something went wrong when creating teamchallenges Helm Release: {result.stderr}\n', 400)

    return make_response(f'Challenges created for {team_name}\n', 200)

@app.route('/stopchall', methods=['DELETE'])
def stop_team_challenge():
    try:
        request_json = request.get_json()
    except RuntimeError:
        return make_response('failed to parse json', 400)

    if not keys_validation_stop.issubset(request_json.keys()):
        return make_response('No required fields in json request body', 400)

    team_name = request_json['teamName']
    config.load_incluster_config()

    result = subprocess.run(['helm', 'uninstall', f'{team_name}'], capture_output=True)

    if result != 0:
        return make_response(f'Something went wrong when deleting teamchallenges Helm Release: {result.stderr}\n', 400)

    return make_response(f'Challenges stopped for {team_name}', 200)

@app.route('/buildchall', methods=['POST'])
def build_challenge():
    return make_response('TODO', 200)