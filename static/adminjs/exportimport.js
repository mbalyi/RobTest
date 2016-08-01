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
function exportExeOpen(event){
    $.get("/loadExportForm/exe/"+$(event.target).attr('data-exeid'),function(data,status){
       $("#exeExportHeader").empty().append(data); 
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

function exeDownloadDoc(event){
    $("#insertcircleExe").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    id=$(event.target).attr("data-exeid");
    $.get("/exportResultToWord/"+id,function(data,status){
        $("#downloadExe[data-exeid='"+id+"']").removeAttr("disabled");
        $("#downloadExe[data-exeid='"+id+"']").attr("href",data);
        $("#downloadExe[data-exeid='"+id+"']").attr("download","");
        $("#insertcircleExe").empty();
    });
}

function exeDownloadPDF(id){
    $("#insertcircleExe").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    id=$(event.target).attr("data-exeid");
    $.get("/exportResultToPDF/"+id,function(data,status){
        $("#downloadExe[data-exeid='"+id+"']").removeAttr("disabled");
        $("#downloadExe[data-exeid='"+id+"']").attr("href",data);
        $("#downloadExe[data-exeid='"+id+"']").attr("download","");
        $("#insertcircleExe").empty();
    });
}

function exeDownloadXlsx(id){
    $("#insertcircleExe").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    id=$(event.target).attr("data-exeid");
    $.get("/exportResultToXLSX/"+id,function(data,status){
        $("#downloadExe[data-exeid='"+id+"']").removeAttr("disabled");
        $("#downloadExe[data-exeid='"+id+"']").attr("href",data);
        $("#downloadExe[data-exeid='"+id+"']").attr("download","");
        $("#insertcircleExe").empty();
    });
}

function exeSearchExport(){
    for (i=0; i < $(".exeResult").length;i++){
        var search=$("input[name=exeSearchExport]").val();
        if($(".exeResult")[i].innerHTML.toLowerCase().indexOf(search.toLowerCase()) >= 0){
            var classFilt= $($(".exeResult")[i]).attr("data-exeid");
            $(".exeResult[data-exeid="+classFilt.toString()+"]").parent().parent().show();
        }
        else{
           var classFilt= $($(".exeResult")[i]).attr("data-exeid");
            $(".exeResult[data-exeid="+classFilt.toString()+"]").parent().parent().hide();
        }
        if (search == ""){
            for (i=0; i < $(".exeResult").length;i++){
                var classFilt= $($(".exeResult")[i]).attr("data-exeid");
                $(".exeResult[data-exeid="+classFilt.toString()+"]").parent().parent().show();
            }
        }
    }
}

function setSearchExport(){
    for (i=0; i < $(".setExport").length;i++){
        var search=$("input[name=setSearchExport]").val();
        if($(".setExport")[i].innerHTML.toLowerCase().indexOf(search.toLowerCase()) >= 0){
            var classFilt= $($(".setExport")[i]).attr("data-setid");
            $(".setExport[data-setid="+classFilt.toString()+"]").parent().parent().show();
        }
        else{
           var classFilt= $($(".setExport")[i]).attr("data-setid");
            $(".setExport[data-setid="+classFilt.toString()+"]").parent().parent().hide();
        }
        if (search == ""){
            for (i=0; i < $(".setExport").length;i++){
                var classFilt= $($(".setExport")[i]).attr("data-setid");
                $(".setExport[data-setid="+classFilt.toString()+"]").parent().parent().show();
            }
        }
    }
}

function caseSearchExport(){
    for (i=0; i < $(".caseExport").length;i++){
        var search=$("input[name=caseSearchExport]").val();
        if($(".caseExport")[i].innerHTML.toLowerCase().indexOf(search.toLowerCase()) >= 0){
            var classFilt= $($(".caseExport")[i]).attr("data-caseid");
            $(".caseExport[data-caseid="+classFilt.toString()+"]").parent().parent().show();
        }
        else{
           var classFilt= $($(".caseExport")[i]).attr("data-caseid");
            $(".caseExport[data-caseid="+classFilt.toString()+"]").parent().parent().hide();
        }
        if (search == ""){
            for (i=0; i < $(".caseExport").length;i++){
                var classFilt= $($(".caseExport")[i]).attr("data-caseid");
                $(".caseExport[data-caseid="+classFilt.toString()+"]").parent().parent().show();
            }
        }
    }
}

function selectTable(){
    $("#insertcircleDB").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    $.get("/tableData/"+$(".tableSelector").find(":selected").attr("data-tablename"),function(data,status){
       if(status){
           $("#tableData").attr("download","");
           $("#tableData").attr("href",data);
           $("#tableData").empty().append("Download link for "+ $(".tableSelector").find(":selected").attr("data-tablename")+" values.");
           $("#insertcircleDB").empty();
       } 
    });
}

function selectSchema(){
    $("#insertcircleDB").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    $.get("/tableSchema/"+$(".tableSelector").find(":selected").attr("data-tablename"),function(data,status){
       if(status){
           $("#tableSchema").attr("download","");
           $("#tableSchema").attr("href",data);
           $("#tableSchema").empty().append("Download link for "+ $(".tableSelector").find(":selected").attr("data-tablename") +" schema.");
           $("#insertcircleDB").empty();
       } 
    });
}

function deleteFileDownload(event){
    $("#insertcircleDB").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    id=$(event.target).parent().attr("data-dbid");
    $.get("/deleteFileDownload/"+id,function(data,status){
       $("#deleteFileDownload").empty().append(data); 
        $("#insertcircleDB").empty();
    });
}

function deleteAllFiles(){
    $("#insertcircleDB").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    $.get("/deleteAllFilesDownload",function(data,status){
        $("#deleteFileDownload").empty().append(data); 
        $("#insertcircleDB").empty();
    });
}