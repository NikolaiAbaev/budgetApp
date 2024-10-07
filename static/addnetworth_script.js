let selectedElement = document.getElementById("type");
const listenElement = document.getElementById("assetOrdebt");
let insertedElement;

listenElement.addEventListener("change", function() {

    if (insertedElement) {
        insertedElement.remove("insertedFields");
        insertedElement = null;  // Reset the reference
        }
    
    if (listenElement.value == 'debt') {
        selectedElement.innerHTML = `
                <select name="type" class="form-control w-auto" id="type" required>
                        <option value ="" disabled selected>Debt Type</option>
                        <option value ="mortgage">Mortgage</option>
                        <option value ="loan" >Loan</option>
                        <option value="credit">Credit Card or Line</option>
                        <option value="medical">Medical Debt</option>
                        <option value="other">Other</option>
                </select>`
        
        const newElement = `
                    <div id="insertedFields">
                        <div class="mb-3">
                            <input autocomplete=off class="form-control w-auto" name="interest_rate" id="interest_rate" placeholder="Interest Rate" required>
                        </div>
            
                        <div class="mb-3">
                            <input autocomplete="off" class="form-control w-auto" name="due_date" id="due_date" type="date">
                        </div>
                    </div>`
        
        selectedElement.parentElement.insertAdjacentHTML("afterend", newElement);
        insertedElement = document.getElementById("insertedFields");
    }

    if (listenElement.value == 'asset') {
        selectedElement.innerHTML = `
                <select name="type" class="form-control w-auto" id="type" required>
                    <option value ="" disabled selected>Asset Type</option>
                    <option value ="cash">Cash</option>
                    <option value ="checking">Checking Account</option>
                    <option value="saving">Saving Account</option>
                    <option value="retirement">Retirement Account</option>
                    <option value ="real_estate">Real Estate</option>
                    <option value="vehicle">Vehicle</option>
                    <option value ="personal_property">Personal Property</option>
                    <option value="other">Other</option>
                </select>`
    }
})


 document.addEventListener('DOMContentLoaded', function() {
    
      document.querySelector('form').addEventListener('submit', function (event) {
        const inputAmount = document.getElementById("amount").value;
        const interest_rate = document.getElementById("interest_rate").value;
        let int_num = parseInt(interest_rate);
        let num = parseInt(inputAmount);
        
        document.getElementById('alert_block').innerHTML = '';
        let alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger';

            if (!this.checkValidity()) {
                event.preventDefault();            
                alertDiv.innerText = 'Please fill out all required fields correctly.';
                document.getElementById('alert_block').appendChild(alertDiv);
            }

            if (num <= 0) {
                event.preventDefault();            
                alertDiv.innerText = 'Please enter a positive number.';
                document.getElementById('alert_block').appendChild(alertDiv);
            }

            if (int_num < 0) {
                event.preventDefault();
                alertDiv.innerText = 'Please enter a valid interest rate.';
                document.getElementById('alert_block').appendChild(alertDiv);
            }
      })
  })
