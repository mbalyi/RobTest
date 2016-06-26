function requestAdmin(options, callback){
    $.ajax({ url: "/getUsers",
        data: options,
        type: "get",
        success: callback
    });
}

function requestDashboard(options, callback){
    $.ajax({ url: "/getReports",
        data: options,
        type: "get",
        success: callback
    });
}

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
				$(".col-md-9").empty().append(data)
			};
		}
	);
}

function saveEditedRecord(id){
	$.post("/save_edited_record/"+id, $("input").serialize()+"&"+$("textarea").serialize(),
		function(data,status){
			if(status){
				$(".col-md-9").empty().append(data)
				$(".text_area").hide();
				$("#"+id+".text_area").show();
				$(".insert_cancel_button").empty().append(Cancelbtn);
				$(".col-md-9").prepend(newform);
			};
		}
	);
}

function getReporttoEdit(id){
	$.get("/getReporttoEdit/"+id,
		function(data,status){
			$(".wrap"+"#"+id).empty().append(newReport+data[1]+newReport1+data[2]+newReport2+data[3]+newReport3+data[4]+newReport5+newReport6);
			$(".insert_save_button").empty().append(SaveID+data[0]+SaveID2);
			$(".insert_cancel_button").empty().append(CancelID+data[0]+CancelID2);
		},
		"json"
	)
}

function getReporttoLoad(id){
	$.post("/getReporttoLoad",id,
		function(data,status){
			$(".col-md-9").empty().append(data);
			$(".text_area").hide();
		}
	)
}

function saveUser(){
	$.post("/saveUser",$("input").serialize(),
		function(data,status){
			if(status){
				requestAdmin(
					{ active:true, filter:"" },
					function(res){
						//window.location.reload();
						$(".col-md-9").empty().append(res);
						$(".col-md-9").append(insertUser)
						addAdminButtons();
					}
				);
			}
		}
	)
}

function deleteUser(){
	$.post("/deleteUser", $("input").serialize(),
		function(data,status){
			if(status){
				requestAdmin(
					{ active:true, filter:"" },
					function(res){
						//window.location.reload();
						$(".col-md-9").empty().append(res);
						$(".col-md-9").append(insertUser)
						addAdminButtons();
					}
				);
			}
		}
	)
}

function updatePw(ID){
	$.post("/updatePw/"+ID, $("input").serialize(),
		function(data,status){
			$("#"+ID+".slideMoving").slideUp();
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
	var editable = "true";
	
	loadSearchForm();
	
	$("body").on("click","a",function(event){
		if( event.target.id == "new"){
			$(".new_form").empty().append(newReport+newReport1+user+newReport2+currentDate()+newReport3+newReport4+newReport6);
			$(".insert_save_button").empty().append(SaveEn);
			$(".insert_jira_button").empty().append(Jira);
			//$("#user").append(getUser());
			//$("#date").append(currentDate());
		}
		if($(event.target).attr('class')=="edit_report"){
			if(editable=="true"){
				editable="false";
				getReporttoEdit(event.target.id);
				return false;
			}
		}
		if( event.target.id == "cancel"){
			$(".new_form").empty()
			$(".insert_save_button").empty().append(SaveDis);
			$(".insert_jira_button").empty()
			$(".col-md-3").empty();
		}
		if( event.target.id == "save"){
			save_report();
			$(".insert_save_button").empty().append(SaveDis);
			$(".text_area").hide()
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
			editable="true";
		}
		if( event.target.id == "save_id"){
			recordid=$(event.target).attr('name');
			saveEditedRecord(recordid);
			$(".insert_save_button").empty().append(SaveDis);
			editable="true";
		}
		if( event.target.id == "new_user"){
			$(".newUserInsert").append(newUser+iterator+newUser2+iterator+newUser3);
			$(".insert_save_button").empty().append(SaveUserEn);
			$(".insert_delete_button").empty().append(delUserbtnDis);
			iterator=iterator+1;
		}
		if( event.target.id == "save_user"){
			saveUser();
			iterator=0;
		}
		if( event.target.id == "cancel_user"){
			$(".newUserInsert").empty();
			$(".insert_save_button").empty().append(SaveDis);
			$(".insert_delete_button").empty().append(delUserbtnEn);
			$(".slideMoving").slideUp();
			iterator=0;
		}
		if( event.target.id == "delete_user"){
			deleteUser();
		}
		if($(event.target).attr('name')=="edit"){
			ID=event.target.id;
			$("#"+ID+".slideMoving").slideToggle();
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