var historyFormCount = 1;

function histoyPage(){
    document.getElementById("col-md-9").style.width = '70%';
    $(".col-md-9").empty();
    $("#mainHeader").css('margin-bottom','5px');
    $(".setup_buttons").hide();
    $(".col-md-12-set").empty();
    $(".col-md-12-case").empty();
    $(".col-md-12-execution").empty();
    $(".col-md-12-object").empty();
    $(".setup").show();
    executionHistLoad();
    historyForm("first");
}

function historyForm(loadingStatus){
    $.get("/HistoryForm",function(data,status){
        if(status){
            $(".col-md-9").empty().append(data);
            if(loadingStatus=="first"){
                loadHistoryExe(loadingStatus);
            }
        }
    });
}

function executionHistLoad(){
    $.get("/historyExe",function(data,status){
        if(status){
            $(".col-md-12-execution").empty().append(data);
        }
    });
}

function loadHistoryExe(exeStatus,executionId){
    if(exeStatus == "first")
        exeId=$($(".historyNav").children().children()[1]).attr('id');
    else
        exeId=executionId;
    $.get("/loadHistoryExe/"+exeId+"/"+exeStatus,function(data,status){
        if(status){
            if(exeStatus == "first" || exeStatus == "new"){
                $(".executionTable").empty().append(data);
                $(".executionInHistory").css("width","100%");
                historyFormCount = 1;
            }
            else{
                $(".executionTable").append(data);
                if(historyFormCount/3 == 1)
                    $(".executionInHistory").css("width","33%");
                if(historyFormCount/3 < 0.45)
                    $(".executionInHistory").css("width","100%");
                if(historyFormCount/3 > 0.6 && historyFormCount/3 < 0.9)
                    $(".executionInHistory").css("width","50%");
            }
        }
    });
}
var ids=[];
function selectMoreExe(){
    if (historyFormCount != 3 || ids.indexOf($(event.target).attr('data-dbid')) > -1){
        historyFormCount++;
        id=$(event.target).attr('data-dbid');
        ids.push(id);
        $('#'+id+'.exeInHistory').css("background-color","#eee");
        loadHistoryExe("else",id);
    }
}

function closeHistoryForm(exeId){
    $(".executionInHistory[data-dbid='"+exeId+"']").remove();
    historyFormCount--;
    if(historyFormCount/3 < 0.45)
        $(".executionInHistory").css("width","100%");
    if(historyFormCount/3 > 0.6 && historyFormCount/3 < 0.9)
        $(".executionInHistory").css("width","50%");
    var index = ids.indexOf(exeId);
    if (index > -1) {
        ids.splice(index, 1);
    }
    $('#'+exeId+'.exeInHistory').css("background-color","#333");
}

function toggleStatus(status){
    if(status=="RUN"){
        $(".success.resultRow").slideToggle();
    }
    if(status=="FAILED"){
        $(".danger.resultRow").slideToggle();
    }
    if(status=="SKIPPED"){
        $(".warning.resultRow").slideToggle();
    }
    if(status=="NOTRUN"){
        $(".active.resultRow").slideToggle();
    }
    if(status=="NOTIMP"){
        $(".info.resultRow").slideToggle();
    }
}

function historyReload(){
    exeid=$("select[data-selectorid='execution']").find(":selected").attr("data-dbid");
    loadHistoryExe("new",exeid);
}