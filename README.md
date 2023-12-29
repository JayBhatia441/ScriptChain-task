# ScriptChain-task

EMAIL SYSTEM SENDER

Tech Stack - Angular, Node.js, MySQL, Javascript, TypeScript, REST APIs

This application is an email system sender designed for sending confirmation emails to users. The process involves users entering their name and email in a form. Upon submission, the user receives a confirmation email from the system. The user information, including name and email, is stored in a MySQL database.

The frontend of the application is developed using Angular and TypeScript, providing an interactive user interface. On the other hand, the backend is developed using Node.js and JavaScript. Communication between the frontend and backend is achieved through REST APIs.

To ensure data integrity, the system prevents duplication by checking and ensuring that the same email address is not entered twice before storing the information in the MySQL database. This two-tiered architecture separates the presentation layer (Angular frontend) from the application logic and data storage (Node.js backend with MySQL database).

Certainly, here's a reformatted version:

**Frontend:**

The frontend of the system includes a form component called `UserFormComponent`, developed using Angular Forms. This component interacts with the backend through a service named `DataService`. The styling of the form is kept simple and elegant, utilizing basic CSS.

The form comprises two fields: 
1. **Username**
2. **Email**
