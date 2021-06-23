
public class StringApp {

	public static void main(String[] args) {
		System.out.println("Hello World"); // String
//		System.out.println('Hello World'); // 사용 불가능
		// java에서 작은 따옴표(')는 Character를 가리키는 표현
		System.out.println('H');
		
		// 즉
		// ""는 문자열을 의미
		// ''는 문자를 의미
		
		System.out.println("Hello "
				+ "World"); // 이건 줄 바꿈이 아님
		System.out.println("Hello \nWorld"); // \n: new line, 줄 바꿈을 의미
		System.out.println("I said \"Hello World\"");
		
		// \: escape (문자를 본래의 기능에서 해방시키는 역할)
	}

}
