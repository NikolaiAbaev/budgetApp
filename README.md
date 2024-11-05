# BudgetME
#### Video Demo: 
#### Description: 

This is a simple Flask-based web application designed to help users track and manage their personal finances. The app includes features for tracking income, expenses, assets, and debts, giving users a view of their financial status. 

First, users can create their accounts.  Application checks for a valid username and password on the front  end via JavaScript (at this time username and password must contain 8 charachters).  This is here just as a starting point, of course we would want to increase the complexity req. for the password. Passwords must also match, or else an error message will appear via JS.  The same checks are also conducted on the backend via Python. Additionally, python is used to check whether a username already exists, if it does, an error message is generated. 

If user enters valid credentials, they are going to be able to log in.  When credentials are entered, they are checked against the database entires, and if there is a match, user is then logged in and redirected to the repots page.    

Once an account is created and user is logged in, Users can log their incomes and expenses, specifying the account or location where each transaction occurs to maintain an organized record of their cash flow.  Every time a transaction or an expense is recorded, an entry is created in the database. For this project I chose SQLlite3 (for no reason other than my own familiarity with the technology).  

The Reports page then generates two things: (1) a table with all incomes and expenses entered, and (2) a pie chart visualizing the expenses using charts.js.  User can select a a range for the incomes / expenses to be generated.  The HTML is dynamically generated via flask and SQLlite3.  Whenever the user selects a particular range, a query is sent to the database that pulls data from the db into the HTML page. 

The reports page has an add transaction function.  When clicked, users are redirected to transactions page where there is a dropdown selection menu for users to select income, expenses, and then specify their types an amounts.  Users entry is checked on both the front end and back end to ensure valid entry. 

The reports page has an edit function.  When users press edit transactions button, they are prompted to an HTML page with all entreies (again, user can adjust the range of this table).  User can either edit or delete a particular entry here on the html page. There are front end and back end checks to make sure end users enters valid entires.  

Another key feature of the app is the "Net Worth" page, where users can input and view all their assets and liabilities to see an accurate snapshot of their net worth over time. Additionally, the app includes a ranking or progress-tracking system similar to Codewars, allowing users to gauge their financial goals or milestones based on their activity and achievements within the app.

To streamline the user experience, the app leverages Flask templates for repeated content, ensuring a clean and consistent layout. You have also integrated dynamic JavaScript functionality, enabling users to customize the app's background color with a button click, adding a touch of personalization to the interface.