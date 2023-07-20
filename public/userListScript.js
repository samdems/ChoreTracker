// userListScript.js

// Function to add a user to the list
function addUserToList(user) {
    $('#userList').append(`
        <li class="list-group-item">
            ${user.name} - Total Debt: ${user.totalDebt}
            <button class="btn btn-danger btn-sm ms-2" onclick="deleteUser(${user.id})">Delete</button>
        </li>
    `);
}

// Function to populate the user list
function populateUserList() {
    // Fetch users from the server
    $.get('/users', function (users) {
        users.forEach(function (user) {
            addUserToList(user);
        });
    });
}

// Function to delete a user
function deleteUser(userId) {
    $.ajax({
        url: `/users/${userId}`,
        method: 'DELETE',
        success: function (data) {
            alert(data.message);
            // After successful deletion, update the user list
            populateUserList();
        },
        error: function (error) {
            alert('Error deleting user: ' + error.responseJSON.message);
        }
    });
}

// Call the function to populate the user list on page load
$(document).ready(function () {
    populateUserList();
});
