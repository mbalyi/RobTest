function requestObjects(options, callback){
    $.ajax({ url: "/object",
        data: options,
        dataType: "json",
        type: "get",
        success: callback
    });
}


function GenerateObjectTable(data){
    var html = "";

    data.forEach(function(object){
        html +="<a href='#'><span id=''>"+ object[0] +"</span></a><br />";
    });

    // Generation
    return html;
}

$(function(){
    

});