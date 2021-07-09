# Java 공부

다음의 강의 / 교재를 활용

1. 생활코딩 java1 강의 : https://www.youtube.com/playlist?list=PLuHgQVnccGMAIluRRVsC1e79ri-dwnBmR
2. 처음해보는 자바 프로그래밍
3. 개인 공부



> 공식 문서 : https://docs.oracle.com/javase/7/docs/api/



## 세미콜론

자바에서는 반드시 문장 끝에 세미콜론(`;`)을 붙여야 에러가 발생하지 않는다.



## 변수

Java에서 변수를 선언할 때, **어떤 데이터 타입이 들어가는지 지정**을 해 줘야 함 => 잘못된 정보가 들어가면 컴파일을 하지 않음

=> 선언할 때 불편하지만 이후 사용할 때 데이터 타입을 검사할 필요가 없다는 장점이 있다.

```java
public class Variable {

	public static void main(String[] args) {
		// 변수 생성 시 어떤 데이터 타입이 들어가는지 지정을 해 줘야 함
		int a = 1;
		System.out.println(a);

		double b = 1.1;
		System.out.println(b);
		
		String c = "Hello Java";
		System.out.println(c);
	}

}
```



## CASTING

데이터타입을 다른 데이터 타입으로 변환하는 것

```java
double a = 1.1;
double b = 1;
double b2 = (double) 1;
System.out.println(b);

// int c == 1.1;
double d = 1.1;
int e = (int) 1.1;
System.out.println(e);

// 1 to String
String f = Integer.toString(1);
System.out.println(f.getClass());
```



```
1.0
1
class java.lang.String
```

`b`: 1 => double => 1.0

`e`: 1.1 => int => 1 **\*이 때 number 앞에 괄호가 없으면 에러 발생\***

`f` 1 => Integer to String => "1"



`c`: 1.1에서 1로 변환하는 것은 손실이 일어나기 때문에 자동으로 변환 X



## Import Class

접근 : `.`을 통해서 하위 디렉토리로 내려가면서 접근

> 예시

```java
import org.opentutorials.iot.Elevator; // Elevator class 호출
```

이후 호출은 import한 요소 (import 주소의 마지막)만 적어서 접근 가능

> 예시

```java
Elevator myElevator = new Elevator("JAVA APT 507"); // Elevator class의 객체 생성
```



## Eclipse

- `ctrl + space`를 누르면 자동완성

```java
public static void main(String[] args)
```

- 위에서 `String[]`의 의미는 <u>문자열로만 이루어진 배열</u>
- 즉 위의 의미는 args가 문자열을 요소로 갖는 배열이라는 뜻



## Input (arguments)

```java
import javax.swing.JOptionPane;
...
    
public class OKJavaGoHome {

	public static void main(String[] args) {
		// 팝업 창 입력
		String id = JOptionPane.showInputDialog("Enter a ID");
		String bright = JOptionPane.showInputDialog("Enter a Bright level");
		
		// 표준 입력
		String id = args[0];
		String bright = args[1];
        
        ...
	}
}
```

- 표준 입력은 Run Configurations의 argument에서 등록



## 생성자 (Constructor)

- new 연산자와 함께 사용
- 클래스로부터 객체를 생성할 때 호출

- **new 연산자 : Heap 영역에 객체를 생성시키고 객체의 주소가 리턴 됨** / **생성자는 리턴 값이 없음**
- 이 때! <u>생성자의 이름은 클래스의 이름과 같아야 함</u>

```java
ClassName instance1 = new ClassName();
```



## 배열

선언 : **`자료형 [] 변수명 = new 자료형[크기];`** -> 배열은 객체이기 때문에 new가 필요

저장 : `변수명[인덱스] = 값<u>`</u>

### Copy

- <u>한 번 설정된 배열은 사이즈 조절 불가</u>
  - 배열의 크기를 변경하기 위해서는 <u>새로운 배열을 만들어 복사해야 한다</u>
  - 이를 위해 System 클래스의 `arraycopy()` 메서드 제공

`System.arraycopy(소스 배열, 시작 위치, 목적 배열, 길이);`

[과정]

1. 소스 배열 생성
2. 목적 배열 생성
3. 복사

### 다차원 배열

`자료형 \[]\[] 변수명 = new 자료형\[크기]\[크기];`



## 반복문 / 조건문

> 자바스크립트와 동일



## 메소드

> 메소드는 서로 **연관된 코드를 grouping**해서 이름을 붙인 상자

- 메소드 사용 이전

```java
public class AccountingApp {

	public static void main(String[] args) {
		
		double valueOfSupply = Double.parseDouble(args[0]);
		double vatRate = 0.1;
		double expenseRate = 0.3;
		double vat = valueOfSupply*vatRate;
		double total = valueOfSupply + vat;
		double expense = valueOfSupply*expenseRate;
		double income = valueOfSupply - expense;
		
		double dividened1 = income * 0.5;
		double dividened2 = income * 0.3;
		double dividened3 = income * 0.2;
		
		System.out.println("Value of supply : "+valueOfSupply);
		System.out.println("VAT : "+ vat );
		System.out.println("Total : "+ total );
		System.out.println("Expense : "+ expense );
		System.out.println("Income : "+ income );
		System.out.println("Dividend : "+ dividened1 );
		System.out.println("Dividend : "+ dividened2 );
		System.out.println("Dividend : "+ dividened3 );

	}

}
```

- 메소드 사용 이후

```java
public class AccountingMethodApp {
	public static double valueOfSupply;
	public static double vatRate;
	public static double expenseRate;
	
	public static void main(String[] args) {
		valueOfSupply = Double.parseDouble(args[0]);
		vatRate = 0.1;
		expenseRate = 0.3;
		print();
	}

	public static void print() {
		System.out.println("Value of supply : "+valueOfSupply);
		System.out.println("VAT : "+ getVAT() );
		System.out.println("Total : "+ getTotal() );
		System.out.println("Expense : "+ getExpense() );
		System.out.println("Income : "+ getIncome() );
		System.out.println("Dividend : "+ getDividened1() );
		System.out.println("Dividend : "+ getDividened2() );
		System.out.println("Dividend : "+ getDividened3() );
	}

	public static double getDividened1() {
		return getIncome() * 0.5;
	}

	public static double getDividened2() {
		return getIncome() * 0.3;
	}

	public static double getDividened3() {
		return getIncome() * 0.2;
	}

	public static double getIncome() {
		return valueOfSupply - getExpense();
	}

	public static double getExpense() {
		return valueOfSupply*expenseRate;
	}

	public static double getTotal() {
		return valueOfSupply + getVAT();
	}

	public static double getVAT() {
		return valueOfSupply*vatRate;
	}
}
```



## 클래스

> 클래스는 서로 **연관된 변수와 메소드를 grouping**하고 이름을 붙인 상자

- 클래스 사용 이후

```java
class Accounting {
	public static double valueOfSupply;
	public static double vatRate;
	public static double expenseRate;	

	public static void print() {
		System.out.println("Value of supply : "+valueOfSupply);
		System.out.println("VAT : "+ getVAT() );
		System.out.println("Total : "+ getTotal() );
		System.out.println("Expense : "+ getExpense() );
		System.out.println("Income : "+ getIncome() );
		System.out.println("Dividend : "+ getDividened1() );
		System.out.println("Dividend : "+ getDividened2() );
		System.out.println("Dividend : "+ getDividened3() );
	}

	public static double getDividened1() {
		return getIncome() * 0.5;
	}

	public static double getDividened2() {
		return getIncome() * 0.3;
	}

	public static double getDividened3() {
		return getIncome() * 0.2;
	}

	public static double getIncome() {
		return valueOfSupply - getExpense();
	}

	public static double getExpense() {
		return valueOfSupply*expenseRate;
	}

	public static double getTotal() {
		return valueOfSupply + getVAT();
	}

	public static double getVAT() {
		return valueOfSupply*vatRate;
	}
}


public class AccountingClassApp {
	
	public static void main(String[] args) {
		Accounting.valueOfSupply = Double.parseDouble(args[0]);
		Accounting.vatRate = 0.1;
		Accounting.expenseRate = 0.3;
		Accounting.print();
	}
    
}
```

### Modifiers

- 접근이나 사용에 대한 제한을 정의



접근 허용 정도

private < default < protected < public

- `private` : 해당 **클래스**만 접근
- `default` : 해당 **패키지**만 접근
- `protected` : 해당 **패키지** + 해당 클래스를 **상속받은 패키지** 접근
- `public` : **모두** 접근



- `static` : static 변수는 new 없이 사용 가능 / static method는 static 변수만 사용 가능
- `final` : 해당 클래스는 더이상 상속 불가
- `abstract` : 구현되지 않은 클래스에 사용 => 상속을 통해 super type의 reference로 사용



## 인터페이스

> https://limkydev.tistory.com/197

자식들에게 틀을 제공

- 상속 시 sub class는 모든 method를 구현해야 함
- 상수 & abstract method로만 구성
- **interface는 다중 상속이 가능**



## 인스턴스

```java
class Accounting {
	public double valueOfSupply;
	public double vatRate;
	public double expenseRate;	

	public void print() {
		System.out.println("Value of supply : "+valueOfSupply);
		System.out.println("VAT : "+ getVAT() );
		System.out.println("Total : "+ getTotal() );
		System.out.println("Expense : "+ getExpense() );
		System.out.println("Income : "+ getIncome() );
		System.out.println("Dividend : "+ getDividened1() );
		System.out.println("Dividend : "+ getDividened2() );
		System.out.println("Dividend : "+ getDividened3() );
	}

	public double getDividened1() {
		return getIncome() * 0.5;
	}

	public double getDividened2() {
		return getIncome() * 0.3;
	}

	public double getDividened3() {
		return getIncome() * 0.2;
	}

	public double getIncome() {
		return valueOfSupply - getExpense();
	}

	public double getExpense() {
		return valueOfSupply*expenseRate;
	}

	public double getTotal() {
		return valueOfSupply + getVAT();
	}

	public double getVAT() {
		return valueOfSupply*vatRate;
	}
}


public class AccountingClassApp {
	
	public static void main(String[] args) {
//		Accounting.valueOfSupply = Double.parseDouble(args[0]);
//		Accounting.vatRate = 0.1;
//		Accounting.expenseRate = 0.3;
//		Accounting.print();
		
		// 인스턴스 생성
		Accounting a1 = new Accounting();
		a1.valueOfSupply = 10000.0;
		a1.vatRate = 0.1;
		a1.expenseRate = 0.3;
		a1.print();
		
		Accounting a2 = new Accounting();
		a2.valueOfSupply = 20000.0;
		a2.vatRate = 0.1;
		a2.expenseRate = 0.3;
		a2.print();
	}
	
}
```

- `new`를 통해 인스턴스를 생성해서 사용 가능
- 이 때, **인스턴스가 사용하는 메서드와 변수를 사용하려면 `static`을 제거해야 한다**



## JVM 메모리 구조

> https://jeong-pro.tistory.com/148

![img](https://t1.daumcdn.net/cfile/tistory/9973563D5ACE031521)

1. Class Loader : 하드 디스크에 있는 번역된 class 파일을 메모리로 읽어옴
2. Method Area(Class Area) : 메모리로 읽어온 클래스, 메소드, static 변수 정보 등을 저장
3. Heap Area : 객체 생성, 기억
4. Satck Area : 메서드 수행 시 중간 결과 값 등을 임시로 저장 (메서드 종료시 할당 메모리 자동 제거)

5. Garbage Collector : Heap 영역의 객체들의 메모리 관리를 담당 (사용 하지 않는 객체의 할당 메모리 제거)

6. Execution Engine : 메모리에 적재된 클래스(바이트 코드)를 기계어로 변경 => 명령어 단위로 실행



## Setters & Getters

- 기본적으로 외부에서 직접 객체에 값을 설정, 출력은 OOP에 맞지 않은 행동
  - `Class obj = new object('A')` 라던지, `object.name` 이렇게 접근하는 건 옳지 않음
- Setters와 Getters 사용
  - `obj.setName('A')`
  - `obj.getName()`



## Inheritance & Polymorphism

> 상속과 다형성

### 상속

- `Generalization` : 공통적인 특성을 모아 super class 정의
- `Specialization` : 비슷한 속성&기능을 모아 새로운 class 정의



**Java에서 class 상속은 하나만 받을 수 있음** => **interface를 이용하면 다중 상속 효과를 가져올 수 있음**



#### super

하위 class에서 상위 class의 attribute, method를 가져오려면 `super`를 사용해야 한다



#### Overloading

동일한 method에서 parameter 값을 다르게 받아 서로 다른 결과물을 내는 것

```java
package study;

public class overriding {
	
	public static void main(String[] args) {
		A x = new B();
//		x.a(); // 오버라이딩 X
		x.a(11); // 본인 메소드 호출
		x.b(); // 오버로딩 됨
		

		// 상위 클래스를 하위 클래스의 객체로 선언 X
//		B y = new A();
//		y.a();
//		y.a(11);
	}
}

// 부모 클래스
class A {
	public void a(int i) {
		System.out.println(i);
	}
	
	public void b() {
		System.out.println("Aeeee");
	}
}

// 자식 클래스
class B extends A {
	public B() {
		// TODO Auto-generated constructor stub
	}

    // 오버로딩
	public void a() {
		System.out.println("oh");
	}
	
    // 오버라이딩
    @Override
	public void b() {
		System.out.println("Beeee");
	}
}
```

- `@Override`를 안 적으면 상위 클래스에서 해당 메서드가 사라지더라도 자식 클래스가 메서드를 그대로 가지고 있는 문제 발생
  - Annotation이 있으면 에러 발생



## 다형성

- `object polymorphism` : 같은 타입의 변수가 다양한 형태의 객체를 참조 / super type의 변수가 아양한 sub type을 참조하는 것
- `method polymorphism` : 같은 타입의 method를 호출할 때 그 기능이 다양한 것
  - Overloading method call
  - Overriding method call



## Collection API

- 객체의 `저장`, `검색`, `삭제` 기능을 제공하는 패키지

- `java.util.package`에 정의
- `Collection` : 모든 클래스들의 Object를 요소로 저장하는 객체의 최상위 <u>interface</u>

![Java - Collection과 Map의 종류(List, Set, Map)](https://blog.kakaocdn.net/dn/mjVFA/btqZBcPCt5e/iwtcUaOcIBEQiCRXIvqEjK/img.jpg)



### Set

> 파이썬에서 Set

- HashSet : Set
- TreeSet : Sorted Set

```java
Collection<String> list = new HashSet<String>();
list.add("Seoul");
list.add("Gyeongju");
list.add("Busan");
list.add("Gwangyang");
list.add("Gyeongju");

// for-each 문
for (String s: list){
    System.out.println(s);
}
```

<String>을 안 붙이면 모든 객체가 Object type이 되기 때문에 불필요하게 형 변환을 매번 해야 하는 문제 => 처음부터 데이터 타입을 명시



### List

> 파이썬에서 List

```java
Collection<String> list = new ArrayList<String>();
list.add("Seoul");
list.add("Gyeongju");
list.add("Busan");
list.add("Gwangyang");
list.add("Gyeongju");

// for-each 문
for (String s: list){
    System.out.println(s);
}
```



### Map

> 파이썬에서 Dictionary, 검색을 쉽게 하기 위한 클래스

```java
Map<String, String> list = new HashMap<String, String>;
list.put("City", "Seoul");
list.put("Nation", "Korea");
list.put("No", "0924");

System.out.println(list.get("City"));

Iterator<String> i = list.keySet().iterator();
while(i.hasNext()){
    String key = i.next();
    String value = list.get(key);
    
    System.out.println(key + ", " + value);
}
```



## Generic

> **클래스 내부에서 지정하는 것이 아닌 외부에서 사용자에 의해 지정되는 것**
>
> => 타입을 미리 지정해주는 것이 아닌 필요에 의해 지정할 수 있도록 하는 일반(Generic) 타입

참고 : https://st-lab.tistory.com/153

```java
package study;

public class generic {
	
	public static void main(String[] args) {
		GenericContainer<Integer> gc1 = new GenericContainer<>();
		gc1.setObj(3);
		
		GenericContainer<String> gc2 = new GenericContainer<>();
		gc2.setObj("Generic");
	}
}

class GenericContainer<T> {
	private T obj;
	
	public GenericContainer() {}
	
	public T getObj() { return obj; }
	
	public void setObj(T t) { obj = t; }
}
```

- 어떤 타입이든 사용 가능



## Iterator

- 기억할 것!!
  - `hasNext()` : 이번에 element가 있는지 T/F로 반환
  - `next()` : 이번의 element를 반환

