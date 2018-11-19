package com.myStocks.model.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.myStocks.model.FavoriteStock;
import com.myStocks.model.User;

public class FavoriteStockMapper implements RowMapper<FavoriteStock> {

	@Override
	public FavoriteStock mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new FavoriteStock(rs.getString("username"), rs.getString("tickerSymbol"));
	}
	
}