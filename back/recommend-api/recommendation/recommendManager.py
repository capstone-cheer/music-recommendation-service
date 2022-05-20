from gensim.models import KeyedVectors
import pandas as pd


class Recommend:
    def __init__(self):
        self.model_path = '../recommendation/models/'
        self.loaded_model = KeyedVectors.load_word2vec_format(self.model_path + 'w2v_model_song_tag_tv_win5')

    def get_result_playlist(self, seed):
        get_songs = []
        for song_id in seed:
            try:
                topn_songs = self.loaded_model.similar_by_word(str(song_id))
                for song in topn_songs:
                    get_songs.append(song[0])
            except KeyError:
                pass
        # 데이터셋 상에 존재하지 않는 노래인 경우 다른 추천 방법론 적용해야 함
        if len(get_songs) == 0:
            return -1
        result = list(pd.value_counts(get_songs)[:10].index)
        return result

    def get_single_song(self, seed):
        get_songs = []
        try:
            topn_songs = self.loaded_model.similar_by_word(str(seed))
            for song in topn_songs:
                get_songs.append(song[0])
        # 데이터셋 상에 존재하지 않는 노래인 경우 다른 추천 방법론 적용해야 함
        except KeyError:
            return -1
        return get_songs