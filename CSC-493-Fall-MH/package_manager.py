# This program allows for automatic installation of necessary packages to run the program.

import subprocess

required_packages = ["flask", "sqlite3", "sentence_transformers", "bark"]

def install_nec_packages(req_package_list):
    for package in req_package_list:
        subprocess.call(["pip", "install", package])
