from flask import Flask, request
import json
import recommendation.recommendManager as recommendManager

app = Flask(__name__)
test_genre = 'test'


# recommend/playlist
@app.route('/recommend/playlist', methods=['POST'])
def get_recommend_by_playlist():
    data = request.get_json()
    print("[request: /recommend/playlist]")
    print(data['song_id_list'])
    print(data['category'])
    result = recommend.get_by_playlist(data['song_id_list'], data['category'], test_genre)
    result = {'song_id_list': result}
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    print("[response: /recommend/playlist]   ", result)
    return response


# recommend/song
@app.route('/recommend/song', methods=['POST'])
def get_recommend_by_song():
    data = request.get_json()
    print("[request: /recommend/song]")
    print(data['song_id'])
    print(data['category'])
    result = recommend.get_by_single_song(data['song_id'], data['category'], test_genre)
    result = {'song_id_list': result}
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    print("[response: /recommend/song]   ", result)
    return response


if __name__ == "__main__":
    recommend = recommendManager.Recommend('../recommendation')
    app.run()
