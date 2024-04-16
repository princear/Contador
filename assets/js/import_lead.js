var base_url = document.getElementById('base_url').value;

function insert_import_lead() {
    var atLeastOneIsChecked = $('input[name="import_lead[]"]:checked').length > 0;
    var rejectListChecked = $('input[name="reject_import_lead[]"]:checked').length > 0;
//    if (atLeastOneIsChecked == false) {
//        swal("ERROR!", "Please check at least one lead for import", "error");
//    } else {
        var form_data = new FormData(document.getElementById('import_lead_form'));
        var lead_count = $('input[name="import_lead[]"]:checked').length;
        var reject_lead_count = $('input[name="reject_import_lead[]"]:checked').length;
//        console.log(form_data);
        $.ajax({
            type: "POST",
            data: form_data,
            url: base_url + 'administration/get_leads/insert_import_lead',
            dataType: "html",
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                //alert(result); return false;
                if (result == "1") {
                    swal({title: "Success!", text: "Successfully Imported!", type: "success"}, function () {
                        $("#import_lead_div").html('<span class="text-info">' + lead_count + ' Leads Successfully Imported</span>');
                    });
                } else {
                    swal("ERROR!", "Unable To Import Leads", "error");
                }
            }
        });
}
function load_import_lead_dashboard() {
    $.ajax({
        type: "POST",
        data: {
        },
        cache: false,
        url: base_url + 'administration/get_leads/load_import_lead_ajax_dashboard',
        success: function (result) {
            $("#load_import_lead_data").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function lead_import_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('import-lead-filter-display-div'));
    // var val = form_data.getAll(name);
//     console.log(form_data);
    $("#import-lead-filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    /*console.log(previous_filter);*/
    $("#import-lead-filter-variable").val(reference);
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
                let current_made_id = id_val + '-val';
                $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
            }
        }
        $("#value-display").empty();
        $("#import-lead-filter-variable").val('');
        $(".display-filter-div").hide();
        return false;
    }
    var check_div_element = $("#" + current_element.id + "-display").html();
    if (check_div_element == '') {
        $.ajax({
            type: 'POST',
            url: base_url + 'modal/lead_import_sorting_filter_modal',
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
                        let id_val = $('[name="' + active_element + '[]"]').attr('id');
                        
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
                let current_made_id = id_val + '-val';
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
    }
}
function import_lead_filter(is_clear = '', current_clear_element = '') {
    var filter_element = $("#import-lead-filter-variable").val();
    if (is_clear != '') {
        var clear_element = current_clear_element.id;
        console.log(clear_element);

        let removavle_element = $("#import-lead-filter-field-variable").val();
        console.log(removavle_element);
        
        $("#" + removavle_element).val('').trigger('chosen:updated');
        $("#" + clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('import-lead-filter-display-div'));
    //console.log(form_data); return false;
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'lead_name') {
            var id = 'lead_name-val';
            if (is_clear == '') {
                $("#lead_name-clear_filter").show();
            }
        }
        if (a == 'city') {
            var id = 'city-val';
            if (is_clear == '') {
                $("#city-clear_filter").show();
            }
        }
        if (a == 'email') {
            var id = 'email';
            if (is_clear == '') {
                $("#email-clear_filter").show();
            }
        }
        if (a == 'lead_source_detail') {
            var id = 'lead_source_detail-val';
            if (is_clear == '') {
                $("#lead_source_detail-clear_filter").show();
            }
        }
        if (a == 'category_name') {
            var id = 'category_name-val';
            if (is_clear == '') {
                $("#category_name-clear_filter").show();
            }
        }
        if (a == 'language_name') {
            var id = 'language_name-val';
            if (is_clear == '') {
                $("#language_name-clear_filter").show();
            }
            $("#" + id).removeClass('btn-success').addClass('btn-primary');
        }
        if (a == 'submission_date') {
            var id = 'submission_date-val';
            if (is_clear == '') {
                $("#submission_date-clear_filter").show();
            }
        }
    }
    
//    var lead_name = $("#lead_name").val();
//    if (lead_name == undefined) {
//        lead_name = '';
//    }
//    var email = $("#email").val();
//    if (email == undefined) {
//        email = '';
//    }
//    var city = $("#city").val();
//    if (city == undefined) {
//        city = '';
//    }
//    var lead_source_detail = $("#lead_source_detail").val();
//    if (lead_source_detail == undefined) {
//        lead_source_detail = '';
//    }
//    var category_name = $("#category_name").val();
//    if (category_name == undefined) {
//        category_name = '';
//    }
//    var language_name = $("#language_name").val();
//    if (language_name == undefined) {
//        language_name = '';
//    }
//    var submission_date = $("#submission_date").val();
//    if (submission_date == undefined) {
//        submission_date = '';
//    }
//    form_data.append('lead_name', lead_name);
//    form_data.append('email', email);
//    form_data.append('city', city);
//    form_data.append('lead_source_detail', lead_source_detail);
//    form_data.append('category_name', category_name);
//    form_data.append('language_name', language_name);
//    form_data.append('submission_date', submission_date);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/get_leads/import_lead_filter/',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $("#load_import_lead_data").html(result);
            $('#import_lead_clear_filter').show();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function clear_import_lead_advance_search() {
    go('administration/get_leads/import_lead');
}
function remove_import_lead_filter_element(current_remove_element = '', reference = '') {
    var clear_element = current_remove_element.id;
    var value = $("#" + clear_element).val();
    if (value == null) {
        var current_clear_element = clear_element + '-clear_filter';
        $("#" + current_clear_element).hide();
    }
}
function sort_import_lead_dashboard(sort_type = '', sort_val = '') {
    var sort_type = sort_type.value;
    var filter_data = $("#filter_data").val();
    if (filter_data == undefined) {
        filter_data = '';
    }
    var form_data = new FormData(document.getElementById('import-lead-filter-display-div'));
   
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_val);
    form_data.append('filter_data', filter_data);
    
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/get_leads/sort_import_lead_dashboard',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (result) {
            var data = JSON.parse(result);
            $("#load_import_lead_data").html(data.result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (action_result) {
            closeLoading();
        }
    });
}
function change_lead_responsible(lead_manager_id='',lead_id='',office_id=''){
    console.log(lead_manager_id);
    console.log(lead_id);
    console.log(office_id);
    $.ajax({
        type: 'POST',
        url: base_url + 'administration/get_leads/show_import_lead_responsible_office_staff_list',
        data: {
            lead_manager_id:lead_manager_id,
            lead_id:lead_id,
            office_id:office_id
        },
        success: function (result) {
            $('#import_lead_responsible_div').show();
            $('#import_lead_responsible_div').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
function update_import_lead_responsible_staff(lead_id){
    if (!requiredValidation('import_lead_responsible_modal')) {
        return false;
    }
    var staff_id = $("#responsible_staff").val();
    swal({
        title: 'Are you sure?',
        text: "You want to make responsible for this Lead!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes assign!'
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                data: {
                    lead_id: lead_id,
                    staff_id: staff_id
                },
                url: base_url + 'administration/get_leads/assign_import_lead_responsible_staff',
                cache: false,
                success: function (result) {
                    if (result.trim() != '') {
                        console.log(result);
                        $('#import_lead_responsible_div').modal('hide');
                        $("#responsible_lead_staff").html(result);
                    }
                }
            });
        }
    });
}