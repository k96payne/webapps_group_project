package com.myStocks.queryMaker;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class StockDataQueryMaker {
	
	public String makeAddStockDataQuery(final String additionDate, final String tickerSymbol, 
			final int day, final String closingValue) {
		return new StringBuilder("INSERT INTO stockData (additionDate, tickerSymbol, day, closingValue) "
				+ "VALUES (\"").append(additionDate).append("\",\"").append(tickerSymbol).append("\",")
				.append(day).append(",\"").append(closingValue).append("\");").toString();
	}
	
	public String makeGetStockDataQuery(final String date, final String tickerSymbol) {
		return new StringBuilder("SELECT * FROM stockData WHERE additionDate = \"")
				.append(date).append("\" AND tickerSymbol = \"").append(tickerSymbol)
				.append("\";").toString();
	}
	
	public String makeDeleteTickerDataQuery(final String tickerSymbol) {
		return new StringBuilder("DELETE FROM stockData WHERE tickerSymbol = \"")
				.append(tickerSymbol).append("\";").toString();
	}

	public String makeGetStockDataQuery(final String additionDate, final String tickerSymbol, 
			final int day) {
		return new StringBuilder("SELECT * FROM stockData WHERE additionDate = \"")
				.append(additionDate).append("\" AND tickerSymbol = \"").append(tickerSymbol)
				.append("\" AND day = ").append(day).append(";").toString();
	}
	
}
