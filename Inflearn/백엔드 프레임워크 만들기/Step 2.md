# 백엔드 프레임워크 만들기 : Step 2 - MVC Architecture

MVC에서 Model은 Request, View는 JSP라고 생각

=> **Controller**를 만드는 게 이번 Step의 Main

## Controller

Controller = controller + service

- `controller` : HttpServlet을 상속 (Servlet ; Request를 처리하는 흐름을 만듦 ; 어떤 서비스를 실행할지 결정)
- `service` : controller로 분기된 후 실행될 메서드
  - 역할 1 : **getParameter()** : request로부터 데이터를 꺼내옴
  - 역할 2 : **setAttribute()** : response로 돌려줄 처리 내용

! 여기서는 waf를 master controller로 가는 식별자로 지정
즉 `http://localhost:18080/callList`가 아니라 `http://localhost:18080/waf/callList`를 사용해서 master controller에 접근 후 callList 서비스로 분기

## web.xml

설정파일에 master controller이자 servlet인 **waf**를 등록

```xml
<web-app>

  <servlet>
		<servlet-name>waf</servlet-name>
		<servlet-class>com.code5.fw.web.MasterController <!-- 이 클래스를 waf 서블릿으로 지정 -->
		</servlet-class>
	</servlet>

	<servlet-mapping>
		<servlet-name>waf</servlet-name>
		<url-pattern>/waf/*</url-pattern> <!-- 이 주소와 waf 서블릿을 매핑 -->
	</servlet-mapping>

</web-app>
```