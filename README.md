# Text2SQL

Text2SQL is a RESTful API that converts natural language queries into SQL statements. It also allows providing an optional database schema to improve the accuracy of the generated queries.

## Features

- Converts natural language queries to SQL.
- Support for optional database schemas.
- Powered by advanced AI models for text generation.
- Easy to integrate into existing applications.

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- A valid API key for the OpenAI model.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/text-2-sql.git
   cd text-2-sql
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and configure the following variables:
   ```
   GITHUB_TOKEN=your_api_key
   PORT=3000
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Send a POST request to the `/generate-sql` endpoint with the following format:
   ```json
   {
     "query": "Give me the names of customers who made purchases this month.",
     "schema": {
       "users": ["id", "name"],
       "orders": ["id", "user_id", "created_at"]
     }
   }
   ```

3. You will receive a response with the generated SQL query:
   ```json
   {
     "sql": "SELECT users.name FROM users JOIN orders ON users.id = orders.user_id WHERE orders.created_at >= DATE_TRUNC('month', CURRENT_DATE);"
   }
   ```

## Authentication and Rate Limiting

- Each user can make up to 5 requests without authentication.
- After 5 requests, an API key is required in the `x-api-key` header.


## Available Scripts

- `npm run dev`: Starts the server in development mode with automatic reload.
- `npm run build`: Compiles the TypeScript project to JavaScript.
- `npm start`: Starts the server in production mode.


## License

This project is licensed under the [MIT License](./LICENSE).
