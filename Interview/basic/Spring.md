# Spring

- **`Spring Framework`**
  - **경량 컨테이너로서 자바 객체를 직접 관리**
    - 각각의 객체 생성, 소멸과 같은 라이프 사이클을 관리하며 스프링으로부터 필요한 객체를 얻어올 수 있다.
  - **제어의 역전(IoC)이라는 기술을 통해 <u>어플리케이션의 느슨한 결합을 도모</u>**
    - 컨트롤의 제어권이 사용자가 아닌 프레임워크에 있어서 필요에 다라 스프링에서 사용자의 코드를 호출한다.
  - **의존성 주입(DI, Dependency Injection)을 지원**
    - 각각의 계층이나 서비스들 간에 <u>의존성이 존재할 경우 프레임워크가 서로 연결</u>시켜준다.
  - **관점 지향 프로그래밍(AOP, Aspect-Oriented Programming)을 지원**
    - <u>트랜잭션이나 로깅, 보안</u>과 같이 여러 모듈에서 공통적으로 사용하는 기능의 경우 해당 기능을 분리하여 관리할 수 있다.
- **`Spring Boot vs Spring Framework`**
  - 초기 Configuration이 편함
  - Spring Framework
    - XML 설정 파일을 사용하여 애플리케이션 컨텍스트를 구성하고, 다양한 모듈과 라이브러리를 선택적으로 추가
  - Spring Boot
    - 어노테이션 기반의 설정 방식에 초점을 맞춰 XML 설정보다는 주로 Java Config를 사용
    - 자동 구성(Autoconfiguration) 및 스타터(Starter) 종속성 관리 기능 등의 편의 기능들을 제공
    - 내장된 서버 (Tomcat, Jetty, Undertow)를 사용하여 단독 실행 가능한 JAR 파일 형태로 애플리케이션을 배포
- **`Spring MVC`**
  - **Model은** 데이터 관리 및 비즈니스 로직을 처리하는 부분이며, (DAO, DTO, Service 등)
  - **View는** 비즈니스 로직의 처리 결과를 통해 유저 인터페이스가 표현되는 구간입니다. (html, jsp, tymeleaf, mustache 등 화면을 구성하기도 하고, Rest API로 서버가 구현된다면 json 응답으로 구성되기도 한다.)
  - **Controller는** 사용자의 요청을 처리하고 Model과 View를 중개하는 역할을 합니다. Model과 View는 서로 연결되어 있지 않기 때문에 Controller가 사이에서 통신 매체가 되어줍니다.
  - **DispatcherServlet** : 클라이언트에게 요청을 받아 응답까지의 MVC 처리과정을 통제한다.
  - **HandlerMapping** : 클라이언트의 요청 URL을 어떤 Controller가 처리할지 결정한다.
  - **HandlerAdapter :** HandlerMapping에서 결정된 핸들러 정보로 해당 메소드를 직접 호출해주는 역할을 한다.
  - **ViewResolver** : Controller의 처리 결과(데이터)를 생성할 view를 결정한다.
  - ❓전체적인 과정
    - DispatcherServlet -> HandlerMapping -> HandlerAdapter -> Controller ->Model -> ViewResolver -> View
      1. 클라이언트는 URL을 통해 요청을 전송한다.
      2. <u>디스패처 서블릿</u>은 <u>핸들러 매핑</u>을 통해 해당 요청이 어느 컨트롤러에게 온 요청인지 찾는다.
      3. 디스패처 서블릿은 <u>핸들러 어댑터</u>에게 요청의 전달을 맡긴다.
      4. 핸들러 어댑터는 해당 <u>컨트롤러</u>에 요청을 전달한다.
      5. 컨트롤러는 <u>비즈니스 로직을 처리</u>한 후에 반환할 뷰의 이름을 반환한다.
      6. 디스패처 서블릿은 <u>뷰 리졸버</u>를 통해 반환할 뷰를 찾는다.
      7. 디스패처 서블릿은 컨트롤러에서 <u>뷰에 전달할 데이터</u>를 추가한다.
      8. 데이터가 추가된 <u>뷰를 반환</u>한다.
- **`IOC`**
  - 제어의 역전(IoC)란 모든 객체에 대한(생성, 라이프사이클 등) 제어권을 개발자가 아닌 IoC 컨테이너에게 넘긴 것을 말합니다.
    스프링에서는 IoC 컨테이너에 객체들을 생성하면 객체끼리 의존성을 주입(DI, Dependency Injection)하는 역할을 하고
    컨테이너에 등록한 객체들을 '빈'이라고 합니다.
  - 특징
    - 결합도 낮춤
    - 유연한 코드
    - 가독성
    - 코드중복 방지
    - 유지보수 용이
  - ❓결합도 응집도
    - 결합도 : 모듈의 독립성
    - 응집도 : 모듈의 기능적 집중도
- **`Bean 등록 방법`**

  - **@Component**
    - @Controller, @Service, @Repository
  - **@Configuration 클래스**
    - 빈으로 등록할 객체를 리턴하는 메소드를 만들어 @Bean 어노테이션을 붙여주면 자동으로 해당 타입의 빈 객체가 생성
- **`Bean Scope`**
  - singleton : 하나의 객체
  - prototype : 컨테이너에 빈을 요청할 때마다 새로운 객체 전달
  - request : HTTP 요청의 생명주기 안에 하나의 객체만 존재
  - session : HTTP 세션의 생명주기 안에 하나의 객체만 존재
  - global session : global HTTP 세션의 생명주기 안에 하나의 객체만 존재

- **`DI`**

  - 의존성 주입은 필요한 객체를 직접 생성하는 것이 아닌 외부로부터 객체를 받아서 사용하는 것입니다.
    이를 통해 <u>객체간의 결합도를 줄이고</u> <u>코드의 재사용성</u>을 높일 수 있습니다.
  - 방법
    - 필드주입 : @Autowired
    - 수정자 주입 : setter @Autowired
      - setter 메서드에 어노테이션 붙이기
    - 생성자 주입 : @RequiredArgsConstructor
      - 생성자에서 주입받을 객체가 빈이라면 자동으로 됨
  - ❓생성자 주입 이유
    - 컴파일 시점에 확인하므로 NullPointerException 같은 게 생기지 않는다
    - 코드가 간결해지고 테스트 코드 작성에도 유리하다
    - 생성 시점에 정해지므로 final을 사용해서 안정성을 확보할 수 있다
- **`Filter & Interceptor`**

  - **필터는** 말 그대로 요청과 응답을 거른뒤 정제하는 역할을 합니다.
    스프링 컨테이너가 아닌 **톰캣과 같은 웹 컨테이너에 의해 관리**가 되는 것이고, 스프링 범위 밖에서 처리됩니다.
    Dispatcher Servlet에 요청이 전달되기 전 / 후에 url 패턴에 맞는 모든 요청에 대해 부가 작업을 처리할 수 있는 기능을 제공합니다.

    - ServletRequest, ServletResponse를 받고 <u>Request, Response 직접 전달 가능</u>

    - **사용 사례 :**
      - 보안 및 인증/인가 관련 작업
      - 모든 요청에 대한 로깅 또는 검사
      - 이미지/데이터 압축 및 문자열 인코딩
      - Spring과 분리되어야 하는 기능

  - **인터셉터는** 요청에 대한 작업 전 / 후로 가로채 요청과 응답을 참조하거나 가공하는 역할을 합니다.
    웹 컨테이너에서 동작하는 필터와 달리 **인터셉터는 스프링 컨텍스트에서 동작**합니다.
    Dispatcher Servlet이 Controller를 호출하기 전 / 후에 인터셉터가 끼어들어 요청과 응답을 참조하거나 가공할 수 있는 기능을 제공

    - HttpServletRequest, HttpServletResponse를 받고 <u>Request, Response 직접 전달 불가, T/F만 반</u>

    - **사용 사례 :**
      - 세부적인 보안 및 인증/인가 공통 작업
      - API 호출에 대한 로깅 또는 검사
      - Controller로 넘겨주는 정보(데이터)의 가공
- **`AOP`**

  - 공통 관심사항을 분리

  - 공통 모듈인 인증, 로깅, 트랜잭션 처리에 용이

  - ❓용어

    1. Target

       - 부가기능을 부여할 대상 (핵심기능을 담고 있는 모듈)

    2. Aspect

       - 부가기능 모듈을 Aspect라고 부른다. (핵심기능에 부가되어 의미를 갖는 모듈)

       - 부가될 기능을 정의한 Advice와 Advice를 어디에 적용할지를 결정하는 PointCut을 함께 갖고 있다.

       - 어플리케이션의 핵심적인 기능에서, 부가적인 기능을 분리해서 Aspect라는 모듈로 만들어서 설계하고 개발하는 방법

    3. Advice 

       - 실질적으로 부가기능을 담은 구현체

       - 타겟 오브젝트에 종속되지 않기 때문에, 부가기능에만 집중할 수 있음

       - Aspect가 무엇을 언제 할지를 정의

    4. PointCut

       - 부가기능이 적용될 대상(Method)을 선정하는 방법

       - Advice를 적용할 JoinPoint를 선별하는 기능을 정의한 모듈

    5. JoinPoint

       - Advice가 적용될 수 있는 위치

       - Spring에서는 메소드 조인포인트만 제공한다.

       - 타겟 객체가 구현한 모든 메소드는 조인 포인트가 된다.

    6. Proxy

       - Target을 감싸서 Target의 요청을 대신 받아주는 랩핑 오브젝트.

       - 클라이언트에서 Target을 호출하게되면, 타겟이 아닌 타겟을 감싸고 있는 Proxy가 호출되어, 타겟메소드 실행 전에 선처리, 후처리를 실행한다.

    7. Introduction
       - 타겟 클래스에 코드변경없이 신규메소드나 멤버변수를 추가하는 기능

    8. Weaving

       - 지정된 객체에 Aspect를 적용해서, 새로운 프록시 객체를 생성하는 과정

       - Spring AOP는 런타임에서 프록시 객체가 생성된다.
- **`Servlet`**
  - 클라이언트의 요청을 처리하고, 그 결과를 반환하는 Servlet 클래스의 구현 규칙을 지킨 자바 웹 프로그래밍 기술
  - ❓동작 방식
    1. Http Request -> Servlet Container
    2. HttpServletRequest, HttpServletResponse 생성
    3. Servlet에서 서비스 처리 -> HttpServletResponse 객체로 응답 전
- **`@Transactional 동작`**
  - 트랜잭션 관리를 위해 프록시를 생성 -> AOP를 기반으로 프록시 객체가 트랜잭션을 관리
  - ❓만약 @Transactional이 없는 상위 메서드 B를 통해 @Transactional 메서드 A를 호출하면?
    - Target인 B는 프록시 객체로 감싸지지 않았으므로 AOP가 동작 X
  - ❓반대로 만약 @Transactional이 있는 상위 메서드 B를 통해 @Transactional이 없는 메서드 A를 호출하면?
    - Target인 B가 프록시 객체로 감싸졌으므로 Transactional AOP가 동작하며 메서드 A까지 Transaction에 포함
- **`BeanFactory와 ApplicationContext`**
  - BeanFactory : Bean을 제공하고 관리하는 기본적인 IoC 컨테이너
  - ApplicationContext : BeanFactory의 확장 버전 (+ 애플리케이션 정보, 메타 데이터)
- **`JPA N+1`**
  - Fetch Join
    - 페이징 불가능, 카테시안 곱(이중 for문) 발생 가능
  - Entity Graph
  - Lazy Loading + Batch Size

- **`JPA`**
  - Java ORM 표준 명세
  - 구현체 -> **Hibernate**
  - JDBC -> DB와 커넥션
  - Hibernate가 구현체로 JDBC를 이용해 DB 조작
  - JPA라는 인터페이스로 사용자는 조작
  - Spring Data JPA를 이용하면 Repository 인터페이스를 통해 JPA를 쉽게 사용하도록 도와준다 (Entity 대신 조작)
- **`엔티티(Entity)`**
  - `JPA`에서는 `엔티티`는 테이블에 대응하는 하나의 클래스
  - JPA에서는 Entity Manager로 Entity를 관리
- **`영속성 컨텍스트`**
  - JPA에서 Entity를 관리하는 가장 중요한 개념
  - 엔티티 객체들을 모아두는 공간
    - 비영속 : DB와 연동된 적 없는 Java 객체
    - 영속 : DB와 연동된 객체 상태 (persist 선언 된 객체 / find를 통해 DB에서 반환된 데이터를 받은 객체)
    - 준영속 : 영속성 컨텍스트에서 분리된 상태. DB 동기화 X -> 수정 반영 X
      - 트랜잭션 종료 후 더이상 쓸모 없어지면 준영속이 됨
      - DTO로 변환해서 쓰거나 비즈니스 로직 내에서 처리하거나, 트랜잭션 이후 마음대로 수정 가능
    - 삭제 : 삭제 처리 -> 영속성 컨텍스트와 DB에서 모두 삭제
  - 장점
    - 1차 캐시
    - 쓰기 지연
    - 더티 체크
    - 지연 로딩

- **`MVC1, MVC2`**
  - MVC1 : JSP 페이지가 요청을 받아 처리
  - MVC2: 서블릿이 요청을 받고 처리 -> JSP가 페이지(뷰)를 응답
    - 역할 분리
