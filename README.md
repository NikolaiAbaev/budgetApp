# BudgetME
#### Video Demo: 
#### Description: 

This is a simple Flask-based web application designed to help users track and manage their personal finances. The app includes features for tracking income, expenses, assets, and debts, giving users a view of their financial status. 

First, users can create their accounts.  User must enter valid credentials in order to access the services. The username, password-hash, and the email is in the database.   

Once an account is created, then Users can log their incomes and expenses, specifying the account or location where each transaction occurs to maintain an organized record of their cash flow.  Every time a transaction or an expense is recorded, an entry is created in the database. For this project I chose SQLlite3 (for no reason other than my own familiarity with the technology).  

One key feature of the app is the "Net Worth" page, where users can input and view all their assets and liabilities to see an accurate snapshot of their net worth over time. Additionally, the app includes a ranking or progress-tracking system similar to Codewars, allowing users to gauge their financial goals or milestones based on their activity and achievements within the app.

To streamline the user experience, the app leverages Flask templates for repeated content, ensuring a clean and consistent layout. You have also integrated dynamic JavaScript functionality, enabling users to customize the app's background color with a button click, adding a touch of personalization to the interface.