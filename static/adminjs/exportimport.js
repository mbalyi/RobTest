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


function exportSetOpen(event){
    $.get("/loadExportForm/set/"+$(event.target).attr('data-setid'),function(data,status){
       $("#caseSetExportHeader").empty().append(data); 
    });
    
}
function exportCaseOpen(event){
    $.get("/loadExportForm/case/"+$(event.target).attr('data-caseid'),function(data,status){
       $("#caseSetExportHeader").empty().append(data); 
    });
    
}

function setDownloadPDF(id){
    $("#insertcircle").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    id=$(event.target).attr("data-setid");
    $.get("/exportSetToPDF/"+id,function(data,status){
        $("#downloadSet[data-setid='"+id+"']").removeAttr("disabled");
        $("#downloadSet[data-setid='"+id+"']").attr("href",data);
        $("#downloadSet[data-setid='"+id+"']").attr("download","");
        $("#insertcircle").empty();
    });
}
function setDownloadDoc(event){
    $("#insertcircle").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    id=$(event.target).attr("data-setid");
    $.get("/exportSetToWord/"+id,function(data,status){
        $("#downloadSet[data-setid='"+id+"']").removeAttr("disabled");
        $("#downloadSet[data-setid='"+id+"']").attr("href",data);
        $("#downloadSet[data-setid='"+id+"']").attr("download","");
        $("#insertcircle").empty();
    });
}

function caseDownloadDoc(event){
    $("#insertcircle").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    id=$(event.target).attr("data-caseid");
    $.get("/exportCaseToWord/"+id,function(data,status){
        $("#downloadCase[data-caseid='"+id+"']").removeAttr("disabled");
        $("#downloadCase[data-caseid='"+id+"']").attr("href",data);
        $("#downloadCase[data-caseid='"+id+"']").attr("download","");
        $("#insertcircle").empty();
    });
}

function caseDownloadPDF(id){
    $("#insertcircle").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    id=$(event.target).attr("data-caseid");
    $.get("/exportCaseToPDF/"+id,function(data,status){
        $("#downloadCase[data-caseid='"+id+"']").removeAttr("disabled");
        $("#downloadCase[data-caseid='"+id+"']").attr("href",data);
        $("#downloadCase[data-caseid='"+id+"']").attr("download","");
        $("#insertcircle").empty();
    });
}

function caseDownloadXlsx(id){
    $("#insertcircle").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    id=$(event.target).attr("data-caseid");
    $.get("/exportCaseToXLSX/"+id,function(data,status){
        $("#downloadCase[data-caseid='"+id+"']").removeAttr("disabled");
        $("#downloadCase[data-caseid='"+id+"']").attr("href",data);
        $("#downloadCase[data-caseid='"+id+"']").attr("download","");
        $("#insertcircle").empty();
    });
}