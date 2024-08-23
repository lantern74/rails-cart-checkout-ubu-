dev:
	@echo "Starting the application..."
	@rails assets:precompile
	@yarn watch:css & yarn watch:js &
	@rails server

dev-prod:
	@echo "Starting the application in production mode..."
	@rails s -b "ssl://localhost:3000?key=./localhost.key&cert=./localhost.crt"

setup:
	@echo "Setting up the application..."
	@bundle install
	@rails db:create
	@rails db:migrate
	@rails db:seed

reset:
	@echo "Resetting the application..."
	@rails db:drop
	@rails db:create
	@rails db:migrate
	@rails db:seed