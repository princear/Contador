var base_url = document.getElementById("base_url").value;

function edit_department(department_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/edit_department",
    data: {
      department_id: department_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#edit-dept-form").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_franchise_modal(modal_type, franchise_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_franchise_modal",
    data: {
      modal_type: modal_type,
      franchise_id: franchise_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#franchise-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_staff_modal(modal_type, staff_id, office_id = "") {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_staff_modal",
    data: {
      modal_type: modal_type,
      staff_id: staff_id,
      office_id: office_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#staff-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_add_brands_modal(modal_type, brand_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_brands_modal",
    data: {
      modal_type: modal_type,
      brand_id: brand_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#brands-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function show_add_language_modal(modal_type, lan_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_language_modal",
    data: {
      modal_type: modal_type,
      lan_id: lan_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#language-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_add_tab_labels_modal(modal_type, tab_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_add_tab_labels_modal",
    data: {
      modal_type: modal_type,
      tab_id: tab_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#tab_labels-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_visitation_modal(modal_type, id = "") {
  $.ajax({
    type: "POST",
    url: base_url + "modal/add_visitation_modal",
    data: {
      modal_type: modal_type,
      id: id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#visitation-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_visit_notes_modal(id) {
  $.ajax({
    url: base_url + "modal/show_visit_notes_modal",
    data: {
      id: id,
    },
    type: "POST",
    dataType: "html",
    cache: false,
    success: function (result) {
      $("#visitation-note-modal #notes-modal-body").html(result);
      $("#visitation-note-modal #visitation_id").val(id);
      $("#notecount-" + id)
        .removeClass("label label-danger")
        .addClass("label label-success");
      openModal("visitation-note-modal");
    },
  });
}

function change_visitation_status(visitation_id, visitation_status) {
  $.ajax({
    type: "POST",
    data: {
      visitation_id: visitation_id,
      visitation_status: visitation_status,
    },
    url: base_url + "modal/change_visitation_status",
    success: function (result) {
      $("#changeStatusVisitation").show();
      $("#changeStatusVisitation").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

function show_department_modal() {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_department_modal",
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#department-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

// function show_service_modal(modal_type, service_id) {
//     $.ajax({
//         type: 'POST',
//         url: base_url + 'modal/show_service_modal',
//         data: {
//             modal_type: modal_type,
//             service_id: service_id
//         },
//         success: function (result) {
//             $('#service-form-modal').html(result).modal({
//                 backdrop: 'static',
//                 keyboard: false
//             });
//             $('#service-form-modal').on('shown.bs.modal', function () {
//                 $(".chosen-select").chosen("destroy");
//                 $(".chosen-select").chosen();
//             });
//         }
//     });
// }

function show_partner_service_modal(modal_type, service_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_partner_service_modal",
    data: {
      modal_type: modal_type,
      service_id: service_id,
    },
    success: function (result) {
      $("#partner-service-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
      $("#partner-service-form-modal").on("shown.bs.modal", function () {
        $(".chosen-select").chosen("destroy");
        $(".chosen-select").chosen();
      });
    },
  });
}

function show_company_modal(modal_type, company_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_company_modal",
    data: {
      modal_type: modal_type,
      company_id: company_id,
    },
    success: function (result) {
      $("#company-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_source_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_source_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#source-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_lead_type_modal(modal_type, lead_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_lead_type_modal",
    data: {
      modal_type: modal_type,
      lead_id: lead_id,
    },
    success: function (result) {
      $("#new-lead-type-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_lead_type_partner_modal(modal_type, lead_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_lead_type_partner_modal",
    data: {
      modal_type: modal_type,
      lead_id: lead_id,
    },
    success: function (result) {
      $("#new-lead-type-form-modal-partner").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_lead_ref_modal(modal_type, ref_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_lead_ref_modal",
    data: {
      modal_type: modal_type,
      ref_id: ref_id,
    },
    success: function (result) {
      $("#lead-ref-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_lead_source_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_lead_source_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#lead-source-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_partner_source_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_partner_source_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#partner-source-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_action_tracking_modal(id, page_name) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_action_tracking_modal",
    data: {
      id: id,
      page_name: page_name,
    },
    success: function (result) {
      $("#modal_area").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_lead_tracking_modal(id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_lead_tracking_modal",
    data: {
      id: id,
    },
    success: function (result) {
      $("#modal_area").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_ref_partner_tracking_modal(id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_ref_partner_tracking_modal",
    data: {
      id: id,
    },
    success: function (result) {
      $("#modal_area").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_action_notes(id, user_id) {
  //     alert(action_staffs);return false;
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_action_notes",
    data: {
      id: id,
      user_id: user_id,
    },
    success: function (result) {
      $.ajax({
        type: "POST",
        url: base_url + "modal/action_dashboard_note_read_status_change",
        data: {
          action_id: id,
          user_id: user_id,
        },
        success: function (nodata) {
          // alert(result);return false;
          $("#showNotes #notes-modal-body").html(result);
          $("#showNotes #actionid").val(id);
          document.getElementById("notes_action_id").innerHTML =
            "Action Id: " + id;
          $("#showNotes input#all_staffs").val(
            $("input.action-all-staffs-" + id).val()
          );
          $("#total_notes_count_id_" + id)
            .removeClass("label label-danger")
            .addClass("label label-secondary");
          openModal("showNotes");
        },
      });
    },
  });
}

function show_action_files(id, staff) {
  console.log("h");
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_action_files",
    data: {
      id: id,
      staff: staff,
    },
    success: function (result) {
      if (
        $("#actionfilespan" + id)
          .find("a")
          .hasClass("label-danger")
      ) {
        $("#actionfilespan" + id)
          .find("a")
          .removeClass("label-danger");
        $("#actionfilespan" + id)
          .find("a")
          .addClass("label-success");
      }
      document.getElementById("files_action_id12").innerHTML =
        "Action Id: " + id;
      $("#showFiles #files-modal-body").html(result);
      openModal("showFiles");
    },
  });
}

function show_lead_notes(id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_lead_notes",
    data: {
      id: id,
    },
    success: function (result) {
      $("#showNotes #notes-modal-body").html(result);
      $("#lead_id").val(id);
      $("#related_table_id").val(3);
      openModal("showNotes");
    },
  });
}

function assign_ref_partner_password(id, requested_by_staff_id, email) {
  $("#setpwd #hiddenid").val(id);
  $("#setpwd #staffrequestedby").val(requested_by_staff_id);
  $("#setpwd #lead_email").html("User Email : " + email);
  openModal("setpwd");
}

function assign_ref_partner_to(id, office) {
  $("#assignto #hiddenid").val(id);
  $("#assignto #office_id").val(office);
  openModal("assignto");
}

function show_ref_partner_notes(id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_ref_partner_notes",
    data: {
      id: id,
    },
    success: function (result) {
      $("#showNotes #notes-modal-body").html(result);
      $("#showNotes .modal-body #lead_id").val(id);
      openModal("showNotes");
    },
  });
}

function open_contact_modal(modal_type, reference, reference_id, id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_add_contact",
    data: {
      modal_type: modal_type,
      reference: reference,
      reference_id: reference_id,
      id: id,
    },
    success: function (result) {
      $("#contact-form").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_document_modal(modal_type, reference, reference_id, id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_add_document",
    data: {
      modal_type: modal_type,
      reference: reference,
      reference_id: reference_id,
      id: id,
    },
    success: function (result) {
      $("#contact-form").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function account_modal(modal_type, id, section, reference_id) {
  // var reference_id = $("#reference_id").val();
  // var exist_client_id=$("#exist_client_id").val();
  if ($("#editval").val() == "") {
    var new_reference_id = $("#new_reference_id").val();
    var reference_id = $("#reference_id").val();
  } else {
    var new_reference_id = $("#new_reference_id").val();
    var reference_id = $("#reference_id").val();
    var exist_client_id = $("#exist_client_id").val();
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_financial_account",
    data: {
      modal_type: modal_type,
      id: id,
      new_reference_id: new_reference_id,
      reference_id: reference_id,
      order_id: $("#editval").val(),
      section: section,
      client_id: exist_client_id,
    },
    success: function (result) {
      if (result) {
        $("#accounts-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
        $("#bookkeeping_account_list").show();
      } else {
        $("#bookkeeping_account_list").hide();
        $("#acc_type").val("");
        $("#bank_name").val("");
        $("#acc_no").val("");
        $("#routing_no").val("");
        $("#website").val("");
        $("#user_id").val("");
        $("#password").val("");
      }
    },
  });
}

function set_exist_bookkeeping_value(
  account_type,
  bank_name,
  account_no,
  routing_no,
  bank_url,
  user,
  password,
  transactions,
  total_amount
) {
  if (bank_name != "" && account_no != "") {
    $("#acc_type").val(account_type);
    $("#bank_name").val(bank_name);
    $("#acc_no").val(account_no);
    $("#routing_no").val(routing_no);
    $("#website").val(bank_url);
    $("#user_id").val(user);
    $("#password").val(password);
    $("#no_of_transactions").val(transactions);
    $("#total_amount").val(total_amount);
    $("#sub_btn").html("Update");
  } else {
    $("#acc_type").val("");
    $("#bank_name").val("");
    $("#acc_no").val("");
    $("#routing_no").val("");
    $("#website").val("");
    $("#user_id").val("");
    $("#password").val("");
    $("#no_of_transactions").val(transactions);
    $("#total_amount").val(total_amount);
    $("#sub_btn").html("Save changes");
  }
}

function open_owner_modal(modal_type, service_id, reference_id, reference, id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_owner_modal",
    data: {
      modal_type: modal_type,
      reference: reference,
      reference_id: reference_id,
      id: id,
      service_id: service_id,
    },
    success: function (result) {
      $("#financial-account").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_payroll_approver_modal() {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_payroll_approver_modal",
    success: function (result) {
      $("#payroll-approver-form").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function openModal(id) {
  $("#" + id).modal({
    backdrop: "static",
    keyboard: false,
  });
}

/** msg modal **/
function msg_details(action_id) {
  $.ajax({
    type: "POST",
    data: { action_id: action_id },
    url: base_url + "modal/get_msg_details",
    dataType: "html",
    success: function (result) {
      //alert(result);
      $("#showmsg #msg-modal-body").html(result);
      openModal("showmsg");
    },
  });
}

function user_details(user_id) {
  $.ajax({
    type: "POST",
    data: { user_id: user_id },
    url: base_url + "modal/get_user_details",
    dataType: "html",
    success: function (result) {
      //alert(result);
      $("#showuserdetails #user-details-modal-body").html(result);
      openModal("showuserdetails");
    },
  });
}

function show_main_cat_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_main_cat_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#main-cat-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_marketing_main_cat_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_marketing_main_cat_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#main-cat-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_operational_main_cat_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_operational_main_cat_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#main-cat-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_operational_manual_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_operational_manual_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#manual-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_sub_cat_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_sub_cat_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#sub-cat-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_marketing_sub_cat_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_marketing_sub_cat_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#sub-cat-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_operational_sub_cat_modal(modal_type, source_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_operational_sub_cat_modal",
    data: {
      modal_type: modal_type,
      source_id: source_id,
    },
    success: function (result) {
      $("#sub-cat-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function open_payment_modal(
  modal_type,
  invoice_id,
  service_id,
  order_id,
  due_amount,
  id,
  page_name = ""
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_payment_modal",
    data: {
      modal_type: modal_type,
      invoice_id: invoice_id,
      service_id: service_id,
      order_id: order_id,
      due_amount: due_amount,
      id: id,
      page_name: page_name,
    },
    success: function (result) {
      $("#addPayment").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function open_franchise_payment_modal(
  modal_type,
  invoice_id,
  service_id,
  order_id,
  due_amount,
  id
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_franchisee_payment_modal",
    data: {
      modal_type: modal_type,
      invoice_id: invoice_id,
      service_id: service_id,
      order_id: order_id,
      due_amount: due_amount,
      id: id,
    },
    success: function (result) {
      $("#franchiseAddPayment").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function open_refund_modal(
  modal_type,
  invoice_id,
  service_id,
  order_id,
  payble_amount,
  id
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_refund_modal",
    data: {
      modal_type: modal_type,
      invoice_id: invoice_id,
      service_id: service_id,
      order_id: order_id,
      payble_amount: payble_amount,
      id: id,
    },
    success: function (result) {
      $("#addRefund").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function open_franchise_refund_modal(
  modal_type,
  invoice_id,
  service_id,
  order_id,
  payble_amount,
  id
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_franchisee_refund_modal",
    data: {
      modal_type: modal_type,
      invoice_id: invoice_id,
      service_id: service_id,
      order_id: order_id,
      payble_amount: payble_amount,
      id: id,
    },
    success: function (result) {
      $("#franchiseAddRefund").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_business_client_modal(modal_type, client_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_business_client_modal",
    data: {
      modal_type: modal_type,
      client_id: client_id,
    },
    success: function (result) {
      $("#business-client-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function show_renewal_dates_modal(modal_type, client_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_renewal_dates_modal",
    data: {
      modal_type: modal_type,
      client_id: client_id,
    },
    success: function (result) {
      $("#business-client-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function show_sales_process_tracking_modal(id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/showSalesProcessTrackingModal",
    data: {
      id: id,
    },
    success: function (result) {
      $("#modal_area").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function show_training_materials_attachments_modal(training_material_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/training_materials_attachments_modal",
    data: {
      training_material_id: training_material_id,
    },
    success: function (result) {
      $("#modal_area").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function generate_shortcode() {
  var servicename = $("#servicename").val();
  servicename = servicename.replace("-", "");
  servicename = servicename.replace("  ", " ");
  var servicecat = $("#servicecat option:selected").text();
  var servcat_allias = servicecat.slice(0, 3).toLowerCase();
  var sp = servicename.split(" ");
  var len = sp.length;
  var i;
  var sc = "";
  for (i = 0; i < len; i++) {
    if (i == len - 1) {
      sc += sp[i].charAt(0).toLowerCase();
    } else {
      sc += sp[i].charAt(0).toLowerCase() + "_";
    }
  }
  sc = servcat_allias + "_" + sc;
  $.ajax({
    type: "POST",
    url: base_url + "services/home/check_shortname",
    data: {
      sc: sc,
    },
    success: function (result) {
      if (result.trim() == 1) {
        sc = sc + "2";
        $("#servicesn").val(sc);
        $("#shorthidden").val(sc);
      } else {
        $("#servicesn").val(sc);
        $("#shorthidden").val(sc);
      }
    },
  });
}

function show_action_assign_modal(action_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_action_assign_modal",
    data: {
      action_id: action_id,
    },
    success: function (result) {
      $("#modal_area").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_order_assign_modal(order_id, all_staffs) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_order_assign_modal",
    data: {
      order_id: order_id,
      all_staffs: all_staffs,
    },
    success: function (result) {
      $("#modal_area").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_service_assign_modal(service_id, all_staffs, department_id = "") {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_service_assign_modal",
    data: {
      service_id: service_id,
      all_staffs: all_staffs,
      department_id: department_id,
    },
    success: function (result) {
      $("#modal_area").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_sos(
  reference,
  service_id,
  staffs,
  order_id,
  service_req_id,
  dept = "",
  resp_staff_id = "",
  resp_dept = "",
  resp_office = "",
  client_id = "",
  client_type = "",
  task_id = ""
) {
  if (service_id == "") {
    service_id = "0";
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_sos",
    data: {
      reference: reference,
      service_id: service_id,
      staffs: staffs,
      order_id: order_id,
      service_req_id: service_req_id,
      dept: dept,
      resp_staff_id: resp_staff_id,
      resp_dept: resp_dept,
      resp_office: resp_office,
      client_id: client_id,
      client_type: client_type,
      task_id: task_id,
    },
    success: function (result) {
      // alert(result);return false;
      $("#showSos #refid").val(order_id);
      $("#showSos #serviceid").val(service_id);
      $("#showSos #staffs").val(staffs);
      $("#showSos #servreqid").val(service_req_id);
      $("#showSos #department_id").val(dept);
      $("#showSos #notes-modal-body").html(result);
      $("#showSos").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_service_sos(
  reference,
  service_id,
  staffs,
  order_id,
  service_req_id,
  dept = "",
  resp_staff_id = "",
  resp_dept = "",
  resp_office = "",
  client_id = "",
  client_type = "",
  task_id = ""
) {
  if (service_id == "") {
    service_id = "0";
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_service_sos",
    data: {
      reference: reference,
      service_id: service_id,
      staffs: staffs,
      order_id: order_id,
      service_req_id: service_req_id,
      dept: dept,
      resp_staff_id: resp_staff_id,
      resp_dept: resp_dept,
      resp_office: resp_office,
      client_id: client_id,
      client_type: client_type,
      task_id: task_id,
    },
    success: function (result) {
      result = result.trim();
      $("#showSos").html(result);
      $("#showSos").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function show_recurring_invoice_sos(
  reference,
  invoice_id,
  service_id,
  practice_id
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_recurring_invoice_sos",
    data: {
      reference: reference,
      invoice_id: invoice_id,
      service_id: service_id,
      practice_id: practice_id,
    },
    success: function (result) {
      $("#showSos #notes-modal-body").html(result);
      $("#showSos").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function show_action_sos(
  reference,
  service_id,
  staffs,
  order_id,
  service_req_id,
  dept = "",
  resp_staff_id = "",
  resp_dept = "",
  resp_office = "",
  client_id = "",
  client_type = "",
  task_id = ""
) {
  if (service_id == "") {
    service_id = "0";
  }
  // alert(service_id);return false;
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_action_sos",
    data: {
      reference: reference,
      service_id: service_id,
      staffs: staffs,
      order_id: order_id,
      service_req_id: service_req_id,
      dept: dept,
      resp_staff_id: resp_staff_id,
      resp_dept: resp_dept,
      resp_office: resp_office,
      client_id: client_id,
      client_type: client_type,
      task_id: task_id,
    },
    success: function (result) {
      $("#showSos").html(result);
      $("#showSos").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_franchisee_sos(
  reference,
  service_id,
  staffs,
  invoice_id,
  service_req_id,
  dept = "",
  resp_staff_id = "",
  resp_dept = "",
  resp_office = "",
  client_id = "",
  client_type = "",
  task_id = ""
) {
  if (service_id == "") {
    service_id = "0";
  }
  // alert(service_id);return false;
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_franchisee_modal",
    data: {
      reference: reference,
      service_id: service_id,
      staffs: staffs,
      invoice_id: invoice_id,
      service_req_id: service_req_id,
      dept: dept,
      resp_staff_id: resp_staff_id,
      resp_dept: resp_dept,
      resp_office: resp_office,
      client_id: client_id,
      client_type: client_type,
      task_id: task_id,
    },
    success: function (result) {
      $("#showSos").html(result);
      $("#showSos").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function show_project_sos(
  reference,
  service_id,
  staffs,
  order_id,
  service_req_id,
  dept = "",
  resp_staff_id = "",
  resp_dept = "",
  resp_office = "",
  client_id = "",
  client_type = "",
  project_task_id = "",
  bookeeping_input_type = "",
  sos_data = ""
) {
  if (service_id == "") {
    service_id = "0";
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_project_sos",
    data: {
      reference: reference,
      service_id: service_id,
      staffs: staffs,
      order_id: order_id,
      service_req_id: service_req_id,
      dept: dept,
      resp_staff_id: resp_staff_id,
      resp_dept: resp_dept,
      resp_office: resp_office,
      client_id: client_id,
      client_type: client_type,
      project_task_id: project_task_id,
      bookeeping_input_type: bookeeping_input_type,
      sos_data: sos_data,
    },
    success: function (result) {
      // console.log(result);return false;
      $("#showSos").html(result);
      $("#showSos").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function sos_filter(dashboard_type, byval, load_sos = "") {
  var by;
  if (byval == "byme") {
    by = "By Me";
  } else {
    by = "To Me";
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/sos_filter",
    data: {
      dashboard_type: dashboard_type,
      byval: byval,
      load_sos: load_sos,
    },
    success: function (result) {
      if (dashboard_type == "order" || dashboard_type == "services") {
        $(".ajaxdiv").html(result);
        $(".filter-text").addClass("btn btn-ghost");
        $(".filter-text").html(
          '<span class="byclass ' +
            byval +
            '">Sos ' +
            by +
            ' <a href="javascript:void(0);" onclick="clear_sos_filter();"><i class="fa fa-times" aria-hidden="true"></i></a></span>'
        );
        $("#hiddenflag").val("");
        $("#btn_service").show();
      } else {
        $("#action_ajax_dashboard_div").html(result);
        $("[data-toggle=popover]").popover();
        $("#clear_filter").html("Sos" + by);
        $("#clear_filter").show();
        $("#btn_clear_filter").show();
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

function clear_sos_filter() {
  loadServiceDashboard("4", "", "", "", "");
  $(".filter-text").html("");
  $(".filter-text").removeClass("btn btn-ghost");
}

function clear_sos_notifications(
  sosids,
  reference,
  reference_id,
  service_id = "",
  task_id = ""
) {
  //task_id used only project releted sos
  //    alert(reference_id+','+task_id);return false;
  swal(
    {
      title: "Are you sure?",
      text: "You will not be able to recover this Notifications!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, cancel plz!",
      closeOnConfirm: true,
      closeOnCancel: true,
    },
    function (isConfirm) {
      if (isConfirm) {
        $.ajax({
          type: "POST",
          url: base_url + "modal/clear_sos_notifications",
          data: {
            sosids: sosids,
            reference: reference,
            reference_id: reference_id,
          },
          success: function (result) {
            if (reference == "order") {
              //                $("#order" + reference_id).find(".priority").find('.m-t-5').remove();
              $("#sosservicecount-" + reference_id)
                .removeClass("label label-danger")
                .addClass("label label-primary");
              $("#sosservicecount-" + reference_id).html(
                '<i class="fa fa-plus"></i>'
              );
              $("#showSos").modal("hide");
              $("#sos-notification-div-" + sosids).remove();
              //                goURL(base_url + 'services/home');
            } else if (reference == "projects") {
              //                goURL(base_url + 'project');
              $("#projectsoscount-" + reference_id + "-" + task_id)
                .removeClass("label label-danger")
                .addClass("label label-primary");
              $("#projectsoscount-" + reference_id + "-" + task_id).html(
                '<i class="fa fa-plus"></i>'
              );
              $("#showSos").modal("hide");
              $("#sos-notification-div-" + sosids).remove();
            } else {
              $("#action" + reference_id)
                .find(".priority")
                .find(".m-t-5")
                .remove();
              //                $("#sos-byme").html('0');
              //                $("#sos-tome").html('0');
              $("#soscount-" + reference_id)
                .removeClass("label label-danger")
                .addClass("label label-primary");
              $("#soscount-" + reference_id).html('<i class="fa fa-plus"></i>');
              $("#showSos").modal("hide");
              $("#sos-notification-div-" + sosids).remove();
            }
          },
          beforeSend: function () {
            openLoading();
          },
          complete: function (msg) {
            closeLoading();
          },
        });
      }
    }
  );
}

function clear_sos(
  sos_id,
  reference,
  reference_id = "",
  service_id = "",
  task_id = "",
  read_status = ""
) {
  // alert(reference);
  if (read_status != 1) {
    var response = $("#response" + sos_id).val();

    if (response != "") {
      $.ajax({
        type: "POST",
        url: base_url + "modal/clear_sos",
        data: {
          sos_id: sos_id,
          reference: reference,
          reference_id: reference_id,
          response: response,
        },
        success: function (result) {
          //alert(reference); return false;
          //                    console.log(result);return false;
          if (reference == "order") {
            swal(
              {
                title: "Success!",
                text: "SOS has been cleared Successfully!",
                type: "success",
              },
              function () {
                $.ajax({
                  type: "POST",
                  url: base_url + "services/Home/get_service_sos_count",
                  data: {
                    orderid: reference_id,
                    serviceid: service_id,
                    status: "unread",
                  },
                  success: function (sos_unread_count) {
                    $.ajax({
                      type: "POST",
                      url: base_url + "services/Home/get_service_sos_count",
                      data: {
                        orderid: reference_id,
                        serviceid: service_id,
                        status: "",
                      },
                      success: function (sos_total_count) {
                        if (sos_unread_count == 0) {
                          $("#order" + reference_id)
                            .find(".priority")
                            .find(".m-t-5")
                            .remove();
                          // $("#order" + reference_id).find(".priority").append('<img src="' + base_url + '/assets/img/badge_sos_priority.png" class="m-t-5"/>');
                          $(
                            "#service_total_sos_count_id_" + reference_id
                          ).removeClass("label-danger");
                          $(
                            "#service_total_sos_count_id_" + reference_id
                          ).addClass("label-secondary");
                          document.getElementById(
                            "service_total_sos_count_id_" + reference_id
                          ).innerHTML = sos_total_count;
                        } else {
                          $(
                            "#service_total_sos_count_id_" + reference_id
                          ).removeClass("label-secondary");
                          $(
                            "#service_total_sos_count_id_" + reference_id
                          ).addClass("label-danger");
                          document.getElementById(
                            "service_total_sos_count_id_" + reference_id
                          ).innerHTML = sos_unread_count;
                        }
                      },
                    });
                  },
                });

                $("#showSos").modal("hide");
              }
            );
            if (result == 10) {
              var tracking_main = "Completed";
              var trk_class_main = "label-primary";
            } else if (result == 11) {
              var tracking_main = "Started";
              var trk_class_main = "label-yellow";
            } else if (result == 12) {
              var tracking_main = "Not Started";
              var trk_class_main = "label-success";
            } else if (result == 17) {
              var tracking_main = "Canceled";
              var trk_class_main = "label-danger";
            } else if (result == 15) {
              var tracking_main = "Clarification";
              var trk_class_main = "label-info";
            }
            //document.getElementById("trackingmain-" + reference_id).innerHTML = "";
            $("#trackingmain-" + reference_id).html(
              '<span class="label ' +
                trk_class_main +
                ' label-block" style="width: 80px; display: inline-block; text-align: center;">' +
                tracking_main +
                "</span>"
            );
          } else if (reference == "projects") {
            if (result == 1) {
              swal("Success", "SOS has been cleared Successfully!", "success");
            }
            $.ajax({
              type: "POST",
              url: base_url + "Project/get_project_sos_unread_count",
              data: {
                task_id: task_id,
                project_id: reference_id,
              },
              success: function (result) {
                // if (result == 0) {
                //     $("#projectsoscount-" + reference_id + '-' + task_id).removeClass('label label-danger').addClass('label label-primary');
                //     $("#projectsoscount-" + reference_id + '-' + task_id).html('<i class="fa fa-plus"></i>');
                // }else {
                //     $("#projectsoscount-" + reference_id + '-' + task_id).html('<i class="fa fa-bell">');  //</i><span>'+' '+result+'</span>
                // }
                $.ajax({
                  type: "POST",
                  url: base_url + "Project/get_total_project_sos_unread_count",
                  data: {
                    project_id: reference_id,
                  },
                  success: function (res) {
                    $.ajax({
                      type: "POST",
                      url: base_url + "Project/update_project_status_on_sos",
                      data: {
                        project_id: reference_id,
                        sos_count: res,
                      },
                      success: function (project_status) {
                        $.ajax({
                          type: "POST",
                          url: base_url + "Project/project_sos_number_count",
                          data: {
                            projectid: reference_id,
                            reference: "projects",
                            status: "unread",
                          },
                          success: function (unread_count_res) {
                            $.ajax({
                              type: "POST",
                              url:
                                base_url + "Project/project_sos_number_count",
                              data: {
                                projectid: reference_id,
                                reference: "projects",
                                status: "",
                              },
                              success: function (totals_count_res) {
                                if (unread_count_res == 0) {
                                  $("#total_sos_count_id_" + reference_id)
                                    .removeClass("label-danger")
                                    .addClass("label-secondary");
                                  document.getElementById(
                                    "total_sos_count_id_" + reference_id
                                  ).innerHTML = totals_count_res;
                                } else {
                                  $("#total_sos_count_id_" + reference_id)
                                    .removeClass("label-secondary")
                                    .addClass("label-danger");
                                  document.getElementById(
                                    "total_sos_count_id_" + reference_id
                                  ).innerHTML = unread_count_res;
                                }
                              },
                            });
                          },
                        });
                        $.ajax({
                          type: "POST",
                          url:
                            base_url + "Project/project_task_sos_number_count",
                          data: {
                            projectid: reference_id,
                            reference: "projects",
                            status: "unread",
                            taskid: task_id,
                          },
                          success: function (unread_count_res) {
                            $.ajax({
                              type: "POST",
                              url:
                                base_url +
                                "Project/project_task_sos_number_count",
                              data: {
                                projectid: reference_id,
                                reference: "projects",
                                status: "",
                                taskid: task_id,
                              },
                              success: function (total_count_res) {
                                if (unread_count_res.trim() == 0) {
                                  $(
                                    "#total_sos_count_id_" +
                                      reference_id +
                                      "_" +
                                      task_id
                                  )
                                    .removeClass("label-danger")
                                    .addClass("label-secondary");
                                  document.getElementById(
                                    "total_sos_count_id_" +
                                      reference_id +
                                      "_" +
                                      task_id
                                  ).innerHTML = total_count_res;
                                } else {
                                  $(
                                    "#total_sos_count_id_" +
                                      reference_id +
                                      "_" +
                                      task_id
                                  )
                                    .removeClass("label-secondary")
                                    .addClass("label-danger");
                                  document.getElementById(
                                    "total_sos_count_id_" +
                                      reference_id +
                                      "_" +
                                      task_id
                                  ).innerHTML = unread_count_res;
                                }
                              },
                            });
                          },
                        });

                        if (project_status == 1) {
                          var tracking_main = "Started";
                          var trk_class_main = "label label-yellow";
                        } else if (project_status == 5) {
                          var tracking_main = "Clarification";
                          var trk_class_main = "label label-info";
                        }
                        $("#trackouter-" + reference_id)
                          .removeClass()
                          .addClass(trk_class_main);
                        $("#trackouter-" + reference_id).html(tracking_main);
                      },
                    });
                    if (res == "0") {
                      //   $("#unread_sos_count-" + reference_id).removeClass('label label-danger').addClass('label label-secondary');
                    }
                    // $("#unread_sos_count-"+reference_id).html(res);
                  },
                });

                $("#showSos").modal("hide");
              },
            });
          } else if (reference == "action") {
            if (result == 1) {
              swal("Success", "SOS has been cleared Successfully!", "success");
            }
            $("#action" + reference_id)
              .find(".priority")
              .find(".m-t-5")
              .remove();
            // get_sos_count(); // only effective on By Me Count
            $.ajax({
              type: "POST",
              url: base_url + "action/home/get_action_sos_count",
              data: {
                reference_id: reference_id,
                status: "unread",
              },
              success: function (unread_count_res) {
                $.ajax({
                  type: "POST",
                  url: base_url + "action/home/get_action_sos_count",
                  data: {
                    reference_id: reference_id,
                    status: "",
                  },
                  success: function (total_count_res) {
                    if (unread_count_res.trim() != 0) {
                      $("#total_sos_count_id_" + reference_id)
                        .removeClass("label-secondary")
                        .addClass("label-danger");
                      document.getElementById(
                        "total_sos_count_id_" + reference_id
                      ).innerHTML = unread_count_res;
                    } else {
                      $("#total_sos_count_id_" + reference_id)
                        .removeClass("label-danger")
                        .addClass("label-secondary");
                      document.getElementById(
                        "total_sos_count_id_" + reference_id
                      ).innerHTML = total_count_res;
                    }
                    $("#actiontracking-" + reference_id)
                      .find("span")
                      .removeClass()
                      .addClass("label label-yellow");
                    $("#actiontracking-" + reference_id)
                      .find("span")
                      .html("Started");
                  },
                });
              },
            });
            $("#showSos").modal("hide");
          } else if (reference == "franchise_invoice") {
            if (result == 1) {
              swal("Success", "SOS has been cleared Successfully!", "success");
            }
            $("#franchise_invoice" + reference_id)
              .find(".priority")
              .find(".m-t-5")
              .remove();
            // get_sos_count(); // only effective on By Me Count
            $.ajax({
              type: "POST",
              url: base_url + "Franchisee/get_franchisee_sos_unread_count",
              data: {
                reference_id: reference_id,
                serviceid: service_id,
              },
              success: function (res) {
                if (res == 0) {
                  $("#soscount-" + reference_id)
                    .removeClass("label label-danger")
                    .addClass("label label-primary");
                  $("#soscount-" + reference_id).html(
                    '<i class="fa fa-plus"></i>'
                  );
                }
              },
            });
            $("#showSos").modal("hide");
          } else if (reference == "recurring_invoice") {
            if (result == 1) {
              swal("Success", "SOS has been cleared Successfully!", "success");
            }
            $("#invoice" + reference_id)
              .find(".priority")
              .find(".m-t-5")
              .remove();
            // get_sos_count(); // only effective on By Me Count
            $.ajax({
              type: "POST",
              url:
                base_url +
                "Billing/home/get_recurring_invoice_sos_unread_count",
              data: {
                reference_id: reference_id,
              },
              success: function (res) {
                if (res == 0) {
                  $("#soscount-" + reference_id)
                    .removeClass("label label-danger")
                    .addClass("label label-primary");
                  $("#soscount-" + reference_id).html(
                    '<i class="fa fa-plus"></i>'
                  );
                }
              },
            });
            $("#showSos").modal("hide");
          } else if (reference == "service_task") {
            if (result == 1) {
              swal("Success", "SOS has been cleared Successfully!", "success");
            }
            // get_sos_count(); // only effective on By Me Count
            $.ajax({
              type: "POST",
              url: base_url + "services/Home/get_service_task_sos_total_count",
              data: {
                orderid: reference_id,
                status: "unread",
              },
              success: function (unread_sos_count) {
                $.ajax({
                  type: "POST",
                  url:
                    base_url + "services/Home/get_service_task_sos_total_count",
                  data: {
                    orderid: reference_id,
                    status: "",
                  },
                  success: function (total_sos_count) {
                    // alert(unread_sos_count);
                    if (unread_sos_count.trim() != 0) {
                      document.getElementById(
                        "service_total_sos_count_id_" + reference_id
                      ).innerHTML = unread_sos_count;
                      $("#service_total_sos_count_id_" + reference_id)
                        .removeClass("label label-secondary")
                        .addClass("label label-danger");
                    } else {
                      document.getElementById(
                        "service_total_sos_count_id_" + reference_id
                      ).innerHTML = total_sos_count;
                      $("#service_total_sos_count_id_" + reference_id)
                        .removeClass("label label-danger")
                        .addClass("label label-secondary");
                    }
                  },
                });
              },
            });
            $("#showSos").modal("hide");
          }
        },
        beforeSend: function () {
          openLoading();
        },
        complete: function (msg) {
          closeLoading();
        },
      });
    } else {
      swal(
        "Unable to Clear!",
        "Please Give Some Response against SOS",
        "error"
      );
    }
  } else {
    swal({
      title: "Stop!!",
      text: "SOS Already Cleared!",
      icon: "success",
    });
  }
}
function get_sos_count() {
  //to  action note count
  $.ajax({
    url: base_url + "action/home/sos_count",
    success: function (result) {
      $("#sos-byme").replaceWith(
        "<span class='label label-danger'>" + result + "</span>"
      );
    },
  });
}
function setReply(user_id) {
  $("#showSos #sos_note_form_reply_" + user_id).show();
}

function addnewSos() {
  $("#showSos #replyto").val("");
  $("#showSos #add_sos_div").show();
}
function show_task_notes(id) {
  // alert(id);return false;
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_task_notes",
    data: {
      id: id,
    },
    success: function (result) {
      // alert(result);return false;
      $("#showTaskNotes #notes-modal-body").html(result);
      $("#showTaskNotes #taskid").val(id);
      $("#notecount-" + id)
        .removeClass("label label-danger")
        .addClass("label label-success");
      openModal("showTaskNotes");
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}
function show_project_notes(id) {
  // alert(id);return false;
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_project_notes",
    data: {
      id: id,
    },
    success: function (result) {
      // alert(result);return false;
      $("#showProjectNotes #notes-modal-body").html(result);
      $("#showProjectNotes #project_id").val(id);
      $("#notecount-" + id)
        .removeClass("label label-danger")
        .addClass("label label-success");
      openModal("showProjectNotes");
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

var file_upload_action = () => {
  if (!requiredValidation("file_upload_action_modal")) {
    return false;
  }
  var form_data = new FormData(
    document.getElementById("file_upload_action_modal")
  );
  var action_id = $("#action_id").val();
  $.ajax({
    type: "POST",
    data: form_data,
    url: base_url + "modal/file_upload_actions",
    dataType: "html",
    processData: false,
    contentType: false,
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      // console.log(result);return false;
      var oldactionfilecount = $("#actionfile" + action_id).attr("count");
      if (result.trim() == oldactionfilecount) {
        swal("ERROR!", "Unable To Add Empty File", "error");
      } else {
        swal(
          { title: "Success!", text: "Successfully Saved!", type: "success" },
          function () {
            // var oldactionfilecount = $("#actionfile" + action_id).attr('count');
            // var newactionfilecount = parseInt(oldactionfilecount) + parseInt(result.trim());
            //alert(newactionfilecount);
            $("#actionfilespan" + action_id).html(
              '<a class="label label-danger" href="javascript:void(0)" onclick="show_action_files(' +
                action_id +
                ')"><b>' +
                result +
                "</b></a>"
            );
          }
        );
      }
      document.getElementById("file_upload_action_modal").reset();
      $("#showFiles").modal("hide");
    },
    beforeSend: function () {
      $(".upload-file-butt").prop("disabled", true).html("Processing...");
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
};

var openActionNotificationModal = function (forvalue = "") {
  if (forvalue == "") {
    forvalue = $("#notifcation-toggle").attr("value");
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/action_notification_modal",
    data: {
      forvalue: forvalue,
    },
    success: function (result) {
      if (parseInt(result.trim()) !== 0) {
        $("#action_notification_modal #notification-modal-body").html(result);
        if (forvalue == "forother") {
          $("#notifcation-toggle").attr("value", "forme");
          $(".notification_title").attr("title", "For Others");
          $("#notification-clear").hide();
        } else {
          $("#notifcation-toggle").attr("value", "forother");
          $(".notification_title").attr("title", "For Me");
          $("#notification-clear").show();
        }

        openModal("action_notification_modal");
      } else {
        swal("ERROR!", "Notifications not found...!", "error");
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
};
function closeNotificationModal() {
  $("#notifcation-toggle").attr("value", "forme");
}
var openServiceNotificationModal = function (forvalue) {
  if (forvalue == "") {
    forvalue = $("#service-notifcation-toggle").attr("value");
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/service_notification_modal",
    data: {
      forvalue: forvalue,
    },
    success: function (result) {
      if (parseInt(result.trim()) !== 0) {
        $("#service_notification_modal #service-modal-body").html(result);
        if (forvalue == "forother") {
          $("#service-notifcation-toggle").attr("value", "forme");
          $(".service_title").attr("title", "For Others");
          $("#service-notification-clear").hide();
        } else {
          $("#service-notifcation-toggle").attr("value", "forother");
          $(".service_title").attr("title", "For Me");
          $("#service-notification-clear").show();
        }
        openModal("service_notification_modal");
      } else {
        swal("ERROR!", "Notifications not found...!", "error");
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
};
function closeServiceNotificationModal() {
  $("#service-notifcation-toggle").attr("value", "forme");
}

var openNotificationModal = function (forvalue) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/notification_modal",
    data: {
      forvalue: forvalue,
    },
    success: function (result) {
      if (parseInt(result.trim()) !== 0) {
        $("#notification_modal #notification-modal-body").html(result);
        openModal("notification_modal");
      } else {
        swal("ERROR!", "Notifications not found...!", "error");
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
};

var openNotificationModalRecurring = function (forvalue) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/recurring_invoice_notification_modal",
    data: {
      forvalue: forvalue,
    },
    success: function (result) {
      if (parseInt(result.trim()) !== 0) {
        $("#notification_modal #notification-modal-body").html(result);
        openModal("notification_modal");
      } else {
        swal("ERROR!", "Notifications not found...!", "error");
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
};

var openProjectNotificationModal = function () {
  $.ajax({
    type: "GET",
    url: base_url + "modal/project_notification_modal",
    success: function (result) {
      if (parseInt(result.trim()) !== 0) {
        $("#action_notification_modal #notification-modal-body").html(result);
        openModal("action_notification_modal");
      } else {
        swal("ERROR!", "Notifications not found...!", "error");
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
};
function sos_filter_project(dashboard_type, byval) {
  if (byval == "byme") {
    by = "By Me";
  } else {
    by = "To Me";
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/sos_filter_project",
    data: {
      dashboard_type: dashboard_type,
      byval: byval,
    },
    success: function (result) {
      if (dashboard_type == "order") {
        $(".ajaxdiv").html(result);
        $(".filter-text").addClass("btn btn-ghost");
        $(".filter-text").html(
          '<span class="byclass ' +
            byval +
            '">Sos ' +
            by +
            ' <a href="javascript:void(0);" onclick="clear_sos_filter();"><i class="fa fa-times" aria-hidden="true"></i></a></span>'
        );
        $("#hiddenflag").val("");
      } else {
        $("#action_dashboard_div").html(result);
        $("[data-toggle=popover]").popover();
        $("#clear_filter").html("Sos" + by);
        $("#clear_filter").show();
        $("#btn_clear_filter").show();
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}
function clearActionNotificationList(userid) {
  swal(
    {
      title: "Are you sure?",
      text: "You will not be able to recover this Notifications!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, cancel plz!",
      closeOnConfirm: false,
      closeOnCancel: true,
    },
    function (isConfirm) {
      if (isConfirm) {
        $.ajax({
          type: "POST",
          url: base_url + "home/clear_notification_list",
          data: {
            userid: userid,
            reference: "action",
          },
          success: function (result) {
            if (result) {
              swal(
                "Deleted!",
                "Your imaginary file has been deleted.",
                "success"
              );
              $("#action_notification_modal").hide();
              goURL(base_url + "action/home");
            }
          },
          beforeSend: function () {
            openLoading();
          },
          complete: function (msg) {
            closeLoading();
          },
        });
      }
    }
  );
}
function clearServiceNotificationList(userid) {
  swal(
    {
      title: "Are you sure?",
      text: "You will not be able to recover this Notifications!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, cancel plz!",
      closeOnConfirm: false,
      closeOnCancel: true,
    },
    function (isConfirm) {
      if (isConfirm) {
        $.ajax({
          type: "POST",
          url: base_url + "home/clear_notification_list",
          data: {
            userid: userid,
            reference: "order",
          },
          success: function (result) {
            if (result) {
              swal(
                "Deleted!",
                "Your imaginary file has been deleted.",
                "success"
              );
              $("#service_notification_modal").hide();
              goURL(base_url + "services/home");
            }
          },
          beforeSend: function () {
            openLoading();
          },
          complete: function (msg) {
            closeLoading();
          },
        });
      }
    }
  );
}
function readActionNotification(notificationID, reference) {
  $.ajax({
    type: "POST",
    url: base_url + "home/read_notification",
    data: {
      notification_id: notificationID,
      reference: reference,
    },
    success: function (result) {
      if (parseInt(result.trim()) != 0) {
        openActionNotificationModal("forme");
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

function buyer_info_modal(
  modal_type,
  reference = "",
  reference_id = "",
  id = ""
) {
  if (reference == "") {
    var reference = $("#reference").val();
  }
  if (reference_id == "") {
    var reference_id = $("#reference_id").val();
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/buyer_info_modal",
    data: {
      modal_type: modal_type,
      reference: reference,
      reference_id: reference_id,
      order_id: $("#editval").val(),
      id: id,
    },
    success: function (result) {
      $("#buyer_info_modal_div").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

function seller_info_modal(
  modal_type,
  reference = "",
  reference_id = "",
  id = ""
) {
  if (reference == "") {
    var reference = $("#reference").val();
  }
  if (reference_id == "") {
    var reference_id = $("#reference_id").val();
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/seller_info_modal",
    data: {
      modal_type: modal_type,
      reference: reference,
      reference_id: reference_id,
      order_id: $("#editval").val(),
      id: id,
    },
    success: function (result) {
      $("#seller_info_modal_div").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

function sos_filter_task(dashboard_type, byval) {
  if (byval == "byme") {
    by = "By Me";
  } else {
    by = "To Me";
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/sos_filter_task",
    data: {
      dashboard_type: dashboard_type,
      byval: byval,
    },
    success: function (result) {
      if (dashboard_type == "order") {
        $(".ajaxdiv").html(result);
        $(".filter-text").addClass("btn btn-ghost");
        $(".filter-text").html(
          '<span class="byclass ' +
            byval +
            '">Sos ' +
            by +
            ' <a href="javascript:void(0);" onclick="clear_sos_filter();"><i class="fa fa-times" aria-hidden="true"></i></a></span>'
        );
        $("#hiddenflag").val("");
      } else {
        $("#task_dashboard_div").html(result);
        $("[data-toggle=popover]").popover();
        $("#clear_filter").html("Sos" + by);
        $("#clear_filter").show();
        $("#btn_clear_filter").show();
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

function add_leads_modal(modal_type, id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/add_lead_modal",
    data: {
      modal_type: modal_type,
      id: id,
    },
    success: function (result) {
      $("#addlead-form-modal").show();
      $("#addlead-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

function save_add_leads_modal() {
  // alert("ok"); return false;
  if (!requiredValidation("add_leads_form")) {
    return false;
  }
  // alert("hi");return false;
  var form_data = new FormData(document.getElementById("add_leads_form"));
  $.ajax({
    type: "POST",
    data: form_data,
    url: base_url + "lead_management/event/save_add_leads_modal",
    dataType: "html",
    // enctype: 'multipart/form-data',
    cache: false,
    processData: false,
    contentType: false,
    success: function (result) {
      // console.log(result);return false;

      $.ajax({
        type: "POST",
        data: { id: result },
        url: base_url + "lead_management/event/leads_list",
        dataType: "html",
        success: function (data) {
          // alert(data); return false;
          $("#leads_information").append(data);
          $("#addlead-form-modal").modal("hide");
        },
        beforeSend: function () {
          openLoading();
        },
        complete: function (msg) {
          closeLoading();
        },
      });

      // addlead_info(result);
      $("#lead_id").append(
        '<div><input type="hidden" name="lead_id[]" value=' +
          result +
          " /></div>"
      );
      // }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

function update_addlead_modal(id) {
  // alert(id);return false;
  var form_data = new FormData(document.getElementById("edit_addleads_form"));
  $.ajax({
    type: "POST",
    data: form_data,
    url: base_url + "lead_management/event/update_addlead_modal/" + id,
    dataType: "html",
    // enctype: 'multipart/form-data',
    cache: false,
    processData: false,
    contentType: false,
    success: function (result) {
      // console.log(result);return false;
      if (result.trim() == 1) {
        swal("Success!", "Successfully updated lead!", "success");
        $("#addlead-form-modal").modal("hide");

        $.ajax({
          type: "POST",
          data: { id: id },
          url: base_url + "lead_management/event/leads_list",
          dataType: "html",
          success: function (data) {
            // alert(data); return false;
            $("#lead_info_div_" + id).html(data);
            // $('#addlead-form-modal').modal('hide');
          },
          beforeSend: function () {
            openLoading();
          },
          complete: function (msg) {
            closeLoading();
          },
        });

        $.ajax({
          type: "POST",
          data: { id: id },
          url: base_url + "lead_management/event/show_event_edit_details",
          dataType: "html",
          success: function (data) {
            $("#lead_info_div_" + id).html(data);
          },
          beforeSend: function () {
            openLoading();
          },
          complete: function (msg) {
            closeLoading();
          },
        });

        //   $.get(base_url + "lead_management/event/leads_list/" + id, function (data) {
        //     $("#lead_id" + id).replaceWith(data);
        //     $('#addlead-form-modal').modal('hide');
        // });
      } else {
        swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
      }
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}

function show_project_task_notes(
  id,
  project_task_id = "",
  client_id = "",
  client_type = ""
) {
  //  alert(id);return false;
  var project_id = project_task_id.split("-");
  var projectid = project_id[0];
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_project_task_notes",
    data: {
      id: id,
      project_task_id: project_task_id,
      client_id: client_id,
      client_type: client_type,
    },
    success: function (result) {
      $("#total_notes_count_id_" + projectid)
        .removeClass("label-danger")
        .addClass("label-secondary");
      $("#total_notes_count_id_" + id)
        .removeClass("label-danger")
        .addClass("label-secondary");

      // $.ajax({
      //      type: 'POST',
      //      url: base_url + 'Project/project_task_notes_count',
      //      data: {
      //          status:'unread',
      //          taskid:id

      //      },
      //      success: function (unread_note_count_res1) {
      //          $.ajax({
      //              type: 'POST',
      //              url: base_url + 'Project/project_task_notes_count',
      //              data: {
      //                  status:'read',
      //                  taskid:id
      //              },
      //              success: function (read_notes_count_res1) {

      //                  document.getElementById("unread_notes_count_id_"+id).innerHTML = unread_note_count_res1;
      //                  document.getElementById("read_notes_count_id_"+id).innerHTML = read_notes_count_res1;
      //              }
      //          });
      //      }
      //  });

      $("#showProjectTaskNotes #notes-modal-body").html(result);
      $("#showProjectTaskNotes #taskid").val(id);
      $("#showProjectTaskNotes #projectid").val(project_id[0]);
      $("#notecount-" + id)
        .removeClass("label label-danger")
        .addClass("label label-success");
      openModal("showProjectTaskNotes");
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}
function show_task_files(
  id,
  staff,
  project_task_id = "",
  client_id = "",
  client_type = ""
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_task_files",
    data: {
      id: id,
      staff: staff,
      project_task_id: project_task_id,
      client_id: client_id,
      client_type: client_type,
    },
    success: function (result) {
      if (
        $("#taskfilespan" + id)
          .find("a")
          .hasClass("label-danger")
      ) {
        $("#taskfilespan" + id)
          .find("a")
          .removeClass("label-danger");
        $("#taskfilespan" + id)
          .find("a")
          .addClass("label-success");
      }
      $("#showTaskFiles #files-modal-body").html(result);
      openModal("showTaskFiles");
    },
  });
}
var file_upload_task = () => {
  if (!requiredValidation("file_upload_task_modal")) {
    return false;
  }
  var form_data = new FormData(
    document.getElementById("file_upload_task_modal")
  );
  var task_id = $("#task_id").val();
  $.ajax({
    type: "POST",
    data: form_data,
    url: base_url + "modal/file_upload_task",
    dataType: "html",
    processData: false,
    contentType: false,
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      // console.log(result);return false;
      var oldactionfilecount = $("#taskfile" + task_id).attr("count");
      if (result.trim() == oldactionfilecount) {
        swal("ERROR!", "Unable To Add Empty File", "error");
      } else {
        swal(
          { title: "Success!", text: "Successfully Saved!", type: "success" },
          function () {
            // var oldactionfilecount = $("#actionfile" + action_id).attr('count');
            // var newactionfilecount = parseInt(oldactionfilecount) + parseInt(result.trim());
            //alert(newactionfilecount);
            window.location.reload();
          }
        );
      }
      document.getElementById("file_upload_task_modal").reset();
      $("#showTaskFiles").modal("hide");
    },
    beforeSend: function () {
      $(".upload-file-butt").prop("disabled", true).html("Processing...");
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
};
function task_account_modal(modal_type, id = "", section = "") {
  // alert(section);return false;
  var reference_id = $("#reference_id").val();

  var bookkeeping_input_type = $("#bookkeeping_input_type_1").val();
  var sos_data_1 = $("#sos_data_1").val();
  var task_id_1 = $("#task_id_1").val();
  //    var exist_client_id=$("#exist_client_id").val();
  //    if ($("#editval").val() == '') {
  //        reference_id = $("#new_reference_id").val();
  //    }
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_task_financial_account",
    data: {
      modal_type: modal_type,
      id: id,
      client_id: reference_id,
      task_id: $("#editval").val(),
      section: section,
      bookkeeping_input_type: bookkeeping_input_type,
      sos_data_1: sos_data_1,
      task_id_1: task_id_1,
    },
    success: function (result) {
      // alert(result);return false;
      if (result) {
        $("#accounts-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
        $("#bookkeeping_account_list").show();
      } else {
        $("#bookkeeping_account_list").hide();
        $("#acc_type").val("");
        $("#bank_name").val("");
        $("#acc_no").val("");
        $("#routing_no").val("");
        $("#website").val("");
        $("#user_id").val("");
        $("#password").val("");
      }
    },
  });
}

function get_service_setup_task_modal(service_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/get_service_setup_task_modal",
    dataType: "html",
    data: { service_id: service_id },
    success: function (result) {
      $("#serviceTaskModal").modal();
      $("#serviceTaskModal").html(result);
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}
function show_project_task_assign_modal(
  task_id,
  project_id = "",
  practice_id = ""
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_project_task_assign_modal",
    data: {
      task_id: task_id,
      project_id: project_id,
      practice_id: practice_id,
    },
    success: function (result) {
      $("#task_assign_modal").show();
      $("#task_assign_modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function view_account_modal(id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/view_account_modal",
    data: {
      id: id,
    },
    success: function (result) {
      if (result) {
        $("#view-accounts-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}
function sales_tax_info_modal(modal_type, id = "") {
  var client_id = $("#reference_id").val();
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_sales_tax_info_modal",
    data: {
      modal_type: modal_type,
      id: id,
      client_id: client_id,
    },
    success: function (result) {
      if (result) {
        $("#salestax-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}
function client_business_info_modal(
  modal_type,
  reference_id = "",
  id = "",
  urlid = ""
) {
  //var client_id = $("#reference_id").val();
  // alert(client_id);return false;
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_client_business_info_modal",
    data: {
      modal_type: modal_type,
      id: id,
      reference_id: reference_id,
      //state_name:state_name,
      urlid: urlid,
    },
    success: function (result) {
      // console.log(result);return false;
      if (result) {
        $("#business-info-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}
function business_info(modal_type, state = "", reference_id = "", urlid = "") {
  var client_id = $("#reference_id").val();
  // alert(client_id); return false;
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_business_info",
    data: {
      modal_type: modal_type,
      state: state,
      client_id: client_id,
      reference_id: reference_id,
      urlid: urlid,
    },
    success: function (result) {
      // alert(result);return false;
      if (result) {
        $("#business-info-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}
function save_sales_tax_info(id = "") {
  if (!requiredValidation("salestax_form")) {
    return false;
  }
  var form_data = new FormData(document.getElementById("salestax_form"));
  var client_id = $("#client_id").val();
  var company_id = $("#company_id").val();
  if (id == "") {
    form_data.append("client_id", client_id);
  } else {
    form_data.append("id", id);
  }
  $.ajax({
    type: "POST",
    data: form_data,
    url: base_url + "services/accounting_services/save_sales_tax_info",
    dataType: "html",
    processData: false,
    contentType: false,
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      if (result == 1) {
        swal("Success", "Sales Tax Information Saved Successfully.", "success");
        $("#salestax-form").modal("hide");
        goURL(
          base_url + "action/home/view_business/" + client_id + "/" + company_id
        );
      }
      // else if(result == 2){
      //     swal("Success", "Sales Tax Information Saved Successfully.", "success");
      //     $('#salestax-form').modal('hide');
      //     goURL(base_url + 'action/home/edit_business/' + client_id + '/' + company_id);
      // }
      else {
        swal(
          "Error",
          "Sales Tax Information Already Exist. Please Choose Different County",
          "error"
        );
      }
    },
  });
}
function save_client_business_info(id = "") {
  if (!requiredValidation("business_info_form")) {
    return false;
  }

  var form_data = new FormData(document.getElementById("business_info_form"));
  form_data.append("id", id);
  var param1 = $("#reference_id").val();
  var param2 = $("#urlid").val();
  $.ajax({
    type: "POST",
    data: form_data,
    url: base_url + "services/accounting_services/save_client_business_info",
    dataType: "html",
    processData: false,
    contentType: false,
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      // console.log(result);return false;
      if (result == 1) {
        swal("Success", "Client Business Info Saved Successfully.", "success");
        $("#business_info_form").modal("hide");
        goURL(base_url + "action/home/view_business/" + param1 + "/" + param2);
      }
    },
  });
}

function financial_account_modal_for_manage_bookkeeping(modal_type, id = "") {
  var reference_id = $("#client_list_ddl_file_cabinet").val();
  var reference = $(".client_type:checked").val();
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_financial_account_modal",
    data: {
      modal_type: modal_type,
      id: id,
      reference_id: reference_id,
      reference: reference,
    },
    success: function (result) {
      $("#accounts-form").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function load_staff_list_by_assign_department(
  department_id,
  office_id = "",
  practice_id = ""
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/get_staff_list_by_assign_department",
    data: {
      department_id: department_id,
      office_id: office_id,
      practice_id: practice_id,
    },
    success: function (result) {
      $("#assign_department_staff_div").html(result);
    },
  });
}

function show_financial_price_modal(id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_financial_price_modal",
    data: { id: id },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#financial-price-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_financial_base_price_modal(id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_financial_base_price_modal",
    data: { id: id },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#financial-base-price-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function financial_account_modal_for_sales_tax(modal_type, id = "") {
  var new_reference_id = $("#current_reference_id").val();
  // if ($("#editval").val() == '') {
  var reference_id = $("#reference_id").val();
  // }
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_financial_account_modal_for_sales_tax",
    data: {
      modal_type: modal_type,
      reference_id: reference_id,
      new_reference_id: new_reference_id,
      id: id,
      order_id: $("#editval").val(),
    },
    success: function (result) {
      $("#accounts-form").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function set_exist_client_financial_value(
  id,
  account_type,
  bank_name,
  account_no,
  routing_no,
  bank_url,
  user,
  password,
  transactions,
  total_amount
) {
  if (bank_name != "" || account_no != "") {
    $("#financial_id").val(id);
    $("#acc_type").val(account_type);
    // $("#acc_type").css('pointer-events','none');
    $("#bank_name").val(bank_name);
    $("#acc_no").val(account_no);
    $("#routing_no").val(routing_no);
    $("#website").val(bank_url);
    $("#user_id").val(user);
    $("#password").val(password);
    $("#no_of_transactions").val(transactions);
    $("#total_amount").val(total_amount);
    $("#sub_btn").html("Save");
  } else {
    $("#financial_id").val("");
    $("#acc_type").val("");
    $("#bank_name").val("");
    $("#acc_no").val("");
    $("#routing_no").val("");
    $("#website").val("");
    $("#user_id").val("");
    $("#password").val("");
    $("#no_of_transactions").val(transactions);
    $("#total_amount").val(total_amount);
    $("#sub_btn").html("Save changes");
  }
}

function show_all_client_invoice(client_id = "", total_due, section) {
  if (total_due == 0) {
    swal("Paid!", "You have no current due!", "success");
    return false;
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_clients__all_invoice",
    data: {
      client_id: client_id,
      section: section,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#client_invoice_payment").html(result);
      $("#client_invoice_payment").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function add_business_custom_field(modal_type, cus_id, reference_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/add_business_custom_field",
    data: {
      modal_type: modal_type,
      cus_id: cus_id,
      reference_id: reference_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#salestax-form").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function task_account_modal_for_client(modal_type, id = "", section = "") {
  // alert(section);return false;
  var reference_id = $("#reference_id").val();

  var bookkeeping_input_type = $("#bookkeeping_input_type_1").val();
  var sos_data_1 = $("#sos_data_1").val();
  var task_id_1 = $("#task_id_1").val();
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_task_financial_account_for_client",
    data: {
      modal_type: modal_type,
      id: id,
      client_id: reference_id,
      task_id: $("#editval").val(),
      section: section,
      bookkeeping_input_type: bookkeeping_input_type,
      sos_data_1: sos_data_1,
      task_id_1: task_id_1,
    },
    success: function (result) {
      if (result) {
        $("#accounts-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
        $("#bookkeeping_account_list").show();
      } else {
        $("#bookkeeping_account_list").hide();
        $("#acc_type").val("");
        $("#bank_name").val("");
        $("#acc_no").val("");
        $("#routing_no").val("");
        $("#website").val("");
        $("#user_id").val("");
        $("#password").val("");
      }
    },
  });
}

function view_account_modal2(id, section) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/view_account_modal2",
    data: {
      id: id,
      section: section,
    },
    success: function (result) {
      if (result) {
        $("#view-accounts-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}

function show_interactions_modal(modal_type, in_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_interactions_modal",
    data: {
      modal_type: modal_type,
      in_id: in_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#interactions-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function open_owner_appplication_modal(
  modal_type,
  reference_id,
  service_id,
  id = ""
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_owner_appplication_modal",
    data: {
      modal_type: modal_type,
      reference_id: reference_id,
      service_id: service_id,
      id: id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#open_owner_appplication_modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function open_project_financial_acc_details_modal(fin_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_project_financial_acc_details_modal",
    data: {
      fin_id: fin_id,
    },
    success: function (result) {
      if (result) {
        $("#view-accounts-form-projects").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}
function show_project_financial_attachment_modal(fin_id, task_id, project_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_project_financial_attachment_modal",
    data: {
      fin_id: fin_id,
      task_id: task_id,
      project_id: project_id,
    },
    success: function (result) {
      if (result) {
        $("#showFiles #files-modal-body").html(result);
        openModal("showFiles");
      }
    },
  });
}

var file_upload_project_financial_attachment = () => {
  if (!requiredValidation("file_upload_project_financial_attachment_modal")) {
    return false;
  }
  var form_data = new FormData(
    document.getElementById("file_upload_project_financial_attachment_modal")
  );
  var action_id = $("#fin_id").val();
  $.ajax({
    type: "POST",
    data: form_data,
    url: base_url + "modal/file_upload_project_financial_attachment",
    dataType: "html",
    processData: false,
    contentType: false,
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      swal(
        { title: "Success!", text: "Successfully Saved!", type: "success" },
        function () {
          window.location.reload();
        }
      );
      document
        .getElementById("file_upload_project_financial_attachment_modal")
        .reset();
      $("#showFiles").modal("hide");
    },
    beforeSend: function () {
      $(".upload-file-butt").prop("disabled", true).html("Processing...");
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
};

function client_active_inactive_date(client_type, client_id, date_type) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/client_active_inactive_date",
    data: {
      client_type: client_type,
      client_id: client_id,
      date_type: date_type,
    },
    success: function (result) {
      if (result) {
        $("#client_date_modal").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}
function show_categories_modal(modal_type, in_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_categories_modal",
    data: {
      modal_type: modal_type,
      in_id: in_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#category-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function show_uploaded_document(
  brand = "",
  franchise = "",
  client_type = "",
  client_id = ""
) {
  // console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id);
  // $('#loader-icon').show(1000);
  $.ajax({
    async: true,
    crossDomain: true,
    type: "POST",
    data: {
      brand: brand,
      franchise: franchise,
      client_type: client_type,
      client_id: client_id,
    },
    // url: "https://localhost:9099/api/SharePoint/GetFileList",
    url: "https://dev2.taxleaf.com:9099/api/SharePoint/GetFileList",
    //dataType: "html",
    //processData: false,
    //contentType: false,
    cache: false,
    success: function (result) {
      var files = "";
      files += '<ul style="list-style-type:none;" class="m-0 p-0">';
      for (var i = 0; i < result.value.length; i++) {
        // console.log(result.value[i].Name);
        var extension = result.value[i].Name.trim().split(".")[1];
        var cls = "";
        if (extension == "JPG" || extension == "png") {
          cls = "fa fa-file-image-o";
        } else if (extension == "docx") {
          cls = "fa fa-file-word-o";
        } else if (extension == "pdf") {
          cls = "fa fa-file-pdf-o";
        } else if (extension == "txt") {
          cls = "fa fa-file-text-o";
        } else {
          cls = "fa fa-file";
        }
        files +=
          '<li><a href="javascript:void(0);"><i class="' +
          cls +
          '"></i>&nbsp;&nbsp;' +
          result.value[i].Name.trim() +
          "</a></li>";
      }
      files += "</ul>";
      $("#document-list-sharepoint").html(files);
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
      jumpDiv();
    },
  });
}
// collections dashboard's modal function
function open_service_modal(invoice_id = "") {
  $.ajax({
    type: "GET",
    url: base_url + "modal/open_service_modal/" + invoice_id,
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#service_open_modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_collection_payment_modal() {
  $.ajax({
    type: "GET",
    url: base_url + "modal/show_collection_payment_modal",
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#collection_payment_modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function client_family_modal(
  type,
  reference_id,
  reference,
  client_family_id = ""
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/client_family_modal",
    data: {
      type: type,
      reference_id: reference_id,
      reference: reference,
      client_family_id: client_family_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#client_family_form").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function delete_sos_attachment(reference_id, reference) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/delete_sos_attachment",
    data: {
      reference_id: reference_id,
      reference: reference,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      swal(
        {
          title: "Success!",
          text: "Attachment Removed Successfully",
          type: "success",
        },
        function () {
          $("#showSos").modal("hide");
        }
      );
    },
  });
}

function account_modal_for_recurring_bookkeeping(
  modal_type = "",
  financial_id = ""
) {
  var reference_id = $("#reference_id").val();
  var reference = $("#reference").val();
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_financial_account_for_recurring_bookkeeping",
    data: {
      modal_type: modal_type,
      reference_id: reference_id,
      reference: reference,
      order_id: $("#editval").val(),
      id: financial_id,
    },
    success: function (result) {
      if (result) {
        $("#accounts-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}

function account_modal_for_bookkeeping_by_date(
  modal_type = "",
  financial_id = ""
) {
  var reference_id = $("#reference_id").val();
  var reference = $("#reference").val();
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_financial_account_for_bookkeeping_by_date",
    data: {
      modal_type: modal_type,
      reference_id: reference_id,
      reference: reference,
      order_id: $("#editval").val(),
      id: financial_id,
    },
    success: function (result) {
      if (result) {
        $("#accounts-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}

function open_owner_for_application_modal(
  modal_type,
  reference_id = "",
  service_id = "",
  owner_app_id = ""
) {
  var reference = $("#reference").val();
  if (reference_id == "") {
    var reference_id = $("#new_reference_id").val(); // Auto-generated id
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_owner_for_application_modal",
    data: {
      modal_type: modal_type,
      reference_id: reference_id,
      reference: reference,
      service_id: service_id,
      order_id: $("#editval").val(),
      owner_app_id: owner_app_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#owner-for-application-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function account_modal_for_sales_tax_recurring(
  modal_type = "",
  financial_id = ""
) {
  var reference_id = $("#reference_id").val();
  var reference = $("#reference").val();
  var financial_ids_hidd = $("#financial_id_hidd").val();
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_financial_account_for_sales_tax_recurring",
    data: {
      modal_type: modal_type,
      reference_id: reference_id,
      reference: reference,
      financial_ids_hidd: financial_ids_hidd,
      order_id: $("#editval").val(),
      id: financial_id,
    },
    success: function (result) {
      if (result) {
        $("#accounts-form").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}

function delete_aciton_attachment(id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/delete_aciton_attachment",
    data: {
      id: id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      swal(
        {
          title: "Success!",
          text: "Attachment Removed Successfully",
          type: "success",
        },
        function () {
          $("#showFiles").modal("hide");
          window.location.reload();
        }
      );
    },
  });
}

function show_referred_modal(modal_type, id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_referred_modal",
    data: {
      modal_type: modal_type,
      id: id,
    },
    success: function (result) {
      $("#referred-form-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_manage_payroll_price_modal(modal_type, id = "") {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_manage_payroll_price_modal",
    data: {
      modal_type: modal_type,
      id: id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#manage-payroll-price-modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function show_add_new_company_setup_modal(modal_type, id = "") {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_add_new_company_setup_modal",
    data: {
      modal_type: modal_type,
      id: id,
    },
    success: function (result) {
      if (result) {
        $("#new_company-form-modal").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}

function open_assistant_div(staff_id = "") {
  var check = document.getElementById("staff_role").checked;
  if (check == true) {
    var office_id = $("#office").val();
    $.ajax({
      type: "POST",
      url: base_url + "modal/open_assistant_div",
      data: {
        office_id: office_id,
        staff_id: staff_id,
      },
      success: function (result) {
        if (result) {
          $("#assistant_div").show();
          $("#assistant_div").html(result);
        }
      },
    });
  } else {
    $("#assistant_div").hide();
    $("#assistant").val("");
    $("#assistant").attr("required", false);
  }
}
function show_project_all_task_notes(
  project_id,
  client_id = "",
  client_type = ""
) {
  //     alert(id);return false;
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_project_all_task_notes",
    data: {
      project_id: project_id,
      client_id: client_id,
      client_type: client_type,
    },
    success: function (result) {
      //             alert(result);return false;
      $("#showAllProjectTaskNotes #notes-modal-body").html(result);
      openModal("showAllProjectTaskNotes");
    },
    beforeSend: function () {
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
}
function show_all_project_sos(reference, project_id, client_id, client_type) {
  if (project_id == "") {
    project_id = "0";
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_all_project_sos",
    data: {
      reference: reference,
      project_id: project_id,
      client_type: client_type,
      client_id: client_id,
    },
    success: function (result) {
      // console.log(result);return false;
      $("#showAllProjctSos #all-sos-modal-body").html(result);
      $("#showAllProjctSos").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function show_all_project_task_files(
  id,
  staff,
  project_task_id = "",
  client_id = "",
  client_type = ""
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_all_project_task_files",
    data: {
      id: id,
      staff: staff,
      project_task_id: project_task_id,
      client_id: client_id,
      client_type: client_type,
    },
    success: function (result) {
      if (
        $("#taskfilespan" + id)
          .find("a")
          .hasClass("label-danger")
      ) {
        $("#taskfilespan" + id)
          .find("a")
          .removeClass("label-danger");
        $("#taskfilespan" + id)
          .find("a")
          .addClass("label-success");
      }
      $("#showAllProjectTaskFiles #files-modal-body").html(result);
      openModal("showAllProjectTaskFiles");
    },
  });
}
function open_service_description_modal(service_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_service_description_modal",
    data: {
      service_id: service_id,
    },
    success: function (result) {
      if (result) {
        $("#service-details-modal").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}

function show_service_task_sos(
  reference,
  service_id,
  staffs,
  order_id,
  service_req_id,
  dept,
  resp_staff_id,
  client_id,
  new_serial_id,
  resp_office
) {
  if (service_id == "") {
    service_id = "0";
  }
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_service_task_sos",
    data: {
      reference: reference,
      service_id: service_id,
      staffs: staffs,
      order_id: order_id,
      service_req_id: service_req_id,
      dept: dept,
      resp_staff_id: resp_staff_id,
      client_id: client_id,
      new_serial_id: new_serial_id,
      resp_office: resp_office,
    },
    success: function (result) {
      // #notes-modal-body
      $("#showSos").html(result);
      $("#showSos").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

var file_upload_service_input_form = () => {
  if (!requiredValidation("file_upload_service_input")) {
    return false;
  }
  var form_data = new FormData(
    document.getElementById("file_upload_service_input")
  );
  var service_request_id = $("#service_request_id").val();
  $.ajax({
    type: "POST",
    data: form_data,
    url: base_url + "modal/file_upload_service_input_form",
    dataType: "html",
    processData: false,
    contentType: false,
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      swal(
        { title: "Success!", text: "Successfully Saved!", type: "success" },
        function () {
          $(".collapse").collapse("hide");
        }
      );
      document.getElementById("file_upload_service_input").reset();
      $("#modal_area_attach").modal("hide");
    },
    beforeSend: function () {
      $(".upload-file-butt").prop("disabled", true).html("Processing...");
      openLoading();
    },
    complete: function (msg) {
      closeLoading();
    },
  });
};

function show_project_assign_modal(project_id, user_type) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_project_assign_modal",
    data: {
      project_id: project_id,
      user_type: user_type,
    },
    success: function (result) {
      $("#project_assign_modal").show();
      $("#project_assign_modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function load_staff_list(department_id, office_id = "") {
  $.ajax({
    type: "POST",
    url: base_url + "modal/get_staff_list",
    data: {
      department_id: department_id,
      office_id: office_id,
    },
    success: function (result) {
      $("#assign_department_staff_div").html(result);
    },
  });
}

function show_responsible_staff_select_modal(project_id, resp_name) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/show_project_responsible_staff_assign_modal",
    data: {
      project_id: project_id,
      resp_name: resp_name,
    },
    success: function (result) {
      $("#project_assign_modal").show();
      $("#project_assign_modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function open_receipt_modal(payment_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_payment_receipt_modal",
    data: {
      payment_id: payment_id,
    },
    success: function (result) {
      $("#payment_receipt_modal").show();
      $("#payment_receipt_modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function open_service_by_state_model(
  modal_type,
  service_id = "",
  service_by_state_id = ""
) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_service_by_state_model",
    data: {
      modal_type: modal_type,
      service_id: service_id,
      service_by_state_id: service_by_state_id,
    },
    success: function (result) {
      if (result) {
        $("#service_by_state_model_form_modal").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}
function service_by_state() {
  if (
    $("#retailprice_form").val() == "" ||
    $("#retailprice_form").val() == undefined
  ) {
    swal("Required", "Retail Price Required", "warning");
  }
  if ($("#cost_form").val() == "" || $("#cost_form").val() == undefined) {
    swal("Required", "Fixed Cost Required", "warning");
  }
  if (!requiredValidation("service_by_state_form")) {
    return false;
  }
  var form_data = new FormData(
    document.getElementById("service_by_state_form")
  );
  $.ajax({
    type: "POST",
    url: base_url + "administration/service_setup/service_by_state",
    data: form_data,
    enctype: "multipart/form-data",
    cache: false,
    contentType: false,
    processData: false,
    success: function (result) {
      $("#service_by_state_model_form_modal").modal("hide");
      // console.log(result); return false;
      result = result.trim();
      if (result == 1) {
        swal(
          { title: "Success!", text: "Successfully added!", type: "success" },
          function () {
            location.reload();
          }
        );
      } else if (result == 2) {
        swal(
          { title: "Success!", text: "Successfully Updated!", type: "success" },
          function () {
            location.reload();
          }
        );
      } else if (result == 3) {
        swal("ERROR!", "This State is already exsits", "error");
      } else {
        swal("ERROR!", "Error!", "error");
      }
    },
  });
}

function service_by_state_delete(delete_id, status) {
  if (status == 1) {
    var war = "Active";
  } else {
    var war = "Inactive";
  }
  swal(
    {
      title: "Are you sure?",
      text: "You want to " + war + "!",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, proceed it!",
      cancelButtonText: "No, cancel please!",
      closeOnConfirm: true,
      closeOnCancel: true,
    },
    function (isConfirm) {
      if (isConfirm) {
        $.ajax({
          type: "POST",
          url:
            base_url + "administration/service_setup/delete_service_by_state",
          data: { delete_id: delete_id, status: status },
          cache: false,
          success: function (result) {
            // console.log(result); return false;
            result = result.trim();
            if (result == 1) {
              swal(
                {
                  title: "Success!",
                  text: "Successfully " + war + "!",
                  type: "success",
                },
                function () {
                  location.reload();
                }
              );
            } else {
              swal("ERROR!", "Error!", "error");
            }
          },
        });
      }
    }
  );
}

// function open_new_add_owner_modal(company_id , company_type , office_id , section , title_id = '') {
//     $.ajax({
//         type: 'POST',
//         url: base_url + 'modal/open_new_add_owner_modal',
//         data: {
//             company_id: company_id,
//             company_type: company_type,
//             office_id: office_id,
//             section: section,
//             title_id: title_id
//         },
//         enctype: 'multipart/form-data',
//         cache: false,
//         success: function (result) {
//             $('#new_owner_add_modal').html(result).modal({
//                 backdrop: 'static',
//                 keyboard: false
//             });
//         }
//     });
// }

function open_new_add_owner_modal(
  company_id,
  company_type,
  office_id,
  section,
  title_id = "",
  from = ""
) {
  if (company_type == "") {
    var e = document.getElementById("type");
    var company_type = e.options[e.selectedIndex].value;
    if (company_type == "") {
      $("#owners-list-count")
        .next("div.errorMessage")
        .html("You have to select company type first!");
      return false;
    }
  }

  if (office_id == "") {
    var office = document.getElementById("office");
    var office_id = office.options[office.selectedIndex].value;
    if (office_id == "") {
      $("#owners-list-count")
        .next("div.errorMessage")
        .html("You have to select office first!");
      return false;
    }
  }
  if (company_type != "" && office_id != "") {
    var url =
      base_url +
      "modal/open_new_add_owner_modal/" +
      btoa(company_id) +
      "/" +
      btoa(company_type) +
      "/" +
      btoa(office_id) +
      "/" +
      btoa(section) +
      "/" +
      btoa(from) +
      "/" +
      btoa(title_id);
    window.open(
      url,
      "Add Owner",
      "width=1200, height=600, top=100, left=110, scrollbars=yes"
    );
  }
}

function open_reset_password_modal(staff_id, email) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_reset_password_modal",
    data: {
      staff_id: staff_id,
      email: email,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      if (result == 1) {
        swal(
          "ERROR",
          "Email cannot be send. Please provide a valid email id.",
          "error"
        );
      } else {
        $("#reset_modal").html(result).modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    },
  });
}
function show_service_task_assign_modal(task_id, dept_id, client_id) {
  $.ajax({
    url: base_url + "modal/show_service_task_assign_modal",
    type: "POST",
    data: {
      task_id: task_id,
      dept_id: dept_id,
      client_id: client_id,
    },
    success: function (data) {
      $("#service_task_assign_modal").html(data);
      $("#service_task_assign_modal").modal("show");
    },
  });
}
function open_add_percentage_modal(company_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_add_percentage_modal",
    data: {
      company_id: company_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#owner_percentage_modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
function open_owner_history(company_id) {
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_owner_history",
    data: {
      company_id: company_id,
    },
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#owner_history_modal").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}

function openContactRequestModal() {
  $.ajax({
    type: "POST",
    url: base_url + "modal/open_contact_request_modal",
    data: {},
    enctype: "multipart/form-data",
    cache: false,
    success: function (result) {
      $("#contact_request_modal_form").html(result).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
  });
}
