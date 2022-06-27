# 싱글톤 패턴을 깨뜨리는 법

```java
Singleton singleton1 = Singleton.getInstance();
Singleton singleton2 = Singleton.getInstance();

System.out.println(singleton1 == singleton2); // False??
```
두 인스턴스가 싱글톤이 아니게 되는 경우

## 리플렉션

```java
Singleton singleton1 = Singleton.getInstance();

Constructor<Singleton> constructor = Singleton.class.getDeclaredConstructor();
constructor.setAccessible(true);
Singleton singleton2 = constructor.newInstance();

System.out.println(singleton1 == singleton2); // False
```

리플렉션의 `setAccessible(true)`를 사용하면 모든 private에 접근이 가능해진다.
따라서 생성자가 private이라 하더라도 setAccessible(true)를 적용하면 newInstance 메서드로 생성자에 접근해서 새로운 인스턴스를 생성할 수 있다.

**기존에 사용하던 방법으로는 리플렉션으로 생기는 싱글톤 문제를 해결할 수 없다.**

## 직렬화 & 역질렬화

```java
// Serializable 인터페이스를 받아와야 직렬화 가능
public class Singleton implements Serializable {...}
```

```java
Singleton singleton1 = Singleton.getInstance();
Singleton singleton2 = null;

// 직렬화
try (ObjectOutput out = new ObjectOutputStream(new FileOutputStream("singleton1.obj"))) {
  out.writeObject(singleton1); // singleton1 객체를 직렬화
}

// 역질렬화
try (ObjectInput in = new ObjectInputStream(new FileInputStream("singleton1.obj"))) {
  singleton2 = in.readObject(); // 역직렬화 과정에서 다른 객체가 생성됨
}

System.out.println(singleton1 == singleton2); // False
```

역직렬화를 하면 새로운 인스턴스가 생성

하지만 직렬화/역직렬화로 인해 생기는 싱글톤 문제는 해결할 수 있음

### 해결방법

```java
public class Singleton implements Serializable {
  
  ...

  // 이 시그니처를 가지고 있으면 역직렬화를 할 때 이 메서드를 사용
  protected Object readResolve() {
    return getInstance();
  }

}
```

```java
Singleton singleton1 = Singleton.getInstance();
Singleton singleton2 = null;

// 직렬화
try (ObjectOutput out = new ObjectOutputStream(new FileOutputStream("singleton1.obj"))) {
  out.writeObject(singleton1);
}

// 역질렬화
try (ObjectInput in = new ObjectInputStream(new FileInputStream("singleton1.obj"))) {
  singleton2 = in.readObject(); // readResolve 메서드를 호출하면서 getInstance()가 실행됨
}

System.out.println(singleton1 == singleton2); // True
```

`readResolve()`를 정의하면 역직렬화 이후 새로운 인스턴스가 아니라 readResolve 메서드의 반환값이 생성됨