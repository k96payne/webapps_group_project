package com.store.model.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.store.model.Item;
import com.store.model.User;

public class ItemMapper implements RowMapper<Item> {

	@Override
	public Item mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new Item(rs.getInt("itemId"), rs.getString("name"),rs.getDouble("msrp")
				,rs.getDouble("salePrice"), rs.getString("upc"), rs.getString("shortDescription")
				,rs.getString("brandName"), rs.getString("size"), rs.getString("color")
				,rs.getString("gender"));
	}
	
}
