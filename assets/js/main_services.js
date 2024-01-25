var base_url = document.getElementById('base_url').value;
function interval_total_amounts() {
    setInterval(function () {
        var total_amounts = document.getElementsByClassName('total_amounts');
        var corporate_tax_return = $(".corporate_tax_return").val();
        var price_initialam = $("#retail-price-initialamt").val();
        var total = 0;
        total += parseInt(price_initialam);
        for (i = 0; i < total_amounts.length; i++) {
            total += parseInt(total_amounts[i].value);
        }
        if (corporate_tax_return == 'y') {
            total += 35;
        }
        $("#retail-price").val(total + ".00");
        $("#retail-price-hidd").val(total);
    }, 100);
}

function interval_total_amounts_for_recurring(retail_price, order_id='') {
    setInterval(function () {
        var total_amounts = document.getElementsByClassName('total_amounts');
        var override_price = document.getElementsByClassName('override_prices');
        var price_initialam = $("#retail-price-initialamt").val();
        var office_service_fees = Number($("#office_service_fees").val());
        var total = 0;
        total += parseInt(price_initialam);
        for (i = 0; i < total_amounts.length; i++) {
            if(override_price[i].value != '' ){
                total += parseInt(override_price[i].value);
            }else{
                total += parseInt(total_amounts[i].value);
            }    
        }
        if(office_service_fees != 0) {
            if(order_id == ''){
                $("#retail-price").val(office_service_fees + ".00");
                $("#retail-price-hidd").val(office_service_fees);
                $("#retail_price_override").val(office_service_fees + total + ".00");
            }else{
                var r_price_override = Number($("#override-price-hidd").val());
                $("#retail-price").val(office_service_fees + ".00");
                $("#retail-price-hidd").val(office_service_fees);
                $("#retail_price_override").val(r_price_override + total + ".00");
            }
        } else {
            if(order_id == ''){
                $("#retail-price").val(retail_price + ".00");
                $("#retail-price-hidd").val(retail_price); 
                $("#retail_price_override").val(retail_price + total + ".00"); 
            }else{
                var r_price_override = Number($("#override-price-hidd").val());
                $("#retail-price").val(retail_price + ".00");
                $("#retail-price-hidd").val(retail_price); 
                $("#retail_price_override").val(r_price_override + total + ".00");
            }   
        }        
    }, 100);
}

function interval_total_amounts_for_bookkeeping_by_date(retail_price) {
    setInterval(function () {
        var total_amounts = document.getElementsByClassName('total_amounts');
        var override_price = document.getElementsByClassName('override_prices');
        var price_initialam = $("#retail-price-initialamt").val();
        var total = 0;
        total += parseInt(price_initialam);
        var office_service_fees = Number($("#office_service_fees").val());
        for (i = 0; i < total_amounts.length; i++) {
            if(override_price[i].value != '' ){
                total += parseInt(override_price[i].value);
            }else{
                total += parseInt(total_amounts[i].value);
            }    
        }
        if(office_service_fees != 0) {
            $("#retail-price").val(office_service_fees + total + ".00");
            $("#retail-price-hidd").val(office_service_fees + total);
        } else {
            $("#retail-price").val(retail_price + total + ".00");
            $("#retail-price-hidd").val(retail_price + total);    
        }
        // $("#retail-price").val(retail_price + total + ".00");
        // $("#retail-price-hidd").val(retail_price + total);
    }, 100);
}

function client_type_change(client_type) {
//    $("#accounts-list").html("");
    var type_of_client = client_type.value;
    var new_reference_id = $("#reference_id").val();
    var clientid = $(".client_list option:selected").val();
    clearErrorMessageDiv()
    if (type_of_client == 0) {
        $("#client_list").show();
        $(".client_list").attr('required', "required");
        $("#name_of_business").hide();
        $("#business_name").removeAttr('required').val("");
    } else if (type_of_client == 1) {
        $("#name_of_business").show().attr('required');
        $("#business_name").attr('required', "required");
        $("#client_list").hide();
        $(".client_list").removeAttr('required').val("");
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
        $(".office-internal #office").val('');
        $("#partner").val('');
        $("#manager").val('');
        $("#client_association").val('');
        $("#referred_by_source").val('');
        $("#referred-by-name").val('');
        $("#language").val('');
        delete_contact_list(new_reference_id);
        delete_owner_list(new_reference_id);
        $(".internal-data").html('');
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
        $(".contactedit").removeClass('dcedit');
        $(".contactdelete").removeClass('dcdelete');
        $(".owner-data").html('');
        $(".owneredit").removeClass('doedit');
        $(".ownerdelete").removeClass('dodelete');
        $('.office-internal #office').prop('disabled', false);
        $('#partner').prop('disabled', false);
        $('#manager').prop('disabled', false);
        $("#client_association").prop("disabled", false);
        $("#referred_by_source").prop('disabled', false);
        $("#referred-by-name").prop("disabled", false);
        $("#language").prop('disabled', false);
        $("#owners_div, #internal_data_div, #documents_div, #business_description_div, #fiscal_year_end_div, #type_div, #state_div").show();
    }
    if (type_of_client == "") {
        $("#client_list, #name_of_business").hide();
        $("#business_name, .client_list").removeAttr('required').val("");
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
        $(".office-internal #office").val('');
        $("#partner").val('');
        $("#manager").val('');
        $("#client_association").val('');
        $("#referred_by_source").val('');
        $("#referred-by-name").val('');
        $("#language").val('');
        delete_contact_list(new_reference_id);
        delete_owner_list(new_reference_id);
        $(".internal-data").html('');
        $(".contact-data").html('');
        $(".contactedit").removeClass('dcedit');
        $(".contactdelete").removeClass('dcdelete');
        $(".owner-data").html('');
        $(".owneredit").removeClass('doedit');
        $(".ownerdelete").removeClass('dodelete');
        $('.office-internal #office').prop('disabled', false);
        $('#partner').prop('disabled', false);
        $('#manager').prop('disabled', false);
        $("#client_association").prop("disabled", false);
        $("#referred_by_source").prop('disabled', false);
        $("#referred-by-name").prop("disabled", false);
        $("#language").prop('disabled', false);
        $("#owners_div, #internal_data_div, #documents_div, #business_description_div, #fiscal_year_end_div, #type_div, #state_div").show();
    }
    $('.office-internal #office').prop('disabled', false);
    $('#partner').prop('disabled', false);
    $('#manager').prop('disabled', false);
    $("#client_association").prop("disabled", false);
    $("#referred_by_source").prop('disabled', false);
    $("#referred_by_name").prop("disabled", false);
    $("#language").prop('disabled', false);
    $('#state').prop('disabled', false);
    $('#type').val("");
    $('#type').prop('disabled', false);
}

function delete_contact_list(reference_id) {
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id
        },
        url: base_url + 'services/home/delete_contact_ist',
        dataType: "html",
        success: function (result) {
            //alert(result);
        }
    });
}

function delete_owner_list(reference_id) {
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id
        },
        url: base_url + 'services/home/delete_owner_list',
        dataType: "html",
        success: function (result) {
            //alert(result);
        }
    });
}

// function seller_info_modal(modal_type, reference, reference_id, id){

// }
function contact_modal(modal_type, reference, reference_id, id,section_from='') {
    if (modal_type == "edit") {
        if ($(".contactedit").hasClass("dcedit")) {
            return false;
        }
    }
    if (modal_type == "add") {
        if ($("a").hasClass("contactadd")) {
            if ($(".contactadd").hasClass("dcadd")) {
                return false;
            }
        }
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/show_contact',
        data: {
            modal_type: modal_type,
            reference: reference,
            reference_id: reference_id,
            id: id,
            section_from:section_from
        },
        success: function (result) {
            $('#contact-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function document_modal(modal_type, reference = '', reference_id ='') {
    if (reference_id == '') {
        reference_id = $("#reference_id").val();
    }
    if(reference == ''){
        reference = $("#reference").val();
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/show_document',
        data: {
            modal_type: modal_type,
            reference: reference,
            reference_id: reference_id
        },
        success: function (result) {
            $('#document-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function save_contact(section='') {
    if (!requiredValidation('form_contact')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_contact'));
    var reference = $("form#form_contact #reference").val();
    var reference_id = $("form#form_contact #reference_id").val();
    var contact_type = $("form#form_contact #contact_type option:selected").text();

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/save_contact',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log(result); return false;
            if (result == -1) {
                swal("ERROR!", "Error Processing Data", "error");
            } else if (result == -2) {
                // swal("ERROR!", "Same Type Can't Exist", "error");
                swal("ERROR!", "You cannot add another contact for "+ contact_type +" type", "error");
            } else if (result == -3) {
                swal("ERROR!", "Email/Phone Already Exists", "error");
            } else {
                $('#contact-form').modal('hide');
                get_contact_list(reference_id, reference,'',section);
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

function save_document() {
    // if (!requiredValidation('form_document')) {
    //     return false;
    // }
    var form_data = new FormData(document.getElementById('form_document'));
    var reference = $("form#form_document #reference").val();
    var reference_id = $("form#form_document #reference_id").val();

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/save_document',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result == -1) {
                alert("Error Processing Data");
            } else {
                $('#document-form').modal('hide');
                get_document_list(reference_id, reference);
            }
        }
    });
}        
function get_contact_list(reference_id, reference, disable = "",section="") {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id,
            disable: disable,
            section: section
        },
        url: base_url + 'services/home/get_contact_list',
        dataType: "html",
        success: function (result) {
            $("#contact-list").html(result);
        }
    });
}
function get_contact_list2(reference_id, reference, disable = "",section="") {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id,
            disable: disable,
            section: section
        },
        url: base_url + 'action/home/get_contact_list',
        dataType: "html",
        success: function (result) {
            // console.log(result);
            $("#contact-list").html(result);
        }
    });
}
function reload_owner_list2(company_id, section,service_id='') {
    $.ajax({
        type: "POST",
        data: {
            company_id: company_id,
            section: section,
            service_id:service_id
        },
        url: base_url + 'action/home/reload_owner_list',
        dataType: "html",
        success: function (result) {
            if (section == "main") {
                document.getElementById('owners-list').innerHTML = result;
            } else {
                document.getElementById('owner-list-' + section).innerHTML = result;
            }
        }
    });
}
function get_document_list(reference_id, reference) {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id
        },
        url: base_url + 'services/home/get_document_list',
        dataType: "html",
        success: function (result) {
            $("#document-list").html(result);
        }
    });
}

// function get_document_list_new(reference_id, reference, order_id){
//     $.ajax({
//         type: "POST",
//         data: {
//             reference: reference,
//             reference_id: reference_id,
//             order_id: order_id
//         },
//         url: base_url + 'services/home/get_document_list_new',
//         dataType: "html",
//         success: function (result) {
//             $("#document-list").html(result);
//         }
//     });
// }

function contact_delete(reference, reference_id, id,section='') {
    if ($(".contactdelete").hasClass("dcdelete")) {
        return false;
    }
    swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this contact!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                id: id,
                reference: reference,
                reference_id: reference_id
            },
            url: base_url + "services/home/delete_contact",
            dataType: "html",
            success: function (result) {
                if (result == '2') {
                    get_contact_list(reference_id, reference,'',section);
                    swal("Deleted!", "Your contact has been deleted.", "success");
                } else if (result == '1') {
                    swal("Unable To Delete!", "You should have atleast one contact!", "error");
                } else {
                    swal("Error!", "Error to Delete Contact.", "error");
                }
            }
        });
    });
}

function delete_document(reference, reference_id, id, file_name) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this document!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.get(base_url + "services/home/delete_document/" + id + "/" + file_name, function (data) {
            if (data == 1) {
                get_document_list(reference_id, reference);
                swal("Deleted!", "Your document has been deleted.", "success");
            } else {
                swal("Unable To Delete document");
            }
        });
    });
}

function employee_modal(modal_type, employee_id='') {
    // if (modal_type == "add") {
    //     var employee_count = $("#employee_info").val();
    //     if (typeof $("#payroll_employee_people_total option:selected").val() !== 'undefined') {
    //         var max_employee = $("#payroll_employee_people_total option:selected").val().split("-");
    //         max_employee = max_employee[1];
    //         if (parseInt(employee_count) > parseInt(max_employee)) {
    //             swal("ERROR!", "Can not add employee more than " + max_employee, "error");
    //             return false;
    //         }
    //     }
    // }
    var reference = $('#reference').val();
    var reference_id = $('#reference_id').val();
    $.ajax({
        type: "POST",
        url: base_url + "modal/show_employee_modal",
        data: {
            modal_type: modal_type,
            reference: reference,
            reference_id: reference_id,
            order_id: $("#editval").val(),
            employee_id: employee_id
        },
        dataType: "html",
        success: function (result) {
            $('#employee-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function save_employee() {
    if (!requiredValidation('form_employee')) {
        return false;
    }
    var birth_date = new Date($("#date_of_birth").val());
    var hire_date = new Date($('#date_of_hire').val());
    if (hire_date.getTime() <= birth_date.getTime()) {
        swal("Error", "Date of Hire Should be Greater Than Date of Birth!", "error");
        return false;
    }
    var client_id = $('#reference_id').val();
    var reference = $('#reference').val();
    var order_id = $('#order_id').val();
    var formData = new FormData(document.getElementById('form_employee'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/save_employee',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // alert(result);return false;
            // if (result == 2) {
            //     swal("ERROR!", "Error to upload file", "error");
            // } else if (result == 3) {
            //     swal("ERROR!", "Email already exists", "error");
            // } else if (result == 0) {
            //     swal("ERROR!", "Error to insert employee", "error");
            // } else {
            //     cleanFormFields('form_employee');
            //     $('#employee-form').modal('hide');
            //     document.getElementById('quant_employee').value = parseInt(document.getElementById('quant_employee').value) + 1;
            //     get_employee_list(reference_id);
            // }
            // closeLoading();
            // console.log("Reference Id: " + $("#reference_id").val());
            if(result.trim() == "order_wise"){
                swal({ title: "Success!", text: "Employee Info successfully saved!", type: "success" }, function () {
                    $('#employee-form').modal('hide');
                    get_employee_info_list(client_id,reference,order_id);
                });
            }else{
                if (result.trim() != "0") {
                    var f = $('#employee_info_id_hidd').val();
                    var r = f.concat(',',result);
                    var arr = r.split(',').map(Number);
                    $('#employee_info_id_hidd').val(arr);
                    swal({ title: "Success!", text: "Employee Info successfully saved!", type: "success" }, function () {
                        $('#employee-form').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/accounting_services/get_employee_info_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $("#employee-list").html(res);
                            }
                        });
                    });
                } else if (result.trim() == "0") {
                    var f = $('#employee_info_id_hidd').val();
                    var arr = f.split(',').map(Number);
                    swal({ title: "Success!", text: "Employee Info successfully updated!", type: "success" }, function () {
                        $('#employee-form').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/accounting_services/get_employee_info_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $('#employee_info_id_hidd').val(arr.join());
                                $("#employee-list").html(res);
                            }
                        });
                    });
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
}

function get_employee_info_list(client_id ='',reference ='', order_id =''){
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            reference: reference,
            order_id: order_id
        },
        url: base_url + 'services/accounting_services/get_employee_info_list',
        dataType: "html",
        success: function (result) {
            $("#employee-list").html(result);
        }
    });
}

function save_employee_edit() {
    var D1 = new Date($("#date_of_birth").val());
    var D2 = new Date($('#date_of_hire').val());
    //if(hire_date.getTime()>=birth_date.getTime() )
    if (D2.getTime() <= D1.getTime()) {
        swal("Error", "Date of Hire Should be Greater Than Date of Birth!", "error");
        return false;
    }

    var reference_id = $("#reference_id").val();
    var radio = $("input[name='category']:checked").val();
    if(radio == "1099"){
    var formData = new FormData(document.getElementById('form_employee1'));
    }else if(radio == "w2"){
        var formData = new FormData(document.getElementById('form_employee2'));
    }
    formData.append('reference_id', reference_id);
    formData.append('employee_reference',radio);
//    formData.append('action', 'save_employee');

    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/save_employee',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
//             console.log("Result: " + result);
//             return false;
            if (result == 2) {
                swal("ERROR!", "Error to upload file", "error");
            } else if (result == 3) {
                swal("ERROR!", "Email already exists", "error");
            } else if (result == 0) {
                swal("ERROR!", "Error to insert employee", "error");
            } else {
                if(radio == "1099"){
                cleanFormFields('form_employee1');
            }else if(radio == "w2"){
                cleanFormFields('form_employee2');
            }
                $('#employee-form').modal('hide');
                document.getElementById('quant_employee').value = parseInt(document.getElementById('quant_employee').value) + 1;
                get_employee_list(reference_id);
            }
            closeLoading();
            console.log("Reference Id: " + $("#reference_id").val());
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function get_employee_list(reference_id) {
    // reload_employee_list
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id
        },
        url: base_url + 'services/accounting_services/get_employee_list',
        dataType: "html",
        success: function (result) {
            document.getElementById('employee-list').innerHTML = result;
        }
    });
}

function delete_employee(employee_id) {
    swal({
        title: "Are you sure?",
        text: "This employee will be deleted!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                employee_id: employee_id
            },
            url: base_url + 'services/accounting_services/delete_employee',
            dataType: "html",
            success: function (result) {
//                 if (result != 0) {
//                     var reference_id = $("#reference_id").val();
// //                    document.getElementById('quant_employee').value = parseInt(document.getElementById('quant_employee').value) - 1;
//                     get_employee_list(reference_id);
//                 } else {
//                     swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
//                 }
                if (result != 0) {
                    var client_id = $("#reference_id").val();
                    var reference = $("#reference").val();
                    var order_id = $("#editval").val();
                    if(order_id !=''){
                        get_employee_info_list(client_id,reference,order_id);
                    }else{
                        var f = $('#employee_info_id_hidd').val();
                        var arr = f.split(',').map(Number);
                        if(arr.includes(employee_id) == true){
                            var index = arr.indexOf(employee_id);
                            if (index > -1) {
                              arr.splice(index, 1);
                            }
                        }
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/accounting_services/get_employee_info_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $('#employee_info_id_hidd').val(arr.join());
                                $("#employee-list").html(res);
                            }
                        });
                    }
                    swal("Deleted!", "Employee Info has been deleted.", "success");
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
    });
}

function save_payroll_approver() {
    if (!requiredValidation('form_payroll_approver')) {
        return false;
    }
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var order_id = $("#editval").val();
    var formData = new FormData(document.getElementById('form_payroll_approver'));
    formData.append('reference', reference);
    formData.append('reference_id', reference_id);
    formData.append('order_id', order_id);

    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/save_payroll_approver',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            console.log("Result: " + result);
            if (result != 0) {
                clean_form_fields('form_payroll_approver');
                $('#payroll-approver-form').modal('hide');
                $("#payroll_first_name").val('');
                $("#payroll_last_name").val('');
                $("#payroll_email").val('');
                $("#payroll_phone").val('');
                $("#payroll_title").val('');
                $("#payroll_social_security").val('');
                $("#payroll_fax").val('');
                $("#payroll_ext").val('');
                $("#payroll_approver_quantity").val(1);
                var res = JSON.parse(result);
                $("#payroll_first_name").val(res.fname);
                $("#payroll_last_name").val(res.lname);
                $("#payroll_title").val(res.title);
                $("#payroll_social_security").val(res.social_security);
                $("#payroll_phone").val(res.phone);
                $("#payroll_ext").val(res.ext);
                $("#payroll_fax").val(res.fax);
                $("#payroll_email").val(res.email);
                $("#payroll_approver_div").show();
            } else {
                swal("ERROR!", "You cannot add more than one payroll approver", "error");
            }
            closeLoading();
            console.log("Reference Id: " + $("#reference_id").val());
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function send_payroll_approver_formdata() {
    if (!requiredValidation('form_payroll_approver')) {
        return false;
    }
    var payroll_approver_first_name = $("#payroll_approver_first_name").val();
    var payroll_approver_last_name = $("#payroll_approver_last_name").val();
    var payroll_approver_title = $("#payroll_approver_title").val();
    var payroll_approver_social_security = $("#payroll_approver_social_security").val();
    var payroll_approver_phone = $("#payroll_approver_phone").val();
    var payroll_approver_ext = $("#payroll_approver_ext").val();
    var payroll_approver_fax = $("#payroll_approver_fax").val();
    var payroll_approver_email = $("#payroll_approver_email").val();
    $("#payroll_first_name").val(payroll_approver_first_name);
    $("#payroll_last_name").val(payroll_approver_last_name);
    $("#payroll_title").val(payroll_approver_title);
    $("#payroll_social_security").val(payroll_approver_social_security);
    $("#payroll_phone").val(payroll_approver_phone);
    $("#payroll_ext").val(payroll_approver_ext);
    $("#payroll_fax").val(payroll_approver_fax);
    $("#payroll_email").val(payroll_approver_email);
    $('#payroll-approver-form').modal('hide');
}

function clean_form_fields(formId) {
    var form = document.getElementById(formId);
    for (var i = 0; i < form.elements.length; i++) {
        form.elements[i].value = '';
    }
}


function get_recipient_list(reference_id, reference, retail_price) {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id,
            // disable: disable,
            retail_price: retail_price
        },
        url: base_url + 'services/home/get_recipient_list',
        dataType: "html",
        success: function (result) {
            $.ajax({
                type:"POST",
                data :  {
                    reference: reference,
                    reference_id: reference_id,
                    retail_price: retail_price
                },
                url : base_url + 'services/home/get_recipient_list_count',
                dataType: "html",
                success: function (result) {    
                    var price = result * retail_price; 
                    // $("#retail_price").val(price);        
                    $("#retail_price_override").val(price);        
                }
            });
            
            $("#recipient-list").html(result);
        }
    });
}
function get_countries_phone_code(country_code) {
    $.ajax({
        type: "POST",
        data: {
            country_code:country_code
        },
        url: base_url + 'action/home/get_countries_phone_code',
        dataType: "html",
        success: function (result) {
            $("#phone1").val(result);
        }
    });        
}