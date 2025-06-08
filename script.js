document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('billForm');
    const addPersonBtn = document.getElementById('addPerson');
    const peopleInputs = document.getElementById('peopleInputs');
    const addSharedItemBtn = document.getElementById('addSharedItem');
    const sharedItemsInputs = document.getElementById('sharedItemsInputs');
    const resultsDiv = document.getElementById('results');
    const resultBody = document.getElementById('resultBody');
    const resultFooter = document.getElementById('resultFooter');
    const summary = document.getElementById('summary');
    const resetBtn = document.getElementById('resetBtn');
    let personCount = 0;
    let sharedItemCount = 0;

    // Debug: Ensure elements are found
    console.log('Form:', form);
    console.log('Add Person Button:', addPersonBtn);
    console.log('People Inputs Container:', peopleInputs);
    console.log('Add Shared Item Button:', addSharedItemBtn);
    console.log('Shared Items Inputs Container:', sharedItemsInputs);

    // Initialize with one person
    addPerson();

    // Add person
    addPersonBtn.addEventListener('click', () => {
        console.log('Add Person button clicked');
        addPerson();
        updateSharedItemCheckboxes();
    });

    function addPerson() {
        personCount++;
        console.log('Adding person #', personCount);
        const div = document.createElement('div');
        div.className = 'person-input bg-gray-50 p-4 rounded-lg';
        div.setAttribute('data-person-id', personCount);
        div.innerHTML = `
            <div class="person-input-header flex space-x-4 items-center mb-2">
                <label for="person-name-${personCount}" class="sr-only">Name for Person ${personCount}</label>
                <input type="text" id="person-name-${personCount}" class="person-name flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Name" required>
                <button type="button" class="remove-btn bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">Remove Person</button>
            </div>
            <div class="person-items space-y-2">
                <div class="item-input flex space-x-4">
                    <label for="item-cost-${personCount}-1" class="sr-only">Item Cost for Person ${personCount}</label>
                    <input type="number" id="item-cost-${personCount}-1" class="item-cost flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" step="0.01" min="0" placeholder="Item Cost ($)" required>
                    <button type="button" class="remove-item-btn bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">Remove Item</button>
                </div>
            </div>
            <button type="button" class="add-item-btn mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">Add Item</button>
        `;
        peopleInputs.appendChild(div);
        console.log('Person input added:', div);

        // Remove person
        div.querySelector('.remove-btn').addEventListener('click', () => {
            if (personCount > 1) {
                console.log('Removing person #', div.getAttribute('data-person-id'));
                div.remove();
                personCount--;
                updateSharedItemCheckboxes();
            } else {
                alert('At least one person is required.');
            }
        });

        // Add item
        div.querySelector('.add-item-btn').addEventListener('click', () => {
            console.log('Adding item for person #', div.getAttribute('data-person-id'));
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-input flex space-x-4';
            itemDiv.innerHTML = `
                <label for="item-cost-${personCount}-${Date.now()}" class="sr-only">Item Cost</label>
                <input type="number" id="item-cost-${personCount}-${Date.now()}" class="item-cost flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" step="0.01" min="0" placeholder="Item Cost ($)" required>
                <button type="button" class="remove-item-btn bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">Remove Item</button>
            `;
            div.querySelector('.person-items').appendChild(itemDiv);

            // Remove item
            itemDiv.querySelector('.remove-item-btn').addEventListener('click', () => {
                const items = div.querySelectorAll('.item-input');
                if (items.length > 1) {
                    console.log('Removing item from person #', div.getAttribute('data-person-id'));
                    itemDiv.remove();
                } else {
                    alert('Each person must have at least one item.');
                }
            });
        });

        // Remove first item
        div.querySelector('.remove-item-btn').addEventListener('click', () => {
            const items = div.querySelectorAll('.item-input');
            if (items.length > 1) {
                console.log('Removing first item from person #', div.getAttribute('data-person-id'));
                div.querySelector('.item-input').remove​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
