default: production

development: 
	NODE_ENV=development ./bin/www
	
production:
	NODE_ENV=production ./bin/www
	
test:
	@mocha --recursive --timeout 5000 --require should  ./test/**/*.test.js
	

.PHONY: default development production test

	
