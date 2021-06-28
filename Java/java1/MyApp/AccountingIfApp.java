
public class AccountingIfApp {

	public static void main(String[] args) {
		
		double valueOfSupply = Double.parseDouble(args[0]);
		double vatRate = 0.1;
		double expenseRate = 0.3;
		double vat = valueOfSupply*vatRate;
		double total = valueOfSupply + vat;
		double expense = valueOfSupply*expenseRate;
		double income = valueOfSupply - expense;
		
		double dividened1;
		double dividened2;
		double dividened3;
		
		if (income > 10000.0) {
			dividened1 = income * 0.5;
			dividened2 = income * 0.3;
			dividened3 = income * 0.2;
		} else {
			dividened1 = income * 1;
			dividened2 = income * 0;
			dividened3 = income * 0;
		}
		
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
