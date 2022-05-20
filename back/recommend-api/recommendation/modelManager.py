import os
import json

import pandas as pd
from gensim.models import Word2Vec


class Word2Vec:
    def __init__(self, FILE_PATH):
        self.FILE_PATH = FILE_PATH
        self.min_count = 3 # 등장 횟수가 3 이하인 노래는 제외
        self.size = 30 # 단어 임베딩 벡터의 크기
        self.window = 5 # 중심으로부터 주변 단어의 범위
        self.sg = 1 # 1은 Skip-Gram / 나머지는 CBOW
        self.workers = 7 # 코어 수 : 8
        with open(os.path.join(FILE_PATH, 'train.json'), encoding="utf-8") as f:
            self.train = json.load(f)
        with open(os.path.join(FILE_PATH, 'val.json'), encoding="utf-8") as f:
            self.val = json.load(f)

    def preprocess_song(self, train, val):
        data = train + val
        # 데이터셋의 song list를 total에 저장
        total = list(map(lambda x: list(map(str, x['songs'])), data))
        total = [x for x in total if len(x)>1]
        self.total = total

    def preprocess_tag(self, train, val):
        data = train + val
        # 데이터셋의 tag list를 total에 저장
        total = list(map(lambda x: list(x['tags']), data))
        total = [x for x in total if len(x)>1]
        self.total = total

    # Song2Vec 모델 학습 후 저장
    def get_w2v(self, total, min_count, size, window, sg, workers, model_name):
        w2v_model = Word2Vec(total, min_count = min_count, vector_size = size, window = window, sg = sg, workers = workers)
        self.s2v_model = w2v_model
        self.s2v_model.wv.save_word2vec_format(model_name)

    def run(self):
        self.preprocess_tag(self.train, self.val)
        self.get_w2v(self.total, self.min_count, self.size, self.window, self.sg, self.workers, 's2v_train_val_win5')


class GenreScoring:
    def __init__(self):
        self.MODEL_PATH = 'models'
        self.DATA_PATH = 'datasets'
        self.train = pd.read_json(os.path.join(self.DATA_PATH, 'train.json'), typ = 'frame')
        with open(os.path.join(self.MODEL_PATH, 'genre_tags.json'), 'r', encoding='utf-8') as file:
            self.genre_tags = json.load(file)

    def get_genre_songs(self):
        plylst_tag_map = self.train[['tags', 'songs']]

        # 장르별 장르와 관련된 tag목록이 저장되어있는 genre_tags.json load
        genre_tags_lists = self.genre_tags["genre_tags_list"]

        # 특정 장르에 대한 song list를 DataFrame 형식으로 저장
        genre_songs = pd.DataFrame(columns=['genre', 'songs'])
        for tags, songs in zip(plylst_tag_map['tags'], plylst_tag_map['songs']):
            # 특정 장르의 tag목록이 이미 발견되어서 song list를 genre_songs에 append한 경우를 filtering하는 Boolean형 list
            genre_already_appended = [False] * 9
            for i, genre_tags in enumerate(genre_tags_lists):
                for tag in tags:
                    # 장르와 관련된 tag가 발견되었고, 해당 장르의 song list가 아직 추가되지 않은 경우
                    if tag in genre_tags['tags'] and not genre_already_appended[i]:
                        if not (genre_songs['genre'] == genre_tags['genre']).any(): # 처음 추가하는 장르인 경우
                            dic = {'genre': genre_tags['genre'], 'songs': [songs]}
                            temp = pd.DataFrame(dic)
                            genre_songs = pd.concat([genre_songs, temp], ignore_index=True)
                        else: # 이미 존재하는 장르인 경우
                            genre_songs.loc[genre_songs['genre'] == genre_tags['genre']]['songs'].values[0] += songs
                        genre_already_appended[i] = True

        # DataFrame의 index를 장르 tag로 변경
        genre_songs = genre_songs.set_index('genre')

        # 장르별 song_list를 json형태로 저장
        with open(os.path.join(self.MODEL_PATH, 'genre_songs.json'), 'w', encoding='utf-8') as file:
            genre_songs.to_json(file, force_ascii=False)
