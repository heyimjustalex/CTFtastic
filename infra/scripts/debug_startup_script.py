import subprocess
from pathlib import Path
import os

class cd:
    """Context manager for changing the current working directory"""
    def __init__(self, newPath):
        self.newPath = os.path.expanduser(newPath)

    def __enter__(self):
        self.savedPath = os.getcwd()
        os.chdir(self.newPath)

    def __exit__(self, etype, value, traceback):
        os.chdir(self.savedPath)


cwd = Path.cwd()

mod_path = Path(__file__).parent

relative_path_1 = '../helm_charts'

src_path = (mod_path / relative_path_1).resolve()

print(src_path)

with cd(src_path):
    subprocess.run("helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx", shell=True)
    subprocess.run ("helm install ctftastic ./ctftastic/")