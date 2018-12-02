package com.myStocks.queryMaker;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.myStocks.model.User;

public class UserQueryMakerTests {
	
	private UserQueryMaker queryMaker;
	
	@Before
	public void init() {
		queryMaker = new UserQueryMaker();
	}

	@Test
	public void testGetUserByIdQuery() {
		assertEquals("SELECT * FROM users WHERE id = 1;", queryMaker.makeGetUserByIdQuery(1));
	}
	
	@Test
	public void testGetUserByUsernameQuery() {
		assertEquals("SELECT * FROM users WHERE username = \"user\";", 
				queryMaker.makeGetUserByUsernameQuery("user"));
	}
	
	@Test
	public void testMakeUserQuery() {
		assertEquals("INSERT INTO users (fname, lname, username, password, email) "
				+ "VALUES (\"first\",\"last\",\"user\",\"pass\",\"email\");", 
				queryMaker.makeCreateUserQuery(new User(1, 0, "pass", "first", "last", "user", 
						"email")));
	}
	
	
}
