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



## 프로젝트 구조 분석

### 전체 구조

```
[src]
	[main]
		[java]								 	: java 파일 위치, 패키지로 묶어서 관리, Controller, Service, DAO 객체들이 위치
		[resources]
		[webapp]								 : 웹 관련 폴더 (스프링 설정파일, JSP파일, HTML 파일 등)
			[resources]							 : html, css, js 파일 등
			[WEB-INF]
				[classes]
				[spring]						 : 스프링 컨테이너를 생성하기 위한 스프링 설정 파일
					[appServlet]
						servlet-context.xml
				[views]							 : View로 사용될 JSP 파일
					home.jsp
				web.xml							 : 웹 설정 파일
	[test]
[target]
pom.xml										 : 프로젝트에 필요한 라이브러리를 내려받기 위한 메이브 설정 파일
```



### web.xml

웹어플리케이션에서 최초 사용자의 요청은 **DispatcherServlet**이 가장 먼저 받고 처리

=> (1) <u>DispatcherServlet을 서블릿으로 등록</u>

=> (2) 모든 경로의 요청을 받기 위해 <u>Servlet의 Mapping은 "/"로 설정</u>

```xml
<servlet>
	...
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class> (1)
    ...
</servlet>

<servlet-mapping>
	...
    <url-patter>/</url-patter> (2)
    ...
</servlet-mapping>
```



### DispatcherServlet

!./[image-20211114172735618](14_스프링 MVC 웹서비스.assets/image-20211114172735618.png)

- HandlerMapping 객체 : **Controller** 탐색
- HandlerAdpater 객체 : **Method** 탐색 / ModelAndView 객체를 Dispatcher 객체에 반환
  - Controller 객체 : 작업 수행 후 **ModelAndView** 객체 반환
    - ModelAndView 객체 : 응답에 필요한 Data와 View (JSP 파일)



### servlet-context.xml

`스프링 설정을 해주는 파일`

클래스로부터 객체(bean)을 생성&조립 하는 역할



web.xml 파일에 contextConfigLocation 라는 이름으로 경로가 지정되어 있다.



 ```xml
 <servlet>
 	...
     <init-param>
     	<param-name>contextConfigLocation</param-name>
         <param-value>/WEB-INF/spring/sppServelt/servlet-context.xml</param-value>
     </init-param>
     ...
 </servlet>
 ```

(web.xml)



### Controller

>  [Controller - Service - DAO] -> 사용자의 요청을 실제로 처리하는 객체들

- `@Controller` 어노테이션을 통해 컨트롤러 클래스를 지정

- `@RequestMapping(Value = "/", method = RequestMethod.GET)` 을 통해 요청 경로와 메소드 매핑

- <u>Method가 반환하는 문자열</u>은 **View로 사용될 JSP파일의 이름

```java
@Controller
public class HomeController {
    
    ...
        
    @RequestMapping("/success")
    public String success(Model model) {
        return "success" // JSP 파일 이름
    }
    
}
```



### View

- **JSP** 파일 실행 (Java 언어를 이용해 View 응답을 할 수 있는 유일한 방법은 JSP 페이지)





## 추가!

JSP 파일을 사용한 Veiw 페이지로 응답하고 싶지 않다면??

- Method에 `@ResponseBody`라는 어노테이션을 붙이면 **return 값을 그대로 반환**
- 이후 spring-servlet.xml 파일과 pom.xml 파일을 조작해 값을 정상적으로 출력 가능





## 출처

인프런 - 자바 스프링 프레임워크(renew ver.) - 신입 프로그래머를 위한 강좌

https://victorydntmd.tistory.com/172
