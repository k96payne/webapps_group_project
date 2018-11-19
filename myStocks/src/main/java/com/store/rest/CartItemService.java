package com.store.rest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.store.dao.CartDao;
import com.store.dao.CartItemDao;
import com.store.dao.ItemDao;
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

	@SneakyThrows
	public String getItemsPurchasedByUser(final String username) {
		List<String> itemNames = new ArrayList<>();
		Collection<CartItem> cartItems = cartItemDao.getCartItemsPurchasedByUser(username);
		for(CartItem item : cartItems) {
			itemNames.add(item.getItemName());
		}
		return mapper.writeValueAsString(itemNames);
	}

}
