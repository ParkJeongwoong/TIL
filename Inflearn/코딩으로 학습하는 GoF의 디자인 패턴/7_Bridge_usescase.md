# 브릿지 패턴 활용

- Java의 JDBC API
- Java의 DriverManager와 Driver
- Java의 SLF4J
- Java의 로깅 퍼사드와 로거
- Spring의 Portable Service Abstraction



## Java의 JDBC API, DriverManager, Drive

```java
public static void main(String[] args) throws ClassNotFoundException {
    // ----- 구체적인 부분
    Class.forName ("org.h2.Driver");
    // ===== 구체적인 부분 끝

    // ----- 추상적인 부분
    try (Connection conn = DriverManager.getConnection ("jdbc:h2:mem:~/test", "sa","")) {

        String sql =  "CREATE TABLE  ACCOUNT " +
                "(id INTEGER not NULL, " +
                " email VARCHAR(255), " +
                " password VARCHAR(255), " +
                " PRIMARY KEY ( id ))";

        Statement statement = conn.createStatement();
        statement.execute(sql);

//        PreparedStatement statement1 = conn.prepareStatement(sql);
//        ResultSet resultSet = statement.executeQuery(sql);
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
    // ===== 추상적인 부분 끝
}as
```

- 추상화 부분
  
  - DriverManager
  
  - Connection
  
  - Statement
  
  - ResultSet

- 구체적 부분
  
  - Driver



-> Driver가 바뀌더라도 DriverManager나 Connection, Statement, ResultSet은 변함 X



## Java의 SLF4J(로깅 퍼사드)와 로거

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Slf4jExample {

    private static Logger logger = LoggerFactory.getLogger(Slf4jExample.class);

    public static void main(String[] args) {
        logger.info("hello logger");
    }

}
```

- 추상화 부분
  
  - Logger (SLF4J)
  
  - LoggerFactory (SLF4J)

- 구체적 부분
  
  - 구체적인 로거 (Slf4jExample.class, Log4j, JUL, Logback)



## Spring의 Portable Service Abstraction

Spring은 구체적인 부분의 인터페이스가 많이 사용됨

이 구체적인 부분의 인터페이스가 "Portable Service Abstraction"

```java
public static void main(String[] args) {
    MailSender mailSender = new JavaMailSenderImpl();
    PlatformTransactionManager platformTransactionManager = new JdbcTransactionManager();
}
```

- 구체적인 부분의 인터페이스
  
  - MailSender
  
  - PlatformTransactionManager

- 구체적인 부분의 구현체
  
  - JavaMailSenderImpl
  
  - JdbcTransactionManager