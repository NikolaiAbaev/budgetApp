const selectedElelement = document.getElementById("transactions_table")
let clickTracker = false;


selectedElelement.addEventListener("click", function(event) {
    if (clickTracker === false) {
        let clickedElement = event.target.parentElement.parentElement
        clickTracker = true;   

        let date_row = clickedElement.querySelector(".row-date")
        let description_row = clickedElement.querySelector(".row-description")
        let amount_row = clickedElement.querySelector(".row-amount")
        let button_row = clickedElement.querySelector(".row-buttons")

        const currentDate = date_row.textContent;
        const currentDescription = description_row.textContent;
        const currentAmount = amount_row.textContent;

        date_row.innerHTML = `<input type="date" id="date_update" placeholder="${currentDate}" value="${currentDate}">`
        description_row.innerHTML = `<input type="text" id="description_update" placeholder="${currentDescription}" value="${currentDescription}">`
        amount_row.innerHTML = `<input type="number" id="amount_update" placeholder="${currentAmount}" value="${currentAmount}">`
        
        //new button and hidden form --> it will take the entered values. 
        button_row.innerHTML = `
        `

        console.log(currentDate, currentDescription, currentAmount)
    }
})