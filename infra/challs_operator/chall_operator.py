from crypt import methods
from unicodedata import name
from flask import Flask, jsonify, request, make_response
from kubernetes import client, config, utils
import os
import yaml
import subprocess

app = Flask(__name__)

keys_validation_start = set(['teamName', 'teamHash', 'challenges'])
keys_validation_stop = set(['teamName'])
keys_validation_build = set(['dockerfile', 'outputImage'])

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

    if result.returncode != 0:
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

    if result.returncode != 0:
        return make_response(f'Something went wrong when deleting teamchallenges Helm Release: {result.stderr}\n', 400)

    return make_response(f'Challenges stopped for {team_name}', 200)

@app.route('/buildchall', methods=['POST'])
def build_challenge():
    try:
        request_json = request.get_json()
    except RuntimeError:
        app.logger.error("BAD JSON")
        return make_response('failed to parse json', 400)

    if not keys_validation_build.issubset(request_json.keys()):
        app.logger.error("WRONG KEYS IN JSON")
        return make_response('No dockerfile string or outputImage string', 400)
    
    output_image = request_json['outputImage']
    dockerfile_str = request_json['dockerfile']

    app.logger.info(dockerfile_str)

    config.load_incluster_config()
    result = subprocess.run(['helm', 'install', '--set', f'outputImage={output_image}',  
    '--set', f'dockerfile={dockerfile_str}' , f'buildkit-{output_image}', './buildkit'], capture_output=True)

    if result.returncode != 0:
        app.logger.error(result.stderr)
        app.logger.error(f'output_image: {output_image}')
        app.logger.error(f'dockerfile_str: {dockerfile_str}')
        return make_response(f'Something went wrong creating buildkit with Helm Release - check flask logs', 400)

    app.logger.info(dockerfile_str)
    return make_response('Build has started', 200)

@app.route('/buildstatus/<output_image>', methods=['GET'])
def build_status(output_image):
    config.load_incluster_config()
    batch_client = client.BatchV1Api()

    try:
        api_response = batch_client.read_namespaced_job_status(name=f'buildkit-{output_image}', namespace="default")
    except RuntimeError:
        return make_response('Job not found', 404)

    app.logger.info(api_response)
    
    if api_response.status.succeeded is not None:
        return make_response('Job succeded', 200)
    
    if api_response.status.failed is not None:
        return make_response('Job failed', 201)

    return make_response('Job running', 202)

@app.route('/challstatus', methods=['GET'])
def chall_status():
    config.load_incluster_config()
    apps_v1 = client.AppsV1Api()

    args = request.args
    team_name = args.get('team')
    chall_name = args.get('chall')

    #if team_name or chall_name is None:
    #    return make_response('Missing queries', 400)

    try:
        api_response = apps_v1.read_namespaced_deployment(name=f'team-{team_name}-{chall_name}', namespace='default')
    except RuntimeError:
        return jsonify(
            containerState='error'
        )

    if api_response.status.ready_replicas is None:
        return jsonify(
            containerState='notStarted'
        )

    return jsonify(
        containerState='started'
    )
