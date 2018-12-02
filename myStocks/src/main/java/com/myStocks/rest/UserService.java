package com.myStocks.rest;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myStocks.dao.UserDao;
import com.myStocks.model.User;

import lombok.SneakyThrows;

@Service
public class UserService {
	
	private final ObjectMapper mapper = new ObjectMapper();
	
	private UserDao userDao = UserDao.newUserDao();
	
	@SneakyThrows
	public String getUserByUsername(final String username) {
		return mapper.writeValueAsString(userDao.getUserByUsername(username));
	}
	
	@SneakyThrows
	public void updateUser(final String jsonBody) {
		userDao.updateUser(mapper.readValue(jsonBody, User.class));
	}
	
	public void deleteUser(final String username) {
		userDao.deleteUser(username);
	}
	
	@SneakyThrows
	public void createUser(final String jsonBody) {
		userDao.createUser(mapper.readValue(jsonBody, User.class));
	}
	
	public String validateUser(final String username, final String password) {
		StringBuilder builder = new StringBuilder("{\"valid\": ");
		User user = userDao.getUserByUsername(username);
		if(user.getPassword().equals(password)) {
			builder.append("\"true\", ");
		} else {
			builder.append("\"false\", ");
		}
		builder.append("\"userExists\": ");
		if(user.getUsername().equals(username)) {
			builder.append("\"true\", ");
		} else {
			builder.append("\"false\", ");
		}
		builder.append("\"isAdmin\": ");
		if(user.getIsAdmin() == 1) {
			builder.append("\"true\"}");
		} else {
			builder.append("\"false\"}");
		}
		
		return builder.toString();
	}
	
}
