function requestDashboard(options, callback){
    $.ajax({ url: "/getReports",
        data: options,
        type: "get",
        success: callback
    });
}
var user;
function getUser(){
	$.get("/getUser",
		function(data){
			//$("#user").empty().append(data);
			user=data;
		},
		"json"
	)
}

function addButtons(){
	$(".setup_buttons").empty().append(button);
    $("#save").attr("disabled","disabled");
}

function addAdminButtons(){
	$(".setup_buttons").empty().append(adminButton);
}

function currentDate(){
	var d = new Date();
	year = d.getFullYear();
	month = d.getMonth();
	month+=1;
	day = d.getDate()
	if(month < 10)
		fullDate=year+"-0"+month+"-"+day;
	else
		fullDate=year+"-"+month+"-"+day;
	//$("#date").empty().append(fullDate);
	return fullDate;
}

function save_report(){
	$.post("/save_report", $("input").serialize()+"&"+$("textarea").serialize(),
		function(data,status){
			if(status){
				$("#nav-report-col-md-9").empty().append(data);
                $(".text_area").hide();
			};
		}
	);
}

function saveEditedRecord(id){
	$.post("/save_edited_record/"+id, $("input").serialize()+"&"+$("textarea").serialize(),
		function(data,status){
			if(status){
				$("#nav-report-col-md-9").empty().append(data)
				$(".text_area").hide();
				$("#"+id+".text_area").show();
			};
		}
	);
}

function getReporttoEdit(id,event){
	$.get("/getReporttoEdit/"+id,
		function(data,status){
			$(event.closest('.panel')).empty().append(data);
			$("#save").removeAttr("disabled");
            $("#new").attr("disabled","disabled");
		});
}

function getReporttoLoad(id){
	$.post("/getReporttoLoad",id,
		function(data,status){
			$("#nav-report-col-md-9").empty().append(data);
			$(".text_area").hide();
		}
	)
}


function loadSearchForm(){
	$.get("/loadSearchForm",
		function(data,status){
			$(".search_form_place").empty().append(data);
		}
	)
}

$(function(){
	//addButtons();
	getUser();
	currentDate();
	iterator=0;
	jira_iterator=0;
	
	loadSearchForm();
	
	$("body").on("click","a",function(event){
		if( event.target.id == "new"){
			$(".timeline").prepend(newReportBlog1+user+newReportBlog2);
			$("#save").removeAttr("disabled");
            $("#new").attr("disabled","disabled");
			$(".insert_jira_button").empty().append(Jira);
			//$("#user").append(getUser());
			//$("#date").append(currentDate());
		}
		if($(event.target).attr('class')=="edit_report"){
            getReporttoEdit(event.target.id,event.target);
		}
		if( event.target.id == "cancel"){
            if($($("[data-saveid]")[0]).attr('data-reportblogid') != undefined){
                if($("#save").attr('disabled') == undefined){
                    $($(".timeline")[0]).children()[0].remove()
                }
                $("#new").removeAttr("disabled");
                $("#save").attr("disabled","disabled");
                $(".insert_jira_button").empty();
            }
            else{
                recordid=$($("[data-saveid]")[0]).attr('data-reportblogid');
                getReporttoLoad(recordid);
            }
		}
		if( event.target.id == "save"){
            if($($("[data-saveid]")[0]).attr('data-reportblogid') == undefined){
                save_report();
                $("#new").removeAttr("disabled");
                $("#save").attr("disabled","disabled");
                $(".text_area").hide();
            }
            else{
                recordid=$($("[data-saveid]")[0]).attr('data-reportblogid');
                saveEditedRecord(recordid);
                $("#new").removeAttr("disabled");
                $("#save").attr("disabled","disabled");
            }
			
		}
		if( event.target.id == "showall"){
			$(".text_area").show();
		}
		if( event.target.id == "hideall"){
			$(".text_area").hide();
		}
		if($(event.target).attr('class')=="glyphicon glyphicon-chevron-down"){
			$("#"+event.target.id+".text_area").show();
			return false;
		}
		if($(event.target).attr('class')=="glyphicon glyphicon-chevron-up"){
			$("#"+event.target.id+".text_area").hide();
			return false;
		}
		if( event.target.id == "jira"){
			$(".col-md-3").empty().append(jForm);
			$(".wrapJira").empty().append(JiraForm2+jira_iterator+JiraForm3+jira_iterator+JiraForm4);
			jira_iterator++;
		}
		if( event.target.id == "cancel_id"){
			recordid=$(event.target).attr('name');
			getReporttoLoad(recordid);
			$(".insert_save_button").empty().append(SaveDis);
			$(".col-md-3").empty();
		}
		if( event.target.id == "save_id"){
			recordid=$(event.target).attr('name');
			saveEditedRecord(recordid);
			$(".insert_save_button").empty().append(SaveDis);
		}
		if($(event.target).attr('name')=="savePw"){
			ID=event.target.id;
			updatePw(ID);
		}
		if($(event.target).attr('name')=="add_new_jira"){
			$(".wrapJira").append(JiraForm2+jira_iterator+JiraForm3+jira_iterator+JiraForm4);
			id=jira_iterator-1;
			$(".glyphicon"+".glyphicon-plus-sign"+"#"+id).hide()
			jira_iterator++;
			return false;
		}
		if( event.target.id == "search_btn"){
			$(".search_form_place").slideToggle();
		}
	})
	$(".text_area").hide()
	$(".search_form_place").hide();
});