// addDebtScript.js

// Function to populate the User ID and Chore ID select lists
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

// Function to handle form submission
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
        },
        error: function (error) {
            alert('Error adding debt: ' + error.responseJSON.message);
        }
    });
});

// Call the function to populate the select lists on page load
$(document).ready(function () {
    populateSelectLists();
});
