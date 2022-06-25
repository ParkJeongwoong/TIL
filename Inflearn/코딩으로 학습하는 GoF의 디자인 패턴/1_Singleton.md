# 싱글톤 패턴

> 인스턴스를 오직 하나만 제공

- 런타임, 환경 세팅 등 <u>인스턴스가 여러 개일 때 생기는 문제 방지</u>

## STEP 1. 단순 구현

이런 클래스를 구현하기 위해선,
- new 를 사용해서 인스턴스를 생성하면 안됨
  - **생성자를 private으로** 만들면 클래스 밖에서 new 생성자로 인스턴스 생성 불가
  - public, static한 메서드 getInstance()를 만듦
- 인스턴스가 이미 만들어져 있다면 더이상 생성 X

```java
public class Singleton {
  
  private static Singleton instance;

  // new를 이용한 외부 생성 막기
  private Singleton() {}

  // getInstance 메서드를 통한 인스턴스 생성
  public static Singleton getInstance() {
    if (instance == null) {
      instance = new Singleton();
    }

    return instance;
  }

}
```