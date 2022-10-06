import os
import json

import numpy as np
import pandas as pd
from tqdm import tqdm
from gensim.models import KeyedVectors

# 성능 측정 방식 : val.json의 song list의 절반을 통해 나머지 절반의 song list를 예측.
# 기존의 나머지 절반 song list와 일치하는지를 nDCG를 통해 성능 측정


def discounted_cumulative_gain_score(gt, rel):
    dcg = 0.0
    for i, r in enumerate(rel):
        if r in gt:
            dcg += 1.0 / np.log(i + 2)
    return dcg

def get_score():
    loaded_model = KeyedVectors.load_word2vec_format('./models/s2v_train_val_win5')
    with open(os.path.join('./datasets/', 'val.json'), encoding="utf-8") as f:
        val = json.load(f)
    ndcg_total = 0
    val_len = 0
    for n, q in tqdm(enumerate(val), total = len(val)):
        # song list의 길이가 2 이상인 데이터에 대해서만 측정
        if len(q['songs']) >= 2:
            odd = len(q['songs']) % 2
            half = len(q['songs']) // 2
            get_song = []
            for song_id in q['songs'][:half]:
                try:
                    topn_songs = loaded_model.similar_by_word(str(song_id))
                    for song in topn_songs:
                        get_song.append(song[0])
                except KeyError:
                    pass
            if len(get_song) > 0:
                relevant_score = list(map(int, list(pd.value_counts(get_song)[:half].index)))
                ideal_vector = q['songs'][half+odd:]
                dcg = discounted_cumulative_gain_score(ideal_vector, relevant_score)
                idcg = discounted_cumulative_gain_score(ideal_vector, ideal_vector)
                ndcg_total += dcg / idcg
                val_len += 1
    print(ndcg_total / val_len)


get_score()

