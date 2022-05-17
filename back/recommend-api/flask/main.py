from flask import Flask, request
import json
import recommendation.modelManager as modelManager

app = Flask(__name__)
# recommend/playlist
@app.route('/recommend/playlist')
def get_recommend_by_playlist():
    data = request.get_json()
    print(model.path)
    result = model.get_result_playlist(data['playlist'])
    result = {'song_list': result}
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    return response


# recommend/song

if __name__ == "__main__":
    model = modelManager.Model()
    app.run()
