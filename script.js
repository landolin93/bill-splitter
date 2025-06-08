body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f4;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.section {
    margin-bottom: 20px;
}

h1, h2 {
    margin: 10px 0;
    display: flex;
    align-items: center;
}

.toggle-btn {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
}

.section-content {
    transition: max-height 0.3s ease-out;
    overflow: hidden;
}

.section-content.collapsed {
    max-height: 0;
    padding: 0;
}

.input-group {
    margin: 10px 0;
}

label {
    display: inline-block;
    width: 150px;
}

input, button {
    padding: 8px;
    margin: 5px 0;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
}

button:hover {
    background-color: #45a049;
}

#resetBtn {
    background-color: #f44336;
    margin-left: 10px;
}

#resetBtn:hover {
    background-color: #da190b;
}

#peopleInputs {
    margin: 10px 0;
}

.person-input {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
}

.person-input-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.person-items {
    margin-left: 20px;
}

.item-input {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.item-input input {
    flex: 1;
}

.remove-btn, .remove-item-btn {
    background-color: #f44336;
}

.remove-btn:hover, .remove-item-btn:hover {
    background-color: #da190b;
}

.add-item-btn {
    background-color: #2196F3;
    margin-left: 20px;
}

.add-item-btn:hover {
    background-color: #1976D2;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: right;
}

th {
    background-color: #4CAF50;
    color: white;
}

td:first-child {
    text-align: left;
}

.hidden {
    display: none;
}

.button-group {
    margin-top: 10px;
}

@media (max-width: 600px) {
    label {
        width: 100%;
        display: block;
    }
    input, button {
        width: 100%;
    }
    .person-input-header, .item-input {
        flex-direction: column;
    }
}
