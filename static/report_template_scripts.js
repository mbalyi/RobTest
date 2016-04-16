newReport="<table style='width:100%' class='table'>"
newReport+="<tr><td><p>Title:</p></td><td><input form='text' name='title' class='form-control' value='"
newReport1="'></td><td><p>User:</p></td><td><input form='text' name='user' class='form-control' value='"
newReport2="' readonly></td></tr><tr><td><p>Date:</p></td><td><input form='text' name='date' class='form-control' value='"
newReport3="' readonly></td></tr>"
newReport3+="<tr><td colspan='4' style='width:100%'><textarea class='form-control' rows='5' name='desc' maxlength='10000' style='width:90%;background-color:#777;color:#eee;'>"
newReport4="Report</textarea></td></tr>"
newReport5="</textarea></td></tr>";
newReport6="</table>"

newform="<div class='new_form'></div>"

button="<table><tr><td style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='new'>New</a></td>"
button+="<td class='insert_save_button' style='width:53px'><a class='btn btn-default btn-sm disabled' href='#' role='button' id='save'>Save</a></td>";
button+="<td class='insert_cancel_button' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='cancel'>Cancel</a></td><td style='width:50px'></td>";
button+="<td style='width:73px'><a class='btn btn-default btn-sm' href='#' role='button' id='showall'>Show All</a></td>";
button+="<td style='width:73px'><a class='btn btn-default btn-sm' href='#' role='button' id='hideall'>Hide All</a></td>";
button+="<td style='width: 20px'></td><td class='insert_jira_button'></td>";
button+="<td style='width: 20px'></td><td><a class='btn btn-info btn-sm' href='#' role='button' id='search_btn'>Search</a></td></tr></table><hr>"

SaveEn="<a class='btn btn-default btn-sm' href='#' role='button' id='save''>Save</a>";
SaveDis="<a class='btn btn-default btn-sm disabled' href='#' role='button' id='save'>Save</a>";
Cancelbtn="<a class='btn btn-default btn-sm' href='#' role='button' id='cancel'>Cancel</a>";
Jira="<a class='btn btn-primary btn-sm' href='#' id='jira'>Jira</a>";

SaveID="<a class='btn btn-default btn-sm' href='#' role='button' id='save_id' name='"
SaveID2="'>Save</a>";
CancelID="<a class='btn btn-default btn-sm' href='#' role='button' id='cancel_id' name='"
CancelID2="'>Cancel</a>"

jForm="<div class='wrapJira'></div>"

JiraForm="<table style='width:100%' class='table'>"
JiraForm+="<tr><td><p>Link:</p></td><td><input form='text' name='jiralink' class='form-control'></td></tr>"
JiraForm+="<tr><td><p>Title:</p></td><td><input form='text' name='jiratitle' class='form-control'></td></tr>"

JiraForm2="<form class='form-inline'>"
JiraForm2+="  <div class='form-group'>"
JiraForm2+="	<a href='#' class='glyphicon glyphicon-plus-sign' name='add_new_jira' id='"
JiraForm3=																				"' style='width:10px'></a>"
JiraForm3+="	<a href='#' type='button' class='glyphicon glyphicon-minus-sign' id='"
JiraForm4=																"' style='width:10px'></a>"
JiraForm4+="    <label for='exampleInputName2'>Link</label>"
JiraForm4+="    <input form='text' name='jiralink[]' class='form-control'>"
JiraForm4+="  </div>"
JiraForm4+="</form>"

insertUser="<div class='newUserInsert'></div>";

adminButton="<table><tr><td style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='new_user'>New</a></td>"
adminButton+="<td class='insert_save_button' style='width:53px'><a class='btn btn-default btn-sm disabled' href='#' role='button' id='save_user'>Save</a></td>";
adminButton+="<td class='insert_cancel_button' style='width:50px'><a class='btn btn-default btn-sm' href='#' role='button' id='cancel_user'>Cancel</a></td><td style='width:50px'></td>";
adminButton+="<td class='insert_delete_button' style='width: 50px'><a class='btn btn-default btn-sm' href='#' role='button' id='delete_user'>Delete</a></td></tr></table><hr>";

delUserbtnEn="<a class='btn btn-default btn-sm' href='#' role='button' id='delete_user'>Delete</a>";
delUserbtnDis="<a class='btn btn-default btn-sm disabled' href='#' role='button' id='delete_user'>Delete</a>";

newUser="<tr><td class='admin_table'><input type='text' name='user_name[]' class='form-control' value='Name'></td>";
newUser+="<td class='admin_table'><input type='checkbox' name='user_active[]' value='"
newUser2="'></td><td class='admin_table'><input type='checkbox' name='user_bann[]' value='";
newUser3="'></td><td class='admin_table'><input type='text' name='user_password[]' class='form-control' value='Password'></td></tr>";

SaveUserEn="<a class='btn btn-default btn-sm' href='#' role='button' id='save_user'>Save</a>";