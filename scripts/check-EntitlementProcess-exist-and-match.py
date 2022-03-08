#!/usr/bin/env python3

import os
import sys
import string
from pathlib import Path

def listfiles(folder):
    for root, folders, files in os.walk(folder):
        for filename in folders + files:
            yield os.path.join(root, filename)

source_dir = sys.argv[1]
deploy_dir = sys.argv[2]

for filename_deploydir in listfiles(deploy_dir):

    for filename_sourcedir in listfiles(source_dir):

        if Path(filename_sourcedir).stem == Path(filename_deploydir).stem:

            print("##### EntitlementProcess name/version found in deployment package and target org. Deleting from deployment package: ",Path(filename_deploydir).stem)
            os.remove(filename_deploydir)