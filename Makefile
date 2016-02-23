default: production

development: 
	DEBUG=webhook:server PORT=3000 NODE_ENV=development ./bin/www
	
production:
	PORT=3000 NODE_ENV=production ./bin/www
	
test:
	@mocha --recursive --timeout 5000 --require should  ./test/**/*.test.js
	

.PHONY: default development production test

	
