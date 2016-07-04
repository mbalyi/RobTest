from dbinterface import DB
from reportinterface import Report
import json, os
from flask import Flask, render_template, session, redirect, url_for, escape, request, jsonify, Response
app = Flask(__name__, static_url_path='/static')


@app.route('/', methods=['GET', 'POST'])
def login(active=None):
	return render_template('Login.html')

	
@app.route('/home', methods=['GET', 'POST'])
def login_form():
	if request.method == 'POST':
		session['username'] = request.form['user']
	log = Report.login_querry(title=request.form["user"],pw=request.form["password"])
	if log == 1 and 'username' in session:
		query = Report.getRecords()
		projects = DB.getProjects()
		projectId = DB.getSelectedProject(user=request.form['user'])
		return render_template('home.html',user = request.form['user'], Projects = projects, selectedProject = projectId)
	else:
		return redirect(url_for('login'))

@app.route('/logout', methods=['GET'])
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('login'))
	
@app.route('/setup', methods=['GET'])
def setup():
	query = DB.get_case(active=request.args.get('active'), search=request.args.get('filter'))
	query+=DB.get_object(projectId=projectSession())
	return json.dumps(query)

@app.route('/design', methods=['POST'])
def design():
	return render_template('Login.html')
	
#-----case page-----
@app.route('/case_page', methods=['GET'])
def case_page():
	query = DB.get_case(projectId = projectSession())
	return render_template('case.html', cases=query)
	#return json.dumps(query)

@app.route('/caseForm/<int:projectId>', methods=['GET'])
def caseForm(projectId):
	query = DB.getAreas(projectId=projectId)
	print(query)
	return render_template('case.html', caseForm=query,count=len(query))
	
@app.route('/save_case', methods=['POST'])
def save_case():
	ID=DB.save_case(title=request.form["title"],priority=request.form["priority"],data=request.form["data"],area=request.form.getlist('areaBox'),projectId=projectSession())
	DB.save_steps(id=ID,action = request.form.getlist('action[]'),result = request.form.getlist('result[]'),projectId=projectSession())
	return json.dumps(ID)

@app.route('/load_case/<int:ID>/<mode>', methods=['GET'])
def load_case(ID,mode):
	query = DB.get_case_parameters(id=ID, projectId=projectSession())
	areaInCase = DB.getCaseArea(caseId=query[0][0])
	areas = DB.getAreas(projectId=projectSession())
	temp=[]
	boolen='false'
	for k in areas:
		for j in areaInCase:
			if j[0] == k[0]:
				boolen='true'
		if boolen=='false':
			temp.append([k,'notchecked'])
		else:
			temp.append([k,'checked'])
			boolen='false'
	if mode == "loadCase":
		return render_template('case.html', loadcase=query, areaInCase=areaInCase,areas=temp,count=len(areas))
	elif mode == "editCase":
		return render_template('case.html', editablecase=query, areaInCase=areaInCase,areas=temp,count=len(areas))	

@app.route('/get_step/<int:ID>/<mode>', methods=['GET'])
def get_step(ID,mode):
	query=DB.get_step_parameters(id=ID,projectId=projectSession())
	if mode == "getStep":
		return render_template('step.html', step=query)
	elif mode == "editStep":
		return render_template('step.html', editablestep=query)

@app.route('/deleteCase/<int:ID>', methods=['GET'])
def deleteCase(ID):
	DB.deleteCase(id=ID, projectId=projectSession())
	return "ok"

@app.route('/updateCase/<int:ID>', methods=['POST'])
def updateCase(ID):
	DB.updateCase(title=request.form["title"],priority=request.form["priority"],data=request.form["data"],caseId=ID,area=request.form.getlist('areaBox'))
	DB.updateStep(caseId=ID,action = request.form.getlist('action[]'),result = request.form.getlist('result[]'))
	return str(ID)
	
#-----object page-----	
@app.route('/object_page', methods=['GET'])
def object_page():
	query = DB.get_object(projectId=projectSession())
	return render_template("object.html", object=query)

@app.route('/objectForm/<int:projectId>', methods=['GET'])
def objectForm(projectId):
	query = DB.getAreas(projectId=projectId)
	return render_template('object.html', objectForm=query,count=len(query))
	
@app.route('/load_object/<int:ID>/<mode>', methods=['GET'])
def load_object(ID,mode):
	query = DB.get_object_parameters(id=ID, projectId=projectSession())
	areaInObject = DB.getObjectArea(objectId=ID)
	areas = DB.getAreas(projectId=projectSession())
	temp=[]
	boolen='false'
	for k in areas:
		for j in areaInObject:
			if j[0] == k[0]:
				boolen='true'
		if boolen=='false':
			temp.append([k,'notchecked'])
		else:
			temp.append([k,'checked'])
			boolen='false'
	if mode == "loadObject":
		return render_template("object.html", loadObject=query,areas=temp,count=len(areas))
	elif mode == "editObject":
		return render_template("object.html", editObject=query,areas=temp,count=len(areas))

@app.route('/save_object', methods=['POST'])	
def save_object():
	ID=DB.save_object(name=request.form["name"],hardware=request.form["hardware"],desc=request.form["desc"],version=request.form["version"],projectId=projectSession(),areas=request.form.getlist('areaBox'))
	return json.dumps(ID)

@app.route('/updateObject', methods=['POST'])	
def updateObject():
	DB.updateObject(objectId=request.form["objectId"],name=request.form["name"],hardware=request.form["hardware"],desc=request.form["desc"],version=request.form["version"],projectId=request.form["projectId"],areas=request.form.getlist('areaBox'))
	return json.dumps(request.form["objectId"])
	
@app.route('/deleteObject/<int:ID>', methods=['GET'])
def deleteObject(ID):
	DB.deleteObject(id=ID,projectId=projectSession())
	return "ok"

#-----set page-----	
@app.route('/set_page', methods=['GET'])
def set_page():
	query = DB.get_set(projectId=projectSession())
	return render_template('set.html', set=query)

@app.route('/setForm', methods=['GET'])
def setForm():
	areas=DB.getAreas(projectId=projectSession())
	return render_template('set.html', setForm='true',areas=areas,count=len(areas))

@app.route('/save_set', methods=['POST'])	
def save_set():
	setId=DB.save_set(name=request.form["name"],date=request.form["date"],priority=request.form["priority"],projectId=projectSession(),areas=request.form.getlist('areaBox'))
	DB.saveSetCase(ID=request.form.getlist('ID'),setID=setId)
	return "OK"

@app.route('/updateSet', methods=['POST'])	
def updateSet():
	DB.updateSet(setId=request.form['setId'],ID=request.form.getlist('ID'),name=request.form["name"],date=request.form["date"],priority=request.form["priority"],projectId=projectSession(),areas=request.form.getlist('areaBox'))
	return "OK"
	
@app.route('/load_set/<int:ID>/<mode>', methods=['GET'])
def load_set(ID,mode):
	query=DB.get_set_parameters(id=ID)
	cases=DB.getSetCases(id=ID)
	areaInSet = DB.getSetArea(setId=ID)
	areas = DB.getAreas(projectId=projectSession())
	temp=[]
	boolen='false'
	for k in areas:
		for j in areaInSet:
			if j[0] == k[0]:
				boolen='true'
		if boolen=='false':
			temp.append([k,'notchecked'])
		else:
			temp.append([k,'checked'])
			boolen='false'
	if mode == "loadSet":
		return render_template('set.html', loadSet=query, loadCase=cases,areas=temp,count=len(areas))
	if mode == "exeCasesBySet":
		return render_template('set.html', exeCasesBySet=cases)
	else:
		return render_template('set.html', loadEditableSet=query, editCase=cases,areas=temp,count=len(areas))

@app.route('/deleteSet/<int:ID>', methods=['GET'])
def deleteSet(ID):
	DB.deleteSet(id=ID)
	return "ok"
	
#-----execution-----	
@app.route('/execution_page', methods=['GET'])
def execution_page():
	query=DB.getExecution(projectId=projectSession())
	return render_template('execution.html', execution=query)

@app.route('/newExe', methods=['GET'])
def newExecution():
	query=DB.get_object(projectId=projectSession())
	areas=DB.getAreas(projectId=projectSession())
	return render_template('execution.html', newExe=query,areas=areas,count=len(areas))	

@app.route('/saveExe', methods=['GET', 'POST'])
def SaveExecution():
	exeId=DB.saveExe(name=request.form["title"],testObject=request.form["TO"],projectId=projectSession(),areas=request.form.getlist('areaBox'))
	DB.saveCaseExe(ID=request.form.getlist('ID'),exeID=exeId)
	return json.dumps(exeId)

@app.route('/updateExe', methods=['POST'])
def UpdateExecution():
	DB.updateExecution(exeId=request.form['exeId'],name=request.form["title"],testObject=request.form["TO"],projectId=request.form["projectId"],areas=request.form.getlist('areaBox'))
	DB.updateCaseExe(ID=request.form.getlist('ID'),exeID=exeId)
	return json.dumps(request.form['exeId'])
	
@app.route('/loadExecution/<int:ID>/<mode>', methods=['GET'])
def loadExecution(ID,mode):
	query=DB.getExeParameters(id=ID)
	object=DB.getExeObject(id=ID)
	cases=DB.getExeCases(id=ID)
	objects=DB.get_object(projectId=projectSession(), notRes=object[0])
	areaInExe = DB.getExeArea(exeId=ID)
	areas = DB.getAreas(projectId=projectSession())
	temp=[]
	boolen='false'
	for k in areas:
		for j in areaInExe:
			if j[0] == k[0]:
				boolen='true'
		if boolen=='false':
			temp.append([k,'notchecked'])
		else:
			temp.append([k,'checked'])
			boolen='false'
	if mode == "loadExe":
		return render_template('execution.html', loadExe=query, loadCase=cases, loadObject=object,areas=temp,count=len(areas),exeId=ID)
	if mode == "editExe":
		return render_template('execution.html', loadEditableExe=query, loadEditableCase=cases, loadEditableObject=object, loadObjects=objects,areas=temp,count=len(areas),exeId=ID)
	#else:
	#	return render_template('execution.html', loadEditableSet=query, editCase=cases)

@app.route('/deleteExe/<int:ID>/<int:obID>', methods=['GET'])
def deleteExe(ID,obID):
	DB.deleteExe(id=ID,obid=obID)
	return "ok"

@app.route('/getFirstCaseID/<int:id>', methods=['GET'])
def getFirstCaseID(id):
	query = DB.getExeFromCases(id=id)
	return json.dumps(query[0][2])
	
#-----Report-----	

@app.route('/getUser', methods=['GET'])
def getUser(active=None):
	return json.dumps(session['username'])

@app.route('/getUsers', methods=['GET'])
def getUsers():
	query = Report.getUsers();
	return render_template('admin.html', admin=query)

@app.route('/getReports', methods=['GET'])
def getReports():
	query = Report.getRecords()
	return render_template('dashboard.html', dashboard=query, user=session['username'])

@app.route('/save_report', methods=['POST'])	
def save_report():
	Report.save_report(title=request.form["title"],user=request.form["user"],date=request.form["date"],report=request.form["desc"])
	query = Report.getRecords()
	return render_template('dashboard.html', dashboard=query, user=session['username'])
	
@app.route('/getReporttoEdit/<int:id>', methods=['GET'])
def getReporttoEdit(id):
	query = Report.getRepPar(ID=id)
	return json.dumps(query)

@app.route('/getReporttoLoad', methods=['POST'])
def getReporttoLoad():
	query = Report.getRecords()
	return render_template("dashboard.html", dashboard=query, user=session['username'])

@app.route('/save_edited_record/<int:id>', methods=['POST'])	
def save_edited_record(id):
	Report.save_edited_record(ID=id,title=request.form["title"],user=request.form["user"],date=request.form["date"],report=request.form["desc"])
	query = Report.getRecords()
	return render_template('dashboard.html', dashboard=query, user=session['username'])
		
@app.route('/saveUser', methods=['POST'])	
def saveUser():
	Report.saveNewUser(name=request.form.getlist('user_name[]'),password=request.form.getlist('user_password[]'),active=request.form.getlist('user_active[]'),bann=request.form.getlist('user_bann[]'))
	return "OK"

@app.route('/deleteUser', methods=['POST'])	
def deleteUser():
	Report.deleteUser(ID=request.form.getlist('delete[]'))
	return "OK"

@app.route('/updatePw/<int:ID>', methods=['POST'])	
def updatePw(ID):
	Report.updatePw(ID=ID,oldPw=request.form['oldPw'],newPw=request.form['newPw'])
	return "OK"
	
@app.route('/loadSearchForm', methods=['GET'])
def loadSearchForm():
	query = Report.getUsers();
	return render_template('search.html', users=query)

#-----Test-----

@app.route('/testSetup', methods=['GET'])
def testSetup():
	query = DB.getExecution(projectId=projectSession())
	return render_template('test.html', Exe=query)
	
@app.route('/loadTest/<int:id>', methods=['GET'])
def loadTest(id):
	query = DB.getExeFromCases(id=id)
	return render_template('test.html', loadTest=query)

@app.route('/testPage/<int:id>/<int:exeId>', methods=['GET'])
def testPage(id,exeId):
	query = DB.get_step_parameters(id=id,projectId=projectSession())
	res = DB.getStatusFromStepExe(exeId=exeId, caseId=id)
	query=zip(query,res)
	return render_template('test.html', step=query, status=res)

@app.route('/saveStatus/<int:stepId>/<int:caseExeId>/<status>', methods=['GET'])
def saveStatus(stepId,caseExeId,status):
	DB.saveSetStatus(stepId=stepId,caseExeId=caseExeId,status=status)
	return "Ok"

@app.route('/saveCaseStatus/<int:exeId>/<int:caseId>', methods=['GET'])
def saveCaseStatus(exeId,caseId):
	status=DB.saveCaseStatus(exeId=exeId,caseId=caseId)
	return json.dumps(status)


#-----Project-----
@app.route('/projectChanging/<int:id>', methods=['GET'])
def projectChanging(id):
	DB.setProjectToUser(id=id, user=session['username'])
	return "OK"	

def projectSession():
	return DB.getSelectedProject(user=session['username'])
	
#-----Chart-----
@app.route('/requestChart/<type>/<int:projectId>', methods=['GET'])
def requestChart(type,projectId):
	if type=="line":
		return chartReload(type,"All",0,0,"All")
	else:
		query = DB.getDataForCharts(projectId=projectId)
		passed=0
		failed=0
		skipped=0
		notimp=0
		all=0
		for k in query:
			if k[2] == "RUN":
				passed+=1
			if k[2] == "FAILED":
				failed+=1
			if (k[2] == "NOTRUN") or (k[2] == "SKIPPED"):
				skipped+=1
			if k[2] == "NOTIMP":
				notimp+=1
			all+=1
		rate=[passed,failed,skipped,notimp,all]
		return render_template('test2.html',type=type,rate=rate).replace('\n','')
	
@app.route('/chartFilter/<type>/<int:projectId>', methods=['GET'])
def chartFilter(type,projectId):
	query = DB.getChartFilterData(projectId=projectId)
	areas = DB.getAreas(projectId=projectId)
	return render_template('chartFilter.html',type=type,data=query,areas=areas)

@app.route('/chartReload/<type>/<interval>/<int:obId>/<int:areaId>/<status>', methods=['GET'])
def chartReload(type,interval,obId,areaId,status):
	passed=0
	failed=0
	skipped=0
	notimp=0
	all=0
	result = DB.getFilteredPar(interval=interval,objectId=obId,areaId=areaId,status=status)
	render=""
	if result:
		if type == "pie":
			for k in result:
				if k[0] == "RUN":
					passed+=1
				if k[0] == "FAILED":
					failed+=1
				if (k[0] == "NOTRUN") or (k[0] == "SKIPPED"):
					skipped+=1
				if k[0] == "NOTIMP":
					notimp+=1
				all+=1
				rate=[passed,failed,skipped,notimp,all]
				render = render_template('test2.html',type=type,rate=rate)
		if type == "line":
			temp=[]
			container=[]
			boolen = "false"
			for k in result:
				if k[0] != 'default':
					temp.append(k)
				default = k
				for j in result:
					if (default[3] == j[3]) and (default[4] != j[4]):
						temp.append(j)
						index=result.index(j)
						result.pop(index)
						result.insert(index,('default','default','default','default','default'))
						boolen="true"
				if temp:
					passed=0
					skipped=0
					failed=0
					all=0
					for o in temp:
						if o[0] != "default":
							if o[0] == "RUN":
								passed+=1
							if o[0] == "FAILED":
								failed+=1
							if (o[0] == "NOTRUN") or (o[0] == "SKIPPED"):
								skipped+=1
							if o[0] == "NOTIMP":
								notimp+=1
							all+=1
				rate=[passed,failed,skipped,notimp,all]
				if boolen == "false":
					index=result.index(k)
					result.pop(index)
					result.insert(index,('default','default','default','default','default'))
				else:
					boolen = "false"
				if temp:
					if (temp[0][0] != "default"):
						container.append([temp,rate])
				result.pop(0)
				result.insert(0,('default','default','default','default','default'))
				temp = []
			render = render_template('test2.html',type=type,data=container)
		return render.replace('\n','')
	else:
		if type=="pie":
			return render_template('test2.html',result="pie")
		else:
			return render_template('test2.html',result="line")
	
@app.route('/jenkinsRadiator', methods=['GET'])
def jenkinsRadiator():
	query = DB.getJenkinsData(projectId=projectSession())
	cases = DB.getJenkinsCaseResult(data=query,projectId=projectSession())
	default = [cases[0]]
	temp = []
	sorting = []
	for k in cases:
		if k[0] == default[0][0]:
			if k != default[0]:
				default.append(k)
		else:
			temp.append(default)
			default = [k]
	temp.append(default)
	default = [k]
	all=0
	passed=0
	skipped=0
	failed=0
	iterator=0
	rendered = render_template('jenkinsRadiator.html')
	for k in temp:
		for j in k:
			if j[1] == 'RUN':
				passed+=1
			if j[1] == 'SKIPPED':
				skipped+=1
			if j[1] == 'NOTRUN':
				skipped+=1
			if j[1] == 'FAILED':
				failed+=1
			all+=1
		rate = []
		rate.append(passed)
		rate.append(skipped)
		rate.append(failed)
		rate.append(all)
		if passed/all >= 0.8:
			#rendered += render_template('jenkinsRadiator.html', mode='success', param=temp[iterator], data=query[iterator], iterator=iterator, rate=rate)
			sorting.append(('success',temp[iterator],query[iterator],iterator,rate))
		else:
			if failed/all > 0:
				#rendered += render_template('jenkinsRadiator.html', mode='danger', param=temp[iterator], data=query[iterator], iterator=iterator, rate=rate)
				sorting.append(('danger',temp[iterator],query[iterator],iterator,rate))
			else:
				#rendered += render_template('jenkinsRadiator.html', mode='warning', param=temp[iterator], data=query[iterator], iterator=iterator, rate=rate)
				sorting.append(('warning',temp[iterator],query[iterator],iterator,rate))
		all=0
		passed=0
		iterator+=1
		skipped=0
		failed=0
	temp = []
	iterator=0
	b=0
	default1=[]
	boolen = "false"
	for j in sorting:
		for k in sorting:
			temp.append(k)
			default=k[2][0]
			for l in sorting:
				if l[2][0] == default:
					if l[2] != k[2]:
						temp.append(l)
						index=sorting.index(l)
						sorting.pop(sorting.index(l))
						sorting.insert(index,('default','default',('default','default')))
						#default1=l
						boolen="true"
			passed=0
			skipped=0
			failed=0
			all=0
			for o in temp:
				if o[0] != "default":
					passed+=o[4][0]
					skipped+=o[4][1]
					failed+=o[4][2]
					all+=o[4][3]
			rate=[]
			rate.append(passed)
			rate.append(skipped)
			rate.append(failed)
			rate.append(all)
			if boolen == "false":
				index=sorting.index(k)
				sorting.pop(sorting.index(k))
				sorting.insert(index,('default','default',('default','default')))
			else:
				boolen = "false"
			if temp[0][0] != "default":
				rendered+=render_template('jenkinsRadiator.html', objectExe=temp, iterator=iterator, rate=rate)
			sorting.pop(0)
			sorting.insert(0,('default','default',('default','default')))
			temp = []
			iterator+=1
	if len(sorting) == 1:
		passed=sorting[0][4][0]
		skipped=sorting[0][4][1]
		failed=sorting[0][4][2]
		all=sorting[0][4][3]
		rate=[]
		rate.append(passed)
		rate.append(skipped)
		rate.append(failed)
		rate.append(all)
		rendered+=render_template('jenkinsRadiator.html', objectExe=sorting, iterator=iterator, rate=rate)
	return rendered #render_template('jenkinsRadiator.html', jenkins=rendered)	

#-----Dashboard-----
@app.route('/dashboardLoad', methods=['GET'])
def dashboardLoad():
	return render_template('slide.html')

	
# set the secret key.  keep this really secret:
app.secret_key = os.urandom(24) #'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
		
if __name__ == "__main__":
	app.debug = True
	app.run()