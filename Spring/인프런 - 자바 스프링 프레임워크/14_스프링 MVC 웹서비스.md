# 스프링 MVC 웹서비스

## 웹서버 (Tomcat)

[다운로드]

http://tomcat.apache.org/

`Tomcat 8` - `Binary Distributions` - `Core` - `zip`



[이클립스 <u>연동</u>]

**서버탭이 없다면?**

=> `Window` - `Show View` - `Other` - `Servers` - `Open`



**이클립스에 사용 가능한 서버가 없다고 뜬다면?**

=> `문구 클릭` - `다운로드 받은 Tomcat 버전 선택` - `압축 해제한 폴더 경로로 선택` - `사용 중인 JRE 선택` - `Finish`



[서버 <u>설정</u>]

서버탭의 서버를 더블 클릭 => 설정 화면

- **Server Locations** : `Use Tomcaet installation`
- **Server Options** : `Publish module contexts to separate XML files` 체크
- **Ports** : HTTP/1.1 포트를 8090으로 변경 (DB를 오라클로 쓰면 오라클이 포트를 8080으로 자동으로 가져가면서 충돌이 생김)



- 아래의 Run 버튼 옆의 `Publish to Server` 클릭 -> 서버와 연동
- **Server 구동**
  - 이후 localhost:8090으로 접속하면 톰캣 시작 창이 뜬다



## STS

웹서비스를 구현하려면 web.xml, dispatcher servlet, pom.xml 등의 작업을 처리해야 함

이걸 일일이 하지 않고 자동으로 기본 설정 상태를 세팅하는 Plugin

### 이클립스 - STS

[설치]

`Help` - `Marketplace` - `Spring Tools / STS` - **설치 진행** (중간에 선택이 안 되어 있는 항목이 있으면 전부 선택해 준다)



[웹프로젝트 생성]

`New` - `Other` - `Spring Legacy Project` - `Spring MVC Project` - `관련 파일 다운로드 Yes`

- 패키지 명은 유니크하고 2단계 이상의 이름으로 짓는다 (ex. **com.jw.test.pjt001**)
- 생성 후 Tomcat 서버를 돌릴 때는 프로젝트를 우클릭하고 **Run As - Run on Server**를 선택한다





## 출처

인프런 - 자바 스프링 프레임워크(renew ver.) - 신입 프로그래머를 위한 강좌

