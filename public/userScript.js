// User Script

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
            alert('User added successfully!');
        },
        error: function (error) {
            alert('Error adding user: ' + error.responseJSON.message);
        }
    });
});
