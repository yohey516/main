# Shopping List Application

This is a web application that allows users to create and manage shopping lists. Users can add, delete, and edit items, as well as check off purchased items.

## Features

- User Authentication: Users can create an account and log in. Temporary sessions can also be used for users without an account.
- Create and Display Shopping Lists: Users can create new shopping lists and view existing ones.
- Add and Remove Items: Users can add items to the shopping list or remove unnecessary items.
- Edit Items: Users can edit the information of existing items.
- Check Items: Users can check off purchased items or revert them to an unchecked state.
- Add Categories and Tags: Users can categorize items using categories and tags.

## Setup
1. Clone the project:
git clone https://github.com/yohey516/SLA.git

2. Navigate to the project folder:
cd SLA

3. Install the required packages:
npm install

4. Configure the database. Replace XXX with the database connection information.

// config/db.js

module.exports = {
url: 'mongodb://XXX'
};

5. Start the application: npm start
6. Access the application in your browser: http://localhost:3000



## Usage

1. Create a new account or log in with an existing account.
2. Create shopping lists and add items to them.
3. Edit or remove items as needed.
4. Check off items to mark them as purchased.
5. Use categories and tags to classify items.

## Tech Stack

- Backend: Node.js, Express.js
- Frontend: HTML, CSS, JavaScript
- Database: MongoDB
- User Authentication: Passport.js
- Other Packages: multer

## Contribution

To contribute to this project, fork the repository and create a pull request.

## License

This project is licensed under the MIT License.
