# Spring

## 주요 기능?

- DI : 의존성 주입
    - 각각의 계층이나 서비스들 간에 의존성이 존재할 경우 프레임워크가 서로 연결
- AOP : (관점 지향 프로그래밍) 주요 부분만 작업
    - 트랜잭션이나 로깅, 보안과 같이 여러 모듈에서 공통적으로 사용하는 기능의 경우 해당 기능을 분리하여 관리
- MVC
- JDBC : JAVA를 통해 DB에 통신

## 스프링 컨테이너 (IOC 컨테이너, DI 컨테이너)?

등록된 bean의 생성부터 소멸까지 개발자가 아닌 컨테이너가 대신 관리

## @RequestBody, @RequestParam, @ModelAttribute 차이?

- RequestBody : HTTP Body를 객체화
- RequestParam : HTTP Request Parameter **1개**
- ModelAttribute : HTTP Body, Parameter값들을 필용한 형태로 주입한 객체(생성자, Getter, Setter 필요)

## Filter vs Interceptor?

Dispatcher Servlet 기준 (요청을 어떤 컨트롤러에 위임할지 찾는 **프론트 컨트롤러**)

- Filter
    - DispatcherServlet 전에 동작
        - 공통적인 보안/인증/인가 작업
        - 요청 로깅
        - 데이터 압축, 인코딩
- Interceptor
    - DispatcherServlet과 Controller 사이에 동작
        - 세부적인 보안/인증/인가 작업
        - API 호출 로깅
        - Controller로 넘겨주는 데이터 가공

## MVC?

- Model : 데이터 관리, 비즈니스 로직 처리
- View : 유저 인터페이스 포현 (html, json)
- Controller : Model과 View를 중개

## SpringBoot의 Bean 생성법

- @Component
    - Controller, Service, Respository 모두 얘를 포함
- @Configuration → @Bean

## 싱글톤?

객체의 인스턴스가 하나

자원을 효율적으로 사용할 수 있음

### 멀티스레드 문제?

싱글톤을 잘못 구현하면 인스턴스 여러 개가 생성될 수도 있음

## JPA N+1

하나의 쿼리를 날려 N개를 조회했을 때 1:N 관계를 가지는 컬럼을 조회하는 쿼리를 매번 실행하는 것

⇒ Fetch Join으로 해결 / 두 테이블을 미리 JOIN해서 한 번에 Fetch하면 굳이 연결된 테이블을 N번 조회할 필요가 없음