function getServiceList(category_id, service_id = '') {
    if (category_id == 20) {
        $('#service').removeAttr('required');
        $("#template_service_id").hide();
    } else {
        var category_id = $("#service_category option:selected").val();
        if (category_id == 20) {
            $('#service').removeAttr('required');
            $("#template_service_id").hide();
        } else {
            $.ajax({
                type: "POST",
                data: {category_id: category_id, select_service: service_id}, //add_new_action
                url: base_url + 'administration/template/get_service_list',
                dataType: "html",
                success: function (result) {
                    $('#service').html(result);
                    $("#template_service_id").show();
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
}

//department staff uttam (new)
function get_template_office_new(is_all = '', department_id = '', staff_id = '', assign_staff = '', is_edit = '', office_id = '') {
    //alert(assign_staff);
    var department_id = $("#department option:selected").val();
    if (department_id != '') {
        var staff_type = $("#staff_type").val();
        var disable_field = $("#disable_field").val();
        $.ajax({
            type: "POST",
            data: {
                department_id: department_id,
                select_staffs: staff_id,
                is_all: is_all,
                ismyself: 0,
                assign_staff: assign_staff,
                is_edit: is_edit,
                office_id: office_id
            },
            url: base_url + 'administration/template/get_template_office_ajax_new',
            dataType: "html",
            success: function (result) {
                // console.log(result);
                $("#dept_staff_div").html(result);
                $("#dept_staff_div").show();
                if (disable_field == "y") {
                    $(".is_all").attr("disabled", "disabled");
                    $("#dept_staff").attr("disabled", "disabled");
                    $("#dept_staff").removeAttr('required');
                } else {
                    if ($("#dept_staff").attr("disabled")) {
                        $("#dept_staff").removeAttr("disabled");
                    }
                    if ($(".is_all").attr("disabled")) {
                        $(".is_all").removeAttr("disabled");
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
        $("#dept_staff_div").hide();
}
}
//responsible staff
function get_template_responsible_staff(res_department = '', res_staff = '', is_all = '', staff_id = '') {
//    alert(res_department);
    var user_type = $("#user_type option:selected").val();
    if (user_type != '') {
        var staff_type = $("#ofc_staff_type").val();
        var disable_field = $("#disable_field").val();
        $.ajax({
            type: "POST",
            data: {
                user_type: user_type,
                res_department: res_department,
                res_staff: res_staff,
                is_all: is_all,
                select_staff: staff_id
//                ismyself: 0,
//                partner: partner,
//                manager: manager,
//                associate: associate
            },
            url: base_url + 'administration/template/get_template_responsible_staff_ajax',
            dataType: "html",
            success: function (result) {
//                alert(user_type);
                $('#responsible_francise_div').html(result);
                if (user_type == 3 && user_type != 1 && user_type != 2) {
                    $('#responsible_francise_div').show();
                    $('#responsible_staff_div').hide();
//                    get_responsible_staff(user_type);
                } else {
                    if (user_type == 1) {
                        get_responsible_staff_list(staff_id, is_all, user_type)
                    }
                    $('#responsible_francise_div').show();
                    $('#responsible_staff_div').hide();
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
        $('#responsible_francise_div').hide();
        $('#responsible_staff_div').hide();
}
}
function get_responsible_staff(user_type = '') {
    if (user_type != '') {
        $.ajax({
            type: "POST",
            data: {
                user_type: user_type,
                responsible_staff: responsible_staff
            },
            url: base_url + 'administration/template/get_responsible_francise_staff',
            dataType: "html",
            success: function (result) {
//                alert(user_type);
                $('#responsible_staff_div').html(result);
                $('#responsible_staff_div').show();
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        $('#responsible_staff_div').hide();
}
}
function get_responsible_staff_list(select_staff = '', is_all = '', user_type = '') {
    var department_id = $("#responsible_department option:selected").val();
//    alert(user_type);
    if (department_id != '') {
        $.ajax({
            type: "POST",
            data: {
                department_id: department_id,
                ismyself: 0,
                select_staffs: select_staff,
                is_all: is_all,
                user_type: user_type
            },
            url: base_url + 'administration/template/get_responsible_staff_list_ajax',
            dataType: "html",
            success: function (result) {
//                alert(user_type);
                $('#responsible_staff_div').html(result);
                $('#responsible_staff_div').show();
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        $('#responsible_staff_div').hide();
}
}
//office staff    uttam(new)
function get_template_office_staff(is_all = '', office_id = '', staff_id = '', partner = '', manager = '', associate = '') {
//    alert(staff_id);return false;
    var office_id = $("#office option:selected").val();
    if (office_id != '') {
        var staff_type = $("#ofc_staff_type").val();
        var disable_field = $("#disable_field").val();
        $.ajax({
            type: "POST",
            data: {
                select_office: office_id,
                select_staffs: staff_id,
                is_all: is_all,
                ismyself: 0,
                partner: partner,
                manager: manager,
                associate: associate
            },
            url: base_url + 'administration/template/get_template_office_staff_ajax',
            dataType: "html",
            success: function (result) {
                $("#ofic_staff_div").html(result);
                $("#ofic_staff_div").show();
                if (disable_field == "y") {
                    $(".is_all").attr("disabled", "disabled");
                    $("#office_staff").attr("disabled", "disabled");
                    $("#staff-hidden").val(1);
                    $("#office_staff").removeAttr('required');
                } else {
                    if ($("#office_staff").attr("disabled")) {
                        $("#office_staff").removeAttr("disabled");
                    }
                    if ($(".is_all").attr("disabled")) {
                        $(".is_all").removeAttr("disabled");
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
        $("#ofic_staff_div").hide();
}
}

//task deparment list
function get_task_department_staff(select_staffs = "", is_all = "", responsible_staff = "") {
//    alert(is_all);
    var department_id = $("#task_department option:selected").val();

    if (department_id != '') {
        var staff_type = $("#task_staff_type").val();
        var disabled = $("#task_disable_field").val();
        var assign_myself = '';
        var ismyself = $(".ismyself").val();

        $.ajax({
            type: "POST",
            data: {
                department_id: department_id,
                disabled: disabled,
                responsible_staff: responsible_staff,
                select_staff: select_staffs,
                ismyself: ismyself,
                is_all: is_all
            },
            url: base_url + 'administration/template/get_task_department_office_ajax',
            dataType: "html",
            success: function (result) {
                $("#task_office_div").html(result);
                $("#task_office_div").show();
                $("#task_staff_div").hide();
//                if (parseInt(department_id) != 2 && parseInt(staff_type) == 1) {
//                    $("#task_office_div").hide();
//                    get_task_staff(select_staffs, assign_myself, disabled);
//                    //$("#office").attr("disabled", "disabled");
//                } else if (parseInt(department_id) != 2 && parseInt(staff_type) == 2) {
//                    $("#task_office_div").hide();
//                    get_task_staff(select_staffs, assign_myself, disabled);
//                    //$("#office").attr("disabled", "disabled");
//                } else if (parseInt(department_id) != 2 && parseInt(staff_type) == 3) {
//                    $("#task_office_div").hide();
//                    get_task_staff(select_staffs, assign_myself, disabled,is_all,responsible_staff);
//                    //$("#office").attr("disabled", "disabled");
//                } else if (disabled == "y") {
//                    $("#office").attr("disabled", "disabled");
//                } else {
//                    $("#task_office_div").show();
//                    $("#task_staff_div").hide();
//                    // if ($("#office").attr("disabled")) {
//                    //     $("#office").removeAttr("disabled");
//                    // }
//                }

            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        $("#task_office_div").hide();
        $("#task_staff_div").hide();
}
}
function get_task_staff(select_staffs = '', assign_myself = '', disabled = '', is_all = '', responsible_staff = '') {
//    alert(is_all);
    var department_id = $("#task_department option:selected").val();
    var office_id = $("#task_office option:selected").val();
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
                disabled: disabled,
                is_all: is_all,
                responsible_staff: responsible_staff
            },
            url: base_url + 'administration/template/get_template_task_staff_ajax',
            dataType: "html",
            success: function (result) {
//                alert(assign_myself);
                $("#task_staff_div").html(result);
                $("#task_staff_div").show();
                if (disable_field == "y") {
                    $(".is_all").attr("disabled", "disabled");
                    $("#task_staff").attr("disabled", "disabled");
                    $("#staff-hidden").val(1);
                    $("#task_staff").removeAttr('required');
                } else {
//                    alert('b');
//                    $("#task_staff_div").show();
//                     if ($("#staff").attr("disabled")) {
//                         $("#staff").removeAttr("disabled");
//                     }
//                     if ($(".is_all").attr("disabled")) {
//                         $(".is_all").removeAttr("disabled");
//                     }
                }
                if (assign_myself != '') {
                    hide_task_ofc_staff_div_in_editcase(assign_myself);
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
        $("#task_staff_div").hide();
}
}
function hide_task_ofc_staff_div_in_editcase(assign_myself) {
//    alert(assign_myself);
    if (assign_myself != 0) {
        $("#is_chk_mytask").prop('checked', true);
        $("#task_department").removeAttr("required");
        $("#task_office").removeAttr("required");
        $(".spanclass").html('');
        $(".dept_div").hide();
        $("#task_office_div").hide();
        $("#task_staff_div").hide();
    } else {
//        var dept = $("#task_department option:selected").val();
//        if (dept == 2) {
//            $("#task_office_div").show();
//        }
        $("#is_chk_mytask").prop('checked', false);
        $("#task_department").attr("required", "required");
        $("#task_office").attr("required", "required");
        $(".spanclass").html('*');
        $(".dept_div").show();
        $("#task_staff_div").show();
    }
}

//end task department staff

function request_create_template() {
    if (!requiredValidation('save_template_main')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("save_template_main"));
    var pattern = $("#pattern option:selected").val();
    if (pattern == '') {
        $("#err_generation").html("Please Select Pattern From Generation.");
        return false;
    }
    if ($("#occur_weekdays").prop("checked") == true) {
        var occur_weekdays = '1';
    } else {
        var occur_weekdays = '0';
    }

    if ($("#client_fiscal_year_end").prop("checked") == true) {
        var client_fiscal_year_end = '1';
        var client_fiscal_year_type = $('input[name="recurrence[due_fiscal]"]:checked').val();
        if (client_fiscal_year_type == 1) {
            var client_fiscal_year_day = $('input[name="recurrence[due_fiscal_day]"]').val();
            ;
            var client_fiscal_year_wday = '0';
            var client_fiscal_year_month = $('input[name="recurrence[due_fiscal_day]"] option:selected').val();
        } else {
            var client_fiscal_year_day = $('input[name="recurrence[due_fiscal_month]"] option:selected').val();
            var client_fiscal_year_wday = $('input[name="recurrence[due_fiscal_wday]"] option:selected').val();
            var client_fiscal_year_month = $('input[name="recurrence[due_fiscal_month]"] option:selected').val();
        }
    } else {
        var client_fiscal_year_end = '0';
        var client_fiscal_year_type = '0';
        var client_fiscal_year_day = '0';
        var client_fiscal_year_wday = '0';
        var client_fiscal_year_month = '0';
    }
    if (pattern == 'annually') {
        if (client_fiscal_year_end == 1) {
            var due_day = '0';
            var due_month = '0';
        } else {
            var due_day = $("#r_day").val();
            var due_month = $("#r_month option:selected").val();
        }
    } else if (pattern == 'none') {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month option:selected").val();
    } else if (pattern == 'weekly') {
        var due_day = $("#r_day").val();
        var due_month = $('input[name="recurrence[due_month]"]:checked').val();
    } else if (pattern == 'quarterly') {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month option:selected").val();
    } else if (pattern == 'periodic') {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month").val();
        var periodic_days = new Array();
        var periodic_months = new Array();
        $("input[name='due_days[]']").each(function () {
            periodic_days.push($(this).val());
        });
        var periodic_months = $('.periodic_mnth').map(function () {
            return this.value;
        }).get();
        var periodic_due_days = JSON.stringify(periodic_days);
        var periodic_due_months = JSON.stringify(periodic_months);
    } else {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month").val();
    }
    var expiration_type = $('input[name="recurrence[expiration_type]"]:checked').val();
    var end_occurrence = $("#end_occurrence").val();
    var target_start_days = $("#t_start_day").val();
    var target_start_months = $("#t_start_month").val();
    var target_end_days = $("#t_end_day").val();
    var target_end_months = $("#t_end_month").val();
    var target_start_day = $('input[name="recurrence[target_start_day]"]:checked').val();
    var target_end_day = $('input[name="recurrence[target_end_day]"]:checked').val();
    var generation_type = $('input[name="recurrence[generation_type]"]:checked').val();
    var generation_day = $("#generation_day").val();
    var generation_month = $("#generation_month").val();

    form_data.append('recurrence[pattern]', pattern);
    form_data.append('recurrence[occur_weekdays]', occur_weekdays);
    form_data.append('recurrence[client_fiscal_year_end]', client_fiscal_year_end);
    form_data.append('recurrence[due_day]', due_day);
    form_data.append('recurrence[due_month]', due_month);
    form_data.append('recurrence[periodic_due_day]', periodic_due_days);
    form_data.append('recurrence[periodic_due_month]', periodic_due_months);
    form_data.append('recurrence[expiration_type]', expiration_type);
    form_data.append('recurrence[end_occurrence]', end_occurrence);
    form_data.append('recurrence[target_start_days]', target_start_days);
    form_data.append('recurrence[target_start_months]', target_start_months);
    form_data.append('recurrence[target_start_day]', target_start_day);
    form_data.append('recurrence[target_end_days]', target_end_days);
    form_data.append('recurrence[target_end_months]', target_end_months);
    form_data.append('recurrence[target_end_day]', target_end_day);
    form_data.append('recurrence[generation_type]', generation_type);
    form_data.append('recurrence[generation_day]', generation_day);
    form_data.append('recurrence[generation_month]', generation_month);
    form_data.append('recurrence[fye_type]', client_fiscal_year_type);
    form_data.append('recurrence[fye_day]', client_fiscal_year_day);
    form_data.append('recurrence[fye_is_weekday]', client_fiscal_year_wday);
    form_data.append('recurrence[fye_month]', client_fiscal_year_month);

    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'administration/template/request_create_template',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//            alert(result); return false;
//console.log(result); return false;
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Template Successfully Added!",
                    type: "success"
                }, function () {
                    $('#task_btn').val(result);
                    $('#task_btn').prop('disabled', false);
                    $("#nav-link-2").trigger("click");
                    //goURL(base_url + 'action/home');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Template", "error");
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

function get_template_task_modal(template_id) {
    $.ajax({
        type: "POST",
        url: base_url + 'modal/get_template_task_modal',
        dataType: "html",
        data: {template_id: template_id},
        success: function (result) {
            $('#taskModal').modal();
            $('#taskModal').html(result);

        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });

}
function tetmplate_task_edit_modal(task_id, template_id = '') {
    //alert(template_id);
    $.ajax({
        type: "POST",
        url: base_url + 'modal/edit_template_task_modal',
        dataType: "html",
        data: {task_id: task_id, template_id: template_id},
        success: function (result) {
//            alert(result);
            $('#taskModal').html(result);
            $('#taskModal').modal();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function change_due_pattern(val) {
    if (val == 'annually') {
        $(".none-div").show();
        $(".annual-check-div").show();
        $('#weekend_val').show();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day" class="m-r-5"> Due on every</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]" value="1"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" style="width: 100px" id="r_day">');
    } else if (val == 'weekly') {
        $(".none-div").show();
        $(".annual-check-div").hide();
        $('#weekend_val').show();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day"> Due every</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day">&nbsp;week(s) on the following days:&nbsp;<div class="m-t-10"><div class="m-b-10"><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="1" checked="" class="m-r-5">&nbsp;Sunday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="2" class="m-r-5">&nbsp;Monday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="3" class="m-r-5">&nbsp;Tuesday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="4" class="m-r-5">&nbsp;Wednesday&nbsp;</span></div><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="5" class="m-r-5">&nbsp;Thursday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="6" class="m-r-5">&nbsp;Friday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="7" class="m-r-5">&nbsp;Saturday</span></div>');
    } else if (val == 'quarterly') {
        $(".none-div").show();
        $(".annual-check-div").hide();
        $('#weekend_val').show();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day"> Due on day</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day"><label class="control-label m-r-5">of</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]"><option value="1">First</option><option value="2">Second</option><option value="3">Third</option></select>&nbsp;<label class="control-label m-r-5" id="control-label">month in next quarter</label>');
    } else if (val == 'monthly') {
        $(".none-div").show();
        $(".annual-check-div").hide();
        $('#weekend_val').show();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" class="m-r-5" name="recurrence[due_type]" checked="" value="1" id="due_on_day"> Due on day</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day"><label class="control-label m-r-5">of every</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_month]" min="1" max="12" value="1" style="width: 100px" id="r_month">&nbsp;<label class="control-label" id="control-label">month(s)</label>');
    } else if (val == 'periodic') {
        $(".none-div").show();
        $(".annual-check-div").hide();
        $('#weekend_val').hide();
        $(".due-div").addClass("recurrence-date");
        $(".due-div").html('<div class="row"><div class="col-md-12 m-b-5"><label class="control-label m-r-5">Due on day</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day"><label class="control-label m-r-5">of month</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]" value="1"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>&nbsp;<a href="javascript:void(0);" onclick="addPeriodicDate()" class="add-filter-button btn btn-primary" data-toggle="tooltip" data-placement="top" title="Add Periodic Date"> <i class="fa fa-plus" aria-hidden="true"></i> </a></div></div>');
    } else {
        $(".none-div").hide();
        $(".annual-check-div").hide();
        $('#weekend_val').show();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day" class="m-r-5"> Due on every</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" style="width: 100px" id="r_day">');
    }
}

function addPeriodicDate() {
    var random = Math.floor((Math.random() * 999) + 1);
    var clone = '<div class="row" id="clone-' + random + '"><div class="col-md-12 m-b-5"><label class="control-label m-r-5"> Due on day</label>&nbsp;<input class="form-control m-r-5 test" type="number" name="due_days[]" min="1" max="31" value="1" style="width: 100px" id="r_day1"><label class="control-label m-r-5">of month</label>&nbsp;<select class="form-control m-r-2 periodic_mnth" id="r_month1" name="due_months[]" value="1"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>&nbsp; <a href="javascript:void(0);" onclick="removePeriodicDate(' + random + ')" class="remove-filter-button text-danger btn btn-white" data-toggle="tooltip" title="Remove filter" data-placement="top"><i class="fa fa-times" aria-hidden="true"></i> </a></div></div>';
    $(".due-div").append(clone);
}
function removePeriodicDate(random) {
    var variableArray = [];
    var elementArray = [];
    var divID = 'clone-' + random;
    var variableDropdownValue = $("#clone-" + random).val();
    var index = variableArray.indexOf(variableDropdownValue);
    variableArray.splice(index, 1);
    $("#" + divID).remove();
}

function closeRecurrenceModal() {
    var get_content = $('#RecurranceModal .modal-body').html();

    // var form_data = $('#template-task-modal').serialize(); 
    // var form_data = "Hello";
    // alert($("#due_on_the_second").val());return false;

    // alert($("#due_on_day:checked").val());
    // alert($("#due_on_the:checked").val());
    $('#pattern_show').html('');

    //if ($("#due_on_day").is(":checked")) {
    var patterntext = $("#pattern option:selected").text();
    // var patternval = $("#pattern option:selected").val();
    // var rday = $("#r_day").val();
    // var rmonth = $("#r_month").val();
    // // form_data.push($("#r_day").val());
    // // form_data.push($("#r_month").val());
    // //}
    // // else if($("#due_on_the").is(":checked")){
    // //     form_data.push($("#pattern").val());
    // //     form_data.push($("#due_on_the_first option:selected").val());
    // //     form_data.push($("#due_on_the_second option:selected").val());
    // //     form_data.push($("#due_on_the_every").val());        
    // // }
    // if (patternval == 'yearly') {
    //     var ryear = $("#r_year").val();
    // } else {
    //     var ryear = '';
    // }
    // if (ryear != '') {
    //     get_data += ' ' + ryear + ' Year';
    // }

    $('#pattern_show').html(patterntext);
    // var a=patterntext;
    // if(a==''){
    //     alert('hi');
    // }
    //$('#RecurranceModalContainer').html(get_content);
    $('#RecurranceModal').modal('hide');

}
function save_task() {
    if (!requiredValidation('template-task-modal')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("template-task-modal"));
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'administration/template/project_template_task',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //alert(result);
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Template Task Successfully Added!",
                    type: "success"
                }, function () {
                    $("#task_list").html(result);
                    $("#taskModal").modal('hide');
                }
                );
            } else {
                swal("ERROR!", "Unable To Add Template Task.", "error");
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
function go(url) {
    window.location.href = base_url + url;
}
function request_edit_template() {
    if (!requiredValidation('update_template_main')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("update_template_main"));
    var pattern = $("#pattern option:selected").val();
    if ($("#occur_weekdays").prop("checked") == true) {
        var occur_weekdays = '1';
    } else {
        var occur_weekdays = '0';
    }
    if ($("#client_fiscal_year_end").prop("checked") == true) {
        var client_fiscal_year_end = '1';
        var client_fiscal_year_type = $('input[name="recurrence[due_fiscal]"]:checked').val();
        if (client_fiscal_year_type == 1) {
            var client_fiscal_year_day = $('input[name="recurrence[due_fiscal_day]"]').val();
            ;
            var client_fiscal_year_wday = '0';
            var client_fiscal_year_month = $('input[name="recurrence[due_fiscal_day]"] option:selected').val();
        } else {
            var client_fiscal_year_day = $('input[name="recurrence[due_fiscal_month]"] option:selected').val();
            var client_fiscal_year_wday = $('input[name="recurrence[due_fiscal_wday]"] option:selected').val();
            var client_fiscal_year_month = $('input[name="recurrence[due_fiscal_month]"] option:selected').val();
        }
    } else {
        var client_fiscal_year_end = '0';
        var client_fiscal_year_type = '0';
        var client_fiscal_year_day = '0';
        var client_fiscal_year_wday = '0';
        var client_fiscal_year_month = '0';
    }
    if (pattern == 'annually') {
        if (client_fiscal_year_end == 1) {
            var due_day = '0';
            var due_month = '0';
        } else {
            var due_day = $("#r_day").val();
            var due_month = $("#r_month option:selected").val();
        }
    } else if (pattern == 'none') {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month option:selected").val();
    } else if (pattern == 'weekly') {
        var due_day = $("#r_day").val();
        var due_month = $('input[name="recurrence[due_month]"]:checked').val();
    } else if (pattern == 'quarterly') {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month option:selected").val();
    } else if (pattern == 'periodic') {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month").val();
        var periodic_days = new Array();
        var periodic_months = new Array();
        $("input[name='due_days[]']").each(function () {
            periodic_days.push($(this).val());
        });
        var periodic_months = $('.periodic_mnth').map(function () {
            return this.value;
        }).get();
        var periodic_due_days = JSON.stringify(periodic_days);
        var periodic_due_months = JSON.stringify(periodic_months);
    } else {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month").val();
    }

    var expiration_type = $('input[name="recurrence[expiration_type]"]:checked').val();
    var end_occurrence = $("#end_occurrence").val();
    var target_start_days = $("#t_start_day").val();
    var target_start_months = $("#t_start_month").val();
    var target_end_days = $("#t_end_day").val();
    var target_end_months = $("#t_end_month").val();
    var target_start_day = $('input[name="recurrence[target_start_day]"]:checked').val();
    var target_end_day = $('input[name="recurrence[target_end_day]"]:checked').val();
    var generation_type = $('input[name="recurrence[generation_type]"]:checked').val();
    var generation_day = $("#generation_day").val();
    var generation_month = $("#generation_month").val();

    form_data.append('recurrence[pattern]', pattern);
    form_data.append('recurrence[occur_weekdays]', occur_weekdays);
    form_data.append('recurrence[client_fiscal_year_end]', client_fiscal_year_end);
    form_data.append('recurrence[due_day]', due_day);
    form_data.append('recurrence[due_month]', due_month);
    form_data.append('recurrence[periodic_due_day]', periodic_due_days);
    form_data.append('recurrence[periodic_due_month]', periodic_due_months);
    form_data.append('recurrence[expiration_type]', expiration_type);
    form_data.append('recurrence[end_occurrence]', end_occurrence);
    form_data.append('recurrence[target_start_days]', target_start_days);
    form_data.append('recurrence[target_start_months]', target_start_months);
    form_data.append('recurrence[target_start_day]', target_start_day);
    form_data.append('recurrence[target_end_days]', target_end_days);
    form_data.append('recurrence[target_end_months]', target_end_months);
    form_data.append('recurrence[target_end_day]', target_end_day);
    form_data.append('recurrence[generation_type]', generation_type);
    form_data.append('recurrence[generation_day]', generation_day);
    form_data.append('recurrence[generation_month]', generation_month);
    form_data.append('recurrence[fye_type]', client_fiscal_year_type);
    form_data.append('recurrence[fye_day]', client_fiscal_year_day);
    form_data.append('recurrence[fye_is_weekday]', client_fiscal_year_wday);
    form_data.append('recurrence[fye_month]', client_fiscal_year_month);

    var edit_template = $("#edit_template").val();
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'administration/template/request_edit_template/' + edit_template,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//            alert(result);return false;
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Template Successfully Added!",
                    type: "success"
                }, function () {
                    $('#task_btn').val(result);
                    $('#task_btn').prop('disabled', false);
                    $("#nav-link-2").trigger("click");
                    //goURL(base_url + 'action/home');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Template", "error");
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
function CreateProjectModal(modal_type, project_id = '', client_type = '', client_id = '', addfrom = '',template_id='') {
    $.ajax({
        type: "POST",
        data: {
            project_id: project_id,
            modal_type: modal_type,
            client_type: client_type,
            client_id: client_id,
            addfrom: addfrom,
            template_id: template_id
        },
        url: base_url + 'modal/ajax_manage_project',
        success: function (project_result) {
            $("#projectModal").html(project_result);
            $("#projectModal").modal();
            $('#projectModal').modal({
                backdrop: 'static'
            });

        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function project_client_list(office_id = '', client_id = '', mode = '') {
//    alert(mode);
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_id: client_id,
            mode: mode
        },
        url: base_url + 'project/get_project_completed_orders_officewise',
        dataType: "html",
        success: function (result) {
            $("#client_list_project").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function project_responsible_client(client) {
//    var client= $("#client_list_project option:selected").val();
//    alert(client);
}

function request_create_project() {
    $("#client_list_ddl").removeAttr('disabled');
    if (!requiredValidation('form_save_project')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("form_save_project"));
    var client_id = $("#exist_client_id").val();
    var client_type = $("#exist_client_type").val();
    var addfrom = $("#addfrom").val();
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'project/request_create_project',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if ((result.trim() != "-1") && result.trim() != "-2") {
                var result = result.trim();
                $('#projectModal').hide();
                swal({
                    title: "Success!",
                    text: "Project Successfully Added!",
                    type: "success"
                }, function () {
                    if (addfrom == 'client') {
                        goURL(base_url + 'project/goto_client_dashboard/' + client_id + '/' + client_type);
                    } else {
                        var category = '';
                        if (result == '1') {
                            category = "1-bookkeeping";
                        } else if (result == '2') {
                            category = '2-tax_returns';
                        } else if (result == '3') {
                            category = '3-sales_tax';
                        } else if (result == '4') {
                            category = '4-annual_report';
                        } 
//                        else if (result == '6') {
//                            category = '6-payroll';
//                        }
                        else{
                            category = '1-bookkeeping';
                        }
                        goURL(base_url + 'Project/index/' + category + '/' + result);
                    }
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Data", "error");
            } else if (result.trim() == "-2") {
                swal("ERROR!", "Project Already Exist.", "error");
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
function request_update_project(project_id) {
    if (!requiredValidation('form_save_project')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("form_save_project"));

    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'project/request_update_project/' + project_id,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({
                    title: "Success!",
                    text: "Project Updated Successfully!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'project');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Data", "error");
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
function update_task(task_id, template_id) {
    if (!requiredValidation('template-task-edit-modal')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("template-task-edit-modal"));
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'administration/template/update_project_template_task/' + task_id + '/' + template_id,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Template Task Successfully Updated!",
                    type: "success"
                }, function () {
                    $("#task_list").html(result);
                    $("#taskModal").modal('hide');
                }
                );
            } else {
                swal("ERROR!", "Unable To Add Template Task.", "error");
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
function request_edit_project_main() {
    if (!requiredValidation('update_project_main')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("update_project_main"));

    var pattern = $("#pattern option:selected").val();
    if ($("#occur_weekdays").prop("checked") == true) {
        var occur_weekdays = '1';
    } else {
        var occur_weekdays = '0';
    }
    if ($("#client_fiscal_year_end").prop("checked") == true) {
        var client_fiscal_year_end = '1';
        var client_fiscal_year_type = $('input[name="recurrence[due_fiscal]"]:checked').val();
        if (client_fiscal_year_type == 1) {
            var client_fiscal_year_day = $('input[name="recurrence[due_fiscal_day]"]').val();
            ;
            var client_fiscal_year_wday = '0';
            var client_fiscal_year_month = $('input[name="recurrence[due_fiscal_day]"] option:selected').val();
        } else {
            var client_fiscal_year_day = $('input[name="recurrence[due_fiscal_month]"] option:selected').val();
            var client_fiscal_year_wday = $('input[name="recurrence[due_fiscal_wday]"] option:selected').val();
            var client_fiscal_year_month = $('input[name="recurrence[due_fiscal_month]"] option:selected').val();
        }
    } else {
        var client_fiscal_year_end = '0';
        var client_fiscal_year_type = '0';
        var client_fiscal_year_day = '0';
        var client_fiscal_year_wday = '0';
        var client_fiscal_year_month = '0';
    }
    if (pattern == 'annually') {
        if (client_fiscal_year_end == 1) {
            var due_day = '0';
            var due_month = '0';
        } else {
            var due_day = $("#r_day").val();
            var due_month = $("#r_month option:selected").val();
        }
    } else if (pattern == 'none') {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month option:selected").val();
    } else if (pattern == 'weekly') {
        var due_day = $("#r_day").val();
        var due_month = $('input[name="recurrence[due_month]"]:checked').val();
    } else if (pattern == 'quarterly') {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month option:selected").val();
    } else if (pattern == 'periodic') {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month").val();
        var periodic_days = new Array();
        var periodic_months = new Array();
        $("input[name='due_days[]']").each(function () {
            periodic_days.push($(this).val());
        });
        var periodic_months = $('.periodic_mnth').map(function () {
            return this.value;
        }).get();
        var periodic_due_days = JSON.stringify(periodic_days);
        var periodic_due_months = JSON.stringify(periodic_months);
    } else {
        var due_day = $("#r_day").val();
        var due_month = $("#r_month").val();
    }

    var expiration_type = $('input[name="recurrence[expiration_type]"]:checked').val();
    var end_occurrence = $("#end_occurrence").val();
    var target_start_days = $("#t_start_day").val();
    var target_end_days = $("#t_end_day").val();
    var target_start_day = $('input[name="recurrence[target_start_day]"]:checked').val();
    var target_end_day = $('input[name="recurrence[target_end_day]"]:checked').val();
    var generation_type = $('input[name="recurrence[generation_type]"]:checked').val();
    var generation_day = $("#generation_day").val();
    var generation_month = $("#generation_month").val();

    form_data.append('recurrence[pattern]', pattern);
    form_data.append('recurrence[occur_weekdays]', occur_weekdays);
    form_data.append('recurrence[client_fiscal_year_end]', client_fiscal_year_end);
    form_data.append('recurrence[due_day]', due_day);
    form_data.append('recurrence[due_month]', due_month);
    form_data.append('recurrence[periodic_due_day]', periodic_due_days);
    form_data.append('recurrence[periodic_due_month]', periodic_due_months);
    form_data.append('recurrence[expiration_type]', expiration_type);
    form_data.append('recurrence[end_occurrence]', end_occurrence);
    form_data.append('recurrence[target_start_days]', target_start_days);
    form_data.append('recurrence[target_start_day]', target_start_day);
    form_data.append('recurrence[target_end_days]', target_end_days);
    form_data.append('recurrence[target_end_day]', target_end_day);
    form_data.append('recurrence[generation_type]', generation_type);
    form_data.append('recurrence[generation_day]', generation_day);
    form_data.append('recurrence[generation_month]', generation_month);
    form_data.append('recurrence[fye_type]', client_fiscal_year_type);
    form_data.append('recurrence[fye_day]', client_fiscal_year_day);
    form_data.append('recurrence[fye_is_weekday]', client_fiscal_year_wday);
    form_data.append('recurrence[fye_month]', client_fiscal_year_month);

    var edit_template = $("#edit_template").val();
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'project/request_update_project_main',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//            alert(result);
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Project info Successfully Updated!",
                    type: "success"
                }, function () {
                    $('#task_btn').val(result);
                    $('#task_btn').prop('disabled', false);
                    $("#nav-link-2").trigger("click");
                    //goURL(base_url + 'action/home');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Template", "error");
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
function project_task_edit_modal(task_id, project_id = '') {
//    alert(project_id);
    $.ajax({
        type: "POST",
        url: base_url + 'modal/edit_project_task_modal',
        dataType: "html",
        data: {task_id: task_id, project_id: project_id},
        success: function (result) {
//            alert(result);
            $('#taskModal').html(result);
            $('#taskModal').modal();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function update_project_task(task_id, template_id, project_id) {
//    alert(task_id);return false;
    if (!requiredValidation('project-task-edit-modal')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("project-task-edit-modal"));
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'project/update_project_task/' + task_id + '/' + template_id + '/' + project_id,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //alert(result);
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Project Task Successfully Updated!",
                    type: "success"
                }, function () {
                    $("#task_list").html(result);
                    $("#taskModal").modal('hide');
                }
                );
            } else {
                swal("ERROR!", "Unable To Update Project Task.", "error");
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
function get_project_task_modal(template_id, project_id) {
//    alert(project_id);return false;
    $.ajax({
        type: "POST",
        url: base_url + 'modal/get_project_task_modal',
        dataType: "html",
        data: {template_id: template_id, project_id: project_id},
        success: function (result) {
            $('#taskModal').modal();
            $('#taskModal').html(result);

        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });

}
function save_project_task() {
    if (!requiredValidation('project-task-modal')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("project-task-modal"));
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'project/add_project_task',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //alert(result);
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Project Task Successfully Added!",
                    type: "success"
                }, function () {
                    $("#task_list").html(result);
                    $("#taskModal").modal('hide');
                }
                );
            } else {
                swal("ERROR!", "Unable To Add Project Task.", "error");
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

function get_fiscal_year_options() {
    if ($("#client_fiscal_year_end").prop("checked") == true) {
        var fiscal_val = '1';
    } else {
        var fiscal_val = '0';
    }

    if (fiscal_val == 1) {
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_fiscal]" checked="" value="1"> Due on every</label>&nbsp;<select class="form-control" name="recurrence[due_fiscal_month]"><option value="1">First</option><option value="2">Second</option><option value="3">Third</option><option value="4">Fourth</option></select>&nbsp;<label class="control-label m-r-5">month after FYE on day</label>&nbsp;<input class="form-control m-r-5" value="1" type="number" name="recurrence[due_fiscal_day]" min="1" max="30" style="width: 100px">');
        //$(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_fiscal]" checked="" value="1"> Due on every</label>&nbsp;<select class="form-control" name="recurrence[due_fiscal_month]"><option value="1">First</option><option value="2">Second</option><option value="3">Third</option><option value="4">Fourth</option></select><label class="control-label m-r-5">month after FYE on day</label>&nbsp;<input class="form-control m-r-5" value="1" type="number" name="recurrence[due_fiscal_day]" min="1" max="30" style="width: 100px">&nbsp;<label class="control-label m-r-5"><input type="radio" name="recurrence[due_fiscal]" value="2"> Due on the</label>&nbsp;<select class="form-control" name="recurrence[due_fiscal_day]"><option value="1">First</option><option value="2">Last</option></select>&nbsp;<select class="form-control" name="recurrence[due_fiscal_wday]"><option value="1">Weekday</option><option value="2">Weekend</option></select><label class="control-label m-r-5">of</label>&nbsp;<select class="form-control" name="recurrence[due_fiscal_month]"><option value="1">First</option><option value="2">Second</option><option value="3">Third</option><option value="4">Fourth</option><option value="5">Fifth</option><option value="6">Sixth</option><option value="7">Seventh</option><option value="8">Eighth</option><option value="9">Ninth</option><option value="10">Tenth</option><option value="11">Eleventh</option><option value="12">Twelfth</option></select>&nbsp;month after FYE');
    } else {
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day" class="m-r-5"> Due on every</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" style="width: 100px" id="r_day">');
    }
}
//find project client depending on client type
function projectContainerAjax(client_type = '', client_id = '', project_id = '', office_id = '')
{
//    alert(client_type);
//    alert(project_id);return false;
    var url = '';
    if (project_id != '') {
        url = 'project/get_edit_project_container_ajax';
    } else {
//        alert("hi");return false;
        url = 'project/get_project_container_ajax';
    }
    $.ajax({
        type: 'POST',
        url: base_url + url,
        data: {
            project_id: project_id,
            client_type: client_type,
            client_id: client_id,
            office_id: office_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//            alert(result);
            if (result != '0') {
                $('#project_container').find('#individual_list_ddl').chosen('destroy');
                $('#project_container').html(result);
                $('#project_container').find('#individual_list_ddl').chosen();
            } else {
                go('project');
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
function refresh_existing_client_list_project(office_id = '', client_id = '', client_type = '') {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_id: client_id,
            client_type: client_type
        },
        url: base_url + 'project/get_completed_orders_officewise',
        dataType: "html",
        success: function (result) {
//            alert(result);
            $("#client_list").show();
            $("#client_list_ddl").chosen("destroy");
            $("#client_list_ddl").html(result);
            $("#client_list_ddl").chosen();

        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}


function sort_project_dashboard(sort_criteria = '', sort_type = '') {
    var form_data = new FormData(document.getElementById('filter-form'));
    if (sort_criteria == '') {
        var sc = $('.sort-valu').find('a').attr('id');
        var ex = sc.split('-');
        if (ex[0] == 'project_template') {
            var sort_criteria = ex[0];
        } else if (ex[0] == 'pattern') {
            var sort_criteria = 'prm.' + ex[0];
        } else if (ex[0] == 'responsible_name') {
            var sort_criteria = ex[0];
        } else if (ex[0] == 'all_project_staffs_assignto') {
            var sort_criteria = ex[0];
        } else if (ex[0] == 'status') {
            var sort_criteria = 'pm.' + ex[0];
        } else if (ex[0] == 'office') {
            var sort_criteria = ex[0];
        } else {
            var sort_criteria = 'pro.' + ex[0];
        }
    } else {
        var ex1 = sort_criteria.split('.');
        var sort_value = ex1[1];
        if (typeof sort_value == 'undefined') {
            var sort_value = sort_criteria;
        }
    }

    if (sort_type == '') {
        var sort_type = 'ASC';
        var sort_angle = ' fa fa-angle-left'

    } else {
        if (sort_type == 'ASC') {
            var sort_type = 'DESC';
            var sort_angle = ' fa fa-angle-right'
        } else {
            var sort_type = 'ASC';
            var sort_angle = ' fa fa-angle-left'
        }
    }
    $("." + sort_value).removeClass().addClass(sort_angle);
    if (sort_criteria.indexOf('.') > -1)
    {
        var sp = sort_criteria.split(".");
        var activehyperlink = sp[1] + '-val';
    } else {
        var activehyperlink = sort_criteria + '-val';
    }
    var button_id = sort_value + '-val';
    var button_color = 'btn btn-primary';
    $("#" + button_id).removeClass().addClass(button_color);
//    alert(sort_value);
    var template_cat_id = $('#sort_template_cat_id').val();
    var template_name = $("#template_name").val();
    var select_month = $("#select_month").val();
    var select_year = $("#select_year").val();
    form_data.append('sort_criteria', sort_criteria);
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_value);
    form_data.append('template_cat_id', template_cat_id);
    form_data.append('template_name', template_name);
    form_data.append('select_month', select_month);
    form_data.append('select_year', select_year);
    form_data.append('button_id', button_id);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'project/sort_project_dashboard',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (action_result) {
//                    alert(action_result);return false;
            var data = JSON.parse(action_result);
            $("#action_dashboard_div").html(data.result);
            $('#bookkeeping_btn_clear_filter').show();
//            $(".dropdown-menu li").removeClass('active');
//            $("#" + activehyperlink).parent('li').addClass('active');
//            if (sort_type == 'ASC') {
//                $(".sort_type_div #sort-desc").hide();
//                $(".sort_type_div #sort-asc").css({display: 'inline-block'});
//            } else {
//                $(".sort_type_div #sort-asc").hide();
//                $(".sort_type_div #sort-desc").css({display: 'inline-block'});
//            }
//            $(".sort_type_div").css({display: 'inline-block'});
//            var text = $('.dropdown-menu li.active').find('a').text();
////                   alert(text);return false;
//            var textval = 'Sort By : ' + text + ' <span class="caret"></span>';
//            $("#sort-by-dropdown").html(textval);
//            $("[data-toggle=popover]").popover();
            // $("#clear_filter").html('');
            // $("#clear_filter").hide();
            //$('#btn_clear_filter').hide();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function projectFilter(select_year = '', apply_filter = '', page_numbers = '') {
    var category = $('#cat').val();
    var statusArray = category.split('-');
    var form_data = new FormData(document.getElementById('filter-form'));
    // form_data = JSON.stringify(form_data);
    // console.log(form_data);return false;
    var template_cat_id = $('#sort_template_cat_id').val();
    var template_name = $("#category_id :selected").val();
    if (select_year == '') {
        select_year = $("#due_year").val();
    } else {
        select_year = '';
    }
    var month_year = $("#due_month").val();
    if (month_year != undefined && month_year != '') {
        month_year = month_year.split('-');
        var select_month = month_year[0];
        select_year = month_year[1];
    } else {
        select_month = '';
    }
    console.log(select_year);
    console.log(select_month);
    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }
    var status = $("#status").val();
    if (status == undefined) {
        status = '';
    }
    var dashboard_type = $("#filter_dashboar_type").val();
    if (dashboard_type == undefined) {
        dashboard_type = 'all';
    }
    var template_id = $("#template_id").val();
    if (template_id == undefined) {
        template_id = '';
    }
    var filter_data = $("#filter_data").val();
    if (filter_data == undefined) {
        filter_data = '';
    }
    var query = $("#query").val();
    if (query == undefined) {
        query = '';
    }
    form_data.append('template_cat_id', template_cat_id);
    form_data.append('template_name', template_name);
    form_data.append('select_month', select_month);
    form_data.append('select_year', select_year);
    form_data.append('page_number', page_number);
    form_data.append('status', status);
    form_data.append('dashboard_type', dashboard_type);
    form_data.append('template_id', template_id);
    form_data.append('filter_data', filter_data);
    form_data.append('query', query);
    form_data.append('apply_filter', apply_filter);
    // alert(form_data.criteria_dropdown.value);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'project/project_filter/' + category + '/' + statusArray[0] + '/' + select_year,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);
            $("#action_dashboard_div").html(result);
            $('#ProjectFilterModal').modal('hide');
            $("[data-toggle=popover]").popover();
            $('#bookkeeping_btn_clear_filter').show();
            $("#clear_cat_id").val(statusArray[0]);
            display_project_applied_filters();
            // loadProjectSummaryBox(category,template_cat_id,select_month,select_year,template_name,dashboard_type);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function display_project_applied_filters() {
    var dropdownArray = [];
    var removeAttArray = [];

    $('#filter-form input, #filter-form select, #filter-form a.remove-filter-button').each(function (index) {
        var input = $(this);
        var elementType = input.prop('nodeName');
        if (elementType == 'SELECT') {
//            var chosenVal = input.chosen().val()
            var value = '';

//            if (typeof chosenVal == 'object') {
//                $.each(input.context.selectedOptions, function (index, val) {
//                    if (index === 0) {
//                        value += val.text.replace(",", " -");
//                    } else {
//                        value += ', ' + val.text.replace(",", " -");
//                    }
//                });
//            } else {
            value = input.find(":selected").text();
//            }

            //console.log(value);
            dropdownArray.push(value);
        } else if (elementType == 'INPUT') {
            dropdownArray.push(input.val());
        } else if (elementType == 'A') {
            removeAttArray.push(input.attr('onclick'));
        }
    });

    //remove empty strings
    var archive = $("input[name='archived_project']:checked").val();
//    console.log(archive);
    dropdownArray = dropdownArray.filter(Boolean);
    if (archive != "all_projects") {
        dropdownArray.pop();
    }

    var newTr = "";
    for (var i = 0; i < dropdownArray.length; i++) {
        if (i % 3 == 0)
            newTr += (i > 0) ? "</div><div id='" + i + "' class='p-b-3'>&nbsp" : "<div class='p-b-3'>&nbsp";
        newTr += "<span class='label label-default'>" + dropdownArray[i] + "</span>&nbsp";
    }
    newTr += "</div>";

    $("#filted_data").html(newTr);

    $('#filted_data a.btn_remove_filter').each(function (index) {
        $(this).attr('data-random', removeAttArray[index].match(/\d+/)[0]);
    });
}
function loadProjectDashboard_old(status = '', request = '', templateID = '', officeID = '', departmentID = '', filter_assign = '', filter_data = '', sos_value = '', sort_criteria = '', sort_type = '', client_type = '', client_id = '', clients = '', pageNumber = 0, template_cat_id = '', template_name = '', month = '', year = '', project_id = '', dashboard_type = '', query = '', project_ids = '') {
    // console.log('loadProjectDashboard');
    // console.log('status:'+status);console.log('request:'+request);console.log('templateID:'+ templateID);console.log('officeID:'+ officeID);console.log('departmentID:'+departmentID);console.log('filter_assign:'+filter_assign);console.log('filter_data:'+filter_data);console.log('sos_value:'+sos_value);console.log('sort_criteria:'+sort_criteria);console.log('sort_type:'+sort_type);console.log('client_type:'+client_type);console.log('client_id:'+client_id);console.log('clients:'+clients);console.log('pageNumber:'+pageNumber);console.log('template_cat_id:'+template_cat_id);console.log('template_name:'+template_name);console.log('month:'+month);console.log('year:'+year);console.log('project_id:'+project_id);console.log('dashboard_type:'+dashboard_type);console.log('query:'+ query);console.log('project_ids:'+project_ids);
    $.ajax({
        type: "POST",
        data: {
            status: status,
            request: request,
            template_id: templateID,
            office_id: officeID,
            department_id: departmentID,
            filter_assign: filter_assign,
            filter_data: filter_data,
            sos_value: sos_value,
            sort_criteria: sort_criteria,
            sort_type: sort_type,
            client_type: client_type,
            client_id: client_id,
            page_number: pageNumber,
            template_cat_id: template_cat_id,
            month: month,
            year: year,
            template_name: template_name,
            project_id: project_id,
            dashboard_type: dashboard_type,
            query: query,
            project_ids: project_ids
        },
        url: base_url + 'project/dashboard_ajax',
        success: function (project_result) {
            // console.log(project_result); 
            // return false;      
            if (project_result.trim() != '') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $("#action_dashboard_div").html(project_result);
                    //$("a.filter-button span:contains('-')").html(0);

                } else {
//                    $(".ajaxdiv").append(project_result);
                    $("#action_dashboard_div").append(project_result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                $(".status-dropdown").val(status);
                $(".request-dropdown").val(request);
                $("[data-toggle=popover]").popover();
            }
            if (status != '' || status == '0') {
//                $("#clear_filter").html(filter_data + ' &nbsp; ');
//                $("#clear_filter").show();
                $("#project_apply_filter").show();
                $('#bookkeeping_btn_clear_filter').show();
                $("#project_hide_filter").show();
//                $("#project_add_filter").hide();
            } else {
                if (template_name != '') {
                    $('#bookkeeping_btn_clear_filter').show();
                } else {
//                $("#clear_filter").html('');
//                $("#clear_filter").hide();
                    $('#bookkeeping_btn_clear_filter').hide();
                    $('#tax_btn_clear_filter').hide();
                    $('#sales_btn_clear_filter').hide();
                    $('#annual_btn_clear_filter').hide();
                    $("#project_apply_filter").hide();
                    $("#project_hide_filter").hide();
//                $("#project_add_filter").show();
                }
            }
            if (query != '') {
                $('#bookkeeping_btn_clear_filter').show();
            }
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
            jumpDiv();
            if (clients == 'clients') {
                $("#action_dashboard_div").find(".clearfix").remove();
            }
        }
    });
}
/*function add_project_sos() {
 if (!requiredValidation('projects_sos')) {
 return false;
 }
 
 var projectid = $("#projects_sos #project_id").val();
 var taskid = $("#projects_sos #serviceid").val();
 
 var formData = new FormData(document.getElementById('projects_sos'));
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
 $.ajax({
 type: 'POST',
 url: base_url + 'Project/get_project_sos_unread_count',
 data: {
 task_id: taskid,
 project_id: projectid
 },
 success: function (result) {
 $.ajax({
 type: 'POST',
 url: base_url + 'Project/get_total_project_sos_unread_count',
 data: {
 project_id: projectid
 },
 success: function (res) {
 if (res > 0) {
 $.ajax({
 type: 'POST',
 url: base_url + 'Project/update_project_status_on_sos',
 data: {
 project_id: projectid,
 sos_count: res
 },
 success: function (project_status) {
 
 $.ajax({
 type: 'POST',
 url: base_url + 'Project/project_sos_number_count',
 data: {
 projectid: projectid,
 reference:'projects',
 status:'unread'
 },
 success: function (unread_count_res) {
 
 $.ajax({
 type: 'POST',
 url: base_url + 'Project/project_sos_number_count',
 data: {
 projectid: projectid,
 reference:'projects',
 status:'read'
 },
 success: function (read_count_res) {
 document.getElementById("unread_sos_count_id_"+projectid).innerHTML = unread_count_res;
 document.getElementById("read_sos_count_id_"+projectid).innerHTML = read_count_res;
 var prevsoscount = $("#projectsoscount-" + projectid + '-' + taskid).text();
 var soscount = parseInt(prevsoscount) + parseInt(1);
 $("#projectsoscount-" + projectid + '-' + taskid).text(soscount);
 $("#projectsoscount-" + projectid + '-' + taskid).removeClass('label label-primary').addClass('label label-danger');
 $("#projectsoscount-" + projectid + '-' + taskid).html('<i class="fa fa-bell"></i>');
 }
 }); 
 }    
 });
 
 $.ajax({
 type: 'POST',
 url: base_url + 'Project/project_task_sos_number_count',
 data: {
 projectid: projectid,
 reference:'projects',
 status:'unread',
 taskid:taskid
 },
 success: function (unread_count_res) {
 
 $.ajax({
 type: 'POST',
 url: base_url + 'Project/project_task_sos_number_count',
 data: {
 projectid: projectid,
 reference:'projects',
 status:'read',
 taskid:taskid
 },
 success: function (read_count_res) {
 document.getElementById("unread_sos_count_id_"+projectid+"_"+taskid).innerHTML = unread_count_res;
 document.getElementById("read_sos_count_id_"+projectid+"_"+taskid).innerHTML = read_count_res;
 }
 }); 
 }    
 });
 
 if (project_status == 1) {
 var tracking_main = 'Started';
 var trk_class_main = 'label label-yellow';
 } else if (project_status == 5) {
 var tracking_main = 'Clarification';
 var trk_class_main = 'label label-info';
 }
 $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
 $("#trackouter-" + projectid).html(tracking_main);
 }
 });
 //  $("#unread_sos_count-" + projectid).removeClass('label label-secondary').addClass('label label-danger');
 }
 //$("#unread_sos_count-" + projectid).html(res);
 }
 });
 swal({title: "Success!", text: "Successfully Added!", type: "success"}, function () {
 // var prevsoscount = $("#projectsoscount-" + projectid + '-' + taskid).text();
 //var soscount = parseInt(prevsoscount) + parseInt(1);
 // $("#projectsoscount-" + projectid + '-' + taskid).text(soscount);
 // $("#projectsoscount-" + projectid + '-' + taskid).removeClass('label label-primary').addClass('label label-danger');
 // $("#projectsoscount-" + projectid + '-' + taskid).html('<i class="fa fa-bell"></i>');
 document.getElementById("projects_sos").reset();
 var prevbymecount = $("#sos-byme").html();
 if (result == 0) {
 var newbymecount = parseInt(prevbymecount) + 1;
 $("#sos-byme").html(newbymecount);
 }
 $('#showSos').modal('hide');
 });
 }
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
 }*/
function add_project_sos() {
    //alert(21);
    if (!requiredValidation('projects_sos')) {
        return false;
    }

    var projectid = $("#projects_sos #project_id").val();
    var taskid = $("#projects_sos #serviceid").val();

    var formData = new FormData(document.getElementById('projects_sos'));
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
            $.ajax({
                type: 'POST',
                url: base_url + 'Project/get_project_sos_unread_count',
                data: {
                    task_id: taskid,
                    project_id: projectid
                },
                success: function (result) {
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'Project/get_total_project_sos_unread_count',
                        data: {
                            project_id: projectid
                        },
                        success: function (res) {
                            if (res > 0) {
                                $.ajax({
                                    type: 'POST',
                                    url: base_url + 'Project/update_project_status_on_sos',
                                    data: {
                                        project_id: projectid,
                                        sos_count: res
                                    },
                                    success: function (project_status) {
                                        $.ajax({
                                            type: 'POST',
                                            url: base_url + 'Project/project_sos_number_count',
                                            data: {
                                                reference: 'projects',
                                                projectid: projectid,
                                                status: 'unread'
                                            },
                                            success: function (project_sos_unread_count) {
                                                $.ajax({
                                                    type: 'POST',
                                                    url: base_url + 'Project/project_sos_number_count',
                                                    data: {
                                                        reference: 'projects',
                                                        projectid: projectid,
                                                        status: ''
                                                    },
                                                    success: function (project_sos_total_count) {
                                                        if (project_sos_unread_count.trim() != 0) {
                                                            $("#total_sos_count_id_" + projectid).removeClass('label label-secondary').addClass('label label-danger');
                                                            document.getElementById("total_sos_count_id_" + projectid).innerHTML = project_sos_unread_count;
                                                        } else {
                                                            $("#total_sos_count_id_" + projectid).removeClass('label label-danger').addClass('label label-secondary');
                                                            document.getElementById("total_sos_count_id_" + projectid).innerHTML = project_sos_total_count;
                                                        }

                                                    }
                                                });

                                            }
                                        });
                                        $.ajax({
                                            type: 'POST',
                                            url: base_url + 'Project/project_sos_number_count',
                                            data: {
                                                reference: 'projects',
                                                projectid: projectid,
                                                task_id: taskid,
                                                status: ''
                                            },
                                            success: function (project_task_sos_total_count) {
                                                $.ajax({
                                                    type: 'POST',
                                                    url: base_url + 'Project/project_sos_number_count',
                                                    data: {
                                                        reference: 'projects',
                                                        projectid: projectid,
                                                        task_id: taskid,
                                                        status: 'unread'
                                                    },
                                                    success: function (project_task_sos_unread_count) {
                                                        $("#total_sos_count_id_" + projectid + "_" + taskid).removeClass('label label-secondary').addClass('label label-danger');
                                                        document.getElementById("total_sos_count_id_" + projectid + "_" + taskid).innerHTML = project_task_sos_unread_count;
                                                    }
                                                });
                                            }
                                        });

                                        if (project_status == 1) {
                                            var tracking_main = 'Started';
                                            var trk_class_main = 'label label-yellow';
                                        } else if (project_status == 5) {
                                            var tracking_main = 'Clarification';
                                            var trk_class_main = 'label label-info';
                                        }
                                        $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
                                        $("#trackouter-" + projectid).html(tracking_main);
                                    }
                                });

                            }

                        }
                    });
                    swal({title: "Success!", text: "Successfully Added!", type: "success"}, function () {
                        var prevsoscount = $("#projectsoscount-" + projectid + '-' + taskid).text();
                        var soscount = parseInt(prevsoscount) + parseInt(1);
                        $("#projectsoscount-" + projectid + '-' + taskid).text(soscount);
                        $("#projectsoscount-" + projectid + '-' + taskid).removeClass('label label-primary').addClass('label label-danger');
                        $("#projectsoscount-" + projectid + '-' + taskid).html('<i class="fa fa-bell"></i><span>' + ' ' + result + '</span>');
                        document.getElementById("projects_sos").reset();
                        var prevbymecount = $("#sos-byme").html();
                        if (result == 0) {
                            var newbymecount = parseInt(prevbymecount) + 1;
                            $("#sos-byme").html(newbymecount);
                        }
                        $('#showSos').modal('hide');
                    });
                }
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
function tetmplate_task_delete_modal(task_id, template_id) {
    $.ajax({
        type: "POST",
        url: base_url + 'administration/template/delete_template_task_modal',
        dataType: "html",
        data: {task_id: task_id, template_id: template_id},
        success: function (result) {
//            alert(result);
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Project Task Successfully Deleted!",
                    type: "success"
                }, function () {
                    $("#task_list").html(result);
                    $("#taskModal").modal('hide');
                }
                );
            } else {
                swal("ERROR!", "Unable To Delete Project Task.", "error");
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
function delete_project(project_id, project_template_id) {
    $.ajax({
        type: "POST",
        url: base_url + 'project/delete_project/',
        dataType: "html",
        data: {project_id: project_id, project_template_id: project_template_id},
        success: function (result) {
//            alert(result);return false;
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Project Successfully Deleted!",
                    type: "success"
                }, function () {
                    loadProjectDashboard();
                }
                );
            } else {
                swal("ERROR!", "Unable To Delete Project.", "error");
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
function taskDashboard() {
    goURL(base_url + 'task');
}

function load_project_tasks(id, created_at, dueDate, resp_staff_id = '', resp_office = '', client_id = '', client_type = '') {
    var timer_count = 0;
    $.ajax({
        type: "POST",
        url: base_url + 'project/get_project_task_list',
        dataType: "html",
        data: {project_id: id
        },
        success: function (result) {
            if (result.trim() != '') {
                var task_ids = JSON.parse(result);
                for (let i = 0; i < task_ids.length; i++) {
                    var task_id = task_ids[i];
//                        $('#collapse' + id).addClass('in');
//                        $('#collapse' + id).attr('aria-expanded',true);
                    var timer_id = 'stopwatch_' + id + '_' + task_id;
                    console.log(timer_id);
                    timer_val = $('#stopwatch_' + id + '_' + task_id).text();
                    if (timer_val != '00:00:00' && timer_val != '') {
                        timer_count = timer_val;
                        console.log('ARP: ' + timer_count);
                    }
                }
                console.log('CHCK: ' + timer_count);
                if (timer_count != 0) {
                    console.log('Time: ' + timer_count);
                    return false;
                } else {
                    console.log('Arpita');
//                        if (!$('#collapse' + id).hasClass('in')) {
                    console.log('Uttam');
                    $('#collapse' + id).html('<div class="text-center"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
                    $.ajax({
                        type: "POST",
                        url: base_url + 'project/load_project_tasks',
                        dataType: "html",
                        data: {id: id,
                            created_at: created_at,
                            dueDate: dueDate,
                            resp_staff_id: resp_staff_id,
                            resp_office: resp_office,
                            client_id: client_id,
                            client_type: client_type
                        },
                        success: function (result) {
                            if (result.trim() != '') {
                                $("#collapse" + id).html(result.trim());
                            }
                        }
                    });
//                        }
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
var saveInputForms = function () {
    if (!requiredValidation('project_input_form')) {
        return false;
    }
    $("#gross_sales").attr('disabled', false);
    $("#sales_tax_collect").attr('disabled', false);
    $("#collection_allowance").attr('disabled', false);
    $("#total_due").attr('disabled', false);
    var userid = $("#user_id").val();
    var user_type = $("#user_type").val();
    var total_time = $("#total_time").text();
    var task_id = $("#editval").val();
    var input_form_id = $("#task_key").val();
    var sos_data = $("#sos_data").val();
//    var input_form_type=$("#input_form_type").val();
    var form_data = new FormData(document.getElementById('project_input_form'));
    form_data.append('total_time', total_time);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'task/save_project_input_form',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
//                goURL(base_url + 'project');
                goURL(base_url + 'task/task_input_form/' + sos_data + '/' + task_id + '/' + input_form_id);
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
function deleteTaskNote(divID, noteID, relatedTableID) {
    $.ajax({
        type: 'POST',
        url: base_url + 'home/delete_note',
        data: {
            note_id: noteID,
            related_table_id: relatedTableID
        }
    });
    $("#" + divID).remove();
}
function save_task_account(section = '') {

//update_financial_account_by_date
    if (!requiredValidation('form_accounts')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_accounts'));
    var company_id = $("#company_id").val();
    var order_id = $("#editval").val();
    var client_id = $("#client_id").val();
    var is_client = $("#section").val();

    var bookkeeping_input_type = $("#bookkeeping_input_type").val();
    var sos_data_1 = $("#sos_data_1").val();
    var task_id_1 = $("#task_id_1").val();

    form_data.append('section', section);
    form_data.append('client_type', is_client);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/save_account',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    if (is_client == 'client') {
                        goURL(base_url + 'action/home/view_business/' + client_id + '/' + company_id);
                    } else if (is_client == 'bookkeeping') {
                        goURL(base_url + 'task/task_input_form/' + sos_data_1 + '/' + task_id_1 + '/' + bookkeeping_input_type);
                    } else if (is_client == 'individual') {
                        goURL(base_url + 'action/home/view_individual/' + client_id);
                    } else {
                        get_financial_account_list(company_id, section, order_id);
                    }
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable to save financial account", "error");
                // swal({title: "ERROR!", text: "Can't Save, This Account Already Exists", type: "error"}, function () {
                //     $('#accounts-form').modal('hide');
                // });
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


function inactive_project_template(project_id) {
    $.ajax({
        type: "POST",
        data: {id: project_id},
        url: base_url + 'administration/template/inactive_project_template',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                swal({
                    title: "Success!",
                    text: "Successfully Inactivated!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'projects/template');
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
function delete_project_template(project_id) {
    $.ajax({
        type: "POST",
        data: {id: project_id},
        url: base_url + 'administration/template/delete_project_template',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                swal({
                    title: "Success!",
                    text: "Template deleted successfully!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'projects/template');
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
function get_pattern_detais(template_id, project_id = '', section = '') {
    $.ajax({
        type: "POST",
        data: {id: template_id, project_id: project_id, section: section},
        url: base_url + 'project/get_template_pattern_details',
        cache: false,
        success: function (result) {
//            alert(result);return false;
            if (result != '0') {
                $("#template_recurrence").html(result);
                $("#template_recurrence").show();
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
function delete_recoded_time(record_id, bank_id) {
//    alert(record_id);
    $.ajax({
        type: "POST",
        data: {record_id: record_id, bank_id: bank_id},
        url: base_url + 'task/delete_bookkeeping_timer_record',
        cache: false,
        success: function (result) {
//            alert(result);return false;
            if (result) {
                $('#recordModal').modal();
                $('#recordModal').html(result);
//                $("#load_record_time-" + bank_id).show();
//                $("#timer_result-" + bank_id).html(result);
            }
        },
    });
}
function change_bookkeeping_finance_input_status(id = '', status = '', new_task_id = '') {
    var task_id = $("#editval").val();
    openModal('changetrackinginner-' + task_id);
    var txt = 'Task Id - #' + new_task_id;
    $("#changetrackinginner-" + task_id + " .modal-title").html(txt);
    if (status == 0) {
        $("#changetrackinginner-" + task_id + " #rad0").prop('checked', true);
        $("#changetrackinginner-" + task_id + " #rad1").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad2").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad3").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad4").prop('checked', false);
    } else if (status == 1) {
        $("#changetrackinginner-" + task_id + " #rad1").prop('checked', true);
        $("#changetrackinginner-" + task_id + " #rad0").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad2").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad3").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad4").prop('checked', false);
    } else if (status == 2) {
        $("#changetrackinginner-" + task_id + " #rad2").prop('checked', true);
        $("#changetrackinginner-" + task_id + " #rad1").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad0").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad3").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad4").prop('checked', false);
    } else if (status == 4) {
        $("#changetrackinginner-" + task_id + " #rad4").prop('checked', true);
        $("#changetrackinginner-" + task_id + " #rad1").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad0").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad3").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad2").prop('checked', false);
    } else {
        $("#changetrackinginner-" + task_id + " #rad3").prop('checked', true);
        $("#changetrackinginner-" + task_id + " #rad2").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad1").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad0").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad4").prop('checked', false);
    }
    $.get($('#baseurl').val() + "task/get_bookkeeping_input_form_tracking_log/" + id + "/project_task_bookkeeping_finance_account_report", function (data) {
        $("#status_log > tbody > tr").remove();
        var returnedData = JSON.parse(data);
        for (var i = 0, l = returnedData.length; i < l; i++) {
            $('#status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["stuff_id"] + "</td>" + "<td>" + returnedData[i]["department"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>" + "<td>" + returnedData[i]["created_time"] + "</td></tr>");
        }
        if (returnedData.length >= 1)
            $("#log_modal").show();
        else
            $("#log_modal").hide();
    });
    $("#changetrackinginner-" + task_id + " #input_id").val(id);
    $("#new_task_id").val(new_task_id);
    $('#bank_id').val(id);
}
function updateBookkeeping_inputStatusinner(task_id) {
//        alert($('#changetrackinginner-'+task_id+ 'input:radio[name=radio'+task_id+']:checked'));return false;
    var statusval = $('input:radio[name=status]:checked').val();
    var id = $("#input_id").val();
    var base_url = $('#baseurl').val();
    var bookkeeping_input_form_type = $('#bookkeeping_input_form_type').val();
    var total_transaction = $("#total_transaction-" + id).val();
    var uncategorized_item = $("#uncategorized_item-" + id).val();
    var new_task_id = $("#new_task_id").val();
    var previous_task_id_status = $("#previous_task_id_status").val();
//    if (statusval == 2 && previous_task_id_status != 2 && bookkeeping_input_form_type == 2) {
//        swal("Can't change tracking", "Please complete Task1.", "warning");
//        return false;
//    }
    if (statusval == 2 && (uncategorized_item == '' || total_transaction == '')) {
        swal("Can't change tracking", "Please declare Total Transaction and Uncategorized Item.", "warning");
        return false;
    }
    $.ajax({
        type: "POST",
        data: {statusval: statusval, id: id, bookkeeping_input_form_type: bookkeeping_input_form_type, task_id: task_id},
        url: base_url + 'task/update_project_bookkeeping_input_form_status',
        dataType: "html",
        success: function (result) {
//                alert(result);return false;
            var res = JSON.parse(result.trim());
            if (res.banks == '0') {
                var tracking = 'Not Started';
                var trk_class = 'label label-secondary';
            } else if (res.banks == 1) {
                var tracking = 'Started';
                var trk_class = 'label label-yellow';
            } else if (res.banks == 2) {
                var tracking = 'Completed';
                var trk_class = 'label label-primary';
            } else if (res.banks == 4) {
                var tracking = 'Not Applicable';
                var trk_class = 'label label-success';
            } else {
                var tracking = 'Canceled';
                var trk_class = 'label label-danger';
            }
//                for task
            if (res.task == '0') {
                var tracking1 = 'Not Started';
                var trk_class1 = 'label label-secondary';
            } else if (res.task == 1) {
                var tracking1 = 'Started';
                var trk_class1 = 'label label-yellow';
            } else if (res.task == 2) {
                var tracking1 = 'Completed';
                var trk_class1 = 'label label-primary';
            } else if (res.task == 3) {
                var tracking1 = 'Ready';
                var trk_class1 = 'label label-success';
            } else if (res.task == 4) {
                var tracking1 = 'Canceled';
                var trk_class1 = 'label label-danger';
            }

            $("#trackinner-" + id).removeClass().addClass(trk_class);
            $("#trackinner-" + id).parent('a').removeAttr('onclick');
            if (bookkeeping_input_form_type == 1) {
                $("#trackinner-" + id).parent('a').attr('onclick', "change_bookkeeping_finance_input_status(" + id + "," + statusval + ",\"" + new_task_id + "\")");
            } else {
                $("#trackinner-" + id).parent('a').attr('onclick', "change_bookkeeping_input_form2_status(" + id + "," + statusval + ",\"" + new_task_id + "\")");
            }
            $("#trackinner-" + id).html(tracking);
//                for task
            $("#trackinner-" + task_id).removeClass().addClass(trk_class1);
            $("#trackinner-" + task_id).parent('a').removeAttr('onclick');
            var break_task_id = new_task_id.split('-');
            $("#trackinner-" + task_id).parent('a').attr('onclick', "change_project_status_inner_input(" + task_id + "," + res.task + "," + task_id + "," + break_task_id[0] + "," + break_task_id[1] + ")");
            $("#trackinner-" + task_id).html(tracking1);
            $("#changetrackinginner-" + task_id).modal('hide');
        }
    });
}
function save_transaction(id, transaction_val) {
    $.ajax({
        type: "POST",
        data: {transaction_val: transaction_val, id: id},
        url: base_url + 'task/update_project_bookkeeping_transaction_val',
        dataType: "html",
        success: function (result) {
//                
        }
    });
}
function save_uncategorized_item(id, uncategorized_item) {
    $.ajax({
        type: "POST",
        data: {uncategorized_item: uncategorized_item, id: id},
        url: base_url + 'task/update_project_bookkeeping_uncategorized_item',
        dataType: "html",
        success: function (result) {

        }
    });
}
function need_clarification(task_id, client_type, client_id, project_id, office_id) {
    swal({title: "Need Clarification?",
//            text: "Enter your clarification:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Enter your clarification message"
    },
            function (inputValue) {
                if (!inputValue) {
                    swal("Need Message to Complete Clarification.");
                } else {
                    var action_message = inputValue;
                    $.ajax({
                        type: "POST",
                        data: {task_id: task_id, client_type: client_type, client_id: client_id, project_id: project_id, action_message: action_message, office_id: office_id},
                        url: base_url + 'task/add_action_for_bookkeeping_need_clarification',
                        dataType: "html",
                        success: function (result) {
                            swal("Query submited successfully!");
                            $("#clarification_msg").html("<div class='alert alert-info text-center' id='clarification_msg'>Clarification has been submitted successfully</div>")
                        }
                    });
                }
            }
    );
}
function show_record_modal(account_id, section = '') {
    $.ajax({
        type: "POST",
        data: {account_id: account_id, section: section},
        url: base_url + 'task/show_recoded_time_details',
        dataType: "html",
        success: function (result) {
            $('#recordModal').modal();
            $('#recordModal').html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function close_recoded_modal(bank_id, section = '') {
    if (section != '') {
        $("#load_record_time-" + bank_id).show();
    } else {
        var record_id = '';
        $.ajax({
            type: "POST",
            data: {bank_id: bank_id, record_id: record_id},
            url: base_url + 'task/delete_bookkeeping_timer_record',
            dataType: "html",
            success: function (result) {
                $("#load_record_time-" + bank_id).hide();
                $('#recordModal').hide();
                $("#timer_result-" + bank_id).html(result);
            },
        });
}
}
function change_bookkeeping_input_form2_status(id = '', status = '', new_task_id = '') {
    var task_id = $("#editval").val();
    openModal('changetrackinginner-' + task_id);
    var txt = 'Task Id - #' + new_task_id;
    $("#changetrackinginner-" + task_id + " .modal-title").html(txt);
    if (status == 0) {
        $("#changetrackinginner-" + task_id + " #rad0").prop('checked', true);
        $("#changetrackinginner-" + task_id + " #rad1").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad2").prop('checked', false);
    } else if (status == 1) {
        $("#changetrackinginner-" + task_id + " #rad1").prop('checked', true);
        $("#changetrackinginner-" + task_id + " #rad0").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad2").prop('checked', false);
    } else {
        $("#changetrackinginner-" + task_id + " #rad2").prop('checked', true);
        $("#changetrackinginner-" + task_id + " #rad1").prop('checked', false);
        $("#changetrackinginner-" + task_id + " #rad0").prop('checked', false);
    }
    $.get($('#baseurl').val() + "task/get_bookkeeping_input_form_tracking_log/" + id + "/project_task_bookkeeping_input_form2", function (data) {
        $("#status_log > tbody > tr").remove();
        var returnedData = JSON.parse(data);
        for (var i = 0, l = returnedData.length; i < l; i++) {
            $('#status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["stuff_id"] + "</td>" + "<td>" + returnedData[i]["department"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>" + "<td>" + returnedData[i]["created_time"] + "</td></tr>");
        }
        if (returnedData.length >= 1)
            $("#log_modal").show();
        else
            $("#log_modal").hide();
    });
    $("#changetrackinginner-" + task_id + " #input_id").val(id);
    $("#new_task_id").val(new_task_id);
    $('#bank_id').val(id);
}
//    function change_project_status_inner(id, status, section_id,project_id='',task_order='') {
//        openModal('changeStatusinner');
//        var txt = 'Tracking Task #' + project_id+'-'+task_order;
//        $("#changeStatusinner .modal-title").html(txt);
//        if (status == 0) {
//            $("#changeStatusinner #rad0").prop('checked', true);
//            $("#changeStatusinner #rad1").prop('checked', false);
//            $("#changeStatusinner #rad2").prop('checked', false);
//            $("#changeStatusinner #rad3").prop('checked', false);
//            $("#changeStatusinner #rad4").prop('checked', false);
//            $("#changeStatusinner #rad5").prop('checked', false);
//        } else if (status == 1) {
//            $("#changeStatusinner #rad1").prop('checked', true);
//            $("#changeStatusinner #rad0").prop('checked', false);
//            $("#changeStatusinner #rad2").prop('checked', false);
//            $("#changeStatusinner #rad3").prop('checked', false);
//            $("#changeStatusinner #rad4").prop('checked', false);
//            $("#changeStatusinner #rad5").prop('checked', false);
//        } else if (status == 2) {
//            $("#changeStatusinner #rad2").prop('checked', true);
//            $("#changeStatusinner #rad1").prop('checked', false);
//            $("#changeStatusinner #rad0").prop('checked', false);
//            $("#changeStatusinner #rad3").prop('checked', false);
//            $("#changeStatusinner #rad4").prop('checked', false);
//            $("#changeStatusinner #rad5").prop('checked', false);
//        }
//        else if (status == 3) {
//            $("#changeStatusinner #rad3").prop('checked', true);
//            $("#changeStatusinner #rad5").prop('checked', false);
//            $("#changeStatusinner #rad4").prop('checked', false);
//            $("#changeStatusinner #rad2").prop('checked', false);
//            $("#changeStatusinner #rad1").prop('checked', false);
//            $("#changeStatusinner #rad0").prop('checked', false);
//        }
//        else if (status == 4) {
//            $("#changeStatusinner #rad4").prop('checked', true);
//            $("#changeStatusinner #rad5").prop('checked', false);
//            $("#changeStatusinner #rad3").prop('checked', false);
//            $("#changeStatusinner #rad2").prop('checked', false);
//            $("#changeStatusinner #rad1").prop('checked', false);
//            $("#changeStatusinner #rad0").prop('checked', false);
//        }
//        else if (status == 5) {
//            $("#changeStatusinner #rad5").prop('checked', true);
//            $("#changeStatusinner #rad4").prop('checked', false);
//            $("#changeStatusinner #rad3").prop('checked', false);
//            $("#changeStatusinner #rad2").prop('checked', false);
//            $("#changeStatusinner #rad1").prop('checked', false);
//            $("#changeStatusinner #rad0").prop('checked', false);
//        }
//        $.get($('#baseurl').val() + "project/get_project_tracking_log/" + section_id + "/project_task", function (data) {
//            $("#status_log > tbody > tr").remove();
//            var returnedData = JSON.parse(data);
//            for (var i = 0, l = returnedData.length; i < l; i++) {
//                $('#status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["stuff_id"] + "</td>" + "<td>" + returnedData[i]["department"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>" + "<td>" + returnedData[i]["created_time"] + "</td></tr>");
//            }
//            if (returnedData.length >= 1)
//                $("#log_modal").show();
//            else
//                $("#log_modal").hide();
//        });
//        $("#changeStatusinner #prosubid").val(id);
//    }
function updateProjectStatusinner_input(type = '') {
    var statusval = $('#changeStatusinner input:radio[name=radio]:checked').val();
    var prosubid = $('#changeStatusinner #prosubid').val();
    var user_type = $("#user_staff_type").val();
    if (user_type != 1 && statusval == 3) {
        swal("Can't Change Tracking", "You are unable to change tracking.", "error");
        return false;
    }
    if (type == '' && statusval == 2) {
        var input_form_type = $("#input_form_type").val();
        var tax_input_type = $("#tax_input_type").val();
        if (input_form_type == 1) {
            var bookkeeping_input_form_type = $("#bookkeeping_input_form_type").val();
        } else if (input_form_type == 3) {
            updateProjectStatusinner1(type);
        } else {
            bookkeeping_input_form_type = 0;
        }
        $.ajax({
            type: "POST",
            data: {task_id: prosubid, bookkeeping_input_form_type: bookkeeping_input_form_type},
            url: base_url + 'task/get_task_bank_tracking_status',
            dataType: "html",
            success: function (result) {
                if (result == 0 && tax_input_type == 0) {
//                    swal("Can't Change Tracking", "Please Complete Input Form.", "error");
                    swal({
                        title: "Are you sure?",
                        text: "You want to proceed without complete input form!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Yes, proceed it!",
                        cancelButtonText: "No, cancel please!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                            function (isConfirm) {
                                if (isConfirm) {
                                    updateProjectStatusinner1(type);
                                } else {
                                    swal("Cancelled", " Task Tracking Changed are Cancelled:)", "success");
                                }
                            });

                } else if (result == 0 && tax_input_type == 3) {
                    updateProjectStatusinner1(type);
                } else {
                    updateProjectStatusinner1(type);
                }
            }
        });
    } else {
        updateProjectStatusinner1(type);
}
}
function updateProjectStatusinner1(type = '') {
    var statusval = $('#changeStatusinner input:radio[name=radio]:checked').val();
    var prosubid = $('#changeStatusinner #prosubid').val();
    var task_id = $("#editval").val();
    var input_form_id = $("#task_key").val();
//        alert(prosubid);
    var base_url = $('#baseurl').val();
    var input_form_status = $('#input_form_status').val();
    var is_input_form = $("#is_input_form").val();
    var sos_data = $("#sos_data").val();
    var task_order = $("#task_order").val();
//    if (input_form_status == 'n' && statusval == 2 && is_input_form == 'y') {
//        swal("Can't change tracking", "Please Complete Input Form.", "warning");
//        return false;
//    }

//        var tracking_status=$("#tracking_status").val();
//            alert('jdkfjl'+tracking_status);
//            if(tracking_status==0){
//                swal("Cannot change tracking", "Complete the banking process to change tracking.", "warning");
//                return false;
//            }
    $.ajax({
        type: "POST",
        data: {statusval: statusval, prosubid: prosubid, task_order: task_order},
        url: base_url + 'project/update_project_task_status',
        dataType: "html",
        success: function (result) {
//                alert(result);return false;
            if (result.trim() != 0) {
                $("#changeStatusinner").modal('hide');
//                    return false;
                //swal("Success!", "Successfully updated!", "success");
                if (type == 'task') {
                    goURL(base_url + 'task');
                } else if (type == 'view') {
                    if (statusval == '0') {
                        var tracking = 'Not Started';
                        var trk_class = 'label label-secondary';
                    } else if (statusval == 1) {
                        var tracking = 'Started';
                        var trk_class = 'label label-yellow';
                    } else if (statusval == 2) {
                        var tracking = 'Completed';
                        var trk_class = 'label label-primary';
                    } else if (statusval == 3) {
                        var tracking = 'Ready';
                        var trk_class = 'label label-success';
                    } else if (statusval == 4) {
                        var tracking = 'Canceled';
                        var trk_class = 'label label-danger';
                    } else if (statusval == 5) {
                        var tracking = 'Clarification';
                        var trk_class = 'label label-info';
                    }
                    $("#trackinner-" + prosubid).removeClass().addClass(trk_class);
                    $("#trackinner-" + prosubid).parent('a').removeAttr('onclick');
                    $("#trackinner-" + prosubid).parent('a').attr('onclick', 'change_project_status_inner(' + prosubid + ',' + statusval + ', ' + prosubid + ');');
                    $("#trackinner-" + prosubid).html(tracking);
                } else {
                    goURL(base_url + 'task/task_input_form/' + sos_data + '/' + task_id + '/' + input_form_id);
                }
            }
        }
    });
}
function show_project_on_client_view_page(client_id, client_type) {
    if (!e)
        var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation)
        e.stopPropagation();
    $.ajax({
        type: 'POST',
        url: base_url + 'project/get_project_client_company_id/' + client_id + '/' + client_type,
        data: {
            // client_type: client_type,
            //client_id: client_id
        },
        success: function (result) {
            // alert(result);return false;
//            var obj = JSON.parse(result);
//            var company_id = obj.company_id;
//            var reference_id = obj.individual_id;
//            if (client_type == 1) {
//                window.open(base_url + 'action/home/view_business/' + client_id + '/' + company_id);
//            } else if (client_type == 2) {
//                window.open(base_url + 'action/home/view_individual/' + reference_id);
//            }
        }
    });
}
function assign_project_task(task_id, staff_id = '', department = '') {
    if (!requiredValidation('task_assign_department_modal')) {
        return false;

    }
    var office_id = $("#office_id_select").val();
//    console.log(office_id);
    swal({
        title: 'Are you sure?',
        text: "You want to " + (staff_id == 0 ? 'un' : '') + "assign the Task!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ' + (staff_id == 0 ? 'un' : '') + 'assign!'
    }, function (isConfirm) {
        if (isConfirm) {
//            if (!requiredValidation('task_assign_department_modal')) {
//                return false;
//            }
            if (document.getElementById("is_apply_next_recurrence").checked) {
                var is_apply = 'y';
            } else {
                var is_apply = 'n';
            }
            $.ajax({
                type: "POST",
                data: {
                    task_id: task_id,
                    staff_id: staff_id,
                    department: department,
                    is_apply: is_apply,
                    office_id: office_id
                },
                url: base_url + 'project/assign_project_task',
                cache: false,
                success: function (result) {
                    if (result != '') {
                        if (result == 0) {
                            var track_assign = 'label label-success';
                            var track_text = "Assign";
                        } else {
                            var track_assign = 'label label-assigned';
                            var track_text = result;
                        }
                        $('#task_assign_modal').modal('hide');
                        $("#task_assign_track-" + task_id).removeClass().addClass(track_assign);
                        $("#task_assign_track-" + task_id).parent('a').removeAttr('onclick');
                        $("#task_assign_track-" + task_id).parent('a').attr('onclick', 'show_project_task_assign_modal(' + task_id + ');');
                        $("#task_assign_track-" + task_id).html(track_text);
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
function load_staff_list_by_department(dept_id = '', resp_dept = '', resp_staff_office = '', project_id = '', resp_staff_id = '') {
    $.ajax({
        type: "POST",
        url: base_url + 'Project/get_related_staff_list',
        dataType: "html",
        data: {dept_id: dept_id, project_id: project_id, resp_staff_id: resp_staff_id},
        success: function (result) {
            var staff_list = JSON.parse(result);
            if (staff_list == 'all') {
                load_staff_list_sos_for_multiple_staff(result, dept_id, resp_staff_office, project_id, resp_staff_id);
            } else if (staff_list.length > 1) {
                load_staff_list_sos_for_multiple_staff(result, dept_id, resp_staff_office, project_id, resp_staff_id);
            } else {
                load_staff_list_sos_for_multiple_staff(result, dept_id, resp_staff_office, project_id, resp_staff_id);
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
function load_all_staff_list_by_department(dept_id = '', resp_dept = '', resp_staff_office = '', project_id = '', resp_staff_id = '', result = '') {
    $.ajax({
        type: "POST",
        url: base_url + 'Project/load_staff_list_dropdown',
        dataType: "html",
        data: {dept_id: dept_id, resp_dept: resp_dept, resp_staff_office: resp_staff_office, staff_id: result},
        success: function (result) {
            $("#all_assign_staff").hide();
            $("#load_department_staff").show();
            $("#load_department_staff").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function load_staff_list_sos_for_multiple_staff(staff_ids = '', dept_id = '', resp_dept = '', resp_staff_office = '') {
    $.ajax({
        type: "POST",
        url: base_url + 'Project/load_all_staff_list_sos',
        dataType: "html",
        data: {staff_id: staff_ids, dept_id: dept_id, resp_dept: resp_dept, resp_staff_office: resp_staff_office},
        success: function (result) {
            if (result != '') {
                $("#all_assign_staff").show();
                $("#all_assign_staff").html(result);
                $("#load_department_staff").hide();
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
function set_sos_staff_by_department(staff_id) {
    if (staff_id == '') {
        var staff_id = $("#select_staff").val();
    }
    $.ajax({
        type: "POST",
        url: base_url + 'Project/load_staff_list_of_select_department',
        dataType: "html",
        data: {staff_id: staff_id},
        success: function (result) {
            if (result != '') {
                $("#load_department_staff").show();
                $("#load_department_staff").html(result);
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
function show_project_cleared_sos() {
    $("#list_of_cleared_sos").toggle();
}
function change_sales_tax_task2_status(id = '', status = '', new_task_id = '') {
    var task_id = $("#editval").val();
    openModal('changesalestrackinginner-' + task_id);
    var txt = 'Task Id - #' + new_task_id;
    $("#changesalestrackinginner-" + task_id + " .modal-title").html(txt);
    if (status == 0) {
        $("#changesalestrackinginner-" + task_id + " #sal0").prop('checked', true);
        $("#changesalestrackinginner-" + task_id + " #sal1").prop('checked', false);
        $("#changesalestrackinginner-" + task_id + " #sal2").prop('checked', false);
    } else if (status == 1) {
        $("#changesalestrackinginner-" + task_id + " #sal1").prop('checked', true);
        $("#changesalestrackinginner-" + task_id + " #sal0").prop('checked', false);
        $("#changesalestrackinginner-" + task_id + " #sal2").prop('checked', false);
    } else {
        $("#changesalestrackinginner-" + task_id + " #sal2").prop('checked', true);
        $("#changesalestrackinginner-" + task_id + " #sal1").prop('checked', false);
        $("#changesalestrackinginner-" + task_id + " #sal0").prop('checked', false);
    }
    $.get($('#baseurl').val() + "task/get_bookkeeping_input_form_tracking_log/" + id + "/project_sales_tax_confirmation", function (data) {
        $("#status_log > tbody > tr").remove();
        var returnedData = JSON.parse(data);
        for (var i = 0, l = returnedData.length; i < l; i++) {
            $('#status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["stuff_id"] + "</td>" + "<td>" + returnedData[i]["department"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>" + "<td>" + returnedData[i]["created_time"] + "</td></tr>");
        }
        if (returnedData.length >= 1)
            $("#log_modal").show();
        else
            $("#log_modal").hide();
    });
    $("#changesalestrackinginner-" + task_id + " #input_id").val(id);
    $("#new_task_id").val(new_task_id);
    $("#input_id").val(id);
}
function update_sales_tax_input_statusinner(task_id) {
    var statusval = $('input:radio[name=status]:checked').val();
    var id = $("#input_id").val();
    var base_url = $('#baseurl').val();
    var new_task_id = $("#new_task_id").val();
    var confirmation_number = $("#confirmation_number").val();
    if (statusval == 2 && confirmation_number == '') {
        swal("Cannot change tracking", "Complete the input form to change tracking.", "warning");
        return false;
    }
    $.ajax({
        type: "POST",
        data: {statusval: statusval, id: id, task_id: task_id},
        url: base_url + 'task/update_sales_tax_input_status',
        dataType: "html",
        success: function (result) {
//                alert(result);return false;
            var res = JSON.parse(result.trim());
            if (res.input_status == '0') {
                var tracking = 'Not Started';
                var trk_class = 'label label-secondary';
            } else if (res.input_status == 1) {
                var tracking = 'Started';
                var trk_class = 'label label-yellow';
            } else if (res.input_status == 2) {
                var tracking = 'Completed';
                var trk_class = 'label label-primary';
            }
            if (res.task == '0') {
                var tracking1 = 'Not Started';
                var trk_class1 = 'label label-secondary';
            } else if (res.task == 1) {
                var tracking1 = 'Started';
                var trk_class1 = 'label label-yellow';
            } else if (res.task == 2) {
                var tracking1 = 'Completed';
                var trk_class1 = 'label label-primary';
            } else if (res.task == 3) {
                var tracking1 = 'Ready';
                var trk_class1 = 'label label-success';
            } else if (res.task == 4) {
                var tracking1 = 'Canceled';
                var trk_class1 = 'label label-danger';
            }

            $("#trackinner-" + id).removeClass().addClass(trk_class);
            $("#trackinner-" + id).parent('a').removeAttr('onclick');
            $("#trackinner-" + id).parent('a').attr('onclick', "change_sales_tax_task2_status(" + id + "," + res.task + ",\"" + new_task_id + "\")");
            $("#trackinner-" + id).html(tracking);
            $("#trackinner-" + task_id).removeClass().addClass(trk_class1);
            $("#trackinner-" + task_id).parent('a').removeAttr('onclick');
            var break_task_id = new_task_id.split('-');
            $("#trackinner-" + task_id).parent('a').attr('onclick', "change_project_status_inner_input(" + task_id + "," + statusval + "," + task_id + "," + break_task_id[0] + "," + break_task_id[1] + ")");
            $("#trackinner-" + task_id).html(tracking1);
            $("#changesalestrackinginner-" + task_id).modal('hide');
        }
    });
}
function save_confirmation_data(id, confirmation_val) {
    $.ajax({
        type: "POST",
        data: {confirmation_val: confirmation_val, id: id},
        url: base_url + 'task/update_project_sales_tax_confirmation',
        dataType: "html",
        success: function (result) {
//                
        }
    });
}
function cancel_project(id) {
    swal({
        title: "Are you sure?",
        text: "You are going to cancel this project and it's entire recurrence, please Confirm!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: false
    },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        type: "POST",
                        data: {id: id},
                        url: base_url + 'project/cancel_project',
                        dataType: "html",
                        success: function (result) {
                            if (result) {
                                swal("Cancelled!", "Project has been cancelled successfully.", "success");
                                go('Project/');
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
                    swal("Unchanged", "Project has no changes.", "error");
                }
            });
}
function open_input_form() {
    swal("Can't Access!", "Please complete the previous task to access it.", "error");
}
function change_main_project_status(project_id, status = '') {
    openModal('changeprojectinner');
    var txt = 'Project ID - #' + project_id;
    $("#changeprojectinner .modal-title").html(txt);
    if (status == 2) {
        $("#changeprojectinner #pro2").prop('checked', true);
        $("#changeprojectinner #pro4").prop('checked', false);
        $("#changeprojectinner #pro6").prop('checked', false);
        $("#changeprojectinner #pro0").prop('checked', false);
    } else if (status == 4) {
        $("#changeprojectinner #pro4").prop('checked', true);
        $("#changeprojectinner #pro2").prop('checked', false);
        $("#changeprojectinner #pro6").prop('checked', false);
        $("#changeprojectinner #pro0").prop('checked', false);
    } else if (status == 6) {
        $("#changeprojectinner #pro6").prop('checked', true);
        $("#changeprojectinner #pro4").prop('checked', false);
        $("#changeprojectinner #pro2").prop('checked', false);
        $("#changeprojectinner #pro0").prop('checked', false);
    } else if (status == 0) {
        $("#changeprojectinner #pro0").prop('checked', true);
        $("#changeprojectinner #pro6").prop('checked', false);
        $("#changeprojectinner #pro4").prop('checked', false);
        $("#changeprojectinner #pro2").prop('checked', false);
    }
    $.get($('#baseurl').val() + "project/get_project_main_tracking_log/" + project_id + "/project_main", function (data) {
        $("#project_status_log > tbody > tr").remove();
        var returnedData = JSON.parse(data);
        for (var i = 0, l = returnedData.length; i < l; i++) {
            var new_date = returnedData[i]["created_time"].split('-');

            $('#project_status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["stuff_id"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>" + "<td>" + returnedData[i]["comment"] + "</td>" + "<td>" + new_date[0] + "<br>&nbsp;" + new_date[1] + "</td></tr>");
        }
        if (returnedData.length >= 1)
            $("#project_log_modal").show();
        else
            $("#project_log_modal").hide();
    });
    $("#changeprojectinner #main_id").val(project_id);
}
function update_project_main_status() {
    var statusval = $('#changeprojectinner input:radio[name=radio]:checked').val();
    var project_id = $("#changeprojectinner #main_id").val();
    $.ajax({
        type: "POST",
        data: {
            project_id: project_id
        },
        url: base_url + 'project/get_project_sos_count',
        dataType: "html",
        success: function (result) {
            if (result.trim() == '0') {
                $.ajax({
                    type: "POST",
                    data: {
                        statusval: statusval,
                        project_id: project_id
                    },
                    url: base_url + 'project/update_project_main_status',
                    dataType: "html",
                    success: function (result) {
                        if (result != '') {
                            $("#changeprojectinner").modal('hide');
                            if (result == 2) {
                                var tracking_main = 'Completed';
                                var trk_class_main = 'small-btn-width-two label label-primary';
                            } else if (result == 6) {
                                var tracking_main = 'Cancelled';
                                var trk_class_main = 'small-btn-width-two label label-danger';
                            } else if (result == 0) {
                                var tracking_main = 'Not Started';
                                var trk_class_main = 'small-btn-width-two label label-secondary';
                            } else {
                                var tracking_main = 'Canceled';
                                var trk_class_main = 'small-btn-width-two label label-danger';
                            }
                            $("#trackouter-" + project_id).removeClass().addClass(trk_class_main);
                            $("#trackouter-" + project_id).html(tracking_main);
                            swal("Success!", "Project status change successfully.", "success");
//                            go('Project/');
                        }
                    }
                });
            } else {
                swal("Can't Change Tracking!", "Please clear SOS to change tracking.", "error");
            }
        }
    });

}
function change_main_project_status_access() {
    swal("Can't Access!", "You are not able to change tracking.", "error");
}
function starting_period(template_id = '', month = '', year = '', template_cat_id = '') {
//    alert(template_cat_id);
    $.ajax({
        type: "POST",
        data: {
            template_id: template_id,
            template_cat_id: template_cat_id,
            month: month,
            year: year
        },
        url: base_url + 'project/show_template_starting_period',
        dataType: "html",
        success: function (result) {
            $("#template_staring_period").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function get_project_sos_task_list(dashboard_type, template_id) {
//    var category = $("#clear_cat_id").val();
//    clearTaskFilter();
    var category = $('#cat').val();
    var statusArray = category.split('-');
//    reflactTaskFilterWithCategory(category, '');
//    var url = base_url + 'Task/index/' + category + '/' + statusArray[0] + '/' + template_id + '/n' +'/'+ tome;
//    window.open(url, '_blank');
//    reflactProjectFilterWithCategory(category, '');
    go('Project/index/' + category + '/' + statusArray[0] + '/' + template_id + '/n' + '/n' + '/' + dashboard_type);
}
function updateProjectStatusCheck() {
    var statusval = $('#changeStatusinner input:radio[name=radio]:checked').val();
    var prosubid = $('#changeStatusinner #prosubid').val();
    var base_url = $('#baseurl').val();
    var input_form_status = $('#input_form_status').val();
    var is_input_form = $("#is_input_form").val();
    var project_id = $("#project_id").val();
    var task_order = $("#task_order").val();
    var task2_id = $("#task2_id").val();
    var task1_status = $("#task1_status").val();
    var key = $("#key").val();
    if (input_form_status == 'n' && statusval == 2 && is_input_form == 'y') {
        $.ajax({
            type: "POST",
            data: {
                project_id: project_id,
                task_id: prosubid
            },
            url: base_url + 'project/check_task_sos_status',
            cache: false,
            success: function (result) {
                if (result.trim() == '0') {
                    swal({
                        title: "Are you sure?",
                        text: "You want to proceed without complete input form and do you want do complete previous task!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Yes, proceed it!",
                        cancelButtonText: "No, cancel please!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                            function (isConfirm) {
                                if (isConfirm) {
                                    $.ajax({
                                        type: "POST",
                                        data: {
                                            statusval: statusval,
                                            prosubid: prosubid,
                                            project_id: project_id,
                                            input_form_status: input_form_status,
                                            is_input_form: is_input_form,
                                            task_order: task_order
                                        },
                                        url: base_url + 'project/update_project_task_status',
                                        dataType: "html",
                                        success: function (result) {
                                            var res = JSON.parse(result.trim());
                                            if (res.task_status == '0') {
                                                var tracking = 'Not Started';
                                                var trk_class = 'small-btn-width-two label label-secondary';
                                            } else if (res.task_status == 1) {
                                                var tracking = 'Started';
                                                var trk_class = 'small-btn-width-two label label-yellow';
                                            } else if (res.task_status == 2) {
                                                var tracking = 'Completed';
                                                var trk_class = 'small-btn-width-two label label-primary';
                                            } else if (res.task_status == 3) {
                                                var tracking = 'Ready';
                                                var trk_class = 'small-btn-width-two label label-success';
                                            } else if (res.task_status == 4) {
                                                var tracking = 'Canceled';
                                                var trk_class = 'small-btn-width-two label label-danger';
                                            }
                                            if (res.project_status == 0) {
                                                var tracking_main = 'Not Started';
                                                var trk_class_main = 'small-btn-width-two label label-secondary';
                                            } else if (res.project_status == 1) {
                                                var tracking_main = 'Started';
                                                var trk_class_main = 'small-btn-width-two label label-yellow';
                                            } else if (res.project_status == 2) {
                                                var tracking_main = 'Completed';
                                                var trk_class_main = 'small-btn-width-two label label-primary';
                                            } else if (res.project_status == 4) {
                                                var tracking_main = 'Canceled';
                                                var trk_class_main = 'small-btn-width-two label label-danger';
                                            } else if (res.project_status == 3) {
                                                var tracking_main = 'Ready';
                                                var trk_class_main = 'small-btn-width-two label label-success';
                                            } else if (res.project_status == 5) {
                                                var tracking_main = 'Clarification';
                                                var trk_class_main = 'small-btn-width-two label label-info';
                                            }

                                            if (res.sub_taskid_status == 3) {
                                                var tracking_sub = 'Ready';
                                                var trk_class_sub = 'small-btn-width-two label label-success';
                                                $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                                $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                            }
                                            if (res.sub_taskid_status == 0) {
                                                var tracking_sub = 'Not Started';
                                                var trk_class_sub = 'small-btn-width-two label label-secondary';
                                                $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                                $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                            }

                                            $("#trackinner-" + prosubid).removeClass().addClass(trk_class);
                                            $("#trackinner-" + prosubid).parent('a').removeAttr('onclick');
                                            $("#trackinner-" + prosubid).parent('a').attr("onclick", "change_project_status_inner(\"" + input_form_status + "\"," + res.task_status + "," + prosubid + "," + project_id + "," + task_order + ",\"" + is_input_form + "\"," + key + ")");
                                            $("#trackinner-" + prosubid).html(tracking);
                                            var projectid = $("#trackinner-" + prosubid).attr('projectid');
                                            $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
                                            $("#trackouter-" + projectid).html(tracking_main);
                                            $('#changeStatusinner').modal('hide');

                                            //                }
                                        },

                                        beforeSend: function () {
                                            $("#project-tracking-save").prop('disabled', true).html('Processing...');
                                            openLoading();
                                        },
                                        complete: function (msg) {
                                            $("#project-tracking-save").removeAttr('disabled').html('Save Changes');
                                            closeLoading();
                                        }
                                    });
                                    swal("Tracking Changed!", "Task Tracking Changed Successfully.", "success");
                                } else {
                                    swal("Cancelled", " Task Tracking Changed are Cancelled:)", "success");
                                }
                            });
                } else {
                    console.log('hello');
                    goto_sos_result();
//                        swal("Cancelled", " Please Clear SOS To Change Tracking:)", "Error");
                }
            }
        });
    } else if (statusval == 2 && is_input_form == 'n') {
        swal({
            title: "Are you sure?",
            text: "You want to proceed without complete input form and do you want do complete previous task!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, proceed it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
                function (isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            type: "POST",
                            data: {
                                project_id: project_id,
                                task_id: prosubid
                            },
                            url: base_url + 'project/check_task_sos_status',
                            dataType: "html",
                            cache: false,
                            success: function (result1) {
                                console.log(result1);
                                if (result1.trim() == '0') {
                                    $.ajax({
                                        type: "POST",
                                        data: {
                                            statusval: statusval,
                                            prosubid: prosubid,
                                            project_id: project_id,
                                            task_order: task_order
                                        },
                                        url: base_url + 'project/update_project_task_status',
                                        dataType: "html",
                                        success: function (result) {
                                            var res = JSON.parse(result.trim());
                                            if (res.task_status == '0') {
                                                var tracking = 'Not Started';
                                                var trk_class = 'small-btn-width-two label label-secondary';
                                            } else if (res.task_status == 1) {
                                                var tracking = 'Started';
                                                var trk_class = 'small-btn-width-two label label-yellow';
                                            } else if (res.task_status == 2) {
                                                var tracking = 'Completed';
                                                var trk_class = 'small-btn-width-two label label-primary';
                                            } else if (res.task_status == 3) {
                                                var tracking = 'Ready';
                                                var trk_class = 'small-btn-width-two label label-success';
                                            } else if (res.task_status == 4) {
                                                var tracking = 'Canceled';
                                                var trk_class = 'small-btn-width-two label label-danger';
                                            }

                                            if (res.project_status == 0) {
                                                var tracking_main = 'Not Started';
                                                var trk_class_main = 'small-btn-width-two label label-secondary';
                                            } else if (res.project_status == 1) {
                                                var tracking_main = 'Started';
                                                var trk_class_main = 'small-btn-width-two label label-yellow';
                                            } else if (res.project_status == 2) {
                                                var tracking_main = 'Completed';
                                                var trk_class_main = 'small-btn-width-two label label-primary';
                                            } else if (res.project_status == 4) {
                                                var tracking_main = 'Canceled';
                                                var trk_class_main = 'small-btn-width-two label label-danger';
                                            } else if (res.project_status == 3) {
                                                var tracking_main = 'Ready';
                                                var trk_class_main = 'small-btn-width-two label label-success';
                                            } else if (res.project_status == 5) {
                                                var tracking_main = 'Clarification';
                                                var trk_class_main = 'small-btn-width-two label label-info';
                                            }

                                            if (res.sub_taskid_status == 3) {
                                                var tracking_sub = 'Ready';
                                                var trk_class_sub = 'small-btn-width-two label label-success';
                                                $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                                $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                            }
                                            if (res.sub_taskid_status == 0) {
                                                var tracking_sub = 'Not Started';
                                                var trk_class_sub = 'small-btn-width-two label label-secondary';
                                                $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                                $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                            }

                                            $("#trackinner-" + prosubid).removeClass().addClass(trk_class);
                                            $("#trackinner-" + prosubid).parent('a').removeAttr('onclick');
                                            $("#trackinner-" + prosubid).parent('a').attr("onclick", "change_project_status_inner(\"" + input_form_status + "\"," + res.task_status + "," + prosubid + "," + project_id + "," + task_order + ",\"" + is_input_form + "\"," + key + ")");
                                            $("#trackinner-" + prosubid).html(tracking);
                                            var projectid = $("#trackinner-" + prosubid).attr('projectid');
                                            $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
                                            $("#trackouter-" + projectid).html(tracking_main);
                                            $('#changeStatusinner').modal('hide');

                                            //                }
                                        },
                                        beforeSend: function () {
                                            $("#project-tracking-save").prop('disabled', true).html('Processing...');
                                            openLoading();
                                        },
                                        complete: function (msg) {
                                            $("#project-tracking-save").removeAttr('disabled').html('Save Changes');
                                            closeLoading();
                                        }
                                    });
                                } else {
                                    console.log('hi');
                                    goto_sos_result();
                                    //                         swal("Cancelled", "Please Clear SOS To Change Tracking:", "Error");
                                }
                            }
                        });
                    }
                });

    } else if (statusval == 2) {
        swal({
            title: "Are you sure?",
            text: "Do you want do complete previous task!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, proceed it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
                function (isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            type: "POST",
                            data: {
                                statusval: statusval,
                                prosubid: prosubid,
                                project_id: project_id,
                                task_order: task_order
                            },
                            url: base_url + 'project/update_project_task_status',
                            dataType: "html",
                            success: function (result) {
                                var res = JSON.parse(result.trim());
                                if (res.task_status == '0') {
                                    var tracking = 'Not Started';
                                    var trk_class = 'small-btn-width-two label label-secondary';
                                } else if (res.task_status == 1) {
                                    var tracking = 'Started';
                                    var trk_class = 'small-btn-width-two label label-yellow';
                                } else if (res.task_status == 2) {
                                    var tracking = 'Completed';
                                    var trk_class = 'small-btn-width-two label label-primary';
                                } else if (res.task_status == 3) {
                                    var tracking = 'Ready';
                                    var trk_class = 'small-btn-width-two label label-success';
                                } else if (res.task_status == 4) {
                                    var tracking = 'Canceled';
                                    var trk_class = 'small-btn-width-two label label-danger';
                                }

                                if (res.project_status == 0) {
                                    var tracking_main = 'Not Started';
                                    var trk_class_main = 'small-btn-width-two label label-secondary';
                                } else if (res.project_status == 1) {
                                    var tracking_main = 'Started';
                                    var trk_class_main = 'small-btn-width-two label label-yellow';
                                } else if (res.project_status == 2) {
                                    var tracking_main = 'Completed';
                                    var trk_class_main = 'small-btn-width-two label label-primary';
                                } else if (res.project_status == 4) {
                                    var tracking_main = 'Canceled';
                                    var trk_class_main = 'small-btn-width-two label label-danger';
                                } else if (res.project_status == 3) {
                                    var tracking_main = 'Ready';
                                    var trk_class_main = 'small-btn-width-two label label-success';
                                } else if (res.project_status == 5) {
                                    var tracking_main = 'Clarification';
                                    var trk_class_main = 'small-btn-width-two label label-info';
                                }

                                if (res.sub_taskid_status == 3) {
                                    var tracking_sub = 'Ready';
                                    var trk_class_sub = 'small-btn-width-two label label-success';
                                    $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                    $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                }
                                if (res.sub_taskid_status == 0) {
                                    var tracking_sub = 'Not Started';
                                    var trk_class_sub = 'small-btn-width-two label label-secondary';
                                    $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                    $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                }

                                $("#trackinner-" + prosubid).removeClass().addClass(trk_class);
                                $("#trackinner-" + prosubid).parent('a').removeAttr('onclick');
                                $("#trackinner-" + prosubid).parent('a').attr("onclick", "change_project_status_inner(\"" + input_form_status + "\"," + res.task_status + "," + prosubid + "," + project_id + "," + task_order + ",\"" + is_input_form + "\"," + key + ")");
                                $("#trackinner-" + prosubid).html(tracking);
                                var projectid = $("#trackinner-" + prosubid).attr('projectid');
                                $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
                                $("#trackouter-" + projectid).html(tracking_main);
                                $('#changeStatusinner').modal('hide');

                                //                }
                            },
                            beforeSend: function () {
                                $("#project-tracking-save").prop('disabled', true).html('Processing...');
                                openLoading();
                            },
                            complete: function (msg) {
                                $("#project-tracking-save").removeAttr('disabled').html('Save Changes');
                                closeLoading();
                            }
                        });
                    }
                });
    } else {
        console.log('3');
        $.ajax({
            type: "POST",
            data: {
                statusval: statusval,
                prosubid: prosubid,
                project_id: project_id,
                task_order: task_order
            },
            url: base_url + 'project/update_project_task_status',
            dataType: "html",
            success: function (result) {
                var res = JSON.parse(result.trim());
                if (res.task_status == '0') {
                    var tracking = 'Not Started';
                    var trk_class = 'small-btn-width-two label label-secondary';
                } else if (res.task_status == 1) {
                    var tracking = 'Started';
                    var trk_class = 'small-btn-width-two label label-yellow';
                } else if (res.task_status == 2) {
                    var tracking = 'Completed';
                    var trk_class = 'small-btn-width-two label label-primary';
                } else if (res.task_status == 3) {
                    var tracking = 'Ready';
                    var trk_class = 'small-btn-width-two label label-success';
                } else if (res.task_status == 4) {
                    var tracking = 'Canceled';
                    var trk_class = 'small-btn-width-two label label-danger';
                }

                if (res.project_status == 0) {
                    var tracking_main = 'Not Started';
                    var trk_class_main = 'small-btn-width-two label label-secondary';
                } else if (res.project_status == 1) {
                    var tracking_main = 'Started';
                    var trk_class_main = 'small-btn-width-two label label-yellow';
                } else if (res.project_status == 2) {
                    var tracking_main = 'Completed';
                    var trk_class_main = 'small-btn-width-two label label-primary';
                } else if (res.project_status == 4) {
                    var tracking_main = 'Canceled';
                    var trk_class_main = 'small-btn-width-two label label-danger';
                } else if (res.project_status == 3) {
                    var tracking_main = 'Ready';
                    var trk_class_main = 'small-btn-width-two label label-success';
                } else if (res.project_status == 5) {
                    var tracking_main = 'Clarification';
                    var trk_class_main = 'small-btn-width-two label label-info';
                }

                if (res.sub_taskid_status == 3) {
                    var tracking_sub = 'Ready';
                    var trk_class_sub = 'small-btn-width-two label label-success';
                    $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                    $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                }
                if (res.sub_taskid_status == 0) {
                    var tracking_sub = 'Not Started';
                    var trk_class_sub = 'small-btn-width-two label label-secondary';
                    $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                    $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                }

                $("#trackinner-" + prosubid).removeClass().addClass(trk_class);
                $("#trackinner-" + prosubid).parent('a').removeAttr('onclick');
                $("#trackinner-" + prosubid).parent('a').attr("onclick", "change_project_status_inner(\"" + input_form_status + "\"," + res.task_status + "," + prosubid + "," + project_id + "," + task_order + ",\"" + is_input_form + "\"," + key + ")");
                $("#trackinner-" + prosubid).html(tracking);
                var projectid = $("#trackinner-" + prosubid).attr('projectid');
                $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
                $("#trackouter-" + projectid).html(tracking_main);
                $('#changeStatusinner').modal('hide');

                //                }
            },
            beforeSend: function () {
                $("#project-tracking-save").prop('disabled', true).html('Processing...');
                openLoading();
            },
            complete: function (msg) {
                $("#project-tracking-save").removeAttr('disabled').html('Save Changes');
                closeLoading();
            }
        });
    }
}
function get_project_template_list(category_id,template_id='') {
    $.ajax({
        type: "POST",
        data: {
            category_id: category_id,
            template_id:template_id
        },
        url: base_url + 'project/get_project_template_list',
        dataType: "html",
        success: function (result) {
            $("#project_template_list").html(result);
        },
    });
}

var save_tax_return_task_1 = function () {
    var tax_form_list = $("select[name=\'tax_form_list[]\']").map(function () {
        return $(this).val();
    }).toArray();
    var quantity = $("input[name='tax_quantity[]']").map(function () {
        return $(this).val();
    }).get();
    var upload_form_file = $("input[name='tax_upload_form_file[]']").map(function () {
        return $(this).val();
    }).get();
    var pttr_id = $("input[name='pttr_id[]']").map(function () {
        return $(this).val();
    }).get();
    var project_id = $("#project_id").val();
    var task_id = $("#editval").val();
    var input_form_id = $("#task_key").val();
    var sos_data = $("#sos_data").val();
    $.ajax({
        type: "POST",
        data: {
            project_id: project_id,
            task_id: task_id,
            tax_form_list: tax_form_list,
            quantity: quantity,
            upload_form_file: upload_form_file,
            pttr_id: pttr_id
        },
        url: base_url + 'task/save_tax_return_task_1',
        dataType: "html",
        // processData: false,
        // contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'project');
                goURL(base_url + 'task/task_input_form/' + sos_data + '/' + task_id + '/' + input_form_id);
            } else {
                swal("ERROR!", "Please select option(s) from form list.", "error");
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

function show_tax_return_record_modal(task_id, section = '') {
    $.ajax({
        type: "POST",
        data: {task_id: task_id, section: section},
        url: base_url + 'task/show_tax_return_recorded_time_details',
        dataType: "html",
        success: function (result) {
            $('#tax_return_RecordModal').modal();
            $('#tax_return_RecordModal').html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function delete_tax_return_recorded_time(record_id, task_id) {
    $.ajax({
        type: "POST",
        data: {record_id: record_id, task_id: task_id},
        url: base_url + 'task/delete_tax_return_timer_record',
        cache: false,
        success: function (result) {
            if (result) {
                $('#tax_return_RecordModal').modal();
                $('#tax_return_RecordModal').html(result);
            }
        },
    });
}
function close_tax_return_recorded_modal(task_id, section = '') {
    if (section != '') {
        $("#load_record_time1-" + task_id).show();
    } else {
        var record_id = '';
        $.ajax({
            type: "POST",
            data: {task_id: task_id, record_id: record_id},
            url: base_url + 'task/delete_tax_return_timer_record',
            dataType: "html",
            success: function (result) {
                $("#load_record_time1-" + task_id).hide();
                $('#tax_return_RecordModal').hide();
                $("#timer_result1-" + task_id).html(result);
            },
        });
}
}

function save_tax_return_task_govt_status(status = '') {
    var sent_type = $("#sent_type").val();
    var confirmation_num = $("#confirmation_num").val();
    var IRS_status = $("#IRS_status").val();
    var tax_liability = $("#tax_liability").val();
    var amt = $("#amt").val();
    var project_id = $("#project_id").val();
    var task_id = $("#editval").val();
    var input_form_id = $("#task_key").val();
    var sos_data = $("#sos_data").val();
    var govt_status_date = $("#govt_status_date").val();
    $.ajax({
        type: "POST",
        data: {
            project_id: project_id,
            task_id: task_id,
            sent_type: sent_type,
            confirmation_num: confirmation_num,
            IRS_status: IRS_status,
            tax_liability: tax_liability,
            amt: amt,
            status: status,
            govt_status_date: govt_status_date
        },
        url: base_url + 'task/save_tax_return_task_govt_status',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                if (status == 'complete') {
                    goURL(base_url + 'task/task_input_form/' + sos_data + '/' + task_id + '/' + input_form_id + '/' + 'v');
                } else {
                    goURL(base_url + 'task/task_input_form/' + sos_data + '/' + task_id + '/' + input_form_id);
                }
            } else {
                swal("ERROR!", "Please fill data for the form.", "error");
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

function change_tax_return_task2_form_status(id = '', status = '', new_task_id = '') {
    var task_id = $("#editval").val();
    openModal('change_tax_return_trackinginner-' + task_id);
    var txt = 'Task Id - #' + new_task_id;
    $("#change_tax_return_trackinginner-" + task_id + " .modal-title").html(txt);
    if (status == 0) {
        $("#change_tax_return_trackinginner-" + task_id + " #tax0").prop('checked', true);
        $("#change_tax_return_trackinginner-" + task_id + " #tax1").prop('checked', false);
        $("#change_tax_return_trackinginner-" + task_id + " #tax2").prop('checked', false);
        $("#change_tax_return_trackinginner-" + task_id + " #tax4").prop('checked', false);
    } else if (status == 1) {
        $("#change_tax_return_trackinginner-" + task_id + " #tax1").prop('checked', true);
        $("#change_tax_return_trackinginner-" + task_id + " #tax0").prop('checked', false);
        $("#change_tax_return_trackinginner-" + task_id + " #tax2").prop('checked', false);
        $("#change_tax_return_trackinginner-" + task_id + " #tax4").prop('checked', false);
    } else if (status == 2) {
        $("#change_tax_return_trackinginner-" + task_id + " #tax2").prop('checked', true);
        $("#change_tax_return_trackinginner-" + task_id + " #tax1").prop('checked', false);
        $("#change_tax_return_trackinginner-" + task_id + " #tax0").prop('checked', false);
        $("#change_tax_return_trackinginner-" + task_id + " #tax4").prop('checked', false);
    } else if (status == 4) {
        $("#change_tax_return_trackinginner-" + task_id + " #tax4").prop('checked', true);
        $("#change_tax_return_trackinginner-" + task_id + " #tax1").prop('checked', false);
        $("#change_tax_return_trackinginner-" + task_id + " #tax0").prop('checked', false);
        $("#change_tax_return_trackinginner-" + task_id + " #tax2").prop('checked', false);
    }
    $.get($('#baseurl').val() + "task/get_tax_return_task2_form_tracking_log/" + id + "/project_task_tax_return_form_list", function (data) {
        $("#form_tracking_status_log > tbody > tr").remove();
        var returnedData = JSON.parse(data);
        for (var i = 0, l = returnedData.length; i < l; i++) {
            $('#form_tracking_status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["staff_id"] + "</td>" + "<td>" + returnedData[i]["department"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>" + "<td>" + returnedData[i]["created_time"] + "</td></tr>");
        }
        if (returnedData.length >= 1)
            $("#tax_return_task2_log_modal").show();
        else
            $("#tax_return_task2_log_modal").hide();
    });
    $("#change_tax_return_trackinginner-" + task_id + " #inputID").val(id);
    $("#new_taskID").val(new_task_id);
    $('#mainID').val(id);
}

function update_tax_return_task2_form_input_statusinner(task_id) {
    var statusval = $('input:radio[name=status]:checked').val();
    var id = $("#inputID").val();
    var base_url = $('#baseurl').val();
    var new_task_id = $("#new_taskID").val();
    $.ajax({
        type: "POST",
        data: {statusval: statusval, id: id, task_id: task_id},
        url: base_url + 'task/update_tax_return_task2_input_form_status',
        dataType: "html",
        success: function (result) {
            var res = JSON.parse(result.trim());
            if (res.status == '0') {
                var tracking = 'Not Started';
                var trk_class = 'label label-success';
            } else if (res.status == 1) {
                var tracking = 'Started';
                var trk_class = 'label label-yellow';
            } else if (res.status == 2) {
                var tracking = 'Completed';
                var trk_class = 'label label-primary';
            } else {
                var tracking = 'Canceled';
                var trk_class = 'label label-danger';
            }
//                for task
            if (res.task == '0') {
                var tracking1 = 'Not Started';
                var trk_class1 = 'label label-success';
            } else if (res.task == 1) {
                var tracking1 = 'Started';
                var trk_class1 = 'label label-yellow';
            } else if (res.task == 2) {
                var tracking1 = 'Completed';
                var trk_class1 = 'label label-primary';
            } else if (res.task == 3) {
                var tracking1 = 'Ready';
                var trk_class1 = 'label label-secondary';
            } else if (res.task == 4) {
                var tracking1 = 'Canceled';
                var trk_class1 = 'label label-danger';
            }

            $("#trackinginner-" + id).removeClass().addClass(trk_class);
            $("#trackinginner-" + id).parent('a').removeAttr('onclick');
            $("#trackinginner-" + id).parent('a').attr('onclick', "change_tax_return_task2_form_status(" + id + "," + statusval + ",\"" + new_task_id + "\")");
            $("#trackinginner-" + id).html(tracking);
//                for task
            $("#trackinner-" + task_id).removeClass().addClass(trk_class1);
            $("#trackinner-" + task_id).parent('a').removeAttr('onclick');
            var break_task_id = new_task_id.split('-');
            $("#trackinner-" + task_id).parent('a').attr('onclick', "change_project_status_inner_input(" + task_id + "," + res.task + "," + task_id + "," + break_task_id[0] + "," + break_task_id[1] + ")");
            $("#trackinner-" + task_id).html(tracking1);
            $("#change_tax_return_trackinginner-" + task_id).modal('hide');
        }
    });
}

function remove_tax_form(id) {
    swal({
        title: "Are you sure?",
        text: "You want to delete!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false

    }, function () {
        var project_id = $("#project_id").val();
        var task_id = $("#editval").val();
        var input_form_id = $("#task_key").val();
        var sos_data = $("#sos_data").val();
        $.ajax({
            type: "POST",
            data: {
                project_id: project_id,
                task_id: task_id,
                id: id
            },
            url: base_url + 'task/remove_tax_form_by_id',
            dataType: "html",
            success: function (result) {
                // alert(result);return false;
                if (result != 0) {
                    swal("Success!", "Successfully deleted!", "success");
                    // goURL(base_url + 'project');
                    goURL(base_url + 'task/task_input_form/' + sos_data + '/' + task_id + '/' + input_form_id);
                } else {
                    swal("ERROR!", "Cannot be deleted.", "error");
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
function save_task_account2(section = '') {

//update_financial_account_by_date
    if (!requiredValidation('form_accounts2')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_accounts2'));
    var company_id = $("#company_id").val();
    var order_id = $("#editval").val();
    var client_id = $("#client_id").val();
    var is_client = $("#section").val();

    var bookkeeping_input_type = $("#bookkeeping_input_type").val();
    var sos_data_1 = $("#sos_data_1").val();
    var task_id_1 = $("#task_id_1").val();

    form_data.append('section', section);
    form_data.append('client_type', is_client);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/save_account2',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    if (is_client == 'client') {
                        goURL(base_url + 'action/home/view_business/' + client_id + '/' + company_id);
                    } else if (is_client == 'bookkeeping') {
                        goURL(base_url + 'task/task_input_form/' + sos_data_1 + '/' + task_id_1 + '/' + bookkeeping_input_type);
                    } else if (is_client == 'individual') {
                        goURL(base_url + 'action/home/view_individual/' + client_id);
                    } else {
                        get_financial_account_list(company_id, section, order_id);
                    }
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable to save financial account", "error");
                // swal({title: "ERROR!", text: "Can't Save, This Account Already Exists", type: "error"}, function () {
                //     $('#accounts-form').modal('hide');
                // });
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

function get_financial_account_for_client(id) {

    $.ajax({
        type: "POST",
        data: {
            id: id
        },
        url: base_url + 'task/get_financial_account_for_client',
        dataType: "html",
        success: function (result) {
            // alert(result);return false;
            if (result != 0) {
                var data = JSON.parse(result);
                if (id == '') {
                    $("#bank_details").hide();
                } else {
                    $("#bank_details").show();
                    $("#bank_name").val(data['bank_name']);
                    $("#account_number").val(data['account_number']);
                    $("#routing_number").val(data['routing_number']);
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
function goto_project_categoty(dashboard_type = '', category_val = '') { //pageNumber = 0, template_cat_id = '', 
    // var category = $('#cat').val();
    // var statusArray = category.split('-');
    // reflactProjectFilterWithCategory(category, '');

    var statusArray = category_val.split('-');
    openLoading();
    go('Project/index/' + category_val + '/' + statusArray[0]);
}

function add_sales_tax_div(counter, project_id, task_id) {
    $.ajax({
        type: "POST",
        data: {
            counter: counter,
            project_id: project_id,
            task_id: task_id
        },
        url: base_url + 'task/add_sales_tax_div',
        dataType: "html",
        success: function (result) {
            if (result) {
                $(result).insertAfter('#salestax_div' + counter);
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

function open_sales_tax_div(counter, project_id, task_id) {
    $.ajax({
        type: "POST",
        data: {
            counter: counter,
            project_id: project_id,
            task_id: task_id
        },
        url: base_url + 'task/open_sales_tax_div',
        dataType: "html",
        success: function (result) {
            if (result) {
                $('#salestax_div' + counter).html(result);
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

function remove_sales_tax_div(counter)
{
    $('#salestax_div' + counter).remove();
    var count = counter - 1;
    $("#add_div" + count).show();
}

function delete_sales_tax_data(id) {
    swal({
        title: "Are you sure want to remove?",
        text: "Your will not be able to recover this Sales Tax!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'task/delete_sales_tax_data',
                    data: {
                        id: id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Sales Tax deleted successfully!",
                                "type": "success"
                            }, function () {
                                window.location.reload();
                            });
                        }
                    }
                });
            });
}
function cancel_duplicate_tax_project(project_id) {
//    alert(project_id);return false;
    swal({
        title: "Are you sure?",
        text: "You Want To Delete Duplicate Project?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Delete it!",
        closeOnConfirm: true
    },
            function () {
                $.ajax({
                    type: "POST",
                    url: base_url + 'project/cancel_duplicate_tax_project',
                    data: {
                        'project_id': project_id
                    },
                    success: function (result) {
//                alert(result);
                        if (result == 1) {
                            swal('Success!', 'Duplicate Project Deleted Successfully.', 'success');
                        } else {
                            swal('Error!', 'Duplicate Project Failed Deleted.', 'error');
                        }
                    }

                });
            });
}
function delete_task_attachment(id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/delete_task_attachment',
        data: {
            id: id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            swal({
                title: "Success!",
                text: "Attachment Removed Successfully",
                type: "success"
            }, function () {
                $("#showTaskFiles").modal('hide');
            });
        }
    });
}
function loadProjectSummaryBox(category = '', template_cat_id = '', select_month = '', select_year = '', template_name = '', dashboard_type = '', query = '', filter_data = '',project_id='') {
    // console.log('***loadProjectSummaryBox***');
    var responsible_name = $('#responsible_staff').val();
    var all_project_staffs_assignto = $('#assignto_staff').val();
    // console.log('category:'+category);console.log('template_cat_id:'+template_cat_id);console.log('select_month:'+select_month);console.log('select_year:'+select_year);console.log('template_name:'+template_name);console.log('dashboard_type:'+dashboard_type);console.log('query:'+query);
//    alert('uttam'+ template_name);
    var form_data = new FormData(document.getElementById('project-filter-display-div'));
    if (select_year == '') {
        select_year = $("#due_year").val();
        if (select_year != undefined && select_year != '') {
            select_year = select_year;
        } else {
            select_year = '';
        }
    }
    if (select_month == '') {
        var month_year = $("#due_month").val();
        if (month_year != undefined && month_year != '') {
            month_year = month_year.split('-');
            select_month = month_year[0];
            select_year = month_year[1];
        } else {
            select_month = '';
            select_year = '';
        }
    }
    if (template_name == '') {
        template_name = $("#category_id :selected").val();
        if (template_name != undefined && template_name != '') {
            template_name = template_name;
        } else {
            template_name = '';
        }
    }

    var responsible_office = $('#responsible_name').val();
    var responsible_name = $('#responsible_staff').val();
    if (responsible_name == undefined) {
        responsible_name = '';
    }


    var all_project_staffs_assignto = $('#assignto_staff').val();
    if (all_project_staffs_assignto == undefined) {
        all_project_staffs_assignto = '';
    }
    form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
    form_data.append('responsible_name', responsible_name);
    form_data.append('category', category);
    form_data.append('template_cat_id', template_cat_id);
    form_data.append('select_month', select_month);
    form_data.append('select_year', select_year);
    form_data.append('template_name', template_name);
    form_data.append('dashboard_type', dashboard_type);
    form_data.append('query', query);
    form_data.append('filter_data', filter_data);
    form_data.append('project_id_sos', project_id);
    if (responsible_name == undefined) {
        responsible_name = '';
    } else {
        form_data.append('responsible_name', responsible_name);
    }
    if (all_project_staffs_assignto == undefined) {
        all_project_staffs_assignto = '';
    } else {
        form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
    }
    $.ajax({
        type: "POST",
        data: form_data,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        url: base_url + 'project/load_project_dashboard_summary_box',
//        url: base_url + 'project/load_summary_box_data',
        success: function (result) {
            $("#project_summary_box").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            //closeLoading();
        }
    });
}
function updateProjectStatusinner() {
    var statusval = $('#changeStatusinner input:radio[name=radio]:checked').val();
    var prosubid = $('#changeStatusinner #prosubid').val();
    var base_url = $('#baseurl').val();
    var input_form_status = $('#input_form_status').val();
    var is_input_form = $("#is_input_form").val();
    var project_id = $("#project_id").val();
    var task_order = $("#task_order").val();
    var task2_id = $("#task2_id").val();
    var task1_status = $("#task1_status").val();
    var key = $("#key").val();
    if (input_form_status == 'n' && statusval == 2 && is_input_form == 'y') {
        $.ajax({
            type: "POST",
            data: {
                project_id: project_id,
                task_id: prosubid
            },
            url: base_url + 'project/check_task_sos_status',
            cache: false,
            success: function (result) {
                if (result.trim() == '0') {
                    swal({
                        title: "Are you sure?",
                        text: "You want to proceed without complete input form and do you want do complete previous task!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Yes, proceed it!",
                        cancelButtonText: "No, cancel please!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                            function (isConfirm) {
                                if (isConfirm) {
                                    $.ajax({
                                        type: "POST",
                                        data: {
                                            statusval: statusval,
                                            prosubid: prosubid,
                                            project_id: project_id,
                                            input_form_status: input_form_status,
                                            is_input_form: is_input_form,
                                            task_order: task_order
                                        },
                                        url: base_url + 'project/update_project_task_status',
                                        dataType: "html",
                                        success: function (result) {
                                            var res = JSON.parse(result.trim());
                                            if (res.task_status == '0') {
                                                var tracking = 'Not Started';
                                                var trk_class = 'small-btn-width-two label label-secondary';
                                            } else if (res.task_status == 1) {
                                                var tracking = 'Started';
                                                var trk_class = 'small-btn-width-two label label-yellow';
                                            } else if (res.task_status == 2) {
                                                var tracking = 'Completed';
                                                var trk_class = 'small-btn-width-two label label-primary';
                                            } else if (res.task_status == 3) {
                                                var tracking = 'Ready';
                                                var trk_class = 'small-btn-width-two label label-success';
                                            } else if (res.task_status == 4) {
                                                var tracking = 'Canceled';
                                                var trk_class = 'small-btn-width-two label label-danger';
                                            }
                                            if (res.project_status == 0) {
                                                var tracking_main = 'Not Started';
                                                var trk_class_main = 'small-btn-width-two label label-secondary';
                                            } else if (res.project_status == 1) {
                                                var tracking_main = 'Started';
                                                var trk_class_main = 'small-btn-width-two label label-yellow';
                                            } else if (res.project_status == 2) {
                                                var tracking_main = 'Completed';
                                                var trk_class_main = 'small-btn-width-two label label-primary';
                                            } else if (res.project_status == 4) {
                                                var tracking_main = 'Canceled';
                                                var trk_class_main = 'small-btn-width-two label label-danger';
                                            } else if (res.project_status == 3) {
                                                var tracking_main = 'Ready';
                                                var trk_class_main = 'small-btn-width-two label label-success';
                                            } else if (res.project_status == 5) {
                                                var tracking_main = 'Clarification';
                                                var trk_class_main = 'small-btn-width-two label label-info';
                                            }

                                            if (res.sub_taskid_status == 3) {
                                                var tracking_sub = 'Ready';
                                                var trk_class_sub = 'small-btn-width-two label label-success';
                                                $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                                $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                            }
                                            if (res.sub_taskid_status == 0) {
                                                var tracking_sub = 'Not Started';
                                                var trk_class_sub = 'small-btn-width-two label label-secondary';
                                                $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                                $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                            }

                                            $("#trackinner-" + prosubid).removeClass().addClass(trk_class);
                                            $("#trackinner-" + prosubid).parent('a').removeAttr('onclick');
                                            $("#trackinner-" + prosubid).parent('a').attr("onclick", "change_project_status_inner(\"" + input_form_status + "\"," + res.task_status + "," + prosubid + "," + project_id + "," + task_order + ",\"" + is_input_form + "\"," + key + ")");
                                            $("#trackinner-" + prosubid).html(tracking);
                                            var projectid = $("#trackinner-" + prosubid).attr('projectid');
                                            $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
                                            $("#trackouter-" + projectid).html(tracking_main);
                                            $('#changeStatusinner').modal('hide');

                                            //                }
                                        },

                                        beforeSend: function () {
                                            $("#project-tracking-save").prop('disabled', true).html('Processing...');
                                            openLoading();
                                        },
                                        complete: function (msg) {
                                            $("#project-tracking-save").removeAttr('disabled').html('Save Changes');
                                            closeLoading();
                                        }
                                    });
                                    swal("Tracking Changed!", "Task Tracking Changed Successfully.", "success");
                                } else {
                                    swal("Cancelled", " Task Tracking Changed are Cancelled:)", "success");
                                }
                            });
                } else {
                    console.log('hello');
                    goto_sos_result();
//                        swal("Cancelled", " Please Clear SOS To Change Tracking:)", "Error");
                }
            }
        });
    } else if (statusval == 2 && is_input_form == 'n') {
        swal({
            title: "Are you sure?",
            text: "You want to proceed without complete input form and do you want do complete previous task!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, proceed it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
                function (isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            type: "POST",
                            data: {
                                project_id: project_id,
                                task_id: prosubid
                            },
                            url: base_url + 'project/check_task_sos_status',
                            dataType: "html",
                            cache: false,
                            success: function (result1) {
                                console.log(result1);
                                if (result1.trim() == '0') {
                                    $.ajax({
                                        type: "POST",
                                        data: {
                                            statusval: statusval,
                                            prosubid: prosubid,
                                            project_id: project_id,
                                            task_order: task_order
                                        },
                                        url: base_url + 'project/update_project_task_status',
                                        dataType: "html",
                                        success: function (result) {
                                            var res = JSON.parse(result.trim());
                                            if (res.task_status == '0') {
                                                var tracking = 'Not Started';
                                                var trk_class = 'small-btn-width-two label label-secondary';
                                            } else if (res.task_status == 1) {
                                                var tracking = 'Started';
                                                var trk_class = 'small-btn-width-two label label-yellow';
                                            } else if (res.task_status == 2) {
                                                var tracking = 'Completed';
                                                var trk_class = 'small-btn-width-two label label-primary';
                                            } else if (res.task_status == 3) {
                                                var tracking = 'Ready';
                                                var trk_class = 'small-btn-width-two label label-success';
                                            } else if (res.task_status == 4) {
                                                var tracking = 'Canceled';
                                                var trk_class = 'small-btn-width-two label label-danger';
                                            }

                                            if (res.project_status == 0) {
                                                var tracking_main = 'Not Started';
                                                var trk_class_main = 'small-btn-width-two label label-secondary';
                                            } else if (res.project_status == 1) {
                                                var tracking_main = 'Started';
                                                var trk_class_main = 'small-btn-width-two label label-yellow';
                                            } else if (res.project_status == 2) {
                                                var tracking_main = 'Completed';
                                                var trk_class_main = 'small-btn-width-two label label-primary';
                                            } else if (res.project_status == 4) {
                                                var tracking_main = 'Canceled';
                                                var trk_class_main = 'small-btn-width-two label label-danger';
                                            } else if (res.project_status == 3) {
                                                var tracking_main = 'Ready';
                                                var trk_class_main = 'small-btn-width-two label label-success';
                                            } else if (res.project_status == 5) {
                                                var tracking_main = 'Clarification';
                                                var trk_class_main = 'small-btn-width-two label label-info';
                                            }

                                            if (res.sub_taskid_status == 3) {
                                                var tracking_sub = 'Ready';
                                                var trk_class_sub = 'small-btn-width-two label label-success';
                                                $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                                $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                            }
                                            if (res.sub_taskid_status == 0) {
                                                var tracking_sub = 'Not Started';
                                                var trk_class_sub = 'small-btn-width-two label label-secondary';
                                                $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                                $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                            }

                                            $("#trackinner-" + prosubid).removeClass().addClass(trk_class);
                                            $("#trackinner-" + prosubid).parent('a').removeAttr('onclick');
                                            $("#trackinner-" + prosubid).parent('a').attr("onclick", "change_project_status_inner(\"" + input_form_status + "\"," + res.task_status + "," + prosubid + "," + project_id + "," + task_order + ",\"" + is_input_form + "\"," + key + ")");
                                            $("#trackinner-" + prosubid).html(tracking);
                                            var projectid = $("#trackinner-" + prosubid).attr('projectid');
                                            $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
                                            $("#trackouter-" + projectid).html(tracking_main);
                                            $('#changeStatusinner').modal('hide');

                                            //                }
                                        },
                                        beforeSend: function () {
                                            $("#project-tracking-save").prop('disabled', true).html('Processing...');
                                            openLoading();
                                        },
                                        complete: function (msg) {
                                            $("#project-tracking-save").removeAttr('disabled').html('Save Changes');
                                            closeLoading();
                                        }
                                    });
                                } else {
                                    console.log('hi');
                                    goto_sos_result();
                                    //                         swal("Cancelled", "Please Clear SOS To Change Tracking:", "Error");
                                }
                            }
                        });
                    }
                });

    } else if (statusval == 2) {
        swal({
            title: "Are you sure?",
            text: "Do you want do complete previous task!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, proceed it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
                function (isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            type: "POST",
                            data: {
                                statusval: statusval,
                                prosubid: prosubid,
                                project_id: project_id,
                                task_order: task_order
                            },
                            url: base_url + 'project/update_project_task_status',
                            dataType: "html",
                            success: function (result) {
                                var res = JSON.parse(result.trim());
                                if (res.task_status == '0') {
                                    var tracking = 'Not Started';
                                    var trk_class = 'small-btn-width-two label label-secondary';
                                } else if (res.task_status == 1) {
                                    var tracking = 'Started';
                                    var trk_class = 'small-btn-width-two label label-yellow';
                                } else if (res.task_status == 2) {
                                    var tracking = 'Completed';
                                    var trk_class = 'small-btn-width-two label label-primary';
                                } else if (res.task_status == 3) {
                                    var tracking = 'Ready';
                                    var trk_class = 'small-btn-width-two label label-success';
                                } else if (res.task_status == 4) {
                                    var tracking = 'Canceled';
                                    var trk_class = 'small-btn-width-two label label-danger';
                                }

                                if (res.project_status == 0) {
                                    var tracking_main = 'Not Started';
                                    var trk_class_main = 'small-btn-width-two label label-secondary';
                                } else if (res.project_status == 1) {
                                    var tracking_main = 'Started';
                                    var trk_class_main = 'small-btn-width-two label label-yellow';
                                } else if (res.project_status == 2) {
                                    var tracking_main = 'Completed';
                                    var trk_class_main = 'small-btn-width-two label label-primary';
                                } else if (res.project_status == 4) {
                                    var tracking_main = 'Canceled';
                                    var trk_class_main = 'small-btn-width-two label label-danger';
                                } else if (res.project_status == 3) {
                                    var tracking_main = 'Ready';
                                    var trk_class_main = 'small-btn-width-two label label-success';
                                } else if (res.project_status == 5) {
                                    var tracking_main = 'Clarification';
                                    var trk_class_main = 'small-btn-width-two label label-info';
                                }

                                if (res.sub_taskid_status == 3) {
                                    var tracking_sub = 'Ready';
                                    var trk_class_sub = 'small-btn-width-two label label-success';
                                    $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                    $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                }
                                if (res.sub_taskid_status == 0) {
                                    var tracking_sub = 'Not Started';
                                    var trk_class_sub = 'small-btn-width-two label label-secondary';
                                    $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                                    $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                                }

                                $("#trackinner-" + prosubid).removeClass().addClass(trk_class);
                                $("#trackinner-" + prosubid).parent('a').removeAttr('onclick');
                                $("#trackinner-" + prosubid).parent('a').attr("onclick", "change_project_status_inner(\"" + input_form_status + "\"," + res.task_status + "," + prosubid + "," + project_id + "," + task_order + ",\"" + is_input_form + "\"," + key + ")");
                                $("#trackinner-" + prosubid).html(tracking);
                                var projectid = $("#trackinner-" + prosubid).attr('projectid');
                                $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
                                $("#trackouter-" + projectid).html(tracking_main);
                                $('#changeStatusinner').modal('hide');

                                //                }
                            },
                            beforeSend: function () {
                                $("#project-tracking-save").prop('disabled', true).html('Processing...');
                                openLoading();
                            },
                            complete: function (msg) {
                                $("#project-tracking-save").removeAttr('disabled').html('Save Changes');
                                closeLoading();
                            }
                        });
                    }
                });
    } else {
        console.log('3');
        $.ajax({
            type: "POST",
            data: {
                statusval: statusval,
                prosubid: prosubid,
                project_id: project_id,
                task_order: task_order
            },
            url: base_url + 'project/update_project_task_status',
            dataType: "html",
            success: function (result) {
                var res = JSON.parse(result.trim());
                if (res.task_status == '0') {
                    var tracking = 'Not Started';
                    var trk_class = 'small-btn-width-two label label-secondary';
                } else if (res.task_status == 1) {
                    var tracking = 'Started';
                    var trk_class = 'small-btn-width-two label label-yellow';
                } else if (res.task_status == 2) {
                    var tracking = 'Completed';
                    var trk_class = 'small-btn-width-two label label-primary';
                } else if (res.task_status == 3) {
                    var tracking = 'Ready';
                    var trk_class = 'small-btn-width-two label label-success';
                } else if (res.task_status == 4) {
                    var tracking = 'Canceled';
                    var trk_class = 'small-btn-width-two label label-danger';
                }

                if (res.project_status == 0) {
                    var tracking_main = 'Not Started';
                    var trk_class_main = 'small-btn-width-two label label-secondary';
                } else if (res.project_status == 1) {
                    var tracking_main = 'Started';
                    var trk_class_main = 'small-btn-width-two label label-yellow';
                } else if (res.project_status == 2) {
                    var tracking_main = 'Completed';
                    var trk_class_main = 'small-btn-width-two label label-primary';
                } else if (res.project_status == 4) {
                    var tracking_main = 'Canceled';
                    var trk_class_main = 'small-btn-width-two label label-danger';
                } else if (res.project_status == 3) {
                    var tracking_main = 'Ready';
                    var trk_class_main = 'small-btn-width-two label label-success';
                } else if (res.project_status == 5) {
                    var tracking_main = 'Clarification';
                    var trk_class_main = 'small-btn-width-two label label-info';
                }

                if (res.sub_taskid_status == 3) {
                    var tracking_sub = 'Ready';
                    var trk_class_sub = 'small-btn-width-two label label-success';
                    $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                    $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                }
                if (res.sub_taskid_status == 0) {
                    var tracking_sub = 'Not Started';
                    var trk_class_sub = 'small-btn-width-two label label-secondary';
                    $("#trackinner-" + res.sub_taskid).removeClass().addClass(trk_class_sub);
                    $("#trackinner-" + res.sub_taskid).html(tracking_sub);
                }

                $("#trackinner-" + prosubid).removeClass().addClass(trk_class);
                $("#trackinner-" + prosubid).parent('a').removeAttr('onclick');
                $("#trackinner-" + prosubid).parent('a').attr("onclick", "change_project_status_inner(\"" + input_form_status + "\"," + res.task_status + "," + prosubid + "," + project_id + "," + task_order + ",\"" + is_input_form + "\"," + key + ")");
                $("#trackinner-" + prosubid).html(tracking);
                var projectid = $("#trackinner-" + prosubid).attr('projectid');
                $("#trackouter-" + projectid).removeClass().addClass(trk_class_main);
                $("#trackouter-" + projectid).html(tracking_main);
                $('#changeStatusinner').modal('hide');

                //                }
            },
            beforeSend: function () {
                $("#project-tracking-save").prop('disabled', true).html('Processing...');
                openLoading();
            },
            complete: function (msg) {
                $("#project-tracking-save").removeAttr('disabled').html('Save Changes');
                closeLoading();
            }
        });
    }
}
function template_filter() {
    var category = $('#cat').val();
    var statusArray = category.split('-');
    var month = $('#due_month').val();
    var year = $("#due_year").val();

    if (typeof (month) != "undefined" && month !== null) {
        month = month;
        var monthYear = month.split('-');
        month = monthYear[0];
        year = monthYear[1];
    } else {
        month = '';
    }

    if (year != '' && month == '') {
        month = '';
    } else {
        month = month;
    }
    var template_cat = statusArray[0];
    if (template_cat == '') {
        if (statusArray[0] == 2) {
            template_cat = 'n';
        } else {
            template_cat = 'n';
            $('#category_id').css('border', '1px solid red');
            return false;
        }
    } else {
        $('#category_id').css('border', '1px solid green');
    }
    if (typeof (year) == 'undefined' || year == '') {
        year = '';
    } else {
        $("#due_month").css('border', '1px solid green');
        $("#due_year").css('border', '1px solid green');
    }
    var project_template_name = $("#category_id :selected").text().trim();
    var due_month_text = $("#due_month :selected").text().trim();
    var due_year_text = $("#due_year :selected").text().trim();
    if (due_month_text == '') {
        period_data = due_year_text;
    } else {
        period_data = due_month_text;
    }
    var template_id = $("#category_id :selected").val();
    if (month == 'n') {
        month = '';
    }

    /*Data collection for previously attached filter*/
    var filter_data = [];
    var variable_dropdown = [];
    $('.variable-dropdown :selected').each(function () {
        variable_dropdown.push($(this).val());
    });
    var remove_arr = [];
    if (variable_dropdown.indexOf("2") != -1) {
        var index_template = variable_dropdown.indexOf("2");
        remove_arr.push(index_template);
        variable_dropdown.splice(index_template, 1);
    }
    if (variable_dropdown.indexOf("19") != -1) {
        var index_annually = variable_dropdown.indexOf("19");
        remove_arr.push(index_annually);
        variable_dropdown.splice(index_annually, 1);
    }
    if (variable_dropdown.indexOf("17") != -1) {
        var index_monthly = variable_dropdown.indexOf("17");
        remove_arr.push(index_monthly);
        variable_dropdown.splice(index_monthly, 1);
    }
    variable_dropdown = Object.assign({}, variable_dropdown);
    filter_data['variable_dropdown'] = variable_dropdown;

    var condition_dropdown = [];
    $('.condition-dropdown :selected').each(function () {
        condition_dropdown.push($(this).val());
    });
    if (remove_arr.length > 0) {
        var remove_arr_length = remove_arr.length;
        for (var k = 0; k < remove_arr_length; k++) {
            condition_dropdown.splice(k, 1);
        }
    }
    condition_dropdown = Object.assign({}, condition_dropdown);
    filter_data['condition_dropdown'] = condition_dropdown;

    var criteria_dropdown = [];
    var criteria_dropdown_name = [];
    var request_type = ''; /* dedicated for fetching tracking after click on any tracking before template filter */
    $('.criteria-dropdown :selected').each(function () {
        var element_name = this.parentElement.name;
        var start = element_name.indexOf('[');
        start = start + 1;
        var end = element_name.indexOf(']');
        var new_element_name = element_name.substring(start, end);
        criteria_dropdown_name.push(new_element_name);
        criteria_dropdown.push($(this).val());
        console.log(new_element_name);
        if (new_element_name == 'tracking') {
            request_type = $(this).val() + '-' + $(this).text();
        }
    });
    var newArr = [];
    var criteria_dropdown_length = criteria_dropdown.length;
    for (var j = 0; j < criteria_dropdown_length; j++) {
        var sliced = criteria_dropdown.splice(0, 1);
        newArr.push(sliced);
    }
    var criteria_dropdown_arr = [];
    for (var i = 0; i < criteria_dropdown_name.length; i++) {
        criteria_dropdown_arr[criteria_dropdown_name[i]] = newArr[i];
    }
    delete criteria_dropdown_arr['project_template'];
    delete criteria_dropdown_arr['start_month'];
    criteria_dropdown_arr = Object.assign({}, criteria_dropdown_arr);
    filter_data['criteria_dropdown'] = criteria_dropdown_arr;
    filter_data = Object.assign({}, filter_data);
    var new_filter_data = JSON.stringify(filter_data);
    // console.log(month);
    // console.log(year);return false;

    loadProjectDashboard('', '', '', '', '', '', new_filter_data, '', '', '', '', '', '', 1, template_cat, template_id, month, year, '', 'all', '');
    reflactProjectFilterWithCategory(category, request_type, template_id, project_template_name, month, year, period_data);
    loadProjectSummaryBox(category, template_cat, month, year, template_id, '', '', new_filter_data);
}
function reflactProjectFilterWithCategory() {

}
function project_sorting_filter_modal1(reference = '', current_element = '') {
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    $("#filter-variable").val(reference);
    // console.log(previous_filter);
    if (previous_filter != undefined && previous_filter == reference) {
        $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
        $("#value-display").empty();
        $("#filter-variable").val('');
        $(".display-filter-div").hide();
        return false;
    }
    // var check_div_element = $("#"+current_element.id+"-display").html();
    // console.log(check_div_element);
    var check_div_element = '';
    if (reference == 'project_id') {
        check_div_element = $("#id-val-display").html();
    } else if (reference == 'project_template') {
        check_div_element = $("#template_id-val-display").html();
    } else if (reference == 'pattern') {
        check_div_element = $("#pattern-val-display").html();
    } else if (reference == 'client_id') {
        check_div_element = $("#client-val-display").html();
    } else if (reference == 'office_id') {
        $("#office-val").removeClass('btn-success').addClass('btn-outline-success');
        check_div_element = $("#office-val-display").html();
    } else if (reference == 'responsible') {
        check_div_element = $("#responsible_name-val-display").html();
    } else if (reference == 'assign_to') {
        check_div_element = $("#all_project_staffs_assignto-val-display").html();
    } else if (reference == 'tracking') {
        check_div_element = $("#status-val").html();
    } else if (reference == 'project_type') {
        check_div_element = $("#project_type-val").html();
    }
    var template_cat_id = $("#sort_template_cat_id").val();
    if (check_div_element == '') {
        $.ajax({
            type: 'POST',
            url: base_url + 'modal/project_sorting_filter_modal',
            data: {
                reference: reference,
                template_cat_id: template_cat_id
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
                $(".filter-options-val").hide();

                // $("#"+current_element.id).removeClass('btn-success').addClass('btn-outline-success');
                // $("#"+current_element.id+"-display").html(result).slideDown('slow');
                if (reference == 'project_id') {
                    $("#id-val").removeClass('btn-success').addClass('btn-outline-success');
                    $("#id-val-display").html(result).slideDown('slow');
                } else if (reference == 'project_template') {
                    $("#template_id-val").removeClass('btn-success').addClass('btn-outline-success');
                    $("#template_id-val-display").html(result).slideDown('slow');
                } else if (reference == 'pattern') {
                    $("#pattern-val").removeClass('btn-success').addClass('btn-outline-success');
                    $("#pattern-val-display").html(result).slideDown('slow');
                } else if (reference == 'client_id') {
                    $("#client-val").removeClass('btn-success').addClass('btn-outline-success');
                    $("#client-val-display").html(result).slideDown('slow');
                } else if (reference == 'office_id') {
                    $("#office-val").removeClass('btn-success').addClass('btn-outline-success');
                    $("#office-val-display").html(result).slideDown('slow');
                } else if (reference == 'responsible') {
                    $("#responsible_name-val").removeClass('btn-success').addClass('btn-outline-success');
                    $("#responsible_name-val-display").html(result).slideDown('slow');
                } else if (reference == 'assign_to') {
                    $("#all_project_staffs_assignto-val").removeClass('btn-success').addClass('btn-outline-success');
                    $("#all_project_staffs_assignto-val-display").html(result).slideDown('slow');
                } else if (reference == 'tracking') {
                    $("#status-val").removeClass('btn-success').addClass('btn-outline-success');
                    $("#status-val-display").html(result).slideDown('slow');
                } else if (reference == 'project_type') {
                    $("#project_type-val").removeClass('btn-success').addClass('btn-outline-success');
                    $("#project_type-val-display").html(result).slideDown('slow');
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

        // $("#"+current_element.id).removeClass('btn-success').addClass('btn-outline-success');
        // $("#"+current_element.id+"-display").slideDown('slow');
        if (reference == 'project_id') {
            $("#id-val").removeClass('btn-success').addClass('btn-outline-success');
            $("#id-val-display").slideDown('slow');
        } else if (reference == 'project_template') {
            $("#template_id-val").removeClass('btn-success').addClass('btn-outline-success');
            $("#template_id-val-display").slideDown('slow');
        } else if (reference == 'pattern') {
            $("#pattern-val").removeClass('btn-success').addClass('btn-outline-success');
            $("#pattern-val-display").slideDown('slow');
        } else if (reference == 'client_id') {
            $("#client-val").removeClass('btn-success').addClass('btn-outline-success');
            $("#client-val-display").slideDown('slow');
        } else if (reference == 'office_id') {
            $("#office-val").removeClass('btn-success').addClass('btn-outline-success');
            $("#office-val-display").slideDown('slow');
        } else if (reference == 'responsible') {
            $("#responsible_name-val").removeClass('btn-success').addClass('btn-outline-success');
            $("#responsible_name-val-display").slideDown('slow');
        } else if (reference == 'assign_to') {
            $("#all_project_staffs_assignto-val").removeClass('btn-success').addClass('btn-outline-success');
            $("#all_project_staffs_assignto-val-display").slideDown('slow');
        } else if (reference == 'tracking') {
            $("#status-val").removeClass('btn-success').addClass('btn-outline-success');
            $("#status-val-display").slideDown('slow');
        } else if (reference == 'project_type') {
            $("#project_type-val").removeClass('btn-success').addClass('btn-outline-success');
            $("#project_type-val-display").slideDown('slow');
        }
}
}
function project_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('project-filter-display-div'));
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
                let id_val = $('[name="' + active_element + '[]"]').attr('id');
                if (id_val == 'pattern_month') {
                    id_val = 'pattern';
                }
                let current_made_id = id_val + '-val';
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
    var template_cat_id = $("#sort_template_cat_id").val();
    var check_div_element = $("#" + current_element.id + "-display").html();
    if (check_div_element == '') {
        $.ajax({
            type: 'POST',
            url: base_url + 'modal/project_sorting_filter_modal',
            data: {
                reference: reference,
                template_cat_id: template_cat_id
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
                        let id_val = $('[name="' + active_element + '[]"]').attr('id');
                        if (id_val == 'pattern_month') {
                            id_val = 'pattern';
                        }
                        if (id_val == 'project_id_type') {
                            id_val = 'project_id';
                        }
                        let current_made_id = id_val + '-val';
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
                let id_val = $('[name="' + active_element + '[]"]').attr('id');
                if (id_val == 'pattern_month') {
                    id_val = 'pattern';
                }
                if (id_val == 'project_id_type') {
                    id_val = 'project_id';
                }
                let current_made_id = id_val + '-val';
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
}
}
function sort_project_dashboard_new(sort_type = '', sort_val = '', page_number = '', template_cat_id) {
    var sort_type = sort_type.value;
    var filter_data = $("#filter_data").val();
    if (filter_data == undefined) {
        filter_data = '';
    }
    var query = $("#query").val();
    if (query == undefined) {
        query = '';
    }
    var template_id = $("#template_id").val();
    if (template_id == undefined) {
        template_id = '';
    }
//    alert(filter_data);
    var form_data = new FormData(document.getElementById('project-filter-display-div'));
    form_data.append('template_cat_id', template_cat_id);
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_val);
    form_data.append('filter_data', filter_data);
    form_data.append('page_number', page_number);
    form_data.append('template_id', template_id);
    form_data.append('query', query);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'project/sort_project_dashboard_new',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (action_result) {

            var data = JSON.parse(action_result);
//            alert(data);
            $("#action_dashboard_div").html(data.result);
//            $('#bookkeeping_btn_clear_filter').show();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (action_result) {
            closeLoading();
        }
    });
}
function project_filter_new(page_numbers = '', is_clear = '', current_clear_element = '') {
    var filter_element = $("#filter-variable").val();
//    console.log(filter_element);
//    console.log(current_clear_element);
    console.log('isclear: '+is_clear);
    if (is_clear != '') {
        var clear_element = current_clear_element.id;
//        console.log(clear_element);

        let removavle_element = $("#filter-field-variable").val();
        console.log(removavle_element);
        if (removavle_element == 'pattern') {
            $("#" + removavle_element + '_month').val('').trigger('chosen:updated');
        }
        if (removavle_element == 'project_id') {
            $("#" + removavle_element + '_type').val('').trigger('chosen:updated');
        }
        if (removavle_element == 'responsible_name') {
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#responsible_staff").val('').trigger('chosen:updated');
        }
        if (removavle_element == 'all_project_staffs_assignto') {
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#assignto_staff").val('').trigger('chosen:updated');
        }
//        if (removavle_element == 'all_project_staffs_assignto') {
//            $("#" + removavle_element).val('').trigger('chosen:updated');
//            $("#assignto_staff").val('').trigger('chosen:updated');
//        }
        $("#" + removavle_element).val('').trigger('chosen:updated');
        $("#" + clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('project-filter-display-div'));
    console.log(form_data); 
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
         console.log('uuu:'+a);
         console.log('filtrname:'+filter_name);
        if (a == 'project_id_type') {
            var id = 'project_id_type-val';
            if (is_clear == '') {
                $("#project_id-clear_filter").show();
            }
        }
        if (a == 'project_id') {
            var id = 'project_id-val';
            if (is_clear == '') {
                $("#project_id-clear_filter").show();
            }
        }
        if (a == 'project_template') {
            var id = 'template_id';
            if (is_clear == '') {
                $("#template_id-clear_filter").show();
            }
        }
        if (a == 'pattern') {
            var id = 'pattern-val';
            if (is_clear == '') {
                $("#pattern_month-clear_filter").show();
            }
        }
        if (a == 'pattern_month') {
            var id = 'pattern-val';
            if (is_clear == '') {
                $("#pattern_month-clear_filter").show();
            }
        }
        if (a == 'client') {
            var id = 'client-val';
            if (is_clear == '') {
                $("#client-clear_filter").show();
            }
            $("#" + id).removeClass('btn-success').addClass('btn-primary');
        }
        if (a == 'office_id') {
            var id = 'office_id-val';
            if (is_clear == '') {
                $("#office-clear_filter").show();
            }
        }
        if (a == 'responsible') {
            var id = 'responsible_name-val';
            if (is_clear == '') {
                $("#responsible_name-clear_filter").show();
            }
        }
        if (a == 'assign_to') {
            var id = 'all_project_staffs_assignto-val';
            if (is_clear == '') {
                $("#all_project_staffs_assignto-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'status-val';
            if (is_clear == '') {
                $("#status-clear_filter").show();
            }
        }
        if (a == 'referred_by') {
            var id = 'referred_by-val';
            if (is_clear == '') {
                $("#referred_by-clear_filter").show();
            }
        }
        if (a == 'generation_date') {
            var id = 'generation_date-val';
            if (is_clear == '') {
                $("#generation_date-clear_filter").show();
            }
        }
        if (a == 'sos_filter') {
            var id = 'sos_filter-val';
            if (is_clear == '') {
                $("#sos_filter-clear_filter").show();
            }
        }
        if (a == 'due_date') {
            var id = 'due_date-val';
            if (is_clear == '') {
                $("#due_date-clear_filter").show();
            }
        }
        if (a == 'email') {
            var id = 'email-val';
            if (is_clear == '') {
                $("#email-clear_filter").show();
            }
        }
        if (a == 'phone') {
            var id = 'phone-val';
            if (is_clear == '') {
                $("#phone-clear_filter").show();
            }
        }
        if (filter_name == 'department') {
            var id = 'all_project_staffs_assignto-val';
            if (is_clear == '') {
                $("#all_project_staffs_assignto-clear_filter").show();
            }
        }
        if (filter_name == 'responsible_department') {
            var id = 'responsible_name-val';
            if (is_clear == '') {
                $("#responsible_name-clear_filter").show();
            }
        }

    }

    var responsible_office = $('#responsible_name').val();
    var assign_office = $('#all_project_staffs_assignto').val();
    var responsible_name = $('#responsible_staff').val();
    var all_project_staffs_assignto = $('#assignto_staff').val();
    if (responsible_name == undefined) {
        responsible_name = '';
    }

    if (all_project_staffs_assignto == undefined) {
        all_project_staffs_assignto = '';
    }
    // console.log(responsible_office);
    // console.log(assign_office);
    // console.log(responsible_name);
    // console.log(all_project_staffs_assignto);
    if (responsible_office != '' && responsible_name == null && responsible_office != undefined) {

        // alert('hi');
        $('#responsible_staff_chosen .chosen-choices').css({"border-color": "red", "border-width": "1px", "border-style": "solid"});
        return false;

    } else {
        $('#responsible_staff_chosen .chosen-choices').css({"border-color": "#CBD5DD", "border-width": "1px", "border-style": "solid"});
        form_data.append('responsible_name', responsible_name);
    }
// //    console.log('uttam'+ all_project_staffs_assignto);
    if (assign_office != '' && all_project_staffs_assignto == null && assign_office != undefined) {

        // alert('hello');
        $('#assignto_staff_chosen .chosen-choices').css({"border-color": "red", "border-width": "1px", "border-style": "solid"});
        return false;

    } else {
        $('#assignto_staff_chosen .chosen-choices').css({"border-color": "#CBD5DD", "border-width": "1px", "border-style": "solid"});
        form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
    }
    // return false;
    var category = $('#cat').val();
    var statusArray = category.split('-');
//    var form_data = new FormData(document.getElementById('filter-form'));
    // form_data = JSON.stringify(form_data);
    // console.log(form_data);return false;
    var select_year = '';
    var template_cat_id = $('#sort_template_cat_id').val();
    var template_name = $("#category_id :selected").val();
    if (template_name == undefined) {
        template_name = '';
    }
    if (select_year == '') {
        select_year = $("#due_year").val();
    } else {
        select_year = '';
    }
    var month_year = $("#due_month").val();
    if (month_year != undefined && month_year != '') {
        month_year = month_year.split('-');
        var select_month = month_year[0];
        select_year = month_year[1];
    } else {
        select_month = '';
    }
//    console.log(select_year);
//    console.log(select_month);
    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }
    var status = $("#status").val();
    if (status == undefined) {
        status = '';
    }
    var dashboard_type = $("#filter_dashboar_type").val();
    if (dashboard_type == undefined) {
        dashboard_type = 'all';
    }
    var template_id = $("#template_id").val();
    if (template_id == undefined) {
        template_id = '';
    }
    var filter_data = $("#filter_data").val();
    if (filter_data == undefined) {
        filter_data = '';
    }
    var query = $("#query").val();
    if (query == undefined) {
        query = '';
    }
    if (template_name == undefined) {
        template_name = '';
    }

    form_data.append('template_cat_id', template_cat_id);
    form_data.append('template_name', template_name);
    form_data.append('select_month', select_month);
    form_data.append('select_year', select_year);
    form_data.append('page_number', page_number);
    form_data.append('status', status);
    form_data.append('dashboard_type', dashboard_type);
    form_data.append('template_id', template_id);
    form_data.append('filter_data', filter_data);
    form_data.append('query', query);
    form_data.append('filter_element', filter_element);

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'project/project_filter/' + category + '/' + statusArray[0],
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);
            $("#action_dashboard_div").html(result);
            $('#ProjectFilterModal').modal('hide');
            $("[data-toggle=popover]").popover();
            // $("#apply_filter").removeClass('btn-block');
            $('#bookkeeping_btn_clear_filter').show();
//            $('#clear_filter').show();
            $("#clear_cat_id").val(statusArray[0]);

            //display_project_applied_filters();
            // loadProjectSummaryBox(category,template_cat_id,select_month,select_year,template_name,dashboard_type);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function loadProjectDashboard(status = '', request = '', templateID = '', officeID = '', departmentID = '', filter_assign = '', filter_data = '', sos_value = '', sort_criteria = '', sort_type = '', client_type = '', client_id = '', clients = '', pageNumber = 0, template_cat_id = '', template_name = '', month = '', year = '', project_id = '', dashboard_type = '', query = '', project_ids = '') {
//     console.log('loadProjectDashboard');
    var responsible_name = $('#responsible_staff').val();
    var all_project_staffs_assignto = $('#assignto_staff').val();
    // console.log('status:'+status);console.log('request:'+request);console.log('templateID:'+ templateID);console.log('officeID:'+ officeID);console.log('departmentID:'+departmentID);console.log('filter_assign:'+filter_assign);console.log('filter_data:'+filter_data);console.log('sos_value:'+sos_value);console.log('sort_criteria:'+sort_criteria);console.log('sort_type:'+sort_type);console.log('client_type:'+client_type);console.log('client_id:'+client_id);console.log('clients:'+clients);console.log('pageNumber:'+pageNumber);console.log('template_cat_id:'+template_cat_id);console.log('template_name:'+template_name);console.log('month:'+month);console.log('year:'+year);console.log('project_id:'+project_id);console.log('dashboard_type:'+dashboard_type);console.log('query:'+ query);console.log('project_ids:'+project_ids);
    var form_data = new FormData(document.getElementById('project-filter-display-div'));
    var responsible_office = $('#responsible_name').val();
    var responsible_name = $('#responsible_staff').val();
    if (responsible_name == undefined) {
        responsible_name = '';
    }
    var all_project_staffs_assignto = $('#assignto_staff').val();
    if (all_project_staffs_assignto == undefined) {
        all_project_staffs_assignto = '';
    }
    form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
    form_data.append('responsible_name', responsible_name);
    form_data.append('template_cat_id', template_cat_id);
    form_data.append('template_name', template_name);
    form_data.append('month', month);
    form_data.append('year', year);
    form_data.append('dashboard_type', dashboard_type);
    form_data.append('filter_data', filter_data);
    form_data.append('query', query);
    form_data.append('status', status);
    form_data.append('template_id', templateID);
    form_data.append('officeID', officeID);
    form_data.append('departmentID', departmentID);
    form_data.append('filter_assign', filter_assign);
    form_data.append('filter_data', filter_data);
    form_data.append('sos_value', sos_value);
    form_data.append('sort_criteria', sort_criteria);
    form_data.append('sort_type', sort_type);
    form_data.append('client_type', client_type);
    form_data.append('client_id', client_id);
    form_data.append('id', project_id);
    form_data.append('page_number', pageNumber);
    form_data.append('template_name', template_name);
    form_data.append('dashboard_type', dashboard_type);
    form_data.append('query', query);  
    form_data.append('project_ids', project_ids);
    if (responsible_name == undefined) {
        responsible_name = '';
    } else {
        form_data.append('responsible_name', responsible_name);
    }
    if (all_project_staffs_assignto == undefined) {
        all_project_staffs_assignto = '';
    } else {
        form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
    }
    $.ajax({
        type: "POST",
        data: form_data,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        url: base_url + 'project/dashboard_ajax',
        success: function (project_result) {
            // console.log(project_result); 
            // return false;      
            if (project_result.trim() != '') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $("#action_dashboard_div").html(project_result);
                    //$("a.filter-button span:contains('-')").html(0);

                } else {
//                    $(".ajaxdiv").append(project_result);
                    $("#action_dashboard_div").append(project_result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                $(".status-dropdown").val(status);
                $(".request-dropdown").val(request);
                $("[data-toggle=popover]").popover();
            }
            if (status != '' || status == '0') {
//                $("#clear_filter").html(filter_data + ' &nbsp; ');
//                $("#clear_filter").show();
                $("#project_apply_filter").show();
                $('#bookkeeping_btn_clear_filter').show();
                $("#project_hide_filter").show();
//                $("#project_add_filter").hide();
            } else {
                if (template_name != '') {
                    $('#bookkeeping_btn_clear_filter').show();
                } else {
//                $("#clear_filter").html('');
//                $("#clear_filter").hide();
                    $('#bookkeeping_btn_clear_filter').hide();
                    $('#tax_btn_clear_filter').hide();
                    $('#sales_btn_clear_filter').hide();
                    $('#annual_btn_clear_filter').hide();
                    $("#project_apply_filter").hide();
                    $("#project_hide_filter").hide();
//                $("#project_add_filter").show();
                }
            }
            if (query != '') {
                $('#bookkeeping_btn_clear_filter').show();
            }
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            //closeLoading();
            jumpDiv();
            if (clients == 'clients') {
                $("#action_dashboard_div").find(".clearfix").remove();
            }
        }
    });
}
function loadclientproject(pageNumber = 0, template_cat_id = '', project_id = '', project_from = '', client_type = '', client_id = '', partner_id = '') {

    $.ajax({
        type: "POST",
        data: {
            template_cat_id: template_cat_id,
            project_id: project_id,
            page_number: pageNumber,
            project_from: project_from,
            client_type: client_type,
            client_id: client_id,
            partner_id: partner_id
        },
        cache: false,
        url: base_url + 'project/load_client_project',
        success: function (project_result) {
//            alert(project_result);
            if (pageNumber == 1 || pageNumber == 0) {
                $("#action_dashboard_div").html(project_result);
            } else {
                $("#action_dashboard_div").append(project_result);
                $('.result-header').not(':first').remove();
            }
            if (pageNumber != 0) {
                $('.load-more-btn').not(':last').remove();
            }
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            // closeLoading();
        }
    });
}
function remove_filter_element(current_remove_element = '', reference = '') {
    var clear_element = current_remove_element.id;
    var value = $("#" + clear_element).val();
    if (value == null) {
        var current_clear_element = clear_element + '-clear_filter';
        $("#" + current_clear_element).hide();
}
}
function get_office_staff_list(staff_type = '', office_id = '', select_staff = '') {
    if (office_id != '' && staff_type == 4) {
        $.ajax({
            type: "POST",
            data: {
                office_id: office_id,
                select_staff: select_staff
            },
            url: base_url + 'project/get_project_office_staff',
            dataType: "html",
            success: function (result) {
                $("#project_office_staff").show();
                $("#project_office_staff").html(result);
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        $("#project_office_staff").hide();
}
}

function assign_project(project_id, user_type) {
    if (!requiredValidation('project_assign_department_modal')) {
        return false;

    }
    var staff_id = $("#task_staff1").val();
    var dept_id = $("#assigned_department").val();
    var office_id = $("#office_id_select").val();
    swal({
        title: 'Are you sure?',
        text: "You want to " + (staff_id == 0 ? 'un' : '') + "assign the Project!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ' + (staff_id == 0 ? 'un' : '') + 'assign!'
    }, function (isConfirm) {
        if (isConfirm) {
//            if (!requiredValidation('task_assign_department_modal')) {
//                return false;
//            }
            if (document.getElementById("is_apply_next_recurrence").checked) {
                var is_apply = 'y';
            } else {
                var is_apply = 'n';
            }
            $.ajax({
                type: "POST",
                data: {
                    project_id: project_id,
                    user_type: user_type,
                    staff_id: staff_id,
                    department: dept_id,
                    is_apply: is_apply,
                    office_id: office_id
                },
                url: base_url + 'project/assign_project',
                cache: false,
                success: function (result) {
                    if (result != '') {
                        if (result == 0) {
                            var track_assign = 'label label-success';
                            var track_text = "Assign";
                        } else {
                            var track_assign = 'label label-assigned';
                            var track_text = result;
                        }
                        $('#project_assign_modal').modal('hide');
                        $("#project_assign_track-" + project_id).removeClass().addClass(track_assign);
                        $("#project_assign_track-" + project_id).parent('a').removeAttr('onclick');
                        $("#project_assign_track-" + project_id).parent('a').attr('onclick', 'show_project_assign_modal(' + project_id + ');');
                        $("#project_assign_track-" + project_id).html(track_text);
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
function get_partner_and_client_options(current_remove_element = '', reference = '') {
    var current_element = current_remove_element.id;
    var referred_by_options = $("#" + current_element).val();
    if (reference == 'referred_by') {
        if (referred_by_options == 12 || referred_by_options == 16) { /*12 : Client , 16 : Partner*/
            $("#project_type").removeAttr('multiple');
            $.ajax({
                type: "POST",
                data: {
                    referred_by_options: referred_by_options
                },
                url: base_url + 'project/get_project_partner_or_client',
                dataType: "html",
                success: function (result) {
                    /*console.log(result);return false;*/
                    $(".referred_by_value").show();
                    result = JSON.parse(result);
                    $("#referred_by_value").empty().trigger('chosen:updated');
                    for (const r in result) {
                        $("#referred_by_value").append(`<option value="${result[r].referred_by_name}">${result[r].referred_by_name}</option>`).trigger('chosen:updated');
                    }
                }
            });
        } else {
            $("#project_type").attr('multiple');
            $(".referred_by_value").hide();
        }
}

}
function project_recurrence_for_client(client_type = '', client_id = '') {
    swal({
        title: 'Are you sure?',
        text: "Generate Project Recurrence!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Generate!'
    }, function(isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: 'POST',
                data: {
                    client_type: client_type,
                    client_id: client_id
                },
                url: base_url + 'cron/project_recurrence_for_client.php',
                success: function (result) {    
                    if (result != '') {
                        swal({
                            title: "Success!",
                            text: result,
                            type: "success"
                        }, function () {
                            window.location.reload();
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
function project_template_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('project-template-filter-display-div'));
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
                let id_val = $('[name="' + active_element + '[]"]').attr('id');
                if (id_val == 'pattern_month') {
                    id_val = 'pattern';
                }
                let current_made_id = id_val + '-val';
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
            url: base_url + 'administration/template/project_template_sorting_filter_modal',
            data: {
                reference: reference
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                // console.log(result);

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
                        let id_val = $('[name="' + active_element + '[]"]').attr('id');
                        if (id_val == 'pattern_month') {
                            id_val = 'pattern';
                        }
                        let current_made_id = id_val + '-val';
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
                let id_val = $('[name="' + active_element + '[]"]').attr('id');
                if (id_val == 'pattern_month') {
                    id_val = 'pattern';
                }
                let current_made_id = id_val + '-val';
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
}
}
function loadProjectTeamplateDashboard() {
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/template/project_template_filter_dashboard',
        data: {
            template_id: 1
        },
        success: function (result) {
            //console.log(result);
            $("#ajax_dashboard_project_template").empty();
            $("#ajax_dashboard_project_template").append(result);
        }
    });
}
function project_template_filter_dashboard(reference_val = '') {
    if (reference_val != '') {
        $("#sorting_reference").val(reference_val);
    }
    $.post(base_url + 'administration/template/project_template_filter_ajax_dashboard', $(".myformtemplate").serialize()).done(function (data) {
        // console.log(data);
        $("#ajax_dashboard_project_template").empty();
        $("#ajax_dashboard_project_template").append(data);
        $("#bookkeeping_btn_clear_filter").show();
    });
}
function get_user_project_id(project_type = '', template_cat_id = '', reference = '') {
//    console.log(project_type);
    $.ajax({
        type: "POST",
        data: {
            type: project_type,
            template_cat_id: template_cat_id,
            reference: reference
        },
        url: base_url + 'project/get_user_project_id',
        dataType: "html",
        success: function (result) {
            $('#project_id_list').html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function assign_project_responsible_staff(project_id, resp_name) {
    // alert("hello");
    if (!requiredValidation('project_responsible_staff_assign_modal')) {
        return false;

    }
    var staff_id = $("#task_staff1").val();
    var dept_id = $("#assigned_department").val();
    var office_id = $("#office_id_select").val();
    swal({
        title: 'Are you sure?',
        text: "You want to make " + (staff_id == 0 ? 'un' : '') + " responsible for this Project!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ' + (staff_id == 0 ? 'un' : '') + 'assign!'
    }, function (isConfirm) {
        if (isConfirm) {
//            if (!requiredValidation('task_assign_department_modal')) {
//                return false;
//            }
            if (document.getElementById("is_apply_next_recurrence").checked) {
                var is_apply = 'y';
            } else {
                var is_apply = 'n';
            }
            $.ajax({
                type: "POST",
                data: {
                    project_id: project_id,
                    resp_name: resp_name,
                    staff_id: staff_id,
                    department: dept_id,
                    is_apply: is_apply,
                    office_id:office_id
                },
                url: base_url + 'project/assign_project_responsible_staff',
                cache: false,
                success: function (result) {
                    if (result != '') {
                        if (result == 0) {
                            var track_assign = 'label label-primary small-btn-width-one';
                            var track_text = "Assign";
                        } else {
                            var track_assign = 'label label-success small-btn-width-one';
                            var track_text = "Assigned";
                        }
                        $('#project_assign_modal').modal('hide');
                        $("#project_responsible-" + project_id).removeClass().addClass(track_assign);
                        $("#project_responsible-" + project_id).parent('a').removeAttr('onclick');
                        $("#project_responsible-" + project_id).parent('a').attr('onclick', 'show_responsible_staff_select_modal(' + project_id + ',' + resp_name + ');');
                        $("#project_responsible-" + project_id).html(track_text);
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
function goto_sos_result() {
    swal('ERROR', 'Please Clear SOS To Change Tracking.', 'error');
}
function goto_invoice_dashboard(invoice_id) {
    $.ajax({
        type: "POST",
        data: {
            invoice_id: invoice_id
        },
        url: base_url + 'project/check_connected_invoice_with_project',
        cache: false,
        success: function (result) {
            if (result.trim() != '') {
                goURL(base_url + 'billing/invoice/details/' + btoa(invoice_id));
            } else {
                swal('ERROR', 'Invoice Not Connected Of This Project.', 'error');
            }
        }
    });

}
function goto_task_dashboard_in_task_id(task_id = '', category = '') {
    if (!e)
        var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation)
        e.stopPropagation();
    var statusArray = category.split('-');
    openLoading();
    go('Task/index/' + category + '/' + statusArray[0] + '/' + task_id);
}
function show_project_history(project_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'project/get_project_history_details',
        data: {
            project_id: project_id,
        },
        success: function (result) {
            // console.log(result);return false;
            $("#showProjectHistory #project-history-modal-body").html(result);
            $('#showProjectHistory').modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
function connect_to_invoice(project_id = '') {
    swal({
        title: "Invoice Not Connected!",
        text: "You want to proceed to create Invoice?",
        type: "warning",
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Create New Invoice",
        showCancelButton: true,
        cancelButtonText: "Link Existing Invoice"
    }, function (isConfirm) {
        if (isConfirm) {
            /*console.log('test1');*/
            go_to_create_new_invoice(project_id)
        } else {
            /*console.log('test2');*/
            link_to_existing_invoice(project_id);
            $("#swal-close-div").remove();
        }
    });
    var closed_div_exists = $("#swal-close-div").html();
    if (closed_div_exists != '') {
        $("#swal-close-div").remove();
    }
    $('.sa-button-container').append('<div id="swal-close-div" style="cursor:pointer;"><i class="fa fa-3x fa-times-circle-o text-danger m-t-15" onclick="swal.close();"></i></div>');
}

function link_to_existing_invoice(project_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'project/link_to_existing_invoice/' + project_id,
        data: {
            project_id: project_id,
        },
        success: function (result) {
            // console.log(result);return false;
            if (result.trim() != '') {
                swal('Connected!', 'Invoice Connected To This Project.', 'success');
                window.open(base_url + 'billing/home/index/y/1/0/0/0/' + result.trim());
            } else {
                swal('ERROR', 'Invoice Not Match To This Project', 'info');
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
function go_to_create_new_invoice(project_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'project/create_new_invoice_through_project/',
        data: {
            project_id: project_id,
        },
        success: function (result) {
//             console.log(result);
            if (result.trim() != '') {
                data = JSON.parse(result);
                window.open(base_url + 'billing/invoice/index/' + 'y' + '/' + btoa(data.client_id) + '/' + btoa(data.client_type) + '/' + 'y' + '/' + data.category_id + '/' + data.service_id + '/' + data.id);
            } else {
                swal('ERROR', 'Faild To Create Invoice', 'info');
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
function update_project_data() {
    if (!requiredValidation('excel-form-project')) {
        return false;
    }

    var formData = new FormData(document.getElementById('excel-form-project'));

    swal({
        title: "Are you sure?",
        text: "You want to import!!",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-info",
        confirmButtonText: "Yes, import it!",
        closeOnConfirm: false
    },
            function () {
                swal.close();
                $.ajax({
                    type: 'POST',
                    url: base_url + 'project/import_project_tax_return_input_form4',
                    data: formData,
                    enctype: 'multipart/form-data',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (result) {
//                 alert(result);return false;
//console.log(result);
                        if (result.trim() == 1) {
                            swal({
                                title: "Success!",
                                text: "Successfully imported!",
                                type: "success"
                            }, function () {
//                        window.location.reload();
                                window.open(base_url + 'reports/project_missing_import_client');
                            });
                        } else if (result == 0) {
                            swal("ERROR!", "Client not found", "error");
                        } else if (result == 2) {
                            swal("ERROR!", "CSV Conversion failed", "error");
                        } else if (result == 3) {
                            swal("ERROR!", "Upload Failed", "error");
                        } else if (result == 4) {
                            swal("ERROR!", "File not selected", "error");
                        } else {
                            swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                        }
                    },
                    beforeSend: function () {
                        $(".save_btn").prop('disabled', true).html('Processing...');
                        openLoading();
                    },
                    complete: function (msg) {
                        $(".save_btn").removeAttr('disabled').html('Save Changes');
                        closeLoading();
                    }
                });
            });
}
function load_client_view_summary_box(category = '', template_cat_id = '', select_month = '', select_year = '', template_name = '', dashboard_type = '', query = '', filter_data = '', client_type = '', client_id = '', partner_id = '') {
    $.ajax({
        type: "POST",
        data: {
            'category': category,
            'template_cat_id': template_cat_id,
            'select_month': select_month,
            'select_year': select_year,
            'template_name': template_name,
            'dashboard_type': dashboard_type,
            'query': query,
            'filter_data': filter_data,
            'client_type': client_type,
            'client_id': client_id,
            'partner_id': partner_id
        },
        url: base_url + 'project/load_project_dashboard_summary_box',
        success: function (result) {
            $("#project_summary_box").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

var millisecound = 0;
var timer;
var counter =1;
function timeStart(projectId, taskID = '') {
    
    var start_val = new Date().toLocaleTimeString();
    $("#start_timer").val(start_val);
    millisecound = 0;
    //   if(millisecound != 0){
    //     swal("Already timer is running");pauseStart
    //   } else {
    if (taskID == '') {
        $("#start_" + projectId).hide();
        $("#pauseStart_" + projectId).hide();
        $("#pause_" + projectId).show();
        $("#reset_" + projectId).show();
        var watch = document.querySelector("#stopwatch_" + projectId);
    } else {
        $("#start_" + projectId + "_" + taskID).hide();
        $("#pauseStart_" + projectId + "_" + taskID).hide();
        $("#pause_" + projectId + "_" + taskID).show();
        $("#reset_" + projectId + "_" + taskID).show();
        var watch = document.querySelector("#stopwatch_" + projectId + "_" + taskID);
    }

    watch.style.color = "#D6FF4D";
    watch.innerHTML = start_val ;
   /* watch.innerHTML = start_val +"<img src='" + base_url +"assets/img/timer_recorded.gif' height= '20px' width='68px' style = 'padding-left:0px;'>";*/
    jQuery(window).bind('beforeunload', function () {
        return 'my text';
    });
}
function pauseStart(projectId, taskID = '') {
    
    if (taskID == '') {
        $("#start_" + projectId).hide();
        $("#pauseStart_" + projectId).hide();
        $("#pause_" + projectId).show();
        $("#reset_" + projectId).show();
        var watch = document.querySelector("#stopwatch_" + projectId);
    } else {
        $("#start_" + projectId + "_" + taskID).hide();
        $("#pauseStart_" + projectId + "_" + taskID).hide();
        $("#pause_" + projectId + "_" + taskID).show();
        $("#reset_" + projectId + "_" + taskID).show();
        var watch = document.querySelector("#stopwatch_" + projectId + "_" + taskID);
    }

    watch.style.color = "#D6FF4D";
    clearInterval(timer);
    timer = setInterval(() => {
        millisecound += 1000;
        let dateTimer = new Date(millisecound);
        watch.innerHTML =
                counter = counter+1;
//                ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
//                ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
//                ('0' + dateTimer.getUTCSeconds()).slice(-2);
    }, 1000);
    jQuery(window).bind('beforeunload', function () {
        return 'my text';
    });
}

function timePaused(projectId, taskID = '') {
    if (taskID == '') {
        $("#start_" + projectId).hide();
        $("#pauseStart_" + projectId).show();
        $("#pause_" + projectId).hide();
        $("#reset_" + projectId).hide();
        var watch = document.querySelector("#stopwatch_" + projectId);
    } else {
        $("#start_" + projectId + "_" + taskID).hide();
        $("#pauseStart_" + projectId + "_" + taskID).show();
        $("#pause_" + projectId + "_" + taskID).hide();
        $("#reset_" + projectId + "_" + taskID).hide();
        var watch = document.querySelector("#stopwatch_" + projectId + "_" + taskID);
    }
    watch.style.color = "red";
    clearInterval(timer);
}
function saveTime(projectId, taskID = '') {
    var end_val = new Date().toLocaleTimeString();
    var start_val = $("#start_timer").val();
    if (taskID == '') {
        $("#start_" + projectId).show();
        $("#pauseStart_" + projectId).hide();
        $("#pause_" + projectId).hide();
        $("#reset_" + projectId).hide();
        var watch = document.querySelector("#stopwatch_" + projectId);
    } else {
        $("#start_" + projectId + "_" + taskID).show();
        $("#pauseStart_" + projectId + "_" + taskID).hide();
        $("#pause_" + projectId + "_" + taskID).hide();
        $("#reset_" + projectId + "_" + taskID).hide();
        var watch = document.querySelector("#stopwatch_" + projectId + "_" + taskID);
    }
    $.ajax({
        type: "POST",
        data: {start_val: start_val,end_val: end_val ,projectId: projectId, taskID: taskID},
        url: base_url + 'project/insert_project_execution_time_table',
        success: function (result) {
            clearInterval(timer);
            millisecound = 0;
            counter =0;
            $.ajax({
                type: "POST",
                data: {projectId: projectId, taskID: taskID},
                url: base_url + 'project/get_project_execution_total_time',
                success: function (result1) {
                    watch.innerHTML = result1;
                }
            });
        }
    });
    jQuery(window).unbind('beforeunload');
}

function showTimeTracking(projectID, taskID = '',request_from='') {
    $.ajax({
        type: "POST",
        data: {projectId: projectID, taskID: taskID,request_from:request_from},
        url: base_url + 'project/showTimeTracking',
        success: function (tract) {
            $("#timeTracking").html(tract);
            $("#timeTracking").modal('show');
        }
    });
}
function Change_status(recordID,task_id='',project_id='',request_from='') {
    $.ajax({
        type: "POST",
        data: {recordID: recordID,task_id:task_id,project_id:project_id,request_from:request_from},
        url: base_url + 'project/changeRecordedTimeStatus',
        success: function (result) {
            var result = result.trim();
            if(result == ''){
                result = '00:00:00';
            }
            console.log(result);
                swal({
                    title: "Success!",
                    text: "Delete Successfully!",
                    type: "success"
                }, function () {
                    if(request_from=='task'){
                        $('#stopwatch_'+project_id+'_'+task_id).html(result);
                    }else{
                         $('#stopwatch_' + project_id).html(result);
                    }
                    $("#timeTracking").modal('hide');
                });
        }
    });
}

function bring_staffs(current_element, template_id) {
    var current_type = current_element.id;
    var office_id = $("#" + current_type).val();
    var assign_dept = $("#assign_dept_hidden").val();
    console.log(current_type);
    console.log(office_id);
    console.log(template_id);
    console.log(assign_dept); //return false;
    if (current_type == 'responsible_name' || current_type == 'all_project_staffs_assignto') {
        $.ajax({
            type: "POST",
            data: {
                'office_id': office_id,
                'template': template_id,
                'key': current_type,
                'assign_dept': assign_dept
            },
            url: base_url + 'project/bring_staffs',
            dataType: "html",
            success: function (result) {
                // console.log(current_type);
//                console.log('Result' + result);
                if (result != '') {
                    if (current_type == 'responsible_name') {
                        $("#responsible_staff").empty().trigger('chosen:updated');
                    }
                    if (current_type == 'all_project_staffs_assignto') {
                        $("#assignto_staff").empty().trigger('chosen:updated');
                    }
                    result = JSON.parse(result.trim());
                    for (const r in result) {
                        if (current_type == 'responsible_name') {
                            $("#responsible_staff").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                        }
                        if (current_type == 'all_project_staffs_assignto') {
                            $("#assignto_staff").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');

                        }
                    }
                } else {
                    //alert('acb');
                    if (current_type == 'responsible_name') {
                        $("#responsible_staff").empty().trigger('chosen:updated');
                    }
                    if (current_type == 'all_project_staffs_assignto') {
                        $("#assignto_staff").empty().trigger('chosen:updated');
                    }
                }
            }
        });
    }
}
function choose_assign_department(current_element, template_cat_id) {
    var current_type = current_element.id;
    var assign_dept_id = $("#" + current_type).val();
    $("#assign_dept_hidden").val(assign_dept_id);
    $("#responsibl_dept_hidden").val(assign_dept_id);
    console.log(current_type);
    console.log(assign_dept_id);
    $.ajax({
        type: "POST",
        data: {
            'assign_dept_id': assign_dept_id,
            'template_cat_id': template_cat_id,
            'key': current_type
        },
        url: base_url + 'project/project_assign_department',
        dataType: "html",
        success: function (result) {
            // console.log(current_type);
                console.log('Result' + result);
            if (result != '') {
                console.log('1');
                if (current_type == 'responsible_department') {
                    $("#responsible_name").empty().trigger('chosen:updated');
                    $("#responsible_staff").empty().trigger('chosen:updated');
                }
                if (current_type == 'assign_department') {
                    $("#all_project_staffs_assignto").empty().trigger('chosen:updated');
                    $("#assignto_staff").empty().trigger('chosen:updated');
                }
                result = JSON.parse(result.trim());
                for (const r in result) {
                    if (current_type == 'responsible_department') {
                        $("#responsible_name").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                    }
                    if (current_type == 'assign_department') {
                        $("#all_project_staffs_assignto").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                    }
                }
                
            } else {
                alert('acb');
                if (current_type == 'responsible_department') {
                    $("#responsible_name").empty().trigger('chosen:updated');
                    $("#responsible_staff").empty().trigger('chosen:updated');
                }
                if (current_type == 'assign_department') {
                    $("#all_project_staffs_assignto").empty().trigger('chosen:updated');
                    $("#assignto_staff").empty().trigger('chosen:updated');
                }
            }
        }
    });
}
function check_recurrence_status(is_recurrence){
    if($('#without_recurrence').is(':checked')){
        $("#confirmation").attr("disabled", true);
        $("#confirmation").attr('checked', false);
    }else{
        $("#confirmation").attr("disabled", false);
    }
}
function banktimerecordStart(bank_id) {
    var start_val = new Date().toLocaleTimeString();
    $("#start_timer").val(start_val);
    $("#start_" + bank_id).hide();
    $("#reset_" + bank_id).show();
    var watch = document.querySelector("#bankstopwatch_" + bank_id);
    watch.style.color = "#D6FF4D";
    watch.innerHTML = start_val ;
    jQuery(window).bind('beforeunload', function () {
        return 'my text';
    });
}
function saveBankRecordTime(bank_id,task_id='',project_id='') {
    var end_val = new Date().toLocaleTimeString();
    var start_val = $("#start_timer").val();
    $("#start_" + bank_id).show();
    $("#reset_" + bank_id).hide();
    var watch = document.querySelector("#bankstopwatch_" + bank_id);
    $.ajax({
        type: "POST",
        data: {start_val: start_val,end_val: end_val , task_id: task_id,bank_id:bank_id,project_id:project_id},
        url: base_url + 'project/insert_project_bookkeeping_record_time',
        success: function (result) {
            $.ajax({
                type: "POST",
                data: {task_id: task_id,bank_id:bank_id},
                url: base_url + 'project/get_project_bookkeeping_record_total_time',
                success: function (result1) {
                    watch.innerHTML = result1;
                }
            });
        }
    });
    jQuery(window).unbind('beforeunload');
}
function showBookkeepingBankTimeTracking(bank_id) {
    $.ajax({
        type: "POST",
        data: {bank_id:bank_id},
        url: base_url + 'project/showTimeTracking',
        success: function (tract) {
            $("#timeTracking").html(tract);
            $("#timeTracking").modal('show');
        }
    });
}
function taxReturnRecordStart(task_id) {
    var start_val = new Date().toLocaleTimeString();
    $("#start_timer").val(start_val);
    $("#start_" + task_id).hide();
    $("#reset_" + task_id).show();
    var watch = document.querySelector("#taxstopwatch_" + task_id);
    watch.style.color = "#D6FF4D";
    watch.innerHTML = start_val ;
    jQuery(window).bind('beforeunload', function () {
        return 'my text';
    });
}
function saveTaxReturnRecordTime(task_id='',project_id='') {
    var end_val = new Date().toLocaleTimeString();
    var start_val = $("#start_timer").val();
    $("#start_" + task_id).show();
    $("#reset_" + task_id).hide();
    var watch = document.querySelector("#taxstopwatch_" + task_id);
    $.ajax({
        type: "POST",
        data: {start_val: start_val,end_val: end_val , task_id: task_id,project_id:project_id},
        url: base_url + 'project/insert_project_tax_return_record_time',
        success: function (result) {
            $.ajax({
                type: "POST",
                data: {task_id: task_id},
                url: base_url + 'project/get_project_tax_return_record_total_time',
                success: function (result1) {
                    watch.innerHTML = result1;
                }
            });
        }
    });
    jQuery(window).unbind('beforeunload');
}
function collect_project_data_by_template_id(template_id,section_id,pattern) {
    var project_will_create = $("#will_create_project_"+section_id).is(":checked");
    if (project_will_create) {
        $.ajax({
            type: "POST",
            data: {template_id:template_id,section_id:section_id,pattern:pattern},
            url: base_url + 'project/collect_project_data_by_template_id',
            success: function (result) {
                $("#project_recurrence_info_"+section_id).html(result);                        
            }
        });
    }
}
function upload_file_at_azure_from_input_form(form_name='') {
    console.log(form_name);
    if (!requiredValidation(form_name)) {
        return false;
    }
    var form_data = new FormData(document.getElementById(form_name));
    
    var brand = $("#brand").val().trim();
    var franchise = $("#client_office").val().trim();
    var client_type = $("#project_client_type").val().trim();
    var client_id = $("#client_list_ddl_file_cabinet").val().trim();
    var folder_name = $("#document_type option:selected").text();
    
    var document_sub_type = $("#document_sub_type option:selected").text();
    if (document_sub_type !== undefined) {
        document_sub_type_text = document_sub_type.replace(/ /g,"_").toLowerCase().trim();
    }
    var staff_id = $("#staff_id").val();
    var document_name = $("#doc_file").val().replace(/C:\\fakepath\\/i, '');

    if (folder_name !== undefined) {
        folder_name = folder_name.trim();
        folder_name_lower_case = folder_name.replace(/ /g,"_").toLowerCase();
    }
    var file_list_url = $("#document_type option:selected").val();
    if (file_list_url !== undefined) {
        file_list_url = file_list_url.trim();
    }
    // console.log(folder_name_lower_case);
    var arrival_date = $("#arrival_date").val();
    var priority = $("#prioritydiv").val();
    var priority_text = $("#prioritydiv").text();
    var government_agency = $("#government_agencydiv option:selected").val();
    var government_agency_text = $("#government_agencydiv option:selected").text();
    var state = $("#statediv").val();
    var state_text = $("#statediv").text();
    var frequency = $("#frequencydiv option:selected").val();
    var frequency_text = $("#frequencydiv option:selected").text();
    var period = $("#perioddiv option:selected").val();
    var period_text = $("#perioddiv option:selected").text();
    var year = $("#yeardiv option:selected").val();
    var year_text = $("#yeardiv option:selected").text();
    var bank_name = $("#bank_namediv option:selected").val();
    var bank_name_text = $("#bank_namediv option:selected").text();
    var account_last_4 = $("#account_last_4").val();
    var description = $("#description").val();
    var name = $("#name").val();
    var api_data = '',file_name = '',statement = '';
    if (folder_name_lower_case == 'bank_statements') {
        if (document_sub_type_text == 'bank_statements') {
            statement = 'Statement';
        } else {
            statement = 'Letter';
        }
        file_name = statement+'-'+bank_name_text.trim().replace(/ /g,"_")+'-'+account_last_4.trim().replace(/ /g,"_")+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':document_sub_type,'Modified_x0020_By':staff_id,'FrequencyId':frequency.trim(),'YearId':year.trim(),'Bank_x0020_NameId':bank_name.trim(),'PeriodId':period.trim(),'Account_x0020_Last_x0020_4':account_last_4.trim()};
    } else if (folder_name_lower_case == 'billing_information') {
        if (document_sub_type_text == 'invoice') {
            statement = 'Invoice';
        } else if (document_sub_type_text == 'payments') {
            statement = 'Payment';
        } else if (document_sub_type_text == 'proposal') {
            statement = 'Proposal';
        } else {
            statement = 'Collection_Notice';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':document_sub_type,'Modified_x0020_By':staff_id,'FrequencyId':frequency.trim(),'YearId':year.trim(),'PeriodId':period.trim()};
    } else if (folder_name_lower_case == 'government_correspondence') {
        file_name = document_name.trim()+'-'+government_agency_text.trim()+'-'+state.trim()+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Government_x0020_AgencyId':government_agency.trim(),'StateId':state.trim(),'FrequencyId':frequency.trim(),'YearId':year.trim(),'PeriodId':period.trim()};
    } else if (folder_name_lower_case == 'mailing_correspondance') {
        file_name = document_name.trim()+'-'+priority_text.trim()+'-'+arrival_date;
        api_data = {'__metadata':{'type':'SP.ListItem'},'PriorityId':priority.trim(),'Arrival_x0020_Date':arrival_date};
    } else if (folder_name_lower_case == 'bookkeeping_documents') {
        if(document_sub_type_text.trim() == 'profit_&_loss'){
            statement = 'ProfitLoss';
        } else if(document_sub_type_text.trim() == 'balance_sheet'){
            statement = 'BalanceSheet';
        } else if(document_sub_type_text.trim() == 'general_ledger'){
            statement = 'Ledger';
        } else{
            statement = 'Balance';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':statement,'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'sales_tax_documents') {
        
        if(document_sub_type_text.trim() == 'sales_tax_certificate'){
            statement = 'Certificate';
        } else if(document_sub_type_text.trim() == 'sales_tax_processing'){
            statement = 'Processing';
        } else if(document_sub_type_text.trim() == 'receipt'){
            statement = 'Receipt';
        } else{
            statement = 'Form';
        }
        if(document_sub_type_text.trim() == 'sales_tax_certificate'){
            file_name = statement+'-'+year_text.trim().replace(/ /g,"_");
        }else{
            file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        }
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'internal_documents'){
        if(document_sub_type_text.trim() == 'internal_communication'){
            statement = 'Internal';
        } else{
            statement = 'Personal';
        }
        file_name = statement+'-'+description.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Description':description.trim()};
    } else if(folder_name_lower_case == 'tax_return_documents'){
        if(document_sub_type_text == 'federal_tax_return'){
            statement = 'FederalReturn';
        } else if(document_sub_type_text == 'state_tax_return'){
            statement = 'StateReturn';
        } else if(document_sub_type_text == 'k-1'){
            statement = 'K1';
        } else{
            statement = 'PaymentNotice';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'StateId':state.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'corporate_documents'){
        if(document_sub_type_text == 'incorporate_documents'){
            statement = 'Incorporation';
        } else if(document_sub_type_text == 'ownership_documents'){
            statement = 'Ownership';
        } else if(document_sub_type_text == 'annual_renewals'){
            statement = 'AnnualReport';
        } else{
            statement = 'OwnershipId';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'payroll_information'){
        if(document_sub_type_text == 'paystub'){
            statement = 'Paystub';
        } else if(document_sub_type_text == 'w2'){
            statement = 'W2';
        } else if(document_sub_type_text == 'w3'){
            statement = 'W3';
        } else if(document_sub_type_text == 'w4'){
            statement = 'W4';
        } else if(document_sub_type_text == '1099'){
            statement = '1099';
        } else if(document_sub_type_text == '1096'){
            statement = '1096';
        } else if(document_sub_type_text == '940'){
            statement = '940';
        } else if(document_sub_type_text == '941'){
            statement = '941';
        } else if(document_sub_type_text == '944'){
            statement = '944';
        }else {
            statement = 'Unemployment';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_")+'-'+state.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'StateId':state.trim(),'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'employee_information'){
         if(document_sub_type_text == 'paystub'){
            statement = 'Paystub';
        } else if(document_sub_type_text == 'identification'){
            statement = 'ID';
        } else if(document_sub_type_text == 'w4'){
            statement = 'W4';
        } else if(document_sub_type_text == '1099'){
            statement = '1099';
        } else if(document_sub_type_text == 'i-9'){
            statement = 'I9';
        } else if(document_sub_type_text == 'employee_contract'){
            statement = 'Contract';
        } else if(document_sub_type_text == 'termination_letter'){
            statement = 'Termination';
        } else {
            statement = 'NonComplete';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_")+'-'+name.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Employee_x0020_Name':name.trim(),'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else {
        
    }
    // console.log(api_data);return false;
    // console.log(client_info);
    api_data = JSON.stringify(api_data);
    /*console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id+'/'+folder_name+'/'+file_list_url+'/'+file_name+'/'+api_data);*/
    var client_info = {"brand":brand,"franchise":franchise,"client_type":client_type,"client_id":client_id,"file_list_url":file_list_url,"folder_name":folder_name,"file_name":file_name,"api_data":api_data };
    client_info = JSON.stringify(client_info);
    /*console.log(client_info);return false;*/
    form_data.append('client_info',client_info);
    $.ajax({
        async: true,
        crossDomain: true,
        type: "POST",
        data: form_data,
        // url: "https://localhost:44310/api/SharePoint/UploadFileAsync",
        url: "https://dev2.taxleaf.com:9099/api/SharePoint/UploadFileAsync",
        dataType: "html",
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        cache: false,
        success: function (result) {
            /*console.log(result);*/
            if (result == -1) {
                alert("Error Processing Data");
            } else {
                swal({
                    title: "Success!",
                    text: "File Uploaded Successfully!",
                    type: "success"
                }, function () {
                    window.location.reload();
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