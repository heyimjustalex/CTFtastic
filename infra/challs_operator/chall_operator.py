from flask import Flask, jsonify, request, make_response
from kubernetes import client, config, utils
import os

app = Flask(__name__)

resources_name = 'resources.yaml'

@app.route('/startchall', methods=['POST'])
def run_team_challenge():
    test_json = request.get_json()
    #print(test_json, file=sys.stdout)


    os.system(f"helm template ./teamchallenges > {resources_name}")

    config.load_incluster_config()
    k8s_client = client.ApiClient()
    utils.create_from_yaml(k8s_client,resources_name,verbose=True)

    return make_response('Challenge created', 200)

@app.route('/stopchall', methods=['DELETE'])
def stop_team_challenge():
    test_json = request.get_json()

    os.system(f"helm template ./teamchallenges > {resources_name}")

    config.load_kube_config()
    k8s_client = client.ApiClient()
    #utils.

    return make_response('Challenge stopped', 200)