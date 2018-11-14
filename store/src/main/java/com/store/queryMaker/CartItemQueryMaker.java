package com.store.queryMaker;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CartItemQueryMaker {
	
	public String makeAddCartItemQuery(final int cartId, final int productId, 
			final String username, final String itemName) {
		return new StringBuilder("INSERT INTO cartItems (cartId, username, itemId, itemName) VALUES (")
				.append(cartId).append(",\"").append(username).append("\", ").append(productId)
				.append(", \"").append(itemName).append("\");").toString();
	}
	
	public String makeGetCartItemsByUsernameQuery(final String username) {
		return new StringBuilder("SELECT * FROM cartItems WHERE username = \"")
				.append(username).append("\";").toString();
	}
	
	public String makeDeleteCartItemItemQuery(final int cartId, final int productId) {
		return new StringBuilder("DELETE FROM cartItems WHERE cartId = ").append(cartId)
				.append(" AND itemId = ").append(productId).append(";").toString();
	}

	public String makeMarkCartItemPurchasedQuery(final int productId, final int cartId) {
		return new StringBuilder("UPDATE cartItems SET cartId = -1 WHERE itemId = ")
				.append(productId).append(" and cartId = ").append(cartId).append(";").toString();
	}

	public String makeGetUsersPurchasedProductQuery(int productId) {
		return new StringBuilder("SELECT * FROM cartItems WHERE cartId = -1 AND itemId = ")
				.append(productId).append(";").toString();
				
	}

	public String makeGetCartItemsPurchasedByUserQUery(String username) {
		return new StringBuilder("SELECT * FROM cartItems WHERE cartId = -1 AND username = \"")
				.append(username).append("\";").toString();
	}
	
}
