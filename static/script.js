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

    if (selectedOption == 'income') {
        const newElement = `<div id="insertedFields">
                            <div class="mb-3">
                                <select name="category" class="form-control w-auto">
                                    <option disabled selected>Category</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="description" placeholder="Description (optional)" type="text">
                            </div>
                            
                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="amount" placeholder="Amount" type="number">
                            </div>
                            </div>`;

        element.insertAdjacentHTML('beforebegin', newElement)
        insertedElement = document.getElementById('insertedFields');
    }

    if (selectedOption == 'expense') {
        const newElement = `<div id="insertedFields">
                            <div class="mb-3">
                                <select name="category" class="form-control w-auto">
                                    <option disabled selected>Category</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="description" placeholder="Description (optional)" type="text">
                            </div>
                            
                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="amount" placeholder="Amount" type="number">
                            </div>
                            </div>`;

    }

    if (selectedOption == 'transfer') {
        const newElement = `<div id="insertedFields">
                            <div class="mb-3">
                                <select name="category" class="form-control w-auto">
                                    <option disabled selected>Category</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="description" placeholder="Description (optional)" type="text">
                            </div>
                            
                            <div class="mb-3">
                                <input autocomplete="off" class="form-control w-auto" name="amount" placeholder="Amount" type="number">
                            </div>
                            </div>`;

    }
})
