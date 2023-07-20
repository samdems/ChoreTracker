// choreListScript.js

// Function to add a chore to the list
function addChoreToList(chore) {
    $('#choreList').append(`
        <li class="list-group-item">
            ${chore.name} - Cost: ${chore.cost}
            <button class="btn btn-danger btn-sm ms-2" onclick="deleteChore(${chore.id})">Delete</button>
        </li>
    `);
}

// Function to populate the chore list
function populateChoreList() {
    // Fetch chores from the server
    $.get('/chores', function (chores) {
        chores.forEach(function (chore) {
            addChoreToList(chore);
        });
    });
}

// Function to delete a chore
function deleteChore(choreId) {
    $.ajax({
        url: `/chores/${choreId}`,
        method: 'DELETE',
        success: function (data) {
            alert(data.message);
            // After successful deletion, update the chore list
            populateChoreList();
        },
        error: function (error) {
            alert('Error deleting chore: ' + error.responseJSON.message);
        }
    });
}

// Call the function to populate the chore list on page load
$(document).ready(function () {
    populateChoreList();
});
