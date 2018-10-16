package com.store.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.dao.ItemDao;

import lombok.SneakyThrows;

public class ItemService {
	
	private final ObjectMapper mapper = new ObjectMapper();
	
	private ItemDao itemDao = ItemDao.newItemDao();
	
	@SneakyThrows
	public String getAllItems() {
		return mapper.writeValueAsString(itemDao.getItems());
	}

	@SneakyThrows
	public String getItemById(final int id) {
		return mapper.writeValueAsString(itemDao.getItemById(id));
	}
	
	@SneakyThrows
	public String getItemsByKeyword(final String keyword) {
		return mapper.writeValueAsString(itemDao.getItemsByKeyword(keyword));
	}

}
