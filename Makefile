default: production

development: 
	NODE_ENV=development ./bin/www
	
production:
	NODE_ENV=production ./bin/www

	
