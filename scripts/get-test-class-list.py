#!/usr/bin/env python3

import os
import sys
from pathlib import Path


def listfiles(folder):
    for root, folders, files in os.walk(folder):
        for filename in folders + files:
            yield os.path.join(root, filename)


source_dir = sys.argv[1]

test_file_names = []

for filename in listfiles(source_dir):
    file_content = ''
    with open(filename, 'r') as f:
        file_content = f.read().lower()

    if filename.endswith('-meta.xml'):
        pass
    elif '@istest' in file_content:
        test_file_names.append(Path(filename).stem)
    elif 'public interface' in file_content:
        pass
    else:
        test_file_names.append(Path(filename).stem + 'Test')

print(','.join(test_file_names))

