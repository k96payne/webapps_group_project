package com.myStocks.dao;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.jdbc.core.JdbcTemplate;

import com.myStocks.model.FavoriteStock;
import com.myStocks.model.mapper.FavoriteStockMapper;
import com.myStocks.queryMaker.FavoriteStockQueryMaker;

public class FavoriteStockDao extends ADao {
	
	private static final FavoriteStockQueryMaker QUERY_MAKER = new FavoriteStockQueryMaker();
	
	private JdbcTemplate template;
	
	private FavoriteStockDao() { 
		this.template = new JdbcTemplate(getDataSource());
	}
	
	public static FavoriteStockDao newFavoriteStockDao() {
		return new FavoriteStockDao();
	}
	
	public void addFavoriteStock(final String username, final String tickerSymbol) {
		template.execute(QUERY_MAKER.makeAddFavoriteStockQuery(username, tickerSymbol));
	}
	
	public Collection<FavoriteStock> getFavoriteStocksByUsername(final String username) {
		Collection<FavoriteStock> favoriteStocks = new ArrayList<>();
		for(FavoriteStock item : template.query(QUERY_MAKER.makeGetFavoriteStocksByUsernameQuery(username), 
				new FavoriteStockMapper())) {
			favoriteStocks.add(item);
		}
		return favoriteStocks;
	}
	

	public void removeFavoriteStock(final String username, final String tickerSymbol) {
		template.execute(QUERY_MAKER.makeRemoveFavoriteStockQuery(username, tickerSymbol));
	}
	
}
