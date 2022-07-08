# 팩토리 메소드 패턴

> 인스턴스 생성을 구현체가 아니라 인터페이스를 활용

- 새로운 클래스를 추가하거나 코드 변경을 용이하게 만들기 위함 (확장에는 열려있고 변화에는 닫히는 OCP를 구현)
  - `CreateShip`이라는 메소드로 `WhiteShip` 과 `BlackShip`을 만들려면 코드가 복잡해진다.
  - 이를 해결하기 위해 `CreateShip`이라는 인터페이스에서 `CreateWhiteShip`, `CreateBlackShip` 메소드를 만들고 `Ship` 인터페이스를 구현한 `WhiteShip`과 `BlackShip` 구현체를 사용

## 구현

### 상위 클래스

```java
public interface ShipFactory {

  // 동일 패키지에서만 사용 가능한 default 접근제어자
  default Ship orderShip(String name, String email) {
    validate(name, email);
    prepareFor(name);
    Ship ship = createShip();
    sendEmailTo(email, ship);
    return ship;
  }

  private void validate(String name, String email) {
    if (name == null || name.isBlank()) {
      throw new IllegalArgumentException("배 이름을 지어주세요");
    }
    if (email == null || email.isBlank()) {
      throw new IllegalArgumentException("연락처을 남겨주세요");
    }
  }

  private void prepareFor(String name) {
    System.out.println(name + " 만들 준비 중");
  }

  private void sendEmailTo(String email, Ship ship) {
    System.out.println(ship.getName() + " 다 만들었습니다.");
  }

  Ship createShip(); // private이 아니라서 하위 클래스가 정의해야 함

}
```

```java
public class Ship {

  private String name;

  private String color;

  private String logo;

  public String getName() { return name; }

  public void setName(String name) { this.name = name; }

  public String getColor { return color; }

  public void setColor(String color) { this.color = color; }

  public String getLogo { return logo; }

  public void setLogo(String logo) { this.logo = logo; }

}
```

### 구현 클래스

```java
public class WhiteShipFactory implements ShipFactory {

  @Override
  public Ship createShip() { return new Whiteship(); }
    
}

// 확장 : 기존 코드 수정 없이 BlackShipFactory 클래스만 추가
public class BlackshipFactory implements ShipFactory {

  @Override
  public Ship createShip() { return new Blackship(); }

}
```

확장이 열려있고 변경에 닫혀있음 -> BlackshipFactory 추가 시 기존 코드 변경 없이 BlackshipFactory만 추가

```java
public class WhiteShip extends Ship {

  public WhiteShip() {
    setName("whiteship");
    setColor("white");
    setLogo("\uD83D\uDEE5");
  }

}

// 확장 : 기존 코드 수정 없이 BlackShip 클래스만 추가
public class Blackship extends Ship {

  public Blackship() {
    setName("blackship");
    setColor("black");
    setLogo("⚓");
  }

}
```

확장이 열려있고 변경에 닫혀있음 -> BlackShip 추가 시 기존 코드 변경 없이 Blackship만 추가

### 사용

```java
public class Client {

  public static void main(String[] args) {
    Client client = new Client();
    client.print(new WhiteshipFactory(), "whiteship", "dvlprjw@naver.com");
    client.print(new BlackshipFactory(), "blackship", "dvlprjw@naver.com");
  }

  private void print(ShipFactory shipFactory, String name, String email) {
    System.out.println(shipFactory.orderShip(name, email));
  }

}
```

의존성 주입을 통해 print() 메서드 사용

### 만약 Java 8 이하를 사용하고 있다면?

interface 안에 private 접근제어자를 사용 불가능
이럴 땐 추상 클래스, DefaultShipFactory를 만들어서 처리해야 함

```java
public interface ShipFactory {

  // default 접근제어자는 사용 가능
  default Ship orderShip(String name, String email) {
    validate(name, email);
    prepareFor(name);
    Ship ship = createShip();
    sendEmailTo(email, ship);
    return ship;
  }

  // 추상 메서드로 정의
  void validate(String name, String email);
  void prepareFor(String name);
  void sendEmailTo(String email, Ship ship);
  Ship createShip();

}
```

private을 썼던 메서드들을 추상 메서드로 변경

```java
public abstract class DefaultShipFactory implements ShipFactory {

    @Override
    public void sendEmailTo(String email, Ship ship) {
        System.out.println(ship.getName() + " 다 만들었습니다.");
    }

}
```

```java
public class WhiteshipFactory extends DefaultShipFactory {...}
public class BlackshipFactory extends DefaultShipFactory {...}
```

중간에 추상 클래스를 만들어 주고 WhiteShipFactory와 BlackShipFactory에서 interface가 아니라 abstract class를 상속받아야 한다