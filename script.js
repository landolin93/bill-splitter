document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('billForm');
    const addPersonBtn = document.getElementById('addPerson');
    const peopleInputs = document.getElementById('peopleInputs');
    const resultsDiv = document.getElementById('results');
    const resultBody = document.getElementById('resultBody');
    let personCount = 0;

    // Add initial person input
    addPerson();

    // Add person input fields
    addPersonBtn.addEventListener('click', addPerson);

    function addPerson() {
        personCount++;
        const div = document.createElement('div');
        div.className = 'person-input';
        div.innerHTML = `
            <input type="text" class="person-name" placeholder="Name" required>
            <input type="number" class="person-cost" step="0.01" min="0" placeholder="Meal Cost ($)" required>
            <button type="button" class="remove-btn">Remove</button>
        `;
        peopleInputs.appendChild(div);

        // Add remove button functionality
        div.querySelector('.remove-btn').addEventListener('click', () => {
            if (personCount > 1) {
                div.remove();
                personCount--;
            } else {
                alert('At least one person is required.');
            }
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get inputs
        const totalBill = parseFloat(document.getElementById('totalBill').value);
        const taxAmount = parseFloat(document.getElementById('taxAmount').value);
        const tipPercent = parseFloat(document.getElementById('tipPercent').value);
        const people = Array.from(peopleInputs.querySelectorAll('.person-input')).map(div => ({
            name: div.querySelector('.person-name').value,
            mealCost: parseFloat(div.querySelector('.person-cost').value)
        }));

        // Validate inputs
        if (isNaN(totalBill) || isNaN(taxAmount) || isNaN(tipPercent) || people.some(p => !p.name || isNaN(p.mealCost))) {
            alert('Please fill all fields correctly.');
            return;
        }

        // Calculate
        const tipAmount = totalBill * (tipPercent / 100);
        const taxPerPerson = taxAmount / people.length;
        const tipPerPerson = tipAmount / people.length;

        // Clear previous results
        resultBody.innerHTML = '';

        // Display results
        people.forEach(person => {
            const totalPerPerson = person.mealCost + taxPerPerson + tipPerPerson;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${person.name}</td>
                <td>${person.mealCost.toFixed(2)}</td>
                <td>${taxPerPerson.toFixed(2)}</td>
                <td>${tipPerPerson.toFixed(2)}</td>
                <td>${totalPerPerson.toFixed(2)}</td>
            `;
            resultBody.appendChild(row);
        });

        resultsDiv.classList.remove('hidden');
    });
});
