# 어댑터 패턴 활용

- Java의 Arrays
- Java의 Collections
- Java의 InputStreamReader
- Java의 OutputStreamWriter
- Spring의 Handler Adapter



## Java Arrays와 Collections

```java
public static void main(String[] args) {
    List<String> strings = Arrays.asList("a", "b", "c");
    Enumeration<String> enumeration = Collections.enumeration(strings);
    ArrayList<String> list = Collections.list(enumeration);
}
```

1. `Arrays.asList` : 배열 Arrays를 List로 변환

2. `Collections.enumeration` : Collections(List)를 Enumeration으로 변환

3. `Collections.list` : Collections(Enumeration)를 List로 변환



- 메서드의 인자(배열, strings, enumeration) -> Adaptee

- **메서드 -> Adapter**

- 반환된 결과 -> Target



## Java의 InputStream & OutputStream

```java
public static void main(String[] args) {
    try(InputStream is = new FileInputStream("input.txt");
        InputStreamReader isr = new InputStreamReader(is);
        BufferedReader reader = new BufferedReader(isr)) {
        while(reader.ready()) {
            System.out.println(reader.readLine());
        }
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```

문자열 `"input.txt"`을 InputStream으로,

InputStream `is`를 InputStreamReader로,

InputStreamReader `isr`을 BufferedReader로 => **Adaptee를 Target으로**



## Spring의 HandlerAdapter

일반적으로 Spring MVC에서의 Handler는 Controller 형태

```java
@Controller
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "hi";
    }

}
```

하지만 `HandlerAdapter`를 사용하면 다양한 Handler를 원하는 형태로 사용할 수도 있다

```java
public static void main(String[] args) {
    DispatcherServlet dispatcherServlet = new DispatcherServlet();
    HandlerAdapter handlerAdapter = new RequestMappingHandlerAdapter();
}
```

이 때 다양한 Handler를 받아 ModelAndView를 넘겨주기 위해 HandlerAdapter를 사용