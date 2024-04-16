var base_url = document.getElementById('base_url').value;

/* royalty report */
function loadRoyaltyReportsData(office = '', date_range = '',service_name = '',status = '') {
    console.log(service_name);
    console.log(status);
    $('#reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/royalty_reports_max_limit_count',
        success: function (result) {
            $('#reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "scrollY": "600px",
                "scrollCollapse": true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'RoyaltyReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'RoyaltyReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_royalty_reports_data',
                    'type': 'POST',
                    'data': { 'ofc': office, 'daterange': date_range, 'service_name': service_name, 'status': status },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    {
                        data: 'date',
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }
                    },
                    { data: 'client_id' },
                    { data: 'invoice_id' },
                    { data: 'service_id' },
                    { data: 'office_id_name' },
                    { data: 'service_name' },
                    { data: 'retail_price', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'override_price', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'cost', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'payment_status' },
                    { data: 'collected', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'payment_type' },
                    { data: 'authorization_id' },
                    { data: 'reference' },
                    { data: 'check_number' },
                    { data: 'total_net', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'office_fee', render: $.fn.dataTable.render.number(',', '.', 0, '', '%') },
                    { data: 'fee_with_cost', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'fee_without_cost', render: $.fn.dataTable.render.number(',', '.', 2, '$') }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
                    var total_indexs = [6,7,8,10,15,16,17];
                    // total_indexs.forEach(myFunction);                         
                    var api = this.api(), data;
         
                    // Remove the formatting to get integer data for summation
                    var intVal = function ( i ) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                                i : 0;
                    };
                    for(var j=0;j<total_indexs.length;j++) {
                        // Total over all pages
                        // total = api
                        //     .column( total_indexs[j] )
                        //     .data()
                        //     .reduce( function (a, b) {
                        //         return intVal(a) + intVal(b);
                        //     }, 0 );
             
                        // Total over this page
                        pageTotal = api
                            .column( total_indexs[j], { page: 'current'} )
                            .data()
                            .reduce( function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0 );
             
                        // Update footer
                        $( api.column( total_indexs[j] ).footer() ).html(
                            Number(pageTotal).toLocaleString('en-US', {maximumFractionDigits:2,style: "currency",currency:"USD"})
                            // '$'+Number(pageTotal).toFixed(2)
                            //'$'+ new Intl.NumberFormat().format(pageTotal)
                        );
                    }
                }
            });
        },
    });
}
/* royalty report total calculation */
function get_total_royalty_report(office = '', date_range = '',service_name ='',status = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/royalty_reports_totals',
        data: { 'ofc': office, 'daterange': date_range, 'service_name': service_name, 'status': status },
        success: function (result) {
            $("#total").html(result);
        },
    });
}

/* weekly sales report */
function loadSalesReportsData(office = '', date_range = '',service_name = '',status = '') {
    $('#sales-reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/weekly_sales_reports_max_limit_count',
        success: function (result) {
            $('#sales-reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'SalesReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'SalesReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_weekly_sales_report_data',
                    'type': 'POST',
                    'data': { 'ofc': office, 'daterange': date_range ,'service_name': service_name, 'status': status},
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    {
                        data: 'date',
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }
                    },
                    { data: 'client_id' },
                    { data: 'service_id' },
                    { data: 'service_name'},
                    { data: 'status' },
                    { data: 'retail_price', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'override_price', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'cost', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'collected', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'total_net', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'franchisee_fee', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'gross_profit', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'notes' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
                    var total_indexs = [6,7,8,9,10,11];
                    // total_indexs.forEach(myFunction);                         
                    var api = this.api(), data;
         
                    // Remove the formatting to get integer data for summation
                    var intVal = function ( i ) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                                i : 0;
                    };
                    for(var j=0;j<total_indexs.length;j++) {
                        // Total over all pages
                        // total = api
                        //     .column( total_indexs[j] )
                        //     .data()
                        //     .reduce( function (a, b) {
                        //         return intVal(a) + intVal(b);
                        //     }, 0 );
             
                        // Total over this page
                        pageTotal = api
                            .column( total_indexs[j], { page: 'current'} )
                            .data()
                            .reduce( function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0 );
             
                        // Update footer
                        $( api.column( total_indexs[j] ).footer() ).html(
                            '$'+Number(pageTotal).toFixed(2)                            
                        );
                    }
                }
            });
        },
    });   
}

/* sales report total calculation */
function get_total_sales_report(office = '', date_range = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/weekly_sales_reports_totals',
        data: { 'ofc': office, 'daterange': date_range },
        success: function (result) {
            $("#total_sales_data").html(result);
        },
    });
}

// report service section js
function show_service_franchise_result(category = '', date_range = '', range_btn = '',office='',search='') {
//    alert(category);
    if (category == 'franchise') {
        $("#service_by_franchise").toggle();
    } else if (category == 'department') {
        $("#service_by_department").toggle();
    } else if (category == 'service_category') {
        $("#service_by_category").toggle();
    } else if(category == 'service_name'){
        if(search != '') {
            $("#service_by_name").show();
        } else {
            $("#service_by_name").toggle();    
        }        
    }
    var date_range_service = $("#service_range_report").val();
    var service_id = [];
    if(search != ""){
        service_id = $("#serviceid").val();        
    }

    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_service_by_franchise_data',
        data: { 'category': category, 'date_range': date_range_service, 'range_btn': range_btn , 'fran_office':office , 'service_id':service_id },
        success: function (result) {
            if (category == 'franchise') {
                $("#service_by_franchise").html(result);
            } else if (category == 'department') {
                $("#service_by_department").html(result);
            } else if (category == 'service_category') {
                $("#service_by_category").html(result);
            }else if(category == 'service_name') {
                $("#service_by_name").html(result);
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
function show_service_franchise_date(date_range = '', range_btn = '', category = '',franchise_office='') {
    if ($("#service_by_franchise").css('display') == 'block') {
        category = 'franchise';
    } else if ($("#service_by_department").css('display') == 'block') {
        category = 'department';
    } else if ($("#service_by_category").css('display') == 'block') {
        category = 'service_category';
    }else if($("#service_by_name").css('display') == 'block') {
        category = 'service_name';
    }
    
    else {
        category = 'franchise';
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_range_service_report',
        data: { 'date_range_service': date_range, 'range_btn_service': range_btn },
        success: function (result) {
            $("#service_range_report").val(result);
            if (category == 'franchise') {
                show_service_franchise_result(category, result,'',franchise_office);
                $("#service_by_franchise").show();
            } else if (category == 'department') {
                show_service_franchise_result(category, result,'',franchise_office);
                $("#service_by_department").show();
            } else if (category == 'service_category') {
                show_service_franchise_result(category, result,'',franchise_office);
                $("#service_by_category").show();
            }else if (category == 'service_name') {
                show_service_franchise_result(category, result,'',franchise_office);
                $("#service_by_name").show();
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

function show_billing_data(date_range = '', start_date = '', fran_office = '') {
    $("#billing_invoice_payments").toggle();
    var date_range_check = date_range;
    if (date_range == '') {
        var date_range = $("#billing_range_report").val();
    }
    if (start_date == '') {
        start_date = moment("05-15-2018", "MM-DD-YYYY").format("MM/DD/YYYY");
    }
    var rangeText = '';
    if (date_range == moment(start_date).format("MM/DD/YYYY") + " - " + moment().format("MM/DD/YYYY")) {
        rangeText = "<h4 class='text-success'>Showing All Invoice Data</h4>";
    } else if (date_range == moment().format("MM/DD/YYYY") + " - " + moment().format("MM/DD/YYYY")) {
        rangeText = "<h4 class='text-success'>Showing Results for Today</h4>";
    } else if (date_range == moment().subtract(1, 'days').format("MM/DD/YYYY") + " - " + moment().subtract(1, 'days').format("MM/DD/YYYY")) {
        rangeText = "<h4 class='text-success'>Showing Results for Yesterday</h4>";
    } else if (date_range == moment().subtract(6, 'days').format("MM/DD/YYYY") + " - " + moment().format("MM/DD/YYYY")) {
        rangeText = "<h4 class='text-success'>Showing Results for Last 7 Day</h4>";
    } else if (date_range == moment().subtract(29, 'days').format("MM/DD/YYYY") + " - " + moment().format("MM/DD/YYYY")) {
        rangeText = "<h4 class='text-success'>Showing Results for Last 30 Day</h4>";
    } else if (date_range == moment().startOf('month').format("MM/DD/YYYY") + " - " + moment().endOf('month').format("MM/DD/YYYY")) {
        rangeText = "<h4 class='text-success'>Showing Results for This Month</h4>";
    } else if (date_range == moment().startOf('month').format("MM/DD/YYYY") + " - " + moment().endOf('month').format("MM/DD/YYYY")) {
        rangeText = "<h4 class='text-success'>Showing Results for Last Month</h4>";
    } else {
        if (date_range != '') {
            var start = date_range.split("-")[0];
            var end = date_range.split("-")[1];
            rangeText = "<h4 class='text-success'>Showing results from " + start + " to " + end + "</h4>";
        } else {
            rangeText = "<h4 class='text-success'>Showing All Invoice Data</h4>";
        }
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_range_billing_report',
        data: { 'date_range_billing': date_range },
        success: function (result) {
            $("#billing_range_report").val(result);
            var date_range_billing = $("#billing_range_report").val();

            $.ajax({
                type: 'POST',
                url: base_url + 'reports/get_show_billing_data',
                data: { 'date_range_billing': date_range_billing , 'fran_office':fran_office },
                success: function (res) {
                    $("#billing_invoice_payments").html(res);
                    $("#select_peroid_billing").html(rangeText);
                    if (date_range_check != '') {
                        $("#billing_invoice_payments").show();
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
    })
}

// report action section js
function show_action_data(category = '',fran_office='') {
    var date_range = $("#action_range_report").val();
    if (category == 'action_by_office') {
        $("#action_by_office").toggle();
    } else if (category == 'action_to_office') {
        $("#action_to_office").toggle();
    } else if (category == 'action_by_department') {
        $("#action_by_department").toggle();
    } else if (category == 'action_to_department') {
        $("#action_to_department").toggle();
    } else if (category == 'action_by_staff') {
        $("#action_by_staff").toggle();
    } else if (category == 'action_to_staff') {
        $("#action_to_staff").toggle();
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_action_data',
        data: { 'category': category, 'date_range': date_range ,'fran_office':fran_office },
        success: function (result) {
//            alert(result);return false;
            if (category == 'action_by_office') {
                $("#action_by_office").html(result);
            } else if (category == 'action_to_office') {
                $("#action_to_office").html(result);
            } else if (category == 'action_by_department') {
                $("#action_by_department").html(result);
            } else if (category == 'action_to_department') {
                $("#action_to_department").html(result);
            } else if (category == 'action_by_staff') {
                $("#action_by_staff").html(result);
            } else if (category == 'action_to_staff') {
                $("#action_to_staff").html(result);
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

function get_action_range_date(date_range = "",fran_office = "") {
    // alert($date_range);return false;
    if ($("#action_by_office").css('display') == 'block') {
        category = 'action_by_office';
    } else if ($("#action_to_office").css('display') == 'block') {
        category = 'action_to_office';
    } else if ($("#action_by_department").css('display') == 'block') {
        category = 'action_by_department';
    } else if ($("#action_to_department").css('display') == 'block') {
        category = 'action_to_department';
    }else if ($("#action_by_staff").css('display') == 'block') {
        category = 'action_by_staff';
    }else if ($("#action_to_staff").css('display') == 'block') {
        category = 'action_to_staff';
    }
    else {
        category = 'action_by_office';
    }

    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_range_action_report',
        data: { 'date_range_action': date_range },
        success: function (result) {
            $("#action_range_report").val(result);
            if (category == 'action_by_office') {
                show_action_data(category, fran_office);
                $("#action_by_office").show();
            } else if (category == 'action_to_office') {
                show_action_data(category, fran_office);
                $("#action_to_office").show();
            } else if (category == 'action_by_department') {
                show_action_data(category, fran_office);
                $("#action_by_department").show();
            } else if (category == 'action_to_department') {
                show_action_data(category, fran_office);
                $("#action_to_department").show();
            } else if (category == 'action_by_staff') {
                show_action_data(category, fran_office);
                $("#action_by_staff").show();
            } else if (category == 'action_to_staff') {
                show_action_data(category, fran_office);
                $("#action_to_staff").show();
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

// report project section js
function show_project_data(category = '',fran_office='') {
    var date_range_project = $("#project_range_report").val();

    if (category == 'projects_by_office') {
        $("#projects_by_office").toggle();
    } else if (category == 'tasks_by_office') {
        $("#tasks_by_office").toggle();
    } else if (category == 'projects_to_department') {
        $("#projects_to_department").toggle();
    } else if (category == 'tasks_to_department') {
        $("#tasks_to_department").toggle();
    } else if (category == 'project_template') {
        $("#project_template").toggle();
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_project_data',
        data: { 'category': category, 'date_range': date_range_project ,'fran_office':fran_office },
        success: function (result) {
//            alert(result);return false;
            if (category == 'projects_by_office') {
                $("#projects_by_office").html(result);
            } else if (category == 'tasks_by_office') {
                $("#tasks_by_office").html(result);
            } else if (category == 'projects_to_department') {
                $("#projects_to_department").html(result);
            } else if (category == 'tasks_to_department') {
                $("#tasks_to_department").html(result);
            } else if (category == 'project_template') {
                $("#project_template").html(result);
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

function get_project_date(date_range = '',fran_office='') {
    if ($("#projects_by_office").css('display') == 'block') {
        category = 'projects_by_office';
    } else if ($("#tasks_by_office").css('display') == 'block') {
        category = 'tasks_by_office';
    } else if ($("#projects_to_department").css('display') == 'block') {
        category = 'projects_to_department';
    } else if ($("#tasks_to_department").css('display') == 'block') {
        category = 'tasks_to_department';
    }else if ($("#project_template").css('display') == 'block') {
        category = 'project_template';
    }
    else {
        category = 'projects_by_office';
    }

    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_range_project_report',
        data: { 'date_range_project': date_range },
        success: function (result) {
            $("#project_range_report").val(result);
            if (category == 'projects_by_office') {
                show_project_data(category, fran_office);
                $("#projects_by_office").show();
            } else if (category == 'tasks_by_office') {
                show_project_data(category, fran_office);
                $("#tasks_by_office").show();
            } else if (category == 'projects_to_department') {
                show_project_data(category, fran_office);
                $("#projects_to_department").show();
            } else if (category == 'tasks_to_department') {
                show_project_data(category, fran_office);
                $("#tasks_to_department").show();
            } else if (category == 'project_template') {
                show_project_data(category, fran_office);
                $("#project_template").show();
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

// report lead section js
function show_lead_data(category, date_range = '',fran_office = '') {
    if (category == 'status') {
        $("#leads_by_status").toggle();
    } else if (category == 'type') {
        $("#leads_by_type").toggle();
    } else if (category == 'mail_campaign') {
        $("#leads_email_campaign").toggle();
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_leads_data',
        data: { 'category': category, 'date_range': date_range, 'fran_office':fran_office },
        success: function (result) {
            if (category == 'status') {
                $("#leads_by_status").html(result);
            } else if (category == 'type') {
                $("#leads_by_type").html(result);
            } else if (category == 'mail_campaign') {
                $("#leads_email_campaign").html(result);
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
function get_lead_range(date_range = '',fran_office='') {
    if ($("#leads_by_status").css('display') == 'block') {
        category = 'status';
    } else if ($("#leads_by_type").css('display') == 'block') {
        category = 'type';
    } else if ($("#leads_email_campaign").css('display') == 'block') {
        category = 'mail_campaign';
    } else {
        category = 'status';
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_range_lead_report',
        data: { 'date_range_lead': date_range },
        success: function (result) {
            $("#leads_range_report").val(result);
            if (category == 'status') {
                show_lead_data(category, result, fran_office);
                $("#leads_by_status").show();
            } else if (category == 'type') {
                show_lead_data(category,result ,fran_office);
                $("#leads_by_type").show();
            } else if (category == 'mail_campaign') {
                show_lead_data(category, result,fran_office);
                $("#leads_email_campaign").show();
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

function get_partner_date_range(date_range = '',fran_office = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_range_partners_report',
        data: { 'date_range_partner': date_range },
        success: function (result) {
            $("#partners_range_report").val(result);
            show_partner_data(fran_office);
            $("#partners_by_type").show();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    })
}

// report partner section js
function show_partner_data(fran_office= '') {
    $("#partners_by_type").toggle();
    var date_range_partner = $("#partners_range_report").val();

    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_partner_data',
        data: { 'date_range': date_range_partner , 'fran_office':fran_office },
        success: function (result) {
            $("#partners_by_type").html(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

// report service section js
function show_clients_data(category,fran_office='') {
    if (category == 'clients_by_office') {
        $("#total_clients_by_office").toggle();
    } else if (category == 'business_clients_by_office') {
        $("#business_clients_by_office").toggle();
    } else if (category == 'individual_clients_by_office') {
        $("#individual_clients_by_office").toggle();
    }
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_clients_data',
        data: { 'category': category ,'fran_office':fran_office},
        success: function (result) {
            if (category == 'clients_by_office') {
                $("#total_clients_by_office").html(result);
            } else if (category == 'business_clients_by_office') {
                $("#business_clients_by_office").html(result);
            } else if (category == 'individual_clients_by_office') {
                $("#individual_clients_by_office").html(result);
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

// reload data 
function refresh_service_report() {
    $.ajax({
        type: 'POST',
        url: base_url + 'report_dashboard_service_cron.php',
        success: function (result) {
            if (result == 1) {
                swal({
                    title: "Success!",
                    text: "Updated Successfully!",
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
}

function refresh_billing_report() {
    $.ajax({
        type: 'POST',
        url: base_url + 'report_dashboard_billing_cron.php',
        success: function (result) {
            if (result == 1) {
                swal({
                    title: "Success!",
                    text: "Updated Successfully!",
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
}

function refresh_action_report() {
    $.ajax({
        type: 'POST',
        url: base_url + 'report_dashboard_action_cron.php',
        success: function (result) {
            if (result == 1) {
                swal({
                    title: "Success!",
                    text: "Updated Successfully!",
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
}

function reload_royalty_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/royalty_report_cron_job.php',
        success: function (result) {
            if (result > 1) {
                swal({
                    title: "Success!",
                    text: "Updated Successfully!",
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
}

function reload_sales_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/sales_report_cron_job.php',
        success: function (result) {
            if (result == 1) {
                swal({
                    title: "Success!",
                    text: "Updated Successfully!",
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
}

function refresh_project_report() {
    $.ajax({
        type: 'POST',
        url: base_url + 'report_dashboard_project_cron.php',
        success: function (result) {
            if (result == 1) {
                swal({
                    title: "Success!",
                    text: "Updated Successfully!",
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
}

function refresh_client_report() {
    $.ajax({
        type: 'POST',
        url: base_url + 'report_dashboard_client_cron.php',
        success: function (result) {
            if (result == 1) {
                swal({
                    title: "Success!",
                    text: "Updated Successfully!",
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
}

function pieChart(className) {
    $('.' + className).each(function () {
        var element = '#' + $(this).attr('id');
        var size = $(this).attr('data-size');
        if (parseInt(size) > 1) {
            // Basic setup
            // ------------------------------
            var dataVariable = $(this).attr('data-json');

            // Add data set
            var data = window[dataVariable];

            // Main variables
            var d3Container = d3.select(element),
                distance = 2, // reserve 2px space for mouseover arc moving
                radius = (size / 2) - distance,
                sum = d3.sum(data, function (d) {
                    return d.value;
                });
            // Tooltip
            // ------------------------------
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .direction('e')
                .html(function (d) {
                    return "<ul class='list-unstyled mb-5'>" +
                        "<li>" + "<span class='text-semibold pull-right'>" + d.data.section_label + ' : ' + d.value + "</span>" + "</li>" +
                        "</ul>";
                });
            // Create chart
            // ------------------------------

            // Add svg element
            var container = d3Container.append("svg").call(tip);

            // Add SVG group
            var svg = container
                .attr("width", size)
                .attr("height", size)
                .append("g")
                .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");
            // Construct chart layout
            // ------------------------------

            // Pie
            var pie = d3.layout.pie()
                .sort(null)
                .startAngle(Math.PI)
                .endAngle(3 * Math.PI)
                .value(function (d) {
                    return d.value;
                });

            // Arc
            var arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius / 2);
            //
            // Append chart elements
            //
            // Group chart elements
            var arcGroup = svg.selectAll(".d3-arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "d3-arc")
                .style('stroke', '#fff')
                .style('cursor', 'pointer');

            // Append path
            var arcPath = arcGroup
                .append("path")
                .style("fill", function (d) {
                    return d.data.color;
                });
            // Add tooltip
            arcPath
                .on('mouseover', function (d, i) {

                    // Transition on mouseover
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .ease('elastic')
                        .attr('transform', function (d) {
                            d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
                            var x = Math.sin(d.midAngle) * distance;
                            var y = -Math.cos(d.midAngle) * distance;
                            return 'translate(' + x + ',' + y + ')';
                        });
                })
                .on("mousemove", function (d) {

                    // Show tooltip on mousemove
                    tip.show(d)
                        .style("top", (d3.event.pageY - 40) + "px")
                        .style("left", (d3.event.pageX + 30) + "px");
                })

                .on('mouseout', function (d, i) {

                    // Mouseout transition
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('transform', 'translate(0,0)');

                    // Hide tooltip
                    tip.hide(d);
                });

            // Animate chart on load
            arcPath
                .transition()
                .delay(function (d, i) {
                    return i * 500;
                })
                .duration(500)
                .attrTween("d", function (d) {
                    var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                    return function (t) {
                        d.endAngle = interpolate(t);
                        return arc(d);
                    };
                });
        }
    });
}
function loadBillingReportData(payment_status = '', service_cat = '', due_date = '', created_date = '', office = '', staff_id = '', client_status='',invoice_type='') {
    $('#reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/billing_report_max_limit_count',
        success: function (result) {
            $('#reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'BillingReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'BillingReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_billing_report_data',
                    'type': 'POST',
                    'data': { 'payment_status': payment_status, 'service_cat': service_cat, 'due_date': due_date, 'created_date': created_date, 'office': office, 'staff_id':staff_id, 'client_status':client_status,'invoice_type':invoice_type },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'office' },
                    { data: 'client_id' },
                    { data: 'client_name' },
                    { data: 'order_id' },
                    { data: 'service_id' },
                    { data: 'service_category' },
                    { data: 'service_name' },
                    { data: 'invoice_type' },
                    { data: 'retail_amount', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'billed_amount', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'collected_amount', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'pending_amount', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'payment_status' },
                    { data: 'period' },
                    {
                        data: 'requested_date',
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }
                    },
                    {
                        data: 'due_date',
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }
                    },
                    { data: 'days_late' },
                    { data: 'requested_by' },
                    { data: 'client_partner' },
                    { data: 'client_manager' },
                    { data: 'referral_source' },
                    { data: 'referral_detail' },
                    { data: 'client_status' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
                    var total_indexs = [8,9,10,11];                         
                    var api = this.api(), data;
         
                    /*Remove the formatting to get integer data for summation*/
                    var intVal = function ( i ) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                                i : 0;
                    };
                    for(var j=0;j<total_indexs.length;j++) {
                        /* Total over this page */
                        pageTotal = api
                            .column( total_indexs[j], { page: 'current'} )
                            .data()
                            .reduce( function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0 );
             
                        /* Update footer */
                        $( api.column( total_indexs[j] ).footer() ).html(
                            Number(pageTotal).toLocaleString('en-US', {maximumFractionDigits:2,style: "currency",currency:"USD"})                            
                        );
                    }
                }
            });
        },
    });
}

function get_total_billing_report(payment_status = '', service_cat = '', due_date = '', created_date = '', office = '', staff_id = '',client_status = '',invoice_type = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/billing_report_totals',
        'data': { 'payment_status': payment_status, 'service_cat': service_cat, 'due_date': due_date, 'created_date': created_date, 'office': office, 'staff_id':staff_id, 'client_status':client_status,'invoice_type':invoice_type },
        success: function (result) {
            $("#total").html(result);
        },
    });
}

function loadProjectReportData(office = '', client_id = '', project_id = '', assign_id = '', res_id = '', category_id = '', temp_id = '', partner_id = '', manager_id = '', tracking = '',client_status='',period = '',period_month ='') {
    $('#reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/project_report_max_limit_count',
        success: function (result) {
            $('#reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, 500, result], [10, 25, 50, 100, 500, "All"]],
                "pageLength": 500,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'ProjectReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'ProjectReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_project_report_data',
                    'type': 'POST',
                    'data': { 'ofc': office,
                            'client_id': client_id,
                            'project_id': project_id,
                            'assign_id': assign_id,
                            'res_id': res_id,
                            'category_id': category_id,
                            'temp_id': temp_id,
                            'partner_id': partner_id,
                            'manager_id': manager_id,
                            'tracking': tracking,
                            'client_status':client_status,
                            'period' : period,
                            'period_month' : period_month
                        },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'client_id' },
                    { data: 'client_name' },
                    { data: 'office' },
                    { data: 'project_id' },
                    { data: 'project_template' },
                    { data: 'project_category' },
                    { data: 'project_period' },
                    { data: 'tracking' },
                    { data: 'staff_responsible' },
                    { data: 'staff_assign' },
                    {
                        data: 'due_date',
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }
                    },
                    { data: 'invoice_id' },
                    { data: 'days_late' },
                    { data: 'client_partner' },
                    { data: 'client_manager' },
                    { data: 'client_status' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}

function get_total_project_report(office = '', client_id = '', project_id = '', assign_id = '', res_id = '', category_id = '', temp_id = '', partner_id = '', manager_id = '' , tracking = '', client_status='',period ='',period_month ='') {
    console.log(period+'2');
    console.log(period_month+'2');
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/project_report_totals',
        data: { 'ofc': office,
                'client_id': client_id,
                'project_id': project_id,
                'assign_id': assign_id,
                'res_id': res_id,
                'category_id': category_id,
                'temp_id': temp_id,
                'partner_id': partner_id,
                'manager_id': manager_id,
                'tracking': tracking,
                'client_status':client_status,
                'period' : period,
                'period_month' : period_month
            },
        success: function (result) {
            $("#total").html(result);
        },
    });
}

function loadProjectOverviewReportData(office = '', project_category = '', project_template = '') {
    $('#reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/project_overview_report_max_limit_count',
        success: function (result) {
            $('#reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'ProjectOverviewReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'ProjectOverviewReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_project_overview_report_data',
                    'type': 'POST',
                    'data': { 'ofc': office, 'project_category': project_category, 'project_template': project_template},
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'office_id' },
                    { data: 'project_template' },
                    { data: 'project_category' },
                    { data: 'amount_of_client_with_projects' },
                    { data: 'list_of_client_ids' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}

function get_total_project_overview_report(office = '', project_category = '', project_template = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_total_project_overview_report',
        data: { 'ofc': office, 'project_category': project_category, 'project_template': project_template },
        success: function (result) {
            $("#total").html(result);
        },
    });
}

function load_bookkeeping_report(staff = '') {
    $('#reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/bookeeping_report_max_count',
        success: function (result) {
            $('#reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'ProjectBookkeepingReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'ProjectBookkeepingReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_project_bookkeeping_report_data',
                    'type': 'POST',
                    'data': {'staff': staff},
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'staff_name' },
                    { data: 'total_client' },
                    { data: 'total_bank_acc' },
                    { data: 'total_transaction' },
                    { data: 'total_time' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
                    var total_indexs = [1,2,3];
                    // total_indexs.forEach(myFunction);                         
                    var api = this.api(), data;
         
                    // Remove the formatting to get integer data for summation
                    var intVal = function ( i ) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                                i : 0;
                    };
                    for(var j=0;j<total_indexs.length;j++) {
                        // Total over all pages
                        // total = api
                        //     .column( total_indexs[j] )
                        //     .data()
                        //     .reduce( function (a, b) {
                        //         return intVal(a) + intVal(b);
                        //     }, 0 );
             
                        // Total over this page
                        pageTotal = api
                            .column( total_indexs[j], { page: 'current'} )
                            .data()
                            .reduce( function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0 );
             
                        // Update footer
                        $( api.column( total_indexs[j] ).footer() ).html(
                            Number(pageTotal).toFixed(2)                            
                        );
                    }
                }

            });
        },
    });
}

function get_total_project_bookkeeping_report() {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_total_project_bookkeeping_report',
        success: function (result) {
            $("#total").html(result);
        },
    });
}

function load_bookkeeping_report_tracking() {
    $('#reports-tab2').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/bookeeping_report_tracking_max_count',
        success: function (result) {
            $('#reports-tab2').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        text:   '<i class="fa fa-file-text-o"></i>&nbsp;Download',
                        title: 'ProjectBookkeepingReportTracking'
                    },
                    {
                        extend: 'print',
                        text:   '<i class="fa fa-print"></i>&nbsp;Print',
                        title: 'ProjectBookkeepingReportTracking',
                        customize: function (win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_project_bookkeeping_report_tracking_data',
                    'type': 'POST',
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'tracking' },
                    { data: 'task1' },
                    { data: 'task2' },
                    { data: 'task3' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],

            });
        },
    });
}
function load_ind_financial_account_report(office = '', client_status,bookkeeping='',startingPeriod ='',startingPeriod_month = '',client_id='') {
     console.log(bookkeeping);
     console.log(startingPeriod);
     console.log(client_id);
    $('#reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/ind_financial_account_report_count',
        success: function (result) {
            $('#reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'IndividualFinancialAccountReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'IndividualFinancialAccountReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_ind_financial_account_data',
                    'type': 'POST',
                    'data': { 'ofc': office, 'client_status':client_status ,'bookkeeping' :bookkeeping,'startingPeriod' : startingPeriod,'startingPeriod_month' : startingPeriod_month,'client_id':client_id },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'client_id' },
                    { data: 'first_name' },
                    { data: 'last_name' },
                    { data: 'office' },
                    { data: 'partner' },
                    { data: 'manager' },
                    { data: 'bookkeeping_frequency' },
                    { data: 'starting_date' },
                    { data: 'bank_name' },
                    { data: 'type_of_account' },
                    { data: 'acc_num' },
                    { data: 'routing_num' },
                    { data: 'number_of_transaction' },
                    { data: 'bank_statement' },
                    { data: 'user_id' },
                    { data: 'password' },
                    { data: 'question' },
                    { data: 'answer' },
                    { data: 'client_status' },
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}
function load_total_ind_financial_account_report(office = '',client_status='',bookkeeping='',startingPeriod ='',startingPeriod_month = '',client_id='') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/load_total_ind_financial_account_report',
        data: { 'ofc': office, 'client_status':client_status ,'bookkeeping' :bookkeeping,'startingPeriod' : startingPeriod ,'startingPeriod_month' : startingPeriod_month,'client_id':client_id},
        success: function (result) {
            $("#total").html(result);
        },
    });
}

function load_com_financial_account_report(office = '', client_status='',bookkeeping= '',startingPeriod = '',startingPeriod_month = '',client_id = '') {
    // console.log(bookkeeping);
      // console.log(startingPeriod);
    //  console.log(client_id);
    $('#reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/com_financial_account_report_count',
        success: function (result) {
            $('#reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'BusinessFinancialAccountReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'BusinessFinancialAccountReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_com_financial_account_data',
                    'type': 'POST',
                    'data': { 'ofc': office, 'client_status':client_status,'bookkeeping' :bookkeeping,'startingPeriod' : startingPeriod,'startingPeriod_month' : startingPeriod_month,'client_id':client_id },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'client_id' },
                    { data: 'company_name' },
                    { data: 'office' },
                    { data: 'partner' },
                    { data: 'manager' },
                    { data: 'bookkeeping_frequency' },
                    { data: 'starting_date' },
                    { data: 'bank_name' },
                    { data: 'type_of_account' },
                    { data: 'acc_num' },
                    { data: 'routing_num' },
                    { data: 'number_of_transaction' },
                    { data: 'bank_statement' },
                    { data: 'user_id' },
                    { data: 'password' },
                    { data: 'question' },
                    { data: 'answer' },
                    { data: 'client_status' },
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}
function load_total_com_financial_account_report(office = '',client_status='', bookkeeping ='',startingPeriod = '',startingPeriod_month = '',client_id='') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/load_total_com_financial_account_report',
        data: { 'ofc': office, 'client_status':client_status ,'bookkeeping' :bookkeeping,'startingPeriod' : startingPeriod,'startingPeriod_month' : startingPeriod_month,'client_id':client_id},
        success: function (result) {
            $("#total").html(result);
        },
    });
}
function show_all_client_ids_for_project_overview(id = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/show_all_client_ids_for_project_overview',
        data: {
            id: id
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            $('#show_client_ids_modal_for_projects_report').html(result).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    });
}
/* Staff Detail Report */
function load_staff_detail_report(invoice_id='', client_id='', client_manager='', requested_by='', service_name='', invoice_type='', payment_type='', date_range='',staff_id='',service_category='',staff_filter_options='',office='',payment_daterange ='') {
    // console.log(invoice_type);
    // console.log(office);
    // console.log(payment_daterange);
    $('#staff-detail-reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/staff_detail_reports_max_limit_count',
        success: function (result) {
            $('#staff-detail-reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "scrollY": "600px",
                "scrollCollapse": true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 10,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'StaffDetailReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'StaffDetailReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_staff_detail_reports_data',
                    'type': 'POST',
                    data: {
                        'invoice_id': invoice_id,
                        'client_id': client_id,
                        'client_manager':client_manager,
                        'requested_by':requested_by,
                        'service_name':service_name,
                        'invoice_type':invoice_type,
                        'payment_type':payment_type,
                        'date_range':date_range,
                        'staff_id':staff_id,
                        'service_category':service_category,
                        'staff_filter_options':staff_filter_options,
                        'office' : office,
                        'payment_daterange' : payment_daterange
                    },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'invoice_id' },
                    { data: 'service_inner_id' },
                    { data: 'client_id' },
                    { data: 'office_id_name' },
                    { data: 'manager_name' },
                    { data: 'created_by_name' },
                    {
                        data: 'requested_date',
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }
                    },         
                    { data: 'invoice_type' },
                    { data: 'category_name' },            
                    { data: 'service_name'},                    
                    { data: 'price', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'cost', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'collected', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'unpaid', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'franchise_fee', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'payment_type' },
                    { data: 'payment_dated' },
                    { data: 'payment_reference' },
                    { data: 'commision' },
                    { data: 'staff_commision', render: $.fn.dataTable.render.number(',', '.', 2, '$') }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 },
                    { className: 'dt-body-nowrap p-l-10 p-r-10', targets: 3 },
                ]
                // ,
                // "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
                //     var total_indexs = [9,10,11,12];
                //     var api = this.api(), data;         
                //     // Remove the formatting to get integer data for summation
                //     var intVal = function ( i ) {
                //         return typeof i === 'string' ?
                //             i.replace(/[\$,]/g, '')*1 :
                //             typeof i === 'number' ?
                //                 i : 0;
                //     };
                //     for(var j=0;j<total_indexs.length;j++) {
                //         // Total over this page
                //         pageTotal = api
                //             .column( total_indexs[j], { page: 'current'} )
                //             .data()
                //             .reduce( function (a, b) {
                //                 return intVal(a) + intVal(b);
                //             }, 0 );
             
                //         // Update footer
                //         $( api.column( total_indexs[j] ).footer() ).html(
                //             Number(pageTotal).toLocaleString('en-US', {maximumFractionDigits:2,style: "currency",currency:"USD"})
                //         );
                //     }
                // }
            });
        },
    });    
}
function load_staff_detail_report_chart(invoice_id='', client_id='', client_manager='', requested_by='', service_name='', invoice_type='', payment_type='', date_range='',staff_id='',service_category='',staff_filter_options='',office='',payment_daterange='') {
    $.ajax({
        type: "POST",
        url: base_url + 'reports/load_staff_detail_report_chart',
        data: {
            'invoice_id': invoice_id,
            'client_id': client_id,
            'client_manager':client_manager,
            'requested_by':requested_by,
            'service_name':service_name,
            'invoice_type':invoice_type,
            'payment_type':payment_type,
            'date_range':date_range,
            'staff_id':staff_id,
            'service_category':service_category,
            'staff_filter_options':staff_filter_options,
            'office' : office,
            'payment_daterange' : payment_daterange
        },
        dataType: "html",
        success: function (result) {
            $("#staff_detail_report_chart").html(result);         
        }
    });
}

function display_invoice_detail_repot_filter_param(section) {
    if (section == 'payment_status') {
        if ($("#payment_status").val() != '') {
            $("#show-filter-payment").empty();
            $("#payment_status option:selected").each(function(i,v){
                // console.log(v.value);
                $("#show-filter-payment").append("<span class=\"alert-collection alert-success-collection\"><a href=\"#\" class=\"text-white\"><b>"+v.innerText+"</b></a></span>&nbsp;&nbsp;");
                // console.log(v.innerText);
            });                    
        }    
    } else if(section == 'service_cat') {
        if ($("#service_cat").val() != '') {
            $("#show-filter-service").empty();
            $("#service_cat option:selected").each(function(i,v){
                $("#show-filter-service").append("<span class=\"alert-collection alert-success-collection\"><a href=\"#\" class=\"text-white\"><b>"+v.innerText+"</b></a></span>&nbsp;&nbsp;");
                console.log(v.innerText);
            });                    
        }
    } else if (section == 'creationdaterange') {
        if ($("#creationdaterange").val() != '') {
            $("#show-filter-creation").empty();
            var creationdaterange = $("#creationdaterange").val();
            // console.log($("#creationdaterange").data('daterangepicker').startDate);
            $("#show-filter-creation").append("<span class=\"alert-collection alert-due-collection\"><a href=\"#\" class=\"text-white\"> Requested Date Between: <b>"+creationdaterange+"</b></a></span>&nbsp;&nbsp;");
        }
    } else if (section == 'duedaterange') {
        if ($("#duedaterange").val() != '') {
            $("#show-filter-due").empty();
            var duedaterange = $("#duedaterange").val();
            if (duedaterange != '') {
                $("#show-filter-due").append("<span class=\"alert-collection alert-primary-collection\"><a href=\"#\" class=\"text-white\"> Due Date Between: <b>"+duedaterange+"</b></a></span>&nbsp;&nbsp;");
            }              
        }
    } else if (section == 'office') {
        if ($("#office").val() != '') {
            $("#show-filter-office").empty();
            $("#office option:selected").each(function(i,v){
                $("#show-filter-office").append("<span class=\"alert-collection alert-success-collection\"><a href=\"#\" class=\"text-white\"><b>"+v.innerText+"</b></a></span>&nbsp;&nbsp;");
                console.log(v.innerText);
            });                    
        }
    }  else if (section == 'staff_id') {
        if ($("#staff_id").val() != '') {
            $("#show-filter-staff").empty();
            $("#staff_id option:selected").each(function(i,v){
                $("#show-filter-staff").append("<span class=\"alert-collection alert-success-collection\"><a href=\"#\" class=\"text-white\"><b>"+v.innerText+"</b></a></span>&nbsp;&nbsp;");
                console.log(v.innerText);
            });                    
        }
    }
}


function reload_invoice_detail_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/invoice_detail_report_cron.php',
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

function reload_project_detail_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/project_details_report_cron.php',
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

function reload_project_overview_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'patch/project_overview_report',
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

function reload_bookeeping_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/bookkeeping_report_cron.php',
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

function reload_business_financial_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/business_bookkeeping_financial_report_cron.php',
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

function reload_individual_financial_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/individual_bookkeeping_financial_report_cron.php',
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

function reload_staff_detail_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/staff_detail_report_cron.php',
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

function reload_task_tracking_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'patch/count_project_task_by_tracking',
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
function load_office_detail_report_chart(office_id='',creationdaterange='', staff_type = '', report_type = '') {
    $.ajax({
        type: "POST",
        url: base_url + 'reports/load_office_detail_report_chart',
        data: {
            'office_id': office_id,
            'creationdaterange':creationdaterange,
            'staff_type': staff_type,
            'report_type': report_type
        },
        dataType: "html",
        success: function (result) {
            $("#office_detail_report_chart").html(result);         
        }
    });
}

function load_office_detail_report(office_id = '', creationdaterange = '', staff_type = '', report_type = '', manager_id = '' , created_by = '') {
    if (report_type == 'client_manager') {
        $("#office_staff_name").html('Client Manager');
        $("#manager_list_div").show();
        $("#created_by_div").hide();
    } else {
        $("#office_staff_name").html('Requested By');
        $("#manager_list_div").hide();
        $("#created_by_div").show();
    }
    $('#office-detail-reports-tab').DataTable().destroy();
    $('#office-detail-reports-tab').DataTable({
        'processing': false,
        'serverSide': true,
        'scrollX': true,
        'scrollY': true,
        'serverMethod': 'post',
        "pageLength": 100,
        'dom': '<"html5buttons"B>lTfgitp',    
        'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'OfficeDetailReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'OfficeDetailReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],   
        'ajax': {
            'url': base_url + 'reports/get_office_detail_reports_data',
            'type': 'POST',
            data: {
                'office_id': office_id,
                'creationdaterange':creationdaterange,
                'staff_type': staff_type,
                'report_type': report_type,
                'manager_id': manager_id,
                'created_by': created_by
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                closeLoading();
            }
        },
        'columns': [
            { data: 'created_by_name' },
            { data: 'total_retail_price', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
            { data: 'total_price', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
            { data: 'total_collected', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
            { data: 'total_cost', render: $.fn.dataTable.render.number(',', '.', 2, '$') },                    
            { data: 'total_franchise_fee', render: $.fn.dataTable.render.number(',', '.', 2, '$') },                    
            { data: 'total_net', render: $.fn.dataTable.render.number(',', '.', 2, '$') }
        ],
        "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
            var total_indexs = [1,2,3,4,5,6];
            var api = this.api(), data;         
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            for(var j=0;j<total_indexs.length;j++) {
                pageTotal = api
                    .column( total_indexs[j], { page: 'current'} )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                $( api.column( total_indexs[j] ).footer() ).html(
                    Number(pageTotal).toLocaleString('en-US', {maximumFractionDigits:2,style: "currency",currency:"USD"})
                );
            }
        }
    });    
}

function reload_office_detail_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/office_detail_report_cron.php',
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
function load_time_and_expenses_report(staff = '',office_id='',period='',status='',date_range='',client_status = '') {
    $('#reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/time_and_transaction_max_count',
        success: function (result) {
           //console.log(result);
           //alert(result);
            $('#reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'TimeAndExpencesReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'TimeAndExpencesReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_time_and_expenses_report_data',
                    'type': 'POST',
                    'data': {'staff': staff,
                        'office_id':office_id,
                        'period':period,
                        'status':status,
                        'date_range':date_range,
                        'client_status': client_status
                    },
                    
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                
                'columns': [
                    { data: 'staff_name' },
                    { data: 'client_id' },
                    { data: 'office_name' },
                    { data: 'project_id' },
                    { data: 'period' },
                    { data: 'bank_statements' },
                    { data: 'retail' },
                    { data: 'hrs_unit' },
                    { data: 'cost' },
                    { data: 'transaction' },
                    { data: 'time_transaction' },
                    { data: 'cost_transaction' },
                    { data: 'gross_profit' },
                    { data: 'status' },
                    { data: 'client_status' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
                    var total_indexs = [5,6,8,9,10,11,12];
                    // total_indexs.forEach(myFunction);                         
                    var api = this.api(), data;
         
                    // Remove the formatting to get integer data for summation
                    var intVal = function ( i ) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                                i : 0;
                    };
                    for(var j=0;j<total_indexs.length;j++) {
                        
                        pageTotal = api
                            .column( total_indexs[j], { page: 'current'} )
                            .data()
                            .reduce( function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0 );
             
                        // Update footer
                        $( api.column( total_indexs[j] ).footer() ).html(
                            Number(pageTotal).toFixed(2)                            
                        );
                    }
                    
                }
                

            });
        },
    });
}

function load_Franchise_Admin_Report_chart(office='',brand='',selectperiod='',period='',period_month='') {
    $.ajax({
        type: "POST",
        url: base_url + 'reports/load_Franchise_Admin_Report_chart',
        data: { 'brand': brand, 'office': office,'selectperiod':selectperiod,'period':period, 'period_month':period_month},
        dataType: "html",
        success: function (result) {
            $("#staff_detail_report_chart").html(result);         
        }
    });
}
function load_Franchise_Admin_Report(office='',brand='',selectperiod='', activity_fee_name='',period='',period_month='') {
    $('#franchise-admin-reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/franchise_admin_report_max_limit_count',
        success: function (result) {
            $('#franchise-admin-reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "scrollY": "600px",
                "scrollCollapse": true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 10,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'FranchiseAdminReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'FranchiseAdminReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_franchise_admin_report_data',
                    'type': 'POST',
                    data: { 'brand': brand, 'office': office,'selectperiod':selectperiod, 'activity_fee_name':activity_fee_name, 'period':period, 'period_month':period_month },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'invoice_id'},
                    { data: 'office_id'},
                    { data: 'activity_fee_name' },
                    { data: 'amount_billed',render: $.fn.dataTable.render.number(',', '.', 2, '$')},                    
                    { data: 'amount_collected',render: $.fn.dataTable.render.number(',', '.', 2, '$')},                    
                    { 
                        data: 'requested_date', 
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }
                    },
                    { 
                        data: 'payment_date',
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }    
                    },
                    { data: 'period' }
                ],
                'columnDefs': [
                    { width: '60px', targets: 0, className: 'text-center' },
                    { targets: 1,width:'110px'},
                    { targets: 2,className: 'font-weight-bold'},                    
                    { targets: 3,width:'110px'},
                    { targets: 4,width:'110px'}, 
                    { targets: 5,width:'110px'}, 
                    { targets: 6,width:'110px'} 
                ]
            });
        },
    });    
}
function reload_franchise_admin_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/franchise_invoice_report_cron.php',
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

function billing_report_filter_modal(reference = '', current_element = '') {
    var due_date_val = $("#due_date").val();
    var request_date_val = $("#request_date").val();
    var form_data = new FormData(document.getElementById('billing_report-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'due_date') {
        $("#due_date_pre").val(due_date_val);
    }
    if (previous_filter == 'request_date') {
        $("#request_date_pre").val(request_date_val);
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
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                if (active_element == 'due_date') {
                    id_val = 'due_date';
                }
                if (active_element == 'request_date') {
                    id_val = 'request_date';
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
            url: base_url + 'modal/invoice_report_filter_modal',
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
                        if (active_element == 'due_date') {
                            id_val = 'due_date';
                        }
                        if (active_element == 'request_date') {
                            id_val = 'request_date';
                        }
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
                if (active_element == 'due_date') {
                    id_val = 'due_date';
                }
                if (active_element == 'request_date') {
                    id_val = 'request_date';
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

function billingReport_filter_new(is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if (removavle_element == 'request_date' || removavle_element == 'due_date') {
            $("#"+removavle_element).val('');
            $("#request_date_pre").val('');
            $("#due_date_pre").val('');
        } else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('billing_report-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'payment_status') {
            var id = 'payment_status-val';
            if(is_clear==''){
                $("#payment_status-clear_filter").show();
            }        
        }
        if (a == 'service_category') {
            var id = 'service_category-val';
            if(is_clear==''){
                $("#service_category-clear_filter").show();
            }
        }
        if (a == 'office') {
            var id = 'office-val';
            if(is_clear==''){
                $("#office-clear_filter").show();
            }
        }
        if (a == 'staff_requested_by') {
            var id = 'staff_requested_by-val';
            if(is_clear==''){
                $("#staff_requested_by-clear_filter").show();
            }
        
        }
        if (a == 'due_date') {
            var id = 'due_date-val';
            if(is_clear==''){
                $("#due_date-clear_filter").show();
            }
        }
        if (a == 'request_date') {
            var id = 'request_date-val';
            if(is_clear==''){
                $("#request_date-clear_filter").show();
            }
        }
        if (a == 'client_status') {
            var id = 'client_status-val';
            if(is_clear==''){
                $("#client_status-clear_filter").show();
            }
        }
        if (a == 'invoice_type') {
            var id = 'invoice_type-val';
            if(is_clear==''){
                $("#invoice_type-clear_filter").show();
            }
        }
    }
    var payment_status = $("#payment_status").val();
    //alert(payment_status);
    var service_category = $("#service_category").val();
    //alert(service_category);
    var office = $("#office").val();
    //alert(office);
    var staff_requested_by = $("#staff_requested_by").val();
   // alert(staff_requested_by);
    var requestdaterange = $("#request_date").val();
   // alert(requestdaterange);
    var duedaterange = $("#due_date").val();
    //alert(duedaterange);
    var due_date_pre = $("#due_date_pre").val();
    //alert(due_date_pre);
    var request_date_pre = $("#request_date_pre").val();
    var client_status = $("#client_status").val();
    var invoice_type = $("#invoice_type").val();
    //alert(request_date_pre); 
    if (due_date_pre != '') {
        duedaterange = due_date_pre;
    }
    if (request_date_pre != '') {
        requestdaterange = request_date_pre;
    }
    // console.log(duedaterange);
    if (payment_status != '' || service_category != '' || office != '' || staff_requested_by != '' || requestdaterange != '' || duedaterange != ''|| client_status !='' ||invoice_type!= '') {
         //alert("1");
        $("#invoice_report_btn_clear_filter").show();
    }
    loadBillingReportData(payment_status , service_category , duedaterange , requestdaterange , office , staff_requested_by, client_status,invoice_type);
    get_total_billing_report(payment_status , service_category , duedaterange , requestdaterange , office , staff_requested_by, client_status,invoice_type);
}

function clear_advance_search_for_report1() {
    window.location.reload();
}

function project_report_overview_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('project_report_overview-display-div'));
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
            url: base_url + 'modal/projectOverview_report_filter_modal',
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

function projectReportsOverview_filter_new(is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        $("#"+removavle_element).val('').trigger('chosen:updated');
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('project_report_overview-display-div'));
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
        if (a == 'category') {
            var id = 'category-val';
            if(is_clear==''){
                $("#category-clear_filter").show();
            }
        }
        if (a == 'template') {
            var id = 'template-val';
            if(is_clear==''){
                $("#template-clear_filter").show();
            }
        }
    }    
    var office = $("#office").val();
    var category = $("#category").val();
    //alert(office);
    var template = $("#template").val();
    // console.log(duedaterange);
    if (office != '' || category != '' || template != '') {
         //alert("1");
        $("#projectReportsOverview_filter_clear").show();
    }
    loadProjectOverviewReportData(office , category ,template); 
    get_total_project_overview_report(office , category ,template);   
}

function project_report_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('project_detail_report-filter-display-div'));
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
                if (id_val == 'period_month') {
                    id_val = 'period';
                }
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
            url: base_url + 'modal/project_report_filter_modal',
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
                        if (id_val == 'period_month') {
                            id_val = 'period';
                        }
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
                if (id_val == 'period_month') {
                            id_val = 'period';
                }
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
    }
}

function projectReports_filter_new(is_clear='',current_clear_element='',current_clear_element2='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);//return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        // var clear_element2=current_clear_element2;
        //console.log(clear_element);
        // console.log(clear_element2);
        let removavle_element = $("#filter-field-variable").val();
        if(current_clear_element2 != ''){
         // console.log(removavle_element);
         $("#"+current_clear_element2).val('').trigger('chosen:updated');
        }
        $("#"+removavle_element).val('').trigger('chosen:updated');
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('project_detail_report-filter-display-div'));
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
        if (a == 'client') {
            var id = 'client-val';
            if(is_clear==''){
                $("#client-clear_filter").show();
            }
        }
        if (a == 'project') {
            var id = 'project-val';
            if(is_clear==''){
                $("#project-clear_filter").show();
            }
        }
        if (a == 'assign_staff') {
            var id = 'assign_staff-val';
            if(is_clear==''){
                $("#assign_staff-clear_filter").show();
            }
        }
        if (a == 'responsible_staff') {
            var id = 'responsible_staff-val';
            if(is_clear==''){
                $("#responsible_staff-clear_filter").show();
            }
        }
        if (a == 'category') {
            var id = 'category-val';
            if(is_clear==''){
                $("#category-clear_filter").show();
            }
        }
        if (a == 'templates') {
            var id = 'templates-val';
            if(is_clear==''){
                $("#templates-clear_filter").show();
            }
        }
        if (a == 'partner') {
            var id = 'partner-val';
            if(is_clear==''){
                $("#partner-clear_filter").show();
            }
        }
        if (a == 'manager') {
            var id = 'manager-val';
            if(is_clear==''){
                $("#manager-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'tracking-val';
            if(is_clear==''){
                $("#tracking-clear_filter").show();
            }
        }
        if (a == 'client_status') {
            var id = 'client_status-val';
            if(is_clear==''){
                $("#client_status-clear_filter").show();
            }
        }
        if (a == 'period' || a == 'period_month') {
            var id = 'period-val';
            if(is_clear==''){
                $("#period-clear_filter").show();
            }
        } 
    }    
    var office = $("#office").val();
    var client = $("#client").val();
    var project = $("#project").val();
    var assign_staff = $("#assign_staff").val();
    var responsible_staff = $("#responsible_staff").val();
    var category = $("#category").val();
    var templates = $("#templates").val();
    var partner = $("#partner").val();
    var manager = $("#manager").val();
    var tracking = $("#tracking").val();
    var client_status = $("#client_status").val();
    var period = $("#period").val();
    var period_month = $("#period_month").val();
    console.log(period);
    console.log(period_month);
      if (period == null){
             period ='';
      }
      if (period_month == null){
             period_month = ''; 
      }
    // console.log(duedaterange);
    if (office != '' || client != '' || project != '' || assign_staff != '' || responsible_staff != '' || category != '' || templates != '' || partner != '' || manager != '' || tracking != ''|| period != ''|| period_month != ''|| client_status != '') {
         //alert("1");
        $("#project_report_clear_filter").show();
    }
    loadProjectReportData(office , client , project , assign_staff, responsible_staff, category, templates, partner, manager, tracking,client_status,period,period_month);  
    get_total_project_report(office , client , project , assign_staff, responsible_staff, category, templates, partner, manager, tracking,client_status,period,period_month);  
}


function bookkeeping_report_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('bookkeeping_report-filter-display-div'));
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
            url: base_url + 'modal/bookkeepingReport_filter_modal',
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
function bookkeepingReports_filter_new(is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        $("#"+removavle_element).val('').trigger('chosen:updated');
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('bookkeeping_report-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'staff') {
            var id = 'staff-val';
            if(is_clear==''){
                $("#staff-clear_filter").show();
            }        
        }
    }    
    var staff = $("#staff").val();
    
    // console.log(duedaterange);
    if (staff != '') {
         //alert("1");
        $("#bookkeepingReport_btn_clear_filter").show();
    }
    load_bookkeeping_report(staff);    
}
function timeExpense_sorting_filter_modal(reference = '', current_element = '') {
    var date_val = $("#date").val();

    var form_data = new FormData(document.getElementById('timeExpense-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'date') {
        $("#date_pre").val(date_val);
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
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                if (active_element == 'date') {
                    id_val = 'date';
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
            url: base_url + 'modal/timeExpense_report_filter_modal',
            data: {
                reference: reference
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                console.log(result);
                $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
                $(".filter-options-val").hide();

                $("#" + current_element.id).removeClass('btn-success btn-primary').addClass('btn-outline-success');
                $("#" + current_element.id + "-display").html(result).slideDown('slow');
                for (const formElement of form_data) {
                   console.log(formElement);
                    let filter_name = formElement[0];
                    let filter_value = formElement[0];
                    console.log(filter_value);
                    if (formElement[1] != '') {
                        let active_element = filter_name.split("[")[0];     
                        // console.log(active_element.id);

                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
                        if (active_element == 'date') {
                            id_val = 'date';
                        }
                        
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
                if (active_element == 'date') {
                    id_val = 'date';
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

function timeExpense_filter_new(is_clear='',current_clear_element=''){
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if (removavle_element == 'date') {
            $("#"+removavle_element).val('');
            $("#date_pre").val('');
        } else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('timeExpense-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'staff') {
            var id = 'staff-val';
            if(is_clear==''){
                $("#staff-clear_filter").show();
            }        
        }
        if (a == 'office') {
            var id = 'office-val';
            if(is_clear==''){
                $("#office-clear_filter").show();
            }
        }
        if (a == 'period') {
            var id = 'period-val';
            if(is_clear==''){
                $("#period-clear_filter").show();
            }
        }
        if (a == 'status') {
            var id = 'status-val';
            if(is_clear==''){
                $("#status-clear_filter").show();
            }
        
        }
        if (a == 'client_status') {
            var id = 'client_status-val';
            if(is_clear==''){
                $("#client_status-clear_filter").show();
            }
        
        }
        if (a == 'date') {
            var id = 'date-val';
            if(is_clear==''){
                $("#date-clear_filter").show();
            }
        }
    }
    var staff = $("#staff").val();
    //alert(payment_status);
    var office = $("#office").val();
    // alert(office);
    var period = $("#period").val();
    //alert(period);
    var status = $("#status").val();
    var client_status = $("#client_status").val();
    var daterange = $("#date").val();
    //alert(duedaterange);
    var date_pre = $("#date_pre").val();
    //alert(due_date_pre);
   
    if (date_pre != '') {
        daterange = date_pre;
    }
    
    // console.log(duedaterange);
     if (staff != ''||office !=''||period !=''||status !=''||daterange !=''||client_status !='') {
         //alert("1");
        $("#timeExpense_btn_clear_filter").show();
    }
    load_time_and_expenses_report(staff,office,period,status,daterange,client_status); 
    
}

function load_reconcilation_report(office = '' , date_range = '') {
    $('#reconciliation-reports-tab').DataTable().destroy();
    $('#reconciliation-reports-tab').DataTable({
        'processing': false,
        'serverSide': true,
        'serverMethod': 'post',
        'scrollX': true,
        'scrollY': '400px',
        // 'pageLength': 25,
        'paging':false,
        'scrollCollapse': true,
        'searching': false,       
        'ajax': {
            'url': base_url + 'reports/get_reconciliation_report_data',
            'type': 'POST',
            'data': {
                'office': office,
                'date_range': date_range
            },
            beforeSend: function () {
                openLoading();
            },
            complete: function (msg) {
                // closeLoading();
            }
        },
        'columns': [
            { data: 'plan_name', className:'dt-body-nowrap'},
            { data: 'total_client' },
            { data: 'total_invoice' },
            { data: 'total_retail_price', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
            { data: 'total_billed', render: $.fn.dataTable.render.number(',', '.', 2, '$') },                    
            { data: 'total_paid', render: $.fn.dataTable.render.number(',', '.', 2, '$') },                    
            { data: 'total_unpaid', render: $.fn.dataTable.render.number(',', '.', 2, '$') }
        ],
        "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
            var total_indexs = [3,4,5,6];
            var api = this.api(), data;         
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            for(var j=0;j<total_indexs.length;j++) {
                pageTotal = api
                    .column( total_indexs[j], { page: 'current'} )
                    .data()
                    .reduce( function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0 );
                $( api.column( total_indexs[j] ).footer() ).html(
                    Number(pageTotal).toLocaleString('en-US', {maximumFractionDigits:2,style: "currency",currency:"USD"})
                );
            }
        }
    });    
}

function load_reconcilation_client_chart(office = '' , date_range = '') {
    $.ajax({
        type: "POST",
        url: base_url + 'reports/load_reconcilation_client_chart',
        data: {
                'office': office,
                'date_range': date_range
            },
        dataType: "html",
        success: function (result) {
            $("#re_client_report_chart").html(result);         
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function load_reconcilation_payment_chart() {
    $.ajax({
        type: "POST",
        url: base_url + 'reports/load_reconcilation_payment_chart',
        dataType: "html",
        success: function (result) {
            $("#re_payment_report_chart").html(result);         
        }
    });
}

function update_reconciliation_data(value , id) {
    $.ajax({
        type: "POST",
        url: base_url + 'reports/update_reconciliation_data',
        data: {
            value: value,
            id: id
        },
        dataType: "html",
        success: function (result) {
            if (result != '') {
                var data = JSON.parse(result);
                if (id == 1) {
                    $("#de_real").val(data.real_data);
                }

                if (id == 2) {
                    $("#cc_real").val(data.real_data);
                }

                if (id == 3) {
                    $("#ul_real").val(data.real_data);
                }

                if (id == 4) {
                    $("#pa_real").val(data.real_data);
                }
            }        
        }
    });
}

function royaltyReport_sorting_filter_modal(reference = '', current_element = '') {
    var date_val = $("#date").val();

    var form_data = new FormData(document.getElementById('royaltyReport-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'date') {
        $("#date_pre").val(date_val);
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
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                if (active_element == 'date') {
                    id_val = 'date';
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
            url: base_url + 'modal/royaltyreport_filter_modal',
            data: {
                reference: reference
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                console.log(result);
                $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
                $(".filter-options-val").hide();

                $("#" + current_element.id).removeClass('btn-success btn-primary').addClass('btn-outline-success');
                $("#" + current_element.id + "-display").html(result).slideDown('slow');
                for (const formElement of form_data) {
                   console.log(formElement);
                    let filter_name = formElement[0];
                    let filter_value = formElement[0];
                    console.log(filter_value);
                    if (formElement[1] != '') {
                        let active_element = filter_name.split("[")[0];     
                        // console.log(active_element.id);

                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
                        if (active_element == 'date') {
                            id_val = 'date';
                        }
                        
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
                if (active_element == 'date') {
                    id_val = 'date';
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

function royaltyReport_filter_new(is_clear='',current_clear_element=''){
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if (removavle_element == 'date') {
            $("#"+removavle_element).val('');
            $("#date_pre").val('');
        } else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('royaltyReport-filter-display-div'));
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

        if (a == 'date') {
            var id = 'date-val';
            if(is_clear==''){
                $("#date-clear_filter").show();
            }
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if(is_clear==''){
                $("#service_name-clear_filter").show();
            }
        }
        if (a == 'status') {
            var id = 'status-val';
            if(is_clear==''){
                $("#status-clear_filter").show();
            }
        }
    }
    var office = $("#office").val();
    var daterange = $("#date").val();
    var date_pre = $("#date_pre").val();
    var service_name = $("#service_name").val();
    // if(service_name[0]==''){
    //     service_name = '';
    // }
    var status = $("#status").val();
    console.log(status);
    // if()

    if (date_pre != '') {
        daterange = date_pre;
    }

     if (office != '' ||daterange !=''||status != ''||service_name != '') {
         //alert("1");
        $("#royaltyReport_btn_clear_filter").show();
    }
    loadRoyaltyReportsData(office, daterange,service_name,status); 
    get_total_royalty_report(office, daterange,service_name,status);
}

function printReconcilationReport() {
    var doPrint = window.open();
    var printHtml = '<style type="text/css">body {background: #fff !important;} *{ font-size: 13px;}</style>';
    printHtml = printHtml + $('.reconcilation-print').html();
    doPrint.document.write(printHtml);
    doPrint.print();
    doPrint.close();
}

function weeklySales_sorting_filter_modal(reference = '', current_element = '') {
    var date_val = $("#date").val();

    var form_data = new FormData(document.getElementById('weeklySales-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'date') {
        $("#date_pre").val(date_val);
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
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                if (active_element == 'date') {
                    id_val = 'date';
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
            url: base_url + 'modal/weeklySales_report_filter_modal',
            data: {
                reference: reference
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                console.log(result);
                $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
                $(".filter-options-val").hide();

                $("#" + current_element.id).removeClass('btn-success btn-primary').addClass('btn-outline-success');
                $("#" + current_element.id + "-display").html(result).slideDown('slow');
                for (const formElement of form_data) {
                   console.log(formElement);
                    let filter_name = formElement[0];
                    let filter_value = formElement[0];
                    console.log(filter_value);
                    if (formElement[1] != '') {
                        let active_element = filter_name.split("[")[0];     
                        // console.log(active_element.id);

                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
                        if (active_element == 'date') {
                            id_val = 'date';
                        }
                        
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
                if (active_element == 'date') {
                    id_val = 'date';
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

function weeklySales_filter_new(is_clear='',current_clear_element=''){
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if (removavle_element == 'date') {
            $("#"+removavle_element).val('');
            $("#date_pre").val('');
        } else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('weeklySales-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
        if (a == 'office') {
            var id = 'office-val';
            if(is_clear==''){
                $("#office-clear_filter").show();
            }
        }
        if (a == 'date') {
            var id = 'date-val';
            if(is_clear==''){
                $("#date-clear_filter").show();
            }
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if(is_clear==''){
                $("#service_name-clear_filter").show();
            }
        }
        if (a == 'status') {
            var id = 'status-val';
            if(is_clear==''){
                $("#status-clear_filter").show();
            }
        }
    }
    var office = $("#office").val();
  
    var daterange = $("#date").val();
    //alert(duedaterange);
    var date_pre = $("#date_pre").val();
    //alert(due_date_pre);
    var status = $("#status").val();
    var service_name = $("#service_name").val();
   
    if (date_pre != '') {
        daterange = date_pre;
    }
    
    // console.log(duedaterange);
     if (office !=''||daterange !=''||service_name !=''||status !='') {
         //alert("1");
        $("#weeklySales_btn_clear_filter").show();
    }
    loadSalesReportsData(office,daterange,service_name,status);
    
}
function loadProjectMissingImportClient(){
    $('#project-missing-client').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/project_missing_import_client_count',
        success: function (result) {
            $('#project-missing-client').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, 500, result], [10, 25, 50, 100, 500, "All"]],
                "pageLength": 500,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        text:   '<i class="fa fa-file-text-o"></i>&nbsp;Download',
                        title: 'Project Missing Import Client Report'
                    },
                    {
                        extend: 'print',
                        text:   '<i class="fa fa-print"></i>&nbsp;Print',
                        title: 'Project Missing Import Client Report',
                        customize: function (win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_project_missing_import_client_data',
                    'type': 'POST',
                    'data': {},
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'clientid' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}
function staff_details_sorting_filter_modal(reference = '', current_element = '') {
    var payment_date_val = $("#payment_date").val();
    var form_data = new FormData(document.getElementById('staff_detail-filter-display-div'));
    // var val = form_data.getAll(name);
//     console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'payment_date') {
        $("#payment_date_pre").val(payment_date_val);
    }
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
                if (active_element == 'payment_date') {
                    id_val = 'payment_date';
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
            url: base_url + 'modal/staff_details_sorting_filter_modal',
            data: {
                reference: reference
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
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
                        if (active_element == 'payment_date') {
                            id_val = 'payment_date';
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
                if (active_element == 'payment_date') {
                        id_val = 'payment_date';
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

function staff_detail_filter_new(is_clear='',current_clear_element=''){
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if (removavle_element == 'date') {
            $("#"+removavle_element).val('');
            $("#date_pre").val('').trigger('chosen:updated');;
        }else if (removavle_element == 'payment_date') {
            $("#"+removavle_element).val('');
            $("#payment_date").val('');
        } else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('staff_detail-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
       
        if (a == 'invoice_id') {
            var id = 'invoice_id-val';
            if(is_clear==''){
                $("#invoice_id-clear_filter").show();
            }
        }

        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if(is_clear==''){
                $("#client_manager-clear_filter").show();
            }
        }
        if (a == 'requested_by') {
            var id = 'requested_by-val';
            if(is_clear==''){
                $("#requested_by-clear_filter").show();
            }
        }
        if (a == 'staff') {
            var id = 'staff-val';
            if(is_clear==''){
                $("#staff-clear_filter").show();
            }
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if(is_clear==''){
                $("#service_name-clear_filter").show();
            }
        }
        if (a == 'invoice_type') {
            var id = 'invoice_type-val';
            if(is_clear==''){
                $("#invoice_type-clear_filter").show();
            }
        }
        if (a == 'payment_type') {
            var id = 'payment_type-val';
            if(is_clear==''){
                $("#payment_type-clear_filter").show();
            }
        }
        if (a == 'date_range') {
            var id = 'date_range-val';
            if(is_clear==''){
                $("#date_range-clear_filter").show();
            }
        }
        if (a == 'service_category') {
            var id = 'service_category-val';
            if(is_clear==''){
                $("#service_category-clear_filter").show();
            }
        }
        if (a == 'office') {
            var id = 'office-val';
            if(is_clear==''){
                $("#office-clear_filter").show();
            }
        }
        if (a == 'payment_date') {
            var id = 'payment_date-val';
            if(is_clear==''){
                $("#payment_date-clear_filter").show();
            }
        }
    }
    var invoice_id = $("#invoice_id").val();
    var client_id = $("#client_id").val();
    var client_manager = $("#client_manager").val();
    var requested_by = $("#requested_by").val();
    var staff = $("#staff").val();
    var service_name = $("#service_name").val();
    var invoice_type = $("#invoice_type").val();
    var payment_type = $("#payment_type").val();
    var date_range = $("#date_range").val();
    var service_category = $("#service_category").val();

    var staff_option1 = $('input[name="staff_option1"]:checked').val();
    var staff_option2 = $('input[name="staff_option2"]:checked').val();
    if(staff_option1 != undefined && staff_option1 != ''){
        staff_client_manager = staff_option1;
    } else {
        staff_client_manager = '';
    }
    if(staff_option2 != undefined && staff_option2 != ''){
        staff_requested_by = staff_option2;
    } else {
        staff_requested_by = '';
    }
    var office = $("#office").val();
    var payment_daterange = $("#payment_date").val();
    //alert(duedaterange);
    var payment_date_pre = $("#payment_date_pre").val();
    //alert(staff_option);
    // console.log(office);
    // console.log(payment_daterange);
    // console.log(payment_date_pre);//return false;
    if (payment_date_pre != '') {
        payment_daterange = payment_date_pre;
    }
    // alert(staff);return false;
    if((staff != undefined && staff != '')) {
        var staff_filter_options = staff+'-'+staff_client_manager+'-'+staff_requested_by;
    }
    if (invoice_id != '' || client_id !='' || client_manager !='' || requested_by !='' || service_name !='' || invoice_type !='' || payment_type !='' || date_range !='' || staff != ''|| office != ''|| payment_daterange != '') {
        $("#staff_detail_btn_clear_filter").show();
    }
    load_staff_detail_report(invoice_id, client_id, client_manager, requested_by, service_name, invoice_type, payment_type, date_range,'', service_category,staff_filter_options,office,payment_daterange); 
    load_staff_detail_report_chart(invoice_id, client_id, client_manager, requested_by, service_name, invoice_type, payment_type, date_range,'',service_category,staff_filter_options,office,payment_daterange);
    get_total_invoice_for_staff_details_report(invoice_id, client_id, client_manager, requested_by, service_name, invoice_type, payment_type, date_range,'', service_category,staff_filter_options,office,payment_daterange);
}
function franciseAdmin_sorting_filter_modal(reference = '', current_element = '') {
    var date_val = $("#date").val();

    var form_data = new FormData(document.getElementById('franciseAdmin-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'date') {
        $("#date_pre").val(date_val);
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
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                if (active_element == 'date') {
                    id_val = 'date';
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
            url: base_url + 'modal/franciseAdmin_report_filter_modal',
            data: {
                reference: reference
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                console.log(result);
                $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
                $(".filter-options-val").hide();

                $("#" + current_element.id).removeClass('btn-success btn-primary').addClass('btn-outline-success');
                $("#" + current_element.id + "-display").html(result).slideDown('slow');
                for (const formElement of form_data) {
                   console.log(formElement);
                    let filter_name = formElement[0];
                    let filter_value = formElement[0];
                    console.log(filter_value);
                    if (formElement[1] != '') {
                        let active_element = filter_name.split("[")[0];     
                        // console.log(active_element.id);

                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
                        if (active_element == 'date') {
                            id_val = 'date';
                        }
                        
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
                if (active_element == 'date') {
                    id_val = 'date';
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

function franciseAdmin_filter_new(is_clear='',current_clear_element=''){
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if (removavle_element == 'date') {
            $("#"+removavle_element).val('');
            $("#date_pre").val('');
        } else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('franciseAdmin-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
        if (a == 'brand') {
            var id = 'brand-val';
            if(is_clear==''){
                $("#brand-clear_filter").show();
            }
        }
        if (a == 'office_id') {
            var id = 'office_id-val';
            if(is_clear==''){
                $("#office_id-clear_filter").show();
            }
        }
        if (a == 'date') {
            var id = 'date-val';
            if(is_clear==''){
                $("#date-clear_filter").show();
            }
        }
        if (a == 'activity_fee_name') {
            var id = 'activity_fee_name-val';
            if(is_clear==''){
                $("#activity_fee_name-clear_filter").show();
            }
        }
        if (a == 'period' || a == 'period_month') {
            var id = 'period-val';
            if(is_clear==''){
                $("#period-clear_filter").show();
            }
        }
    }
    var brand = $("#brand").val();
    var office_id = $("#office_id").val();
  
    var daterange = $("#date").val();
    var activity_fee_name = $("#activity_fee_name").val();
    //alert(duedaterange);
    var date_pre = $("#date_pre").val();
    var period = $("#period").val();
    var period_month = $("#period_month").val();
    if (period == null){
        period ='';
    }
    if (period_month == null){
        period_month = ''; 
    }
    //alert(due_date_pre);
   
    if (date_pre != '') {
        daterange = date_pre;
    }
    
    // console.log(duedaterange);
     if (brand !=''||office_id !=''||daterange !='') {
         //alert("1");
        $("#franciseAdmin_btn_clear_filter").show();
    }
    load_Franchise_Admin_Report(office_id,brand,daterange,activity_fee_name,period,period_month);
    load_Franchise_Admin_Report_chart(office_id,brand,daterange,period,period_month);
    
}

function businessFinancial_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('businessFinancial-display-div'));
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
            url: base_url + 'modal/businessFinancial_report_filter_modal',
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

function businessFinancial_filter_new(is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
         if(removavle_element=='startingPeriod'){
            $("#"+removavle_element).val('').trigger('chosen:updated');
            $("#startingPeriod_month").val('').trigger('chosen:updated');
         }
         else{
            $("#"+removavle_element).val('').trigger('chosen:updated');
         }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('businessFinancial-display-div'));
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
        if (a == 'client_status') {
            var id = 'client_status-val';
            if(is_clear==''){
                $("#client_status-clear_filter").show();
            }
        }
        if (a == 'bookkeeping') {
            var id = 'bookkeeping-val';
            if(is_clear==''){
                $("#bookkeeping-clear_filter").show();
            }
        }
        if (a == 'startingPeriod'||a == 'startingPeriod_month') {
            var id = 'startingPeriod-val';
            if(is_clear==''){
                $("#startingPeriod-clear_filter").show();
            }
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }
        }
    }    
    var office = $("#office").val();
    var client_status = $("#client_status").val();
    var bookkeeping = $("#bookkeeping").val();
    var startingPeriod = $("#startingPeriod").val();
    var startingPeriod_month = $("#startingPeriod_month").val();
    var client_id = $("#client_id").val();
    
     //console.log(bookkeeping);
     console.log(startingPeriod);
     console.log(startingPeriod_month);//return false;
     if(startingPeriod==null){
        startingPeriod = '';
     }
     if(startingPeriod_month==null){
        startingPeriod_month = '';
     }
    if (office != '' || client_status != '' || bookkeeping != '' || startingPeriod != '' ||startingPeriod_month != '' || client_id != '') {
         //alert("1");
        $("#businessFinancial_filter_clear").show();
    }
    load_com_financial_account_report(office , client_status,bookkeeping,startingPeriod,startingPeriod_month,client_id); 
    load_total_com_financial_account_report(office , client_status,bookkeeping,startingPeriod,startingPeriod_month,client_id);   
}

function indidualFinancial_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('individualFinancial-display-div'));
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
            url: base_url + 'modal/individualFinancial_report_filter_modal',
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

function indidualFinancial_filter_new(is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if(removavle_element=='startingPeriod'){
            $("#"+removavle_element).val('').trigger('chosen:updated');
            $("#startingPeriod_month").val('').trigger('chosen:updated');
         }
         else{
            $("#"+removavle_element).val('').trigger('chosen:updated');
         }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('individualFinancial-display-div'));
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
        if (a == 'client_status') {
            var id = 'client_status-val';
            if(is_clear==''){
                $("#client_status-clear_filter").show();
            }
        }
        if (a == 'bookkeeping') {
            var id = 'bookkeeping-val';
            if(is_clear==''){
                $("#bookkeeping-clear_filter").show();
            }
        }
        if (a == 'startingPeriod'||a == 'startingPeriod_month') {
            var id = 'startingPeriod-val';
            if(is_clear==''){
                $("#startingPeriod-clear_filter").show();
            }
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }
        }
    }    
    var office = $("#office").val();
    var client_status = $("#client_status").val();
    var bookkeeping = $("#bookkeeping").val();
    var startingPeriod = $("#startingPeriod").val();
    var startingPeriod_month = $("#startingPeriod_month").val();
    var client_id = $("#client_id").val();
     //console.log(bookkeeping);
     console.log(startingPeriod);
     console.log(startingPeriod_month);//return false;
     if(startingPeriod==null){
        startingPeriod = '';
     }
     if(startingPeriod_month==null){
        startingPeriod_month = '';
     }
    // console.log(duedaterange);
    if (office != '' || client_status != ''|| bookkeeping != '' || startingPeriod != '' ||startingPeriod_month != '' || client_id != '') {
         //alert("1");
        $("#individualFinancial_filter_clear").show();
    }
    load_ind_financial_account_report(office , client_status,bookkeeping,startingPeriod,startingPeriod_month,client_id); 
    load_total_ind_financial_account_report(office , client_status,bookkeeping,startingPeriod,startingPeriod_month,client_id);   
}
function get_total_invoice_for_staff_details_report(invoice_id='', client_id='', client_manager='', requested_by='', service_name='', invoice_type='', payment_type='', date_range='',staff_id='', service_category='',staff_filter_options='', office = '',payment_daterange='') {
    $.ajax({
        type: "POST",
        url: base_url + 'reports/get_total_invoice_for_staff_details_report',
        data: {
            'invoice_id': invoice_id,
            'client_id': client_id,
            'client_manager':client_manager,
            'requested_by':requested_by,
            'service_name':service_name,
            'invoice_type':invoice_type,
            'payment_type':payment_type,
            'date_range':date_range,
            'staff_id':staff_id,
            'service_category':service_category,
            'staff_filter_options':staff_filter_options,
            'office': office,
            'payment_daterange' : payment_daterange
        },
        dataType: "html",
        success: function (result) {
            $("#total_by_name_data").html(result);         
        }
    });
}
function load_collection_report_data(client_id = '' , office = '' , client_manager = '' , order_id = '' , requestdaterange = '' , duedaterange = '', service_category = '', service_name = '', days_late = '') {
    $('#collection-reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/collection_report_max_limit_count',
        success: function (result) {
            $('#collection-reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'CollectionReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'CollectionReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_collections_report_data',
                    'type': 'POST',
                    data: { 'client_id': client_id, 'office': office, 'client_manager': client_manager, 'order_id': order_id, 'requestdaterange': requestdaterange, 'duedaterange':duedaterange, 'service_category':service_category, 'service_name':service_name, 'days_late':days_late },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    
                    { data: 'client_id' },
                    { data: 'client_name' },
                    { data: 'office' },
                    { data: 'client_manager' },
                    { data: 'order_id' },
                    { data: 'service_id' },
                    { data: 'service_category' },
                    { data: 'service_name' },
                    {
                        data: 'requested_date',
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }
                    },
                    {
                        data: 'due_date',
                        render: function (data, type, row) {
                            return data.split('-')[1] + '-' + data.split('-')[2] + '-' + data.split('-')[0];
                        }
                    },
                    { data: 'billed_amount', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'collected_amount', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'pending_amount', render: $.fn.dataTable.render.number(',', '.', 2, '$') },
                    { data: 'days_late' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
                    var total_indexs = [10,11,12];                         
                    var api = this.api(), data;
         
                    /*Remove the formatting to get integer data for summation*/
                    var intVal = function ( i ) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '')*1 :
                            typeof i === 'number' ?
                                i : 0;
                    };
                    for(var j=0;j<total_indexs.length;j++) {
                        /* Total over this page */
                        pageTotal = api
                            .column( total_indexs[j], { page: 'current'} )
                            .data()
                            .reduce( function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0 );
             
                        /* Update footer */
                        $( api.column( total_indexs[j] ).footer() ).html(
                            Number(pageTotal).toLocaleString('en-US', {maximumFractionDigits:2,style: "currency",currency:"USD"})                            
                        );
                    }
                }
            });
        },
    });
}

function get_total_collection_report_data(client_id = '' , office = '' , client_manager = '' , order_id = '' , requestdaterange = '' , duedaterange = '', service_category = '', service_name = '', days_late = '') {
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_total_collection_report_data',
        data: { 'client_id': client_id, 'office': office, 'client_manager': client_manager, 'order_id': order_id, 'requestdaterange': requestdaterange, 'duedaterange':duedaterange, 'service_category':service_category, 'service_name':service_name, 'days_late':days_late },
        success: function (result) {
            $("#total").html(result);
        },
    });
}


function collection_report_filter_modal(reference = '', current_element = '') {
    var due_date_val = $("#due_date").val();
    var request_date_val = $("#request_date").val();
    var form_data = new FormData(document.getElementById('collection-report-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'due_date') {
        $("#due_date_pre").val(due_date_val);
    }
    if (previous_filter == 'request_date') {
        $("#request_date_pre").val(request_date_val);
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
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                if (active_element == 'due_date') {
                    id_val = 'due_date';
                }
                if (active_element == 'request_date') {
                    id_val = 'request_date';
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
            url: base_url + 'modal/collection_filter_modal',
            data: {
                reference: reference
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                console.log(result); return false;
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
                        if (active_element == 'due_date') {
                            id_val = 'due_date';
                        }
                        if (active_element == 'request_date') {
                            id_val = 'request_date';
                        }
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
                if (active_element == 'due_date') {
                    id_val = 'due_date';
                }
                if (active_element == 'request_date') {
                    id_val = 'request_date';
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
function collection_report_filter_new(is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if (removavle_element == 'request_date' || removavle_element == 'due_date') {
            $("#"+removavle_element).val('');
            $("#request_date_pre").val('');
            $("#due_date_pre").val('');
        } else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('collection-report-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }        
        }
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
        if (a == 'order_id') {
            var id = 'order_id-val';
            if(is_clear==''){
                $("#order_id-clear_filter").show();
            }
        
        }
        if (a == 'due_date') {
            var id = 'due_date-val';
            if(is_clear==''){
                $("#due_date-clear_filter").show();
            }
        }
        if (a == 'request_date') {
            var id = 'request_date-val';
            if(is_clear==''){
                $("#request_date-clear_filter").show();
            }
        }
        if (a == 'service_category') {
            var id = 'service_category-val';
            if(is_clear==''){
                $("#service_category-clear_filter").show();
            }
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if(is_clear==''){
                $("#service_name-clear_filter").show();
            }
        }
        if (a == 'days_late') {
            var id = 'days_late-val';
            if(is_clear==''){
                $("#days_late-clear_filter").show();
            }
        }
    }
    var client_id = $("#client_id").val();
    var office = $("#office").val();
    var client_manager = $("#client_manager").val();
    var order_id = $("#order_id").val();
    var requestdaterange = $("#request_date").val();
    var duedaterange = $("#due_date").val();
    var due_date_pre = $("#due_date_pre").val();
    var request_date_pre = $("#request_date_pre").val();
    var service_category = $("#service_category").val();
    var service_name = $("#service_name").val();
    var days_late = $("#days_late").val();
    if (due_date_pre != '') {
        duedaterange = due_date_pre;
    }
    if (request_date_pre != '') {
        requestdaterange = request_date_pre;
    }
    // console.log(duedaterange);
    if (client_id != '' || office != '' || client_manager != '' || order_id != '' || requestdaterange != '' || duedaterange != ''|| service_category !='' || service_name != '' || days_late != '') {
         //alert("1");
        $("#invoice_report_btn_clear_filter").show();
    }
    load_collection_report_data(client_id , office , client_manager , order_id , requestdaterange , duedaterange, service_category, service_name, days_late);
    get_total_collection_report_data(client_id , office , client_manager , order_id , requestdaterange , duedaterange, service_category, service_name, days_late);
}
function load_payments_detail_report_chart(client_id='',office='',order_id='',service_category='',service_name='',days_late='',payment_type='',client_manager='',due_date='' , created_date='', payment_date = '') {
    $.ajax({
        type: "POST",
        url: base_url + 'reports/load_payments_detail_report_chart',
        data: { 'client_id': client_id, 'office': office,'order_id': order_id, 'service_category': service_category,'service_name': service_name, 'days_late': days_late,'payment_type': payment_type, 'client_manager': client_manager, 'due_date': due_date, 'created_date': created_date, 'payment_date': payment_date},
        dataType: "html",
        success: function (result) {
            $("#payment_detail_report_chart").html(result);         
        }
    });
}
function load_payment_details_report(client_id='',office='',order_id='',service_category='',service_name='',days_late='',payment_type='',client_manager='',due_date='' , created_date='', payment_date = '') {
    $('#payment-detail-reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/payment_detail_reports_max_limit_count',
        success: function (result) {
            $('#payment-detail-reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "scrollY": "800px",
                "scrollCollapse": true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 10,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'PaymentDetailReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'PaymentDetailReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_payment_detail_reports_data',
                    'type': 'POST',
                    'data': {  'client_id': client_id, 'office': office,'order_id': order_id, 'service_category': service_category,'service_name': service_name, 'days_late': days_late,'payment_type': payment_type, 'client_manager': client_manager, 'due_date': due_date, 'created_date': created_date, 'payment_date': payment_date },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'client_id' },
                    { data: 'client_name' },
                    { data: 'office' },
                    { data: 'client_manager' },         
                    { data: 'order_id' },
                    { data: 'service_id' },            
                    { data: 'service_category'},                    
                    { data: 'service_name' },
                    { data: 'requested_date'},
                    { data: 'due_date' },
                    { data: 'days_late' },
                    { data: 'billed_amount'},
                    { data: 'total_collected_amount' },
                    { data: 'requested_by' },
                    { data: 'payment_type_name' },
                    { data: 'payment_date' },
                    { data: 'payment_authorization_id' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 },
                    { className: 'dt-body-nowrap p-l-10 p-r-10', targets: 3 },
                ]
            });
        },
    });    
}

function payment_details_report_filter_modal(reference = '', current_element = '') {
    var due_date_val = $("#due_date").val();
    var request_date_val = $("#request_date").val();
    var form_data = new FormData(document.getElementById('payment_details_report-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'due_date') {
        $("#due_date_pre").val(due_date_val);
    }
    if (previous_filter == 'request_date') {
        $("#request_date_pre").val(request_date_val);
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
                let id_val = $('[name="'+active_element+'[]"]').attr('id');
                if (active_element == 'due_date') {
                    id_val = 'due_date';
                }
                if (active_element == 'request_date') {
                    id_val = 'request_date';
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
            url: base_url + 'reports/payment_details_report_filter_modal',
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
                        if (active_element == 'due_date') {
                            id_val = 'due_date';
                        }
                        if (active_element == 'request_date') {
                            id_val = 'request_date';
                        }
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
                if (active_element == 'due_date') {
                    id_val = 'due_date';
                }
                if (active_element == 'request_date') {
                    id_val = 'request_date';
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
function payment_details_report_filter(is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if (removavle_element == 'request_date' || removavle_element == 'due_date') {
            $("#"+removavle_element).val('');
            $("#request_date_pre").val('');
            $("#due_date_pre").val('');
        } else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('payment_details_report-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'service_category') {
            var id = 'service_category-val';
            if(is_clear==''){
                $("#service_category-clear_filter").show();
            }
        }
        if (a == 'office') {
            var id = 'office-val';
            if(is_clear==''){
                $("#office-clear_filter").show();
            }
        }
        if (a == 'due_date') {
            var id = 'due_date-val';
            if(is_clear==''){
                $("#due_date-clear_filter").show();
            }
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'order_id') {
            var id = 'order_id-val';
            if(is_clear==''){
                $("#order_id-clear_filter").show();
            }
        }
        if (a == 'service_name') {
            var id = 'service_name-val';
            if(is_clear==''){
                $("#service_name-clear_filter").show();
            }
        }
        if (a == 'days_late') {
            var id = 'days_late-val';
            if(is_clear==''){
                $("#days_late-clear_filter").show();
            }
        }
        if (a == 'payment_type') {
            var id = 'payment_type-val';
            if(is_clear==''){
                $("#payment_type-clear_filter").show();
            }
        }
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if(is_clear==''){
                $("#client_manager-clear_filter").show();
            }
        }

        if (a == 'request_date') {
            var id = 'request_date-val';
            if(is_clear==''){
                $("#request_date-clear_filter").show();
            }
        }
        if (a == 'payment_date') {
            var id = 'payment_date-val';
            if(is_clear==''){
                $("#payment_date-clear_filter").show();
            }
        }
        
        
    }
    var client_id = $("#client_id").val();
    var office = $("#office").val();
    var order_id = $("#order_id").val();
    var service_category = $("#service_category").val();
    var service_name = $("#service_name").val();
    var days_late = $("#days_late").val();
    var payment_type = $("#payment_type").val();
    var client_manager = $("#client_manager").val();

    var requestdaterange = $("#request_date").val();
    var duedaterange = $("#due_date").val();
    var due_date_pre = $("#due_date_pre").val();
    var request_date_pre = $("#request_date_pre").val();
    var payment_date = $("#payment_date").val();
 
    //alert(request_date_pre); 
    if (due_date_pre != '') {
        duedaterange = due_date_pre;
    }
    if (request_date_pre != '') {
        requestdaterange = request_date_pre;
    }
    // console.log(duedaterange);
    if (client_id != '' || service_category != '' || office != '' || order_id != '' || requestdaterange != '' || duedaterange != ''|| service_name !='' || days_late!= '' || payment_type != '' || client_manager != '' || payment_date != '') {
         //alert("1");
        $("#invoice_report_btn_clear_filter").show();
    }
    load_payment_details_report(client_id,office,order_id,service_category,service_name,days_late,payment_type,client_manager,duedaterange , requestdaterange , payment_date);
    load_payments_detail_report_chart(client_id,office,order_id,service_category,service_name,days_late,payment_type,client_manager,duedaterange , requestdaterange , payment_date);
}
function get_total_project_task_report(office='',client_id='',client_manager='',project_id='',project_name='',project_period='',period_month='',project_responsible='',task_id='',task_title='',assign_dept_office='',assign_staff='',tracking='',input_form='',target_start_date='',target_complete_date='',actual_start_date='',actual_complete_date='') {
//    console.log('hello');return false;
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/project_task_report_totals',
        data: { 'office': office,
                'client_id': client_id,
                'client_manager': client_manager,
                'project_id': project_id,
                'project_name': project_name,
                'project_period': project_period,
                'period_month': period_month,
                'project_responsible': project_responsible,
                'task_id': task_id,
                'task_title': task_title,
                'assign_dept_office':assign_dept_office,
                'assign_staff' : assign_staff,
                'tracking' : tracking,
                'input_form' : input_form,
                'target_start_date' : target_start_date,
                'target_complete_date' : target_complete_date,
                'actual_start_date' : actual_start_date,
                'actual_complete_date' : actual_complete_date
            },
        success: function (result) {
            $("#total").html(result);
        },
    });
}
function loadProjectTaskReportData(office='',client_id='',client_manager='',project_id='',project_name='',project_period='',period_month='',project_responsible='',task_id='',task_title='',assign_dept_office='',assign_staff='',tracking='',input_form='',target_start_date='',target_complete_date='',actual_start_date='',actual_complete_date='') {
//    console.log('hi');return false;
    $('#reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/project_task_report_max_limit_count',
        success: function (result) {
            $('#reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, 500, result], [10, 25, 50, 100, 500, "All"]],
                "pageLength": 500,
                'dom': '<"html5buttons"B>lTfgitp',
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'ProjectTaskReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'ProjectTaskReport',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_project_task_report_data',
                    'type': 'POST',
                    'data': { 'office': office,
                            'client_id': client_id,
                            'client_manager': client_manager,
                            'project_id': project_id,
                            'project_name': project_name,
                            'project_period': project_period,
                            'period_month': period_month,
                            'project_responsible': project_responsible,
                            'task_id': task_id,
                            'task_title': task_title,
                            'assign_dept_office':assign_dept_office,
                            'assign_staff' : assign_staff,
                            'tracking' : tracking,
                            'input_form' : input_form,
                            'target_start_date' : target_start_date,
                            'target_complete_date' : target_complete_date,
                            'actual_start_date' : actual_start_date,
                            'actual_complete_date' : actual_complete_date
                        },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'office_id' },
                    { data: 'client_id' },
                    { data: 'client_manager' },
                    { data: 'project_id' },
                    { data: 'project_name' },
                    { data: 'project_period' },
                    { data: 'project_responsible' },
                    { data: 'task_id' },
                    { data: 'task_title' },
                    { data: 'assign_dept_office' },
                    { data: 'assign_staff' },
                    { data: 'tracking' },
                    { data: 'target_start_date' },
                    { data: 'target_complete_date' },
                    { data: 'actual_start_date' },
                    { data: 'actual_complete_date' },
                    { data: 'input_form' },
                    { data: 'total_time' },
                    { data: 'sos' },
                    { data: 'files' },
                    { data: 'notes' }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}
function project_task_report_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('project_task_detail_report-filter-display-div'));
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
                if (id_val == 'period_month') {
                    id_val = 'period';
                }
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
            url: base_url + 'modal/project_task_report_filter_modal',
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
                        if (id_val == 'period_month') {
                            id_val = 'period';
                        }
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
                if (id_val == 'period_month') {
                            id_val = 'period';
                }
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
    }
}
function project_task_Reports_filter_new(is_clear='',current_clear_element='',current_clear_element2='') {
    $("#project_task_report_clear_filter").show();
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);//return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        let removavle_element = $("#filter-field-variable").val();
        if(current_clear_element2 != ''){
         $("#"+current_clear_element2).val('').trigger('chosen:updated');
        }
        $("#"+removavle_element).val('').trigger('chosen:updated');
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('project_task_detail_report-filter-display-div'));
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
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if(is_clear==''){
                $("#client_manager-clear_filter").show();
            }
        }
        if (a == 'project_name') {
            var id = 'project_name-val';
            if(is_clear==''){
                $("#project_name-clear_filter").show();
            }
        }
        if (a == 'project_responsible') {
            var id = 'project_responsible-val';
            if(is_clear==''){
                $("#project_responsible-clear_filter").show();
            }
        }
        if (a == 'task_id') {
            var id = 'task_id-val';
            if(is_clear==''){
                $("#task_id-clear_filter").show();
            }
        }
        if (a == 'task_title') {
            var id = 'task_title-val';
            if(is_clear==''){
                $("#task_title-clear_filter").show();
            }
        }
        if (a == 'assign_dept_office') {
            var id = 'assign_dept_office-val';
            if(is_clear==''){
                $("#assign_dept_office-clear_filter").show();
            }
        }
        if (a == 'assign_staff') {
            var id = 'assign_staff-val';
            if(is_clear==''){
                $("#assign_staff-clear_filter").show();
            }
        }
        if (a == 'tracking') {
            var id = 'tracking-val';
            if(is_clear==''){
                $("#tracking-clear_filter").show();
            }
        }
        if (a == 'input_form') {
            var id = 'input_form-val';
            if(is_clear==''){
                $("#input_form-clear_filter").show();
            }
        }
        if (a == 'project_period' || a == 'period_month') {
            var id = 'period-val';
            if(is_clear==''){
                $("#period-clear_filter").show();
            }
        } 
        if (a == 'project_id') {
            var id = 'project_id-val';
            if(is_clear==''){
                $("#project_id-clear_filter").show();
            }
        }
        if (a == 'target_start_date') {
            var id = 'target_start_date-val';
            if(is_clear==''){
                $("#target_start_date-clear_filter").show();
            }
        }
        if (a == 'target_complete_date') {
            var id = 'target_complete_date-val';
            if(is_clear==''){
                $("#target_complete_date-clear_filter").show();
            }
        }
        if (a == 'actual_start_date') {
            var id = 'actual_start_date-val';
            if(is_clear==''){
                $("#actual_start_date-clear_filter").show();
            }
        }
        if (a == 'actual_complete_date') {
            var id = 'actual_complete_date-val';
            if(is_clear==''){
                $("#actual_complete_date-clear_filter").show();
            }
        }
    }    
    var office = $("#office").val();
    var client_id = $("#client_id").val();
    var client_manager = $("#client_manager").val();
    var project_id = $("#project_id").val();
    var project_name = $("#project_name").val();
    var project_period = $("#project_period").val();
    var project_responsible = $("#project_responsible").val();
    var task_id = $("#task_id").val();
    var task_title = $("#task_title").val();
    var assign_dept_office = $("#assign_dept_office").val();
    var assign_staff = $("#assign_staff").val();
    var tracking = $("#tracking").val();
    var input_form = $("#input_form").val();
    var period_month = $("#period_month").val();
    var target_start_date = $("#target_start_date").val();
    var target_complete_date = $("#target_complete_date").val();
    var actual_start_date = $("#actual_start_date").val();
    var actual_complete_date = $("#actual_complete_date").val();
    if (project_period == null){
        project_period ='';
    }
    if (period_month == null){
        period_month = ''; 
    }
    loadProjectTaskReportData(office,client_id,client_manager,project_id,project_name,project_period,period_month,project_responsible,task_id,task_title,assign_dept_office,assign_staff,tracking,input_form,target_start_date,target_complete_date,actual_start_date,actual_complete_date);
    get_total_project_task_report(office,client_id,client_manager,project_id,project_name,project_period,period_month,project_responsible,task_id,task_title,assign_dept_office,assign_staff,tracking,input_form,target_start_date,target_complete_date,actual_start_date,actual_complete_date);

}

function business_client_contact_report(client_name='',company_type='',office='',client_partner='',client_manager='',contact_type='') {
    $('#business_client_contact_reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/business_client_contact_report_count',
        success: function (result) {
            $('#business_client_contact_reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'searching': false,
                "info":false,
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'business_client_contact_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'business_client_contact_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/business_client_contact_report_ajax',
                    'type': 'POST',
                    'data': { 
                        'client_name':client_name,
                        'company_type':company_type,
                        'office':office,
                        'client_partner':client_partner,
                        'client_manager':client_manager,
                        'contact_type':contact_type
                     },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'client_status' },
                    { data: 'client_creation_date' },
                    { data: 'practice_id' },
                    { data: 'client_name' },
                    { data: 'company_type' },
                    { data: 'federal_id' },
                    { data: 'state_opened' },
                    { data: 'date_incrop' },
                    { data: 'office_id' },
                    { data: 'partner_name' },
                    { data: 'manager_name' },
                    { data: 'contact_type' },
                    { data: 'contact_name' },
                    { data: 'contact_phone' },
                    { data: 'contact_whatsapp' },
                    { data: 'contact_email' },
                    { data: 'contact_address' },
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}

function business_client_contact_report_total(client_name='',company_type='',office='',client_partner='',client_manager='',contact_type='') {
//    console.log('hello');return false;
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/business_client_contact_report_total_count',
        data: { 
            'client_name':client_name,
            'company_type':company_type,
            'office':office,
            'client_partner':client_partner,
            'client_manager':client_manager,
            'contact_type':contact_type
         },
        success: function (result) {
            $("#total").html(result);
        },
    });
}

function individual_client_contact_report(client_name='',company_type='',office='',client_partner='',client_manager='',contact_type='') {
    $('#individual_client_contact_reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/individual_client_contact_report_count',
        success: function (result) {
            $('#individual_client_contact_reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'searching': false,
                "info":false,
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'individual_client_contact_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'individual_client_contact_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/individual_client_contact_report_ajax',
                    'type': 'POST',
                    'data': { 
                                'client_name':client_name,
                                'company_type':company_type,
                                'office':office,
                                'client_partner':client_partner,
                                'client_manager':client_manager,
                                'contact_type':contact_type 
                            },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'client_status' },
                    { data: 'client_creation_date' },
                    { data: 'practice_id' },
                    { data: 'client_name' },
                    { data: 'ssn' },
                    { data: 'residenship' },
                    { data: 'citizenship' },
                    { data: 'office_id' },
                    { data: 'partner_name' },
                    { data: 'manager_name' },
                    { data: 'contact_type' },
                    { data: 'contact_name' },
                    { data: 'contact_phone' },
                    { data: 'contact_whatsapp' },
                    { data: 'contact_email' },
                    { data: 'contact_address' },
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}

function individual_client_contact_report_total(client_name='',company_type='',office='',client_partner='',client_manager='',contact_type='') {
//    console.log('hello');return false;
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/individual_client_contact_report_total_count',
        data: { 
            'client_name':client_name,
            'company_type':company_type,
            'office':office,
            'client_partner':client_partner,
            'client_manager':client_manager,
            'contact_type':contact_type
         },
        success: function (result) {
            $("#total").html(result);
        },
    });
}

function business_client_contact_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('business_client_contact-display-div'));
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
            url: base_url + 'modal/business_client_contact_filter_modal',
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

function business_client_contact_report_filter_new(is_clear='',current_clear_element='') {
    $("#business_client_contact_filter_clear").show();
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if(removavle_element=='startingPeriod'){
            $("#"+removavle_element).val('').trigger('chosen:updated');
            $("#startingPeriod_month").val('').trigger('chosen:updated');
         }
         else{
            $("#"+removavle_element).val('').trigger('chosen:updated');
         }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('business_client_contact-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'client_name') {
            var id = 'client_name-val';
            if(is_clear==''){
                $("#client_name-clear_filter").show();
            }        
        }
        if (a == 'company_type') {
            var id = 'company_type-val';
            if(is_clear==''){
                $("#company_type-clear_filter").show();
            }        
        }
        if (a == 'office') {
            var id = 'office-val';
            if(is_clear==''){
                $("#office-clear_filter").show();
            }        
        }
        if (a == 'client_partner') {
            var id = 'client_partner-val';
            if(is_clear==''){
                $("#client_partner-clear_filter").show();
            }        
        }
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if(is_clear==''){
                $("#client_manager-clear_filter").show();
            }        
        }
        if (a == 'contact_type') {
            var id = 'contact_type-val';
            if(is_clear==''){
                $("#contact_type-clear_filter").show();
            }        
        }
        
    }    
    var client_name = $("#client_name").val();
    var company_type = $("#company_type").val();
    var office = $("#office").val();
    var client_partner = $("#client_partner").val();
    var client_manager = $("#client_manager").val();
    var contact_type = $("#contact_type").val();
   
    business_client_contact_report(client_name,company_type,office,client_partner,client_manager,contact_type);
    business_client_contact_report_total(client_name,company_type,office,client_partner,client_manager,contact_type);   
}

function individual_client_contact_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('individual_client_contact-display-div'));
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
            url: base_url + 'modal/individual_client_contact_filter_modal',
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

function individual_client_contact_report_filter_new(is_clear='',current_clear_element='') {
    $("#individual_client_contact_filter_clear").show();
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if(removavle_element=='startingPeriod'){
            $("#"+removavle_element).val('').trigger('chosen:updated');
            $("#startingPeriod_month").val('').trigger('chosen:updated');
         }
         else{
            $("#"+removavle_element).val('').trigger('chosen:updated');
         }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('individual_client_contact-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'client_name') {
            var id = 'client_name-val';
            if(is_clear==''){
                $("#client_name-clear_filter").show();
            }        
        }
        if (a == 'office') {
            var id = 'office-val';
            if(is_clear==''){
                $("#office-clear_filter").show();
            }        
        }
        if (a == 'client_partner') {
            var id = 'client_partner-val';
            if(is_clear==''){
                $("#client_partner-clear_filter").show();
            }        
        }
        if (a == 'client_manager') {
            var id = 'client_manager-val';
            if(is_clear==''){
                $("#client_manager-clear_filter").show();
            }        
        }
        if (a == 'contact_type') {
            var id = 'contact_type-val';
            if(is_clear==''){
                $("#contact_type-clear_filter").show();
            }        
        }
        
    }    
    var client_name = $("#client_name").val();
    var company_type = $("#company_type").val();
    var office = $("#office").val();
    var client_partner = $("#client_partner").val();
    var client_manager = $("#client_manager").val();
    var contact_type = $("#contact_type").val();
   
    individual_client_contact_report(client_name,company_type,office,client_partner,client_manager,contact_type);
    individual_client_contact_report_total(client_name,company_type,office,client_partner,client_manager,contact_type);   
}
function reload_individual_client_report_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/individual_client_contact_report_cron.php',
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
function reload_business_client_report_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/business_client_contact_report_cron.php',
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

function client_association_report(association_title='',main_association_client='',client_id='') {
    $('#client_association_reports-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/client_association_report_report_count',
        success: function (result) {
            $('#client_association_reports-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'searching': false,
                "info":false,
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'client_association_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'client_association_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/client_association_report_report_ajax',
                    'type': 'POST',
                    'data': { 
                                'association_title':association_title,
                                'main_association_client':main_association_client,
                                'client_id':client_id,
                            },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'title' },
                    { data: 'description' },
                    { data: 'main_association_client' },
                    { data: 'client_type' },
                    { data: 'client_id' },
                    { data: 'client_name' },
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}
function client_association_report_total(association_title='',main_association_client='',client_id='') {
//    console.log('hello');return false;
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/client_association_report_report_total_count',
        data: { 
            'association_title':association_title,
            'main_association_client':main_association_client,
            'client_id':client_id,
         },
        success: function (result) {
            $("#total").html(result);
        },
    });
}
function client_association_report_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('client_association-display-div'));
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
            url: base_url + 'modal/client_association_filter_modal',
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

function client_assiciation_report_filter_new(is_clear='',current_clear_element='') {
    $("#client_association_filter_clear").show();
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if(removavle_element=='startingPeriod'){
            $("#"+removavle_element).val('').trigger('chosen:updated');
            $("#startingPeriod_month").val('').trigger('chosen:updated');
         }
         else{
            $("#"+removavle_element).val('').trigger('chosen:updated');
         }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('client_association-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'association_title') {
            var id = 'association_title-val';
            if(is_clear==''){
                $("#association_title-clear_filter").show();
            }        
        }
        if (a == 'main_association_client') {
            var id = 'main_association_client-val';
            if(is_clear==''){
                $("#main_association_client-clear_filter").show();
            }        
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }        
        }
    }    
    var association_title = $("#association_title").val();
    var main_association_client = $("#main_association_client").val();
    var client_id = $("#client_id").val();
   
    client_association_report(association_title,main_association_client,client_id);
    client_association_report_total(association_title,main_association_client,client_id);   
}

function business_client_owner_report(client_id='',partner='',manager='',company_type='',owner_email='') {
    $('#business_client_ouner-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/business_client_owner_report_count',
        success: function (result) {
            $('#business_client_ouner-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'searching': false,
                "info":false,
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'business_client_owner_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'business_client_owner_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/business_client_owner_report_ajax',
                    'type': 'POST',
                    'data': { 
                                'client_id':client_id,
                                'partner':partner,
                                'manager':manager,
                                'company_type':company_type,
                                'owner_email':owner_email,
                            },
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                'columns': [
                    { data: 'client_status' },
                    { data: 'client_since' },
                    { data: 'practice_id' },
                    { data: 'client_name' },
                    { data: 'company_type' },
                    { data: 'federal_id' },
                    { data: 'state_opened' },
                    { data: 'date_of_inrop' },
                    { data: 'office_id' },
                    { data: 'partner_name' },
                    { data: 'manager_name' },
                    { data: 'owner_title' },
                    { data: 'percentage' },
                    { data: 'owner_name' },
                    { data: 'phone' },
                    { data: 'email' },
                    { data: 'address' },
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
            });
        },
    });
}

function business_client_owner_report_total(client_id='',partner='',manager='',company_type='',owner_email='') {
//    console.log('hello');return false;
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/business_client_owner_report_total_count',
        data: { 
            'client_id':client_id,
            'partner':partner,
            'manager':manager,
            'company_type':company_type,
            'owner_email':owner_email,
         },
        success: function (result) {
            $("#total").html(result);
        },
    });
}

function business_client_owner_report_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('busuness_client_owner-display-div'));
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
            url: base_url + 'modal/business_client_owner_filter_modal',
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

function business_client_owner_filter_new(is_clear='',current_clear_element='') {
    $("#business_client_report_filter_clear").show();
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        if(removavle_element=='startingPeriod'){
            $("#"+removavle_element).val('').trigger('chosen:updated');
            $("#startingPeriod_month").val('').trigger('chosen:updated');
         }
         else{
            $("#"+removavle_element).val('').trigger('chosen:updated');
         }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('busuness_client_owner-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }        
        }
        if (a == 'partner') {
            var id = 'partner-val';
            if(is_clear==''){
                $("#partner-clear_filter").show();
            }        
        }
        if (a == 'manager') {
            var id = 'manager-val';
            if(is_clear==''){
                $("#manager-clear_filter").show();
            }        
        }
        if (a == 'company_type') {
            var id = 'company_type-val';
            if(is_clear==''){
                $("#company_type-clear_filter").show();
            }        
        }
        if (a == 'owner_email') {
            var id = 'owner_email-val';
            if(is_clear==''){
                $("#owner_email-clear_filter").show();
            }        
        }
    }    
    var client_id = $("#client_id").val();
    var partner = $("#partner").val();
    var manager = $("#manager").val();
    var company_type = $("#company_type").val();
    var owner_email = $("#owner_email").val();
   
    business_client_owner_report(client_id,partner,manager,company_type,owner_email);
    business_client_owner_report_total(client_id,partner,manager,company_type,owner_email);   
}

function load_bookkeeping_staff_workload_report(staff='') {
    $('#bookkeeping_staff_workload-tab').DataTable().destroy();
    var columns = [
    {data:'staff_name'},
    {data: 'total_client',render:function(data,type){
        if (data != '0') {
           return '<p class="text-success text-center">' + data + '</p>';
        } else {
           return '<p class="text-center">' + data + '</p>';
        }
      }
    },
    ];
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/get_all_active_office',
        success: function (data) {      
            data = JSON.parse(data);
            for (var i in data) {
              columns.push({data: data[i],render:function(data,type){
                    if (data != '0') {
                       return '<p class="text-success text-center">' + data + '</p>';
                    } else {
                       return '<p class="text-center">' + data + '</p>';
                    }
               }});
            }
            $.ajax({
                type: 'POST',
                url: base_url + 'reports/bookkeeping_staff_workload_max_limit_count',
                success: function (result) {
                    $('#bookkeeping_staff_workload-tab').DataTable({
                        'processing': false,
                        'serverSide': true,
                        'scrollX': true,
                        "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                        "pageLength": 100,
                        'dom': '<"html5buttons"B>lTfgitp',
                        'searching': false,
                        'info':false,
                        'buttons': [
                            {
                                extend: 'excel',
                                className: "btn-sm",
                                footer: true,
                                text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                                title: 'bookkeeping_staff_workload_report',
                                init: function(api, node, config) {
                                   $(node).removeClass('btn btn-secondary')
                                }                       
                            },
                            {
                                extend: 'print',
                                className: "btn-sm",
                                footer: true,
                                text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                                title: 'bookkeeping_staff_workload_report',
                                init: function(api, node, config) {
                                   $(node).removeClass('btn btn-secondary');
                                }
                            }
                        ],
                        'columnDefs': [
                            { width: '100px', targets: 0 }
                        ],
                        'serverMethod': 'post',
                        'serverMethod': 'post',
                        'ajax': {
                            'url': base_url + 'reports/get_bookkeeping_staff_workload_data',
                            'type': 'POST',
                            'data': {'staff':staff},
                            beforeSend: function () {
                                openLoading();
                            },
                            complete: function (msg) {
                                closeLoading();
                            }
                        },
                         'columns': columns,
                         'columnDefs': [
                            { width: '100px', targets: 0 }
                        ]
                    });
                },
            });
        }
    });
}

function load_bookkeeping_staff_analysis_report(staff='') {
    $('#bookkeeping_staff_analysis-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/bookkeeping_staff_alanysis_max_limit_count',
        success: function (result) {
            $('#bookkeeping_staff_analysis-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'searching': false,
                "info":false,
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'bookkeeping_staff_analysis_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'bookkeeping_staff_analysis_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_bookkeeping_staff_analysis_data',
                    'type': 'POST',
                    'data': {'staff':staff},
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                 'columns': [
                    { data: 'staff_name' },
                    { data: 'total_bank_statement' },
                    { data: 'total_transactions' },
                    { data: 'total_time' },
                    { data: 'total_cost' },
                    { data: 'cost_per_transaction' },
                    { data: 'month' },
                ],
                 'columnDefs': [
                    { width: '100px', targets: 0 }
                ]
            });
        },
    });
}

function bookkeeping_staff_profit_and_loss_report(staff='') {
    $('#bookkeeping_staff_profit_and_loss-tab').DataTable().destroy();
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/bookkeeping_staff_profit_and_loss_max_limit_count',
        success: function (result) {
            $('#bookkeeping_staff_profit_and_loss-tab').DataTable({
                'processing': false,
                'serverSide': true,
                'scrollX': true,
                "lengthMenu": [[10, 25, 50, 100, result], [10, 25, 50, 100, "All"]],
                "pageLength": 100,
                'dom': '<"html5buttons"B>lTfgitp',
                'searching': false,
                "info":false,
                'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'bookkeeping_staff_profit_and_loss_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'bookkeeping_staff_profit_and_loss_report',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary');
                        }
                    }
                ],
                'columnDefs': [
                    { width: '100px', targets: 0 }
                ],
                'serverMethod': 'post',
                'serverMethod': 'post',
                'ajax': {
                    'url': base_url + 'reports/get_bookkeeping_staff_profit_and_loss_data',
                    'type': 'POST',
                    'data': {'staff':staff},
                    beforeSend: function () {
                        openLoading();
                    },
                    complete: function (msg) {
                        closeLoading();
                    }
                },
                 'columns': [
                    { data: 'staff_name' },
                    { data: 'total_client' },
                    { data: 'retail' },
                    { data: 'billed' },
                    { data: 'collected' },
                    { data: 'time' },
                    { data: 'cost' },
                    { data: 'royalty' },
                    { data: 'profit' },
                ],
                 'columnDefs': [
                    { width: '100px', targets: 0 }
                ]
            });
        },
    });
}

function franchise_consumes_bookkeeping_dept_pie_chart(staff=''){
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/franchise_consumes_bookkeeping_dept_pie_chart',
        data:{'staff':staff},
        success: function (result) {
            $(".franchise_consumes_bookkeeping_dept_pie_chart").html(result);
        }
    })
}

function load_bookkeeping_staff_analysis_report_pie_chart(staff=''){
    $.ajax({
        type: 'POST',
        url: base_url + 'reports/load_bookkeeping_staff_analysis_report_pie_chart',
        data:{'staff':staff },
        success: function (result) {
            $(".load_bookkeeping_staff_analysis_report_pie_chart").html(result);
        }
    })
}

function bookkeeping_staff_report_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('bookkeeping_report-filter-display-div'));
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
            url: base_url + 'modal/bookkeeping_staff_report_filter_modal',
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
function bookkeepingReports_filter_new(is_clear='',current_clear_element='') {
    $("#bookkeepingReport_btn_clear_filter").show();
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
         console.log(removavle_element);
        $("#"+removavle_element).val('').trigger('chosen:updated');
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('bookkeeping_report-filter-display-div'));
    for (const formElement of form_data) {
        var filter_name = formElement[0];
        var a = filter_name.split("[")[0];
//        console.log(a);
        if (a == 'staff') {
            var id = 'staff-val';
            if(is_clear==''){
                $("#staff-clear_filter").show();
            }        
        }
    }    
    var staff = $("#staff").val();
    load_bookkeeping_staff_analysis_report(staff);
    load_bookkeeping_staff_workload_report(staff);
    bookkeeping_staff_profit_and_loss_report(staff);
    franchise_consumes_bookkeeping_dept_pie_chart(staff)
    load_bookkeeping_staff_analysis_report_pie_chart(staff)  
}