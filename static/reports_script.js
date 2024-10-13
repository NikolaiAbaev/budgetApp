const selectedElelement = document.getElementById("transactions_table")
let clickTracker = false;

let MONTHS = {
    'January': '01',
    'February': '02',
    'March': '03', 
    'April': '04',
    'May': '05',
    'June': '06',
    'July': '07', 
    'August': '08',
    'September': '09',
    'October': '10',
    'November': '11', 
    'December': '12',
}

selectedElelement.addEventListener("click", function(event) {
    if (clickTracker === false) {
        clickTracker = true;   
        let clickedElement = event.target.parentElement.parentElement
        let date_row = clickedElement.querySelector(".row-date")
        let description_row = clickedElement.querySelector(".row-description")
        let amount_row = clickedElement.querySelector(".row-amount")
        let button_row = clickedElement.querySelector(".row-buttons")

        //converting the date into readable HTML format 
        let date_convert = date_row.textContent.split(" ")[1].replace(",", "").padStart(2, '0');

        const currentDate = `${date_row.textContent.split(" ")[2]}-${MONTHS[date_row.textContent.split(" ")[0]]}-${date_convert}`;
        const currentDescription = description_row.textContent;
        const currentAmount = parseFloat(amount_row.textContent.replace("$", "").replace(",", ""));


        if (event.target.textContent == 'Edit') {

            date_row.innerHTML = `<input id="dateValue" type="date" id="date_update" placeholder="${currentDate}" value="${currentDate}">`
            description_row.innerHTML = `<input id="descriptionValue" type="text" id="description_update" placeholder="${currentDescription}" value="${currentDescription}">`
            amount_row.innerHTML = `<input id="amountValue" type="number" id="amount_update" placeholder="${currentAmount}" value="${currentAmount}">`

            let enter_date = document.querySelector("#dateValue").value;
            let enter_description = document.querySelector("#descriptionValue").value;
            let enter_amount = document.querySelector("#amountValue").value;
  
       
            //new button and hidden form --> it will take the entered values. 
            button_row.innerHTML = `
                    <form class="edit-delete" method ="get" action="reports">
                        <button class="btn btn-primary" type="submit">Cancel</button>
                    </form>
                    <form class="edit-delete" method="post" action="reports">
                        <input id="id_input" name="id" type="hidden" value="${event.target.value}">
                        <input id="date_input" name="date" type="hidden" value="${enter_date}">
                        <input id="description_input" name="description" type="hidden" value="${enter_description}">
                        <input id="amount_input" name="amount" type="hidden" value="${enter_amount}">
                        <button class="btn btn-primary" type="submit" id="confirmation">Confirm</button>
                    <form>`

                    document.querySelector('#confirmation').addEventListener('click', function() {
                        console.log('confirm click')
                        document.querySelector('#date_input').value = document.querySelector("#dateValue").value;
                        document.querySelector('#description_input').value = document.querySelector("#descriptionValue").value;
                        document.querySelector('#amount_input').value = document.querySelector("#amountValue").value;
                    })}
        
        if (event.target.textContent == 'Delete') {
            
            let alert_block = document.getElementById("alert_block")
            alert_block.innerHTML = '<div id="alert_block" class="alert alert-danger">Are you sure you want to delete this transaction?</div>'

            button_row.innerHTML = `
                    <form class="edit-delete" method ="get" action="reports">
                        <button class="btn btn-primary" type="submit">Cancel</button>
                    </form>
                    <form class="edit-delete" method="post" action="reports">
                        <input name="id" type="hidden" value="${event.target.value}">
                        <button class="btn btn-primary" type="submit">Delete</button>
                    <form>`}
        }
        }

        document.addEventListener('DOMContentLoaded', function() {
    
            document.querySelector('form').addEventListener('submit', function (event) {
                document.getElementById('alert_block').innerHTML = '';
                const inputAmount = document.getElementById("amount").value;
                let int_amount = parseFloat(inputAmount);
        
                if (!this.checkValidity()) {
                    event.preventDefault();
                    let alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-danger';
                    alertDiv.innerText = 'Please fill out all required fields correctly.';
                    document.getElementById('alert_block').appendChild(alertDiv);
        
                // check the date, amount, category, transaction type, source. 
                }
                else if (int_amount <= 0) {
                    let alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-danger';
                    event.preventDefault();
                    alertDiv.innerText = 'Please entere a positive amount.';
                    document.getElementById('alert_block').appendChild(alertDiv);
                }
                
            })
        })
)
