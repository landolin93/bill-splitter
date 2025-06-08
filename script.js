document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('billForm');
    const addPersonBtn = document.getElementById('addPerson');
    const peopleInputs = document.getElementById('peopleInputs');
    const resultsDiv = document.getElementById('results');
    const resultBody = document.getElementById('resultBody');
    const resetBtn = document.getElementById('resetBtn');
    let personCount = 0;

    // Debug: Ensure elements are found
    console.log('Form:', form);
    console.log('Add Person Button:', addPersonBtn);
    console.log('People Inputs Container:', peopleInputs);

    // Initialize with one person
    addPerson();

    // Add person
    addPersonBtn.addEventListener('click', () => {
        console.log('Add Person button clicked');
        addPerson();
    });

    function addPerson() {
        personCount++;
        console.log('Adding person #', personCount);
        const div = document.createElement('div');
        div.className = 'person-input bg-gray-50 p-4 rounded-lg';
        div.setAttribute('data-person-id', personCount);
        div.innerHTML = `
            <div class="person-input-header flex space-x-4 items-center mb-2">
                <input type="text" class="person-name flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Name" required>
                <button type="button" class="remove-btn bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">Remove Person</button>
            </div>
            <div class="person-items space-y-2">
                <div class="item-input flex space-x-4">
                    <input type="number" class="item-cost flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" step="0.01" min="0" placeholder="Item Cost ($)" required>
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
                <input type="number" class="item-cost flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" step="0.01" min="0" placeholder="Item Cost ($)" required>
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
                div.querySelector('.item-input').remove();
            } else {
                alert('Each person must have at least one item.');
            }
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');

        // Get inputs
        const totalBill = parseFloat(document.getElementById('totalBill').value);
        const taxAmount = parseFloat(document.getElementById('taxAmount').value);
        const tipPercent = parseFloat(document.getElementById('tipPercent').value);
        const people = Array.from(peopleInputs.querySelectorAll('.person-input')).map(div => {
            const name = div.querySelector('.person-name').value;
            const itemCosts = Array.from(div.querySelectorAll('.item-cost')).map(input => parseFloat(input.value));
            return { name, itemCosts };
        });

        // Validate inputs
        if (isNaN(totalBill) || isNaN(taxAmount) || isNaN(tipPercent) || totalBill < 0 || taxAmount < 0 || tipPercent < 0 || people.some(p => !p.name || p.itemCosts.some(c => isNaN(c) || c < 0))) {
            alert('Please fill all fields correctly with non-negative values.');
            return;
        }

        // Calculate
        const tipAmount = totalBill * (tipPercent / 100);
        const totalMealCost = people.reduce((sum, p) => sum + p.itemCosts.reduce((s, c) => s + c, 0), 0);

        if (totalMealCost === 0) {
            alert('Total meal cost cannot be zero.');
            return;
        }

        // Clear previous results
        resultBody.innerHTML = '';
        console.log('Calculating results:', { totalBill, taxAmount, tipPercent, totalMealCost });

        // Calculate and display results
        people.forEach(person => {
            const mealCost = person.itemCosts.reduce((sum, cost) => sum + cost, 0);
            const taxShare = (mealCost / totalMealCost) * taxAmount;
            const tipShare = (mealCost / totalMealCost) * tipAmount;
            const totalPerPerson = mealCost + taxShare + tipShare;

            const row = document.createElement('tr');
            row.className = 'border-t';
            row.innerHTML = `
                <td class="p-2 text-left">${person.name}</td>
                <td class="p-2">${mealCost.toFixed(2)}</td>
                <td class="p-2">${taxShare.toFixed(2)}</td>
                <td class="p-2">${tipShare.toFixed(2)}</td>
                <td class="p-2">${totalPerPerson.toFixed(2)}</td>
            `;
            resultBody.appendChild(row);
        });

        resultsDiv.classList.remove('hidden');
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
        console.log('Reset button clicked');
        form.reset();
        peopleInputs.innerHTML = '';
        personCount = 0;
        addPerson();
        resultsDiv.classList.add('hidden');
        resultBody.innerHTML = '';
    });

    // Collapsible sections
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Toggle button clicked for:', btn.getAttribute('data-target'));
            const targetId = btn.getAttribute('data-target');
            const target = document.getElementById(targetId);
            target.classList.toggle('collapsed');
            btn.textContent = target.classList.contains('collapsed') ? '▶' : '▼';
        });
    });
});
