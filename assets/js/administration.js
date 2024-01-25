var base_url = document.getElementById('base_url').value;

function update_departments() {
    if (!requiredValidation('edit_dept_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('edit_dept_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/departments/update_departments',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            if (result == 1) {
                swal("Success!", "Successfully updated!", "success");
                goURL(base_url + 'administration/departments');
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

function insert_departments() {
    if (!requiredValidation('add_dept_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('add_dept_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/departments/insert_departments',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            if (result == 1) {
                swal("Success!", "Successfully added!", "success");
                goURL(base_url + 'administration/departments');
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

function add_franchise() {
    if (!requiredValidation('form_office_modal')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('form_office_modal'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/insert_franchise',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            if (result == 1) {
                swal("Success!", "Successfully inserted!", "success");
                goURL(base_url + 'administration/office');
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

function update_franchise() {
    if (!requiredValidation('form_office_modal')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('form_office_modal'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/update_franchise',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            if (result == 1) {
                save_office_manager();
                swal("Success!", "Successfully updated!", "success");
                goURL(base_url + 'administration/office');
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

function update_merchant_details() {
    if (!requiredValidation('office_merchant_form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('office_merchant_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/update_merchant_details',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            if (result == 1) {
                save_office_manager();
                swal("Success!", "Successfully updated!", "success");
                goURL(base_url + 'administration/office');
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


function save_service_fees() {
    $(".percentage").removeAttr("disabled");
    var form_data = new FormData(document.getElementById('filter-form'));
    var office_id = $('#franchise_office_id').val();
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/save_service_fees',
        data: form_data,
        // enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // console.log(result);return false;
            if (result == 1) {
                // save_office_manager();
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'administration/office/show_office_edit_info/'+office_id);
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

function cancel_office() {
    goURL('../index');
}

function insert_staff() {
    if (!requiredValidation('add_staff_form')) {
        return false;
    }
    var password = $("#password").val();
    var retype_password = $("#retype_password").val();

    if (retype_password != "" && password != retype_password) {
        swal("ERROR!", "Password Mismatch! \n Please, try again.", "error");
        return false;

    }
    var form_data = new FormData(document.getElementById('add_staff_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/manage_staff/insert_staff',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully added staff!", "success");
                goURL(base_url + 'administration/manage_staff');
            }
        }
    });
}

 function insert_brands()
{
    if (!requiredValidation('add_brands_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('add_brands_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/insert_brands',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully added brands!", "success");
                goURL(base_url + 'administration/office/view_brands');
            }
        }
    });
}

function insert_language()
{
    if (!requiredValidation('add_language_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('add_language_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/insert_language',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully added Language!", "success");
                goURL(base_url + 'administration/office/manage_languages');
            }
        }
    });
}
 
function insert_tab_labels()
{
    if (!requiredValidation('add_tab_labels_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('add_tab_labels_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/insert_tab_labels',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully Added Tag Labels!", "success");
                goURL(base_url + 'administration/office/manage_tag_labels');
            }
        }
    });
}
function update_language()
{
    if (!requiredValidation('edit_language_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('edit_language_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/update_language',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully update Language!", "success");
                goURL(base_url + 'administration/office/manage_languages');
            }
        }
    });
}
function update_tab_labels() {
    if (!requiredValidation('edit_tab_labels_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('edit_tab_labels_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/update_tab_labels',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully Update Tag Labels!", "success");
                goURL(base_url + 'administration/office/manage_tag_labels');
            }
        }
    });
}
function delete_tab_labels(id)
{
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this Tag Labels!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'administration/office/delete_tab_labels',
            data: {
                tab_id: id
            },
            success: function (result) {
                if (result == "1") {
                    swal({
                        title: "Success!",
                        "text": "Tag Labels been deleted successfully!",
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'administration/office/manage_tag_labels');
                    });
                } else {
                    swal("ERROR!", "Unable to delete this Tab Labels", "error");
                }
            }
        });
    });
}
function update_brand()
{
    if (!requiredValidation('edit_brands_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('edit_brands_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/update_brand',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully update brands!", "success");
                goURL(base_url + 'administration/office/view_brands');
            }
        }
    });
}

function delete_brand(id)
{

    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this brand!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'administration/office/delete_brand',
            data: {
                brand_id: id
            },
            success: function (result) {
                if (result == "1") {
                    swal({
                        title: "Success!",
                        "text": "Brand been deleted successfully!",
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'administration/office/view_brands');
                    });
                } else {
                    swal("ERROR!", "Unable to delete this brands", "error");
                }
            }
        });
    });
}
function delete_language(id)
{
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this Language!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'administration/office/delete_language',
            data: {
                lan_id: id
            },
            success: function (result) {
                if (result == "1") {
                    swal({
                        title: "Success!",
                        "text": "Language been deleted successfully!",
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'administration/office/manage_languages');
                    });
                } else {
                    swal("ERROR!", "Unable to delete this Language", "error");
                }
            }
        });
    });
}

function update_staff() {
    if (!requiredValidation('edit_staff_form')) {
        return false;
    }
    var password = $("#password").val();
    var retype_password = $("#retype_password").val();
    
    var office_id = $("#ofc_id").val();
    var rowid = $("#rowid").val();

    if (retype_password != "" && password != retype_password) {
        swal("ERROR!", "Password Mismatch! \n Please, try again.", "error");
        return false;

    }
    var form_data = new FormData(document.getElementById('edit_staff_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/manage_staff/update_staff',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                if(office_id == ''){
                swal({ title: "Success!", text: "Successfully updated staff!", type: "success" }, function () { 
                 goURL(base_url + 'administration/manage_staff/show_staff_edit_info/'+rowid);

                });

                //goURL(base_url + 'administration/manage_staff');
            }else{
                swal("Success!", "Successfully updated staff!", "success");
                goURL(base_url + 'administration/office/show_office_edit_info/'+office_id);
            }
            }
        }
    });

}


function get_related_services(previous_services, current_service) {
    var service_id = $("#servicecat").find(":selected").val();
    $.post(base_url + "/administration/service_setup/get_related_services", {
        id: service_id,
        prev: previous_services,
        current: current_service
    }, function (data) {
        $("#relatedserv option").remove();
        $("#relatedserv").append(data);
    });
}

function addPartnerService() {
    if (!requiredValidation('add-partner-services-form')) {
        return false;
    }
    var servicecat = $('#add-partner-services-form #servicecat option:selected').val();
    var servicename = $('#add-partner-services-form #servicename').val();
    var input_form = $('#add-partner-services-form input[name="input_form"]:checked').val();
    var shortcode = $('#add-partner-services-form #shorthidden').val();
    var note = $('#add-partner-services-form #note').val();
    var responsible_assigned = $('#add-partner-services-form input[name="responsible_assigned"]:checked').val();
    var partnertype = $('#add-partner-services-form #partnertype option:selected').val();
    
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/partner_service_setup/add_partner_service',
        data: {
            category_id:servicecat,
            description : servicename,
            ideas : shortcode,
            responsible_assigned : responsible_assigned,
            partner_type : partnertype,
            input_form : input_form,
            note : note   
        },
        success: function (result) {
            if (result.trim() == "1") {
                swal({
                    title: "Success!",
                    "text": "Successfully added!",
                    "type": "success"
                }, function () {
                    goURL(base_url + 'administration/partner_service_setup');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Partner Service", "error");
            } else if (result.trim() == "0") {
                swal("ERROR!", "Service Name Exists", "error");
            }
        }
    });       
}

function addRelatedservice() {
    if (!requiredValidation('add-services-form')) {
        return false;
    }

    var servicecat = $('#add-services-form #servicecat option:selected').val();
    var servicename = $('#add-services-form #servicename').val();
    var serviceicon = $('#add-services-form #serviceicon').val();
    var retailprice = $('#add-services-form #retailprice').val();
    var relatedserv = $('#add-services-form #relatedserv').val();
    var startdays = $('#add-services-form #startdays').val();
    var enddays = $('#add-services-form #enddays').val();
    var input_form = $('#add-services-form input[name="input_form"]:checked').val();
    var is_recurring = $('#add-services-form input[name="is_recurring"]:checked').val();
    var will_create_project = $('#add-services-form input[name="will_create_project"]:checked').val();
    if (will_create_project === undefined) {
        will_create_project = 'n';
    }
    var shortcode = $('#add-services-form #shorthidden').val();
    var note = $('#add-services-form #note').val();
    var fixedcost = $('#add-services-form #fixedcost').val();
    var servicedes = CKEDITOR.instances.servicedes.getData();

    var responsible_assigned = $('#add-services-form input[name="responsible_assigned"]:checked').val();
    if(responsible_assigned == 2){
        var francise_staff = "NULL";
        var dept = $('#add-services-form #dept option:selected').val();  
    }else{
        var dept = "NULL";
        var francise_staff = $('#add-services-form #francise_staff option:selected').val();   
    }

    var client_type = [];
            $.each($("input[name='client_type']:checked"), function(){
                client_type.push($(this).val());
            });
    if(client_type == 0){
        client_type = 0;
    }else if(client_type == 1){
        client_type = 1;
    }else if(client_type == "0,1"){
        client_type = 2;
    }
   
    $.ajax({
        type: "POST",
        data: {
            servicecat: servicecat,
            servicename: servicename,
            serviceicon: serviceicon,
            retailprice: retailprice,
            relatedserv: relatedserv,
            startdays: startdays,
            enddays: enddays,
            dept: dept,
            input_form: input_form,
            shortcode: shortcode,
            note: note,
            fixedcost: fixedcost,
            responsible_assigned:responsible_assigned,
            client_type: client_type,
            is_recurring: is_recurring,
            servicedes: servicedes,
            will_create_project:will_create_project,
            francise_staff:francise_staff
        },
        url: base_url + '/administration/service_setup/add_related_service',
        dataType: "html",
        success: function (result) {
            if (result > 0) {
                swal({
                    title: "Success!",
                    "text": "Successfully added!",
                    "type": "success"
                }, function () {
                    $('#service_task_btn').val(result);
                    $('#service_task_btn').prop('disabled', false);
                    $("#nav-link-2").trigger("click");
                    // goURL(base_url + 'administration/service_setup');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Service", "error");
            } else if (result.trim() == "0") {
                swal("ERROR!", "Service Name Exists", "error");
            }
        }
    });
}

function delete_service(id) {
    $.get(base_url + "administration/service_setup/get_service_relations/" + id, function (result) {
        if (result != 0) {
            swal({
                title: "Error",
                text: "Service Is Used. Can Not Delete!!",
                type: "error"
            });
        } else {
            swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover this service!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                    function () {
                        $.ajax({
                            type: 'POST',
                            url: base_url + '/administration/service_setup/delete_service_controller',
                            data: {
                                service_id: id
                            },
                            success: function (result) {
                                if (result == "1") {
                                    swal({
                                        title: "Success!",
                                        "text": "Service been deleted successfully!",
                                        "type": "success"
                                    }, function () {
                                        goURL(base_url + 'administration/service_setup');
                                    });
                                } else {
                                    swal("ERROR!", "Unable to delete the service", "error");
                                }
                            }
                        });
                    });
        }
    });
}

function delete_department(id) {
    $.get(base_url + "administration/departments/get_department_relations/" + id, function (result) {
        if (result != 0) {
            swal({
                title: "Error",
                text: "Department Is In Use. Can Not Delete!!",
                type: "error"
            });
        } else {
            swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover this department!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                    function () {
                        $.ajax({
                            type: 'POST',
                            url: base_url + '/administration/departments/delete_department',
                            data: {
                                department_id: id
                            },
                            success: function (result) {
                                if (result == "1") {
                                    swal({
                                        title: "Success!",
                                        "text": "Service been deleted successfully!",
                                        "type": "success"
                                    }, function () {
                                        goURL(base_url + 'administration/departments');
                                    });
                                } else {
                                    swal("ERROR!", "Unable to delete this department", "error");
                                }
                            }
                        });
                    });
        }
    });
}

function delete_office(id) {
    // alert(id);return false;
    $.get(base_url + "administration/office/get_office_relations/" + id, function (result) {
        if (result != 0) {
            swal({
                title: "Error",
                text: "Office Is In Use. Can Not Delete!!",
                type: "error"
            });
        } else {
            swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover this department!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                    function () {
                        $.ajax({
                            type: 'POST',
                            url: base_url + '/administration/office/delete_office',
                            data: {
                                office_id: id
                            },
                            success: function (result) {
                                if (result == "1") {
                                    swal({
                                        title: "Success!",
                                        "text": "Office been deleted successfully!",
                                        "type": "success"
                                    }, function () {
                                        goURL(base_url + 'administration/office');
                                    });
                                } else {
                                    swal("ERROR!", "Unable to delete this office", "error");
                                }
                            }
                        });
                    });
        }
    });
}


function deactive_office(id, status = '') {
//     alert(status);return false;
    if (status == 3) {
        var title = 'Do you want to activate?';
        var msg = "Office has been activated successfully!";
    } else {
        title = 'Do you want to deactivate?';
        msg = "Office has been deactivated successfully!";
    }
    $.get(base_url + "administration/office/get_office_relations/" + id, function (result) {
        if (result != 0) {
            swal({
                title: title,
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, change it!",
                closeOnConfirm: false
            },
                    function () {
                        $.ajax({
                            type: 'POST',
                            url: base_url + '/administration/office/deactivate_office',
                            data: {
                                office_id: id
                            },
                            success: function (results) {
                                if (results == 1) {
                                    swal({
                                        title: "Success!",
                                        "text": msg,
                                        "type": "success"
                                    }, function () {
                                        goURL(base_url + 'administration/office');
                                    });
                                } else {
                                    swal("ERROR!", "Unable to change this office status", "error");
                                }
                            }
                        });
                    });
        }
    });
}

function delete_staff(id, office_id='') {
    $.get(base_url + "administration/manage_staff/get_staff_relations/" + id, function (result) {
        if (result != 0) {
            swal({
                title: "Error",
                text: "Staff Is In Use. Can Not Delete!!",
                type: "error"
            });
        } else {
            swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover this staff!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                    function () {
                        $.ajax({
                            type: 'POST',
                            url: base_url + 'administration/manage_staff/delete_staff',
                            data: {
                                staff_id: id
                            },
                            success: function (result) {
                                if (result == "1") {
                                    swal({
                                        title: "Success!",
                                        "text": "Staff been deleted successfully!",
                                        "type": "success"
                                    }, function () {
                                        if(office_id == ''){
                                        goURL(base_url + 'administration/manage_staff');
                                    }else{
                                        goURL(base_url + 'administration/office/show_office_edit_info/'+office_id);
                                    }
                                    });
                                } else {
                                    swal("ERROR!", "Unable to delete this staff", "error");
                                }
                            }
                        });
                    });
        }
    });
}

function updatePartnerService() {
    if (!requiredValidation('edit-partner-services-form')) {
        return false;
    }
    var id = $('#edit-partner-services-form #service_id').val();
    var servicecat = $('#edit-partner-services-form #servicecat option:selected').val();
    var servicename = $('#edit-partner-services-form #servicename').val();
    var input_form = $('#edit-partner-services-form input[name="input_form"]:checked').val();
    var shortcode = $('#edit-partner-services-form #shorthidden').val();
    var note = $('#edit-partner-services-form #note').val();
    var responsible_assigned = $('#edit-partner-services-form input[name="responsible_assigned"]:checked').val();
    var partnertype = $('#edit-partner-services-form #partnertype option:selected').val();

    $.ajax({
        type: "POST",
        data: {
            id : id,
            category_id:servicecat,
            description : servicename,
            ideas : shortcode,
            responsible_assigned : responsible_assigned,
            partner_type : partnertype,
            input_form : input_form,
            note : note
        },
        url: base_url + '/administration/partner_service_setup/update_partner_service',
        dataType: "html",
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'administration/partner_service_setup');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Partner Service", "error");
            } else {
                swal("ERROR!", "Partner Service Name Already Exists", "error");
            }
        }
    });

}

function updateRelatedservice() {
    if (!requiredValidation('edit-services-form')) {
        return false;
    }

    var servicecat = $('#edit-services-form #servicecat option:selected').val();
    var servicename = $('#edit-services-form #servicename').val();
    var serviceicon = $('#edit-services-form #serviceicon').val();
    var servicedes = CKEDITOR.instances.edit_servicedes.getData();
    var retailprice = $('#edit-services-form #retailprice').val();
    var relatedserv = $('#edit-services-form #relatedserv').val();
    var startdays = $('#edit-services-form #startdays').val();
    var enddays = $('#edit-services-form #enddays').val();
    var id = $('#edit-services-form #service_id').val();
    var input_form = $('#edit-services-form input[name="input_form"]:checked').val();
    var is_recurring = $('#edit-services-form input[name="is_recurring"]:checked').val();
    var will_create_project = $('#edit-services-form input[name="will_create_project"]:checked').val();
    var service_by_state = $('#edit-services-form input[name="service_by_state"]:checked').val();
    if (will_create_project === undefined) {
        will_create_project = 'n';
    }
    var shortcode = $('#edit-services-form #shorthidden').val();
    var note = $('#edit-services-form #note').val();
    var fixedcost = $('#edit-services-form #fixedcost').val();

    var responsible_assigned = $('#edit-services-form input[name="responsible_assigned"]:checked').val();
    if(responsible_assigned == 2){
        var francise_staff = "NULL";
        var dept = $('#edit-services-form #dept option:selected').val();  
    }else{
        var dept = "NULL";
        var francise_staff = $('#edit-services-form #francise_staff option:selected').val();   
    }
    var client_type = [];
    $.each($("input[name='client_type']:checked"), function(){
        client_type.push($(this).val());
    });
    if(client_type == 0){
        client_type = 0;
    }else if(client_type == 1){
        client_type = 1;
    }else if(client_type == "0,1"){
        client_type = 2;
    }

    var pattern = [];
    $.each($("input[name='pattern']:checked"), function(){
        pattern.push($(this).val());
    });

    $.ajax({
        type: "POST",
        data: {
            servicecat: servicecat,
            servicename: servicename,
            serviceicon:serviceicon,
            retailprice: retailprice,
            relatedserv: relatedserv,
            startdays: startdays,
            enddays: enddays,
            dept: dept,
            id: id,
            input_form: input_form,
            shortcode: shortcode,
            note: note,
            fixedcost: fixedcost,
            responsible_assigned: responsible_assigned,
            client_type: client_type,
            is_recurring: is_recurring,
            servicedes: servicedes,
            will_create_project:will_create_project,
            service_by_state:service_by_state,
            francise_staff:francise_staff,
            pattern: pattern
        },
        url: base_url + '/administration/service_setup/update_related_service',
        dataType: "html",
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'administration/service_setup');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Service", "error");
            } else {
                swal("ERROR!", "Service Name Already Exists", "error");
            }
        }
    });

}

function add_company_type() {
    if (!requiredValidation('add-company-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-company-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/company_type/add_company_type',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'administration/company_type/company_setup/company_type');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Company", "error");
            } else {
                swal("ERROR!", "Name Already Exists", "error");
            }
        }
    });

}

function edit_company_type() {
    if (!requiredValidation('edit-company-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-company-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/company_type/edit_company_type',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'administration/company_type/company_setup/company_type');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Company", "error");
            } else {
                swal("ERROR!", "Name Already Exists", "error");
            }
        }
    });
}

function delete_company(company_id) {
    $.get(base_url + "/administration/company_type/get_company_relations/" + company_id, function (result) {
        if (result != 0) {
            swal({
                title: "Error",
                text: "Company Type Is Used. Can Not Delete!!",
                type: "error"
            });
        } else {
            swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover this company!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                    function () {
                        $.ajax({
                            type: 'POST',
                            url: base_url + '/administration/company_type/delete_company_type',
                            data: {
                                company_id: company_id
                            },
                            success: function (result) {
                                if (result == "1") {
                                    swal({
                                        title: "Success!",
                                        "text": "Company been deleted successfully!",
                                        "type": "success"
                                    }, function () {
                                        goURL(base_url + 'administration/company_type');
                                    });
                                } else {
                                    swal("ERROR!", "Unable to delete the company!", "error");
                                }
                            }
                        });
                    });
        }
    });
}


function add_source_type() {
    if ($(".requ_class").attr("disabled")) {
        $(".requ_class").removeAttr("disabled");
    }
    if (!requiredValidation('add-source-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-source-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/referred_source/add_source_type',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Source Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'administration/referred_source');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Source", "error");
            } else {
                swal("ERROR!", "Name Already Exists", "error");
            }
        }
    });

}

function edit_source_type() {
    if ($(".requ_class").attr("disabled")) {
        $(".requ_class").removeAttr("disabled");
    }
    if (!requiredValidation('edit-source-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-source-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/referred_source/edit_source_type',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Source Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'administration/referred_source');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Source", "error");
            } else {
                swal("ERROR!", "Name Already Exists", "error");
            }
        }
    });
}

function delete_source(source_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this source!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'administration/referred_source/delete_source_type',
                    data: {
                        source_id: source_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "source been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'administration/referred_source');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this source!", "error");
                        }
                    }
                });
            });
}

function loadstaffdata(ofc = '', dept = '', type = '', status ='') {
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/manage_staff/load_staff_data',
        data: {
            ofc: ofc,
            dept: dept,
            type: type,
            status: status
        },
        success: function (result) {
            $(".ajaxdiv-staff").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function get_log_data_ajx() {
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/manage_log/load_staff_data',
        success: function (result) {
            $("#ajax-div-log").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function get_staff_for_role() {
    var office_type = $("#ofc_type").val();
    var office_id = $("#franchise_office_id").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/get_office_staff',
        data: {
            office_id: office_id
        },
        success: function (result) {
            if (office_type == 2) {
                $("#manager_div").show();
                $("#manager").html(result).removeAttr("disabled");
            } else {
                $("#manager_div").hide();
                $("#manager").html("<option value=''>Select an option</option>").attr("disabled", "disabled");
            }
        }
    });
}

function save_office_manager() {
    var office_type = $("#ofc_type").val();
    if (office_type == 2) {
        var office_id = $("#franchise_office_id").val();
        var staff = $("#manager").val();
        $.ajax({
            type: 'POST',
            url: base_url + 'administration/office/save_office_manager',
            data: {
                office_id: office_id,
                staff_id: staff
            },
            success: function (result) {
            }
        });
    }
}

function add_business_client() {
    if (!requiredValidation('add-business-client-form-modal')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('add-business-client-form-modal'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/business_client/add_business_client',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result == "1") {
                swal({title: "Success!", text: "Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'administration/business_client');
                });
            } else if (result == "-1") {
                swal("ERROR!", "Unable To Add Business Client", "error");
            } else {
                swal("ERROR!", "Name Already Exists", "error");
            }
        }
    });

}
function add_renewal_dates() {
    if (!requiredValidation('add-renewal-dates-form-modal')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('add-renewal-dates-form-modal'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/renewal_dates/add_renewal_dates',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'administration/company_type/company_setup/renewal_date');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Renewal Dates", "error");
            } else {
                swal("ERROR!", "Name Already Exists", "error");
            }
        }
    });

}
function edit_renewal_dates() {
    if (!requiredValidation('edit-renewal-dates-form-modal')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-renewal-dates-form-modal'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/renewal_dates/edit_renewal_dates',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'administration/company_type/company_setup/renewal_date');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Renewal Dates", "error");
            } else {
                swal("ERROR!", "Name Already Exists", "error");
            }
        }
    });
}
function delete_renewal_dates(client_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this client!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + '/administration/renewal_dates/delete_renewal_dates',
                    data: {
                        client_id: client_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Client been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'administration/renewal_dates');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete the client!", "error");
                        }
                    }
                });
            });
//        }
//    });
}

function edit_business_client() {
    if (!requiredValidation('edit-business-client-form-modal')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-business-client-form-modal'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/business_client/edit_business_client',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result == "1") {
                swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'administration/business_client');
                });
            } else if (result == "-1") {
                swal("ERROR!", "Unable To Update Business Client", "error");
            } else {
                swal("ERROR!", "Name Already Exists", "error");
            }
        }
    });
}
function delete_business_client(client_id) {
//    $.get(base_url + "/administration/business_client/get_company_relations/" + client_id, function (result) {
//        if (result != 0) {
//            swal({
//                title: "Error",
//                text: "Company Type Is Used. Can Not Delete!!",
//                type: "error"
//            });
//        } else {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this client!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + '/administration/business_client/delete_business_client',
                    data: {
                        client_id: client_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Client been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'administration/business_client');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete the client!", "error");
                        }
                    }
                });
            });
//        }
//    });
}

function edit_financial_transaction_price() {
    if (!requiredValidation('financial_price_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('financial_price_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/financial_prices/edit_financial_transaction_price',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == 1) {
                swal("Success!", "Successfully Updated!", "success");
                goURL(base_url + 'services/financial_prices');
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

function add_financial_base_price() {
    if (!requiredValidation('financial_base_price_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('financial_base_price_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/financial_prices/add_financial_base_price',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == 1) {
                swal("Success!", "Successfully Updated!", "success");
                goURL(base_url + 'services/financial_prices');
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
function create_interactions()
{
    if (!requiredValidation('add_interactions_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('add_interactions_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/create_interactions',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully Added Interactions!", "success");
                goURL(base_url + 'administration/office/manage_interactions');
            }
        }
    });
}

function update_interactions() {
    if (!requiredValidation('edit_interactions_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('edit_interactions_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/create_interactions',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully Updated Interactions!", "success");
                goURL(base_url + 'administration/office/manage_interactions');
            }
        }
    });
}

function delete_interactions(id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this Interactions!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
        },
            function () {
            $.ajax({
                type: 'POST',
                url: base_url + 'administration/office/delete_interactions',
                data: {
                    in_id: id
                },
                success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Interactions been deleted successfully!",
                                "type": "success"
                                }, function () {
                                    goURL(base_url + 'administration/office/manage_interactions');
                                });
                            } else {
                                swal("ERROR!", "Unable to delete this Interactions", "error");
                            }
                        }
            });
        });
}

function save_staff_service_fees(section = '') {
    var form_data = new FormData(document.getElementById('staff_fee_section'));
    var staff_id = $('#manage_staff_id').val();
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/manage_staff/save_staff_service_fees',
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == 1) {
                if (section == 'view') {
                    swal("Success!", "Successfully saved!", "success");
                    goURL(base_url + 'administration/manage_staff/show_staff_info/'+ staff_id);
                } else {
                    swal("Success!", "Successfully saved!", "success");
                    goURL(base_url + 'administration/manage_staff/show_staff_edit_info/'+ staff_id);
                }
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

function delete_template_category(id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this Template Category!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
        },
            function () {
            $.ajax({
                type: 'POST',
                url: base_url + 'administration/template/delete_template_categories',
                data: {
                    in_id: id
                },
                success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Category has been deleted successfully!",
                                "type": "success"
                                }, function () {
                                    goURL(base_url + 'administration/template/template_categories');
                                });
                            } else {
                                swal("ERROR!", "Unable to delete this Category", "error");
                            }
                        }
            });
        });
}
function create_template_category()
{
    if (!requiredValidation('add_template_category_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('add_template_category_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/template/create_template_category',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully Added Category!", "success");
                goURL(base_url + 'administration/template/template_categories');
            }
        }
    });
}
function update_template_categories() {
    if (!requiredValidation('edit_template_category_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('edit_template_category_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/template/create_template_category',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully Updated Category!", "success");
                goURL(base_url + 'administration/template/template_categories');
            }
        }
    });
}

function change_staff_status_modal(staff_id)
{
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/change_staff_status_modal',
        data: {
            staff_id: staff_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#staff_status-info-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function update_staff_status() {
    var status = $('#staff_status-info-form input:radio[name=radio]:checked').val();
    var staff_id = $("#staff_status-info-form #staff_id").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/office/changes_staff_status',
        data: {staff_id: staff_id, status: status},
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            var result = result.trim();
            if (result == "1") {
                swal({
                title: "Success!",
                "text": "Staff Status has been changed successfully!",
                "type": "success"
            }, function () {
                window.location.reload();
            });
            } else {
                swal("ERROR!", "Unable to Change Status of this staff", "error");
            }
        }
    })
}

function add_referred_by_details() {
    var id = $("#id").val();

    if (id != '') {
        if (!requiredValidation('edit-referred-form')) {
            return false;
        }

        var form_data = new FormData(document.getElementById('edit-referred-form'));
    } else {
        if (!requiredValidation('add-referred-form')) {
            return false;
        }

        var form_data = new FormData(document.getElementById('add-referred-form'));
    }

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/referred_source/add_referred_by_details',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'administration/referred_source/referred_by_details_setup');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add", "error");
            } else {
                swal("ERROR!", "Name Already Exists", "error");
            }
        }
    });

}
function delete_referred(id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'administration/referred_source/delete_referred',
            data: {
                id: id
            },
            success: function (result) {
                if (result == "1") {
                    swal({
                        title: "Success!",
                        "text": "referred by details been deleted successfully!",
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'administration/referred_source/referred_by_details_setup');
                    });
                } else {
                    swal("ERROR!", "Unable to delete this!", "error");
                }
            }
        });
    });
}

function update_manage_payroll_price() {
    if (!requiredValidation('manage_payroll_price_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('manage_payroll_price_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/manage_payroll_prices/update_manage_payroll_price',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == 1) {
                swal("Success!", "Successfully Updated!", "success");
                goURL(base_url + 'services/manage_payroll_prices');
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

function insert_new_company_setup()
{
    if (!requiredValidation('add_new_company_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('add_new_company_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/service_setup/insert_new_company_setup',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.success == 3) {
                swal("ERROR!", "For ths state new company setup is already created", "error");
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully added new company setup!", "success");
                window.location.reload();
            }
        }
    });
}

function update_new_company_setup()
{
    if (!requiredValidation('edit_new_company_setup_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('edit_new_company_setup_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/service_setup/insert_new_company_setup',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            clearErrorMessageDiv();
            var obj = $.parseJSON(result);
            if (obj.success == 0) {
                var error = obj.error_field;
                for (var i = 0; i < error.length; i++) {
                    printErrorMessage(error[i][0], error[i][1]);
                }
            } else if (obj.success == 3) {
                swal("ERROR!", "For ths state new company setup is already created", "error");
            } else if (obj.status_msg == 2) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("Success!", "Successfully added new company setup!", "success");
                window.location.reload();
            }
        }
    });
}

function update_service_setup_status_modal(service_id ,status)
{
    $.ajax({
        type: 'POST',
        url: base_url + '/administration/service_setup/update_service_setup_status_modal',
        data: {
            service_id: service_id,
            status: status
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#service_status_change').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
function update_service_status() {
    var statusval = $('#service_status_change input:radio[name=radio]:checked').val();
    var service_id = $("#service_status_change #service_id").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/service_setup/update_service_status',
        data: {
            statusval:statusval,
            service_id: service_id,
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if(result == 1){
                swal({
                    title: "Success!",
                    "text": "Successfully Status Changed!",
                    "type": "success"
                }, function () {
                        $("#service_status_change").hide();
                        location.reload();
                    
                });
            } 
        }
    });
  
}
function service_setup_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('service-setup-filter-display-div'));
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    /*console.log(previous_filter);*/
    $("#filter-variable").val(reference);
    if (previous_filter != undefined && previous_filter == reference) {
        $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
        for (const formElement of form_data) {
            let filter_name = formElement[0];
            let filter_value = formElement[0];
//            console.log(filter_name);
            let active_element = filter_name.split("[")[0];     
//            console.log(filter_value);
            if (formElement[1] != '') {
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                let current_made_id = id_val+'-val';
                $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                /*}*/ 
            }    
        }
        $("#value-display").empty();
        $("#filter-variable").val('');
        $(".display-filter-div").hide();
        return false;
    }
    var check_div_element = $("#" + current_element.id + "-display").html();
    if (check_div_element == '') {
        $.ajax({
            type: 'POST',
            url: base_url + 'administration/service_setup/service_setup_filter',
            data: {
                reference: reference
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                /*console.log(result);*/
                $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
                $(".filter-options-val").hide();

                $("#" + current_element.id).removeClass('btn-success btn-primary').addClass('btn-outline-success');
                $("#" + current_element.id + "-display").html(result).slideDown('slow');
                for (const formElement of form_data) {
                    let filter_name = formElement[0];
                    let filter_value = formElement[0];
                    if (formElement[1] != '') {
                        let active_element = filter_name.split("[")[0];     
                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
                        let current_made_id = id_val+'-val';
                        if (current_element.id != current_made_id) {
                            $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                        }
                    }
                }
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
        $(".filter-options-val").hide();

        $("#" + current_element.id).removeClass('btn-success btn-primary').addClass('btn-outline-success');
        $("#" + current_element.id + "-display").slideDown('slow');
        for (const formElement of form_data) {
            let filter_name = formElement[0];
            let filter_value = formElement[0];
            let active_element = filter_name.split("[")[0];     
            /*console.log(filter_value);*/
            if (formElement[1] != '') {
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                let current_made_id = id_val+'-val';
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
    }
}

function load_service_setup_ajax_dashboard(){
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/service_setup/load_service_setup_ajax_dashboard',
        data: {
            statusval:1
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $("#load_services_data").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function load_service_setup_ajax_dashboard_filter(page_numbers = '',is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
        console.log(removavle_element);
        if (removavle_element == 'complete_date' || removavle_element == 'start_date') {
            $("#"+removavle_element).val('');
        } else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('service-setup-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
        if (a == 'category_filter') {
            var id = 'category_filter-val';
            if(is_clear==''){
                $("#category_filter-clear_filter").show();
            }        
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if(is_clear==''){
                $("#service_name-clear_filter").show();
            }
        }
        if (a == 'responsible') {
            var id = 'responsible-val';
            if(is_clear==''){
                $("#responsible-clear_filter").show();
            }
        }
        if (a == 'input_form') {
            var id = 'input_form-val';
            if(is_clear==''){
                $("#input_form-clear_filter").show();
            }
        }
        if (a == 'cost_filter') {
            var id = 'cost_filter-val';
            if(is_clear==''){
                $("#cost_filter-clear_filter").show();
            }
        }
        if (a == 'price_filter') {
            var id = 'price_filter-val';
            if(is_clear==''){
                $("#price_filter-clear_filter").show();
            }
        }
        if (a == 'status_filter') {
            var id = 'status_filter-val';
            if(is_clear==''){
                $("#status_filter-clear_filter").show();
            }
        }
        if (a == 'project_filter') {
            var id = 'project_filter-val';
            if(is_clear==''){
                $("#project_filter-clear_filter").show();
            }
        }
        if (a == 'recurring_filter') {
            var id = 'recurring_filter-val';
            if(is_clear==''){
                $("#recurring_filter-clear_filter").show();
            }
        }
    }

    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }
    // var status = $("#status").val();
    // var category_id = $("#category_id").val();
    // form_data.append('page_number', page_number);
    // form_data.append('status', status);
    // form_data.append('category_id', category_id);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/service_setup/load_service_setup_ajax_dashboard',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
           // console.log(result);
            $("#load_services_data").html(result);
            $('#bookkeeping_btn_clear_filter').show();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function sort_service_setup_dashboard_new(sort_type = '', sort_val = '') {
    var sort_type = sort_type.value;
    var form_data = new FormData(document.getElementById('service-setup-filter-display-div'));
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_val);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/service_setup/load_service_setup_ajax_dashboard',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (result) {
            $("#load_services_data").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function () {
            closeLoading();
        }
    });
}

function check_otp() {
    if (!requiredValidation('check_otp_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('check_otp_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/manage_staff/check_otp',
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == 1) {
                $("#check_otp_div").hide();
                $("#change_password_div").show();
            } else {
                swal("ERROR!", "Invalid OTP.", "error");
                $("#reset_modal").modal('hide');
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

function update_password() {
    if (!requiredValidation('change_password_form')) {
        return false;
    }
    var new_pwd = $("#new_password").val();
    var con_pwd = $("#con_password").val();
    if (new_pwd != con_pwd) {
        swal('ERROR!' , 'Password does not match' , 'error');
        return false;
    } else {
        var form_data = new FormData(document.getElementById('change_password_form'));
        $.ajax({
            type: 'POST',
            url: base_url + 'administration/manage_staff/update_password',
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                if (result == 1) {
                    swal("Success!", "Password updated.", "success");
                    $("#reset_modal").modal('hide');
                } else {
                    swal("ERROR!", "An error has occured. Please try again later", "error");
                    $("#reset_modal").modal('hide');
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
}