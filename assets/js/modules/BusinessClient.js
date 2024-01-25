/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function saveBusinessClient(){
    var formData = new FormData(document.getElementById('form_business_client'));
    formData.append('action', 'saveBusinessClient');
    $.ajax({
        type:'POST',
        url: "business_client_ajax.php",
        data:formData,
        enctype: 'multipart/form-data',
        cache:false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log("Result: "+result);
            if (result != 0) {
                if (document.getElementById('action').value == "add"){
                    goURL("business_client_address.php?id="+result);
                }else{
                    swal("Success!", "Successfully saved.", "success");
                }
            } else {
                swal("ERRO!", "Ocorreu um erro ao processar a operação! \n Por favor, tente novamente.", "error");
            }
        },
        beforeSend: function () { openLoading(); },
        complete: function (msg) { closeLoading(); }
    });
}

function saveBusinessClientAddress(){
    var formData = new FormData(document.getElementById('form_business_client_address'));
    $.ajax({
        type:'POST',
        url: "business_client_ajax.php",
        data:formData,
        enctype: 'multipart/form-data',
        cache:false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log("Result: "+result);
            if (result != 0) {
                swal("Success!", "Successfully saved.", "success");
            } else {
                swal("ERRO!", "Ocorreu um erro ao processar a operação! \n Por favor, tente novamente.", "error");
            }
        },
        beforeSend: function () { openLoading(); },
        complete: function (msg) { closeLoading(); }
    });
}

function copyAddress(copy_from){
    if (copy_from > 0){
        document.getElementById('form-fields-address').style.display = "none";
    }else{
        document.getElementById('form-fields-address').style.display = "block";
    }
}
