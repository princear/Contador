var base_url = document.getElementById('base_url').value;

function add_lead_type() {
    if (!requiredValidation('add-lead-type-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-lead-type-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/Lead_type/add_lead_category',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Lead Type Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'lead_management/lead_type/lead_setup/lead_type');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Lead Type", "error");
            } else {
                swal("ERROR!", "Lead Type Already Exists", "error");
            }
        }
    });

}

function add_lead_type_partner() {
    if (!requiredValidation('add-lead-type-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-lead-type-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/Lead_type/add_lead_type_partner',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Lead Type Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'lead_management/lead_type');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Lead Type", "error");
            } else {
                swal("ERROR!", "Lead Type Already Exists", "error");
            }
        }
    });

}

function edit_lead_type() {
    if (!requiredValidation('edit-lead-type-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-lead-type-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/Lead_type/edit_lead_type',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Lead Type Name Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'lead_management/lead_type/lead_setup/lead_type');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Lead Type Name", "error");
            } else {
                swal("ERROR!", "Lead Type Name Already Exists", "error");
            }
        }
    });
}

function edit_lead_type_partner() {
    if (!requiredValidation('edit-lead-type-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-lead-type-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/Lead_type/edit_lead_type_partner',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Lead Type Name Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'lead_management/lead_type');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Lead Type Name", "error");
            } else {
                swal("ERROR!", "Lead Type Name Already Exists", "error");
            }
        }
    });
}

function delete_lead_type(lead_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this lead type!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'lead_management/Lead_type/delete_lead_type',
                    data: {
                        lead_id: lead_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "lead type been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'lead_management/lead_type');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this lead type!!", "error");
                        }
                    }
                });
            });
}

function delete_lead_type_partner(lead_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this lead type!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'lead_management/Lead_type/delete_lead_type_partner',
                    data: {
                        lead_id: lead_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "lead type been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'lead_management/lead_type');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this lead type!!", "error");
                        }
                    }
                });
            });
}

function add_lead_ref() {
    if (!requiredValidation('add-lead-ref-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-lead-ref-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'partners/add_ref',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Lead Reference Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'partners/referral_agent_type');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Lead Reference", "error");
            } else {
                swal("ERROR!", "Lead Reference Already Exists", "error");
            }
        }
    });

}

function edit_lead_ref() {
    if (!requiredValidation('edit-lead-ref-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-lead-ref-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'partners/edit_ref',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({
                    title: "Success!",
                    text: "Lead Reference Name Successfully Updated!",
                    type: "success"
                }, function () {
                    goURL(base_url + 'partners/referral_agent_type');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Lead reference Name", "error");
            } else {
                swal("ERROR!", "Lead reference Name Already Exists", "error");
            }
        }
    });
}

function delete_lead_ref(lead_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this lead reference!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'partners/delete_ref',
                    data: {
                        lead_id: lead_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "lead reference been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'partners/referral_agent_type');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this lead reference!!", "error");
                        }
                    }
                });
            });
}

function add_lead_source() {
    if (!requiredValidation('add-lead-source-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-lead-source-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/lead_source/add_lead_source',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Lead Source Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'lead_management/lead_type/lead_setup/lead_source');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Lead Source", "error");
            } else {
                swal("ERROR!", "Lead Source Already Exists", "error");
            }
        }
    });

}

function add_partner_source() {
    if (!requiredValidation('add-partner-source-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('add-partner-source-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'referral_partner/referral_partners/add_partner_source',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Partner Source Successfully Added!", type: "success"}, function () {
                    goURL(base_url + 'referral_partner/referral_partners/partner_source');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Partner Source", "error");
            }
        }
    });

}
function edit_lead_source() {
    if (!requiredValidation('edit-lead-source-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-lead-source-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/lead_source/edit_lead_source',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Lead Source Name Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'lead_management/lead_type/lead_setup/lead_source');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Lead Source Name", "error");
            } else {
                swal("ERROR!", "Lead Source Name Already Exists", "error");
            }
        }
    });
}

function edit_partner_source() {
    if (!requiredValidation('edit-partner-source-form')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('edit-partner-source-form'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'referral_partner/referral_partners/edit_partner_source',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Partner Source Name Successfully Updated!", type: "success"}, function () {
                    goURL(base_url + 'referral_partner/referral_partners/partner_source');
                });
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Update Partner Source Name", "error");
            }
        }
    });
}

function delete_lead_source(source_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this lead source!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'lead_management/lead_source/delete_lead_source',
                    data: {
                        source_id: source_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Lead Source Been Deleted Successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'lead_management/lead_source');
                            });
                        } else {
                            swal("ERROR!", "Unable To Delete This Lead Source!!", "error");
                        }
                    }
                });
            });
}

function delete_partner_source(source_id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this partner source!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'referral_partner/referral_partners/delete_partner_source',
                    data: {
                        source_id: source_id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Partner Source Been Deleted Successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'referral_partner/referral_partners/partner_source');
                            });
                        } else {
                            swal("ERROR!", "Unable To Delete This Lead Source!!", "error");
                        }
                    }
                });
            });
}

function confirm_sender_email(added_by, event_lead = "") {
    if (!requiredValidation('form_add_new_prospect')) {
        return false;
    }
    var mail_camapign_status = $("#mail_campaign_status").val();
    if (mail_camapign_status == '1') {
        openModal('mail-campaign-confirm');
    } else {
        add_lead_prospect(added_by, event_lead);
}
}

function add_lead_prospect(added_by, event_lead = "",refer_lead="") {
    if ($("#brand_id").attr("disabled")) {
        $("#brand_id").removeAttr("disabled");
    }
    if ($("#office").attr("disabled")) {
        $("#office").removeAttr("disabled");
    }
    var form_data = new FormData(document.getElementById('form_add_new_prospect'));
    form_data.append('added_by', added_by);
    if ($('input[name="sender_email"]:checked').val() != 'undefined') {
        form_data.append('sender_email', $('input[name="sender_email"]:checked').val());
    }
    if (refer_lead != "") {
        form_data.append('refer_lead', refer_lead);
    }
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/new_prospect/insert_new_prospect',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//            alert(result);
//            return false;
            if (result.trim() == "0") {
                swal("ERROR!", "Email Already Exists For This Partner Lead!! Please Change the Email", "error");
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Lead Prospect", "error");
            } else {
                swal({title: "Success!", text: "Lead Prospect Successfully Added!", type: "success"}, function () {
                    if (added_by == 'refagent') {
                        goURL(base_url + 'referral_partner/referral_partners/referral_partner_dashboard');
                    } else if (event_lead == "event_lead") {
                        goURL(base_url + 'lead_management/event');
                    } else {
                        goURL(base_url + 'lead_management/home');
                    }
                });
                // window.open((($('#mail_campaign_status').val() != 0) ? base_url + 'lead_management/home/mail_campaign/y/' + result.trim() : base_url + 'lead_management/home/mail_campaign/n/' + result.trim()), 'Mail Campaign Popup', "width=1080, height=480, top=100, left=170, scrollbars=no");
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

function cancel_lead_prospect(added_by) {
    if (added_by == 'refagent') {
        goURL(base_url + 'referral_partner/referral_partners/referral_partner_dashboard');
    } else if(added_by == 'ref_cancel') {
        goURL(base_url + 'referral_partner/referral_partners/referral_partner_dashboard');
    } else {
        goURL(base_url + 'lead_management/home');
    }
}

function add_lead_referral(partner) {
    if (!requiredValidation('form_add_new_referral')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('form_add_new_referral'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'partners/insert_new_referral',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
           // alert(result);return false;
            if (result.trim() == "0") {
                swal("ERROR!", "Lead Prospect Already Referral", "error");
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Add Lead Referral", "error");
            } else {
                if (partner != '') {
                    swal({title: "Success!", text: "Referral Partner Successfully Added!", type: "success"}, function () {
                        goURL(base_url + 'referral_partner/referral_partners/partners');
                    });
                } else {
                    swal({title: "Success!", text: "Lead Referral Successfully Added!", type: "success"}, function () {
                        goURL(base_url + 'lead_management/home');
                    });
                }
                // window.open((($('#mail_campaign_status').val() != 0) ? base_url + 'lead_management/home/mail_campaign/y/' + result.trim() : base_url + 'lead_management/home/mail_campaign/n/' + result.trim()), 'Mail Campaign Popup', "width=1080, height=480, top=100, left=170, scrollbars=no");
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

function cancel_save_lead_mail() {
    goURL(base_url + 'lead_management/lead_mail');
}


function save_lead_mail() {
    if (!requiredValidation('form_save_lead_mail')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_save_lead_mail'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/lead_mail/insert_mail_content',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Mail Content Successfully Saved", type: "success"}, function () {
                    goURL(base_url + 'lead_management/lead_mail');
                });
            } else {
                swal("ERROR!", "Some Error Occured", "error");
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

function cancel_save_lead_mail_campaign() {
    goURL(base_url + 'lead_management/lead_mail/lead_mail_campaign');
}

function save_lead_mail_campaign() {
    if (!requiredValidation('form_save_lead_mail')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('form_save_lead_mail'));

    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/lead_mail/insert_mail_campaign_content',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
//            alert(result);
//            return false;
            if (result.trim() == "1") {
                swal({title: "Success!", text: "Mail Content Successfully Saved", type: "success"}, function () {
                    goURL(base_url + 'lead_management/lead_mail/lead_mail_campaign');
                });
            } else {
                swal("ERROR!", "Some Error Occured", "error");
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

function delete_lead_mail(id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this service!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + '/lead_management/lead_mail/delete_lead_mail',
                    data: {
                        id: id
                    },
                    success: function (result) {
                        //alert(result);
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Email deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + '/lead_management/lead_mail');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete the Email", "error");
                        }
                    }
                });
            });
}

function delete_mail_campaign(id) {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this mail!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'lead_management/lead_mail/delete_mail_campaign',
                    data: {
                        id: id
                    },
                    success: function (result) {
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Mail has been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'lead_management/lead_mail/lead_mail_campaign');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this Mail!!", "error");
                        }
                    }
                });
            });
}

function load_campaign_mails(leadtype, language, day, status) {
    $.ajax({
        type: 'POST',
        url: base_url + 'lead_management/lead_mail/load_campaign_mails',
        data: {
            leadtype: leadtype, language: language, day: day, status: status
        },
        success: function (result) {
            $("#load_data").html(result);
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


function displayMailCampaignTemplate(leadID, day, isCampaign) {
    $.ajax({
        type: 'POST',
        url: base_url + 'lead_management/lead_mail/mail_campaign_template_ajax',
        data: {
            lead_id: leadID,
            day: day,
            is_campaign: isCampaign
        },
        success: function (result) {
            if (result != 0) {
                var mail_campaign = JSON.parse(result);
                $('#mail-subject').html(mail_campaign.subject);
                $('#mail-body').html(mail_campaign.body);
                $('#mail-campaign-template-modal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            } else {
                swal("ERROR!", "Lead mail not avalable...!", "error");
            }
        }
    });
}
function preview_mail(counter){
    var day = $('#day' + counter).val();
    var body = $("#lead_body" + counter).val();
    var subject = $("#lead_subject" + counter).val();
    $.ajax({
        type: 'POST',
        url: base_url + 'lead_management/lead_mail/get_day',
        data: {
            day: day,
            body:body,
            subject:subject
        },
        success: function (result) {
            if (result != 0) {
                var mail_campaign = JSON.parse(result);
                $('#mail-subject').html(mail_campaign.subject);
                $('#mail-body').html(mail_campaign.body);
                $('#mail-day').html(mail_campaign.day);
                $('#mail-campaign-preview-modal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            } else {
                swal("ERROR!", "Lead mail not avalable...!", "error");
            }
        }
    });
}
function viewMailCampaignTemplate(leadType, language, day, firstName, companyName, phone, email,contactType,office,first_contact_date,lead_source,source_details) {
    $.ajax({
        type: 'POST',
        url: base_url + 'lead_management/lead_mail/show_mail_campaign_template_ajax',
        data: {
            leadtype: leadType,
            language: language,
            day: day,
            first_name: firstName,
            company_name: companyName,
            phone: phone,
            email: email,
            type_of_contact : contactType,
            office:office,
            first_contact_date :first_contact_date,
            lead_source : lead_source,
            source_details : source_details 
        },
        success: function (result) {
            if (result != 0) {
                var mail_campaign = JSON.parse(result);
//                console.log(mail_campaign);
                $('#mail-subject').html(mail_campaign.subject);
                $('#mail-body').html(mail_campaign.body);
                $('#mail-campaign-template-modal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            } else {
                swal("ERROR!", "Lead mail not avalable...!", "error");
            }
        }
    });
}

function loadLeadDashboard(leadType, status, requestBy, leadContactType, eventID = '') {
    if (leadType == '') {
        $("#btn_clear_filter").hide();
    }
    $.ajax({
        type: "POST",
        data: {
            lead_type: leadType,
            status: status,
            request_by: requestBy,
            lead_contact_type: leadContactType,
            event_id: eventID
        },
        url: base_url + 'lead_management/home/dashboard_ajax',
        success: function (lead_result) {
            // console.log(action_result);
            $("#lead_dashboard_div").html(lead_result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function loadEventDashboard() {
    $.ajax({
        type: "POST",
        url: base_url + 'lead_management/event/index',
        success: function () {
            $("#event_dashboard_div").hide();
            $("#event_dashboard_div2").show();
            // $("#btn_clear_filter").hide();
            $(".variable-dropdown").val('');
            $(".condition-dropdown").val('').removeAttr('disabled');
            $(".criteria-dropdown").val('');
            $('.criteria-dropdown').removeAttr('readonly').empty().append('<option value="">All Criteria</option>');
            $(".criteria-dropdown").trigger("chosen:updated");
            $('form#filter-form').children('div.filter-inner').children('div.filter-div').not(':first').remove();
            $('#btn_clear_filter').css('display', 'none');

            $(".sort_type_div #sort-desc").hide();
            $(".sort_type_div #sort-asc").css({display: 'inline-block'});
            $("#sort-by-dropdown").html('Sort By <span class="caret"></span>');
            $('.sort_type_div').css('display', 'none');
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function loadStaffDLLValue(officeID, staffID) {
    $.ajax({
        type: "POST",
        data: {
            office_id: officeID
        },
        url: base_url + 'services/home/load_partner_manager',
        dataType: "html",
        success: function (result) {
            var lead_staff = document.getElementById('lead_staff');
            lead_staff.innerHTML = "";
            if (result != 0) {
                var staff = JSON.parse(result);
                lead_staff.options[lead_staff.options.length] = new Option("Select an option", "");
                for (var i = 0; i < staff.length; i++) {
                    lead_staff.options[lead_staff.options.length] = new Option(staff[i].name, staff[i].id);
                }
                if (staffID != '') {
                    $('#lead_staff').val(staffID);
                }
            } else {
                lead_staff.options[lead_staff.options.length] = new Option("Select an option", "");
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

function changeCampaignStatus(leadtype, language, status) {
    swal({
        title: 'Are you sure?',
        text: "You want to " + (status == 0 ? 'In' : '') + "active!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Change!'
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                data: {
                    leadtype: leadtype,
                    language: language,
                    status: status
                },
                url: base_url + 'lead_management/home/change_mail_campaign_status',
                dataType: "html",
                success: function (result) {
                    if (result != 0) {
                        swal("Success!", "Successfully " + (status == 0 ? 'In' : '') + "actived!", "success");
                        goURL(base_url + 'lead_management/lead_mail/lead_mail_campaign');
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

function leadFilter() {
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/home/lead_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            //console.log("Result: " + result);
            $("#lead_dashboard_div").html(result);
            $("[data-toggle=popover]").popover();
//            $("#clear_filter").show();
            $('#btn_clear_filter').show();
            display_lead_applied_filters();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function display_lead_applied_filters() {
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

    dropdownArray = dropdownArray.filter(Boolean);
    

    var newTr = "";
    for (var i = 0; i < dropdownArray.length; i++) {
        if (i % 3 == 0)
            newTr += (i > 0) ? "</div><div id='" + i + "' class='p-b-3'>&nbsp" : "<div class='p-b-3'>&nbsp";
        newTr += "<span class='label label-default'>" + dropdownArray[i] + "</span>&nbsp";
    }
    newTr += "</div>";

    $("#lead_filted_data").html(newTr);

    $('#lead_filted_data a.btn_remove_filter').each(function (index) {
        $(this).attr('data-random', removeAttArray[index].match(/\d+/)[0]);
    });
}

var delete_lead_management = (id) => {
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this lead management!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
            function () {
                $.ajax({
                    type: 'POST',
                    url: base_url + 'lead_management/home/delete_lead',
                    data: {
                        id: id
                    },
                    success: function (result) {
                        // alert(result);
                        if (result == "1") {
                            swal({
                                title: "Success!",
                                "text": "Lead Management been deleted successfully!",
                                "type": "success"
                            }, function () {
                                goURL(base_url + 'lead_management/home');
                            });
                        } else {
                            swal("ERROR!", "Unable to delete this Lead Management!!", "error");
                        }
                    }
                });
            });
}

function add_event() {
    if (!requiredValidation('form_add_new_event')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('form_add_new_event'));
    // console.log(form_data);return false;
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/event/insert_new_event',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            if (result == 1) {
                swal("Success!", "Event Added Successfully", "success");
                goURL(base_url + 'lead_management/event');
            } else {
                swal("ERROR!", "Unable To Add Event", "error");
            }
        },
        beforeSend: function () {
            $("#eventadd").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });

}

// function change_zip_by_country(val) {
//     if (val == '230') {
//         $("#zip_div").show();
//     } else {
//         $("#zip_div").hide();
//     }
// }

var mail_campaign_status_change = (id, value) => {
    $.ajax({
        type: "POST",
        data: {
            id: id,
            value: value
        },
        url: base_url + 'lead_management/home/change_tracking_status',
        dataType: "html",
        success: function (result) {
            if (result == 1) {
                swal("Success!", "Tracking is Actived Now", "success");
            }
        },
    });
}
function open_client_assign_popup(id, partner_id) { 
    var url = base_url + 'lead_management/home/assignment_form/'+ id + '/' + partner_id;
    window.open(url, 'Assignment Form', "width=1200, height=600, top=100, left=110, scrollbars=yes");
}

function assign_as_client(id, partner_id) {
    $.ajax({
        type: "POST",
        data: {
            id: id,
            partner_id: partner_id
        },
        url: base_url + 'lead_management/home/assign_lead_as_client',
        dataType: "html",
        success: function (result) {
            if (result == 1) {
                $("#assign_as_client-" + id).replaceWith('<a href="javascript:void(0);" class="btn btn-warning btn-xs btn-assign-client"> Assigned as Client</a>');
                swal("Success!", "Successfully Assigned as Client", "success");
            }
        },
    });
}

function assign_as_partner(id) {
    $.ajax({
        type: "POST",
        data: {
            id: id
        },
        url: base_url + 'lead_management/home/assign_lead_as_partner',
        dataType: "html",
        success: function (result) {
            if (result == 1) {
                $("#assign_as_partner-" + id).replaceWith('<a href="javascript:void(0);" class="btn btn-warning btn-xs btn-assign-client"> Assigned as Partner</a>');
                // $("#lead-" +id).hide();
                swal("Success!", "Successfully Assigned as Partner", "success");
            }
        },
    });
}
function update_event(id) {
    // alert(id);return false;   
    var form_data = new FormData(document.getElementById('event_modal_form_submit'));
    $.ajax({
        type: 'POST',
        url: base_url + 'lead_management/event/update_event/' + id,
        data: form_data,
        processData: false,
        contentType: false,
        success: function (result) {
            // alert(result);return false;
            if (result.trim() == 1) {
                swal("Success!", "Successfully updated event!", "success");
                $("#event-form-modal").modal('hide');
                goURL(base_url + 'lead_management/event');

            } else {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            }

        },
        beforeSend: function () {
            $("#eventupdate").prop('disabled', true).html('Processing...');
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function sort_lead_dashboard(sort_criteria = '', sort_type = '') {
    var form_data = new FormData(document.getElementById('filter-form'));
    if (sort_criteria == '') {
        var sc = $('.dropdown-menu li.active').find('a').attr('id');
        var ex = sc.split('-');

        if (ex[0] == 'office_id' || ex[0] == 'client_name') {
            var sort_criteria = ex[0];
        } else {
            var sort_criteria = 'lm.' + ex[0];
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
        url: base_url + 'lead_management/home/sort_lead_dashboard',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (lead_result) {
            if (lead_result.trim() != '') {
                $("#lead_dashboard_div").html(lead_result);
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

function change_type_of_contact(lead_type) {
    $.ajax({
        type: "POST",
        data: {
            lead_type: lead_type
        },
        url: base_url + 'lead_management/home/get_typeof_contact',
        dataType: "html",
        success: function (result) {
            var type_contact_list = document.getElementById('contact_type');
            type_contact_list.innerHTML = "";
            if (result != 0) {
                var lead = JSON.parse(result);
                type_contact_list.options[type_contact_list.options.length] = new Option("Select an option", "");
                for (var i = 0; i < lead.length; i++) {
                    type_contact_list.options[type_contact_list.options.length] = new Option(lead[i].name, lead[i].id);
                }
            } else {
                type_contact_list.options[type_contact_list.options.length] = new Option("Select an option", "");
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
function get_category_prospect(lead_type)
{
    $.ajax({
        type: "POST",
        data: {
            lead_type: lead_type
        },
        url: base_url + 'lead_management/home/get_category_prospect',
        dataType: "html",
        success: function (result) {
            var category = document.getElementById('category');
            category.innerHTML = "";
            if (result != 0) {
                var lead = JSON.parse(result);
                // type_contact_list.options[type_contact_list.options.length] = new Option("Select an option", "");
                for (var i = 0; i < lead.length; i++) {
                    category.options[category.options.length] = new Option(lead[i].category_name, lead[i].id);
                }
            } else {
                category.options[category.options.length] = new Option("Select an option", "");
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

function eventFilter() {
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/event/event_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result); return false;
            $("#event_dashboard_div").show();
            $("#event_dashboard_div").html(result);
            $("#event_dashboard_div2").hide();
            $("[data-toggle=popover]").popover();
            $("#clear_filter").html('');
            $("#clear_filter").show();
            $('#btn_clear_filter').show();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function sortEventDashboard(sortCriteria = '', sortType = '') {
    var form_data = new FormData(document.getElementById('filter-form'));
    if (sortCriteria == '') {
        var sc = $('.dropdown-menu li.active').find('a').attr('id');
        sc = sc.split('-');
        sortCriteria = sc[0];
    }
    form_data.append('sort_criteria', sortCriteria);
    form_data.append('sort_type', sortType);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/event/sort_event',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // alert(result);return false;
            $("#event_dashboard_div2").hide();
            $("#event_dashboard_div").show();
            $("#event_dashboard_div").html(result);
            $(".dropdown-menu li").removeClass('active');
            $("#" + sortCriteria + "-sorting").parent('li').addClass('active');
            if (sortType == 'ASC') {
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

function change_mail_campaign_status(id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'lead_management/home/change_mail_campaign_status_by_type',
        data: {
            id: id
        },
        cache: false,
        success: function (result) {
            $("#mail-campaign-modal").html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });

}

function show_confirm_email_div(status) {
    if (status == 0) {
        $("#confirm_email_div").hide();
    } else {
        $("#confirm_email_div").show();
    }
}

function update_mail_campaign_status_lead () {
    var email_confimation_status = $("input[name=lead_email]:checked").val();

    if (email_confimation_status == 'other') {
        if (!requiredValidation('change_mail_campaign_status_modal')) {
            return false;
        }    
    }
    var form_data = new FormData(document.getElementById('change_mail_campaign_status_modal'));
    
    $.ajax({
        type: 'POST',
        url: base_url + 'lead_management/home/change_mail_campaign_status_lead',
        data: form_data,
        dataType: "html",
        processData: false,
        contentType: false,
        cache: false,
        success: function (result) {
            if (result.trim() == "0") {
                goURL(base_url + 'lead_management/home');
            } else if (result.trim() == "1") {
                swal({title: "Success!", text: "Mail Campaign Activated Successfully!", type: "success"}, function () {
                    goURL(base_url + 'lead_management/home');
                });
            } else if (result.trim() == "-1") {
                swal({title: "Success!", text: "Mail Campaign Inactivated Successfully!", type: "success"}, function () {
                    goURL(base_url + 'lead_management/home');
                });                
            } else {
                swal("ERROR!", "Unable to change mail campaign status!", "error");
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
var leadAjaxList = function (lead_id) {
    if (!$('#collapse' + lead_id).hasClass('in')) {
        $('#collapse' + lead_id).html('<div class="text-center"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
        $.ajax({
            type: "POST",
            data: {
                lead_id: lead_id
            },
            url: base_url + 'lead_management/home/lead_list_ajax',
            dataType: "html",
            success: function (result) {
                if (result != 0) {
                    $('#collapse' + lead_id).html(result);
                } else {
                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                }
            }
        });
    }
}
function add_mail_section(counter)
{    
    if($("#day"+counter+" option:selected").val() == '') {
        swal("Select Mail Day", "Please, select mail day to add another Mail", "warning");
        $("#day"+counter).css('border','1px solid #ed5565');
        return false;
    } else {
        $("#day"+counter).css('border','1px solid #1ab394');
    }
    var already_selected_days = [];
    for (var i = 0; i <= 30; i++) {
        var day = $("#day"+i+" option:selected").val();
        if (typeof(day) != 'undefined') {
            already_selected_days.push(day);    
        }        
    }
    if(already_selected_days.length == 0) {
        already_selected_days = '';
    }
    $.ajax({
            type: "POST",
            data: {
                counter: counter,
                already_selected_days:already_selected_days
            },
            url: base_url + 'lead_management/lead_mail/add_mail_section',
            dataType: "html",
            success: function (result) {
                if (result) {                    
                    $(result).insertAfter('#mail_section' + counter);
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
function edit_add_mail_section(counter,already_selected_days_others='')
{
    var already_selected_days = already_selected_days_others.split(",");
    for (var i = 0; i <= 30; i++) {
        var day = $("#day"+i+" option:selected").val();
        if (typeof(day) != 'undefined') {
            already_selected_days.push(day);    
        }        
    }
    if(already_selected_days.length == 0) {
        already_selected_days = '';
    }
    $.ajax({
            type: "POST",
            data: {
                counter: counter,
                already_selected_days:already_selected_days
            },
            url: base_url + 'lead_management/lead_mail/add_mail_section',
            dataType: "html",
            success: function (result) {
                if (result) {
                    $(result).insertAfter('#mail_section_edit' + counter);
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
function remove_mail_section(counter)
{
    $('#mail_section' + counter).remove();
}

function loadAjaxmailsection(counter,already_selected_days='')
{
    $.ajax({
            type: "POST",
            data: {
                counter: counter,
                already_selected_days:already_selected_days
            },
            url: base_url + 'lead_management/lead_mail/loadAjaxmailsection',
            dataType: "html",
            success: function (result) {
                if (result) {
                    $('#mail_section' + counter).html(result);
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
function loadEditAjaxsection(counter , id)
{
    $.ajax({
            type: "POST",
            data: {
                counter: counter,
                id : id
            },
            url: base_url + 'lead_management/lead_mail/loadEditAjaxsection',
            dataType: "html",
            success: function (result) {
                if (result) {
                    $('#mail_section_edit' + counter).html(result);
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
function get_mail_data(){
        var mail_status = $("#mail_campaign_status option:selected").val();
        var brand_id = $("#brand_id option:selected").val();
        var category_id = $("#category option:selected").val();
        var language = $("#language option:selected").val();
        var lead_type = $("#lead_type option:selected").val();
        
        if(mail_status == 1)
        {
            $.ajax({
            type: "POST",
            data: {
                brand_id : brand_id,
                cat_id : category_id,
                lan : language,
                lead_type : lead_type
            },
            url: base_url + 'lead_management/new_prospect/get_mail_data',
            dataType: "html",
            success: function (result) {
                if(result !=0){
                
                $("#mail_data").html(result);
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
    
    function MailCampaignTemplate(id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'lead_management/new_prospect/mail_campaign_template_ajax',
        data: {
            id: id
        },
        success: function (result) {
            if (result != 0) {
                var mail_campaign = JSON.parse(result);
//                console.log(mail_campaign);
                $('#mail-subject').html(mail_campaign.subject);
                $('#mail-body').html(mail_campaign.body);
                $('#mail-campaign-template-modal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            } else {
                swal("ERROR!", "Lead mail not avalable...!", "error");
            }
        }
    });
}
function get_office_brand(brand_id) {
    $.ajax({
        type: "POST",
        data: {
            brand_id: brand_id
        },
        url: base_url + 'lead_management/home/get_office_brand',
        dataType: "html",
        success: function (result) {
            var office = document.getElementById('office');
            office.innerHTML = "";
            if (result != 0) {
                var lead = JSON.parse(result);
                // type_contact_list.options[type_contact_list.options.length] = new Option("Select an option", "");
                for (var i = 0; i < lead.length; i++) {
                    office.options[office.options.length] = new Option(lead[i].name, lead[i].id);
                }
            } else {
                office.options[office.options.length] = new Option("Select an option", "");
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

function partner_interactions(partner_id , in_id = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'referral_partner/referral_partners/partner_interactions_modal',
        data: {
            partner_id: partner_id,
            in_id: in_id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#partner_interactions-info-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}

function insert_partner_interaction() {
    if (!requiredValidation('partner_interactions_form')) {
        return false;
    }
    
    var form_data = new FormData(document.getElementById('partner_interactions_form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'referral_partner/referral_partners/insert_partner_interaction',
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
                swal("Success!", "Successfully Added Partner Interactions!", "success");
                window.location.reload();
            }
        }
    });
}

function delete_partner_interactions(id) {
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
                url: base_url + 'referral_partner/referral_partners/delete_partner_interactions',
                data: {
                    in_id: id
                },
                success: function (result) {
                        if (result == "1") {
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

function show_partner_interaction_attachment(id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'referral_partner/referral_partners/show_partner_interaction_attachment',
        data: {
            in_id: id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#partner_file_interactions-info-form').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
function load_partner_client_dashboard(partner_id , client_type = '' , client_status ='') {
    $.ajax({
        type: 'POST',
        url: base_url + 'referral_partner/referral_partners/load_partner_client_dashboard',
        data: {
            partner_id: partner_id,
            client_type: client_type,
            client_status: client_status
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#view-partner-tab').html(result);
            if (client_type != '') {
                $("#partner-btn").show();
            } else {
                $("#partner-btn").hide();
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
function partner_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('partner-filter-display-div'));
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
                if(id_val=='pattern_month'){
                    id_val='pattern';
                }
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
            url: base_url + 'modal/partner_sorting_filter_modal',
            data: {
                reference:reference
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
                        if(id_val=='pattern_month'){
                            id_val='pattern';
                        }
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
                if(id_val=='pattern_month'){
                    id_val='pattern';
                }
                let current_made_id = id_val+'-val';
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
    }
}
function partner_filter_new(is_clear='',current_clear_element='') {
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
        $("#"+removavle_element).val('').trigger('chosen:updated');
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('partner-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'type_filter') {
            var id = 'type_filter-val';
            if(is_clear==''){
                $("#type_filter-clear_filter").show();
            }        
        }
        if (a == 'office') {
            var id = 'office-val';
            if(is_clear==''){
                $("#office-clear_filter").show();
            }
        }
        if (a == 'staff') {
            var id = 'staff-val';
            if(is_clear==''){
                $("#staff-clear_filter").show();
            }
        }
    }
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'referral_partner/referral_partners/load_partner_dashboard_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);
            $("#load_data").html(result);
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
function get_all_partner_interactions(partner_id , filter_data = '', order = '' , order_by = '') {
    var sc = $('#interactions-nav-tab li.active').find('a').attr('id');
    var res = sc.split('-');
    if (sc != 'all_data' && order != '') {
        filter_data = res[1];
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'referral_partner/referral_partners/get_all_partner_interactions',
        data: {
            partner_id: partner_id,
            filter_data: filter_data,
            order: order,
            order_by: order_by
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $("#interaction_tbody").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function load_recurring_invoice_data_from_partnet_view(partner_id) {
    $.ajax({
        type: "POST",
        url: base_url + 'billing/home/load_recurring_invoice_data_from_partnet_view',
        data: {
            'partner_id':partner_id
        },
        success: function (result) {
            // console.log(result);
            $("#recurrence_div").html(result);         
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}  

function sort_partner_dashboard_new(sort_type = '', sort_val = '') {
    var sort_type=sort_type.value;

    var form_data = new FormData(document.getElementById('partner-filter-display-div'));
    form_data.append('sort_type', sort_type);
    form_data.append('sort_value', sort_val);;
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'referral_partner/referral_partners/sort_partner_dashboard_new',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (action_result) {
            
            var data = JSON.parse(action_result);
//            alert(data);
            $("#load_data").html(data.result);
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

function loadPartnerManagerByOfficeID(staffID = '') {
    var officeID = $("#office").val();
    // alert(officeID);
    $.ajax({
        type: "POST",
        data: {
            office_id: officeID,
            staff_id: staffID
        },
        url: base_url + 'referral_partner/referral_partners/loadPartnerManagerByOfficeID',
        dataType: "html",
        success: function (result) {
            $("#lead_staff").chosen('destroy');
            $("#lead_staff").html(result);
            $("#lead_staff").chosen();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function change_partner_referral_type(referred_by_source, partner_id = '', lead_source_detail = '') {
    $.ajax({
        type: "POST",
        data: {
            referred_by_source: referred_by_source,
            partner_id: partner_id,
            lead_source_detail: lead_source_detail
        },
        url: base_url + 'referral_partner/referral_partners/change_partner_referral_type',
        dataType: "html",
        success: function (result) {
            $("#new_referred_by_name_div").html(result);
        }
    });
}

function lead_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('lead-filter-display-div'));
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
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                let current_made_id = id_val+'-val';
                $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
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
            url: base_url + 'lead_management/home/lead_sorting_filter_modal',
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
                    let filter_name = formElement[0];
                    let filter_value = formElement[0];
                    if (formElement[1] != '') {
                        let active_element = filter_name.split("[")[0];     
                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
                        let current_made_id = id_val+'-val';
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
function lead_filter_new(is_clear='',current_clear_element='') {
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
        $("#"+removavle_element).val('').trigger('chosen:updated');
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('lead-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'type_filter') {
            var id = 'type_filter-val';
            if(is_clear==''){
                $("#type_filter-clear_filter").show();
            }        
        }
        if (a == 'tracking_filter') {
            var id = 'tracking_filter-val';
            if(is_clear==''){
                $("#tracking_filter-clear_filter").show();
            }
        }
        if (a == 'staff_filter') {
            var id = 'staff_filter-val';
            if(is_clear==''){
                $("#staff_filter-clear_filter").show();
            }
        }
        if (a == 'office_filter') {
            var id = 'office_filter-val';
            if(is_clear==''){
                $("#office_filter-clear_filter").show();
            }
        }
    }
    // form_data.append('page_number', page_number);
    $.ajax({ 
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/home/lead_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);
            $("#lead_dashboard_div").html(result);
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
function sort_lead_dashboard_new(sort_type = '', sort_val = '') {
    var sort_type=sort_type.value;
    var form_data = new FormData(document.getElementById('lead-filter-display-div'));
    form_data.append('sort_type', sort_type);
    form_data.append('sort_criteria', sort_val);
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'lead_management/home/sort_lead_dashboard',
        enctype: 'multipart/form-data',
        cache: false,
        processData: false,
        contentType: false,
        success: function (action_result) {
            $("#lead_dashboard_div").html(action_result);
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