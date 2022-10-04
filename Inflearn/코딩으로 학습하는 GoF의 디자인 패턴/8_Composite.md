# 컴포짓 패턴

> 전체와 개별 객체를 동일하게 처리하는 패턴

- <u>트리 구조</u>에서 사용 가능 (제약 조건)
- 클라이언트 입장에서 트리의 상위든 하위든 동일하게 사용



## 이론

- Component (Inferface) : 클라이언트가 사용하는 추상적인 인터페이스

- Leaf : Primitive한 단위의 객체 (Component 구현체)

- Composite : Leaf가 모인 그룹을 표현하는 객체 (Component 구현체)



### 예시

```java
public static void main(String[] args) {
  Item doranBlade = new Item(name: "도란검", price: 450);
  Item healPotion = new Item(name: "체력 물략", price: 50);

  Bag bag = new Bag();
  bag.add(doranBlade);
  bag.add(healPotion);

  Client client = new Client();
  client.printPrice(doranBlade);
  client.printPrice(bag);
}

private void printPrice(Item item) {
  System.out.println(item.getPrice());
}

private void printPrice(Bag bag) {
  int sum = bag.getItems().stream().mapToInt(Item::getPrice).sum();
  System.out.println(sum);
}
```

이런 코드는 Client가 Item과 Item이 모인 Bag를 모두 알아야 한다.

즉 서로 다른 두 계층을 모두 다룬다는 문제가 존재



## 구현

### App

```java
public class Client {

  public static void main(String[] args) {
    Item doranBlade = new Item(name: "도란검", price: 450);
    Item healPotion = new Item(name: "체력 물략", price: 50);

    Bag bag = new Bag();
    bag.add(doranBlade);
    bag.add(healPotion);

    Client client = new Client();
    client.printPrice(doranBlade);
    client.printPrice(bag);
  }

  private void printPrice(Component component) {
    System.out.println(component.getPrice());
  }

}
```

### Component

```java
public interface Component {
  int getPrice();
}
```

### Leaf

```java
public class Item implements Component {
  private String name;
  private int price;

  public Item(String name, int price) {
    this.name = name;
    this.price = price;
  }

  @Override
  public int getPrice() {
    return this.price;
  }
}
```

### Composite

```java
public class Bag implements Component {
  private List<Component> components = new ArrayList<>();

  public void add(Component component) {
    components.add(component);
  }

  public List<Component> getComponents() {
    return components;
  }

  @Override
  public int getPrice() {
    return components.stream().mapToInt(Component::getPrice).sum();
  }
}
```

- Leaf가 아니라 Component 타입을 사용 -> Leaf 외에 Composite 타입도 품을 수 있음
- 즉 아래처럼 Character 타입을 추가 가능



## 장단점

- 장점

복잡한 트리 구조를 편리하게 사용 가능

다양성과 재귀를 활용 가능

클라이언트 코드에 변경을 가하지 않고 새로운 Element 타입을 추가 가능 (OCP 만족)

- 단점

트리 구조를 만들면서 공통 인터페이스를 정의해야 하기 때문에 공통점을 찾다보면 지나친 일반화가 생길 수 있다 (사용하기 위해 타입 체크가 필요할 정도로 일반화가 되었다면 지나치게 패턴에 종속된 코드가 아닌지 의심할 필요가 있음)