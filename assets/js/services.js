var base_url = document.getElementById('base_url').value;
function county_ajax(state_id, county_id) {
    if (state_id != "") {
        $.ajax({
            type: "POST",
            data: {
                state_id: state_id,
                county_id: county_id
            },
            url: base_url + 'services/accounting_services/county_list',
            dataType: "html",
            success: function (result) {
                $("#county select").html(result);
            }
        });
    }
}

function load_partner_manager_ddl(office_id, partner_id = "", manager_id = "", assistant_id = "") {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id
        },
        url: base_url + 'services/home/load_partner_manager',
        dataType: "html",
        success: function (result) {
            var partner = document.getElementById('partner');
            var manager = document.getElementById('manager');
            var assistant = document.getElementById('assistant');
            partner.innerHTML = "";
            manager.innerHTML = "";
            assistant.innerHTML = "";
            if (result != 0) {
                var staff = JSON.parse(result);
                partner.options[partner.options.length] = new Option("Select an option", "");
                manager.options[manager.options.length] = new Option("Select an option", "");
                assistant.options[assistant.options.length] = new Option("Select an option", "");
                for (var i = 0; i < staff.length; i++) {
                    partner.options[partner.options.length] = new Option(staff[i].name, staff[i].id);
                    manager.options[manager.options.length] = new Option(staff[i].name, staff[i].id);
                    assistant.options[assistant.options.length] = new Option(staff[i].name, staff[i].id);
                }
                if (partner_id != '') {
                    $('#partner').val(partner_id);
                }
                if (manager_id != '') {
                    $('#manager').val(manager_id);
                }
                if (assistant_id != '') {
                    $("#assistant").val(assistant_id);
                }
            } else {
                partner.options[partner.options.length] = new Option("Select an option", "");
                manager.options[manager.options.length] = new Option("Select an option", "");
                assistant.options[assistant.options.length] = new Option("Select an option", "");
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

function load_partner_manager_ddl_2(office_id, partner_id = "", manager_id = "", assistant_id = "") {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id
        },
        url: base_url + 'services/home/load_partner_manager',
        dataType: "html",
        success: function (result) {
            var referred_by_source = $("#referred_by_source").val();
            var section = $("#section").val();
            // $("#referred_by_source").chosen('destroy');
            // $("#referred_by_partner_div").hide();
            // $("#referred_by_name_div").show(); 

            var partner = document.getElementById('partner');
            var manager = document.getElementById('manager');
            var assistant = document.getElementById('assistant');
            partner.innerHTML = "";
            manager.innerHTML = "";
            assistant.innerHTML = "";
            if (result != 0) {
                var staff = JSON.parse(result);
                partner.options[partner.options.length] = new Option("Select an option", "");
                manager.options[manager.options.length] = new Option("Select an option", "");
                assistant.options[assistant.options.length] = new Option("Select an option", "");
                for (var i = 0; i < staff.length; i++) {
                    partner.options[partner.options.length] = new Option(staff[i].name, staff[i].id);
                    manager.options[manager.options.length] = new Option(staff[i].name, staff[i].id);
                    assistant.options[assistant.options.length] = new Option(staff[i].name, staff[i].id);
                }
                if (partner_id != '') {
                    $('#partner').val(partner_id);
                }
                if (manager_id != '') {
                    $('#manager').val(manager_id);
                }
                if (assistant_id != '') {
                    $('#assistant').val(assistant_id);
                }
                if (referred_by_source != '' && referred_by_source == 16) {
                    change_referred_client_div(section, referred_by_source);
                }
            } else {
                partner.options[partner.options.length] = new Option("Select an option", "");
                manager.options[manager.options.length] = new Option("Select an option", "");
                assistant.options[assistant.options.length] = new Option("Select an option", "");
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

function change_referred_client_div(section, referred_by_source) {
    if (section == 'client') {
        change_referral_type(referred_by_source);
    } else if (section == 'owner') {
        change_referral_type_for_owner(referred_by_source);
    } else {
        change_referral_type_for_service(referred_by_source);
    }
}

function change_referred_name_status(referred_source) {
    if (referred_source == '1' || referred_source == '9' || referred_source == '10' || referred_source == '') {
        $("#referred-label").html('Referred By Name');
        $("#referred_by_name").removeAttr('required');
        $(".chosen-select").chosen();
    } else {
        $("#referred-label").html('Referred By Name<span class="text-danger">*</span>');
        $("#referred_by_name").attr('required', true);
        $(".chosen-select").chosen();
    }
}
function change_referred_name_status2(referred_source = '', referred_by_name = '') {
    if (referred_source == 16) {
        var office = $("#office").val();
        if (office == '') {
            office = '';
        }
        $.ajax({
            type: "GET",
            url: base_url + 'action/home/get_all_lead_partner',
            // data: { office: office },
            dataType: "html",
            success: function (result) {
                var partner = document.getElementById('referred_by_name_partner');
                partner.innerHTML = "";
                if (result != 0) {
                    var ref_partner = JSON.parse(result);
                    $("#referred_by_name_div").hide();
                    $("#referred_by_partner_div").show();
                    $("#referred-label").html('Referred By Name<span class="text-danger">*</span>');
                    $("#referred_by_name_partner").attr('required', true);
                    $("#referred_by_name").removeAttr('required');
                    for (var i = 0; i < ref_partner.length; i++) {
                        if (office != '') {
                            var lead_office = ref_partner[i].office;
                            var lead_office_arr = lead_office.split(',');
                            if (lead_office_arr.includes(office)) {
                                partner.options[partner.options.length] = new Option(ref_partner[i].full_name, ref_partner[i].id);
                            }
                        } else {
                            partner.options[partner.options.length] = new Option(ref_partner[i].full_name, ref_partner[i].id);
                        }
                    }
                    if (referred_by_name != '') {
                        $('#referred_by_name_partner').val(referred_by_name);
                    }
                } else {
                    partner.options[partner.options.length] = new Option("Select an option", "");
                }
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else if (referred_source == '1' || referred_source == '9' || referred_source == '10' || referred_source == '') {
        $("#referred-label").html('Referred By Name');
        $("#referred_by_name").removeAttr('required');
        $("#referred_by_name_partner").attr('required', false);
        $(".chosen-select").chosen();
        $("#referred_by_name_div").show();
        $("#referred_by_partner_div").hide();
        $('#referred_by_name_partner').val('');
    } else {
        $("#referred-label").html('Referred By Name<span class="text-danger">*</span>');
        $("#referred_by_name").attr('required', true);
        $("#referred_by_name_partner").attr('required', false);
        $(".chosen-select").chosen();
        $("#referred_by_name_div").show();
        $("#referred_by_partner_div").hide();
        $('#referred_by_name_partner').val('');
}
}

function load_service_container(service_id) {
    if (service_id != '') {
        var config = {
            '.chosen-select': {},
            '.chosen-select-deselect': {allow_single_deselect: true},
            '.chosen-select-no-single': {disable_search_threshold: 10},
            '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
            '.chosen-select-width': {width: "95%"}
        }
        for (var selector in config) {
            $(selector).chosen(config[selector]);
            $(selector).on('change', function (evt, params) {
                var field_name = $(this).attr('name');
                if (field_name == 'related_services[]') {
                    var $this = $(this);
                    var relative_service_id = $this.val();
                    var office = $("#office").val();
                    var type_of_client = $("#type_of_client_ddl").val();
                    if (type_of_client == 0) {
                        if (office == '') {
                            var client_id = $("#client_list_ddl").val();
                            var reference = $("#reference").val();
                            $.ajax({
                                type: "POST",
                                data: {
                                    client_id: client_id,
                                    reference: reference
                                },
                                url: base_url + 'services/home/get_office_by_client_id',
                                dataType: "html",
                                success: function (res) {
                                    $.ajax({
                                        type: 'POST',
                                        data: {
                                            service_id: service_id,
                                            relative_service_id: relative_service_id,
                                            office: res
                                        },
                                        url: base_url + 'services/home/get_related_service_container',
                                        dataType: 'html',
                                        success: function (result) {
                                            $('#related_service_container').html(result);
                                        }
                                    });
                                }
                            });
                        }
                    } else {
                        $.ajax({
                            type: 'POST',
                            data: {
                                service_id: service_id,
                                relative_service_id: relative_service_id,
                                office: office
                            },
                            url: base_url + 'services/home/get_related_service_container',
                            dataType: 'html',
                            success: function (result) {
                                $('#related_service_container').html(result);
                            }
                        });
                    }
                }

            });
        }
    }
}

function request_create_company() {
    if (!requiredValidation('form_create_new_company')) {
        return false;
    }

    var company_type = $("#type option:selected").val();
    var total_percentage = $("#owner_percentage_total").val();
    // if (total_percentage != '100.00') {
    //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
    //     // return false;
    //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
    // }

    var override_price = $("#retail_price_override").val();
    if (isNaN(override_price)) {
        $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
        return false;
    } else {
        $("#retail_price_override").next(".errorMessage").html('');
    }

    company_type_enable();
    $('.related_service').each(function () {
        if (!$(this).is(':visible')) {
            $(this).remove();
        }
    });
    $('.state_opened').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_new_company'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/incorporation/request_create_company',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
             // console.log(result);return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function request_create_company_non_profit_fl() {
    if (!requiredValidation('form_create_company_non_profit_fl')) {
        return false;
    }
    var company_type = $("#type option:selected").val();
    var total_percentage = $("#owner_percentage_total").val();
    // if (total_percentage != '100.00') {
    //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
    //     // return false;
    //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
    // }
    var override_price = $("#retail_price_override").val();
    if (isNaN(override_price)) {
        $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
        return false;
    } else {
        $("#retail_price_override").next(".errorMessage").html('');
    }
    company_type_enable();
    $('.related_service').each(function () {
        if (!$(this).is(':visible')) {
            $(this).remove();
        }
    });
    $('.state_opened').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_company_non_profit_fl'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/incorporation/request_create_company_non_profit_fl',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function request_create_new_florida_pa() {
    if (!requiredValidation('form_create_new_florida_pa')) {
        return false;
    }
    var company_type = $("#type option:selected").val();
    var total_percentage = $("#owner_percentage_total").val();
    // if (total_percentage != '100.00') {
    //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
    //     // return false;
    //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
    // }
    var override_price = $("#retail_price_override").val();
    if (isNaN(override_price)) {
        $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
        return false;
    } else {
        $("#retail_price_override").next(".errorMessage").html('');
    }
    company_type_enable();
    $('.related_service').each(function () {
        if (!$(this).is(':visible')) {
            $(this).remove();
        }
    });
    $('.state_opened').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_new_florida_pa'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/incorporation/request_create_new_florida_pa',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function getretailprice(value) {
    if (value == 8) {
        var service_id = 44;
        $("#service_id").val(service_id);
    } else {
        var service_id = 1;
        $("#service_id").val(service_id);
    }

    $.ajax({
        type: 'POST',
        url: base_url + 'services/incorporation/getretailprice',
        data: {
            service_id: service_id
        },
        success: function (result) {
            $('#retail_price').val(result);
            $.ajax({
                type: 'POST',
                url: base_url + 'services/incorporation/getrelatedservices',
                data: {
                    service_id: service_id
                },
                success: function (data) {
                    if (data.trim != '') {
                        $(".related-service-div").html('');
                        $(".related-service-div").html('<select data-placeholder="Select one option" title="Related Services" class="chosen-select" name="related_services[]" id="related_services" style="width: 100%;" multiple="">' + data.trim() + '</select>');
                        $(".chosen-select").chosen();
                        load_service_container(service_id);
                    }

                }
            });
        }
    });
}

function request_create_annual_report() {
    if (!requiredValidation('form_create_annual_report')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }
    company_type_enable();
    $('.disabled_field, .service_radio, .retail_price, .type_of_client, .client_list').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_annual_report'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/incorporation/request_create_annual_report',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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


function open_owner_popup(service_id, company_id, title_id, form_check = '') {
    if ($(".owneredit").hasClass("doedit")) {
        return false;
    } else {
        var e = document.getElementById("type");
        var company_type = e.options[e.selectedIndex].value;
        if (company_type == '') {
            $("#owners-list-count").next('div.errorMessage').html("You have to select company type first!");
            return false;
        } else {
            $("#owners-list-count").next('div.errorMessage').html("");
            var url = base_url + 'services/home/owner_form/' + service_id + '/' + company_id;
            if (parseInt(title_id) > 0) {
                url = url + '/' + title_id;
            }

            url = url + '?q=' + company_type;
            url += '&sid=' + $("#service_id").val();
            url += '&tid=' + title_id;
            url += '&form=' + btoa(form_check);
            window.open(url, 'Add Owner', "width=1200, height=600, top=100, left=110, scrollbars=yes");
        }
    }
}

function show_contact_list(ref, ref_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/show_contact_list',
        data: {
            ref: ref,
            ref_id: ref_id
        },
        success: function (result) {
            $('#contact-list').html(result);
        }
    });
}

function show_owner_list(id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/show_owner_list',
        data: {
            id: id
        },
        success: function (result) {
            $('#owners-list').html(result);
        }
    });
}

function insert_contact() {
    if (!requiredValidation('form_contact')) {
        return false;
    }

    var form_data = new FormData($('#form_contact')[0]);
    var old_types = $('.contact_type_array').map(function () {
        return $(this).val();
    }).get();
    form_data.append("old_types", old_types);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/insert_contact',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            switch (result) {
                case "-1":
                    swal("Error Processing Data");
                    break;
                case "-2":
                    swal("Same Type Can't Exist");
                    break;
                case "-3":
                    swal("Email Already Exists");
                    break;
                default:
                    update_contact_list(result);
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

function update_contact_list(id) {
    $.get(base_url + "services/home/update_list/" + id, function (data) {
        $("#contact-list").append(data);
        $("#contact-list-count").val(parseInt($("#contact-list-count").val() + 1));
        $('#contact-form').modal('toggle');
    });
}

function get_all_contacts(ref_id) {
    $.get(base_url + "services/home/get_all_contacts/" + ref_id, function (data) {
        $("#contact-list").append(data);
    });
}

function loadServiceDashboard(status, categoryID, requestType, officeID, pageNumber = 0, data_new_home_dashboard = '', business_client_id = '', individual_client_id = '', partner_id = '',service_id='',sos_vale='') {

    var requestBy = $('.staff-dropdown option:selected').val();
    // alert(requestBy);return false;
    if (requestBy != '' && requestBy != undefined) {
        var req_by = requestBy;
    } else {
        req_by = '';
    }
    var sort_type = $("#sort_type").val();
    if (sort_type == undefined) {
        sort_type = '';
    }
    var sort_value = $("#sort_criteria").val();
    if (sort_value == undefined) {
        sort_value = '';
    }
    var form_data = new FormData(document.getElementById('order-filter-display-div'));
    form_data.append('category_id', categoryID);
    form_data.append('request_type', requestType);
    form_data.append('status', status);
    form_data.append('request_by', req_by);
    form_data.append('office_id', officeID);
    form_data.append('page_number', pageNumber);
    form_data.append('data_new_home_dashboard', data_new_home_dashboard);
    form_data.append('business_client_id', business_client_id);
    form_data.append('individual_client_id', individual_client_id);
    form_data.append('partner_id', partner_id);
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_value);
    form_data.append('service_id', service_id);
    form_data.append('sos_vale', sos_vale);
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/service_dashboard_filter',
        data: form_data,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            // console.log(result); return false;
            if (result.trim() != '') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $(".ajaxdiv").html(result);
                    $("a.filter-button span:contains('-')").html(0);
                    $(".variable-dropdown").val('');
                    $(".condition-dropdown").val('').removeAttr('disabled');
                    $(".criteria-dropdown").val('');
                    $('.criteria-dropdown').removeAttr('readonly').empty().append('<option value="">All Criteria</option>');
                    $(".criteria-dropdown").trigger("chosen:updated");
                    $('form#filter-form').children('div.filter-inner').children('div.filter-div').not(':first').remove();
                    $('#btn_service').css('display', 'none');
                    $("#complete_canceled_order").attr('checked', false);
                    $("#order_filted_data").html('');
                } else {
                    $(".ajaxdiv").append(result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                if (requestType == 'on_load') {
                    $('#btn_service').hide();
                    //                    clearFilter();
                }
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

function loadNewServiceDashboard(status = "", categoryID = "", requestType = "", officeID = "", pageNumber = 0, data_new_home_dashboard = '', service_id = '', sos_value = '') {
    var requestBy = $('.staff-dropdown option:selected').val();

    if (requestBy != '' && requestBy != undefined) {
        var req_by = requestBy;
    } else {
        req_by = '';
    }
    var sort_type = $("#sort_type").val();
    if (sort_type == undefined) {
        sort_type = '';
    }
    var sort_value = $("#sort_criteria").val();
    if (sort_value == undefined) {
        sort_value = '';
    }
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

    var form_data = new FormData(document.getElementById('service-filter-display-div'));
    form_data.append('category_id', categoryID);
    form_data.append('request_type', requestType);
    form_data.append('status', status);
    form_data.append('request_by', req_by);
    form_data.append('office_id', officeID);
    form_data.append('page_number', pageNumber);
    form_data.append('data_new_home_dashboard', data_new_home_dashboard);
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_value);
    form_data.append('service_id', service_id);
    form_data.append('sos_value', sos_value);
    form_data.append('responsible_department', responsible_department);
    form_data.append('responsible_office', responsible_office);
    form_data.append('responsible_name', responsible_name);
    form_data.append('assign_department', assign_department);
    form_data.append('assign_office', assign_office);
    form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/service_new_dashboard_filter',
        data: form_data,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //alert(result);
            //console.log(result); return false;
            if (result.trim() != '') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $(".ajaxdiv").html(result);
                    $("a.filter-button span:contains('-')").html(0);
                    $(".variable-dropdown").val('');
                    $(".condition-dropdown").val('').removeAttr('disabled');
                    $(".criteria-dropdown").val('');
                    $('.criteria-dropdown').removeAttr('readonly').empty().append('<option value="">All Criteria</option>');
                    $(".criteria-dropdown").trigger("chosen:updated");
                    $('form#filter-form').children('div.filter-inner').children('div.filter-div').not(':first').remove();
                    $('#btn_service').css('display', 'none');
                    $("#service_filted_data").html('');
                } else {
                    $(".ajaxdiv").append(result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                if (requestType == 'on_load') {
                    $('#btn_service').hide();
                    //                    clearFilter();
                }
                if (service_id != '') {
                    $("#bookkeeping_btn_clear_filter").show();
                }
            }


        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            // closeLoading();
            // jumpDiv();
        }
    });
}

function insert_document() {
    if (!requiredValidation('form_document')) {
        return false;
    }

    var form_data = new FormData($('#form_document')[0]);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/insert_document',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result == -1) {
                alert("Error Processing Data");
            } else {
                update_document_list(result);
            }
        }
    });
}

function update_document_list(id) {
    $.get(base_url + "services/home/update_doc_list/" + id, function (data) {
        $("#attached_docs").append(data);
        $("#doc-list-count").val(parseInt($("#doc-list-count").val() + 1));
        $.get(base_url + "services/home/loadDocumentList/" + id, function (data) {
            $("#document-list").append(data);
        });
        $('#contact-form').modal('toggle');
    });
}

function document_list_by_ref(ref_id) {
    $.get(base_url + "services/home/loadDocumentListByRef/" + ref_id, function (data) {
        $("#document-list").append(data);
    });
}

function update_contact(id) {
    if (!requiredValidation('form_contact')) {
        return false;
    }

    var form_data = new FormData($('#form_contact')[0]);
    var old_types = $('.contact_type_array').map(function () {
        return $(this).val();
    }).get();
    form_data.append("old_types", old_types);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/update_contact/' + id,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            switch (result) {
                case "-1":
                    swal("Error Processing Data");
                    break;
                case "-2":
                    swal("Same Type Can't Exist");
                    break;
                case "-3":
                    swal("Email Already Exists");
                    break;
                default:
                    $.get(base_url + "services/home/update_list/" + id, function (data) {
                        $("#contact_id_" + id).replaceWith(data);
                        $('#contact-form').modal('toggle');
                    });
            }
        }
    });
}

function delete_contact(id) {
    swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this contact!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.get(base_url + "services/home/delete_contact/" + id, function (data) {
                    if (data == 1) {
                        $("#contact_id_" + id).remove();
                        $("#contact-list-count").val(parseInt($("#contact-list-count").val()) - 1);
                        swal("Deleted!", "Your contact has been deleted.", "success");
                    } else {
                        swal("Unable To Delete Contact");
                    }
                });
            });
}

function delete_document1(id, file_name) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this document!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.get(base_url + "services/home/delete_document/" + id + "/" + file_name, function (data) {
                    if (data == 1) {
                        $("#document_id_" + id).remove();
                        $("#doc-list-count").val(parseInt($("#doc-list-count").val()) - 1);
                        swal("Deleted!", "Your document has been deleted.", "success");
                    } else {
                        swal("Unable To Delete document");
                    }
                });
            });
}

function update_contact_list_copy_contact(id) {
    $.get(base_url + "services/home/update_list/" + id, function (data) {
        $("#contact-list").append(data);
        $("#contact-list-count").val(parseInt($("#contact-list-count").val() + 1));
    });
}

//function saveOwnerform() {
//
//    if (!requiredValidation('form_title')) {
//        return false;
//    }
//    var num = document.getElementById("per_id").value;
//    if (isNaN(num)) {
//        $("#per_id").next('.errorMessage').html('Please, enter numeric value');
//        return false;
//    } else {
//        $("#per_id").next('.errorMessage').html("");
//    }
//
//    var reference = $("#reference").val();
//    var reference_id = $("#reference_id").val();
//
//    var formData = new FormData(document.getElementById('form_title'));
//
//    var quant_contact = parseInt(document.getElementById('quant_contact').value);
//    // if (!quant_contact){
//    //     swal("Error", "You have to enter at least one contact info!", "error");
//    //     return false;
//    // }
//
//    var quant_documents = parseInt(document.getElementById('quant_documents').value);
//    // if (!quant_documents){
//    //     swal("Error", "You have to enter at least one document for this owner!", "error");
//    //     return false;
//    // }
//
//    $.ajax({
//        type: 'POST',
//        url: base_url + 'services/home/save_owner',
//        data: formData,
//        enctype: 'multipart/form-data',
//        cache: false,
//        contentType: false,
//        processData: false,
//        success: function (result) {
//            alert(result);
//
//            // console.log("Result: " + result);
//            // if (result == 1) {
//            //     clearCacheFormFields('form_title');
//            //     window.opener.reloadOwnerList(company_id, base_url);
//            window.opener.reload_owner_list_for_payroll_section(company_id, base_url);
//            //     window.opener.reload_owner_list_for_payroll_section2(company_id, base_url);
//            //     window.opener.reload_owner_list_for_payroll_section3(company_id, base_url);
//
//            //     var quant_title = parseInt(window.opener.document.getElementById('quant_title').value);
//            //     window.opener.document.getElementById('quant_title').value = quant_title + 1;
//
//            //     window.opener.swal("Success!", "Successfully saved!", "success");
//            //     window.opener.disable_company_type();
//            //     self.close();
//            // } else if (result == 2) {
//            //     swal("ERROR!", "If you choose LLC, total share should be always 100%", "error");
//            // } else if (result == 0) {
//            //     swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
//            // } else {
//            //     swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
//            // }
//        },
//        beforeSend: function () {
//            openLoading();
//        },
//        complete: function (msg) {
//            closeLoading();
//        }
//    });
//}

function select_existing_owner() {
    var company_id = $("#company_id").val();
    var individual_id = $("#individual_list_ddl option:selected").val();
    var ownertitle = $("#selecttitle option:selected").val();
    var company_type = $("#type").val();
    var percentage = $("#per_id").val();
    var old_individual_id = $("#individual_id").val();
    var title_id = $("#title_id").val();
    // var office = $("#office option:selected").val();
    // var partner = $("#partner option:selected").val();
    // var manager = $("#manager option:selected").val();
    // var client_association = $("#client_association").val();
    // var practice_id = $("#practice_id").val();
    // var referred_by_source = $("#referred_by_source option:selected").val();
    // if (referred_by_source == 16) {
    //     var referred_by_name = $("#referred_by_name_partner option:selected").val();
    // } else if (referred_by_source == 12) {
    //     var referred_by_name = $("#client_list_ddl_file_cabinet option:selected").val();
    // } else {
    //     var referred_by_name = $("#referred_by_name").val();
    // }
    var language = $("#language option:selected").val();
    var country_residence = $("#country_residence option:selected").val();
    var country_citizenship = $("#country_citizenship option:selected").val();
    var service_id_val = $("#service_id").val();
    // var referral_client_type = $('.client_type:checked').val();
    // var client_referral_office = $("#client_office option:selected").val();
    // var assistant = $("#assistant option:selected").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/select_existing_owner',
        data: {company_id: company_id,
            individual_id: individual_id,
            company_type: company_type,
            percentage: percentage,
            old_individual_id: old_individual_id,
            title_id: title_id,
            ownertitle: ownertitle,
            // office: office,
            // partner: partner,
            // manager: manager,
            // client_association: client_association,
            // practice_id: practice_id,
            // referred_by_source: referred_by_source,
            // referred_by_name: referred_by_name,
            language: language,
            country_residence: country_residence,
            country_citizenship: country_citizenship
                    // referral_client_type: referral_client_type,
                    // client_referral_office: client_referral_office,
                    // assistant: assistant 
        },
        datatype: "html",
        success: function (result) {
            // alert(result);return false;
            if (result == 2) {
                swal("ERROR!", "Total Share Should be Always 100%", "error");
            } else {
                window.opener.reload_owner_list(company_id, "main", service_id_val, 'new_add_owner');
                window.opener.disable_company_type1();
                self.close();
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

function save_owner() {
    if (!requiredValidation('form_title')) {
        return false;
    }
    var type_of_client = $("#type_of_client").val();
    // alert(type_of_client);return false;
    if (type_of_client == 0) {
        select_existing_owner();
        return false;
    }
    var num = document.getElementById("per_id").value;
    if (isNaN(num)) {
        $("#per_id").next('.errorMessage').html('Please, enter numeric value');
        return false;
    } else {
        $("#per_id").next('.errorMessage').html("");
    }

    var reference = $("#reference").val();
    var reference_id = $("#reference_id").val();
    var company_id = $("#company_id").val();
    var formData = new FormData(document.getElementById('form_title'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/save_owner',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // console.log(result);return false;
            if (result == 1) {
                // clearCacheFormFields('form_title');              
                var service_id_val = $("#service_id").val();
                window.opener.reload_owner_list(company_id, "main", service_id_val, 'new_add_owner');
                if (service_id_val == 11) {
                    window.opener.reload_owner_list(company_id, "payroll", '', 'new_add_owner');
                    window.opener.reload_owner_list(company_id, "payroll2", '', 'new_add_owner');
                    window.opener.reload_owner_list(company_id, "payroll3", '', 'new_add_owner');
                }
                // window.opener.swal("Success!", "Successfully saved!", "success");
                window.opener.disable_company_type1();
                self.close();
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

function disable_company_type1() {
    $('#type').prop('disabled', true);
    $('#office').prop('disabled', true);
}

function reload_owner_list(company_id, section, service_id = '', new_add_owner = '' , company_type = '' , office_id = '') {
    $.ajax({
        type: "POST",
        data: {
            company_id: company_id,
            section: section,
            service_id: service_id,
            new_add_owner: new_add_owner,
            company_type: company_type,
            office_id:office_id
        },
        url: base_url + 'services/home/reload_owner_list',
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

function delete_owner(owner_id) {
    if ($(".ownerdelete").hasClass("dodelete")) {
        return false;
    } else {
        swal({
            title: "Are you sure?",
            text: "This owner will be deleted!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false

        }, function () {
            var company_id = $("#reference_id").val();
            $.ajax({
                type: "POST",
                data: {
                    owner_id: owner_id,
                    company_id: company_id
                },
                url: base_url + 'services/home/delete_owner',
                dataType: "html",
                success: function (result) {
                    var result = result.trim();
                    //                    alert('hi');
                    //                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");

                    //                    if (result != 0) {                        
                    //                        reload_owner_list(company_id, "main");
                    //                        if ($("#service_id").val() == 11) {
                    //                            reload_owner_list(company_id, "payroll");
                    //                            reload_owner_list(company_id, "payroll2");
                    //                            reload_owner_list(company_id, "payroll3");
                    //                        }
                    //                        enable_company_type(company_id);
                    //                    } else {
                    //                        swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                    //                    }

                    if (result == '2') {
                        swal("Deleted!", "Owner has been deleted Successfully.", "success");
                        reload_owner_list(company_id, "main");
                        if ($("#service_id").val() == 11) {
                            reload_owner_list(company_id, "payroll");
                            reload_owner_list(company_id, "payroll2");
                            reload_owner_list(company_id, "payroll3");
                        }
                        enable_company_type(company_id);
                    } else if (result == '1') {
                        swal("Unable To Delete!", "You should have atleast one owner!", "error");
                    } else {
                        swal("Error!", "Error to Delete Owner.", "error");
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
}

function enable_company_type(company_id) {
    $.ajax({
        type: "POST",
        data: {
            company_id: company_id
        },
        url: base_url + 'services/home/enable_company_type',
        dataType: "html",
        success: function (result) {
            if (result.trim() == 0) {
                company_type_enable();
            }
        }
    });
}

function company_type_enable() {
    $('#type').prop('disabled', false);
    $('#state').prop('disabled', false);
    $('#office').prop('disabled', false);
    $('#partner').prop('disabled', false);
    $('#manager').prop('disabled', false);
    $("#client_association").prop("disabled", false);
    $("#referred_by_source").prop('disabled', false);
    $("#referred-by-name").prop("disabled", false);
    $("#language").prop('disabled', false);
}

function get_financial_account_list(company_id, list_type, order_id) {
    $.ajax({
        type: "POST",
        data: {
            order_id: order_id,
            company_id: company_id,
            list_type: list_type
        },
        url: base_url + 'services/home/get_financial_account_list',
        dataType: "html",
        success: function (result) {
            $("#accounts-list").html(result);
        }
    });
}

function delete_account(id) {
    swal({
        title: "Are you sure?",
        text: "You want to delete financial account?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e60000",
        confirmButtonText: "Delete!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                account_id: id
            }, //services/accounting_services/delete_financial_account
            url: base_url + 'services/accounting_services/delete_account',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    // var reference_id = $("#reference_id").val();
                    var reference_id = $("#new_reference_id").val();
                    var order_id = $("#editval").val();
                    get_financial_account_list(reference_id, "", order_id);
                    swal("Deleted!", "Your financial account has been deleted.", "success");
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

function save_account(section = '') {

    //update_financial_account_by_date
    if (!requiredValidation('form_accounts')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_accounts'));
    var company_id = $("#company_id").val();
    var order_id = $("#editval").val();
    var modal_type = $("#modal_type").val();

    // if (section == 'edit') {
    //     var order_id_edit=$("#edit_order_id").val();        
    // }

    form_data.append('section', section);
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
            //            alert(result); return false;
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    get_financial_account_list(company_id, section, order_id);
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable to save financial account", "error");
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
function save_business_info() {

    if (!requiredValidation('form_business')) {
        return false;
    }
    var param1 = $('#reference_id').val();
    var param2 = $('#urlid').val();
    // alert(url2ndparameter);return false;
    var form_data = new FormData(document.getElementById('form_business'));
    3
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'action/home/save_business',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != 0) {
                swal({title: "Success!", text: "Business Info successfully saved!", type: "success"}, function () {
                    $('#form_business').modal('hide');
                    goURL(base_url + 'action/home/view_business/' + param1 + '/' + param2);
                });
            } else {
                swal("ERROR!", "Unable to save business info", "error");
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

function request_create_bookkeeping() {
    if (!requiredValidation('form_create_bookkeeping')) {
        return false;
    }
    if ($('#type_of_client_ddl').val() == '1') {
        var company_type = $("#type option:selected").val();
        var total_percentage = $("#owner_percentage_total").val();
        /*if (total_percentage != '100.00') {
            swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
            swal("Error", "Percentage of all partners should equal to 100%", "error");
            return false;
        }*/
        var override_price = $("#retail_price_override").val();
        if (isNaN(override_price)) {
            $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
            return false;
        } else {
            $("#retail_price_override").next(".errorMessage").html('');
        }
        company_type_enable();
        $('.related_service').each(function () {
            if (!$(this).is(':visible')) {
                $(this).remove();
            }
        });
    }

    if ($("#editval").val() != '') {
        $('.disabled_field').removeAttr('disabled');
    }
    var form_data = new FormData(document.getElementById('form_create_bookkeeping'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/request_create_bookkeeping',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);return false;
            if (result != 0) {
                swal({
                    title: "Success!",
                    text: "Successfully saved!",
                    type: "success"
                }, function() {
                    goURL(base_url + 'services/home/view/' + btoa(result));    
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

function save_owner_list(company_id, new_reference_id) {
    $.ajax({
        type: "POST",
        data: {
            company_id: company_id,
            new_reference_id: new_reference_id
        },
        url: base_url + 'services/home/save_existing_owner_list',
        dataType: "html",
        success: function (result) {
            if (result.trim() != 0) {
                document.getElementById('quant_title').value = result;
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

function save_contact_list(reference, reference_id, new_reference_id) {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id,
            new_reference_id: new_reference_id
        },
        url: base_url + 'services/home/save_existing_contact_list',
        dataType: "html",
        success: function (result) {
            if (result.trim() != 0) {
                document.getElementById('quant_contact').value = result;
            }
        }
    });
}

function request_create_bookkeeping_by_date() {
    if (!requiredValidation('form_create_bookkeeping_by_date')) {
        return false;
    }
    if ($("#type_of_client_ddl").val() == '1') {
        var company_type = $("#type option:selected").val();
        var total_percentage = $("#owner_percentage_total").val();
        /*if (company_type == '3') {
            if (total_percentage != '100.00') {
                swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
                return false;
            }
        }*/
        var override_price = $("#retail_price_override").val();
        if (isNaN(override_price)) {
            $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
            return false;
        } else {
            $("#retail_price_override").next(".errorMessage").html('');
        }

        company_type_enable();
    }
    $('.related_service').each(function () {
        if (!$(this).is(':visible')) {
            $(this).remove();
        }
    });
    if ($("#editval").val() != '') {
        $('.disabled_field').removeAttr('disabled');
    }
    var form_data = new FormData(document.getElementById('form_create_bookkeeping_by_date'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/request_create_bookkeeping_by_date',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
           // console.log(result); return false;
            if (result != 0) {
                swal({
                    title: "Success!",
                    text: "Successfully saved!",
                    type: "success"
                }, function() {
                    goURL(base_url + 'services/home/view/' + btoa(result));    
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
function blank_contact_list() {
    return '<input type="hidden" title="Contact Info" id="contact-list-count" required="required" value="">' +
            '<div class="errorMessage text-danger"></div>';
}

function blank_owner_list() {
    return '<input type="hidden" class="required_field" title="Owners" id="owners-list-count" value="">' +
            '<div class="errorMessage text-danger"></div>';
}

function request_create_payroll() {
    if (!requiredValidation('form_create_payroll')) {
        return false;
    }
    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }

    $('#type').prop('disabled', false);
    if ($("#editval").val() != '') {
        $('.disabled_field').removeAttr('disabled');
    }
    company_type_enable();
    var formData = new FormData(document.getElementById('form_create_payroll'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/request_create_payroll',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //console.log(result); return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // clearCacheFormFields('form_create_payroll');
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function delete_company_data() {

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

function load_company_data(clientid, new_reference_id) {
    $.ajax({
        type: "POST",
        data: {
            clientid: clientid,
            new_reference_id: new_reference_id
        },
        url: base_url + 'services/accounting_services/get_payroll_company_data',
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

function request_create_salestax_processing() {
    if (!requiredValidation('form_create_sales_tax_processing')) {
        return false;
    }
    var existing = $("#type_of_client_ddl").val();
    if (existing == "") {
        $("#type_of_client_ddl").next(".text-danger").html('Please Select Yes From Dropdown');
        return false;
    } else {
        $("#type_of_client_ddl").next(".text-danger").html('');
        if (existing == '1') {
            var total_percentage = $("#owner_percentage_total").val();
            // if (total_percentage != '100.00') {
            //     swal("Error", "Percentage of all partners should equal to 100%", "error");
            //     return false;
            //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
            // }
        }
    }


    $('#type').prop('disabled', false);
    $("#istate").prop('disabled', false);
    var override_price = $("#retail_price_override").val();
    if (isNaN(override_price)) {
        $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
        return false;
    } else {
        $("#retail_price_override").next(".errorMessage").html('');
    }

    if ($("#editval").val() != '') {
        $('.disabled_field').removeAttr('disabled');
    }

    company_type_enable();
    var formData = new FormData(document.getElementById('form_create_sales_tax_processing'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/request_create_sales_tax_processing',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function related_create_sales_tax_processing(val) {
    if (!requiredValidation(val)) {
        return false;
    }

    var override_price = $("#retail_price_override").val();
    if (isNaN(override_price)) {
        $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
        return false;
    } else {
        $("#retail_price_override").next(".errorMessage").html('');
    }

    var formData = new FormData(document.getElementById(val));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/related_create_sales_tax_processing',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            console.log("Result: " + result);
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'services/home');
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

function related_create_sales_tax_recurring(val) {
    if (!requiredValidation(val)) {
        return false;
    }
    var override_price = $("#retail_price_override").val();
    if (isNaN(override_price)) {
        $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
        return false;
    } else {
        $("#retail_price_override").next(".errorMessage").html('');
    }
    var formData = new FormData(document.getElementById(val));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/related_create_sales_tax_recurring',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            console.log("Result: " + result);
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'services/home');
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

function request_create_salestax_recurring() {
    if (!requiredValidation('form_create_sales_tax_recurring')) {
        return false;
    }
    var existing = $("#type_of_client_ddl").val();
    if (existing == "") {
        $("#type_of_client_ddl").next(".text-danger").html('Please Select Yes From Dropdown');
        return false;
    } else {
        $("#type_of_client_ddl").next(".text-danger").html('');
        if (existing == '1') {
            var total_percentage = $("#owner_percentage_total").val();
            // if (total_percentage != '100.00') {
            //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
            //     // return false;
            //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
            // }
        }
    }

    $('#type').prop('disabled', false);
    $("#istate").prop('disabled', false);
    var override_price = $("#retail_price_override").val();
    if (isNaN(override_price)) {
        $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
        return false;
    } else {
        $("#retail_price_override").next(".errorMessage").html('');
    }

    if ($("#editval").val() != '') {
        $('.disabled_field').removeAttr('disabled');
    }

    company_type_enable();
    var formData = new FormData(document.getElementById('form_create_sales_tax_recurring'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/request_create_sales_tax_recurring',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            //console.log(result); return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function request_create_fien_application() {
    if (!requiredValidation('form_create_fein_application')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }
    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');
    var formData = new FormData(document.getElementById('form_create_fein_application'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/incorporation/request_create_fien_application',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // console.log( result); return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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
function request_create_sales_tax_application() {
    if (!requiredValidation('form_create_sales_tax_application')) {
        swal("Form Incompleted!", "Variable field is missing", "error");
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }

    $('#type').prop('disabled', false);
    $("#istate").prop('disabled', false);

    if ($("#editval").val() != '') {
        $('.disabled_field').removeAttr('disabled');
    }

    company_type_enable();
    var formData = new FormData(document.getElementById('form_create_sales_tax_application'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/request_create_sales_tax_application',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // console.log(result);return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // clearCacheFormFields('form_create_payroll');
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function related_create_sales_tax_application(val) {
    if (!requiredValidation(val)) {
        return false;
    }

    var rt6check = $('input[type=radio][name=Rt6]:checked').length;
    if (rt6check == 0) {
        swal("ERROR!", "Please check do you have Rt-6?", "error");
        return false;
    }

    var rt6val = $('input[type=radio][name=Rt6]:checked').val();
    if (rt6val == 'No') {
        var residenttype = $('input[type=radio][name=residenttype]:checked').length;
        if (residenttype == 0) {
            swal("ERROR!", "Please Select Resident or Non-resident", "error");
            return false;
        }
        var residenttypeval = $('input[type=radio][name=residenttype]:checked').val();
        if (residenttypeval == 'Resident') {
            if (document.getElementById("license").files.length == 0) {
                //                swal("ERROR!", "Please Upload Driver License", "error");
                //                return false;
            }
        } else {
            if (document.getElementById("passport").files.length == 0) {
                if (document.getElementById("editval").value != "" && document.getElementById("payroll_passport_count").value == "") {
                    swal("ERROR!", "Please Upload Passport", "error");
                    return false;
                } else {
                    swal("ERROR!", "Please Upload Passport", "error");
                    return false;
                }
            }
            if (document.getElementById("lease").files.length == 0) {
                if (document.getElementById("editval").value != "" && document.getElementById("payroll_lease_count").value == "") {
                    swal("ERROR!", "Please Upload Lease", "error");
                    return false;
                } else {
                    swal("ERROR!", "Please Upload Lease", "error");
                    return false;
                }
            }
        }
    }

    var override_price = $("#retail_price_override").val();
    if (isNaN(override_price)) {
        $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
        return false;
    } else {
        $("#retail_price_override").next(".errorMessage").html('');
    }

    if ($("#editval").val() != '') {
        $('.disabled_field').removeAttr('disabled');
    }

    company_type_enable();
    var formData = new FormData(document.getElementById(val));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/related_create_sales_tax_application',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //            alert(result);
            console.log("Result: " + result);
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                //                clearCacheFormFields('form_create_payroll');
                goURL(base_url + 'services/home');
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

function request_create_rt6_unemployment_app() {
    if (!requiredValidation('form_create_rt6_unemployment_app')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }

    $('#type').prop('disabled', false);
    $("#istate").prop('disabled', false);


    if ($("#editval").val() != '') {
        $('.disabled_field').removeAttr('disabled');
    }
    company_type_enable();
    var formData = new FormData(document.getElementById('form_create_rt6_unemployment_app'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/request_create_rt6_unemployment_app',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // alert(result);return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // clearCacheFormFields('form_create_payroll');
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function related_create_rt6_unemployment_app(val) {
    if (!requiredValidation(val)) {
        return false;
    }

    var rt6check = $('input[type=radio][name=Rt6]:checked').length;
    if (rt6check == 0) {
        swal("ERROR!", "Please check do you have Rt-6?", "error");
        return false;
    }

    var rt6val = $('input[type=radio][name=Rt6]:checked').val();
    if (rt6val == 'No') {
        var residenttype = $('input[type=radio][name=residenttype]:checked').length;
        if (residenttype == 0) {
            swal("ERROR!", "Please Select Resident or Non-resident", "error");
            return false;
        }
        var residenttypeval = $('input[type=radio][name=residenttype]:checked').val();
        if (residenttypeval == 'Resident') {
            if (document.getElementById("license").files.length == 0) {
                //                swal("ERROR!", "Please Upload Driver License", "error");
                //                return false;
            }
        } else {
            if (document.getElementById("passport").files.length == 0) {
                if (document.getElementById("editval").value != "" && document.getElementById("payroll_passport_count").value == "") {
                    swal("ERROR!", "Please Upload Passport", "error");
                    return false;
                } else {
                    swal("ERROR!", "Please Upload Passport", "error");
                    return false;
                }
            }
            if (document.getElementById("lease").files.length == 0) {
                if (document.getElementById("editval").value != "" && document.getElementById("payroll_lease_count").value == "") {
                    swal("ERROR!", "Please Upload Lease", "error");
                    return false;
                } else {
                    swal("ERROR!", "Please Upload Lease", "error");
                    return false;
                }
            }
        }
    }

    var override_price = $("#retail_price_override").val();
    if (isNaN(override_price)) {
        $("#retail_price_override").next(".errorMessage").html('Override price must be numreic');
        return false;
    } else {
        $("#retail_price_override").next(".errorMessage").html('');
    }

    var formData = new FormData(document.getElementById(val));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/related_create_rt6_unemployment_app',
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
                //                clearCacheFormFields('form_create_payroll');
                goURL(base_url + 'services/home');
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
//function change_sales_tax(account){
//    if(parseInt(account)==0){
//           $("#tax_id").show();
//           $("#website").show();
//           $("#password").show();
//       }else{
//           $("#tax_id").hide();
//           $("#website").hide();
//           $("#password").hide();
//       }
//   
//   }
function LeadSourceTypeChange(lead_source_type) {
    clearErrorMessageDiv();
    if (parseInt(lead_source_type) == 1) {
        $(".lead-client-class, .lead-agent-class").hide();
    }
    if (parseInt(lead_source_type) == 8) {
        $(".lead-client-class, .lead-agent-class").hide();
        $(".lead-staff-div").show();
    }
}
function clientTypeChange(client_type, new_reference_id, reference, service_id, section = '') {
    clearErrorMessageDiv();
    if (parseInt(client_type) == 0) {
        $(".client_id_name_div").show();
        $('.chosen-select').chosen();
        $('.client_type_field0').prop('required', true);
        $('.client_type_div0').show();
        $('.client_type_field1').val('');
        $('.client_type_field1').prop('required', false);
        $('.client_type_div1').hide();
        $('.display_div').hide();
        if ($('input[type=hidden][name=editval]').val() === '') {
            if (section != 'billing') {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'services/home/get_existing_client_list',
                    success: function (result) {
                        $('#client_list_ddl').html("<option value=''>Select an option</option>" + result);
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
        }
    } else if (parseInt(client_type) == 1) {
        $('.chosen-select').chosen();
        $('.client_type_field1').prop('required', true);
        $('.client_type_div1').show();
        $('.client_type_field0').val('').trigger('chosen:updated');
        $('.client_type_field0').prop('required', false);
        $('.client_type_div0').hide();
        $('.display_div').show();
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
        $(".client_id_name_div").hide();
    } else {
        $('.chosen-select').chosen();
        $('.client_type_field1').prop('required', false);
        $('.client_type_div1').hide();
        $('.client_type_field0, .client_type_div1').val('');
        $('.client_type_field0').prop('required', false);
        $('.client_type_div0').hide();
        $('.display_div').hide();
    }
    setReferenceId('', new_reference_id, reference, service_id);
    $('.value_field').val('');
    $('.required_field').prop('required', true);
    $('.disabled_field').prop('disabled', false);
    change_referred_name_status('');
    // update_service_information_on_client();
}

function clientTypeYes(client_type, order_id = '') {
    if (parseInt(client_type) == 0) {
        $.ajax({
            type: 'POST',
            data: {'order_id': order_id},
            url: base_url + 'services/home/clientTypeYes',
            success: function (result) {
                $('#county_div').after(result);
            }
        });
    } else if (parseInt(client_type) == 1) {
        $.ajax({
            type: 'POST',
            // url: base_url + 'services/home/clientTypeYes',
            success: function (result) {
                $('#existing_client_extra_field').hide();
                $('#existing_client_extra_field').remove();
            }
        });
}

}

function fetchExistingClientData(reference_id, new_reference_id, reference, service_id) {
    clearErrorMessageDiv();
    $('.value_field').val('');
    setReferenceId(reference_id, new_reference_id, reference, service_id);
    if (reference_id != '') {
        get_contact_list(reference_id, 'company', "y");
        $('.required_field').prop('required', false);
        getCompanyData(reference_id);
        get_state_of_incorporation_value(reference_id);
        get_company_type(reference_id);
        //$('.disabled_field').prop('disabled', true);
        $('.disabled_field').prop('disabled', false);
        //get_state_county_val(reference_id)
        payroll_account_details(reference_id);
        $('#exist_client_id').val(reference_id);
        $(".client_id_name_div").css('display', 'block');
        get_client_id_by_company(reference_id);
        payroll_employee_details(reference_id);
        deselect_pattern_on_reference_change('company', new_reference_id);
    } else {
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
        $('.required_field').prop('required', false);
        $('.disabled_field').prop('disabled', false);
    }
}
function payroll_employee_details(reference_id) {
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id
        },
        url: base_url + 'services/home/get_payroll_employee_info',
        dataType: "html",
        success: function (result) {
            // alert(result);return false;
            if (result) {
                $("#employee-list").html(result);
                $("#employee-list").show();
            } else {
                // alert('Please add employee');
            }
        }
    });
}
function get_client_id_by_company(reference_id) {
    // alert(reference_id);
    $.ajax({
        type: "POST",
        data: {
            company_id: reference_id
        },
        url: base_url + 'services/home/get_client_id_by_company',
        dataType: "html",
        success: function (result) {
            $("#client_id_name").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function get_state_of_incorporation_value(ref_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/get_state_of_incorporation_value',
        data: {
            ref_id: ref_id
        },
        success: function (result) {
            if (result.trim() != '') {
                var result = result.trim();
                $("#state").val(result);
                var service_id = $("#service_id").val();
                get_service_retail_price_by_state_id(result, service_id);
            }
        }
    });
}
function get_company_type(ref_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/get_company_type',
        data: {
            ref_id: ref_id
        },
        success: function (result) {
            if (result.trim() != '') {
                var result = result.trim();
                $("#type").val(result);
            }
        }
    });
}
function get_state_county_val(ref_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/get_state_county_val',
        data: {
            ref_id: ref_id
        },
        success: function (result) {
            if (result.trim() != '') {
                alert(result);
            }
        }
    });
}
function annual_date(reference_id) {
    var florida = parseInt($('#service_florida').attr('retail_price'));
    var delaware = parseInt($('#service_delaware').attr('retail_price'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/annual_date',
        data: {
            reference: reference_id
        },
        success: function (result) {
            $('#due_date').val();
            if (result != '0') {
                result = JSON.parse(result);
                var state = result.state.trim();
                if (state == 8) {
                    $('#service_delaware').prop("checked", true);
                    $('#service_florida').prop("checked", false);
                    // $("#service_florida, #service_delaware").prop("disabled", true);
                    changeServiceRadio(getIdVal('service_delaware'), $('#service_delaware').attr('retail_price'));
                } else if (state == 10) {
                    $('#service_florida').prop("checked", true);
                    $('#service_delaware').prop("checked", false);
                    // $("#service_florida, #service_delaware").prop("disabled", true);
                    changeServiceRadio(getIdVal('service_florida'), $('#service_florida').attr('retail_price'));
                } else {
                    $("#service_florida, #service_delaware").prop("disabled", false);
                }
                $('#due_date').val(result.date);




                //                console.log(result);
                //                alert(result.state);
                //                if (result.state.trim() == 8) {
                //                    $('#annual_report_florida').removeAttr('checked');
                //                    $('#annual_report_delaware').prop('checked', true);
                //                    $("#retail-price").val(delaware + registered_agent);
                //                    $('#annual_div').show();
                //                } else {
                //                    $('#annual_report_delaware').removeAttr('checked');
                //                    $('#annual_report_florida').prop('checked', true);
                //                    $("#retail-price").val(florida);
                //                    $('#annual_div').hide();
                //                }
                //                $('#due_date').val(result.date);
            } else {
                $("#service_florida, #service_delaware").prop("disabled", false);
                $('#due_date').val('');
                return false;
            }
        }
    });
}
function individualTypeChange(client_type, new_reference_id, reference) {
    clearErrorMessageDiv();
    if (parseInt(client_type) == 0) {
        $('.chosen-select').chosen();
        $('.client_type_field0').prop('required', true);
        $('.client_type_div0').show();
        $('.required_field').prop('required', false);
        $('.display_div').hide();
    } else {
        $('.chosen-select').chosen();
        $('.client_type_field0').val('').trigger('chosen:updated');
        $('.client_type_field0').prop('required', false);
        $('.client_type_div0').hide();
        $('.required_field').prop('required', true);
        $('.display_div').show();
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
    }
    setReferenceId('', new_reference_id, reference, '');
    $('.value_field').val('');
    change_referred_name_status('');
}

function individualTypeChange1(client_type, new_reference_id, reference) {
    clearErrorMessageDiv();
    if (parseInt(client_type) == 0) {
        $('.chosen-select').chosen();
        $('.client_type_field0').prop('required', true);
        $('.client_type_div0').show();
        $('.required_field').prop('required', false);
        $('.display_div').hide();
    } else {
        $('.chosen-select').chosen();
        $('.client_type_field0').val('');
        $('.client_type_field0').prop('required', false);
        $('.client_type_div0').hide();
        $('.required_field').prop('required', true);
        $('.display_div').show();
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
    }
    $('.value_field').val('');
    change_referred_name_status('');
}
function fetchExistingIndividualData(title_id, new_reference_id, reference) {
    clearErrorMessageDiv();
    $('.value_field').val('');
    if (title_id != '') {
        individualInfoByTitleId(title_id, new_reference_id, reference);
        deselect_pattern_on_reference_change('individual', title_id);
    } else {
        $('.disabled_field').prop('disabled', false);
        $('.required_field').prop('required', true);
        $('.display_div').show();
    }
}

function fetchExistingIndividualDataForOwner(individual_id, new_reference_id, reference) {
    clearErrorMessageDiv();
    $('.value_field').val('');
    if (individual_id != '') {
        get_contact_list(individual_id, reference, "y");
    } else {
        $('.disabled_field').prop('disabled', false);
        $('.required_field').prop('required', true);
        $('.display_div').show();
    }
}


function individualInfoByTitleId(title_id, new_reference_id, reference) {
    $.ajax({
        type: 'POST',
        url: base_url + 'billing/invoice/individual_info_ajax',
        data: {
            title_id: title_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != '0') {
                var individual_info = JSON.parse(result);
                var reference_id = individual_info.individual_id;
                get_contact_list(reference_id, reference, "y");
                setReferenceId(reference_id, new_reference_id, reference, 1);
                $('.display_div').hide();
                $('.required_field').prop('required', false);
            } else {
                setReferenceId('', new_reference_id, reference, 1);
                $('.disabled_field').prop('disabled', false);
                $('.required_field').prop('required', true);
                $('.display_div').show();
                $("#contact-list").html(blank_contact_list());
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

function setReferenceId(reference_id, new_reference_id, reference, service_id) {
    var result_reference_id = new_reference_id;
    if (reference_id != '') {
        result_reference_id = reference_id;
    }
    $("#reference_id").val(result_reference_id);
    //    if ($("a").hasClass("contactadd")) {
    //        $("#contact-list").html(blank_contact_list());
    //        $(".contactadd").attr('onclick', 'contact_modal("add", "' + reference + '", ' + result_reference_id + '); return false;');
    //    }
    //    if ($("a").hasClass("owneradd")) {
    //        $("#owners-list").html(blank_owner_list());
    //        $(".owneradd").attr('onclick', 'open_owner_popup(' + service_id + ',' + result_reference_id + ', 0); return false;');
    //    }
    //    if ($("a").hasClass("documentadd")) {
    //        $("#document-list").html('');
    //        $(".documentadd").attr('onclick', 'document_modal("add", "' + reference + '", ' + result_reference_id + '); return false;');
    //    }
}

function getCompanyData(reference_id) {
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id
        },
        url: base_url + 'services/accounting_services/get_company_data',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                var res = JSON.parse(result);
                if (res.start_month_year != null && res.start_month_year != '') {
                    $("#start_month_year").val(res.start_month_year);
                    //                    $("#start_month_year_div").hide();
                } else {
                    $("#start_month_year").val('');
                    //$("#start_month_year_div").show();
                }
                if (res.fein != null && res.fein != '') {
                    $("#fein").val(res.fein);
                    //                    $("#fein_div").hide();
                    $("#fein_div").show();
                } else {
                    $("#fein").val("");
                    $("#fein_div").show();
                }
            }

        }
    });
}

function cancelRelatedServiceForm(val) {
    clearCacheFormFields(val);
    goURL(base_url + 'services/home/');
}

function related_create_bookkeeping_by_date(val) {
    if (!requiredValidation(val)) {
        return false;
    }

    var form_data = new FormData(document.getElementById(val));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/related_create_bookkeeping_by_date',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //            alert(result);
            //            return false;
            console.log("Result: " + result);
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'services/home');
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

function related_create_recurring_bookkeeping(val) {
    if (!requiredValidation(val)) {
        return false;
    }

    var form_data = new FormData(document.getElementById(val));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/related_create_recurring_bookkeeping',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //            alert(result);
            //            return false;
            console.log("Result: " + result);
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'services/home');
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

function related_create_payroll(val) {
    if (!requiredValidation(val)) {
        return false;
    }

    var form_data = new FormData(document.getElementById(val));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/related_create_payroll',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //            alert(result);
            //            return false;
            console.log("Result: " + result);
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'services/home');
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

function request_create_corporate_amendment() {
    if (!requiredValidation('form_create_corporate_amendment')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }
    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_corporate_amendment'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/incorporation/request_create_corporate_amendment',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log("Result: " + result); return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function request_create_certificate_of_good_standing() {
    if (!requiredValidation('form_create_certificate_of_good_standing')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }
    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_certificate_of_good_standing'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/incorporation/request_create_certificate_of_good_standing',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log("Result: " + result); return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function request_create_certificate_shares() {
    if (!requiredValidation('form_create_certificate_shares')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }
    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_certificate_shares'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/incorporation/request_create_certificate_shares',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
           // console.log("Result: " + result); return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function request_create_operating_agreement() {
    if (!requiredValidation('form_create_operating_agreement')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }
    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_operating_agreement'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/incorporation/request_create_operating_agreement',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log("Result: " + result);
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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
function display_order_applied_filters() {
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
    var archive = $("input[name='complete_canceled_order']:checked").val();
//    console.log(archive);
    dropdownArray = dropdownArray.filter(Boolean);
    if (archive != "all_orders") {
        dropdownArray.pop();
    }

    var newTr = "";
    for (var i = 0; i < dropdownArray.length; i++) {
        if (i % 3 == 0)
            newTr += (i > 0) ? "</div><div id='" + i + "' class='p-b-3'>&nbsp" : "<div class='p-b-3'>&nbsp";
        newTr += "<span class='label label-default'>" + dropdownArray[i] + "</span>&nbsp";
    }
    newTr += "</div>";

    $("#order_filted_data").html(newTr);

    $('#order_filted_data a.btn_remove_filter').each(function (index) {
        $(this).attr('data-random', removeAttArray[index].match(/\d+/)[0]);
    });
}
function service_filter_form() {
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/filter_form',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log("Result: " + result);
            $(".ajaxdiv").html(result);
            $('#OrderFilterModal').modal('hide');
            $("#btn_service").show();
            $("#hiddenflag").val('');
            display_order_applied_filters();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function new_service_filter_form(status ='',request_type='') {
    console.log(request_type);
    var form_data = new FormData(document.getElementById('filter-form'));
    form_data.append('status',status);
    form_data.append('request_type',request_type);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/filter_form_for_services',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
           // console.log("Result: " + result);
            $(".ajaxdiv").html(result);
            //$("#btn_service").show();
            $("#hiddenflag").val('');
            $('#ServiceFilterModal').modal('hide');
            //display_service_applied_filters();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function display_service_applied_filters() {
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
    var archive = $("input[name='complete_canceled_service']:checked").val();
//    console.log(archive);
    dropdownArray = dropdownArray.filter(Boolean);
    if (archive != "all_services") {
        dropdownArray.pop();
    }

    var newTr = "";
    for (var i = 0; i < dropdownArray.length; i++) {
        if (i % 3 == 0)
            newTr += (i > 0) ? "</div><div id='" + i + "' class='p-b-3'>&nbsp" : "<div class='p-b-3'>&nbsp";
        newTr += "<span class='label label-default'>" + dropdownArray[i] + "</span>&nbsp";
    }
    newTr += "</div>";

    $("#service_filted_data").html(newTr);

    $('#service_filted_data a.btn_remove_filter').each(function (index) {
        $(this).attr('data-random', removeAttArray[index].match(/\d+/)[0]);
    });
}

function changeService(state, section_id_dl, retail_price_dl, section_id_fl, retail_price_fl) {
    if (state == 10) {  // Florida
        $('#service_id').val(section_id_fl);
        $('#retail_price, #retail_price_hdn').val(retail_price_fl);
    } else if (state == 8) {  // Delaware
        $('#service_id').val(section_id_dl);
        $('#retail_price, #retail_price_hdn').val(retail_price_dl);
    } else { // Blank
        $('#service_id').val(section_id_dl);
        $('#retail_price, #retail_price_hdn').val(0);
    }
}

function assignOrder(order_id, staff_id) {
    swal({
        title: 'Are you sure?',
        text: "You want to " + (staff_id == 0 ? 'un' : '') + "assign the order!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, assign!'
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                data: {
                    order_id: order_id,
                    staff_id: staff_id
                },
                url: base_url + 'services/home/assign_order',
                cache: false,
                success: function (result) {
                    if (result != 0) {
                        swal("Success!", "Successfully " + (staff_id == 0 ? 'un' : '') + "assigned!", "success");
                        //                        if (staff_id == '') {
                        //                            goURL(base_url + 'services/home/view/' + order_id);
                        //                        } else {
                        goURL(base_url + 'services/home');
                        //                        }
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

function assignService(service_id, staff_id) {
    swal({
        title: 'Are you sure?',
        text: "You want to " + (staff_id == 0 ? 'un' : '') + "assign the service!",
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
                    service_id: service_id,
                    staff_id: staff_id
                },
                url: base_url + 'services/home/assign_service',
                cache: false,
                success: function (result) {
                    if (result != 0) {
                        swal("Success!", "Successfully " + (staff_id == 0 ? 'un' : '') + "assigned!", "success");
                        //                        if (staff_id == '') {
                        //                            goURL(base_url + 'services/home/view/' + order_id);
                        //                        } else {
                        window.location.reload();
                        //                        }
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

function loadRelatedServiceContainer(service_id) {
    var related_services = [];
    $.each($("input[name='related_services[]']:checked"), function () {
        related_services.push($(this).val());
    });
    console.log(related_services);
    $.ajax({
        type: 'POST',
        data: {
            service_id: service_id,
            relative_service_id: related_services,
        },
        url: base_url + 'services/home/get_related_service_container',
        dataType: 'html',
        success: function (result) {
            $('#related_service_container').html(result);
        }
    });
}

function add_service_notes() {
    var formData = new FormData(document.getElementById('service_modal_note_form'));
    var orderid = $("#service_modal_note_form #order_id").val();
    var serviceid = $("#service_modal_note_form #serviceid").val();
    var ref_id = $("#service_modal_note_form #reference_id").val();

    formData.append('service_id', serviceid);
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/addNotesmodal',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'services/Home/get_notes_count_total',
                    data: {
                        orderid: ref_id
                    },
                    success: function (ress) {
                        if (result != '0') {
                            if (ref_id == orderid) {
                                $.ajax({
                                    type: 'POST',
                                    url: base_url + 'services/home/order_dashboard_notes_count',
                                    data: {
                                        reference_id: ref_id,
                                        status: ''
                                    },
                                    success: function (total_note_count_res) {
                                        $("#total_notes_count_id_order_" + ref_id).removeClass('label-secondary').addClass('label-danger');
                                        document.getElementById("total_notes_count_id_order_" + ref_id).innerHTML = total_note_count_res;
                                    }
                                });
                                // alert("notecount-" + ref_id);
                                // var prevnotecount = $("#notecount-" + orderid).attr('count');
                                // var notecount = parseInt(prevnotecount) + parseInt(result);
                                // $("#total_notes_count_id_order_-" + ref_id).attr('count', total_note_count_res);
                                // $("#total_notes_count_id_order_-" + ref_id).find('b').html(total_note_count_res);
                            } else {
                                $.ajax({
                                    type: 'POST',
                                    url: base_url + 'services/home/service_dashboard_notes_count',
                                    data: {
                                        reference_id: ref_id,
                                        status: ''
                                    },
                                    success: function (total_note_count_res) {
                                        $("#total_notes_count_id_service_" + ref_id).removeClass('label-secondary').addClass('label-danger');
                                        document.getElementById("total_notes_count_id_service_" + ref_id).innerHTML = total_note_count_res;
                                    }
                                });
                                var prevnotecount = $("#collapse" + orderid).find("#orderservice-" + serviceid + "-" + ref_id).attr('count');
                                var notecount = parseInt(prevnotecount) + parseInt(result);

                                $("#collapse" + orderid).find("#orderservice-" + serviceid + "-" + ref_id).attr('count', notecount);
                                $("#collapse" + orderid).find("#orderservice-" + serviceid + "-" + ref_id).find('b').html(notecount);
                            }
                        }
                    }
                });
                $("#notecount-" + orderid).removeClass('label label-warning').addClass('label label-danger');
                $("#orderservice-" + serviceid + "-" + ref_id).removeClass('label label-secondary').addClass('label label-danger');
                document.getElementById("service_modal_note_form").reset();
                $(".removenoteselector").trigger('click');
                $('#show_notes').modal('hide');
                $('#show_notes_service').modal('hide');
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

var update_service_note = () => {
    var formData = new FormData(document.getElementById('service_modal_note_form_update'));

    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/updateNotes',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Updated!11", type: "success"}, function () {
                document.getElementById("service_modal_note_form_update").reset();
                $('#show_notes').modal('hide');
                $('#show_notes_service').modal('hide');
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

function add_sos() {
    //alert(5);
    if (!requiredValidation('service_sos_form')) {
        return false;
    }
    var formData = new FormData(document.getElementById('service_sos_form'));
    var orderid = $("#service_sos_form #refid").val();
    var serviceid = $("#service_sos_form #serviceid").val();

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
            result = result.trim();
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                $(".removenoteselector").trigger('click');
                $.ajax({
                    type: 'POST',
                    url: base_url + 'services/Home/get_service_sos_count',
                    data: {
                        orderid: orderid,
                        serviceid: serviceid,
                        status: 'unread'
                    },
                    success: function (total_sos_count) {
                        total_sos_count = total_sos_count.trim();
                        $("#service_total_sos_count_id_" + orderid).removeClass('label-secondary').addClass('label-danger');
                        document.getElementById("service_total_sos_count_id_" + orderid).innerHTML = total_sos_count;
                    }
                });
                var tracking_main = 'Clarification';
                var trk_class_main = 'label label-info';
                $("#trackingmain-" + orderid).removeClass().addClass(trk_class_main);
                $("#trackingmain-" + orderid).html(tracking_main);

                document.getElementById("service_sos_form").reset();
                $('#showSos').modal('hide');
                // goURL(base_url + 'services/home/service_dashboard_filter' + orderid);

            });
        },
        beforeSend: function () {
            $("#save_sos").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#save_sos").removeAttr('disabled').html('Post SOS');
            closeLoading();
        }
    });
}

function sort_service_dashboard(sort_criteria = '', sort_type = '') {
    var form_data = new FormData(document.getElementById('filter-form'));
    if (sort_criteria == '') {
        var sc = $('.dropdown-menu li.active').find('a').attr('id');
        var ex = sc.split('-');

        if (ex[0] == 'office_id') {
            var sort_criteria = ex[0];
        } else if (ex[0] == 'practice_id') {
            var sort_criteria = 'indt.' + ex[0];
        } else {
            var sort_criteria = 'ord.' + ex[0];
        }
    }
    if (sort_type == '') {
        var sort_type = 'ASC';
    }
    if (sort_criteria.indexOf('.') > -1) {
        var sp = sort_criteria.split(".");
        var activehyperlink = sp[1] + '-val';
    } else {
        var activehyperlink = sort_criteria + '-val';
    }
    form_data.append('sort_criteria', sort_criteria);
    form_data.append('sort_type', sort_type);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/sort_service_dashboard',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (service_result) {
            $(".ajaxdiv").html(service_result);
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

function sort_new_service_dashboard(sort_criteria = '', sort_type = '') {
    var form_data = new FormData(document.getElementById('filter-form'));
    if (sort_criteria == '') {
        var sc = $('.dropdown-menu li.active').find('a').attr('id');
        var ex = sc.split('-');

        if (ex[0] == 'office_id') {
            var sort_criteria = ex[0];
        } else if (ex[0] == 'id') {
            var sort_criteria = 'inv.' + ex[0];
        } else if (ex[0] == 'practice_id') {
            var sort_criteria = 'indt.' + ex[0];
        } else {
            var sort_criteria = 'sr.' + ex[0];
        }
    }
    if (sort_type == '') {
        var sort_type = 'ASC';
    }
    if (sort_criteria.indexOf('.') > -1) {
        var sp = sort_criteria.split(".");
        var activehyperlink = sp[1] + '-val';
    } else {
        var activehyperlink = sort_criteria + '-val';
    }
    form_data.append('sort_criteria', sort_criteria);
    form_data.append('sort_type', sort_type);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/sort_new_service_dashboard',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (service_result) {
            $(".ajaxdiv").html(service_result);
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

function new_service_Filter()
{
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/new_service_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $(".ajaxdiv").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function serviceFilter() {
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/service_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $(".ajaxdiv").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function select_other_state(value) {
    if (value == '53') {
        document.getElementById('state_other').style.display = "block";
    } else {
        document.getElementById('state_other').style.display = "none";
    }
}

function save_buyer_info() {
    if (!requiredValidation('buyer_info_form')) {
        return false;
    }
    var client_id = $('#reference_id').val();
    var reference = $('#reference').val();
    var order_id = $('#order_id').val();
    var form_data = new FormData(document.getElementById('buyer_info_form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/tax_services/save_buyer_info',
        dataType: "html",
        cache: false,
        processData: false,
        contentType: false,
        success: function (result) {
            // switch (result) {
            //     case "-1":
            //         swal("Error Processing Data");
            //         break;
            //     default:
            //         buyer_info(result);
            // }
            if (result.trim() == "order_wise") {
                swal({title: "Success!", text: "Buyer Info successfully saved!", type: "success"}, function () {
                    $('#buyer_info_modal_div').modal('hide');
                    get_buyer_info_list(client_id, reference, order_id);
                });
            } else {
                if (result.trim() != "0") {
                    var f = $('#buyer_id_hidd').val();
                    var r = f.concat(',', result);
                    var arr = r.split(',').map(Number);
                    $('#buyer_id_hidd').val(arr);
                    swal({title: "Success!", text: "Buyer Info successfully saved!", type: "success"}, function () {
                        $('#buyer_info_modal_div').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/tax_services/get_buyer_info_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $("#buyer_information").html(res);
                            }
                        });
                    });
                } else if (result.trim() == "0") {
                    var f = $('#buyer_id_hidd').val();
                    var arr = f.split(',').map(Number);
                    swal({title: "Success!", text: "Buyer Info successfully updated!", type: "success"}, function () {
                        $('#buyer_info_modal_div').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/tax_services/get_buyer_info_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $('#buyer_id_hidd').val(arr.join());
                                $("#buyer_information").html(res);
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

function get_buyer_info_list(client_id = '', reference = '', order_id = '') {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            reference: reference,
            order_id: order_id
        },
        url: base_url + 'services/tax_services/get_buyer_info_list',
        dataType: "html",
        success: function (result) {
            $("#buyer_information").html(result);
        }
    });
}

function save_seller_info() {
    if (!requiredValidation('seller_info_form')) {
        return false;
    }
    var client_id = $('#reference_id').val();
    var reference = $('#reference').val();
    var order_id = $('#order_id').val();
    var form_data = new FormData(document.getElementById('seller_info_form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/tax_services/save_seller_info',
        dataType: "html",
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (result) {
            // switch (result) {
            //     case "-1":
            //         swal("Error Processing Data");
            //         break;
            //     default:
            //         seller_info(result);
            // }
            if (result.trim() == "order_wise") {
                swal({title: "Success!", text: "Seller Info successfully saved!", type: "success"}, function () {
                    $('#seller_info_modal_div').modal('hide');
                    get_seller_info_list(client_id, reference, order_id);
                });
            } else {
                if (result.trim() != "0") {
                    var f = $('#seller_id_hidd').val();
                    var r = f.concat(',', result);
                    var arr = r.split(',').map(Number);
                    $('#seller_id_hidd').val(arr);
                    swal({title: "Success!", text: "Seller Info successfully saved!", type: "success"}, function () {
                        $('#seller_info_modal_div').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/tax_services/get_seller_info_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $("#seller_information").html(res);
                            }
                        });
                    });
                } else if (result.trim() == "0") {
                    var f = $('#seller_id_hidd').val();
                    var arr = f.split(',').map(Number);
                    swal({title: "Success!", text: "Seller Info successfully updated!", type: "success"}, function () {
                        $('#seller_info_modal_div').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/tax_services/get_seller_info_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $('#seller_id_hidd').val(arr.join());
                                $("#seller_information").html(res);
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

function get_seller_info_list(client_id = '', reference = '', order_id = '') {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            reference: reference,
            order_id: order_id
        },
        url: base_url + 'services/tax_services/get_seller_info_list',
        dataType: "html",
        success: function (result) {
            $("#seller_information").html(result);
        }
    });
}

function buyer_info(id) {
    $.get(base_url + "services/tax_services/buyer_list/" + id, function (data) {
        $("#buyer_information").append(data);
        $("#buyer_info").val(id);
        $('#buyer_info_modal').hide();
    });
}
function seller_info(id) {
    $.get(base_url + "services/tax_services/seller_list/" + id, function (data) {
        $("#seller_information").append(data);
        $("#seller_info").val(id);
        $('#seller_info_modal').hide();
    });
}
function delete_buyer(id) {
    swal({
        title: "Are you sure?",
        text: "This buyer will be deleted!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                id: id
            },
            url: base_url + 'services/tax_services/delete_buyer_info',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    // swal("Deleted!", "Buyer info has been deleted.", "success");
                    // $("#buyer_id_" + id).remove();
                    var client_id = $("#reference_id").val();
                    var reference = $("#reference").val();
                    var order_id = $("#editval").val();
                    if (order_id != '') {
                        get_buyer_info_list(client_id, reference, order_id);
                    } else {
                        var f = $('#buyer_id_hidd').val();
                        var arr = f.split(',').map(Number);
                        if (arr.includes(id) == true) {
                            var index = arr.indexOf(id);
                            if (index > -1) {
                                arr.splice(index, 1);
                            }
                        }
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/tax_services/get_buyer_info_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $('#buyer_id_hidd').val(arr.join());
                                $("#buyer_information").html(res);
                            }
                        });
                    }
                    swal("Deleted!", "Buyer info has been deleted.", "success");
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

function delete_seller(id) {
    swal({
        title: "Are you sure?",
        text: "This seller will be deleted!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                id: id
            },
            url: base_url + 'services/tax_services/delete_seller_info',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    // swal("Deleted!", "Seller info has been deleted.", "success");
                    // $("#seller_id_" + id).remove();
                    var client_id = $("#reference_id").val();
                    var reference = $("#reference").val();
                    var order_id = $("#editval").val();
                    if (order_id != '') {
                        get_seller_info_list(client_id, reference, order_id);
                    } else {
                        var f = $('#seller_id_hidd').val();
                        var arr = f.split(',').map(Number);
                        if (arr.includes(id) == true) {
                            var index = arr.indexOf(id);
                            if (index > -1) {
                                arr.splice(index, 1);
                            }
                        }
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/tax_services/get_seller_info_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $('#seller_id_hidd').val(arr.join());
                                $("#seller_information").html(res);
                            }
                        });
                    }
                    swal("Deleted!", "Seller info has been deleted.", "success");
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

function update_buyer_info(id) {
    if (!requiredValidation('buyer_info_form')) {
        return false;
    }

    var form_data = new FormData($('#buyer_info_form')[0]);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/tax_services/update_buyer/' + id,
        dataType: "html",
        processData: false,
        contentType: false,
        cache: false,
        success: function (result) {
            switch (result) {
                case "-1":
                    swal("Error Processing Data");
                    break;
                default:
                    $.get(base_url + "services/tax_services/buyer_list/" + id, function (data) {
                        $("#buyer_id_" + id).replaceWith(data);
                        $('#buyer_info_modal').hide();
                    });
            }
        }
    });
}
function update_seller_info(id) {
    if (!requiredValidation('seller_info_form')) {
        return false;
    }

    var form_data = new FormData($('#seller_info_form')[0]);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/tax_services/update_seller/' + id,
        dataType: "html",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        success: function (result) {
            switch (result) {
                case "-1":
                    swal("Error Processing Data");
                    break;
                default:
                    $.get(base_url + "services/tax_services/seller_list/" + id, function (data) {
                        $("#seller_id_" + id).replaceWith(data);
                        $('#seller_info_modal').hide();
                    });
            }
        }
    });
}

function request_create_firpta() {
    if (!requiredValidation('form_create_firpta')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
    }
    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_firpta'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/tax_services/request_create_firpta',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log(result);return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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
function get_firpta_buyer_list(id) {
    $.ajax({
        type: "POST",
        data: {
            id: id
        },
        url: base_url + 'services/tax_services/buyer_list_order_id',
        dataType: "html",
        success: function (result) {
            $("#buyer_information").html(result);
        }
    });
}
function get_firpta_seller_list(id) {
    $.ajax({
        type: "POST",
        data: {
            id: id
        },
        url: base_url + 'services/tax_services/seller_list_order_id',
        dataType: "html",
        success: function (result) {
            $("#seller_information").html(result);
        }
    });
}

var saveRelatedService = function () {
    if (!requiredValidation('related_service_form')) {
        return false;
    }
    var service_shortname = $("#service_shortname").val();
    // if(service_shortname == "acc_s_t_a"){
    //     var rt6check = $('input[type=radio][name=Rt6]:checked').length;
    //     if (rt6check == 0) {
    //         swal("ERROR!", "Please check do you have Rt-6?", "error");
    //         return false;
    //     }
    //     var rt6val = $('input[type=radio][name=Rt6]:checked').val();
    //     if (rt6val == 'Yes') {
    //         var residenttype = $('input[type=radio][name=residenttype]:checked').length;
    //         if (residenttype == 0) {
    //             swal("ERROR!", "Please Select Resident or Non-resident", "error");
    //             return false;
    //         }

    //     }
    // }
    // if(service_shortname == "acc_r_a_-_u"){
    //     var rt6check = $('input[type=radio][name=Rt6]:checked').length;
    //     if (rt6check == 0) {
    //         swal("ERROR!", "Please check do you have Sales Tax Application?", "error");
    //         return false;
    //     }

    //     var rt6val = $('input[type=radio][name=Rt6]:checked').val();
    //     if (rt6val == 'No') {
    //         var residenttype = $('input[type=radio][name=residenttype]:checked').length;
    //         if (residenttype == 0) {
    //             swal("ERROR!", "Please Select Resident or Non-resident", "error");
    //             return false;
    //         }
    //         var residenttypeval = $('input[type=radio][name=residenttype]:checked').val();
    //         if (residenttypeval == 'Resident') {
    //             if (document.getElementById("license").files.length == 0) {
    // //                swal("ERROR!", "Please Upload Driver License", "error");
    // //                return false;
    //             }
    //         } else {
    //             if (document.getElementById("passport").files.length == 0) {
    //                 if (document.getElementById("editval").value != "" && document.getElementById("payroll_passport_count").value == "") {
    //                     swal("ERROR!", "Please Upload Passport", "error");
    //                     return false;
    //                 } else {
    //                     swal("ERROR!", "Please Upload Passport", "error");
    //                     return false;
    //                 }
    //             }
    //             if (document.getElementById("lease").files.length == 0) {
    //                 if (document.getElementById("editval").value != "" && document.getElementById("payroll_lease_count").value == "") {
    //                     swal("ERROR!", "Please Upload Lease", "error");
    //                     return false;
    //                 } else {
    //                     swal("ERROR!", "Please Upload Lease", "error");
    //                     return false;
    //                 }
    //             }
    //         }
    //     }
    // }

    var form_data = new FormData(document.getElementById('related_service_form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/request_save_related_service',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'services/home');
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

var serviceListAjax = function (orderID, allStaffs, practice_id = '', office_id = '') {
    if (!$('#collapse' + orderID).hasClass('in')) {
        $('#collapse' + orderID).html('<div class="text-center"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
        $.ajax({
            type: "POST",
            data: {
                order_id: orderID,
                all_staffs: allStaffs,
                practice_id: practice_id,
                office_id: office_id
            },
            url: base_url + 'services/home/service_list_ajax',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    $('#collapse' + orderID).html(result);
                } else {
                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                }
            }
        });
}
}
function payroll_account_details(reference_id) {
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id
        },
        url: base_url + 'services/home/get_payroll_account_list',
        dataType: "html",
        success: function (result) {
            //    alert(result);return false;
            if (result) {
                $("#payroll-accounts-details").html(result);
                $("#payroll-accounts-details").show();
            } else {
                $("#payroll-accounts-details").hide();
                // $("#bank_name").val('');
                // $("#bank_account").val('');
                // $("#bank_routing").val('');
            }
        }
    });
}
function set_exist_account_details(bank_name, bank_number, route_number) {
    if (bank_name != '' && bank_number != '' && route_number != '') {
        $("#bank_name").val(bank_name);
        $("#bank_account").val(bank_number);
        $("#bank_routing").val(route_number);
    } else {
        $("#bank_name").val('');
        $("#bank_account").val('');
        $("#bank_routing").val('');
    }
}


function request_create_legal_translations() {
    if (!requiredValidation('form_create_legal_translations')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }

    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_legal_translations'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/business_services/request_create_legal_translations',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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


function change_price(price, val) {
    var changed_price = (price * val);
    if (changed_price != 0) {
        document.getElementById("employee-retail-price").value = changed_price;
    }
}

function change_partner_service(service_id, is_active = '') {
    if (is_active == 'n') {
        var title = 'Do you want to activate?';
        var msg = "Service has been activated successfully!";
    } else {
        title = 'Do you want to deactivate?';
        msg = "Service has been deactivated successfully!";
    }
    swal({
        title: title,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, change it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: 'POST',
            url: base_url + '/administration/partner_service_setup/change_partner_service_status',
            data: {
                service_id: service_id,
                is_active: is_active
            },
            success: function (results) {
                if (results == 1) {
                    swal({
                        title: "Success!",
                        "text": msg,
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'administration/partner_service_setup');
                    });
                } else {
                    swal("ERROR!", "Unable to change this service status", "error");
                }
            }
        });
    });

}

function deactive_service(service_id, is_active = '') {
    //     alert(status);return false;
    if (is_active == 'n') {
        var title = 'Do you want to activate?';
        var msg = "Service has been activated successfully!";
    } else {
        title = 'Do you want to deactivate?';
        msg = "Service has been deactivated successfully!";
    }
    $.get(base_url + "administration/service_setup/get_service_setup_relations/" + service_id, function (result) {
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
                            url: base_url + '/administration/service_setup/deactive_service',
                            data: {
                                service_id: service_id
                            },
                            success: function (results) {
                                if (results == 1) {
                                    swal({
                                        title: "Success!",
                                        "text": msg,
                                        "type": "success"
                                    }, function () {
                                        goURL(base_url + 'administration/service_setup');
                                    });
                                } else {
                                    swal("ERROR!", "Unable to change this service status", "error");
                                }
                            }
                        });
                    });
        }
    });
}


function request_create_1099_write_up() {
    if (!requiredValidation('form_create_1099_write_up')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        company_type_enable();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }
    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');

    
    var formData = new FormData(document.getElementById('form_create_1099_write_up'));
    $.ajax({
        type: 'POST',
        url: base_url + 'services/accounting_services/request_create_1099_write_up',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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


function recipient_modal(modal_type, reference, reference_id, id, retail_price = '') {

    if (modal_type == "edit") {
        if ($(".recipientedit").hasClass("dcedit")) {
            return false;
        }
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/show_recipient',
        data: {
            modal_type: modal_type,
            reference: reference,
            reference_id: reference_id,
            id: id,
            retail_price: retail_price
        },
        success: function (result) {
            $('#recipient-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}


function save_recipient() {
    if (!requiredValidation('form_recipient')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_recipient'));
    var reference = $("form#form_recipient #reference").val();
    var reference_id = $("form#form_recipient #reference_id").val();
    var retail_price = $("form#form_recipient #retail_price").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/save_recipient',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log(result); return false;
            if (result != 1) {
                swal("ERROR!", "Error Processing Data", "error");
            } else {
                $('#recipient-form').modal('hide');
                get_recipient_list(reference_id, reference, retail_price);
                $('#recipient-list-details').hide();
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

function recipient_delete(id, reference_id, reference) {
    swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this recipient!!",
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
                reference_id: reference_id,
                reference: reference
            },
            url: base_url + "services/home/recipient_delete",
            dataType: "html",
            success: function (result) {
                if (result == '1') {
                    swal("Deleted!", "Your recipient has been deleted.", "success");
                    get_recipient_list(reference_id, reference);
                } else {
                    swal("Error!", "Error to Delete recipient.", "error");
                }
            }
        });
    });
}

function update_recipient() {
    if (!requiredValidation('form_recipient')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_recipient'));
    var reference = $("form#form_recipient #reference").val();
    var reference_id = $("form#form_recipient #reference_id").val();
    var retail_price = $("form#form_recipient #retail_price").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/update_recipient',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log(result); return false;
            if (result != 1) {
                swal("ERROR!", "Error Processing Data", "error");
            } else {
                $('#recipient-form').modal('hide');
                get_recipient_list(reference_id, reference, retail_price);
                // $('#recipient-list-details').hide(); 
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

function partnerServiceAjax(client_type, reference_id) {
    $.ajax({
        type: "POST",
        data: {
            client_type: client_type,
            reference_id: reference_id,
            client_id: $('#client_id').val()
        },
        url: base_url + 'services/partner_services/get_related_section_by_type',
        success: function (result) {
            $("#partner_service_container").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function saveMortgages() {
    if (!requiredValidation('create_mortgages_and_lending')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1' && $('#client_type').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        if (total_percentage != '100.00') {
            // swal("Error", "Percentage of all partners should equal to 100%", "error");
            // return false;
            swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        }
    }

    $("#type").removeAttr('disabled');

    var form_data = new FormData(document.getElementById('create_mortgages_and_lending'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/partner_services/request_create_mortgages',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != 0) {
                swal({
                    "title": "Success!",
                    "text": "Successfully saved!",
                    "type": "success"
                }, function () {
                    goURL(base_url + 'referral_partner/referral_partners/partners');
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

function show_mortgage_information(reference = '', reference_id = '', lead_id = '') {
    // window.location.href = base_url+'services/partner_services/show_mortgages_information/'+reference+'/'+reference_id;
    window.open(
            base_url + 'services/partner_services/show_mortgages_information/' + reference + '/' + reference_id + '/' + lead_id,
            "_blank"
            );
}

function printMortgage() {
    var doPrint = window.open();
    var printHtml = '<style type="text/css">body {background: #fff !important;} *{ font-size: 13px;} table{width:100% !important} .m-info{width:50%;float:left;} th{width:50%} td{width:50%} .mortgage-heading{float:left;width:100%;border-bottom:1px solid #000;border-top:1px solid #000;padding:5px 0px;}</style>';
    printHtml = printHtml + $('.mortgage_container').html();
    doPrint.document.write(printHtml);
    doPrint.print();
    doPrint.close();
}

function get_service_setup_task_department_staff(select_staffs = "", is_all = "", responsible_staff = "") {
    var department_id = $("#assigned_department option:selected").val();
    if (department_id != '') {
        var staff_type = $("#service_task_staff_type").val();
        var ismyself = $(".ismyself").val();
        $.ajax({
            type: "POST",
            data: {
                department_id: department_id,
                responsible_staff: responsible_staff,
                select_staff: select_staffs,
                ismyself: ismyself,
                is_all: is_all
            },
            url: base_url + 'administration/service_setup/get_service_setup_task_department_staff',
            dataType: "html",
            success: function (result) {
                $("#service_task_office_div").html(result);
                $("#service_task_office_div").show();
                $("#service_task_staff_div").hide();
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        });
    } else {
        $("#service_task_office_div").hide();
        $("#service_task_staff_div").hide();
}
}

function save_service_task() {
    if (!requiredValidation('service-setup-task-modal')) {
        return false;
    }
    var main_id = $("#main_id").val();
    var form_data = new FormData(document.getElementById("service-setup-task-modal"));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/service_setup/save_service_task',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Service Task Successfully Added!",
                    type: "success"
                }, function () {
                    $("#serviceTaskModal").modal('hide');
                    location.reload();
                    //goURL(base_url + 'administration/service_setup/create_service_setup/edit/' + main_id + '/service_task');
                }
                );
            } else {
                swal("ERROR!", "Unable To Add Service Setup Task.", "error");
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

function service_task_edit_modal(task_id, service_id = '') {
    $.ajax({
        type: "POST",
        url: base_url + 'modal/edit_service_task_modal',
        dataType: "html",
        data: {task_id: task_id, service_id: service_id},
        success: function (result) {
            $('#serviceTaskModal').html(result);
            $('#serviceTaskModal').modal();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function update_service_task(task_id, service_id) {
    if (!requiredValidation('service-setup-task-edit-modal')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("service-setup-task-edit-modal"));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'administration/service_setup/update_service_task/' + task_id + '/' + service_id,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() != "-1") {
                swal({
                    title: "Success!",
                    text: "Service Task Successfully Updated!",
                    type: "success"
                }, function () {
                    $("#serviceTaskModal").modal('hide');
                    location.reload();
                    // goURL(base_url + 'administration/service_setup/create_service_setup/edit/' + service_id + '/service_task');
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

function service_task_delete_modal(task_id, service_id) {
    swal({
        title: "Are you sure?",
        text: "This service task will be deleted!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false

    }, function () {
        $.ajax({
            type: "POST",
            url: base_url + 'administration/service_setup/delete_service_task_modal',
            dataType: "html",
            data: {task_id: task_id, service_id: service_id},
            success: function (result) {
                if (result.trim() != "-1") {
                    swal({
                        title: "Success!",
                        text: "Service Task Successfully Deleted!",
                        type: "success"
                    }, function () {
                        $("#serviceTaskModal").modal('hide');
                        location.reload();
                        //  goURL(base_url + 'administration/service_setup/create_service_setup/edit/' + service_id + '/service_task');
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
    });
}

function refresh_existing_client_list(office_id = "", client_id = "") {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_id: client_id
        },
        url: base_url + 'billing/invoice/get_completed_orders_officewise',
        dataType: "html",
        success: function (result) {
            $("#client_list_ddl").chosen('destroy');
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

var serviceTaskListAjax = function (service_request_id, service_id, order_id , task_count = '') {
    if (task_count == 0) {
        return false;
    }
    if (!$('#collapse' + service_request_id).hasClass('in')) {
        $('#collapse' + service_request_id).html('<div class="text-center"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
        $.ajax({
            type: "POST",
            data: {
                service_request_id: service_request_id,
                service_id: service_id,
                order_id: order_id
            },
            url: base_url + 'services/home/service_tasklist_ajax',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    $('#collapse' + service_request_id).html(result);
                } else {
                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                }
            }
        });
    }
}
function get_sales_input_data(client_id = '', type_of_client = '') {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id
        },
        url: base_url + 'services/accounting_services/get_client_sales_input_data',
        dataType: "html",
        success: function (result) {
            var res = JSON.parse(result.trim());
            if (res != null && type_of_client == 0) {
                $("#sales_tax_number").val(res.sales_tax_number);
                $("#business_partner_number").val(res.business_partner_number);
                $("#sales_tax_business_description").val(res.sales_tax_business_description);
                $("#sales_tax_id").val(res.sales_tax_id);
                $("#sales_password").val(res.password);
            } else {
                $("#sales_tax_number").val('');
                $("#business_partner_number").val('');
                $("#sales_tax_business_description").val('');
                $("#sales_tax_id").val('');
                $("#sales_password").val('');
            }
        }
    });
}

var add_service_dashboard_notes = () => {
    var formData = new FormData(document.getElementById('modal_note_form'));
    var orderid = $("#modal_note_form #order_id").val();
    var serviceid = $("#modal_note_form #serviceid").val();
    var ref_id = $("#modal_note_form #reference_id").val();
    // var reference = $("#modal_note_form #reference").val();
    formData.append('service_id', serviceid);
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/addNotesmodal',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                if (result != '0') {
                    var prevnotecount = $("#orderservice-" + serviceid + "-" + ref_id).text();
                    var notecount = parseInt(prevnotecount) + parseInt(result);
                    $("#orderservice-" + serviceid + "-" + ref_id).text(notecount);
                }
                $("#orderservice-" + serviceid + "-" + ref_id).removeClass('label label-secondary').addClass('label label-danger');
                document.getElementById("modal_note_form").reset();
                $(".removenoteselector").trigger('click');
                $('#show_notes').modal('hide');

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
function bookkeeping_period(frequency, start_month = '', start_year = '') {
    $.ajax({
        type: "POST",
        data: {
            frequency: frequency,
            start_month: start_month,
            start_year: start_year
        },
        url: base_url + 'services/accounting_services/bookkeeping_period',
        dataType: "html",
        success: function (result) {
            $("#bookkeeping_period_div").html(result);
        }
    });
}

function save_client_manage_bookkeeping_financial_account() {
    if (!requiredValidation('form_financial_accounts')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_financial_accounts'));
    var client_id = $("#client_id").val();
    var client_reference = $("#client_reference").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/save_client_manage_bookkeeping_financial_account',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != "0") {
                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    var obj = JSON.parse(result);
                    var added_amount = parseInt($("#added_amount").val());
                    var added_transaction = $("#added_transaction").val();
                    if (obj.override_price != null) {
                        $("#added_amount").val(added_amount + parseInt(obj.override_price));
                    } else {
                        $("#added_amount").val(added_amount + parseInt(obj.total_amount));
                    }
                    var c = added_transaction.concat(" ", obj.number_of_transactions);
                    var d = c.replace('null', '');
                    $("#added_transaction").val(d);
                    get_client_financial_list(client_id, client_reference);
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable to save financial account", "error");
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

function edit_client_manage_bookkeeping_financial_account() {
    if (!requiredValidation('form_financial_accounts')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_financial_accounts'));
    var client_id = $("#client_id").val();
    var client_reference = $("#client_reference").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/edit_client_manage_bookkeeping_financial_account',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != "0") {
                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    var obj = JSON.parse(result);
                    var edited_financial_ids = $("#edited_financial_ids").val();
                    var c = edited_financial_ids.concat(",", obj.id);
                    $("#edited_financial_ids").val(c);
                    // var edited_amount = parseInt($("#edited_amount").val());
                    // if(obj.override_price != ''){
                    //     $("#edited_amount").val(edited_amount + parseInt(obj.override_price));
                    // }else{
                    //     $("#edited_amount").val(edited_amount + parseInt(obj.total_amount));
                    // }
                    get_client_financial_list(client_id, client_reference);
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable to save financial account", "error");
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

function delete_financial_account_for_manage_bookkeeping(id) {
    swal({
        title: "Are you sure?",
        text: "You want to delete financial account?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e60000",
        confirmButtonText: "Delete!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                account_id: id
            },
            url: base_url + 'services/accounting_services/deactivate_bookkeeping_account',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    var client_id = $("#client_id").val();
                    var obj = JSON.parse(result);
                    var deleted_amount = parseInt($("#deleted_amount").val());
                    if (obj.override_price != null) {
                        $("#deleted_amount").val(deleted_amount + parseInt(obj.override_price));
                    } else {
                        $("#deleted_amount").val(deleted_amount + parseInt(obj.total_amount));
                    }
                    get_client_financial_list(client_id);
                    swal("Deleted!", "Your financial account has been deleted.", "success");
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

function request_create_manage_bookkeeping() {
    if (!requiredValidation('form_create_manage_bookkeeping')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_create_manage_bookkeeping'));
    swal({
        title: "Are you sure?",
        text: "You want to save?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e60000",
        confirmButtonText: "Save!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: form_data,
            url: base_url + 'services/accounting_services/request_create_manage_bookkeeping',
            dataType: "html",
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                // alert(result);return false;
                if (result != 0) {
                    swal("Success!", "Successfully saved!", "success");
                    $("#save_manage_bookkeeping_btn").attr('disabled', true);
                    goURL(base_url + 'action/home');
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
function save_financial_account_for_sales_tax(section = '') {
    if (!requiredValidation('form_accounts')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_accounts'));
    // var company_id = $("#company_id").val();
    var modal_type = $("#modal_type").val();
    // var order_id = $("#order_id").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/save_financial_account_for_sales_tax',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result.trim() != "0") {
                var f = $('#financial_id_hidd').val();
                var r = f.concat(',', result);
                var arr = r.split(',').map(Number);
                $('#financial_id_hidd').val(arr);

                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    // get_financial_account_list_for_sales_tax(company_id, order_id);
                    $.ajax({
                        type: "POST",
                        data: {
                            ids: arr
                        },
                        url: base_url + 'services/home/get_financial_multiple_account_by_id',
                        dataType: "html",
                        success: function (res) {
                            $("#accounts-list").html(res);
                            // $("#accounts-list").append(res);
                        }
                    });
                });
            } else if (result.trim() == "0") {
                // swal("ERROR!", "Unable to save financial account", "error");
                var f = $('#financial_id_hidd').val();
                var arr = f.split(',').map(Number);
                swal({title: "Success!", text: "Financial account successfully updated!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    $.ajax({
                        type: "POST",
                        data: {
                            ids: arr
                        },
                        url: base_url + 'services/home/get_financial_multiple_account_by_id',
                        dataType: "html",
                        success: function (res) {
                            $('#financial_id_hidd').val(arr.join());
                            $("#accounts-list").html(res);
                        }
                    });
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

function get_financial_account_list_for_sales_tax(company_id, order_id = '') {
    $.ajax({
        type: "POST",
        data: {
            company_id: company_id,
            order_id: order_id
        },
        url: base_url + 'services/home/get_financial_account_list_for_sales_tax',
        dataType: "html",
        success: function (result) {
            $("#accounts-list").html(result);
        }
    });
}

function starting_period_for_sales_tax(frequency, start_month = '', start_year = '') {
    $.ajax({
        type: "POST",
        data: {
            frequency: frequency,
            start_month: start_month,
            start_year: start_year
        },
        url: base_url + 'services/accounting_services/starting_period_for_sales_tax',
        dataType: "html",
        success: function (result) {
            $("#starting_period_for_sales_tax_div").html(result);
        }
    });
}

function delete_financial_account_for_sales_tax(id) {
    swal({
        title: "Are you sure?",
        text: "You want to delete financial account?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e60000",
        confirmButtonText: "Delete!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                account_id: id
            },
            url: base_url + 'services/accounting_services/delete_account',
            dataType: "html",
            success: function (result) {
                // alert(result);return false;
                if (result != 0) {
                    // var company_id = $("#company_id").val();
                    // var order_id = $("#order_id").val();
                    var f = $('#financial_id_hidd').val();
                    var arr = f.split(',').map(Number);
                    if (arr.includes(id) == true) {
                        var index = arr.indexOf(id);
                        if (index > -1) {
                            arr.splice(index, 1);
                        }
                    }
                    // get_financial_account_list_for_sales_tax(company_id, order_id);
                    $.ajax({
                        type: "POST",
                        data: {
                            ids: arr
                        },
                        url: base_url + 'services/home/get_financial_multiple_account_by_id',
                        dataType: "html",
                        success: function (res) {
                            $('#financial_id_hidd').val(arr.join());
                            $("#accounts-list").html(res);
                            // $("#accounts-list").append(res);
                        }
                    });
                    swal("Deleted!", "Your financial account has been deleted.", "success");
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

function sales_tax_starting_period_from_client_section(frequency = '', start_month = '', start_year = '') {
    $.ajax({
        type: "POST",
        data: {
            frequency: frequency,
            start_month: start_month,
            start_year: start_year
        },
        url: base_url + 'services/home/sales_tax_starting_period_from_client_section',
        dataType: "html",
        success: function (result) {
            $("#sales_tax_starting_period_from_client_section_div").html(result);
        }
    });
}
function set_service_retail_price_officewise(office_id = '', service_id = '') {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            service_id: service_id
        },
        url: base_url + 'services/home/get_office_service_by_id',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                $("#retail_price").val(result);
            }
        }
    });
}
function set_service_retail_price(office_id = '', service_id = '', service_name = '') {
    if (service_name != 'bookkeeping_by_date') {
        var related_service = $("#related_services").val();
        if (related_service != null) {
            $('#related_services').val('').trigger('chosen:updated');
            $.ajax({
                type: 'POST',
                data: {
                    service_id: service_id,
                    relative_service_id: '',
                    office: office_id
                },
                url: base_url + 'services/home/get_related_service_container',
                dataType: 'html',
                success: function (result) {
                    $('#related_service_container').html(result);
                }
            });
        }
    }
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            service_id: service_id
        },
        url: base_url + 'services/home/get_office_service_by_id',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                $("#office_service_fees").val(result);
            }
        }
    });
}
function set_service_retail_price_for_existing_client(client_id, reference, service_id) {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            reference: reference
        },
        url: base_url + 'services/home/get_office_by_client_id',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                set_service_retail_price(result, service_id);
            }
        }
    });
}

function reset_related_service_container(service_id) {
    var related_service = $("#related_services").val();
    if (related_service != null) {
        $('#related_services').val('').trigger('chosen:updated');
        $.ajax({
            type: 'POST',
            data: {
                service_id: service_id,
                relative_service_id: '',
                office: ''
            },
            url: base_url + 'services/home/get_related_service_container',
            dataType: 'html',
            success: function (result) {
                $('#related_service_container').html(result);
            }
        });
    }
}

function legalContainerAjax(client_type = '', reference_id = '', legal_id = '')
{
    var url = '';
    if (legal_id != '') {
        // url = 'project/get_edit_project_container_ajax';
    } else {
//        alert("hi");return false;
        url = 'services/home/get_legal_container_ajax';
    }
    $.ajax({
        type: 'POST',
        url: base_url + url,
        data: {
            legal_id: legal_id,
            client_type: client_type,
            reference_id: reference_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//            alert(result);
            if (result != '0') {
                // $('#action_container').find('#individual_list_ddl').chosen('destroy');
                $('#legal_container').html(result);
                // $('#action_container').find('#individual_list_ddl').chosen();
            } else {
                go('services/home');
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

function editlegalContainerAjax(client_type = '', reference_id = '', legal_id = '')
{
    var url = 'services/home/edit_get_legal_container_ajax';
    $.ajax({
        type: 'POST',
        url: base_url + url,
        data: {
            legal_id: legal_id,
            client_type: client_type,
            reference_id: reference_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//            alert(result);
            if (result != '0') {
                // $('#action_container').find('#individual_list_ddl').chosen('destroy');
                $('#legal_container').html(result);
                // $('#action_container').find('#individual_list_ddl').chosen();
            } else {
                go('services/home');
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
function change_status_order(order_id, invoice_id, status)
{
    openModal('changeorderinner');
    var txt = 'Order ID - #' + invoice_id;
    $("#changeorderinner .modal-title").html(txt);
    if (status == 0) {
        $("#changeorderinner #pro12").prop('checked', true);
        $("#changeorderinner #pro14").prop('checked', false);
        $("#changeorderinner #pro02").prop('checked', false);
    } else if (status == 7) {
        $("#changeorderinner #pro14").prop('checked', true);
        $("#changeorderinner #pro12").prop('checked', false);
        $("#changeorderinner #pro02").prop('checked', false);
    } else if (status == 2) {
        $("#changeorderinner #pro02").prop('checked', true);
        $("#changeorderinner #pro12").prop('checked', false);
        $("#changeorderinner #pro14").prop('checked', false);
    }
    $.get($('#baseurl').val() + "services/home/get_tracking_log/" + order_id + "/order", function (data) {
        $("#order_status_log > tbody > tr").remove();
        var returnedData = JSON.parse(data);
        for (var i = 0, l = returnedData.length; i < l; i++) {
            // $('#order_status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["stuff_id"] + "</td>" + "<td>" + returnedData[i]["department"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>"  + "<td>" + returnedData[i]["created_time"] + "</td></tr>");
            $('#order_status_log > tbody:last-child').append("<tr><td>" + returnedData[i]["stuff_id"] + "</td>" + "<td>" + returnedData[i]["status"] + "</td>" + "<td>" + returnedData[i]["created_time"] + "</td></tr>");
        }
        if (returnedData.length >= 1)
            $("#changeorderinner #order_log_modal").show();
        else
            $("#changeorderinner #order_log_modal").hide();
    });
    $("#changeorderinner #main_id").val(order_id);
    $("#changeorderinner #invoice_id").val(invoice_id);
    $("#changeorderinner #status").val(status);
}
function updateStatusorder() {
    var statusval = $('#changeorderinner input:radio[name=radio]:checked').val();
    var order_id = $('#changeorderinner #main_id').val();
    var invoice_id = $('#changeorderinner #invoice_id').val();
    var status = $('#changeorderinner #status').val();
    var base_url = $('#baseurl').val();
    if (statusval == 7) {
        swal({
            title: "Are you sure?",
            text: "Do you want to cancel the related invoice too?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: false
        },
                function (isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            type: "POST",
                            data: {
                                statusval: statusval,
                                suborderid: order_id,
                                status: status,
                                invoice_id: invoice_id
                            },
                            url: base_url + 'services/home/update_order_status',
                            dataType: "html",
                            success: function (result) {
                                if (result.trim() == 'error_on_input_form') {
                                    swal("Can not change status!", "Please complete input form first...!", "error");
                                } else if (result.trim() == 'paid') {
                                    swal("Can not change status", "Payment has been made.", "error");
                                    $("#changeorderinner").modal('hide');
                                } else if (result.trim() == 'error_on_sos_read_status') {
                                    swal("Can not change status!", "Please clear SOS notification first...!", "error");
                                } else {
                                    var res = JSON.parse(result.trim());
                                    if (res.main_order_status == 0) {
                                        var tracking_main = 'Completed';
                                        var trk_class_main = 'label-primary';
                                    } else if (res.main_order_status == 1) {
                                        var tracking_main = 'Started';
                                        var trk_class_main = 'label-yellow';
                                    } else if (res.main_order_status == 2) {
                                        var tracking_main = 'Not Started';
                                        var trk_class_main = 'label-success';
                                    } else if (res.main_order_status == 7) {
                                        var tracking_main = 'Canceled';
                                        var trk_class_main = 'label-danger';
                                    } else if (res.main_order_status == 5) {
                                        var tracking_main = 'Clarification';
                                        var trk_class_main = 'label-info';
                                    }
                                    $("#trackingmain-" + order_id).removeAttr('onclick');
                                    $("#trackingmain-" + order_id).attr('onclick', 'change_status_order(' + order_id + ',' + invoice_id + ',' + res.main_order_status + ')');
                                    $("#trackingmain-" + order_id).html('<span class="label ' + trk_class_main + ' label-block" style="width: 80px; display: inline-block; text-align: center;">' + tracking_main + '</span>');
                                    $("#changeorderinner").modal('hide');
                                    swal("Success", "", "success");
                                }
                            },
                            beforeSend: function () {
                                $("#save-tracking").prop('disabled', true).html('Processing...');
                                openLoading();
                            },
                            complete: function (msg) {
                                $("#save-tracking").removeAttr('disabled').html('Save changes');
                                closeLoading();
                            }
                        });

                    } else {
                        swal("Cancelled", "", "error");
                    }
                });
    } else {
        $.ajax({
            type: "POST",
            data: {
                statusval: statusval,
                suborderid: order_id,
                status: status,
                invoice_id: invoice_id
            },
            url: base_url + 'services/home/update_order_status',
            dataType: "html",
            success: function (result) {
                if (result.trim() == 'error_on_input_form') {
                    swal("Can not change status!", "Please complete input form first...!", "error");
                } else if (result.trim() == 'error_on_sos_read_status') {
                    swal("Can not change status!", "Please clear SOS notification first...!", "error");
                } else {
                    var res = JSON.parse(result.trim());
                    if (res.main_order_status == 0) {
                        var tracking_main = 'Completed';
                        var trk_class_main = 'label-primary';
                    } else if (res.main_order_status == 1) {
                        var tracking_main = 'Started';
                        var trk_class_main = 'label-yellow';
                    } else if (res.main_order_status == 2) {
                        var tracking_main = 'Not Started';
                        var trk_class_main = 'label-success';
                    } else if (res.main_order_status == 7) {
                        var tracking_main = 'Canceled';
                        var trk_class_main = 'label-danger';
                    } else if (res.main_order_status == 5) {
                        var tracking_main = 'Clarification';
                        var trk_class_main = 'label-info';
                    }
                    $("#trackingmain-" + order_id).removeAttr('onclick');
                    $("#trackingmain-" + order_id).attr('onclick', 'change_status_order(' + order_id + ',' + invoice_id + ',' + res.main_order_status + ')');
                    $("#trackingmain-" + order_id).html('<span class="label ' + trk_class_main + ' label-block" style="width: 80px; display: inline-block; text-align: center;">' + tracking_main + '</span>');
                    $("#changeorderinner").modal('hide');
                }
            },
            beforeSend: function () {
                $("#save-tracking").prop('disabled', true).html('Processing...');
                openLoading();
            },
            complete: function (msg) {
                $("#save-tracking").removeAttr('disabled').html('Save changes');
                closeLoading();
            }
        });
    }

}

function ServiceClientTypeContainerAjax(client_type, reference_id, service_id, order_id = '') {
    var office_id = $("#your_office").val();
    var url = '';
    if (order_id != '') {
        url = 'services/home/get_service_client_type_container_ajax_for_edit';
    } else {
        url = 'services/home/get_service_client_type_container_ajax';
    }
    $.ajax({
        type: 'POST',
        url: base_url + url,
        data: {
            client_type: client_type,
            reference_id: reference_id,
            service_id: service_id,
            order_id: order_id,
            office_id: office_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result != '0') {
                $('#client_information_container').html(result);
                if (client_type == '1') {
                    $('#reference_id').val(reference_id);
                    $('#reference').val('company');
                    $('#renewal_date').show();
                    $('#client_type').val(1); // For Service 'Annual Report'
                } else if (client_type == '2') {
                    $('#reference_id').val(reference_id);
                    $('#reference').val('individual');
                    $('#renewal_date').hide(); // For Service 'Annual Report'
                }
            } else {
                go('services/home');
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

function BusinessClientTypeChange(type_of_client, new_reference_id, reference, service_id) {
    clearErrorMessageDiv();
    var service_short_form = $('#service_shortform').val();
    if (parseInt(type_of_client) == 0) {
        $(".client_id_name_div").show();
        $('.chosen-select').chosen();
        $('.client_type_field0').prop('required', true);
        $('.client_type_div0').show();
        $('.client_type_field1').val('');
        $('.client_type_field1').prop('required', false);
        $('.client_type_div1').hide();
        $('.display_div').hide();
        if (service_short_form == 'acc_r_b') { // Recurring Bookkeeping
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
        } else if (service_short_form == 'acc_b_b_d') { // Bookkeeping By Date
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
        } else if (service_short_form == 'acc_s_t_r') { // Sales Tax Recurring
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
            $("#financial_id_hidd").val('');
            var reference_id = $("#reference_id").val();
            get_sales_input_data_for_salestax_recurring(reference_id, reference, type_of_client);
        } else if (service_short_form == 'acc_s_t_p') { // Sales Tax Processing
            var reference_id = $("#reference_id").val();
            get_sales_input_data_for_salestax_processing(reference_id, reference, type_of_client);
        } else if (service_short_form == 'acc_1_w_u') { // 1099 Write Up
            $("#payer_first_name").val('');
            $("#payer_last_name").val('');
            $("#payer_phone_number").val('');
            $("#payer_address").val('');
            $("#payer_city").val('');
            $("#payer_state").val('');
            $("#payer_country").val('');
            $("#payer_zip_code").val('');
        }
    } else if (parseInt(type_of_client) == 1) {
        $('.chosen-select').chosen();
        $('.client_type_field1').prop('required', true);
        $('.client_type_div1').show();
        $('.client_type_field0').val('').trigger('chosen:updated');
        $('.client_type_field0').prop('required', false);
        $('.client_type_div0').hide();
        $('.display_div').show();
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
        $("#client_id_hidden_div").html('<div class="form-group row client_id_name_div" style="display: none;"><label class="col-lg-3">Client ID</label><div class="col-lg-9"><div id="client_id_name"></div></div></div>');
        if (service_short_form == 'acc_r_b') { // Recurring Bookkeeping
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
            // get_financial_account_list_recurring_bookkeeping(new_reference_id, reference);
        } else if (service_short_form == 'acc_b_b_d') { // Bookkeeping By Date
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
            // get_financial_account_list_bookkeeping_by_date(new_reference_id, reference);
        } else if (service_short_form == 'acc_s_t_r') { // Sales Tax Recurring
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
            $("#financial_id_hidd").val('');
            var reference_id = $("#reference_id").val();
            get_sales_input_data_for_salestax_recurring(reference_id, reference, type_of_client);
        } else if (service_short_form == 'acc_s_t_p') { // Sales Tax Processing
            var reference_id = $("#reference_id").val();
            get_sales_input_data_for_salestax_processing(reference_id, reference, type_of_client);
        } else if (service_short_form == 'acc_1_w_u') { // 1099 Write Up
            $("#payer_first_name").val('');
            $("#payer_last_name").val('');
            $("#payer_phone_number").val('');
            $("#payer_address").val('');
            $("#payer_city").val('');
            $("#payer_state").val('');
            $("#payer_country").val('');
            $("#payer_zip_code").val('');
        }
    }
    setReferenceId('', new_reference_id, reference, service_id);
    $('.value_field').val('');
    $('.required_field').prop('required', true);
    $('.disabled_field').prop('disabled', false);
    change_referred_name_status('');
}
function refresh_existing_business_client_list(office_id = "", client_id = "") {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_id: client_id
        },
        url: base_url + 'billing/invoice/get_completed_orders_officewise',
        dataType: "html",
        success: function (result) {
            $("#client_list_ddl").chosen();
            $("#client_list_ddl").chosen('destroy');
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
function fetchExistingBusinessClientData(reference_id, new_reference_id, reference, service_id) {
    clearErrorMessageDiv();
    $('.value_field').val('');
    setReferenceId(reference_id, new_reference_id, reference, service_id);
    if (reference_id != '') {
        get_contact_list(reference_id, 'company', '', 'service');
        $('.required_field').prop('required', false);
        getCompanyData(reference_id);
        get_state_of_incorporation_value(reference_id);
        get_company_type(reference_id);
        //$('.disabled_field').prop('disabled', true);
        $('.disabled_field').prop('disabled', false);
        //get_state_county_val(reference_id)
        // payroll_account_details(reference_id);
        $('#exist_client_id').val(reference_id);
        $(".client_id_name_div").css('display', 'block');
        get_client_id_by_company(reference_id);
        // payroll_employee_details(reference_id);
    } else {
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
        $('.required_field').prop('required', false);
        $('.disabled_field').prop('disabled', false);
    }
}

function show_business_fields_according_to_service(reference_id) {
    if (reference_id != '') {
        var service_short_form = $('#service_shortform').val();
        if (service_short_form == 'inc_f_a_r' || service_short_form == 'inc_d_a_r' || service_short_form == 'inc_a_a_r' || service_short_form == 'inc_w_a_r' || service_short_form == 'inc_m_a_r_c' || service_short_form == 'inc_t_a_r' || service_short_form == 'inc_n_j_a_r' || service_short_form == 'inc_n_y_a_r') {
            // For Service 'Annual Report'
            $.ajax({
                type: 'POST',
                url: base_url + 'services/home/get_due_date_for_existing_client',
                data: {ref_id: reference_id},
                success: function (result) {
                    if (result != 0) {
                        $('#due_date').val(result);
                        $('#state_div').show();
                        $('#type_div').show();
                    } else {
                        $('#due_date').val('');
                        $('#state_div').show();
                        $('#type_div').show();
                    }
                }
            });
        } else if (service_short_form == 'inc_c_o_g_s_d' || service_short_form == 'inc_c_o_g_s_f') {
            // For service 'Certificate of good standing'
            $.ajax({
                type: 'POST',
                url: base_url + 'services/home/get_company_details_by_reference_id',
                data: {ref_id: reference_id},
                success: function (result) {
                    if (result != 0) {
                        var data = JSON.parse(result);
                        var state_of_incorporation = data.state_opened;
                        if (state_of_incorporation == 10) {  // Florida
                            $('#service_id').val(53); // Certificate Of Good Standing FL
                            $('#service_shortform').val('inc_c_o_g_s_f');
                            $("#main_service_note_div").empty();
                            $('#main_service_note_div').html('<div class="form-group"><label class="col-lg-3 control-label">Service Note</label><div class="col-lg-9"><div class="note-textarea"><textarea  class="form-control" name="service_notes[' + 53 + '][]"  title="Service Note"></textarea></div><a href="javascript:void(0)" class="text-success add-servicenote"><i class="fa fa-plus"></i> Add Notes</a> </div></div>');

                            $('.add-servicenote').click(function () {
                                var textnote = $(this).prev('.note-textarea').html();
                                var note_label = $(this).parent().parent().find("label").html();
                                var div_count = Math.floor((Math.random() * 999) + 1);
                                var newHtml = '<div class="form-group" id="servicenote_div' + div_count + '"> ' +
                                        '<label class="col-lg-3 control-label"></label>' +
                                        '<div class="col-lg-9">' +
                                        textnote +
                                        '<a href="javascript:void(0)" onclick="removeNote(\'servicenote_div' + div_count + '\')" class="text-danger show m-t-10"><i class="fa fa-times"></i> Remove Note</a>' +
                                        '</div>'
                                '</div>';
                                $(newHtml).insertAfter($(this).closest('.form-group'));
                            });
                        } else if (state_of_incorporation == 8) {  // Delaware
                            $('#service_id').val(6); // Certificate of Good Standing DE
                            $('#service_shortform').val('inc_c_o_g_s_d');
                            $("#main_service_note_div").empty();
                            $('#main_service_note_div').html('<div class="form-group"><label class="col-lg-3 control-label">Service Note</label><div class="col-lg-9"><div class="note-textarea"><textarea  class="form-control" name="service_notes[' + 6 + '][]"  title="Service Note"></textarea></div><a href="javascript:void(0)" class="text-success add-servicenote"><i class="fa fa-plus"></i> Add Notes</a> </div></div>');

                            $('.add-servicenote').click(function () {
                                var textnote = $(this).prev('.note-textarea').html();
                                var note_label = $(this).parent().parent().find("label").html();
                                var div_count = Math.floor((Math.random() * 999) + 1);
                                var newHtml = '<div class="form-group" id="servicenote_div' + div_count + '"> ' +
                                        '<label class="col-lg-3 control-label"></label>' +
                                        '<div class="col-lg-9">' +
                                        textnote +
                                        '<a href="javascript:void(0)" onclick="removeNote(\'servicenote_div' + div_count + '\')" class="text-danger show m-t-10"><i class="fa fa-times"></i> Remove Note</a>' +
                                        '</div>'
                                '</div>';
                                $(newHtml).insertAfter($(this).closest('.form-group'));
                            });
                        } else { // Blank
                            $('#service_id').val(6); // Certificate of Good Standing DE
                            $('#service_shortform').val('inc_c_o_g_s_d');
                            $("#main_service_note_div").empty();
                            $('#main_service_note_div').html('<div class="form-group"><label class="col-lg-3 control-label">Service Note</label><div class="col-lg-9"><div class="note-textarea"><textarea  class="form-control" name="service_notes[' + 6 + '][]"  title="Service Note"></textarea></div><a href="javascript:void(0)" class="text-success add-servicenote"><i class="fa fa-plus"></i> Add Notes</a> </div></div>');

                            $('.add-servicenote').click(function () {
                                var textnote = $(this).prev('.note-textarea').html();
                                var note_label = $(this).parent().parent().find("label").html();
                                var div_count = Math.floor((Math.random() * 999) + 1);
                                var newHtml = '<div class="form-group" id="servicenote_div' + div_count + '"> ' +
                                        '<label class="col-lg-3 control-label"></label>' +
                                        '<div class="col-lg-9">' +
                                        textnote +
                                        '<a href="javascript:void(0)" onclick="removeNote(\'servicenote_div' + div_count + '\')" class="text-danger show m-t-10"><i class="fa fa-times"></i> Remove Note</a>' +
                                        '</div>'
                                '</div>';
                                $(newHtml).insertAfter($(this).closest('.form-group'));
                            });
                        }
                        $('#state_div').show();
                        set_retail_price_for_main_service('', '');
                    } else {
                        $('#state_div').show();
                        set_retail_price_for_main_service('', '');
                    }
                }
            });
        } else if (service_short_form == 'acc_r_b') { // Recurring Bookkeeping
            var client_id = $("#reference_id").val();
            var client_reference = $("#reference").val();
            get_financial_account_list_recurring_bookkeeping(client_id, client_reference);
        } else if (service_short_form == 'acc_b_b_d') { // Bookkeeping By Date
            var client_id = $("#reference_id").val();
            var client_reference = $("#reference").val();
            get_financial_account_list_bookkeeping_by_date(client_id, client_reference);
        } else if (service_short_form == 'acc_s_t_r') { // Sales Tax Recurring
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
            $("#financial_id_hidd").val('');
            var client_reference = $("#reference").val();
            var type_of_client = $("#type_of_client_ddl").val();
            get_sales_input_data_for_salestax_recurring(reference_id, client_reference, type_of_client);
        } else if (service_short_form == 'acc_s_t_p') { // Sales Tax Processing
            var client_reference = $("#reference").val();
            var type_of_client = $("#type_of_client_ddl").val();
            get_sales_input_data_for_salestax_processing(reference_id, client_reference, type_of_client);
        } else if (service_short_form == 'acc_1_w_u') { // 1099 Write Up
            $("#payer_first_name").val('');
            $("#payer_last_name").val('');
            $("#payer_phone_number").val('');
            $("#payer_address").val('');
            $("#payer_city").val('');
            $("#payer_state").val('');
            $("#payer_country").val('');
            $("#payer_zip_code").val('');
        }
    }
}

function show_individual_fields_according_to_service(title_id = '') {
    if (title_id != '') {
        $.ajax({
            type: 'POST',
            url: base_url + 'billing/invoice/individual_info_ajax',
            data: {
                title_id: title_id
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                if (result != '0') {
                    var individual_info = JSON.parse(result);
                    var reference_id = individual_info.individual_id;
                    var service_short_form = $('#service_shortform').val();
                    if (service_short_form == 'acc_r_b') { // Recurring Bookkeeping
                        get_financial_account_list_recurring_bookkeeping(reference_id, 'individual');
                    } else if (service_short_form == 'acc_b_b_d') { // Bookkeeping By Date
                        get_financial_account_list_bookkeeping_by_date(reference_id, 'individual');
                    } else if (service_short_form == 'acc_s_t_r') { // Sales Tax Recurring
                        $("#financial-account-list-data").empty();
                        $("#accounts-list-count").val('');
                        $("#financial_id_hidd").val('');
                        var type_of_client = $("#type_of_individual_ddl").val();
                        get_sales_input_data_for_salestax_recurring(reference_id, 'individual', type_of_client);
                    } else if (service_short_form == 'acc_s_t_p') { // Sales Tax Processing
                        var type_of_client = $("#type_of_individual_ddl").val();
                        get_sales_input_data_for_salestax_processing(reference_id, 'individual', type_of_client);
                    } else if (service_short_form == 'acc_1_w_u') { // 1099 Write Up
                        $("#payer_first_name").val('');
                        $("#payer_last_name").val('');
                        $("#payer_phone_number").val('');
                        $("#payer_address").val('');
                        $("#payer_city").val('');
                        $("#payer_state").val('');
                        $("#payer_country").val('');
                        $("#payer_zip_code").val('');
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
}

function IndividualClientTypeChange(type_of_individual, new_reference_id, reference) {
    clearErrorMessageDiv();
    var service_short_form = $('#service_shortform').val();
    if (parseInt(type_of_individual) == 0) {
        $(".client_id_individual_div").show();
        $('.chosen-select').chosen();
        $('.client_type_field0').prop('required', true);
        $('.client_type_div0').show();
        $('.required_field').prop('required', false);
        $('.display_div').hide();
        if (service_short_form == 'acc_r_b') { // Recurring Bookkeeping
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
        } else if (service_short_form == 'acc_b_b_d') { // Bookkeeping By Date
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
        } else if (service_short_form == 'acc_s_t_r') { // Sales Tax Recurring
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
            $("#financial_id_hidd").val('');
            var reference_id = $("#reference_id").val();
            get_sales_input_data_for_salestax_recurring(reference_id, reference, type_of_individual);
        } else if (service_short_form == 'acc_s_t_p') { // Sales Tax Processing
            var reference_id = $("#reference_id").val();
            get_sales_input_data_for_salestax_processing(reference_id, reference, type_of_individual);
        } else if (service_short_form == 'acc_1_w_u') { // 1099 Write Up
            $("#payer_first_name").val('');
            $("#payer_last_name").val('');
            $("#payer_phone_number").val('');
            $("#payer_address").val('');
            $("#payer_city").val('');
            $("#payer_state").val('');
            $("#payer_country").val('');
            $("#payer_zip_code").val('');
        } else if (service_short_form == 'tax_i_c') { // ITIN CORP
            $("#passport").val('');
            $("#visa").val('');
            $("#main_address").val('');
            $("#main_city").val('');
            $("#main_state").val('');
            $("#main_zip").val('');
            $("#main_country").val('');
            $("#email").val('');
            $("#foreign_address").val('');
            $("#foreign_city").val('');
            $("#foreign_state").val('');
            $("#foreign_zip").val('');
            $("#foreign_country").val('');
        }
    } else if (parseInt(type_of_individual) == 1) {
        $('.chosen-select').chosen();
        $('.client_type_field0').val('').trigger('chosen:updated');
        $('.client_type_field0').prop('required', false);
        $('.client_type_div0').hide();
        $('.required_field').prop('required', true);
        $('.display_div').show();
        $("#contact-list").html(blank_contact_list());
        $("#owners-list").html(blank_owner_list());
        $("#client_id_ind_hidden_div").html('<div class="form-group row client_id_individual_div" style="display: none;"><label class="col-lg-3">Client ID</label><div class="col-lg-9"><div id="client_id_individual"></div></div></div>');
        if (service_short_form == 'acc_r_b') { // Recurring Bookkeeping
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
            get_financial_account_list_recurring_bookkeeping(new_reference_id, reference);
        } else if (service_short_form == 'acc_b_b_d') { // Bookkeeping By Date
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
            get_financial_account_list_bookkeeping_by_date(new_reference_id, reference);
        } else if (service_short_form == 'acc_s_t_r') { // Sales Tax Recurring
            $("#financial-account-list-data").empty();
            $("#accounts-list-count").val('');
            $("#financial_id_hidd").val('');
            var reference_id = $("#reference_id").val();
            get_sales_input_data_for_salestax_recurring(reference_id, reference, type_of_individual);
        } else if (service_short_form == 'acc_s_t_p') { // Sales Tax Processing
            var reference_id = $("#reference_id").val();
            get_sales_input_data_for_salestax_processing(reference_id, reference, type_of_individual);
        } else if (service_short_form == 'acc_1_w_u') { // 1099 Write Up
            $("#payer_first_name").val('');
            $("#payer_last_name").val('');
            $("#payer_phone_number").val('');
            $("#payer_address").val('');
            $("#payer_city").val('');
            $("#payer_state").val('');
            $("#payer_country").val('');
            $("#payer_zip_code").val('');
        } else if (service_short_form == 'tax_i_c') { // ITIN CORP
            $("#passport").val('');
            $("#visa").val('');
            $("#main_address").val('');
            $("#main_city").val('');
            $("#main_state").val('');
            $("#main_zip").val('');
            $("#main_country").val('');
            $("#email").val('');
            $("#foreign_address").val('');
            $("#foreign_city").val('');
            $("#foreign_state").val('');
            $("#foreign_zip").val('');
            $("#foreign_country").val('');
        }
        $("#type_of_individual_ddl").val(1);
    }
    var office_id = $("#your_office").val();
    $("#staff_office").val(office_id);
    refresh_existing_individual_client_list(office_id, '');
    setReferenceId('', new_reference_id, reference, '');
    $('.value_field').val('');
    change_referred_name_status('');
}
function refresh_existing_individual_client_list(officeID = '', clientID = '') {
    $.ajax({
        type: "POST",
        data: {
            office_id: officeID,
            client_id: clientID
        },
        url: base_url + 'billing/invoice/individual_list_by_office',
        dataType: "html",
        success: function (result) {
            $("#individual_list_ddl").chosen();
            $("#individual_list_ddl").chosen('destroy');
            $("#individual_list_ddl").html(result);
            $("#individual_list_ddl").chosen();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function fetchExistingIndividualClientData(title_id, new_reference_id, reference) {
    clearErrorMessageDiv();
    $('.value_field').val('');
    if (title_id != '') {
        IndividualClientInfoByTitleId(title_id, new_reference_id, reference);
        $(".client_id_individual_div").css('display', 'block');
        get_client_id_by_individual(title_id);
    } else {
        $('.disabled_field').prop('disabled', false);
        $('.required_field').prop('required', true);
        $('.display_div').show();
    }
}
function IndividualClientInfoByTitleId(title_id, new_reference_id, reference) {
    $.ajax({
        type: 'POST',
        url: base_url + 'billing/invoice/individual_info_ajax',
        data: {
            title_id: title_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != '0') {
                var individual_info = JSON.parse(result);
                var reference_id = individual_info.individual_id;
                get_contact_list(reference_id, 'individual', '', 'service');
                setReferenceId(reference_id, new_reference_id, reference, 1);
                $('.display_div').hide();
                $('.required_field').prop('required', false);
            } else {
                setReferenceId('', new_reference_id, reference, 1);
                $('.disabled_field').prop('disabled', false);
                $('.required_field').prop('required', true);
                $('.display_div').show();
                $("#contact-list").html(blank_contact_list());
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
function get_client_id_by_individual(title_id) {
    $.ajax({
        type: "POST",
        data: {
            title_id: title_id
        },
        url: base_url + 'services/home/get_client_id_by_individual',
        dataType: "html",
        success: function (result) {
            $("#client_id_individual").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function get_services_input_form_data_div(inputform_yes_no, service_shortform = '') {
    $.ajax({
        type: "POST",
        data: {
            inputform_yes_no: inputform_yes_no,
            service_shortform: service_shortform
        },
        url: base_url + 'services/home/get_services_input_form_data_div',
        dataType: "html",
        success: function (result) {
            if (result != '0') {
                $("#service_input_form_field_div").html(result);
                $("#if_inputform_yes").val('y');
            } else {
                $("#service_input_form_field_div").html('');
                $("#if_inputform_yes").val('n');
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

/*service section renovation*/
function load_additional_service(service_id = '' , form = '') {
    var client_type = $('#client_type').val();
    var section_id = $('#section_id').val();
    if (service_id == '') {
        var service_id = $("#service_id").val();
    }
    if (form == 'edit') {
        var project_div = $("#project_related_div").html();
        if (project_div != '') {
            swal({
                title: "ERROR!",
                text: "Sorry You can't add multiple services as project is associated with main service",
                type: "error"
            });
            return false;
        }
    } 
    
    $("#pattern_div").hide();
    $("#pattern").prop('required' , false);
    var current_text = $("#create_project_section").html();
    if (current_text != '') {
        $("#create_project_section").html('<h3>Project Generation</h3><div class="row"><div class="col-lg-2 col-md-2 text-right"><b><s>Will Create Project ?</s> </b></div><div class="col-lg-10 col-md-10"><i class="fa fa-star text-danger"></i><b class="text-danger"> Sorry!! Project creation feature is not available with multiple services</b><div class="hr-line-dashed"></div></div></div>');
    }
    $.ajax({
        type: "POST",
        data: {
            service_id: service_id,
            client_type: client_type,
            section_id: section_id
        },
        url: base_url + 'services/home/load_additional_service',
        dataType: "html",
        success: function (result) {
            if (result != '0') {
                var obj = $.parseJSON(result);
                var newHtml = obj.section_result;
                if (obj.last_section_id == 'new') {
                    $('#additional_service_container').html(newHtml);
                    // $(".add_serv").hide();
                } else {
                    var section_link = $('#section_link_' + obj.last_section_id);
                    section_link.attr('onclick', 'removeServiceSection(' + obj.last_section_id + ');');
                    section_link.removeClass('btn-primary');
                    section_link.addClass('btn-danger');
                    section_link.removeClass('text-success');
                    section_link.addClass('text-danger');
                    section_link.html('<h3 class="p-0 m-0 text-white"><i class="fa fa-times"></i> Remove Service</h3>');
                    section_link.blur();
                    $('#section_link_remove_' + obj.last_section_id).attr("style", "display:none");
                    $(newHtml).insertAfter($('#service_result_div_' + obj.last_section_id));
                }

                $('#section_id').val(obj.section_id_hidden);
            } else {
                $('#additional_service_container').html('');
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

function load_additional_service_during_edit(service_id = '', remove_id = '') {
    var client_type = $('#client_type').val();
    var section_id = $('#section_id').val();
    if (service_id == '') {
        var service_id = $("#service_id").val();
    }
    $.ajax({
        type: "POST",
        data: {
            service_id: service_id,
            client_type: client_type,
            section_id: section_id
        },
        url: base_url + 'services/home/load_additional_service',
        dataType: "html",
        success: function (result) {
            if (result != '0') {
                var obj = $.parseJSON(result);
                var newHtml = obj.section_result;
                if (obj.last_section_id == 'new') {
                    $('#additional_service_container').html(newHtml);
                    // $(".add_serv").hide();
                } else {
                    var section_link = $('#section_link_' + obj.last_section_id);
                    section_link.attr('onclick', 'deleteExistingServiceSection(' + remove_id + ');');
                    section_link.removeClass('btn-primary');
                    section_link.addClass('btn-danger');
                    section_link.removeClass('text-success');
                    section_link.addClass('text-danger');
                    section_link.html('<h3 class="p-0 m-0 text-white"><i class="fa fa-times"></i> Remove Service</h3>');
                    section_link.blur();
                    $('#section_link_remove_' + obj.last_section_id).attr("style", "display:none");
                    $(newHtml).insertAfter($('#service_result_div_' + obj.last_section_id));
                }

                $('#section_id').val(obj.section_id_hidden);
            } else {
                $('#additional_service_container').html('');
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

function getAdditionalServiceDropdownByCategory(category_id, service_id = "", section_id, client_type) {
    if (category_id == '') {
        $('#service_dropdown_div_' + section_id + ', #service_div_' + section_id).html('');
    } else {
        $.ajax({
            type: "POST",
            data: {
                category_id: category_id,
                service_id: service_id,
                section_id: section_id,
                client_type: client_type
            },
            url: base_url + 'services/home/get_additional_service_dropdown_by_category_id',
            dataType: "html",
            success: function (result) {
                if (result != '0') {
                    $('#service_dropdown_div_' + section_id).html(result);
                    if (service_id == '') {
                        $('#service_div_' + section_id).html('');
                    }
                } else {
                    $('#service_dropdown_div_' + section_id + ', #service_div_' + section_id).html('');
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

function getServicesListInfoById(service_id, category_id, section_id) {
    var staff_office = $("#staff_office").val();
    var client_type = $("#client_type").val();
    var office = $("#office").val();
    var business_client_type_yes_no = $("#type_of_client_ddl").val();
    var individual_client_type_yes_no = $("#type_of_individual_ddl").val();

    if (category_id == '' && service_id == '') {
        $('#service_div').html('');
    } else {
        $.ajax({
            type: "POST",
            data: {
                service_id: service_id,
                section_id: section_id,
                client_type: client_type,
                staff_office: staff_office,
                office: office,
                business_client_type_yes_no: business_client_type_yes_no,
                individual_client_type_yes_no: individual_client_type_yes_no
            },
            url: base_url + 'services/home/get_services_list_info_by_id',
            dataType: "html",
            success: function (result) {
                if (result != '0') {
                    $('#service_div_' + section_id).html(result);
                } else {
                    $('#service_div_' + section_id).html('');
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

function set_retail_price_for_main_service(office_id = '', service_id = '', section = '') {
    var service_short_form = $('#service_shortform').val();
    if (service_id == 65 || service_id == 66) {
        var state_id = $("#state_opened").val();
    } else {
        var state_id = $("#state").val();
    }

    if (service_short_form == 'acc_p') { // Payroll
        // Kept blank because payroll service price calculation is different from other services
    } else {
        if (service_id == '') {
            service_id = $("#service_id").val();
        }
        $.get(base_url + "services/home/get_service_retail_price_by_state_id/" + state_id + "/" + service_id, function (result) {
            if (result.trim() == 0) {
                if (office_id == '') {
                    office_id1 = $("#office").val(); // New client internal data office
                    office_id2 = $("#staff_office").val(); // Existing client selected office
                    if (office_id1 != '' && office_id2 == '') {
                        office_id = office_id1;
                    } else if (office_id2 != '' && office_id1 == '') {
                        office_id = office_id2;
                    } else {
                        office_id = office_id1;
                    }
                }

                $.ajax({
                    type: "POST",
                    data: {
                        office_id: office_id,
                        service_id: service_id
                    },
                    url: base_url + 'services/home/get_office_service_by_id',
                    dataType: "html",
                    success: function (result) {
                        var result = result.trim();
                        if (result != 0) {
                            if (section == 'edit') {
                                var r_pr = $("#retail_price_override").val();
                                if (r_pr == '') {
                                    $("#retail_price").val(result);
                                    $("#main_base_price").val(result);
                                } else {
                                    $("#retail_price").val(result);
                                }
                            } else {
                                $("#retail_price").val(result);
                                $("#main_base_price").val(result);
                            }
                        }
                    }
                });
            }
        });
}
}

function countServicesTotalPrice(section_id = '', override_price, retail_price) {
    var base_price = retail_price;
    if (override_price != '') {
        base_price = override_price;
    }
    $('#base_prices_' + section_id).val(parseFloat(base_price).toFixed(2));
}
function mainServiceTotalPrice(override_price = '', retail_price = '') {
    var base_price = retail_price;
    if (retail_price == '' && override_price == '') {
        base_price = $("#retail_price").val();
    }
    if (override_price != '') {
        base_price = override_price;
    }
    $('#main_base_price').val(parseFloat(base_price).toFixed(2));
}
function removeServiceSection(remove_id) {
    var section_id = $('#section_id').val();
    $.ajax({
        type: "POST",
        url: base_url + 'services/home/remove_service_section',
        data: {
            section_id: section_id,
            remove_id: remove_id
        },
        dataType: "html",
        success: function (result) {
            if (result.trim() != '0') {
                if (result.trim() == 'blank') {
                    $('#section_id').val('');
                    $("#pattern_div").show();
                    $("#pattern").val('');
                    $("#starting_period_div").html('');
                    $("#create_project_section").html('');
                    $("#project_pattern_details_div").html('');
                } else {
                    $('#section_id').val(result.trim());
                }
                $("#service_result_div_" + remove_id).remove();
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

function deleteExistingServiceSection(remove_id) {
    swal({
        title: "Delete!",
        text: "Are you sure to delete this existing service??",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        var section_id = $('#section_id').val();
        var main_order_id = $('#main_order_id').val();
        var invoiced_id = $('#invoiced_id').val();
        $.ajax({
            type: "POST",
            url: base_url + 'services/home/delete_existing_service_section',
            data: {
                section_id: section_id,
                remove_id: remove_id,
                main_order_id: main_order_id,
                invoiced_id: invoiced_id
            },
            dataType: "html",
            success: function (result) {
                if (result != '0') {
                    if (result == 'blank') {
                        swal("Deleted Successfully", "This Existing Service is deleted completely", "success");
                        $('#section_id').val('');
                        $("#service_result_div_" + remove_id).remove();
                    } else if (result == 'payment_exist') {
                        swal("Cannot Delete!", "Transaction Done For This Service", "error");
                    } else {
                        swal("Deleted Successfully", "This Existing Service is deleted completely", "success");
                        $('#section_id').val(result);
                        $("#service_result_div_" + remove_id).remove();
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
    });
}

function delete_account_for_client(id) {
    swal({
        title: "Are you sure?",
        text: "You want to delete financial account?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e60000",
        confirmButtonText: "Delete!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                account_id: id
            }, //services/accounting_services/delete_financial_account
            url: base_url + 'services/accounting_services/delete_account',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    swal({
                        title: "Delete!",
                        text: "Your Financial Account is Deleted!",
                        type: "success"
                    }, function () {
                        window.location.reload();
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
    });
}

function create_owner_application() {
    if (!requiredValidation('add_owner_application')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('add_owner_application'));
    var reference_id = $("#owner_app_reference_id").val();

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/create_owner_application',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log(result); return false;
            if (result == 2) {
                swal("ERROR!", "Error Processing Data", "error");
            } else {
                $('#open_owner_appplication_modal').modal('hide');
                get_owner_application(reference_id);
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

function create_edit_owner_application() {
    if (!requiredValidation('edit_owner_application')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('edit_owner_application'));
    var reference_id = $("#owner_app_reference_id").val();

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/create_owner_application',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log(result); return false;
            if (result == 2) {
                swal("ERROR!", "Error Processing Data", "error");
            } else {
                $('#open_owner_appplication_modal').modal('hide');
                get_owner_application(reference_id);
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

function get_owner_application(reference_id) {
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id
        },
        url: base_url + 'services/home/get_owner_application',
        dataType: "html",
        success: function (result) {
            $("#owners_info_div_list").html(result);
        }
    });
}
function delete_owner_application(reference_id, id) {
    swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this Owner Application!!",
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
                reference_id: reference_id
            },
            url: base_url + "services/home/delete_owner_application",
            dataType: "html",
            success: function (result) {
                if (result == '2') {
                    get_owner_application(reference_id);
                    swal("Deleted!", "Your owner application has been deleted.", "success");
                } else if (result == '1') {
                    swal("Unable To Delete!", "You should have atleast one owner application!", "error");
                } else {
                    swal("Error!", "Error to Delete Owner Application.", "error");
                }
            }
        });
    });
}
function get_custom_field_by_client_id(client_id, client_type) {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            client_type: client_type
        },
        url: base_url + "services/home/get_custom_field_by_client_id",
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                var data = JSON.parse(result);
                if (data.passport != 0) {
                    var passport = data.passport;
                } else {
                    var passport = '';
                }
                if (data.visa != 0) {
                    var visa = data.visa;
                } else {
                    var visa = '';
                }
                $("#passport").val(passport);
                $("#visa").val(visa);
            } else {
                $("#passport").val('');
                $("#visa").val('');
            }
        }
    });
}
function get_main_contact_info(client_id, client_type) {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            client_type: client_type
        },
        url: base_url + "services/home/get_main_contact_info",
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                var data = JSON.parse(result);
                $("#main_address").val(data.main_address);
                $("#main_city").val(data.main_city);
                $("#main_state").val(data.main_state);
                $("#main_zip").val(data.main_zip);
                $("#main_country").val(data.main_country);
                $("#email").val(data.email);
            } else {
                $("#main_address").val('');
                $("#main_city").val('');
                $("#main_state").val('');
                $("#main_zip").val('');
                $("#main_country").val('');
                $("#email").val('');
            }
        }
    });
}

function get_foreign_contact_info(client_id, client_type) {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            client_type: client_type
        },
        url: base_url + "services/home/get_foreign_contact_info",
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                var data = JSON.parse(result);
                $("#foreign_address").val(data.for_address);
                $("#foreign_city").val(data.for_city);
                $("#foreign_state").val(data.for_state);
                $("#foreign_zip").val(data.for_zip);
                $("#foreign_country").val(data.for_country);
            } else {
                $("#foreign_address").val('');
                $("#foreign_city").val('');
                $("#foreign_state").val('');
                $("#foreign_zip").val('');
                $("#foreign_country").val('');
            }
        }
    });
}

function request_create_itin() {
    if (!requiredValidation('form_create_itin_crop')) {
        return false;
    }
    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        // if (total_percentage != '100.00') {
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }
    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_itin_crop'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/tax_services/request_create_itin',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home');
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function showExistingAdditionalServicesList() {
    var order_id = $('#editval').val();
    var invoice_id = $('#invoiced_id').val();
    var service_id = $('#service_id').val();
    var client_type = $('#client_type').val();
    $.ajax({
        type: "POST",
        url: base_url + 'services/home/show_existing_additional_services_list',
        data: {
            order_id: order_id,
            invoice_id: invoice_id,
            service_id: service_id,
            client_type: client_type
        },
        dataType: "html",
        success: function (result) {
            if (result != '0') {
                var obj = $.parseJSON(result);
                var newHtml = decodeURI(obj.section_result);
                $('#additional_service_container').html(newHtml);
                $('#section_id').val(obj.section_id_hidden);
            } else {
                $('#additional_service_container').html('');
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

function get_services_input_form_data_div_for_edit(inputform_yes_no, service_shortform = '', service_request_id = '', order_id = '', reference_id = '') {
    $.ajax({
        type: "POST",
        data: {
            inputform_yes_no: inputform_yes_no,
            service_shortform: service_shortform,
            service_request_id: service_request_id,
            order_id: order_id,
            reference_id: reference_id
        },
        url: base_url + 'services/home/get_services_input_form_data_div_for_edit',
        dataType: "html",
        success: function (result) {
            if (result != '0') {
                $("#service_input_form_field_div").html(result);
                $(".checkclass").attr("disabled", true);
                $("#if_inputform_yes").val('y');
            } else {
                $("#service_input_form_field_div").html('');
                $("#if_inputform_yes").val('n');
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

function change_due_date_for_annual_report(state = '', type = '', service_shortform = '') {
    if (service_shortform == '') {
        var service_short_form = $('#service_shortform').val();
    }
    if (service_short_form == 'inc_f_a_r' || service_short_form == 'inc_d_a_r' || service_short_form == 'inc_a_a_r' || service_short_form == 'inc_w_a_r' || service_short_form == 'inc_m_a_r_c' || service_short_form == 'inc_t_a_r' || service_short_form == 'inc_n_j_a_r' || service_short_form == 'inc_n_y_a_r') {
        $.ajax({
            type: 'POST',
            url: base_url + 'services/home/change_due_date',
            data: {
                state: state,
                type: type
            },
            success: function (result) {
                if (result != 0) {
                    $('#due_date').val(result);
                } else {
                    $('#due_date').val('');
                }
            }
        });
}
}

function change_service_on_state_selection(state = '') {
    var service_short_form = $('#service_shortform').val();
    if (service_short_form != '') {
        if (service_short_form == 'inc_c_o_g_s_d' || service_short_form == 'inc_c_o_g_s_f') {
            // For service 'Certificate of good standing'
            if (state == 10) {  // Florida
                $('#service_id').val(53); // Certificate Of Good Standing FL
                $('#service_shortform').val('inc_c_o_g_s_f');
                $("#main_service_note_div").empty();
                $('#main_service_note_div').html('<div class="form-group"><label class="col-lg-3 control-label">Service Note</label><div class="col-lg-9"><div class="note-textarea"><textarea  class="form-control" name="service_notes[' + 53 + '][]"  title="Service Note"></textarea></div><a href="javascript:void(0)" class="text-success add-servicenote"><i class="fa fa-plus"></i> Add Notes</a> </div></div>');

                $('.add-servicenote').click(function () {
                    var textnote = $(this).prev('.note-textarea').html();
                    var note_label = $(this).parent().parent().find("label").html();
                    var div_count = Math.floor((Math.random() * 999) + 1);
                    var newHtml = '<div class="form-group" id="servicenote_div' + div_count + '"> ' +
                            '<label class="col-lg-3 control-label"></label>' +
                            '<div class="col-lg-9">' +
                            textnote +
                            '<a href="javascript:void(0)" onclick="removeNote(\'servicenote_div' + div_count + '\')" class="text-danger show m-t-10"><i class="fa fa-times"></i> Remove Note</a>' +
                            '</div>'
                    '</div>';
                    $(newHtml).insertAfter($(this).closest('.form-group'));
                });
            } else if (state == 8) {  // Delaware
                $('#service_id').val(6); // Certificate of Good Standing DE
                $('#service_shortform').val('inc_c_o_g_s_d');
                $("#main_service_note_div").empty();
                $('#main_service_note_div').html('<div class="form-group"><label class="col-lg-3 control-label">Service Note</label><div class="col-lg-9"><div class="note-textarea"><textarea  class="form-control" name="service_notes[' + 6 + '][]"  title="Service Note"></textarea></div><a href="javascript:void(0)" class="text-success add-servicenote"><i class="fa fa-plus"></i> Add Notes</a> </div></div>');

                $('.add-servicenote').click(function () {
                    var textnote = $(this).prev('.note-textarea').html();
                    var note_label = $(this).parent().parent().find("label").html();
                    var div_count = Math.floor((Math.random() * 999) + 1);
                    var newHtml = '<div class="form-group" id="servicenote_div' + div_count + '"> ' +
                            '<label class="col-lg-3 control-label"></label>' +
                            '<div class="col-lg-9">' +
                            textnote +
                            '<a href="javascript:void(0)" onclick="removeNote(\'servicenote_div' + div_count + '\')" class="text-danger show m-t-10"><i class="fa fa-times"></i> Remove Note</a>' +
                            '</div>'
                    '</div>';
                    $(newHtml).insertAfter($(this).closest('.form-group'));
                });
            } else { // Blank
                $('#service_id').val(6); // Certificate of Good Standing DE
                $('#service_shortform').val('inc_c_o_g_s_d');
                $("#main_service_note_div").empty();
                $('#main_service_note_div').html('<div class="form-group"><label class="col-lg-3 control-label">Service Note</label><div class="col-lg-9"><div class="note-textarea"><textarea  class="form-control" name="service_notes[' + 6 + '][]"  title="Service Note"></textarea></div><a href="javascript:void(0)" class="text-success add-servicenote"><i class="fa fa-plus"></i> Add Notes</a> </div></div>');

                $('.add-servicenote').click(function () {
                    var textnote = $(this).prev('.note-textarea').html();
                    var note_label = $(this).parent().parent().find("label").html();
                    var div_count = Math.floor((Math.random() * 999) + 1);
                    var newHtml = '<div class="form-group" id="servicenote_div' + div_count + '"> ' +
                            '<label class="col-lg-3 control-label"></label>' +
                            '<div class="col-lg-9">' +
                            textnote +
                            '<a href="javascript:void(0)" onclick="removeNote(\'servicenote_div' + div_count + '\')" class="text-danger show m-t-10"><i class="fa fa-times"></i> Remove Note</a>' +
                            '</div>'
                    '</div>';
                    $(newHtml).insertAfter($(this).closest('.form-group'));
                });
            }
            set_retail_price_for_main_service('', '');
        }
}
}

function save_account_recurring_bookkeeping(section = '') {
    if (!requiredValidation('form_accounts')) {
        return false;
    }
    var client_id = $('#client_id').val();
    var client_reference = $('#client_reference').val();
    var order_id = $('#order_id').val();
    var form_data = new FormData(document.getElementById('form_accounts'));
    // form_data.append('section', section);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/save_account_recurring_bookkeeping',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    if (order_id != '') {
                        get_financial_account_list_recurring_bookkeeping(client_id, client_reference, order_id);
                    } else {
                        get_financial_account_list_recurring_bookkeeping(client_id, client_reference);
                    }
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable to save financial account", "error");
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

function get_financial_account_list_recurring_bookkeeping(client_id = '', client_reference = '', order_id = '') {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            client_reference: client_reference,
            order_id: order_id
        },
        url: base_url + 'services/accounting_services/get_financial_account_list_recurring_bookkeeping',
        dataType: "html",
        success: function (result) {
            $("#accounts-list").html(result);
        }
    });
}

function delete_account_for_recurring_bookkeeping(id) {
    swal({
        title: "Are you sure?",
        text: "You want to delete financial account?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e60000",
        confirmButtonText: "Delete!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                account_id: id,
                order_id: $("#editval").val()
            },
            url: base_url + 'services/accounting_services/delete_account_for_recurring_bookkeeping',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    var client_id = $("#reference_id").val();
                    var client_reference = $("#reference").val();
                    var order_id = $("#editval").val();
                    if (order_id != '') {
                        get_financial_account_list_recurring_bookkeeping(client_id, client_reference, order_id);
                    } else {
                        get_financial_account_list_recurring_bookkeeping(client_id, client_reference);
                    }
                    swal("Deleted!", "Your financial account has been deleted.", "success");
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

function save_account_bookkeeping_by_date(section = '') {
    if (!requiredValidation('form_accounts')) {
        return false;
    }
    var client_id = $('#client_id').val();
    var client_reference = $('#client_reference').val();
    var order_id = $('#order_id').val();
    var form_data = new FormData(document.getElementById('form_accounts'));
    // form_data.append('section', section);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/save_account_bookkeeping_by_date',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    if (order_id != '') {
                        get_financial_account_list_bookkeeping_by_date(client_id, client_reference, order_id);
                    } else {
                        get_financial_account_list_bookkeeping_by_date(client_id, client_reference);
                    }
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable to save financial account", "error");
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

function get_financial_account_list_bookkeeping_by_date(client_id = '', client_reference = '', order_id = '') {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            client_reference: client_reference,
            order_id: order_id
        },
        url: base_url + 'services/accounting_services/get_financial_account_list_bookkeeping_by_date',
        dataType: "html",
        success: function (result) {
            $("#accounts-list").html(result);
        }
    });
}

function delete_account_for_bookkeeping_by_date(id) {
    swal({
        title: "Are you sure?",
        text: "You want to delete financial account?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e60000",
        confirmButtonText: "Delete!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                account_id: id,
                order_id: $("#editval").val()
            },
            url: base_url + 'services/accounting_services/delete_account_for_bookkeeping_by_date',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    var client_id = $("#reference_id").val();
                    var client_reference = $("#reference").val();
                    var order_id = $("#editval").val();
                    if (order_id != '') {
                        get_financial_account_list_bookkeeping_by_date(client_id, client_reference, order_id);
                    } else {
                        get_financial_account_list_bookkeeping_by_date(client_id, client_reference);
                    }
                    swal("Deleted!", "Your financial account has been deleted.", "success");
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

function owner_for_application_save() {
    if (!requiredValidation('owner_for_application')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('owner_for_application'));
    var reference_id = $("#owner_app_reference_id").val();
    var order_id = $("#order_id").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/owner_for_application_save',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result == 0) {
                swal("ERROR!", "Error Processing Data", "error");
            } else {
                $('#owner-for-application-modal').modal('hide');
                if (order_id != '') {
                    get_owner_for_application(reference_id, order_id);
                } else {
                    get_owner_for_application(reference_id, '');
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
function get_owner_for_application(reference_id, order_id = '') {
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id,
            order_id: order_id
        },
        url: base_url + 'services/home/get_owner_for_application',
        dataType: "html",
        success: function (result) {
            $("#owners_info_div_list").html(result);
        }
    });
}
function delete_owner_for_application(reference_id, id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Owner Application!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                id: id
            },
            url: base_url + "services/home/delete_owner_for_application",
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    var order_id = $("#editval").val();
                    if (order_id != '') {
                        get_owner_for_application(reference_id, order_id);
                    } else {
                        get_owner_for_application(reference_id, '');
                    }
                    swal("Deleted!", "Your owner application has been deleted.", "success");
                } else {
                    swal("Error!", "Error to Delete Owner Application.", "error");
                }
            }
        });
    });
}

function get_sales_input_data_for_salestax_recurring(reference_id, client_reference, type_of_client = '') {
    $.ajax({
        type: "POST",
        data: {
            client_id: reference_id,
            client_reference: client_reference
        },
        url: base_url + 'services/accounting_services/get_sales_input_data_for_salestax',
        dataType: "html",
        success: function (result) {
            var res = JSON.parse(result.trim());
            if (res != '0') {
                if (type_of_client == 0) {
                    $("#sales_tax_number").val(res.sales_tax_number);
                    $("#business_partner_number").val(res.business_partner_number);
                    $("#sales_tax_id").val(res.sales_tax_id);
                    $("#sales_password").val(res.password);
                } else if (type_of_client == 1) {
                    $("#sales_tax_number").val('');
                    $("#business_partner_number").val('');
                    $("#sales_tax_id").val('');
                    $("#sales_password").val('');
                    $("#sales_state").val('');
                    $("#sales_county").val('');
                    $("#frequency_of_salestax").val('');
                    $("#sales_tax_start_quarter").val('');
                    $("#sales_tax_start_month").val('');
                    $("#sales_tax_start_year").val('');
                }
            } else {
                $("#sales_tax_number").val('');
                $("#business_partner_number").val('');
                $("#sales_tax_id").val('');
                $("#sales_password").val('');
                $("#sales_state").val('');
                $("#sales_county").val('');
                $("#frequency_of_salestax").val('');
                $("#sales_tax_start_quarter").val('');
                $("#sales_tax_start_month").val('');
                $("#sales_tax_start_year").val('');
            }
        }
    });
}

function save_financial_account_for_sales_tax_recurring(section = '') {
    if (!requiredValidation('form_accounts')) {
        return false;
    }
    var client_id = $('#client_id').val();
    var client_reference = $('#client_reference').val();
    var order_id = $('#order_id').val();
    var form_data = new FormData(document.getElementById('form_accounts'));
    // form_data.append('section', section);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/accounting_services/save_account_sales_tax_recurring',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "order_wise") {
                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#accounts-form').modal('hide');
                    get_financial_account_list_sales_tax_recurring(client_id, client_reference, order_id);
                });
            } else {
                if (result.trim() != "0") {
                    var f = $('#financial_id_hidd').val();
                    var r = f.concat(',', result);
                    var arr = r.split(',').map(Number);
                    $('#financial_id_hidd').val(arr);
                    swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                        $('#accounts-form').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/home/get_financial_account_list_by_id_for_salestax_recurring',
                            dataType: "html",
                            success: function (res) {
                                $("#accounts-list").html(res);
                            }
                        });
                    });
                } else if (result.trim() == "0") {
                    var f = $('#financial_id_hidd').val();
                    var arr = f.split(',').map(Number);
                    swal({title: "Success!", text: "Financial account successfully updated!", type: "success"}, function () {
                        $('#accounts-form').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/home/get_financial_account_list_by_id_for_salestax_recurring',
                            dataType: "html",
                            success: function (res) {
                                $('#financial_id_hidd').val(arr.join());
                                $("#accounts-list").html(res);
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

function delete_account_for_sales_tax_recurring(id) {
    swal({
        title: "Are you sure?",
        text: "You want to delete financial account?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e60000",
        confirmButtonText: "Delete!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "POST",
            data: {
                account_id: id,
                order_id: $("#editval").val()
            },
            url: base_url + 'services/accounting_services/delete_account_for_sales_tax_recurring',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    var client_id = $("#reference_id").val();
                    var client_reference = $("#reference").val();
                    var order_id = $("#editval").val();
                    if (order_id != '') {
                        get_financial_account_list_sales_tax_recurring(client_id, client_reference, order_id);
                    } else {
                        var f = $('#financial_id_hidd').val();
                        var arr = f.split(',').map(Number);
                        if (arr.includes(id) == true) {
                            var index = arr.indexOf(id);
                            if (index > -1) {
                                arr.splice(index, 1);
                            }
                        }
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/home/get_financial_account_list_by_id_for_salestax_recurring',
                            dataType: "html",
                            success: function (res) {
                                $('#financial_id_hidd').val(arr.join());
                                $("#accounts-list").html(res);
                            }
                        });
                    }
                    swal("Deleted!", "Your financial account has been deleted.", "success");
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

function starting_period_for_sales_tax_recurring(frequency, start_month = '', start_year = '') {
    $.ajax({
        type: "POST",
        data: {
            frequency: frequency,
            start_month: start_month,
            start_year: start_year
        },
        url: base_url + 'services/accounting_services/starting_period_for_sales_tax_recurring',
        dataType: "html",
        success: function (result) {
            $("#starting_period_for_sales_tax_div").html(result);
        }
    });
}

function get_financial_account_list_sales_tax_recurring(client_id = '', client_reference = '', order_id = '') {
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            client_reference: client_reference,
            order_id: order_id
        },
        url: base_url + 'services/home/get_financial_account_list_sales_tax_recurring',
        dataType: "html",
        success: function (result) {
            $("#accounts-list").html(result);
        }
    });
}

function get_sales_input_data_for_salestax_processing(reference_id, client_reference, type_of_client = '') {
    $.ajax({
        type: "POST",
        data: {
            client_id: reference_id,
            client_reference: client_reference
        },
        url: base_url + 'services/accounting_services/get_sales_input_data_for_salestax',
        dataType: "html",
        success: function (result) {
            var res = JSON.parse(result.trim());
            if (res != '0') {
                if (type_of_client == 0) {
                    $("#sales_tax_number").val(res.sales_tax_number);
                    $("#business_partner_number").val(res.business_partner_number);
                    $("#sales_tax_business_description").val(res.sales_tax_business_description);
                } else if (type_of_client == 1) {
                    $("#sales_tax_number").val('');
                    $("#business_partner_number").val('');
                    $("#sales_tax_business_description").val('');
                    $("#bank_account_number").val('');
                    $("#bank_routing_number").val('');
                    $("#sales_state").val('');
                    $("#sales_county").val('');
                    $("#frequency_of_salestax").val('');
                    $("#months").val('');
                    $("#year1").val('');
                    $("#quarter").val('');
                    $("#year2").val('');
                    $("#year").val('');
                }
            } else {
                $("#sales_tax_number").val('');
                $("#business_partner_number").val('');
                $("#sales_tax_business_description").val('');
                $("#bank_account_number").val('');
                $("#bank_routing_number").val('');
                $("#sales_state").val('');
                $("#sales_county").val('');
                $("#frequency_of_salestax").val('');
                $("#months").val('');
                $("#year1").val('');
                $("#quarter").val('');
                $("#year2").val('');
                $("#year").val('');
            }
        }
    });
}

function open_recipient_modal(modal_type, id = '') {
    var reference = $('#reference').val();
    var reference_id = $('#reference_id').val();
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/show_recipient_modal',
        data: {
            modal_type: modal_type,
            reference: reference,
            reference_id: reference_id,
            order_id: $("#editval").val(),
            id: id
        },
        success: function (result) {
            $('#recipient-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function save_recipient_info() {
    if (!requiredValidation('form_recipient')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_recipient'));
    var order_id = $('#order_id').val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/save_recipient_info',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "order_wise") {
                swal({title: "Success!", text: "Financial account successfully saved!", type: "success"}, function () {
                    $('#recipient-form').modal('hide');
                    get_recipient_list_by_order_id(order_id);
                });

            } else {
                if (result.trim() != "0") {
                    var f = $('#recipient_id_list').val();
                    var r = f.concat(',', result);
                    var arr = r.split(',').map(Number);
                    $('#recipient_id_list').val(arr);
                    swal({title: "Success!", text: "Recipient successfully saved!", type: "success"}, function () {
                        $('#recipient-form').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/home/get_recipient_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $("#recipient-list").html(res);
                            }
                        });
                    });
                } else if (result.trim() == "0") {
                    var f = $('#recipient_id_list').val();
                    var arr = f.split(',').map(Number);
                    swal({title: "Success!", text: "Recipient successfully updated!", type: "success"}, function () {
                        $('#recipient-form').modal('hide');
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/home/get_recipient_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $('#recipient_id_list').val(arr.join());
                                $("#recipient-list").html(res);
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

function recipient_delete_by_id(id) {
    var order_id = $("#editval").val();
    swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this recipient!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: "POST",
            data: {id: id},
            url: base_url + "services/home/recipient_delete",
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    if (order_id != '') {
                        get_recipient_list_by_order_id(order_id);
                    } else {
                        var f = $('#recipient_id_list').val();
                        var arr = f.split(',').map(Number);
                        if (arr.includes(parseInt(id)) == true) {
                            var index = arr.indexOf(parseInt(id));
                            if (index > -1) {
                                arr.splice(index, 1);
                            }
                        }
                        $.ajax({
                            type: "POST",
                            data: {
                                ids: arr
                            },
                            url: base_url + 'services/home/get_recipient_list_by_ids',
                            dataType: "html",
                            success: function (res) {
                                $('#recipient_id_list').val(arr.join());
                                $("#recipient-list").html(res);
                            }
                        });
                    }
                    swal("Deleted!", "Your recipient has been deleted.", "success");
                } else {
                    swal("Error!", "Error to Delete recipient.", "error");
                }
            }
        });
    });
}

function get_recipient_list_by_order_id(order_id) {
    $.ajax({
        type: "POST",
        data: {
            order_id: order_id
        },
        url: base_url + 'services/home/get_recipient_list_by_order_id',
        dataType: "html",
        success: function (result) {
            $("#recipient-list").html(result);
        }
    });
}

function change_referral_type(referred_by_source, referred_by_name = '', client_id = '', client_type = '') {
    var office = $("#office").val();
    $.ajax({
        type: "POST",
        data: {
            referred_by_source: referred_by_source,
            office: office,
            referred_by_name: referred_by_name,
            client_id: client_id,
            client_type: client_type
        },
        url: base_url + 'services/home/change_referral_type',
        dataType: "html",
        success: function (result) {
            $("#new_referred_by_name_div").html(result);
        }
    });
}

function change_lead_details_option(lead_source, lead_details = '') {
    var office = $("#office").val();
    $.ajax({
        type: "POST",
        data: {
            lead_source: lead_source,
            office: office,
            lead_details: lead_details
        },
        url: base_url + 'lead_management/new_prospect/change_lead_details_option',
        dataType: "html",
        success: function (result) {
            $("#lead-source-detail").html(result);
        }
    });
}

function change_referral_type_for_service(referred_by_source, referred_by_name = '', client_id = '', client_type = '') {
    var office = $("#office").val();
    $.ajax({
        type: "POST",
        data: {
            referred_by_source: referred_by_source,
            office: office,
            referred_by_name: referred_by_name,
            client_id: client_id,
            client_type: client_type
        },
        url: base_url + 'services/home/change_referral_type_for_service',
        dataType: "html",
        success: function (result) {
            $("#new_referred_by_name_div").html(result);
        }
    });
}

function change_referral_type_for_owner(referred_by_source, referred_by_name = '', client_id = '', client_type = '') {
    var office = $("#office").val();
    $.ajax({
        type: "POST",
        data: {
            referred_by_source: referred_by_source,
            office: office,
            referred_by_name: referred_by_name,
            client_id: client_id,
            client_type: client_type
        },
        url: base_url + 'services/home/change_referral_type_for_owner',
        dataType: "html",
        success: function (result) {
            $("#new_referred_by_name_div_for_owner").html(result);
        }
    });
}

function set_retail_price_for_payroll_people_total(payroll_employee_people_total = '', service_retail_price = '', office_id = '', section = '') {
    var service_short_form = $('#service_shortform').val();
    if (service_short_form == 'acc_p') { // Payroll
        if (office_id == '') {
            office_id1 = $("#office").val(); // New client internal data office
            office_id2 = $("#staff_office").val(); // Existing client selected office
            if (office_id1 != '' && office_id2 == '') {
                office_id = office_id1;
            } else if (office_id2 != '' && office_id1 == '') {
                office_id = office_id2;
            } else {
                office_id = office_id1;
            }
        }
        if (payroll_employee_people_total == '') {
            payroll_employee_people_total = $("#payroll_employee_people_total").val();
        }
        if (service_retail_price == '') {
            service_retail_price = $("#r_hidd").val();
        }
        $.ajax({
            type: "POST",
            data: {office_id: office_id},
            url: base_url + 'services/home/get_manage_payroll_prices_by_office_id',
            dataType: "html",
            success: function (result) {
                if (result != 'n') {
                    if (section == 'edit') {
                        var r_pr = $("#retail_price_override").val();
                        if (r_pr == '') {
                            if (payroll_employee_people_total == '1-10') {
                                var p = (Number(result) * 1) + Number(service_retail_price);
                            } else if (payroll_employee_people_total == '11-20') {
                                var p = (Number(result) * 2) + Number(service_retail_price);
                            } else if (payroll_employee_people_total == '21-30') {
                                var p = (Number(result) * 3) + Number(service_retail_price);
                            } else if (payroll_employee_people_total == '31-40') {
                                var p = (Number(result) * 4) + Number(service_retail_price);
                            } else if (payroll_employee_people_total == '41-50') {
                                var p = (Number(result) * 5) + Number(service_retail_price);
                            }
                            $("#retail_price").val(p);
                            $("#main_base_price").val(p);

                        } else {
                            if (payroll_employee_people_total == '1-10') {
                                var p = (Number(result) * 1) + Number(service_retail_price);
                            } else if (payroll_employee_people_total == '11-20') {
                                var p = (Number(result) * 2) + Number(service_retail_price);
                            } else if (payroll_employee_people_total == '21-30') {
                                var p = (Number(result) * 3) + Number(service_retail_price);
                            } else if (payroll_employee_people_total == '31-40') {
                                var p = (Number(result) * 4) + Number(service_retail_price);
                            } else if (payroll_employee_people_total == '41-50') {
                                var p = (Number(result) * 5) + Number(service_retail_price);
                            }
                            $("#retail_price").val(p);
                        }

                    } else {
                        if (payroll_employee_people_total == '1-10') {
                            var p = (Number(result) * 1) + Number(service_retail_price);
                        } else if (payroll_employee_people_total == '11-20') {
                            var p = (Number(result) * 2) + Number(service_retail_price);
                        } else if (payroll_employee_people_total == '21-30') {
                            var p = (Number(result) * 3) + Number(service_retail_price);
                        } else if (payroll_employee_people_total == '31-40') {
                            var p = (Number(result) * 4) + Number(service_retail_price);
                        } else if (payroll_employee_people_total == '41-50') {
                            var p = (Number(result) * 5) + Number(service_retail_price);
                        }
                        $("#retail_price").val(p);
                        $("#main_base_price").val(p);
                    }

                } else {
                    $("#retail_price").val(service_retail_price);
                }
            }
        });
}
}

function change_new_company_price(value = '', section = '') {
    var serviceID = 1;
    if (value == '') {
        value = $("#state_opened").val();
    }
    $.ajax({
        type: "POST",
        data: {
            state_id: value
        },
        url: base_url + 'services/home/get_retail_price_by_state_id_for_new_company',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                var data = JSON.parse(result);
                if (section != 'edit') {
                    $("#retail_price").val(data.retail_price);
                    $("#main_base_price").val(data.retail_price);
                    $("#total_price").html(data.retail_price);
                }

                $("#main_service_note_div").empty();
                $('#main_service_note_div').html('<div class="form-group"><label class="col-lg-3 control-label">Service Note</label><div class="col-lg-9"><div class="note-textarea"><textarea  class="form-control" name="service_notes[' + serviceID + '][]"  title="Service Note"></textarea></div><a href="javascript:void(0)" class="text-success add-servicenote"><i class="fa fa-plus"></i> Add Notes</a> </div></div>');

                $('.add-servicenote').click(function () {
                    var textnote = $(this).prev('.note-textarea').html();
                    var note_label = $(this).parent().parent().find("label").html();
                    var div_count = Math.floor((Math.random() * 999) + 1);
                    var newHtml = '<div class="form-group" id="servicenote_div' + div_count + '"> ' +
                            '<label class="col-lg-3 control-label"></label>' +
                            '<div class="col-lg-9">' +
                            textnote +
                            '<a href="javascript:void(0)" onclick="removeNote(\'servicenote_div' + div_count + '\')" class="text-danger show m-t-10"><i class="fa fa-times"></i> Remove Note</a>' +
                            '</div>'
                    '</div>';
                    $(newHtml).insertAfter($(this).closest('.form-group'));
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

function request_create_service() {
    if (!requiredValidation('form_create_service')) {
        return false;
    }

    if ($('#type_of_client_ddl').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        // if (total_percentage != '100.00') {
        //     // swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     // return false;
        //     swal("Warning!", "Percentage of all partners should equal to 100%!", "warning");
        // }
    }
    if ($("#editval").val() != '') {
        $('.disabled_field, .client_type_field0, .type_of_client').removeAttr('disabled');
    }
    $('#type').removeAttr('disabled');
    var form_data = new FormData(document.getElementById('form_create_service'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/request_create_service',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log("Result: " + result); return false;
            if (result != 0) {
                swal("Success!", "Successfully saved!", "success");
                // goURL(base_url + 'services/home/view/' + result.trim());
                goURL(base_url + 'services/home/view/' + btoa(result));
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

function change_new_company_price_for_old_service(value = '', section = '') {
    var serviceID = 1;
    if (value == '') {
        value = $("#state_opened").val();
    }
    $.ajax({
        type: "POST",
        data: {
            state_id: value
        },
        url: base_url + 'services/home/change_new_company_price_for_old_service',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                var data = JSON.parse(result);
                $("#retail_price").val(data.retail_price);
                if (section != 'edit') {
                    $("#main_base_price").val(data.retail_price);
                    $("#total_price").html(data.retail_price);
                }

                $("#main_service_note_div").empty();
                $('#main_service_note_div').html('<div class="form-group"><label class="col-lg-3 control-label">Service Note</label><div class="col-lg-9"><div class="note-textarea"><textarea  class="form-control" name="service_notes[' + serviceID + '][]"  title="Service Note"></textarea></div><a href="javascript:void(0)" class="text-success add-servicenote"><i class="fa fa-plus"></i> Add Notes</a> </div></div>');

                $('.add-servicenote').click(function () {
                    var textnote = $(this).prev('.note-textarea').html();
                    var note_label = $(this).parent().parent().find("label").html();
                    var div_count = Math.floor((Math.random() * 999) + 1);
                    var newHtml = '<div class="form-group" id="servicenote_div' + div_count + '"> ' +
                            '<label class="col-lg-3 control-label"></label>' +
                            '<div class="col-lg-9">' +
                            textnote +
                            '<a href="javascript:void(0)" onclick="removeNote(\'servicenote_div' + div_count + '\')" class="text-danger show m-t-10"><i class="fa fa-times"></i> Remove Note</a>' +
                            '</div>'
                    '</div>';
                    $(newHtml).insertAfter($(this).closest('.form-group'));
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

function change_new_company_price_for_service(value = '', section = '', from = '') {
    $.ajax({
        type: "POST",
        data: {
            state_id: value
        },
        url: base_url + 'services/home/get_retail_price_by_state_id_for_new_company',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                var data = JSON.parse(result);
                $("#retail-price-" + section).val(data.retail_price);
                $("#service_section_retail").val(data.retail_price);
                $("#base_prices_" + section).val(data.retail_price);
                if (from == 'edit') {
                    $("#retail_price_override" + section).val(data.retail_price);
                    $("#service_section_retail" + section).val(data.retail_price);
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

function open_services_input_form(service_request_id, new_serial_id, section = '') {
    if (section == 'view') {
        window.open(base_url + 'services/home/related_services_view/' + service_request_id + '/' + new_serial_id);
    } else {
        window.open(base_url + 'services/home/related_services/' + service_request_id + '/' + new_serial_id);
}
}

function get_service_request_retail_price(order_id = '', service_id = '') {
    $.ajax({
        type: "POST",
        data: {
            order_id: order_id,
            service_id: service_id
        },
        url: base_url + 'services/home/get_service_request_retail_price',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                var r_pr = $("#retail_price_override").val();
                if (r_pr == '') {
                    $("#retail_price").val(result);
                    $("#main_base_price").val(result);
                } else {
                    $("#retail_price").val(result);
                }
            }
        }
    });
}

function change_required_field_sales_tax_application(value, input_id) {
    if (value == 'Yes') {
        $("#" + input_id).attr('required', true);
        $("#span_" + input_id).html('*');
    } else {
        $("#" + input_id).attr('required', false);
        $("#span_" + input_id).html('');
    }
}

var add_service_task_notes = () => {
    var formData = new FormData(document.getElementById('service_task_modal_note_form'));
    var orderid = $("#service_task_modal_note_form #order_id").val();
    var serviceid = $("#service_task_modal_note_form #serviceid").val();
    var ref_id = $("#service_task_modal_note_form #reference_id").val();
    //alert(ref_id);
    // var reference = $("#modal_note_form #reference").val();
    formData.append('service_id', serviceid);
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/addNotesmodal',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // alert(result);return false;
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                if (result != '0') {
                    if (ref_id == orderid) {
                        $.ajax({
                            type: 'POST',
                            url: base_url + 'services/home/service_task_dashboard_notes_count',
                            data: {
                                reference_id: ref_id,
                                status: ''
                            },
                            success: function (total_note_count_res) {
                                document.getElementById("total_notes_count_id_service_task_" + ref_id).innerHTML = total_note_count_res;
                                $("#total_notes_count_id_service_task_" + ref_id).removeClass('label-secondary').addClass('label-danger ');
                            }
                        });
                        // if (serviceid == "") {
                        var prevnotecount = $("#service_task_notecount-" + orderid).attr('count');
                        // alert(prevnotecount);return false;   
                        var notecount = parseInt(prevnotecount) + parseInt(result);
                        $("#service_task_notecount-" + orderid).attr('count', notecount);
                        $("#service_task_notecount-" + orderid).find('b').html(notecount);
                    }
                }
                $("#service_task_notecount-" + orderid).removeClass('label label-warning').addClass('label label-danger');
                document.getElementById("service_task_modal_note_form").reset();
                $(".removenoteselector").trigger('click');
                $('#show_service_task_notes').modal('hide');
                $('#show_service_task_notes_individual').modal('hide');
                $('#show_service_task_notes_business').modal('hide');

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

var update_service_task_note = () => {
    var formData = new FormData(document.getElementById('service_task_modal_note_form_update'));

    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/updateNotes',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Updated!", type: "success"}, function () {
                document.getElementById("service_task_modal_note_form_update").reset();
                $('#show_service_task_notes').modal('hide');
                $('#show_service_task_notes_individual').modal('hide');
                $('#show_service_task_notes_business').modal('hide');
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

var file_upload_service_task = () => {
    if (!requiredValidation('service_task_file_upload')) {
        return false;
    }
    var form_data = new FormData(document.getElementById("service_task_file_upload"));
    var id = $("#id").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/file_upload_service_task',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);return false;
            var oldactionfilecount = $("#actionfile" + id).attr('count');
            if (result.trim() == oldactionfilecount) {
                swal("ERROR!", "Unable To Add Empty File", "error");
            } else {
                swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                    $("#actionfilespan" + id).prop('class', 'label label-danger');
                    $("#actionfilespan" + id).html('<a class="label label-danger" href="javascript:void(0)" onclick="show_service_task_attachments(' + id + ')"><b>' + result + '</b></a>');
                });
            }
            document.getElementById("service_task_file_upload").reset();
            $("#show_service_task_file").modal('hide');
            $("#show_service_task_file_individual").modal('hide');
            $("#show_service_task_file_business").modal('hide');
        },
        beforeSend: function () {
            $(".upload-file-butt").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function load_all_service_by_order(cat_id, service_id = '', type = '') {
    var sc = $('#service_order_tab li.active').find('a').attr('id');
    if (sc != '' && sc != undefined) {
        var split_data = sc.split('-');
        $("#li_id" + split_data[1]).prop('class', '');
        $("#li_id" + cat_id).prop('class', 'active');
    } else {
        $("#li_id-" + cat_id).prop('class', 'active');
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/load_all_service_by_order',
        data: {
            cat_id: cat_id,
            service_id: service_id,
            type: type
        },
        success: function (result) {
            if (result != '') {
                $("#manage_service_order_div").html(result);
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
function reload_manage_order_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'patch/insert_service_into_service_maintain_table',
        success: function (result) {
            // console.log(result);
            if (result != '') {
                swal({
                    title: "Success!",
                    text: "Updated Successfully!",
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

function load_service_task_ajax_dashboard(category = "", pageNumber = 0, sos_value = '', status = '', task_id_service = '', service_id = '', task_id = '', sort_type = '', sort_value = '') {
    var assign_staff= $('#assign_staff').val();
    var form_data = new FormData(document.getElementById('service_task-filter-display-div'));
    form_data.append('page_number', pageNumber);
    form_data.append('category', category);
    form_data.append('sos_value', sos_value);
    form_data.append('status', status);
    form_data.append('task_id_service', task_id_service);
    form_data.append('service_id', service_id);
    form_data.append('task_id', task_id);
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_value);
    if (assign_staff == undefined) {
        assign_staff = '';
    }else{
        form_data.append('assign_staff', assign_staff);   
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/load_service_task_ajax_dashboard',
        data: form_data,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() != '') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $("#service_task_dashboard_div").html(result);
                } else {
                    $("#service_task_dashboard_div").append(result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                if (status != '') {
                    $("#status").val(status);
                }
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

function reload_service_task_dashboard(category) {
    openLoading();
    go('services/home/service_task_dashbaord/' + category);
}

function add_service_task_sos() {
    if (!requiredValidation('service_task_sos_form')) {
        return false;
    }
    var formData = new FormData(document.getElementById('service_task_sos_form'));
    var orderid = $("#service_task_sos_form #refid").val();
    var serviceid = $("#service_task_sos_form #serviceid").val();

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
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'services/Home/get_service_task_sos_total_count',
                    data: {
                        orderid: orderid,
                        status: 'unread'
                    },
                    success: function (unread_sos_count) {
                        $.ajax({
                            type: 'POST',
                            url: base_url + 'services/Home/get_service_task_sos_total_count',
                            data: {
                                orderid: orderid,
                                status: ''
                            },
                            success: function (total_sos_count) {
                                if(unread_sos_count.trim() != 0){
                                    document.getElementById("service_total_sos_count_id_" + orderid).innerHTML = unread_sos_count;
                                    $("#service_total_sos_count_id_" + orderid).removeClass('label label-secondary').addClass('label label-danger');
                                } else {
                                    document.getElementById("service_total_sos_count_id_" + orderid).innerHTML = total_sos_count;
                                    $("#service_total_sos_count_id_" + orderid).removeClass('label label-danger').addClass('label label-secondary');

                                }
                            }
                        });
                    }
                });

                document.getElementById("service_task_sos_form").reset();
                $('#showSos').modal('hide');
            });
        },
        beforeSend: function () {
            $("#save_sos").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            $("#save_sos").removeAttr('disabled').html('Post SOS');
            closeLoading();
        }
    });
}

var serviceTaskListAjax2 = function (order_id, task_id, category, new_serial_id, new_serial_task_id, service_request_id) {
    if (!$('#collapse' + task_id).hasClass('in')) {
        $('#collapse' + task_id).html('<div class="text-center"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
        $.ajax({
            type: "POST",
            data: {
                task_id: task_id,
                order_id: order_id,
                category: category,
                new_serial_id: new_serial_id,
                new_serial_task_id: new_serial_task_id,
                service_request_id: service_request_id
            },
            url: base_url + 'services/home/service_tasklist_ajax2',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    $('#collapse' + task_id).html(result);
                } else {
                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                }
            }
        });
    }
}

function fetch_exsiting_client_id(reference_id) {
    var client_type = $('.client_type:checked').val();
    $.ajax({
        type: "POST",
        data: {
            reference_id: reference_id,
            reference: client_type
        },
        url: base_url + 'client/fetch_exsiting_client_id',
        dataType: "html",
        success: function (result) {
            var data = JSON.parse(result);
            if (data != '') {
                $("#client_id_name").html(data);
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
function service_task_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('service_task-filter-display-div'));
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
    var task_category = $("#task_category").val();
    var check_div_element = $("#" + current_element.id + "-display").html();
    if (check_div_element == '') {
        $.ajax({
            type: 'POST',
            url: base_url + 'modal/service_task_sorting_filter_modal',
            data: {
                reference: reference,
                task_category: task_category
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

function service_task_filter_new(page_numbers = '', is_clear = '', current_clear_element = '') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if (is_clear != '') {
        var clear_element = current_clear_element.id;
        console.log(clear_element);

        let removavle_element = $("#filter-field-variable").val();
        console.log(removavle_element);
        if (removavle_element == 'pattern') {
            $("#" + removavle_element + '_month').val('').trigger('chosen:updated');
        }
        if (removavle_element == 'assign_to') {
            $("#assign_staff").val('').trigger('chosen:updated');
        }
        $("#" + removavle_element).val('').trigger('chosen:updated');
        $("#" + clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('service_task-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'task_id_filter') {
            var id = 'task_id_filter-val';
            if (is_clear == '') {
                $("#task_id_filter-clear_filter").show();
            }
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if (is_clear == '') {
                $("#service_name-clear_filter").show();
            }
        }
        if (a == 'office_id') {
            var id = 'office_id-val';
            if (is_clear == '') {
                $("#office_id-clear_filter").show();
            }
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if (is_clear == '') {
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'assign_to') {
            var id = 'assign_to-val';
            if (is_clear == '') {
                $("#assign_to-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'tracking-val';
            if (is_clear == '') {
                $("#tracking-clear_filter").show();
            }
        }
        if (a == 'input') {
            var id = 'input-val';
            if (is_clear == '') {
                $("#input-clear_filter").show();
            }
        }
        if (a == 'department') {
            var id = 'department-val';
            if (is_clear == '') {
                $("#department-clear_filter").show();
            }
        }
    }

    var assign_office= $('#assign_to').val();
    var assign_staff= $('#assign_staff').val();
    if (assign_staff == undefined) {
        assign_staff = '';
    }
     if(assign_office != ''&& assign_staff == null&& assign_office != undefined) {
       
        $('#assign_staff_chosen .chosen-choices').css({"border-color": "red", "border-width":"1px", "border-style":"solid"});
        return false;
   } 
   else {
       $('#assign_staff_chosen .chosen-choices').css({"border-color": "#CBD5DD", "border-width":"1px", "border-style":"solid"});
       form_data.append('assign_staff', assign_staff);     
   }
    var category = $('#task_category').val();
    var statusArray = category.split('-');

    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }
    var status = $("#status").val();
    if (status == undefined) {
        status = '';
    }
    form_data.append('page_number', page_number);
    form_data.append('status', status);
    form_data.append('category', category);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/load_service_task_ajax_dashboard',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);
            $("#service_task_dashboard_div").html(result);
            $('#ProjectFilterModal').modal('hide');
            $("[data-toggle=popover]").popover();
            // $("#apply_filter").removeClass('btn-block');
            $('#bookkeeping_btn_clear_filter').show();
//            $('#clear_filter').show();

            // display_project_applied_filters();
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
function load_service_task_summary_box(category = "") {
    var assign_staff= $('#assign_staff').val();
    var form_data = new FormData(document.getElementById('service_task-filter-display-div'));
    form_data.append('category', category);
    if (assign_staff == undefined) {
        assign_staff = '';
    }else{
        form_data.append('assign_staff', assign_staff);   
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/load_service_task_summary_box',
        data: form_data,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() != '') {
                $("#service_task_summary_box").html(result);
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
function sort_service_task_dashboard_new(sort_type = '', sort_val = '', page_number = '', category = '') {
    var sort_type = sort_type.value;
//    alert(filter_data);   
    var sos_value = $("#sos_value").val();
    var status = $("#status").val();
    var task_id_service = $("#task_id_service").val();

    var form_data = new FormData(document.getElementById('service_task-filter-display-div'));
    form_data.append('category', category);
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_val);
    form_data.append('page_number', page_number);
    form_data.append('sos_value', sos_value);
    form_data.append('status', status);
    form_data.append('task_id_service', task_id_service);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/sort_service_task_dashboard_new',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (action_result) {

            var data = JSON.parse(action_result);
//            alert(data);
            $("#service_task_dashboard_div").html(data.result);
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
function order_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('order-filter-display-div'));
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
            url: base_url + 'modal/order_sorting_filter_modal',
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
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
}
}
function order_filter_new(page_numbers = '', is_clear = '', current_clear_element = '') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if (is_clear != '') {
        var clear_element = current_clear_element.id;
        console.log(clear_element);

        let removavle_element = $("#filter-field-variable").val();
        console.log(removavle_element);
        if (removavle_element == 'pattern') {
            $("#" + removavle_element + '_month').val('').trigger('chosen:updated');
        }
        if (removavle_element == 'category_filter') {
            $("#category_filter_service_name").val('').trigger('chosen:updated');
        }
        if (removavle_element == 'referral_type') {
            $("#referral_type_client").val('').trigger('chosen:updated');
        }
        if(removavle_element == 'partner'){
            $("#partner_name").val('').trigger('chosen:updated');   
        }
        $("#" + removavle_element).val('').trigger('chosen:updated');
        $("#" + clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('order-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'order_id_filter') {
            var id = 'order_id_filter-val';
            if (is_clear == '') {
                $("#order_id_filter-clear_filter").show();
            }
        }
        if (a == 'category_filter') {
            var id = 'category_filter-val';
            if (is_clear == '') {
                $("#category_filter-clear_filter").show();
            }
        }
        if (a == 'office') {
            var id = 'office-val';
            if (is_clear == '') {
                $("#office-clear_filter").show();
            }
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if (is_clear == '') {
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'complete_date') {
            var id = 'complete_date-val';
            if (is_clear == '') {
                $("#complete_date-clear_filter").show();
            }
        }
        if (a == 'request_date') {
            var id = 'request_date-val';
            if (is_clear == '') {
                $("#request_date-clear_filter").show();
            }
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if (is_clear == '') {
                $("#service_name-clear_filter").show();
            }
        }
        if (a == 'department') {
            var id = 'department-val';
            if (is_clear == '') {
                $("#department-clear_filter").show();
            }
        }
        if (a == 'responsible_name') { //requested_by
            var id = 'responsible_name-val';
            if (is_clear == '') {
                $("#responsible_name-clear_filter").show();
            }
        }
        if (a == 'requested_type') {
            var id = 'requested_type-val';
            if (is_clear == '') {
                $("#requested_type-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'tracking-val';
            if (is_clear == '') {
                $("#tracking-clear_filter").show();
            }
        }
        if (a == 'input_form') {
            var id = 'input_form-val';
            if (is_clear == '') {
                $("#input_form-clear_filter").show();
            }
        }
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if (is_clear == '') {
                $("#client_manager-clear_filter").show();
            }
        }
        if (a == 'referral_type') {
            var id = 'referral_type-val';
            if (is_clear == '') {
                $("#referral_type-clear_filter").show();
            }
        }
        if (a == 'partner') {
            var id = 'partner-val';
            if (is_clear == '') {
                $("#partner-clear_filter").show();
            }
        }
    }

    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }

    form_data.append('page_number', page_number);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/filter_form',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);
            $(".ajaxdiv").html(result);
            $('#ProjectFilterModal').modal('hide');
            $("[data-toggle=popover]").popover();
            // $("#apply_filter").removeClass('btn-block');
            $('#bookkeeping_btn_clear_filter').show();
//            $('#clear_filter').show();

            // display_project_applied_filters();
            // loadProjectSummaryBox(category,template_cat_id,select_month,select_year,template_name,dashboard_type);
            //load_order_dashboard_summary_box();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function sort_order_dashboard_new(sort_type = '', sort_val = '', page_number = '') {
    var sort_type = sort_type.value;
//    alert(filter_data);

    var form_data = new FormData(document.getElementById('order-filter-display-div'));
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_val);
    form_data.append('page_number', page_number);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/sort_order_dashboard_new',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (action_result) {

            var data = JSON.parse(action_result);
//            alert(data);
            $(".ajaxdiv").html(data.result);
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
function service_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('service-filter-display-div'));
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
            url: base_url + 'modal/service_sorting_filter_modal',
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
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
}
}
function service_filter_new(page_numbers = '', is_clear = '', current_clear_element = '') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if (is_clear != '') {
        var clear_element = current_clear_element.id;
        //console.log(clear_element);

        let removavle_element = $("#filter-field-variable").val();
        //console.log(removavle_element);
        if (removavle_element == 'complete_date' || removavle_element == 'start_date') {
            $("#" + removavle_element).val('');
        }else if (removavle_element == 'all_project_staffs_assignto') {
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#assignto_staff").val('').trigger('chosen:updated');
        }else if (removavle_element == 'responsible_name') {
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#responsible_staff").val('').trigger('chosen:updated');
        }else if(removavle_element == 'partner'){
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#partner_name").val('').trigger('chosen:updated');
            
        }else if(removavle_element == 'referral_type'){
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#referral_type_client").val('').trigger('chosen:updated');
        } else {
            $("#" + removavle_element).val('').trigger('chosen:updated');
        }
        $("#" + clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('service-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'service_id_filter') {
            var id = 'service_id_filter-val';
            if (is_clear == '') {
                $("#service_id_filter-clear_filter").show();
            }
        }
        if (a == 'category_filter') {
            var id = 'category_filter-val';
            if (is_clear == '') {
                $("#category_filter-clear_filter").show();
            }
        }
        if (a == 'all_project_staffs_assignto') {
            var id = 'all_project_staffs_assignto-val';
            if (is_clear == '') {
                $("#all_project_staffs_assignto-clear_filter").show();
            }
        }
        // if (a == 'assign_to') {
        //     var id = 'assign_to-val';
        //     if (is_clear == '') {
        //         $("#assign_to-clear_filter").show();
        //     }
        // }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if (is_clear == '') {
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'complete_date') {
            var id = 'complete_date-val';
            if (is_clear == '') {
                $("#complete_date-clear_filter").show();
            }
        }
        if (a == 'start_date') {
            var id = 'start_date-val';
            if (is_clear == '') {
                $("#start_date-clear_filter").show();
            }
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if (is_clear == '') {
                $("#service_name-clear_filter").show();
            }
        }
        if (a == 'department') {
            var id = 'department-val';
            if (is_clear == '') {
                $("#department-clear_filter").show();
            }
        }
        // if (a == 'requested_by') {
        //     var id = 'requested_by-val';
        //     if (is_clear == '') {
        //         $("#requested_by-clear_filter").show();
        //     }
        // }
        if (a == 'responsible_name') {
           var id = 'responsible_name-val';
            if (is_clear == '') {
                $("#responsible_name-clear_filter").show();
            }
        }
        if (a == 'requested_type') {
            var id = 'requested_type-val';
            if (is_clear == '') {
                $("#requested_type-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'tracking-val';
            if (is_clear == '') {
                $("#tracking-clear_filter").show();
            }
        }
                if (a == 'office_id_filter') {
            var id = 'office_id_filter-val';
            if (is_clear == '') {
                $("#office_id_filter-clear_filter").show();
            }
        }
        if (a == 'input_form') {
            var id = 'input_form-val';
            if (is_clear == '') {
                $("#input_form-clear_filter").show();
            }
        }
        if (a == 'partner') {
            var id = 'partner-val';
            if (is_clear == '') {
                $("#partner-clear_filter").show();
            }
        }
        if (a == 'referral_type') {
            var id = 'referral_type-val';
            if (is_clear == '') {
                $("#referral_type-clear_filter").show();
            }
        }
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if (is_clear == '') {
                $("#client_manager-clear_filter").show();
            }
        }
    }

    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }
    var status = $("#status").val();
    var category_id = $("#category_id").val();
    if (category_id == undefined) {
        category_id = '';
    }
    // var requested_by_office = $('#requested_by').val();
    // var requested_by_staff = $('#requested_by_staffs').val();
    // var assign_to = $('#assign_to').val();
    // var assign_to_staff = $('#assign_to_staff').val();
    // console.log(requested_by_office);
    // console.log(requested_by_staff);
    // console.log(assign_to);
    // console.log(assign_to_staff);
    // if (requested_by_staff == undefined) {
    //     requested_by_staff = '';
    // }
    // if (assign_to_staff == undefined) {
    //     assign_to_staff = '';
    // }
   //  if(requested_by_office != '' && requested_by_staff == '' && requested_by_office != undefined) {
   //      // alert('hi');
   //      $('#requested_by_staffs_chosen .chosen-choices').css({"border-color": "red", "border-width":"1px", "border-style":"solid"});
   //      return false;
   // } 
   // else {
   //     $('#requested_by_staffs_chosen .chosen-choices').css({"border-color": "#CBD5DD", "border-width":"1px", "border-style":"solid"});
   // }
   // if(assign_to != '' && assign_to_staff == '' && assign_to != undefined) {
   //      // alert('hi');
   //      $('#assign_to_staff_chosen .chosen-choices').css({"border-color": "red", "border-width":"1px", "border-style":"solid"});
   //      return false;
   // } 
   // else {
   //     $('#assign_to_staff_chosen .chosen-choices').css({"border-color": "#CBD5DD", "border-width":"1px", "border-style":"solid"});
   // }
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
    form_data.append('status', status);
    form_data.append('category_id', category_id);
    form_data.append('responsible_department', responsible_department);
    form_data.append('responsible_office', responsible_office);
    form_data.append('responsible_name', responsible_name);
    form_data.append('assign_department', assign_department);
    form_data.append('assign_office', assign_office);
    form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/filter_form_for_services',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);
            $(".ajaxdiv").html(result);
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
function sort_service_dashboard_new(sort_type = '', sort_val = '', page_number = '') {
    var sort_type = sort_type.value;
//    alert(filter_data);
    var status = $("#status").val();
    var category_id = $("#category_id").val();
    if (category_id != '' && category_id != undefined) {
        category_id = category_id;
    } else {
        category_id = '';
    }

    if (status != '' && status != undefined) {
        status = status;
    } else {
        status = '';
    }

    var form_data = new FormData(document.getElementById('service-filter-display-div'));
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_val);
    form_data.append('page_number', page_number);
    form_data.append('status', status);
    form_data.append('category_id', category_id);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'services/home/sort_new_service_dashboard',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (action_result) {
            // console.log(action_result);return false;
//            alert(data);
            $(".ajaxdiv").html(action_result);
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
function load_service_client_dashbaord(status, categoryID, requestType, officeID, pageNumber = 0, data_new_home_dashboard = '', business_client_id = '', individual_client_id = '', partner_id = '', request_from = '') {

    var requestBy = $('.staff-dropdown option:selected').val();
    // alert(requestBy);return false;
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/load_service_client_dashbaord',
        data: {
            category_id: categoryID,
            request_type: requestType,
            status: status,
            request_by: requestBy,
            office_id: officeID,
            page_number: pageNumber,
            data_new_home_dashboard: data_new_home_dashboard,
            business_client_id: business_client_id,
            individual_client_id: individual_client_id,
            partner_id: partner_id,
            request_from: request_from
        },
        success: function (result) {
            // alert(result);return false;
            // console.log(result); return false;
            if (result.trim() != '') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $(".ajaxdiv").html(result);
                    $("a.filter-button span:contains('-')").html(0);
                    $(".variable-dropdown").val('');
                    $(".condition-dropdown").val('').removeAttr('disabled');
                    $(".criteria-dropdown").val('');
                    $('.criteria-dropdown').removeAttr('readonly').empty().append('<option value="">All Criteria</option>');
                    $(".criteria-dropdown").trigger("chosen:updated");
                    $('form#filter-form').children('div.filter-inner').children('div.filter-div').not(':first').remove();
                    $('#btn_service').css('display', 'none');
                    $("#complete_canceled_order").attr('checked', false);
                    $("#order_filted_data").html('');
                } else {
                    $(".ajaxdiv").append(result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                if (requestType == 'on_load') {
                    $('#btn_service').hide();
                    //                    clearFilter();
                }
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
function load_service_task_dashbaord(status, categoryID, requestType, officeID, pageNumber = 0, data_new_home_dashboard = '', business_client_id = '', individual_client_id = '', partner_id = '', request_from = '') {

    var requestBy = $('.staff-dropdown option:selected').val();
    // alert(requestBy);return false;
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/service_new_dashboard_filter',
        data: {
            category_id: categoryID,
            request_type: requestType,
            status: status,
            request_by: requestBy,
            office_id: officeID,
            page_number: pageNumber,
            data_new_home_dashboard: data_new_home_dashboard,
            business_client_id: business_client_id,
            individual_client_id: individual_client_id,
            partner_id: partner_id,
            request_from: request_from
        },
        success: function (result) {
            // alert(result);return false;
            // console.log(result); return false;
            if (result.trim() != '') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $(".ajaxdiv").html(result);
                    $("a.filter-button span:contains('-')").html(0);
                    $(".variable-dropdown").val('');
                    $(".condition-dropdown").val('').removeAttr('disabled');
                    $(".criteria-dropdown").val('');
                    $('.criteria-dropdown').removeAttr('readonly').empty().append('<option value="">All Criteria</option>');
                    $(".criteria-dropdown").trigger("chosen:updated");
                    $('form#filter-form').children('div.filter-inner').children('div.filter-div').not(':first').remove();
                    $('#btn_service').css('display', 'none');
                    $("#complete_canceled_order").attr('checked', false);
                    $("#order_filted_data").html('');
                } else {
                    $(".ajaxdiv").append(result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                if (requestType == 'on_load') {
                    $('#btn_service').hide();
                    //                    clearFilter();
                }
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
function manage_project_creation_scope_and_recurring(val = '') {
    var will_create_project = $('#will_create_project').is(':checked');
    // console.log(will_create_project);
    if (will_create_project) {
        $("#is_recurring").prop("checked", true);
        $("#is_recurring").prop("disabled", true);
    } else {
        // $("#is_recurring").prop("checked", false);
        $("#is_recurring").prop("disabled", false);
}
}
function load_service_dashboard_summary_box() {
    var data_new_home_dashboard = $("#data_new_home_dashboard").val();
    if (data_new_home_dashboard != undefined) {
        data_new_home_dashboard = data_new_home_dashboard;
    } else {
        data_new_home_dashboard = '';
    }
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
    var form_data = new FormData(document.getElementById('service-filter-display-div'));
    form_data.append('data_new_home_dashboard', data_new_home_dashboard);
    form_data.append('responsible_department', responsible_department);
    form_data.append('responsible_office', responsible_office);
    form_data.append('responsible_name', responsible_name);
    form_data.append('assign_department', assign_department);
    form_data.append('assign_office', assign_office);
    form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/load_service_dashboard_summary_box',
        data: form_data,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() != '') {
                $("#service_dashboard_summary_box").html(result);
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

function load_internal_data_office(office_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/load_internal_data_office',
        data: {
            office_id: office_id
        },
        dataType: "html",
        success: function (result) {
            $("#office").empty();
            if (result != 0) {
                var officedata = JSON.parse(result);
                $("#office").append("<option value=''>Please Select Option</option>");
                for (var i = 0; i < officedata.length; i++) {
                    var id = officedata[i].id
                    var name = officedata[i].name;
                    $("#office").append("<option value='" + id + "' selected>" + name + "</option>");
                }

            }

        }
    });

}
function ajax_service_list_filter(cat_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/ajax_service_list_filter',
        data: {
            cat_id: cat_id
        },
        dataType: "html",
        success: function (result) {
            $("#ajax_service_filter_data").html(result);

        }
    });
}
function get_service_retail_price_by_state_id(state_id, service_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/get_service_retail_price_by_state_id',
        data: {
            state_id: state_id,
            service_id: service_id
        },
        dataType: "html",
        success: function (result) {
            var data = result.trim();
            if (data != 0) {
                $("#retail_price").val(data);
                $("#main_base_price").val(data);
            } else {
                var office_id1 = $("#office").val(); // New client internal data office
                var office_id2 = $("#staff_office").val(); // Existing client selected office
                if (office_id1 != '' && office_id2 == '') {
                    office_id = office_id1;
                } else if (office_id2 != '' && office_id1 == '') {
                    office_id = office_id2;
                } else {
                    office_id = office_id1;
                }
                if (office_id != '') {
                    $.ajax({
                        type: "POST",
                        data: {
                            office_id: office_id,
                            service_id: service_id
                        },
                        url: base_url + 'services/home/get_office_service_by_id',
                        dataType: "html",
                        success: function (result) {
                            var result = result.trim();
                            if (result != 0) {
                                $("#retail_price").val(result);
                                $("#main_base_price").val(result);
                            }
                        }
                    });
                } else {
                    $.ajax({
                        type: "POST",
                        data: {
                            service_id: service_id
                        },
                        url: base_url + 'services/home/get_service_price',
                        dataType: "html",
                        success: function (result) {
                            var result = result.trim();
                            if (result != 0) {
                                $("#retail_price").val(result);
                                $("#main_base_price").val(result);
                            }
                        }
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
function get_staff_office_list_for_sos(staff_id, office_id) {
    if (staff_id == '') {
        var staff_id = $("#select_staff").val();
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/get_staff_office_list_for_sos',
        data: {
            staff_id: staff_id,
            office_id: office_id
        },
        dataType: "html",
        success: function (result) {
            var data = result.trim();
            $("#to_office").val(data);

        }
    });
}

function orderTimeStart(order_id='', service_id = '',task_id='') {
    var start_val = new Date().toLocaleTimeString();
    $("#start_timer").val(start_val);
    
     if (service_id == '' && task_id == '') {
        $("#start_" + order_id).hide();
        $("#pauseStart_" + order_id).hide();
        $("#pause_" + order_id).show();
        $("#reset_" + order_id).show();
        var watch = document.querySelector("#stopwatch_" + order_id);
    } else if(task_id == '' && service_id != '') {
        $("#start_" + order_id + "_" + service_id).hide();
        $("#pauseStart_" + order_id + "_" + service_id).hide();
        $("#pause_" + order_id + "_" + service_id).show();
        $("#reset_" + order_id + "_" + service_id).show();
        var watch = document.querySelector("#stopwatch_" + order_id + "_" + service_id);
    } else{
        $("#start_" + order_id + "_" + service_id + "_" + task_id).hide();
        $("#pauseStart_" + order_id + "_" + service_id + "_" + task_id).hide();
        $("#pause_" + order_id + "_" + service_id + "_" + task_id).show();
        $("#reset_" + order_id + "_" + service_id + "_" + task_id).show();
        var watch = document.querySelector("#stopwatch_" + order_id + "_" + service_id + "_" + task_id);
    }

    watch.style.color = "#D6FF4D";
    watch.innerHTML = start_val;
    jQuery(window).bind('beforeunload', function(){
        return 'my text';
    });

}
function pauseOrderStart(order_id='', service_id = '',task_id='') {
    if (service_id == '' && task_id =='') {
        $("#start_" + order_id).hide();
        $("#pauseStart_" + order_id).hide();
        $("#pause_" + order_id).show();
        $("#reset_" + order_id).show();
        var watch = document.querySelector("#stopwatch_" + order_id);
    } else if(task_id == '' && service_id != '') {
        $("#start_" + order_id + "_" + service_id).hide();
        $("#pauseStart_" + order_id + "_" + service_id).hide();
        $("#pause_" + order_id + "_" + service_id).show();
        $("#reset_" + order_id + "_" + service_id).show();
        var watch = document.querySelector("#stopwatch_" + order_id + "_" + service_id);
    } else{
        $("#start_" + order_id + "_" + service_id + "_" + task_id).hide();
        $("#pauseStart_" + order_id + "_" + service_id + "_" + task_id).hide();
        $("#pause_" + order_id + "_" + service_id + "_" + task_id).show();
        $("#reset_" + order_id + "_" + service_id + "_" + task_id).show();
        var watch = document.querySelector("#stopwatch_" + order_id + "_" + service_id + "_" + task_id);
    }

}

function orderTimePaused(order_id, service_id = '',task_id='') {
    if (service_id == '') {
        $("#start_" + order_id).hide();
        $("#pauseStart_" + order_id).show();
        $("#pause_" + order_id).hide();
        $("#reset_" + order_id).hide();
        var watch = document.querySelector("#stopwatch_" + order_id);
    } else if(task_id == '' && service_id != '') {
        $("#start_" + order_id + "_" + service_id).hide();
        $("#pauseStart_" + order_id + "_" + service_id).show();
        $("#pause_" + order_id + "_" + service_id).hide();
        $("#reset_" + order_id + "_" + service_id).hide();
        var watch = document.querySelector("#stopwatch_" + order_id + "_" + service_id);
    } else{
        $("#start_" + order_id + "_" + service_id + "_" + task_id).hide();
        $("#pauseStart_" + order_id + "_" + service_id + "_" + task_id).show();
        $("#pause_" + order_id + "_" + service_id + "_" + task_id).hide();
        $("#reset_" + order_id + "_" + service_id + "_" + task_id).hide();
        var watch = document.querySelector("#stopwatch_" + order_id + "_" + service_id + "_" + task_id);
    }
    watch.style.color = "red";
//    clearInterval(timer);
}
function orderSaveTime(order_id, service_id = '',task_id='') {
    var end_val = new Date().toLocaleTimeString();
    var start_val = $("#start_timer").val();
    
    if (service_id == '') {
        $("#start_" + order_id).show();
        $("#pauseStart_" + order_id).hide();
        $("#pause_" + order_id).hide();
        $("#reset_" + order_id).hide();
        var watch = document.querySelector("#stopwatch_" + order_id);
    } else if(task_id == '' && service_id != '') {
        $("#start_" + order_id + "_" + service_id).show();
        $("#pauseStart_" + order_id + "_" + service_id).hide();
        $("#pause_" + order_id + "_" + service_id).hide();
        $("#reset_" + order_id + "_" + service_id).hide();
        var watch = document.querySelector("#stopwatch_" + order_id + "_" + service_id);
    } else{
        $("#start_" + order_id + "_" + service_id + "_" + task_id).show();
        $("#pauseStart_" + order_id + "_" + service_id + "_" + task_id).hide();
        $("#pause_" + order_id + "_" + service_id + "_" + task_id).hide();
        $("#reset_" + order_id + "_" + service_id + "_" + task_id).hide();
        var watch = document.querySelector("#stopwatch_" + order_id + "_" + service_id + "_" + task_id);
    }
    
    $.ajax({
        type: "POST",
        data: {start_val: start_val,end_val: end_val, order_id: order_id, service_id: service_id, task_id:task_id},
        url: base_url + 'services/home/insert_order_execution_time_table',
        success: function (result) {
            $.ajax({
                type: "POST",
                data: {order_id: order_id, service_id: service_id, task_id:task_id},
                url: base_url + 'services/home/get_order_execution_total_time',
                success: function (result1) {
                    watch.innerHTML = result1;
                }
            });
        }
    });
    jQuery(window).unbind('beforeunload');
}

function showOrderTimeTracking(projectID, service_id = '',task_id='',request_from='') {
    console.log(request_from);
    $.ajax({
        type: "POST",
        data: {order_id: projectID, service_id: service_id,task_id:task_id,request_from:request_from},
        url: base_url + 'services/home/showOrderTimeTracking',
        success: function (tract) {
            $("#timeTracking").html(tract);
            $("#timeTracking").modal('show');
        }
    });
}
function Change_order_status(recordID,order_id='',service_id='',task_id='',request_from='') {
    console.log(request_from);
    console.log('order: '+order_id);
    console.log('service: '+service_id);
    console.log('task: '+task_id);
    $.ajax({
        type: "POST",
        data: {recordID: recordID,order_id: order_id,service_id: service_id,task_id: task_id,request_from: request_from},
        url: base_url + 'services/home/changeOrdereRecordedTimeStatus',
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
                    if(request_from == 'order'){
                        $('#stopwatch_'+order_id).html(result);
                    }else if(request_from == 'service'){
                         $('#stopwatch_' + order_id + '_' + service_id).html(result);
                    }else{
                        $('#stopwatch_' + order_id + '_' + service_id + '_' + task_id).html(result);
                    }
                    $("#timeTracking").modal('hide');
                });

        }
    });
}

function get_service_project_related_data(service_id) {
    $.ajax({
        type: "POST",
        data: {
            service_id: service_id
        },
        url: base_url + 'services/home/get_service_project_related_data',
        dataType: "html",
        success: function (result) {
            if (result.trim() != 0) {
                $("#project_related_div").html(result);
            }
        }
    });
}
function get_edit_service_project_related_data(service_id , invoice_id) {
    $.ajax({
        type: "POST",
        data: {
            service_id: service_id,
            invoice_id: invoice_id
        },
        url: base_url + 'services/home/get_edit_service_project_related_data',
        dataType: "html",
        success: function (result) {
            if (result.trim() != 0) {
                $("#project_related_div").html(result);
            }
        }
    });
}

function show_select_office_staffs(element){
     var current_type = element.id;
     var office_id = $("#" +current_type).val();
     console.log(current_type);
     console.log(office_id);
      //return false;
      if(current_type == 'assign_to'){
        $.ajax({
            type: "POST",
            data: {
                    'office_id': office_id,
                    'template' : 1,
                    'key' : "all_project_staffs_assignto"
                },
            url: base_url + 'project/bring_staffs',
            dataType: "html",
            success: function(result){
                console.log(result);
                // return false;
                if(result != ''){
                    $("#assign_staff").empty().trigger('chosen:updated');    
                
                    result = JSON.parse(result.trim());
                    for (const r in result) {
                        $("#assign_staff").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                    }  
                }else{
                    $("#assign_staff").empty().trigger('chosen:updated');  
                }             
            }

        });
      }
}

function assign_service_task(task_id) {
    let staff_id=$("#service_staff").val();
    swal({
        title: 'Are you sure?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                data: {
                    task_id: task_id,
                    staff_id: staff_id
                },
                url: base_url + 'services/home/assign_service_task',
                cache: false,
                success: function (result) {
                    if (result.trim() == 1) {
                        swal("Success!", "Successfully assigned!", "success");
                        window.location.reload();
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

function bring_partner_name(element){
     var current = element.id;
     var value = $("#" +current).val();
     // console.log(current);
     // console.log(value);
      // return false;
      if(current == 'partner'||current == 'assign_to'||current == 'requested_by'){
        $.ajax({
            type: "POST",
            data: {
                    'recent_element': current,
                    'value' : value
                },
            url: base_url + 'services/home/bring_partner_name',
            dataType: "html",
            success: function(result){
                // console.log(result);
                // return false;
                if(result != ''){
                        if(current =='requested_by'){
                                $("#requested_by_staffs").empty().trigger('chosen:updated');
                        }    
                        if(current == 'assign_to') {
                               $("#assign_to_staff").empty().trigger('chosen:updated');    
                        }
                        if(current == 'partner') {
                               $("#partner_name").empty().trigger('chosen:updated');    
                        }
                        result = JSON.parse(result.trim());
                        for (const r in result) {
                            if(current =='requested_by'){
                                $("#requested_by_staffs").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                            }
                            if(current =='assign_to'){
                                $("#assign_to_staff").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                            }
                            if(current =='partner'){
                                $("#partner_name").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                            }
                        }
                } 
                else{
                             //alert('acb');
                            if(current =='requested_by'){
                                $("#requested_by_staffs").empty().trigger('chosen:updated');
                            }    
                            if(current == 'assign_to') {
                                $("#assign_to_staff").empty().trigger('chosen:updated');    
                            }
                            if(current == 'partner') {
                                $("#partner_name").empty().trigger('chosen:updated');    
                            }
                    }             
            }

        });
      }
}


function bring_referral_name(value){
     var referral_type = value;
     // console.log(referral_type);
      //return false;
        $.ajax({
            type: "POST",
            data: {
                    'referral_type': referral_type
                },
            url: base_url + 'services/home/bring_referral_name',
            dataType: "html",
            success: function(result){
                // console.log(result);
                result= result.trim();
                if(result != ''){
                    $("#referral_type_client").empty().trigger('chosen:updated');    
                
                    result = JSON.parse(result.trim());
                    for (const r in result) {
                        $("#referral_type_client").append(`<option value="${result[r].name}">${result[r].name}</option>`).trigger('chosen:updated');
                    }  
                }else{
                    $("#referral_type_client").empty().trigger('chosen:updated');  
                }             
            }

        });
      
}

  
function bring_service_name(value){
     var category_id = value;
     // console.log(referral_type);
      //return false;
      if(category_id != ""){
        $.ajax({
            type: "POST",
            data: {
                    'category_id': category_id
                },
            url: base_url + 'services/home/bring_service_name',
            dataType: "html",
            success: function(result){
                // console.log(result);
                result= result.trim();
                if(result != ''){
                    $("#category_filter_service_name").empty().trigger('chosen:updated');    
                
                    result = JSON.parse(result.trim());
                    for (const r in result) {
                        $("#category_filter_service_name").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                    }  
                }else{
                    $("#category_filter_service_name").empty().trigger('chosen:updated');  
                }             
            }

        });
    } else{
        $("#category_filter_service_name").empty().trigger('chosen:updated');
    }
        
} 

function load_order_dashboard_summary_box() {
    var data_new_home_dashboard = $("#data_new_home_dashboard").val();
    if (data_new_home_dashboard != undefined) {
        data_new_home_dashboard = data_new_home_dashboard;
    } else {
        data_new_home_dashboard = '';
    }
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
    var form_data = new FormData(document.getElementById('order-filter-display-div'));
    form_data.append('data_new_home_dashboard', data_new_home_dashboard);
    form_data.append('responsible_department', responsible_department);
    form_data.append('responsible_office', responsible_office);
    form_data.append('responsible_name', responsible_name);
    form_data.append('assign_department', assign_department);
    form_data.append('assign_office', assign_office);
    form_data.append('all_project_staffs_assignto', all_project_staffs_assignto);
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/load_order_dashboard_summary_box',
        data: form_data,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() != '') {
                $("#order_dashboard_summary_box").html(result);
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

function get_staff_list_with_office_id_or_dept(val='') {  
    var arr = val.split('-');
    var office_or_dept = arr[0];
    var office_dept_id = arr[1];
    $.ajax({
        type: 'POST',
        url: base_url + 'services/home/get_staff_list_office_or_dept_id',
        data: {
            office_or_dept: office_or_dept,
            office_dept_id: office_dept_id
        },
        dataType: "html",
        success: function (result) {
            $("#load_department_staff").hide();
            $(".assigned_hide").show();
            $("#assigned_department_staff").html(result);
        }
    });
}

function select_office_id(value , office_id , staff_tye , client_type) {
    if (staff_tye == 3) {
        if (value == 0) {
            $("#staff_office").val(office_id).trigger('chosen:updated');
            if (client_type == 'company') {
                refresh_existing_business_client_list(office_id, '');
                set_retail_price_for_main_service(office_id,'');
                set_retail_price_for_payroll_people_total('','',office_id);
            } else {
                refresh_existing_individual_client_list(office_id, '');
                set_retail_price_for_main_service(office_id,'');
            }
        } else {
            $("#office").val(office_id);
        }
    }
}
function would_will_create_project(reference_id,reference=''){
    if(reference=='company'){
        window.open(base_url + 'action/home/view_business/' + reference_id +'/n'+'/n'+'/y');
    }else{
        window.open(base_url + 'action/home/view_individual/' + reference_id +'/n'+'/y');
    }
}   