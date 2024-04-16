var base_url = document.getElementById('base_url').value;

function saveMessage(messageType) {
    if (!requiredValidation('form_save_message')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('form_save_message'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'messages/save_message',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "0") {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal({title: "Success!", text: "Successfully saved!", type: "success"}, function () {
                    goURL(base_url + 'messages/index/' + messageType);
                });
            }
        }
    });
}

function readMessage(messageID, messageType) {
    swal({
        title: 'Are you sure?',
        text: "You want to remove this message!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Remove!'
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: 'POST',
                url: base_url + 'messages/read_message',
                data: {
                    message_id: messageID,
                    message_type: messageType
                }, success: function (result) {
                    if (result.trim() == "0") {
                        swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                    } else {
                        swal({title: "Success!", text: "Successfully removed!", type: "success"}, function () {
                            goURL(base_url + 'messages/index/' + messageType);
                        });
                    }
                },
                beforeSend: function () {
                    openLoading();
                },
                complete: function (msg) {
                    closeLoading();
                }
            });
        }
    });
}