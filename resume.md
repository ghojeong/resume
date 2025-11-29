# 고정완의 이력서

- GitHub: [https://github.com/ghojeong](https://github.com/ghojeong)
- 이메일: rhwjddhks@gmail.com
- 전화번호: 010-3878-1459

6년 7개월차 Java Spring 개발자 고정완입니다.  
빗썸의 회원인증 개발팀에서 백엔드 엔지니어로 재직 중입니다.  
드림포라의 백엔드 테크리드로 일하며 200만 다운로드, MAU 16만을 달성했습니다.  
NEXTSTEP과 **우아한테크코스 리뷰어**로 일하며 크루와 현직자를 교육했습니다.  
UNIST 에서 컴퓨터공학을 성적우수 졸업했습니다.

## 경력

- **Bithumb** 회원인증팀 백엔드 개발자 *(2025.09.01 - )*
  - KCB 휴대폰 인증을 활용한 SBS 가요대전 방청권 신청 시스템 개발 (1.7만 RPS)
  - FIU 자료제출에 대비한 회원 데이터 정합성 검증 배치 개발
  - 금융감독원 보안 강화 요구에 따른 모든 기기 로그아웃 기능 개발
- **SumOne** 백엔드 개발자 *(2025.05.12 - 2025.08.14)*
  - DAU 120만 서비스의 Hash Sharding 담당
  - 1900만명의 회원 데이터를 PostgreSQL 에서 DynamoDB 로 무중단 마이그레이션
- **Dreamfora** 백엔드 테크리드 *(2021.08.25 - 2025.03.25)*
  - 인증서버를 세션기반에서 토큰기반으로 변경 후 **인증시간 93%** 단축
  - **테스트 커버리지 86%** 달성
  - IDC에서 AWS 클라우드로 인프라 전환 후 **장애빈도 99%** 감소
  - 쿼리튜닝과 DB 파티셔닝 후 **서버비용 82%** 절약
- **Ecube Labs** 웹 개발자 *(2018.10.15 - 2020.12.28)*
  - 한국 고양 시와 계근 하드웨어 업체를 위해 OAuth2.0 인증 서버와 리소스 서버 구현
  - 일본 이치카와 시의 유료 공공 쓰레기통을 위한 QR 기반 인증 및 과금 시스템 구축
  - 미국 볼티모어 시의 폐기물 수거 업무 낙찰을 위한 인증 서버 구현 후 E2E 테스트 환경 구축

## 포트폴리오

Spring Security 를 바닐라 자바로 바닥부터 만드는 스터디에 참여  
어떻게 소통하고, 얼마나 깊게 기술을 논의할 수 있는지 보여주는 PR 링크 첨부

- [OAuth2LoginAuthenticationFilter 구현](https://github.com/next-step/spring-security-oauth2/pull/8)
- [AuthorizationManager 구현](https://github.com/next-step/spring-security-authorization/pull/9)

## 기술 역량

- **프레임워크:** Spring Boot, Spring Security, Spring Batch, JPA
- **데이터베이스:** Oracle, MariaDB, DynamoDB

### 클라우드 & 인프라

- **AWS:** EC2, RDS, S3, ALB, VPC, CloudFront, Route53, IAM, DMS
- **CI/CD:** Docker, ECS, CodePipeline, Blue-Green, Rolling

### 성능 최적화 & 모니터링

- **데이터베이스 튜닝:** 쿼리 플랜 분석, 인덱스 최적화, 커서 기반 처리
- **대용량 트래픽 처리:** Rate Limiting, Back Pressure, Redis 캐싱
- **모니터링:** API 로깅 시스템, Slack 알림 연동

### 테스트 & 품질 관리

- **테스트:** JUnit, TDD, ATDD (REST Assured, REST Docs)
- **테스트 커버리지:** 86% 달성 경험

## 코드리뷰 역량

우아한테크코스와 NEXTSTEP에서의 리뷰 링크

- [람다와 함수형 프로그래밍](https://github.com/woowacourse/kotlin-omok/pull/55#discussion_r1535278325)
- [테스트와 예외처리](https://github.com/woowacourse/kotlin-lotto/pull/93#issuecomment-1970238649)
- [멀티 쓰레드 환경에서의 JPA 영속성 컨텍스트](https://github.com/next-step/jpa-entity-manager/pull/39#discussion_r1372620312)

---

## 주요 프로젝트 상세

### 1. SBS 가요대전 방청권 신청 시스템 (Bithumb)

**기간:** 2025년 11월 (1개월)
**역할:** 백엔드 단독 개발
**프로젝트 개요:**
SBS 가요대전을 통한 빗썸 마케팅 이벤트로, 10분간 50만 건의 신청이 예상되는 대규모 트래픽 상황에 대응하는 방청권 신청 시스템 개발

**주요 업무:**

- KCB 휴대폰 인증을 활용한 비회원 방청권 신청 로직 구현
- 거래소 서비스에 영향을 주지 않는 고가용성 아키텍처 설계 및 구현
- 10분 간 50만명의 신청을 버티는 대규모 트래픽 처리를 위한 성능 최적화

**문제 해결 과정:**

1. **트래픽 분산 전략**
   - Service Gateway에 Request Rate Limit 설정 (1.7만 RPS)
   - Net Funnel을 통한 단일 진입 포인트 유량 제어

2. **비동기 처리 아키텍처**
   - Kafka 이벤트 발행을 통한 Back Pressure 구현
   - 이벤트 발행 1.8만 RPS 처리, DB 쓰기는 1,288 TPS로 관리
   - KCB 인증 결과 조회와 알림톡 발송을 이벤트 Consumer로 분리

3. **데이터 처리 최적화**
   - Redis 임시 캐싱 후 Write Back 방식으로 DB 부하 감소
   - 알림톡 과부하 방지를 위한 발송 킬스위치 구현

**기여 성과:**

- **1.7만 RPS** 처리 가능한 시스템 구축
- 거래소 서비스에 영향 없이 안정적인 이벤트 진행
- Kafka를 활용한 비동기 처리로 시스템 안정성 확보

**사용 기술:** Java, Spring Boot, Oracle, Redis, Kafka, KCB 휴대폰 인증 API

### 2. 고객/회원 정합성 검증 배치 시스템 (Bithumb)

**기간:** 2025년 10월 (1개월)
**역할:** 백엔드 단독 개발
**프로젝트 개요:**
FIU, 금감원 자료 추출 시 회원/고객 데이터 정합성 문제를 사전에 방지하기 위한 일일 배치 시스템 개발

**주요 업무:**
- 회원 데이터의 정합성 검증 배치 설계 및 개발
- 정합성 검증 항목: 회원 이메일 중복, 고객 실명번호 중복, 고객의 회원계정 부재, 주계정 중복, 고객 CI 중복
- 정합성 검증 전략의 확장을 위해 책임 연쇄 디자인 패턴을 도입
- 정합성 문제 시 Slack 알림으로 연동

**문제 해결 과정:**
1. **성능 최적화**
   - JDBC READ_ONLY 옵션으로 row/table 락 방지
   - TYPE_FORWARD_ONLY 옵션으로 트랜잭션 영향 제거
   - 페이지 기반이 아닌 커서 기반 처리로 메모리 효율화

2. **실서비스 영향 최소화**
   - 읽기 전용 트랜잭션으로 서비스 락 방지
   - 대규모 데이터 처리 시에도 DB 성능 낭비 방지

**기여 성과:**
- 일일 배치 소요 시간 **30분에서 3분 내외로 단축** (90% 개선)
- 규제 리스크 사전 관리 체계 구축
- 확장 가능한 체인 구조로 향후 정합성 검증 로직 추가 용이

### 3. 모든 기기 로그아웃 기능 구현 (Bithumb)

**기간:** 2025년 9월 (1개월)
**역할:** 백엔드 단독 개발
**프로젝트 개요:**
금융감독원의 계정 보안 강화 요구사항에 따른 '모든 기기 로그아웃' 기능 개발 및 관련 이력 관리 체계 구축

**주요 업무:**
- 대고객용 모든 기기 로그아웃 API 구현
- 관리자용 로그아웃 및 로그아웃 메모 조회 기능 추가
- 로그아웃 이력과 계정잠금 이력 통합 로깅 체계 개편

**문제 해결 과정:**
1. **선제적 버그 대응**
   - 모든 기기 로그아웃 후 만료된 AccessToken으로 인한 로그인 화면 진입 실패 버그 발견
   - 배포 전 회의 소집하여 앱 개발자 추가 배정 요청
   - 인증 모듈 강제 업데이트로 버그 사전 해결

2. **시스템 통합**
   - 비밀번호 변경 시 자동 로그아웃 트리거 구현
   - 로그아웃 후 필요한 캐시 자동 삭제 로직 구현

**기여 성과:**
- FIU 감사 대비 필수 기능 사전 구축
- 사용자 경험 저하 없이 보안 강화 요구사항 충족
- 통합 로깅 체계로 감사 대응 편의성 향상

**사용 기술:** Java, Spring Boot, Oracle, Redis

---

### 4. 1900만명 회원 데이터 무중단 마이그레이션 (SumOne)

**기간:** 2025년 5월 - 7월 (3개월)
**역할:** 단독 개발 및 인프라 관리
**프로젝트 개요:**
DAU 120만 커플 다이어리 서비스의 핵심 회원 데이터를 PostgreSQL에서 DynamoDB로 무중단 마이그레이션

**주요 업무:**
- 회원 1900만명의 데이터 마이그레이션 전략 수립 및 실행
- DynamoDB 특성에 맞는 스키마 재설계 (Partition Key, Sort Key)
- 커플 단위 Spatial Locality 확보를 위한 키 설계

**문제 해결 과정:**
1. **5단계 점진적 마이그레이션**
   - 1단계: 양쪽 DB 동시 쓰기 (PostgreSQL 읽기, 롤백 대비)
   - 2단계: AWS DMS를 통한 복제 DB 생성 (같은 VPC, 네트워크 throughput 확보)
   - 3단계: AWS Database Migration Service 기반 Heterogeneous 마이그레이션
   - 4단계: DynamoDB 읽기 전환 (2주간 모니터링 후 PostgreSQL 쓰기 중단)
   - 5단계: 기존 데이터 정리

2. **성능 최적화**
   - attribute_not_exists 옵션으로 기존 데이터 보호
   - 최소 87 Mbps 목표 (EC2 micro VPC 보장 속도)
   - 병렬 프로그래밍으로 Put 성능 최적화

**기여 성과:**
- **서비스 무중단** 마이그레이션
- 롤백 가능한 **점진적** 마이그레이션 전략으로 리스크 최소화
- 커플 단위 데이터 파티셔닝으로 쿼리 성능 향상

**사용 기술:** PostgreSQL, DynamoDB, AWS DMS

### 5. JWT 기반 인증 시스템으로 리팩토링 (Dreamfora)

**기간:** 2023년 1월 - 3월 (3개월)
**역할:** 백엔드 테크리드
**프로젝트 개요:**
세션 기반 인증 구조를 JWT 기반 sessionless 형태로 전환하여 인증 성능 개선

**주요 업무:**
- Spring Security를 활용한 JWT 기반 인증 시스템 설계 및 구현
- AccessToken (1주일 갱신) / RefreshToken (6개월 유효) 분리 구조 설계
- SecurityContext 통합으로 creator/updater 로그 자동화

**문제 해결 과정:**
1. **세션 성능 문제 분석**
   - 세션이 Storage에 저장되어 I/O 병목 발생
   - 8천만 개의 세션이 TTL 없이 누적
   - 인덱스 미설정으로 풀스캔 발생

2. **JWT 아키텍처 설계**
   - Stateless 아키텍처로 서버 부하 감소
   - Token 갱신 전략으로 보안과 UX 균형
   - Spring Security Filter Chain 통합

**기여 성과:**
- 인증 시간 **8초에서 0.5초 이내로 단축** (93% 개선)
- 서버 확장성 향상 (세션 공유 불필요)
- 보안 강화 (토큰 기반 인증)

**사용 기술:** Java, Spring Boot, Spring Security, JWT, MariaDB

### 6. AWS 클라우드 인프라 전환 (Dreamfora)

**기간:** 2022년 7월 - 10월 (4개월)
**역할:** 백엔드 테크리드
**프로젝트 개요:**
IDC 호스팅에서 AWS 클라우드로 인프라 전환 및 고가용성 아키텍처 구축

**주요 업무:**
- AWS 인프라 아키텍처 설계 (VPC, EC2, RDS, ALB, S3, CloudFront)
- 보안 강화 (VPC 망분리, Bastion Host)
- 무중단 배포 파이프라인 구축 (ECS, CodePipeline)
- dev/stage/production 환경 분리

**문제 해결 과정:**
1. **고가용성 아키텍처**
   - Load Balancer를 통한 WAS 이중화
   - RDS 백업 설정으로 데이터 안정성 확보
   - VPC 사설망으로 DB 보안 강화

2. **무중단 배포**
   - dev/stage: NGINX 포트 포워딩 Blue-Green 배포
   - production: ECS Rolling 배포 (빠른 롤백 대응)

3. **DNS 전환 리스크 관리**
   - Name Server 48시간 TTL 대비 Redirect 프록시 구축

**기여 성과:**
- WAS 이중화 후 **장애 빈도 99% 감소**
- AWS 스타트업 Credit 지원 확보
- 배포 자동화로 개발 생산성 향상

**사용 기술:** AWS (EC2, RDS, S3, ALB, VPC, CloudFront, Route53, IAM, ECS), Docker, NGINX

---

### 7. DB 스키마 재설계 및 쿼리 튜닝 (Dreamfora)

**기간:** 2023년 6월 - 8월 (3개월)
**역할:** 백엔드 테크리드
**프로젝트 개요:**
재귀 쿼리와 N+1 문제를 해결하기 위한 DB 스키마 재설계 및 성능 최적화

**주요 업무:**
- 재귀 쿼리를 JOIN 쿼리로 변경 가능한 스키마 재설계
- SQL Stored Procedure를 테스트 가능한 Java 로직으로 전환
- 쿼리 플랜 분석 및 인덱스 최적화

**문제 해결 과정:**
1. **스키마 재설계**
   - 재귀 쿼리의 정지 조건 오류로 인한 서버 성능 저하 문제 분석
   - JOIN으로 해결 가능한 테이블 구조로 재설계

2. **코드 리팩토링**
   - Stored Procedure → Java 객체 변환
   - 단위 테스트로 로직 검증
   - 쿼리 플랜 분석 후 필요 인덱스 추가

3. **데이터 마이그레이션**
   - Spring Batch 활용
   - JPA BatchStatement 최적화
   - Persistable 인터페이스로 N+1 SELECT 제거

**기여 성과:**
- 서버 비용 월 **1,518달러에서 270달러로 82% 절감**
- 일일 서버 리소스 비용 **51.2달러에서 7.3달러로 감소**

**사용 기술:** Java, Spring Boot, Spring Batch, JPA, MariaDB
