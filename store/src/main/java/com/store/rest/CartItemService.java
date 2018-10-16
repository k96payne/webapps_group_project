package com.store.rest;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.dao.CartDao;
import com.store.dao.CartItemDao;
import com.store.model.CartItem;

import lombok.SneakyThrows;

@Service
public class CartItemService {
	
	private final ObjectMapper mapper = new ObjectMapper();
	
	private CartItemDao cartItemDao = CartItemDao.newCartItemDao();
	
	@SneakyThrows
	public void addToCart(final String jsonBody) {
		CartItem cartItem = mapper.readValue(jsonBody, CartItem.class);
		cartItemDao.addCartItem(cartItem.getProductId(), cartItem.getUsername());
	}
	
	@SneakyThrows
	public void removeFromCart(final String jsonBody) {
		CartItem cartItem = mapper.readValue(jsonBody, CartItem.class);
		cartItemDao.removeCartItem(cartItem.getCartId(), cartItem.getProductId());
	}
	
	@SneakyThrows
	public String getUserCart(final String username) {
		return mapper.writeValueAsString(CartDao.newCartDao().getCartByUsername(username));
	}
	
	public void purchaseCart(final int cartId) {
		CartDao.newCartDao().purchaseCart(cartId);
	}
	
	@SneakyThrows
	public String getUsersWhoPurchasedProduct(final int productId) {
		return mapper.writeValueAsString(cartItemDao.getUsersWhoPurchasedProduct(productId));
	}

}
