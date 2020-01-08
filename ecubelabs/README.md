# Ecube Labs Projects Description

[Ecube Labs](https://www.ecubelabs.com)를 다니며 진행했던 프로젝트들의 상세 설명입니다.

- 기간: 2018.10 - 재직중

<!-- ## 회사 기술 스텍, 도구

아래와 같은 환경에서 업무를 진행했다는 것이지, 제가 이 모든 기술에 통달한 것은 아닙니다.<br>
가령 간단히 Dockerize를 할줄 알고 Jenkinsfile 도 수정할 줄 알지만, 인프라를 자세히 알지는 못합니다.<br>
실제 개발한 프로젝트들을 참고해서 제 능력을 짐작해주세요.<br>

- 협업툴
  - Slack (소통)
  - Jira (이슈 관리)
  - Confluence (문서 관리)
  - Google Drive (문서 및 기타 자료 관리)
  - Visual Studio Code (IDE)
  - Prettier (Code Formatter)
  - ESLint
- 형상 관리
  - GitHub
  - Sourcetree
  - Husky (Git Hook)
- 언어 (Javascript)
  - ES6 (with npm)
  - TypeScript
- 라이브러리
  - redux
  - rxjs
  - lodash
  - axios
- TDD
  - Jest
  - Enzyme
  - react-test-renderer
- 백엔드 모니터링
  - ELK
    - Elasticsearch, Logstash, Kibana
  - Slack Bot with Web Hook
- 웹 프론트
  - AngularJS
  - Angular 7
  - React
  - SCSS
- 백엔드 API
  - Node.js
  - Express.js
  - Hapi.js
  - Koa.js
  - Postman
- API 문서화
  - apiDoc
  - Swagger
- CI/CD 인프라
  - Docker
  - Jenkins
  - k8s
  - terraform
- DB
  - MySQL
  - AWS Aurora
  - Redis -->

## Haulla Back Office 웹 프론트 개발

<p align="center"><img src="./img/haulla.png" width="50%" /></p>

- 기간: 2019.07 -
- 제품 소개 페이지: https://www.haulla.com/
- 설명
  - 쓰레기 수거자(Hauler)와 생산자(Generator)를 연결해주는 매칭 플랫폼입니다.
  - 일반 사용자(Hauler와 Generator)는 모바일 앱을 통해 매칭 서비스를 이용합니다.
  - 관리자(쓰레기 수거 회사들)는 웹을 통해 쓰레기 수거 서비스의 모니터링 및 관리를 할 수 있습니다.
- 사용기술
  - React, Next.js
  - Typescript
  - redux, redux-observable
  - rxjs
  - lodash
  - axios, axios-observable
  - material-ui
- 기억에 남는 점
  - 빈번한 설계의 변경으로 고통 받았습니다.
  - 기획이 바뀌는가 하면, 사용할 프레임워크와 라이브러리 또한 자주 바뀌었습니다.
  - 가령 시작할 때는 Next.js 를 이용해 만들었는데, 이후 설계가 바뀌어서 바벨과 웹펙만을 이용한 리액트 프로젝트로 다시 만들어야 했습니다.
  - 신중하고 단단한 설계가 얼마나 중요한지 몸소 느꼈습니다.

## CCNx 유지보수

<p align="center"><img src="./img/ccnx.png" width="50%" /></p>

- 기간: 2019.06
- 설명: https://www.ecubelabs.com/fleet-management-platform/
- 사용기술
  - Angular 7
  - Koa
  - Swagger

## CleanCityNetworks (CCN) 유지보수

<p align="center"><img src="./img/ccn.png" width="50%" /></p>

- 기간: 2019.05
- 설명:https://www.ecubelabs.com/waste-analytics-platform/
- 사용기술
  - Angular JS

## CleanScaleNetworks (CSN) 개발

<p align="center"><img src="./img/csn.png" width="50%" /></p>

- 기간: 2018.10 - 2019.04
- 설명
  - 쓰레기 매립지에서 무게를 측정하는 계근 작업을 자동화, 온라인화 했습니다.
  - CSN 개발 이전에는, 오프라인으로 모아진 계근 데이터가 담긴 USB를 몇개월마다 정부 시청에 물리적으로 전달해야하는 번거로움이 있었습니다.
  - Partner Scale API 를 통해 하드웨어로 측정된 계근 데이터를 등록, 수정, 삭제합니다.
  - 대시 보드를 통해 API 사용량을 확인하고, 외부 업체에게 요금을 청구합니다.
  - 회사 서버의 계근 데이터를 시각화하여, CCN 의 추가 기능으로 제공합니다.

### Partner Scale API 대시보드 개발

- 기간: 2019.03 - 2019.04
- 설명
  - Scale API 의 사용량을 시각화한 대시보드 입니다.
  - API 사용량에 따라, 외부 업체에게 금액을 청구하기 위해 쓰였습니다.
  - 기존에 개발된 API 대시보드에, Scale API 사용량이 표시될 수 있도록 기능을 추가했습니다.
- 사용기술
  - Pug 를 통한 SSR
- 기억에 남는 점
  - 웹 프론트에서는 기술이 정말 순식간에 생겼다가, 인기가 식는다는 점을 느꼈습니다.
  - Pug와 Jade 가 한 때는 잘나갔지만 지금은 노인네 취급을 받는 것처럼, 앵귤러와 리액트도 언젠가 그렇게 되지 않을까라는 생각이 들었습니다.
  - 이때부터 "유행을 타지 않는 기술이란 무엇일까?", "나는 앞으로 무얼 공부해야하나?" 같은 고민을 하게 되었습니다.

### 계근 데이터를 앵귤러로 시각화

- 기간: 2019.01 - 2019.02
- 설명
  - 회사 서버의 계근 데이터를 정부 공무원들이 GUI 를 통해 조회할 수 있게끔, 데이터를 시각화 한 프로젝트입니다.
- 사용기술
  - Angular JS
  - axios
  - Nginx
- 기억에 남는 점
  - 토큰을 통한 로그인과 인증 과정의 설계가, 예상 이상으로 재미있었습니다.

<img src="./img/login_1.jpeg" width="50%" float="left" />
<img src="./img/login_2.jpeg" width="50%" float="right" />

### Partner Scale API 개발

- 기간: 2018.10 - 2018.12
- 링크: https://doc.cleancitynetworks.com/partner-scale-api-doc/
- 설명
  - 계근 하드웨어에서 측정된 데이터를 회사 서버에 등록, 수정, 삭제 할 수 있는 API 입니다.
- 사용기술
  - ES6
  - Express
  - apiDoc
  - MySQL
  - JWT
- 기억에 남는 점
  - JWT 를 이용한 외부 인증 방식을 제공했는데, 토큰의 권한을 파싱할때 비트 단위 연산이 사용되어 어려움을 겪었습니다.
  - 하드웨어를 제조하는 파트너사가 델파이 2007을 지원해 달라고 해서 고생했습니다.
    - 델파이 2007이 끔찍한 점
      - UTF-8 이 안됩니다.
      - HTTP Request 를 할 때 Body 없이 URL을 통해서만 데이터를 보낼 수 있습니다.
      - 결국 해당 파트너사를 위해 퍼센트 인코딩을 지원하는 미들웨어를 따로 개발해야 했습니다.
