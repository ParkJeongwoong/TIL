# 추상 팩토리 패턴

> 클래스를 사용할 때 인터페이스를 사용함으로써 구체적인 클래스를 사용하지 않는 것
>
> (추상적인 Factory와 Product를 사용하는 Client 쪽에 맞춰진 패턴)

```java
public class WhiteShipFactory implements ShipFactory {

  @Override
  public Ship createShip() {
    Ship ship = new Whiteship();
    ship.setAnchor(new WhiteAnchor());
    ship.setWheel(new WhiteWheel());
    return ship; 
  }
    
}
```

(추상 팩토리 패턴를 적용하지 않은 코드)
이런 코드는 Anchor나 Wheel이 바뀌면 코드가 계속 바뀌게 됨

## 구현

```java
public interface ShipPartsFactory {

  Anchor createAnchor();
  Wheel createWheel();

}
```

(Creator)
이렇게 아까 수정이 생길 수 있는 Anchor와 Wheel 생성을 포함하는 ShipPartsFactory 인터페이스를 만든다.

```java
public interface Anchor {}
public interface Wheel {}

public class WhiteAnchor implements Anchor {}
public class WhiteWheel implements Wheel {}
```

(Product & Concrete Product)

```java
public class WhiteshipPartsFactory implements ShipPartsFactory {

  @Override
  public Anchor createAnchor() {
    return new WhiteAnchor();
  }

  @Override
  public Wheel createWheel() {
    return new WhiteWheel();
  }

}
```

(Concrete Creator)

```java
public class WhiteShipFactory implements ShipFactory {

  private ShipPartsFactory shipPartsFactory;

  public WhiteShipFactory(ShipPartsFactory shipPartsFactory) {
    this.shipPartsFactory = shipPartsFactory;
  }

  @Override
  public Ship createShip() {
    Ship ship = new Whiteship();
    ship.setAnchor(shipPartsFactory.createAnchor());
    ship.setWheel(shipPartsFactory.createWheel());
    return ship; 
  }
    
}
```

(Client)
이렇게 ShipFactory 생성 시 ShipPartsFactory를 의존성으로 주입하면 Anchor와 Wheel에 변경사항이 생기더라도 WhiteShipFactory 코드에는 영향이 없다

```java
// Pro 제품군 추가
public class WhiteProAnchor implements Anchor {}
public class WhiteProWheel implements Wheel {}

public class WhitePartsProFactory implements ShipPartsFactory {
  @Override
  public Anchor createAnchor() {
    return new WhiteAnchorPro();
  }

  @Override
  public Wheel createWheel() {
    return new WhiteWheelPro();
  }
}
```

이렇게 제품군이 추가되더라도 WhiteShipFactory에는 변경사항 X

```java
public class ShipInventory {

  public static void main(String[] args) {
    ShipFactory shipFactory = new WhiteshipFactory(new WhiteshipPartsFactory()); // 일반 제품군
    Ship ship = shipFactory.createShip();
    System.out.println(ship.getAnchor().getClass());
    System.out.println(ship.getWheel().getClass());

    ShipFactory shipFactory = new WhiteshipFactory(new WhitePartsProFactory()); // Pro 제품군
    Ship shipPro = shipFactory.createShip();
    System.out.println(ship.getAnchor().getClass());
    System.out.println(ship.getWheel().getClass());
  }

}
```