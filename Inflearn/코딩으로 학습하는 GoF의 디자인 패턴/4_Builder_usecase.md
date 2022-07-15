# 빌더 패턴 활용

- Java StringBuilder
- Java Stream.Builder API (Java 8 이상)
- Lombok @Builder
- Spring ~Builder (UriComponentsBuilder, MockMvcWebClientBuilder 등)

## Java의 StringBuilder

```java
public static void main(String[] args) {
  StringBuilder stringBuilder = new StringBuilder();
  String result = stringBuilder.append("whiteship").append("keesun").toString();
  System.out.println(result);
}
```

## Java의 Stream.Builder

```java
public static void main(String[] args) {
  Stream.Builder<String> stringStreamBuilder = Stream.builder();
  Stream<String> names = stringStreamBuilder.add("jeongwoong").add("whiteship").build();
  names.forEach(System.out::println);
}
```

이 코드를 줄이면 다음과 같이 된다.

```java
public static void main(String[] args) {
  Stream<String> names = Stream.<String>builder().add("jeongwoong").add("whiteship").build();
  names.forEach(System.out::println);
}
```

위의 `stringStreamBuilder`를 단순히 `Stream.builder()`로 바꾸면 에러가 발생

### 왜??

제너릭을 사용하지 않으면 Object 형태로 쌓임

즉 `Stream.builder()`는 `Stream.<Object>builder()`와 동일한 의미

## Lombok의 @Builder

```java
@Builder
public class LombokExample {

  private String title;

  private int nights;

  private int days;

}


public static void main(String[] args) {
  LombokExample trip = LombokExample.builder()
          .title("여행")
          .nights(2)
          .days(3)
          .build();
}
```

Builder 어노테이션을 쓰면 Builder 패턴 형태의 API가 만들어진다.
(여기서 build()는 이전의 getPlan()과 같은 역할)

## Spring의 ~Builder들

```java
public static void main(String[] args) {
  UriComponents howToStudyJava = UriComponentsBuilder.newInstance()
          .scheme("http")
          .host("www.whiteship.me")
          .path("java playlist ep1")
          .build().encode();
  System.out.println(howToStudyJava);
}
```

이렇게 빌더 패턴을 사용하면 그냥 String으로 만드는 것보다 규칙성 있고 안전하게 URI를 생성 가능