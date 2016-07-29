function requestExportImport(){
     $.get("/getAdminNav",
         function(data,status){
            $("#nav-col-md-9").empty().append(data);
    });
    $.get("/getExportImport",function(data,status){
        if(status){
            $("#nav-test-col-md-9").empty().append(data);
        }
    });
}

function exportImportTab(e){
    //e.preventDefault();
    $(this).tab('show');
}
