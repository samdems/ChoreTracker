// Chore Script

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
            alert('Chore added successfully!');
        },
        error: function (error) {
            alert('Error adding chore: ' + error.responseJSON.message);
        }
    });
});
