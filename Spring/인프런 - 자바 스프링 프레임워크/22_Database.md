# Database - Oracle

오라클 데이터베이스 소개

## 설치

[다운로드]

http://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/index.html



## 계정 관리

[계정 생성]

1. 윈도우 프롬프트 실행
2. cmd
3. sqlplus
4. usename, password 입력 (관리자 계정 로그인)
   - usename : system
   - password : oracle
5. 유저 계정 생성
   - `create user 유저이름 identified by 비밀번호;`
6. exit
7. 다시 sqlplus
8. 방금 만든 username, passowrd 입력



[계정 삭제]

1. 관리자 계정으로 로그인
2. `drop user 유저명 cascade`



## SQL developer

> 프롬프트 창으로 오라클을 다루다보면 불편함
>
> => 이런 불편함을 개선하기 위해 오라클은 SQL developer를 제공

http://www.oracle.com/technetwork/developer-tools/sql-developer/downloads/index.html

- 처음 설치하면 JDK(Java)의 경로를 설정해야 함
- 실행 후 새로운 접속(로그인)을 하는 방법
  - `접속` - `우클릭` - `새 접속`





## 출처

인프런 - 자바 스프링 프레임워크(renew ver.) - 신입 프로그래머를 위한 강좌
