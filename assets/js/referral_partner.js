var base_url = document.getElementById('base_url').value;

function assignContainerAjax(select_type, edit_mode) {
    var office = $("#assignto #office_id").val();
      $.ajax({
        type: 'POST',
        url: base_url + 'referral_partner/referral_partners/load_assign_container',
        data: {
            select_type: select_type,
            edit_mode: edit_mode,
            office: office
        },
        success: function (result) {
            if (result != '0') {
                $('#assign_container').html(result);
            }
        }
    });
}

function assign_client(){
     if (!requiredValidation('assignto-form')) {
        return false;
    }

    var formData = new FormData(document.getElementById('assignto-form'));
//    alert(formData);

    $.ajax({
        type: 'POST',
        url: base_url + 'referral_partner/Referral_partners/assign_client',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
//            alert(result);return false;
            console.log("Result: " + result);
            if (result != 0) {
//                alert('Hi');
                swal("Success!", "Successfully assigned!", "success");

                goURL(base_url + 'referral_partner/referral_partners/partners');
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


function assign_lead_to(id){
    swal({
        title: "Are you sure?",
        text: "Your want to assign!",
        type: "success",
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Yes, assign it!",
        closeOnConfirm: false
    }, 
       function () {
    $.ajax({
         type: 'POST',
         url: base_url + 'referral_partner/Referral_partners/assign_lead',
         data: {
               lead_id: id
                },
        success: function (result) {
//            alert(result);return false;
            console.log("Result: " + result);
            if (result != 0) {
//                alert('Hi');
                swal("Success!", "Successfully assigned!", "success");

                goURL(base_url + 'referral_partner/referral_partners/lead_dashboard');
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

function show_lead_ref_partner_notes(id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/show_ref_partner_notes',
        data: {
            id: id
        },
        success: function (result) {
            $('#showNotes #notes-modal-body').html(result);
            $('#showNotes .modal-body #lead_id').val(id);
            openModal('showNotes');
        }
    });
}


function show_ref_partner_client_notes_modal(ref_partner_table_id) {
    $.ajax({
        type: 'POST',
        url: base_url + 'modal/show_ref_partner_client_notes_modal',
        data: {
            ref_partner_table_id: ref_partner_table_id
        },
        success: function (result) {
             $('#showNotesclient #notes-modal-body').html(result);
             $("#ref_partner_table_id").val(ref_partner_table_id);
            openModal('showNotesclient');
        }
    });
}

function reffer_lead_to_partner_view(id,email,is_partner) {
    $.ajax({
        type: "POST",
        data: { email:email },
        url: base_url + 'referral_partner/referral_partners/is_staff',
        dataType: "html",
        success: function (result) {
            if (result.trim() == "0") {
                swal("ERROR!", "Unable to Refer a Lead!, Please SET Password to Refer", "error");
            } else {
                window.location = base_url + "referral_partner/referral_partners/reffer_lead_to_partner/"+id+"/"+is_partner;                    
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

function reffer_lead_to_partner(refer_lead="") {
    if ($("#brand_id").attr("disabled")) {
        $("#brand_id").removeAttr("disabled");
    }
    if ($("#office").attr("disabled")) {
        $("#office").removeAttr("disabled");
    }
    if (!requiredValidation('form_add_new_prospect')) {
        return false;
    }

    var form_data = new FormData(document.getElementById('form_add_new_prospect'));
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
            //console.log(result); return false;
            if (result.trim() == "0") {
                swal("ERROR!", "Lead Prospect Already Exists", "error");
            } else if (result.trim() == "-1") {
                swal("ERROR!", "Unable To Refer Lead Prospect", "error");
            } else {
               swal({title: "Success!", text: "Lead Prospect Successfully Referred!", type: "success"}, function () {
                    goURL(base_url + 'referral_partner/referral_partners/partners');                    
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

function cancel_lead_to_partner() {
    goURL(base_url + 'referral_partner/referral_partners/partners');
}

function ref_partner_filter_form() {
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'referral_partner/referral_partners/filter_form',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (data) {
            $("#load_data").html(data);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function delete_reffererd_leads(id,assigned_client_id){
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this reffered lead!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'referral_partner/referral_partners/delete_reffererd_lead',
            data: {
                id: id,assigned_client_id:assigned_client_id
            },
            success: function (result) {
                if (result == "1") {
                    swal({
                        title: "Success!",
                        "text": "Reffered Lead been deleted successfully!",
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'referral_partner/referral_partners/leads_ref_by_refpartner_dashboard');
                    });
                } else {
                    swal("ERROR!", "Unable to delete this Reffered Lead!!", "error");
                }
            }
        });
    });
}

var delete_referral_partner = (id) =>{
    // alert(id);return false;
    swal({
        title: "Are you sure want to delete?",
        text: "Your will not be able to recover this referral partner!!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'referral_partner/referral_partners/delete_referral_partner',
            data: {
                id: id
            },
            success: function (result) {
                // alert(result);
                // return false;

                if (result == "1") {
                    swal({
                        title: "Success!",
                        "text": "Referral Partners have been deleted successfully!",
                        "type": "success"
                    }, function () {
                        goURL(base_url + 'referral_partner/referral_partners/partners');
                    });
                } else {
                    swal("ERROR!", "Unable to delete this Reffered Lead!!", "error");
                }
            }
        });
    });
}

function loadPartnerDashboard(status, request) {
    $.ajax({
        type: 'POST',
        url: base_url + 'partners/ajax_dashboard',
        data : { 
            status: status,
            request: request
        },
        success: function (result) {
            if (result.trim() != '') {
                $(".ajaxdiv").html(result);
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

function partnerFilter() {
    var form_data = new FormData(document.getElementById('filter-form'));
    $.ajax({
        type: "POST",
        data: form_data,
        url: base_url + 'partners/partner_filter',
        dataType: "html",
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            console.log(result);
            $(".ajaxdiv").html(result);
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

function load_partners_dashboard(type = '', status = '', req_by = '', lead_type = '',data_new_home_dashboard='') {
    $.ajax({
        type: "POST",
        url: base_url + 'referral_partner/referral_partners/load_partner_dashboard',
        data: {
            type: type,
            status: status,
            req_by: req_by,
            data_new_home_dashboard: data_new_home_dashboard
        },
        success: function (data) {
            //alert(data);
            $("#load_data").html(data);
            if (req_by != '') {
                //alert(status);
                if (req_by == 1) {
                    var byval = 'Added By Me';
                } else if (req_by == 2) {
                    var byval = 'Added By Others';
                }
                $("#clear_filter span").html('');
                $("#clear_filter span").html(byval);
                $("#clear_filter").show();
            } else {
                //alert(status);
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

function save_partner_service_fees() {
    var percentage = $("input[name='percentage[]']").map(function(){return $(this).val();}).get();
    var partner_id = $('#partner_id').val();
    var service = $("input[name='service[]']").map(function(){return $(this).val();}).get();
    var office = $("#office").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'referral_partner/referral_partners/save_partner_service_fees',
        data: {service: service , office: office , percentage: percentage , partner_id: partner_id},
        success: function (result) {
            // alert(result);return false;
            if (result == 1) {
                swal("Success!", "Successfully saved!", "success");
                goURL(base_url + 'referral_partner/referral_partners/view_referral/'+ partner_id);
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

function send_invitation_to_partner() {
    var password = $("#pwd").val();
    var hiddenid = $("#hiddenid").val();
    var staffrequestedby = $("#staffrequestedby").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'referral_partner/referral_partners/set_password',
        data: {password: password , hiddenid: hiddenid , staffrequestedby: staffrequestedby},
        success: function (result) {
            // alert(result);return false;
            if (result == 1) {
                swal("Success!", "Email Send Successfully", "success");
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

