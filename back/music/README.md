## π API κ΅¬ν λͺ©λ‘

###### API Reference

<details markdown="1">
<summary>νμ</summary>
  
<details markdown="1" style="margin-left:14px">
<summary>νμκ°μ</summary>

* **URL**

  /members/join

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `loginId=[String] - λ‘κ·ΈμΈ μμ΄λ`  
  `password=[String] - ν¨μ€μλ`

  **Optional:**

  `μμ`

* **Response**

  `id=[Long] - μ μ  κ³ μ μλ³ λ²νΈ`  
  `loginId=[String] - λ‘κ·ΈμΈ μμ΄λ`  

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
<summary>μλ¬ μ½λ</summary>

###νμ μ€λ³΅ μ

* **Response**

  `status=[Integer] - μλ¬ μ½λ`  
  `error=[String] - μλ¬ λ©μμ§`  
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
<summary>λ‘κ·ΈμΈ</summary>

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `loginId=[String] - λ‘κ·ΈμΈ μμ΄λ`  
  `password=[String] - ν¨μ€μλ`

  **Optional:**

  `μμ`

* **Response**

  `memberId=[Long] - μ μ  κ³ μ μλ³ λ²νΈ` 

* **Success Response:**
```
HTTP/1.1 200 OK
Content-type: application/json;charset=UTF-8
{
  "memberId": 1
}
```

</details>

<details markdown="1" style="margin-left:14px">
<summary>νμ λ¦¬μ€νΈ μ‘°ν</summary>

* **URL**

  /members

* **Method:**

  `GET`

* **Data Params**

  **Required:**

  `μμ`

  **Optional:**

  `μμ`

* **Response**

  `id=[Long] - μ μ  κ³ μ μλ³ λ²νΈ`  
  `loginId=[String] - λ‘κ·ΈμΈ μμ΄λ`

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
<summary>νλ μ΄λ¦¬μ€νΈ</summary>

<details markdown="1" style="margin-left:14px">
<summary>νλ μ΄λ¦¬μ€νΈ μμ±</summary>

* **URL**

  /playlists/{member_id}/create

* **Method:**

  `POST`

* **Data Params**

  **Required:**

  `name=[String] - νλ μ΄λ¦¬μ€νΈ μ΄λ¦`  

  **Optional:**

  `μμ`

* **Response**

  `playlistId=[Long] - νλ μ΄λ¦¬μ€νΈ κ³ μ μλ³ λ²νΈ`  
  `name=[String] - μ¬μλͺ©λ‘ μ΄λ¦`  
  `imageUrl=[String] - νλ μ΄λ¦¬μ€νΈ μ΄λ―Έμ§ url`

* **Success Response:**
```
HTTP/1.1 201 Created
Content-type: application/json;charset=UTF-8
{
    "playlistId": 1,
    "name": "λμ μ¬μλͺ©λ‘",
    "imageUrl": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
}
```
</details>

<details markdown="1" style="margin-left:14px">
<summary>νμ νλ μ΄λ¦¬μ€νΈ λͺ©λ‘ μ‘°ν</summary>  

```
νλ μ΄λ¦¬μ€νΈ κ³ μ  μμ΄λ, νλ μ΄λ¦¬μ€νΈ μ΄λ¦, μΈλ€μΌ(μ²« κ³‘ μ¨λ²μ»€λ²)λ₯Ό κ°μ Έμ΅λλ€.
```  

* **URL**

  /playlists/{member_id}

* **Method:**

  `GET`

* **Data Params**

  **Required:**

  `μμ`

* **Response**

  `playlistId=[Long] - νλ μ΄λ¦¬μ€νΈ κ³ μ μλ³ λ²νΈ`  
  `name=[String] - μ¬μλͺ©λ‘ μ΄λ¦`  
  `imageUrl=[String] - νλ μ΄λ¦¬μ€νΈ μ΄λ―Έμ§ url`

* **Success Response:**
```
HTTP/1.1 200 OK
Content-type: application/json;charset=UTF-8
[
    {
        "playlistId": 3,
        "name": "λμ μ¬μλͺ©λ‘",
        "imageUrl": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
    },
    {
        "playlistId": 4,
        "name": "λμ μ¬μλͺ©λ‘2",
        "imageUrl": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
    }
]
```
</details>

<details markdown="1" style="margin-left:14px">
<summary>νλ μ΄λ¦¬μ€νΈμ μμ μΆκ°</summary>  

```
νλ μ΄λ¦¬μ€νΈμ μμμ μ¬λ¬ κ° μΆκ°ν©λλ€.
```  

* **URL**

  /playlists/{playlist_id}/add

* **Method:**

  `POST`

* **Request Body (JSON)**

```json
  {
    "songIdList": [
      "1VnjByC7TUx5A73A4qtgoo",
      "3P3UA61WRQqwCXaoFOTENd",
      "2GBrW5lRWjAQMhK612qzVg",
      "4eFTh1opLS5wANDmZK9ghC"
    ]
  }
```

* **Response**

  `200 OK`

* **Success Response:**
```
success
```
</details>

<details markdown="1" style="margin-left:14px">
<summary>νλ μ΄λ¦¬μ€νΈ μμ λͺ©λ‘ κ°μ Έμ€κΈ°</summary>  

```
νλ μ΄λ¦¬μ€νΈ νλμ λͺ¨λ  μμ spotify idλ₯Ό κ°μ Έμ΅λλ€.
```  

* **URL**

  /playlists/{memberId}/{playlistId}

* **Method:**

  `GET`

* **Request Body (JSON)**

```
  μμ
```

* **Response**

  `200 OK`

* **Success Response:**
```json
[
    {
        "id": "3P3UA61WRQqwCXaoFOTENd",
        "name": "Through the Night",
        "albumName": "Palette",
        "artistName": "IU",
        "imageUrl": ""
    },
    {
        "id": "1VnjByC7TUx5A73A4qtgoo",
        "name": "μ°μ° (feat. μ€ν)",
        "albumName": "Pieces, Part One",
        "artistName": "Epik High",
        "imageUrl": ""
    },
    {
        "id": "2GBrW5lRWjAQMhK612qzVg",
        "name": "The End",
        "albumName": "One Strange Night",
        "artistName": "Kwon Jin Ah",
        "imageUrl": ""
    },
    {
        "id": "4eFTh1opLS5wANDmZK9ghC",
        "name": "Cherry Blossom Ending",
        "albumName": "Busker Busker 1st",
        "artistName": "Busker Busker",
        "imageUrl": ""
    }
]
```
</details>

</details>

<details markdown="1">
<summary>μΆμ² API</summary>

<details markdown="1" style="margin-left:14px">
<summary>λΈλ νλλ‘ μΆμ²</summary>

* **URL**

  /recommend/song

* **Method:**

  `POST`

* **Data Params**

  **Required:**

```json
{
  "songId": "3P3UA61WRQqwCXaoFOTENd",
  "category": [
    "danceability",
    "tempo"
  ]
}
```

* **Response**

  `id=[String] - spotify μμ id`  
  `name=[String] - λΈλ μ λͺ©`
  `albumName=[String] - μ¨λ² μ λͺ©`
  `artistName=[String] - κ°μ μ΄λ¦`
  `imageUrl=[String] - μ¨λ²μ»€λ²url`

* **Success Response:**
```json
[
    {
        "id": "4UCkX8nrBlpxjrrEqtb46a",
        "name": "Apache",
        "albumName": "8th Wonder",
        "artistName": "The Sugarhill Gang",
        "imageUrl": ""
    },
    {
        "id": "5xJ5bNY2SUh1iO2l8Hj9l1",
        "name": "Ping Pong",
        "albumName": "Collected Recordings",
        "artistName": "Gareth Dickson",
        "imageUrl": ""
    },
    {
        "id": "5xJ5bNY2SUh1iO2l8Hj9l1",
        "name": "Ping Pong",
        "albumName": "Collected Recordings",
        "artistName": "Gareth Dickson",
        "imageUrl": ""
    }
]
```

</details>


<details markdown="1" style="margin-left:14px">
<summary>νλ μ΄λ¦¬μ€νΈλ‘ μΆμ²</summary>

* **URL**

  /recommend/playlist

* **Method:**

  `POST`

* **Data Params**

  **Required:**

```json
{
  "songIdList": [
    "3P3UA61WRQqwCXaoFOTENd",
    "1VnjByC7TUx5A73A4qtgoo",
    "2GBrW5lRWjAQMhK612qzVg",
    "4eFTh1opLS5wANDmZK9ghC"
  ],
  "category": [
    "danceability",
    "tempo"
  ]
}
```

* **Response**

  `id=[String] - spotify μμ id`  
  `name=[String] - λΈλ μ λͺ©`
  `albumName=[String] - μ¨λ² μ λͺ©`
  `artistName=[String] - κ°μ μ΄λ¦`
  `imageUrl=[String] - μ¨λ²μ»€λ²url`

* **Success Response:**
```json
[
    {
        "id": "4UCkX8nrBlpxjrrEqtb46a",
        "name": "Apache",
        "albumName": "8th Wonder",
        "artistName": "The Sugarhill Gang",
        "imageUrl": ""
    },
    {
        "id": "5xJ5bNY2SUh1iO2l8Hj9l1",
        "name": "Ping Pong",
        "albumName": "Collected Recordings",
        "artistName": "Gareth Dickson",
        "imageUrl": ""
    },
    {
        "id": "5xJ5bNY2SUh1iO2l8Hj9l1",
        "name": "Ping Pong",
        "albumName": "Collected Recordings",
        "artistName": "Gareth Dickson",
        "imageUrl": ""
    }
]
```

</details>

</details>

<details markdown="1">
<summary>κ²μ</summary>

* **URL**

  /search?keyword={}

* **Method:**

  `GET`

* **Data Params**

```
none
```

* **Response**

  `id=[String] - spotify μμ id`  
  `name=[String] - λΈλ μ λͺ©`
  `albumName=[String] - μ¨λ² μ λͺ©`
  `artistName=[String] - κ°μ μ΄λ¦`
  `imageUrl=[String] - κ°μ μ΄λ¦`

* **Success Response:**
```json
[
    {
        "id": "4UCkX8nrBlpxjrrEqtb46a",
        "name": "Apache",
        "albumName": "8th Wonder",
        "artistName": "The Sugarhill Gang",
        "imageUrl": ""
    },
    {
        "id": "5xJ5bNY2SUh1iO2l8Hj9l1",
        "name": "Ping Pong",
        "albumName": "Collected Recordings",
        "artistName": "Gareth Dickson",
        "imageUrl": ""
    },
    {
        "id": "5xJ5bNY2SUh1iO2l8Hj9l1",
        "name": "Ping Pong",
        "albumName": "Collected Recordings",
        "artistName": "Gareth Dickson",
        "imageUrl": ""
    }
]
```

</details>

## μλ² μ€ν λ°©λ²

### H2 λ°μ΄ν°λ² μ΄μ€ μ€μΉ
1. λ§ν¬λ‘ λ€μ΄λ‘λ ν μμΆ ν΄μ   
https://h2database.com/h2-2019-10-14.zip
2. h2 λ°μ΄ν°λ² μ΄μ€ μ€ν  
```zsh
$ cd h2/bin
$ ./h2.sh
```
3. url μμ   
`xxx.xxx.xxx.xxx:8082/login...` -> `localhost:8082/login...`
4. .dbνμΌ μμ±  
4-1. `JDBC URL` - `jdbc:h2:~/musicapp`  
4-2. `~/musicapp.mv/db` νμΌ μμ± νμΈ  
4-3. μ΄ν λΆν°λ `JDBC URL` - `jdbc:h2:tcp://localhost/~/musicapp`λ‘ μ μ

### Spotify API Client
1. λ§ν¬λ‘ Spotify Client μμ±
   https://developer.spotify.com/dashboard/login
2. Spotify API Key μ€μ  νμΌ μΆκ°
```shell
$ cd back/music/src/main/resources
$ touch application-API-KEY.properties
$ echo -e "spotify.client.id=${SPOTIFY-CLIENT-ID}\nspotify.client.secret=${SPOTIFY-CLIENT-SECRET}" >> application-API-KEY.properties 
```

### μλ² μ€ν
h2 λ°μ΄ν°λ² μ΄μ€κ° μ€νμνμ¬μΌ ν©λλ€.  
Java 11λ²μ μ΄ λ€μ΄λ‘λ λμ΄μμ΄μΌ ν©λλ€.
1. gradle λΉλ  
```zsh
$ cd back/music
$ ./gradlew build
```
2. spring μλ² μ€ν  
```zsh
$ java -jar build/libs/music-0.0.1-SNAPSHOT.jar
```
