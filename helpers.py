import requests

from flask import redirect, render_template, session
from functools import wraps


def apology(message, code=400):
    """Render message as an apology to user."""

    def escape(s):
        """
        Escape special characters.

        https://github.com/jacebrowning/memegen#special-characters
        """
        for old, new in [
            ("-", "--"),
            (" ", "-"),
            ("_", "__"),
            ("?", "~q"),
            ("%", "~p"),
            ("#", "~h"),
            ("/", "~s"),
            ('"', "''"),
        ]:
            s = s.replace(old, new)
        return s

    return render_template("apology.html", top=code, bottom=escape(message)), code


def login_required(f):
    """
    Decorate routes to require login.

    https://flask.palletsprojects.com/en/latest/patterns/viewdecorators/
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)

    return decorated_function


def usd(value, type=""):
    """Format value as USD."""
    if type == 'expense':
        return f"-${value:,.2f}"
    else:
        return f"${value:,.2f}"


def interest(value):
    """Format value as percentage with two decimals behind."""
    return f"{value:.2f}%"


def date_format(str):
    """Format the str into a a date in the following format: "Month, Date, Year." """
    MONTHS = {
    1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"}
    split = str.split("-")
    return f"{MONTHS[int(split[1])]} {int(split[2])}, {split[0]}"


def category_format(str):
    """Format the str into the more user friendly format"""
    answer = ""
    for i in range(0, len(str)):
        if i == 0:
            answer += str[i].upper()
        else:
            if str[i - 1] == '_':
                answer += str[i].upper()
            else:
                if str[i] == '_':
                    answer += ' '
                else:
                    answer += str[i]
    return answer
