var base_url = document.getElementById('base_url').value;

function insert_excel_form(type) {
    if (type == 'b') {
        var form_id = 'excel-form';
        var url = 'client/insert_import_clients';
    } else {
        var form_id = 'excel-form-individual';
        var url = 'client/insert_import_individuals';
    }
    if (!requiredValidation(form_id)) {
        return false;
    }

    var formData = new FormData(document.getElementById(form_id));

    swal({
        title: "Are you sure?",
        text: "You want to import!!",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-info",
        confirmButtonText: "Yes, import it!",
        closeOnConfirm: false
    },
    function () {
        swal.close();
        $.ajax({
            type: 'POST',
            url: base_url + url,
            data: formData,
            enctype: 'multipart/form-data',
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                // alert(result);return false;
                if (result == 1) {
                    swal({
                        title: "Success!",
                        text: "Successfully imported!",
                        type: "success"
                    }, function () {
                        window.location.reload();
                    });
                } else if(result == 0) {
                    swal("ERROR!", "Client not found", "error");
                } else if(result == 2) {
                    swal("ERROR!", "CSV Conversion failed", "error");
                } else if(result == 3) {
                    swal("ERROR!", "Upload Failed", "error");
                } else if(result == 4) {
                    swal("ERROR!", "File not selected", "error");
                } else {
                    swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
                }
            },
            beforeSend: function () {
                $(".save_btn").prop('disabled', true).html('Processing...');
                openLoading();
            },
            complete: function (msg) {
                $(".save_btn").removeAttr('disabled').html('Save Changes');
                closeLoading();
            }
        });
    });
}
function get_all_interactions(reference_id , reference, practice_id, filter_data = '', order = '' , order_by = '', active_tab = '', interaction_type='',sorting_yes='') {
    if(sorting_yes != ''){
        interaction_type = $("#check_auto_manual").val();
    } else {
        $("#check_auto_manual").val(interaction_type);
    }
    var sc = $('#interactions-nav-tab li.active').find('a').attr('id');
    var res = sc.split('-');
    if (sc != 'all_data' && sc != 'automatic_all_data' && order != '') {
        filter_data = res[1];
    }
    // if (sc == 'all_data') {
    //     $("#all_data_b").css("color", "red");
    // } else if (sc == 'automatic_all_data') {
    //     $("#automatic_all_data_b").css("color", "red");
    // } else {
    //     var str = res[0].replace(' ' , '_');
    //     $("#" + str).css("color", "red");
    // }
    $.ajax({
        type: 'POST',
        url: base_url + 'client/get_all_client_interactions',
        data: {
            reference_id: reference_id,
            reference: reference,
            filter_data: filter_data,
            practice_id: practice_id,
            order: order,
            order_by: order_by,
            interaction_type:interaction_type
        },
        enctype: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // if (active_tab == 'all_data') {
            //     $("#all_data_b").css("color", "black");
            // } else if (active_tab == 'automatic_all_data') {
            //     $("#automatic_all_data_b").css("color", "black");
            // } else {
            //     $("#" + active_tab).css("color", "black");
            // }
            $("#interaction_tbody").html(result);
        }
    });
}

function refresh_existing_client_list_officewise(office_id="") {
    var client_type = $('.client_type:checked').val();
    if (office_id == '') {
        office_id = $('#client_office').val();
    }
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_type:client_type        
        },
        url: base_url + 'client/get_clients_officewise',
        dataType: "html",
        success: function (result) {
            $("#client_list_ddl_file_cabinet").chosen('destroy');
            $("#client_list_ddl_file_cabinet").html(result);
            $("#client_list_ddl_file_cabinet").chosen();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}

function set_brand_on_office_change(office) {
    $.ajax({
        type: "POST",
        data: {
            office: office        
        },
        url: base_url + 'client/set_brand_on_office_change',
        dataType: "html",
        success: function (result) {
            $("#brand").val(result);
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function get_folder_list() { /*used in file cabinet*/
    if ($('#folder-variables').is(':visible')) {
        $("#folder-variables").hide();
    }
    var brand = $("#brand").val().trim();
    var franchise = $("#client_office").val().trim();
    var client_type = $(".client_type:checked").val().trim();
    var client_id = $("#client_list_ddl_file_cabinet").val().trim();
    // console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id);
    if (brand != '' && franchise != '' && client_type != '' && client_id != '') {
        //console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id);   
        var client_data = { "brand":brand,'franchise':franchise,'client_type':client_type,'client_id':client_id };
        client_data = JSON.stringify(client_data);
        $.ajax({
            type: "POST",
            // url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetFolderList",
            url: base_url + 'sharepoint/check_folder_existence.php',
            async: true,
            //data: client_data ,
            data: { brand:brand,franchise:franchise,client_type:client_type,client_id:client_id },
            success: function (result) {
                /*console.log(result);*/
                if(result == '1') {
                    var arr = [];
                    $.ajax({
                    type: "POST",
                    url: base_url + 'guest/guest/getclientwisefoldername',
                    async: true,
                    data: { client_type:client_type },
                    dataType: "html",       
                    cache:false,
                    success: function (res) {
                            var arr = [];
                            var res = JSON.parse(res);
                            var res_length = res.length;
                            for (var i = 0; i < res_length; i++) {
                                var azure_folder_name = res[i]['azure_folder_name'];
                                var azure_rename_folder_name = res[i]['azure_rename_folder_name'];
                                var folder_type = res[i]['folder_type'];

                                var folder_name =  azure_folder_name;
                                var rename_folder_name =  azure_folder_name;
                                if(azure_rename_folder_name!=null && azure_rename_folder_name!='') {
                                    var rename_folder_name =  azure_rename_folder_name;
                                }

                                var property = "https://taxleaf.sharepoint.com/sites/Leafcabinet/"+brand+"/"+franchise.replace(/ /g,'-')+"/"+client_type+"/"+client_id+"/_api/Web/GetFolderByServerRelativePath(decodedurl='/sites/Leafcabinet/"+brand+"/"+franchise.replace(/ /g,'-')+"/"+client_type+"/"+client_id+"/"+folder_name+"')";
                                if(folder_name!='RoutingRules' && folder_name!='Shared Documents'
                                 && folder_name!='DropOffLibrary' && folder_name!='Mailing Service')  {
                                    $('#document_type').append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");
                                }
                            }
                        }
                    });
                }
                else if(result == '2') {
                    $('#document_type').empty().trigger("chosen:updated");
                    $('#document_type').append(`<option value="">Select an option</option>`).trigger("chosen:updated");
                    swal("ERROR!", "Site not created for this client.", "error");
                }
                else {
                    swal("ERROR!", "Someting Went Wrong! Try Again.", "error");
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
}
function get_options_by_variables(current_variable='',client_data='',current_variable_type='',counter='',section_from='',
    project_title='',month='',year='') {
    var current_variable_id = current_variable;
   // console.log(client_data['client_type']); return false;
    if (current_variable != '' && client_data != '' && current_variable_type == 'dropdown') {
        if (current_variable == 'year') {
            current_variable = 'Year';
        } else if (current_variable == 'frequency') {
            current_variable = 'Period Frequency';
        } else if (current_variable == 'government_agency') {
            current_variable = 'Government Agencies';
            if(client_data['client_type']=='individual') { current_variable = 'Government Agency'; }
        } else if (current_variable == 'state') {
            current_variable = 'US States';
        } else if (current_variable == 'period') {
            current_variable = 'PERIOD';
        } else if (current_variable == 'bank_name') {
            current_variable = 'Bank Name';
        } else if (current_variable == 'priority') {
            current_variable = 'Priority Label';
        }
        if(project_title=='Bookkeeping Yearly'){
            var project_type ="Yearly"; var  project_year=month;
        } else if(project_title=='Bookkeeping Monthly'){
            var project_type ="Monthly"; var  project_year="20"+year; var  project_month=month;
        } else if(project_title=='monthly'){
            var project_type ="1"; var  project_year=year; var  project_month=month;
        } else if(project_title=='quarterly'){
            var project_type ="2"; var  project_year=year; var  project_month=month;
            if(project_month==1) { project_month =13; }
            if(project_month==2) { project_month =14; }
            if(project_month==3) { project_month =15; }
            if(project_month==4) { project_month =16; }
        } else if(project_title=='annually') {
            var project_type ="3"; var  project_year=year;
        } else {
            var project_type =""; var  project_year=""; var  project_month="";
        }

        client_data['list_name'] = current_variable;
        client_data = JSON.stringify(client_data);
        $.ajax({
            type: "POST",
            url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetListItem",
            async: true,
            data: client_data,
            contentType: "application/json",
            dataType: "json",        
            cache:false,
            success: function (result) {
                //console.log(section_from);
                for (var i = 0; i < result.length; i++) {
                    if (current_variable == 'PERIOD'){
                        //console.log('Period');
                        if(section_from=='ProjectBookkeepingTask1' || section_from=='ProjectOtherFiles')
                        {
                            if(section_from=='ProjectOtherFiles')
                                {
                                    if(project_month==result[i].Key) { var  cc_selected_month='selected';} else {  var  cc_selected_month=''; }
                                }
                            else
                                {
                                    if(project_month==result[i].Value) { var  cc_selected_month='selected';} else {  var  cc_selected_month=''; }
                                }
                            d = new Date();
                            $('#'+current_variable_id+'div'+counter).append(`<option value="${result[i].Key}" ${cc_selected_month}>${result[i].Value}</option>`).trigger("chosen:updated");
                        }
                        else
                        {
                            d = new Date();
                            var current_month = new Date().getMonth();
                            var current_month = current_month+1;
                            //console.log(current_month);
                            if(current_month==result[i].Key) { var  cc_selected_month='selected';} else {  var  cc_selected_month=''; }
                            $('#'+current_variable_id+'div'+counter).append(`<option value="${result[i].Key}" ${cc_selected_month}>${result[i].Value}</option>`).trigger("chosen:updated");
                        }
                    }else{
                        //console.log('others');
                        if(section_from=='ProjectBookkeepingTask1' || section_from=='ProjectOtherFiles')
                        {
                            //console.log('other');
                            if(current_variable=='Period Frequency')
                            {
                                //console.log(result[i].Value);
                                //console.log(project_type);
                                if(section_from=='ProjectOtherFiles') {
                                    if(project_type==result[i].Key) { var  current_frequency='selected';} else {  var  current_frequency=''; }
                                } else {
                                    if(project_type==result[i].Value) { var  current_frequency='selected';} else {  var  current_frequency=''; }
                                }
                                
                                //console.log(current_frequency);
                                $('#'+current_variable_id+'div'+counter).append(`<option value="${result[i].Key}" ${current_frequency}>${result[i].Value}</option>`).trigger("chosen:updated");
                            }
                            else if(current_variable=='Year')
                            {
                                /*console.log("ok");
                                console.log(project_year);*/
                                if(project_year==result[i].Value) { var  cc_selected_year='selected';} else {  var  cc_selected_year=''; }
                                $('#'+current_variable_id+'div'+counter).append(`<option value="${result[i].Key}" ${cc_selected_year}>${result[i].Value}</option>`).trigger("chosen:updated");
                            }
                            else
                            {
                                $('#'+current_variable_id+'div'+counter).append(`<option value="${result[i].Key}">${result[i].Value}</option>`).trigger("chosen:updated");
                            }
                        }
                        else
                        {
                            if(current_variable=='Year')
                            {
                                /*console.log("ok");
                                console.log(project_year);*/
                                var current_year = new Date().getFullYear();
                                /*console.log(current_year);*/
                                if(current_year==result[i].Value) { var  cc_selected_year='selected';} else {  var  cc_selected_year=''; }
                                $('#'+current_variable_id+'div'+counter).append(`<option value="${result[i].Key}" ${cc_selected_year}>${result[i].Value}</option>`).trigger("chosen:updated");
                            }
                            else
                            {
                                $('#'+current_variable_id+'div'+counter).append(`<option value="${result[i].Key}">${result[i].Value}</option>`).trigger("chosen:updated");
                            }
                        }
                    }
                }    
            }, 
            error:function(jqXHR) {
                console.log('error');
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
}
function update_azure_site(brand = '', franchise = '', client_type = '', client_id = '') {
    franchise = franchise.trim().replace(/ /g, '-');
    if (client_type == 'company') {
        is_company = true;
    } else {
        is_company = false;
    }
    var client_data = {"brand": brand, 'franchise': franchise, 'client_type': client_type, 'client_id': client_id, 'is_company': is_company};
    client_data = JSON.stringify(client_data);

    $.ajax({
        type: "POST",
        // url: "https://localhost:44310/Api/SharePoint/UpdateSite",
        /*url: "https://db.taxleaf.com:9099/Api/SharePoint/UpdateSite",
        async: true,
        data: client_data,
        contentType: "application/json",
        dataType: "json",
        cache: false,*/
        type: "POST",
        url: base_url + 'sharepoint/update_site.php',
        async: true,
        data: { brand:brand,franchise:franchise,client_type:client_type,client_id:client_id },
        success: function (result) {
            if (result== 1) {
                swal({
                    title: "Success!",
                    text: "Site Updated Successfully!",
                    type: "success"
                }, function () {
                    window.location.reload();
                });
            }
            else if (result== 2) {
                swal("WARNING!", "Site already updated for this client", "warning");
            }
            else {
                swal("ERROR!", "Something Went Wrong, Please Try Again.", "error");
            }
        },
        error: function (data) {
            console.log(data);
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

function get_azzure_folder_list(brand='',franchise='',client_type='',client_id='') {
    $('#azzure-file-list-div').empty();
    console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id);
    var brand = brand.trim();
    var franchise = franchise.trim();
    var client_type = client_type.trim();
    var client_id = client_id.trim();
    var client_data = { "brand":brand,'franchise':franchise,'client_type':client_type,'client_id':client_id };
    client_data = JSON.stringify(client_data);
    //code start for hide and show upload button start
    $.ajax({
    type: "POST",
    //url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetFolderList",
    url: base_url + 'sharepoint/check_folder_existence.php',
    async: true,
    //data: client_data ,
    data: { brand:brand,franchise:franchise,client_type:client_type,client_id:client_id },
    /*contentType: "application/json",
    dataType: "json",  
    cache:false,*/
    success: function (res) {
        if(res == '1') {
            $("#update-btn-div").empty();
            /*$("#update-btn-div").append("<div id='azzure-site-update'><a href='javascript:void(0);' onclick=\"update_azure_site('"+brand+"','"+franchise+"','"+client_type+"','"+client_id+"')\" class='btn btn-block btn-warning'>Update</a></div>");*/                         
            $.ajax({
                type: "POST",
                //url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetFolderList",
                url: base_url + 'guest/guest/getclientwisefoldername',
                async: true,
                data: { client_type:client_type },
                dataType: "html",       
                cache:false,
                success: function (result) {
                    var arr = [];
                    var result = JSON.parse(result);

                    $.ajax({
                        type: 'POST',
                        url: base_url + 'guest/guest/get_folder_options',
                        data: { folder_detail:result,other:client_data },
                        success: function (res) {
                            $("#azzure-folder-list-div").html(res); 
                            /*$.ajax({
                                type: 'POST',
                                url: base_url + 'action/Home/universal_file_upload',
                                data: { other:client_data },
                                success: function (addfieresult) {
                                    $("#azzure-file-list-div").html(addfieresult);
                                }
                            });*/ 
                        }
                    });
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
        else if(res == '2') {
            $("#azzure-folder-list-div").empty();
            /*$("#azzure-folder-list-div").append("<a href='javascript:void(0);' onclick=\"create_azure_site('"+brand+"','"+franchise+"','"+client_type+"','"+client_id+"')\" class='btn btn-success'>Create</a>");
            swal("WARNING!","Please Create Site for this client","warning");*/
        }
        else {
            swal("ERROR!", "Someting Went Wrong! Try Again.", "error");
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
    //end
}


/*function upload_file_at_azzure(brand='',franchise='',client_type='',client_id='') {
    var file_list_url = $("#file_list_url").val();
    var doc_file = $("#doc_file").val();

    //Add variables
    var folder_name = $('#folder_name').val();
    var document_sub_type = $("#document_sub_type option:selected").text();
    if (document_sub_type !== undefined) {
        document_sub_type_text = document_sub_type.replace(/ /g,"_").toLowerCase();
    }
    var document_name = $("#doc_file").val().replace(/C:\\fakepath\\/i, '');
    var staff_id = $("#staff_id").val();
    if (folder_name !== undefined) {
        folder_name = folder_name.trim();
        folder_name_lower_case = folder_name.replace(/ /g,"_").toLowerCase();
    }
    // console.log(folder_name_lower_case);
    var arrival_date = $("#arrival_date").val();
    var priority = $("#prioritydiv").val();
    var priority_text = $("#prioritydiv").text();
    var government_agency = $("#government_agencydiv option:selected").val();
    var government_agency_text = $("#government_agencydiv option:selected").text();
    var state = $("#statediv").val();
    var state_text = $("#statediv").text();
    var frequency = $("#frequencydiv option:selected").val();
    var frequency_text = $("#frequencydiv option:selected").text();
    var period = $("#perioddiv option:selected").val();
    var period_text = $("#perioddiv option:selected").text();
    var year = $("#yeardiv option:selected").val();
    var year_text = $("#yeardiv option:selected").text();
    var bank_name = $("#bank_namediv option:selected").val();
    var bank_name_text = $("#bank_namediv option:selected").text();
    var account_last_4 = $("#account_last_4").val();
    var description = $("#description").val();
    var name = $("#name").val();
    var api_data = '',file_name = '',statement = '';
    if (folder_name_lower_case == 'bank_statements') {
        if (document_sub_type_text == 'bank_statements') {
            statement = 'Statement';
        } else {
            statement = 'Letter';
        }
        file_name = statement+'-'+bank_name_text.trim().replace(/ /g,"_")+'-'+account_last_4.trim().replace(/ /g,"_")+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':document_sub_type,'Modified_x0020_By':staff_id,'FrequencyId':frequency.trim(),'Year':year_text.trim(),'Bank_x0020_NameId':bank_name.trim(),'PeriodId':period.trim(),'Account_x0020_Last_x0020_4':account_last_4.trim()};
    } else if (folder_name_lower_case == 'billing_information') {
        if (document_sub_type_text == 'invoice') {
            statement = 'Invoice';
        } else if (document_sub_type_text == 'payments') {
            statement = 'Payment';
        } else if (document_sub_type_text == 'proposal') {
            statement = 'Proposal';
        } else {
            statement = 'Collection_Notice';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':document_sub_type,'Modified_x0020_By':staff_id,'FrequencyId':frequency.trim(),'Year':year_text.trim(),'PeriodId':period.trim()};
    } else if (folder_name_lower_case == 'government_correspondence') {
        file_name = document_name.trim()+'-'+government_agency_text.trim()+'-'+state.trim()+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Government_x0020_AgencyId':government_agency.trim(),'StateId':state.trim(),'FrequencyId':frequency.trim(),'Year':year_text.trim(),'Period':period.trim()};
    } else if (folder_name_lower_case == 'mailing_correspondance') {
        file_name = document_name.trim()+'-'+priority_text.trim()+'-'+arrival_date;
        api_data = {'__metadata':{'type':'SP.ListItem'},'PriorityId':priority.trim(),'Arrival_x0020_Date':arrival_date};
    } else if (folder_name_lower_case == 'bookkeeping_documents') {
        if(document_sub_type_text == 'profit_&_lo'){
            statement = 'ProfitLoss';
        } else if(document_sub_type_text == 'balance_sheet'){
            statement = 'BalanceSheet';
        } else if(document_sub_type_text == 'general_ledger'){
            statement = 'Ledger';
        } else{
            statement = 'Balance';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Frequency':frequency.trim(),'Period':period.trim(),'Year':year_text.trim()};
    } else if(folder_name_lower_case == 'sales_tax_documents') {
        if(document_sub_type_text == 'sales_tax_certificate'){
            statement = 'Certificate';
        } else if(document_sub_type_text == 'sales_tax_processing'){
            statement = 'Processing';
        } else if(document_sub_type_text == 'receipt'){
            statement = 'Receipt';
        } else{
            statement = 'Form';
        }
        if(document_sub_type_text == 'sales_tax_certificate'){
            file_name = statement+'-'+year_text.trim().replace(/ /g,"_");
        }else{
            file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        }
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Frequency':frequency_text.trim(),'Period':period_text.trim(),'Year':year_text.trim()};
    } else if(folder_name_lower_case == 'internal_documents'){
        if(document_sub_type_text == 'internal_communication'){
            statement = 'Internal';
        } else{
            statement = 'Personal';
        }

        file_name = statement+'-'+description.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Description':description.trim()};
    } else if(folder_name_lower_case == 'tax_return_documents'){
        if(document_sub_type_text == 'federal_tax_return'){
            statement = 'FederalReturn';
        } else if(document_sub_type_text == 'state_tax_return'){
            statement = 'StateReturn';
        } else if(document_sub_type_text == 'k-1'){
            statement = 'K1';
        } else{
            statement = 'PaymentNotice';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'State':state.trim(),'Year':year_text.trim()};
    } else if(folder_name_lower_case == 'corporate_documents'){
        if(document_sub_type_text == 'incorporate_documents'){
            statement = 'Incorporation';
        } else if(document_sub_type_text == 'ownership_documents'){
            statement = 'Ownership';
        } else if(document_sub_type_text == 'annual_renewals'){
            statement = 'AnnualReport';
        } else{
            statement = 'Ownership';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Frequency':frequency.trim(),'Period':period.trim(),'Year':year_text.trim()};
    } else if(folder_name_lower_case == 'payroll_information'){
        if(document_sub_type_text == 'paystub'){
            statement = 'Paystub';
        } else if(document_sub_type_text == 'w2'){
            statement = 'W2';
        } else if(document_sub_type_text == 'w3'){
            statement = 'W3';
        } else if(document_sub_type_text == 'w4'){
            statement = 'W4';
        } else if(document_sub_type_text == '1099'){
            statement = '1099';
        } else if(document_sub_type_text == '1096'){
            statement = '1096';
        } else if(document_sub_type_text == '940'){
            statement = '940';
        } else if(document_sub_type_text == '941'){
            statement = '941';
        } else {
            statement = 'Unemployment';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_")+'-'+state.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'State':state.trim(),'Frequency':frequency.trim(),'Period':period.trim(),'Year':year_text.trim()};
    } else if(folder_name_lower_case == 'employee_information'){
         if(document_sub_type_text == 'paystub'){
            statement = 'Paystub';
        } else if(document_sub_type_text == 'identification'){
            statement = 'ID';
        } else if(document_sub_type_text == 'w4'){
            statement = 'W4';
        } else if(document_sub_type_text == '1099'){
            statement = '1099';
        } else if(document_sub_type_text == 'i-9'){
            statement = 'I9';
        } else if(document_sub_type_text == 'employee_contract'){
            statement = 'Contract';
        } else if(document_sub_type_text == 'Termination_letter'){
            statement = 'Termination';
        } else {
            statement = 'NonComplete';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_")+'-'+name.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Employee_x0020_Name':name.trim(),'Frequency':frequency.trim(),'Period':period.trim(),'Year':year_text.trim()};
    } else {
        
    }
    //Add variables done
    api_data = JSON.stringify(api_data);
    // console.log(api_data);return false;
    var client_info = {"brand":brand,"franchise":franchise,"client_type":client_type,"client_id":client_id,"file_list_url":file_list_url,"folder_name":folder_name,"file_name":file_name,"api_data":api_data };
    client_info = JSON.stringify(client_info);
    var form_data = new FormData(document.getElementById('azzure_doc_form'));
    form_data.append('client_info',client_info);
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
        success: function (result) {
            console.log(result);
            if (result == -1) {
                alert("Error Processing Data");
            } else {
                swal({
                    title: "Success!",
                    text: "File Uploaded Successfully!",
                    type: "success"
                }, function () {
                    file_list_url = btoa(file_list_url);
                    get_azzure_file_list(brand,franchise,client_type,client_id,file_list_url);    
                });
            }
        }
    });
}*/

function set_seleted_url_val(file_list_url='',counter='') {
    file_list_url = atob(file_list_url);
    $("#file_list_url").val(file_list_url);
    $(".img_class").attr("src",base_url+'/assets/img/folder.svg')
    $("#img_id"+counter).attr("src",base_url+'/assets/img/open-folder.svg');
}

function create_azure_site(brand = '', franchise = '', client_type = '', client_id = '') {
    franchise = franchise.trim().replace(/ /g, '-');
    var client_data = {"brand": brand, 'franchise': franchise, 'client_type': client_type, 'client_id': client_id};
    client_data = JSON.stringify(client_data);
    $.ajax({
        type: "POST",
        // url: "https://localhost:44310/Api/SharePoint/create",
        //url: "https://dev2.taxleaf.com:9099/Api/SharePoint/create",
        type: "POST",
        url: base_url + 'sharepoint/create_site.php',
        async: true,
        data: { brand:brand,franchise:franchise,client_type:client_type,client_id:client_id },
        /*async: true,
        data: client_data,
        contentType: "application/json",
        dataType: "json",
        cache: false,*/
        success: function (result) {
            if (result== 1) {
                swal({
                    title: "Success!",
                    text: "Site Created Successfully!",
                    type: "success"
                }, function () {
                    window.location.reload();
                });
            }
            else if (result== 2) {
                swal("WARNING!", "Site already exists for this client", "warning");
            }
            else {
                swal("ERROR!", "Something Went Wrong, Please Try Again.", "error");
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


/*function upload_file_at_azure_from_file_cabinet() {
    if (!requiredValidation('file-cabinet-form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('file-cabinet-form'));
    
    var brand = $("#brand").val().trim();
    var franchise = $("#client_office").val().trim();
    var client_type = $(".client_type:checked").val().trim();
    var client_id = $("#client_list_ddl_file_cabinet").val().trim();
    var folder_name = $("#document_type option:selected").text();
    
    var document_sub_type = $("#document_sub_type option:selected").text();
    if (document_sub_type !== undefined) {
        document_sub_type_text = document_sub_type.replace(/ /g,"_").toLowerCase().trim();
    }
    var staff_id = $("#staff_id").val();
    var document_name = $("#doc_file").val().replace(/C:\\fakepath\\/i, '');

    if (folder_name !== undefined) {
        folder_name = folder_name.trim();
        folder_name_lower_case = folder_name.replace(/ /g,"_").toLowerCase();
    }
    var file_list_url = $("#document_type option:selected").val();
    if (file_list_url !== undefined) {
        file_list_url = file_list_url.trim();
    }
    // console.log(folder_name_lower_case);
    var arrival_date = $("#arrival_date").val();
    var priority = $("#prioritydiv").val();
    var priority_text = $("#prioritydiv").text();
    var government_agency = $("#government_agencydiv option:selected").val();
    var government_agency_text = $("#government_agencydiv option:selected").text();
    var state = $("#statediv").val();
    var state_text = $("#statediv").text();
    var frequency = $("#frequencydiv option:selected").val();
    var frequency_text = $("#frequencydiv option:selected").text();
    var period = $("#perioddiv option:selected").val();
    var period_text = $("#perioddiv option:selected").text();
    var year = $("#yeardiv option:selected").val();
    var year_text = $("#yeardiv option:selected").text();
    var bank_name = $("#bank_namediv option:selected").val();
    var bank_name_text = $("#bank_namediv option:selected").text();
    var account_last_4 = $("#account_last_4").val();
    var description = $("#description").val();
    var name = $("#name").val();
    var api_data = '',file_name = '',statement = '';
    if (folder_name_lower_case == 'bank_statements') {
        if (document_sub_type_text == 'bank_statements') {
            statement = 'Statement';
        } else {
            statement = 'Letter';
        }
        file_name = statement+'-'+bank_name_text.trim().replace(/ /g,"_")+'-'+account_last_4.trim().replace(/ /g,"_")+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':document_sub_type,'Modified_x0020_By':staff_id,'FrequencyId':frequency.trim(),'YearId':year.trim(),'Bank_x0020_NameId':bank_name.trim(),'PeriodId':period.trim(),'Account_x0020_Last_x0020_4':account_last_4.trim()};
    } else if (folder_name_lower_case == 'billing_information') {
        if (document_sub_type_text == 'invoice') {
            statement = 'Invoice';
        } else if (document_sub_type_text == 'payments') {
            statement = 'Payment';
        } else if (document_sub_type_text == 'proposal') {
            statement = 'Proposal';
        } else {
            statement = 'Collection_Notice';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':document_sub_type,'Modified_x0020_By':staff_id,'FrequencyId':frequency.trim(),'YearId':year.trim(),'PeriodId':period.trim()};
    } else if (folder_name_lower_case == 'government_correspondence') {
        file_name = document_name.trim()+'-'+government_agency_text.trim()+'-'+state.trim()+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Government_x0020_AgencyId':government_agency.trim(),'StateId':state.trim(),'FrequencyId':frequency.trim(),'YearId':year.trim(),'PeriodId':period.trim()};
    } else if (folder_name_lower_case == 'mailing_correspondance') {
        file_name = document_name.trim()+'-'+priority_text.trim()+'-'+arrival_date;
        api_data = {'__metadata':{'type':'SP.ListItem'},'PriorityId':priority.trim(),'Arrival_x0020_Date':arrival_date};
    } else if (folder_name_lower_case == 'bookkeeping_documents') {
        if(document_sub_type_text.trim() == 'profit_&_loss'){
            statement = 'ProfitLoss';
        } else if(document_sub_type_text.trim() == 'balance_sheet'){
            statement = 'BalanceSheet';
        } else if(document_sub_type_text.trim() == 'general_ledger'){
            statement = 'Ledger';
        } else{
            statement = 'Balance';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':statement,'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'sales_tax_documents') {
        
        if(document_sub_type_text.trim() == 'sales_tax_certificate'){
            statement = 'Certificate';
        } else if(document_sub_type_text.trim() == 'sales_tax_processing'){
            statement = 'Processing';
        } else if(document_sub_type_text.trim() == 'receipt'){
            statement = 'Receipt';
        } else{
            statement = 'Form';
        }
        if(document_sub_type_text.trim() == 'sales_tax_certificate'){
            file_name = statement+'-'+year_text.trim().replace(/ /g,"_");
        }else{
            file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        }
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'internal_documents'){
        if(document_sub_type_text.trim() == 'internal_communication'){
            statement = 'Internal';
        } else{
            statement = 'Personal';
        }
        file_name = statement+'-'+description.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Description':description.trim()};
    } else if(folder_name_lower_case == 'tax_return_documents'){
        if(document_sub_type_text == 'federal_tax_return'){
            statement = 'FederalReturn';
        } else if(document_sub_type_text == 'state_tax_return'){
            statement = 'StateReturn';
        } else if(document_sub_type_text == 'k-1'){
            statement = 'K1';
        } else{
            statement = 'PaymentNotice';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'StateId':state.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'corporate_documents'){
        if(document_sub_type_text == 'incorporate_documents'){
            statement = 'Incorporation';
        } else if(document_sub_type_text == 'ownership_documents'){
            statement = 'Ownership';
        } else if(document_sub_type_text == 'annual_renewals'){
            statement = 'AnnualReport';
        } else{
            statement = 'OwnershipId';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'payroll_information'){
        if(document_sub_type_text == 'paystub'){
            statement = 'Paystub';
        } else if(document_sub_type_text == 'w2'){
            statement = 'W2';
        } else if(document_sub_type_text == 'w3'){
            statement = 'W3';
        } else if(document_sub_type_text == 'w4'){
            statement = 'W4';
        } else if(document_sub_type_text == '1099'){
            statement = '1099';
        } else if(document_sub_type_text == '1096'){
            statement = '1096';
        } else if(document_sub_type_text == '940'){
            statement = '940';
        } else if(document_sub_type_text == '941'){
            statement = '941';
        } else if(document_sub_type_text == '944'){
            statement = '944';
        }else {
            statement = 'Unemployment';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_")+'-'+state.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'StateId':state.trim(),'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'employee_information'){
         if(document_sub_type_text == 'paystub'){
            statement = 'Paystub';
        } else if(document_sub_type_text == 'identification'){
            statement = 'ID';
        } else if(document_sub_type_text == 'w4'){
            statement = 'W4';
        } else if(document_sub_type_text == '1099'){
            statement = '1099';
        } else if(document_sub_type_text == 'i-9'){
            statement = 'I9';
        } else if(document_sub_type_text == 'employee_contract'){
            statement = 'Contract';
        } else if(document_sub_type_text == 'termination_letter'){
            statement = 'Termination';
        } else {
            statement = 'NonComplete';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_")+'-'+name.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Employee_x0020_Name':name.trim(),'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else {
        
    }
    // console.log(api_data);return false;
    // console.log(client_info);
    api_data = JSON.stringify(api_data);
    //console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id+'/'+folder_name+'/'+file_list_url+'/'+file_name+'/'+api_data);
    var client_info = {"brand":brand,"franchise":franchise,"client_type":client_type,"client_id":client_id,"file_list_url":file_list_url,"folder_name":folder_name,"file_name":file_name,"api_data":api_data };
    client_info = JSON.stringify(client_info);
    //console.log(client_info);return false;
    form_data.append('client_info',client_info);
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
        success: function (result) {
            //console.log(result);
            if (result == -1) {
                alert("Error Processing Data");
            } else {
                swal({
                    title: "Success!",
                    text: "File Uploaded Successfully!",
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
}*/

function get_folder_subtypes_list(folder_name,client_type='',section='',counter='') {
    if (client_type == '') {
        client_type = $('.client_type:checked').val();
    }
    if (section != 'list') {
        if (counter == '') {
            var initial_folder_name = $("#document_type option:selected").val();
        } else {
            var initial_folder_name = $("#document_type"+counter+" option:selected").val();
        }
    }
    var match_result = folder_name.match(/taxleaf.sharepoint.com/g);

    //console.log(match_result); return false;
    if(match_result!=null)
    {  
        var n = initial_folder_name.lastIndexOf('/');
        var last_folder_name = initial_folder_name.substring(n + 1);
        var folder_name = (last_folder_name.split("'")[0]);
    }
    console.log(folder_name+'-'+client_type);
    $.ajax({
        type: "POST",
        data: {
            folder_name: folder_name,
            client_type: client_type        
        },
        url: base_url + 'client/get_folder_subtypes_list',
        dataType: "html",
        success: function (result) {
            result = result.trim();
            // alert('u: '+result);
            if (result != 0) {
                result = JSON.parse(result);            
                if(counter == '') {
                    $('#document_sub_type_div').show();
                    $('#document_sub_type').empty();
                    $('#document_sub_type').append(`<option value="">Select an Option</option>`);
                } else {
                    $('#document_sub_type_div'+counter).show();
                    $('#document_sub_type'+counter).empty();
                    $('#document_sub_type'+counter).append(`<option value="">Select an Option</option>`);
                }
                
                for (var i = 0; i < result.length; i++) {
                    if (counter == '') {
                        if ($('#folder-variables').is(':visible')) {
                            $("#folder-variables").hide();
                        }
                        
                        $('#document_sub_type').append(`<option value="${result[i].id}">${result[i].document_type}</option>`).trigger("chosen:updated");
                    } else {
                        if ($('#folder-variables'+counter).is(':visible')) {
                            $("#folder-variables"+counter).hide();
                        }
                        $('#document_sub_type'+counter).append(`<option value="${result[i].id}">${result[i].document_type}</option>`).trigger("chosen:updated");
                    }
                }
            } else {
                if(counter == '') {
                    $('#folder-variables').empty();
                    $('#document_sub_type').empty().val('').trigger("chosen:updated");
                    // $('#document_sub_type').attr('required',false);
                    // $('#document_sub_type_div').hide();
                } else {
                    $('#folder-variables'+counter).empty();
                    $('#document_sub_type'+counter).empty().val('').trigger("chosen:updated");
                    // $('#document_sub_type'+counter).attr('required',false);
                    // $('#document_sub_type_div'+counter).hide();
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
function get_existing_client_list_officewise(office_id="",client_id="") {
    var client_type = $('.client_type:checked').val();
    if (office_id == '') {
        office_id = $('#client_office').val();
    }
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_type:client_type,
            client_id:client_id        
        },
        url: base_url + 'client/get_existing_client_list_officewise',
        dataType: "html",
        success: function (result) {
            $("#client_list_ddl_file_cabinet").chosen('destroy');
            $("#client_list_ddl_file_cabinet").html(result);
            $("#client_list_ddl_file_cabinet").chosen();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function get_existing_client_list_officewise_for_manage_financial(office_id="",client_id="") {
    var client_type = $('.client_type:checked').val();
    if (office_id == '') {
        office_id = $('#staff_office').val();
    }
    $("#client_id_name").html('');
    $.ajax({
        type: "POST",
        data: {
            office_id: office_id,
            client_type:client_type,
            client_id:client_id        
        },
        url: base_url + 'client/get_existing_client_list_officewise_for_manage_financial',
        dataType: "html",
        success: function (result) {
            $("#client_list_ddl_file_cabinet").chosen('destroy');
            $("#client_list_ddl_file_cabinet").html(result);
            $("#client_list_ddl_file_cabinet").chosen();
        },
        beforeSend: function () {
            openLoading();
        },
        complete: function (msg) {
            closeLoading();
        }
    });
}
function universal_sorting_filter_modal(reference = '', current_element = '', sorting_url='',client_type='') {
    var form_data = new FormData(document.getElementById('client_dashboard-filter-display-div'));
    console.log(sorting_url);
    $("#filter-field-variable").val(current_element.id.split('-')[0]); /*stroing current field's value*/
    if (!$('.display-filter-div').is(':visible')) {
        $(".display-filter-div").show();
    }
    var previous_filter = $("#filter-variable").val();
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
            url: base_url + 'action/Home/' + sorting_url,
            data: {
                reference: reference,
                client_type:client_type
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
function update_client_late_fee_status(client_id , client_type , late_fee_status) {
    if(late_fee_status == 'y'){
        $("#late_fee2").prop("checked", true);
    }else {
        $("#late_fee1").prop("checked", true);
    }
    swal({
        title: "Are you sure?",
        text: (late_fee_status == 'y') ? "Do you want to add late fees for this client?" : "Do you want to remove late fees for this client",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            type: 'POST',
            url: base_url + 'client/update_client_late_fee_status',
            data: {
                client_id: client_id,
                client_type:client_type,
                late_fee_status:late_fee_status
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function (result) {
                /*console.log(result);*/
                if (result.trim() == 1) {
                    if(late_fee_status == 'y'){
                        $("#late_fee1").prop("checked", true);
                        $.ajax({
                            type: 'POST',
                            url: base_url + 'cron/invoice_late_fee_cron.php',
                            data: {mydata:true},
                            enctype: 'multipart/form-data',
                            cache: false,
                            success: function (result1) {
                                swal("Success", "Successfully updated", "success");
                            },
                            beforeSend: function () {
                                openLoading();
                            },
                            complete: function (msg) {
                                closeLoading();
                            }
                        });
                    }else {
                        swal("Success", "Successfully updated", "success");
                        $("#late_fee2").prop("checked", true);
                    }
                } else {
                    swal("ERROR!", "Please try again", "error");
                }
            }
        });
    }); 
}
/*function save_document_at_sharepoint() {
    var form_data = new FormData(document.getElementById('form_document'));
    var reference = $("form#form_document #reference").val();
    var reference_id = $("form#form_document #reference_id").val();        
    var client_info = JSON.parse($("form#form_document #client_info").val());
    // console.log(client_info);return false;
    $.ajax({
        async: true,
        crossDomain: true,
        type: "POST",
        data: form_data,
        // url: "https://localhost:9099/api/SharePoint/UploadFileAsync",
        url: "https://dev2.taxleaf.com:9099/api/SharePoint/UploadFileAsync",
        dataType: "html",
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        cache: false,
        success: function (result) {
            // console.log(result);return false;
            if (result == -1) {
                alert("Error Processing Data");
            } else {
                $('#document-form').modal('hide');
                show_uploaded_document(client_info.brand,client_info.franchise,client_info.client_type,client_info.client_id);
                // get_document_list(reference_id, reference);
            }
        }
    });
}*/

function get_folder_list_at_service_view(brand = '', franchise = '', client_type = '', client_id = '') { /*used in file cabinet*/
    /*if ($('#folder-variables').is(':visible')) {
     $("#folder-variables").hide();
     }*/
    /*var brand = $("#brand").val().trim();
     var franchise = $("#client_office").val().trim();
     var client_type = $(".client_type:checked").val().trim();
     var client_id = $("#client_list_ddl_file_cabinet").val().trim();*/
    // console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id);
    if (brand != '' && franchise != '' && client_type != '' && client_id != '') {
        // console.log(brand + '/' + franchise + '/' + client_type + '/' + client_id);
        var client_data = {"brand": brand, 'franchise': franchise, 'client_type': client_type, 'client_id': client_id};
        client_data = JSON.stringify(client_data);
        $.ajax({
            type: "POST",
            // url: "https://localhost:9099/Api/SharePoint/GetFolderList",
            // url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetFolderList",
            url: base_url + 'guest/guest/getclientwisefoldername',
            async: true,
            //data: client_data //code hide of azure api,
            data: { client_type:client_type},
            /*contentType: "application/json",
            dataType: "json", //code hide of azure api */
            dataType: "html",      
            cache:false,
            success: function (result) {
                /*console.log(result);*/
                
                $.ajax({
                    type: "POST",
                    //url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetFolderList",
                    url: base_url + 'sharepoint/check_folder_existence.php',
                    async: true,
                    data: { brand:brand,franchise:franchise,client_type:client_type,client_id:client_id },
                    //contentType: "application/json",
                    //dataType: "json",  
                    cache:false,
                    success: function (result_Ans) {
                        //var result_length = result.value.length; 
                        result_length = result_Ans.trim(); 
                        if(result_length == 1) {
                            // console.log(result); return false;
                            result = JSON.parse(result);
                            var list_cc = result.length;
                            console.log(list_cc); 

                            //new code for local folder start 
                            for (var i = 0; i < list_cc; i++) {
                                var azure_folder_name = result[i]['azure_folder_name'];
                                var azure_rename_folder_name = result[i]['azure_rename_folder_name'];
                                var folder_type = result[i]['folder_type'];

                                var folder_name =  azure_folder_name;
                                var rename_folder_name =  azure_folder_name;
                                if(azure_rename_folder_name!=null && azure_rename_folder_name!='') {
                                    var rename_folder_name =  azure_rename_folder_name;
                                }
                                //console.log(rename_folder_name);
                                var property = "https://taxleaf.sharepoint.com/sites/Leafcabinet/"+brand+"/"+franchise.replace(/ /g,'-')+"/"+client_type+"/"+client_id+"/_api/Web/GetFolderByServerRelativePath(decodedurl='/sites/Leafcabinet/"+brand+"/"+franchise.replace(/ /g,'-')+"/"+client_type+"/"+client_id+"/"+folder_name+"')";
                                $('#document_type').append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");                                  
                                /*console.log('in');*/
                            }
                            //end
                        }
                        else if(result_length == 2) {
                            $("#upload_document_azure").attr('disabled', false);
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

                /*obejct_val = Object.assign({}, arr);
                for (const property in obejct_val) {
                    $('#document_type').append(`<option value="${property}">${obejct_val[property].split('/')[0]}</option>`).trigger("chosen:updated");
                }*/
            },
            error: function (jqXHR) {
                $('#document_type').empty().trigger("chosen:updated");
                $('#document_type').append(`<option value="">Select an option</option>`).trigger("chosen:updated");
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
}

function show_folder_name(brand='',franchise='',client_type='',client_id='',counter='',sectionfrom='')
{
    get_folder_list_at_service_view_for_owner(brand,franchise,client_type,client_id,counter,sectionfrom);
}

function get_folder_list_at_service_view_for_owner(brand='',franchise='',client_type='',client_id='',counter='',sectionfrom='',task_order='',template_main_id='',unique_task_id='') { /*used in file cabinet*/
    /*if ($('#folder-variables').is(':visible')) {
        $("#folder-variables").hide();
    }*/
    /*console.log(counter);
    console.log('insert');*/
    brand = brand.trim();
    franchise = franchise.trim();
    client_type = client_type.trim();
    client_id = client_id.trim();
    if (brand != '' && franchise != '' && client_type != '' && client_id != '') {
        //console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id);   
        var client_data = { "brand":brand,'franchise':franchise,'client_type':client_type,'client_id':client_id };
        client_data = JSON.stringify(client_data);
        $.ajax({
            type: "POST",
            // url: "https://localhost:9099/Api/SharePoint/GetFolderList",
            // url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetFolderList",
            url: base_url + 'guest/guest/getclientwisefoldername',
            async: true,
            //data: client_data //code hide of azure api,
            data: { client_type:client_type,'counter':counter,'sectionfrom':sectionfrom,'task_order':task_order,'template_main_id':template_main_id,'unique_task_id':unique_task_id },
            /*contentType: "application/json",
            dataType: "json", //code hide of azure api */
            dataType: "html",      
            cache:false,
            success: function (result) {
                //new code hide and show button start
                $.ajax({
                    type: "POST",
                    //url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetFolderList",
                    url: base_url + 'sharepoint/check_folder_existence.php',
                    async: true,
                    data: { brand:brand,franchise:franchise,client_type:client_type,client_id:client_id },
                    //contentType: "application/json",
                    //dataType: "json",  
                    cache:false,
                    success: function (result) {
                        //var result_length = result.value.length; 
                        result_length = result.trim(); 
                        if(result_length == 1) {
                            if (counter != undefined) {
                                $("#upload_document_azure"+counter).attr('disabled',false);
                                $("#client_create_azure_site"+counter).attr('disabled',true);
                            }
                        }
                        else if(result_length == 2) {
                            if (counter != undefined) {
                                $("#upload_document_azure"+counter).attr('disabled',true);
                                $("#client_create_azure_site"+counter).attr('disabled',false);
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
                //end
                /*console.log(result);*/
                var result = JSON.parse(result);
                //console.log(result);
                var arr = [];
                var result_length = result.length; /*result.value.length;  //code hide of azure api*/
                if(result_length > 0) {
                    if (counter != undefined) {
                       /* $("#upload_document_azure"+counter).attr('disabled',false);
                        $("#client_create_azure_site_"+counter).attr('disabled',true);*/
                        //console.log(sectionfrom);
                        sectionfrom = sectionfrom.trim();
                        if(sectionfrom=='ProjectTaxReturnTask13' || sectionfrom=='ProjectBookkeepingTask1'  || sectionfrom=='bookkeeping' || sectionfrom=='tax_returns' || sectionfrom=='sales_tax' || sectionfrom=='annual_report')
                            {
                                console.log('demo');
                                console.log(counter);
                                $("#upload_document_azure"+counter).attr('disabled',false);
                                $("#client_create_azure_site"+counter).attr('disabled',true);
                            }
                    }
                }
               
                obejct_val = Object.assign({}, arr);
                if (counter != undefined) {
                    /*console.log(counter);
                    console.log(sectionfrom);*/
                if(counter=='CD1' || counter=='universal' || sectionfrom=='employeeinfo' || sectionfrom=='ProjectTaxReturnTask13' || sectionfrom=='ProjectBookkeepingTask1' || sectionfrom=='sellerinfo' || sectionfrom=='rt6info' || sectionfrom=='calculator' || sectionfrom=='project')
                    {
                        $('#document_type'+counter).empty();
                        if(sectionfrom=='rt6info' || sectionfrom=='project' ||  sectionfrom=='employeeinfo' || sectionfrom=='bookkeeping' || sectionfrom=='tax_returns' || sectionfrom=='sales_tax' || sectionfrom=='ProjectTaxReturnTask13' || sectionfrom=='ProjectBookkeepingTask1' || sectionfrom=='sellerinfo' || sectionfrom=='calculator' || counter=='universal')
                        {
                            var selected_file = $("#uploaded_file"+counter+" option:selected").val();
                            if(selected_file=='Lease' || selected_file=='' || counter=='universal')
                            {
                                $('#document_type'+counter).append(`<option value=''>Select an option</option>`);
                                $('#document_sub_type'+counter).empty(); 
                                $('#document_sub_type'+counter).append(`<option value=''>Select an option</option>`);
                            }
                        }
                    }
                }
                
                //new code for local folder start 
                for (var i = 0; i < result_length; i++) {
                    var azure_folder_name = result[i]['azure_folder_name'];
                    var azure_rename_folder_name = result[i]['azure_rename_folder_name'];
                    var folder_type = result[i]['folder_type'];

                    var folder_name =  azure_folder_name;
                    var rename_folder_name =  azure_folder_name;
                    if(azure_rename_folder_name!=null && azure_rename_folder_name!='') {
                        var rename_folder_name =  azure_rename_folder_name;
                    }

                    var property = "https://taxleaf.sharepoint.com/sites/Leafcabinet/"+brand+"/"+franchise.replace(/ /g,'-')+"/"+client_type+"/"+client_id+"/_api/Web/GetFolderByServerRelativePath(decodedurl='/sites/Leafcabinet/"+brand+"/"+franchise.replace(/ /g,'-')+"/"+client_type+"/"+client_id+"/"+folder_name+"')";
                
                    if (counter != undefined) {

                        if(folder_name!='RoutingRules'  && folder_name!='Shared Documents' && folder_name!='DropOffLibrary' && folder_name!='Mailing Service')  
                        {
                            if(counter=='CD1')
                            {
                                if(folder_name=='Payroll Information')
                                {
                                    $('#document_type'+counter).empty();
                                    $('#document_type'+counter).append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");
                                    get_folder_subtypes_list(property,client_type,'',counter);
                                }
                            }
                            else if(sectionfrom=='employeeinfo'  || sectionfrom=='rt6info' || sectionfrom=='calculator')
                            {
                                var selected_file = $("#uploaded_file"+counter+" option:selected").val();
                                if(selected_file=='Void Cheque' || selected_file=='I9 From' || selected_file=='Upload Void Cheque (pdf)' || selected_file=='Passport' || selected_file=='Driver License'   || selected_file=='Driver License'  || selected_file=='Weekly Wage Calculator (Xls)'   || selected_file=='Bi-Weekly Wage Calculator (Xls)')
                                {
                                    if(folder_name=='Employee Information')
                                    {
                                        $('#document_type'+counter).empty();
                                        $('#document_type'+counter).append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");
                                        get_folder_subtypes_list(property,client_type,'',counter);
                                    }
                                }
                                else if(selected_file=='W4 From')
                                {
                                    if(folder_name=='Payroll Information')
                                    {
                                        $('#document_type'+counter).empty();
                                        $('#document_type'+counter).append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");
                                        get_folder_subtypes_list(property,client_type,'',counter);
                                    }
                                }
                                else
                                {
                                    $('#document_type'+counter).append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");  
                                } 
                            }
                            else if(sectionfrom=='ProjectBookkeepingTask1')
                            {
                                var selected_file = $("#uploaded_file"+counter+" option:selected").val();
                                /*if(folder_name=='Bank Statements')
                                    {*/
                                        /*$('#document_type'+counter).empty();*/
                                        $('#document_type'+counter).append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");
                                        get_folder_subtypes_list(property,client_type,'',counter,task_order,template_main_id,unique_task_id);
                                    /*}*/
                            }
                            else if(sectionfrom=='bookkeeping')
                            {
                                var selected_file = $("#uploaded_file"+counter+" option:selected").val();
                                /*if(folder_name=='Bookkeeping Documents')
                                    {*/
                                        /*$('#document_type'+counter).empty();*/
                                        $('#document_type'+counter).append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");
                                        get_folder_subtypes_list(property,client_type,'',counter,task_order,template_main_id,unique_task_id);
                                    /*}*/
                            }
                            else if(sectionfrom=='sales_tax')
                            {
                                var selected_file = $("#uploaded_file"+counter+" option:selected").val();
                                /*if(folder_name=='Sales Tax Documents')
                                    {*/
                                        /*$('#document_type'+counter).empty();*/
                                        $('#document_type'+counter).append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");
                                        get_folder_subtypes_list(property,client_type,'',counter,task_order,template_main_id,unique_task_id);
                                    /*}*/
                            }
                            else if(sectionfrom=='ProjectTaxReturnTask13' || sectionfrom=='tax_returns' || sectionfrom=='project')
                            {
                                var selected_file = $("#uploaded_file"+counter+" option:selected").val();
                                /*if(folder_name=='Tax Return Documents')
                                    {*/
                                        /*$('#document_type'+counter).empty();*/
                                        $('#document_type'+counter).append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");
                                        get_folder_subtypes_list(property,client_type,'',counter,task_order,template_main_id,unique_task_id);
                                    /*}*/
                            }
                            else
                            {
                                $('#document_type'+counter).append(`<option value="${property}">${rename_folder_name}</option>`).trigger("chosen:updated");  
                            }
                        }                       
                    }
                }
                //end
            }, 
            error:function(jqXHR) {
                $('#document_type').empty().trigger("chosen:updated");
                if(counter=='CD1')
                    {
                        $('#document_type'+counter).append(`<option value=''>Select an option</option>`);
                    }
                else 
                    {
                        $('#document_type').append(`<option value="">Select an option</option>`).trigger("chosen:updated");
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
}
function save_new_owner_form() {
    if ($("#owner_business_ids").attr("disabled")) {
        $("#owner_business_ids").removeAttr("disabled");
    }
    if ($("#owner_individual_ids").attr("disabled")) {
        $("#owner_individual_ids").removeAttr("disabled");
    }
    if ($("#selecttitle").attr("disabled")) {
        $("#selecttitle").removeAttr("disabled");
    }
    if ($("#client_type").attr("disabled")) {
        $("#client_type").removeAttr("disabled");
    }
    var owner_percentage = $("#owner_percentage").val();
    // console.log(owner_percentage);return false;
    if (owner_percentage == '') {
        $("#owner_percentage").val('0');
    }
    if (!requiredValidation('new_owner_add_form')) {
        return false;
    }
    var formData = new FormData(document.getElementById('new_owner_add_form'));
    var section = $("#section").val();
    var from = $("#from").val();
    var company_id = $("#company_id").val();
    var company_type = $("#company_type").val();
    var office_id = $("#office_id").val();
    $.ajax({
        type: 'POST',
        url: base_url + 'client/save_new_owner_form',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // console.log(result);return false;
            if (result.trim() == 1) {
                if (section == 'add') {
                    swal({
                        title: "Success!",
                        text: "Owner Successfully Added!",
                        type: "success"
                    }, function () {
                        if (from == 'client') {
                            window.opener.loadWindow();
                            self.close();
                        } else {
                            var service_id_val = $("#service_id").val();
                            window.opener.reload_owner_list(company_id, "main", service_id_val, 'new_add_owner' , company_type , office_id);
                            if (service_id_val == 11) {
                                window.opener.reload_owner_list(company_id, "payroll", '', 'new_add_owner' , company_type , office_id);
                                window.opener.reload_owner_list(company_id, "payroll2", '', 'new_add_owner' , company_type , office_id);
                                window.opener.reload_owner_list(company_id, "payroll3", '', 'new_add_owner' , company_type , office_id);
                            }
                            window.opener.disable_company_type1();
                            self.close();
                        }
                        
                    });
                } else {
                    swal({
                        title: "Success!",
                        text: "Owner Successfully Updated!",
                        type: "success"
                    }, function () {
                        if (from == 'client') {
                            window.opener.loadWindow();
                            self.close();
                        } else {
                            var service_id_val = $("#service_id").val();
                            window.opener.reload_owner_list(company_id, "main", service_id_val, 'new_add_owner');
                            if (service_id_val == 11) {
                                window.opener.reload_owner_list(company_id, "payroll", '', 'new_add_owner');
                                window.opener.reload_owner_list(company_id, "payroll2", '', 'new_add_owner');
                                window.opener.reload_owner_list(company_id, "payroll3", '', 'new_add_owner');
                            }
                            window.opener.disable_company_type1();
                            self.close();
                        }
                    });
                }        
            } else if (result.trim() == 2) {
                swal("ERROR!", "Total share should be always 100%", "error");
            } else if (result.trim() == 0) {
                swal("ERROR!", "An error ocurred! \n Please, try again.", "error");
            } else if (result.trim() == 3) {
                swal("ERROR!", "This Client Already Exist", "error");
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

function loadWindow() {
    location.reload();
}

function delete_owner_from_client_view(owner_id , company_id) {
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

                    if (result == '2') {
                        swal("Deleted!", "Owner has been deleted Successfully.", "success");
                        window.location.reload();
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

function ownerContainerAjax(client_type , reference_id , office_id , company_id = '') {
    if (client_type != '') {
        $.ajax({
            type: 'POST',
            url: base_url + 'client/ownerContainerAjax',
            data: {
                client_type: client_type,
                reference_id: reference_id,
                office_id: office_id,
                company_id: company_id
            },
            enctype: 'multipart/form-data',
            cache: false,
            success: function(result) {
                // console.log(result);return false;
                if (result != '0') {
                    $('#owner_client_information').html(result);
                    if (client_type == 1) {
                        refresh_existing_individual_client_list_associative_client(office_id , '' , 1 , 'owner');
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
        $('#owner_client_information').html('');
    }
}

function save_owner_percentage() {
    if (!requiredValidation('add-percentage-form')) {
        return false;
    }
    var formData = new FormData(document.getElementById('add-percentage-form'));
    $.ajax({
        type: 'POST',
        url: base_url + 'client/save_owner_percentage',
        data: formData,
        enctype: 'multipart/form-data',
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            // console.log(result);return false;
            if (result.trim() == 1) {
                swal({
                    title: "Success!",
                    text: "Successfully Updated!",
                    type: "success"
                }, function () {
                    window.location.reload();
                });
            } else if (result.trim() == 2) {
                swal("ERROR!", "Total share should be always 100%", "error");
            } else if (result.trim() == 0) {
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


function view_azure_uploaded_files(brand='',franchise='',client_type='',client_id='',counter='',
    section='',section_id='',reference='',reference_sub_type='',viewid='') 
{
    var employeeinfoid = $("#employeeinfoid"+counter).val();
    if(employeeinfoid==='' || employeeinfoid=== undefined)
        {
            var employeeinfoid = '';
        }
    var post_data = { "brand":brand,'franchise':franchise,'client_type':client_type,'client_id':client_id,'counter':counter,'section':section,'section_id':section_id,
                'reference':reference,'reference_sub_type':reference_sub_type,'reference_sub_type_id':employeeinfoid,'viewid':viewid };
    post_data = JSON.stringify(post_data);
    //console.log(employeeinfoid); return false;
    $.ajax({
        type: "POST",
        data: post_data,
            url: base_url + "client/show_uploaded_document",
            contentType: "application/json",
            dataType: "json",
            async: true,        
            cache:false,
            success: function (result) {
                //console.log(result.all_data);
                var azuureoutput =[];
                if(result.distinct_data.length!=0)
                {
                    // console.log('demo');
                    azure_result =[];
                    all_data = JSON.stringify(result.all_data);
                    $.ajax({
                        type: 'POST',
                        url: base_url + 'action/Home/get_uploaded_files',
                        data: { file_details:azure_result, alldata :all_data ,brand:brand ,franchise:franchise , client_type:client_type , client_id:client_id, sharepoint_folder_name:null , viewid:viewid},
                        success: function (res) {
                            $("#"+viewid).append(res);     
                        },beforeSend: function () {
                            openLoading();
                        },
                        complete: function (msg) {
                            closeLoading();
                        }
                     });  
                }
                else
                {
                    //console.log(viewid);
                    var htmlres = '<tr><td class="text-center text-danger" colspan="9"><b>Does not contain any files</b></td></tr>';
                    $("#"+viewid).append(htmlres);
                }

                /*azure_result = JSON.stringify(azuureoutput);
                if(azure_result!='')
                    {
                        $.ajax({
                                type: 'POST',
                                url: base_url + 'action/Home/get_uploaded_files',
                                data: { file_details:azure_result },
                                success: function (res) {
                                //console.log(res);
                                //$("#"+viewid).show(); 
                                $("#"+viewid).append(res);     
                            }
                        });
                    }*/
                // file_list_url = atob(file_list_url);
            }
        });
}



function get_variables_by_document_type(brand='',franchise='',client_type='',client_id='',counter='') {
        //alert(counter); return false;
        if (!$('#folder-variables'+counter).is(':visible')) {
                $("#folder-variables"+counter).show();
            }
        if (brand != '' && franchise != '' && client_type != '' && client_id != '') {
                var folder_name = $("#document_type"+counter+" option:selected").text();
                folder_name = folder_name.trim();
                var selectedText = $(this).find("option:selected").text();
                selectedText = selectedText.trim();
                var client_data = { "brand":brand,'franchise':franchise,'client_type':client_type,'client_id':client_id };
                client_data = JSON.stringify(client_data);          
                $.ajax({
                    type: "POST",
                    data: {
                        folder_name: folder_name,document_type:selectedText,client_data:client_data ,counter:counter       
                    },
                    url: base_url + 'client/get_variables_folderwise',
                    dataType: "html",
                    success: function (result) {
                        //console.log("#folder-variables"+counter); 
                        $("#folder-variables"+counter).html(result);
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
// for sharepoint only (Guest User Invitation)
function invite_guest_user(user_email = '', first_name = '', last_name = '', phone = '',office='',brand='',client_type='',client_id='',practice_id='',brand_name='') {
     // var user_email = 'arpita.sysalgo@gmail.com';
    $.ajax({
        type: "POST",
        data: {
            email: user_email
        },
        url: base_url + "client/check_guest_staff_user",
        dataType: "html",
        success: function (result2) {
        // console.log(result2);
            if(result2 == 0){
    // alert(result2); 
    $.ajax({
        type: "POST",
        data: {"useremail": user_email,"brand":brand_name},
        url: "https://dev2.taxleaf.com:9099/api/AzApp/InviteUser",
        dataType: "html",
        success: function (result) {
//            console.log(result);
            var data = JSON.parse(result);
            var id = data.invitedUser.id;
            var msg = data.sendInvitationMessage;
            if (id != '') {
                $.ajax({
                    type: "POST",
                    data: {
                        email: user_email,
                        first_name: first_name,
                        last_name:last_name,
                        phone:phone,
                        office:office,
                        brand:brand,
                        client_type:client_type,
                        client_id:client_id,
                        practice_id:practice_id
                    },
                    url: base_url + "client/insert_guest_staff_user",
                    dataType: "html",
                    success: function (result1) {
                    console.log(result1);
                        if(result1 == 0){
                            swal("ERROR!", "Client  Already Exist.", "error");
                        }else{
                            swal("SUCCESS!", "Guest User Added Successfully", "success");
                        }
                    }
                });
            }
        }
    });
    }else{
        swal("ERROR!", "Client  Already Invited.", "error");
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
function get_common_folder_list(){
    if ($('#folder-variables').is(':visible')) {
        $("#folder-variables").hide();
    }
    var brand = $("#brand").val().trim();
    var franchise = $("#client_office").val().trim();
    var client_type = $("#client_type").val().trim();
    var client_id = $("#client_list_ddl_file_cabinet").val().trim();
    // console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id);
    if (brand != '' && franchise != '' && client_type != '' && client_id != '') {
        //console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id);   
        var client_data = { "brand":brand,'franchise':franchise,'client_type':client_type,'client_id':client_id };
        client_data = JSON.stringify(client_data);
        $.ajax({
            type: "POST",
            // url: "https://localhost:9099/Api/SharePoint/GetFolderList",
            url: "https://dev2.taxleaf.com:9099/Api/SharePoint/GetFolderList",
            async: true,
            data: client_data,
            contentType: "application/json",
            dataType: "json",        
            cache:false,
            success: function (result) {
                console.log(result);
                var arr = [];
                for (var i = 0; i < result.value.length; i++) {
                    var filter = result.value[i]['Name'].split('');
                    if(filter[0] != "_") {         
                        if (result.value[i]['Name'].trim() != 'images') {
                            if (result.value[i]['Name'].trim() != 'Lists') {
                                if (result.value[i]['Name'].trim() != 'SiteAssets') {
                                    if (result.value[i]['Name'].trim() != 'SitePages') {
                                        var key = result.value[i]['odata.id'];
                                        arr[key] = result.value[i]['Name']+'/'+result.value[i]['ItemCount'];
                                        // result.value[i]['ItemCount'];
                                        // console.log(result.value[i]['Name']);
                                    }
                                }
                            }    
                        }    
                    } 
                }            
                obejct_val = Object.assign({}, arr);
                for (const property in obejct_val) {
                    $('#document_type').append(`<option value="${property}">${obejct_val[property].split('/')[0]}</option>`).trigger("chosen:updated");
                }
            }, 
            error:function(jqXHR) {
                $('#document_type').empty().trigger("chosen:updated");
                $('#document_type').append(`<option value="">Select an option</option>`).trigger("chosen:updated");
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
}
function get_common_document_details(){

            if (!$('#folder-variables').is(':visible')) {
                $("#folder-variables").show();
            }
            var brand = $("#brand").val().trim();
            var franchise = $("#client_office").val().trim();
            var client_type = $("#client_type").val().trim();
            var client_id = $("#client_list_ddl_file_cabinet").val().trim();
            // console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id);
            if (brand != '' && franchise != '' && client_type != '' && client_id != '') {
                var folder_name = $("#document_type option:selected").text();
                folder_name = folder_name.trim();
                var selectedText = $(this).find("option:selected").text();
                selectedText = selectedText.trim();
                var client_data = { "brand":brand,'franchise':franchise,'client_type':client_type,'client_id':client_id };
                client_data = JSON.stringify(client_data);          
                $.ajax({
                    type: "POST",
                    data: {
                        folder_name: folder_name,
                        document_type:selectedText,
                        client_data:client_data,
                        section: 'file_cabinet'        
                    },
                    url: base_url + 'client/get_variables_folderwise',
                    dataType: "html",
                    success: function (result) {
                        $("#folder-variables").html(result);
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
/*function upload_file_from_common_section() {
    if (!requiredValidation('file-cabinet-form')) {
        return false;
    }
    var form_data = new FormData(document.getElementById('file-cabinet-form'));
    
    var brand = $("#brand").val().trim();
    var franchise = $("#client_office").val().trim();
    var client_type = $("#client_type").val().trim();
    var client_id = $("#client_list_ddl_file_cabinet").val().trim();
    var folder_name = $("#document_type option:selected").text();
    
    var document_sub_type = $("#document_sub_type option:selected").text();
    if (document_sub_type !== undefined) {
        document_sub_type_text = document_sub_type.replace(/ /g,"_").toLowerCase().trim();
    }
    var staff_id = $("#staff_id").val();
    var document_name = $("#doc_file").val().replace(/C:\\fakepath\\/i, '');

    if (folder_name !== undefined) {
        folder_name = folder_name.trim();
        folder_name_lower_case = folder_name.replace(/ /g,"_").toLowerCase();
    }
    var file_list_url = $("#document_type option:selected").val();
    if (file_list_url !== undefined) {
        file_list_url = file_list_url.trim();
    }
    // console.log(folder_name_lower_case);
    var arrival_date = $("#arrival_date").val();
    var priority = $("#prioritydiv").val();
    var priority_text = $("#prioritydiv").text();
    var government_agency = $("#government_agencydiv option:selected").val();
    var government_agency_text = $("#government_agencydiv option:selected").text();
    var state = $("#statediv").val();
    var state_text = $("#statediv").text();
    var frequency = $("#frequencydiv option:selected").val();
    var frequency_text = $("#frequencydiv option:selected").text();
    var period = $("#perioddiv option:selected").val();
    var period_text = $("#perioddiv option:selected").text();
    var year = $("#yeardiv option:selected").val();
    var year_text = $("#yeardiv option:selected").text();
    var bank_name = $("#bank_namediv option:selected").val();
    var bank_name_text = $("#bank_namediv option:selected").text();
    var account_last_4 = $("#account_last_4").val();
    var description = $("#description").val();
    var name = $("#name").val();
    var api_data = '',file_name = '',statement = '';
    if (folder_name_lower_case == 'bank_statements') {
        if (document_sub_type_text == 'bank_statements') {
            statement = 'Statement';
        } else {
            statement = 'Letter';
        }
        file_name = statement+'-'+bank_name_text.trim().replace(/ /g,"_")+'-'+account_last_4.trim().replace(/ /g,"_")+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':document_sub_type,'Modified_x0020_By':staff_id,'FrequencyId':frequency.trim(),'YearId':year.trim(),'Bank_x0020_NameId':bank_name.trim(),'PeriodId':period.trim(),'Account_x0020_Last_x0020_4':account_last_4.trim()};
    } else if (folder_name_lower_case == 'billing_information') {
        if (document_sub_type_text == 'invoice') {
            statement = 'Invoice';
        } else if (document_sub_type_text == 'payments') {
            statement = 'Payment';
        } else if (document_sub_type_text == 'proposal') {
            statement = 'Proposal';
        } else {
            statement = 'Collection_Notice';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':document_sub_type,'Modified_x0020_By':staff_id,'FrequencyId':frequency.trim(),'YearId':year.trim(),'PeriodId':period.trim()};
    } else if (folder_name_lower_case == 'government_correspondence') {
        file_name = document_name.trim()+'-'+government_agency_text.trim()+'-'+state.trim()+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Government_x0020_AgencyId':government_agency.trim(),'StateId':state.trim(),'FrequencyId':frequency.trim(),'YearId':year.trim(),'PeriodId':period.trim()};
    } else if (folder_name_lower_case == 'mailing_correspondance') {
        file_name = document_name.trim()+'-'+priority_text.trim()+'-'+arrival_date;
        api_data = {'__metadata':{'type':'SP.ListItem'},'PriorityId':priority.trim(),'Arrival_x0020_Date':arrival_date};
    } else if (folder_name_lower_case == 'bookkeeping_documents') {
        if(document_sub_type_text.trim() == 'profit_&_loss'){
            statement = 'ProfitLoss';
        } else if(document_sub_type_text.trim() == 'balance_sheet'){
            statement = 'BalanceSheet';
        } else if(document_sub_type_text.trim() == 'general_ledger'){
            statement = 'Ledger';
        } else{
            statement = 'Balance';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Document_x0020_Type':statement,'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'sales_tax_documents') {
        
        if(document_sub_type_text.trim() == 'sales_tax_certificate'){
            statement = 'Certificate';
        } else if(document_sub_type_text.trim() == 'sales_tax_processing'){
            statement = 'Processing';
        } else if(document_sub_type_text.trim() == 'receipt'){
            statement = 'Receipt';
        } else{
            statement = 'Form';
        }
        if(document_sub_type_text.trim() == 'sales_tax_certificate'){
            file_name = statement+'-'+year_text.trim().replace(/ /g,"_");
        }else{
            file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        }
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'internal_documents'){
        if(document_sub_type_text.trim() == 'internal_communication'){
            statement = 'Internal';
        } else{
            statement = 'Personal';
        }
        file_name = statement+'-'+description.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Description':description.trim()};
    } else if(folder_name_lower_case == 'tax_return_documents'){
        if(document_sub_type_text == 'federal_tax_return'){
            statement = 'FederalReturn';
        } else if(document_sub_type_text == 'state_tax_return'){
            statement = 'StateReturn';
        } else if(document_sub_type_text == 'k-1'){
            statement = 'K1';
        } else{
            statement = 'PaymentNotice';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'StateId':state.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'corporate_documents'){
        if(document_sub_type_text == 'incorporate_documents'){
            statement = 'Incorporation';
        } else if(document_sub_type_text == 'ownership_documents'){
            statement = 'Ownership';
        } else if(document_sub_type_text == 'annual_renewals'){
            statement = 'AnnualReport';
        } else{
            statement = 'OwnershipId';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_");
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'payroll_information'){
        if(document_sub_type_text == 'paystub'){
            statement = 'Paystub';
        } else if(document_sub_type_text == 'w2'){
            statement = 'W2';
        } else if(document_sub_type_text == 'w3'){
            statement = 'W3';
        } else if(document_sub_type_text == 'w4'){
            statement = 'W4';
        } else if(document_sub_type_text == '1099'){
            statement = '1099';
        } else if(document_sub_type_text == '1096'){
            statement = '1096';
        } else if(document_sub_type_text == '940'){
            statement = '940';
        } else if(document_sub_type_text == '941'){
            statement = '941';
        } else if(document_sub_type_text == '944'){
            statement = '944';
        }else {
            statement = 'Unemployment';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_")+'-'+state.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'StateId':state.trim(),'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else if(folder_name_lower_case == 'employee_information'){
         if(document_sub_type_text == 'paystub'){
            statement = 'Paystub';
        } else if(document_sub_type_text == 'identification'){
            statement = 'ID';
        } else if(document_sub_type_text == 'w4'){
            statement = 'W4';
        } else if(document_sub_type_text == '1099'){
            statement = '1099';
        } else if(document_sub_type_text == 'i-9'){
            statement = 'I9';
        } else if(document_sub_type_text == 'employee_contract'){
            statement = 'Contract';
        } else if(document_sub_type_text == 'termination_letter'){
            statement = 'Termination';
        } else {
            statement = 'NonComplete';
        }
        file_name = statement+'-'+frequency_text.trim()+'-'+period_text.trim().replace(/ /g,"_")+'-'+year_text.trim().replace(/ /g,"_")+'-'+name.trim();
        api_data = {'__metadata':{'type':'SP.ListItem'},'Modified_x0020_By':staff_id,'Document_x0020_Type':statement,'Employee_x0020_Name':name.trim(),'FrequencyId':frequency.trim(),'PeriodId':period.trim(),'YearId':year.trim()};
    } else {
        
    }
    // console.log(api_data);return false;
    // console.log(client_info);
    api_data = JSON.stringify(api_data);
    //console.log(brand+'/'+franchise+'/'+client_type+'/'+client_id+'/'+folder_name+'/'+file_list_url+'/'+file_name+'/'+api_data);
    var client_info = {"brand":brand,"franchise":franchise,"client_type":client_type,"client_id":client_id,"file_list_url":file_list_url,"folder_name":folder_name,"file_name":file_name,"api_data":api_data };
    client_info = JSON.stringify(client_info);
    //console.log(client_info);return false;
    form_data.append('client_info',client_info);
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
        success: function (result) {
            //console.log(result);
            if (result == -1) {
                alert("Error Processing Data");
            } else {
                swal({
                    title: "Success!",
                    text: "File Uploaded Successfully!",
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
}*/
