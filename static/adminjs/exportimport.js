function requestExportImport(event){
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
    $.get("/exportSetToPDF/"+id+"/"+$(event.target).attr("data-templateid"),function(data,status){
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
    $.get("/exportCaseToPDF/"+id+"/"+$(event.target).attr("data-templateid"),function(data,status){
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
    $.get("/exportResultToPDF/"+id+"/"+$(event.target).attr("data-templateid"),function(data,status){
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

var webType=['html','htm', 'HTML', 'HTM'];
function uploadTemplate(){
    $("#insertcircleTemplatesUpload").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    for(i=0;i<document.getElementById("templateToUpload").files.length;i++){
        var fileName = document.getElementById("templateToUpload").files[i].name;
        var extension = fileName.split('.').pop().toLowerCase();
        var isSuccess = webType.indexOf(extension) > -1;
        var file = document.getElementById("templateToUpload").files[i];
        var reader = new FileReader();
        if(isSuccess)
            reader.readAsText(file, 'UTF-8');
        data=[document.getElementById("templateToUpload").files[i].name]
        reader.onload = shipOffTemplate.bind(null,data);
    }
}

function shipOffTemplate(data,event){
    var result=event.target.result;
    var fileName = data[0];
    $.post("/upload_file_test/1/templates",{ name: fileName, context: result },function(datas,status){
        $(".pdfTemplates").empty().append(datas);
        $("#insertcircleTemplatesUpload").empty();
    }).fail(function() {
    alert( "error" );
    $("#insertcircleTemplatesUpload").empty();
  });
}

function deleteTemplateDownload(id){
    $("#insertcircleTemplates").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    $.get("/deleteFiles/"+id+"/templates",function(data,status){
        if(status){
            $("[data-templateid="+id+"]").remove();
            $("#insertcircleTemplates").empty();
        }
    });
}

function deleteAllTemplates(){
    $("#insertcircleTemplates").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
    $.get("/deleteAllTemplates",function(data,status){
        $(".pdfTemplates").empty().append(data); 
        $("#insertcircleTemplates").empty();
    });
}

function refreshAllFiles(){
    $(".glyphicon.glyphicon-refresh").attr("id","circlebar");
    $.get("/downloadFiles",function(data,status){
        $("#downloadFiles").empty().append(data);
        $(".glyphicon.glyphicon-refresh").removeAttr("id");
    });
}

function saveEmail(){
    var D = 0;
    var W = 0;
    var U = 0;
    if ($("input[name=D]:checked")[0] != undefined){
        D = 1;
    }
    if ($("input[name=W]:checked")[0] != undefined){
        W = 1;
    }
    if ($("input[name=U]:checked")[0] != undefined){
        U = 1;
    }
    var sendData = "name="+$('input#emailName').val()+"&user="+$('select#userSelector').find(":selected").attr('data-dbid').toString()+"&D="+D.toString()+"&W="+W.toString()+"&U="+U.toString();
    $.post("/saveEmail", sendData,
		function(data,status){
			if(status){
                $('.emailContainer').empty().append(data);
			};
		}
	); 
}

function deleteEmail(emailId){
    $.get("/deleteEmail/"+emailId,function(data,status){
        $('tr[data-emailid='+emailId+']').remove();
    });
}

function setEmailConfig(){
    var data = "email="+$("input#emailSender").val()+"&smtp="+$("input#SMTP").val()+"&port="+$("input#port").val()
    $.post("/updateEmailConfig",data);
}

function sendEmail(type,obid){
    $.get("/sendEmail/"+type+"/"+obid,function(data,status){
        if(data=="ok"){
            $("#emailSent").show(5000);
            setTimeout(function() 
              {
                $("#emailSent").hide()
              }, 5000);
        }
        else{
            $("#emailNotSent").show(5000);
            setTimeout(function() 
              {
                $("#emailNotSent").hide()
              }, 5000);
        }
    }).fail(function() {
        $("#emailNotSent").show();
        setTimeout(function() 
          {
            $("#emailNotSent").hide()
          }, 5000);
    });
}