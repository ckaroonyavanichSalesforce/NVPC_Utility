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
    #print("deploy_dir filename: ",Path(filename_deploydir).stem)
    for filename_sourcedir in listfiles(source_dir):
        #print("source_dir filename: ",Path(filename_sourcedir).stem)
        if Path(filename_sourcedir).stem == Path(filename_deploydir).stem:

            print("Found flow in deployment package: ",Path(filename_sourcedir).stem)
            file_content_deploydir = ''
            file_content_sourcedir = ''

            with open(filename_deploydir, 'r') as f:
                file_content_deploydir = f.read().lower()

            with open(filename_sourcedir, 'r') as f:
                file_content_sourcedir = f.read().lower()

            if file_content_deploydir.translate({ord(c): None for c in string.whitespace}) == file_content_sourcedir.translate({ord(c): None for c in string.whitespace}):
                print("##### Flow matches target org. Deleting from deployment package: ",Path(filename_deploydir).stem)
                os.remove(filename_deploydir)