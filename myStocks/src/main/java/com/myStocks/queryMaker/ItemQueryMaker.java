package com.myStocks.queryMaker;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ItemQueryMaker {
	
	public String makeGetItemsQuery() {
		return "SELECT * FROM products;";
	}
	
	public String makeGetItemsByKeywordQuery(final String keyword) {
		return new StringBuilder("SELECT * FROM products WHERE name LIKE '%")
				.append(keyword).append("%' OR shortDescription LIKE '%").append(keyword)
				.append("%' OR brandName LIKE '%").append(keyword).append("%' OR size LIKE '%")
				.append(keyword).append("%' OR color LIKE '%").append(keyword)
				.append("%' OR gender LIKE '%").append(keyword).append("%';").toString();
	}

	public String makeGetItemByIdQuery(final int id) {
		return new StringBuilder("SELECT * FROM products WHERE itemId = ")
				.append(id).append(";").toString();
	}

	public String makeRemoveItemQuery(final int itemId) {
		return new StringBuilder("DELETE FROM products WHERE itemId = ").append(itemId)
				.append(";").toString();
	}
	
}
