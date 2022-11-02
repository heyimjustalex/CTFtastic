from flask import Flask, jsonify, request, make_response
import kubernetes
import os
import sys

app = Flask(__name__)

@app.route('/startchall', methods=['POST'])
def run_team_challenge():
    test_json = request.get_json()
    #print(test_json, file=sys.stdout)

    os.system("helm template ./teamchallenges > test.yaml")
    return make_response('ok', 200)