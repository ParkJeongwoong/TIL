# Java

- **`Java의 특징`**

  - JVM을 이용하기 때문에 운영체제에 독립적입니다.
  - 객체지향언어이기 때문에 캡슐화, 상속, 다형성, 추상화의 특징을 가집니다.
  -  런타임시 데이터 타입이 결정되는 동적 타입 언어입니다.
  - 컴파일 언어와 인터프리터 언어 2가지 동작방식을 복합적으로 사용하는 하이브리드 언어라고 불리기도 합니다.
  - GC를 지원합니다.
- **`Java의 컴파일`**

  - Build : 컴파일러가 class 파일 생성
  - Class Loader : JVM 메모리로 class파일 로드
  - Execution : JVM의 Execution Engine이 실행
  - GC : Garbage Collection이 주기적으로 메모리 제거
- **`Java의 원시 타입`**

  - 정수형
    - byte : 1 바이트
    - short : 2 바이트
    - int : 4 바이트 
    - long : 8 바이트
  - 실수형
    - float : 4 바이트
    - double : 8 바이트
  - 문자형
    - char : 2 바이트
  - 논리형
    - boolean : 1 바이트

- **`오버라이딩, 오버로딩`**

  - 오버라이딩(Overriding)은 상위 클래스에 있는 메소드를 하위 클래스에서 재정의 하는 것을 말하고,
  - 오버로딩(Overloading)은 매개변수의 개수나 타입을 다르게 하여 같은 이름의 메소드를 여러 개 정의하는 것을 말합니다.

- **`객체지향 프로그래밍(OOP)`**

  - 기능이 아닌 **객체가 중심**이며 **"누가 어떤 일을 할 것인가?"**가 핵심
  - 특징으로는 <u>캡슐화, 상속, 다형성, 추상화</u> 등이 있고, <u>모듈 재사용으로 확장 및 유지보수가 용이</u>

- **`try-with-resources`**

  - try-with-resources는 try-catch-finally의 문제점을 보완하기 위해 나온 개념입니다.

  - try( ... ) 안에 자원 객체를 전달하면, try블록이 끝나고 자동으로 자원 해제 해주는 기능을 말합니다.

  - 따로 finally 구문이나 모든 catch 구문에 종료 처리를 하지 않아도 되는 장점이 있습니다.

    ```java
    // try-catch-finally
    FileOutputStream out = null;
    try {
        out = new FileOutputStream("exFile.txt");
        // ... 이후 입출력 로직 처리 ...
    }catch (FileNotFoundException e) {
        e.printStackTrace();
    }finally {
        if(out != null) { //스트림이 null인지 체크
            try {
                out.close();
            }catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    // try-with-resources
    try(FileOutputStream out = new FileOutputStream("exFile.txt")) {
        // ...이후 입출력 로직 처리...
    }catch (IOException e) {
        e.printStackTrace();
    }
    ```

- **`Java의 불변 객체`**

  - 생성 이후 내부의 상태가 변하지 않는 객체
  - 원시 타입인 경우 final 키워드를 사용
  - 참조 타입일 경우엔 추가적인 작업
    - 참조하는 객체의 변수도 불변으로 만듦
    - Array인 경우
      - 생성 시 Arrays.copyOf()를 써서 복사해서 저장
      - 조회 시 배열.clone() 으로 복사본을 반환
    - List인 경우
      - 생성 시 new ArrayList<>(배열)을 서서 저장
      - 조회 시 Collections.unmodifiableList(배열)로 반환

  - ❓사용 이유
    - **Tread-Safe**
    - 매번 동일한 상태를 가지므로 에러가 발생해도 **항상 이전과 똑같이 처리 가능**

- **`추상 클래스 vs 인터페이스`**

  - 추상 클래스
    - 추상 메소드가 하나 이상 포함 / abstract로 정의된 경우
    - 일반 변수, 생성자, 일반 메서드, 추상 메서드를 모두 가질 수 있음
    - 다중상속 불가능
    - is
      - 상위 클래스의 기능 이용
      - 공통 로직을 추상화
  - 인터페이스
    - 모든 메소드가 추상 메소드로만 이루어져 있는 것
    - 상수와 추상 메서드만
    - 다중상속 가능
    - has
      - 모든 구현 클래스에 해당 메서드 존재
  - 공통점
    - 인스턴스 생성 불가능 -> 확장, 구현을 해서 사용 가

- **`싱글톤 패턴`**

  - 싱글톤 패턴은 단 하나의 인스턴스를 생성해 사용하는 디자인 패턴입니다.
  - 인스턴스가 1개만 존재해야 한다는 것을 보장하고 싶은 경우와
  - 동일한 인스턴스를 자주 생성해야 하는 경우
  - ❓예시
    - Spring Bean
      - https://doflamingo.tistory.com/44
      - 멀티쓰레드에서 잘 쓰는 이유는?
      - @Controller, @Service 등은 불변객체이기 때문
      - <u>**웬만하면 불변 객체로 사용**</u>
      - @Scope("prototype") 으로 싱글톤을 풀거나, synchronized 사용

- **`가비지 컬렉션`**

  - JVM의 메모리 관리 기법
  - 동적으로 할당된 메모리 중 필요없는 걸 회수
  - ❓과정
    - 어플리케이션을 멈추고
    - 메모리 제거
      - Minor GC : Young 영역 제거
      - Major GC : Old 영역 제거

- **`객체지향 설계 원칙`**

  - **SRP** - 단일 책임 원칙 : 한 클래스는 하나의 책임만 가져야 한다.
  - **OCP** - 개방-폐쇄 원칙 : 확장에는 열려있고, 수정에는 닫혀있어야 한다.
  - **LSP** - 리스코프 치환 원칙 : <u>하위 타입은 항상 상위 타입을 대체</u> 할 수 있어야 한다.
  - **ISP** - 인터페이스 분리 원칙 : <u>인터페이스 내에 메소드는 최소한 일수록 좋다. (하나의 일반적인 인터페이스보다 여러 개의 구체적인 인터페이스가 낫다.)</u> SRP와 같은 문제에 대한 두 가지 다른 해결책이다.
  - **DIP** - 의존관계 역전 원칙 : 구체적인 클래스보다 <u>상위 클래스, 인터페이스, 추상클래스와 같이 변하지 않을 가능성이 높은 클래스와 관계를 맺어라</u>. DIP 원칙을 따르는 가장 인기 있는 방법은 의존성 주입(DI)이다.

- **`메모리 영역`**

  - 크게 Method 영역, Stack 영역, Heap 영역으로 구분되고, 데이터 타입에 따라 할당
  - **메소드(Method) 영역** : <u>클래스, 전역변수와 static변수</u>를 저장하며, Method영역은 프로그램의 시작부터 종료까지 메모리에 남아있다.
  - **스택(Stack) 영역** : <u>지역변수와 매개변수 데이터 값</u>이 저장되는 공간이며, 메소드가 호출될 때 메모리에 할당되고 종료되면 메모리가 해제된다. LIFO(Last In First Out) 구조를 갖고 변수에 새로운 데이터가 할당되면 이전 데이터는 지워진다.
  - **힙(Heap) 영역** : <u>new 키워드로 생성되는 객체(인스턴스), 배열 등</u>이 Heap 영역에 저장되며, 가비지 컬렉션에 의해 메모리가 관리되어 진다.
  - ❓영역 생성 시점
    - Method 영역 : JVM이 동작해서 클래스가 로딩될 때 생성
    - Stack 영역 : 컴파일 타임 시 생성
    - Heap 영역 : 런타임시 생성
- **`클래스와 객체`**

  - 클래스는 객체를 만들기 위한 프레임, 객체를 만들 때 사용
  - 메모리에 할당되어 실제로 활용되는 실체는 `인스턴스`

- **`Wrapper Class`**

  - 기본 자료형을 객체로 표현한 것

  - Boxing / UnBoxing

- **`Synchronized`**

  - Thread-Safe한 동작 보장
  - 메서드에 쓰면 해당 객체에 Lock이 걸린다
  - synchronized(object) {}로 객체에 락을 걸고 synchronized 블록을 사용할 수도 있다

- **`String`**

  - 불변 객체
    - Thread-safe
    - 캐싱 -> 메모리 사용 최적화
    - GC 효율화
    - ❓내 생각
      - 비슷하게 자주 쓰이는 다른 원시타입들(정수, 실수, Boolean)에 비해 크기가 매우 크다
      - **다른 원시타입과 다르게 매번 만들기엔 부담이 있으므로 불변객체 -> String Pool에서 관리하는 걸로 생각한다**

- **`new String()과 리터럴("")의 차이`**

  - new String()은 new 키워드로 <u>새로운 객체를 생성하기 때문에 Heap 메모리 영역</u>에 저장되고,
  - ""는 <u>Heap 안에 있는 String Constant Pool 영역에 저장</u>됩니다. -> 동일한 문자가 있으면 그 객체를 참조

- **`String, StringBuffer, StringBuilder의 차이`**

  - **String은 불변의 속성**을 가지며, StringBuffer와 StringBuilder는 가변의 속성을 가집니다.
  - **StringBuffer**는 **동기화를 지원하**여 <u>멀티 쓰레드 환경</u>에서 주로 사용하며,
  - **StringBuilder**는 **동기화를 지원하지 않아** 싱글 쓰레드 환경에서 주로 사용합니다. 대신 성능이 좋다.
- **`접근 제한자`**

  - public - 접근 제한이 없다. (같은 프로젝트 내 어디서든 사용 가능)
  - protected - 해당 패키지 내, 다른 패키지라면 자손 클래스에서만 접근 가능하다.
  - (default) - 해당 패키지 내에서만 접근 가능
  - private - 해당 클래스에서만 접근 가능
- **`static`**

  - 변수나 메서드에 적용
  - 클래스가 메모리에 올라갈 때 자동 생성 -> 바로 사용 가능 (인스턴스 생성 불필요)
    - main 메서드가 static인 이유
  - 모든 객체가 메모리를 공유
- **`Inner Class`**

  - 외부 클래스의 변수, 메서드에 접근 가능
  - private에도 접근 가능 -> 특수한 상황에서 사용하는 기능 구현에 좋다
- **`리플렉션(Reflection)`**

  - Class 클래스를 통하여 JVM에 올라와 있는 Class 정보에 접근하는 것
  - 프레임워크(스프링의 DI), IDE(인텔리제이의 자동완성) 등 어떤 코드와 클래스가 들어올지 모르느는 프로그램에서 동적으로 클래스를 다룰 때 사용

- **`Error, Exception`**

  - Error는 실행 중 일어나는 치명적인 오류. UncheckedException에 해당
  - Exception은 경미한 오류, try-catch로 관리
- **`CheckedException, UncheckedException`**

  - Checked Exception : 예측 가능한 오류 -> 예외처리
    - RuntimeException이 아닌 예외
    - IOException, ClassNotFoundException
  - UncheckedException : 실행 후에 알 수 있는 예외
    - RuntimeException
    - NullPointException, ArrayIndexOutOfBoundException

- **`Optional`**

  - NullPointException을 관리하기 위한 클래스
- **`Collection`**
  - List, Set, Map, Stack, Queue 존재
  - ❓특징
    - List : 순서가 있는 데이터의 집합이며, 데이터의 중복 허용
      - ArrayList, LinkedList, Stack, Queue
    - Set : 순서가 없는 데이터의 집합이며, 데이터의 중복 불가
      - HashSet, LinkedHashSet(순서 보장), TreeSet
    - Map : 키와 값이 한 쌍으로 이뤄져 있고, 키를 기준으로 중복을 허용하지 않으며, 순서가 없음
      - HashMap, LinkedHashMap(순서 보장), TreeMap, HashTable, Properties
    - Stack : 직접 new 키워드로 사용할 수 있음
    - Queue : LinkedList에 new 키워드를 적용해 사용할 수 있음
  - ❓중복 검사
    - Wrapper Class는 그냥 비교
    - 다른 Object의 경우 해시코드 값을 확인하여 판단
  - ❓Array, List
    - Array는 추가 삽입시 데이터를 밀어냄, List는 연결만 함 => 삽입/삭제에서 List WIN
    - Array는 랜덤접근 가능, List는 랜덤 접근 불가 => 조회에서 Array WIN
- **`제네릭(Generic)`**

  - 제네릭이란, 데이터 타입(data type, 자료형)을 일반화(generalize)하는 것
  - 데이터 타입을 하나로 정하지 않고 범용적으로 지정 (와일드카드 ? 사용)
  - Collection에서 특정 타입을 지정하므로서 타입 보장의 장점 존재
- **`final / finally / finalize 의 차이`**

  - **final**은 클래스, 메소드, 변수, 인자를 선언할 때 사용할 수 있으며, 한 번만 할당하고 싶을 때 사용합니다.
    - final 변수는 한 번 초기화되면 그 이후에 변경할 수 없습니다.
    - final 메소드는 다른 클래스가 이 클래스를 상속할 때 메소드 오버라이딩을 금지합니다.
    - final 클래스는 다른 클래스에서 이 클래스를 상속할 수 없습니다.
  - **finally**는 try-catch와 함께 사용되며, try-catch가 종료될 때 finally block이 항상 수행되기 때문에 마무리 해줘야 하는 작업이 존재하는 경우에 해당하는 코드를 작성해주는 코드 블록입니다.
  - **finalize**는 Object 클래스에 정의되어 있는 메소드이며, GC에 의해 호출되는 메소드로 절대 호출해서는 안되는 메소드입니다. GC가 발생하는 시점이 불분명하기 때문에 해당 메소드가 실행된다는 보장이 없고, finalize() 메소드가 오버라이딩 되어 있으면 GC가 이루어질 때 바로 Garbage Collectiong 되지 않습니다. GC가 지연되면서 OOME(Out of Memory Exception)이 발생할 수 있기 때문에 finalize() 메소드를 오버라이딩하여 구현하는 것을 권장하지 않고 있습니다.
- **`직렬화(Serialize)`**

  - 객체나 데이터를 Byte로 변환 -> <u>시스템 내부의 정보를 외부에서도 사용할 수 있게 변환</u>
  - **Heap이나 Stack 메모리의 객체를 Byte로 변환하는 것**
    - Serializable 인터페이스를 확장받은 클래스만 가능 (직렬화를 하겠다는 명시와 같음)

- **`원자성`**
  - 어떤 행동과 일련의 행동을 나눌 수 없는 것
  - AtomicInteger : 원자적인 연산 제공
    - Integer : 원자성을 보장하지 않는 자료형
  - 원자적 연산
    - 한 연산이 한 번에 실행되며 중간에 다른 스레드에 간섭받지 않음
    - 원자적 연산은 한번에 한 스레드만 수행

