package com.store.dao;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.store.model.User;
import com.store.model.mapper.UserMapper;
import com.store.queryMaker.UserQueryMaker;

public class UserDao {
	
	private static final UserQueryMaker QUERY_MAKER = new UserQueryMaker();
	
	private static final String DRIVER_CLASS_NAME = "com.mysql.jdbc.Driver";
	private static final String DB_USERNAME = "root";
	private static final String DB_PASSWORD = "password";
	private static final String URL = "jdbc:mysql://localhost:3306/store?useSSL="
			+ "false&allowPublicKeyRetrieval=true";
	
	private JdbcTemplate template;
	
	private UserDao() { 
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
	
	public static UserDao newUserDao() {
		return new UserDao();
	}
	
	public User getUserById(final int id) {
		return template.query(QUERY_MAKER.makeGetUserByIdQuery(id), new UserMapper()).get(0);
	}
	
	public User getUserByUsername(final String username) {
		List<User> user = template.query(QUERY_MAKER.makeGetUserByUsernameQuery(username), new UserMapper());
		if(user.isEmpty()) {
			return new User();
		} else {
			return user.get(0);
		}
	}
	
	public void createUser(final User user) {
		template.execute(QUERY_MAKER.makeCreateUserQuery(user));
	}
	
	public void updateUser(final User user) {
		template.execute(QUERY_MAKER.makeUpdateUserQuery(user));
	}
	
	public void deleteUser(final String username) {
		template.execute(QUERY_MAKER.makeDeleteUserQuery(username));
	}

}
