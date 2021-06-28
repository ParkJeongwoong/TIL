# Java 공부

다음의 강의 / 교재를 활용

1. 생활코딩 java1 강의 : https://www.youtube.com/playlist?list=PLuHgQVnccGMAIluRRVsC1e79ri-dwnBmR
2. 처음해보는 자바 프로그래밍



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

선언 : **`자료형 [] 변수명 = new 자료형[크기];`**

저장 : `변수명[인덱스] = 값`



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

