package com.myStocks.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StockDataPoint {
	
	private String additionDate;
	private String tickerSymbol;
	private int day;
	private String closingValue;
	
}
