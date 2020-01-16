# Question

[자신 있는 코드](./README.md)를 읽은 면접관들에게, 역으로 물어볼 질문들

## 공통

1. 고정완의 [자신 있는 코드](./README.md)를 보셨다면, 코드 리뷰 좀 부탁드려요.

## redux-observable을 통한 비동기 처리

서비스, 에픽, 리듀서, 셀렉터 4개가 분리되어 있고<br>
각각 넘겨받은 데이터를 가공할 수 있는 권한들이 있다.

1. 4개 중에 필요 없는 게 있을까요?
2. API 반환 값이 다음과 같이 바뀐다면, 현재 코드를 어떻게 수정하실래요?

###### AS-IS

```json
{
  "data": {
    "userIdx": 1, // required
    "name": "ghojeong", // required
    "email": "gho@email.com", // required
    "phoneNumber": "+821012345678" // required
  }
}
```

###### TO-BE

```json
{
  "data": {
    "userIdx": 1, // required
    "firstName": "jeongwan", // required
    "lastName": "gho", // optional
    "email": "gho@email.com", // required
    "phoneNumber": "+821012345678" // required
  }
}
```
