package com.myStocks.dao;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.myStocks.model.User;
import com.myStocks.model.mapper.UserMapper;
import com.myStocks.queryMaker.UserQueryMaker;

public class UserDao extends ADao {
	
	private static final UserQueryMaker QUERY_MAKER = new UserQueryMaker();
	
	private JdbcTemplate template;
	
	private UserDao() { 
		this.template = new JdbcTemplate(getDataSource());
	}
	
	public static UserDao newUserDao() {
		return new UserDao();
	}
	
	public User getUserById(final int id) {
		List<User> user = template.query(QUERY_MAKER.makeGetUserByIdQuery(id), new UserMapper());
		if(user.isEmpty()) {
			return new User(-1, "NA", "NA", "NA", "NA", "NA");
		} else {
			return user.get(0);
		}
	}
	
	public User getUserByUsername(final String username) {
		List<User> user = template.query(QUERY_MAKER.makeGetUserByUsernameQuery(username), 
				new UserMapper());
		if(user.isEmpty()) {
			return new User(-1, "NA", "NA", "NA", "NA", "NA");
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
	
//	public boolean validateCredentials(final String username, final String password) {
//		return getUserByUsername(username).getPassword().equals(password);
//	}

}
