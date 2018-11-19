package com.myStocks.model.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.myStocks.model.CartItem;
import com.myStocks.model.User;

public class CartItemMapper implements RowMapper<CartItem> {

	@Override
	public CartItem mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new CartItem(rs.getInt("cartId"), rs.getString("username"), rs.getInt("itemId"), 
				rs.getString("itemName"));
	}
	
}