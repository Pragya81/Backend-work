Here’s the merged README.md file with both the setup and Docker instructions, maintaining the structure and readability:

```markdown
# Backend Dev Test

This backend project includes a FAQ system built using Node.js, Express, MongoDB, and AdminJS for managing FAQs via API and an admin panel. This project provides endpoints for creating, fetching, and deleting FAQs. It also includes an admin interface for easier management.

## Table of Contents
- [Installation Steps](#installation-steps)
- [API Usage Examples](#api-usage-examples)
- [Contribution Guidelines](#contribution-guidelines)
- [Git & Version Control](#git--version-control)
- [Docker Deployment](#docker-deployment)
- [Heroku Deployment](#heroku-deployment-optional)
- [License](#license)

---

## Installation Steps

Follow these steps to get the project up and running:

### Prerequisites

Before installing and running this project, you’ll need to ensure that you have the following tools and software installed:

- Node.js: This is the runtime that the project runs on.  
  Download from [Node.js Official Website](https://nodejs.org/)

- MongoDB: A NoSQL database used to store FAQs.  
  Download from [MongoDB Official Website](https://www.mongodb.com/try/download/community) or use a cloud MongoDB service like MongoDB Atlas.

### 1. Clone the Repository

Clone the repository to your local machine by running:

```bash
git clone https://github.com/your-username/backend-dev-test.git
cd backend-dev-test
```

### 2. Install Dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```

This will install all the necessary packages like express, mongoose, body-parser, and others listed in the package.json.

### 3. Set Up Environment Variables

To make the application work, you’ll need to create a `.env` file in the root directory with the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/faqdb
PORT=3000
```

- MONGO_URI: The connection string to your MongoDB database. If you’re using MongoDB locally, this URI is fine. For cloud-based MongoDB, you can replace this with your connection string.
- PORT: The port on which your server will run (default is 3000).

### 4. Run the Server

To start the server and make the application run locally, use the following command:

```bash
npm start
```

Your server will now be running at `http://localhost:3000`. You can make requests to the API using tools like Postman, curl, or directly from your front-end application.

---

## API Usage Examples

Here are some API endpoints to interact with the FAQ system.

### 1. Create a New FAQ

Endpoint: `POST /api/faqs`

Description: Adds a new FAQ to the database.

Request Body:

```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
}
```

Response:

```json
{
  "_id": "60a74c2d1c68f5a4f4f5a1e0",
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
}
```

Status: 201 Created

### 2. Fetch All FAQs

Endpoint: `GET /api/faqs`

Description: Retrieves all FAQ entries stored in the database.

Response:

```json
[
  {
    "_id": "60a74c2d1c68f5a4f4f5a1e0",
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
  }
]
```

Status: 200 OK

### 3. Fetch a Single FAQ by ID

Endpoint: `GET /api/faqs/:id`

Description: Retrieves a single FAQ by its ID.

Response:

```json
{
  "_id": "60a74c2d1c68f5a4f4f5a1e0",
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
}
```

Status: 200 OK

### 4. Delete an FAQ

Endpoint: `DELETE /api/faqs/:id`

Description: Deletes a FAQ by its ID.

Response:

```json
{
  "message": "FAQ deleted successfully"
}
```

Status: 200 OK

### 5. Update an FAQ

Endpoint: `PUT /api/faqs/:id`

Description: Updates an existing FAQ.

Request Body:

```json
{
  "question": "What is Express.js?",
  "answer": "Express.js is a fast, unopinionated, minimalist web framework for Node.js."
}
```

Response:

```json
{
  "_id": "60a74c2d1c68f5a4f4f5a1e0",
  "question": "What is Express.js?",
  "answer": "Express.js is a fast, unopinionated, minimalist web framework for Node.js."
}
```

Status: 200 OK

---

## Contribution Guidelines

We welcome contributions to this project! Please follow these guidelines to ensure smooth collaboration:

### Steps to Contribute

1. Fork the Repository:
   - Click the "Fork" button in the top-right corner of the repository page to create a copy of the repository under your GitHub account.

2. Clone the Repository:
   - Clone your fork to your local machine:

   ```bash
   git clone https://github.com/your-username/backend-dev-test.git
   ```

3. Create a New Branch:
   - Create a branch for your changes:

   ```bash
   git checkout -b feature/your-feature
   ```

4. Make Your Changes:
   - Implement the feature or fix the issue you’re working on.
   - Ensure your code follows the style guidelines of the project.

5. Write Tests:
   - If your changes affect functionality, please write tests to verify your changes.

6. Commit Your Changes:
   - Commit your changes with a meaningful message:

   ```bash
   git commit -m "feat: Add multilingual FAQ model"
   ```

7. Push Your Changes:
   - Push your changes to your fork:

   ```bash
   git push origin feature/your-feature
   ```

8. Create a Pull Request:
   - Go to the original repository and open a pull request with a clear description of your changes.

---

## Git & Version Control

We use Git for version control, and follow the Conventional Commits standard for commit messages. Below are the types of commits used:

### Commit Types

- feat: A new feature (e.g., `feat: Add multilingual FAQ model`).
- fix: A bug fix (e.g., `fix: Improve translation caching`).
- docs: Documentation changes (e.g., `docs: Update README with API examples`).
- style: Code style changes (e.g., formatting, semicolons).
- refactor: Code changes that neither fix bugs nor add features but improve code structure (e.g., `refactor: Simplify FAQ controller`).
- test: Adding or updating tests (e.g., `test: Add unit tests for FAQ model`).

### Commit Message Example:

```txt
feat: Add multilingual FAQ model

- Updated the FAQ model to support multiple languages.
- Added translation logic for FAQs.
```

---

## Docker Deployment

To deploy the application using Docker, follow these steps:

### Prerequisites:
- Docker installed on your machine
- Docker Compose (optional but recommended for multi-container applications)

### Steps to build and run using Docker:

1. Clone the repository:
   ```bash
   git clone https://github.com/Pragya81/Backend-work.git
   cd Backend-work
   ```

2. Build the Docker image:
   Navigate to the project directory where your `Dockerfile` and `docker-compose.yml` are located. Then run the following command to build the Docker image:
   ```bash
   docker-compose build
   ```

3. Run the Docker container:
   To run the container and start your application, use:
   ```bash
   docker-compose up
   ```

   This will start the container, and the application will be accessible on `localhost:3000` (or whichever port you have set).

4. Stopping the containers:
   To stop the running containers, use:
   ```bash
   docker-compose down
   ```

---

## Heroku Deployment (Optional)

You can deploy the application to Heroku using Docker. Follow these steps:

### Prerequisites:
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed on your machine.
- Docker installed.

### Steps to deploy to Heroku:

1. Login to Heroku:
   Open a terminal and log in to Heroku using the command:
   ```bash
   heroku login
   ```

2. Create a Heroku app:
   If you don’t have an existing app, create a new one:
   ```bash
   heroku create your-app-name
   ```

3. Add Heroku Container Registry:
   Set Heroku to use Docker for deployment:
   ```bash
   heroku container:login
   ``

`

4. Deploy your Docker container to Heroku:
   Build and push the Docker container to Heroku:
   ```bash
   heroku container:push web -a your-app-name
   heroku container:release web -a your-app-name
   ```

5. Open your app:
   Once the deployment is done, open your app in the browser:
   ```bash
   heroku open
   ```

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
```

This version includes all the required sections and proper formatting, making it easier for users to follow the setup and deployment processes.
