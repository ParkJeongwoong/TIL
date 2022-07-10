# 팩토리 메소드 패턴 활용

- Java의 Calendar

## 기본 구현

```java
public class SimpleFactory {

  public Object createProduct(String name) {
    if (name.equals("whiteship")) {
      return new Whiteship();
    } else if (name.equals("blackship")) {
      return new Blackship();
    }

    throw new IllegalArgumentException();
  }

}
```

## Java의 Calendar

```java
public class CalendarExample {

  public static void main(String[] args) {
    System.out.println(Calendar.getInstance().getClass());
    System.out.println(Calendar.getInstance(Locale.forLanguageTag("th-TH-x-lvariant-TH")).getClass()); // 태국
    System.out.println(Calendar.getInstance(Locale.forLanguageTag("ja-JP-x-lvariant-JP")).getClass()); // 일본
  }

}
```

## Spring의 BeanFactory

```java
public class SpringBeanFactoryExample {

  public static void main(String[] args) {
    // XML 기반 설정
    BeanFactory xmlFactory = new ClassPathXmlApplicationContext("config.xml");
    String hello = xmlFactory.getBean("hello", String.class);
    System.out.println(hello);

     // Java 코드 기반 설정
    BeanFactory javaFactory = new AnnotationConfigApplicationContext(Config.class); 
    String hi = javaFactory.getBean("hello", String.class);
    System.out.println(hi);
  }

}
```

```java
public interface BeanFactory {
  ...

  Object getBean(String var1) throws BeansException;
  
  ...
}
```

- Creator
  - BeanFactory
- Concrete Creator
  - ClassPathXmlApplicationContext
  - AnnotationConfigApplicationContext
- Product
  - Object
- Concrete Product
  - String (hello)
  - String (hi)