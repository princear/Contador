var base_url = document.getElementById('base_url').value;
$(function () {
    $(".datepicker_my").datepicker({format: 'mm/yyyy', autoHide: true});
    $(".datepicker_mdy").datepicker({format: 'mm/dd/yyyy', autoHide: true});
    $(".datepicker_my, .datepicker_mdy").attr("onblur", 'checkDate(this);');
});

function go(url) {
    window.location.href = base_url + url;
}
function go_url(url) {
    // window.location.href = base_url + url;
    window.open(base_url + url,'_blank');    
}
function getIdVal(element_id) {
    return document.getElementById(element_id).value;
}

function setIdVal(element_id, element_value) {
    document.getElementById(element_id).value = element_value;
}

function setIdHTML(element_id, element_value) {
    document.getElementById(element_id).innerHTML = element_value;
}

function show_loader_inside_elem(elem) {
    var getText = $(elem).text();
    $(elem).html('<i class="fa fa-refresh fa-spin fa-fw"></i> Loading...');
    $(document).ajaxComplete(function () {
        $(elem).html(getText);
    });
}


function requiredValidation(form_id) {
    console.log('tst: '+form_id);
    var form = document.getElementById(form_id);
    var error = false;
    // return false;
    // $('#'+form_id).find( 'select, textarea, input' ).each(function(){
    //     if(!$(this).prop('required')){
    //         console.log(this);
    //         console.log('Not Required Field');        
    //     } else { //required field
    //         console.log(this);
    //         console.log(this.value);
    //     }
    // });

    for (var i = 0; i < form.elements.length; i++) {
        var msg = "";
        if (form.elements[i].hasAttribute('required')) {
            if (form.elements[i].hasAttribute("type")) {
                if (form.elements[i].type == "radio") {
                    var cnt = 0;
                    var rad = document.getElementsByName(form.elements[i].name);
                   // alert(rad.length);
                    for (r = 0; r < rad.length; r++) {
                        if (rad[r].checked) {
                            cnt++;
                        }
                    }
                    if (cnt == 0) {
                        error = true;
                        msg = form.elements[i].title + ' Is Required';
                    }
                } else if (form.elements[i].type == "checkbox") {
                    if (form.elements[i].hasAttribute("multi")) {
                        if (!$('.checkclass:checkbox:checked').length > 0) {
                            error = true;
                            msg = form.elements[i].title + ' Is Required';
                        } else {
                            error = false;
                            msg = '';
                        }
                    } else {
                        var rad = document.getElementsByName(form.elements[i].name);
                        if (rad[0].value == form.elements[i].value) {
                            var radValue = $('input[name="' + form.elements[i].name + '"]:checked').val();
                            if (radValue == undefined) {
                                error = true;
                                msg = form.elements[i].title + ' Is Required';
                            }
                        }
                    }
                } else if (form.elements[i].type == "email") {
                    // var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    var email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                    var email_valid = email_reg.test(form.elements[i].value);
                    if (form.elements[i].value === '') {
                        error = true;
                        msg = form.elements[i].title + ' Is Required';
                    } else if (email_valid == false) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    }

                } else if (form.elements[i].type == "file") {
                    if (form.elements[i].files.length == 0) {
                        error = true;
                        msg = form.elements[i].title + ' is required';
                    } else if (form.elements[i].hasAttribute('allowed_types')) {
                        var field_val = form.elements[i].value;
                        var ext = field_val.split('.').pop().toLowerCase();
                        var allowed_types = $("#" + form.elements[i].id).attr('allowed_types');
                        if (field_val != '' && $.inArray(ext, allowed_types.split("|")) == -1) {
                            error = true;
                            msg = form.elements[i].title + ' Extension Is Invalid';
                        }
                    }
                } else if (form.elements[i].hasAttribute("phoneval")) {
                    var regex = /[0-9\-\(\)\s]+/;
                    var ph_valid = regex.test(form.elements[i].value);
                    if (form.elements[i].value === '') {
                        error = true;
                        msg = form.elements[i].title + ' Is Required';
                    } else
                    if (ph_valid == false) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    }
                } else if (form.elements[i].hasAttribute("zipval")) {
                    if (form.elements[i].value === '') {
                        error = true;
                        msg = form.elements[i].title + ' Is Required';
                    } else
                    if (isNaN(form.elements[i].value)) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    }
                } else if (form.elements[i].hasAttribute("numeric_valid")) {
                    if (form.elements[i].value === '') {
                        error = true;
                        msg = form.elements[i].title + ' Is Required';
                    } else
                    if (isNaN(form.elements[i].value)) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    }
                } else if (form.elements[i].hasAttribute("passval")) {
                    if (form.elements[i].value.length < 6) {
                        error = true;
                        msg = form.elements[i].title + ' Minimum 6 Characters';
                    }
                }else if (form.elements[i].hasAttribute("bankval")) {
                    if (form.elements[i].value.length < 4) {
                        error = true;
                        msg = form.elements[i].title + ' Minimum 4 Characters';
                    }else
                    if (isNaN(form.elements[i].value)) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    }
                }
                else if (form.elements[i].hasAttribute("nameval")) {
                    var regexname = /^[a-zA-Z0-9_ ]*$/;
                    if (form.elements[i].value === '') {
                        error = true;
                        msg = form.elements[i].title + ' Is Required';
                    } else {
                        if (!isNaN(form.elements[i].value)) {
                            error = true;
                            msg = form.elements[i].title + ' Not Valid';
                        } else
                        if (!form.elements[i].value.match(regexname)) {
                            error = true;
                            msg = form.elements[i].title + ' Not Valid';
                        }
                    }
                } else if (form.elements[i].hasAttribute("commaval")) {
                    var regexname = /,/;
                    if (form.elements[i].value === '') {
                        error = true;
                        msg = form.elements[i].title + ' Is Required';
                    } else {
                        if (form.elements[i].value.match(regexname)) {
                            error = true;
                            msg = form.elements[i].title + ' Not Valid';
                        }
                    }
                } else {
                    if (form.elements[i].value === '') {
                        error = true;
                        msg = form.elements[i].title + ' Is Required';
                    }
                }
            } else {
                if (form.elements[i].value === '') {
                    error = true;
                    msg = form.elements[i].title + ' Is Required';
                }
            }
        } else {
            if (form.elements[i].type == "file") {
                if (form.elements[i].files.length != 0 && form.elements[i].hasAttribute('allowed_types')) {
                    var field_val = form.elements[i].value;
                    var ext = field_val.split('.').pop().toLowerCase();
                    var allowed_types = $("#" + form.elements[i].id).attr('allowed_types');
                    if (field_val != '' && $.inArray(ext, allowed_types.split("|")) == -1) {
                        error = true;
                        msg = form.elements[i].title + ' Extension Is Invalid';
                    }
                }
            } else if (form.elements[i].hasAttribute("phoneval")) {
                var regex = /[0-9\-\(\)\s]+/;
                var ph_valid = regex.test(form.elements[i].value);
                if (form.elements[i].value != '') {
                    if (ph_valid == false) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    }
                }

            } else if (form.elements[i].hasAttribute("zipval")) {
                if (form.elements[i].value != '') {
                    if (isNaN(form.elements[i].value)) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    }
                }
            } else if (form.elements[i].hasAttribute("numeric_valid")) {
                if (form.elements[i].value != '') {
                    if (isNaN(form.elements[i].value)) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    }
                }
            } else if (form.elements[i].hasAttribute("passval")) {
                if (form.elements[i].value != '') {
                    if (form.elements[i].value.length < 6) {
                        error = true;
                        msg = form.elements[i].title + ' Minimum 6 Characters';
                    }
                }
            } else if (form.elements[i].hasAttribute("nameval")) {
                var regexname = /^[a-zA-Z0-9_ ]*$/;
                if (form.elements[i].value != '') {
                    if (!isNaN(form.elements[i].value)) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    } else
                    if (!form.elements[i].value.match(regexname)) {
                        error = true;
                        msg = form.elements[i].title + ' Not Valid';
                    }
                }
            }
        }
        if (form.elements[i].type == "radio") {
            var element_id = form.elements[i].name + '_error';
            element_id = element_id.replace('[]', '');
            if (msg != "") {
                $("#" + element_id).html(msg);
            } else {
                $("#" + element_id).html('');
            }
        } else {
            if (form.elements[i].hasAttribute("multi")) {
                if (msg != "") {
                    $(".checkbox-inline").next('div.errorMessage').html(msg);
                } else {
                    $(".checkbox-inline").next('div.errorMessage').html('');
                }
            } else if (form.elements[i].hasAttribute("clock")) {
                if (msg != "") {
                    $("#" + form.elements[i].id).parent().next('div.errorMessage').html(msg);
                } else {
                    $("#" + form.elements[i].id).parent().next('div.errorMessage').html('');
                }
            } else {
                if (msg != "") {
                    $("#" + form.elements[i].id).next('div.errorMessage').html(msg);
                    /*adding exception*/
                    if (form_id == 'form_create_invoice') {
                        if ($("#" + form.elements[i].id).html() != '') {
                            $("#" + form.elements[i].id).next('div.errorMessagePeriod').html(msg);
                        }
                    }
                } else {
                    $("#" + form.elements[i].id).next('div.errorMessage').html('');
                }
            }
        }
    }
    if (error) {
        return false;
    } else {
        return true;
    }
}

function doUpload(form_id, file_name, callback) {
    var form_data = new FormData(document.getElementById(form_id));
    form_data.append('file_name', file_name);
    $.ajax({
        type: 'POST',
        url: base_url + 'home/upload_file',
        data: form_data,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            var obj = $.parseJSON(result);
            callback(obj);
        }
    });
}

function printErrorMessage(field_id, msg) {
    $("#" + field_id).next('div.errorMessage').html(msg);
}
function clearErrorMessageDiv() {
    $("div.errorMessage").html("");
}

function openLoading() {
    $('.loader-mini').show();
}

function closeLoading() {
    $('.loader-mini').hide();
}

$(document).ready(function () {
    $('.add-note').click(function () {
        var textnote = $(this).prev('.note-textarea').html();
        var note_label = $(this).parent().parent().find("label").html();
        var div_count = Math.floor((Math.random() * 999) + 1);
        var newHtml = '<div class="form-group" id="note_div' + div_count + '"> ' +
                '<label class="col-lg-2 control-label"></label>' +
                '<div class="col-lg-10">' +
                textnote +
                '<a href="javascript:void(0)" onclick="removeNote(\'note_div' + div_count + '\')" class="text-danger"><i class="fa fa-times"></i> Remove Note</a>' +
                '</div>' +
                '</div>';
        $(newHtml).insertAfter($(this).closest('.form-group'));
    });
});
function removeNote(divID) {
    $("#" + divID).remove();
}
function deleteNote(divID, noteID, relatedTableID) {
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

function setReferenceId(existing_reference_id, new_reference_id) {
//    var reference_id = new_reference_id;
    var reference = $("#reference").val();
//    var service_id = $("#service_id").val();
//    if (existing_reference_id != '') {
//        reference_id = existing_reference_id;
//    }
//    $("#reference_id").val(reference_id);
//    $("#add_contact_btn").attr('onclick', 'contact_modal("add", "' + reference + '", ' + reference_id + '); return false;');
//    $("#add_owner_btn").attr('onclick', 'open_owner_popup(' + service_id + ',' + reference_id + ' 0); return false;');
//    $("#add_document_btn").attr('onclick', 'document_modal("add", "' + reference + '", ' + reference_id + '); return false;');
}
function checkDate(dateElement) {
    var testdate;
    var dateValue = dateElement.value;
    var dateId = dateElement.id;
    if (dateValue.length == 7) {
        var filter = new RegExp("(0[123456789]|10|11|12)([/])([1-2][0-9][0-9][0-9])");
        if (filter.test(dateValue)) {
            $("#" + dateId).next('div.errorMessage').html('');
        } else {
            $("#" + dateId).next('div.errorMessage').html('Date is not valid.  Format must be MM/DD/YYYY');
            return false;
        }
    } else {
        try {
            testdate = $.datepicker.parseDate('mm/dd/yy', dateValue);
            $("#" + dateId).next('div.errorMessage').html('');
        } catch (e) {
            $("#" + dateId).next('div.errorMessage').html('Date is not valid.  Format must be MM/DD/YYYY');
            return false;
        }
    }

}

function loadDdlOptionsAjax(action, selected = '', serviceID = null) {
    $.ajax({
        type: 'POST',
        url: base_url + 'home/load_ddl_option_ajax',
        data: {
            action: action,
            selected: selected,
            service_id: serviceID
        },
        dataType: 'html',
        success: function (result) {
            $('.' + action).html(result);
            if (action == 'get_select_service') {
                $('.' + action).trigger("chosen:updated");
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

function change_profile_picture(that) {
    readURL(that);
    $('#fileuploadmodal').modal({
        backdrop: 'static',
        keyboard: false
    });
}


function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(".image-wrapper").html('');
            $(".image-wrapper").append('<img src="' + e.target.result + '" id="image-preview" class="img-responsive"/>');

            var $image = $('#image-preview'),
                    $update = $('#logo-submit'),
                    inputs = {
                        x: $('#x'),
                        y: $('#y'),
                        width: $('#width'),
                        height: $('#height')
                    },
                    fill = function () {
                        var values = $image.rcrop('getValues');
                        for (var coord in inputs) {
                            inputs[coord].val(values[coord]);
                        }
                    };

            // Initilize
            $image.rcrop({grid: true, preserveAspectRatio: true});

            // Fill inputs when Responsive Cropper is ready and when crop area is being resized or dragged 
            $image.on('rcrop-changed rcrop-ready', fill);

            // Call resize method when button is clicked. And then fill inputs to fix invalid values.
            $update.click(function () {
                $image.rcrop('resize', inputs.width.val(), inputs.height.val(), inputs.x.val(), inputs.y.val());
                fill();
            });

        }

        reader.readAsDataURL(input.files[0]);
    }
}

function uploadcropperimg() {
    var x = $('#x').val();
    var y = $('#y').val();
    var width = $('#width').val();
    var height = $('#height').val();
    if (x == "" || y == "" || width == "" || height == "") {
        alert("Please Make a Selection First");
        return false;
    }
    var formData = new FormData($('#school-logo-form')[0]);
    $.ajax({
        type: 'POST',
        url: base_url + "upload_cropped_logo.php",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            $.ajax({
                type: 'POST',
                url: base_url + 'home/change_profile_picture',
                data: {imgurl: result.trim()},
                dataType: "html",
                success: function (data) {
                    if (data.trim() == "-1") {
                        swal("ERROR!", "Unable To Change Profile Picture", "error");
                    } else {
                        var fullpath = base_url + 'uploads/' + data.trim();
                        $('#profilepicturefield').css('background', 'url(' + fullpath + ')');
                        $(".image-wrapper").html('');
                        $("#school-logo").val('');
                        $('#fileuploadmodal').modal('toggle');
                        swal({
                            title: "Success!",
                            text: "Profile Picture Successfully Changed!",
                            type: "success"
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
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function jumpDiv() {
    var url = window.location.href;
    var splitURL = url.split("#");
    if (splitURL.length === 2) {
        var divID = splitURL[1];
        if ($("#" + divID)) {
            $('html, body').animate({
                scrollTop: $("#" + divID).offset().top
            }, 1000);
        }
    }
}

var allAjaxRequest = [];
function loadHomeDashboard(section, staffID, officeID, departmentID, leadTypeID, limit = '10', start = '', refresh = '', is_clear = '', requestType = '', pageNumber = 0) {

    var start_val;
    if (refresh != '') {
        start_val = '0';
        start = '';
    } else {
        start_val = $('#start_val').val();
    }

//    alert(pageNumber);
    if (section == 'stop') {
        allAjaxRequest.forEach(function (ajaxRequest) {
            ajaxRequest.abort();
//            console.log(ajaxRequest);
        });
        return false;
    }
    var iboxSectionId = section.split(',');
    iboxSectionId.forEach(function (element) {
        $('#widget_' + element).addClass('loading');
        $('.' + element + '-section').html('<div class="text-center"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
    });

    var data = {
        section: section,
        staff_id: staffID,
        office_id: officeID,
        department_id: departmentID,
        lead_type_id: leadTypeID
    };

    if (section == 'news_update') {
        data = {
            section: section,
            staff_id: staffID,
            office_id: officeID,
            department_id: departmentID,
            lead_type_id: leadTypeID,
            limit: limit,
            is_clear: is_clear
        };
    }
    if (section == 'notification') {
        data = {
            section: section,
            staff_id: staffID,
            office_id: officeID,
            department_id: departmentID,
            lead_type_id: leadTypeID,
            start: start,
            start_val: start_val,
            request_type: requestType,
            page_number: pageNumber
        };
    }
    $("#load_more").remove();
    var thisAjaxRequest = $.ajax({
        type: "POST",

        data: data,

        url: base_url + 'home/home_dashboard_ajax',
        dataType: "html",
        success: function (result) {
            var jsonData = JSON.parse(result);
            var sectionData = jsonData.section;
            sectionData.forEach(function (data, index) {
                if (jsonData.section_index[index] == 'notification') {
                    if (refresh != '') {
                        $('.' + jsonData.section_index[index] + '-list-section').html(data);
                        $('#widget_' + jsonData.section_index[index]).removeClass('loading');
                    } else {
                        if (requestType != '' && start == '') {
                            $('.' + jsonData.section_index[index] + '-list-section').html(data);
                            $('#widget_' + jsonData.section_index[index]).removeClass('loading');
                        } else {
                            $('.' + jsonData.section_index[index] + '-list-section').append(data);
                            $('#widget_' + jsonData.section_index[index]).removeClass('loading');
                        }
                    }
                } else {
                    $('.' + jsonData.section_index[index] + '-section').html(data);
                    $('#widget_' + jsonData.section_index[index]).removeClass('loading');
                }
            });
        }
    });
    thisAjaxRequest;
    allAjaxRequest.push(thisAjaxRequest);
}

function readNotification(notificationID) {
    $.ajax({
        type: 'POST',
        url: base_url + 'home/read_notification',
        data: {
            notification_id: notificationID
        },
        success: function (result) {
//            alert(result);return false;
            if (parseInt(result.trim()) != 0) {
//                $('.notification-count-label').html(parseInt($('.notification-count-label').html().trim()) - 1);
                if ($("#notification-action-button").length == 0) {
                    return true;
                } else {
                    $("#notification-action-button").html('Notifications <span class="label label-success label-byme">' + (parseInt($('#notification-action-button').html().trim()) - 1) + '</span>');
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

var load_row = 1;
$(document).on('click', '#news_view_more_link', function () {
    load_row++;
    var mod_row = load_row * 10;
    var user_id = $('#user_id').val();
    loadHomeDashboard('news_update', user_id, '', '', '', mod_row);
});

function clearSOSList(userid) {
    swal({
                title: "Are you sure want to delete?",
                // text: "Your will not be able to recover SOS notification!",
                text: "ARE YOU SURE YOU WANT TO CLEAR ALL SOS MESSAGES FROM NOTIFICATIONS ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
                    function () {
                            $.ajax({
                                type: 'POST',
                                url: base_url + 'home/clear_sos_list',
                                data: {
                                    userid: userid
                                },
                                success: function (result) {
                                    if (result) {
                                        swal({
                                        title: "Success!",
                                        "text": "SOS been deleted successfully!",
                                        "type": "success"
                                        }, function () {
                                        $('.sos-section').hide();
                                        $(".clear-sos").html("<span class='text-danger'>Notification Not Found</span>");
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
              });
}
function clearNotificationList(userid) {
    swal({
                title: "Are you sure want to delete?",
                text: "Your will not be able to recover notification!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
   function () {
    $.ajax({
        type: 'POST',
        url: base_url + 'home/clear_notification_list',
        data: {
            userid: userid
        },
        success: function (result) {
            if (result) {
                swal({
                        title: "Success!",
                        "text": "Notification been deleted successfully!",
                        "type": "success"
                    }, function () {
                $('.notification-list-section').hide();
                $(".clear-notification").html("<span class='text-danger'>Notification Not Found</span>");
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
    });
}

function GetCardType(number) {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "American Express";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
}

var clearFilter = function () {
    $(".variable-dropdown").val('');
    $(".condition-dropdown").val('').removeAttr('disabled');
    $(".criteria-dropdown").val('');
    $('.criteria-dropdown').removeAttr('readonly').empty().append('<option value="">All Criteria</option>');
    $(".criteria-dropdown").trigger("chosen:updated");
    $('form#filter-form').children('div.filter-inner').children('div.filter-div').not(':first').remove();
    $('#btn_clear_filter').css('display', 'none');
}

var allAjaxRequest = [];
function loadHomeDashboard_2(section, staffID, officeID, departmentID, leadTypeID, limit = '10', start = '', refresh = '', is_clear = '', requestType = '', pageNumber = 0,project_category='' , type= '' , filter_data = '', my_or_all='') {

    var start_val;
    if (refresh != '') {
        start_val = '0';
        start = '';
    } else {
        start_val = $('#start_val').val();
    }

//    alert(pageNumber);
    if (section == 'stop') {
        allAjaxRequest.forEach(function (ajaxRequest) {
            ajaxRequest.abort();
//            console.log(ajaxRequest);
        });
        return false;
    }
    var iboxSectionId = section.split(',');
    iboxSectionId.forEach(function (element) {
        $('#widget_' + element).addClass('loading');
        $('.' + element + '-section').html('<div class="text-center"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
    });

    var data = {
        section: section,
        staff_id: staffID,
        office_id: officeID,
        department_id: departmentID,
        lead_type_id: leadTypeID,
        filter_data: filter_data,
        type: type
    };
    if (section == 'project2') {
        data = {
            section: section,
            staff_id: staffID,
            office_id: officeID,
            department_id: departmentID,
            lead_type_id: leadTypeID,
            project_category:project_category,
            type: type,
            my_or_all: my_or_all
        };
    }
    if (section == 'task2') {
        data = {
            section: section,
            staff_id: staffID,
            office_id: officeID,
            department_id: departmentID,
            lead_type_id: leadTypeID,
            project_category:project_category,
            type: type
        };
    }
    if (section == 'news_update') {
        data = {
            section: section,
            staff_id: staffID,
            office_id: officeID,
            department_id: departmentID,
            lead_type_id: leadTypeID,
            limit: limit,
            is_clear: is_clear
        };
    }
    if (section == 'notification') {
        data = {
            section: section,
            staff_id: staffID,
            office_id: officeID,
            department_id: departmentID,
            lead_type_id: leadTypeID,
            start: start,
            start_val: start_val,
            request_type: requestType,
            page_number: pageNumber
        };
    }
    $("#load_more").remove();
    var thisAjaxRequest = $.ajax({
        type: "POST",
        data: data,
        url: base_url + 'home/home_dashboard_ajax_2',
        dataType: "html",
        success: function (result) {
            var jsonData = JSON.parse(result);
            var sectionData = jsonData.section;
            sectionData.forEach(function (data, index) {
                if (jsonData.section_index[index] == 'notification') {
                    if (refresh != '') {
                        $('.' + jsonData.section_index[index] + '-list-section').html(data);
                        $('#widget_' + jsonData.section_index[index]).removeClass('loading');
                    } else {
                        if (requestType != '' && start == '') {
                            $('.' + jsonData.section_index[index] + '-list-section').html(data);
                            $('#widget_' + jsonData.section_index[index]).removeClass('loading');
                        } else {
                            $('.' + jsonData.section_index[index] + '-list-section').append(data);
                            $('#widget_' + jsonData.section_index[index]).removeClass('loading');
                        }
                    }
                } else {
                    $('.' + jsonData.section_index[index] + '-section').html(data);
                    $('#widget_' + jsonData.section_index[index]).removeClass('loading');
                }
            });
        }
    });
    thisAjaxRequest;
    allAjaxRequest.push(thisAjaxRequest);
}
function goto_project_dashboards(query,category){ 
//    var category = $('#cat').val();
    var statusArray = category.split('-');
//    reflactProjectFilterWithCategory(category, '');
    go('Project/index/' + category + '/' + statusArray[0] + '/n' + '/n' + '/n' + '/n' + '/'+ query);
}
function goto_task_dashboards(query,category){ 
//    var category = $('#cat').val();
    var statusArray = category.split('-');
//    reflactProjectFilterWithCategory(category, '');
    go('Task/index/' + category + '/' + statusArray[0] + '/n' + '/n' + '/n' + '/n'+ '/n'+ '/n' +'/'+query);
}
function generate_recurrence_manually() {
    swal({
        title: "Are you sure want to Generate Recurrence?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        closeOnConfirm: false
        },
            function () {
                swal.close();
                go_url('billing/Home/generate_recurring_invoice_manually');
            });
}

function open_add_new_client_modal() {
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/open_add_new_client_modal',
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#new_client_modal').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
function load_dashboard_update_section(day=''){
	$.ajax({
        type: 'POST',
        url: base_url + 'home/get_dashboard_update_section',
        data: {
			day: day
        },
        dataType: 'html',
        success: function (result) {
            $('#dashboard_update_section').html(result);
        }
    });
}
function load_tax_deadline_data(day=''){
    $.ajax({
        type: 'POST',
        url: base_url + 'home/load_tax_deadline_data',
        data: {
            day: day
        },
        dataType: 'html',
        success: function (result) {
            $('#taxdeadline_div').html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function load_message_data(day=''){
    $.ajax({
        type: 'POST',
        url: base_url + 'home/load_message_data',
        data: {
            day: day
        },
        dataType: 'html',
        success: function (result) {
            $('#message_div').html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function load_holiday_data(day=''){
    $.ajax({
        type: 'POST',
        url: base_url + 'home/load_holiday_data',
        data: {
            day: day
        },
        dataType: 'html',
        success: function (result) {
            $('#holiday_div').html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function load_events_data(day=''){
    $.ajax({
        type: 'POST',
        url: base_url + 'home/load_events_data',
        data: {
            day: day
        },
        dataType: 'html',
        success: function (result) {
            $('#events_div').html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

