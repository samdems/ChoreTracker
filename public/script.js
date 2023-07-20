// Function to add a new user to the list
function addUserToList(user) {
    $('#userList').append(`<li class="list-group-item">${user.name} - Total Debt: ${user.totalDebt}</li>`);
}

// Function to add a new chore to the list
function addChoreToList(chore) {
    $('#choreList').append(`<li class="list-group-item">${chore.name} - Cost: ${chore.cost}</li>`);
}

// Function to update user and chore lists
function updateLists() {
    // Clear the current lists
    $('#userList').empty();
    $('#choreList').empty();

    // Fetch updated user and chore lists from the server
    $.get('/users', function (users) {
        users.forEach(function (user) {
            addUserToList(user);
        });
    });

    $.get('/chores', function (chores) {
        chores.forEach(function (chore) {
            addChoreToList(chore);
        });
    });
}

// Populate User IDs and Chore IDs
function populateSelectLists() {
    // Fetch User IDs and populate the User ID select list
    $.get('/users', function (users) {
        const $addDebtUserIdSelect = $('#addDebtUserId');
        $addDebtUserIdSelect.empty();
        users.forEach(function (user) {
            $addDebtUserIdSelect.append(`<option value="${user.id}">${user.id} - ${user.name}</option>`);
        });
    });

    // Fetch Chore IDs and populate the Chore ID select list
    $.get('/chores', function (chores) {
        const $addDebtChoreIdSelect = $('#addDebtChoreId');
        $addDebtChoreIdSelect.empty();
        chores.forEach(function (chore) {
            $addDebtChoreIdSelect.append(`<option value="${chore.id}">${chore.id} - ${chore.name}</option>`);
        });
    });
}

// Call the function to populate the select lists and update user and chore lists on page load
$(document).ready(function () {
    populateSelectLists();
    updateLists();
});

// Add User
$('#addUserForm').submit(function (event) {
    event.preventDefault();

    const userName = $('#userName').val();
    const userDebt = parseInt($('#userDebt').val());

    $.ajax({
        url: '/users',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name: userName, totalDebt: userDebt }),
        success: function (data) {
            addUserToList(data);
            populateSelectLists(); // Refresh the User ID select list
        },
        error: function (error) {
            alert('Error adding user: ' + error.responseJSON.message);
        }
    });
});

// Add Chore
$('#addChoreForm').submit(function (event) {
    event.preventDefault();

    const choreName = $('#choreName').val();
    const choreCost = parseInt($('#choreCost').val());

    $.ajax({
        url: '/chores',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name: choreName, cost: choreCost }),
        success: function (data) {
            addChoreToList(data);
            populateSelectLists(); // Refresh the Chore ID select list
        },
        error: function (error) {
            alert('Error adding chore: ' + error.responseJSON.message);
        }
    });
});

// Add Debt
$('#addDebtForm').submit(function (event) {
    event.preventDefault();

    const userId = parseInt($('#addDebtUserId').val());
    const choreId = parseInt($('#addDebtChoreId').val());

    $.ajax({
        url: `/add-debt/${userId}/${choreId}`,
        method: 'POST',
        contentType: 'application/json',
        success: function (data) {
            alert(data.message);
            updateLists(); // Update user and chore lists after adding debt
        },
        error: function (error) {
            alert('Error adding debt: ' + error.responseJSON.message);
        }
    });
});
