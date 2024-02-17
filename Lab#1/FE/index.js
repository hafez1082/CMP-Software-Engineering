function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', function (event) {
  event.preventDefault();
  createEmployee();
});

// TODO
// add event listener to delete button
document.getElementById('dataTable').addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
    const employeeId = event.target.closest('tr').querySelector('td:first-child').textContent;
    deleteEmployee(employeeId);
  }
});

// TODO
function createEmployee() {
  const nameInput = document.getElementById('name').value;
  const idInput = document.getElementById('id').value;

  if (nameInput && idInput) {
    const data = {
      name: nameInput,
      id: idInput
    };

    fetch('http://localhost:3000/api/v1/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(() => {
        fetchEmployees();
      })
      .catch(error => console.error(error));
  }
  // get data from input field
  // send data to BE
  // call fetchEmployees
}

// TODO
function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(() => {
      fetchEmployees();
    })
    .catch(error => console.error(error));
  // get id
  // send id to BE
  // call fetchEmployees
}

fetchEmployees()
