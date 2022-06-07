import spotipy
from spotify.spotifyApi import ApiKey
from spotipy.oauth2 import SpotifyOAuth


class SpotifyManager:
    def __init__(self):
        self.apiKeys = ApiKey.ApiKeys()
        self.spotifyApi =  spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=self.apiKeys.CLIENT_ID,
                                               client_secret=self.apiKeys.CLIENT_SECRET,
                                               redirect_uri="http://localhost:3000/callback",
                                               scope="user-library-read"))

    def get_audio_analysis_single_song(self, seed_id, song_id_list, category):
        song_id_list.append(seed_id)
        response = self.spotifyApi.audio_features(song_id_list)
        result = []
        for analysis in response:
            dic = {}
            for parameter in category:
                dic[parameter] = analysis[parameter]
            result.append(dic)
        return result

    def get_audio_analysis_playlist(self, seed_id_list, song_id_list, category):
        before_append_len = len(song_id_list)
        for id in seed_id_list:
            song_id_list.append(id)
        response = self.spotifyApi.audio_features(song_id_list)
        result = []
        for analysis in response:
            dic = {}
            for parameter in category:
                dic[parameter] = analysis[parameter]
            result.append(dic)

        sum_dic = {}
        for analysis in result[before_append_len:]:
            for parameter in category:
                try:
                    sum_dic[parameter] += analysis[parameter]
                except KeyError:
                    sum_dic[parameter] = analysis[parameter]
        for parameter in category:
            sum_dic[parameter] /= len(seed_id_list)
        result = result[:before_append_len]
        result.append(sum_dic)
        return result
