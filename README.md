# 고정완의 이력서

개발과 관련된 회사, 대학교, 커뮤니티 이력을 정리한 문서입니다.

- Ecube Labs (회사): 2018.10 - 재직 중
  - [회사 기술 스텍](./ecubelabs/tech.md)
- UNIST (대학교): 2013.03 - 2018.09

## 목차

- Ecube Labs (회사)
  - [Haulla Back Office](#haulla-back-office-%EC%9B%B9-%ED%94%84%EB%A1%A0%ED%8A%B8-%EA%B0%9C%EB%B0%9C) (React, Typescript)
    - 기간: 2019.07 - 진행 중
  - [CCNx](#ccnx-%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98) (Angular 7)
    - 기간: 2019.06
  - [CleanCityNetworks](#cleancitynetworks-ccn-%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98) (Angular JS)
    - 기간: 2019.05
  - [CleanScaleNetworks](#cleanscalenetworks-csn-%EA%B0%9C%EB%B0%9C)
    - [대시보드](#partner-scale-api-%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C-%EA%B0%9C%EB%B0%9C) (Pug)
      - 기간: 2019.03 - 2019.04
    - [데이터 시각화](#%EA%B3%84%EA%B7%BC-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EC%95%B5%EA%B7%A4%EB%9F%AC%EB%A1%9C-%EC%8B%9C%EA%B0%81%ED%99%94) (Angular JS)
      - 기간: 2019.01 - 2019.02
    - [Partner Scale API](#partner-scale-api-%EA%B0%9C%EB%B0%9C) (Express)
      - 기간: 2018.10 - 2018.12
- UNIST (대학교)
  - 개인 프로젝트
    - [Indoor Tracker](#indoor-tracker) (실내 위치 추적 앱)
    - [Web Server](#web-server) (바닥부터 C 언어로 구현한 웹서버)
    - [고-Shop](#%EA%B3%A0-shop) (쇼핑몰)
    - [Tetris](#tetris) (멀티 플레이가 가능한 게임 앱)
    - [Pronunciation App](#pronunciation-app) (TSS와 STT를 활용한 발음 교정 앱)
    - [Gho Map](#gho-map) (구글 지도를 활용한 앱)
  - 팀 프로젝트
    - [Class Mate](#classmate) (영상 스트리밍 앱)
- [커뮤니티](#%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0)
  - [알고리즘 스터디](#%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%8A%A4%ED%84%B0%EB%94%94)
    - 기간: 2019.09 - 2019.11
  - [<모던 자바스크립트 입문> 책 스터디](#%EB%AA%A8%EB%8D%98-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9E%85%EB%AC%B8-%EC%B1%85-%EC%8A%A4%ED%84%B0%EB%94%94)
    - 기간: 2019.07 - 2019.09
  - [공감 세미나 주니어](#%EA%B3%B5%EA%B0%90-%EC%84%B8%EB%AF%B8%EB%82%98-%EC%A3%BC%EB%8B%88%EC%96%B4)
    - 기간: 2019.03 - 2019.06

## Haulla Back Office 웹 프론트 개발

- 기간: 2019.07 - 진행 중
- 제품 소개: https://www.haulla.com/
- 설명
  - Haulla 는 쓰레기 수거자(Hauler)와 배출자(Generator)를 연결해주는 매칭 플랫폼입니다.
  - 일반 사용자(Hauler와 Generator)는 모바일 앱을 통해 매칭 서비스를 이용합니다.
  - 관리자(쓰레기 수거 회사)는 Back Office 웹을 통해 쓰레기 수거 서비스의 모니터링 및 관리를 할 수 있습니다.
- 사용 기술
  - React, Next.js
  - Typescript
  - redux, redux-observable
  - rxjs
  - lodash
  - axios, axios-observable
  - Material-UI
- 기억에 남는 점
  - 빈번한 설계의 변경으로 고통받았습니다.
  - 기획이 바뀌는가 하면, 사용할 프레임워크와 라이브러리 또한 자주 바뀌었습니다.
  - 가령 시작할 때는 Next.js를 이용해 만들었는데, 이후 설계가 바뀌어서 바벨과 웹펙 만을 이용한 리액트 프로젝트로 다시 만들어야 했습니다.
  - 신중하고 단단한 설계가 얼마나 중요한지 몸소 느꼈습니다.

<p align="center"><img src="./ecubelabs/img/haulla.png" width="60%" /></p>

## CCNx 유지보수

- 기간: 2019.06
- 제품 소개: https://www.ecubelabs.com/fleet-management-platform/
- 설명
  - 앱으로 등록된 쓰레기 수거 차량을 관리하고, 최적화된 경로 안내를 하는 웹 서비스입니다.
- 사용 기술
  - Angular 7
  - Koa
  - Swagger

<p align="center"><img src="./ecubelabs/img/ccnx.png" width="60%" /></p>

## CleanCityNetworks (CCN) 유지보수

- 기간: 2019.05
- 제품 소개: https://www.ecubelabs.com/waste-analytics-platform/
- 설명
  - 스마트 쓰레기통으로 수집한 데이터를 시각화해서 보여주는 웹 서비스입니다.
- 사용 기술
  - Angular JS

<p align="center"><img src="./ecubelabs/img/ccn.png" width="60%" /></p>

## CleanScaleNetworks (CSN) 개발

- 기간: 2018.10 - 2019.04
- 설명
  - 쓰레기 매립지에서 무게를 측정하는 계근 작업을 자동화, 온라인화 했습니다.
  - CSN 개발 이전에는, 오프라인으로 수집한 계근 데이터가 담긴 USB를 몇개월마다 정부 시청에 물리적으로 전달해야하는 번거로움이 있었습니다.
  - Partner Scale API를 통해 하드웨어로 측정된 계근 데이터를 등록, 수정, 삭제합니다.
  - 대시 보드를 통해 API 사용량을 확인하고, 외부 업체에게 요금을 청구합니다.
  - 회사 서버의 계근 데이터를 시각화하여, CCN 의 추가 기능으로 제공합니다.

<p align="center"><img src="./ecubelabs/img/csn.png" width="60%" /></p>

### Partner Scale API 대시보드 개발

- 기간: 2019.03 - 2019.04
- 설명
  - Scale API 의 사용량을 시각화한 대시보드 입니다.
  - API 사용량에 따라, 외부 업체에게 금액을 청구하기 위해 쓰였습니다.
  - 기존에 개발된 API 대시보드에, Scale API 사용량이 표시될 수 있도록 기능을 추가했습니다.
- 사용 기술
  - Pug를 통한 SSR
  - Semantic UI
- 기억에 남는 점
  - 웹 프론트에서는 기술이 정말 순식간에 생겼다가, 인기가 식는다는 점을 느꼈습니다.
  - Pug가 한 때는 잘나갔지만 지금은 노인네 취급을 받는 것처럼, 앵귤러와 리액트도 언젠가 그렇게 되지 않을까라는 생각이 들었습니다.
  - 이때부터 "유행을 타지 않는 기술이란 무엇일까?", "나는 앞으로 무얼 공부해야하나?" 같은 고민을 하게 되었습니다.

### 계근 데이터를 앵귤러로 시각화

- 기간: 2019.01 - 2019.02
- 설명
  - 회사 서버의 계근 데이터를 공무원들이 GUI를 통해 조회할 수 있게끔, 데이터를 시각화 한 프로젝트입니다.
- 사용 기술
  - Angular JS
  - axios
  - Nginx
- 기억에 남는 점
  - 토큰을 통한 로그인과 인증 과정의 설계가, 예상 이상으로 재미있었습니다.

<p align="center"><img src="./ecubelabs/img/login_1.jpeg" width="60%" /></p>
<p align="center"><img src="./ecubelabs/img/login_2.png" width="60%" /></p>

### Partner Scale API 개발

- 기간: 2018.10 - 2018.12
- 링크: https://doc.cleancitynetworks.com/partner-scale-api-doc/
- 설명
  - 계근 하드웨어에서 측정된 데이터를 회사 서버에 등록, 수정, 삭제 할 수 있는 API 입니다.
- 사용 기술
  - Express
  - apiDoc
  - MySQL
  - JWT
- 기억에 남는 점
  - JWT를 이용한 외부 인증 방식을 제공했는데, 토큰의 권한을 파싱할때 비트 단위 연산이 사용되어 어려움을 겪었습니다.
  - 하드웨어를 제조하는 파트너사가 델파이 2007을 지원해 달라고 해서 고생했습니다.
  - 델파이 2007이 끔찍한 점
    - UTF-8 이 안됩니다.
    - HTTP Request를 할 때 Body 없이 URL을 통해서만 데이터를 보낼 수 있습니다.
    - 결국 해당 파트너사를 위해 퍼센트 인코딩을 지원하는 미들웨어를 따로 개발해야 했습니다.

## Indoor Tracker

교수님의 의뢰로 만든 개인 프로젝트입니다. GPS의 기능 없이 실내에서 자신이 어디에 있는지 알려주는 안드로이드 앱입니다. Wi-Fi 신호의 Finger Printing 기법을 이용했으며, Finger Printing 된 노드들을 Sparse Matrix 자료구조 형태로 연결했습니다. Finger Printing을 하기 위해서 각 노드에서 수집된 Wi-Fi 신호들을 로컬 데이터베이스에 SQLite를 통하여 저장했습니다. 각 노드의 Finger Printing 값과 현재 측정된 Wi-Fi 신호 값을 상대적으로 비교하여, 자신의 현재 위치를 실시간으로 알아냅니다. 현재 위치에서 이동할 경우, 변경된 위치와 이동 경로를 새롭게 표시해줍니다. 이동 경로가 벽을 통과하거나, 존재하지 않는 길을 지나가지 않도록 예외처리를 하였습니다.

<p align="center"><img src="./unist/img/indoor_tracker_1.png" width="90%" /></p>

<p align="center"><img src="./unist/img/indoor_tracker_2.png" width="90%" /></p>

## Web Server

HTTP Request와 Response를 공부하기 위해 만든 개인 프로젝트입니다. C언어로 소켓 프로그래밍을 하여 밑바닥부터 만든 간단한 웹서버입니다. 브라우저의 HTTP Request에 맞추어 적절한 형식으로 HTML, CSS, JavaScript, 이미지 파일에 대한 데이터를 다시 브라우저에게 Response 해줍니다. 다수의 클라이언트 요청을 PThread를 사용한 멀티 스레드로 처리했습니다. 개발은 우분투 서버의 터미널에서 vim, gcc, gdb를 이용해 코딩했습니다.

<p align="center"><img src="./unist/img/web_server.png" width="90%" /></p>

## 고-Shop

웹 개발을 익히기 위해 만든 개인 프로젝트입니다. 서버에 centOS, Apache, MariaDB, php를 직접 소스 설치한 후, HTML, php, JavaScript, CSS 파일을 만들었습니다. 로그인, 회원가입, 회원정보 수정, 장바구니 기능이 있으며 관리자 모드와 유저 모드가 있습니다. 관리자 아이디로 로그인할 경우 관리자 모드가 되며, 상품과 유저를 관리할 수 있는 기능이 추가됩니다. 상품 목록은 페이징 처리가 되어있으며, 상품을 검색, 분류, 정렬하더라도 페이징 처리가 유지되도록 했습니다.

<p align="center"><img src="./unist/img/shop.png" width="90%" /></p>

## Tetris

테트리스 게임이 재밌어서 만든 개인 프로젝트입니다. 다른 플레이어와 멀티 플레이와 기록 경쟁이 가능한 안드로이드 게임 앱입니다. 로그인, 회원가입, 회원정보 수정이 가능하며, 로그인 정보는 SharedPreference로 저장되고, 게임의 기록은 로컬 데이터베이스에 SQLite를 통해 저장됩니다. 회원 정보와 게임 기록은 서버에 HTTP Request로 전송되어 저장됩니다. 백엔드 서버는 centOS, Apache, MySQL, php로 구축했습니다. 멀티 플레이시에는 자신의 게임 상태가 다른 플레이어에게 Java의 TCP 소켓 통신으로 서버를 경유해 실시간으로 전송됩니다. 매초마다 실시간으로 전송되는 데이터는 JSON 형식으로 보냈습니다.

<p align="center"><img src="./unist/img/tetris_1.png" width="90%" /></p>

<p align="center"><img src="./unist/img/tetris_2.png" width="90%" /></p>

<br>

## Pronunciation App

스스로 발음과 말 빠르기를 교정하기 위해 만든 개인 프로젝트입니다. 안드로이드 앱이며, 자신이 연습하고 싶은 텍스트를 로컬 데이터베이스에 SQLite를 통해 저장할 수 있습니다. TTS(Text To Speech) 기술로 등록된 텍스트를 음성으로 변환하여, 사용자는 자신이 목표로 해야 할 적절한 발음과 말 빠르기를 들을 수 있습니다. 또한 STT(Speech To Text) 기술로 녹음된 음성을 텍스트로 변환하여, 사용자의 발성이 실제로는 어떻게 들렸는지 텍스트로 직접 보여줍니다.

<p align="center"><img src="./unist/img/pronunciation_app.png" width="90%" /></p>

## Gho Map

다른 안드로이드 지도 앱에서 한가지 검색 결과만이 뜨는 것이 아쉬워 만든 개인 프로젝트입니다. 자신이 좋아하는 장소와, 싫어하는 장소 두 가지를 동시에 검색하여 결과를 보여주는 안드로이드 앱입니다. 구글 MAPS API를 사용했으며, JSON과 HTTP를 통해 검색을 요청하고 검색 결과를 받았습니다. Marker와 Info Window를 직접 커스텀하여 자신이 좋아하는 장소는 하트로, 싫어하는 장소는 Heat Map으로 나타나게 했습니다. 한 곳에 집중된 Marker에 대해 마커 클러스터링 처리를 하였습니다.

<p align="center"><img src="./unist/img/map_app.png" width="90%" /></p>

## ClassMate

- 기간: 2018.03 - 2018.07
- [**YouTube**](https://youtu.be/RMkTWNjY1Vc)
- [Source Code](https://github.com/JVHE/ClassMate)

교수님께서 애플 펜슬로 빔프로젝터에 연결된 아이패드를 칠판 대신 사용하며 수업하는 것을 보고, 안드로이드에서도 같은 방식으로 과외방송을 할 수 있도록 하고 싶은 마음에 시작한 팀 프로젝트입니다. 스마트 폰의 카메라 혹은 스크린을 실시간으로 방송하고, 방송되고 있는 화면 위에 방송자가 펜으로 수업을 할 수 있는 안드로이드 앱입니다. 우분투 서버에서 Java, php, JavaScript, Perl을 통해 개발했으며 HTTP, WebRTC, Mpeg-DASH 프로토콜을 사용했습니다. 주요 기능으로 Adaptive Streaming을 실현해, 네트워크 환경에 따라 동영상의 bitrate가 변할 수 있도록 했습니다.

저는 이 프로젝트에서 설계와 개발, 그리고 역할 분배를 해주는 역할을 맡았습니다. 저는 프로젝트를 진행하며 팀원들이 자유롭게 의견을 교류할 수 있도록 노력했습니다. 매주 두 번씩 정기적으로 회의를 할 때마다 사회자와 서기를 자처하여 회의한 내용을 기록했으며, 팀원들이 방향을 잃을 때마다 진행 상황을 정리하고 요약해 다음 단계로 나아갈 수 있도록 발판을 마련했습니다. WebRTC와 DASH 프로토콜을 팀원들이 구현할 수 있도록 관련 논문들과 기술문서들을 읽고 정리해, 팀원들에게 제공했습니다. 또한, 팀원들이 개발하는 도중 문제가 생기면 그에 대한 해결책을 제시해 진행이 늦춰지는 상황을 막았습니다.

제가 팀 프로젝트를 하며 겪은 가장 큰 어려움은, 팀원들의 사기와 단결력을 유지하는 일이었습니다. 팀원들과 같이 시도한 공부량과 작업량은 결코 적은 양이 아니었습니다. 팀원들이 계속 시간을 성실하게 쓰도록 하기 위해서는, 팀원들에게 자신이 하는 일의 가치를 스스로 대단하게 느끼게끔 해야 했습니다. 저는 팀원들이 큰 꿈을 갖고 행동할 수 있도록, 여러 IT 기업의 성장과 성공 사례를 매주 있는 회의 시간에 들려주었습니다. 하나의 꿈과 목표라는 열정을 갖고, 그 불길이 꺼지지 않도록 계속 관리하는 일은 무척 힘들었지만, 저에게 잊을 수 없는 기억을 많이 남겼습니다.

![classmate_1](./unist/img/classmate_1.png)

![classmate_2](./unist/img/classmate_2.png)

![classmate_3](./unist/img/classmate_3.png)

![classmate_4](./unist/img/classmate_4.png)

![classmate_5](./unist/img/classmate_5.png)

![classmate_6](./unist/img/classmate_6.png)

![classmate_7](./unist/img/classmate_7.png)

![classmate_8](./unist/img/classmate_8.png)

![classmate_9](./unist/img/classmate_9.png)

![classmate_10](./unist/img/classmate_10.png)

## 커뮤니티

- [자바 카페](http://tech.javacafe.io/about/)
- [소프트웨어 캠퍼스](https://www.facebook.com/softwarecamp/)

<p align="center"><img src="./community/img/softwarecampus.png" width="60%" /></p>

## 알고리즘 스터디

- 기간: 2019.09 - 2019.11
- 링크: https://github.com/study-records/coding-interview-study
- 설명
  - 혼자서는 어려웠던 알고리즘 공부에 도전하고 싶어서 열은 스터디입니다.
- 기억에 남는 점

  - 연말에 육군 훈련소에 가게 되어 스터디가 일시중지 되었는데, 훈련소를 수료하자마자 스터디가 언제 다시 열리냐는 연락을 받아서 감동했습니다.
  - 스터디원 분들을 위해 더 열심히 공부해야겠다는 새해 다짐을 했습니다.

    <p align="center"><img src="./community/img/algorithm.jpeg" width="60%" /></p>

## <모던 자바스크립트 입문> 책 스터디

- 기간: 2019.07 - 2019.09
- 링크: https://github.com/study-records/modern-javascript-study/tree/master/Modern_Javascript_Primer
- 설명
  - 자바스크립트에 대한 이해도를 높이고 싶어서 시작한 스터디입니다.
  - 공부했던 내용을 문서로 정리해서 gitHub 에 올렸습니다.
- 기억에 남는 점

  - 자바를 본업으로 삼고 계시는 경력직 개발자분들도, 언제나 새로운 학습에 목말라 있다는 열정이 참 대단하다고 느꼈습니다.
  - 본받고 싶은 분들을 많이 만나 행복했습니다.

   <p align="center"><img src="./community/img/javascript_study.jpeg" width="60%" /></p>

## 공감 세미나 주니어

- 기간: 2019.03 - 2019.06
- 링크: http://www.hanbit.co.kr/store/education/edu_view.html?p_code=S3414110334
- 설명
  - 한빛미디어 후원으로 열었던 유료 세미나입니다.
  - 본인이 직접 기획하고, 준비하고, 발표자로 참가했습니다.
  - 본인이 2개의 세션을 발표했습니다.
    - 첫번째 세션: 개발자가 되고 싶은 대학생 및 성인을 대상으로, 주니어로서 겪었던 어려움을 이야기했습니다.
    - 두번째 세션: 개발자로 취업을 희망하는 친구들과 2개월 간 만든 미니 프로젝트를 발표했습니다.
- 기억에 남는 점
  - 1만 1천원을 지불한 사람들이 80명 넘게 강의장을 꽉 채웠습니다.
  - 준비를 할 때도 긴장했지만, 발표를 할 때는 더욱 긴장해서 다리에 힘이 들어가지 않아 중간중간 의자에 앉아야 했습니다.
  - 발표가 끝나고 나서, 제가 기대했던 것 이상의 박수 소리에 기뻐서 몸을 떨었던게 기억납니다.
  - 행사가 끝나고 긴장이 풀리자, 화장실로 가서 헛구역질 했던게 기억납니다.
  - 이때부터 커뮤니티 활동이라는 스릴에 중독이 된 것 같습니다.

<p align="center"><img src="./community/img/gonggam.jpeg" width="60%" /></p>
