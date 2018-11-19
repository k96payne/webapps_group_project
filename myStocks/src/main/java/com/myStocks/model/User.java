package com.myStocks.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
	
	@JsonIgnore
	private int id;
	
	private String fname;
	private String lname;
	private String username;
	private String email;
	
}
