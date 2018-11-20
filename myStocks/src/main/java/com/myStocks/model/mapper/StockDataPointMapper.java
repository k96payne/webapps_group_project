package com.myStocks.model.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.myStocks.model.FavoriteStock;
import com.myStocks.model.StockDataPoint;
import com.myStocks.model.User;

public class StockDataPointMapper implements RowMapper<StockDataPoint> {

	@Override
	public StockDataPoint mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new StockDataPoint(rs.getString("additionDate"), rs.getString("tickerSymbol"),
				rs.getInt("day"), rs.getString("closingValue"));
	}
	
}