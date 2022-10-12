import json
import argparse

parser = argparse.ArgumentParser("simple_parser")
#parser.add_argument("--team_name", help="Name of a teamtea", type=str, required=True)
#parser.add_argument("--number_of_challs", help="Number of challenges", type=int, required=True)
parser.add_argument("--images", nargs='+', help="n=Names of images used", required=True)
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
        'docker_image': [],
        'docker_container': []
    },

    'module': {
        'network_mod': {
            'source': './network_module'
        }
    },
}

images_names = args.images

for idx, name in enumerate(images_names):
    tf_dict['resource']['docker_image'].append(
        {
            name: {
                'name': f"{name}:latest",
                'keep_locally': True 
            }
        }
    )
    tf_dict['resource']['docker_container'].append(
        {
            name: {
                'image': '${docker_image.' + f"{name}.latest" + "}",
                'name': f"{name}_{idx}" + "_${module.network_mod.network_name}",
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

with open("../team_module/generated_main.tf.json", 'w') as f:
    f.write(json_obj)

