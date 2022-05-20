## 📚 API 구현 목록

###### API Reference

<details markdown="1">
<summary>회원</summary>

<details markdown="1" style="margin-left:14px">
<summary>회원가입</summary>

* **URL**

  /members/join

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `loginId=[String] - 로그인 아이디`  
  `password=[String] - 패스워드`

  **Optional:**

  `없음`

* **Response**

  `id=[Long] - 유저 고유식별 번호`  
  `loginId=[String] - 로그인 아이디`  

* **Success Response:**
```
HTTP/1.1 201 Created
Content-type: application/json;charset=UTF-8
{
  "id": 1,
  "loginId": "id",
}
```

<details markdown="1" style="margin-left:14px">
<summary>에러 코드</summary>

###회원 중복 시

* **Response**

  `status=[Integer] - 에러 코드`  
  `error=[String] - 에러 메시지`  
  `path=[String] - URI`

* **Response Body:**

```
HTTP/1.1 409 Conflict
{
    "timestamp": "2022-05-17T09:43:46.133+00:00",
    "status": 409,
    "error": "Conflict",
    "path": "/members/join"
}
```
</details>

</details>

<details markdown="1" style="margin-left:14px">
<summary>회원 리스트 조회</summary>

* **URL**

  /members

* **Method:**

  `GET`

* **Data Params**

  **Required:**

  `없음`

  **Optional:**

  `없음`

* **Response**

  `id=[Long] - 유저 고유식별 번호`  
  `loginId=[String] - 로그인 아이디`

* **Success Response:**
```
HTTP/1.1 201 Created
Content-type: application/json;charset=UTF-8
[
    {
        "id": 1,
        "loginId": "user4"
    },
    {
        "id": 2,
        "loginId": "user1"
    }
]
```


</details>

</details>


<details markdown="1">
<summary>플레이리스트</summary>

<details markdown="1" style="margin-left:14px">
<summary>플레이리스트 생성</summary>

* **URL**

  /playlists/{member_id}/create

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `name=[String] - 플레이리스트 이름`  

  **Optional:**

  `없음`

* **Response**

  `playlistId=[Long] - 플레이리스트 고유식별 번호`  
  `name=[String] - 재생목록 이름`  
  `imageUrl=[String] - 플레이리스트 이미지 url`

* **Success Response:**
```
HTTP/1.1 201 Created
Content-type: application/json;charset=UTF-8
{
    "playlistId": 1,
    "name": "나의 재생목록",
    "imageUrl": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
}
```
</details>

<details markdown="1" style="margin-left:14px">
<summary>회원 플레이리스트 목록 조회</summary>

* **URL**

  /playlists/{member_id}

* **Method:**

  `GET`

* **Data Params**

  **Required:**

  `없음`

* **Response**

  `playlistId=[Long] - 플레이리스트 고유식별 번호`  
  `name=[String] - 재생목록 이름`  
  `imageUrl=[String] - 플레이리스트 이미지 url`

* **Success Response:**
```
HTTP/1.1 200 OK
Content-type: application/json;charset=UTF-8
[
    {
        "playlistId": 3,
        "name": "나의 재생목록",
        "imageUrl": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
    },
    {
        "playlistId": 4,
        "name": "나의 재생목록2",
        "imageUrl": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
    }
]
```
</details>

</details>


## 서버 실행 방법

### H2 데이터베이스 설치
1. 링크로 다운로드 후 압축 해제  
https://h2database.com/h2-2019-10-14.zip
2. h2 데이터베이스 실행  
```zsh
$ cd ./h2/bin
$ ./h2.sh
```
3. url 수정  
`xxx.xxx.xxx.xxx:8082/login...` -> `localhost.8082/login...`
4. .db파일 생성  
4-1. `JDBC URL` - `jdbc:h2:~/musicapp`  
4-2. `~/musicapp.mv/db` 파일 생성 확인  
4-3. 이후 부터는 `JDBC URL` - `jdbc:h2:tcp://localhost/~/musicapp`로 접속

### 서버 실행
h2 데이터베이스가 실행상태여야 합니다.  
Java 11버전이 다운로드 되어있어야 합니다.
1. gradle 빌드  
```zsh
$ cd /back/music
$ ./gradlew build
```
2. spring 서버 실행  
```zsh
$ java -jar build/libs/music-0.0.1-SNAPSHOT.jar
```