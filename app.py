import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session

from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, usd

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


# Global Variables for type of expenses and incomes
CATEGORIES = {'expenses':['housing', 'utilities', 'transportation', 'groceries', 'dining_out', 'retirement', 'health', 'healthcare', 'debt_payments', 'entertainment','clothing',
            'education', 'subscriptions', 'gifts', 'donations', 'other'], 
            'incomes':['salary', 'freelance', 'investment', 'rental', 'business', 'bonuses', 'gifts', 'grants', 'pension', 'other']}


@app.after_request
def after_request(response):
    """Ensure responses aren't cached -- unsure if will keep this, but remove caching for now."""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    name = session["username"]
    return render_template("index.html", name=name)


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
        print(rows)

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


@app.route("/transactions", methods=["POST", "GET"])
def income():
    """Allow users to add their incomes, assets, etc. """
    # Depending on the input type, income, expense, or transfer, we will have a slightly different variables. 
    if request.method == "POST":
        form_type = request.form.get("type")
        if form_type == 'income' or form_type == 'expense':
            category = request.form.get("category")
            deposit_source = request.form.get("deposit_source")
            date = request.form.get("date")
            description = request.form.get("description")
            amount = request.form.get("amount")
            print(category, deposit_source, date, description, amount)

        return render_template("transactions.html")

    # to do: income 

    #to do: expense

    # to do: transfer
    return render_template("transactions.html")