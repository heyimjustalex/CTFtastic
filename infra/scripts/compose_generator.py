import yaml
import argparse
import sys

def validate_yaml(yaml_file):
    try:
        yaml.safe_load(yaml_file)
        return yaml_file
    except:
        sys.exit('Failed to validate yaml')

def create_yaml(images_names):
    skeleton = {
        'services': {

        },

        'networks': {
            'test1': {}
        }
    }

    for idx, name in enumerate(images_names):
        skeleton['services'][name] = {
            'image': f"{name}:latest",
            'ports': [f"800{idx}:80"],
            'networks': ['test1']
        }
    
    return skeleton

if __name__ == '__main__':
    parser = argparse.ArgumentParser("simple_parser")
    parser.add_argument("--images", nargs='+', help="n=Names of images used", required=True)
    args = parser.parse_args()

    images_names = args.images

    created_yaml = create_yaml(images_names)
    #validate_yaml(created_yaml)
    with open('test.yaml', 'w') as f:
        f.write(yaml.dump(created_yaml))
