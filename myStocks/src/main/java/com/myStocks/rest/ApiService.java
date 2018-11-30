package com.myStocks.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.myStocks.apiConnector.ApiConnector;

import lombok.SneakyThrows;

@Service
public class ApiService {
	
	private final ObjectMapper mapper = new ObjectMapper();
	private ApiConnector connector = new ApiConnector();

	@SneakyThrows
	public String getStockValues(final List<String> tickerSymbols, final int datasetSize)  {
		List<List<String>> stockValues = new ArrayList<>();
		
		for(String tickerSymbol : tickerSymbols) {
			List<String> stockData = new ArrayList<>();
			stockData.add(tickerSymbol);
			stockData.addAll(Lists.reverse(connector.getStockData(tickerSymbol, datasetSize)));
			stockValues.add(stockData);
		}
		
		return mapper.writeValueAsString(stockValues);
	}
	
}
