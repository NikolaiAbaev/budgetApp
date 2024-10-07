import os
from datetime import datetime, date

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session

from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, usd, interest

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///budget.db")


# Global Variables for Validation. 
CATEGORIES = {'expense':['housing', 'utilities', 'transportation', 'groceries', 'dining_out', 'retirement', 'health', 'healthcare', 'debt_payments', 'entertainment','clothing',
            'education', 'subscriptions', 'gifts', 'donations', 'other'], 
            'income':['salary', 'freelance', 'investment', 'rental', 'business', 'bonuses', 'gifts', 'grants', 'pension', 'other'],}

ASSETS_DEBTS = {'asset': ['cash', 'checking', 'saving', 'retirement', 'real_estate', 'vehicle', 'personal_property', 'other'],
                'debt': ['mortgage', 'loan', 'credit', 'medical', 'other'],}


@app.after_request
def after_request(response):
    """Ensure responses aren't cached -- unsure if will keep this, but removing caching for now."""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    name = session["username"]
    assets = db.execute("SELECT * FROM assets WHERE user_id = ?", session["user_id"]) 
    debts = db.execute("SELECT * FROM debts WHERE user_id = ?", session["user_id"])
    total_debt = 0
    total_asset = 0

    for i in range(0, len(assets)):
        total_asset += int(assets[i]['value'])
        assets[i]['value'] = usd(assets[i]['value'])

    for i in range(0, len(debts)):
        total_debt += int(debts[i]['amount'])
        debts[i]['amount'] = usd(debts[i]['amount'])
        debts[i]['interest_rate'] = interest(debts[i]['interest_rate'])

    total_debt = usd(total_debt)
    total_asset = usd(total_asset)

    return render_template("index.html", name=name, assets=assets, debts=debts, total_debt=total_debt, total_asset=total_asset)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        session["username"] = rows[0]["username"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":
        if request.form.get("password") != request.form.get("confirmation"):
            return apology("Passowrds did not match", 400)

        userName = request.form.get("username")
        email = request.form.get("email")
        hashed_password = generate_password_hash(request.form.get("password"))

        if not userName or not request.form.get("password"):
            return apology("Must provide username and password", 400)

        try:
            db.execute("INSERT INTO users (userName, hash, email) VALUES(?, ?, ?)", userName, hashed_password, email)
            print("ERROR")
            return redirect("/")

        except ValueError:
            return apology("username already exists", 400)


    return render_template("register.html")


@app.route("/reports", methods=["GET"])
@login_required
def reports():
    """Render Monthly and Yearly statistics here"""
    return render_template("reports.html")


@app.route("/transactions", methods=["POST", "GET"])
@login_required
def income():
    """Allow users to add their incomes etc. """
    # Depending on the input type, income, expense, or transfer, we will have a slightly different variables. 

    if request.method == "POST":
        form_type = request.form.get("type")

        if form_type == 'income' or form_type == 'expense':
            category = request.form.get("category")
            source = request.form.get("source")
            transaction_date = request.form.get("date")
            description = request.form.get("description")
            amount = request.form.get("amount")

            try: 
                amount = int(amount)

            except ValueError:
                return render_template("transactions.html", error="Please enter a valid amount.")

            if category not in CATEGORIES[form_type]:
                return render_template("transactions.html", error="Please enter a valid category.")
            
            # check the date (also add other checks here, i.e., entering dates that are too long time ago)
            today = date.today()
            try:
                input_date = datetime.strptime(transaction_date, "%Y-%m-%d").date()
                if input_date > today:
                    return render_template("transactions.html", error="Please enter a valid date.")
            except ValueError:
                return render_template("transactions.html", error="Please enter a date in a valid format.")
            
            # writing into the database
            db.execute("INSERT INTO transactions (user_id, type, amount, description, category, transaction_date, source) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                    session["user_id"], form_type, amount, description, category, transaction_date, source)

            # to do: addition to the transaction DB should affect debt and assets DBs. 

        return render_template("transactions.html")

    # to do: transfer

    return render_template("transactions.html", expense=CATEGORIES["expense"], income=CATEGORIES["income"])


@app.route("/addnetworth", methods=["POST", "GET"])
@login_required
def addnetworth():
    """Show users their bank accounts, assets, and also allow users to add their assets / debts"""
    if request.method == "POST":
        input = request.form.get('assetOrdebt')
        input_type = request.form.get('type')
        input_amount = request.form.get('amount')
        input_descritpion = request.form.get('description')

        #server side input validation 
        if input != 'debt' and input != 'asset':
            return render_template("addnetworth.html", error="Please enter either Debt or Asset.")
        
        if input_type not in ASSETS_DEBTS[input]:
             return render_template("addnetworth.html", error=f"Please enter a valid {input} type.")
        
        try:
            input_amount = int(input_amount)
            if input_amount < 0:
                return render_template("addnetworth.html", error="Please enter a positive number.")
        except ValueError:
            return render_template("addnetworth.html", error="Please enter a valid positive number.")
        
        if input_descritpion == '' or input_descritpion == None:
            return render_template("addnetworth.html", error=f"Please enter a description of the {input}.") 
        
        if input == 'asset':
            db.execute("INSERT INTO assets (user_id, asset_name, asset_type, value) VALUES (?, ?, ?, ?)", session["user_id"], input_descritpion, input_type, input_amount)

        # need to add interest rate + due dates for debt. 
        elif input == 'debt':
            interest_rate = request.form.get("interest_rate")
            due_date = request.form.get("due_date") # for now this just grabs it but does not do anything with it. 
            db.execute("INSERT INTO debts (user_id, creditor_name, debt_type, amount, interest_rate) VALUES (?, ?, ?, ?, ?)", 
                               session["user_id"], input_descritpion, input_type, input_amount, interest_rate)

            return render_template("addnetworth.html")
        
    if request.method == 'GET':
        
        # TO DO: pass the submitted value to preselct the form. 

        form_request = request.args.get("submit") 
        return render_template("addnetworth.html", form_request=form_request)

# TO DO: user account edit page

# TO DO: Add a route to generate net worth stats

# TO DO: Add a route to generate monthly / yearly spending 