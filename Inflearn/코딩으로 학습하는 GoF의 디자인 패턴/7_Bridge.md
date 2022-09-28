# 브릿지 패턴

> 추상적인 것과 구체적인 것을 연결하는 패턴

- 추상적인 것과 구체적인 것을 <u>나누는 것</u>
- Client 코드는 추상적인F 부분을 사용
- 추상적인 부분은 구체적인 부분의 인터페이스를 사용
- 인터페이스를 구현한 구체적인 부분이 존재



## 이론

- Abstraction : 클라이언트가 사용하는 추상적인 인터페이스

- Refined Abstraction : Abstraction의 구현체

- Implemetation : Abstraction이 사용하는 구체적인 인터페이스

- Concrete Implementation : Implemetation의 구현체



### 예시

- LOL -> Champion 인터페이스 사용

- Champion -> Skin 인터페이스 사용

- DefaultChampoin -> Champion 인터페이스 구현

- Skin 인터페이스

- PoolPartySkin, KDASKin -> Skin 인터페이스 구현



## 구현

### LOL

```java
public static void main(String[] args) {
  Champion kda아리 = new 아리(new KDA());
  kda아리.skillQ();
  kda아리.skillW();

  Champion poolParty아리 = new 아리(new PoolParty());
  poolParty아리.skillR();
  poolParty아리.skillW();
}
```

### Champion

```java
public interface Champion extends Skin {
  void move();
  void skillQ();
  void skillW();
  void skillE();
  void skillR();
}
```

### DefaultChampion

```java
public class DefaultChampion implements Champion {
  private Skin skin;
  private String name;

  public DefaultChampion(Skin skin, String name) {
    this.skin = skin;
    this.name = name;
  }

  @Override
  public void move() {
    System.out.printf("%s %s move\n", skin.getName(), this.name);
  }

  @Override
  public void skillQ() {
    System.out.printf("%s %s Q\n", skin.getName(), this.name);
  }

  @Override
  public void skillW() {
    System.out.printf("%s %s W\n", skin.getName(), this.name);
  }

  @Override
  public void skillE() {
    System.out.printf("%s %s E\n", skin.getName(), this.name);
  }

  @Override
  public void skillR() {
    System.out.printf("%s %s R\n", skin.getName(), this.name);
  }

  @Override
  public String getName() {
    return null;
  }
}

// 아리
public class 아리 extends DefaultChampion {
  public 아리(Skin skin) {
    super(skin, "아리");
  }
}
// 아칼리
public class 아칼리 extends DefaultChampion {
  public 아칼리(Skin skin) {
    super(skin, "아칼리");
  }
}
```

### Skin Interface

```java
public interface Skin {
  String getName();
}
```

### Skin Class

```java
public class KDA implements Skin{
  @OverrideVv
  public String getName() {
      return "KDA";
  }
}

public class PoolParty implements Skin {
    @Override
    public String getName() {
        return "PoolParty";
    }
}
```

## 장단점

- 장점

추상적인 코드 변경 없이 구체적인 코드 변경만으로 확장 가능 (OCP 만족)

추상적인 코드와 구체적인 코드 분리 (SRP 만족)

- 단점

계층 구조가 늘어나 복잡도가 증가
