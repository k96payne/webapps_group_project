package com.myStocks.apiConnector;

public class Test {

	public static void main(String[] args) {
		ApiConnector connector = new ApiConnector();
		System.out.println(connector.getStockData("asdfa").toString());

	}

}
