package com.myStocks.queryMaker;

import com.myStocks.model.User;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserQueryMaker {
	
	public String makeGetUserByIdQuery(final int id) {
		return new StringBuilder("SELECT * FROM customers WHERE id = ").append(id)
				.append(";").toString();
	}
	
	public String makeGetUserByUsernameQuery(final String username) {
		return new StringBuilder("SELECT * FROM customers WHERE username = \"").append(username)
				.append("\";").toString();
	}
	
	public String makeCreateUserQuery(final User user) {
		return new StringBuilder("INSERT INTO customers (fname, lname, username,email) VALUES (\"")
				.append(user.getFname()).append("\",\"").append(user.getLname())
				.append("\",\"").append(user.getUsername()).append("\",\"").append(user.getEmail())
				.append("\");").toString();
	}
	
	public String makeUpdateUserQuery(final User user) {
		return new StringBuilder("UPDATE customers SET fname = \"").append(user.getFname())
				.append("\", lname = \"").append(user.getLname()).append("\", email = \"")
				.append(user.getEmail()).append("\" WHERE username = \"").append(user.getUsername())
				.append("\";").toString();
	}
	
	public String makeDeleteUserQuery(final String username) {
		return new StringBuilder("DELETE FROM customers WHERE username = \"").append(username)
				.append("\";").toString();
	}
	
}
