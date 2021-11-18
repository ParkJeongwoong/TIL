# Service & Dao 객체 구현

- 기능을 구현하는 Service 객체
- Database Access Object, DB에 접근하는 객체

## 한글 처리

한글이 깨지지 않고 출력되려면 web.xml 파일에 UTF-8 인코딩을 설정해줘야 한다.

```xml
...

<filter>
    <filter-name>encodingFilter</filter-name>
    <filter-class>
        org.springframework.web.filter.CharacterEncodingFilter
    </filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>forceEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>

<filter-mapping>
    <filter-name>encodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>

...
```



## `서비스 객체` 구현

### 방법1 : `new 연산자`를 이용한 객체 생성 및 참조

```java
MemberService service = new MemberService();
```



### 방법2 : `스프링 설정파일`을 이용한 객체 생성 및 의존성 자동 주입

```xml
<beans:bean id="service" class="com.jw.lec17.member.service.MemberService"></beans:bean>
```

```java
@Autowired
MemberService service;
```



### 방법3 : `어노테이션`을 이용한 객체 생성 및 의존성 자동 주입

```java
@Repository("memService")
public class MemberService implements IMemberService {}

@Resource(name="memService")
MemberService service;
```



## `DAO 객체` 구현

### 방법 : `어노테이션`을 이용한 객체 생성 및 의존성 자동 주입

```java
@Repository
public class MemberDao implements IMemberDao {}

@Autowired
MemberDao service;
```





## 출처

인프런 - 자바 스프링 프레임워크(renew ver.) - 신입 프로그래머를 위한 강좌
