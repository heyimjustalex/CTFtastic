import json
import argparse

parser = argparse.ArgumentParser("simple_parser")
parser.add_argument("--challenge_name", help="Name of CTF challenge", type=str, required=True)
parser.add_argument("--number_of_challs", help="Number of challenges", type=int, required=True)
#parser.add_argument("connected_network", help="Flag that indicates if the container should be connected to a team's network")
args = parser.parse_args()

tf_dict = {
    'terraform': {
        'required_providers': {
            'docker': {
                'source': 'kreuzwerker/docker',
                'version': '>= 2.13.0'
            }
        }
    },

    'resource': {
        # 'docker_image': {
        #     'nginx': {
        #         'name': 'nginx:latest',
        #         'keep_locally': True
        #     }
        # },
        'docker_container': [],
    },

    'module': {
        'network_mod': {
            'source': './network_module'
        }
    },
}

for idx, x in enumerate(range(args.number_of_challs)):
    tf_dict['resource']['docker_container'].append(
        {
            f'nginx_{idx}': {
                'image': 'docker_image.nginx.latest',
                'name': f"{args.challenge_name}_{idx}",
                'ports': {
                    'internal': 80
                },
                'networks_advanced': {
                    'name': "${module.network_mod.network_name}"
                }
            }
        }
    )

json_obj = json.dumps(tf_dict, indent=4)

with open("test.tf.json", 'w') as f:
    f.write(json_obj)

