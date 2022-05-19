from flask import Flask, request
import json
import recommendation.modelManager as modelManager

app = Flask(__name__)


# recommend/playlist
@app.route('/recommend/playlist')
def get_recommend_by_playlist():
    data = request.get_json()
    result = model.get_result_playlist(data['playlist'])
    result = {'song_list': result}
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    return response


# recommend/song
@app.route('/recommend/song')
def get_recommend_by_song():
    data = request.get_json()
    result = model.get_single_song(data['song_id'])
    result = {'song_id_list': result}
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == "__main__":
    model = modelManager.Model()
    app.run()
