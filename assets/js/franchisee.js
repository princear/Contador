var base_url = document.getElementById('base_url').value;

/* franchise service setup section */
function add_franchisee_service() {//Add New Franchisee Service
    if (!requiredValidation('add-francisee-services-form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('add-francisee-services-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        processData: false,
    	contentType: false,
        url: base_url + '/franchisee/add_franchisee_service',
        dataType: "html",
        success: function (result) {
        	// console.log(result);return false;
            if (result == 1) {
                swal({
                    title: "Success!",
                    "text": "Successfully added!",
                    "type": "success"
                }, function () {
                    $('#service_task_btn').val(result);
                    $('#service_task_btn').prop('disabled', false);
                    $("#nav-link-2").trigger("click");
                    goURL(base_url + 'franchisee/franchisee_service_setup');
                });
            }else{
            	swal("ERROR!", "Unable To Add Franchisee Service", "error");
            } 
        }
    });
}

function get_franchisee_services(previous_services, current_service) {//Get Available Franchisee services
    var category_id = $("#category_id").find(":selected").val();
    $.post(base_url + "/franchisee/get_franchisee_services", {
        id: category_id,
        prev: previous_services,
        current: current_service
    }, function (data) {
        $("#relatedserv option").remove();
        $("#relatedserv").append(data);
    });
}

function update_franchisee_service(){ //Edit Franchisee Services
	if (!requiredValidation('edit-franchisee-services-form')) {
        return false;
    }
	var form_data = new FormData(document.getElementById('edit-franchisee-services-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        processData: false,
    	contentType: false,
        url: base_url + '/franchisee/update_franchisee_service',
        dataType: "html",
        success: function (result) {
            if (result == 1) {
                swal({
                    title: "Success!",
                    "text": "Successfully added!",
                    "type": "success"
                }, function () {
                    $('#service_task_btn').val(result);
                    $('#service_task_btn').prop('disabled', false);
                    $("#nav-link-2").trigger("click");
                    goURL(base_url + 'franchisee/franchisee_service_setup');
                });
            }else{
            	swal("ERROR!", "Unable To Add Franchisee Service", "error");
            } 
        }
    });
}
function getFranchiseServiceInfoById(service_id,counter) {
    if (service_id == '') {
        $('#service_div').html('');
    } else {
        $.ajax({
            type: "POST",
            data: {
                service_id: service_id,
                counter:counter
            },
            url: base_url + 'franchisee/get_franchisee_service_info_by_id',
            dataType: "html",
            success: function (result) {
                if (result != '0') {
                    $('#service_div_'+counter).html(result);
                } else {
                    $('#service_div_'+counter).html('');
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

function getExistingFranchiseeServices(invoice_id) {
    $.ajax({
        type: "POST",
        url: base_url + 'franchisee/getExistingFranchiseeServices',
        data: {
            invoice_id: invoice_id
        },
        dataType: "html",
        success: function (result) {
//            alert(result);
            if (result != '0') {
                var obj = $.parseJSON(result);
                var newHtml = decodeURI(obj.section_result);
                $('#edit_franchisee_service_div').html(newHtml);
                $('#section_id').val(obj.section_id_hidden);
            } else {
                $('#edit_franchisee_service_div').html('');
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

function getFranchiseServiceInfoById_during_edit(service_id='',section_id='',is_recurrence = '') {
    if (service_id == '') {
        $('#service_div').html('');
    } else {
        $.ajax({
            type: "POST",
            data: {
                service_id: service_id,
                section_id: section_id,
                is_recurrence: is_recurrence
            },
            url: base_url + 'franchisee/get_franchisee_service_info_by_id_during_edit',
            dataType: "html",
            success: function (result) {
                if (result != '0') {
                    $('#service_div_'+ section_id).html(result);
                } else {
                    $('#service_div_'+ section_id).html('');
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

function countFranchiseTotalPrice(counter, override_price, retail_price, sub_total) {
    var base_price = retail_price * sub_total;
    if (override_price != '') {
        base_price = override_price * sub_total;
    }
    $('#base_price_' + counter).val(base_price.toFixed(2));
}

setInterval(function () {
    var base_price_list = document.getElementsByClassName('total_price_each_service');
    var total_price = 0;
    if (base_price_list.length != 0) {
        for (i = 0; i < base_price_list.length; i++) {
            total_price += parseFloat(base_price_list[i].value);
        }
    }
    if (total_price != 0) {
        $('#base_price_div').show();
        $('#franchise_total_price').html(total_price.toFixed(2));
    } else {
        $('#base_price_div').hide();
    }
}, 1000);
function addFranchiseNote(counter, is_label = 'y') {
    var textnote = $('#note_link_' + counter).prev('.note-textarea-' + counter).html();
    var div_count = Math.floor((Math.random() * 999) + 1);
    var newHtml = '';
    if (is_label === 'n') {
        newHtml = '<div class="form-group" id="note_div_' + counter + '_' + div_count + '"> ' +
                textnote +
                '<a href="javascript:void(0)" onclick="removeNote(\'note_div_' + counter + '_' + div_count + '\')" class="text-danger"><i class="fa fa-times"></i> Remove Note</a>' +
                '</div>';
    } else {
        newHtml = '<div class="form-group" id="note_div_' + counter + '_' + div_count + '"> ' +
                '<label class="col-lg-2 control-label"></label>' +
                '<div class="col-lg-10">' +
                textnote +
                '<a href="javascript:void(0)" onclick="removeNote(\'note_div_' + counter + '_' + div_count + '\')" class="text-danger"><i class="fa fa-times"></i> Remove Note</a>' +
                '</div>' +
                '</div>';
    }
    $(newHtml).insertAfter($('#note_link_' + counter).closest('.form-group'));
}
function appendService(service_id,counter) {    
    $.ajax({
        type: "POST",
        data: {                
            service_id: service_id,
            counter: counter
        },
        url: base_url + 'franchisee/get_franchise_service_details_div',
        dataType: "html",
        success: function (result) {
            if (result != '0') {
                var section_link = $('#section_link_' + counter);
                section_link.attr('onclick', 'removeService_during_add(' + counter + ');');
                section_link.removeClass('text-success');
                section_link.addClass('text-danger');
                section_link.html('<h3><i class="fa fa-times"></i> Remove Service</h3>');
                section_link.blur();
                $(result).insertAfter('#service_div_outer_' + counter);
            }
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    })    
}

function removeService_during_add(remove_id) {
    $('#service_div_outer_' + remove_id).remove();
}

function appendService_during_edit(service_id = '',is_recurrence = '') {
    var section_id = $('#section_id').val();
    $.ajax({
        type: "POST",
        url: base_url + 'franchisee/append_service_during_edit',
        data: {
            section_id: section_id,
            service_id: service_id,
            is_recurrence: is_recurrence
        },
        dataType: "html",
        success: function (result) {
            if (result != '0') {
                var obj = $.parseJSON(result);
                var newHtml = obj.section_result;
    
                if (obj.last_section_id == 'new') {
                    $('#edit_franchisee_service_div').html(newHtml);
                } else {
                    // var section_link = $('#section_link_' + obj.last_section_id);
                    // section_link.attr('onclick', 'removeService_during_edit(' + obj.last_section_id + ');');
                    // section_link.removeClass('text-success');
                    // section_link.addClass('text-danger');
                    // section_link.html('<h3><i class="fa fa-times"></i> Remove Service</h3>');
                    // section_link.blur();
                    $(newHtml).insertAfter($('#service_div_outer_' + obj.last_section_id));
                }
                $('#section_id').val(obj.section_id_hidden);
            } else {
                $('#edit_franchisee_service_div').html('');
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

function removeService_during_edit(remove_id) {
    var section_id = $('#section_id').val();
    $.ajax({
        type: "POST",
        url: base_url + 'franchisee/remove_service_during_edit',
        data: {
            section_id: section_id,
            remove_id: remove_id
        },
        dataType: "html",
        success: function (result) {
            if (result != '0') {
                if (result == 'blank') {
                    $('#section_id').val('');
                } else {
                    $('#section_id').val(result);
                }
                $("#service_div_outer_" + remove_id).remove();
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

function save_franchisee_invoice() {
    if (!requiredValidation('create_franchise_invoice')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('create_franchise_invoice'));
    $.ajax({
        type: "POST",
        data: form_data,
        processData: false,
        contentType: false,
        url: base_url + 'franchisee/add_franchisee_invoice',
        dataType: "html",
        success: function (result) {
            // console.log(result);return false;
            if (result == 1) {
                swal({
                    title: "Success!",
                    "text": "Successfully added!",
                    "type": "success"
                }, function () {
                    goURL(base_url + 'franchisee/franchise_dashboard');
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
function load_franchise_billing_dashboard(invoice='',office_id='',creation_date='',tracking='',activity_name='',final_period='',amount='',payment_status='',sort_type='',sort_val='') {
    $.ajax({
        type: "POST",
        data:{
            'invoice':invoice,
            'office_id':office_id,
            'creation_date':creation_date,
            'tracking':tracking,
            'activity_name':activity_name,
            'period':final_period,
            'amount':amount,
            'payment_status':payment_status,
            'sort_type':sort_type,
            'sort_val':sort_val
        },
        url: base_url + 'franchisee/load_franchisee_invoice_dashboard',
        success: function (result) {
//            alert(result);
//            return false;
            $("#dashboard_result_div").html(result); 
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });    
}
function invoiceFranchiseServiceListAjax(invoice_id) {
    $.ajax({
        type: "POST",
        data: {
            invoice_id: invoice_id
        },
        url: base_url + 'franchisee/franchise_invoice_service_list_ajax',
        dataType: "html",
        success: function (result) {
            if (result != 0) {
                $('#collapse' + invoice_id).html(result);
            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }
        }
    });
}

function franchiseeinvoiceFilter() {
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'franchisee/franchisee_invoice_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//            console.log("Result: " + result); return false;
            $("#dashboard_result_div").html(result);
            $("[data-toggle=popover]").popover();
            $("#clear_filter").show();
            $('#btn_clear_filter').show();
            $('#FranchiseeFilterModal').modal('hide');
            display_franchisee_applied_filters();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function display_franchisee_applied_filters() {
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
    var archive = $("input[name='all_franchisee_invoices']:checked").val();
//    console.log(archive);
    dropdownArray = dropdownArray.filter(Boolean);
    if(archive != "all_franchisee_invoices"){
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

    $('#invoice_filted_data a.btn_remove_filter').each(function (index) {
        $(this).attr('data-random', removeAttArray[index].match(/\d+/)[0]);
    });
}

function franchiseeDashboardTrackingModal(invoice_id, status) {
    openModal('change_status_franchisee_div');
    var txt = 'Change Status of SubOrder id #' + invoice_id;
    $("#changeStatusinner .modal-title").html(txt);
    if (status == 1) {
        $("#change_status_franchisee_div #rad1").prop('checked', true);
        $("#change_status_franchisee_div #rad2").prop('checked', false);
        $("#change_status_franchisee_div #rad3").prop('checked', false);
        $("#change_status_franchisee_div #rad7").prop('checked', false);
    } else if (status == 2) {
        $("#change_status_franchisee_div #rad1").prop('checked', false);
        $("#change_status_franchisee_div #rad2").prop('checked', true);
        $("#change_status_franchisee_div #rad3").prop('checked', false);
        $("#change_status_franchisee_div #rad7").prop('checked', false);
    } else if (status == 3) {
        $("#change_status_franchisee_div #rad1").prop('checked', false);
        $("#change_status_franchisee_div #rad2").prop('checked', false);
        $("#change_status_franchisee_div #rad3").prop('checked', true);
        $("#change_status_franchisee_div #rad7").prop('checked', false);
    } else if (status == 7) {
        $("#change_status_franchisee_div #rad1").prop('checked', false);
        $("#change_status_franchisee_div #rad2").prop('checked', false);
        $("#change_status_franchisee_div #rad3").prop('checked', false);
        $("#change_status_franchisee_div #rad7").prop('checked', true);
    }
    $("#change_status_franchisee_div #current_status").val(status);
    $.get(base_url + "franchisee/get_tracking_log/" + invoice_id + "/franchise_invoice_details", function (data) {
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
            $("#log_modal").show();
        else
            $("#log_modal").hide();
    });
    $("#invoice_id").val(invoice_id);
}

function updateStatusfranchisee() {
    var status = $('#change_status_franchisee_div input:radio[name=radio]:checked').val();
    var invoice_id = $('#change_status_franchisee_div #invoice_id').val();
    var status_value = $('#change_status_franchisee_div input:radio[name=radio]:checked').parent().find('strong').html();
    var current_status = parseInt($("#change_status_franchisee_div #current_status").val());
    var status_class_array = [
        'label-danger',
        'label-success',
        'label-yellow',
        'label-primary'
    ];
    $.ajax({
        type: "POST",
        data: {
            status: status,
            invoice_id: invoice_id
        },
        url: base_url + 'franchisee/update_franchisee_status',
        dataType: "html",
        success: function (result) {
            if (result.trim() != 0) {
                $('.invoice-tracking-span-' + invoice_id + ' b').html(status_value);
                $('.invoice-tracking-span-' + invoice_id).removeClass(current_status === 7 ? status_class_array[0] : status_class_array[current_status]);
                $('.invoice-tracking-span-' + invoice_id).addClass(status === 7 ? status_class_array[0] : status_class_array[status]);
                $('.invoice-tracking-span-' + invoice_id).parent('a').attr('onclick', 'franchiseeDashboardTrackingModal(' + invoice_id + ',' + status + ');');
                $("#change_status_franchisee_div").modal('hide');
               // goURL(base_url + 'franchisee/franchise_dashboard');
            }
        }
    });
}
function add_franchisee_sos() {
    if (!requiredValidation('franchisee_sos_form')) {
        return false;
    }
    var formData = new FormData(document.getElementById('franchisee_sos_form'));
    var invoice_id = $("#franchisee_sos_form #invoice_id").val();
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
                var prevsoscount = $("#soscount-" + invoice_id).text();
                var soscount = parseInt(prevsoscount) + parseInt(1);
                $("#soscount-" + invoice_id).text(soscount);
                $("#soscount-" + invoice_id).removeClass('label label-primary').addClass('label label-danger');
                $("#soscount-" + invoice_id).html('<i class="fa fa-bell"></i>');
                //document.getElementById("sos_note_form").reset();
                var prevbymecount = $("#sos-byme").html();
                if (result == 0) {
                    var newbymecount = parseInt(prevbymecount) + 1;
                    $("#sos-byme").html(newbymecount);
                }
                $("#franchisee" + invoice_id).find(".priority").find('.m-t-5').remove();
                $("#franchisee" + invoice_id).find(".priority").append('<img src="' + base_url + '/assets/img/badge_sos_priority.png" class="m-t-5"/>');
                $('#showSos').modal('hide');
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
function FranchiseeinvoiceNoteModal(invoice_id , order_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'franchisee/franchisee_dashboard_note_ajax',
        data: {
            order_id: order_id,
            invoice_id: invoice_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            var resultHTML = '';
            if (result != '0') {
                var notes = JSON.parse(result);
                for (var i = 0; i < notes.length; i++) {
                    resultHTML += '<div class="form-group" id="note_div_' + order_id + '_' + notes[i].id + '">';
                    resultHTML += '<div class="note-textarea-' + order_id + '-' + notes[i].id + '">';
                    resultHTML += '<textarea class="form-control" name="edit_note[' + notes[i].id + ']" title="Notes">' + notes[i].notes + '</textarea>';
                    resultHTML += '</div>';
                    resultHTML += '<a href="javascript:void(0);"  onclick="deleteNote(\'note_div_' + order_id + '_' + notes[i].id + '\', ' + notes[i].id + ', 1);" class="text-danger"><i class="fa fa-times"></i> Remove Note</a>';
                    resultHTML += '</div>';
//                    resultHTML += '<div class="form-group"><div class="col-lg-12"><div class="note-textarea">';
//                    resultHTML += '<textarea readonly="readonly" style="resize: none;" class="form-control" title="Invoice Service Note">' + notes[i].note + '</textarea>';
//                    resultHTML += '</div></div></div>';
                }
            }
            resultHTML += '<div class="form-group">';
            resultHTML += '<div class="note-textarea-' + order_id + '">';
            resultHTML += '<textarea class="form-control" name="note[]" title="Note"></textarea>';
            resultHTML += '</div>';
            resultHTML += '<a href="javascript:void(0)" id="note_link_' + order_id + '" onclick="addNote(' + order_id + ', \'n\');" class="text-success note-add-link"><i class="fa fa-plus"></i> Add Note</a>';
            resultHTML += '</div>';
            $('#showNotes input#order_id').val(order_id);
            $('#showNotes input#invoice_id').val(invoice_id);
            $('#showNotes div.modal-body').html(resultHTML);
            $('#showNotes').modal({
                backdrop: 'static',
                keyboard: false
            });
        }
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
function saveFranchiseeInvoiceNotes() {
    var formData = new FormData(document.getElementById('franchisee_modal_note_form'));
    var order_id = $('#showNotes input#order_id').val();
    var invoice_id = $('#showNotes input#invoice_id').val();
    $.ajax({
        type: 'POST',
        url: base_url + 'franchisee/save_franchisee_invoice_note',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            swal({title: "Success!", text: "Successfully Saved!", type: "success"}, function () {
                $(".note-count-" + invoice_id + '-' + order_id).html(result);
                $('#showNotes').modal('hide');
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

function saveFranchiseePayment()
{
    if (!requiredValidation('form_save_franchisee_payment')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_save_franchisee_payment'));
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
        url: base_url + 'franchisee/save_franchisee_payment',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result == 1) {
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'franchisee/payment/' + btoa(invoice_id));
            } else if (result == 0) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else {
                swal("ERROR!", result, "error");
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

function saveFranchiseeRefund(){
    if (!requiredValidation('form_save_franchisee_payment')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_save_franchisee_payment'));
    var pay_amount = parseFloat(document.getElementById('payment_amount').value);
    var refund_amount = parseFloat(document.getElementById('payble_amount').value);
    if (pay_amount > refund_amount) {
        swal("ERROR!", "Refund amount can't exceed the payble amount", "error");
        return false;
    }
    var invoice_id = $("#invoice_id").val();
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'franchisee/save_franchisee_refund',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result != 0) {
                swal("Success!", "Successfully Payment Refunded!", "success");
                goURL(base_url + 'franchisee/payment/' + btoa(invoice_id));
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

function cancelFranchiseePayment(payment_id, invoice_id) {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                data: {
                    payment_id: payment_id,
                },
                url: base_url + 'franchisee/cancel_franchisee_payment',
                cache: false,
                success: function (result) {
                    if (result != 0) {
                        swal("Success!", "Successfully Payment Canceled!", "success");
                        goURL(base_url + 'franchisee/payment/' + btoa(invoice_id));
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

function FranchiseePaymentDashboardNoteModal(payment_id) {
    var resultHTML = '<div class="form-group"><div class="col-lg-12"><div class="note-textarea">';
    resultHTML += '<textarea readonly="readonly" style="resize: none;" class="form-control" title="Service Note">' + $("#note_hidden_" + payment_id).val() + '</textarea>';
    resultHTML += '</div></div></div>';
    $('#note-body').html(resultHTML);
    $('#showFranchiseePaymentNotes').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function printFranchiseeOrder() {
    var doPrint = window.open();
    var printHtml = '<style type="text/css">body {background: #fff !important;} *{ font-size: 13px;}</style>';
    printHtml = printHtml + $('.franchise_order_summary').html();
    doPrint.document.write(printHtml);
    doPrint.print();
    doPrint.close();
}

function change_franchise_invoice_pattern(val){
    if (val == 'monthly') {
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" class="m-r-5" name="recurrence[due_type]" checked="" value="1" id="due_on_day"> New invoice on day</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day"><label class="control-label m-r-5">of every</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_month]" min="1" max="12" value="1" style="width: 100px" id="r_month">&nbsp;<label class="control-label" id="control-label">month(s)</label>');
    } else if (val == 'weekly') {
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day">New invoice every</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day">&nbsp;week(s) on the following days:&nbsp;<div class="m-t-10"><div class="m-b-10"><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="1" checked="" class="m-r-5">&nbsp;Sunday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="2" class="m-r-5">&nbsp;Monday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="3" class="m-r-5">&nbsp;Tuesday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="4" class="m-r-5">&nbsp;Wednesday&nbsp;</span></div><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="5" class="m-r-5">&nbsp;Thursday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="6" class="m-r-5">&nbsp;Friday&nbsp;</span><span class="m-r-20"><input type="radio" name="recurrence[due_month]" value="7" class="m-r-5">&nbsp;Saturday</span></div>');
    } else if (val == 'quarterly') {
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day"> New invoice on day</label>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" value="1" style="width: 100px" id="r_day"><label class="control-label m-r-5">of</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]"><option value="1">First</option><option value="2">Second</option><option value="3">Third</option></select>&nbsp;<label class="control-label m-r-5" id="control-label">month in quarter</label>');
    } else if (val == 'annually') {
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day" class="m-r-5"> New invoice every</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]" value="1"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" style="width: 100px" id="r_day" value="1">');
    } else {
        $(".due-div").html('<label class="control-label m-r-5"><input type="radio" name="recurrence[due_type]" checked="" value="1" id="due_on_day" class="m-r-5"> Due on every</label>&nbsp;<select class="form-control m-r-5" id="r_month" name="recurrence[due_month]"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>&nbsp;<input class="form-control m-r-5" type="number" name="recurrence[due_day]" min="1" max="31" style="width: 100px" id="r_day">');
    }
}

function placeFranchiseOrder(invoice_id, emails) {
    $.ajax({
        type: "POST",
        data: {
            invoice_id: invoice_id,
            emails: emails
        },
        url: base_url + 'modal/show_franchise_invoice_email_modal',
        dataType: "html",
        success: function (result) {
            $('#franchisee_invoice_emailsending').show();
            $("#franchisee_invoice_emailsending").html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
            if (emails == ''){
                $('#row_div').hide();
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

function sendFranchiseeInvoiceEmail() {
    if (!requiredValidation('franchisee_invoice_email_form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('franchisee_invoice_email_form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'franchisee/franchise_export',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result != 0) {
                swal("Well Done!", "Your email has been sent successfully!", "success");
                $('#franchisee_invoice_emailsending').modal('hide');
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

function create_royalty_fee_invoice_modal() {
    var ofc = $("#ofc").val();
    var report_range = $("#reportrange").val();
    var fee_without_cost = $("#fee_without_cost").val();
    // alert(fee_without_cost);
    if (ofc != null && ofc.length > 1) {
        swal("Select Only One Office!", "Please Select Only One office to create Invoice", "warning");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/royalty_fee_invoice_modal',
        data: { ofc: ofc,reportrange: report_range,fee_without_cost:fee_without_cost },
        cache: false,
        success: function (result) {
            $('#royalty-franchise-invoice-modal').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
function get_franchise_invoice_royalty_fee(office = '', franchise_year='',franchise_month='') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/franchise_invoice_royalty_fee',
        data: { 'ofc': office, 'franchise_year': franchise_year,'franchise_month':franchise_month },
        success: function (result) {
           //  console.log(result); return false;
            $("#retail_amount").val(result);
        },
    });
}

function create_franchise_invoice_for_royalty_fee() {
    if (!requiredValidation('royalty-franchise-invoice-form')) {
        return false;
    }
    var retail_price = $("#retail_amount").val();
    // alert(retail_price);return false;
    if (retail_price == 0) {
        swal("Unable to Create!", "Retail Price Cannot be Zero", "warning");
        return false;
    }
    var form_data = new FormData(document.getElementById('royalty-franchise-invoice-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        processData: false,
        contentType: false,
        url: base_url + 'franchisee/add_franchisee_invoice',
        dataType: "html",
        success: function (result) {
            if (result == 1) {
                swal({
                    title: "Success!",
                    "text": "Successfully added!",
                    "type": "success"
                }, function () {
                    $('#royalty-franchise-invoice-modal').modal('hide');
                    window.open(base_url + 'franchisee/franchise_dashboard', '_blank');
                    // goURL(base_url + 'franchisee/franchise_dashboard');
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
function franchisee_dashboard_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('franchisee_dashboard-filter-display-div'));
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
            let active_element = filter_name.split("[")[0];
            if (formElement[1] != '') {
                let id_val = $('[name="' + active_element + '[]"]').attr('id');
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
            url: base_url + 'franchisee/franchisee_sorting_filter_modal',
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
                let current_made_id = id_val + '-val';
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
    }
}
function load_filter_franchise_billing_dashboard(page_numbers = '', is_clear = '', current_clear_element = '',sort_type='', sort_val='') {
    if (is_clear != '') {
        var clear_element = current_clear_element.id;
        let removavle_element = $("#filter-field-variable").val();
        $("#" + removavle_element).val('').trigger('chosen:updated');
        $("#" + clear_element).hide();
    }
    $("#franchisee_btn_clear_filter").show();


    var form_data = new FormData(document.getElementById('franchisee_dashboard-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
        if (a == 'invoice') {
            var id = 'invoice-val';
            if (is_clear == '') {
                $("#invoice-clear_filter").show();
            }
        }
        if (a == 'office_id') {
            var id = 'office_id-val';
            if (is_clear == '') {
                $("#office_id-clear_filter").show();
            }
        }
        if (a == 'creation_date') {
            var id = 'creation_date';
            if (is_clear == '') {
                $("#creation_date-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'tracking-val';
            if (is_clear == '') {
                $("#tracking-clear_filter").show();
            }
        }
        if (a == 'activity_name') {
            var id = 'activity_name-val';
            if (is_clear == '') {
                $("#activity_name-clear_filter").show();
            }
        }
        if (a == 'period') {
            var id = 'period-val';
            if (is_clear == '') {
                $("#period-clear_filter").show();
            }
            $("#" + id).removeClass('btn-success').addClass('btn-primary');
        }
        if (a == 'amount') {
            var id = 'amount-val';
            if (is_clear == '') {
                $("#amount-clear_filter").show();
            }
        }
        if (a == 'payment_status') {
            var id = 'payment_status-val';
            if (is_clear == '') {
                $("#payment_status-clear_filter").show();
            }
        }
    }
    var invoice = $('#invoice').val();
    var office_id = $('#office_id').val();
    var creation_date = $('#creation_date').val();
    var tracking = $('#tracking').val();
    var activity_name = $('#activity_name').val();
    var period = $('#period').val();
    var period_month = $('#period_month').val();
    var final_period = period+"-"+period_month;
    var amount = $('#amount').val();
    var payment_status = $('#payment_status').val();


    load_franchise_billing_dashboard(invoice,office_id,creation_date,tracking,activity_name,final_period,amount,payment_status,sort_type,sort_val);
    load_franchisee_dashboard_summary_box(invoice,office_id,creation_date,tracking,activity_name,final_period,amount,payment_status);    
}
function load_franchisee_dashboard_summary_box(invoice='',office_id='',creation_date='',tracking='',activity_name='',final_period='',amount='',payment_status=''){
    $.ajax({
        type: "POST",
        data:{
            'invoice':invoice,
            'office_id':office_id,
            'creation_date':creation_date,
            'tracking':tracking,
            'activity_name':activity_name,
            'period':final_period,
            'amount':amount,
            'payment_status':payment_status
        },
        url: base_url + 'franchisee/load_franchisee_dashboard_summary_box',
        success: function (result) {
            $("#ajax_summary_box").html(result);

        }


    });
}