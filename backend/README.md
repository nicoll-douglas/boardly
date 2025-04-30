# Chattr (Backend)

Chattr is a demo messaging board app where users can connect through user-created boards, threads, and replies whilst experiencing a modern and intuitive UI/UX. This is the backend/API of the project that powers the application.

[![Link](https://img.shields.io/badge/Live_At-https://chattr.nicolldouglas.dev-fbd38d)](https://chattr.nicolldouglas.dev)

## Features

- User Authentication & Security

  - JWT-based authentication for secure user login and session management 🪙.
  - Secure handling of user inputs through validation and sanitization 🧼.
  - Protects sensitive routes with authentication middleware 🔒.

- Account Management

  - Facilitates the creation of new accounts with email verification ✉️.
  - Includes routes for changing and resetting passwords 🔐.
  - Implements a route to facilitate account deletion 🗑️.

- Data Persistence

  - Integrates with MongoDB for efficient data storage and retrieval using Mongoose 📊.
  - Utilizes Firebase Admin SDK to integrate media storage, enhancing user profile management and customisation 🖼️.

- Scalable Architecture

  - Produces consistent and informative error responses for all API endpoints 🔔.
  - Designed with RESTful principles and MVC in mind, ensuring scalability and flexibility in API consumption ⚒️.

## Technologies

This project is built with the MERN stack. Some key packages used on the backend include Mongoose, Joi, and Express.js.

### Stack

[![Stack](https://skillicons.dev/icons?i=js,react,nodejs,expressjs,mongodb,firebase)](https://skillicons.dev)

## License

[MIT](https://choosealicense.com/licenses/mit/)
