# 클라이언트 실행 방법

### 의존성 패키지 설치
```zsh
$ cd music-recommendation-service/front
$ npm install
```

### Spotify API Key 생성
1. 다음 링크로 로그인 
    https://developer.spotify.com/dashboard/
2. 'CREATE AN APP' 버튼 클릭해서 앱 생성
3. Client ID 획득
4. 'EDIT SETTINGS' 버튼 클릭한 뒤 Redirect URIs에 다음 링크 입력
    http://localhost:3000/callback/
5. 설정 파일 생성
```zsh
$ cd src
$ touch config.json
```
6. (3)에서 획득한 Client ID 입력
```zsh
{
    "development": {
        "spotify_client_id": {SPOTIFY_CLIENT_ID}
    }
}
```


### 실행
### `npm start`