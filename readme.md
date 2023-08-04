# 공지사항(FE, BE 실행이 안될 때 조치) 
### FE : Client 폴더 내 .env 파일 추가하고 아래 내용 삽입
REACT_APP_KAKAO_JS_KEY=395621b2f6ec048404dcf426884426a1
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/login/kakao/callback
REACT_APP_SPRING_URI=http://localhost:5000

- 그래도 작동하지 않는다면, package.json 파일 내 "proxy": "http://localhost:5000" 확인

### BE : src/main/resources/application.yaml 파일 내에 아래 내용 수정(active: prod -> local)
spring:
  profiles:
    active: local 

- 그래도 작동하지 않는다면, application-local.yaml 파일 내 username, password 수정(본인 mysql에 맞게)
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/GWHDB?serverTimezone=Asia/Seoul
    username: root
    password: ssafy


# 게운해 (게임으로 운동 해)
화상 연결과 게임을 통한 홈 트레이닝 웹사이트

# 프로젝트 사용 방법
- 테스트 할 내용은 branch를 새로 만들어 작성
- 새로운 기능 merge시 메인 README에 해당 내용 업데이트
- swagger: http://localhost:5000/swagger-ui/index.html#/

# React
### 실행
npm run start

# Spring

### version
- SDK : Azur zulu java 11
- Spring : 2.7.1
- build tool : Gradle groovy


### Dependency
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Security Oauth2
- Lombok
- Mysql Driver
- Spring Devtools


