package com.myStocks.rest;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Controller;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

@Controller
@Path("/items")
public class ItemController extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	private ItemService itemService = new ItemService();

	public void init(final ServletConfig config) {
		 try{
			super.init(config);
			SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
			  config.getServletContext());
		  } catch (ServletException e) { }
	 }
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("")
	public String getAllItems() {
		return itemService.getAllItems();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public String getItemById(@PathParam("id") final int id) {
		return itemService.getItemById(id);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/search/{keyword}")
	public String getItemsByKeyword(@PathParam("keyword") final String keyword) {
		return itemService.getItemsByKeyword(keyword);
	}
}
