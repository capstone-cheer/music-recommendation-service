from flask import Flask, request
import json
import recommendation.recommendManager as recommendManager

app = Flask(__name__)
test_genre = 'idol'


# recommend/playlist
@app.route('/recommend/playlist', methods=['POST'])
def get_recommend_by_playlist():
    data = request.get_json()
    result = recommend.get_by_playlist(data['playlist'], test_genre)
    result = {'song_id_list': result}
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    return response


# recommend/song
@app.route('/recommend/song', methods=['POST'])
def get_recommend_by_song():
    data = request.get_json()
    result = recommend.get_by_single_song(data['song_id'], test_genre)
    result = {'song_id_list': result}
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == "__main__":
    recommend = recommendManager.Recommend('../recommendation')
    app.run()
