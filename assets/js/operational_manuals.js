var base_url = document.getElementById('base_url').value;

function add_operational_main_cat() {
    if (!requiredValidation('add-operational-main-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-operational-main-cat-form'));
    //var form_data = $('#add-operational-main-cat-form').serialize();
    console.log(form_data);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'operational_manuals/insert_operational_manuals_category',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Main Category Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'operational_manuals/operational_manuals_category');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Main Category", "error");
            } else {
                swal("ERROR!", "Main Category Already Exists", "error");
            }
        }
    });
}

function edit_operational_main_cat() {
    if (!requiredValidation('edit-operational-main-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-operational-main-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'operational_manuals/update_operational_manuals_category',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Main Category Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'operational_manuals/operational_manuals_category');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Main Category", "error");
            } else {
                swal("ERROR!", "Main Category Already Exists", "error");
            }
        }
    });
}

function edit_operational_manual() {
    if (!requiredValidation('edit-operational-manual-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-operational-manual-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'operational_manuals/update_operational_manuals',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Operational Manual Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'operational_manuals/');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Operational Manual", "error");
            } else {
                swal("ERROR!", "Operational Manual Already Exists", "error");
            }
        }
    });
}

function delete_operational_manual(id){
    // alert(id);
    swal({
        title: "Are you sure want to delete?",
        text: "You will not be able to recover this operational manual type!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'operational_manuals/delete_operational_manuals',
            data: {
                id: id
            },
            success: function (result) {
                if (result == "1") {
                    swal({
                        title: "Success!",
                        "text": "Operational manuals been deleted successfully!",
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'operational_manuals/');
                    });
                } else {
                    swal("ERROR!", "Unable To Delete Operational Manual", "error");
                }
            }
        });
    });
}

function add_operational_sub_cat(){
    if (!requiredValidation('add-sub-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-sub-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'operational_manuals/insert_operational_manuals_subcategory',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Sub Category Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'operational_manuals/operational_manuals_subcategory');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Sub Category", "error");
            } else {
                swal("ERROR!", "Sub Category Already Exists", "error");
            }
        }
    });
}



function delete_operational_main_cat(cat_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "You will not be able to recover this main category!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'operational_manuals/delete_operational_manuals_category',
            data: {
                cat_id: cat_id
            },
            success: function (result) {
                if (result == "1") {
                    swal({
                        title: "Success!",
                        "text": "Main Category been deleted successfully!",
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'operational_manuals/operational_manuals_category');
                    });
                } else {
                    swal("ERROR!", "Unable to delete this Main Category!!", "error");
                }
            }
        });
    });
}

function edit_operational_sub_cat() {
    if (!requiredValidation('edit-sub-cat-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-sub-cat-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'operational_manuals/update_operational_manuals_subcategory',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Sub Category Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'operational_manuals/operational_manuals_subcategory');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Sub Category", "error");
            } else {
                swal("ERROR!", "Sub Category Already Exists", "error");
            }
        }
    });
}

function delete_operational_sub_cat(cat_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "You will not be able to recover this sub category!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'operational_manuals/delete_operational_manuals_subcategory',
            data: {
                cat_id: cat_id
            },
            success: function (result) {
                if (result == "1") {
                    swal({
                        title: "Success!",
                        "text": "Sub Category been deleted successfully!",
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'operational_manuals/operational_manuals_subcategory');
                    });
                } else {
                    swal("ERROR!", "Unable to delete this Sub Category!!", "error");
                }
            }
        });
    });
}

function add_operational_manual() {
    if (!requiredValidation('form_add_operaional_manual')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_add_operaional_manual'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'operational_manuals/insert_operational_manuals',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Operational Manual Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'operational_manuals/');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Operational Manual", "error");
            }
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
//            $(".save_btn").removeAttr('disabled').html('Save Changes');
            closeLoading();
        }
    });
}

function get_operational_manual_sub_cats() {
    var main_cat = $("#main_cat option:selected").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'operational_manuals/get_subcat_by_maincat',
        data: {
            main_cat: main_cat
        },
        success: function (result) {
            $(".subcat").html(result);
        }
    });
}


function add_operation_title() {
    if (!requiredValidation('add-operational-main-title-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-operational-main-title-form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'operational_manuals/insert_operational_manuals_title',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            if (result == 1) {
                swal("Success!", "Successfully added!", "success");
                goURL(base_url + 'operational_manuals');
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
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

function add_operation_sub_title() {
    if (!requiredValidation('add-operational-sub-title-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-operational-sub-title-form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'operational_manuals/insert_operational_manuals_sub_title',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            if (result == 1) {
                swal("Success!", "Successfully added!", "success");
                goURL(base_url + 'operational_manuals');
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
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

function deleteTitle(id){
    $.get(base_url + "operational_manuals/check_if_subtitle_exists/" + id, function (result) {
        if (result != 0) {
            swal({
                title: "Error",
                text: "Title Is Associated. Can Not Delete!!",
                type: "error"
            });
        } else {
            swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover this title!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                    function () {
                        $.ajax({
                            type: 'POST',
                            url: base_url + 'operational_manuals/delete_title',
                            data: {
                                id: id
                            },
                            success: function (result) {
                                if (result == "1") {
                                    swal({
                                        title: "Success!",
                                        "text": "Title been deleted successfully!",
                                        "type": "success"
                                    }, function () {
                                        goURL(base_url + 'operational_manuals');
                                    });
                                } else {
                                    swal("ERROR!", "Unable to delete this title", "error");
                                }
                            }
                        });
                    });
          }
    });
}

function deleteSubtitle(id){
    swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover this subtitle!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                    function () {
                        $.ajax({
                            type: 'POST',
                            url: base_url + 'operational_manuals/delete_subtitle',
                            data: {
                                id: id
                            },
                            success: function (result) {
                                if (result == "1") {
                                    swal({
                                        title: "Success!",
                                        "text": "Subtitle been deleted successfully!",
                                        "type": "success"
                                    }, function () {
                                        goURL(base_url + 'operational_manuals');
                                    });
                                } else {
                                    swal("ERROR!", "Unable to delete this subtitle", "error");
                                }
                            }
                        });
                    }); 
}

function addForms(){
     if (!requiredValidation('add_operational_forms')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add_operational_forms'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'operational_manuals/insert_operational_forms',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Operational Form Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'operational_manuals/forms');
                });
            } else {
                swal("ERROR!", "Unable To Add Operational Form", "error");
            }
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
//            $(".save_btn").removeAttr('disabled').html('Save Changes');
            closeLoading();
        }
    });
}
