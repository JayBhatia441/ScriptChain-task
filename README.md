# ScriptChain-task

**EMAIL SYSTEM SENDER**

**Tech Stack - Angular, Node.js, MySQL, Javascript, TypeScript, REST APIs**

This application is an email system sender designed for sending confirmation emails to users. The process involves users entering their name and email in a form. Upon submission, the user receives a confirmation email from the system. The user information, including name and email, is stored in a MySQL database.

The frontend of the application is developed using Angular and TypeScript, providing an interactive user interface. On the other hand, the backend is developed using Node.js and JavaScript. Communication between the frontend and backend is achieved through REST APIs.

To ensure data integrity, the system prevents duplication by checking and ensuring that the same email address is not entered twice before storing the information in the MySQL database. This two-tiered architecture separates the presentation layer (Angular frontend) from the application logic and data storage (Node.js backend with MySQL database).



### Frontend

The frontend utilizes Angular and TypeScript to create a simple and elegant form with two fields: username and email. The form is styled using basic CSS. User interactions with the form are managed through Angular Forms.

### Backend

The backend is developed using Node.js and connects to a MySQL database to store user information. It uses Express as a web server and includes the following key components:
\

- **MySQL Database Connection:** Connects to a local MySQL database

- **Email Configuration:** Utilizes the Nodemailer library to set up email configuration using the Mailgun service for sending confirmation emails. I have sent emails to some random temporary email adresses which i geberated using TempMail

- **Form Submission Endpoint (`/submit`):** Handles POST requests for form submissions. Checks if the provided email already exists in the database. If not, it inserts the username and email into the database, sends a confirmation email, and responds with a success message. If the email already exists, it returns an error.



**Project Video**

You can finde the video here - https://youtu.be/e3CCuFz47x0

External Resources I used for temorary and inbox and email adresses
1. Mailgun - https://www.mailgun.com/ - to send emails from a temporary domain
2. TempMail - https://temp-mail.org/en/ - sending out emails to temporary user emailIds
