# 싱글톤 패턴 활용

- 스프링 빈의 `싱글톤 스코프`
- 자바의 `java.lang.Runtime`
- 다른 디자인 패턴 구현체의 일부 (빌더, 퍼사드, 추상 팩토리 등)

## java.lang.Runtime

### Runtime?

Java의 실행 환경

```java
Runtime runtime = Runtime.getRuntime(); // 싱글톤이라 new로 만들지 못함 (생성자가 private)

System.out.println(runtime.maxMemory()); // JVM이 사용하려는 최대 메모리 양
System.out.println(runtime.freeMemory()); // JVM이 사용 가능한 메모리 양
```

## 스프링 빈, 싱글톤 스코프

```java
public static void main(String[] args) {
  ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfig.class);

  String hello1 = applicationContext.getBean("hello", String.class);
  String hello2 = applicationContext.getBean("hello", String.class);
  System.out.println(hello == hello2); // true
}
```

```java
@Configuration
public class SpringConfig {

  @Bean
  public String hello() {
    return "hello";
  }

}
```

여기서 String은 싱글톤 패턴은 아니지만 스프링이 싱글톤으로 관리 됨