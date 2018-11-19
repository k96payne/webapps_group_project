package com.store.rest;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Controller;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

@Controller
@Path("/carts")
public class CartItemController extends HttpServlet {
	
private static final long serialVersionUID = 1L;
	
	private CartItemService cartItemService = new CartItemService();

	public void init(final ServletConfig config) {
		 try{
			super.init(config);
			SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,
			  config.getServletContext());
		  } catch (ServletException e) { }
	 }
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("")
	public void addToCart(final String jsonBody) {
		cartItemService.addToCart(jsonBody);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{username}")
	public String getCart(@PathParam("username") final String username) {
		return cartItemService.getUserCart(username);
	}
	
	@DELETE
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("")
	public void removeFromCart(final String jsonBody) {
		cartItemService.removeFromCart(jsonBody);
	}
	
	@PUT
	@Path("/purchase/{cartId}")
	public void purchaseCart(@PathParam("cartId") final int cartId) {
		cartItemService.purchaseCart(cartId);
	}
	
	@GET
	@Path("")
	@Produces(MediaType.APPLICATION_JSON)
	public String getUsersWhoPurchasedProduct(@QueryParam("productId") final int productId) {
		return cartItemService.getUsersWhoPurchasedProduct(productId);
	}
	
	@GET
	@Path("/purchased/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getItemsPurchasedByUser(@PathParam("username") final String username) {
		return cartItemService.getItemsPurchasedByUser(username);
	}
}
