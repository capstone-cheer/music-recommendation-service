import os
import json

import pandas as pd
from gensim.models import Word2Vec, KeyedVectors


class Song2Vec:
    def __init__(self, FILE_PATH):
        self.FILE_PATH = FILE_PATH
        self.min_count = 3 # 등장 횟수가 3 이하인 노래는 제외
        self.size = 100 # 단어 임베딩 벡터의 크기
        self.window = 5 # 중심으로부터 주변 단어의 범위
        self.sg = 1 # 1은 Skip-Gram / 나머지는 CBOW
        self.workers = 5 # 코어 수 : 8
        with open(os.path.join(FILE_PATH, 'train_spotify.json'), encoding="utf-8") as f:
            self.train = json.load(f)
        # with open(os.path.join(FILE_PATH, 'val.json'), encoding="utf-8") as f:
        #     self.val = json.load(f)

    def preprocess_song(self, train):
        data = train
        # 데이터셋의 song list를 total에 저장
        total = list(map(lambda x: list(map(str, x['songs'])), data))
        total = [x for x in total if len(x)>1]
        self.total = total

    # Song2Vec 모델 학습 후 저장
    def get_w2v(self, total, min_count, size, window, sg, workers, model_name):
        w2v_model = Word2Vec(total, vector_size = size, window = window, min_count = min_count, workers = workers, sg = sg)
        self.s2v_model = w2v_model
        self.s2v_model.wv.save_word2vec_format(model_name)

    def run(self):
        self.preprocess_song(self.train)
        self.get_w2v(self.total, self.min_count, self.size, self.window, self.sg, self.workers, 's2v_train_mapping_table26_win5')


class GenreScoring:
    def __init__(self):
        self.MODEL_PATH = 'models'
        self.DATA_PATH = 'datasets'
        self.T2V_MODEL_NAME = 't2v_train_mapping_table26_win5'

    def preprocess_tag(self):
        with open(os.path.join(self.DATA_PATH, 'train_spotify.json'), encoding="utf-8") as f:
            self.train = json.load(f)
        data = self.train
        # 데이터셋의 tag list를 total에 저장
        total = list(map(lambda x: list(x['tags']), data))
        total = [x for x in total if len(x)>1]
        self.total = total

    def get_tag2vec(self):
        w2v_model = Word2Vec(self.total, min_count = 3, vector_size = 100, window = 5, sg = 1, workers = 5)
        self.t2v_model = w2v_model
        self.t2v_model.wv.save_word2vec_format(os.path.join(self.MODEL_PATH, self.T2V_MODEL_NAME))

    def get_genre_tags(self):
        loaded_model = KeyedVectors.load_word2vec_format(os.path.join(self.MODEL_PATH, self.T2V_MODEL_NAME))
        tags_genre = ['락', '메탈', '댄스', 'Pop', '랩', '힙합', '발라드', 'EDM', '아이돌', '일렉트로니카', '포크', '인디']
        genre_tags = {
            "genre_tags_list": [
                {
                    "genre": "rock_metal",
                    "tags": ['락', '록', '메탈', '밴드', '참이슬', '얼터너티브', '모던락', '브릿팝', '해외록', '밴드음악', '헤비메탈', '락메탈', '록메탈', '하드락', 'Metal', '록명곡', '분노', '뉴메탈']
                },
                {
                    "genre": "dance",
                    "tags": ['신나는곡', '춤', '댄스댄스', '댄스음악', '댄스뮤직', '댄스곡', '케이팝', '댄스팝', '신나는노래', '신남주의']
                },
                {
                    "genre": "pop",
                    "tags": ['팝송모음', 'popsong', '컨트리', '팝송음악', '팝송추천', '팝뮤직', '팝음악', '해외팝', '팝송을', '팝']
                },
                {
                    "genre": "rap_hiphop",
                    "tags": ['랩힙합', '힙합갬성', '스웩', 'SWAG', '해외힙합', 'Hip_Hop', '랩퍼', '래퍼', '고등래퍼', '붐뱁', '외국힙합', '국힙', '국내랩힙합', '외힙', '국내힙합']
                },
                {
                    "genre": "ballade",
                    "tags": ['발라드추천', '따뜻하게', '갬성갬성', '듣기좋은노래', '외로운', '솔로', '감성인디', '기억', '쓸쓸할때', '쓸쓸함']
                },
                {
                    "genre": "electronica",
                    "tags": ['일렉', '일렉트로니카', '하우스', 'Electronic', '이디엠', '일렉트로닉', 'house', 'dance', '클럽음악', '딥하우스', 'electronica', '전자음악', '일렉팝', '일렉트로팝', '테크노']
                },
                {
                    "genre": "idol",
                    "tags": ['걸그룹', '남자아이돌', '케이팝', '여자아이돌', '아이돌의숨은명곡', '수록곡', 'kpop', '보이그룹', '아이돌명곡', '여돌']
                },
                {
                    "genre": "folk",
                    "tags": ['Folk', '포크록', '기타', '통기타', '포크팝', '어쿠스틱송', '블루스', '어쿠스틱팝', '컨트리', '서정적인']
                },
                {
                    "genre": "indie",
                    "tags": ['인디뮤직', '인디노래', '인디추천', '홀로', '혼자서', '음악추천', '조용하게', '자기_전', '버스안에서', '산책이나']
                }
            ]
        }
        # result에 담기는 정보들이 모두 genre_tags['genre_tags_list']에 담겨야 하는데, 수작업으로 넣음
        # for genre in tags_genre:
        #     tup_list = loaded_model.similar_by_word(genre)
        #     result = []
        #     for tup in tup_list:
        #         result.append(tup[0])
        # 장르 tag별 song list 저장
        with open('models/genre_tags_mapping_table26.json', 'w', encoding='utf-8') as file:
            file.write(json.dumps(genre_tags, ensure_ascii=False))

    def get_genre_songs(self):
        with open(os.path.join(self.MODEL_PATH, 'genre_tags_mapping_table26.json'), 'r', encoding='utf-8') as file:
            self.genre_tags = json.load(file)

        self.train = pd.read_json(os.path.join(self.DATA_PATH, 'train_spotify.json'), typ = 'frame')
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
        with open(os.path.join(self.MODEL_PATH, 'genre_songs_mapping_table26.json'), 'w', encoding='utf-8') as file:
            genre_songs.to_json(file, force_ascii=False)

    def run(self):
        self.preprocess_tag()
        print("preprecess finished")
        self.get_tag2vec()
        print("tag2vec finished")
        self.get_genre_tags()
        print("genre_tags finished")
        self.get_genre_songs()
        print("genre_songs finished")

# rec = Song2Vec('./datasets')
# rec.run()
# model = GenreScoring()
# model.run()
