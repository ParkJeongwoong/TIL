# 도커

![Docker) Spring Boot Application Image 최적화하기 | 오늘도 끄적끄적](https://perfectacle.github.io/images/spring-boot-docker-image-optimization/thumb.png)

## 도커란?

**서비스 환경(서비스 인프라)을 이미지화(실행파일화)하여 배포할 수 있도록 도와주는 응용 프로그램**

이런 <u>Immutabke Infrastructure Paradigm이란 개념을 기반으로 하기 때문에 가급적 변경하지 않고 사용</u>



**컨테이너 기반의 오픈소스 가상화 플랫폼**

<u>`컨테이너` - 플랫폼에 상관없이 Application을 실행할 수 있는 기술</u>

DockerHub를 통해 Application을 나르며 버전 관리와 배포를 지원



## 컨테이너와 이미지

### 컨테이너

**<u>이미지를 실행한 상태</u>** [프로세스]

응용프로그램의 종속성 + 응용프로그램 자체 => 패키징 or 캡슐화 => 격리된 공간에서 프로세스를 동작시키는 기술



- 컨테이너의 실행 : 이미지에 <u>읽기/쓰기 Layer를 추가</u> => 컨테이너 생성/실행 (컨테이너 사용 중 바뀐 부분을 읽기/쓰기 Layer에 적음)
- 컨테이너의 삭제 : 컨테이너에서 생성한 파일이 사라지는 것 (DB였다면 데이터가 전부 사라짐)
- 한 서버는 여러 개의 컨테이너를 가질 수 있고 각 컨테이너는 독립적으로 실행





### 이미지

**서비스 운영에 빌요한 서버 프로그램, 소스코드, 라이브러리, 컴파일 된 실행 파일을 묶는 형태** [파일]

=> 특정 프로세스를 실행하기 위한 모든 파일과 설정값

ex) Ubuntu 이미지는 Ubuntu를 실행하기 위한 모든 파일과 정보를 가지고 있다



- 이미지는 변하지 않는다 / 상태 값 X 
- <u>하나의 이미지는 여러 컨테이너를 생성 가능</u> / 컨테이너로부터 독립된 것 (컨테이너가 삭제되더라도 그대로 남아있음)
- Github과 유사한 서비스를 하는 DockerHub를 통해 이미지 버전 관리 및 배포(push & pull) 가능





### 레이어

**기존 이미지에 추가적인 파일이 필요할 때 해당 파일을 추가하는 개념**

이미지에 파일을 추가할 땐 새로운 Layer가 생성되는 형식

=> 여러 개의 Layer를 묶어 하나의 파일시스템으로 사용 (이미지 ⊃ 레이어)



![img](https://cloud.kt.com/guide/images/1568942875774.png)

 



## 명령어 살펴보기

`$ docker search nginx` -> Hub에 있는 nginx 이미지 검색 결과

`$ docker pull nginx:latest` -> Hub에 있는 최신 nginx 이미지를 다운로드

`$ docker run -d --name web -p80:80 nginx:latest` -> 로컬에 있는 이미지를 실행 (컨테이너 화)



`$ docker run (<옵션>) <이미지 식별자> (<명령어>) (<인자>)`



| 옵션  | 설명                                                         |
| :---- | :----------------------------------------------------------- |
| -d    | detached mode 흔히 말하는 백그라운드 모드 / 없으면 터미널에서 빠져나오는 순간 컨테이너 종료 |
| -p    | 호스트와 컨테이너의 포트를 연결 (포워딩) / 8080:80은 호스트 8080포트, 컨테이너 80포트 |
| -v    | 호스트와 컨테이너의 디렉토리를 연결 (마운트)                 |
| -e    | 컨테이너 내에서 사용할 환경변수 설정                         |
| –name | 컨테이너 이름 설정                                           |
| –rm   | 프로세스 종료시 컨테이너 자동 제거                           |
| -it   | -i와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션       |
| –link | 컨테이너 연결 [컨테이너명:별칭]                              |







## 참고자료

> https://hoon93.tistory.com/48
>
> https://cloud.kt.com/portal/user-guide/education-eduadvanced-edu_adv_2
>
> https://cultivo-hy.github.io/docker/image/usage/2019/03/14/Docker%EC%A0%95%EB%A6%AC/

