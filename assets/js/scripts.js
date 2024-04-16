/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function openLoading() {
    $('.loader-mini').show();
}

function closeLoading() {
    $('.loader-mini').hide();
}

function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
        return decodeURIComponent(name[1]);
    } else {
        return "";
    }
}

function goURL(url) {
    window.top.location = url;
}

function validateRequiredFields(formId) {
    var form = document.getElementById(formId);
    var error = false;
    var msg = "";
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
            error = true;
            msg = msg + '- ' + form.elements[i].title + '\n';
            //swal("ERROR!", "There are some required fields: " + form.elements[i].title, "error");
            //return false;
        }
    }
    if (error) {
        swal("ERROR!", "There are some required fields: \n" + msg, "error");
        return false;
    } else {
        return true;
    }
}

function cleanFormFields(formId) {
    var form = document.getElementById(formId);
    for (var i = 0; i < form.elements.length; i++) {
        form.elements[i].value = '';
    }
}

function saveCacheFormFields(formId) {
    var formData = new FormData(document.getElementById(formId));
    formData.append('form_id', formId);
    formData.append('action', 'save_cache_form_fields');
    var base_url = $("#base_url").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function () {
            console.log("Form cache saved");
        }
    });
}

function clearCacheFormFields(formId) {
    $.ajax({
        type: "POST",
        data: {form_id: formId, action: "clear_cache_form_fields"},
        url: "../ajax/system_ajax.php",
        dataType: "html",
        success: function () {
            console.log("Form cache cleaned");
        }
    });
}

function createReferenceId(reference) {
    $.ajax({
        type: "POST",
        data: {reference: reference, action: "create_reference_id"},
        url: "../ajax/system_ajax.php",
        dataType: "html",
        success: function (result) {
            console.log("Reference Id: " + result);
            if (result != 0) {
                document.getElementById('reference_id').value = result;
                return result;
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                return 0;
            }
        }
    });
}

// Employee

function newEmployeeData() {
//    cleanFormFields('form_employee');
    var employee_count = $("#employee_info").val();
    var max_employee = $("#payroll_employee_people_total").val().split("-");
    max_employee = max_employee[1];
    if (employee_count < max_employee) {
        var base_url = $("#base_url").val();
        $.ajax({
            type: "POST",
            data: {
                action: "add_employee_modal"
            },
            url: base_url + "Services/AccountingServices/system_ajax",
            dataType: "html",
            success: function (result) {
                $('#employee-form').html(result).modal('show');
            }
        });
    } else {
        swal("ERROR!", "Can not add employee more than " + max_employee, "error");
    }
}

function saveEmployee() {

    if (!validateFormRequiredFields('form_employee')) {
        return false;
    }

    //var hire_date = new Date($("#date_of_hire").val());
    // var birth_date =new Date( $("#date_of_birth").val());
    // alert(hire_date);
    //alert(birth_date);exit;
    var D1 = new Date($("#date_of_birth").val());
    var D2 = new Date($('#date_of_hire').val());


    //if(hire_date.getTime()>=birth_date.getTime() )
    if (D2.getTime() <= D1.getTime()) {
        swal("Error", "Date of Hire Should be Greater Than Date of Birth!", "error");
        return false;
    }

    var reference_id = $("#reference_id").val();
    var base_url = $("#base_url").val();

    var emailAddress = document.getElementById('email').value;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var testEmail = emailReg.test(emailAddress);
    if (testEmail == false) {
        swal("Error", "Email Address invalid!", "error");
        return false;
    }

    var formData = new FormData(document.getElementById('form_employee'));
    formData.append('reference_id', reference_id);
    formData.append('action', 'save_employee');

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log("Result: " + result);
            if (result == 2) {
                swal("ERROR!", "Error to upload file", "error");
            } else if (result == 3) {
                swal("ERROR!", "Email already exists", "error");
            } else if (result == 0) {
                swal("ERROR!", "Error to insert employee", "error");
            } else {
                cleanFormFields('form_employee');
                $('#employee-form').modal('hide');
                document.getElementById('quant_employee').value = parseInt(document.getElementById('quant_employee').value) + 1;
                loadEmployeeList(reference_id, base_url);
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

function loadEmployeeList(reference_id, base_url) {
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id,
            action: "reload_employee_list"
        },
        url: base_url + 'Services/Incorporation/system_ajax',
        dataType: "html",
        success: function (result) {
            document.getElementById('employee-list').innerHTML = result;
        }
    });
}

function editEmployee(employee_id) {
    var base_url = $("#base_url").val();
    $.ajax({
        type: "POST",
        data: {
            employee_id: employee_id,
            action: "edit_employee_modal"
        },
        url: base_url + 'Services/Incorporation/system_ajax',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                $('#employee-form').html(result).modal('show');
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

function updateEmployee() {
    if (!validateFormRequiredFields('form_employee')) {
        return false;
    }

    // var hire_date = new Date($("#date_of_hire").val());
    // var birth_date =new Date( $("#date_of_birth").val());
    // var hire_date = $("#date_of_hire").val();
    // var birth_date = $("#date_of_birth").val();
    var D1 = new Date($("#date_of_birth").val());
    var D2 = new Date($('#date_of_hire').val());


//if(D2.getTime() <= D1.getTime())
    //if(hire_date.getTime()>=birth_date.getTime() )
    if (D2.getTime() <= D1.getTime()) {

        swal("Error", "Date of Hire Should be Greater Than Date of Birth!", "error");
        return false;
    }

    var reference_id = $("#reference_id").val();
    var employee_id = $("#employee_id").val();
    var base_url = $("#base_url").val();

    var emailAddress = document.getElementById('email').value;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var testEmail = emailReg.test(emailAddress);
    if (testEmail == false) {
        swal("Error", "Email Address invalid!", "error");
        return false;
    }

    var formData = new FormData(document.getElementById('form_employee'));
    formData.append('employee_id', employee_id);
    formData.append('action', 'update_employee');

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log("Result: " + result);
            if (result == 2) {
                swal("ERROR!", "Error to upload file", "error");
            } else if (result == 3) {
                swal("ERROR!", "Email already exists", "error");
            } else if (result == 0) {
                swal("ERROR!", "Error to update employee", "error");
            } else {
                cleanFormFields('form_employee');
                $('#employee-form').modal('hide');
                loadEmployeeList(reference_id, base_url);
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

function deleteEmployee(employee_id) {
    var base_url = $("#base_url").val();
    swal({
            title: "Are you sure?",
            text: "This employee will be deleted!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            closeOnConfirm: true
        },
        function () {
            $.ajax({
                type: "POST",
                data: {
                    employee_id: employee_id,
                    action: "delete_employee"
                },
                url: base_url + 'Services/Incorporation/system_ajax',
                dataType: "html",
                success: function (result) {
                    if (result != 0) {
                        var reference_id = $("#reference_id").val();
                        document.getElementById('quant_employee').value = parseInt(document.getElementById('quant_employee').value) - 1;
                        loadEmployeeList(reference_id, base_url);
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

/* Contacts */
function newContact() {
    show_add_company("add");
}

function newPayroll() {
    cleanFormFields('form_payrollapprover');
    $('#payrollapprover-form').modal('show');
}

function newAccount(action, base_url) {
//    cleanFormFields('form_accounts');
//    removeSecurity();
    $.ajax({
        type: "POST",
        data: {
            action: "add_financial_account_" + action
        },
        url: base_url + "Services/AccountingServices/system_ajax",
        dataType: "html",
        success: function (result) {
            $('#accounts-form').html(result).modal('show');
        }
    });
}

function newPayrollAccount(action, base_url) {
    //    cleanFormFields('form_accounts');
    //    removeSecurity();
    $.ajax({
        type: "POST",
        data: {
            action: "add_payroll_financial_account_" + action
        },
        url: base_url + "Services/AccountingServices/system_ajax",
        dataType: "html",
        success: function (result) {
            $('#accounts-form').html(result).modal('show');
        }
    });
}

function removeSecurity() {
    $(".rem-secq").trigger('click');
}

function saveContact() {
    if (!validateRequiredFields('form_contact')) {
        return false;
    }
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var base_url = $("#base_url").val();

    var emailAddress = document.getElementById('emailaddress').value;
    //alert(emailAddress);
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var testEmail = emailReg.test(emailAddress);
    if (testEmail == false) {
        swal("Error", "Email Address invalid!", "error");
        return false;
    }

    var formData = new FormData(document.getElementById('form_contact'));
    formData.append('reference', reference);
    formData.append('reference_id', reference_id);
    formData.append('action', 'save_contact');

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            console.log("Result: " + result);
            if (result > 1) {
                cleanFormFields('form_contact');
                $('#contact-form').modal('hide');
                document.getElementById('quant_contact').value = parseInt(document.getElementById('quant_contact').value) + 1;
                loadContactList(reference, reference_id, base_url);
            }
            // else if (result == 1) {
            //     swal("ERROR!", "Email address exists", "error");
            // } 
            else {
                swal("ERROR!", "You cannot add more than one contact of same contact type", "error");
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

function savePayrollapprover() {
    if (!validateRequiredFields('form_payrollapprover')) {
        return false;
    }
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var base_url = $("#base_url").val();

    var emailAddress = document.getElementById('payroll_email').value;
    //alert(emailAddress);
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var testEmail = emailReg.test(emailAddress);
    if (testEmail == false) {
        swal("Error", "Email Address invalid!", "error");
        return false;
    }

    var formData = new FormData(document.getElementById('form_payrollapprover'));
    formData.append('reference', reference);
    formData.append('reference_id', reference_id);

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/AccountingServices/save_payroll_approver',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            console.log("Result: " + result);
            if (result != 0) {
                cleanFormFields('form_payrollapprover');
                $('#payrollapprover-form').modal('hide');
                $("#payroll_first_name").val('');
                $("#payroll_last_name").val('');
                $("#payroll_email").val('');
                $("#payroll_phone").val('');
                $("#payroll_title").val('');
                $("#payroll_social_security").val('');
                $("#payroll_fax").val('');
                $("#payroll_ext").val('');
                $("#payroll_approver_quantity").val(1);
                res = JSON.parse(result);
                $("#payroll_first_name").val(res.fname);
                $("#payroll_last_name").val(res.lname);
                $("#payroll_title").val(res.title);
                $("#payroll_social_security").val(res.social_security);
                $("#payroll_phone").val(res.phone);
                $("#payroll_ext").val(res.ext);
                $("#payroll_fax").val(res.fax);
                $("#payroll_email").val(res.email);
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

function saveContactbook() {
    if (!validateRequiredFields('form_contact')) {
        return false;
    }
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var base_url = $("#base_url").val();

    var emailAddress = document.getElementById('emailaddress').value;
    //alert(emailAddress);
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var testEmail = emailReg.test(emailAddress);
    if (testEmail == false) {
        swal("Error", "Email Address invalid!", "error");
        return false;
    }

    var formData = new FormData(document.getElementById('form_contact'));
    formData.append('reference', reference);
    formData.append('reference_id', reference_id);
    formData.append('action', 'save_contact_book');

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            console.log("Result: " + result);
            if (result > 1) {
                cleanFormFields('form_contact');
                $('#contact-form').modal('hide');
                document.getElementById('quant_contact').value = parseInt(document.getElementById('quant_contact').value) + 1;
                loadContactListbook(reference, reference_id, base_url);
            }
            //  else if (result == 1) {
            //     swal("ERROR!", "Email address exists", "error");
            // } 
            else {
                swal("ERROR!", "You cannot add more than one contact of same contact type", "error");
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

function saveAccountsbydate() {
    if (!validateRequiredFields('form_accounts')) {
        return false;
    }
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var base_url = $("#base_url").val();
    var retailprice = $("#retail-price-hidd").val();


    var formData = new FormData(document.getElementById('form_accounts'));
    formData.append('reference', reference);
    formData.append('reference_id', reference_id);
    formData.append('action', 'save_accounts_by_date');
    var start = $("#start_month").val();
    var end = $("#complete_month").val();
    if (start != "" && end != "") {
        monthDiff(start, end, function (result) {
            if (result.trim() != "N") {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'Services/AccountingServices/system_ajax',
                    data: formData,
                    enctype: 'multipart/form-data',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        //alert(result);
                        console.log("Result: " + result);
                        if (result != 0) {
                            cleanFormFields('form_accounts');
                            $("#accounts-form #total_amount").val(149);
                            $('#accounts-form').modal('hide');
                            loadAccountsListbydate(reference_id, base_url);
                            document.getElementById('quant_account').value = parseInt(document.getElementById('quant_account').value) + 1;
                            change_retail_price(reference_id, base_url, retailprice);
                        } else {
                            swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
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
            } else {
                swal("ERROR!", "Start month can not be grater than complete month", "error");
                return false;
            }
        });
    }
}

function saveAccounts() {
    if (!validateRequiredFields('form_accounts')) {
        return false;
    }
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var base_url = $("#base_url").val();
    var retailprice = $("#retail-price-hidd").val();


    var formData = new FormData(document.getElementById('form_accounts'));
    formData.append('reference', reference);
    formData.append('reference_id', reference_id);
    formData.append('action', 'save_accounts');

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/AccountingServices/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            console.log("Result: " + result);
            if (result != 0) {
                cleanFormFields('form_accounts');
                $("#accounts-form #total_amount").val(149);
                $('#accounts-form').modal('hide');
                loadAccountsList(reference_id, base_url);
                document.getElementById('quant_account').value = parseInt(document.getElementById('quant_account').value) + 1;
                change_retail_price(reference_id, base_url, retailprice);
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
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

function savePayrollAccounts() {
    if (!validateRequiredFields('form_accounts')) {
        return false;
    }
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var base_url = $("#base_url").val();
    var retailprice = $("#retail-price-hidd").val();


    var formData = new FormData(document.getElementById('form_accounts'));
    formData.append('reference', reference);
    formData.append('reference_id', reference_id);
    formData.append('action', 'save_accounts');

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/AccountingServices/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            console.log("Result: " + result);
            if (result != 0) {
                cleanFormFields('form_accounts');
                $("#accounts-form #total_amount").val(149);
                $('#accounts-form').modal('hide');
                loadPayrollAccountsList(reference_id, base_url);
                document.getElementById('quant_account').value = parseInt(document.getElementById('quant_account').value) + 1;
                change_retail_price(reference_id, base_url, retailprice);
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
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

function monthDiff(start_date, end_date, return_data) {
    var base_url = $('#baseurl').val();
    $.ajax({
        type: "POST",
        data: {
            start_date: start_date,
            end_date: end_date
        },
        url: base_url + 'Services/AccountingServices/get_month_diff',
        success: function (result) {
            return_data(result);
        }
    });
}

function loadContactList(reference, reference_id, base_url) {
    $.ajax({
        type: "POST",
        data: {reference: reference, reference_id: reference_id, action: "reload_contact_list"},
        url: base_url + 'Services/Incorporation/system_ajax',
        dataType: "html",
        success: function (result) {
            document.getElementById('contact-list').innerHTML = result;
        }
    });
}

function loadContactListbook(reference, reference_id, base_url) {
    $.ajax({
        type: "POST",
        data: {reference: reference, reference_id: reference_id, action: "reload_contact_list_book"},
        url: base_url + 'Services/Incorporation/system_ajax',
        dataType: "html",
        success: function (result) {
            document.getElementById('contact-list').innerHTML = result;
        }
    });
}

function saveContactList(reference, reference_id, base_url, new_reference_id) {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id,
            new_reference_id: new_reference_id,
            action: "save_existing_contact_list"
        },
        url: base_url + 'Services/Incorporation/system_ajax',
        dataType: "html",
        success: function (result) {
            //alert(result);
            if (result.trim() != 0) {
                document.getElementById('quant_contact').value = result;
            }
        }
    });
}

function loadAccountsList(reference_id, base_url) {
    $.ajax({
        type: "POST",
        data: {reference_id: reference_id, action: "reload_accounts_list"},
        url: base_url + 'Services/AccountingServices/system_ajax',
        dataType: "html",
        success: function (result) {
            document.getElementById('accounts-list').innerHTML = result;
        }
    });
}

function loadPayrollAccountsList(reference_id, base_url) {
    $.ajax({
        type: "POST",
        data: {reference_id: reference_id, action: "reload_payroll_accounts_list"},
        url: base_url + 'Services/AccountingServices/system_ajax',
        dataType: "html",
        success: function (result) {
            document.getElementById('accounts-list').innerHTML = result;
        }
    });
}

function loadAccountsListbydate(reference_id, base_url) {
    $.ajax({
        type: "POST",
        data: {reference_id: reference_id, action: "reload_accounts_list_bydate"},
        url: base_url + 'Services/AccountingServices/system_ajax',
        dataType: "html",
        success: function (result) {
            document.getElementById('accounts-list').innerHTML = result;
        }
    });
}

function change_retail_price(reference_id, base_url, retailprice) {
    $.ajax({
        type: "POST",
        data: {reference_id: reference_id, action: "reload_retail_price"},
        url: base_url + 'Services/AccountingServices/system_ajax',
        dataType: "html",
        success: function (result) {
            //alert(result);
            if (result != 0) {
                var amt = parseInt(retailprice) + parseInt(result);
                document.getElementById('retail-price').value = amt;
                document.getElementById('retail-price-hidd').value = amt;
            }
        }
    });
}

function deleteContactbookkeeping(contact_id) {
    if ($(".contactdelete").hasClass("dcdelete")) {
        return false;
    } else {
        var base_url = $("#base_url").val();

        swal(
            {
                title: "Are you sure?",
                text: "This contact will be deleted!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes!",
                closeOnConfirm: true
            },
            function () {
                $.ajax({
                    type: "POST",
                    data: {contact_id: contact_id, action: "delete_contact"},
                    url: base_url + 'Services/Incorporation/system_ajax',
                    dataType: "html",
                    success: function (result) {
                        if (result != 0) {
                            var reference = $("#reference").val();
                            var reference_id = $("#reference_id").val();
                            document.getElementById('quant_contact').value = parseInt(document.getElementById('quant_contact').value) - 1;
                            loadContactListbook(reference, reference_id, base_url);
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
        )
    }
}


function deleteContactList(reference_id, base_url) {
    $.ajax({
        type: "POST",
        data: {reference_id: reference_id},
        url: base_url + 'Services/AccountingServices/deleteContactList',
        dataType: "html",
        success: function (result) {
            //alert(result);
        }
    });
}

function deleteOwnerList(reference_id, base_url) {
    $.ajax({
        type: "POST",
        data: {reference_id: reference_id},
        url: base_url + 'Services/AccountingServices/deleteOwnerList',
        dataType: "html",
        success: function (result) {
            //alert(result);
        }
    });
}

function deleteAccount(account_id) {
    var base_url = $("#base_url").val();

    swal(
        {
            title: "Are you sure?",
            text: "This contact will be deleted!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            closeOnConfirm: true
        },
        function () {
            $.ajax({
                type: "POST",
                data: {account_id: account_id, action: "delete_account"},
                url: base_url + 'Services/AccountingServices/system_ajax',
                dataType: "html",
                success: function (result) {
                    if (result != 0) {
                        var reference_id = $("#reference_id").val();
                        document.getElementById('quant_account').value = parseInt(document.getElementById('quant_account').value) - 1;
                        loadAccountsList(reference_id, base_url);
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
    )
}

function deletePayrollAccount(account_id) {
    var base_url = $("#base_url").val();

    swal(
        {
            title: "Are you sure?",
            text: "This contact will be deleted!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            closeOnConfirm: true
        },
        function () {
            $.ajax({
                type: "POST",
                data: {account_id: account_id, action: "delete_account"},
                url: base_url + 'Services/AccountingServices/system_ajax',
                dataType: "html",
                success: function (result) {
                    if (result != 0) {
                        var reference_id = $("#reference_id").val();
                        document.getElementById('quant_account').value = parseInt(document.getElementById('quant_account').value) - 1;
                        loadPayrollAccountsList(reference_id, base_url);
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
    )
}

function deleteAccountbydate() {
    var base_url = $("#base_url").val();

    swal(
        {
            title: "Are you sure?",
            text: "This contact will be deleted!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            closeOnConfirm: true
        },
        function () {
            $.ajax({
                type: "POST",
                data: {account_id: account_id, action: "delete_account"},
                url: base_url + 'Services/AccountingServices/system_ajax',
                dataType: "html",
                success: function (result) {
                    if (result != 0) {
                        var reference_id = $("#reference_id").val();
                        document.getElementById('quant_account').value = parseInt(document.getElementById('quant_account').value) - 1;
                        loadAccountsListbydate(reference_id, base_url);
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
    )


}

function editContactbookkeeping(contact_id) {
    if ($(".contactedit").hasClass("dcedit")) {
        return false;
    } else {
        var base_url = $("#base_url").val();
        $.ajax({
            type: "POST",
            data: {contact_id: contact_id, action: "get_contact_json"},
            url: base_url + 'Services/Incorporation/system_ajax',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    console.log("Contact: " + result);
                    contact = JSON.parse(result);

                    document.form_contact.type.value = contact.type;
                    document.form_contact.contact_first_name.value = contact.first_name;
                    document.form_contact.contact_last_name.value = contact.last_name;
                    document.form_contact.phone1_country.value = contact.phone1_country;
                    document.form_contact.phone1.value = contact.phone1;
                    document.form_contact.email1.value = contact.email1;
                    document.form_contact.address1.value = contact.address1;
                    document.form_contact.city.value = contact.city;
                    document.form_contact.state.value = contact.state;
                    document.form_contact.zip.value = contact.zip;
                    document.form_contact.country.value = contact.country;
                    document.form_contact.id.value = contact.id;

                    $('#contact-form').modal('show');
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
}

function editAccountbydate(account_id) {
    var base_url = $("#base_url").val();
    $.ajax({
        type: "POST",
        data: {account_id: account_id, action: "get_account_json_by_date"},
        url: base_url + 'Services/AccountingServices/system_ajax',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                $('#accounts-form').html(result);
                $('#accounts-form').modal('show');
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

function editAccount(account_id) {
    var base_url = $("#base_url").val();
    $.ajax({
        type: "POST",
        data: {account_id: account_id, action: "get_account_json"},
        url: base_url + 'Services/AccountingServices/system_ajax',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                // console.log("Account: " + result);
                // account = JSON.parse(result);

                // document.form_accounts.type.value = account.type_of_account;
                // document.form_accounts.bankname.value = account.bank_name;
                // document.form_accounts.acc_no.value = account.account_number;
                // document.form_accounts.routing_no.value = account.routing_number;
                // document.form_accounts.user_id.value = account.user;
                // document.form_accounts.password.value = account.password;
                // document.form_accounts.website_url.value = account.bank_website;
                // document.form_accounts.no_of_transactions.value = account.number_of_transactions;
                // document.form_accounts.total_amount.value = account.total_amount;
                // document.form_accounts.idval.value = account.id;
                // document.getElementById("uploadifle").innerHTML = account.acc_doc;

                // var secqLength = account.secq.length;

                // var secq = account.secq;
                // var i;
                // for(i=0;i<=secqLength;i++){

                // }
                $('#accounts-form').html(result);
                $('#accounts-form').modal('show');
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

function editPayrollAccount(account_id) {
    var base_url = $("#base_url").val();
    $.ajax({
        type: "POST",
        data: {account_id: account_id, action: "get_payroll_account_json"},
        url: base_url + 'Services/AccountingServices/system_ajax',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                // console.log("Account: " + result);
                // account = JSON.parse(result);

                // document.form_accounts.type.value = account.type_of_account;
                // document.form_accounts.bankname.value = account.bank_name;
                // document.form_accounts.acc_no.value = account.account_number;
                // document.form_accounts.routing_no.value = account.routing_number;
                // document.form_accounts.user_id.value = account.user;
                // document.form_accounts.password.value = account.password;
                // document.form_accounts.website_url.value = account.bank_website;
                // document.form_accounts.no_of_transactions.value = account.number_of_transactions;
                // document.form_accounts.total_amount.value = account.total_amount;
                // document.form_accounts.idval.value = account.id;
                // document.getElementById("uploadifle").innerHTML = account.acc_doc;

                // var secqLength = account.secq.length;

                // var secq = account.secq;
                // var i;
                // for(i=0;i<=secqLength;i++){

                // }
                $('#accounts-form').html(result);
                $('#accounts-form').modal('show');
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

/* Documents */
//function saveDocument() {
//
//    var reference = $("#reference").val();
//    var reference_id = $("#reference_id").val();
//    var base_url = $("#base_url").val();
//
//    var formData = new FormData(document.getElementById('form_document'));
//    formData.append('reference', reference);
//    formData.append('reference_id', reference_id);
//    formData.append('action', 'save_document');
//
//    $.ajax({
//        type: 'POST',
//        url: base_url + 'Services/Incorporation/system_ajax',
//        data: formData,
//        enctype: 'multipart/form-data',
//        cache: false,
//        contentType: false,
//        processData: false,
//        success: function (result) {
//            console.log("Result: " + result);
//            if (result != 0) {
//                cleanFormFields('form_document');
//                $('#document-form').modal('hide');
//                document.getElementById('quant_documents').value = parseInt(document.getElementById('quant_documents').value) + 1;
//                reloadDocumentList(reference, reference_id, base_url);
//            } else {
//                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
//            }
//            console.log("Reference Id: " + $("#reference_id").val());
//        },
//        beforeSend: function () {
//            openLoading();
//        },
//        complete: function (msg) {
//            closeLoading();
//        }
//    });
//}

function reloadDocumentList(reference, reference_id, base_url) {
    $.ajax({
        type: "POST",
        data: {reference: reference, reference_id: reference_id, action: "reload_document_list"},
        url: base_url + 'Services/Incorporation/system_ajax',
        dataType: "html",
        success: function (result) {
            document.getElementById('document-list').innerHTML = result;
        }
    });
}

function deleteDocument(document_id) {

    var base_url = $("#base_url").val();
    swal(
        {
            title: "Are you sure?",
            text: "This document will be deleted!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            closeOnConfirm: true
        },
        function () {
            $.ajax({
                type: "POST",
                data: {document_id: document_id, action: "delete_document"},
                url: base_url + 'Services/Incorporation/system_ajax',
                dataType: "html",
                success: function (result) {
                    if (result != 0) {
                        var reference = $("#reference").val();
                        var reference_id = $("#reference_id").val();
                        document.getElementById('quant_documents').value = parseInt(document.getElementById('quant_documents').value) - 1;
                        reloadDocumentList(reference, reference_id, base_url);
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
    )
}

function openDocument(file, base_url) {

    var path = base_url.replace('ci/', '');

    window.open(
        path + 'uploads/' + file,
        'Document',
        "width=650, height=550, top=100, left=110, scrollbars=auto ");
}

function loadPartnerManager(office_id, partner_id = '', manager_id = '') {

    var base_url = $("#base_url").val();
    $.ajax({
        type: "POST",
        data: {office_id: office_id},
        url: base_url + 'services/home/load_partner_manager_edit',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                staff = JSON.parse(result);

                // $("#partner").chosen("destroy");
                $('#partner').empty();
                partner = document.getElementById('partner');
                partner.options[partner.options.length] = new Option("Select an option", "");

                // $("#manager").chosen("destroy");
                $('#manager').empty();
                manager = document.getElementById('manager');
                manager.options[manager.options.length] = new Option("Select an option", "");

                for (i = 0; i < staff.length; i++) {
                    partner.options[partner.options.length] = new Option(staff[i].name, staff[i].id);
                    manager.options[manager.options.length] = new Option(staff[i].name, staff[i].id);
                }

                if (partner_id != '') {
                    $('#partner').val(partner_id);
                }
                //$("#partner").chosen({width: "100%"});
                if (manager_id != '') {
                    $('#manager').val(manager_id);
                }
                //$("#manager").chosen({width: "100%"});

            } else {
                //swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
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

/* Services */
function newServiceRequest(id, url) {
    if (id != 1) {
        alert("This service is not implemented yet!");
        return false;
    }
    swal(
        {
            title: "Are you sure?",
            text: "This actions will generate a billable transaction and invoice!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            closeOnConfirm: true
        },
        function () {
            goURL(url);
        }
    )
}

function requestCreateNewCompany() {

    if (!validateRequiredFields('form_create_new_company')) {
        return false;
    }
    var base_url = $("#base_url").val();
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var company_type = $("#type option:selected").val();


    var quant_contact = parseInt(document.getElementById('quant_contact').value);

    if (quant_contact == 0) {
        swal("Error", "You have to enter at least one contact info!", "error");
        return false;
    }

    var quant_title = parseInt(document.getElementById('quant_title').value);
    if (quant_title == 0) {
        swal("Error", "You have to enter at least one owner for this company!", "error");
        return false;
    }

    var quant_documents = parseInt(document.getElementById('quant_documents').value);
    // if (!quant_documents){
    //     swal("Error", "You have to enter at least one document for this company!", "error");
    //     return false;
    // }

    //if (company_type == '3') {

        var total_percentage = $("#owner_percentage_total").val();
        if (total_percentage != '100.00') {
            swal("Error", "Percentage of all partners should equal to 100%", "error");
            return false;
        }
    //}

    enable_company_type_dropdown();
    $('.related_service').each(function () {
        if (!$(this).is(':visible')) {
            $(this).remove();
        }
    });
    var formData = new FormData(document.getElementById('form_create_new_company'));

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            console.log("Result: " + result);
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                clearCacheFormFields('form_create_new_company');
                goURL(base_url + 'Login/dashboard');
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

function requestCreateBookkeeping() {

    if (!validateRequiredFields('form_create_new_company')) {
        return false;
    }
    var base_url = $("#base_url").val();
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var company_type = $("#type option:selected").val();


    var quant_contact = parseInt(document.getElementById('quant_contact').value);

    if (quant_contact == 0) {
        swal("Error", "You have to enter at least one contact info!", "error");
        return false;
    }

    var quant_title = parseInt(document.getElementById('quant_title').value);
    if (quant_title == 0) {
        swal("Error", "You have to enter at least one owner for this company!", "error");
        return false;
    }

    var quant_documents = parseInt(document.getElementById('quant_documents').value);
    // if (!quant_documents){
    //     swal("Error", "You have to enter at least one document for this company!", "error");
    //     return false;
    // }

    var quant_account = parseInt(document.getElementById('quant_account').value);
    if (quant_account == 0) {
        swal("Error", "You have to enter at least one financial account for this company!", "error");
        return false;
    }

    //if (company_type == '3') {

        var total_percentage = $("#owner_percentage_total").val();
        if (total_percentage != '100.00') {
            swal("Error", "Percentage of all partners should equal to 100%", "error");
            return false;
        }
    //}

    enable_company_type_dropdown();

    $('.related_service').each(function () {
        if (!$(this).is(':visible')) {
            $(this).remove();
        }
    });

    var formData = new FormData(document.getElementById('form_create_new_company'));

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/AccountingServices/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            console.log("Result: " + result);
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                clearCacheFormFields('form_create_new_company');
                goURL(base_url + 'Login/dashboard');
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

function cancelRequestCreateNewCompany() {
    clearCacheFormFields('form_create_new_company');
    goURL('../');
}

function cancelRequestCreatePayroll() {
    clearCacheFormFields('form_create_new_company');
    goURL('../');
}
function cancelDocument() {
    clearCacheFormFields('form_create_new_company');
    goURL('../home/documents');
}

function cancelRequestCreateSalesTaxApplication() {
    clearCacheFormFields('form_create_new_company');
    goURL('../');
}
function cancelRequestCreateSalestaxRecurring() {
    clearCacheFormFields('form_create_new_company');
    goURL('../');
}

function cancelRequestCreateRt6UnemploymentAapp() {
    clearCacheFormFields('form_create_new_company');
    goURL('../');
}

function cancelRequestCreateBookkeeping() {
    clearCacheFormFields('form_create_new_company');
    goURL('../');
}

function cancelAddStaff() {
    goURL('../Incorporation/manage_staff');
}

function cancelAddFranchise() {
    goURL('../');
}

function AddStaff() {
    if (!validateRequiredFields('form_create_new_company')) {
        return false;
    }

    var emailAddress = document.getElementById('emailaddress').value;
    //alert(emailAddress);
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var testEmail = emailReg.test(emailAddress);
    if (testEmail == false) {
        swal("Error", "Email Address invalid!", "error");
        return false;
    }

    var base_url = $("#base_url").val();

    var formData = new FormData(document.getElementById('form_create_new_company'));

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {

            console.log("Result: " + result);
            if (result == 1) {
                swal("Success!", "Successfully added!", "success");
                clearCacheFormFields('form_create_new_company');
                goURL(base_url + 'Services/Incorporation/manage_staff');
            } else if (result == 2) {
                swal("ERROR!", "Filetype not supported.", "error");
            } else if (result == 3) {
                swal("ERROR!", "Email already exist!", "error");
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

function updateStaff() {
    if (!validateRequiredFields('form_create_new_company_edit')) {
        return false;
    }

    var base_url = $("#base_url").val();

    var formData = new FormData(document.getElementById('form_create_new_company_edit'));

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {

            console.log("Result: " + result);
            if (result == 1) {
                swal("Success!", "Successfully updated!", "success");
                clearCacheFormFields('form_create_new_company_edit');
                goURL(base_url + 'Services/incorporation/manage_staff');
            } else if (result == 2) {
                swal("ERROR!", "Filetype not supported.", "error");
            } else if (result == 3) {
                swal("ERROR!", "Email already exist!", "error");
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

function AddFranchise() {
    if (!validateRequiredFields('form_create_new_company')) {
        return false;
    }

    var emailAddress = document.getElementById('emailaddress').value;
    //alert(emailAddress);
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var testEmail = emailReg.test(emailAddress);
    if (testEmail == false) {
        swal("Error", "Email Address invalid!", "error");
        return false;
    }

    var base_url = $("#base_url").val();

    var formData = new FormData(document.getElementById('form_create_new_company'));

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //alert(result);
            console.log("Result: " + result);
            if (result == 1) {
                swal("Success!", "Successfully added!", "success");
                clearCacheFormFields('form_create_new_company');
                goURL(base_url + 'Services/incorporation/add_franchise');
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

function openOwnerFormPopup(service_id, company_id, title_id) {
    if ($(".owneredit").hasClass("doedit")) {
        return false;
    } else {

        var e = document.getElementById("type");
        var company_type = e.options[e.selectedIndex].value;
        if (company_type == '') {
            swal("Error", "You have to select company type first!", "error");
            return false;
        } else {
            var base_url = $("#base_url").val();
            var url = base_url + 'Services/Incorporation/ownerForm/' + service_id + '/' + company_id;
            if (parseInt(title_id) > 0) {
                url = url + '/' + title_id;
            }

            url = url + '?q=' + company_type;

            window.open(url, 'Add Owner', "width=1200, height=600, top=100, left=110, scrollbars=yes");
        }
    }
}

function saveOwner() {

    if (!validateRequiredFields('form_title')) {
        return false;
    }
    var num = document.getElementById("per_id").value;
    if (isNaN(num)) {
        swal("ERROR!", "An error ocurred! \n Please, enter numeric value.", "error");
        return false;
    }
    var base_url = $("#base_url").val();
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var company_id = $("#company_id").val();

    var formData = new FormData(document.getElementById('form_title'));

    var quant_contact = parseInt(document.getElementById('quant_contact').value);
    // if (!quant_contact){
    //     swal("Error", "You have to enter at least one contact info!", "error");
    //     return false;
    // }

    var quant_documents = parseInt(document.getElementById('quant_documents').value);
    // if (!quant_documents){
    //     swal("Error", "You have to enter at least one document for this owner!", "error");
    //     return false;
    // }

    $.ajax({
        type: 'POST',
        url: base_url + 'Services/Incorporation/system_ajax',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {

            console.log("Result: " + result);
            if (result == 1) {
                clearCacheFormFields('form_title');
                window.opener.reloadOwnerList(company_id, base_url);
                window.opener.reload_owner_list_for_payroll_section(company_id, base_url);
                window.opener.reload_owner_list_for_payroll_section2(company_id, base_url);
                window.opener.reload_owner_list_for_payroll_section3(company_id, base_url);

                var quant_title = parseInt(window.opener.document.getElementById('quant_title').value);
                window.opener.document.getElementById('quant_title').value = quant_title + 1;

                window.opener.swal("Success!", "Successfully saved!", "success");
                window.opener.disable_company_type();
                self.close();
            } else if (result == 2) {
                swal("ERROR!", "If you choose LLC, total share should be always 100%", "error");
            } else if (result == 0) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
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

function disable_company_type() {
    $('#type').prop('disabled', true);
}

function enable_company_type_dropdown() {
    $('#type').prop('disabled', false);

    $('#state').prop('disabled', false);
    $('.office-internal #office').prop('disabled', false);
    $('#partner').prop('disabled', false);
    $('#manager').prop('disabled', false);
    $("#client_association").prop("disabled", false);
    $("#referred_by_source").prop('disabled', false);
    $("#referred-by-name").prop("disabled", false);
    $("#language").prop('disabled', false);
}

function deleteOwner(owner_id) {
    if ($(".ownerdelete").hasClass("dodelete")) {
        return false;
    } else {

        var base_url = $("#base_url").val();
        //var company_id = $("#reference_id").val();
        swal(
            {
                title: "Are you sure?",
                text: "This owner will be deleted!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes!",
                closeOnConfirm: true
            },
            function () {
                $.ajax({
                    type: "POST",
                    data: {owner_id: owner_id, action: "delete_owner"},
                    url: base_url + 'Services/Incorporation/system_ajax',
                    dataType: "html",
                    success: function (result) {
                        if (result != 0) {
                            var company_id = $("#reference_id").val();
                            // console.log(company_id);
                            document.getElementById('quant_title').value = parseInt(document.getElementById('quant_title').value) - 1;
                            reloadOwnerList(company_id, base_url);
                            reload_owner_list_for_payroll_section(company_id, base_url);
                            reload_owner_list_for_payroll_section2(company_id, base_url);
                            reload_owner_list_for_payroll_section3(company_id, base_url);
                            enableCompanyType(company_id, base_url);
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
        )
    }
}


function reloadOwnerList(company_id, base_url) {
    $.ajax({
        type: "POST",
        data: {company_id: company_id, action: "reload_owner_list"},
        url: base_url + 'Services/Incorporation/system_ajax',
        dataType: "html",
        success: function (result) {
            document.getElementById('owners-list').innerHTML = result;
        }
    });
}

function saveOwnerList(company_id, base_url, new_reference_id) {
    $.ajax({
        type: "POST",
        data: {company_id: company_id, new_reference_id: new_reference_id, action: "save_existing_owner_list"},
        url: base_url + 'Services/Incorporation/system_ajax',
        dataType: "html",
        success: function (result) {
            //alert(result);
            if (result.trim() != 0) {
                document.getElementById('quant_title').value = result;
            }
        }
    });
}


function enableCompanyType(company_id, base_url) {
    $.ajax({
        type: "POST",
        data: {company_id: company_id},
        url: base_url + 'services/home/enable_company_type',
        dataType: "html",
        success: function (result) {
            //alert(result);
            if (result.trim() == 0) {
                enable_company_type_dropdown();
            }
        }
    });
}

function reload_owner_list_for_payroll_section(company_id, base_url) {
    $.ajax({
        type: "POST",
        data: {company_id: company_id},
        url: base_url + 'Services/AccountingServices/reload_owner_list_for_payroll_section',
        dataType: "html",
        success: function (result) {
            //alert(result);
            document.getElementById('owner-list-payroll').innerHTML = result;
        }
    });

}

function reload_owner_list_for_payroll_section2(company_id, base_url) {
    $.ajax({
        type: "POST",
        data: {company_id: company_id},
        url: base_url + 'Services/AccountingServices/reload_owner_list_for_payroll_section2',
        dataType: "html",
        success: function (result) {
            //alert(result);
            document.getElementById('owner-list-payroll2').innerHTML = result;
        }
    });

}

function loadcompanydata(clientid, base_url, new_reference_id) {
    $.ajax({
        type: "POST",
        data: {clientid: clientid, new_reference_id: new_reference_id},
        url: base_url + 'Services/AccountingServices/payroll_company_data',
        dataType: "html",
        success: function (result) {
            //alert(result);
            if (result != '0') {
                res = JSON.parse(result);
                //alert(res.dba);
                if (res.dba) {
                    $("#dba").val(res.dba);
                }
                if (res.company_address) {
                    $("#company_address").val(res.company_address);
                }
                if (res.city) {
                    $("#company_city").val(res.city);
                }
                if (res.state) {
                    $("#company_state").val(res.state);
                }
                if (res.city) {
                    $("#company_zip").val(res.zip);
                }
                if (res.fein) {
                    $("#fein").val(res.fein);
                }
                if (res.type) {
                    $("#type").val(res.type);
                }
                if (res.fye) {
                    $("#fye").val(res.fye);
                }
                if (res.company_started) {
                    $("#company_started").val(res.company_started);
                }
                if (res.phone_number) {
                    $("#company_phone").val(res.phone_number);
                }
                if (res.fax) {
                    $("#company_fax").val(res.fax);
                }
                if (res.email) {
                    $("#company_email").val(res.email);
                }
                if (res.business_description != 'null') {
                    $("#business_description").val(res.business_description);
                }
                // notes remaining
            }
        }
    });
}

function deletecompanydata() {

    $("#dba").val('');

    $("#company_address").val('');

    $("#company_city").val('');

    $("#company_state").val('');

    $("#company_zip").val('');

    $("#fein").val('');

    $("#type").val('');

    $("#fye").val('');

    $("#company_started").val('');

    $("#company_phone").val('');

    $("#company_fax").val('');

    $("#company_email").val('');

    $("#business_description").val('');

}

function reload_owner_list_for_payroll_section3(company_id, base_url) {
    $.ajax({
        type: "POST",
        data: {company_id: company_id},
        url: base_url + 'Services/AccountingServices/reload_owner_list_for_payroll_section3',
        dataType: "html",
        success: function (result) {
            //alert(result);
            document.getElementById('owner-list-payroll3').innerHTML = result;
        }
    });

}

function validateFormRequiredFields(formId) {
    var form = document.getElementById(formId);
    var error = false;
    var msg = "";
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].hasAttribute('required')) {
            if (form.elements[i].hasAttribute("type")) {
                if (form.elements[i].type == "radio") {
                    var rad = document.getElementsByName(form.elements[i].name);
                    if (rad[0].value == form.elements[i].value) {
                        var radValue = $('input[name=' + form.elements[i].name + ']:checked').val();
                        if (radValue == undefined) {
                            error = true;
                            msg = msg + '- ' + form.elements[i].title + '\n';
                        }
                    }
                } else {
                    if (form.elements[i].value === '') {
                        error = true;
                        msg = msg + '- ' + form.elements[i].title + '\n';
                    }
                }
            } else {
                if (form.elements[i].value === '') {
                    error = true;
                    msg = msg + '- ' + form.elements[i].title + '\n';
                }
            }
        }
    }
    if (error) {
        swal("ERROR!", "There are some required fields: \n" + msg, "error");
        return false;
    } else {
        return true;
    }
}