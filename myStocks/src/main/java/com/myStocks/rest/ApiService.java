package com.myStocks.rest;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myStocks.apiConnector.ApiConnector;

import lombok.SneakyThrows;

@Service
public class ApiService {
	
	private final ObjectMapper mapper = new ObjectMapper();
	private ApiConnector connector = new ApiConnector();

	@SneakyThrows
	public String getStockValues(final String tickerSymbol)  {
		return mapper.writeValueAsString(connector.getStockData(tickerSymbol));
	}
	
}
