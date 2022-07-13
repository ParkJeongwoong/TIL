# 추상 팩토리 패턴 활용

- Java 라이브러리 (XML Parser)
- Spring의 FactoryBean과 구현체

## Java의 라이브러리

```java
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();
Document document = builder.parse(new File("src/main/resources/config.xml"));
System.out.println(document.getDocumentElement());
```

여러 XML 형식들과 관계 없이 추상적인 Document와 그 Builder에 대한 코드

## Spring의 FactoryBean

FactoryBean : Spring이 제공하는 인터페이스, 단순히 New를 사용하여 Bean을 만드는 것이 아닌 복잡한 과정이 필요할 때 사용
 
```java
public class FactoryBeanExample {

  public static void main(String[] args) {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("config.xml");
    Ship whiteship = applicationContext.getBean("whiteship", Ship.class);
    System.out.println(whiteship.getName());
  }
}


// FactoryBeanConfig
@Configuration
public class FactoryBeanConfig {

  @Bean
  public ShipFactory shipFactory() {
    return new ShipFactory();
  }

}
```

```java
public class ShipFactory implements FactoryBean<Ship> {

  @Override
  public Ship getObject() throws Exception {
    Ship ship = new Whiteship();
    ship.setName("whiteship");
    return ship;
  }

  @Override
  public Class<?> getObjectType() {
    return Ship.class;
  }

}
```

구현체 ShipFactory

이 ShipFactory를 Bean으로 등록하면, **ShipFactory가 만드는 Object(Ship)을 Bean으로 등록함**

```java
public class FactoryBeanExample {

  public static void main(String[] args) {
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(FactoryBeanConfig.class);
    Ship bean = applicationContext.getBean(Ship.class);
    System.out.println(bean);
  }

}
```

Java 설정을 사용할 경우 config.xml을 등록하는 과정이 필요 X
(하지만 FactoryBean을 사용하는 의미가 적어짐)