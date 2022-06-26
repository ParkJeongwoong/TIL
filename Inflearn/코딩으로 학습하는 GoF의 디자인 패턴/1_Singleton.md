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

## STEP 2. 멀티스레드 환경 구현

### synchronized 키워드 사용

getInstance 메서드를 실행할 때마다 동기화 작업이 일어나서 성능 저하

```java
public class Singleton {
  
  private static Singleton instance;

  private Singleton() {}

  // synchronized 사용. 성능이 저하됨
  public static synchronized Singleton getInstance() {
    if (instance == null) {
      instance = new Singleton();
    }

    return instance;
  }

}
```

###  이른 초기화 (Eager Initialization)

성능 향상 & <u>객체 생성 비용이 적은 경우</u>, 
미리 객체를 만들어 두는 방법도 사용 가능

```java
public class Singleton {
  
  private static final Singleton INSTANCE = new Setting();

  private Singleton() {}

  public static Singleton getInstance() {
    return INSTANCE;
  }

}
```

### Double Checked Locking

synchronized 사용 방식을 개선

인스턴스가 이미 있으면 synchronized 블록을 스킵
정말 드물게 인스턴스가 없을 때 동시에 접근하면 synchronized 블록에 접근

- volatile을 쓰는 이유
  - volatile이 없으면 작업 수행 중 CPU의 캐시에 변수값을 저장
  - 멀티스레드 환경에서는 각 스레드가 다른 CPU를 사용 => 서로 다른 CPU의 캐시에 서로 다른 변수값이 저장됨 => 변수값 불일치

```java
public class Singleton {
  
  // volatile : 변수를 캐시가 아닌 메인 메모리에서만 사용
  private static volatile Singleton instance;

  private Singleton() {}

  public static Singleton getInstance() {
    if (instance == null) {
      // Singleton 클래스 자원에 대한 접근 제한
      synchronized (Singleton.class) {
        if (instance == null) {
          instance = new Singleton();
        }
      }
    }

    return instance;
  }

}
```

## Static Inner 클래스 사용

> 권장하는 방법 중 하나

처음 Class Loader가 로딩할 때는 InnerClass는 로딩되지 않아 인스턴스 생성 X
getInstance가 호출될 때 InnerClass가 JVM 메모리에 로드되고 객체를 생성

- 왜 이게 가능할까?
  - JVM에서 클래스를 로딩하는 과정은 멀티스레드에서도 안전한 동기화 환경이 제공됨
  - 즉 JVM 클래스 로더를 이용해서 객체를 생성하면 별도의 동기화처리 없이 JVM의 구동 특성상 멀티스레드에 안전한 동기화 가능

```java
public class Singleton {

  private Singleton() {}

  private static class SingletonHolder {
    private static final Singleton INSTANCE = new Singleton();
  }

  public static Singleton getInstance() {
    return SingletonHolder.INSTANCE;
  }

}
```
