var base_url = document.getElementById('base_url').value;

function load_exportable_client_information(is_clear = '' , current_element = '') {
	var client_id = '';
	var company_name = '';
	var company_type = '';
	var state_inc = '';
	var date_inc = '';
	var office_id = '';
	var partner = '';
	var manager = '';
	var assistant = '';
	var client_email = '';
	var referred_by_source = '';
	var referred_by_details = '';
	var client_status = '';
	var report_type = $("input[name=rb]:checked").val();
	$('#clients-tab').DataTable().destroy();
	$('#ind_clients-tab').DataTable().destroy();
	$.ajax({
        type: 'POST',
        url: base_url + 'Export/get_business_clients_max_count',
        success: function (result) {
        	if(is_clear!=''){
		        var clear_element=current_element.id;
		        //console.log(clear_element);
		        
		        let removavle_element = $("#filter-field-variable").val();
		        if(removavle_element=='referred_by_source'){
		        	$("#"+removavle_element).val('').trigger('chosen:updated');
		        	$("#referred_by_details").val('').trigger('chosen:updated');
		        }
		        //console.log(removavle_element);
		        else{
		            $("#"+removavle_element).val('').trigger('chosen:updated');

		        }
		        $("#"+clear_element).hide();
		    }
		    // console.log($("#date_inc").val());return false;
        	if(($("#client_id").val() != '' && $("#client_id").val() != undefined) || ($("#company_name").val() != '' && $("#company_name").val() != undefined) || ($("#company_type").val() != '' && $("#company_type").val() != undefined) || ($("#state_inc").val() != '' && $("#state_inc").val() != undefined) || ($("#date_inc").val() != '' && $("#date_inc").val() != undefined) || ($("#office_id").val() != '' && $("#office_id").val() != undefined) || ($("#partner").val() != '' && $("#partner").val() != undefined) || ($("#manager").val() != '' && $("#manager").val() != undefined) || ($("#assistant").val() != '' && $("#assistant").val() != undefined) || ($("#client_email").val() != '' && $("#client_email").val() != undefined) || ($("#referred_by_source").val() != '' && $("#referred_by_source").val() != undefined) || ($("#referred_by_details").val() != '' && $("#referred_by_details").val() != undefined) || ($("#client_status").val() != '' && $("#client_status").val() != undefined)) {
        		$("#bookkeeping_btn_clear_filter").show();
        		if($("#client_id").val() != '' && $("#client_id").val() != undefined) {
        			client_id = $("#client_id").val();
        			if (is_clear == '') {
        				$("#client_id-clear_filter").show();
        			}
        		}
        		if($("#company_name").val() != '' && $("#company_name").val() != undefined) {
        			company_name = $("#company_name").val();
        			if (is_clear == '') {
        				$("#company_name-clear_filter").show();
        			}
        		}
        		if($("#company_type").val() != '' && $("#company_type").val() != undefined) {
        			company_type = $("#company_type").val();
        			if (is_clear == '') {
        				$("#company_type-clear_filter").show();
        			}
        		}  
        		if($("#state_inc").val() != '' && $("#state_inc").val() != undefined) {
        			state_inc = $("#state_inc").val();
        			if (is_clear == '') {
        				$("#state_inc-clear_filter").show();
        			}
        		}   
        		if($("#date_inc").val() != '' && $("#date_inc").val() != undefined) {
        			date_inc = $("#date_inc").val();
        			if (is_clear == '') {
        				$("#date_inc-clear_filter").show();
        			}
        		} 	
        		if($("#office_id").val() != '' && $("#office_id").val() != undefined) {
        			office_id = $("#office_id").val();
        			if (is_clear == '') {
        				$("#office_id-clear_filter").show();
        			}
        		}
        		if($("#partner").val() != '' && $("#partner").val() != undefined) {
        			partner = $("#partner").val();
        			if (is_clear == '') {
        				$("#partner-clear_filter").show();
        			}
        		}    
        		if($("#manager").val() != '' && $("#manager").val() != undefined) {
        			manager = $("#manager").val();
        			if (is_clear == '') {
        				$("#manager-clear_filter").show();
        			}
        		}  
        		if($("#assistant").val() != '' && $("#assistant").val() != undefined) {
        			assistant = $("#assistant").val();
        			if (is_clear == '') {
        				$("#assistant-clear_filter").show();
        			}
        		}
        		if($("#client_email").val() != '' && $("#client_email").val() != undefined) {
        			client_email = $("#client_email").val();
        			if (is_clear == '') {
        				$("#client_email-clear_filter").show();
        			}
        		}
        		if($("#referred_by_source").val() != '' && $("#referred_by_source").val() != undefined) {
        			referred_by_source = $("#referred_by_source").val();
        			referred_by_details = $("#referred_by_details").val();
        			if (is_clear == '') {
        				$("#referred_by_source-clear_filter").show();
        			}
        		}
        		if($("#client_status").val() != '' && $("#client_status").val() != undefined) {
        			client_status = $("#client_status").val();
        			if (is_clear == '') {
        				$("#client_status-clear_filter").show();
        			}
        		}
        	} else {
        		$("#bookkeeping_btn_clear_filter").hide();
        	}
        	pageLength = parseInt(result);
        	// if($("#ofc option:selected").val() != '' || $("#manager option:selected").val() != '' || $("#partner option:selected").val() != '' || $("#ref_source option:selected").val() != '' || $("#company_type option:selected").val() != '' || $("#project_category option:selected").val() != '') {
        	// 	pageLength = parseInt(result);
        	// } else {
        	// 	pageLength = parseInt(result);
        	// }

			$('#clients-tab').DataTable({
		        'processing': false,
		        'serverSide': true,
		        'scrollX': true,
		        "lengthMenu": [[10, 25, 50, 100,pageLength], [10, 25, 50, 100,'All']],
		        // "pageLength": pageLength,
		        "pageLength": 10,
		        "searching": false,
		        // "paging": false,
		        'dom': '<"html5buttons"B>lTfgitp',
		        // 'buttons': [
		        //     {
		        //         extend: 'csv',
		        //         text:   '<i class="fa fa-file-text-o"></i>&nbsp;Download',
		        //         title: 'BusinessClients'
		        //     },
		        //     {
		        //         extend: 'print',
		        //         text:   '<i class="fa fa-print"></i>&nbsp;Print',
		        //         title: 'BusinessClients',
		        //         customize: function (win) {
		        //             $(win.document.body).addClass('white-bg');
		        //             $(win.document.body).css('font-size', '10px');

		        //             $(win.document.body).find('table')
		        //                 .addClass('compact')
		        //                 .css('font-size', 'inherit');
		        //         }
		        //     }
		        // ],
		        'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'BusinessClients',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'BusinessClients',
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
		            'url': base_url + 'Export/get_business_clients_data',
		            'type': 'POST',
		            'data': { 
		            	'client_id':client_id,
		            	'company_name':company_name,
		            	'company_type':company_type,
		            	'state_inc':state_inc,
		            	'date_inc':date_inc,
		            	'office_id':office_id,
		            	'partner':partner,
		            	'manager':manager,
		            	'assistant':assistant,
		            	'client_email':client_email,
		            	'referred_by_source':referred_by_source,
		            	'referred_by_details':referred_by_details,
		            	'client_status':client_status,
		            	'report_type':report_type
		            },
		            beforeSend: function () {
		                openLoading();
		            },
		            complete: function (msg) {
		                closeLoading();
		            }
		        },
		        'columns': [
		        	{data:'reference_id'},
		            {data: 'practice_id'},
				    {data: 'company_name'},
				    {data: 'type_of_company'},
				    {data: 'office_id'},
				    {data: 'partner_name'},
				    {data: 'manager_name'},				    
				    {data: 'federal_id'},
				    {data: 'state_of_incorporation'},
				    {data: 'incorporated_date',
						render: function (data) {
							if (data != '0000-00-00') {
						        var date = new Date(data);
						        var month = date.getMonth() + 1;
						        return (month.toString().length > 1 ? month : "0" + month) + "-" + date.getDate() + "-" + date.getFullYear();
						    } else {
						    	var date = data.split('-');
						    	return date[1] + "-" + date[2] + "-" + date[0];

						    }
					    }},
				    {data: 'business_description'},
				    {data: 'dba'},
				    {data: 'internal_language'},
				    {data: 'owner_title'},
				    {data: 'ownership_percentage'},
				    {data: 'owner_first_name'},
				    {data: 'owner_last_name'},
				    {data: 'owner_phone'},
				    {data: 'owner_whatsapp'},
				    {data: 'owner_email'},
				    {data: 'owner_address'},
				    {data: 'contact_type'},
				    {data: 'contact_first_name'},
				    {data: 'contact_last_name'},
				    {data: 'contact_phone'},
				    {data: 'contact_whatsapp'},
				    {data: 'contact_email'},
				    {data: 'contact_address'},
				    {data: 'contact_city'},
				    {data: 'contact_state'},
				    {data: 'contact_zip'},
				    {data: 'contact_country'},
				    {data: 'client_association'},
				    {data: 'referred_by_source'},
				    {data: 'referred_by_name'},
				    {data: 'status'},
                    /*{data: 'client_fye'},			    				    
				    {data: 'contact_city'},
				    {data: 'contact_state'},
				    {data: 'contact_zip'},
				    {data: 'contact_country'},
				    {data: 'owner_dob'},
				    {data: 'owner_ssn'},
				    {data: 'owner_language'},
				    {data: 'owner_country'},
				    {data: 'owner_residence'},*/
				    {data: 'created_date',
				    	render: function (data) {
					        var date = new Date(data);
					        var month = date.getMonth() + 1;
					        return (month.toString().length > 1 ? month : "0" + month) + "/" + date.getDate() + "/" + date.getFullYear();
					    }
					},
					{data:'sales_tax_certificate'},
				    {data:'sales_tax_user_id'},
				    {data:'sales_tax_password'},
				    {data:'sales_tax_partner'},
				    {data:'sales_tax_description'},
				    {data:'rt6_user_id'},
				    {data:'rt6_password'},
				    {data:'resort_tax_account'},
				    {data:'resort_tax_user_id'},
				    {data:'resort_tax_password'},
				    {data:'solid_waste'},
				    {data:'solid_waste_user_id'},
				    {data:'solid_waste_password'},
				    {data:'leafcloud_user_id'},
				    {data:'leafcloud_password'},
				    {data:'leafpay_user_id'},
				    {data:'leafpay_password'},
				    {data:'leafpay_pin'},
				    {data:'passport'},
				    {data:'visa'},
				    {data:'state'},
				    {data:'sales_tax_type'},
				    {data:'start_month'},
				    {data:'start_year'}
				    

		        ],
		        'columnDefs': [
		            { width: '100px', targets: 0 },
		            { "targets": [ 1 ],"visible": true,"searchable": true },
		            { "targets": [ 3 ],"visible": true,"searchable": false },
		            { "targets": [ 5 ],"visible": true,"searchable": true },
		            { "targets": [ 6 ],"visible": true,"searchable": true },
		            { "targets": [ 0 ],"visible": false,"searchable": false }
		        ],
		    });
		},
    });
}

function load_exportable_ind_client_information(is_clear='', current_element = ''){
	// alert(office+'/'+manager+'/'+partner+'/'+reffered_by_source_value); 
	// return false;
	var client_id = '';
	var office_id = '';
	var partner = '';
	var manager = '';
	var client_email = '';
	var referred_by_source = '';
	var referred_by_details = '';
	var client_status = '';
	var report_type = $("input[name=rb]:checked").val();
	$('#ind-clients-tab').DataTable().destroy();
	$.ajax({
        type: 'POST',
        url: base_url + 'Export/get_individual_clients_max_count',
        success: function (result) {  
        	if(is_clear!=''){
		        var clear_element=current_element.id;
		        //console.log(clear_element);
		        
		        let removavle_element = $("#ind_filter-field-variable").val();
		        if(removavle_element=='ind_referred_by_source'){
		        	$("#"+removavle_element).val('').trigger('chosen:updated');
		        	$("#ind_referred_by_details").val('').trigger('chosen:updated');
		        }
		        //console.log(removavle_element);
		        else{
		            $("#"+removavle_element).val('').trigger('chosen:updated');

		        }
		        $("#"+clear_element).hide();
		    }

			if($("#ind_ofc option:selected").val() != '' || $("#ind_manager option:selected").val() != '' || $("#ind_partner option:selected").val() != '' || $("#ind_ref_source option:selected").val() != '') {		                	        	        		        	
		        $("#ind-filter-client").remove();
		        
		        		                	   
			} else {
				$("#ind-filter-client").remove();
			}

			if(($("#ind_client_id").val() != '' && $("#ind_client_id").val() != undefined) || ($("#ind_office_id").val() != '' && $("#ind_office_id").val() != undefined) || ($("#ind_partner").val() != '' && $("#ind_partner").val() != undefined) || ($("#ind_manager").val() != '' && $("#ind_manager").val() != undefined) || ($("#ind_assistant").val() != '' && $("#ind_assistant").val() != undefined) || ($("#ind_client_email").val() != '' && $("#ind_client_email").val() != undefined) || ($("#ind_referred_by_source").val() != '' && $("#ind_referred_by_source").val() != undefined) || ($("#ind_referred_by_details").val() != '' && $("#ind_referred_by_details").val() != undefined) || ($("#ind_client_status").val() != '' && $("#ind_client_status").val() != undefined)) {
        		$("#ind_btn_clear_filter").show();

			    if($("#ind_client_id").val() != '' && $("#ind_client_id").val() != undefined) {
        			client_id = $("#ind_client_id").val();
        			if (is_clear == '') {
        				$("#ind_client_id-clear_filter").show();
        			}
        		} 	
        		if($("#ind_office_id").val() != '' && $("#ind_office_id").val() != undefined) {
        			office_id = $("#ind_office_id").val();
        			if (is_clear == '') {
        				$("#ind_office_id-clear_filter").show();
        			}
        		}
        		if($("#ind_partner").val() != '' && $("#ind_partner").val() != undefined) {
        			partner = $("#ind_partner").val();
        			if (is_clear == '') {
        				$("#ind_partner-clear_filter").show();
        			}
        		}    
        		if($("#ind_manager").val() != '' && $("#ind_manager").val() != undefined) {
        			manager = $("#ind_manager").val();
        			if (is_clear == '') {
        				$("#ind_manager-clear_filter").show();
        			}
        		}  
        		if($("#ind_client_email").val() != '' && $("#ind_client_email").val() != undefined) {
        			client_email = $("#ind_client_email").val();
        			if (is_clear == '') {
        				$("#ind_client_email-clear_filter").show();
        			}
        		}
        		if($("#ind_referred_by_source").val() != '' && $("#ind_referred_by_source").val() != undefined) {
        			referred_by_source = $("#ind_referred_by_source").val();
        			referred_by_details = $("#ind_referred_by_details").val();
        			if (is_clear == '') {
        				$("#ind_referred_by_source-clear_filter").show();
        			}
        		}
        		
        		if($("#ind_client_status").val() != '' && $("#ind_client_status").val() != undefined) {
        			client_status = $("#ind_client_status").val();
        			if (is_clear == '') {
        				$("#ind_client_status-clear_filter").show();
        			}
        		}
        		} else {
        		$("#ind_btn_clear_filter").hide();
        	}
        		
			pageLength = parseInt(result);
			// var pageLength = 10;
			// if($("#ind_ofc option:selected").val() != '' || $("#ind_manager option:selected").val() != '' || $("#ind_partner option:selected").val() != '' || $("#ind_ref_source option:selected").val() != '') {
			// 	pageLength = parseInt(result);
			// }

			$('#ind-clients-tab').DataTable({
		        'processing': false,
		        'serverSide': true,
		        'scrollX': true,
		        "lengthMenu": [[10, 25, 50, 100,pageLength], [10, 25, 50, 100,"All"]],
		        "pageLength": 10,
		        "searching": false,
		        'dom': '<"html5buttons"B>lTfgitp',
		        'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'IndividualClients',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'IndividualClients',
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
		            'url': base_url + 'Export/get_indiviudal_clients_data',
		            'type': 'POST',
		            'data': { 
		            	'client_id':client_id,
		            	'office_id':office_id,
		            	'partner':partner,
		            	'manager':manager,
		            	'client_email':client_email,
		            	'referred_by_source':referred_by_source,
		            	'referred_by_details':referred_by_details,
		            	'client_status':client_status,
		            	'report_type':report_type
		            },
		            beforeSend: function () {
		                openLoading();
		            },
		            complete: function (msg) {
		                closeLoading();
		            }
		        },
		        'columns': [
		        	{data: 'reference_id'},
		        	{data: 'practice_id'},
		            {data: 'owner_first_name'},
				    {data: 'owner_last_name'},
				    {data: 'ssn'},
				    {data: 'date_of_birth'},
				    {data: 'language'},
                    
				    {data: 'country_citizenship'},
				    {data: 'country_residence'},
				    {data: 'office_id'},
				    {data: 'partner_name'},
				    {data: 'manager_name'},
				    {data: 'contact_type'},
				    {data: 'contact_first_name'},
				    {data: 'contact_last_name'},
				    {data: 'contact_phone'},
				    {data: 'contact_whatsapp'},
				    {data: 'contact_email'},
				    {data: 'contact_address'},				    
					{data: 'contact_city'},
				    {data: 'contact_state'},
				    {data: 'contact_zip'},
				    {data: 'contact_country'},
					{data: 'client_association'},
				    {data: 'referred_by_source'},
				    {data: 'referred_by_name'},
				    {data: 'client_creation_date',
						render: function (data) {
					        var date = new Date(data);
					        var month = date.getMonth() + 1;
					        return (month.toString().length > 1 ? month : "0" + month) + "/" + date.getDate() + "/" + date.getFullYear();
					    }},
                    {data: 'status'},
     //                {data: 'creation_date',
     //            		render: function (data) {
					//         var date = new Date(data);
					//         var month = date.getMonth() + 1;
					//         return (month.toString().length > 1 ? month : "0" + month) + "/" + date.getDate() + "/" + date.getFullYear();
					// }},
                    {data: 'sales_tax_certificate'},
                    {data: 'sales_tax_user_id'},
                    {data: 'sales_tax_password'},
                    {data: 'sales_tax_partner'},
                    {data: 'sales_tax_description'},
                    {data: 'rt6_user_id'},
                    {data: 'rt6_password'},
                    {data: 'resort_tax_account'},
                    {data: 'resort_tax_user_id'},
                    {data: 'resort_tax_password'},
                    {data: 'solid_waste'},
                    {data: 'solid_waste_user_id'},
                    {data: 'solid_waste_password'},
                    {data: 'leafcloud_user_id'},
                    {data: 'leafcloud_password'},
                    {data: 'leafpay_user_id'},
                    {data: 'leafpay_password'},
                    {data: 'leafpay_pin'},
                    {data: 'passport'},
                    {data: 'visa'},
                    {data: 'state'},
                    {data: 'sales_tax_type'},
                    {data: 'start_month'},
                    {data: 'start_year'}
		        ],
		        'columnDefs': [
		            { width: '100px', targets: 0 },
		            { "targets": [ 0 ],"visible": false,"searchable": false }
		        ],
		    });
		},
    });
}

function remove_filter(option) {
	if(option == 'ofc') {
		$("#ofc").val('');
		var ofc = $("#ofc option:selected").val();
		var manager = $("#manager option:selected").val();
		var partner = $("#partner option:selected").val();
		var ref_source = $("#ref_source option option:selected").val();
		var company_type = $("#company_type option:selected").val();
		var project_category = $("#project_category option:selected").val();
		$(".filter_ofc").remove();
		get_mngrs_new(ofc,manager);
		load_exportable_client_information(ofc,manager,partner,ref_source,company_type,project_category);
	}
	if(option == 'manager') {
		$("#manager").val('');
		var ofc = $("#ofc option:selected").val();
		var manager = $("#manager option:selected").val();
		var partner = $("#partner option:selected").val();
		var ref_source = $("#ref_source option option:selected").val();
		var company_type = $("#company_type option:selected").val();
		var project_category = $("#project_category option:selected").val();
		$(".filter_manager").remove();
		load_exportable_client_information(ofc,manager,partner,ref_source,company_type,project_category);
	}
	if(option == 'partner') {
		$("#partner").val('');
		var ofc = $("#ofc option:selected").val();
		var manager = $("#manager option:selected").val();
		var partner = $("#partner option:selected").val();
		var ref_source = $("#ref_source option option:selected").val();
		var company_type = $("#company_type option:selected").val();
		var project_category = $("#project_category option:selected").val();
		$(".filter_manager").remove();
		load_exportable_client_information(ofc,manager,partner,ref_source,company_type,project_category);
	}
	if(option == 'ref_source') {
		$("#ref_source").val('');
		var ofc = $("#ofc option:selected").val();
		var manager = $("#manager option:selected").val();
		var partner = $("#partner option:selected").val();
		var ref_source = $("#ref_source option option:selected").val();
		var company_type = $("#company_type option:selected").val();
		var project_category = $("#project_category option:selected").val();
		$(".filter_ref_source").remove();
		load_exportable_client_information(ofc,manager,partner,ref_source,company_type,project_category);
	}
	if(option == 'company_type') {
		$("#company_type").val('');
		var ofc = $("#ofc option:selected").val();
		var manager = $("#manager option:selected").val();
		var partner = $("#partner option:selected").val();
		var ref_source = $("#ref_source option option:selected").val();
		var company_type = $("#company_type option:selected").val();
		var project_category = $("#project_category option:selected").val();
		$(".filter_company_type").remove();
		load_exportable_client_information(ofc,manager,partner,ref_source,company_type,project_category);
	}
	if(option == 'project_category') {
		$("#project_category").val('');
		var ofc = $("#ofc option:selected").val();
		var manager = $("#manager option:selected").val();
		var partner = $("#partner option:selected").val();
		var ref_source = $("#ref_source option option:selected").val();
		var company_type = $("#company_type option:selected").val();
		var project_category = $("#project_category option:selected").val();
		$(".filter_project_category").remove();
		load_exportable_client_information(ofc,manager,partner,ref_source,company_type,project_category);
	}
}
function get_mngrs_new(ofc_id,manager='') {
    $.ajax({
    type: "POST",
    data: {
        ofc_id: ofc_id,
        selected:manager
    },
    url: base_url + 'action/home/get_mngrs',
    success: function (data) {
        $("#manager").html(data);
    }
  });
}

function ind_remove_filter(option) {
	if(option == 'ind_ofc') {
		$("#ind_ofc").val('');
		var ofc = $("#ind_ofc option:selected").val();
		var manager = $("#ind_manager option:selected").val();
		var partner = $("#ind_partner option:selected").val();
		var ref_source = $("#ind_ref_source option option:selected").val();
		$(".ind_filter_ofc").remove();
		get_mngrs_new(ofc,manager);
		load_exportable_ind_client_information(ofc,manager,partner,ref_source);
	}
	if(option == 'ind_manager') {
		$("#ind_manager").val('');
		var ofc = $("#ind_ofc option:selected").val();
		var manager = $("#ind_manager option:selected").val();
		var partner = $("#ind_partner option:selected").val();
		var ref_source = $("#ind_ref_source option option:selected").val();
		$(".ind_filter_manager").remove();
		load_exportable_ind_client_information(ofc,manager,partner,ref_source);
	}
	if(option == 'ind_partner') {
		$("#ind_partner").val('');
		var ofc = $("#ind_ofc option:selected").val();
		var manager = $("#ind_manager option:selected").val();
		var partner = $("#ind_partner option:selected").val();
		var ref_source = $("#ind_ref_source option option:selected").val();
		$(".ind_filter_manager").remove();
		load_exportable_ind_client_information(ofc,manager,partner,ref_source);
	}
	if(option == 'ind_ref_source') {
		$("#ind_ref_source").val('');
		var ofc = $("#ind_ofc option:selected").val();
		var manager = $("#ind_manager option:selected").val();
		var partner = $("#ind_partner option:selected").val();
		var ref_source = $("#ind_ref_source option option:selected").val();
		$(".ind_filter_ref_source").remove();
		load_exportable_ind_client_information(ofc,manager,partner,ref_source);
	}
}

// Billing Invoice Section
function load_exportable_invoices_information(office = '',manager = '',partner = '' , referral_partner = '' , client_status = '', client_id ='', createdaterange ='') {
	$('#billing-invoice-tab').DataTable().destroy();
	$.ajax({
        type: 'POST',
        url: base_url + 'Export/get_billing_invoice_max_count',
        success: function (result) {

        	var pageLength = 10;
        	// if($("#inv_ofc option:selected").val() != '' || $("#inv_manager option:selected").val() != '' || $("#inv_partner option:selected").val() != '') {
        	// 	pageLength = parseInt(result);
        	// } 
        	var pL = parseInt(result);

			$('#billing-invoice-tab').DataTable({
		        'processing': false,
		        'serverSide': true,
		        'scrollX': true,
		        "lengthMenu": [[10, 25, 50, 100, pL], [10, 25, 50, 100,'All']],
		        "pageLength": pageLength,
		        // "pageLength": 10,
		        "searching": false,
		        // "paging": false,
		        'dom': '<"html5buttons"B>lTfgitp',
		        'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'Invoices',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'Invoices',
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
		            'url': base_url + 'Export/get_billing_invoice_max_data',
		            'type': 'POST',
		            'data': { 
		            	'office':office,
		            	'manager':manager,
		            	'partner':partner,
		            	'referral_partner':referral_partner,
		            	'client_status': client_status,
		            	'client_id': client_id,
		            	'creation_date': createdaterange
		            },
		            beforeSend: function () {
		                openLoading();
		            },
		            complete: function (msg) {
		                closeLoading();
		            }
		        },
		        'columns': [
		            {data: 'client_id'},
		            {data: 'invoice_id'},
				    {data: 'client_name'},
				    {data: 'office'},
				    {data: 'main_contact_name'},
				    {data: 'total_billed',render: $.fn.dataTable.render.number(',', '.', 2, '$')},
				    {data: 'total_collect',render: $.fn.dataTable.render.number(',', '.', 2, '$')},
				    {data: 'total_unpaid',render: $.fn.dataTable.render.number(',', '.', 2, '$')},
				    {data: 'total_uncollect',render: $.fn.dataTable.render.number(',', '.', 2, '$')},
				    {data: 'client_partner'},
				    {data: 'client_manager'},
				    {data: 'referral_type'},
				    {data: 'referral_name'},
				    {data: 'client_status'},
				    {data: 'created_time'},

		        ],
                "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
                    var total_indexs = [5,6,7,8];
                    // total_indexs.forEach(myFunction);                         
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

function remove_filter_for_invoices(option) {
	if(option == 'ofc') {
		$("#inv_ofc").val('');
		var ofc = $("#inv_ofc option:selected").val();
		var manager = $("#inv_manager option:selected").val();
		var partner = $("#inv_partner option:selected").val();
		var referral_name  = $("#inv_ref_partner option:selected").val();
		$(".filter_ofc").remove();
		// get_mngrs_new(ofc,manager);
		load_exportable_invoices_information(ofc,manager,partner,referral_name);
	}
	if(option == 'manager') {
		$("#inv_manager").val('');
		var ofc = $("#inv_ofc option:selected").val();
		var manager = $("#inv_manager option:selected").val();
		var partner = $("#inv_partner option:selected").val();
		var referral_name  = $("#inv_ref_partner option:selected").val();
		$(".filter_manager").remove();
		load_exportable_invoices_information(ofc,manager,partner,referral_name);
	}
	if(option == 'partner') {
		$("#inv_partner").val('');
		var ofc = $("#inv_ofc option:selected").val();
		var manager = $("#inv_manager option:selected").val();
		var partner = $("#inv_partner option:selected").val();
		var referral_name  = $("#inv_ref_partner option:selected").val();
		$(".filter_partner").remove();
		load_exportable_invoices_information(ofc,manager,partner,referral_name);
	}
	if(option == 'ref_name') {
		$("#inv_ref_partner").val('');
		var ofc = $("#inv_ofc option:selected").val();
		var manager = $("#inv_manager option:selected").val();
		var partner = $("#inv_partner option:selected").val();
		var referral_name  = $("#inv_ref_partner option:selected").val();
		$(".filter_ref_name").remove();
		load_exportable_invoices_information(ofc,manager,partner,referral_name);
	}
}

//Billing Recurring Section
function load_exportable_recurring_information(office = '',manager = '',partner = '' , referral_name = '', client_status = '', client_id ='', createdaterange='') {
	$('#billing-recurring-tab').DataTable().destroy();
	$.ajax({
        type: 'POST',
        url: base_url + 'Export/get_billing_recurring_max_count',
        success: function (result) {
        	var pageLength = 10;
        	var pL = parseInt(result);

			$('#billing-recurring-tab').DataTable({
		        'processing': false,
		        'serverSide': true,
		        'scrollX': true,
		        "lengthMenu": [[10, 25, 50, 100, pL], [10, 25, 50, 100,'All']],
		        "pageLength": pageLength,
		        // "pageLength": 10,
		        "searching": false,
		        // "paging": false,
		        'dom': '<"html5buttons"B>lTfgitp',
		        'buttons': [
                    {
                        extend: 'excel',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-file-text-o" title="Download as Excel"></i>&nbsp;Download',
                        title: 'Recurring',
                        init: function(api, node, config) {
                           $(node).removeClass('btn btn-secondary')
                        }                       
                    },
                    {
                        extend: 'print',
                        className: "btn-sm",
                        footer: true,
                        text:   '<i class="fa fa-print" title="Print Current Page"></i>&nbsp;Print',
                        title: 'Recurring',
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
		            'url': base_url + 'Export/get_billing_recurring_max_data',
		            'type': 'POST',
		            'data': { 
		            	'office':office,
		            	'manager':manager,
		            	'partner':partner,
		            	'referral_partner':referral_name,
		            	'client_status': client_status,
		            	'client_id': client_id,
		            	'created_date':createdaterange
		            },
		            beforeSend: function () {
		                openLoading();
		            },
		            complete: function (msg) {
		                closeLoading();
		            }
		        },
		        'columns': [
		            {data: 'client_id'},
		            {data: 'invoice_id'},
				    {data: 'client_name'},
				    {data: 'office'},
				    {data: 'main_contact_name'},
				    {data: 'total_billed',render: $.fn.dataTable.render.number(',', '.', 2, '$')},
				    {data: 'total_collect',render: $.fn.dataTable.render.number(',', '.', 2, '$')},
				    {data: 'total_unpaid',render: $.fn.dataTable.render.number(',', '.', 2, '$')},
				    {data: 'total_uncollect',render: $.fn.dataTable.render.number(',', '.', 2, '$')},
				    {data: 'client_partner'},
				    {data: 'client_manager'},
				    {data: 'referral_type'},
				    {data: 'referral_name'},
				    {data: 'client_status'},
				    {data: 'created_time'},
		        ],
                "footerCallback": function ( row, data, start, end, display ) { // used to get total column                    
                    var total_indexs = [5,6,7];
                    // total_indexs.forEach(myFunction);                         
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

function remove_filter_for_recurring(option) {
	if(option == 'ofc') {
		$("#recur_ofc").val('');
		var ofc = $("#recur_ofc option:selected").val();
		var manager = $("#recur_manager option:selected").val();
		var partner = $("#recur_partner option:selected").val();
		var recur_ref_partner = $("#recur_ref_partner option:selected").val();
		$(".filter_ofc").remove();
		// get_mngrs_new(ofc,manager);
		load_exportable_recurring_information(ofc,manager,partner,recur_ref_partner);
	}
	if(option == 'manager') {
		$("#recur_manager").val('');
		var ofc = $("#recur_ofc option:selected").val();
		var manager = $("#recur_manager option:selected").val();
		var partner = $("#recur_partner option:selected").val();
		var recur_ref_partner = $("#recur_ref_partner option:selected").val();
		$(".filter_manager").remove();
		load_exportable_recurring_information(ofc,manager,partner,recur_ref_partner);
	}
	if(option == 'partner') {
		$("#recur_partner").val('');
		var ofc = $("#recur_ofc option:selected").val();
		var manager = $("#recur_manager option:selected").val();
		var partner = $("#recur_partner option:selected").val();
		var recur_ref_partner = $("#recur_ref_partner option:selected").val();
		$(".filter_partner").remove();
		load_exportable_recurring_information(ofc,manager,partner,recur_ref_partner);
	}
	if(option == 'ref_name') {
		$("#recur_ref_partner").val('');
		var ofc = $("#recur_ofc option:selected").val();
		var manager = $("#recur_manager option:selected").val();
		var partner = $("#recur_partner option:selected").val();
		var recur_ref_partner = $("#recur_ref_partner option:selected").val();
		$(".filter_ref_name").remove();
		load_exportable_recurring_information(ofc,manager,partner,recur_ref_partner);
	}
}

function reload_business_client_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/business_client_export_cron.php',
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

function reload_individual_client_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/individual_client_export_cron.php',
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

function reload_client_invoice_report_data() {
    $.ajax({
        type: 'POST',
        url: base_url + 'cron/client_billing_report_cron.php',
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

function client_export_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('client_export-filter-display-div'));
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
            url: base_url + 'modal/client_export_sorting_filter_modal',
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
                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
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
                let current_made_id = id_val+'-val';
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
    }
}

function indivisual_client_export_sorting_filter_modal(reference = '', current_element = '') {
    var form_data = new FormData(document.getElementById('ind_client_export-filter-display-div'));
    // var val = form_data.getAll(name);
//     console.log(form_data);
    $("#ind_filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.ind_display-filter-div').is(':visible')) {
        $(".ind_display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    /*console.log(previous_filter);*/
    $("#filter-variable").val(reference);
    if (previous_filter != undefined && previous_filter == reference) {
        $(".filter-options").removeClass('btn-outline-success').addClass('btn-success');
        for (const formElement of form_data) {
            let filter_name = formElement[0];
            let filter_value = formElement[0];
            console.log(filter_name);
            let active_element = filter_name.split("[")[0];     
            console.log(filter_value);
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
            url: base_url + 'modal/indivisual_client_export_sorting_filter_modal',
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
//                    console.log(formElement);
                    let filter_name = formElement[0];
                    let filter_value = formElement[0];
                    /*console.log(filter_value);*/
                    if (formElement[1] != '') {
                        let active_element = filter_name.split("[")[0];     
                        // console.log(active_element);
                        let id_val = $('[name="'+active_element+'[]"]').attr('id');
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
                let current_made_id = id_val+'-val';
                /*console.log('current_made_id : '+current_made_id);*/
                if (current_element.id != current_made_id) {
                    $("#" + current_made_id).removeClass('btn-success').addClass('btn-primary');
                }
            }
        }
    }
}

function client_report_sorting_filter_modal(reference = '', current_element = '',recurring = '') {
    //console.log("n");return false;
    var creation_date_val = $("#create_date").val();
    var form_data = new FormData(document.getElementById('clinet_report-filter-display-div'));
    // var val = form_data.getAll(name);
    // console.log(form_data);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
    if (previous_filter == 'create_date') {
        $("#create_date_pre").val(creation_date_val);
    }
     console.log(previous_filter);
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
                if (active_element == 'create_date') {
                    id_val = 'create_date';
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
            url: base_url + 'modal/client_report_sorting_filter_modal',
            data: {
                reference: reference,
                recurring: recurring
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
                        if (active_element == 'create_date') {
                            id_val = 'create_date';
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
                 if (active_element == 'create_date') {
                    id_val = 'create_date';
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
function client_report_filter_new(recurrence_pointer = '',is_clear='',current_clear_element='') {
    var filter_element = $("#filter-variable").val();
    // console.log(filter_element);return false;
    if(is_clear!=''){
        var clear_element=current_clear_element.id;
        console.log(clear_element);
        
        let removavle_element = $("#filter-field-variable").val();
        if (removavle_element == 'create_date') {
            $("#"+removavle_element).val('');
            $("#create_date_pre").val('');
        }
        else if(removavle_element == 'referral_partner'){
        	$("#"+removavle_element).val('').trigger('chosen:updated');
        	$("#partner").val('').trigger('chosen:updated');
        	//console.log(removavle_element);return false;
        }
        else {
            $("#"+removavle_element).val('').trigger('chosen:updated');
        }
        $("#"+clear_element).hide();
    }
    var form_data = new FormData(document.getElementById('clinet_report-filter-display-div'));
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
        if (a == 'manager') {
            var id = 'manager-val';
            if(is_clear==''){
                $("#manager-clear_filter").show();
            }
        }
        
        if (a == 'referral_partner') {
            var id = 'referral_partner-val';
            if(is_clear==''){
                $("#referral_partner-clear_filter").show();
            }
        }
        if (a == 'client_status') {
            var id = 'client_status-val';
            if(is_clear==''){
                $("#client_status-clear_filter").show();
            }
        }
        if (a == 'client_id') {
            var id = 'client_id-val';
            if(is_clear==''){
                $("#client_id-clear_filter").show();
            }
        }
        if (a == 'create_date') {
            var id = 'create_date-val';
            if(is_clear==''){
                $("#create_date-clear_filter").show();
            }
        }
    }
    var office = $("#office").val();
    var manager = $("#manager").val();
    var referral_partner = $("#referral_partner").val();
    if(referral_partner != ''){
    	var source = $("#partner").val();
    }
    console.log(referral_partner);
    console.log(source);
    var client_status = $("#client_status").val();
    var client_id = $("#client_id").val();
    var createdaterange = $("#create_date").val();
    var create_date_pre = $("#create_date_pre").val();
    // console.log(createdaterange);
    // console.log(create_date_pre);
    if (create_date_pre != '') {
        createdaterange = create_date_pre;
    }
    if (office != '' || manager != '' || source != '' || referral_partner != '' || client_status != '' || client_id !=''|| createdaterange !='') {
        $("#client_billing_report_invoice_btn_clear_filter").show();
    }
    if(recurrence_pointer == ''){
    	load_exportable_invoices_information(office,manager,source,referral_partner,client_status,client_id,createdaterange);
    }
    if(recurrence_pointer == '1'){
    	load_exportable_recurring_information(office,manager,source,referral_partner,client_status,client_id,createdaterange);
    }
    
   // load_collection_report_chart(office_id,client_id,order_id,days_late,creationdaterange,duedaterange , referred_partner , referral_source , referred_by_name);
}