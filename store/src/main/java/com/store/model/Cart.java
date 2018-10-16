package com.store.model;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Cart {

	@JsonIgnore
	private String username;	
	
	private int cartId;
	private Collection<Item> items;
	
}
