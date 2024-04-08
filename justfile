test: test-client test-server
test-client: 
        cd client && npm run test -- --run --coverage
test-server:
        cd server && RAILS_ENV=test bin/rails test

lint: lint-client lint-server
lint-client:
        cd client && npm run lint
lint-server:
        cd server && bundle exec rubocop

build-client:
        cd client && npm run build -- --mode development


install: install-client install-server
install-client:
        cd client && npm ci

install-server:
        cd server && bin/bundle install
        cd server && RAILS_ENV=test bin/rails db:create
        cd server && RAILS_ENV=test bin/rails db:schema:load

run-client: install-client build-client
        cd client &&  npx -y serve ./dist

run-server: install-server
        cd server && bin/rails server


