import os
import json

from gensim.models import KeyedVectors
import pandas as pd


class Recommend:
    def __init__(self, external_path):
        self.MODEL_PATH = os.path.join(external_path, 'models')
        self.S2V_NAME = 's2v_train_val_win5'
        self.GNR_SONGS_NAME = 'genre_songs.json'
        self.s2v_model = KeyedVectors.load_word2vec_format(os.path.join(self.MODEL_PATH, self.S2V_NAME))
        with open(os.path.join(self.MODEL_PATH, self.GNR_SONGS_NAME), encoding="utf-8") as file:
            self.gnr_scoring_model = json.load(file)

    def get_result_playlist(self, seed, genre):
        get_songs = []
        for song_id in seed:
            try:
                topn_songs = self.s2v_model.similar_by_word(str(song_id))
                for song in topn_songs:
                    get_songs.append(song[0])
            except KeyError:
                pass
        if len(get_songs) == 0:
            get_songs = self.get_gnr_score(genre)
        get_songs = list(pd.value_counts(get_songs)[:10].index)
        return get_songs

    def get_single_song(self, seed, genre):
        get_songs = []
        try:
            topn_songs = self.s2v_model.similar_by_word(str(seed))
            for song in topn_songs:
                get_songs.append(song[0])
        except KeyError:
            get_songs = self.get_gnr_score(genre)
            return get_songs
        return get_songs

    def get_gnr_score(self, genre):
        tag_songs_to_series = pd.Series(self.gnr_scoring_model['songs'][genre])
        get_songs = list(map(int, list(pd.value_counts(tag_songs_to_series)[:10].index)))
        return get_songs
