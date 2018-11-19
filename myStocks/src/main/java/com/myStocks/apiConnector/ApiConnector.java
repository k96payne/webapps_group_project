package com.myStocks.apiConnector;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import com.google.common.collect.Lists;

import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

@NoArgsConstructor
public class ApiConnector {

	private static final String	API_KEY = "3K9AH47QPYKMQPV4";
	private static final int 	DATA_COUNT = 150;
	
	@SneakyThrows
	public List<String> getStockData(final String tickerSymbol) {
		HttpResponse response = executeApiRequest(tickerSymbol);
		JSONObject jsonResponse = new JSONObject(EntityUtils.toString(response.getEntity()));
		JSONObject data = (JSONObject) jsonResponse.get("Time Series (Daily)");
		String currentDate = getCurrentDate();
		
		List<String> values = new ArrayList<>();
		while(values.size() != DATA_COUNT) {
			String value =getCloseValue(data, currentDate);
			if(!value.equals("NA")) {
				values.add(value);
			}
			currentDate = subtractOneDay(currentDate);
		}
		
		return Lists.reverse(values);
	}
	
	@SneakyThrows
	private HttpResponse executeApiRequest(final String tickerSymbol) {
		HttpClient client = HttpClientBuilder.create().build();
		HttpGet request = new HttpGet("https://www.alphavantage.co/query?function="
				+ "TIME_SERIES_DAILY&symbol=" + tickerSymbol + "&outputsize=full&apikey=" 
				+ API_KEY);
		return client.execute(request);
	}
	
	private String getCurrentDate() {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		return dateFormat.format(date);
	}
	
	private String getCloseValue(JSONObject data, String date) {
		try {
			JSONObject dateData = (JSONObject) data.get(date);
			String value = dateData.get("4. close").toString();
			return value;
		} catch (Exception e) {
			return "NA";
		}
	}
	
	private String subtractOneDay(String date) {
	    return LocalDate
	      .parse(date)
	      .plusDays(-1)
	      .toString();
	}
	
}
