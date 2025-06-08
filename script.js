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

    // Check if critical elements are missing
    if (!addPersonBtn || !addSharedItemBtn || !peopleInputs || !sharedItemsInputs) {
        console.error('One or more critical elements not found. Check HTML IDs.');
        return;
    }

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
                div.querySelector('.item-input').remove();
            } else {
                alert('Each person must have at least one item.');
            }
        });
    }

    // Add shared item
    addSharedItemBtn.addEventListener('click', () => {
        console.log('Add Shared Item button clicked');
        addSharedItem();
    });

    function addSharedItem() {
        sharedItemCount++;
        console.log('Adding shared item #', sharedItemCount);
        const div = document.createElement('div');
        div.className = 'shared-item-input bg-gray-50 p-4 rounded-lg';
        div.setAttribute('data-shared-item-id', sharedItemCount);
        div.innerHTML = `
            <div class="flex space-x-4 items-center mb-2">
                <label for="shared-item-cost-${sharedItemCount}" class="sr-only">Shared Item Cost ${sharedItemCount}</label>
                <input type="number" id="shared-item-cost-${sharedItemCount}" class="shared-item-cost flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" step="0.01" min="0" placeholder="Shared Item Cost ($)" required>
                <button type="button" class="remove-shared-item-btn bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">Remove Shared Item</button>
            </div>
            <div class="shared-item-people mt-2">
                <p class="text-gray-700 mb-2">Split with:</p>
                <div class="people-checkboxes space-y-2"></div>
            </div>
        `;
        sharedItemsInputs.appendChild(div);
        updateSharedItemCheckboxes(div);
        console.log('Shared item input added:', div);

        // Remove shared item
        div.querySelector('.remove-shared-item-btn').addEventListener('click', () => {
            console.log('Removing shared item #', div.getAttribute('data-shared-item-id'));
            div.remove();
            sharedItemCount--;
        });
    }

    function updateSharedItemCheckboxes(specificDiv = null) {
        console.log('Updating shared item checkboxes');
        const sharedItemInputs = specificDiv ? [specificDiv] : sharedItemsInputs.querySelectorAll('.shared-item-input');
        const people = peopleInputs.querySelectorAll('.person-input');
        sharedItemInputs.forEach(sharedItem => {
            const checkboxContainer = sharedItem.querySelector('.people-checkboxes');
            if (!checkboxContainer) {
                console.error('Checkbox container not found for shared item:', sharedItem);
                return;
            }
            checkboxContainer.innerHTML = '';
            if (people.length === 0) {
                console.log('No people to add checkboxes for');
                return;
            }
            people.forEach(person => {
                const personId = person.getAttribute('data-person-id');
                const personName = person.querySelector('.person-name').value || `Person ${personId}`;
                const checkboxDiv = document.createElement('div');
                checkboxDiv.className = 'flex items-center';
                checkboxDiv.innerHTML = `
                    <input type="checkbox" id="shared-item-${sharedItem.getAttribute('data-shared-item-id')}-person-${personId}" class="shared-person-checkbox" value="${personId}" checked>
                    <label for="shared-item-${sharedItem.getAttribute('data-shared-item-id')}-person-${personId}" class="ml-2 text-gray-700">${personName}</label>
                `;
                checkboxContainer.appendChild(checkboxDiv);
            });
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');

        // Get inputs
        const subtotal = parseFloat(document.getElementById('subtotal').value);
        const taxAmount = parseFloat(document.getElementById('taxAmount').value);
        const tipPercent = parseFloat(document.getElementById('tipPercent').value);
        const people = Array.from(peopleInputs.querySelectorAll('.person-input')).map(div => {
            const name = div.querySelector('.person-name').value.trim();
            const itemCosts = Array.from(div.querySelectorAll('.item-cost')).map(input => parseFloat(input.value));
            return { name, itemCosts, personId: div.getAttribute('data-person-id') };
        });
        const sharedItems = Array.from(sharedItemsInputs.querySelectorAll('.shared-item-input')).map(div => {
            const cost = parseFloat(div.querySelector('.shared-item-cost').value);
            const selectedPeople = Array.from(div.querySelectorAll('.shared-person-checkbox:checked')).map(checkbox => checkbox.value);
            return { cost, selectedPeople };
        });

        // Validate inputs
        if (
            isNaN(subtotal) || isNaN(taxAmount) || isNaN(tipPercent) ||
            subtotal < 0 || taxAmount < 0 || tipPercent < 0 ||
            people.some(p => !p.name || p.itemCosts.some(c => isNaN(c) || c < 0)) ||
            sharedItems.some(s => isNaN(s.cost) || s.cost < 0 || s.selectedPeople.length === 0)
        ) {
            alert('Please fill all fields correctly with non-negative values and select at least one person for each shared item.');
            return;
        }

        // Calculate shared costs per person
        const sharedCostsPerPerson = {};
        people.forEach(p => sharedCostsPerPerson[p.personId] = 0);
        sharedItems.forEach(item => {
            const share = item.cost / item.selectedPeople.length;
            item.selectedPeople.forEach(personId => {
                sharedCostsPerPerson[personId] = (sharedCostsPerPerson[personId] || 0) + share;
            });
        });

        // Calculate total meal cost (individual + shared)
        const totalMealCost = people.reduce((sum, p) => {
            const individualCost = p.itemCosts.reduce((s, c) => s + c, 0);
            return sum + individualCost + (sharedCostsPerPerson[p.personId] || 0);
        }, 0);
        if (totalMealCost === 0) {
            alert('Total meal cost cannot be zero.');
            return;
        }

        // Validate subtotal matches total meal cost
        if (Math.abs(totalMealCost - subtotal) > 0.01) {
            alert('Sum of individual and shared item costs must match the subtotal.');
            return;
        }

        // Calculate tip to make total bill a whole dollar
        const initialTipAmount = subtotal * (tipPercent / 100);
        const totalBillBeforeRounding = subtotal + taxAmount + initialTipAmount;
        const roundedTotalBill = Math.round(totalBillBeforeRounding);
        const adjustedTipAmount = roundedTotalBill - subtotal - taxAmount;
        const adjustedTipPercent = (adjustedTipAmount / subtotal) * 100;

        // Calculate shares
        let totalMealCostSum = 0;
        let totalSharedCostSum = 0;
        let totalTaxShare = 0;
        let totalTipShare = 0;
        let totalPerPersonSum = 0;

        // Clear previous results
        resultBody.innerHTML = '';
        resultFooter.innerHTML = '';

        // Calculate and display results
        people.forEach(person => {
            const individualCost = person.itemCosts.reduce((sum, cost) => sum + cost, 0);
            const sharedCost = sharedCostsPerPerson[person.personId] || 0;
            const mealCost = individualCost + sharedCost;
            const taxShare = (mealCost / totalMealCost) * taxAmount;
            const tipShare = (mealCost / totalMealCost) * adjustedTipAmount;
            const totalPerPerson = mealCost + taxShare + tipShare;

            // Update totals
            totalMealCostSum += individualCost;
            totalSharedCostSum += sharedCost;
            totalTaxShare += taxShare;
            totalTipShare += tipShare;
            totalPerPersonSum += totalPerPerson;

            const row = document.createElement('tr');
            row.className = 'border-t';
            row.innerHTML = `
                <td class="p-2 text-left">${person.name}</td>
                <td class="p-2">${individualCost.toFixed(2)}</td>
                <td class="p-2">${sharedCost.toFixed(2)}</td>
                <td class="p-2">${taxShare.toFixed(2)}</td>
                <td class="p-2">${tipShare.toFixed(2)}</td>
                <td class="p-2">${totalPerPerson.toFixed(2)}</td>
            `;
            resultBody.appendChild(row);
        });

        // Add totals row
        const footerRow = document.createElement('tr');
        footerRow.className = 'bg-gray-200 font-semibold';
        footerRow.innerHTML = `
            <td class="p-2 text-left">Total</td>
            <td class="p-2">${totalMealCostSum.toFixed(2)}</td>
            <td class="p-2">${totalSharedCostSum.toFixed(2)}</td>
            <td class="p-2">${totalTaxShare.toFixed(2)}</td>
            <td class="p-2">${totalTipShare.toFixed(2)}</td>
            <td class="p-2">${totalPerPersonSum.toFixed(2)}</td>
        `;
        resultFooter.appendChild(footerRow);

        // Display summary
        summary.textContent = `Total Bill: $${roundedTotalBill.toFixed(2)} (Subtotal: $${subtotal.toFixed(2)}, Tax: $${taxAmount.toFixed(2)}, Tip: $${adjustedTipAmount.toFixed(2)} at ${adjustedTipPercent.toFixed(1)}%)`;

        resultsDiv.classList.remove('hidden');
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
        console.log('Reset button clicked');
        form.reset();
        peopleInputs.innerHTML = '';
        sharedItemsInputs.innerHTML = '';
        personCount = 0;
        sharedItemCount = 0;
        addPerson();
        resultsDiv.classList.add('hidden');
        resultBody.innerHTML = '';
        resultFooter.innerHTML = '';
        summary.textContent = '';
    });

    // Collapsible sections
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Toggle button clicked for:', btn.getAttribute('data-target'));
            const targetId = btn.getAttribute('data-target');
            const target = document.getElementById(targetId);
            target.classList.toggle('collapsed');
            btn.textContent = target.classList.contains('collapsed') ? '▶' : '▼';
            btn.setAttribute('aria-expanded', !target.classList.contains('collapsed'));
        });
    });
});
