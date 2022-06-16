import os
import json
import random

from gensim.models import KeyedVectors
from sklearn.metrics.pairwise import cosine_similarity
from spotify import SpotifyManager
import pandas as pd


class Recommend:
    def __init__(self, external_path):
        self.seed_genre_list = ["rock_metal", "dance", "pop", "rap_hiphop", "ballade", "electronica", "idol", "folk", "indie"]
        self.MODEL_PATH = os.path.join(external_path, 'models')
        self.S2V_NAME = 's2v_train_mapping_table26_win5'
        self.GNR_SONGS_NAME = 'genre_songs_mapping_table26.json'
        self.s2v_model = KeyedVectors.load_word2vec_format(os.path.join(self.MODEL_PATH, self.S2V_NAME))
        self.spotifyManager = SpotifyManager.SpotifyManager()
        with open(os.path.join(self.MODEL_PATH, self.GNR_SONGS_NAME), encoding="utf-8") as file:
            self.gnr_scoring_model = json.load(file)

    def get_by_playlist(self, seed, category, genre):
        get_songs = []
        for song_id in seed:
            try:
                # Song2Vec 모델의 추천 결과를 topn_songs에 저장
                topn_songs = self.s2v_model.similar_by_word(str(song_id), topn=10)
                for song in topn_songs:
                    # get_songs에 추천 결과의 spotify id를 저장
                    get_songs.append(song[0])
            except KeyError:
                pass
        # 추천 불가능한 경우(cold-start, dataset에 포함되지 않은 데이터, 매핑이 완료되지 않은 추천 결과들만 있을 경우)
        if len(get_songs) == 0:
            # genre 기반 scoring 결과를 get_songs에 저장
            get_songs = self.get_gnr_score(genre)
        # 가장 많이 노출된 음악을 기준으로 sorting
        get_songs = list(pd.value_counts(get_songs)[:len(get_songs)].index)
        result = []
        for song in get_songs:
            if len(song) > 6: # Spotify ID인 경우에만(매핑이 완료된 음악인 경우에만) result에 append
                result.append(song)
            if len(result) == 30:
                break
        # spotify id로만 이루어진 추천 결과를 토대로 category 기반 CBF 적용
        s2v_result = result[:len(result)//2]
        cbf_result = result[len(result)//2:]
        analysis = self.spotifyManager.get_audio_analysis_playlist(seed, cbf_result, category)
        cbf_result = self.content_based_recommendation(cbf_result, category, analysis)

        result = random.sample(s2v_result, len(s2v_result)//2) + random.sample(cbf_result, len(cbf_result)//2)
        return result[0:10]

    def get_by_single_song(self, seed, category, genre):
        get_songs = []
        try:
            # topn_songs : List<tuple>
            # Song2Vec 모델의 추천 결과를 topn_songs에 저장
            topn_songs = self.s2v_model.similar_by_word(str(seed), topn=30)
            for song in topn_songs:
                # get_songs에 추천 결과의 spotify id를 저장
                get_songs.append(song[0])
        except KeyError:
            # 추천 불가능한 경우(cold-start, dataset에 포함되지 않은 데이터, 매핑이 완료되지 않은 추천 결과들만 있을 경우)
            # genre 기반 scoring 결과를 get_songs에 저장
            get_songs = self.get_gnr_score(genre)
        result = []
        for song_id in get_songs:
            if len(song_id) > 6: # Spotify ID인 경우에만(매핑이 완료된 음악인 경우에만) result에 append
                result.append(song_id)

        # s2v의 결과의 절반, s2v+CBF의 결과의 절반을 랜덤추출하여 최종 반환
        s2v_result = result[:len(result)//2]
        cbf_result = result[len(result)//2:]
        analysis = self.spotifyManager.get_audio_analysis_single_song(seed, cbf_result, category)
        cbf_result = self.content_based_recommendation(cbf_result, category, analysis)

        result = random.sample(s2v_result, len(s2v_result)//2) + random.sample(cbf_result, len(cbf_result)//2)
        return result

    def get_gnr_score(self, genre):
        print("genre based Scoring api start")
        try:
            tag_songs_to_series = pd.Series(self.gnr_scoring_model['songs'][genre])
        except KeyError:
            tag_songs_to_series = pd.Series(self.gnr_scoring_model['songs'][random.choice(self.seed_genre_list)])
        get_songs = list(pd.value_counts(tag_songs_to_series)[:10].index)
        return get_songs

    def content_based_recommendation(self, song_id_list, category, analysis):
        print("category based CBF recommendation api start")
        inputList = []
        for i, data in enumerate(analysis):
            row = [song_id_list[i]]
            for cat in category:
                row.append(data[cat])
            inputList.append(row)

        df = pd.DataFrame(inputList, columns=['id'] + category)
        similarity = cosine_similarity(df[category], df[category])
        sim_scores = list(enumerate(similarity[len(similarity) - 1]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]
        indexList = [data[0] for data in sim_scores]
        result = []
        for i in indexList:
            result.append(df.iloc[i]['id'])

        return result
