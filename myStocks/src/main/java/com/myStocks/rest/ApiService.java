package com.myStocks.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myStocks.apiConnector.ApiConnector;

import lombok.SneakyThrows;

@Service
public class ApiService {
	
	private final ObjectMapper mapper = new ObjectMapper();
	private ApiConnector connector = new ApiConnector();

	@SneakyThrows
	public String getStockValues(final List<String> tickerSymbols, final int datasetSize)  {
		Map<String,List<String>> stockValues = new HashMap<>();
	
		int requestNumber = 1;
		
		for(String tickerSymbol : tickerSymbols) {
			stockValues.put(tickerSymbol, connector.getStockData(tickerSymbol, datasetSize));
		}
		
		return mapper.writeValueAsString(stockValues);
	}
	
}
