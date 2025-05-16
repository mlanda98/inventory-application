# inventory-application

A full-featured Inventory Management Web App built with Node.js, Express, PostgreSQL, and EJS. This application allows users to create, view, update, and delete categories and items in an inventory for any type of store – from musical instruments to groceries. Designed to practice full-stack development with real database relations and backend logic.

---

📌 Features
- View all categories 
- View all items within a category
- Create, update, and delete items
- Protect destructive actions with a secret admin password
- Server-side form validation
- Structured database relations (PostgreSQL)

---

🛠️ Tech Stack
- Node.js
- Express.js
- EJS templating engine
- PostgreSQL
- Dotenv
- pg (PostgreSQL client)

---

💻 Run It Locally
- Clone the repository
  `git clone https://github.com/mlanda98/inventory-application.git`
- Navigate into the project directory
  `cd inventory-application`
- Install dependencies
  `npm install`
- configure environment variables in `.env` file:

```
PGUSER=your_postgres_username
PHOST=localhost
PGDATABASE=music_inventory
PGPASSWORD=your_postgres_password
PGPORT=5432
NODE_ENV=development
```

- Start the server
  `npm start`
- Open your browser to `http://localhost:3000`

---

📬 Contact
- Email: mlandae16@gmail.com
