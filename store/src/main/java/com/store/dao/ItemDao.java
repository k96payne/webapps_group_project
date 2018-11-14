package com.store.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.store.model.Item;
import com.store.model.mapper.ItemMapper;
import com.store.queryMaker.ItemQueryMaker;
import com.store.queryMaker.UserQueryMaker;

import lombok.AllArgsConstructor;

public class ItemDao {

	private static final ItemQueryMaker QUERY_MAKER = new ItemQueryMaker();

	
	private static final String DRIVER_CLASS_NAME = "com.mysql.jdbc.Driver";
	private static final String DB_USERNAME = "springuser";
	private static final String DB_PASSWORD = "ThePassword";
	private static final String URL = "jdbc:mysql://localhost:3306/db_store";
	
	private JdbcTemplate template;
	
	private ItemDao() { 
		this.template = new JdbcTemplate(this.getDataSource());
	}
	
	private DriverManagerDataSource getDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(DRIVER_CLASS_NAME);
		dataSource.setUrl(URL);
		dataSource.setUsername(DB_USERNAME);
		dataSource.setPassword(DB_PASSWORD);
		return dataSource;
	}
	
	public static ItemDao newItemDao() {
		return new ItemDao();
	}
	
	public Collection<Item> getItems() {
		return template.query(QUERY_MAKER.makeGetItemsQuery(), new ItemMapper());
	}
	
	public Collection<Item> getItemsByKeyword(final String keyword) {
		return template.query(QUERY_MAKER.makeGetItemsByKeywordQuery(keyword), 
				new ItemMapper());
	}
	
	public Item getItemById(final int id) {
		List<Item> items = template.query(QUERY_MAKER.makeGetItemByIdQuery(id), new ItemMapper());
		if(items.isEmpty()) {
			Item item = new Item();
			item.setItemId(id);
			return item;
		} else {
			return items.get(0);
		}
	}

	public void removeItem(final int itemId) {
		template.execute(QUERY_MAKER.makeRemoveItemQuery(itemId));
	}
	
	
	
}
