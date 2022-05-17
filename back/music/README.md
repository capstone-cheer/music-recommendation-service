## 📚 API 설계

###### API Reference

<details markdown="1">
<summary>회원</summary>

<details markdown="1" style="margin-left:14px">
<summary>회원가입: /members/join</summary>

**자원 등록**
----

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

  **Required:**

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

<details markdown="1">
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

</details>


