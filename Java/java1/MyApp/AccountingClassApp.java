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
