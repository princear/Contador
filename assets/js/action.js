var base_url = document.getElementById('base_url').value;

function get_action_office(select_office = "", select_staffs = "", assign_myself = "", disabled = "") {
   // alert('dfdf'+disabled);return false;
    var department_id = $("#department option:selected").val();
    if (department_id != '') {
        var staff_type = $("#staff_type").val();
        var disable_field = $("#disable_field").val();
        $.ajax({
            type: "POST",
            data: {
                department_id: department_id,
                select_office: select_office,
                disabled: disabled
            },
            url: base_url + 'action/home/get_action_office_ajax',
            dataType: "html",
            success: function (result) {
                $("#office_div").html(result);
                if (parseInt(department_id) != 2 && parseInt(staff_type) == 1) {
                    $("#office_div").hide();
                    //$("#office").attr("disabled", "disabled");
                } else if (parseInt(department_id) != 2 && parseInt(staff_type) == 2) {
                    $("#office_div").hide();
                    //$("#office").attr("disabled", "disabled");
                } else if (parseInt(department_id) != 2 && parseInt(staff_type) == 3) {
                    $("#office_div").hide();
                    //$("#office").attr("disabled", "disabled");
                } 
//                else if (disable_field == "y") {
//                    $("#office").attr("disabled", "disabled");
//                } 
                else {
                    $("#office_div").show();
                    // if ($("#office").attr("disabled")) {
                    //     $("#office").removeAttr("disabled");
                    // }
                }
                get_action_staff(select_staffs, assign_myself, disabled);
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        $("#office_div").hide();
        $("#staff_div").hide();
}
}

function change_div_for_new_action(value) {
    if(value == 1) {
        $("#assign_dept_div").show();
        $("#assign_office_div").hide();
        $("#department").attr('required' , true);
        $("#office").attr('required' , false);
    } else {
        $("#assign_dept_div").hide();
        $("#assign_office_div").show();
        $("#department").attr('required' , false);
        $("#office").attr('required' , true);
    }
}

function get_staff_by_dept(value , reference , staff_ids = '' , is_all = '') {
    $.ajax({
            type: "POST",
            data: {
                id: value,
                reference: reference,
                staff_ids: staff_ids,
                is_all: is_all
            },
            url: base_url + 'action/home/get_action_staff',
            dataType: "html",
            success: function (result) {
                $("#staff_div").html(result);
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
}

function get_action_office_for_news(select_office = "", select_staffs = "", assign_myself = "") {
    var department_id = 2;

    if (department_id != '') {
        var staff_type = $("#staff_type").val();
        var disable_field = $("#disable_field").val();
        $.ajax({
            type: "POST",
            data: {
                department_id: department_id,
                select_office: select_office
            },
            url: base_url + 'action/home/get_action_office_ajax',
            dataType: "html",
            success: function (result) {
                $("#office_div").html(result);
                if (parseInt(department_id) != 2 && parseInt(staff_type) == 1) {
                    $("#office_div").hide();
                    //$("#office").attr("disabled", "disabled");
                } else if (parseInt(department_id) != 2 && parseInt(staff_type) == 2) {
                    $("#office_div").hide();
                    //$("#office").attr("disabled", "disabled");
                } else if (parseInt(department_id) != 2 && parseInt(staff_type) == 3) {
                    $("#office_div").hide();
                    //$("#office").attr("disabled", "disabled");
                } else if (disable_field == "y") {
                    $("#office").attr("disabled", "disabled");
                } else {
                    $("#office_div").show();
                    if ($("#office").attr("disabled")) {
                        $("#office").removeAttr("disabled");
                    }
                }
                get_action_staff_news(select_staffs, assign_myself);
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        $("#office_div").hide();
        $("#staff_div").hide();
}
}

function hide_ofc_staff_div_in_editcase(assign_myself) {
    if (assign_myself != 0) {
        $("#is_chk_mytask").prop('checked', true);
        $("#department").removeAttr("required");
        $("#office").removeAttr("required");
        $(".spanclass").html('');
        $(".dept_div").hide();
        $("#office_div").hide();
        $("#staff_div").hide();
    } else {
        var dept = $("#department option:selected").val();
        if (dept == 2) {
            $("#office_div").show();
        }
        $("#is_chk_mytask").prop('checked', false);
        $("#department").attr("required", "required");
        $("#office").attr("required", "required");
        $(".spanclass").html('*');
        $(".dept_div").show();
        $("#staff_div").show();
    }
}

function get_action_staff(select_staffs, assign_myself, disabled) {
//    alert(disabled);return false;
    var department_id = $("#department option:selected").val();
    var office_id = $("#office option:selected").val();
    var ismyself = $(".ismyself").val();
    if (department_id != '' && office_id != '') {

        var disable_field = $("#disable_field").val();
        $.ajax({
            type: "POST",
            data: {
                department_id: department_id,
                office_id: office_id,
                select_staffs: select_staffs,
                ismyself: ismyself,
                disabled: disabled
            },
            url: base_url + 'action/home/get_action_staff_ajax',
            dataType: "html",
            success: function (result) {
                //alert(result);
                $("#staff_div").html(result);
                $("#staff_div").show();
                if (disable_field == "y") {
//                    $(".is_all").attr("disabled", "");
//                    $("#staff").attr("disabled", "");
                    $("#staff-hidden").val(1);
                    $("#staff").removeAttr('required');
                } else {
                    // if ($("#staff").attr("disabled")) {
                    //     $("#staff").removeAttr("disabled");
                    // }
                    // if ($(".is_all").attr("disabled")) {
                    //     $(".is_all").removeAttr("disabled");
                    // }
                }
                if (assign_myself != '') {
                    hide_ofc_staff_div_in_editcase(assign_myself);
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
        $("#staff_div").hide();
    }
}

function get_action_staff_news(select_staffs, assign_myself) {
    var department_id = 2;
    var office_id = $("#department option:selected").val();
    var ismyself = $(".ismyself").val();
    if (department_id != '' && office_id != '') {

        var disable_field = $("#disable_field").val();
        $.ajax({
            type: "POST",
            data: {
                department_id: department_id,
                office_id: office_id,
                select_staffs: select_staffs,
                ismyself: ismyself
            },
            url: base_url + 'action/home/get_action_staff_ajax',
            dataType: "html",
            success: function (result) {
                $("#staff_div").html(result);
                $("#staff_div").show();
                if (disable_field == "y") {
                    $(".is_all").attr("disabled", "disabled");
                    $("#staff").attr("disabled", "disabled");
                    $("#staff-hidden").val(1);
                    $("#staff").removeAttr('required');
                } else {
                    if ($("#staff").attr("disabled")) {
                        $("#staff").removeAttr("disabled");
                    }
                    if ($(".is_all").attr("disabled")) {
                        $(".is_all").removeAttr("disabled");
                    }
                }
                if (assign_myself != '') {
                    hide_ofc_staff_div_in_editcase(assign_myself);
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
        $("#staff_div").hide();
    }
}

function request_create_action() {
    if (!requiredValidation('save_action')) {
        return false;
    }
    if ($("#client_type").attr("disabled")) {
        $("#client_type").removeAttr("disabled");
    }
    var msg = CKEDITOR.instances.message.getData();
    if (msg == '') {
        swal("ERROR!", "Enter a message", "error");
        return false;
    }
    var form_data = new FormData(document.getElementById("save_action"));
    form_data.append('message' , msg);
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'action/home/request_create_action',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
             // alert(result);return false;
             var result = result.trim();
            if (result == "-1") {
                swal("ERROR!", "Unable To Add Action", "error");
            } else if (result) {
                swal({
                    title: "Success!",
                    text: "Action Successfully Added!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'action/home/view_action/' + result);
                });
            }
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });

}

function request_edit_action() {
    if (!requiredValidation('edit_action')) {
        return false;
    }
    if ($("#office").attr("disabled")) {
        $("#office").removeAttr("disabled");
    }
    var action_id = $("#edit_val").val();
    if ($("#staff").attr("disabled")) {
        $("#staff").removeAttr("disabled");
    }
    if ($("#department").attr("disabled")) {
        $("#department").removeAttr("disabled");
    }
    if ($(".is_all").attr("disabled")) {
        $(".is_all").removeAttr("disabled");
    }
    if ($("#due_date").attr("disabled")) {
        $("#due_date").removeAttr("disabled");
    }
    if ($("#upload_file").attr("disabled")) {
        $("#upload_file").removeAttr("disabled");
    }
    var form_data = new FormData(document.getElementById("edit_action"));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/request_edit_action/' + action_id,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result.trim() == "1") {
                swal({
                    title: "Success!",
                    text: "Action Successfully Updated!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'action/home/view_action/' + action_id);
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Action", "error");
            }
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function action_dashboard_ajax(type, status) {
    $.ajax({
        type: "POST",
        data: {
            type: type
        },
        url: base_url + 'action/home/get_action_dashboard',
        success: function (result) {
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });







    if (type != 'main') {
        if (typeof type == 'number' && typeof status == 'number') {
            if (type == 0) {
                var typeval = 'Requested by me';
            } else if (type == 1) {
                var typeval = 'Requested to me';
            }
            if (status == 0) {
                var statusval = 'New';
            } else if (status == 1) {
                var statusval = 'Started';
            } else if (status == 2) {
                var statusval = 'Completed';
            }
        }
        $("#clear_filter span").html('');
        $("#clear_filter span").html(typeval + ' ' + statusval);
        $("#clear_filter").show();
    } else {
        $("#clear_filter span").html('');
        $("#clear_filter").hide();
    }

    $.get(base_url + "action/home/load_data/" + type + "/" + status, function (data) {
        //alert(data);
        $("#load_data").html(data);
    });

    $.get(base_url + "action/home/load_count_data", function (data) {
        var values = JSON.parse(data);
        //alert(JSON.stringify(values));
        if (values["requested_by_me_new"] == null) {
            $("#requested_by_me_new").html(0);
        } else {
            $("#requested_by_me_new").html(values["requested_by_me_new"]);
        }
        if (values["requested_by_me_started"] == null) {
            $("#requested_by_me_started").html(0);
        } else {
            $("#requested_by_me_started").html(values["requested_by_me_started"]);
        }
        if (values["requested_by_me_completed"] == null) {
            $("#requested_by_me_completed").html(0);
        } else {
            $("#requested_by_me_completed").html(values["requested_by_me_completed"]);
        }
        if (values["requested_to_me_new"] == null) {
            $("#requested_to_me_new").html(0);
        } else {
            $("#requested_to_me_new").html(values["requested_to_me_new"]);
        }
        if (values["requested_to_me_started"] == null) {
            $("#requested_to_me_started").html(0);
        } else {
            $("#requested_to_me_started").html(values["requested_to_me_started"]);
        }
        if (values["requested_to_me_completed"] == null) {
            $("#requested_to_me_completed").html(0);
        } else {
            $("#requested_to_me_completed").html(values["requested_to_me_completed"]);
        }
    });
}

function cancel_action() {
    goURL('../home');
}

function cancel_edit_action(id) {
    goURL(base_url + '/action/home/view_action/' + id);
}

function request_create_business(usertype='',userrole='') {
    var practice_id_invalid = $("#practice_id_invalid").val();
    var name1 = $("#name1").val();
    if (practice_id_invalid == 'invalid') {
        swal("ERROR!", "Duplicate Client ID! \n Please, Enter a valid client id for "+ name1 +".", "error");
        return false;
    }
    if (!requiredValidation('form_create_new_company')) {
        var state_opened = $("#state_opened").val();
        var type = $("#type").val();
        var fye = $("#fye").val();
        var office = $("#office").val();
        var partner = $("#partner").val();
        var manager = $("#manager").val();
        var referred_by_source = $("#referred_by_source").val();
        var language = $("#language").val();
        var contact = $("#contact-list-count").val();
        var owner = $("#owners-list-count").val();

        if (state_opened == '') {
            swal("ERROR!", "An error ocurred! \n Please, Select State of Incorporation.", "error");
        }else if (name1 == '') {
            swal("ERROR!", "An error ocurred! \n Please, Enter Name of Company.", "error");
        }else if (type == '') {
            swal("ERROR!", "An error ocurred! \n Please, Select Type of Company.", "error");
        }else if (fye == '') {
            swal("ERROR!", "An error ocurred! \n Please, Select Fiscal Year End.", "error");
        }else if (office == '') {
            swal("ERROR!", "An error ocurred! \n Please, Select Office.", "error");
        }else if (partner == '') {
            swal("ERROR!", "An error ocurred! \n Please, Select Partner.", "error");
        }else if (manager == '') {
            swal("ERROR!", "An error ocurred! \n Please, Select Manager.", "error");
        }else if (referred_by_source == '') {
            swal("ERROR!", "An error ocurred! \n Please, Select Referred By Source.", "error");
        }else if (language == '') {
            swal("ERROR!", "An error ocurred! \n Please, Select Language.", "error");
        }else if (contact == '') {
            swal("ERROR!", "An error ocurred! \n Please, add a contact info.", "error");
        }else if (owner == '') {
            swal("ERROR!", "An error ocurred! \n Please, add a owner info.", "error");
        }
        return false;
    }
    var reference_id = $("#reference_id").val();
    var company_id = $("#company_id").val();
    if ($("#editval").val() != '') {
        if ($("#practice_id").val() == '') {
            $("#practice_id").css('border','1px solid #ed5565');
            $(".client_id_info").html("Client Id cannot not be empty!");        
            return false;
        } else {
            $("#practice_id").css('border','1px solid #1ab394');
        }
        if ($("#practice_id_invalid").val() == 'invalid') {
            $("#practice_id").css('border','1px solid #ed5565');
            $(".client_id_info").html("Already Exists! Please try another one");
            return false;
        } else {
            $("#practice_id").css('border','1px solid #1ab394');
        }
    }
    var company_type = $("#type option:selected").val();
//    if (company_type == '1' || company_type == '2' || company_type == '3' || company_type == '4' || company_type == '5') {

    var total_percentage = $("#owner_percentage_total").val();
    var template_id = $("#template_id").val();
    // if (total_percentage != '100.00') {
    //     swal("Error", "Percentage of all partners should equal to 100%", "error");
    //     return false;
    // }
//    }

    company_type_enable();

    var form_data = new FormData(document.getElementById('form_create_new_company'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/request_create_business',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);return false;
            var result = result.trim();
            if (result != 0) {
                if ($("#editval").val() != '') {
                    goURL(base_url + 'action/home/view_business/' + reference_id + '/' + company_id);
                }else{
                    askprojectcreateconfirmation(reference_id,company_id,template_id);
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
function saveIndividual(lead_id = '', is_admin = '',request_from='') {
    var practice_id_invalid = $("#practice_id_invalid").val();
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    if (practice_id_invalid == 'invalid') {
        swal("ERROR!", "Duplicate Client ID! \n Please, Enter a valid client id for "+ first_name + " " + last_name +".", "error");
        return false;
    }
    if (!requiredValidation('form_title')) {
        swal("ERROR!", "Please fill 'MAIN DATA' & 'OTHER' tab required field client's information", "error");
        return false;
    }
    if (lead_id != '') {
        $('#first_name').removeAttr("disabled");
        $('#last_name').removeAttr("disabled");
    }
    if (is_admin != '') {
        $('#practice_id').removeAttr("disabled");
    }

    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var company_id = $("#company_id").val();
    var formData = new FormData(document.getElementById('form_title'));
    var individual_id = $("#individual_id").val();
    if (lead_id != '') {
        formData.append('lead_id', lead_id);
    }
    var template_id = $("#template_id").val();
    console.log(template_id);
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/save_individualData',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // console.log(result);return false;
            if (result == 1) {
                //clearCacheFormFields('form_title');
                if (lead_id != '') {
                    swal({
                        title: "Success!",
                        text: "Successfully assigned as Client!",
                        type: "success"
                    }, function () {
                        opener.location.reload();
                        window.close();
                    });
                } else {
                    if(request_from == 'edit'){
                        goURL(base_url + 'action/home/view_individual/' + individual_id);
                    }else{
                        askprojectcreateconfirmation_for_individual(individual_id,template_id);
                    }
                }
            } else if (result == 2) {
                swal("ERROR!", "If you choose LLC, total share should be always 100%", "error");
            } else if (result == 0) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else if (result == 3) {
                swal("ERROR!", "Individual already exists", "error");
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
function get_county(county_id = '', select_state = '', client_id = '') {
    var state = $("#state option:selected").val();
    if (state != '') {
        $.ajax({
            type: "POST",
            data: {
                state_id: select_state,
                select_county: county_id,
                client_id: client_id,
            },
            url: base_url + 'action/home/get_county',
            dataType: "html",
            success: function (result) {
                if (result != '') {
                    $("#project_input_form_county").hide();
                    $("#project_input_form_rate").show();
                    $("#county2").attr('required' , false);
                    $("#sted_county").html(result);
                    $("#sted_county").show();
                } else {
                    $("#sted_county").hide();
                    $("#project_input_form_county").show();
                    $("#county2").attr('required' , true);
                }
                get_county_rate(county_id);
            }
        });
    } else {
        $("#sted_county").hide();
        $("#project_input_form_county").show();
        $("#county2").attr('required' , true);
}
}

function get_county_rate(county_id = '') {
    var county_id = $("#county option:selected").val();
    if (county_id != '') {
        $.ajax({
            type: "POST",
            data: {
                county_id: county_id
            },
            url: base_url + 'action/home/get_county_rate',
            dataType: "html",
            success: function (result) {
                if (result != '') {
                    $("#project_input_form_rate").hide();
                    $("#rate2").attr('required' , false);
                    $("#county_rate").html(result);
                    $("#county_rate").show();
                } else {
                    $("#county_rate").hide();
                    $("#project_input_form_rate").show();
                    $("#rate2").attr('required' , true);
                }
            }
        });
    } else {
        $("#county_rate").hide();
        $("#project_input_form_rate").show();
        $("#rate2").attr('required' , true);
}
}

function sales_gross_collect() {
    var exempt_sales = parseFloat($("#exempt_sales").val());
    var taxable_sales = parseFloat($("#taxable_sales").val());
    var sales_tax_rate = parseFloat($("#rate").val());

    var gross_sales = exempt_sales + taxable_sales;
    var sales_tax_collect = sales_tax_rate * taxable_sales;
    var collection_allowance = sales_tax_collect * (2.5 / 100);
    if (collection_allowance > 30) {
        var total_due = sales_tax_collect - 30;
    } else {
        var total_due = sales_tax_collect - collection_allowance;
    }

    if (collection_allowance > 30) {
        $("#coll_err").html("Collection allowance maxes out at 30");
        collection_allowance = 30;
    } else {
        $("#coll_err").html("");
    }
    if (isNaN(gross_sales)) {
        $("#gross_sales").val('');
        $("#sales_tax_collect").val('');
        $("#collection_allowance").val('');
        $("#total_due").val('');

    } else {
        $("#gross_sales").val(gross_sales.toFixed(2));
        $("#sales_tax_collect").val(sales_tax_collect.toFixed(2));
        $("#collection_allowance").val(collection_allowance.toFixed(2));
        $("#total_due").val(total_due.toFixed(2));
    }
}
function saveSalesProcess() {
    if (!requiredValidation('save_sales_process')) {
        return false;
    }
    $("#gross_sales").attr('disabled', false);
    $("#sales_tax_collect").attr('disabled', false);
    $("#collection_allowance").attr('disabled', false);
    $("#total_due").attr('disabled', false);
    var userid = $("#user_id").val();
    var user_type = $("#user_type").val();
    var formData = new FormData(document.getElementById('save_sales_process'));

    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/save_sales_tax_process',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == 1) {
//                clearCacheFormFields('form_title');
                swal({
                    title: "Success!",
                    text: "Successfully saved!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'action/home/sales_tax_process');
                });

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

function updateSalesProcess() {
    if (!requiredValidation('edit_sales_process')) {
        return false;
    }

    $("#gross_sales").attr('disabled', false);
    $("#sales_tax_collect").attr('disabled', false);
    $("#collection_allowance").attr('disabled', false);
    $("#total_due").attr('disabled', false);

    var userid = $("#user_id").val();
    var user_type = $("#user_type").val();
    var sales_processId = $("#edit_process").val();
    var formData = new FormData(document.getElementById('edit_sales_process'));

    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/update_sales_tax_process/' + sales_processId,
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == 1) {
//                clearCacheFormFields('form_title');
                swal({
                    title: "Success!",
                    text: "Successfully update!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'action/home/sales_tax_process');
                });

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


function reset_all_fields() {
    $("#state").val('');
    $("#sted_county").hide();
    $("#rate").val('');
    $("#exempt_sales").val('');
    $("#taxable_sales").val('');
    $("#gross_sales").val('');
    $("#sales_tax_collect").val('');
    $("#collection_allowance").val('');
    $("#total_due").val('');
    $("#period_time").empty();
    $("#period_time").append('<option value="">Select</option>');
}

function assignAction(action_id, staff_id) {
    swal({
        title: 'Are you sure?',
        text: "You want to " + (staff_id == 0 ? 'un' : '') + "assign the action!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ' + (staff_id == 0 ? 'un' : '') + 'assign!'
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                data: {
                    action_id: action_id,
                    staff_id: staff_id
                },
                url: base_url + 'action/home/assign_action',
                cache: false,
                success: function (result) {
                    if (result != 0) {
                        swal("Success!", "Successfully " + (staff_id == 0 ? 'un' : '') + "assigned!", "success");
                        if (staff_id == '') {
                            goURL(base_url + 'action/home/view_action/' + action_id);
                        } else {
                            goURL(base_url + 'action/home');
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
    });
}
function loadActionDashboard(status, request, priority, officeID, departmentID, filter_assign, business_client_id = '', individual_client_id = '',page_number= 0,request_from='') {
    $.ajax({
        type: "POST",
        data: {
            status: status,
            request: request,
            priority: priority,
            office_id: officeID,
            department_id: departmentID,
            filter_assign: filter_assign,
            business_client_id: business_client_id,
            individual_client_id: individual_client_id,
            page_number:page_number,
            request_from:request_from
        },
        url: base_url + 'action/home/dashboard_ajax',
        success: function (action_result) {
            var data = JSON.parse(action_result);
            if (page_number == 1 || page_number == 0) {
                $(".status-dropdown").val(status);
                $(".request-dropdown").val(request);
                $("#action_ajax_dashboard_div").html(data.result);
                $("[data-toggle=popover]").popover();
                var filter_result = '';
                if (request == 'byme') {
                    filter_result = 'By Me';
                } else if (request == 'tome') {
                    filter_result = 'To Me';
                } else if (request == 'byother') {
                    filter_result = 'By Other';
                } else if (request == 'mytask') {
                    filter_result = 'My Task';
                } else if (request == 'toother') {
                    filter_result = 'To Other';
                }
            }else{
                $("#action_ajax_dashboard_div").append(data.result);
                $('.action-header').not(':first').remove();
            }
            if (page_number != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
            if (filter_result != '') {
                var status_arr = ['New', 'Started', 'Resolved', 'Completed', 'Not Completed', 'All'];
                if (status != '') {
                    filter_result += ' - ' + status_arr[parseInt(status)];
                } else if (status == '0') {
                    filter_result += ' - ' + status_arr[0];
                }
                $("#clear_filter").html('');
                $("#clear_filter").hide();
                $('#btn_clear_filter').show();
            } else {
                $("#clear_filter").html('');
                $("#clear_filter").hide();
                $('#btn_clear_filter').hide();
                $('#complete_canceled_actions').prop("checked",false);
                $('#variable_dropdown').prop("selected",false);
                $('#condition_dropdown').prop("selected",false);
                $('#criteria_dropdown').prop("selected",false);
                $("#action_filted_data").html('');
            }
            if (request == 'byme_tome_task') {
                $(".variable-dropdown").val('');
                $(".condition-dropdown").val('');
                $(".criteria-dropdown").val('');
                $('.criteria-dropdown').empty().append('<option value="">All Criteria</option>');
                $(".criteria-dropdown").trigger("chosen:updated");
            }
            if ((status + request) == '' || (status + request) == 'byme_tome_task') {
                clearFilter();
            }
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
            jumpDiv();
        }
    });
}

function activeShortColumn(request, short_column) {
    var resultHTML = '<option value="">Sort By</option>';
    if (request == 'byme') {     // byme
        resultHTML += '<option value="department">Department</option>';
        resultHTML += '<option value="staff">Staff</option>';
        resultHTML += '<option value="office">Office</option>';
    } else {    // tome, byother, mytask
        resultHTML += '<option value="department">Department</option>';
        resultHTML += '<option value="staff">Staff</option>';
        resultHTML += '<option value="office">Office</option>';
    }
    $(".short-column-dropdown").html(resultHTML).show();
    $(".short-column-dropdown").val(short_column);
}


function noteNotificationModal(relatedTableID, notificationReference, bywhom = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/note_notification',
        data: {
            related_table_id: relatedTableID,
            notification_reference: notificationReference,
            bywhom: bywhom
        },
        success: function (result) {
            if (result != 0) {
                $('#notification').html(result).modal({
                    backdrop: 'static',
                    keyboard: false
                });
                if (bywhom == 'tome') {
                    $(".label-tome").html('0');
                } else {
                    $(".label-byme").html('0');
                }
            } else {
                swal("ERROR!", "Note notification not found!", "error");
            }
        }
    });
}
function actionFilter() {
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/action_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log("Result: " + result); return false;
            $("#action_ajax_dashboard_div").html(result);
            $('#ActionFilterModal').modal('hide');
            $("[data-toggle=popover]").popover();
            $("#clear_filter").html('');
            $("#clear_filter").show();
            $('#btn_clear_filter').show();
            display_action_applied_filters();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function display_action_applied_filters() {
    var dropdownArray = [];
    var removeAttArray = [];

    $('#filter-form input, #filter-form select, #filter-form a.remove-filter-button').each(function (index) {
        var input = $(this);
        var elementType = input.prop('nodeName');
        
        if (elementType == 'SELECT') {
            var chosenVal = input.chosen().val()
            var value = '';

            if (typeof chosenVal == 'object') {
                $.each(input.context.selectedOptions, function (index, val) {
                    if (index === 0) {
                        value += val.text.replace(",", " -");
                    } else {
                        value += ', ' + val.text.replace(",", " -");
                    }
                });
            } else {
                value = input.find(":selected").text();
            }

            //console.log(value);
            dropdownArray.push(value);
        } else if (elementType == 'INPUT') {
            dropdownArray.push(input.val());
        } else if (elementType == 'A') {
            removeAttArray.push(input.attr('onclick'));
        }
    });

    //remove empty strings
    var archive = $("input[name='complete_canceled_actions']:checked").val();
    dropdownArray = dropdownArray.filter(Boolean);
    if(archive != "all_actions"){
        dropdownArray.pop();
    }

    var newTr = "";
    for (var i = 0; i < dropdownArray.length; i++) {
        if (i % 3 == 0)
            newTr += (i > 0) ? "</div><div id='" + i + "' class='p-b-3'>&nbsp" : "<div class='p-b-3'>&nbsp";
        newTr += "<span class='label label-default'>" + dropdownArray[i] + "</span>&nbsp";
    }
    newTr += "</div>";

    $("#action_filted_data").html(newTr);

    $('#action_filted_data a.btn_remove_filter').each(function (index) {
        $(this).attr('data-random', removeAttArray[index].match(/\d+/)[0]);
    });
}

function loadSalesTaxDashboard(monthYear, requestType, status, isFilter, isInsert) {
    var filterRequestValue = '';
    var filterStatusValue = '';
    if (requestType == 'others') {
        filterRequestValue = $('.others_request_type_title').html();
    } else if (requestType == 'my') {
        filterRequestValue = $('.my_request_type_title').html();
    }
    if (status === 0) {
        filterStatusValue = 'New';
    } else if (status === 1) {
        filterStatusValue = 'Started';
    } else if (status === 2) {
        filterStatusValue = 'Completed';
    }
    var ajaxData = new FormData(document.getElementById('filter-form'));
    ajaxData.append('month_year', monthYear);
    ajaxData.append('request_type', requestType);
    ajaxData.append('status', status);
    ajaxData.append('is_filter', isFilter);
    ajaxData.append('is_insert', isInsert);
    $.ajax({
        type: "POST",
        url: base_url + 'action/home/sales_tax_dashboard_ajax',
        data: ajaxData,
        processData: false,
        contentType: false,
        success: function (result) {
            var decode_result = JSON.parse(result);
            $("#sales_tax_process_dashboard_div").html(decode_result.sales_tax_data);
            $("#search_month b").html(decode_result.search_month);
            var summary_count = decode_result.summary_count;
            summary_count.forEach(function (summary) {
                var element = summary.split("-");
                $("#" + element[0]).html(element[1]);
            });
            if (status !== '') {
                $("#clear_filter").show();
                $("#clear_filter span").html('');
                $("#clear_filter span").html(filterRequestValue + ' - ' + filterStatusValue);
            } else {
                $("#clear_filter span").html('');
                $("#clear_filter").hide();
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

function delete_individual(id, page = '') {
    $.get(base_url + "action/home/check_if_individual_associated/" + id, function (result) {
        if (result.trim() != 0) {
            swal({
                title: "Error",
                text: "Individual Is Associated. Can Not Delete!!",
                type: "error"
            });
        } else {
            swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover this individual!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + '/action/home/delete_individual',
                    data: {
                        id: id,
                        page: page
                    },
                    success: function (result) {
                        if (result.trim() == 1) {
                            swal({
                                title: "Success!",
                                "text": "Individual been deleted successfully!",
                                "type": "success"
                            }, function () {
                                    goURL(base_url + 'action/home/individual_dashboard');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this individual", "error");
                        }
                    }
                });
            });
        }
    });
}

function inactive_individual(id , status) {
    $.get(base_url + "action/home/check_if_individual_associated_with_owner/" + id, function (result) {
        if (result.trim() == 1) {
            swal({
                title: "Error",
                text: "Individual Is Associated. Can Not Inactive!!",
                type: "error"
            });
        } else {
            if (status == 2) {
                if (!requiredValidation('confirmation_form')) {
                    return false;
                }
                var why_client_left = $("#why_client_left").val();
                swal({
                    title: 'Are you sure want to change status on client to "Inactive"?',
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, inactive it!",
                    closeOnConfirm: false
                },
                function () {
                    $.ajax({
                        type: 'POST',
                        url: base_url + '/action/home/delete_individual',
                        data: {
                            id: id,
                            status: status,
                            why_client_left:why_client_left
                        },
                        success: function (result) {
                            if (result.trim() == 1) {
                                swal({
                                    title: "Success!",
                                    "text": "Individual been inactive successfully!",
                                    "type": "success"
                                }, function () {
                                    window.location.reload();
                                });
                            } else {
                                swal("ERROR!", "Unable to inactive this individual", "error");
                            }
                        }
                    });
                });
            } else {
                swal({
                    title: 'Are you sure want to change status on client to "On Hold"?',
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, On Hold it!",
                    closeOnConfirm: false
                },
                function () {
                    $.ajax({
                        type: 'POST',
                        url: base_url + '/action/home/delete_individual',
                        data: {
                            id: id,
                            status: status
                        },
                        success: function (result) {
                            if (result.trim() == 1) {
                                swal({
                                    title: "Success!",
                                    "text": "Individual been on hold successfully!",
                                    "type": "success"
                                }, function () {
                                    window.location.reload();
                                });
                            } else {
                                swal("ERROR!", "Unable to on hold this individual", "error");
                            }
                        }
                    });
                });
            }
        }
    });
}
function active_individual(id) {
    swal({
        title: 'Are you sure want to change status on client to "Active"?',
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Yes, Active it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + '/action/home/activate_individual',
            data: {
                id: id
            },
            success: function (result) {
                if (result.trim() == 1) {
                    swal({
                        title: "Success!",
                        "text": "Individual been active successfully!",
                        "type": "success"
                    }, function () {
                        window.location.reload();
                    });
                } else {
                    swal("ERROR!", "Unable to inactive this individual", "error");
                }
            }
        });
    });
}

function inactive_business(reference_id, id, status = '') {
    if (status == 2) {
        if (!requiredValidation('confirmation_form')) {
            return false;
        }
        var why_client_left = $("#why_client_left").val();
        swal({
            title: 'Are you sure want to change status on client to "Inactive"?',
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, inactive it!",
            closeOnConfirm: false
        },
        function () {
            $.ajax({
                type: 'POST',
                url: base_url + '/action/home/delete_business',
                data: {
                    id: id,
                    reference_id: reference_id,
                    status: status,
                    why_client_left:why_client_left
                },
                success: function (result) {
                    if (result.trim() == 1) {
                        swal({
                            title: "Success!",
                            "text": "Business been inactive successfully!",
                            "type": "success"
                        }, function () {
                            window.location.reload();
                        });
                    } else {
                        swal("ERROR!", "Unable to inactive this business", "error");
                    }
                }
            });
        });
    } else {
        swal({
            title: 'Are you sure want to change status on client to "On Hold"?',
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, On Hold it!",
            closeOnConfirm: false
        },
        function () {
            $.ajax({
                type: 'POST',
                url: base_url + '/action/home/delete_business',
                data: {
                    id: id,
                    reference_id: reference_id,
                    status: status
                },
                success: function (result) {
                    if (result.trim() == 1) {
                        swal({
                            title: "Success!",
                            "text": "Business been on hold successfully!",
                            "type": "success"
                        }, function () {
                           window.location.reload();
                        });
                    } else {
                        swal("ERROR!", "Unable to on hold this business", "error");
                    }
                }
            });
        });
    }
}
function active_business(reference_id, id) {
    swal({
        title: 'Are you sure want to change status on client to "Active"?',
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Yes, Active it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + '/action/home/activate_business',
            data: {
                id: id,
                reference_id: reference_id
            },
            success: function (result) {
                if (result.trim() == 1) {
                    swal({
                        title: "Success!",
                        "text": "Business been active successfully!",
                        "type": "success"
                    }, function () {
                        window.location.reload();
                    });
                } else {

                    swal("ERROR!", "Unable to activate this business", "error");
                }
            }
        });
    });
}

function delete_business(reference_id, id, page = '') {
    $.get(base_url + "action/home/check_if_business_associated/" + reference_id, function (result) {
        if (result != 0) {
            swal({
                title: "Error",
                text: "Business Is Associated. Can Not Delete!!",
                type: "error"
            });
        } else {
            swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover this business!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + '/action/home/delete_business',
                    data: {
                        id: id,
                        reference_id: reference_id,
                        page: page
                    },
                    success: function (result) {
                        if (result.trim() == 1) {
                            swal({
                                title: "Success!",
                                "text": "Business been deleted successfully!",
                                "type": "success"
                            }, function () {
                                    goURL(base_url + 'action/home/business_dashboard');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this business", "error");
                        }
                    }
                });
            });
        }
    });
}


function sort_dashboard(sort_criteria = '', sort_type = '', request = '', priority = '', status = '') {
    // alert("Hello");return false;
    var form_data = new FormData(document.getElementById('filter-form'));
    if (sort_criteria == '') {
        var sc = $('.dropdown-menu li.active').find('a').attr('id');
        // alert(sc);return false;
        var ex = sc.split('-');
        if (ex[0] == 'user_name' || ex[0] == 'department_name') {
            var sort_criteria = ex[0];
        } else {
            var sort_criteria = 'act.' + ex[0];
        }
    }
    if (sort_type == '') {
        var sort_type = 'ASC';
    }
    if (sort_criteria.indexOf('.') > -1)
    {
        var sp = sort_criteria.split(".");
        var activehyperlink = sp[1] + '-val';
    } else {
        var activehyperlink = sort_criteria + '-val';
    }
    form_data.append('sort_criteria', sort_criteria);
    form_data.append('sort_type', sort_type);
    form_data.append('request', request);
    form_data.append('priority' , priority);
    form_data.append('status' , status);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/sort_dashboard',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (action_result) {
            var data = JSON.parse(action_result);
            $("#action_ajax_dashboard_div").html(data.result);
            $(".dropdown-menu li").removeClass('active');
            $("#" + activehyperlink).parent('li').addClass('active');
            if (sort_type == 'ASC') {
                $(".sort_type_div #sort-desc").hide();
                $(".sort_type_div #sort-asc").css({display: 'inline-block'});
            } else {
                $(".sort_type_div #sort-asc").hide();
                $(".sort_type_div #sort-desc").css({display: 'inline-block'});
            }
            $(".sort_type_div").css({display: 'inline-block'});
            var text = $('.dropdown-menu li.active').find('a').text();
            var textval = 'Sort By : ' + text + ' <span class="caret"></span>';
            $("#sort-by-dropdown").html(textval);
            $("[data-toggle=popover]").popover();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function close_sort_dashboard(request = '', priority = '', status = '')
{
    $.ajax({
        type: "POST",
        url: base_url + 'action/home/close_sort_dashboard',
        data: {'request' : request, 'priority' : priority , 'status' : status},
        success: function (action_result) {
            var data = JSON.parse(action_result);
            $("#action_ajax_dashboard_div").html(data.result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function add_action_notes() {
    var formData = new FormData(document.getElementById('modal_note_form'));
    var actionid = $("#modal_note_form #actionid").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/addNotesmodal',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
              $.ajax({
                    type: 'POST',
                    url: base_url + 'action/home/action_notes_count',
                    data: {
                        actionid: actionid,
                        status:''
                    },
                    success: function (total_note_count_res) {
                        document.getElementById("total_notes_count_id_"+actionid).innerHTML = total_note_count_res;
                        $("#total_notes_count_id_" + actionid).removeClass('label-secondary').addClass('label-danger');
                    }    
                });

                if (result != '0') {
                    var prevnotecount = $("#notecount-" + actionid).text();
                    var notecount = parseInt(prevnotecount) + parseInt(result);
                   // $("#notecount-" + actionid).text(notecount);
                }
                document.getElementById("modal_note_form").reset();
                $(".removenoteselector").trigger('click');
                $('#showNotes').modal('hide');
            });
        },
        beforeSend: function () {
            $("#save_note").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#save_note").removeAttr('disabled').html('Save Note');
            closeLoading();
        }
    });
}

function add_action_sos() {
    if (!requiredValidation('action_sos_form')) {
        return false;
    }
    var formData = new FormData(document.getElementById('action_sos_form'));
    var actionid = $("#action_sos_form #actionid").val();
    var sos_attachment = $('#sos_attachment')[0].files[0];
    formData.append('sos_attachment', sos_attachment);
    $.ajax({
        type: 'POST',
        url: base_url + 'home/addSos',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Added!", type: "success"}, function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'action/home/get_action_sos_count',
                    data: {
                        reference_id: actionid,
                        status:'unread'
                    },
                    success: function (unread_count_res) {
                        $.ajax({
                            type: 'POST',
                            url: base_url + 'action/home/get_action_sos_count',
                            data: {
                                reference_id: actionid,
                                status:''
                            },
                            success: function (total_count_res) {
                                if(unread_count_res.trim() != 0){
                                    $("#total_sos_count_id_" + actionid).removeClass('label-secondary').addClass('label-danger');
                                    document.getElementById("total_sos_count_id_"+actionid).innerHTML = unread_count_res;
                                } else {
                                    $("#total_sos_count_id_" + actionid).removeClass('label-danger').addClass('label-secondary');
                                    document.getElementById("total_sos_count_id_"+actionid).innerHTML = total_count_res;
                                }
                                $("#actiontracking-" + actionid).find('span').html('Clarification');
                                $('#showSos').modal('hide');
                            }    
                        });
                    }    
                });

                // var prevsoscount = $("#soscount-" + actionid).text();
                // var soscount = parseInt(prevsoscount) + parseInt(1);
                // $("#soscount-" + actionid).text(soscount);
                // $("#soscount-" + actionid).removeClass('label label-primary').addClass('label label-danger');
                // $("#soscount-" + actionid).html('<i class="fa fa-bell"></i>');
                // document.getElementById("sos_note_form").reset();
                // var prevbymecount = $("#sos-byme").html();
                // if (result == 0) {
                //     var newbymecount = parseInt(prevbymecount) + 1;
                //     $("#sos-byme").html(newbymecount);
                // }
                // $("#action" + actionid).find(".priority").find('.m-t-5').remove();
                // $("#action" + actionid).find(".priority").append('<img src="' + base_url + '/assets/img/badge_sos_priority.png" class="m-t-5"/>');
                // $("#actiontracking-" + actionid).find('span').removeClass().addClass('label label-info');
                // $("#actiontracking-" + actionid).find('span').html('Clarification');
                // $('#showSos').modal('hide');
            });
        },
        beforeSend: function () {
            $("#save_sos").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#save_sos").removeAttr('disabled').html('Save SOS');
            closeLoading();
        }
    });
}
function reply_action_sos(form_id) {
    var formData = new FormData(document.getElementById('sos_note_form_reply_' + form_id));
    $.ajax({
        type: 'POST',
        url: base_url + 'home/replySos',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Replied!", type: "success"}, function () {
                $('#showSos').modal('hide');
            });
        },
        beforeSend: function () {
            $("#save_sos_" + form_id).prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#save_sos_" + form_id).removeAttr('disabled').html('Save SOS');
            closeLoading();
        }
    });
}


function update_action_notes() {
    var formData = new FormData(document.getElementById('modal_note_form_update'));
    //var actionid = $("#modal_note_form_update #actionid").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/updateNotes',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                document.getElementById("modal_note_form_update").reset();
                $('#showNotes').modal('hide');
            });
        },
        beforeSend: function () {
            $("#update_note").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#update_note").removeAttr('disabled').html('Save Note');
            closeLoading();
        }
    });
}




//function salesTaxFilter(monthYear, requestType, status, isFilter) {
//    var filterRequestValue = '';
//    var filterStatusValue = '';
//    if (requestType == 'others') {
//        filterRequestValue = $('.others_request_type_title').html();
//    } else if (requestType == 'my') {
//        filterRequestValue = $('.my_request_type_title').html();
//    }
//    if (status === 0) {
//        filterStatusValue = 'New';
//    } else if (status === 1) {
//        filterStatusValue = 'Started';
//    } else if (status === 2) {
//        filterStatusValue = 'Completed';
//    }
//    $.ajax({
//        type: "POST",
//        url: base_url + 'action/home/sales_tax_dashboard_ajax',
//        data: {
//            month_year: monthYear,
//            request_type: requestType,
//            status: status,
//            filter_data: {}
//        },
//        success: function (result) {
//            var decode_result = JSON.parse(result);
//            $("#sales_tax_process_dashboard_div").html(decode_result.sales_tax_data);
//            $("#search_month b").html(decode_result.search_month);
//            var summary_count = decode_result.summary_count;
//            summary_count.forEach(function (summary) {
//                var element = summary.split("-");
//                $("#" + element[0]).html(element[1]);
//            });
//            if (status !== '') {
//                $("#clear_filter").show();
//                $("#clear_filter span").html('');
//                $("#clear_filter span").html(filterRequestValue + ' - ' + filterStatusValue);
//            } else {
//                $("#clear_filter span").html('');
//                $("#clear_filter").hide();
//            }
//        },
//        beforeSend: function () {
//            openLoading();
//        },
//        complete: function (msg) {
//            closeLoading();
//        }
//    });
//}
function add_task_notes() {
    var formData = new FormData(document.getElementById('modal_note_form'));
    var taskid = $("#modal_note_form #taskid").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/template/addTaskNotesmodal',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                if (result != '0') {
                    var prevnotecount = $("#notecount-" + taskid).text();
                    var notecount = parseInt(prevnotecount) + parseInt(result);
                    $("#notecount-" + taskid).text(notecount);
                }
                $("#notecount-" + taskid).removeClass('label label-warning').addClass('label label-danger');
                document.getElementById("modal_note_form").reset();
                $(".removenoteselector").trigger('click');
                $('#showTaskNotes').modal('hide');
            });
        },
        beforeSend: function () {
            $("#save_note").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#save_note").removeAttr('disabled').html('Save Note');
            closeLoading();
        }
    });
}
function add_project_task_notes() {
    var formData = new FormData(document.getElementById('project_task_modal_note_form'));
    var taskid = $("#project_task_modal_note_form #taskid").val();
    var projectid = $("#project_task_modal_note_form #projectid").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'task/addProjectTaskNotesmodal',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
               $.ajax({
                        type: 'POST',
                        url: base_url + 'Project/project_notes_count',
                        data: {
                            projectid: projectid,
                            status:'unread'
                        },
                        success: function (unread_note_count_res) {
                            $.ajax({
                                type: 'POST',
                                url: base_url + 'Project/project_notes_count',
                                data: {
                                    projectid: projectid,
                                    status:''
                                },
                                success: function (total_notes_count_res) {
                                    if(unread_note_count_res == 0){
                                        $("#total_notes_count_id_" + projectid).removeClass('label-danger').addClass('label-secondary');
                                    }else{
                                        $("#total_notes_count_id_" + projectid).removeClass('label-secondary').addClass('label-danger');
                                    }

                                    document.getElementById("total_notes_count_id_"+projectid).innerHTML = total_notes_count_res;
                            
                                }
                            }); 
                        }    
                    });
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'Project/project_task_notes_count',
                        data: {
                            status:'',
                            taskid:taskid

                        },
                        success: function (total_task_note_count_res) {
                            if(total_task_note_count_res == 0){
                                $("#total_notes_count_id_" + taskid).removeClass('label-danger').addClass('label-secondary');
                            }else{
                                $("#total_notes_count_id_" + taskid).removeClass('label-secondary').addClass('label-danger');
                            }

                            document.getElementById("total_notes_count_id_"+taskid).innerHTML = total_task_note_count_res;
                        }    
                    });
                if (result != '0') {
                    var prevnotecount = $("#notecountinner-" + taskid).text();
                    var notecount = parseInt(prevnotecount) + parseInt(result);
                    $("#notecountinner-" + taskid).text(notecount);
                }
                $("#notecountinner-" + taskid).removeClass('label label-warning').addClass('label label-danger');
                document.getElementById("project_task_modal_note_form").reset();
                $(".removenoteselector").trigger('click');
                $('#showProjectTaskNotes').modal('hide');
            });
        },
        beforeSend: function () {
            $("#save_note").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#save_note").removeAttr('disabled').html('Save Note');
            closeLoading();
        }
    });
}
function update_task_notes() {
    var formData = new FormData(document.getElementById('modal_note_form_update'));
    //var actionid = $("#modal_note_form_update #actionid").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/template/updateTaskNotes',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                document.getElementById("modal_note_form_update").reset();
                $('#showTaskNotes').modal('hide');
            });
        },
        beforeSend: function () {
            $("#update_note").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#update_note").removeAttr('disabled').html('Save Note');
            closeLoading();
        }
    });
}
function update_project_task_notes() {
    var formData = new FormData(document.getElementById('project_task_modal_note_form_update'));
    //var actionid = $("#modal_note_form_update #actionid").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'task/updateProjectTaskNotes',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                document.getElementById("project_task_modal_note_form_update").reset();
                $('#showProjectTaskNotes').modal('hide');
            });
        },
        beforeSend: function () {
            $("#update_note").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#update_note").removeAttr('disabled').html('Save Note');
            closeLoading();
        }
    });
}
function update_project_notes() {
    var formData = new FormData(document.getElementById('modal_note_form_update'));
    //var actionid = $("#modal_note_form_update #actionid").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'project/updateProjectNotes',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                document.getElementById("modal_note_form_update").reset();
                $('#showProjectNotes').modal('hide');
            });
        },
        beforeSend: function () {
            $("#update_note").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#update_note").removeAttr('disabled').html('Save Note');
            closeLoading();
        }
    });
}
function add_project_notes() {
    var formData = new FormData(document.getElementById('modal_note_form'));
    var project_id = $("#modal_note_form #project_id").val();
//    alert(project_id);
    $.ajax({
        type: 'POST',
        url: base_url + 'project/addProjectNotesmodal',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                if (result != '0') {
                    var prevnotecount = $("#notecount-" + project_id).text();
                    var notecount = parseInt(prevnotecount) + parseInt(result);
                    $("#notecount-" + project_id).text(notecount);
                }
                $("#notecount-" + project_id).removeClass('label label-warning').addClass('label label-danger');
                document.getElementById("modal_note_form").reset();
                $(".removenoteselector").trigger('click');
                $('#showProjectNotes').modal('hide');
            });
        },
        beforeSend: function () {
            $("#save_note").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#save_note").removeAttr('disabled').html('Save Note');
            closeLoading();
        }
    });
}

function load_business_dashboard(ofc = '', manager_id = '', partner_id = '', ref_source = '', company_type = '',project_category='' , client_type='' , business_ids = '' , home_dashboard_type = '' , home_dashboard_filter_data = '' , status = '', home_dashboard_current_ytd_filter='',sort_type='',sort_val='',client_id ='',company_name = '',referral_partner ='',email = '',phone = '',creation_date = '',state_of_i = '',client_association = '',owner_name = '') {
    var staff_id = $("#staff_id").val();
    var client='58856';
    console.log('abc'+staff_id);
    $('#service-tab').DataTable({
        'processing': false,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url': base_url + 'action/home/load_data_business',
            'type': 'POST',
            'data': {
                'ofc': ofc,
                'manager_id': manager_id,
                'partner_id': partner_id,
                'ref_source': ref_source,
                'client_id': client_id,
                'company_name': company_name,
                'referral_partner': referral_partner,
                'email': email,
                'phone': phone,
                'state_of_i':state_of_i,
                'client_association':client_association,
                'owner_name':owner_name,
                'creation_date' : creation_date,
                'company_type': company_type,
                'project_category': project_category,
                'client_type': client_type,
                'business_ids': business_ids,
                'home_dashboard_type': home_dashboard_type,
                'home_dashboard_filter_data': home_dashboard_filter_data,
                'status': status,
                'home_dashboard_current_ytd_filter':home_dashboard_current_ytd_filter,
                'sort_type1':sort_type,
                'sort_val1':sort_val
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        },
        'columns': [
            {data: 'practice_id'},
            {data: 'name'},
            {data: 'office_id'},
            {data: 'manager'},
            {data: 'partner'},
            {data: 'status'},
            {data: 'action'}
        ],
        "columnDefs": [
            { searchable: true, "targets": 0 },
            { searchable: true, "targets": 1 },
            { searchable: true, "targets": 2 },
            { searchable: true, "targets": 3 },
            { searchable: true, "targets": 4 }
          ],
          fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            console.log('abc: '+aData);
                // if (aData.id ==staff_id ) {
                // $('td', nRow).css('background-color', '#D2D2D2');
                // }
                // } else {
                //     $('td', nRow).css('background-color', 'Orange');
                // }
            }
    });
}

function load_individual_dashboard(ofc_id = '', manager_id = '', partner_id = '', ref_source = '' , client_type= '' , individual_ids = '' , home_dashboard_type = '' , home_dashboard_filter_data = '' , status = '', home_dashboard_current_ytd_filter='',sort_type='',sort_val='',language='',citizenship='',residenship='',client_id='',client_name='',referral_partner='',email='',phone='',creation_date='',ssn='',client_association='') {
    $('#service-tab').DataTable({
        'processing': false,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url': base_url + 'action/home/load_data_individual',
            'type': 'POST',
            'data': {
                'ofc_id': ofc_id,
                'manager_id': manager_id,
                'partner_id': partner_id,
                'ref_source': ref_source,
                'ssn': ssn,
                'client_association' : client_association,
                'language' : language,
                'citizenship' : citizenship,
                'residenship' : residenship,
                'client_id' : client_id,
                'client_name' : client_name,
                'referral_partner' : referral_partner,
                'email' : email,
                'phone' : phone,
                'creation_date' : creation_date,
                'client_type' : client_type,
                'individual_ids': individual_ids,
                'home_dashboard_type': home_dashboard_type,
                'home_dashboard_filter_data': home_dashboard_filter_data,
                'status': status,
                'home_dashboard_current_ytd_filter':home_dashboard_current_ytd_filter,
                'sort_type1':sort_type,
                'sort_val1':sort_val
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        },
        'columns': [
            {data: 'practice_id'},
            {data: 'first_name'},
            {data: 'last_name'},
            {data: 'office_id'},
            {data: 'manager'},
            {data: 'partner'},
            {data: 'status'},
            {data: 'action'}
        ],
        "columnDefs": [
            { searchable: true, "targets": 0 },
            { searchable: true, "targets": 1 },
            { searchable: true, "targets": 2 },
            { searchable: true, "targets": 3 },
            { searchable: true, "targets": 4 },
            { searchable: true, "targets": 5 }
          ]
    });
}
var clear_sos_msg = (value) => {
    if (value == 'completed') {
        swal("ERROR!", "YOU STILL HAVE AN SOS UNCLEARED", "error");
        $("#rad2").removeAttr('checked');
    } else if (value == 'resolved') {
        swal("ERROR!", "YOU STILL HAVE AN SOS UNCLEARED", "error");
        $("#rad6").removeAttr('checked');
    } else if (value == 'cancelled') {
        swal("ERROR!", "YOU STILL HAVE AN SOS UNCLEARED", "error");
        $("#rad7").removeAttr('checked');
    }

}

function actionContainerAjax(client_type = '', client_id = '', action_id = '', office_id = '')
{
    var url = '';
    if (action_id != '') {
        /*url = 'project/get_edit_project_container_ajax';*/
    } else {
        url = 'action/home/get_action_container_ajax';
    }
    $.ajax({
        type: 'POST',
        url: base_url + url,
        data: {
            client_type: client_type,
            client_id: client_id,
            action_id: action_id,
            office_id: office_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != '0') {
                /*$('#action_container').find('#individual_list_ddl').chosen('destroy');*/
                $('#action_container').html(result);
                /*$('#action_container').find('#individual_list_ddl').chosen();*/
            } else {
                go('action/home');
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
function show_client_view(client_id) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    $.ajax({
        type: 'POST',
        url: base_url + 'action/Home/get_clients_details/'+client_id,
        success: function (result) {
            console.log(result);
        },
        beforeSend: function () {            
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function show_client_view_recurring(client_id) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    $.ajax({
        type: 'POST',
        url: base_url + 'action/Home/get_clients_details_recurring',
        data: { client_id:client_id },
        success: function (result) {  
            var details = JSON.parse(result).split('-');
            if (details.length == 1) {
               window.open(base_url+'action/home/view_individual/'+result);
            } else {
               window.open(base_url+'action/home/view_business/'+details[1]+'/'+details[0]);
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
function pay_client_due(client_type='',client_id='',client_balance) {
    if(client_balance == 0) {
        return false;
    } else {
        $.ajax({
            type:'POST',
            url: base_url + 'billing/home/check_if_opening_balance_status',
            data: {'client_id':client_id},
            success:function(res) {
                if(res == 0) {                
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'services/incorporation/request_create_opening_balance',
                        data: { 'client_id':client_id,'client_balance':client_balance },
                        success: function (result) {
                            if(result != 0) {                                
                                goURL(base_url + 'billing/payments/details/'+btoa(result));                                
                            } else {
                                return false;
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
                    goURL(base_url + 'billing/payments/details/'+btoa(res));
                }
            }
        });
    }
}
function change_client_id(practice_id='') {
    console.log(practice_id);
    if (practice_id.trim() == '') {
        $(".client_id_info").html("practice_id cannot be empty");
        return false;
    }
    var client_id = $('#prev_practice_id').val().trim(); 
    console.log(client_id);
    if (practice_id.trim() == client_id) {
        $(".client_id_info").html("");                   
        $(".client_id_info2").html("");
        $("#practice_id_invalid").val('valid');
        return false;  
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'action/Home/client_id_exists_or_not',
        data: { client_id:practice_id.trim() },
        success: function (result) {
            var result = result.trim();
            if (result == '1') {
                $("#practice_id_invalid").val('invalid');
                $(".client_id_info").html("Already Exists! Please try another one");   
                $(".client_id_info2").html("");              
            } else {  
                $(".client_id_info").html("");                   
                $(".client_id_info2").html("Valid Client ID");
                $("#practice_id_invalid").val('valid');                  
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
function open_client_assoc_modal(){
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/client_assoc_modal',
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#client_assoc_modal').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
function client_search(value){
    var client_type = $("#client_type").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'action/Home/client_search',
        data: {
            value: value,
            client_type : client_type
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if(result != 0){
                var data = JSON.parse(result);
                var option = '';
                for(i=0;i<data.length;i++){
                    option += '<ul>';
                    option += '<a href="javascript:void(0)" onclick=\'save_client_assoc("'+ data[i].name +'")\'><li style="list-style-type:none">'+data[i].name+'</li></a>';
                    option += '</ul>';
                            
                }
                $("#ajax_div").html(option);
            }
            
        }
    });
}

function save_client_assoc(name)
{
    $("#client_association").attr('value' , name);
    $('#client_assoc_modal').modal('hide');
}

function add_custom_field()
{
    if (!requiredValidation('custom_field_form')) {
        return false;
    }
    
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var company_id = $("#company_id").val();

    var form_data = new FormData(document.getElementById('custom_field_form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/add_custom_field',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            var json = JSON.parse(result);
            if (json == "0") {
                if(reference == 'company') {
                    swal({title: "Success!", text: "Custom Field Type Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'action/home/view_business/' + reference_id + '/' + company_id);
                    });
                } else {
                    swal({title: "Success!", text: "Custom Field Type Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'action/home/view_individual/' + reference_id);
                    });
                }
            } else {
                swal("ERROR!", "Custom Field Added Failed", "error");
            }
        },
        beforeSend: function () {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function sales_tax_start_period_div(value) {
    if (value == 'monthly') {
        $("#start_period_div").show();
        $("#bookkeeping_start_quarter_div").hide();
        $("#bookkeeping_start_month_div").show();
        $("#bookkeeping_start_quarter").attr('required' , false);
    } else if (value == "quarterly") {
        $("#start_period_div").show();
        $("#bookkeeping_start_month_div").hide();
        $("#bookkeeping_start_quarter_div").show();
        $("#bookkeeping_start_month").attr('required' , false);
    } else if (value == "annually") {
        $("#start_period_div").show();
        $("#bookkeeping_start_month_div").hide();
        $("#bookkeeping_start_quarter_div").hide();
        $("#bookkeeping_start_month").attr('required' , false);
        $("#bookkeeping_start_quarter").attr('required' , false);
    } else {
        $("#start_period_div").hide();
    }
}

function load_custom_tab(reference_id = '' , reference = '' , company_id = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/load_custom_tab',
        data: {
            reference_id: reference_id,
            reference: reference,
            company_id: company_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != '0') {
                $('#custom_tab_div').html(result);
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
function client_interactions(client_id , type , practice_id , in_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/show_client_interactions_modal',
        data: {
            client_id: client_id,
            type: type,
            practice_id: practice_id,
            in_id: in_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#client_interactions-info-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function insert_client_interactions() {
    if (!requiredValidation('client_interactions_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('client_interactions_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/insert_client_interactions',
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
                swal("Success!", "Successfully Added Client Interactions!", "success");
                window.location.reload();
            }
        }
    });
}
function delete_client_interactions(id) {
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
                url: base_url + 'action/home/delete_client_interactions',
                data: {
                    in_id: id
                },
                success: function (result) {
                        if (result.trim() == "1") {
                            swal({
                                title: "Success!",
                                "text": "Interactions been deleted successfully!",
                                "type": "success"
                                }, function () {
                                    window.location.reload();
                                });
                            } else {
                                swal("ERROR!", "Unable to delete this Interactions", "error");
                            }
                        }
            });
        });
}

function show_interaction_attachment(id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/show_interaction_attachment',
        data: {
            in_id: id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#client_file_interactions-info-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function update_client_status_modal(reference_id , company_id = '' , type , practice_id)
{
    if (company_id == 'p') {
        conpany_id = '';
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/update_client_status_modal',
        data: {
            reference_id: reference_id,
            type: type,
            company_id: company_id,
            practice_id: practice_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#client_status-info-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
function update_client_status() {
    var statusval = $('#client_status-info-form input:radio[name=radio]:checked').val();
    var reference_id = $("#client_status-info-form #reference_id").val();
    var type = $("#client_status-info-form #type").val();
    var company_id = $("#client_status-info-form #company_id").val();
    if (type == 1) {
        if (statusval == 1) {
            active_business(reference_id , company_id);
        } else if(statusval == 2) {
            $("#confirmation_div").show();
            $("#status_div").hide();
        } else if (statusval == 3) {
            delete_business(reference_id , company_id , 'view-page');
        } else if (statusval == 4) {
            inactive_business(reference_id , company_id , statusval);
        }
    } else if(type == 2) {
        if (statusval == 1) {
            active_individual(reference_id);
        } else if (statusval == 2) {
            $("#confirmation_div").show();
            $("#status_div").hide();
        } else if (statusval == 3) {
            delete_individual(reference_id , 'view-page');
        } else if (statusval == 4) {
            inactive_individual(reference_id , statusval);
        }
    }
}

function update_client_date() {
    if (!requiredValidation('changes_date_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('changes_date_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/update_client_date',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // alert(result);return false;
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
                swal("Success!", "Successfully Update Date!", "success");
                window.location.reload();
            }
        }
    });
}
function get_county2(county_id = '', select_state = '', client_id = '', counter = '') {
    var state = $('#state'+counter+' option:selected').val();
    if (state != '') {
        $.ajax({
            type: "POST",
            data: {
                state_id: select_state,
                select_county: county_id,
                client_id: client_id,
            },
            url: base_url + 'action/home/get_county2',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    var county = document.getElementById('county'+counter);
                    county.innerHTML = "";
                    var data = JSON.parse(result);
                    county.options[county.options.length] = new Option('Select');
                    for (var i = 0; i < data.length; i++) {
                        county.options[county.options.length] = new Option(data[i].name, data[i].id);
                    }
                    if (county_id != '') {
                        $("#county" + counter).val(county_id);
                    }
                }
            }
        });
    } 
}

function get_county_rate2(county_id = '', counter = '') {
    if (county_id != '') {
        $.ajax({
            type: "POST",
            data: {
                county_id: county_id
            },
            url: base_url + 'action/home/get_county_rate2',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    var data = JSON.parse(result);
                    $('#rate'+counter).val(data.rate);
                    sales_gross_collect2(counter);
                }
            }
        });
    }
}
function sales_gross_collect2(counter = '') {
    var exempt_sales = parseFloat($('#exempt_sales'+counter).val());
    var taxable_sales = parseFloat($("#taxable_sales"+counter).val());
    var sales_tax_rate = parseFloat($("#rate"+counter).val());

    var gross_sales = exempt_sales + taxable_sales;
    var sales_tax_collect = sales_tax_rate * taxable_sales;
    var collection_allowance = sales_tax_collect * (2.5 / 100);
    if (collection_allowance > 30) {
        var total_due = sales_tax_collect - 30;
    } else {
        var total_due = sales_tax_collect - collection_allowance;
    }

    if (collection_allowance > 30) {
        $("#coll_err").html("Collection allowance maxes out at 30");
        collection_allowance = 30;
    } else {
        $("#coll_err").html("");
    }
    if (isNaN(gross_sales)) {
        $("#gross_sales"+counter).val('');
        $("#sales_tax_collect"+counter).val('');
        $("#collection_allowance"+counter).val('');
        $("#total_due"+counter).val('');

    } else {
        $("#gross_sales"+counter).val(gross_sales.toFixed(2));
        $("#sales_tax_collect"+counter).val(sales_tax_collect.toFixed(2));
        $("#collection_allowance"+counter).val(collection_allowance.toFixed(2));
        $("#total_due"+counter).val(total_due.toFixed(2));
    }
}

function save_client_family() {
    if (!requiredValidation('form_client_family')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("form_client_family"));
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/save_client_family',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
             // alert(result);return false;
            if (result == "1") {
                swal("ERROR!", "Unable To Add Client Family", "error");
            } else if (result == 0) {
                swal({
                    title: "Success!",
                    text: "Client Family Successfully Added!",
                    type: "success"
                }, function () {
                    $("#client_family_form").modal('hide');
                    get_client_family_list(reference, reference_id, 'edit');
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

function get_client_family_list(reference, reference_id, page_type = '') {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id,
            page_type: page_type
        },
        url: base_url + 'action/home/get_client_family_list',
        dataType: "html",
        success: function (result) {
            $("#client_family_list").html(result);
        }
    });
}

function edit_client_family() {
    if (!requiredValidation('form_edit_client_family')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("form_edit_client_family"));
    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/save_client_family',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
             // alert(result);return false;
            if (result == "1") {
                swal("ERROR!", "Unable To Add Client Family", "error");
            } else if (result == 0) {
                swal({
                    title: "Success!",
                    text: "Client Family Successfully Updated!",
                    type: "success"
                }, function () {
                    $("#client_family_form").modal('hide');
                    get_client_family_list(reference, reference_id, 'edit');
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

function delete_client_family1(id, reference_id, reference) {
    $.ajax({
        type: "POST",
        data: {
            id: id
        },
        url: base_url + 'action/home/delete_client_family',
        dataType: "html",
        success: function (result) {
            if (result == "1") {
                swal("ERROR!", "Unable To Delete Client Family", "error");
            } else if (result == 0) {
                swal({
                    title: "Success!",
                    text: "Client Family Successfully Deleted!",
                    type: "success"
                }, function () {
                    get_client_family_list(reference, reference_id, 'edit');
                });
            }
        }
    });
}

function open_family_member_div(counter) {
    $.ajax({
            type: "POST",
            data: {
                counter: counter
            },
            url: base_url + 'action/home/open_family_member_div',
            dataType: "html",
            success: function (result) {
                if (result) {
                    $('#client_family_div' + counter).html(result);
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

function add_family_member_div(counter) {
    $.ajax({
            type: "POST",
            data: {
                counter: counter
            },
            url: base_url + 'action/home/add_family_member_div',
            dataType: "html",
            success: function (result) {
                if (result) {                    
                    $(result).insertAfter('#client_family_div' + counter);
                    $("#add_div" + counter).hide();
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

function remove_family_member_div(counter)
{
    $('#client_family_div' + counter).remove();
    var count = counter - 1;
    $("#add_div" + count).show();
}

function get_manager_assistant(manager_id) {
    var office_id = $("#office").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'client/get_manager_assistant',
        data: {
            office_id: office_id,
            manager_id: manager_id
        },
        success: function (result) {
            if(result != 1){
                var data = JSON.parse(result);
                $("#assistant").val(data.staff_assistant_id);
            }
        }
    });
}

function add_association_model(reference_id , type, practice_id, office , edit_id = '' , modal_type = '')
{
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/add_association_model',
        data: {
            reference_id: reference_id,
            type: type,
            practice_id:practice_id,
            office:office,
            edit_id: edit_id,
            modal_type:modal_type
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#client_association_modal').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function view_client_association(id , reference_id , reference , practice_id = '',usertype='')
{
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/view_client_association',
        data: {
            id: id,
            reference_id: reference_id,
            reference: reference,
            practice_id: practice_id,
            usertype:usertype
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#client_association_modal').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
function submit_assocation_client() {
    // $('#add_association_client_form').find( 'select, textarea, input' ).each(function(){
    //     if(!$(this).prop('required')){
    //         console.log(this);
    //         console.log('Not Required Field');        
    //     } else { //required field
    //         console.log(this);
    //         console.log(this.value);
    //     }
    // });
    // return false;
    if (!requiredValidation('add_association_client_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('add_association_client_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/submit_assocation_client',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // alert(result);return false;
            var result = result.trim();
            if(result == 1){
                swal({
                    title: "Success!",
                    text: "Successfully Added!",
                    type: "success"
                }, function () {
                    $('#client_association_modal').modal('hide');
                    window.location.reload();
                });
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }
        }
    });
}

function client_association_unlink(id){
    swal({
        title: "Are you sure?",
        text: "You want to delete this association!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Delete it!",
        closeOnConfirm: false
    }, function () {
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/unlink_assocation_client',
        data: {
            id: id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
           // console.log(result); return false;
           var result = result.trim();
           if(result == 1){
            swal({
                title: "Success!",
                text: "Successfully Deleted!",
                type: "success"
            }, function () {
                $('#client_association_modal').modal('hide');
                window.location.reload();
                
            });
        } else {
            swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
        }
        }
    });
}); 
    
    
}

function delete_client_association(id){
    swal({
        title: "Are you sure?",
        text: "You want to delete this association!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Delete it!",
        closeOnConfirm: false
    }, function () {
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/delete_client_association',
        data: {
            id: id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
           // console.log(result); return false;
           var result = result.trim();
           if(result == 1){
            swal({
                title: "Success!",
                text: "Successfully Deleted!",
                type: "success"
            }, function () {
                window.location.reload();
                
            });
        } else {
            swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
        }
        }
    });
}); 
    
    
}

function add_family_model(reference_id , company_id = '' , type, practice_id, main_client_reference)
{
    $.ajax({
        type: 'POST',
        url: base_url + 'action/home/add_family_model',
        data: {
            reference_id: reference_id,
            type: type,
            company_id: company_id,
            practice_id:practice_id,
            main_client_reference:main_client_reference
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log(result); return false;
            $('#add_association_client_data').empty();
            $('#add_association_client_data').append(result);
            $('#add_association_client_modal').modal('show');
        }
    });
}
function open_add_family_association(reference_id, type, practice_id, add_family_reference, origin_of_modal='') {
    if(origin_of_modal == 'add_family_association'){
        var office = $("#office").val();   
        if(office == ''){
            swal("ERROR!", "Please Select Office First ", "error");
            return false;
        }
        var url = base_url + 'action/home/open_add_family_association_form/' + btoa(reference_id) + '/' + btoa(add_family_reference) + '/' + btoa(type) + '/' + btoa(practice_id) + '/' +  btoa(origin_of_modal) + '/' + btoa(office);
        window.open(url, 'Add client', "width=1200, height=600, top=100, left=110, scrollbars=yes");   

    } else {
        var url = base_url + 'action/home/open_add_family_association_form/' + btoa(reference_id) + '/' + btoa(add_family_reference) + '/' + btoa(type) + '/' + btoa(practice_id) + '/' +  btoa(origin_of_modal);
        window.open(url, 'Add client', "width=1200, height=600, top=100, left=110, scrollbars=yes");
    }
   
}
function contact_modal_client_family(modal_type, reference, reference_id, id,section_from='') {
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
        url: base_url + 'modal/contact_modal_client_family',
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
function client_family_save_contact(section='') {
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
        url: base_url + 'action/home/save_contact_client_family',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#contact-form').modal('hide');
            get_contact_list_client_family(reference_id, reference,'',section);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function action_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('action-filter-display-div'));
    // var val = form_data.getAll(name);
//     console.log(form_data);
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
//                console.log('current_made_id : '+current_made_id);
                /*if (current_element.id != current_made_id) {*/
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
            url: base_url + 'modal/action_sorting_filter_modal',
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
//                    console.log(formElement);
                    let filter_name = formElement[0];
                    let filter_value = formElement[0];
                    /*console.log(filter_value);*/
                    if (formElement[1] != '') {
                        let active_element = filter_name.split("[")[0];     
                        // console.log(active_element);
                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
                        let current_made_id = id_val+'-val';
//                        console.log('current_made_id : '+current_made_id);
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

function action_filter_new(page_numbers = '',is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
        console.log(removavle_element);
        if(removavle_element=='pattern'){
            $("#"+removavle_element+'_month').val('').trigger('chosen:updated');
        }
        if (removavle_element == 'responsible_name') {
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#responsible_staff").val('').trigger('chosen:updated');
        }
        if (removavle_element == 'all_project_staffs_assignto') {
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#assignto_staff").val('').trigger('chosen:updated');
        }
        $("#"+removavle_element).val('').trigger('chosen:updated');
        $("#"+clear_element).hide();

    }
    var form_data = new FormData(document.getElementById('action-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'action_id_filter') {
            var id = 'action_id_filter-val';
            if(is_clear==''){
                $("#action_id_filter-clear_filter").show();
            }        
        }
        if (a == 'priority_filter') {
            var id = 'priority_filter-val';
            if(is_clear==''){
                $("#priority_filter-clear_filter").show();
            }
        }
        if (a == 'to_office') {
            var id = 'to_office-val';
            if(is_clear==''){
                $("#to_office-clear_filter").show();
            }
        }
        if (a == 'to_dept') {
            var id = 'to_dept-val';
            if(is_clear==''){
                $("#to_dept-clear_filter").show();
            }
        }
        if (a == 'responsible_name') {
           var id = 'responsible_name-val';
            if (is_clear == '') {
                $("#responsible_name-clear_filter").show();
            }
        }
        if (a == 'all_project_staffs_assignto') {
            var id = 'all_project_staffs_assignto-val';
            if (is_clear == '') {
                $("#all_project_staffs_assignto-clear_filter").show();
            }
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'created_date') {
            var id = 'created_date-val';
            if(is_clear==''){
                $("#created_date-clear_filter").show();
            }
        }
        if (a == 'due_date') {
            var id = 'due_date-val';
            if(is_clear==''){
                $("#due_date-clear_filter").show();
            }
        }
        if (a == 'requested_type') {
            var id = 'requested_type-val';
            if(is_clear==''){
                $("#requested_type-clear_filter").show();
            }
        }
        if (a == 'by_dept') {
            var id = 'by_dept-val';
            if(is_clear==''){
                $("#by_dept-clear_filter").show();
            }
        }
        if (a == 'by_ofc') {
            var id = 'by_ofc-val';
            if(is_clear==''){
                $("#by_ofc-clear_filter").show();
            }
        }
        if (a == 'tag_labels') {
            var id = 'tag_labels-val';
            if(is_clear==''){
                $("#tag_labels-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'tracking-val';
            if(is_clear==''){
                $("#tracking-clear_filter").show();
            }
        }
    }

    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }
    var request_type = $("#action_request_type").val();
    if (request_type == undefined) {
        request_type = 'byme_tome_task';
    }
    var status = $("#action_status").val();
    if (status == undefined) {
        status = '';
    }
    var priority = $("#action_priority").val();
    if (priority == undefined) {
        priority = '';
    }
    // var created_office_id = $("#created_by").val();
    // if (created_office_id == undefined) {
    //     created_office_id = '';
    // }else{
    //    form_data.append('created_office_id', created_office_id); 
    // }
    // var created_staff_id = $("#staffs_name").val();
    // if (created_staff_id == undefined ||created_staff_id == null||created_staff_id == '') {
    //     created_staff_id = '';
    // }else{
    //     created_office_id = '';
    //     form_data.append('created_staff_id', created_staff_id);
    // }
    // var assign_office = $("#assign_to").val();
    // if (assign_office == undefined) {
    //     assign_office = '';
    // }else{
    //    form_data.append('assign_office', assign_office); 
    // }
    var assign_staff = $("#staffs").val();
    if (assign_staff == undefined ||assign_staff == null||assign_staff == '') {
        assign_staff = '';
    }else{
       assign_office = '';
       form_data.append('assign_staff', assign_staff);
    }
    // console.log(created_office_id);
    // console.log(assign_office);
    // console.log(created_staff_id);
    // console.log(assign_staff);//return false;

    var responsible_department = $('#responsible_department').val();
    var responsible_office = $('#responsible_name').val();
    var assign_office = $('#all_project_staffs_assignto').val();
    var assign_department = $('#assign_department').val();
    var responsible_name = $('#responsible_staff').val();
    var all_project_staffs_assignto = $('#assignto_staff').val();
    if (responsible_department == undefined) {
        responsible_department = '';
    }
    if (assign_department == undefined) {
        assign_department = '';
    }
    if (responsible_office == undefined) {
        responsible_office = '';
    }
    if (responsible_name == undefined) {
        responsible_name = '';
    }
    if (assign_office == undefined) {
        assign_office = '';
    }
    if (all_project_staffs_assignto == undefined) {
        all_project_staffs_assignto = '';
    }
    
    form_data.append('page_number', page_number);
    form_data.append('request_type', request_type);
    form_data.append('status', status);
    form_data.append('priority', priority);
    form_data.append('responsible_department', responsible_department);
    form_data.append('responsible_office', responsible_office);
    form_data.append('responsible_name', responsible_name);
    form_data.append('assign_department', assign_department);
    form_data.append('assign_office', assign_office);
    form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
 
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/action_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);
            $("#action_ajax_dashboard_div").html(result);
            $('#ProjectFilterModal').modal('hide');
            $("[data-toggle=popover]").popover();
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
function get_contact_list_client_family(reference_id, reference, disable = "",section="") {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id,
            disable: disable,
            section: section
        },
        url: base_url + 'action/home/get_contact_list_client_family',
        dataType: "html",
        success: function (result) {
            //console.log(result);
            $("#contact-list").html(result);
        }
    });
}
function contact_delete_client_family(reference, reference_id, id,section='') {
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
            url: base_url + "action/home/contact_delete_client_family",
            dataType: "html",
            success: function (result) {
                var result = result.trim();
                if (result == '1') {
                    get_contact_list_client_family(reference_id, reference,'',section);
                    swal("Deleted!", "Your contact has been deleted.", "success");
                } else {
                    swal("Error!", "Error to Delete Contact.", "error");
                }
            }
        });
    });
}

function sort_action_dashboard_new(sort_type = '', sort_val = '',page_number='') {
    var sort_type=sort_type.value;
//    alert(filter_data);

    var form_data = new FormData(document.getElementById('action-filter-display-div'));
    var request_type = $("#action_request_type").val();
    if (request_type == undefined) {
        request_type = 'byme_tome_task';
    }
    var status = $("#action_status").val();
    if (status == undefined) {
        status = '';
    }
    var priority = $("#action_priority").val();
    if (priority == undefined) {
        priority = '';
    }
    // alert(status);return false;
    form_data.append('page_number', page_number);
    form_data.append('request', request_type);
    form_data.append('status', status);
    form_data.append('priority', priority);
    form_data.append('sort_type', sort_type);
    form_data.append('sort_criteria', sort_val);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/sort_dashboard',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (action_result) {
            $("#action_ajax_dashboard_div").html(action_result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (action_result) {
            closeLoading();
        }
    });
}

function add_client_family_form_submit(){
    var origin_of_modal = $("#origin_of_modal").val();
    var new_client_reference_id = $("#new_added_reference_id").val();
    var Relationship = $("#relationship").val();
     //alert(new_client_reference_id); origin_of_modal
    if($("#relationship").val() == ''){
        swal("ERROR!", "Relationship feild Required", "error");
        return false;
    }
    if($("#type_of_individual_ddl").val() == 1){

        if($("#individual_first_name").val() == ''){
            swal("ERROR!", "First Name feild Required", "error");
            return false;
        }
        if($("#individual_last_name").val() == ''){
            swal("ERROR!", "Last Name feild Required", "error");
            return false;
        }
        if($("#individual_ssn_itin").val() == ''){
            swal("ERROR!", "SSN/ITIN feild Required", "error");
            return false;
        }
        if($("#individual_dob").val() == ''){
            swal("ERROR!", "Date of Birth feild Required", "error");
            return false;
        }
        if($("#individual_language").val() == ''){
            swal("ERROR!", "Language feild Required", "error");
            return false;
        }
        if($("#individual_country_residence").val() == ''){
            swal("ERROR!", "Country of Residence feild Required", "error");
            return false;
        }
        if($("#individual_country_citizenship").val() == ''){
            swal("ERROR!", "Country of Citizenship feild Required", "error");
            return false;
        }
    }else {
        if($("#staff_office").val() == ''){
            swal("ERROR!", "Office feild Required", "error");
            return false;
        }
        if($("#individual_list_ddl").val() == ''){
            swal("ERROR!", "Individual List feild Required", "error");
            return false;
        }

    }
    
    if($("#confirmation").prop('checked') == false){
        swal("ERROR!", "Please Checked Confirmation", "error");
        return false;
    }


    var form_data = new FormData(document.getElementById("add_client_family_form"));
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'action/home/add_client_family_form_submit',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result); return false;
             var result = result.trim();
             if (result == "2") {
                swal("ERROR!", "Please Add Contact Details", "error");
            } else if (result != 2) {
                swal({
                    title: "Success!",
                    text: "Client Successfully Added!",
                    type: "success"
                }, function () {
                    if(origin_of_modal != 'add_family_association'){
                        window.opener.closeModal('add_association_client_modal');
                    }
                    window.opener.family_list_for_add(result,Relationship);
                    self.close();
                    
                });
            }
        },
        beforeSend: function () {
           // $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function () {
            closeLoading();
        }
    });
    
}
function family_list_for_add(new_client_reference_id, Relationship=''){
    $("#family_reference_id").val(new_client_reference_id);
    get_client_family_list_new('individual', new_client_reference_id, 'edit',Relationship);
    //alert(7);
}
function closeModal(id) {
    $("#" + id).modal('hide');
    location.reload();
}

function client_family_exixting_or_new_change(client_type, new_reference_id, reference) {
    clearErrorMessageDiv();
    if (parseInt(client_type) == 0) {
        $("#personal_information").hide();
        $("#exitign_client_section").show();
    }else{
        $("#exitign_client_section").hide();
        $("#personal_information").show();       

    }
}

function copy_contact_client_family(old_reference_id, new_reference_id, reference){

    $.ajax({
        type: "POST",
        data: {
            old_reference_id:old_reference_id,
            new_reference_id:new_reference_id,
            reference:reference
        },
        url: base_url + 'action/home/copy_contact_from_parent_client',
        dataType: "html",
        cache: false,
        success: function (result) {
            var result = result.trim();
            if(result == 1){
                get_contact_list_client_family(new_reference_id, reference,'','');
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

function edit_family_client(reference_id='',reference='', origin_of_modal=''){
    var url = base_url + 'action/home/open_edit_family_association_form/' + reference_id + '/' + reference + '/' + origin_of_modal;
    window.open(url, 'Edit Client', "width=1200, height=600, top=100, left=110, scrollbars=yes");  
    
}
function get_contact_list_client_family_at_edit(reference_id, reference, disable = "",section="",status) {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id,
            disable: disable,
            section: section,
            status: status
        },
        url: base_url + 'action/home/get_contact_list_client_family_at_edit',
        dataType: "html",
        success: function (result) {
            //console.log(result);
            $("#contact-list").html(result);
        }
    });
}
function edit_client_family_form_submit(){
    //alert($("#type_of_individual_ddl").val());
    var origin_of_modal = $("#origin_of_modal").val();
    var main_client_reference_id = $("#main_client_reference_id").val();
     if($("#relationship").val() == ''){
         swal("ERROR!", "Relationship feild Required", "error");
         return false;
     }
 
    if($("#individual_first_name").val() == ''){
        swal("ERROR!", "First Name feild Required", "error");
        return false;
    }
    if($("#individual_last_name").val() == ''){
        swal("ERROR!", "Last Name feild Required", "error");
        return false;
    }
    if($("#individual_ssn_itin").val() == ''){
        swal("ERROR!", "SSN/ITIN feild Required", "error");
        return false;
    }
    if($("#individual_dob").val() == ''){
        swal("ERROR!", "Date of Birth feild Required", "error");
        return false;
    }
    if($("#individual_language").val() == ''){
        swal("ERROR!", "Language feild Required", "error");
        return false;
    }
    if($("#individual_country_residence").val() == ''){
        swal("ERROR!", "Country of Residence feild Required", "error");
        return false;
    }
    if($("#individual_country_citizenship").val() == ''){
        swal("ERROR!", "Country of Citizenship feild Required", "error");
        return false;
    }
     
     if($("#confirmation").prop('checked') == false){
         swal("ERROR!", "Please Checked Confirmation", "error");
         return false;
     }
 
 
     var form_data = new FormData(document.getElementById("edit_client_family_form"));
     $.ajax({
         type: "POST",
         data: form_data, //add_new_action
         url: base_url + 'action/home/edit_client_family_form_submit',
         dataType: "html",
         processData: false,
         contentType: false,
         enctype: 'multipart/form-data',
         cache: false,
         success: function (result) {
              //console.log(result);
              var result = result.trim();
              if (result == "2") {
                 swal("ERROR!", "Unable To update", "error");
             } else if (result != 2) {
                 swal({
                     title: "Success!",
                     text: "Client Successfully Updated!",
                     type: "success"
                 }, function () {
                     
                     if(origin_of_modal == 'add_family_association'){
                        window.opener.family_list_for_add(main_client_reference_id,'');
                     }else{
                        window.opener.closeModal('add_association_client_modal');
                     }
                     
                     self.close();
                     
                 });
             }
         },
         beforeSend: function () {
             openLoading();
         },
         complete: function () {
             closeLoading();
         }
     });
     
 }
 function delete_client_family(reference_id, reference,origin_of_modal='',temp_reference_id=''){
    swal({
        title: "Are you sure?",
        text: "You want to delete!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                reference: reference,
                reference_id: reference_id,
                origin_of_modal:origin_of_modal,
                temp_reference_id:temp_reference_id
            },
            url: base_url + "action/home/client_delete_from_client_family",
            dataType: "html",
            success: function (result) {
                var result = result.trim();
                if (result != '0') {
                    swal("Deleted!", "Client has been deleted.", "success");
                    
                    
                    if(origin_of_modal == 'add_family_association'){
                        family_list_for_add(result,'');
                     }else {
                        closeModal('add_association_client_modal');
                     }
                } else  {
                    swal("Error!", "Error to Delete Client.", "error");
                }
            }
        });
    });
 }
 function get_client_family_list_new(reference, reference_id, page_type = '') {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id,
            page_type: page_type
        },
        url: base_url + 'action/home/get_client_family_list_new',
        dataType: "html",
        success: function (result) {
            $("#client_family_list").html(result);
        }
    });
}
function load_business_filter_dashboard(page_numbers = '',is_clear='',current_clear_element='',client_type='',business_ids = '',sort_type = '', sort_val = '') {
    $('#business_dashboard_btn_clear_filter').show();
    var sort_type = sort_type.value;
    $('#service-tab').DataTable().destroy();
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
    var form_data = new FormData(document.getElementById('client_dashboard-filter-display-div'));
    for (const formElement of form_data) {
       
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
        if (a == 'office_filter') {
            var id = 'office_filter-val';
            if(is_clear==''){
                $("#office_filter-clear_filter").show();
            }        
        }
        if (a == 'manager_filter') {
            var id = 'manager_filter-val';
            if(is_clear==''){
                $("#manager_filter-clear_filter").show();
            }
        }
        if (a == 'partner_filter') {
            var id = 'partner_filter-val';
            if(is_clear==''){
                $("#partner_filter-clear_filter").show();
            }
        }
        if (a == 'referred_by_source') {
            var id = 'referred_by_source-val';
            if(is_clear==''){
                $("#referred_by_source-clear_filter").show();
            }
        }
        if (a == 'company_filter') {
            var id = 'company_filter-val';
            if(is_clear==''){
                $("#company_filter-clear_filter").show();
            }
        }
        if (a == 'project_filter') {
            var id = 'project_filter-val';
            if(is_clear==''){
                $("#project_filter-clear_filter").show();
            }
        }
        if (a == 'status_filter') {
            var id = 'status_filter-val';
            if(is_clear==''){
                $("#status_filter-clear_filter").show();
            }
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'company_name') {
            var id = 'company_name-val';
            if(is_clear==''){
                $("#company_name-clear_filter").show();
            }
        }
        if (a == 'referral_partner') {
            var id = 'referral_partner-val';
            if(is_clear==''){
                $("#referral_partner-clear_filter").show();
            }
        }
        if (a == 'email') {
            var id = 'email-val';
            if(is_clear==''){
                $("#email-clear_filter").show();
            }
        }
        if (a == 'phone') {
            var id = 'phone-val';
            if(is_clear==''){
                $("#phone-clear_filter").show();
            }
        }
        if (a == 'state_of_i') {
            var id = 'state_of_i-val';
            if(is_clear==''){
                $("#state_of_i-clear_filter").show();
            }
        }
        if (a == 'creation_date') {
            var id = 'creation_date-val';
            if(is_clear==''){
                $("#creation_date-clear_filter").show();
            }
        }
        if (a == 'client_association') {
            var id = 'client_association-val';
            if(is_clear==''){
                $("#client_association-clear_filter").show();
            }
        }
        if (a == 'owner_name') {
            var id = 'owner_name-val';
            if(is_clear==''){
                $("#owner_name-clear_filter").show();
            }
        }
    }

    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }
    if ($("#office_filter").length > 0) {
        var office_filter = $("#office_filter").val();
    }else{
        var office_filter = '';
    }
    if ($("#manager_filter").length > 0) {
        var manager_filter = $("#manager_filter").val();
    }else{
        var manager_filter = '';
    }
    if ($("#partner_filter").length > 0) {
        var partner_filter = $("#partner_filter").val();
    }else{
        var partner_filter = '';
    }
    if ($("#referred_by_source").length > 0) {
        var referred_by_source = $("#referred_by_source").val();
    }else{
        var referred_by_source = '';
    }
    if ($("#company_filter").length > 0) {
        var company_filter = $("#company_filter").val();
    }else{
        var company_filter = '';
    }
    if ($("#project_filter").length > 0) {
        var project_filter = $("#project_filter").val();
    }else{
        var project_filter = '';
    }
    if ($("#status_filter").length > 0) {
        var status_filter = $("#status_filter").val();
    }else{
        var status_filter = '';
    }
    if ($("#client_id").length > 0) {
        var client_id = $("#client_id").val();
    }else{
        var client_id = '';
    }
    if ($("#company_name").length > 0) {
        var company_name = $("#company_name").val();
    }else{
        var company_name = '';
    }
    if ($("#referral_partner").length > 0) {
        var referral_partner = $("#referral_partner").val();
    }else{
        var referral_partner = '';
    }
    if ($("#email").length > 0) {
        var email = $("#email").val();
        if(email[0]==''){
            email = ''; 
        }
    }else{
        var email = '';
    }
    if ($("#phone").length > 0) {
        var phone = $("#phone").val();
        if(phone[0]==''){
            phone = ''; 
        }
    }else{
        var phone = '';
    }
    if ($("#creation_date").length > 0) {
        var creation_date = $("#creation_date").val();
    }else{
        var creation_date = '';
    }
    if ($("#state_of_i").length > 0) {
        var state_of_i = $("#state_of_i").val();
    }else{
        var state_of_i = '';
    }
    if ($("#client_association").length > 0) {
        var client_association = $("#client_association").val();
    }else{
        var client_association = '';
    }
    if ($("#owner_name").length > 0) {
        var owner_name = $("#owner_name").val();
    }else{
        var owner_name = '';
    }
    // console.log(email);
    // console.log(phone);
    load_business_dashboard(office_filter, manager_filter, partner_filter, referred_by_source, company_filter,project_filter , client_type , business_ids ,'' , '' , status_filter,'',sort_type,sort_val,client_id,company_name ,referral_partner,email,phone,creation_date,state_of_i,client_association,owner_name);
   // new_form_data=$('#business_dashboard-filter-display-div').serializeArray();
    // $('#service-tab').DataTable({
    //     'processing': false,
    //     'serverSide': true,
    //     'serverMethod': 'post',
    //     'ajax': {
    //         'url': base_url + 'action/home/load_filter_data_business',
    //         'type': 'POST',
    //         'data': {
    //             office_filter:office_filter,
    //             manager_filter:manager_filter,
    //             partner_filter:partner_filter,
    //             referred_by_source:referred_by_source,
    //             company_filter:company_filter,
    //             project_filter:project_filter,
    //             status_filter:status_filter,
    //             client_type:client_type,
    //             business_ids:business_ids,
    //             sort_type1:sort_type,
    //             sort_val1:sort_val

    //         },
    //         beforeSend: function () {
    //             openLoading();
    //         },
    //         complete: function (msg) {
    //             closeLoading();
    //             $('#business_dashboard_btn_clear_filter').show();
    //         }
    //     },
    //     'columns': [
    //         {data: 'practice_id'},
    //         {data: 'name'},
    //         {data: 'office_id'},
    //         {data: 'manager'},
    //         {data: 'partner'},
    //         {data: 'status'},
    //         {data: 'action'}
    //     ]
    // });
}
function load_individual_filter_dashboard(page_numbers = '',is_clear='',current_clear_element='',client_type='',individual_ids = '',sort_type = '', sort_val = '') {
    $('#individual_dashboard_btn_clear_filter').show();
    console.log(current_clear_element);
    var sort_type = sort_type.value;
    $('#service-tab').DataTable().destroy();
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
        if(removavle_element == 'client_id' || removavle_element == 'client_name'){
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('client_dashboard-filter-display-div'));
    for (const formElement of form_data) {
       
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
        if (a == 'office_filter') {
            var id = 'office_filter-val';
            if(is_clear==''){
                $("#office_filter-clear_filter").show();
            }        
        }
        if (a == 'manager_filter') {
            var id = 'manager_filter-val';
            if(is_clear==''){
                $("#manager_filter-clear_filter").show();
            }
        }
        if (a == 'partner_filter') {
            var id = 'partner_filter-val';
            if(is_clear==''){
                $("#partner_filter-clear_filter").show();
            }
        }
        if (a == 'referred_by_source') {
            var id = 'referred_by_source-val';
            if(is_clear==''){
                $("#referred_by_source-clear_filter").show();
            }
        }
        if (a == 'company_filter') {
            var id = 'company_filter-val';
            if(is_clear==''){
                $("#company_filter-clear_filter").show();
            }
        }
        if (a == 'project_filter') {
            var id = 'project_filter-val';
            if(is_clear==''){
                $("#project_filter-clear_filter").show();
            }
        }
        if (a == 'status_filter') {
            var id = 'status_filter-val';
            if(is_clear==''){
                $("#status_filter-clear_filter").show();
            }
        }
        if (a == 'ssn') {
            var id = 'ssn-val';
            if(is_clear==''){
                $("#ssn-clear_filter").show();
            }
        }
        if (a == 'language') {
            var id = 'language-val';
            if(is_clear==''){
                $("#language-clear_filter").show();
            }
        }
        if (a == 'residenship') {
            var id = 'residenship-val';
            if(is_clear==''){
                $("#residenship-clear_filter").show();
            }
        }
        if (a == 'citizenship') {
            var id = 'citizenship-val';
            if(is_clear==''){
                $("#citizenship-clear_filter").show();
            }
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'client_name') {
            var id = 'client_name-val';
            if(is_clear==''){
                $("#client_name-clear_filter").show();
            }
        }
        if (a == 'referral_partner') {
            var id = 'referral_partner-val';
            if(is_clear==''){
                $("#referral_partner-clear_filter").show();
            }
        }
        if (a == 'email') {
            var id = 'email-val';
            if(is_clear==''){
                $("#email-clear_filter").show();
            }
        }
        if (a == 'phone') {
            var id = 'phone-val';
            if(is_clear==''){
                $("#phone-clear_filter").show();
            }
        }
        if (a == 'creation_date') {
            var id = 'creation_date-val';
            if(is_clear==''){
                $("#creation_date-clear_filter").show();
            }
        }
        if (a == 'client_association') {
            var id = 'client_association-val';
            if(is_clear==''){
                $("#client_association-clear_filter").show();
            }
        }
    }

    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }
    if ($("#office_filter").length > 0) {
        var office_filter = $("#office_filter").val();
    }else{
        var office_filter = '';
    }
    if ($("#manager_filter").length > 0) {
        var manager_filter = $("#manager_filter").val();
    }else{
        var manager_filter = '';
    }
    if ($("#partner_filter").length > 0) {
        var partner_filter = $("#partner_filter").val();
    }else{
        var partner_filter = '';
    }
    if ($("#referred_by_source").length > 0) {
        var referred_by_source = $("#referred_by_source").val();
    }else{
        var referred_by_source = '';
    }
    if ($("#status_filter").length > 0) {
        var status_filter = $("#status_filter").val();
    }else{
        var status_filter = '';
    }
    if ($("#ssn").length > 0) {
        var ssn = $("#ssn").val();
    }else{
        var ssn = '';
    }
    if ($("#language").length > 0) {
        var language = $("#language").val();
    }else{
        var language = '';
    }
    if ($("#citizenship").length > 0) {
        var citizenship = $("#citizenship").val();
    }else{
        var citizenship = '';
    }
    if ($("#residenship").length > 0) {
        var residenship = $("#residenship").val();
    }else{
        var residenship = '';
    }
    if ($("#client_id").length > 0) {
        var client_id = $("#client_id").val();
    }else{
        var client_id = '';
    }
    if ($("#client_name").length > 0) {
        var client_name = $("#client_name").val();
    }else{
        var client_name = '';
    }
    if ($("#referral_partner").length > 0) {
        var referral_partner = $("#referral_partner").val();
    }else{
        var referral_partner = '';
    }
    if ($("#email").length > 0) {
        var email = $("#email").val();
        if(email[0]==''){
            email = ''; 
        }
    }else{
        var email = '';
    }
    if ($("#phone").length > 0) {
        var phone = $("#phone").val();
        if(phone[0]==''){
            phone = ''; 
        }
    }else{
        var phone = '';
    }
    if ($("#creation_date").length > 0) {
        var creation_date = $("#creation_date").val();
    }else{
        var creation_date = '';
    }

    if ($("#client_association").length > 0) {
        var client_association = $("#client_association").val();
    }else{
        var client_association = '';
    }
    load_individual_dashboard(office_filter, manager_filter, partner_filter, referred_by_source , client_type , individual_ids,'' ,'' , status_filter,'',sort_type,sort_val,language,citizenship,residenship,client_id,client_name,referral_partner,email,phone,creation_date,ssn,client_association);
    // $('#service-tab').DataTable({
    //     'processing': false,
    //     'serverSide': true,
    //     'serverMethod': 'post',
    //     "aaSorting": [],
    //     'ajax': {
    //         'url': base_url + 'action/home/load_data_individual_for_filter',
    //         'type': 'POST',
    //         'data': {
    //             office_filter:office_filter,
    //             manager_filter:manager_filter,
    //             partner_filter:partner_filter,
    //             referred_by_source:referred_by_source,
    //             status_filter:status_filter,
    //             client_type:client_type,
    //             individual_ids:individual_ids,
    //             sort_type1:sort_type,
    //             sort_val1:sort_val

    //         },
    //         beforeSend: function () {
    //             openLoading();
    //         },
    //         complete: function (msg) {
    //             closeLoading();
    //             $('#bookkeeping_btn_clear_filter').show();
    //         }
    //     },
    //     'columns': [
    //         {data: 'practice_id'},
    //         {data: 'first_name'},
    //         {data: 'last_name'},
    //         {data: 'office_id'},
    //         {data: 'manager'},
    //         {data: 'partner'},
    //         {data: 'status'},
    //         {data: 'action'}
    //     ]
    // });
}
/*function download_file(brand='',franchise='',client_type='',client_id='',file_list_url='',folder_name='',file_name='') {
    file_list_url = atob(file_list_url);
    var client_data = { "brand":brand,'franchise':franchise,'client_type':client_type,'client_id':client_id,'file_list_url':file_list_url,'folder_name':folder_name,'file_name':file_name };
    client_data = JSON.stringify(client_data);
        $.ajax({
        type: "POST",
        // url: "https://localhost:9099/Api/SharePoint/DownloadFile",
        url: "https://dev2.taxleaf.com:9099/Api/SharePoint/DownloadFile",
        async: true,
        data: client_data,
        contentType: "application/json",
        // contentType: "application/octet-stream",
        dataType: "json",        
        // dataType: "octet-stream",        
        cache:false,
        success: function (result) {
            console.log(result);           
            console.log(typeof(result));           
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
            jumpDiv();
        }
    });
}*/
function get_client_association_template(company_type){
    $.ajax({
        type: "POST",
        data: {
            company_type: company_type
        },
        url: base_url + 'action/home/get_client_association_template',
        success: function (result) {
            var template_id= result.trim();
            $('#template_id').val(template_id);
        }
    });
}
function get_individul_client_association_template(residence_type){
    $.ajax({
        type: "POST",
        data: {
            residence_type: residence_type
        },
        url: base_url + 'action/home/get_individual_client_association_template',
        success: function (result) {
            var template_id= result.trim();
            $('#template_id').val(template_id);
        }
    });
}
function askprojectcreateconfirmation(reference_id,company_id,template_id){
    swal({
        title: "Client has been created successfully.",
        text: "Would you like to create a new project?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false
    }, function (isConfirm) {
        if (isConfirm) {
            goURL(base_url + 'action/home/view_business/' + reference_id + '/' + company_id + '/' + template_id);
        }else{
            goURL(base_url + 'action/home/view_business/' + reference_id + '/' + company_id);
        }
    });
}
function askprojectcreateconfirmation_for_individual(individual_id,template_id){
    swal({
        title: "Client has been created successfully.",
        text: "Would you like to create a new project?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false
    }, function (isConfirm) {
        if (isConfirm) {
            goURL(base_url + 'action/home/view_individual/' + individual_id + '/' + template_id);
        }else{
            goURL(base_url + 'action/home/view_individual/' + individual_id);
        }
    });
}