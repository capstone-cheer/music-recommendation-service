# Recommend API(Flask Server) 실행 방법

> 학습된 모델은 용량이 너무 커서 공유할 수 없고, 학습 과정도 상당히 오랜기간 Spotify 기반 song_id를 수집하는 것에서부터 시작합니다.
> 
> 따라서 본 README에서는 어떠한 과정으로 Recommend API를 실행하는지에 대해 기술할 뿐, 이 repository를 로컬에서 실행할 수 없습니다.

### 의존성 패키지 설치(venv init 및 실행 후)
```zsh
$ pip install -r requirements.txt
```

### 모델 학습 과정
1. 카카오 아레나(https://arena.kakao.com/c/8/data) 의 train.json를 다운로드하여 datasets 폴더에 저장
2. train.json의 id를 spotify_id로 반환하는 매핑테이블 생성 작업(Spotify의 Get Track API 사용)
3. (2) 작업을 통해 생성된 매핑 테이블을 train_song_id_to_str.py의 로직을 통해 song_id를 string으로 변환
4. (3) 작업을 통해 생성된 json 파일에 대해 train_model_to_spotify.py의 로직을 통해 최종적으로 spotify id 기반 학습 모델 생성
5. (4) 작업을 통해 생성된 json 파일을 train 데이터로 하는 Song2Vec 모델 학습

### Spotify API Key 생성
1. 다음 링크로 로그인 
    https://developer.spotify.com/dashboard/
2. 'CREATE AN APP' 버튼 클릭해서 앱 생성
3. Client ID 획득
4. 'EDIT SETTINGS' 버튼 클릭한 뒤 Redirect URIs에 다음 링크 입력
    http://localhost:3000/callback/
5. 설정 파일 생성
```zsh
# spofity 패키지의 하위 패키지인 spotifyApi 생성 후 
# 다음 명령어 실행 혹은 파일 생성
$ cd spotify/spotifyApi
$ touch ApiKey.py
```
6. (3)에서 획득한 Client ID 입력
```zsh
class ApiKeys:
    def __init__(self):
        self.CLIENT_ID = "YOUR_CLIENT_ID"
        self.CLIENT_SECRET = "YOUR_CLIENT_SECRET"
```


### IDE에서 실행
> flask/main.py 실행
