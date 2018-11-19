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
	
}
