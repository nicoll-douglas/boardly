# Lorem (Backend)

Lorem is a messaging board app where users can connect through user-created boards, threads and replies. This is the backend/API that powers the core features of the application.

## Technologies

- MongoDB + Mongoose
- Node.js + Express.js
- Firebase/Google Cloud
- JWT Auth

## Features

- User Authentication & Security
  - Implements JWT-based authentication for secure user login and session management.
  - Ensures secure handling of user inputs through validation and sanitization.
  - Protects routes with authentication middleware for sensitive operations.
- User Accounts
  - **Registration**: Facilitates the creation of new accounts with validation for secure signup.
  - **Login**: Authenticated users can log in securely using JWT and access protected resources.
  - **Password Management**: Implements routes for changing and resetting passwords.
  - **Account Deletion**: Users can permanently delete their accounts along with associated data.
- Data Persistence with MongoDB
  - Integrates with MongoDB for efficient data storage and retrieval.
  - Implements schema validation and model-based operations using Mongoose.
- Firebase Integration
  - Utilizes Firebase Admin SDK for handling media storage.
  - Stores user-uploaded profile pictures and other media securely in Firebase Storage.
  - Easily retrieves and manages media files for user profiles, enhancing account management and customisation.
- Error Handling & Response Standardization
  - Consistent and informative error responses for all API endpoints.
  - Custom middleware for centralized error handling and logging.
- Scalability
  - Design with RESTful principles and MVC in mind, ensuring scalability and flexibility in API consumption.

## Feedback

If you have any feedback about this project, please send me an email at dev.nicoll.douglas@gmail.com!

## Related

[Lorem (Frontend)](https://github.com/nicoll-douglas/lorem-frontend)

## License

[MIT](https://choosealicense.com/licenses/mit/)
