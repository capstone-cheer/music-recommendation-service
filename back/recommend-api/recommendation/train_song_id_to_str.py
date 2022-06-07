import os
import json

FILE_PATH = "./datasets"
with open(os.path.join(FILE_PATH, 'train.json'), encoding="utf-8") as f:
    train = json.load(f)
with open(os.path.join(FILE_PATH, 'melon_to_spotify0.json'), encoding="utf-8") as f:
    melon_to_spotify = json.load(f)

print(train[0]['songs'])
i = 0
for playlist in train:
    playlist['songs'] = list(map(str, playlist['songs']))
print(train[0]['songs'])

with open(os.path.join(FILE_PATH, 'train_str.json'), 'w', encoding="utf-8") as outfile:
    json.dump(train, outfile, ensure_ascii=False)

