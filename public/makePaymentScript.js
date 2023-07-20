// makePaymentScript.js

// Function to populate the User ID select list
function populateUserList() {
    // Fetch User IDs and populate the User ID select list
    $.get('/users', function (users) {
        const $makePaymentUserIdSelect = $('#makePaymentUserId');
        $makePaymentUserIdSelect.empty();
        users.forEach(function (user) {
            $makePaymentUserIdSelect.append(`<option value="${user.id}">${user.id} - ${user.name}</option>`);
        });
    });
}

// Function to handle form submission
$('#makePaymentForm').submit(function (event) {
    event.preventDefault();

    const userId = parseInt($('#makePaymentUserId').val());
    const amount = parseFloat($('#paymentAmount').val());

    $.ajax({
        url: `/make-payment/${userId}`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ amount: amount }),
        success: function (data) {
            alert(data.message);
        },
        error: function (error) {
            alert('Error making payment: ' + error.responseJSON.message);
        }
    });
});

// Call the function to populate the User ID select list on page load
$(document).ready(function () {
    populateUserList();
});
