import os
import json

#change 숫자
FILE_NO = 15 # 항상 완료된 FILE_NO가 적혀있도록 유지하자. 작업을 시작할 때 FILE_NO의 값을 바꾸면서 시작하도록 하자.
MAPPING_FILE_NAME = "./mapping_table/melon_to_spotify{0}.json".format(FILE_NO)

start = 21000*FILE_NO + 1
end = start + 20999 #폐구간 [start, end]

FILE_PATH = "./datasets"
with open(os.path.join(FILE_PATH, 'train_spotify.json'), encoding="utf-8") as f:
    train = json.load(f)
with open(os.path.join(FILE_PATH, MAPPING_FILE_NAME), encoding="utf-8") as f:
    melon_to_spotify = json.load(f)

# print(melon_to_spotify[0][str(i)])
for playlist in train:
    for i, song_id in enumerate(playlist['songs']):
        #song_id를 int못바꾸면 이미바꾼거니까 무시해야함.
        if len(song_id) >= 7:
            continue
        if start <= int(song_id) <= end:
            ind = int(song_id) % 21001
            spotify_id = melon_to_spotify[ind][song_id]
            #null 은 안바꾸도록 추가
            if spotify_id == 'null':
                continue
            playlist['songs'][i] = spotify_id
            # print(playlist['songs'])


with open(os.path.join(FILE_PATH, 'train_spotify.json'), 'w', encoding="utf-8") as outfile:
    json.dump(train, outfile, ensure_ascii=False)

