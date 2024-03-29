# UNIST Projects Description

[UNIST](https://www.unist.ac.kr)를 재학하며 진행했던 프로젝트들의 상세 설명입니다.

- 프로젝트 진행 기간: 2017.03 - 2018.09

## 요약

- 팀 프로젝트
  - [Class Mate](./classmate.md) (영상 스트리밍 앱)
- 개인 프로젝트
  - [Indoor Tracker](#indoor-tracker) (실내 위치 추적 앱)
  - [Web Server](#web-server) (바닥부터 C 언어로 구현한 웹서버)
  - [Pronunciation App](#pronunciation-app) (TSS와 STT를 활용한 발음 교정 앱)

## [ClassMate](./classmate.md)

- 기간: 2018.03 - 2018.07
- [**YouTube**](https://youtu.be/RMkTWNjY1Vc)
- [Source Code](https://github.com/JVHE/ClassMate)
- 스마트폰 카메라 및 스크린을 방송하는 앱입니다. 자세한 내용은 [링크](./classmate.md)를 확인해주세요.

<p align="center"><img src="./img/classmate_2.png" width="90%" /></p>

<p align="center"><img src="./img/classmate_3.png" width="90%" /></p>

## Indoor Tracker

교수님의 의뢰로 만든 개인 프로젝트입니다. GPS의 기능 없이 실내에서 자신이 어디에 있는지 알려주는 안드로이드 앱입니다. Wi-Fi 신호의 Finger Printing 기법을 이용했으며, Finger Printing 된 노드들을 Sparse Matrix 자료구조 형태로 연결했습니다. Finger Printing을 하기 위해서 각 노드에서 수집된 Wi-Fi 신호들을 로컬 데이터베이스에 SQLite를 통하여 저장했습니다. 각 노드의 Finger Printing 값과 현재 측정된 Wi-Fi 신호 값을 상대적으로 비교하여, 자신의 현재 위치를 실시간으로 알아냅니다. 현재 위치에서 이동할 경우, 변경된 위치와 이동 경로를 새롭게 표시해줍니다. 이동 경로가 벽을 통과하거나, 존재하지 않는 길을 지나가지 않도록 예외처리를 하였습니다.

<p align="center"><img src="./img/indoor_tracker_1.png" width="90%" /></p>

<p align="center"><img src="./img/indoor_tracker_2.png" width="90%" /></p>

## Web Server

HTTP Request와 Response를 공부하기 위해 만든 개인 프로젝트입니다. C언어로 소켓 프로그래밍을 하여 밑바닥부터 만든 간단한 웹서버입니다. 브라우저의 HTTP Request에 맞추어 적절한 형식으로 HTML, CSS, JavaScript, 이미지 파일에 대한 데이터를 다시 브라우저에게 Response 해줍니다. 다수의 클라이언트 요청을 PThread를 사용한 멀티 스레드로 처리했습니다. 개발은 우분투 서버의 터미널에서 vim, gcc, gdb를 이용해 코딩했습니다.

<p align="center"><img src="./img/web_server.png" width="90%" /></p>

## Pronunciation App

스스로 발음과 말 빠르기를 교정하기 위해 만든 개인 프로젝트입니다. 안드로이드 앱이며, 자신이 연습하고 싶은 텍스트를 로컬 데이터베이스에 SQLite를 통해 저장할 수 있습니다. TTS(Text To Speech) 기술로 등록된 텍스트를 음성으로 변환하여, 사용자는 자신이 목표로 해야 할 적절한 발음과 말 빠르기를 들을 수 있습니다. 또한 STT(Speech To Text) 기술로 녹음된 음성을 텍스트로 변환하여, 사용자의 발성이 실제로는 어떻게 들렸는지 텍스트로 직접 보여줍니다.

<p align="center"><img src="./img/pronunciation_app.png" width="90%" /></p>
