package com.store.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Item {
	
	private int itemId;
	private String name;
	private Double msrp;
	private Double salePrice;
	private String upc;
	private String shortDescription;
	private String brandName;
	private String size;
	private String color;
	private String gender;
	
}
