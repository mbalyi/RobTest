var ids=[]

function reportGeneratorPage(){
    $("#nav-col-md-9").empty().append(designNavbar);
    $(".setup_buttons").hide();
    $(".col-md-12-set").empty().hide();
    $(".col-md-12-case").empty().hide();
    $(".col-md-12-execution").empty().show();
    $(".col-md-12-object").empty().hide();
    $(".setup").show();
    generatorForm();
    executionHistLoad("report");
    ids=[];
}

function generatorForm(){
    $.get("/generatorForm",function(data,status){
        if(status){
            $("#nav-design-col-md-9").empty().append(data);
        }
    });
}

function reportTab(){
    $(this).tab('show');
    ids=[];
}

function selectMoreExeToReport(){
    var id=$(event.target).attr('data-dbid');
    if (ids.indexOf($(event.target).attr('data-dbid')) == -1){
        ids.push(id);
        $('#'+id+'.exeInHistory').css("background-color","#eee");
        getResultGen(id);
    }
    else{
        var index = ids.indexOf(id);
        if (index > -1) {
            ids.splice(index, 1);
            $(".selectedExeResult[data-exeId="+id+"]").closest("div").remove();
        }
        $('#'+id+'.exeInHistory').css("background-color","transparent");
    }
}

function getResultGen(id){
    $.get("/getExeResultToGen/"+id,function(data,status){
        if(status){
            $("#selectedResultToReport").append(data);
        }
    });
}
function generateReportXLSX(){
    if($("input[name=filename]").val() != ""){
        $("#filenameError").attr("class","form-group");
        $("#insertcirclegen").empty().append("<span id='circlebar' class='glyphicon glyphicon-repeat'></span>");
        var sendData = "exeIds[]="+$("#selectedResultToReport a").map(function(index,node){return node.dataset.exeid;}).toArray().join("&exeIds[]=");
        sendData = sendData + "&filename=" + $("input[name=filename]").val();
        sendData = sendData + "&" + $("input:checkbox:checked[name=areaBox]").map(function(){return "areaBox="+$(this).attr('data-dbid')}).toArray().join("&");
        sendData = sendData + "&" + $("input:checkbox:checked[name=variableBox]").map(function(){return "variableBox="+$(this).attr('data-dbid')}).toArray().join("&");
        $.post("/advancedReportExportXLSX",sendData,function(data,status){
            if(status){
                $("#downloadGenReportAdv")[0].innerHTML="Download "+$("input[name=filename]").val()+".xlsx";
                $("#downloadGenReportAdv").removeAttr("disabled");
                $("#downloadGenReportAdv").attr("href",data);
                $("#downloadGenReportAdv").attr("download","");
                $("#insertcirclegen").empty();
            }
        });
    }
    else{
        $("#filenameError").attr("class","form-group has-error");
    }
}