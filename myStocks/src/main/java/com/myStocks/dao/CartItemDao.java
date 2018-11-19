package com.myStocks.dao;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.myStocks.model.CartItem;
import com.myStocks.model.Item;
import com.myStocks.model.User;
import com.myStocks.model.mapper.CartItemMapper;
import com.myStocks.queryMaker.CartItemQueryMaker;

public class CartItemDao {
	
	private static final CartItemQueryMaker QUERY_MAKER = new CartItemQueryMaker();
	
	private static final String DRIVER_CLASS_NAME = "com.mysql.jdbc.Driver";
	private static final String DB_USERNAME = "springuser";
	private static final String DB_PASSWORD = "ThePassword";
	private static final String URL = "jdbc:mysql://localhost:3306/db_store";
	
	private JdbcTemplate template;
	
	private CartItemDao() { 
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
	
	public static CartItemDao newCartItemDao() {
		return new CartItemDao();
	}
	
	public void addCartItem(final int productId, final String username) {
		CartDao cartDao = CartDao.newCartDao();
		if(!cartDao.userHasCart(username)) {
			cartDao.createCart(username);
		}
		template.execute(QUERY_MAKER.makeAddCartItemQuery(cartDao.getUserCartID(username),
				productId, username, ItemDao.newItemDao().getItemById(productId).getShortDescription()));
	}
	
	public Collection<CartItem> getCartItemsByUsername(final String username) {
		Collection<CartItem> cartItems = new ArrayList<>();
		for(CartItem item : template.query(QUERY_MAKER.makeGetCartItemsByUsernameQuery(username), new CartItemMapper())) {
			if(!cartItemPurchased(item)) {
				cartItems.add(item);
			}
		}
		return cartItems;
	}
	
	private boolean cartItemPurchased(final CartItem item) {
		return item.getCartId() == -1;
	}

	public void removeCartItem(final int cartId, final int productId) {
		template.execute(QUERY_MAKER.makeDeleteCartItemItemQuery(cartId, productId));
	}
	
	public void markCartItemPurchased(final int productId, final int cartId) {
		template.execute(QUERY_MAKER.makeMarkCartItemPurchasedQuery(productId, cartId));
	}
	
	public Collection<User> getUsersWhoPurchasedProduct(final int productId) {
		Collection<CartItem> cartItems = template.query(QUERY_MAKER.makeGetUsersPurchasedProductQuery(productId), 
				new CartItemMapper());
		UserDao userDao = UserDao.newUserDao();
		Collection<User> users = new ArrayList<>();
		for(CartItem item : cartItems) {
			users.add(userDao.getUserByUsername(item.getUsername()));
		}
		return users;
	}
	
	public Collection<CartItem> getCartItemsPurchasedByUser(final String username) {
		return template.query(QUERY_MAKER.makeGetCartItemsPurchasedByUserQUery(username), 
				new CartItemMapper());
	}
}
