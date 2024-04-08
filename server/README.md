# Server Application for ClimatePulse

## 🌐 Overview
This back-end serves as the data management and API layer for the ClimatePulse application, responsible for handling weather metric measurements. Built with Ruby on Rails, it provides endpoints for creating and analyzing weather data.

### Prerequisites
- Ruby 3.3.0
- PostgreSQL
- Rails 7.1.3 or newer

## 🚀 Getting Started
To get the server running locally:

1. **Clone the main repository** (if not already done):
    ```bash
    git clone https://github.com/rodrigo-picanco/climatepulse.git
    ```
2. **Navigate to the back-end directory**:
    ```bash
    cd server
    ```
3. **Install dependencies**:
    ```bash
    bundle install
    ```
4. **Setup the database**:
    Rails utilizes `Active Record` for database interactions. Run the following commands to create and migrate your database:
    ```bash
    bin/rails db:create
    bin/rails db:migrate
    ```
    For more details, refer to the [Active Record Migrations](https://guides.rubyonrails.org/active_record_migrations.html) guide.

5. **Start the server**:
    ```bash
    bin/rails server
    ```
    By default, the server will run on [http://localhost:3000](http://localhost:3000).

## 💎 Gems
A brief overview of some key gems used in this project:

- **`pg`**: PostgreSQL as the database.
- **`rack-cors`**: Handles Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible.
- **`groupdate`**: Simplifies grouping temporal data for aggregation.

In the `development` and `test` groups:
- **`debug`**: An interactive debugging tool.
- **`rubocop`**: A Ruby static code analyzer and formatter, ensuring code quality.
- **`simplecov`**: A code coverage analysis tool for Ruby.

## 🧪 Testing
This application uses Minitest for unit testing. To run tests:

```bash
bin/rails test
```

Refer to the Rails Testing Guide for more details on testing Rails applications.





