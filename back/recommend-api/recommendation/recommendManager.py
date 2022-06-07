import os
import json
import random

from gensim.models import KeyedVectors
import pandas as pd


class Recommend:
    def __init__(self, external_path):
        self.seed_genre_list = ["rock_metal", "dance", "pop", "rap_hiphop", "ballade", "electronica", "idol", "folk", "indie"]
        self.topn = 10
        self.MODEL_PATH = os.path.join(external_path, 'models')
        self.S2V_NAME = 's2v_train_mapping_table26_win5'
        self.GNR_SONGS_NAME = 'genre_songs_mapping_table26.json'
        self.s2v_model = KeyedVectors.load_word2vec_format(os.path.join(self.MODEL_PATH, self.S2V_NAME))
        with open(os.path.join(self.MODEL_PATH, self.GNR_SONGS_NAME), encoding="utf-8") as file:
            self.gnr_scoring_model = json.load(file)

    def get_by_playlist(self, seed, genre):
        get_songs = []
        for song_id in seed:
            try:
                topn_songs = self.s2v_model.similar_by_word(str(song_id), topn=self.topn)
                for song in topn_songs:
                    get_songs.append(song[0])
            except KeyError:
                pass
        if len(get_songs) == 0:
            get_songs = self.get_gnr_score(genre)
        get_songs = list(pd.value_counts(get_songs)[:len(get_songs)].index)
        count = 0
        result = []
        for song in get_songs:
            if len(song) > 6: # Spotify ID인 경우
                result.append(song)
                count += 1
            if count == 10: # 최대 10개 return
                break
        return result

    def get_by_single_song(self, seed, genre):
        get_songs = []
        try:
            # topn_songs : List<tuple>
            topn_songs = self.s2v_model.similar_by_word(str(seed), topn=self.topn)
            for song in topn_songs:
                get_songs.append(song[0])
        except KeyError:
            get_songs = self.get_gnr_score(genre)
            return get_songs
        return get_songs

    def get_gnr_score(self, genre):
        try:
            tag_songs_to_series = pd.Series(self.gnr_scoring_model['songs'][genre])
        except KeyError:
            tag_songs_to_series = pd.Series(self.gnr_scoring_model['songs'][random.choice(self.seed_genre_list)])
        get_songs = list(pd.value_counts(tag_songs_to_series)[:10].index)
        return get_songs
