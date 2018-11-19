package com.store.dao;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.store.model.Cart;
import com.store.model.CartItem;
import com.store.model.Item;
import com.store.model.mapper.CartMapper;
import com.store.queryMaker.CartQueryMaker;

public class CartDao {
	
	private static final CartQueryMaker QUERY_MAKER = new CartQueryMaker();

	private static final String DRIVER_CLASS_NAME = "com.mysql.jdbc.Driver";
	private static final String DB_USERNAME = "springuser";
	private static final String DB_PASSWORD = "ThePassword";
	private static final String URL = "jdbc:mysql://localhost:3306/db_store";
	
	private JdbcTemplate template;
	
	private CartDao() { 
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
	
	public static CartDao newCartDao() {
		return new CartDao();
	}
	
	public boolean userHasCart(final String username) {
		return !template.query(QUERY_MAKER.makeGetCartByUsernameQuery(username),
				new CartMapper()).isEmpty();
	}
	
	public void createCart(final String username) {
		template.execute(QUERY_MAKER.makeCreateCartQuery(username));
	}
	
	public int getUserCartID(final String username) {
		if(userHasCart(username)) {
			return template.query(QUERY_MAKER.makeGetCartByUsernameQuery(username),
					new CartMapper()).get(0).getCartId();
		} else {
			return -1;
		}
	}
	
	public Cart getCartByUsername(final String username) {
		if(!userHasCart(username)) {
			createCart(username);
		}
		Cart cart = template.query(QUERY_MAKER.makeGetCartByUsernameQuery(username),
				new CartMapper()).get(0);
		Collection<Item> items = new ArrayList<>();
		ItemDao itemDao = ItemDao.newItemDao();
		for(CartItem cartItem : CartItemDao.newCartItemDao().getCartItemsByUsername(username)) {
			items.add(itemDao.getItemById(cartItem.getProductId()));
		}
		cart.setItems(items);
		return cart;
	}
	
	public void purchaseCart(final int cartId) {
		CartItemDao cartItemDao = CartItemDao.newCartItemDao();
		ItemDao itemDao = ItemDao.newItemDao();
		for(Item item : getCartByUsername(getCartUsername(cartId)).getItems()) {
			int itemId = item.getItemId();
			cartItemDao.markCartItemPurchased(itemId, cartId);
			itemDao.removeItem(itemId);
		}
		template.execute(QUERY_MAKER.makeDeleteCartQuery(cartId));
	}
	
	private String getCartUsername(final int cartId) {
		return template.query(QUERY_MAKER.makeGetCartById(cartId),
				new CartMapper()).get(0).getUsername();
	}
}
