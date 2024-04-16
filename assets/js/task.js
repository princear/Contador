$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
function loadTaskDashboard_old(status, request, priority, officeID, departmentID, filter_assign, filter_data, sos_value, sort_criteria, sort_type, client_type, client_id, clients, pageNumber = 0, template_cat_id = '', template_name = '', task_ids = '', user_id = '', month = '', year = '', dashboard_type = '', query = '') {
//    alert(dashboard_type);
    if (year == '') {
        var year = $('#select_year').val();
    }
    if (month == '') {
        var month = $("#select_month").val();
    }

    $.ajax({
        type: "POST",
        data: {
            status: status,
            request: request,
            priority: priority,
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
            template_name: template_name,
            task_ids: task_ids,
            user_id: user_id,
            month: month,
            year: year,
            dashboard_type: dashboard_type,
            query: query
        },
        url: base_url + 'task/task_dashboard_ajax',
        success: function (task_result) {
            if (task_result.trim() != '') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $("#task_dashboard_div").html(task_result);
                    //$("a.filter-button span:contains('-')").html(0);
                } else {
                    $("#task_dashboard_div").append(task_result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                $(".status-dropdown").val(status);
                $(".request-dropdown").val(request);
                $("[data-toggle=popover]").popover();
            }
            if (status != '' || status == '0' || sos_value != '') {
                $('#clear_task_advanced_filter').show();
            } else {
                $('#clear_task_advanced_filter').hide();
            }
            if (template_name != '') {
                $('#clear_task_advanced_filter').show();
            }
            if (query != '') {
                $('#clear_task_advanced_filter').show();
            }
//            var filter_result = '';
//            if (filter_result != '') {
//                $("#clear_filter").html(filter_result + ' &nbsp; ');
//                $("#clear_filter").show();
//                $('#clear_task_advanced_filter').show();
//            } else {
//                $("#clear_filter").html('');
//                $("#clear_filter").hide();
//                $('#clear_task_advanced_filter').hide();
//            }
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
            jumpDiv();
            if (clients == 'clients') {
                $("#task_dashboard_div").find(".clearfix").remove();
            }
        }
    });
}
function change_project_status_inner(input_form_status, status, section_id, project_id = '', task_order = '', is_input_form = '') {
    if (!e)
        var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation)
        e.stopPropagation();
    openModal('changeStatusinner');
    var txt = 'Task ID - #' + project_id + '-' + task_order;
    $("#changeStatusinner .modal-title").html(txt);
    if (status == 0) {
        $("#changeStatusinner #rad0").prop('checked', true);
        $("#changeStatusinner #rad1").prop('checked', false);
        $("#changeStatusinner #rad2").prop('checked', false);
        $("#changeStatusinner #rad3").prop('checked', false);
        $("#changeStatusinner #rad4").prop('checked', false);
        $("#changeStatusinner #rad5").prop('checked', false);
    } else if (status == 1) {
        $("#changeStatusinner #rad1").prop('checked', true);
        $("#changeStatusinner #rad0").prop('checked', false).attr('disabled', true);
        $("#changeStatusinner #rad2").prop('checked', false);
        $("#changeStatusinner #rad3").prop('checked', false);
        $("#changeStatusinner #rad4").prop('checked', false);
        $("#changeStatusinner #rad5").prop('checked', false);
    } else if (status == 2) {
        $("#changeStatusinner #rad2").prop('checked', true);
        $("#changeStatusinner #rad1").prop('checked', false);
        $("#changeStatusinner #rad0").prop('checked', false).attr('disabled', true);
        $("#changeStatusinner #rad3").prop('checked', false).attr('disabled', true);
        $("#changeStatusinner #rad4").prop('checked', false);
        $("#changeStatusinner #rad5").prop('checked', false);
    } else if (status == 3) {
        $("#changeStatusinner #rad3").prop('checked', true);
        $("#changeStatusinner #rad5").prop('checked', false);
        $("#changeStatusinner #rad4").prop('checked', false);
        $("#changeStatusinner #rad2").prop('checked', false);
        $("#changeStatusinner #rad1").prop('checked', false);
        $("#changeStatusinner #rad0").prop('checked', false).attr('disabled', true);
    } else if (status == 4) {
        $("#changeStatusinner #rad4").prop('checked', true);
        $("#changeStatusinner #rad5").prop('checked', false);
        $("#changeStatusinner #rad3").prop('checked', false).attr('disabled', true);
        $("#changeStatusinner #rad2").prop('checked', false).attr('disabled', true);
        $("#changeStatusinner #rad1").prop('checked', false).attr('disabled', true);
        $("#changeStatusinner #rad0").prop('checked', false).attr('disabled', true);
    }
//        else if (status == 5) {
//            $("#changeStatusinner #rad5").prop('checked', true);
//            $("#changeStatusinner #rad4").prop('checked', true).attr('disabled',true);
//            $("#changeStatusinner #rad3").prop('checked', false).attr('disabled',true);
//            $("#changeStatusinner #rad2").prop('checked', false).attr('disabled',true);
//            $("#changeStatusinner #rad1").prop('checked', false).attr('disabled',true);
//            $("#changeStatusinner #rad0").prop('checked', false).attr('disabled',true);
//        }
    $.get($('#baseurl').val() + "project/get_project_tracking_log/" + section_id + "/project_task", function (data) {
        $("#status_log > tbody > tr").remove();
        var returnedData = JSON.parse(data);
        for (var i = 0, l = returnedData.length; i < l; i++) {
            // $('#status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["stuff_id"] + "</td>" + "<td>" + returnedData[i]["department"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>" + "<td>" + returnedData[i]["created_time"] + "</td></tr>");
            $('#status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["stuff_id"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>" + "<td>" + returnedData[i]["created_time"] + "</td></tr>");
        }
        if (returnedData.length >= 1)
            $("#log_modal").show();
        else
            $("#log_modal").hide();
    });
    $("#changeStatusinner #prosubid").val(section_id);
    $('#input_form_status').val(input_form_status);
    $("#is_input_form").val(is_input_form);
    $("#changeStatusinner #project_id").val(project_id);
    $("#changeStatusinner #task_order").val(task_order);
}
//    function updateProjectStatusinner(type = '') {
//        var statusval = $('#changeStatusinner input:radio[name=radio]:checked').val();
//        var prosubid = $('#changeStatusinner #prosubid').val();
////        alert(prosubid);
//        var base_url = $('#baseurl').val();
//        $.ajax({
//            type: "POST",
//            data: {statusval: statusval, prosubid: prosubid},
//            url: base_url + 'project/update_project_task_status',
//            dataType: "html",
//            success: function (result) {
////                alert(result);return false;
//                if (result.trim() != 0) {
//                    $("#changeStatusinner").modal('hide');
////                    return false;
//                    //swal("Success!", "Successfully updated!", "success");
//                    if (type == 'task') {
//                        goURL(base_url + 'task');
//                    } else {
//                        goURL(base_url + 'project');
//                    }
//                }
//            }
//        });
//    }

var variableArray = [];
var elementArray = [];
function changeVariableTask(element, template_cat_id = '') {
    var divID = $(element).parent().parent().attr('id');
    var variableValue = $(element).children("option:selected").val();
//        alert(variableValue);
    var checkElement = elementArray.includes(element);
    var officeValue = '';
    if (checkElement == true) {
        variableArray.pop();
        variableArray.push(variableValue);
    } else {
        elementArray.push(element);
        variableArray.push(variableValue);
    }
//    if (variableValue == 4) {
//        var checkOfficeValue = variableArray.includes('3');
//        if (checkOfficeValue == true) {
//            officeValue = $("select[name='criteria_dropdown[office][]']").val();
//        }
//    }
    $.ajax({
        type: "POST",
        data: {
            variable: variableValue,
            office: officeValue,
            template_cat_id: template_cat_id
        },
        url: base_url + 'task/task_filter_dropdown_option_ajax',
        dataType: "html",
        success: function (result) {
            $("#" + divID).find('.criteria-div').html(result);
            $(".chosen-select").chosen();
            $("#" + divID).find('.condition-dropdown').val('');
            $("#" + divID).nextAll(".filter-div").each(function () {
                $(this).find('.remove-filter-button').trigger('click');
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
function changeTaskCondition(element, template_cat_id = '') {
    var divID = $(element).parent().parent().attr('id');
    //alert(divID);
    var conditionValue = $(element).children("option:selected").val();
    var variableValue = $(element).parent().parent().find(".variable-dropdown option:selected").val();
    if (variableValue == 9) {
        if (conditionValue == 2 || conditionValue == 4) {
            $.ajax({
                type: "POST",
                data: {
                    condition: conditionValue,
                    variable: variableValue,
                    template_cat_id: template_cat_id
                },
                url: base_url + 'task/task_filter_dropdown_option_ajax',
                dataType: "html",
                success: function (result) {
                    $("#" + divID).find('.criteria-div').html(result);
                },
                beforeSend: function () {
                    openLoading();
                },
                complete: function (msg) {
                    closeLoading();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                data: {
                    variable: variableValue
                },
                url: '<?//= base_url(); ?>' + 'task/task_filter_dropdown_option_ajax',
                dataType: "html",
                success: function (result) {
                    $("#" + divID).find('.criteria-div').html(result);
                },
                beforeSend: function () {
                    openLoading();
                },
                complete: function (msg) {
                    closeLoading();
                }
            });
        }
    } else {
        if (conditionValue == 2 || conditionValue == 4) {
            $("#" + divID).find(".criteria-dropdown").chosen("destroy");
            $("#" + divID).find(".criteria-dropdown").attr("multiple", "");
            $("#" + divID).find(".criteria-dropdown").chosen();
            $("#" + divID).find(".search-choice-close").trigger('click');
        } else {
            $("#" + divID).find(".criteria-dropdown").removeAttr('multiple');
            $("#" + divID).find(".criteria-dropdown").chosen("destroy");
            $("#" + divID).find(".criteria-dropdown").val('');
            $("#" + divID).find(".criteria-dropdown").chosen();
            $("#" + divID).find(".search-choice-close").trigger('click');
        }
}
}
function addTaskFilterRow() {
    var content = $(".filter-div").html();
    var random = Math.floor((Math.random() * 999) + 1);
    var clone = '<div class="filter-div row m-b-20" id="clone-' + random + '">' + content + '<div class="col-sm-1 text-center p-l-0"><a href="javascript:void(0);" onclick="removeTaskFilterRow(' + random + ')" class="remove-filter-button text-danger btn btn-white" data-toggle="tooltip" title="Remove filter" data-placement="top"><i class="fa fa-times" aria-hidden="true"></i> </a></div></div>';
    $('.filter-inner').append(clone);
    $.each(variableArray, function (key, value) {
        $("#clone-" + random + " .variable-dropdown option[value='" + value + "']").remove();
    });
    $("div.add_filter_div:not(:first)").remove();
    $("#clone-" + random).find(".variable-dropdown").removeAttr('readonly').attr("style", "pointer-events: block;");
    $("#clone-" + random).find(".condition-dropdown").removeAttr('readonly').attr("style", "pointer-events: block;");
    $("#clone-" + random).find(".criteria-dropdown").html("<option value=''>All Criteria</option>");
    $("#clone-" + random).find(".criteria-dropdown").removeAttr('readonly');
}
function removeTaskFilterRow(random) {
    var divID = 'clone-' + random;
    var variableDropdownValue = $("#clone-" + random + " .variable-dropdown option:selected").val();
    var index = variableArray.indexOf(variableDropdownValue);
    variableArray.splice(index, 1);
    $("#" + divID).remove();
}
function reflactTaskFilterWithCategory(category, requestType = '') {
    var statusArray = category.split('-');
    show_task_template_name(statusArray[0]);
    clearTaskFilter();
    variableArray = [];
    elementArray = [];
    $("select.variable-dropdown:first").val(4).attr('readonly', 'readonly').attr("style", "pointer-events: none;");
    $('select.criteria-dropdown:first').empty().html('<option value="' + statusArray[0] + '">' + statusArray[1] + '</option>').attr({
        'readonly': true,
        'name': 'criteria_dropdown[template_cat_id][]'
    });
    $("select.criteria-dropdown:first").trigger("chosen:updated");
    $("select.condition-dropdown:first").val(1).attr('readonly', 'readonly').attr("style", "pointer-events: none;");
    elementArray.push($("select.condition-dropdown:first").val(1));
    variableArray.push(4);
    if (requestType != '') {
        addTaskFilterRow();
        $("select.variable-dropdown:eq(1)").val(3);
        var requestTypeArray = requestType.split('-');
        $('select.criteria-dropdown:eq(1)').empty().html('<option value="' + requestTypeArray[0] + '">' + requestTypeArray[1] + '</option>').attr({
            'readonly': true,
            'name': 'criteria_dropdown[tracking_description][]'
        });
        $("select.criteria-dropdown:eq(1)").trigger("chosen:updated");
        $("select.condition-dropdown:eq(1)").val(1).attr('disabled', true);
        elementArray.push($("select.condition-dropdown:eq(1)"));
        variableArray.push(3);
    }
    if (statusArray[1] == 'bookkeeping') {
        $('#cat').val(statusArray[0] + '-' + statusArray[1]);
        $("#clear_cat_id").val(statusArray[0]);
    } else if (statusArray[1] == 'tax_returns') {
        $('#cat').val(statusArray[0] + '-' + statusArray[1]);
        $("#clear_cat_id").val(statusArray[0]);
    } else if (statusArray[1] == 'sales_tax') {
        $('#cat').val(statusArray[0] + '-' + statusArray[1]);
        $("#clear_cat_id").val(statusArray[0]);
    } else if (statusArray[1] == 'annual_report') {
        $('#cat').val(statusArray[0] + '-' + statusArray[1]);
        $("#clear_cat_id").val(statusArray[0]);
    } 
//    else if (statusArray[1] == 'payroll') {
//        $('#cat').val(statusArray[0] + '-' + statusArray[1]);
//        $("#clear_cat_id").val(statusArray[0]);
//    }
    if (requestType != '') {
        display_task_applied_filters();
}
}

function show_task_template_name(template_cat_id) {
    var template_name = $("#template_name").val();
    var select_month = $("#select_month").val();
    var select_year = $("#select_year").val();

    $.ajax({
        type: "POST",
        data: {
            template_cat_id: template_cat_id,
            template_name: template_name,
            select_month: select_month,
            select_year: select_year
        },
        url: base_url + 'task/show_task_template_name_list',
        dataType: "html",
        success: function (result) {
            $("#task_template_name_list").html(result);
        },
    });

}

function display_task_applied_filters() {
    var dropdownArray = [];
    var removeAttArray = [];

    $('#task-filter-form input, #task-filter-form select, #task-filter-form a.remove-filter-button').each(function (index) {
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
    var archive = $("input[name='archived_task']:checked").val();
    //remove empty strings
    dropdownArray = dropdownArray.filter(Boolean);
    if (archive != "all_tasks") {
        dropdownArray.pop();
    }

    var newTr = "";
    for (var i = 0; i < dropdownArray.length; i++) {
        if (i % 3 == 0)
            newTr += (i > 0) ? "</div><div id='" + i + "' class='p-b-3'>&nbsp" : "<div class='p-b-3'>&nbsp";
        newTr += "<span class='label label-default'>" + dropdownArray[i] + "</span>&nbsp";
    }
    newTr += "</div>";

    $("#task_filted_data").html(newTr);

    $('#task_filted_data a.btn_remove_filter').each(function (index) {
        $(this).attr('data-random', removeAttArray[index].match(/\d+/)[0]);
    });
}
function clearTaskFilter() {
    $('#clear_task_advanced_filter').css('display', 'none');
    $(".criteria-dropdown").trigger("chosen:updated");
    $('form#task-filter-form').children('div.filter-inner').children('div.filter-div').not(':first').remove();
    $("#archived_task").attr('checked', false);
    //        $("#project_add_filter").text('Show Filter');
    $("#task_filted_data").html('');

}
function clear_task_advance_search() {
    clearTaskFilter();
    var categorys = $('#cat').val();
    var statusArray = categorys.split('-');
    go('Task/index/' + categorys + '/' + statusArray[0]);
}

function advance_task_template_search(template_cat) {
    var category = $('#cat').val();
    var statusArray = category.split('-');
//    reflactTaskFilterWithCategory(category, '');
    go('Task/index/' + category + '/' + statusArray[0] + '/n' + '/' + template_cat);
}
function test_template(template_id) {
    alert(template_id);
}
function get_sos_task_list(tome, template_id) {
    var category = $("#clear_cat_id").val();
    clearTaskFilter();
    loadTaskDashboard('', '', '', '', '', '', '', tome, '', '', '', '', '', 1, category, template_id);
}
function my_task_list(user_id, template_cat) {
    var category = $('#cat').val();
    var statusArray = category.split('-');
    go('Task/index/' + category + '/' + statusArray[0] + '/' + template_cat + '/' + user_id);
}
function goto_task_categoty(dashboard_type = '') { //pageNumber = 0, template_cat_id = '', 
    var category = $('#cat').val();
    var statusArray = category.split('-');
    reflactTaskFilterWithCategory(category, '');
    openLoading();
    go('Task/index/' + category + '/' + statusArray[0]);
}
function goto_project_dashboard_in_project_id(project_id) {
    if (!e)
        var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation)
        e.stopPropagation();
    var category = $('#cat').val();
    var statusArray = category.split('-');
    openLoading();
    go('Project/index/' + category + '/' + statusArray[0] + '/n' + '/n' + '/n' + '/n' + '/n' + '/' + project_id);
}
function load_project_associate_tasks(task_id = '', project_id = '') {
    if (!$('#collapse' + task_id).hasClass('in')) {
        $('#collapse' + task_id).html('<div class="text-center"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
        $.ajax({
            type: "POST",
            url: base_url + 'task/load_project_associate_tasks',
            dataType: "html",
            data: {
                task_id: task_id,
                project_id: project_id
            },
            success: function (result) {
                if (result.trim() != '') {
                    $("#collapse" + task_id).html(result.trim());
                }
            }
        });
}
}
function loadProjectTaskSummaryBox(category = '', template_cat_id = '', select_month = '', select_year = '', template_name = '', dashboard_type = '', query = '', task_id = '', filter_data = '') {
    // console.log('***loadProjectSummaryBox***');
    // console.log('category:'+category);console.log('template_cat_id:'+template_cat_id);console.log('select_month:'+select_month);console.log('select_year:'+select_year);console.log('template_name:'+template_name);console.log('dashboard_type:'+dashboard_type);console.log('query:'+query);
//    alert('uttam'+ template_name);
    var form_data = new FormData(document.getElementById('project-task-filter-display-div'));
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
    form_data.append('category', category);
    form_data.append('template_cat_id', template_cat_id);
    form_data.append('select_month', select_month);
    form_data.append('select_year', select_year);
    form_data.append('template_name', template_name);
    form_data.append('dashboard_type', dashboard_type);
    form_data.append('query', query);
    form_data.append('filter_data', filter_data);
    form_data.append('id', task_id);
    $.ajax({
        type: "POST",
        data: form_data,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        url: base_url + 'task/load_project_task_dashboard_summary_box',
//        url: base_url + 'project/load_summary_box_data',
        success: function (result) {
            $("#project_task_summary_box").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            // closeLoading();
        }
    });
}
function project_task_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('project-task-filter-display-div'));
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
                console.log(id_val);
                if (id_val == 'pattern_month') {
                    id_val = 'pattern';
                }
                if (id_val == 'task_id_type') {
                    id_val = 'task_id';
                }
                if (id_val == 'assign_task_office') {
                    id_val = 'assign_staff';
                }
                if (id_val == 'responsible_task_office') {
                    id_val = 'responsible_name';
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
            url: base_url + 'modal/project_task_sorting_filter_modal',
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
                        console.log('hi: ' + id_val);
                        if (id_val == 'pattern_month') {
                            id_val = 'pattern';
                        }
                        if (id_val == 'task_id_type') {
                            id_val = 'task_id';
                        }
                        if (id_val == 'assign_task_office') {
                            id_val = 'assign_staff';
                        }
                        if (id_val == 'responsible_task_office') {
                            id_val = 'responsible_name';
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
function project_task_filter_new(page_numbers = '', is_clear = '', current_clear_element = '') {
    var filter_element = $("#filter-variable").val();
//    console.log(filter_element);
//    console.log(current_clear_element);
//    console.log('isclear: '+is_clear);
    if (is_clear != '') {
        var clear_element = current_clear_element.id;
//        console.log(clear_element);

        let removavle_element = $("#filter-field-variable").val();
//        console.log(removavle_element);
        if (removavle_element == 'pattern') {
            $("#" + removavle_element + '_month').val('').trigger('chosen:updated');
        }
        if (removavle_element == 'task_id') {
            $("#" + removavle_element + '_type').val('').trigger('chosen:updated');
        }
        if (removavle_element == 'responsible_name') {
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#all_task_staffs_responsible").val('').trigger('chosen:updated');
            $("#responsible_department").val('').trigger('chosen:updated');
            $("#responsible_task_office").val('').trigger('chosen:updated');
        }
        if (removavle_element == 'assign_staff') {
            $("#assign_task_office").val('').trigger('chosen:updated');
            $("#all_task_staffs_assignto").val('').trigger('chosen:updated');
            $("#assign_department").val('').trigger('chosen:updated');
            $("#assign_task_office").val('').trigger('chosen:updated');
        }
        
        $("#" + removavle_element).val('').trigger('chosen:updated');
        $("#" + clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('project-task-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
        console.log('um: '+a);
        console.log('uk: '+filter_name);
        if (a == 'task_id_type') {
            var id = 'task_id_type-val';
            if(is_clear==''){
                $("#task_id-clear_filter").show();
            }        
        }
        if (a == 'task_id') {
            var id = 'task_id-val';
            if(is_clear==''){
                $("#task_id-clear_filter").show();
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
            var id = 'responsible-val';
            if (is_clear == '') {
                $("#responsible_name-clear_filter").show();
            }
        }
        if (a == 'assign_office') {
            var id = 'assign_staff-val';
            if (is_clear == '') {
                $("#assign_office-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'status-val';
            if (is_clear == '') {
                $("#status-clear_filter").show();
            }
        }
        if (a == 'task_order') {
            var id = 'task_order-val';
            if (is_clear == '') {
                $("#task_order-clear_filter").show();
            }
        }
        if (a == 'due_date') {
            var id = 'due_date-val';
            if (is_clear == '') {
                $("#due_date-clear_filter").show();
            }
        }
        if (a == 'input_form') {
            var id = 'input_form-val';
            if (is_clear == '') {
                $("#input_form-clear_filter").show();
            }
        }
        if (a == 'responsible') {
            var id = 'responsible_name-val';
            if (is_clear == '') {
                $("#responsible_task_office-clear_filter").show();
            }
        }
        if (a == 'assign_to') {
            var id = 'all_task_staffs_assignto-val';
            if (is_clear == '') {
                $("#assign_task_office-clear_filter").show();
            }
        }
        if (filter_name == 'department') {
            var id = 'assign_task_office-val';
            if (is_clear == '') {
                $("#assign_task_office-clear_filter").show();
            }
        }
        if (filter_name == 'responsible_department') {
            var id = 'responsible_task_office-val';
            if (is_clear == '') {
                $("#responsible_task_office-clear_filter").show();
            }
        }
    }


    var category = $('#cat').val();
    var statusArray = category.split('-');
//    var form_data = new FormData(document.getElementById('filter-form'));
    // form_data = JSON.stringify(form_data);
    // console.log(form_data);return false;
    var select_year = '';
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
//    console.log(template_id);
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
    var task_ids = $("#task_ids").val();
    if (task_ids == undefined) {
        task_ids = '';
    }
    if (template_name == undefined) {
        template_name = '';
    }
//    if (assign_office == undefined) {
//        assign_office = '';
//    }else{
//       form_data.append('assign_office', assign_office);
//    }

    var responsible_office = $('#responsible_task_office').val();
    var responsible_name = $('#all_task_staffs_responsible').val();
    var assign_office = $('#assign_task_office').val();
    var all_task_staffs_assignto = $('#all_task_staffs_assignto').val();

//    if (responsible_office != '' && responsible_name == null && responsible_office != undefined) {
//
//        // alert('hi');
//        $('#responsible_staff_chosen .chosen-choices').css({"border-color": "red", "border-width": "1px", "border-style": "solid"});
//        return false;
//
//    } else {
//        $('#responsible_staff_chosen .chosen-choices').css({"border-color": "#CBD5DD", "border-width": "1px", "border-style": "solid"});
//    }
//// //    console.log('uttam'+ all_project_staffs_assignto);
//    if (assign_office != '' && all_task_staffs_assignto == null && assign_office != undefined) {
//
//        // alert('hello');
//        $('#assignto_staff_chosen .chosen-choices').css({"border-color": "red", "border-width": "1px", "border-style": "solid"});
//        return false;
//
//    } else {
//        $('#assignto_staff_chosen .chosen-choices').css({"border-color": "#CBD5DD", "border-width": "1px", "border-style": "solid"});
//    }

    if (responsible_name == undefined) {
        responsible_name = '';
    }

    if (all_task_staffs_assignto == undefined) {
        all_task_staffs_assignto = '';
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
    form_data.append('task_ids', task_ids);
    form_data.append('all_task_staffs_assignto', all_task_staffs_assignto);
    form_data.append('responsible_name', responsible_name);
    // alert(form_data.criteria_dropdown.value);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'task/task_filter/' + category + '/' + statusArray[0],
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//             console.log(result);
            $("#task_dashboard_div").html(result);
            $('#ProjectFilterModal').modal('hide');
            $("[data-toggle=popover]").popover();
            // $("#apply_filter").removeClass('btn-block');
            $('#bookkeeping_btn_clear_filter').show();
//            $('#clear_filter').show();
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
function sort_project_task_dashboard_new(sort_type = '', sort_val = '', page_number = '', template_cat_id) {
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
    var task_ids = $("#task_ids").val();
    if (task_ids == undefined) {
        task_ids = '';
    }
//    alert(filter_data);
    var form_data = new FormData(document.getElementById('project-task-filter-display-div'));
    form_data.append('template_cat_id', template_cat_id);
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_val);
    form_data.append('filter_data', filter_data);
    form_data.append('page_number', page_number);
    form_data.append('template_id', template_id);
    form_data.append('query', query);
    form_data.append('task_ids', task_ids);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'task/sort_project_task_dashboard_new',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (action_result) {

            var data = JSON.parse(action_result);
//            console.log(data);
            $("#task_dashboard_div").html(data.result);
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
function loadTaskDashboard(status, request, priority, officeID, departmentID, filter_assign, filter_data, sos_value, sort_criteria, sort_type, client_type, client_id, clients, pageNumber = 0, template_cat_id = '', template_name = '', task_ids = '', user_id = '', month = '', year = '', dashboard_type = '', query = '', templateID = '', task_id = '') {
//     console.log(templateID);
    // console.log('status:'+status);console.log('request:'+request);console.log('templateID:'+ templateID);console.log('officeID:'+ officeID);console.log('departmentID:'+departmentID);console.log('filter_assign:'+filter_assign);console.log('filter_data:'+filter_data);console.log('sos_value:'+sos_value);console.log('sort_criteria:'+sort_criteria);console.log('sort_type:'+sort_type);console.log('client_type:'+client_type);console.log('client_id:'+client_id);console.log('clients:'+clients);console.log('pageNumber:'+pageNumber);console.log('template_cat_id:'+template_cat_id);console.log('template_name:'+template_name);console.log('month:'+month);console.log('year:'+year);console.log('project_id:'+project_id);console.log('dashboard_type:'+dashboard_type);console.log('query:'+ query);console.log('project_ids:'+project_ids);
    var form_data = new FormData(document.getElementById('project-task-filter-display-div'));
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
    form_data.append('page_number', pageNumber);
    form_data.append('template_name', template_name);
    form_data.append('dashboard_type', dashboard_type);
    form_data.append('query', query);
    form_data.append('task_ids', task_ids);
    form_data.append('id', task_id);
    $.ajax({
        type: "POST",
        data: form_data,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        url: base_url + 'task/task_dashboard_ajax',
        success: function (task_result) {
//            console.log(task_result);
            if (task_result.trim() != '') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $("#task_dashboard_div").html(task_result);
                    //$("a.filter-button span:contains('-')").html(0);
                } else {
                    $("#task_dashboard_div").append(task_result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                $(".status-dropdown").val(status);
                $(".request-dropdown").val(request);
                $("[data-toggle=popover]").popover();
            }
            if (status != '' || status == '0' || sos_value != '') {
                $('#clear_task_advanced_filter').show();
            } else {
                $('#clear_task_advanced_filter').hide();
            }
            if (template_name != '') {
                $('#clear_task_advanced_filter').show();
            }
            if (query != '') {
                $('#clear_task_advanced_filter').show();
            }
//            var filter_result = '';
//            if (filter_result != '') {
//                $("#clear_filter").html(filter_result + ' &nbsp; ');
//                $("#clear_filter").show();
//                $('#clear_task_advanced_filter').show();
//            } else {
//                $("#clear_filter").html('');
//                $("#clear_filter").hide();
//                $('#clear_task_advanced_filter').hide();
//            }
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            //closeLoading();
            jumpDiv();
            if (clients == 'clients') {
                $("#task_dashboard_div").find(".clearfix").remove();
            }
        }
    });
}
function get_user_task_id(task_type = '', template_cat_id = '', reference = '') {
//    console.log(project_type);
    $.ajax({
        type: "POST",
        data: {
            type: task_type,
            template_cat_id: template_cat_id,
            reference: reference
        },
        url: base_url + 'task/get_user_task_id',
        dataType: "html",
        success: function (result) {
            $('#task_id_list').html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function bring_task_staffs(current_element, template_id) {
    var current_type = current_element.id;
    var office_id = $("#" + current_type).val();
    var assign_dept = $("#assign_dept_hidden").val();
//    console.log(current_type);
//    console.log(office_id);
//    console.log(template_id); //return false;
    if (current_type == 'responsible_task_office' || current_type == 'assign_task_office') {
        $.ajax({
            type: "POST",
            data: {
                'office_id': office_id,
                'template': template_id,
                'key': current_type,
                'assign_dept': assign_dept
            },
            url: base_url + 'task/bring_task_staffs',
            dataType: "html",
            success: function (result) {
                // console.log(current_type);
//                console.log('Result' + result);
                if (result != '') {
                    if (current_type == 'responsible_task_office') {
                        $("#all_task_staffs_responsible").empty().trigger('chosen:updated');
                    }
                    if (current_type == 'assign_task_office') {
                        $("#all_task_staffs_assignto").empty().trigger('chosen:updated');
                    }
                    result = JSON.parse(result.trim());
                    for (const r in result) {
                        if (current_type == 'responsible_task_office') {
                            $("#all_task_staffs_responsible").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                        }
                        if (current_type == 'assign_task_office') {
                            $("#all_task_staffs_assignto").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                        }
                    }
                } else {
                    //alert('acb');
                    if (current_type == 'responsible_task_office') {
                        $("#all_task_staffs_responsible").empty().trigger('chosen:updated');
                    }
                    if (current_type == 'assign_task_office') {
                        $("#all_task_staffs_assignto").empty().trigger('chosen:updated');
                    }
                }
            }
        });
    }
}
function edit_goverment_status(task_id){
    $("#sent_type").removeAttr('disabled',true);
    $("#confirmation_num").removeAttr('disabled',true);
    $("#IRS_status").removeAttr('disabled',true);
    $("#tax_liability").removeAttr('disabled',true);
    $("#amt").removeAttr('disabled',true);
    $("#govt_status_date").removeAttr('disabled',true);
    $("#save_govt_btn").removeAttr('disabled',true);
}
function choose_task_assign_department(current_element, template_cat_id) {
    var current_type = current_element.id;
    var assign_dept_id = $("#" + current_type).val();
    $("#assign_dept_hidden").val(assign_dept_id);
    $("#responsibl_dept_hidden").val(assign_dept_id);
//    console.log(current_type);
//    console.log(assign_dept_id);
    $.ajax({
        type: "POST",
        data: {
            'assign_dept_id': assign_dept_id,
            'template_cat_id': template_cat_id,
            'key': current_type
        },
        url: base_url + 'task/task_assign_department',
        dataType: "html",
        success: function (result) {
//        console.log('Result' + result);
           if (result != '') {
               if (current_type == 'responsible_department') {
                   $("#all_task_staffs_responsible").empty().trigger('chosen:updated');
                   $("#responsible_task_office").empty().trigger('chosen:updated');
               }
               if (current_type == 'assign_department') {
                   $("#assign_task_office").empty().trigger('chosen:updated');
                   $("#all_task_staffs_assignto").empty().trigger('chosen:updated');
               }
               result = JSON.parse(result.trim());
               for (const r in result) {
                   if (current_type == 'responsible_department') {
                       $("#responsible_task_office").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                   }
                   if (current_type == 'assign_department') {
                       $("#assign_task_office").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                   }
               }
           } else {
               //alert('acb');
               if (current_type == 'responsible_department') {
                   $("#all_task_staffs_responsible").empty().trigger('chosen:updated');
                   $("#responsible_task_office").empty().trigger('chosen:updated');
               }
               if (current_type == 'assign_department') {
                   $("#assign_task_office").empty().trigger('chosen:updated');
                   $("#all_task_staffs_assignto").empty().trigger('chosen:updated');
               }
           }
        }
    });
}