package com.store.queryMaker;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CartQueryMaker {
	
		public String makeGetCartByUsernameQuery(final String username) {
			return new StringBuilder("SELECT * FROM carts WHERE username = \"")
					.append(username).append("\";").toString();
					
		}

		public String makeCreateCartQuery(final String username) {
			return new StringBuilder("INSERT INTO carts (username) VALUES (\"")
					.append(username).append("\");").toString();
		}

		public String makeGetCartById(int cartId) {
			return new StringBuilder("SELECT * FROM carts WHERE id = ")
					.append(cartId).append(";").toString();
		}

		public String makeDeleteCartQuery(final int cartId) {
			return new StringBuilder("DELETE FROM carts WHERE id = ")
					.append(cartId).append(";").toString();
		}
	
}
