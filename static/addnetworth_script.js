let selectedElement = document.getElementById("type");
const listenElement = document.getElementById("assetOrdebt");

listenElement.addEventListener("change", function() {

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
      })
  })
