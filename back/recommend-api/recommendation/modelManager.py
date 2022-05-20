import os
import json

from gensim.models import Word2Vec
from gensim.models import KeyedVectors


class Word2Vec:
    def __init__(self, FILE_PATH):
        self.FILE_PATH = FILE_PATH
        self.min_count = 3 # 등장 횟수가 3 이하인 노래는 제외
        self.size = 30 # 단어 임베딩 벡터의 크기
        self.window = 5 # 중심으로부터 주변 단어의 범위
        self.sg = 1 # 1은 Skip-Gram / 나머지는 CBOW
        self.workers = 7 # 코어 수 : 8
        self.p2v_model = KeyedVectors(self.size)
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
