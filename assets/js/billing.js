var base_url = document.getElementById('base_url').value;

function saveDocument() {
    if (!requiredValidation('form_add_document')) {
        return false;
    }
    var formData = new FormData(document.getElementById('form_add_document'));
    $.ajax({
        type: 'POST',
        url: base_url + 'billing/home/request_save_document',
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            //            alert(result);return false;
            console.log("Result: " + result);
            if (result != 0) {
                //                alert('Hi');
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'billing/home/documents');
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function getServiceDropdownByCategory(category_id, service_id = "", section_id, invoice_type,section='',main_pattern='',main_month='',main_quarter='',main_year='') {
    /*alert(category_id);alert(service_id);alert(section_id);alert(invoice_type);alert(section);*/
    if (category_id == '') {
        $('#service_dropdown_div_' + section_id + ', #service_div_' + section_id).html('');
    } else {
        var recurring_invoice = $("#recurring_invoice").val();
        $.ajax({
            type: "POST",
            data: {
                category_id: category_id,
                service_id: service_id,
                section_id: section_id,
                invoice_type: invoice_type,
                recurring_invoice: recurring_invoice,
                section:section,
                main_pattern:main_pattern,
                main_month:main_month,
                main_quarter:main_quarter,
                main_year:main_year
            },
            url: base_url + 'billing/invoice/get_service_dropdown_by_category_id',
            dataType: "html",
            success: function(result) {
                /*console.log(result);*/
                if (result != '0') {
                    $('#service_dropdown_div_' + section_id).html(result);
                    if (service_id == '') {
                        $('#service_div_' + section_id).html('');
                    }
                } else {
                    $('#service_dropdown_div_' + section_id + ', #service_div_' + section_id).html('');
                }
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
                closeLoading();
            }
        });
    }
}

function getServiceInfoById(service_id, category_id, section_id,section='',main_pattern='',main_month='',main_quarter='',main_year='') {
    var response = select_company_type_mandatory_before_service_selection(service_id,section_id);
    if(response == false) {
        return false;
    }
    // console.log(service_id);console.log(category_id);console.log(section_id);
    var all_active_section = $("#section_id").val();
    all_active_section = all_active_section.split(',');  
    if(all_active_section.length > 1) {
        if(section_id == 1) {
            for(var i=1;i<=all_active_section.length;i++) {
                if(i != 1) {
                    removeService(i,'multiple_remove');
                }
            }
        }    
    }
    var staff_office = $("#staff_office").val();
    var invoice_type = $("#invoice_type").val();
    var office = $("#office").val();
    var client_type = $("#type_of_client_ddl").val();
    var ind_client_type = $("#type_of_individual_ddl").val();
    var is_recurrence = $("#is_recurrence").val();
    if (invoice_type == 1 && client_type == 0) {
        var client_id = $("#client_list_ddl").val();
        var client_reference = 'company';
    } else if (invoice_type == 2 && ind_client_type == 0) {
        var client_id = $("#individual_list_ddl").val();
        var client_reference = 'individual';
    } else {
        var client_id = '';
        var client_reference = '';
    }
    if (section_id != 1) {
        if ($('#will_create_project_1').prop("checked") == true) {
            var will_create_project = 'y';
        } else {
            var will_create_project = 'n';
        }
    }
    /*section length*/
    var all_active_section = $('#section_id').val();    
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
                invoice_type: invoice_type,
                ind_client_type: ind_client_type,
                is_recurrence: is_recurrence,
                client_id: client_id,
                client_reference: client_reference,
                section:section,
                all_active_section:all_active_section,
                main_pattern:main_pattern,
                main_month:main_month,
                main_quarter:main_quarter,
                main_year:main_year,
                will_create_project: will_create_project
            },
            url: base_url + 'billing/invoice/get_service_info_by_id',
            dataType: "html",
            success: function(result) {
                if (result != '0') {
                    $('#service_div_' + section_id).html(result);
                } else {
                    $('#service_div_' + section_id).html('');
                }
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
                closeLoading();
            }
        });
    }
}
function addService1(service_id = '',section='') {
    var section_id = $('#section_id').val();
    var service_id_arr = section_id.split(',');
    var service_id_arr_length = service_id_arr.length;
    
    if (service_id_arr_length >= 1) {
        var current_text = $("#create_project_section").html();
        var is_checked = $("#will_create_project_1").is(":checked");
        // if (section_id == 1) {
            if(is_checked) {
                var pattern1 = $("#pattern1").val();

                swal({
                    /*title:"Please uncheck will Create Project to Proceed!",
                    text: "Sorry!! Project creation feature is not available with multiple services!",*/
                    title:"Project Creation is Allowed!!",
                    text: "Additional Service should have Template with same Pattern",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-primary",
                    confirmButtonText: "Proceed!",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function() {
                    // $("#will_create_project_1").prop('checked' , false);
                    // $("#will_create_project_1").prop('disabled' , true);
                    // $("#pattern").prop('disabled',false);
                    // $("#period-pattern-1").css('display','none');        
                    // $("#will_create_project").val('no');
                    // $("#project_template_id").val('');
                    // $("#pattern").removeClass('disabled_section');
                    // $("#recurring_start_month").removeClass('disabled_section');
                    // $("#recurring_start_quarter").removeClass('disabled_section');
                    // $("#recurring_start_year").removeClass('disabled_section');
                    // $(".period-service1").removeAttr('required');
                    // $("#starting_month1").val('');
                    // $("#starting_year1").val('');
                    // console.log('service_id : '+service_id+'section : '+section+'section_id : '+section_id);
                    addServiceAdvanced(service_id,section,section_id);
                });
                // $(".showSweetAlert").addClass("invoice-sweet-alert");
            } else { /*Project Unchecked Secction*/
                addServiceAdvanced(service_id,section,section_id);
                // $("#will_create_project_1").prop('disabled' , true);
            }
        // } else { /*General Section*/
            // addServiceAdvanced(service_id,section,section_id);
        // }
    } else { /*Not possible Section*/
        addServiceAdvanced(service_id,section,section_id);        
    }
}

function addService(service_id = '',section='',request='') {
    var section_id = $('#section_id').val();
    var service_id_arr = section_id.split(',');
    var service_id_arr_length = service_id_arr.length;
    
    if (service_id_arr_length >= 1) {
        var is_checked = $("#will_create_project_1").is(":checked");
        if(is_checked) {
            var pattern1 = $("#pattern1").val();
            if(pattern1 == '') {
                swal('Pattern Required!','Please Select Pattern before adding Additional Service','warning');
                return false;
            } else {
                var month1 = '';var year1 = '';var quarter1 = ''; 
                if(pattern1.trim() == 'monthly') {
                    month1 = $("#starting_month1").val();
                    year1 = $("#starting_year1").val();
                    if(month1 == '' && year1 == '') {
                        swal('Month & Year Required!','Please Select Month & Year before adding Additional Service','warning');
                        return false;
                    } else if(month1 != '' && year1 == '') {
                        swal('Year Required!','Please Select Year before adding Additional Service','warning');
                        return false;
                    } else if(month1 == '' && year1 != '') {
                        swal('Month Required!','Please Select Month before adding Additional Service','warning');
                        return false;
                    } else {
                        if(request == 'add_btn') {
                            if(service_id != undefined) {
                                $("#add_btn_new_"+ section_id).empty();  /*removing add button while button generated at remove append*/  
                            }
                            addServiceAdvanced(service_id,section,section_id,pattern1,month1,quarter1,year1);
                        } else { /*General on load call manage*/
                            addServiceAdvanced(service_id,section,section_id,pattern1,month1,quarter1,year1);
                        }
                    }
                } else if(pattern1.trim() == 'quarterly') {
                    quarter1 = $("#starting_month1").val();
                    year1 = $("#starting_year1").val();
                    if(quarter1 == '' && year1 == '') {
                        swal('Quarter & Year Required!','Please Select Quarter & Year before adding Additional Service','warning');
                        return false;
                    } else if(quarter1 != '' && year1 == '') {
                        swal('Year Required!','Please Select Year before adding Additional Service','warning');
                        return false;
                    } else if(quarter1 == '' && year1 != '') {
                        swal('Quarter Required!','Please Select Quarter before adding Additional Service','warning');
                        return false;
                    } else {
                        if(request == 'add_btn') {
                            if(service_id != undefined) {
                                $("#add_btn_new_"+ section_id).empty();  /*removing add button while button generated at remove append*/  
                            }
                            addServiceAdvanced(service_id,section,section_id,pattern1,month1,quarter1,year1);
                        } else { /*General on load call manage*/
                            addServiceAdvanced(service_id,section,section_id,pattern1,month1,quarter1,year1);
                        }
                    }
                } else if (pattern1.trim() == 'annually') {
                    year1 = $("#starting_year1").val();
                    if (year1 == '') {
                        swal('Year Required!','Please Select Year before adding Additional Service','warning');
                        return false;
                    } else {
                        if(request == 'add_btn') {
                            if(service_id != undefined) {
                                $("#add_btn_new_"+ section_id).empty();  /*removing add button while button generated at remove append*/  
                            }
                            addServiceAdvanced(service_id,section,section_id,pattern1,month1,quarter1,year1);
                        } else { /*General on load call manage*/
                            addServiceAdvanced(service_id,section,section_id,pattern1,month1,quarter1,year1);
                        }            
                    }
                }
            }
        } else {
            var pattern1 = $("#pattern1").val();
            if(request == 'add_btn') {
                if(service_id != undefined) {
                    $("#add_btn_new_"+ section_id).empty();  /*removing add button while button generated at remove append*/  
                }
                addServiceAdvanced(service_id,section,section_id);
            } else { /*General on load call manage*/
                addServiceAdvanced(service_id,section,section_id);
            }
        }    
    } else { /*Not possible Section **Negetive Checking*/
        addServiceAdvanced(service_id,section,section_id);        
    }
}
function addServiceAdvanced(service_id,section,section_id='',pattern='',month='',quarter='',year='') {
    var invoice_type = $('#invoice_type').val();
    var project_id = $("#project_id").val();
    $.ajax({
        type: "POST",
        url: base_url + 'billing/invoice/add_service',
        data: {
            section_id: section_id,
            invoice_type: invoice_type,
            service_id: service_id,
            is_project: $('#is_project').val(),
            cat_id: $('#cat_id').val(),
            serid: $('#serid').val(),
            project_id: project_id,
            section:section,
            main_pattern:pattern,
            main_month:month,
            main_quarter:quarter,
            main_year:year
        },
        dataType: "html",
        success: function(result) {
            if (result != '0') {
                var obj = $.parseJSON(result);
                var newHtml = obj.section_result;
                if (obj.last_section_id == 'new') {
                    $('#service_section_div').html(newHtml);
                } else {
                    var section_link = $('#section_link_' + obj.last_section_id);
                    $("#section_link_" + obj.last_section_id).hide();
                    section_link.blur();
                    $(newHtml).insertAfter($('#service_result_div_' + obj.last_section_id));
                }
                $('#section_id').val(obj.section_id_hidden);
            } else {
                $('#service_section_div').html('');
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });    
}

function clear_service_id() {
    /*var is_disabled = $("#section_link_1").is('[disabled]');
    if(is_disabled) {
        return false;
    }*/
    $('#cat_id').val('');
    $('#serid').val('');
}

function addService_during_edit(service_id = '', remove_id = '',section='') {
    if(section == 'edit') {
        var has_project_template = $("#project_template_id").val();
        if(has_project_template != undefined) {
            swal({
                title: "ERROR!",
                text: "Sorry You can't add multiple services as project is associated with main service",
                type: "error"
            });
            return false;
        }
    }
    var section_id = $('#section_id').val();
    var invoice_type = $('#invoice_type').val();
    $.ajax({
        type: "POST",
        url: base_url + 'billing/invoice/add_service',
        data: {
            section_id: section_id,
            invoice_type: invoice_type,
            service_id: service_id,
            is_project: $('#is_project').val(),
            cat_id: $('#cat_id').val(),
            serid: $('#serid').val(),
            section:section
        },
        dataType: "html",
        success: function(result) {
            if (result != '0') {
                var obj = $.parseJSON(result);
                var newHtml = obj.section_result;
                if (obj.last_section_id == 'new') {
                    $('#service_section_div').html(newHtml);
                } else {
                    var section_link = $('#section_link_' + obj.last_section_id);
                    section_link.attr('onclick', 'deleteService_during_edit(' + remove_id + ');');
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
                $('#service_section_div').html('');
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function showExistingServices() {
    var invoice_id = $('#editval').val();
    var is_recurrence = $("#is_recurrence").val();
    $.ajax({
        type: "POST",
        url: base_url + 'billing/invoice/show_existing_services',
        data: {
            invoice_id: invoice_id,
            is_recurrence: is_recurrence
        },
        dataType: "html",
        success: function(result) {
            if (result != '0') {
                var obj = $.parseJSON(result);
                var newHtml = decodeURI(obj.section_result);
                $('#service_section_div').html(newHtml);
                $('#section_id').val(obj.section_id_hidden);
            } else {
                $('#service_section_div').html('');
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}


function removeService(remove_id,section='') {
    var section_id = $('#section_id').val();
    var section_arr = section_id.split(',');
    // alert(section_arr);
    if (section_arr.length == 2) {
        var index = section_id.indexOf(remove_id);
        if (index > -1) {
            section_arr.splice(index, 1);
        }
        var current_service = $("#service" + section_arr[0]).val();
        if (current_service != '') {
            $("#will_create_project_1").prop('disabled' , false);
            checkServiceRecurrenceTypeAndGetRecurrenceInfo(current_service, '', 'remove');
            checkServiceProjectCreationScope(current_service, '', section_arr[0], 'remove');
        }
    }
    // console.log(remove_id);
    $.ajax({
        type: "POST",
        url: base_url + 'billing/invoice/remove_service',
        data: {
            section_id: section_id,
            remove_id: remove_id
        },
        dataType: "html",
        success: function(result) {
            if (result != '0') {
                if (result == 'blank') {
                    $('#section_id').val('');
                } else {
                    $('#section_id').val(result);
                }
                $("#service_result_div_" + remove_id).remove();
                var prev_section_id = remove_id - 1;
                var section_arr_updated = section_arr;
                var current_section_id = section_arr_updated.pop().trim();
                if (section != 'multiple_remove') {
                    if(current_section_id == remove_id) {
                        if(section_arr_updated.length == 1) {
                            var add_button_existance = $("#section_link_1").val();
                            if (add_button_existance != undefined) {
                                $("#section_link_1").show();    
                            } else {
                                $("#add_btn_new_1").append(`<a href="javascript:void(0)" id="section_link_1" onclick="clear_service_id();addService('','1','add_btn');" class="btn btn-primary btn-sm"><h3 class="p-0 m-0 text-white"><i class="fa fa-plus-circle"></i> Add Another Service</h3></a><br>`);
                            }
                        } else {
                            var add_button_existance = $("#section_link_"+prev_section_id).val();
                            if (add_button_existance != undefined) {
                                $("#section_link_" + prev_section_id).show();    
                            } else {
                                $("#add_btn_new_"+ prev_section_id).append(`<a href="javascript:void(0)" id="section_link_${prev_section_id}; ?>" onclick="clear_service_id();addService('','${prev_section_id}','add_btn');" class="btn btn-primary btn-sm"><h3 class="p-0 m-0 text-white"><i class="fa fa-plus-circle"></i> Add Another Service</h3></a><br>`);
                            }      
                        }
                    }
                } 
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function deleteService_during_edit(remove_id) {
    swal({
        title: "Delete!",
        text: "Are you sure to delete this existing service??",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function() {
        var section_id = $('#section_id').val();
        // alert(remove_id);return false;
        $.ajax({
            type: "POST",
            url: base_url + 'billing/invoice/deleteService_during_edit',
            data: {
                section_id: section_id,
                remove_id: remove_id
            },
            dataType: "html",
            success: function(result) {
                // console.log(result);return false;
                result = result.trim();
                if (result != '0') {
                    if (result == 'blank') {
                        swal("Deleted Successfully", "This Existing Service is deleted completely", "success");
                        $('#section_id').val('');
                        $("#service_result_div_" + remove_id).remove();
                    } else if (result == 'payment_exist') {
                        swal("Cannot Delete!", "Transaction Done For This Service", "error");
                    } else if (result == 'cannot_delete') {
                        swal("Cannot Delete!", "This Is The Main Service", "error");
                    } else if (result == 'cannot_del') {
                        swal("Cannot Delete!", "At Least One Service Is Must", "error");
                    } else {
                        swal("Deleted Successfully", "This Existing Service is deleted completely", "success");
                        $('#section_id').val(result);
                        $("#service_result_div_" + remove_id).remove();
                    }
                }
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
                closeLoading();
            }
        });
    });
}

function addNote(section_id, is_label = 'y') {
    var textnote = $('#note_link_' + section_id).prev('.note-textarea-' + section_id).html();
    var div_count = Math.floor((Math.random() * 999) + 1);
    var newHtml = '';
    if (is_label === 'n') {
        newHtml = '<div class="form-group" id="note_div_' + section_id + '_' + div_count + '"> ' +
            textnote +
            '<a href="javascript:void(0)" onclick="removeNote(\'note_div_' + section_id + '_' + div_count + '\')" class="text-danger"><i class="fa fa-times"></i> Remove Note</a>' +
            '</div>';
    } else {
        newHtml = '<div class="form-group" id="note_div_' + section_id + '_' + div_count + '"> ' +
            '<label class="col-lg-2 control-label"></label>' +
            '<div class="col-lg-10">' +
            textnote +
            '<a href="javascript:void(0)" onclick="removeNote(\'note_div_' + section_id + '_' + div_count + '\')" class="text-danger"><i class="fa fa-times"></i> Remove Note</a>' +
            '</div>' +
            '</div>';
    }
    $(newHtml).insertAfter($('#note_link_' + section_id).closest('.form-group'));
}

function addNote_invoice(section_id, is_label = 'y') {
    var textnote = $('#note_link_' + section_id).prev('.note-textarea-' + section_id).html();
    var div_count = Math.floor((Math.random() * 999) + 1);
    var newHtml = '';
    if (is_label === 'n') {
        newHtml = '<div class="form-group" id="note_div_' + section_id + '_' + div_count + '"> ' +
            textnote +
            '<a href="javascript:void(0)" onclick="removeNote(\'note_div_' + section_id + '_' + div_count + '\')" class="text-danger"><i class="fa fa-times"></i> Remove Note</a>' +
            '</div>';
    } else {
        newHtml = '<div class="form-group" id="note_div_' + section_id + '_' + div_count + '"> ' +
            textnote +
            '<a href="javascript:void(0)" onclick="removeNote(\'note_div_' + section_id + '_' + div_count + '\')" class="text-danger"><i class="fa fa-times"></i> Remove Note</a>' +
            '</div>';
    }
    $(newHtml).insertAfter($('#note_link_' + section_id).closest('.form-group'));
}

function saveInvoice() {
    /*$('#form_create_invoice').find( 'select, textarea, input' ).each(function(){
        if(!$(this).prop('required')){
            console.log(this);
            console.log('Not Required Field');        
        } else { //required field
            console.log(this);
            console.log(this.value);
        }
    });*/
    if (!requiredValidation('form_create_invoice')) {
        return false;
    }
    if ($('#type_of_client_ddl').val() == '1' && $('#invoice_type').val() == '1') {
        var total_percentage = $("#owner_percentage_total").val();
        // if (total_percentage != '100.00') {
        //     swal("Error", "Percentage of all partners should equal to 100%", "error");
        //     return false;
        // }
    }
    company_type_enable();
    var editval = $("#editval").val();
    if (editval != '') {
        $('.disabled_field').removeAttr('disabled');
    }
    var is_recurrence = $('#recurring_invoice').val();
    var form_data = new FormData(document.getElementById('form_create_invoice'));
    // invoice recurence section
    var pattern = $("#pattern option:selected").val();
    if (is_recurrence == 'y') {
        if (pattern != '') {
            if (pattern == 'annually') {
                var due_day = $("#r_day").val();
                var due_month = $("#r_month option:selected").val();
            } else if (pattern == 'none') {
                var due_day = $("#r_day").val();
                var due_month = $("#r_month option:selected").val();
            } else if (pattern == 'weekly') {
                var due_day = $("#r_day").val();
                var due_month = $('input[name="recurrence[due_month]"]:checked').val();
            } else if (pattern == 'quarterly') {
                var due_day = $("#r_day").val();
                var due_month = $("#r_month option:selected").val();
            } else {
                var due_day = $("#r_day").val();
                var due_month = $("#r_month").val();
            }

            var until_date = $('#until_date').val();
            var start_date = $("#start_date").val();
            var duration_type = $('input[name="recurrence[duration_type]"]:checked').val();
            var duration_time = $("#duration_time").val();

            if (pattern == '' || due_day == '' || due_month == '' || start_date == '' || (duration_type == '1' && duration_time == '') || (duration_type == '2' && until_date == '')) {
                swal("Incomplete Information!", "Please Complete Recurrence Information!", "warning");
                return false;
            }
            form_data.append('recurrence[start_date]', start_date);
            form_data.append('recurrence[pattern]', pattern);
            form_data.append('recurrence[due_day]', due_day);
            form_data.append('recurrence[due_month]', due_month);
            form_data.append('recurrence[duration_type]', duration_type);
            form_data.append('recurrence[duration_time]', duration_time);
            form_data.append('recurrence[until_date]', until_date);
        } else {
            swal("Warning!", "Please Fill Invoice recurrence Pattern!", "warning");
            return false;
        }
    }
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/invoice/request_create_invoice',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            // console.log(result);return false;
            result = result.trim();
            if (editval == '') {
                if (result != 0) {
                    if ($("#recurring").val() == 'y') {
                        // return false;
                        goURL(base_url + 'billing/home/index');
                    } else {
                        goURL(base_url + 'billing/invoice/place/' + result);
                    }
                    // goURL(base_url + 'billing/invoice/place/' + result);                   
                } else {
                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                }
            } else {
                if (result != 0) {
                    swal({
                        title: "Success!",
                        text: "Successfully updated invoice!",
                        type: "success"
                    }, function() {
                        if ($("#edit_type").val() == 'edit_place') {
                            goURL(base_url + 'billing/invoice/place/' + result);
                        } else {
                            if (is_recurrence == 'y') {
                                goURL(base_url + 'billing/invoice/place/' + result + '/view');
                                // goURL(base_url + 'billing/home');
                            } else {
                                goURL(base_url + 'billing/invoice/place/' + result + '/view');
                                // goURL(base_url + 'billing/home/index/y');
                            }
                        }
                    });
                } else {
                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                }
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function placeOrder(invoice_id, emails, type_list = '') {
    $.ajax({
        type: "POST",
        data: {
            invoice_id: invoice_id,
            emails: emails,
            type_list: type_list
        },
        url: base_url + 'modal/show_invoice_email_modal',
        dataType: "html",
        success: function(result) {
            $('#emailsending').show();
            $("#emailsending").html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
            if (emails == '') {
                $('#row_div').hide();
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}


function sendInvoiceEmail() {
    if (!requiredValidation('invoice_email_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('invoice_email_form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/invoice/export',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            if (result != 0) {
                swal("Well Done!", "Your email has been sent successfully!", "success");
                $('#emailsending').modal('hide');
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function printOrder() {
    var doPrint = window.open();
    var printHtml = '<style type="text/css">body {background: #fff !important;} *{ font-size: 13px;}</style>';
    printHtml = printHtml + $('.order_summary').html();
    doPrint.document.write(printHtml);
    doPrint.print();
    doPrint.close();
}

function loadBillingDashboard(status = '', by = '', office = '', payment_status = '', reference_id = '', pageNumber = 0, is_recurrence = '', client_id = '', pattern = '', client_page = '', data_new_home_dashboard = '', service_id = '', partner_id = '', sort_criteria = '', sort_type = '') {
    // alert(client_page);
    // return false;
    var form_data = new FormData(document.getElementById('invoice-filter-display-div'));

    var responsible_department = $('#responsible_department').val();
    var responsible_office = $('#responsible_name').val();
    var responsible_name = $('#responsible_staff').val();
    if (responsible_department == undefined) {
        responsible_department = '';
    }
    if (responsible_office == undefined) {
        responsible_office = '';
    }
    if (responsible_name == undefined) {
        responsible_name = '';
    }
    form_data.append('status', status);
    form_data.append('by', by);
    form_data.append('office', office);
    form_data.append('payment_status', payment_status);
    form_data.append('reference_id', reference_id);
    form_data.append('page_number', pageNumber);
    form_data.append('is_recurrence', is_recurrence);
    form_data.append('client_id', client_id);
    form_data.append('pattern', pattern);
    form_data.append('client_page', client_page);
    form_data.append('data_new_home_dashboard', data_new_home_dashboard);
    form_data.append('service_id', service_id);
    form_data.append('partner_id', partner_id);
    form_data.append('sort_criteria', sort_criteria);
    form_data.append('sort_type', sort_type);
    form_data.append('responsible_department', responsible_department);
    form_data.append('responsible_office', responsible_office);
    form_data.append('responsible_name', responsible_name);
    $.ajax({
        type: "POST",
        url: base_url + 'billing/home/dashboard_ajax',
        data: form_data,
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            // alert(result);return false;
            if (result != '0') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $('#dashboard_result_div').html(result);
                    $('.dropdown-menu li.active').removeClass('active');
                    $(".sort_type_div #sort-desc").hide();
                    $(".sort_type_div #sort-asc").css({ display: 'inline-block' });
                    $("#sort-by-dropdown").html('Sort By <span class="caret"></span>');
                    $('.sort_type_div').css('display', 'none');
                    $("a.filter-button span:contains('-')").html(0);
                    if ((status + by) == '') {
                        if (pattern == '') {
                            clearFilter();
                        }
                    }
                } else {
                    $(".ajaxdiv").append(result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                if ((status + by) != '') {
                    $("#clear_filter").show();
                    $('#btn_clear_filter').show();
                } else {
                    if (pattern == '') {
                        clearFilter();
                    }
                }
                if (payment_status == 4) {
                    clearFilter();
                    $('#btn_clear_filter').hide();
                }
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
            jumpDiv();
        }
    });
}

function loadBillingDashboard2(status = '', by = '', office = '', payment_status = '', reference_id = '', pageNumber = 0, is_recurrence = '', client_id = '', pattern = '', client_page = '') {
    // alert(client_page);
    // return false;
    $.ajax({
        type: "POST",
        url: base_url + 'billing/home2/dashboard_ajax',
        data: {
            status: status,
            by: by,
            office: office,
            payment_status: payment_status,
            reference_id: reference_id,
            page_number: pageNumber,
            is_recurrence: is_recurrence,
            client_id: client_id,
            pattern: pattern,
            client_page: client_page
        },
        dataType: "html",
        success: function(result) {
            // alert(result);return false;
            if (result != '0') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $('#dashboard_result_div').html(result);
                    $('.dropdown-menu li.active').removeClass('active');
                    $(".sort_type_div #sort-desc").hide();
                    $(".sort_type_div #sort-asc").css({ display: 'inline-block' });
                    $("#sort-by-dropdown").html('Sort By <span class="caret"></span>');
                    $('.sort_type_div').css('display', 'none');
                    $("a.filter-button span:contains('-')").html(0);
                    if ((status + by) == '') {
                        if (pattern == '') {
                            clearFilter();
                        }
                    }
                } else {
                    $(".ajaxdiv").append(result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                if ((status + by) != '') {
                    $("#clear_filter").show();
                    $('#btn_clear_filter').show();
                } else {
                    if (pattern == '') {
                        clearFilter();
                    }
                }
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
            jumpDiv();
        }
    });
}

function billingDashboardNoteModal(order_id, service_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'billing/home/billing_dashboard_note_ajax',
        data: {
            order_id: order_id,
            service_id: service_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            if (result != '0') {
                var notes = JSON.parse(result);
                var resultHTML = '';
                for (var i = 0; i < notes.length; i++) {
                    resultHTML += '<div class="form-group"><div class="col-lg-12"><div class="note-textarea">';
                    resultHTML += '<textarea readonly="readonly" style="resize: none;" class="form-control" title="Invoice Service Note">' + notes[i].note + '</textarea>';
                    resultHTML += '</div></div></div>';
                }
                $('#note-body-div').html(resultHTML);
                $('#showNotes').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            } else {
                $('#note-body-div').html('');
                $('#showNotes').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }
        }
    });
}

function billingDashboardRecurringTrackingModal(invoice_id, status) {
    openModal('change_status_recurring_div');
    var txt = 'Change Status of SubOrder id #' + invoice_id;
    $("#change_status_recurring_div .modal-title").html(txt);
    if (status == 1) {
        $("#change_status_recurring_div #ra1").prop('checked', true);
        $("#change_status_recurring_div #ra2").prop('checked', false);
        $("#change_status_recurring_div #ra3").prop('checked', false);
        $("#change_status_recurring_div #ra7").prop('checked', false);
    } else if (status == 2) {
        $("#change_status_recurring_div #ra1").prop('checked', false);
        $("#change_status_recurring_div #ra2").prop('checked', true);
        $("#change_status_recurring_div #ra3").prop('checked', false);
        $("#change_status_recurring_div #ra7").prop('checked', false);
    } else if (status == 3) {
        $("#change_status_recurring_div #ra1").prop('checked', false);
        $("#change_status_recurring_div #ra2").prop('checked', false);
        $("#change_status_recurring_div #ra3").prop('checked', true);
        $("#change_status_recurring_div #ra7").prop('checked', false);
    } else if (status == 7) {
        $("#change_status_recurring_div #ra1").prop('checked', false);
        $("#change_status_recurring_div #ra2").prop('checked', false);
        $("#change_status_recurring_div #ra3").prop('checked', false);
        $("#change_status_recurring_div #ra7").prop('checked', true);
    }
    $("#change_status_recurring_div #current_status2").val(status);
    $.get(base_url + "billing/home/get_tracking_log/" + invoice_id + "/invoice_info", function(data) {
        $("#status_log > tbody > tr").remove();
        var returnedData = JSON.parse(data);
        var trackingList = returnedData.tracking_list;
        for (var i = 0, l = trackingList.length; i < l; i++) {
            $('#status_log > tbody:last-child').append("<tr><td>" + trackingList[i]["stuff_id"] + "</td>" + "<td>" + trackingList[i]["department"] + "</td>" + "<td>" + trackingList[i]["status"] + "</td>" + "<td>" + trackingList[i]["created_time"] + "</td></tr>");
        }
        if (returnedData.disabled == 'y') {
            $('input[type="radio"]:not(:checked)').prop('disabled', true);
        } else {
            $('input[type="radio"]:not(:checked)').prop('disabled', false);
        }
        if (trackingList.length >= 1)
            $("#log_modal2").show();
        else
            $("#log_modal2").hide();
    });
    $("#change_status_recurring_div #invoice_id2").val(invoice_id);
}

function billingDashboardTrackingModal(invoice_id, status) {
    openModal('change_status_billing_div');
    var txt = 'Change Status of SubOrder id #' + invoice_id;
    $("#change_status_billing_div .modal-title").html(txt);
    if (status == 1) {
        $("#change_status_billing_div #re1").prop('checked', true);
        $("#change_status_billing_div #re2").prop('checked', false);
        $("#change_status_billing_div #re3").prop('checked', false);
        $("#change_status_billing_div #re7").prop('checked', false);
    } else if (status == 2) {
        $("#change_status_billing_div #re1").prop('checked', false);
        $("#change_status_billing_div #re2").prop('checked', true);
        $("#change_status_billing_div #re3").prop('checked', false);
        $("#change_status_billing_div #re7").prop('checked', false);
    } else if (status == 3) {
        $("#change_status_billing_div #re1").prop('checked', false);
        $("#change_status_billing_div #re2").prop('checked', false);
        $("#change_status_billing_div #re3").prop('checked', true);
        $("#change_status_billing_div #re7").prop('checked', false);
    } else if (status == 7) {
        $("#change_status_billing_div #re1").prop('checked', false);
        $("#change_status_billing_div #re2").prop('checked', false);
        $("#change_status_billing_div #re3").prop('checked', false);
        $("#change_status_billing_div #re7").prop('checked', true);
    }
    $("#change_status_billing_div #current_status").val(status);
    $.get(base_url + "billing/home/get_tracking_log/" + invoice_id + "/invoice_info", function(data) {
        $("#status_log > tbody > tr").remove();
        var returnedData = JSON.parse(data);
        var trackingList = returnedData.tracking_list;
        for (var i = 0, l = trackingList.length; i < l; i++) {
            // $('#status_log > tbody:last-child').append("<tr><td>" + trackingList[i]["stuff_id"] + "</td>" + "<td>" + trackingList[i]["department"] + "</td>" + "<td>" + trackingList[i]["status"] + "</td>" + "<td>" + trackingList[i]["created_time"] + "</td></tr>");
            $('#status_log > tbody:last-child').append("<tr><td>" + trackingList[i]["stuff_id"] + "</td>" + "<td>" + trackingList[i]["status"] + "</td>" + "<td>" + trackingList[i]["created_time"] + "</td></tr>");
        }
        if (returnedData.disabled == 'y') {
            $('input[type="radio"]:not(:checked)').prop('disabled', true);
        } else {
            $('input[type="radio"]:not(:checked)').prop('disabled', false);
        }
        if (trackingList.length >= 1)
            $("#log_modal").show();
        else
            $("#log_modal").hide();
    });
    $("#change_status_billing_div #invoice_id").val(invoice_id);
}

function updateStatusrecurringBilling() {
    var status = $('#change_status_recurring_div input:radio[name=radio]:checked').val();
    var invoice_id = $('#change_status_recurring_div #invoice_id2').val();
    var status_value = $('#change_status_recurring_div input:radio[name=radio]:checked').parent().find('strong').html();
    var current_status = parseInt($("#change_status_recurring_div #current_status2").val());
    var status_class_array = [
        'label-danger',
        'label-success',  
        'label-yellow',
        'label-primary'
    ];

     if(status == 7){
        swal({
              title: "Are you sure?",
              text: "Do you want to cancel the related order too?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              closeOnConfirm: false,
              closeOnCancel: false
            },
            function(isConfirm){
              if (isConfirm) {
                $.ajax({
                    type: "POST",
                    data: {
                        status: status,
                        invoice_id: invoice_id
                    },
                    url: base_url + 'billing/home/update_billing_recurring_status',
                    dataType: "html",
                    success: function(result) {
                        if (result.trim() == 'paid') {
                            swal("Can not change status", "Payment has been made.", "error");
                            $("#change_status_billing_div").modal('hide');
                        } else if (result.trim() == 1) {
                            $('.invoice-tracking-span-' + invoice_id + ' b').html(status_value);
                            $('.invoice-tracking-span-' + invoice_id).removeClass(current_status === 7 ? status_class_array[0] : status_class_array[current_status]);
                            $('.invoice-tracking-span-' + invoice_id).addClass(status === 7 ? status_class_array[0] : status_class_array[status]);
                            $('.invoice-tracking-span-' + invoice_id).parent('a').attr('onclick', 'billingDashboardRecurringTrackingModal(' + invoice_id + ',' + status + ');');
                            $("#change_status_recurring_div").modal('hide');
                            swal("Success", "", "success");
                            //                goURL(base_url + 'billing/home');
                        }
                    }
                });  
              } else {
                swal("Cancelled", "", "error");
              }
            });
    }else {
        $.ajax({
            type: "POST",
            data: {
                status: status,
                invoice_id: invoice_id
            },
            url: base_url + 'billing/home/update_billing_recurring_status',
            dataType: "html",
            success: function(result) {
                if (result.trim() != 0) {
                    $('.invoice-tracking-span-' + invoice_id + ' b').html(status_value);
                    $('.invoice-tracking-span-' + invoice_id).removeClass(current_status === 7 ? status_class_array[0] : status_class_array[current_status]);
                    $('.invoice-tracking-span-' + invoice_id).addClass(status === 7 ? status_class_array[0] : status_class_array[status]);
                    $('.invoice-tracking-span-' + invoice_id).parent('a').attr('onclick', 'billingDashboardRecurringTrackingModal(' + invoice_id + ',' + status + ');');
                    $("#change_status_recurring_div").modal('hide');
                    //                goURL(base_url + 'billing/home');
                }
            }
        });
    }
}

function updateStatusBilling() {
    var status = $('#change_status_billing_div input:radio[name=radio]:checked').val();
    var invoice_id = $('#change_status_billing_div #invoice_id').val();
    var status_value = $('#change_status_billing_div input:radio[name=radio]:checked').parent().find('strong').html();
    var current_status = parseInt($("#change_status_billing_div #current_status").val());
    var status_class_array = [
        'label-danger',
        'label-success',
        'label-yellow',
        'label-primary'
    ];
    if(status == 7){
        swal({
              title: "Are you sure?",
              text: "Do you want to cancel the related order too?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              closeOnConfirm: false,
              closeOnCancel: false
            },
            function(isConfirm){
              if (isConfirm) {
                $.ajax({
                    type: "POST",
                    data: {
                        status: status,
                        invoice_id: invoice_id
                    },
                    url: base_url + 'billing/home/update_billing_status',
                    dataType: "html",
                    success: function (result) {
                        //console.log(result);
                        if (result.trim() == 'paid') {
                            swal("Can not change status", "Payment has been made.", "error");
                            $("#change_status_billing_div").modal('hide');
                        } else if (result.trim() == 1) {
                            $('.invoice-tracking-span-' + invoice_id + ' b').html(status_value);
                            $('.invoice-tracking-span-' + invoice_id).removeClass(current_status === 7 ? status_class_array[0] : status_class_array[current_status]);
                            $('.invoice-tracking-span-' + invoice_id).addClass(status === 7 ? status_class_array[0] : status_class_array[status]);
                            $('.invoice-tracking-span-' + invoice_id).parent('a').attr('onclick', 'billingDashboardTrackingModal(' + invoice_id + ',' + status + ');');
                            $("#change_status_billing_div").modal('hide');
                            swal("Success", "", "success");
            //                goURL(base_url + 'billing/home');
                        }
                    }
                });
                
              } else {
                swal("Cancelled", "", "error");
              }
            });
    }else {
        $.ajax({
            type: "POST",
            data: {
                status: status,
                invoice_id: invoice_id
            },
            url: base_url + 'billing/home/update_billing_status',
            dataType: "html",
            success: function (result) {
                console.log(result);
                if (result.trim() != 0) {
                    $('.invoice-tracking-span-' + invoice_id + ' b').html(status_value);
                    $('.invoice-tracking-span-' + invoice_id).removeClass(current_status === 7 ? status_class_array[0] : status_class_array[current_status]);
                    $('.invoice-tracking-span-' + invoice_id).addClass(status === 7 ? status_class_array[0] : status_class_array[status]);
                    $('.invoice-tracking-span-' + invoice_id).parent('a').attr('onclick', 'billingDashboardTrackingModal(' + invoice_id + ',' + status + ');');
                    $("#change_status_billing_div").modal('hide');
    //                goURL(base_url + 'billing/home');
                }
            }
        });
    }


    
    
}
function buyService() {
    $.ajax({
        type: "POST",
        url: base_url + 'billing/invoice/export',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            alert(result);
            //            return false;
            //            console.log("Result: " + result);
            //            if (result != 0) {
            //                swal("Success!", "Successfully saved!", "success");
            //                goURL(base_url);
            //            } else {
            //                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            //            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function cancelInvoice() {
    goURL('../');
}

function invoiceContainerAjax(invoice_type, reference_id, invoice_id, is_recurrence, project_id = '') {
    var url = '';
    if (invoice_id != '') {
        url = 'billing/invoice/get_edit_invoice_container_ajax';
    } else {
        url = 'billing/invoice/get_invoice_container_ajax';
    }
    $.ajax({
        type: 'POST',
        url: base_url + url,
        data: {
            invoice_id: invoice_id,
            invoice_type: invoice_type,
            reference_id: reference_id,
            is_recurrence: is_recurrence,
            client_id: $('#client_id').val(),
            is_project: $('#is_project').val(),
            cat_id: $('#cat_id').val(),
            serid: $('#serid').val(),
            project_id: project_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            // alert(result);return false;
            if (result != '0') {
                $('#invoice_container').html(result);
            } else {
                go('billing/home');
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

//function individualTypeChange(type) {
//
//    if (type == '0') {
//        $("#individual_list").show();
//        $("#personal_information, #other_info_div, #internal_data_div, .display_div").hide();
//    } else {
//        $("#individual_list").hide();
//        $("#existing_individual_id, #existing_reference_id, .personal_info, .other_info").val('');
//        $(".internal_data").val('');
//        $("#personal_information, #other_info_div, #internal_data_div").show();
//        $("#contact-list").html(blank_contact_list());
//        $('.display_div').show();
//    }
//}

function existingIndividual(individual) {
    if (individual == '') {
        $("#existing_individual_id, #existing_reference_id, .personal_info, .other_info").val('');
        $(".internal_data").val('');
        $("#personal_information, #other_info_div, #internal_data_div").hide();
        $('.required_field').prop('required', true);
        $("#contact-list").html(blank_contact_list());
    } else {
        $('.required_field').prop('required', false);
        $("#personal_information, #other_info_div, #internal_data_div").hide();
        individualInfoById(individual);
    }
}

function individualInfoById(title_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'billing/invoice/get_individual_info_ajax',
        data: {
            title_id: title_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            if (result != '0') {
                var individual_info = JSON.parse(result);
                var individual_id = $('#individual_id').val();
                var company_id = $('#company_id').val();
                var existing_reference_id = individual_info.existing_reference_id;
                //                $("#individual_title").val(individual_info.title);
                //                $("#individual_percentage").val(individual_info.percentage);
                $("#individual_first_name").val(individual_info.first_name);
                $("#individual_middle_name").val(individual_info.middle_name);
                $("#individual_last_name").val(individual_info.last_name);
                $("#individual_ssn_itin").val(individual_info.ssn_itin);
                $("#individual_dob").val(individual_info.birth_date);
                $("#individual_language").val(individual_info.language);
                $("#individual_country_residence").val(individual_info.country_residence);
                $("#individual_country_citizenship").val(individual_info.country_citizenship);
                $("#existing_reference_id").val(individual_info.existing_reference_id);
                $("#existing_individual_id").val(individual_info.individual_id);
                get_contact_list(individual_info.individual_id, 'individual', "y");
                setInternalData(existing_reference_id, 'individual');
                $("#personal_information, #other_info_div").hide();
            } else {
                $("#personal_information, #other_info_div").show();
                $("#existing_individual_id, #existing_reference_id, .personal_info, other_info").val('');
                $("#contact-list").html(blank_contact_list());
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function setInternalData(reference_id, reference) {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id
        },
        url: base_url + 'services/accounting_services/get_internal_data',
        dataType: "html",
        success: function(result) {
            if (result != 0) {
                var res = JSON.parse(result);
                $(".office-internal #office").val(res.office);
                load_partner_manager_ddl(res.office, res.partner, res.manager);
                $("#client_association").val(res.client_association);
                $("#referred_by_source").val(res.referred_by_source);
                $("#referred_by_name").val(res.referred_by_name);
                $("#language").val(res.language);
                $('#internal_data_div').hide();
            } else {
                $('.internal_data').val("");
                $('#internal_data_div').hide();
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function getInternalData(reference_id, reference) {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id
        },
        url: base_url + 'services/accounting_services/get_internal_data',
        dataType: "html",
        success: function(result) {
            if (result != 0) {
                var res = JSON.parse(result);
                $(".office-internal #office").val(res.office);
                load_partner_manager_ddl(res.office, res.partner, res.manager);
                $("#client_association").val(res.client_association);
                $("#referred_by_source").val(res.referred_by_source);
                $("#referred_by_name").val(res.referred_by_name);
                $("#language").val(res.language);
                if (res.practice_id != '') {
                    $("#existing_practice_id").val(res.practice_id);
                }
                change_referred_name_status(res.referred_by_source);
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function getInternalData2(reference_id, reference) {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id
        },
        url: base_url + 'services/accounting_services/get_internal_data',
        dataType: "html",
        success: function(result) {
            if (result != 0) {
                var res = JSON.parse(result);
                $(".office-internal #office").val(res.office);
                if (res.assistant != null && res.assistant != 0) {
                    var assistant_id = res.assistant;
                } else {
                    var assistant_id = res.manager;
                }
                load_partner_manager_ddl(res.office, res.partner, res.manager, assistant_id);
                $("#client_association").val(res.client_association);
                $("#referred_by_source").val(res.referred_by_source);
                // $("#referred_by_name").val(res.referred_by_name);
                var ref_by_src = res.referred_by_source;
                if (ref_by_src != 16) {
                    change_referral_type_for_service(res.referred_by_source, res.referred_by_name, reference_id, reference);
                } else {
                    change_referral_type_for_service(res.referred_by_source, res.referred_by_name, reference_id, reference);
                }

                $("#language").val(res.language);
                if (res.practice_id != '') {
                    $("#existing_practice_id").val(res.practice_id);
                }
                // change_referred_name_status(res.referred_by_source);
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function getInternalData3(reference_id, reference) {
    $.ajax({
        type: "POST",
        data: {
            reference: reference,
            reference_id: reference_id
        },
        url: base_url + 'services/accounting_services/get_internal_data',
        dataType: "html",
        success: function(result) {
            if (result != 0) {
                var res = JSON.parse(result);
                $(".office-internal #office").val(res.office);
                if (res.assistant != null && res.assistant != 0) {
                    var assistant_id = res.assistant;
                } else {
                    var assistant_id = res.manager;
                }
                load_partner_manager_ddl(res.office, res.partner, res.manager, assistant_id);
                $("#client_association").val(res.client_association);
                $("#referred_by_source").val(res.referred_by_source);
                // $("#referred_by_name").val(res.referred_by_name);
                var ref_by_src = res.referred_by_source;
                if (ref_by_src != 16) {
                    change_referral_type(res.referred_by_source, res.referred_by_name, reference_id, reference);
                } else {
                    change_referral_type(res.referred_by_source, res.referred_by_name, reference_id, reference);
                }

                $("#language").val(res.language);
                if (res.practice_id != '') {
                    $("#existing_practice_id").val(res.practice_id);
                }
                // change_referred_name_status(res.referred_by_source);
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function loadPayments(status, by, office, payment_status) {
    $.ajax({
        type: "POST",
        url: base_url + 'billing/payments/payments_ajax',
        data: {
            status: status,
            by: by,
            office: office,
            payment_status: payment_status
        },
        dataType: "html",
        success: function(result) {
            if (result != '0') {
                $('#payments_div').html(result);
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function savePayment() {
    if (!requiredValidation('form_save_payment')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_save_payment'));
    var pay_amount = parseFloat(document.getElementById('payment_amount').value);
    var due_amount = parseFloat(document.getElementById('due_amount').value);
    if (pay_amount > due_amount) {
        swal("ERROR!", "payment amount can't exceed the due amount", "error");
        return false;
    }
    var cardType = "";
    var cardNumber = $("input#card_number").val();
    if (cardNumber != '') {
        if ((cardNumber.length != 15) && (cardNumber.length != 16)) {
            $("input#card_number").next('div.errorMessage').html('Card Number Not Valid');
            return false;
        }
        cardType = GetCardType(cardNumber);
        if (cardType == "") {
            $("input#card_number").next('div.errorMessage').html('Card Number Not Valid');
            return false;
        }
    }
    form_data.append('card_type', cardType);

    var invoice_id = $("#invoice_id").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/payments/save_payment',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            // console.log("Result: " + result);return false;
            if (result == 1) {
                swal("Success!", "Payment Successfull", "success");
                goURL(base_url + 'billing/payments/details/' + btoa(invoice_id));
            } else if (result == 0) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("ERROR!", result, "error");
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function saveRefund() {
    if (!requiredValidation('form_save_payment')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_save_payment'));
    var pay_amount = parseFloat(document.getElementById('payment_amount').value);
    var refund_amount = parseFloat(document.getElementById('payble_amount').value);
    if (pay_amount > refund_amount) {
        swal("ERROR!", "Refund amount can't exceed the payble amount", "error");
        return false;
    }
    if (refund_amount == '0') {
        swal("ERROR!", "Refund amount can't be zero", "error");
        return false;
    }
    var invoice_id = $("#invoice_id").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/payments/save_refund',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            if (result != 0) {
                goURL(base_url + 'billing/payments/details/' + btoa(invoice_id));
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function countTotalPrice(section_id, override_price, retail_price, sub_total) {
    var base_price = retail_price * sub_total;
    if (override_price != '') {
        base_price = override_price * sub_total;
    }
    $('#base_price_' + section_id).val(base_price.toFixed(2));
}

setInterval(function() {
    var base_price_list = document.getElementsByClassName('total_price_each_service');
    var total_price = 0;
    if (base_price_list.length != 0) {
        for (i = 0; i < base_price_list.length; i++) {
            total_price += parseFloat(base_price_list[i].value);
        }
    }
    if (total_price != 0) {
        $('#base_price_div').show();
        $('#total_price').html(total_price.toFixed(2));
    } else {
        $('#base_price_div').hide();
    }
}, 1000);

function paymentDashboardNoteModal(payment_id) {
    var resultHTML = '<div class="form-group"><div class="col-lg-12"><div class="note-textarea">';
    resultHTML += '<textarea readonly="readonly" style="resize: none;" class="form-control" title="Service Note">' + $("#note_hidden_" + payment_id).val() + '</textarea>';
    resultHTML += '</div></div></div>';
    $('#note-body').html(resultHTML);
    $('#showPaymentNotes').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function paymentDashboardFileModal(payment_id) {
    var resultHTML = '<img src="' + base_url + 'uploads/' + $("#file_hidden_" + payment_id).val() + '" style="max-width: 100%;">';
    $('#image_preview').html(resultHTML);
    $('#showPaymentFile').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function cancelPayment(payment_id, invoice_id) {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
    }, function(isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                data: {
                    payment_id: payment_id,
                },
                url: base_url + 'billing/payments/cancel_payment',
                cache: false,
                success: function(result) {
                    if (result != 0) {
                        swal("Success!", "Successfully Payment Canceled!", "success");
                        goURL(base_url + 'billing/payments/details/' + btoa(invoice_id));
                    } else {
                        swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                    }
                },
                beforeSend: function() {
                    openLoading();
                },
                complete: function(msg) {
                    closeLoading();
                }
            });
        }
    });
}

function refundAll(invoice_id) {
    swal({
        title: 'Are you sure?',
        text: "You refund all amounts to the client!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, refund!'
    }, function(isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                data: {
                    invoice_id: invoice_id,
                },
                url: base_url + 'billing/payments/refund_all',
                cache: false,
                success: function(result) {
                    if (result != 0) {
                        swal("Success!", "Successfully refunded!", "success");
                        goURL(base_url + 'billing/payments/details/' + btoa(invoice_id));
                    } else {
                        swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                    }
                },
                beforeSend: function() {
                    openLoading();
                },
                complete: function(msg) {
                    closeLoading();
                }
            });
        }
    });
}

function changePaymentStatus(invoice_id) {
    swal({
        title: 'Are you sure?',
        text: "You want to complete the status!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change!'
    }, function(isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                data: {
                    invoice_id: invoice_id,
                },
                url: base_url + 'billing/payments/change_payment_status',
                cache: false,
                success: function(result) {
                    if (result != 0) {
                        swal("Success!", "Successfully changed!", "success");
                        goURL(base_url + 'billing/payments');
                    } else {
                        swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                    }
                },
                beforeSend: function() {
                    openLoading();
                },
                complete: function(msg) {
                    closeLoading();
                }
            });
        }
    });
}



function addDocumentAjax(deposit_id) {
    var section_id = $('#section_id').val();
    $.ajax({
        type: "POST",
        url: base_url + 'billing/home/add_document_ajax',
        data: {
            section_id: section_id,
            deposit_id: deposit_id
        },
        dataType: "html",
        success: function(result) {
            if (result != '0') {
                var obj = $.parseJSON(result);
                var newHtml = obj.section_result;
                if (deposit_id == '') {
                    if (obj.last_section_id == 'new') {
                        $('#document_container_div').html(newHtml);
                    } else {
                        var section_link = $('#section_link_' + obj.last_section_id);
                        section_link.attr('onclick', 'removeDocument(' + obj.last_section_id + ');');
                        section_link.removeClass('text-success');
                        section_link.addClass('text-danger');
                        section_link.html('<h4><i class="fa fa-times"></i> Remove</h4>');
                        section_link.blur();
                        $(newHtml).insertAfter($('#document_result_div_' + obj.last_section_id));
                    }
                    $('#section_id').val(obj.section_id_hidden);
                } else {
                    $('#document_container_div').html(newHtml);
                    $('#section_id').val(obj.section_id_hidden);
                }
            } else {
                $('#document_container_div').html('');
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function removeDocument(sectionID) {
    $("#document_result_div_" + sectionID).remove();
}

function refresh_existing_individual_list(officeID = '', clientID = '') {
    $.ajax({
        type: "POST",
        data: {
            office_id: officeID,
            client_id: clientID
        },
        url: base_url + 'billing/invoice/individual_list_by_office',
        dataType: "html",
        success: function(result) {
            $("#individual_list_ddl").chosen();
            $("#individual_list_ddl").chosen('destroy');
            $("#individual_list_ddl").html(result);
            $("#individual_list_ddl").chosen();
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function invoiceFilter(is_recurrence = '', client_id = '', pattern = '') {
    var form_data = new FormData(document.getElementById('filter-form'));
    form_data.append('is_recurrence', is_recurrence);
    form_data.append('client_id', client_id);
    form_data.append('pattern', pattern);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/home/invoice_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            //console.log("Result: " + result); return false;
            $("#dashboard_result_div").html(result);
            $("[data-toggle=popover]").popover();
            $("#clear_filter").show();
            $('#btn_clear_filter').show();
            $('#InvoiceFilterModal').modal('hide');
            display_invoice_applied_filters();
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function display_invoice_applied_filters() {
    var dropdownArray = [];
    var removeAttArray = [];

    $('#filter-form input, #filter-form select, #filter-form a.remove-filter-button').each(function(index) {
        var input = $(this);
        var elementType = input.prop('nodeName');


        if (elementType == 'SELECT') {
            var chosenVal = input.chosen().val()
            var value = '';

            if (typeof chosenVal == 'object') {
                $.each(input.context.selectedOptions, function(index, val) {
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
    var archive = $("input[name='complete_canceled_invoice']:checked").val();
    //    console.log(archive);
    dropdownArray = dropdownArray.filter(Boolean);
    if (archive == undefined) {
        dropdownArray.pop();
    }

    var newTr = "";
    for (var i = 0; i < dropdownArray.length; i++) {
        if (i % 3 == 0)
            newTr += (i > 0) ? "</div><div id='" + i + "' class='p-b-3'>&nbsp" : "<div class='p-b-3'>&nbsp";
        newTr += "<span class='label label-default'>" + dropdownArray[i] + "</span>&nbsp";
    }
    newTr += "</div>";

    $("#invoice_filted_data").html(newTr);

    $('#invoice_filted_data a.btn_remove_filter').each(function(index) {
        $(this).attr('data-random', removeAttArray[index].match(/\d+/)[0]);
    });
}

var changeAlternateFields = function(PaymentTypeID) {
    $(".alternate-field-div, div.pay-now-div").hide();
    $(".alternate-field-div input").prop('required', false);
    $('#ref_no').prev().html('Reference');
    $('#ref_no').prop({ 'title': 'Reference', 'placeholder': 'Reference' });
    $('div.pay-now-div').find('input').prop('required', false);
    switch (parseInt(PaymentTypeID)) {
        case 1: //Cash
            $('#ref_no').parent().show();
            break;
        case 2: //Check
            $('#check_number').parent().show();
            $('#check_number').prop('required', true);
            $('#payment_file').parent().show();
            $('#payment_file').prop('required', false);
            break;
        case 3: //Credit Card
        case 5: //Paypal
            $('#authorization_id').parent().show();
            $('#authorization_id').prop('required', true);
            break;
        case 4: //Wire Transfer
        case 6: //ACH
        case 7: //Zelle
            $('#ref_no').parent().show();
            $('#ref_no').prop('required', true);
            $('#ref_no').prev().html('Reference ID<span class="text-danger">*</span>');
            break;
        case 8: //WRITE OFF
            $('#ref_no').prev().html('Authorized By');
            $('#ref_no').parent().show();
            $('#ref_no').prop({ 'title': 'Authorized By', 'placeholder': 'Authorized By' });
            $('#payment_file').parent().show();
            $('#payment_file').prop('required', false);
            break;
        case 9: //Pay NOW
            $('div.pay-now-div').show();
            $('div.pay-now-div').find('input').prop('required', true);
            break;
        default:
            $("#payment_note").parent().show();
    }
};

function sortInvoiceDashboard(sortCriteria = '', sortType = '', is_recurrence = '') {
    // alert(sortCriteria);return false;
    var form_data = new FormData(document.getElementById('filter-form'));
    if (sortCriteria == '') {
        var sc = $('.dropdown-menu li.active').find('a').attr('id');
        sc = sc.split('-');
        sortCriteria = sc[0];
    }
    form_data.append('sort_criteria', sortCriteria);
    form_data.append('sort_type', sortType);
    form_data.append('is_recurrence', is_recurrence);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/home/sort_invoice',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            $("#dashboard_result_div").html(result);
            $(".dropdown-menu li").removeClass('active');
            $("#" + sortCriteria + "-sorting").parent('li').addClass('active');
            if (sortType == 'ASC') {
                $(".sort_type_div #sort-desc").hide();
                $(".sort_type_div #sort-asc").css({ display: 'inline-block' });
            } else {
                $(".sort_type_div #sort-asc").hide();
                $(".sort_type_div #sort-desc").css({ display: 'inline-block' });
            }
            $(".sort_type_div").css({ display: 'inline-block' });
            var text = $('.dropdown-menu li.active').find('a').text();
            var textval = 'Sort By : ' + text + ' <span class="caret"></span>';
            $("#sort-by-dropdown").html(textval);
            $("[data-toggle=popover]").popover();
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function invoiceNoteModal(order_id, service_id, is_order) {
    var url = "";
    // if (is_order === 'n' && service_id === '11'){
    //     url = 'billing/home/billing_dashboard_note_payrolls_ajax';
    // }
    // else{
    url = 'billing/home/billing_dashboard_note_ajax';
    // }
    $.ajax({
        type: 'POST',
        url: base_url + url,
        data: {
            order_id: order_id,
            service_id: service_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            $('#showNotes').html(result);
            $('#showNotes').modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function saveInvoiceNotes() {
    var formData = new FormData(document.getElementById('modal_note_form'));
    var serviceOrderID = $('#showNotes input#service_order_id').val();
    var serviceID = $('#showNotes input#service_id').val();
    $.ajax({
        type: 'POST',
        url: base_url + 'billing/home/save_invoice_note',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function(result) {
            swal({ title: "Success!", text: "Successfully Saved!", type: "success" }, function() {
                $(".note-count-" + serviceOrderID).html(result);
                $('#showNotes').modal('hide');
            });
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function update_invoice_note() {
    var formData = new FormData(document.getElementById('modal_note_form_update_invoice'));
    var serviceOrderID = $('#showNotes input#service_order_id').val();
    var serviceID = $('#showNotes input#service_id').val();
    $.ajax({
        type: 'POST',
        url: base_url + 'billing/home/save_invoice_note',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function(result) {
            swal({ title: "Success!", text: "Successfully Saved!", type: "success" }, function() {
                $(".note-count-" + serviceOrderID).html(result);
                $('#showNotes').modal('hide');
            });
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

var invoiceServiceListAjax = function(invoiceID, is_recurrence = '', practice_id = '') {
    if (!$('#collapse' + invoiceID).hasClass('in')) {
        $('#collapse' + invoiceID).html('<div class="text-center"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
        $.ajax({
            type: "POST",
            data: {
                invoice_id: invoiceID,
                is_recurrence: is_recurrence,
                practice_id: practice_id
            },
            url: base_url + 'billing/home/invoice_service_list_ajax',
            dataType: "html",
            success: function(result) {
                if (result != 0) {
                    $('#collapse' + invoiceID).html(result);
                } else {
                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                }
            }
        });
    }
}

function add_recurring_invoice_sos() {
    if (!requiredValidation('invoice_sos_form')) {
        return false;
    }
    var formData = new FormData(document.getElementById('invoice_sos_form'));
    var invoice_id = $("#invoice_sos_form #invoice_id").val();
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
        success: function(result) {
            swal({ title: "Success!", text: "Successfully Added!", type: "success" }, function() {
                var prevsoscount = $("#soscount-" + invoice_id).text();
                var soscount = parseInt(prevsoscount) + parseInt(1);
                $("#soscount-" + invoice_id).text(soscount);
                $("#soscount-" + invoice_id).removeClass('label label-primary').addClass('label label-danger');
                $("#soscount-" + invoice_id).html('<i class="fa fa-bell"></i>');
                document.getElementById("invoice_sos_form").reset();
                var prevbymecount = $("#sos-byme").html();
                if (result == 0) {
                    var newbymecount = parseInt(prevbymecount) + 1;
                    $("#sos-byme").html(newbymecount);
                }
                $("#invoice" + invoice_id).find(".priority").find('.m-t-5').remove();
                $("#invoice" + invoice_id).find(".priority").append('<img src="' + base_url + '/assets/img/badge_sos_priority.png" class="m-t-5"/>');
                $('#showSos').modal('hide');
            });
        },
        beforeSend: function() {
            $("#save_sos").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function(msg) {
            $("#save_sos").removeAttr('disabled').html('Save SOS');
            closeLoading();
        }
    });
}

function change_invoice_pattern(val) {
    if (val == 'annually') {
        $(".none-div").show();
        $(".annual-check-div").show();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day" class="m-r-5"> New invoice every</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]" value="1"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" style="width: 100px" id="r_day" value="1">');
    } else if (val == 'weekly') {
        $(".none-div").show();
        $(".annual-check-div").hide();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day">New invoice every</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day">&nbsp;week(s) on the following days:&nbsp;<div class="m-t-10"><div class="m-b-10"><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="1" checked="" class="m-r-5">&nbsp;Sunday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="2" class="m-r-5">&nbsp;Monday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="3" class="m-r-5">&nbsp;Tuesday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="4" class="m-r-5">&nbsp;Wednesday&nbsp;</span></div><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="5" class="m-r-5">&nbsp;Thursday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="6" class="m-r-5">&nbsp;Friday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="7" class="m-r-5">&nbsp;Saturday</span></div>');
    } else if (val == 'quarterly') {
        $(".none-div").show();
        $(".annual-check-div").hide();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day"> New invoice on day</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day"><label class="control-label m-r-5">of</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]"><option value="1">First</option><option value="2">Second</option><option value="3">Third</option></select>&nbsp;<label class="control-label m-r-5" id="control-label">month in quarter</label>');
    } else if (val == 'monthly') {
        $(".none-div").show();
        $(".annual-check-div").hide();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" class="m-r-5" name="recurrence[due_type]" checked="" value="1" id="due_on_day"> New invoice on day</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day"><label class="control-label m-r-5">of every</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_month]" min="1" max="12" value="1" style="width: 100px" id="r_month">&nbsp;<label class="control-label" id="control-label">month(s)</label>');
    } else {
        $(".none-div").hide();
        $(".annual-check-div").hide();
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day" class="m-r-5"> Due on every</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" style="width: 100px" id="r_day">');
    }
}

function closeInvoiceRecurrenceModal() {
    var get_content = $('#RecurranceModal .modal-body').html();
    $('#pattern_show').html('');
    var patterntext = $("#pattern option:selected").text();
    $('#pattern_show').html(patterntext);
    $('#RecurranceModal').modal('hide');
}

function show_recurrence_clients(invoice_id = '', service_name = '', pattern = '', section = '', client_id_outer = '', service_id = '', bg_color = '', cancelled = '', duration = '', type = '', filter_data = '', load_type = '') {
    // console.log("clients-recurring-data-"+invoice_id+"-"+service_id);return false;
    var invoice_client = $("#client_id").val();
    var invoice_category = $("#category").val();
    var office = $("#office").val();
    var client_manager = $("#client_manager").val();
    //alert(office);
    var invoice_plan = $("#plan_name").val();
    var plan_status = $("#plan_status").val();
    var invoice_recurrence = $("#recurring_type").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var partner = $("#partner").val();
    var referral_type = $("#referral_type").val();
    var referral_type_client = $("#referral_type_client").val();
    var referral_partner = $("#referral_partner").val();
    var client_id = '';
    var office_id = '';
    if (section == 'main') {
        $("#collapse-recurring-" + invoice_id + "-" + service_id).slideToggle();
    }
    if (section == 'filter') {
        var client_id = $('#client_list' + invoice_id).val();
        var office_id = $('#ofc' + invoice_id).val();
    } else {
        var client_id = client_id_outer;
        $('#ofc' + invoice_id).val('');
        $('#client_list' + invoice_id).val('');
    }

    $.ajax({
        type: 'POST',
        url: base_url + 'billing/home/show_recurrence_client_details',
        data: { 'service_name': service_name, 'pattern': pattern, 'client_id': client_id, 'office_id': office_id, 'bg_color': bg_color, 'cancelled': cancelled, 'duration': duration, 'type': type, 'filter_data': filter_data, 'load_type': load_type ,'invoice_plan' : invoice_plan,'invoice_recurrence' : invoice_recurrence,'invoice_client' : invoice_client,'invoice_category' :invoice_category,'office' : office,'client_manager' : client_manager, 'partner' : partner,'email' : email,'phone' : phone, 'plan_status' : plan_status,'referral_type' : referral_type,'referral_type_client' : referral_type_client , 'referral_partner': referral_partner},
        success: function(result) {
            $("#clients-recurring-data-" + invoice_id + "-" + service_id).html(result);
            if (client_id_outer != '') {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'billing/home/get_recurrence_client_office',
                    data: { 'client_id_outer': client_id_outer },
                    success: function(res) {
                        $("#ofc" + invoice_id).val(res);
                        $("#ofc" + invoice_id).css('pointer-events', 'none');
                        $("#client_list" + invoice_id).val(client_id_outer);
                        $("#client_list" + invoice_id).css('pointer-events', 'none');
                        $("#apply-btn").css('pointer-events', 'none');
                    }
                });
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function get_office_id(office_id = '') {
    $("#office_id").val(office_id);
}

function get_client_id(client_id = '') {
    $("#client_id").val(client_id);
}

function load_recurring_invoice_data(event = '', client_practice_id = '', cancelled = '', duration = '', type = '', filter_data = '', load_type = '',invoice_plan ='',invoice_recurrence = '',invoice_client = '',invoice_category ='',office = '',client_manager = '',partner = '',email = '',phone = '',plan_status = '',referral_type = '',referral_type_client = '',referral_partner = '') {
    
    $.ajax({
        type: 'POST',
        url: base_url + 'billing/home/recurrence_plans_data',
        data: { 'invoice_plan': invoice_plan, 'invoice_recurrence': invoice_recurrence, 'invoice_client': invoice_client, 'invoice_category': invoice_category, 'client_practice_id': client_practice_id, 'cancelled': cancelled, 'duration': duration, 'type': type, 'filter_data': filter_data, 'load_type': load_type ,'office' : office,'client_manager' : client_manager, 'partner' : partner,'email' : email,'phone' : phone, 'plan_status' : plan_status,'referral_type' : referral_type,'referral_type_client' : referral_type_client, 'referral_partner' : referral_partner },
        success: function(result) {
            // console.log(result);
            $("#recurrence_div").html(result);
            
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function printServiceInputView() {
    var doPrint = window.open();
    var printHtml = '<style type="text/css">body {background: #fff !important;} *{ font-size: 13px;}</style>';
    printHtml = printHtml + $('.print_view').html();
    doPrint.document.write(printHtml);
    doPrint.print();
    doPrint.close();
}

function show_client_name(client_id, event = '') {
    if (event == '') {
        $.ajax({
            type: "POST",
            data: {
                client_id: client_id
            },
            url: base_url + 'billing/home/get_client_details_by_client_id',
            dataType: "html",
            success: function(result) {
                $("#client_id_title" + client_id).attr({
                    "title": result
                });
            }
        });
    }
}

function load_collection_dashboard(office_id = '', client_id = '', order_id = '', days_late = '', creationdaterange = '', duedaterange = '', referral_partner = '', referral_source = '', referral_details = '', email = '', phone = '', client_manager ='',amount_billed = '',payment_status ='') {
    // console.log(email);
    // console.log(phone);
    // console.log(client_manager);return false;
    $('#collection-data').DataTable().destroy();
    $('#select_all').prop('checked', false);
    $('#collection-data').DataTable({
        'processing': false,
        'serverSide': true,
        'serverMethod': 'post',
        'scrollX': true,
        'iDisplayLength': -1,
        'lengthMenu': [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, 'All']
        ],
        'pageLength': 10,
        "bSearchable": true,
        'dom': '<"html5buttons"B>lTfgitp',
        'buttons': [{
                extend: 'excel',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                },
                footer: true,
                text: '<i class="fa fa-file-text-o"></i>&nbsp;Excel',
                title: 'CollectionReport'
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    modifier: {
                        page: 'all'
                    }
                },
                footer: true,
                text: '<i class="fa fa-print"></i>&nbsp;Print',
                title: 'CollectionReport',
                customize: function(win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ],
        select: {
            style: 'multi',
            selector: 'td:first-child input[type="checkbox"]'
        },
        columnDefs: [{
            targets: 0,
            checkboxes: { selectRow: true }
        }],
        order: [
            [1, 'asc']
        ],
        'ajax': {
            'url': base_url + 'billing/home/load_collection_dashboard',
            'type': 'POST',
            'data': {
                'office_id': office_id,
                'client_id': client_id,
                'order_id': order_id,
                'days_late': days_late,
                'creationdaterange': creationdaterange,
                'duedaterange': duedaterange,
                'referral_partner': referral_partner,
                'referral_source': referral_source,
                'referral_details': referral_details,
                'email': email,
                'phone': phone,
                'client_manager': client_manager,
                'amount_billed' : amount_billed,
                'payment_status' : payment_status
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
                closeLoading();
            }
        },
        'columns': [
            { data: 'selection' },
            { data: 'client_id', searchable: true },
            { data: 'client_name', className: 'dt-body-nowrap', searchable: true },
            { data: 'office_id', className: 'dt-body-nowrap', searchable: true },
            { data: 'manager', className: 'dt-body-nowrap', searchable: true },
            { data: 'created_by_name', className: 'dt-body-nowrap', searchable: true },
            { data: 'order_id', className: 'text-center', searchable: true },
            { data: 'no_of_services', className: 'text-center', searchable: false },
            { data: 'requested_date', className: 'text-center', searchable: false },
            { data: 'order_due_date', className: 'text-center', searchable: false },
            { data: 'total_billed', className: 'text-right', searchable: false },
            { data: 'total_collected', className: 'text-center', searchable: false },
            { data: 'days_late', className: 'text-center', searchable: false },
            { data: 'amount_due', className: 'text-right', searchable: false },
            { data: 'referred_by_source', className: 'text-right', searchable: false },
            { data: 'referred_by_name', className: 'text-right', searchable: false },
            { data: 'action', className: 'dt-body-nowrap', searchable: false }

        ],
        columnDefs: [
            { orderable: false, className: 'reorder', targets: 0 }
        ]
    });
}

function load_collection_report_chart(office_id = '', client_id = '', order_id = '', days_late = '', creationdaterange = '', duedaterange = '', invoice_ids = '', referral_source = '', referral_details = '', email = '', phone = '', client_manager ='') {
    $.ajax({
        type: "POST",
        url: base_url + 'billing/home/load_collection_report_chart',
        data: {
            'office_id': office_id,
            'client_id': client_id,
            'order_id': order_id,
            'days_late': days_late,
            'creationdaterange': creationdaterange,
            'duedaterange': duedaterange,
            'invoice_ids': invoice_ids,
            'referral_source': referral_source,
            'referral_details': referral_details,
            'email': email,
            'phone': phone,
            'client_manager': client_manager
        },
        dataType: "html",
        success: function(result) {
            $("#collection-report").html(result);
        }
    });
}

function remove_collection_dashboard_filter() {
    $('#collection-data').DataTable().destroy();
    window.location.reload();
}

function display_collection_filter_param(section) {
    if (section == 'office_id') {
        if ($("#office_id").val() != '') {
            $("#show-filter-office").empty();
            $("#office_id option:selected").each(function(i, v) {
                // console.log(v.value);
                $("#show-filter-office").append("<span class=\"alert-collection alert-success-collection\" onclick=\"remove_collection_filter('" + section + "','" + v.value + "');\"><a href=\"#\" class=\"text-white\"><b>" + v.innerText + "</b>&nbsp;&nbsp;<i class=\"fa fa-times-circle-o\"></i></a></span>&nbsp;&nbsp;");
                // console.log(v.innerText);
            });
        }
    } else if (section == 'client_id') {
        if ($("#client_id").val() != '') {
            $("#show-filter-client").empty();
            $("#client_id option:selected").each(function(i, v) {
                $("#show-filter-client").append("<span class=\"alert-collection alert-danger-collection\" onclick=\"remove_collection_filter('" + section + "','" + v.value + "');\"><a href=\"#\" class=\"text-white\"><b>" + v.innerText + "</b>&nbsp;&nbsp;<i class=\"fa fa-times-circle-o\"></i></a></span>&nbsp;&nbsp;");
                console.log(v.innerText);
            });
        }
    } else if (section == 'order_id') {
        if ($("#order_id").val() != '') {
            $("#show-filter-order").empty();
            $("#order_id option:selected").each(function(i, v) {
                $("#show-filter-order").append("<span class=\"alert-collection alert-info-collection\" onclick=\"remove_collection_filter('" + section + "','" + v.value + "');\"><a href=\"#\" class=\"text-white\"><b>" + v.innerText + "</b>&nbsp;&nbsp;<i class=\"fa fa-times-circle-o\"></i></a></span>&nbsp;&nbsp;");
                console.log(v.innerText);
            });
        }
    } else if (section == 'days_late') {
        if ($("#days_late").val() != '') {
            $("#show-filter-late").empty();
            $("#days_late option:selected").each(function(i, v) {
                $("#show-filter-late").append("<span class=\"alert-collection alert-creation-collection\" onclick=\"remove_collection_filter('" + section + "');\"><a href=\"#\" class=\"text-white\"><b>" + v.innerText + "</b>&nbsp;&nbsp;<i class=\"fa fa-times-circle-o\"></i></a></span>&nbsp;&nbsp;");
                console.log(v.innerText);
            });
        }
    } else if (section == 'creationdaterange') {
        if ($("#creationdaterange").val() != '') {
            $("#show-filter-creation").empty();
            var creationdaterange = $("#creationdaterange").val();
            // console.log($("#creationdaterange").data('daterangepicker').startDate);
            $("#show-filter-creation").append("<span class=\"alert-collection alert-due-collection\" onclick=\"remove_collection_filter('" + section + "');\"><a href=\"#\" class=\"text-white\"> Creation Date Between: <b>" + creationdaterange + "</b>&nbsp;&nbsp;<i class=\"fa fa-times-circle-o\"></i></a></span>&nbsp;&nbsp;");
        }
    } else if (section == 'duedaterange') {
        if ($("#duedaterange").val() != '') {
            $("#show-filter-due").empty();
            var duedaterange = $("#duedaterange").val();
            if (duedaterange != '') {
                $("#show-filter-due").append("<span class=\"alert-collection alert-primary-collection\" onclick=\"remove_collection_filter('" + section + "');\"><a href=\"#\" class=\"text-white\"> Due Date Between: <b>" + duedaterange + "</b>&nbsp;&nbsp;<i class=\"fa fa-times-circle-o\"></i></a></span>&nbsp;&nbsp;");
            }
        }
    } else if (section == 'referred_partner') {
        if ($("#referred_partner").val() != '') {
            $("#show-filter-partner").empty();
            $("#referred_partner option:selected").each(function(i, v) {
                $("#show-filter-partner").append("<span class=\"alert-collection alert-info-collection\" onclick=\"remove_collection_filter('" + section + "','" + v.value + "');\"><a href=\"#\" class=\"text-white\"><b>" + v.innerText + "</b>&nbsp;&nbsp;<i class=\"fa fa-times-circle-o\"></i></a></span>&nbsp;&nbsp;");
                console.log(v.innerText);
            });
        }
    } else if (section == 'referral_source') {
        if ($("#referral_source").val() != '') {
            $("#show-filter-referral_source").empty();
            $("#referral_source option:selected").each(function(i, v) {
                $("#show-filter-referral_source").append("<span class=\"alert-collection alert-info-collection\" onclick=\"remove_collection_filter('" + section + "','" + v.value + "');\"><a href=\"#\" class=\"text-white\"><b>" + v.innerText + "</b>&nbsp;&nbsp;<i class=\"fa fa-times-circle-o\"></i></a></span>&nbsp;&nbsp;");
                console.log(v.innerText);
            });
        }
    } else if (section == 'referred_by_name') {
        if ($("#referred_by_name").val() != '') {
            $("#show-filter-referred_by_name").empty();
            $("#referred_by_name option:selected").each(function(i, v) {
                $("#show-filter-referred_by_name").append("<span class=\"alert-collection alert-info-collection\" onclick=\"remove_collection_filter('" + section + "','" + v.value + "');\"><a href=\"#\" class=\"text-white\"><b>" + v.innerText + "</b>&nbsp;&nbsp;<i class=\"fa fa-times-circle-o\"></i></a></span>&nbsp;&nbsp;");
                console.log(v.innerText);
            });
        }
    }
}

function remove_collection_filter(section, removable_param = '') {
    // console.log($('#office_id').val(),$('#client_id').val(),$('#order_id').val(),$('#days_late').val(),$("#creationdaterange").val(),$("#duedaterange").val());
    if (section == 'office_id') {
        var office_id = $('#office_id').val();
        removable_param_index = office_id.indexOf(removable_param);
        office_id.splice(removable_param_index, 1);
        $('#office_id').val(office_id).trigger('chosen:updated');

        load_collection_dashboard(office_id, $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        load_collection_report_chart(office_id, $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        display_collection_filter_param('office_id');
        // console.log($('#office_id').val(),$('#client_id').val(),$('#order_id').val(),$('#days_late').val(),$("#creationdaterange").val(),$("#duedaterange").val());
        if ($('#office_id').val() == null && $('#client_id').val() == null && $('#order_id').val() == null && $('#days_late').val() == '' && $("#referred_partner").val() == '' && $("#referral_source").val() == '' && $("#referred_by_name").val() == '') {
            $("#collection_btn_clear").hide();
        }

    } else if (section == 'client_id') {
        var client_id = $('#client_id').val();
        removable_param_index = client_id.indexOf(removable_param);
        client_id.splice(removable_param_index, 1);
        $('#client_id').val(client_id).trigger('chosen:updated');

        load_collection_dashboard($('#office_id').val(), client_id, $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        load_collection_report_chart($('#office_id').val(), client_id, $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        display_collection_filter_param('client_id');
        if ($('#office_id').val() == null && $('#client_id').val() == null && $('#order_id').val() == null && $('#days_late').val() == '' && $("#referred_partner").val() == '' && $("#referral_source").val() == '' && $("#referred_by_name").val() == '') {
            $("#collection_btn_clear").hide();
        }
    } else if (section == 'order_id') {
        var order_id = $('#order_id').val();
        removable_param_index = order_id.indexOf(removable_param);
        order_id.splice(removable_param_index, 1);
        $('#order_id').val(order_id).trigger('chosen:updated');

        load_collection_dashboard($('#office_id').val(), $('#client_id').val(), order_id, $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        load_collection_report_chart($('#office_id').val(), $('#client_id').val(), order_id, $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        display_collection_filter_param('order_id');
        if ($('#office_id').val() == null && $('#client_id').val() == null && $('#order_id').val() == null && $('#days_late').val() == '' && $("#referred_partner").val() == '' && $("#referral_source").val() == '' && $("#referred_by_name").val() == '') {
            $("#collection_btn_clear").hide();
        }
    } else if (section == 'days_late') {
        $('#days_late').val([]).trigger('chosen:updated');
        load_collection_dashboard($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        load_collection_report_chart($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        display_collection_filter_param('days_late');
        if ($('#office_id').val() == null && $('#client_id').val() == null && $('#order_id').val() == null && $('#days_late').val() == '' && $("#referred_partner").val() == '' && $("#referral_source").val() == '' && $("#referred_by_name").val() == '') {
            $("#collection_btn_clear").hide();
        }
    } else if (section == 'creationdaterange') {
        $("#creationdaterange").val('');
        load_collection_dashboard($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        load_collection_report_chart($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        display_collection_filter_param('creationdaterange');
        $("#show-filter-creation").empty();
        if ($('#office_id').val() == null && $('#client_id').val() == null && $('#order_id').val() == null && $('#days_late').val() == '' && $("#referred_partner").val() == '' && $("#referral_source").val() == '' && $("#referred_by_name").val() == '') {
            $("#collection_btn_clear").hide();
        }
    } else if (section == 'duedaterange') {
        console.log(section);
        $("#duedaterange").val('');
        load_collection_dashboard($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        load_collection_report_chart($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
        display_collection_filter_param('duedaterange');
        $("#show-filter-due").empty();
        if ($('#office_id').val() == null && $('#client_id').val() == null && $('#order_id').val() == null && $('#days_late').val() == '' && $("#referred_partner").val() == '' && $("#referral_source").val() == '' && $("#referred_by_name").val() == '') {
            $("#collection_btn_clear").hide();
        }
    } else if (section == 'referred_partner') {
        var referred_partner = $('#referred_partner').val();
        removable_param_index = referred_partner.indexOf(removable_param);
        referred_partner.splice(removable_param_index, 1);
        $('#referred_partner').val(referred_partner).trigger('chosen:updated');
        $.ajax({
            type: 'POST',
            url: base_url + 'billing/home/get_invoice_id_by_referred_partner',
            data: {
                referred_partner: $('#referred_partner').val()
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function(result) {
                var data = JSON.parse(result);
                load_collection_dashboard($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val(), data);
                load_collection_report_chart($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val(), data);
                display_collection_filter_param('referred_partner');
                if ($('#office_id').val() == null && $('#client_id').val() == null && $('#order_id').val() == null && $('#days_late').val() == '' && $("#referred_partner").val() == '' && $("#referral_source").val() == '' && $("#referred_by_name").val() == '') {
                    $("#collection_btn_clear").hide();
                }
            }
        });
    } else if (section == 'referral_source') {
        var referral_source = $('#referral_source').val();
        removable_param_index = referral_source.indexOf(removable_param);
        referral_source.splice(removable_param_index, 1);
        $('#referral_source').val(referral_source).trigger('chosen:updated');
        load_collection_dashboard($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val(), '', $("#referral_source").val());
        load_collection_report_chart($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val(), '', $("#referral_source").val());
        display_collection_filter_param('referral_source');
        $("#show-filter-referral_source").empty();
        if ($('#office_id').val() == null && $('#client_id').val() == null && $('#order_id').val() == null && $('#days_late').val() == '' && $("#referred_partner").val() == '' && $("#referral_source").val() == '' && $("#referred_by_name").val() == '') {
            $("#collection_btn_clear").hide();
        }
    } else if (section == 'referred_by_name') {
        var referred_by_name = $('#referred_by_name').val();
        removable_param_index = referred_by_name.indexOf(removable_param);
        referred_by_name.splice(removable_param_index, 1);
        $('#referred_by_name').val(referred_by_name).trigger('chosen:updated');
        load_collection_dashboard($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val(), '', $("#referral_source").val(), $("#referred_by_name").val());
        load_collection_report_chart($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val(), '', $("#referral_source").val(), $("#referred_by_name").val());
        display_collection_filter_param('referred_by_name');
        $("#show-filter-referred_by_name").empty();
        if ($('#office_id').val() == null && $('#client_id').val() == null && $('#order_id').val() == null && $('#days_late').val() == '' && $("#referred_partner").val() == '' && $("#referral_source").val() == '' && $("#referred_by_name").val() == '') {
            $("#collection_btn_clear").hide();
        }
    }
}

function collection_email_modal() {
    var selected = [];
    $.each($("input[name='selection']:checked"), function() {
        selected.push($(this).val());
    });
    if (selected.length == 0) {
        swal({
            title: "No Options checked!",
            "text": "Please Check options to send mail!",
            "type": "warning"
        });
    } else {
        let form_data = Object.assign({}, selected);
        $.ajax({
            type: "POST",
            data: form_data,
            url: base_url + 'modal/show_invoice_email_multiple_modal',
            dataType: "html",
            success: function(result) {
                $('#emailsending_multiple').show();
                $("#emailsending_multiple").html(result).modal({
                    backdrop: 'static',
                    keyboard: false
                });
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
                closeLoading();
            }
        });
    }
}

function send_email_notice() {
    var selected = [];
    $.each($("input[name='selection_email']:checked"), function() {
        selected.push($(this).val());
    });
    /*console.log(selected);return false;*/
    if (selected.length == 0) {
        swal({
            title: "No Options checked!",
            "text": "Please Check options to send mail!",
            "type": "warning"
        });
    } else {
        var form_data = Object.assign({}, selected);
        $.ajax({
            type: "POST",
            data: form_data,
            url: base_url + 'billing/invoice/send_invoice_email',
            dataType: "html",
            success: function(result) {
                // alert(result);return false;
                if (result != 0) {
                    swal({
                        title: "Email Sent!",
                        "text": "Your email has been sent successfully!",
                        "type": "success"
                    }, function() {
                        $('#emailsending_multiple').modal('hide');
                        $('#collection-data').DataTable().destroy();
                        load_collection_dashboard($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
                        load_collection_report_chart($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
                    });
                } else {
                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                }
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
                closeLoading();
            }
        });
    }
}

function send_email_notice2() {
    swal({
            title: "Do you want to send the Collection Notice?",
            text: "You are about to send emails with unpaid invoices",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Confirm",
            closeOnConfirm: false
        },
        function() {
            var selected = [];
            $.each($("input[name='selection_email']"), function() {
                var check = $("input[name='email']:checked").val();
                var invoice_data = $(this).val();
                if (check == '1') {
                    selected.push($(this).val());
                } else {
                    var new_email = $("#new_email").val();
                    var new_email_data = new_email.split(',');
                    var invoice = invoice_data.split('-');
                    if (new_email != '') {
                        for (i = 0; i < new_email_data.length; i++) {
                            var invoice_email = invoice[0] + '-' + new_email_data[i];
                            selected.push(invoice_email);
                        }

                    }
                }
            });
            // console.log(selected);return false;
            if (selected.length == 0) {
                swal({
                    title: "No Options checked!",
                    "text": "Please Check options to send mail!",
                    "type": "warning"
                });
            } else {
                var form_data = Object.assign({}, selected);
                $.ajax({
                    type: "POST",
                    data: form_data,
                    url: base_url + 'billing/invoice/send_invoice_email',
                    dataType: "html",
                    success: function(result) {
                        // alert(result);return false;
                        if (result != 0) {
                            swal({
                                title: "Email Sent!",
                                "text": "Your email has been sent successfully!",
                                "type": "success"
                            }, function() {
                                $('#emailsending_multiple').modal('hide');
                                $('#collection-data').DataTable().destroy();
                                load_collection_dashboard($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
                                load_collection_report_chart($('#office_id').val(), $('#client_id').val(), $('#order_id').val(), $('#days_late').val(), $("#creationdaterange").val(), $("#duedaterange").val());
                            });
                        } else {
                            swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                        }
                    },
                    beforeSend: function() {
                        openLoading();
                    },
                    complete: function(msg) {
                        closeLoading();
                    }
                });
            }
        });

}

function assign_value_at_checkbox(invoice_id = '') {
    if ($("#new_email_checkbox_multiple-" + invoice_id).is(":checked") == true) {
        let new_email = $("#new_email_val-" + invoice_id).val();
        $("#new_email_checkbox_multiple-" + invoice_id).val(invoice_id + '-' + new_email);
    }
}

function download_bulk_pdf() {
    var urls = [];
    $.each($("input[name='selection']:checked"), function() {
        let checked_value = $(this).val();
        let checked_invoice_id = checked_value.split('-')[0];
        let current_url = base_url + 'billing/invoice/export/' + checked_invoice_id;
        urls.push(current_url);
        window.open(current_url);
    });

}

function child_row_selection() {
    if ($("#select_all").prop('checked') == true) {
        $("#collection-data tr").addClass('selected');
        $("input[name='selection']").prop('checked', true).trigger('chosen:updated');
        var selected = [];
        $.each($("input[name='selection']:checked"), function() {
            selected.push($(this).val());
        });
        $(".select-info").remove();
        $("#collection-data_info").append('<span class="select-info"><span class="select-item">' + selected.length + ' rows selected</span><span class="select-item"></span><span class="select-item"></span></span>');
    } else {
        $("#collection-data tr").removeClass('selected');
        $("input[name='selection']").prop('checked', false).trigger('chosen:updated');
        $(".select-info").remove();
    }
}

function load_recurring_invoice_data_from_client_view(reference_id = '', reference = '') {
    $.ajax({
        type: "POST",
        url: base_url + 'billing/home/load_recurring_invoice_data_from_client_view',
        data: {
            'reference_id': reference_id,
            'reference': reference
        },
        success: function(result) {
            console.log(result);
            $("#recurrence_div").html(result);
        }
    });
}

function cancel_invoice_from_edit_page(invoice_id, val = '') {
    if (val == 'edittype') {
        goURL(base_url + 'billing/invoice/place/' + invoice_id);
    } else {
        goURL(base_url + 'billing/invoice/place/' + invoice_id + '/view');
    }
}

function change_new_company_price_for_billing(value = '', section = '', page = '') {
    $.ajax({
        type: "POST",
        data: {
            state_id: value
        },
        url: base_url + 'services/home/get_retail_price_by_state_id_for_new_company',
        dataType: "html",
        success: function(result) {
            if (result != 0) {
                var data = JSON.parse(result);
                $("#retail-price-" + section).val(data.retail_price);
                $("#service_section_retail_price" + section).val(data.retail_price);
                $("#base_price_" + section).val(data.retail_price);
                if (page == 'edit') {
                    $("#service_section_retail_price" + section).val(data.retail_price);
                    $("#retail_price_override" + section).val(data.retail_price);
                }
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function refresh_existing_client_list(office_id, client_id = "") {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_id: client_id
        },
        url: base_url + 'billing/invoice/get_completed_orders_officewise',
        dataType: "html",
        success: function(result) {
            //console.log("Result: " + result);
            $("#client_list_ddl").chosen('destroy');
            $("#client_list_ddl").html(result);
            $("#client_list_ddl").chosen();
            $('#client_list_ddl').val(client_id).trigger('chosen:updated');
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function add_alternative_email(invoice_id = '', email = '') {
    var response = $("#new_email_checkbox_multiple-" + invoice_id).prop('checked');
    if (response == true) {
        $("#new_email_val-" + invoice_id).removeAttr('disabled');
    } else {
        $("#new_email_val-" + invoice_id).attr('disabled', true);
    }

}

function show_collection_email_list(invoice_email) {
    var selected = [];
    $.each($("input[name='selection_email']"), function() {
        selected.push($(this).val());
    });
    // console.log(selected);return false;
    if (selected.length == 0) {
        swal({
            title: "No Options checked!",
            "text": "Please Check options to send mail!",
            "type": "warning"
        });
        return false;
    }
    var form_data = Object.assign({}, selected);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/home/show_collection_email_list',
        dataType: "html",
        success: function(result) {
            $("#email_list_div").show();
            $("#email_list_div").html(result);
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}
/*replacement of savePayment fucntion when gets connected with azure*/
function savePaymentAzure() {
    if (!requiredValidation('form_save_payment')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('form_save_payment'));
    var pay_amount = parseFloat(document.getElementById('payment_amount').value);
    var due_amount = parseFloat(document.getElementById('due_amount').value);
    if (pay_amount > due_amount) {
        swal("ERROR!", "payment amount can't exceed the due amount", "error");
        return false;
    }
    var cardType = "";
    var cardNumber = $("input#card_number").val();
    if (cardNumber != '') {
        if (cardNumber.length != 16) {
            $("input#card_number").next('div.errorMessage').html('Card Number Not Valid');
            return false;
        }
        cardType = GetCardType(cardNumber);
        if (cardType == "") {
            $("input#card_number").next('div.errorMessage').html('Card Number Not Valid');
            return false;
        }
    }
    form_data.append('card_type', cardType);

    var invoice_id = $("#invoice_id").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/payments/save_payment',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            var file_name = 'Payments-' + invoice_id;
            var brand = $("#brand").val().trim();
            var franchise = $("#franchise").val().trim();
            var client_type = $("#client_type").val().trim();
            var client_id = $("#client_id").val().trim();
            var folder_name = $("#folder_name").val();
            var file_list_url = $("#file_list_url").val();
            var document_sub_type = $("#document_sub_type").val();
            var api_data = { '__metadata': { 'type': 'SP.ListItem' }, 'Document_x0020_Type': document_sub_type };
            var client_info = { "brand": brand, "franchise": franchise, "client_type": client_type, "client_id": client_id, "file_list_url": file_list_url, "folder_name": folder_name, "file_name": file_name, "api_data": api_data };
            client_info = JSON.stringify(client_info);
            form_data.append('client_info', client_info);
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
                success: function(res) {
                    if (result == 1) {
                        swal({
                            title: "Success!",
                            text: "Payment Successfull",
                            type: "success"
                        }, function() {
                            goURL(base_url + 'billing/payments/details/' + btoa(invoice_id));
                        });
                    } else if (result == 0) {
                        swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                    } else {
                        swal("ERROR!", result, "error");
                    }
                },
                beforeSend: function() {
                    openLoading();
                },
                complete: function(msg) {
                    closeLoading();
                }
            });
        }
    });
}

function loadEmailSetupDashbaord() {
    $.ajax({
        type: 'POST',
        url: base_url + 'billing/home/loadEmailSetupDashbaord',
        success: function(result) {
            $("#load_data").html(result);
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
            jumpDiv();
        }
    });
}

function save_mail_setup() {
    if (!requiredValidation('form_save_mail_setup')) {
        return false;
    }
    var body = CKEDITOR.instances.body.getData();
    if (body == '') {
        swal("ERROR!", "Enter a mail body", "error");
        return false;
    }
    var form_data = new FormData(document.getElementById("form_save_mail_setup"));
    form_data.append('body', body);
    $.ajax({
        type: "POST",
        data: form_data, //add_new_action
        url: base_url + 'billing/home/create_request_mail_setup',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            // alert(result);return false;
            var result = result.trim();
            if (result == "0") {
                swal("ERROR!", "Unable To Add Mail Setup", "error");
            } else if (result) {
                swal({
                    title: "Success!",
                    text: "Mail Setup Successfully Added!",
                    type: "success"
                }, function() {
                    goURL(base_url + 'billing/home/email_setup');
                });
            }
        },
        beforeSend: function() {
            $(".save_btn").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function cancel_save_mail_setup() {
    goURL(base_url + 'billing/home/email_setup');
}

function delete_mail_setup(id) {
    swal({
            title: "Are you sure want to delete?",
            text: "Your will not be able to recover this mail!!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function() {
            $.ajax({
                type: 'POST',
                url: base_url + 'billing/home/delete_mail_setup',
                data: {
                    id: id
                },
                success: function(result) {
                    var result = result.trim();
                    if (result == "1") {
                        swal({
                            title: "Success!",
                            "text": "Mail has been deleted successfully!",
                            "type": "success"
                        }, function() {
                            loadEmailSetupDashbaord();
                        });
                    } else {
                        swal("ERROR!", "Unable to delete this Mail!!", "error");
                    }
                }
            });
        });
}

function preview_mail_setup(id) {
    $.ajax({
        type: 'POST',
        data: { id: id },
        url: base_url + 'billing/home/preview_mail_setup',
        success: function(result) {
            $('#mail-setup-preview-modal').show();
            $("#mail-setup-preview-modal").html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
            jumpDiv();
        }
    });
}

function refresh_existing_client_list_associative_client(office_id, client_id = "", type = '') {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_id: client_id,
            type: type
        },
        url: base_url + 'billing/invoice/get_completed_orders_officewise_association_client',
        dataType: "html",
        success: function(result) {
            //console.log("Result: " + result);
            if (type == 1) {
                $("#business_id").chosen('destroy');
                $("#business_id").html(result);
                $("#business_id").chosen();
            }
            if (type == 2) {
                $("#individual_id").chosen('destroy');
                $("#individual_id").html(result);
                $("#individual_id").chosen();
            }

        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function Fetch_Client_name(client_id) {
    var type = $("#client_type_associative").val();
    $.ajax({
        type: "POST",
        data: {
            client_id: client_id,
            type: type
        },
        url: base_url + 'billing/invoice/fetch_client_name_by_id',
        dataType: "html",
        success: function(result) {
            $('#client_name').val(result).trigger('chosen:updated');
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function checkServiceRecurrenceTypeAndGetRecurrenceInfo(service_id = '', project_id = '', from_button = '', tax_return_pattern = '' , tax_return_month = '' , tax_return_year = '',page='',section_id='') {
    var response = select_company_type_mandatory_before_service_selection(service_id,section_id);
    if(response == false) {
        return false;
    }
    var section = $("#section_id").val().trim();
    var section_arr = section.split(',');
    var service_arr = [];
    if(section_arr.length > 1) {
        for(var i=0;i<section_arr.length;i++) {
            var current_val = 0;
            current_val = $("#service"+section_arr[i]).val();
            service_arr.push(current_val);
        }
        service_id = service_arr.toString();
    }
    $.ajax({
        type: "POST",
        data: {
            service_id: service_id
        },
        url: base_url + 'services/home/check_service_type',
        dataType: "html",
        success: function(result) {
            var project_creation_option_main = $("#will_create_project_1").is(":checked");    
            if (project_creation_option_main) {
                if(section_id != undefined) {
                    if (section_id == 1) {
                        var is_recurrence = result.trim();
                        $("#recurring_invoice").val(is_recurrence);
                        getRecurrenceSection(is_recurrence, project_id, from_button, tax_return_pattern , tax_return_year , tax_return_month,page);        
                    } else {
                        tax_return_pattern = $("#pattern1").val();
                        tax_return_year = $("#starting_year1").val();
                        tax_return_month = $("#starting_month1").val();
                        var is_recurrence = result.trim();
                        $("#recurring_invoice").val(is_recurrence);
                        getRecurrenceSection(is_recurrence, project_id, from_button, tax_return_pattern , tax_return_year , tax_return_month,page);
                    }     
                }
            } else {
                var is_recurrence = result.trim();
                $("#recurring_invoice").val(is_recurrence);
                getRecurrenceSection(is_recurrence, project_id, from_button, tax_return_pattern , tax_return_year , tax_return_month,page);
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function manage_recurrence_manually(element) {
    var service_id = $("#service1").val();
    var will_create_project = $('#will_create_project_1').is(':checked');
    if (service_id == 18 || service_id == 19 || service_id == 20 || service_id == 89 || service_id == 110) {
        var tax_return_year = $(".starting_period").val();
        var tax_return_pattern = 'annually';
    } else {
        var pattern = $("#pattern1").val();
        var starting_month = $("#starting_month1").val();
        var starting_year = $("#starting_year1").val();
        var tax_return_pattern = '';
        var tax_return_year = '';
        var start_month = '';
        if(starting_year != '') {
            if (pattern != undefined) {
                tax_return_pattern = (will_create_project == true) ? pattern : '';
            } else {
                tax_return_pattern = '';    
            }
            if (starting_year != undefined) {
                tax_return_year = (will_create_project == true) ? starting_year : '';
            } else {
                tax_return_year = '';    
            }
            if (starting_month != undefined) {
                start_month = (will_create_project == true) ? starting_month : '';
            } else {
                start_month = '';    
            }
        } else {
            tax_return_pattern = '';
            tax_return_year = '';
            start_month = '';
        }
        
    }
    if (service_id != undefined) {
        if (element.checked == true) {
            $.ajax({
                type: "POST",
                data: {
                    is_recurrence: 'y',
                    section: '',
                    invoice_id: '',
                    normal_invoice: '',
                    section_count: '',
                    tax_return_pattern: tax_return_pattern,
                    tax_return_month: start_month,
                    tax_return_year: tax_return_year,
                    recurring_type:'manual'
                },
                url: base_url + 'billing/invoice/get_recurring_section',
                dataType: "html",
                success: function(result) {
                    $("#recurring_section").html(result);
                    /*get_automatics_recurrence_checkbox('y');*/
                    checkServiceProjectCreationScope(service_id,'','','','','','','',tax_return_pattern,start_month,tax_return_year);
                }
            });
        } else {
            $.ajax({
                type: "POST",
                data: {
                    is_recurrence: 'n',
                    section: '',
                    invoice_id: '',
                    normal_invoice: 'yes',
                    section_count: 1,
                    tax_return_pattern: tax_return_pattern,
                    tax_return_month: start_month,
                    tax_return_year: tax_return_year,
                    recurring_type:'manual'
                },
                url: base_url + 'billing/invoice/get_recurring_section',
                dataType: "html",
                success: function(result) {
                    $("#recurring_section").html(result);
                    $("#recurring_invoice").val('n');
                    $("#automatic_recurrence_checkbox_div").html('');
                    checkServiceProjectCreationScope(service_id,'','','','','','','',tax_return_pattern,start_month,tax_return_year);
                }
            });
        }
    }
}

function getRecurrenceSection(is_recurrence = '', project_id = '', from_button = '', tax_return_pattern = '' , tax_return_year = '' , tax_return_month = '',section='') {
    var section_count = $('#section_id').val().split(',').length;
    if (is_recurrence == 'y') {
        $.ajax({
            type: "POST",
            data: {
                is_recurrence: is_recurrence,
                section: '',
                invoice_id: '',
                project_id: project_id,
                normal_invoice: 'no',
                section_count: section_count,
                tax_return_pattern: tax_return_pattern,
                tax_return_year: tax_return_year,
                tax_return_month: tax_return_month
            },
            url: base_url + 'billing/invoice/get_recurring_section',
            dataType: "html",
            success: function(result) {
                $("#recurring_section").html(result);
                $.ajax({
                    type: "POST",
                    data: {
                        is_recurrence: is_recurrence,
                        project_id: project_id
                    },
                    url: base_url + 'billing/invoice/get_recurring_header_section',
                    dataType: "html",
                    success: function(result) {
                        $("#recurring_header_section").html(result);
                        if(section != 'service_info_ajax') {
                            var project_creation_option_main = $("#will_create_project_1").is(":checked");
                            if (project_creation_option_main == false) {
                                get_automatics_recurrence_checkbox('y');    
                            }
                        } 
                    },
                    beforeSend: function() {
                        openLoading();
                    },
                    complete: function(msg) {
                        closeLoading();
                    }
                });
            }
        });
    } else {
        var first_service = $("#service1").val();
        // console.log(from_button);
        if (from_button == 'remove') {
            var section_id = $('#section_id').val().trim();
            var service_id_arr = section_id.split(',');
            var service_id_arr_length = service_id_arr.length;
            if (service_id_arr_length == 2) {
                first_service = $("#service" + service_id_arr[1]).val();
                section_count = 1;
            }
        } else {
            if(first_service == undefined) {
                var section_id = $('#section_id').val().trim();
                var service_id_arr = section_id.split(',');
                var service_id_arr_length = service_id_arr.length;
                if (service_id_arr_length == 1) {
                    first_service = $("#service" + service_id_arr).val();
                    section_count = 1;
                }
            }
        }
        if (first_service != undefined) {
            $.ajax({
                type: "POST",
                data: {
                    service_id: first_service
                },
                url: base_url + 'services/home/check_project_creation_scope',
                dataType: "html",
                success: function(result) {
                    var will_create_project = result.trim();
                    if (will_create_project == 'y') {
                        $.ajax({
                            type: "POST",
                            data: {
                                is_recurrence: is_recurrence,
                                section: '',
                                invoice_id: '',
                                project_id: project_id,
                                normal_invoice: 'yes',
                                section_count: section_count,
                                tax_return_pattern: tax_return_pattern,
                                tax_return_year: tax_return_year
                            },
                            url: base_url + 'billing/invoice/get_recurring_section',
                            dataType: "html",
                            success: function(result) {
                                $("#recurring_section").html(result);
                            },
                            beforeSend: function() {
                                openLoading();
                            },
                            complete: function(msg) {
                                closeLoading();
                            }
                        });
                    } else {
                        $("#recurring_section").html('');
                    }
                },
                beforeSend: function() {
                    openLoading();
                },
                complete: function(msg) {
                    closeLoading();
                }
            });
        } else {
            $("#recurring_section").html('');
        }
        $("#recurring_header_section").html('');
        $("#automatic_recurrence_checkbox_div").html('');
    }
}

function get_starting_period_div(pattern = '', start_month = '', start_year = '', project_id = '',is_recurring='') {
    $.ajax({
        type: "POST",
        data: {
            pattern: pattern,
            start_month: start_month,
            start_year: start_year,
            project_id: project_id,
            is_recurring: is_recurring
        },
        url: base_url + 'billing/invoice/get_invoice_recurrence_starting_period',
        dataType: "html",
        success: function(result) {
            // console.log(result);
            $("#starting_period_div").html(result);
            /*select_project_template_by_pattern(pattern);*/
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function show_recurring_information(project_id = '' , section_id = '' , from = '') {
    if (section_id != '') {
        var pattern = $("#pattern" + section_id).val();
    } else {
        var pattern = $("#pattern").val();
    }
    if (pattern !== undefined) {
        pattern = pattern.trim();
        var month = '';
        var year = '';
        var quarter = '';
        if (from == 'service_ajax') {
            if (pattern == 'monthly') {
                month = $("#starting_month" + section_id).val();
                year = $("#starting_year" + section_id).val();
            } else if (pattern == 'quarterly') {
                quarter = $("#starting_month" + section_id).val();
                year = $("#starting_year" + section_id).val();
            } else if (pattern == 'annually') {
                year = $("#starting_year" + section_id).val();
            }
        } else {
            if (pattern == 'monthly') {
                month = $("#recurring_start_month option:selected").val();
                year = $("#recurring_start_year option:selected").val();
            } else if (pattern == 'quarterly') {
                quarter = $("#recurring_start_quarter option:selected").val();
                year = $("#recurring_start_year option:selected").val();
            } else if (pattern == 'annually') {
                year = $("#recurring_start_year option:selected").val();
            }
        }
        $.ajax({
            type: "POST",
            data: {
                pattern: pattern,
                month: month,
                quarter: quarter,
                year: year
            },
            url: base_url + 'billing/invoice/get_invoice_recurring_information',
            dataType: "html",
            success: function(result) {
                if (result != 0) {
                    var result_arr = result.trim().split('/');
                    var date_info = '<span class="text-success"><i class="fa fa-star"></i> Start Date : ' + result_arr[0] + '</span>&nbsp;&nbsp;&nbsp;<span class="text-warning"><i class="fa fa-star"></i> Invoice Due Date : ' + result_arr[1] + '</span>';
                    var start_date = moment(result_arr[0], 'MM/DD/YYYY');
                    $("#recurring_information_date_information").html(date_info);
                    $("#start_date").val(start_date.format('MM/DD/YYYY'));
                } else {
                    $("#recurring_information_date_information").html('');
                    $("#start_date").val('');
                }
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
                closeLoading();
            }
        });
    }
}

function manage_automatic_generation_checkbox(project_id = '' , section_id = '') {
    var is_recurring = $("#is_recurring").val();
    if (is_recurring == 'y') {
        var is_previouly_checked = $('#automatic_recurrence_checkbox_div').is(':checked');
        if (section_id != '') {
            var pattern = $("#pattern" + section_id).val();
        } else {
            var pattern = $("#pattern").val();
        }
        if (pattern !== undefined) {
            pattern = pattern.trim();
            var current_date = new Date();
            var current_month = current_date.getMonth();
            current_month += 1;
            var current_year = current_date.getFullYear();
            var current_quarter = '';
            if (current_month >= 1 && current_month <= 3) {
                current_quarter = 1;
            } else if (current_month >= 4 && current_month <= 6) {
                current_quarter = 2;
            } else if (current_month >= 7 && current_month <= 9) {
                current_quarter = 3;
            } else if (current_month >= 10 && current_month <= 12) {
                current_quarter = 4;
            }
            var month = '';
            var year = '';
            var quarter = '';
            if (pattern == 'monthly') {
                month = $("#recurring_start_month option:selected").val();
                year = $("#recurring_start_year option:selected").val();
                if (year >= current_year) {
                    if (month >= current_month) {
                        get_automatics_recurrence_checkbox('n', project_id);
                    } else {
                        if (year <= current_year) {
                            get_automatics_recurrence_checkbox('y', project_id);
                        } else {
                            get_automatics_recurrence_checkbox('n', project_id);
                        }
                    }
                } else {
                    get_automatics_recurrence_checkbox('y');
                }
            } else if (pattern == 'quarterly') {
                quarter = $("#recurring_start_quarter option:selected").val();
                year = $("#recurring_start_year option:selected").val();
                if (year >= current_year) {
                    if (quarter >= current_quarter) {
                        get_automatics_recurrence_checkbox('n', project_id);
                    } else {
                        if (year <= current_year) {
                            get_automatics_recurrence_checkbox('y', project_id);
                        } else {
                            get_automatics_recurrence_checkbox('n', project_id);
                        }
                    }
                } else {
                    get_automatics_recurrence_checkbox('y', project_id);
                }
            } else if (pattern == 'annually') {
                year = $("#recurring_start_year option:selected").val();
                if (year >= current_year) {
                    get_automatics_recurrence_checkbox('n', project_id);
                } else {
                    get_automatics_recurrence_checkbox('y', project_id);
                }
            }
        }
    }
}

function get_automatics_recurrence_checkbox(is_recurrence = '', project_id = '') {
    $.ajax({
        type: "POST",
        data: {
            is_recurrence: is_recurrence,
            project_id: project_id
        },
        url: base_url + 'billing/invoice/get_automatics_recurrence_checkbox',
        dataType: "html",
        success: function(result) {
            $("#automatic_recurrence_checkbox_div").html(result);
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function checkServiceProjectCreationScope(service_id = "", project_id = '', section_id = '', event_button = '',from = '',will_create_project_at_invoice = '',section_length='',project_template_id = '' , tax_return_pattern = '' , tax_return_month = '', tax_return_year = '',manual='') {
    var response = select_company_type_mandatory_before_service_selection(service_id,section_id);
    if(response == false) {
        return false;
    }
    // console.log('service_id : '+service_id +'\nproject_id : '+ project_id +'\nsection_id : '+ section_id +'\nevent_button : '+ event_button +'\nfrom : '+from +'\nwill_create_project_at_invoice : '+will_create_project_at_invoice +'\nsection_length : '+section_length+'\nproject_template_id : '+project_template_id +'\ntax_return_pattern : '+ tax_return_pattern +'\ntax_return_year : '+ tax_return_year);
    var section = $('#section_id').val();
    section = section.split(',');
    $.ajax({
        type: "POST",
        data: {
            service_id: service_id
        },
        url: base_url + 'services/home/check_project_creation_scope',
        dataType: "html",
        success: function(result) {
            // console.log(result);
            var will_create_project = result.trim();
            if (section.length > 1) {
                if (event_button != 'remove') {
                    getProjectCreationOptions(will_create_project, service_id, project_id,from,will_create_project_at_invoice,section_length,project_template_id,tax_return_pattern , tax_return_year,manual , tax_return_month);
                    /*if (will_create_project == 'y') {
                        // $("#create_project_section").html('<h3>Project Generation</h3><div class="row"><div class="col-lg-2 col-md-2 text-right"><b><s>Will Create Project ?</s> </b></div><div class="col-lg-10 col-md-10"><i class="fa fa-star text-danger"></i><b class="text-danger"> Sorry!! Project creation feature is not available with multiple services</b><div class="hr-line-dashed"></div></div></div>');
                    } else {
                        var first_service = $("#service1").val();
                        $.ajax({
                            type: "POST",
                            data: {
                                service_id: first_service
                            },
                            url: base_url + 'services/home/check_project_creation_scope',
                            dataType: "html",
                            success: function(res) {
                                var will_create_project_first = res.trim();
                                if (will_create_project_first == 'y') {
                                    // $("#create_project_section").html('<h3>Project Generation</h3><div class="row"><div class="col-lg-2 col-md-2 text-right"><b><s>Will Create Project ?</s> </b></div><div class="col-lg-10 col-md-10"><i class="fa fa-star text-danger"></i><b class="text-danger"> Sorry!! Project creation feature is not available with multiple services</b><div class="hr-line-dashed"></div></div></div>');
                                } else {
                                    $("#create_project_section").html('');
                                }
                            }
                        });
                    }*/
                } else {
                    getProjectCreationOptions(will_create_project, service_id, project_id , '' , '' , '' , '' , tax_return_pattern , tax_return_year,manual, tax_return_month);
                }
            } else {
                getProjectCreationOptions(will_create_project, service_id, project_id,from,will_create_project_at_invoice,section_length,project_template_id,tax_return_pattern , tax_return_year,manual , tax_return_month);
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function getProjectCreationOptions(will_create_project = "", service_id = "", project_id = '',from='',will_create_project_at_invoice = '',section_length='',project_template_id = '' , tax_return_pattern = '' , tax_return_year = '' , manual = '' , tax_return_month = '') {
    /*if (will_create_project == 'y') {
        $.ajax({
            type: "POST",
            data: {
                will_create_project: will_create_project,
                service_id: service_id,
                project_id: project_id,
                from:from,
                will_create_project_at_invoice:will_create_project_at_invoice,
                section_length:section_length,
                project_template_id: project_template_id,
                tax_return_pattern: tax_return_pattern,
                tax_return_year: tax_return_year,
                tax_return_month: tax_return_month
            },
            url: base_url + 'billing/invoice/get_project_create_options',
            dataType: "html",
            success: function(result) {
                $("#create_project_section").html(result);
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
                closeLoading();
            }
        });
    } else {
        $("#create_project_section").html('');
    }*/
}

function invoice_sorting_filter_modal(reference = '', current_element = '') {
    var creation_date_val = $("#creation_date").val();
    var due_date_val = $("#due_date").val();
    console.log(creation_date_val);
    var form_data = new FormData(document.getElementById('invoice-filter-display-div'));
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'creation_date') {
        $("#creation_date_pre").val(creation_date_val);
    }
    if (previous_filter == 'due_date') {
        $("#due_date_pre").val(due_date_val);
    }
    /*console.log(previous_filter);*/
    $("#filter-variable").val(reference);
    if (previous_filter != undefined && previous_filter == reference) {
        $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
        for (const formElement of form_data) {
            let filter_name = formElement[0];
            let filter_value = formElement[0];
            let active_element = filter_name.split("[")[0];
            if (formElement[1] != '') {
                let id_val = $('[name="' + active_element + '[]"]').attr('id');
                if (active_element == 'creation_date') {
                        id_val = 'creation_date';
                    }
                if (active_element == 'due_date') {
                        id_val = 'due_date';
                    }
                let current_made_id = id_val + '-val';
                $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
            }
        }
        $("#value-display").empty();
        $("#filter-variable").val('');
        $(".display-filter-div").hide();
        return false;
    }
    var check_div_element = $("#" + current_element.id + "-display").html();
    var is_recurrence = $("#is_recurrence_invoice").val();
    if (check_div_element == '') {
        $.ajax({
            type: 'POST',
            url: base_url + 'billing/home/invoice_sorting_filter_modal',
            data: {
                reference: reference,
                is_recurrence: is_recurrence
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function(result) {
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
                        let id_val = $('[name="' + active_element + '[]"]').attr('id');
                        if (active_element == 'creation_date') {
                            id_val = 'creation_date';
                        }
                        if (active_element == 'due_date') {
                            id_val = 'due_date';
                        }
                        let current_made_id = id_val + '-val';
                        if (current_element.id != current_made_id) {
                            $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                        }
                    }
                }
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
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
                if (active_element == 'creation_date') {
                        id_val = 'creation_date';
                    }
                if (active_element == 'due_date') {
                        id_val = 'due_date';
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

function refresh_existing_business_client_list_associative_client(office_id, client_id = "", type = '', reference_id = '') {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_id: client_id,
            type: type,
            reference_id:reference_id
        },
        url: base_url + 'billing/invoice/get_completed_orders_officewise_association_client',
        dataType: "html",
        success: function(result) {
            //console.log("Result: " + result);
            $("#business_ids").chosen('destroy');
            $("#business_ids").html(result);
            $("#business_ids").chosen();

        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function refresh_existing_individual_client_list_associative_client(office_id, client_id = "", type = '', section = '' , reference_id = '') {
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_id: client_id,
            type: type,
            section: section,
            reference_id: reference_id
        },
        url: base_url + 'billing/invoice/get_completed_orders_officewise_association_client',
        dataType: "html",
        success: function(result) {
            //console.log("Result: " + result);
            if (section != '') {
                if (section == 'owner') {
                    if (type == 1) {
                        $("#owner_business_ids").chosen('destroy');
                        $("#owner_business_ids").html(result);
                        $("#owner_business_ids").chosen();
                    } else {
                        $("#owner_individual_ids").chosen('destroy');
                        $("#owner_individual_ids").html(result);
                        $("#owner_individual_ids").chosen();
                    }
                    
                }
            } else {
                $("#individual_ids").chosen('destroy');
                $("#individual_ids").html(result);
                $("#individual_ids").chosen();
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function invoice_filter_new(page_numbers = '', is_clear = '', current_clear_element = '') {
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
        if (removavle_element == 'referral_type') {
            $("#referral_type_client").val('').trigger('chosen:updated');
        }
        if (removavle_element == 'responsible_name') {
            $("#" + removavle_element).val('').trigger('chosen:updated');
            $("#responsible_staff").val('').trigger('chosen:updated');
        }
        $("#" + removavle_element).val('').trigger('chosen:updated');
        $("#" + clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('invoice-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
        //        console.log(a);
        if (a == 'client_type') {
            var id = 'client_type-val';
            if (is_clear == '') {
                $("#client_type-clear_filter").show();
            }
        }
        if (a == 'creation_date') {
            var id = 'creation_date-val';
            if (is_clear == '') {
                $("#creation_date-clear_filter").show();
            }
        }
        if (a == 'due_date') {
            var id = 'due_date-val';
            if (is_clear == '') {
                $("#due_date-clear_filter").show();
            }
        }
        if (a == 'next_recurrence_date') {
            var id = 'next_recurrence_date-val';
            if (is_clear == '') {
                $("#next_recurrence_date-clear_filter").show();
            }
        }
        if (a == 'id_filter') {
            var id = 'id_filter-val';
            if (is_clear == '') {
                $("#id_filter-clear_filter").show();
            }
        }
        if (a == 'office_filter') {
            var id = 'office_filter-val';
            if (is_clear == '') {
                $("#office_filter-clear_filter").show();
            }
        }
        if (a == 'client_id_filter') {
            var id = 'client_id_filter-val';
            if (is_clear == '') {
                $("#client_id_filter-clear_filter").show();
            }
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if (is_clear == '') {
                $("#service_name-clear_filter").show();
            }
        }
        // if (a == 'requested_by') {
        //     var id = 'requested_by-val';
        //     if (is_clear == '') {
        //         $("#requested_by-clear_filter").show();
        //     }
        // }
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
        if (a == 'status_filter') {
            var id = 'status_filter-val';
            if (is_clear == '') {
                $("#status_filter-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'tracking-val';
            if (is_clear == '') {
                $("#tracking-clear_filter").show();
            }
        }
        if (a == 'requested_date') {
            var id = 'requested_date-val';
            if (is_clear == '') {
                $("#requested_date-clear_filter").show();
            }
        }
        if (a == 'payment_date') {
            var id = 'payment_date-val';
            if (is_clear == '') {
                $("#payment_date-clear_filter").show();
            }
        }
        if (a == 'payment_type') {
            var id = 'payment_type-val';
            if (is_clear == '') {
                $("#payment_type-clear_filter").show();
            }
        }
        if (a == 'amount') {
            var id = 'amount-val';
            if (is_clear == '') {
                $("#amount-clear_filter").show();
            }
        }
        if (a == 'service_category') {
            var id = 'service_category-val';
            if (is_clear == '') {
                $("#service_category-clear_filter").show();
            }
        }
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if (is_clear == '') {
                $("#client_manager-clear_filter").show();
            }
        }
        if (a == 'service_category') {
            var id = 'service_category-val';
            if (is_clear == '') {
                $("#service_category-clear_filter").show();
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
        if (a == 'referral_type') {
            var id = 'referral_type-val';
            if (is_clear == '') {
                $("#referral_type-clear_filter").show();
            }
        }
    }

    if (page_numbers != '') {
        var page_number = page_numbers;
    } else {
        page_number = $("#page_number").val();
    }
    var is_recurrence = $("#is_recurrence_invoice").val();
    if (is_recurrence == undefined) {
        is_recurrence = 'n';
    }
    var client_id_r = $("#client_id_r").val();
    var pattern_r = $("#pattern_r").val();
    var data_new_home_dashboard = $("#data_new_home_dashboard").val();
    if (data_new_home_dashboard == undefined) {
        data_new_home_dashboard = '';
    }
    var office_id = $("#office_id").val();
    if (office_id == undefined) {
        office_id = '';
    }
    var sort_criteria = $("#sort_criteria").val();
    if (sort_criteria == undefined) {
        sort_criteria = '';
    }
    var sort_type = $("#sort_type").val();
    if (sort_type == undefined) {
        sort_type = '';
    }

    var responsible_department = $('#responsible_department').val();
    var responsible_office = $('#responsible_name').val();
    var responsible_name = $('#responsible_staff').val();
    // var creation_date_pre = $('#creation_date_pre').val();
    // var due_date_pre = $('#due_date_pre').val();
    // console.log(creation_date_pre);
    // console.log(due_date_pre);
    if (responsible_department == undefined) {
        responsible_department = '';
    }
    if (responsible_office == undefined) {
        responsible_office = '';
    }
    if (responsible_name == undefined) {
        responsible_name = '';
    }
    // if (creation_date_pre == undefined) {
    //     creation_date_pre = '';
    // }
    // if (due_date_pre == undefined) {
    //     due_date_pre = '';
    // }
    form_data.append('page_number', page_number);
    form_data.append('is_recurrence', is_recurrence);
    form_data.append('client_id', client_id_r);
    form_data.append('pattern', pattern_r);
    form_data.append('data_new_home_dashboard', data_new_home_dashboard);
    form_data.append('office_id', office_id);
    form_data.append('sort_criteria', sort_criteria);
    form_data.append('sort_type', sort_type);
    form_data.append('responsible_department', responsible_department);
    form_data.append('responsible_office', responsible_office);
    form_data.append('responsible_name', responsible_name);
    // if(creation_date_pre != ''){
    //   form_data.append('creation_date_pre', creation_date_pre);  
    // }
    
    // form_data.append('responsible_name', responsible_name);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/home/invoice_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            // console.log(result);
            $("#dashboard_result_div").html(result);
            $("[data-toggle=popover]").popover();
            $('#bookkeeping_btn_clear_filter').show();
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function sort_invoice_dashboard_new(sort_type = '', sort_val = '', page_number = '') {
    var sort_type = sort_type.value;
    //    alert(filter_data);
    var is_recurrence = $("#is_recurrence_invoice").val();
    if (is_recurrence == undefined) {
        is_recurrence = 'n';
    }
    var data_new_home_dashboard = $("#data_new_home_dashboard").val();
    if (data_new_home_dashboard == undefined) {
        data_new_home_dashboard = '';
    }
    var office_id = $("#office_id").val();
    if (office_id == undefined) {
        office_id = '';
    }
    var form_data = new FormData(document.getElementById('invoice-filter-display-div'));
    form_data.append('sort_type', sort_type);
    form_data.append('sort_criteria', sort_val);
    form_data.append('page_number', page_number);
    form_data.append('is_recurrence', is_recurrence);
    form_data.append('data_new_home_dashboard', data_new_home_dashboard);
    form_data.append('office_id', office_id);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/home/sort_invoice',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function(action_result) {
            $("#dashboard_result_div").html(action_result);
            //            $('#bookkeeping_btn_clear_filter').show();
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(action_result) {
            closeLoading();
        }
    });
}

function load_billing_client_dashbaord(status = '', by = '', office = '', payment_status = '', reference_id = '', pageNumber = 0, is_recurrence = '', client_id = '', pattern = '', client_page = '', data_new_home_dashboard = '', service_id = '', partner_id = '', sort_criteria = '', sort_type = '') {
    $.ajax({
        type: "POST",
        url: base_url + 'billing/home/dashboard_ajax',
        data: {
            status: status,
            by: by,
            office: office,
            payment_status: payment_status,
            reference_id: reference_id,
            page_number: pageNumber,
            is_recurrence: is_recurrence,
            client_id: client_id,
            pattern: pattern,
            client_page: client_page,
            data_new_home_dashboard: data_new_home_dashboard,
            service_id: service_id,
            partner_id: partner_id,
            sort_criteria: sort_criteria,
            sort_type: sort_type
        },
        dataType: "html",
        success: function(result) {
            // alert(result);return false;
            if (result != '0') {
                if (pageNumber == 1 || pageNumber == 0) {
                    $('#dashboard_result_div').html(result);
                    $('.dropdown-menu li.active').removeClass('active');
                    $(".sort_type_div #sort-desc").hide();
                    $(".sort_type_div #sort-asc").css({ display: 'inline-block' });
                    $("#sort-by-dropdown").html('Sort By <span class="caret"></span>');
                    $('.sort_type_div').css('display', 'none');
                    $("a.filter-button span:contains('-')").html(0);
                    if ((status + by) == '') {
                        if (pattern == '') {
                            clearFilter();
                        }
                    }
                } else {
                    $(".ajaxdiv").append(result);
                    $('.result-header').not(':first').remove();
                }
                if (pageNumber != 0) {
                    $('.load-more-btn').not(':last').remove();
                }
                if ((status + by) != '') {
                    $("#clear_filter").show();
                    $('#btn_clear_filter').show();
                } else {
                    if (pattern == '') {
                        clearFilter();
                    }
                }
                if (payment_status == 4) {
                    clearFilter();
                    $('#btn_clear_filter').hide();
                }
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
            jumpDiv();
        }
    });
}
function select_project_template_by_pattern1(pattern = '',section='',service_id='',client_type='',existing_client='',company_type='',country_residence='') {
    if(section == '') {
        var client_type = $("#invoice_type option:selected").val();
        var company_type = '';
        var country_residence = '';
        var existing_client = $("#type_of_individual_ddl option:selected").val();
        var country_residence = '';
        var title_id = '';
        if (client_type == 1) {
            company_type = $("#type option:selected").val();
        } else {
            if (existing_client == 0) { /*existing*/
                title_id = $("#individual_list_ddl option:selected").val();
            } else {
                country_residence = $("#individual_country_residence option:selected").val();
            }
        }
        var service_id = $("#service1").val();

        if (service_id == undefined) {
            var section_id = $('#section_id').val().trim();
            var service_id_arr = section_id.split(',');
            var service_id_arr_length = service_id_arr.length;
            if (service_id_arr_length == 1) {
                service_id = $("#service" + service_id_arr).val();
            }
        }
        /*kept for testing purpose*/
        /*console.log('pattern:'+pattern);console.log('service_id:'+service_id);console.log('client_type:'+client_type);console.log('company_type:'+company_type);console.log('country_residence:'+country_residence);console.log('existing_client:'+existing_client);console.log('title_id:'+title_id);*/
        if (service_id != undefined) {
            $.ajax({
                type: "POST",
                data: {
                    pattern: pattern,
                    service_id: service_id,
                    client_type: client_type,
                    company_type: company_type,
                    country_residence: country_residence,
                    existing_client: existing_client,
                    title_id: title_id
                },
                url: base_url + 'services/home/automatic_template_selection',
                dataType: "html",
                success: function(result) {
                    var template_id = (result.trim() != 0) ? result.trim() : '';
                    console.log(template_id);
                    if (template_id != '') {       
                        $.ajax({
                            type: "POST",
                            data: {
                                template_id: template_id
                            },
                            url: base_url + 'billing/invoice/get_pattern_details_by_template_id',
                            dataType: "html",
                            success: function(pattern_details) {
                                $("#project_pattern_details_div").html(pattern_details);
                            },
                            beforeSend: function() {
                                openLoading();
                            },
                            complete: function(msg) {
                                closeLoading();
                            }
                        }).done(function(res) {
                            if(res != '') {
                                $("#will_create_project").attr('disabled', false);
                                $("#waring_project").html('');
                                $("#will_create_project").prop('checked', true);
                            }
                        });
                    } else {
                        $("#will_create_project").attr('disabled', true);
                        if (pattern != '') {
                            $("#waring_project").removeClass('text-green');
                            $("#waring_project").addClass('text-warning');
                            $("#waring_project").html('<i class="fa fa-warning"></i>&nbsp;Not available for Project Creation: As no template associated with this Pattern');
                        } else {
                            $("#waring_project").removeClass('text-warning');
                            $("#waring_project").addClass('text-green');
                            $("#waring_project").html('<i class="fa fa-star"></i> Please select pattern to enable project creation');
                        }
                        $("#will_create_project").attr('checked', false);
                    }
                },
                beforeSend: function() {
                    openLoading();
                },
                complete: function(msg) {
                    closeLoading();
                }
            });
        }
    } else if(section.trim() == 'service_section') {
        var client_type = $("#client_type").val();
        var company_type = '';
        var country_residence = '';
        var existing_client = $("#type_of_individual_ddl option:selected").val();
        var country_residence = '';
        var title_id = '';
        if (client_type == 1) {
            company_type = $("#type option:selected").val();
        } else {
            if (existing_client == 0) { /*existing*/
                title_id = $("#individual_list_ddl option:selected").val();
            } else {
                country_residence = $("#individual_country_residence option:selected").val();
            }
        }
        var service_id = $("#service_id").val();
        if (service_id != undefined) {
            $.ajax({
                type: "POST",
                data: {
                    pattern: pattern,
                    service_id: service_id,
                    client_type: client_type,
                    company_type: company_type,
                    country_residence: country_residence,
                    existing_client: existing_client,
                    title_id: title_id
                },
                url: base_url + 'services/home/automatic_template_selection',
                dataType: "html",
                success: function(result) {
                    var template_id = (result.trim() != 0) ? result.trim() : '';
                    if (template_id != '') {
                        $("#will_create_project").attr('disabled', false);
                        $("#waring_project").html('');
                        $("#will_create_project").prop('checked', true);
                        $.ajax({
                            type: "POST",
                            data: {
                                template_id: template_id
                            },
                            url: base_url + 'billing/invoice/get_pattern_details_by_template_id',
                            dataType: "html",
                            success: function(pattern_details) {
                                $("#project_pattern_details_div").html(pattern_details);
                            }
                        });
                    } else {
                        $("#will_create_project").attr('disabled', true);
                        if (pattern != '') {
                            $("#waring_project").removeClass('text-green');
                            $("#waring_project").addClass('text-warning');
                            $("#waring_project").html('<i class="fa fa-warning"></i>&nbsp;Not available for Project Creation: As no template associated with this Pattern');
                        } else {
                            $("#waring_project").removeClass('text-warning');
                            $("#waring_project").addClass('text-green');
                            $("#waring_project").html('<i class="fa fa-star"></i> Please select pattern to enable project creation');
                        }
                        $("#will_create_project").attr('checked', false);
                    }
                },
                beforeSend: function() {
                    openLoading();
                },
                complete: function(msg) {
                    closeLoading();
                }
            });
        }
    } else { /* edit section */
        if (service_id != undefined) {
            $.ajax({
                type: "POST",
                data: {
                    pattern: pattern,
                    service_id: service_id,
                    client_type: client_type,
                    company_type: company_type,
                    country_residence: country_residence,
                    existing_client: existing_client,
                    title_id: title_id
                },
                url: base_url + 'services/home/automatic_template_selection',
                dataType: "html",
                success: function(result) {
                    var template_id = (result.trim() != 0) ? result.trim() : '';
                    if (template_id != '') {
                        alert(template_id);
                        $("#will_create_project").attr('disabled', false);
                        $("#waring_project").html('');
                        $("#will_create_project").prop('checked', true);
                        $.ajax({
                            type: "POST",
                            data: {
                                template_id: template_id
                            },
                            url: base_url + 'billing/invoice/get_pattern_details_by_template_id',
                            dataType: "html",
                            success: function(pattern_details) {
                                $("#project_pattern_details_div").html(pattern_details);
                            }
                        });
                    } else {
                        $("#will_create_project").attr('disabled', true);
                        if (pattern != '') {
                            $("#waring_project").removeClass('text-green');
                            $("#waring_project").addClass('text-warning');
                            $("#waring_project").html('<i class="fa fa-warning"></i>&nbsp;Not available for Project Creation: As no template associated with this Pattern');
                        } else {
                            $("#waring_project").removeClass('text-warning');
                            $("#waring_project").addClass('text-green');
                            $("#waring_project").html('<i class="fa fa-star"></i> Please select pattern to enable project creation');
                        }
                        $("#will_create_project").attr('checked', false);
                    }
                },
                beforeSend: function() {
                    openLoading();
                },
                complete: function(msg) {
                    closeLoading();
                }
            });
        }
    }
}

function manage_template_selected_template_visibility() {
    var is_checked = $("#will_create_project").is(":checked");
    if (is_checked) {
        // $("#automatic_template_id").removeClass('pace-inactive');
    } else {
        // $("#automatic_template_id").addClass('pace-inactive');
    }
}

function change_project_due_date_during_invoice_creation(select_month = '') {
    var project_pattern = $('#project_pattern').val();
    var template_cat_id = $('#template_cat_id').val();

    if (project_pattern == 'monthly') {
        if (select_month == '') {
            select_month = $("#recurring_start_month").val();
        }
        var select_year = $("#recurring_start_year").val();
        var due_day = $('#project_due_day').val();
        var target_start_month = $("#project_target_start_month").val();
        var generation_day = $('#project_generation_day').val();
        var generation_month = $("#project_generation_month").val();
        var create_date = new Date(select_month + ' ' + due_day + ' ' + select_year);
        var next_month = parseInt(select_month) + parseInt(target_start_month);
        var day_of_select_month = new Date(select_year, select_month, 0).getDate();
        var next_month_of_selected_month = new Date(create_date.getFullYear(), create_date.getMonth(), create_date.getDate() + 30);
        var day_of_next_selected_month = new Date(next_month_of_selected_month.getYear(), next_month_of_selected_month.getMonth(), 0).getDate();
        if (target_start_month == 1) {
            var total_days = 30;
        } else {
            var total_days = parseInt(day_of_select_month) + parseInt(day_of_next_selected_month) + parseInt(1);
        }
        if (next_month == 13) {
            next_month = 01;
        } else if (next_month == 14) {
            next_month = 02;
        }
        create_date.setDate(create_date.getDate() + parseInt(total_days));
        var due_date = next_month + '/' + due_day + '/' + create_date.getFullYear();

        var next_due_month = parseInt(next_month) + parseInt(1);
        var next_due = new Date(due_date);
        next_due.setDate(next_due.getDate() + parseInt(31));
        if (next_due_month == 13) {
            next_due_month = 01;
        }
        var next_due_date = next_due_month + '/' + due_day + '/' + next_due.getFullYear();
        var next_recurrence = new Date(next_due_date);
        var new_month = next_recurrence.getMonth();
        var actual_year = next_recurrence.getYear();
        var sales_month = new Date(actual_year, new_month, 0).getDate();
        var total_recurrence_days = (parseInt(generation_month) * parseInt(sales_month)) + parseInt(generation_day);
        next_recurrence.setDate(next_recurrence.getDate() - parseInt(total_recurrence_days));
        var next_recurrence_month = parseInt(next_due_month) - parseInt(target_start_month);
        if (next_recurrence_month == 0) {
            next_recurrence_month = 12;
        }
        if (next_recurrence_month == -1) {
            next_recurrence_month = 11;
        }
        if (template_cat_id == 1) {
            var next_recurrence_date = (next_recurrence.getMonth() + 1) + '/' + due_day + '/' + next_recurrence.getFullYear();
        } else {
            var next_recurrence_date = (next_recurrence.getMonth() + 1) + '/' + next_recurrence.getDate() + '/' + next_recurrence.getFullYear();
        }
        if (due_date != '' && next_due_date != '' && next_recurrence_date != '') {
            $("#due_date").val(due_date);
            $('#next_due_date').val(next_due_date);
            $('#generation_date').val(next_recurrence_date);
        }
    } else if (project_pattern == 'quarterly') {
        if (select_month == '') {
            select_month = $("#recurring_start_quarter").val();
        }
        var select_year = $("#recurring_start_year").val();
        var due_day = $('#project_due_day').val();
        var due_date = '';
        var next_due_date = '';
        var next_recurrence_date = '';
        if (select_month == 1) {
            due_date = 04 + '/' + due_day + "/" + select_year;
            next_due_date = 07 + '/' + due_day + "/" + select_year;
            next_recurrence_date = 07 + '/' + 01 + "/" + select_year;
        } else if (select_month == 2) {
            due_date = 07 + '/' + due_day + "/" + select_year;
            next_due_date = 10 + '/' + due_day + "/" + select_year;
            next_recurrence_date = 10 + '/' + 01 + "/" + select_year;
        } else if (select_month == 3) {
            due_date = 10 + '/' + due_day + "/" + select_year;
            next_due_date = 01 + '/' + due_day + "/" + (parseInt(select_year) + parseInt(1));
            next_recurrence_date = 01 + '/' + 01 + "/" + (parseInt(select_year) + parseInt(1));
        } else {
            due_date = 01 + '/' + due_day + "/" + (parseInt(select_year) + parseInt(1));
            next_due_date = 04 + '/' + due_day + "/" + (parseInt(select_year) + parseInt(1));
            next_recurrence_date = 04 + '/' + 01 + "/" + (parseInt(select_year) + parseInt(1));
        }
        if (due_date != '' && next_due_date != '' && next_recurrence_date != '') {
            $("#due_date").val(due_date);
            $('#next_due_date').val(next_due_date);
            $('#generation_date').val(next_recurrence_date);
        }
    } else if (project_pattern == 'annually') {
        var select_year = $("#recurring_start_year").val();
        var due_day = $('#project_due_day').val();
        var next_year = (parseInt(select_year) + parseInt(1));
        var due_date = '';
        var next_due_date = '';
        var next_recurrence_date = '';
        if (template_cat_id == 1) {
            due_date = 03 + '/' + due_day + "/" + next_year;
            next_due_date = 03 + '/' + due_day + "/" + (parseInt(next_year) + parseInt(1));
            next_recurrence_date = 01 + '/' + 01 + "/" + (parseInt(next_year) + parseInt(1));
        } else if (template_cat_id == 2) {
            due_date = 04 + '/' + due_day + "/" + next_year;
            next_due_date = 04 + '/' + due_day + "/" + (parseInt(next_year) + parseInt(1));
            next_recurrence_date = 01 + '/' + 01 + "/" + (parseInt(next_year) + parseInt(1));
        } else {
            due_date = 01 + '/' + due_day + "/" + next_year;
            next_due_date = 01 + '/' + due_day + "/" + (parseInt(next_year) + parseInt(1));
            next_recurrence_date = 01 + '/' + 01 + "/" + next_year;
        }
        if (due_date != '' && next_due_date != '' && next_recurrence_date != '') {
            $("#due_date").val(due_date);
            $('#next_due_date').val(next_due_date);
            $('#generation_date').val(next_recurrence_date);
        }
    }
    if (due_date != '' && next_due_date != '' && next_recurrence_date != '') {
        due_date = moment(due_date).format('MM-DD-YYYY');
        next_recurrence_date = moment(next_recurrence_date).format('MM-DD-YYYY');
        var date_info = '<span class="text-success"><i class="fa fa-star"></i> Due Date : ' + due_date + '</span>&nbsp;&nbsp;&nbsp;<span class="text-warning"><i class="fa fa-star"></i> Next Recurrence Date : ' + next_recurrence_date + '</span>';
        $("#project_template_id_info").html(date_info);
    }
}

function select_company_type_mandatory_before_pattern() {
    var service_id = $("#service1").val();
    if (service_id != undefined) {
        if (service_id == 18 || service_id == 19) {
            var invoice_type = $("#invoice_type option:selected").val();
            if (invoice_type == 1) {
                var type_of_company = $("#type_of_client_ddl option:selected").val();
                var e = document.getElementById("type");
                var company_type = e.options[e.selectedIndex].value;
                if (company_type == '') {
                    $("#pattern").val('');
                    if (type_of_company.trim() != 0) {
                        $("#pattern").next('div.errorMessage').html("<i class='fa fa-star'></i> You have to select company type first!");
                    } else {
                        var com_id = $("#client_list_ddl option:selected").val();
                        if (com_id == '') {
                            $("#pattern").next('div.errorMessage').html("<i class='fa fa-star'></i> You have to select client first!");
                        }
                    }
                    return false;
                } else {
                    $("#pattern").next('div.errorMessage').html("");
                }
            } else {
                var e = document.getElementById("individual_country_residence");
                var country_residence = e.options[e.selectedIndex].value;
                var type_of_individual = $("#type_of_individual_ddl option:selected").val();
                if (type_of_individual == 0) { /*existing*/
                    var ind_id = $("#individual_list_ddl option:selected").val();
                    if (ind_id == '') {
                        $("#pattern").val('');
                        $("#pattern").next('div.errorMessage').html("<i class='fa fa-star'></i> You have to select client first!");
                        return false;
                    } else {
                        $("#pattern").next('div.errorMessage').html("");
                    }
                } else {
                    if (country_residence.trim() == '') {
                        $("#pattern").val('');
                        $("#pattern").next('div.errorMessage').html("<i class='fa fa-star'></i> You have to select country of residence first!");
                        return false;
                    } else {
                        $("#pattern").next('div.errorMessage').html("");
                    }
                }
            }
        }
    }
}

function deselect_pattern_on_reference_change(reference = '', reference_val = '') {
    if (reference_val != '') {
        $("#pattern").val('');
        $("#project_template_id").val('');
        get_starting_period_div('');
    }
}

function collection_sorting_filter_modal(reference = '', current_element = '') {
    var due_date_val = $("#deu_date").val();
    var create_date_val = $("#creation_date").val();
    var form_data = new FormData(document.getElementById('collection-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'deu_date') {
        $("#due_date_pre").val(due_date_val);
    }
    if (previous_filter == 'creation_date') {
        $("#creation_date_pre").val(create_date_val);
    }
    // console.log(previous_filter);
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
                if (active_element == 'deu_date') {
                    id_val = 'deu_date';
                }
                if (active_element == 'creation_date') {
                    id_val = 'creation_date';
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
            url: base_url + 'modal/collection_sorting_filter_modal',
            data: {
                reference: reference
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function(result) {
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
                        // console.log(active_element.id);

                        let id_val = $('[name="' + active_element + '[]"]').attr('id');
                        if (active_element == 'deu_date') {
                            id_val = 'deu_date';
                        }
                        if (active_element == 'creation_date') {
                            id_val = 'creation_date';
                        }
                        let current_made_id = id_val + '-val';
                        // console.log('current_made_id : '+current_made_id);
                        if (current_element.id != current_made_id) {
                            $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                        }
                    }
                }
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
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
                if (active_element == 'deu_date') {
                    id_val = 'deu_date';
                }
                if (active_element == 'creation_date') {
                    id_val = 'creation_date';
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

function collection_filter_new(is_clear = '', current_clear_element = '') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if (is_clear != '') {
        var clear_element = current_clear_element.id;
        console.log(clear_element);

        let removavle_element = $("#filter-field-variable").val();
        // console.log(removavle_element);
        if (removavle_element == 'creation_date' || removavle_element == 'deu_date') {
            $("#" + removavle_element).val('');
            $("#creation_date_pre").val('');
            $("#due_date_pre").val('');
        } else {
            $("#" + removavle_element).val('').trigger('chosen:updated');
        }
        $("#" + clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('collection-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
        //        console.log(a);
        if (a == 'office_id_filter') {
            var id = 'office_id_filter-val';
            if (is_clear == '') {
                $("#office_id_filter-clear_filter").show();
            }
        }
        if (a == 'client_id_filter') {
            var id = 'client_id_filter-val';
            if (is_clear == '') {
                $("#client_id_filter-clear_filter").show();
            }
        }
        if (a == 'order_id') {
            var id = 'order_id-val';
            if (is_clear == '') {
                $("#order_id-clear_filter").show();
            }
        }
        if (a == 'referral_source') {
            var id = 'referral_source-val';
            if (is_clear == '') {
                $("#referral_source-clear_filter").show();
            }
        }
        if (a == 'referred_by_name') {
            var id = 'referred_by_name-val';
            if (is_clear == '') {
                $("#referred_by_name-clear_filter").show();
            }
        }
        if (a == 'requested_by_partner') {
            var id = 'requested_by_partner-val';
            if (is_clear == '') {
                $("#requested_by_partner-clear_filter").show();
            }
        }
        if (a == 'late_days') {
            var id = 'late_days-val';
            if (is_clear == '') {
                $("#late_days-clear_filter").show();
            }
        }
        if (a == 'deu_date') {
            var id = 'deu_date-val';
            if (is_clear == '') {
                $("#deu_date-clear_filter").show();
            }
        }
        if (a == 'creation_date') {
            var id = 'creation_date-val';
            if (is_clear == '') {
                $("#creation_date-clear_filter").show();
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
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if (is_clear == '') {
                $("#client_manager-clear_filter").show();
            }
        }
        if (a == 'amount_billed') {
            var id = 'amount_billed-val';
            if (is_clear == '') {
                $("#amount_billed-clear_filter").show();
            }
        }
        if (a == 'payment_status') {
            var id = 'payment_status-val';
            if (is_clear == '') {
                $("#payment_status-clear_filter").show();
            }
        }
    }
    var office_id = $("#office_id_filter").val();
    var client_id = $("#client_id_filter").val();
    var order_id = $("#order_id").val();
    var days_late = $("#late_days option:selected").val();
    var creationdaterange = $("#creation_date").val();
    var duedaterange = $("#deu_date").val();
    var referred_partner = $("#requested_by_partner").val();
    var referral_source = $("#referral_source").val();
    var referred_by_name = $("#referred_by_name").val();
    // console.log(duedaterange);
    var due_date_pre = $("#due_date_pre").val();
    var create_date_pre = $("#creation_date_pre").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var client_manager = $("#client_manager").val();
    var amount_billed = $("#amount_billed").val();
    var payment_status = $("#payment_status").val();

    if (due_date_pre != '') {
        duedaterange = due_date_pre;
    }
    if (create_date_pre != '') {
        creationdaterange = create_date_pre;
    }
    // console.log(duedaterange);
    if (office_id != '' || client_id != '' || order_id != '' || days_late != '' || creationdaterange != '' || duedaterange != '' || referred_partner != '' || referral_source != '' || referred_by_name != '' || email != '' || phone != '' || client_manager != '' || amount_billed != '' || payment_status != '') {
        $("#collection_dashboard_btn_clear_filter").show();
    }
    load_collection_dashboard(office_id, client_id, order_id, days_late, creationdaterange, duedaterange, referred_partner, referral_source, referred_by_name,email,phone,client_manager,amount_billed,payment_status);
    load_collection_report_chart(office_id, client_id, order_id, days_late, creationdaterange, duedaterange, referred_partner, referral_source, referred_by_name,email,phone,client_manager,amount_billed,payment_status);
}

function clear_advance_search_for_report() {
    window.location.reload();
}

function cancel_late_fee(late_id, status) {
    swal({
        title: "Are you sure?",
        text: (status == 1) ? "Do you want to remove late fee for this month?" : "Do you want to add late fee for this month?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        closeOnConfirm: false
    }, function() {
        $.ajax({
            type: 'POST',
            url: base_url + 'billing/payments/cancel_late_fee',
            data: {
                late_id: late_id,
                status: status
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function(result) {
                /*console.log(result);*/
                if (result.trim() == 1) {
                    swal({
                        title: "Success!",
                        text: "Successfully cancelled!",
                        type: "success"
                    }, function() {
                        window.location.reload();
                    });
                } else {
                    swal("ERROR!", "Please try again", "error");
                }
            },
            beforeSend: function() {
                openLoading();
            },
            complete: function(msg) {
                closeLoading();
            }
        });
    });
}

function printPaymentReceipt() {
    var doPrint = window.open();
    var printHtml = '<style type="text/css">body {background: #fff !important;} *{ font-size: 13px;}</style>';
    printHtml = printHtml + $('.payment_receipt').html();
    doPrint.document.write(printHtml);
    doPrint.print();
    doPrint.close();
}

function placeReceiptEmail(invoice_id, emails, payment_id) {
    $.ajax({
        type: "POST",
        data: {
            invoice_id: invoice_id,
            emails: emails,
            payment_id: payment_id
        },
        url: base_url + 'modal/show_invoice_payment_receipt_email_modal',
        dataType: "html",
        success: function(result) {
            $('#receiptemailsending').show();
            $("#receiptemailsending").html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
            if (emails == '') {
                $('#row_div').hide();
            }
            //            $("#payment_receipt_modal").hide();
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}

function sendInvoicePaymentReceiptEmail() {
    if (!requiredValidation('invoice_paymemt_receipt_email_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('invoice_paymemt_receipt_email_form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'billing/invoice/payment_receipt_export',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function(result) {
            if (result != 0) {
                swal("Well Done!", "Your email has been sent successfully!", "success");
                $('#receiptemailsending').modal('hide');
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}
function change_price_by_transaction(section , count, retail_price){
    var selected = [];
    var i = 1;
    for (i = 1; i <= count; i++) {
        var transaction_id = $('input[name="service_section['+section+'][no_of_transactions]['+i+']"]:checked').val();
        selected.push(transaction_id);
    }
    // console.log(selected);return false;
    $.ajax({
        type: "POST",
        data: {
            transaction_ids: selected,
            count: count,
            retail_price: retail_price
        },
        url: base_url + 'billing/invoice/get_calculate_bookkeeping_price',
        dataType: "html",
        success: function (result) {
            $("#retail-price-" + section).val(result);
            $("#service_section_retail_price").val(result);
            $("#base_price_" + section).val(result);
        }
    });
}

function open_number_of_transaction(section_id , check_client_have_financial_acc = '') {
    var invoice_type = $("#invoice_type").val();
    if (invoice_type == 1) {
        var type_of_client = $("#type_of_client_ddl").val();
        if (type_of_client == 0) {
            if (check_client_have_financial_acc == 0) {
                $('#no_of_acc_div'+section_id).show();
                $("#no_of_accounts"+section_id).prop('required', true);
            } else {
                $('#no_of_acc_div'+section_id).hide();
                $("#no_of_accounts"+section_id).prop('required', false);
            }
        } else {
            $('#no_of_acc_div'+section_id).show();
            $("#no_of_accounts"+section_id).prop('required', true);
        }
    } else {
        var type_of_individual = $("#type_of_individual_ddl").val();
        if (type_of_individual == 0) {
            if (check_client_have_financial_acc == 0) {
                $('#no_of_acc_div'+section_id).show();
                $("#no_of_accounts"+section_id).prop('required', true);
            } else {
                $('#no_of_acc_div'+section_id).hide();
                $("#no_of_accounts"+section_id).prop('required', false);
            }
        } else {
            $('#no_of_acc_div'+section_id).show();
            $("#no_of_accounts"+section_id).prop('required', true);
        }
    }
}

function display_number_of_accounts(count , section , retail_price) {
    if (count != '') {
        $.ajax({
            type: "POST",
            data: {
                count: count,
                section: section,
                retail_price: retail_price
            },
            url: base_url + 'billing/invoice/display_number_of_accounts',
            dataType: "html",
            success: function (result) {
                $("#number_of_transactions_div_" + section).html(result);
            }
        });
    } else {
        $("#number_of_transactions_div_" + section).html('');
        $("#retail-price-" + section).val(retail_price);
        $("#service_section_retail_price" + section).val(retail_price);
        $("#base_price_" + section).val(retail_price);
    }
}

function update_service_information_on_client() {
    var section = $("#section_id").val();
    var service_id_arr = section.split(',');
    var service_id_arr_length = service_id_arr.length;
    var invoice_type = $("#invoice_type").val();
    if(service_id_arr_length >= 1) {
        if(service_id_arr_length == 1) {
            var first_service = $("#service"+service_id_arr).val();
            var first_service_category_id = $("#category_"+service_id_arr).val();
            if(first_service != undefined) {
                getServiceDropdownByCategory(first_service_category_id,first_service,section,invoice_type);
                getServiceInfoById(first_service,first_service_category_id,section);
                checkServiceRecurrenceTypeAndGetRecurrenceInfo(first_service,'');
                checkServiceProjectCreationScope(first_service,'',section);
            }
        } else {
            /*for(var i = 0;i< service_id_arr_length;i++) {
                var current_service = $("#service"+service_id_arr[i]).val();
                alert("#service"+service_id_arr[i]);
                alert(current_service);
                var current_service_category_id = $("#category_"+service_id_arr[i]).val();    
                getServiceDropdownByCategory(current_service_category_id,current_service,i,invoice_type);
                getServiceInfoById(current_service,current_service_category_id,i);
                checkServiceRecurrenceTypeAndGetRecurrenceInfo(current_service,'');
                checkServiceProjectCreationScope(current_service_category_id,'',i);    
            }*/
        }     
    }      
}

function get_edit_invoice_recurrence_project_data(service_id='',is_recurrence='',pattern='',invoice_start_index='',invoice_start_year='',invoice_project_template='',client_type='',company_type='',country_residence='',will_create_project='') {
    console.log('service_id : '+service_id+'<br>is_recurrence : '+is_recurrence+'<br>pattern : '+pattern+'<br>invoice_start_index : '+invoice_start_index+'<br>invoice_start_year : '+invoice_start_year+'<br>invoice_project_template :'+invoice_project_template+'<br>client_type : '+client_type+'<br>company_type : '+company_type+'<br>country_residence : '+country_residence,'will_create_project : '+will_create_project);
    if(is_recurrence == 'y') { /*Recurring Invoice*/
        if(service_id != '') {
            // checkServiceRecurrenceTypeAndGetRecurrenceInfo(service_id);
            if(will_create_project != '') {
                checkServiceProjectCreationScope(service_id);    
            }
        }
        if(client_type == 0) { /*business client*/
            change_invoice_pattern(pattern);
            get_starting_period_div(pattern);
            /*select_project_template_by_pattern(pattern);*/
        } else { /*individual client*/
            change_invoice_pattern(pattern);
            get_starting_period_div(pattern);
            /*select_project_template_by_pattern(pattern);*/
        }
    } else { /*Normal Invoice*/
        if(service_id != '') {
            checkServiceRecurrenceTypeAndGetRecurrenceInfo(service_id);
            if(will_create_project != '') {
                checkServiceProjectCreationScope(service_id);    
            }    
        }
        // alert(client_type);
        if(client_type == 0) { /*business client*/
            change_invoice_pattern(pattern);
            get_starting_period_div(pattern);
            /*select_project_template_by_pattern(pattern);*/
        } else { /*individual client*/
            change_invoice_pattern(pattern);
            get_starting_period_div(pattern);
            /*select_project_template_by_pattern(pattern);*/
        }
    }
}
function show_project_recurrence_information_at_invoice_edit(project_id) {
    $.ajax({
        type: "POST",
        data: {project_id:project_id},
        url: base_url + 'project/get_project_recurrence_information_by_id',
        dataType: "html",
        success: function (result) {
            /*console.log(result);*/
            result = JSON.parse(result);
            if(result != '') {
                var due_date = result.due_date;
                var next_recurrence_date = result.generation_date;
                if (due_date != '' && next_recurrence_date != '') {
                    due_date = moment(due_date).format('MM-DD-YYYY');
                    next_recurrence_date = moment(next_recurrence_date).format('MM-DD-YYYY');
                    var date_info = '<span class="text-success"><i class="fa fa-star"></i> Due Date : ' + due_date + '</span>&nbsp;&nbsp;&nbsp;<span class="text-warning"><i class="fa fa-star"></i> Next Recurrence Date : ' + next_recurrence_date + '</span>';
                    $("#project_template_id_info").html(date_info);
                }    
            }
        }
    });
}


function bring_referral_name_invoice(value){
     var referral_type = value;
     // console.log(referral_type);
      //return false;
      if(referral_type != '16'){
        $.ajax({
            type: "POST",
            data: {
                    'referral_type': referral_type
                },
            url: base_url + 'billing/home/bring_referral_name_invoice',
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
}


function bring_partner_name(element){
     var current = element;
    // var value = $("#" +current).val();
     // console.log(current);
     // console.log(value);
      // return false;
      if(current == '16'){
        $.ajax({
            type: "POST",
            data: {
                    'value': current
                    // 'value' : value
                },
            url: base_url + 'billing/home/bring_partner_name_invoice',
            dataType: "html",
            success: function(result){
                // console.log(result);
                result= result.trim();
                if(result != ''){
                    $("#referral_type_client").empty().trigger('chosen:updated');    
                
                    result = JSON.parse(result.trim());
                    for (const r in result) {
                        $("#referral_type_client").append(`<option value="${result[r].id}">${result[r].name}</option>`).trigger('chosen:updated');
                    }  
                }else{
                    $("#referral_type_client").empty().trigger('chosen:updated');  
                }             
            }

        });
    }
}
// function open_pattern_respected_div(value , section_id) {
//     if (value == 'monthly') {
//         $("#monthly_div_" + section_id).show();
//         $("#quarterly_div_" + section_id).hide();
//         $("#yearly_div_" + section_id).hide();
//         $(".period-service"+ section_id).removeAttr('required');
//         $("#starting_month"+ section_id).attr('required',true);
//         $("#starting_year"+ section_id).attr('required',true);
//     } else if (value == 'quarterly') {
//         $("#monthly_div_" + section_id).hide();
//         $("#quarterly_div_" + section_id).show();
//         $("#yearly_div_" + section_id).hide();
//         $(".period-service"+ section_id).removeAttr('required');
//         $("#starting_month"+ section_id).attr('required',true);
//         $("#starting_year"+ section_id).attr('required',true);
//     } else if (value == 'annually') {
//         $("#monthly_div_" + section_id).hide();
//         $("#quarterly_div_" + section_id).hide();
//         $("#yearly_div_" + section_id).show();
//         $(".period-service"+ section_id).removeAttr('required');
//         $("#starting_year"+ section_id).attr('required',true);
//     } else {
//         $("#monthly_div_" + section_id).hide();
//         $("#quarterly_div_" + section_id).hide();
//         $("#yearly_div_" + section_id).hide();
//         $(".period-service"+ section_id).removeAttr('required');
//     }
// }

function open_pattern_respected_div(pattern , section_id , service_id,month_or_quarter='',year='') {
    var existing_client = '';var client_type = '';var company_type = '';var country_residence = '';var title_id = '';
    if(service_id == 18 || service_id == 19) {
        client_type = $("#invoice_type").val();
        existing_client = $("#type_of_individual_ddl option:selected").val();
        if (client_type == 1) {
            company_type = $("#type option:selected").val();
        } else {
            if (existing_client == 0) { /*existing*/
                title_id = $("#individual_list_ddl option:selected").val();
            } else {
                country_residence = $("#individual_country_residence option:selected").val();
            }
        }
    }
    $.ajax({
        type: "POST",
        data: {
            pattern: pattern,
            section_id: section_id,
            service_id: service_id,
            main_month_or_quarter:month_or_quarter,
            main_year:year,
            client_type:client_type,
            company_type:company_type,
            existing_client:existing_client,
            country_residence:country_residence,
            title_id:title_id
        },
        url: base_url + 'billing/invoice/get_service_info_ajax_period_div',
        dataType: "html",
        success: function(result) {
            $("#service_info_ajax_period_div" + section_id).empty();
            $("#service_info_ajax_period_div" + section_id).html(result);
        }
    }); 
}
function getRecurrenceSectionForOrderSummary(is_recurrence = '', project_id = '', tax_return_pattern = '' , tax_return_year = '' , tax_return_month = '' , invoice_id = '') {
    $.ajax({
        type: "POST",
        data: {
            is_recurrence: is_recurrence,
            invoice_id: invoice_id,
            project_id: project_id,
            normal_invoice: 'no',
            section_count: 1,
            tax_return_pattern: tax_return_pattern,
            tax_return_year: tax_return_year,
            tax_return_month: tax_return_month
        },
        url: base_url + 'billing/invoice/getRecurrenceSectionForOrderSummary',
        dataType: "html",
        success: function(result) {
            $("#recurring_section_order_summary").html(result);
        }
    });   
}

function manage_project_creation_for_current_service(current_id,section) {
    var is_checked = $("#"+current_id.id).is(":checked");
    var month = '';var year = '';
    if (section>1) {
        month = $("#starting_month1").val();
        year = $("#starting_year1").val();
    } 
    if (is_checked) {
        $(".project-pattern-1").removeClass('pace-inactive');
        var template = $("#project_template_id_temp").val();
        $("#period-pattern-"+section).css('display','block');
        $("#will_create_project").val('yes');
        $("#project_template_id").val(template);
        $("#pattern").addClass('disabled_section');
        $("#recurring_start_month").addClass('disabled_section');
        $("#recurring_start_quarter").addClass('disabled_section');
        $("#recurring_start_year").addClass('disabled_section');
        $(".period-service"+ section).removeAttr('required');
        $("#starting_month"+section).attr('required', true);
        $("#starting_year"+section).attr('required', true);
        $("#starting_month"+section).val(month);
        $("#starting_year"+section).val(year);      

        if (section == 1) {
            var all_active_section = $("#section_id").val();
            all_active_section = all_active_section.split(',');
            if(all_active_section.length > 1) {
                for(var i=1;i<=all_active_section.length;i++) {
                    if(i != 1) {
                        $("#will_create_project_"+i).attr('checked',true);        
                        $("#will_create_project_"+i).removeAttr('disabled');     

                        $(".project-pattern-1").removeClass('pace-inactive');
                        var template = $("#project_template_id_temp").val();
                        $("#project_template_id").val(template);

                        // $("#period-pattern-"+i).css('display','block');
                        $("#will_create_project").val('yes');
                        $("#pattern").addClass('disabled_section');
                        $("#recurring_start_month").addClass('disabled_section');
                        $("#recurring_start_quarter").addClass('disabled_section');
                        $("#recurring_start_year").addClass('disabled_section');
                        $(".period-service"+ i).removeAttr('required');
                        $("#starting_month"+i).attr('required', true);
                        $("#starting_year"+i).attr('required', true);
                        $("#starting_month"+i).val(month);
                        $("#starting_year"+i).val(year);   
                    }
                }
            }    
        }
        if (section>1) {
            set_project_recurrence_from_invoice(section,'');
        }
    } else {
        $("#pattern").prop('disabled',false);
        $("#period-pattern-"+section).css('display','none');        
        $("#will_create_project").val('no');
        $("#project_template_id").val('');
        $("#pattern").removeClass('disabled_section');
        $("#recurring_start_month").removeClass('disabled_section');
        $("#recurring_start_quarter").removeClass('disabled_section');
        $("#recurring_start_year").removeClass('disabled_section');
        $(".period-service"+ section).removeAttr('required');
        $("#starting_month" + section).val('');
        $("#starting_year" + section).val('');
        $("#project_recurrence_info_"+section).find('.info_'+section).each(function() {
            $(this).val('');
        });
        if (section == 1) {
            var all_active_section = $("#section_id").val();
            all_active_section = all_active_section.split(',');
            if(all_active_section.length > 1) {
                for(var i=1;i<=all_active_section.length;i++) {
                    if(i != 1) {
                        $("#will_create_project_"+i).removeAttr('checked');        
                        $("#will_create_project_"+i).attr('disabled',true);     

                        $("#pattern").prop('disabled',false);
                        $("#period-pattern-"+i).css('display','none');        
                        $("#will_create_project").val('no');
                        $("#project_template_id").val('');
                        $("#pattern").removeClass('disabled_section');
                        $("#recurring_start_month").removeClass('disabled_section');
                        $("#recurring_start_quarter").removeClass('disabled_section');
                        $("#recurring_start_year").removeClass('disabled_section');
                        $(".period-service"+ i).removeAttr('required');
                        $("#starting_month" + i).val('');
                        $("#starting_year" + i).val('');   
                    }
                }
            }    
        }
    }    
}

function plan_dashboard_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('plan_dashboard-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    // console.log(previous_filter);
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
            url: base_url + 'modal/plan_dashboard_filter_modal',
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
                        // console.log(active_element.id);

                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
                        let current_made_id = id_val+'-val';
                       // console.log('current_made_id : '+current_made_id);
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

function plan_dashboard_filter_new(is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
         if(removavle_element =='referral_type'){
           $("#referral_type_client").val('').trigger('chosen:updated'); 
         }
        $("#"+removavle_element).val('').trigger('chosen:updated');
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('plan_dashboard-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'office') {
            var id = 'office-val';
            if(is_clear==''){
                $("#office-clear_filter").show();
            }        
        }
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if(is_clear==''){
                $("#client_manager-clear_filter").show();
            }        
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }        
        }
        if (a == 'category') {
            var id = 'category-val';
            if(is_clear==''){
                $("#category-clear_filter").show();
            }
        }
        if (a == 'plan_name') {
            var id = 'plan_name-val';
            if(is_clear==''){
                $("#plan_name-clear_filter").show();
            }
        }
        if (a == 'recurring_type') {
            var id = 'recurring_type-val';
            if(is_clear==''){
                $("#recurring_type-clear_filter").show();
            }
        }
        if (a == 'plan_status') {
            var id = 'plan_status-val';
            if(is_clear==''){
                $("#plan_status-clear_filter").show();
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
        if (a == 'partner') {
            var id = 'partner-val';
            if(is_clear==''){
                $("#partner-clear_filter").show();
            }
        }
        if (a == 'referral_type') {
            var id = 'referral_type-val';
            if(is_clear==''){
                $("#referral_type-clear_filter").show();
            }
        }
        if (a == 'referral_partner') {
            var id = 'referral_partner-val';
            if(is_clear==''){
                $("#referral_partner-clear_filter").show();
            }
        }
        
    }    
    var client_id = $("#client_id").val();
    var category = $("#category").val();
    var office = $("#office").val();
    var client_manager = $("#client_manager").val();
    //alert(office);
    var plan_name = $("#plan_name").val();
    var plan_status = $("#plan_status").val();
    var recurring_type = $("#recurring_type").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var partner = $("#partner").val();
    var referral_type = $("#referral_type").val();
    var referral_type_client = $("#referral_type_client").val();
    var referral_partner = $("#referral_partner").val();
    if(referral_type_client != undefined){
      if(referral_type_client[0]==''){
          referral_type_client = ''; 
        }  
    }
    if(email != undefined){
      if(email[0]==''){
        // alert(1);
          email = ''; 
        }  
    }
    if(phone != undefined){
      if(phone[0]==''){
          phone = ''; 
        }  
    }
    if(partner != undefined){
      if(partner[0]==''){
          partner = ''; 
        }  
    }
    // console.log(plan_status);
    // console.log(partner);
    console.log(email);
    console.log(phone);
    // console.log(referral_type);
    console.log(referral_type_client);
    if (client_id != '' || category != '' || plan_name != '' || recurring_type != '' ||office != ''||client_manager != ''||partner != ''||email != ''||phone != ''||referral_type != ''||referral_type_client != '' || plan_status != ''||referral_partner != '') {
         //alert("1");
        $("#plandashboard_btn_clear_filter").show();
    }
    load_recurring_invoice_data('','','','','','','', plan_name ,recurring_type,client_id,category,office,client_manager,partner,email,phone,plan_status,referral_type,referral_type_client,referral_partner);  
}

function clear_advance_search_dasboard() {
    window.location.reload();

}
function manage_project_creation_with_template(from = '') {
    var is_checked = $("#will_create_project_1").is(":checked");
    if (is_checked) {
        /*var template = $("#project_template_id_temp").val();
        $("#will_create_project").val('yes');
        $("#project_template_id").val(template);*/
        if (from == 'service') {
            $("#service_pattern_div").show();
            $("#pattern").prop('required' , true);
            $("#recurring_start_year").prop('required' , true);
            $("#recurring_start_month").prop('required' , true);
        }
    } else {
        $("#will_create_project").val('no');
        $("#project_template_id").val('');
        if (from == 'service') {
            $("#service_pattern_div").hide();
            $("#pattern").prop('required' , false);
            $("#recurring_start_year").prop('required' , false);
            $("#recurring_start_month").prop('required' , false);
            $("#pattern").val('');
            $("#recurring_start_month").val('');
            $("#recurring_start_year").val('');
        }
    }    
}
function change_retail_price_by_state(value = '', section = '', service_id = '' , page = '') {
    $.ajax({
        type: "POST",
        data: {
            state_id: value,
            service_id: service_id
        },
        url: base_url + 'services/home/change_retail_price_by_state',
        dataType: "html",
        success: function(result) {
            if (result != 0) {
                var data = JSON.parse(result);
                $("#retail-price-" + section).val(data.retail_price);
                $("#service_section_retail_price" + section).val(data.retail_price);
                $("#base_price_" + section).val(data.retail_price);
                if (page == 'edit') {
                    $("#service_section_retail_price" + section).val(data.retail_price);
                    $("#retail_price_override" + section).val(data.retail_price);
                }
            }
        },
        beforeSend: function() {
            openLoading();
        },
        complete: function(msg) {
            closeLoading();
        }
    });
}
function manage_period_at_project_creation_label(element_id,val,section_id) {
    if(section_id == 1) {
        var all_active_section = $("#section_id").val();
        all_active_section = all_active_section.split(',');
        var new_element_id = '';
        if(all_active_section.length > 1) {
            for(var i=1;i<=all_active_section.length;i++) {
                if(i != 1) {
                    new_element_id = element_id.substr(0,element_id.length-1)+i;
                    $("#"+new_element_id).val(val);    
                }
            }
        }
    }
}
function set_project_recurrence_from_invoice(section_id,pattern='') {
    if(pattern == '') {
        pattern = $("#pattern"+section_id).val();
    }
    var template_cat_id = $('#template_cat_id_'+section_id).val();
    var select_month = '';var select_year = '';var due_day = '';
    if (pattern == 'monthly') {
        // var target_start_month = '';var generation_day = '';var generation_month = '';
        // var create_date = '';var next_month = '';var day_of_select_month = '';var next_month_of_selected_month = '';var day_of_next_selected_month = '';var total_days = '';var due_date = '';var next_due_month = '';var next_due = '';var next_recurrence_date = '';var next_recurrence_month = '';var total_recurrence_days = '';var sales_month = '';var actual_year = '';var next_due_date = '';var next_recurrence = '';var new_month = '';
        select_month = $("#starting_month"+section_id).val();
        select_year = $("#starting_year"+section_id).val();
        due_day = $("#project_due_day_"+section_id).val();
        target_start_month = $("#project_target_start_month_"+section_id).val();
        generation_day = $("#project_generation_day_"+section_id).val();
        generation_month = $("#project_generation_month_"+section_id).val();
        console.log(target_start_month);console.log(generation_day);console.log(generation_month);
        var create_date = new Date(select_month + ' ' + due_day + ' ' + select_year);
        var next_month = parseInt(select_month) + parseInt(target_start_month);
        var day_of_select_month = new Date(select_year, select_month, 0).getDate();
        var next_month_of_selected_month = new Date(create_date.getFullYear(), create_date.getMonth(), create_date.getDate() + 30);
        var day_of_next_selected_month = new Date(next_month_of_selected_month.getYear(), next_month_of_selected_month.getMonth(), 0).getDate();
        if (target_start_month == 1) {
            var total_days = 30;
        } else {
            var total_days = parseInt(day_of_select_month) + parseInt(day_of_next_selected_month) + parseInt(1);
        }
        if (next_month == 13) {
            next_month = 01;
        } else if (next_month == 14) {
            next_month = 02;
        }
        create_date.setDate(create_date.getDate() + parseInt(total_days));
        var due_date = next_month + '/' + due_day + '/' + create_date.getFullYear();

        var next_due_month = parseInt(next_month) + parseInt(1);
        var next_due = new Date(due_date);
        next_due.setDate(next_due.getDate() + parseInt(31));
        if (next_due_month == 13) {
            next_due_month = 01;
        }
        var next_due_date = next_due_month + '/' + due_day + '/' + next_due.getFullYear();
        var next_recurrence = new Date(next_due_date);
        var new_month = next_recurrence.getMonth();
        var actual_year = next_recurrence.getYear();
        var sales_month = new Date(actual_year, new_month, 0).getDate();
        var total_recurrence_days = (parseInt(generation_month) * parseInt(sales_month)) + parseInt(generation_day);
        next_recurrence.setDate(next_recurrence.getDate() - parseInt(total_recurrence_days));
        var next_recurrence_month = parseInt(next_due_month) - parseInt(target_start_month);
        if (next_recurrence_month == 0) {
            next_recurrence_month = 12;
        }
        if (next_recurrence_month == -1) {
            next_recurrence_month = 11;
        }
        if (template_cat_id == 1) {
            var next_recurrence_date = (next_recurrence.getMonth() + 1) + '/' + due_day + '/' + next_recurrence.getFullYear();
        } else {
            var next_recurrence_date = (next_recurrence.getMonth() + 1) + '/' + next_recurrence.getDate() + '/' + next_recurrence.getFullYear();
        }
        if (due_date != '' && next_due_date != '' && next_recurrence_date != '') {
            $("#due_date_"+section_id).val(due_date);
            $('#next_due_date_'+section_id).val(next_due_date);
            $('#generation_date_'+section_id).val(next_recurrence_date);
        }
    } else if(pattern == 'quarterly') {
        var due_date = '';var next_due_date = '';var next_recurrence_date = '';
        select_month = $("#starting_month"+section_id).val();
        select_year = $("#starting_year"+section_id).val();
        due_day = $("#project_due_day_"+section_id).val();
        if (select_month == 1) {
            due_date = 04 + '/' + due_day + "/" + select_year;
            next_due_date = 07 + '/' + due_day + "/" + select_year;
            next_recurrence_date = 07 + '/' + 01 + "/" + select_year;
        } else if (select_month == 2) {
            due_date = 07 + '/' + due_day + "/" + select_year;
            next_due_date = 10 + '/' + due_day + "/" + select_year;
            next_recurrence_date = 10 + '/' + 01 + "/" + select_year;
        } else if (select_month == 3) {
            due_date = 10 + '/' + due_day + "/" + select_year;
            next_due_date = 01 + '/' + due_day + "/" + (parseInt(select_year) + parseInt(1));
            next_recurrence_date = 01 + '/' + 01 + "/" + (parseInt(select_year) + parseInt(1));
        } else {
            due_date = 01 + '/' + due_day + "/" + (parseInt(select_year) + parseInt(1));
            next_due_date = 04 + '/' + due_day + "/" + (parseInt(select_year) + parseInt(1));
            next_recurrence_date = 04 + '/' + 01 + "/" + (parseInt(select_year) + parseInt(1));
        }
        if (due_date != '' && next_due_date != '' && next_recurrence_date != '') {
            $("#due_date_"+section_id).val(due_date);
            $('#next_due_date_'+section_id).val(next_due_date);
            $('#generation_date_'+section_id).val(next_recurrence_date);
        }
    } else if (pattern == 'annually') {
        var due_date = '';var next_due_date = '';var next_recurrence_date = '';var next_year = '';
        select_year = $("#starting_year"+section_id).val();
        due_day = $("#project_due_day_"+section_id).val();        
        next_year = (parseInt(select_year) + parseInt(1));
        if (template_cat_id == 1) {
            due_date = 03 + '/' + due_day + "/" + next_year;
            next_due_date = 03 + '/' + due_day + "/" + (parseInt(next_year) + parseInt(1));
            next_recurrence_date = 01 + '/' + 01 + "/" + (parseInt(next_year) + parseInt(1));
        } else if (template_cat_id == 2) {
            due_date = 04 + '/' + due_day + "/" + next_year;
            next_due_date = 04 + '/' + due_day + "/" + (parseInt(next_year) + parseInt(1));
            next_recurrence_date = 01 + '/' + 01 + "/" + (parseInt(next_year) + parseInt(1));
        } else {
            due_date = 01 + '/' + due_day + "/" + next_year;
            next_due_date = 01 + '/' + due_day + "/" + (parseInt(next_year) + parseInt(1));
            next_recurrence_date = 01 + '/' + 01 + "/" + next_year;
        }
        if (due_date != '' && next_due_date != '' && next_recurrence_date != '') {
            $("#due_date_"+section_id).val(due_date);
            $('#next_due_date_'+section_id).val(next_due_date);
            $('#generation_date_'+section_id).val(next_recurrence_date);
        }
    }
}

function select_company_type_mandatory_before_service_selection(service_id,section_id) {
    if (service_id != '') {
        if (service_id == 18 || service_id == 19) {
            var invoice_type = $("#invoice_type option:selected").val();
            if (invoice_type == 1) {
                var type_of_company = $("#type_of_client_ddl option:selected").val();
                var e = document.getElementById("type");
                var company_type = e.options[e.selectedIndex].value;
                if (company_type == '') {
                    $("#service"+section_id).val('');
                    if (type_of_company.trim() != 0) {
                        $("#service"+section_id).next('div.errorMessage').html("<i class='fa fa-star'></i> You have to select company type first!");
                    } else {
                        var com_id = $("#client_list_ddl option:selected").val();
                        if (com_id == '') {
                            $("#service"+section_id).next('div.errorMessage').html("<i class='fa fa-star'></i> You have to select client first!");
                        }
                    }
                    return false;
                } else {
                    $("#service"+section_id).next('div.errorMessage').html("");
                }
            } else {
                var e = document.getElementById("individual_country_residence");
                var country_residence = e.options[e.selectedIndex].value;
                var type_of_individual = $("#type_of_individual_ddl option:selected").val();
                if (type_of_individual == 0) { /*existing*/
                    var ind_id = $("#individual_list_ddl option:selected").val();
                    if (ind_id == '') {
                        $("#service"+section_id).val('');
                        $("#service"+section_id).next('div.errorMessage').html("<i class='fa fa-star'></i> You have to select client first!");
                        return false;
                    } else {
                        $("#service"+section_id).next('div.errorMessage').html("");
                    }
                } else {
                    if (country_residence.trim() == '') {
                        $("#service"+section_id).val('');
                        $("#service"+section_id).next('div.errorMessage').html("<i class='fa fa-star'></i> You have to select country of residence first!");
                        return false;
                    } else {
                        $("#service"+section_id).next('div.errorMessage').html("");
                    }
                }
            }
        } else {
            $("#service"+section_id).next('div.errorMessage').html("");
        }
    }
}