const selectElement = document.getElementById("transaction_type")
let insertedElement;


selectElement.addEventListener("change", function () {
    const selectedOption = selectElement.value;
    let element = document.getElementById("the_transaction_submit")

    // Remove the previously inserted element, if it exists
    if (insertedElement) {
        insertedElement.remove("insertedFields");
        insertedElement = null;  // Reset the reference
    }
    
    // Income categories.
    //TO DO -- when user adds bank account, it needs to populte the appropriate select tag, making it dynamic. 
    
    if (selectedOption == 'income') {
        const newElement = `<div id="insertedFields">
                            <div class="mb-3">
                                <select name="category" class="form-control w-auto" required>
                                    <option value ="" disabled selected>Category</option>
                                    <option value="salary">Salary</option>
                                    <option value="freelance">Freelance</option>
                                    <option value="investment">Investment</option>
                                    <option value="rental">Rental</option>
                                    <option value="business">Business</option>
                                    <option value="bonuses">Bonuses</option>
                                    <option value="gifts">Gifts</option>
                                    <option value="grants">Grants</option>
                                    <option value="pension">Pension</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div class="mb-3" id="deposit_location">
                                <select name="source" class="form-control w-auto" required>
                                    <option disabled selected>Deposit Source</option>
                                    <option>Bank Account</option>
                                    <option>Cash</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="date" type="date" required>
                            </div>

                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="description" placeholder="Description (optional)" type="text">
                            </div>
                            
                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="amount" placeholder="Amount" type="number" required>
                            </div>
                            </div>`;

        element.insertAdjacentHTML('beforebegin', newElement)
        insertedElement = document.getElementById('insertedFields');
    }

    if (selectedOption == 'expense') {
        const newElement = `<div id="insertedFields">
                            <div class="mb-3">
                                <select name="category" class="form-control w-auto" required>
                                    <option value ="" disabled selected>Category</option>
                                    <option value="housing">Housing</option>
                                    <option value="utilities">Utilities</option>
                                    <option value="transportation">Transportation</option>
                                    <option value="groceries">Groceries</option>
                                    <option value="dining_out">Dining Out </option>
                                    <option value="retirement">Retirement</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="health">Health</option>
                                    <option value="gifts">Gifts</option>
                                    <option value="debt_payments">Debt Payments</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="education">Education</option>
                                    <option value="subscriptions">Subscriptions</option>
                                    <option value="gifts">Gifts</option>
                                    <option value="donations">Donations</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div class="mb-3" id="withdrawal_source">
                                <select name="source" class="form-control w-auto" required>
                                    <option disabled selected>Withdrawal Source</option>
                                    <option>Bank Account</option>
                                    <option>Credit Card</option>
                                    <option>Cash</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="date" type="date" required>
                            </div>

                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="description" placeholder="Description (optional)" type="text">
                            </div>

                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="amount" placeholder="Amount" type="number" required>
                            </div>
                            </div>`;

            element.insertAdjacentHTML('beforebegin', newElement)
            insertedElement = document.getElementById('insertedFields');

    }
    // TO DO -- create a feature where users can transfer from their accounts.
    if (selectedOption == 'transfer') {
        const newElement = ``
    }
 })


document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelector('form').addEventListener('submit', function (event) {
        document.getElementById('alert_block').innerHTML = '';
        // check to see if the submitted form is valid
        if (!this.checkValidity()) {
            event.preventDefault();

            let alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-danger';
            alertDiv.innerText = 'Please fill out all required fields correctly.';
            document.getElementById('alert_block').appendChild(alertDiv);
        // check the date, amount, category, transaction type, source. 
        }
    })
})