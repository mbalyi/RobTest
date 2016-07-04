import sqlite3

class Database:
	def login_querry(self, **kwargs):
		
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT COUNT(*) FROM Users WHERE UserName = ? AND UserPassword= ?",[kwargs['title'],kwargs['pw']])
		result=c.fetchone()
		conn.commit()
		return result[0]
		
	def get_execution(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT Name FROM Execution")
		result=c.fetchone()
		conn.commit()
		
	#-----case page-----	
	def get_case(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT CaseId,Title FROM Cases WHERE ProjectId=?",[kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def save_case(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("INSERT INTO Cases (Title,Priority,Data,ProjectId) VALUES (?,?,?,?)",[kwargs['title'],kwargs['priority'],kwargs['data'],kwargs['projectId']])
		conn.commit()
		c.execute("SELECT CaseId FROM Cases WHERE Title=? AND Priority=? AND Data=? AND ProjectId=?",[kwargs['title'],kwargs['priority'],kwargs['data'],kwargs['projectId']])
		CaseID=c.fetchone()
		conn.commit()
		for k in kwargs['area']:
			c.execute("INSERT INTO Area_Case (AreaId,CaseId) VALUES (?,?)",[k,CaseID[0]])
			conn.commit()
		return CaseID[0]
		
	def save_steps(self, **kwargs):
		step=[]
		actions=kwargs['action'];
		results=kwargs['result'];
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		for k,l in zip(actions,results):
			c.execute("INSERT INTO Steps (Action,Result,ProjectId) VALUES (?,?,?)",[k,l,kwargs['projectId']])
			conn.commit()
			c.execute("SELECT StepId FROM Steps WHERE Action=? AND Result=? AND ProjectId=?",[k,l,kwargs['projectId']])
			stepID=c.fetchone()
			step.append(stepID[0])
		for k in step:
			c.execute("INSERT INTO Case_Step (CaseId,StepId) VALUES (?,?)",[kwargs['id'],k])
			conn.commit()
	
	def get_case_parameters(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Cases WHERE CaseId=? AND ProjectId=?",[kwargs['id'],kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def get_step_parameters(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT StepId FROM Case_Step WHERE CaseId=?",[kwargs['id']])
		result=c.fetchall()
		conn.commit()
		case_parameter = []
		for k in result:
			c.execute("SELECT * FROM Steps WHERE StepId=? AND ProjectId=?",[k[0],kwargs['projectId']])
			case_parameter.append(c.fetchone())
			conn.commit()
		return case_parameter
	
	def deleteCase(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("DELETE FROM Cases WHERE CaseId=? AND ProjectId=?",[kwargs['id'],kwargs['projectId']])
		conn.commit()
		c.execute("DELETE FROM Area_Case WHERE CaseId=?",[kwargs['id']])
		conn.commit()
		c.execute("SELECT StepId FROM Case_Step WHERE CaseId=?",[kwargs['id']])
		result=c.fetchall()
		conn.commit()
		c.execute("DELETE FROM Case_Step WHERE CaseId=?",[kwargs['id']])
		conn.commit()
		for k in result:
			c.execute("DELETE FROM Steps WHERE StepId=? AND ProjectId=?",[k[0],kwargs['projectId']])
			conn.commit()
	
	def updateCase(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Cases SET Title=?,Priority=?,Data=? WHERE CaseId=?",[kwargs['title'],kwargs['priority'],kwargs['data'],kwargs['caseId']])
		conn.commit()
		c.execute("SELECT AreaId FROM Area_Case WHERE CaseId=?",[kwargs['caseId']])
		areas=c.fetchall()
		conn.commit()
		temp=[]
		for k in areas:
			temp.append(k[0])
		allArea=[]
		for k in kwargs['area']:
			allArea.append(int(k))
		for k in allArea:
			if temp.count(k) == 0:
				c.execute("INSERT INTO Area_Case (AreaId,CaseId) VALUES (?,?)",[k,kwargs['caseId']])
				conn.commit()
		for j in temp:
			if allArea.count(j) == 0:
				c.execute("DELETE FROM Area_Case WHERE AreaId=? AND CaseId=?",[j,kwargs['caseId']])
				conn.commit()
		
	
	def updateStep(self, **kwargs):
		step=[]
		actions=kwargs['action'];
		results=kwargs['result'];
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Case_Step WHERE CaseId=?",[kwargs['caseId']])
		stepID=c.fetchall()
		conn.commit()
	
	#-----object-----
	def get_object(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ObjectId,ObjectName FROM Objects WHERE ProjectId=?",[kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def save_object(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("INSERT INTO Objects (ObjectName,ObjectHardware,ObjectDesc,ProjectId,ObjectVersion) VALUES (?,?,?,?,?)",[kwargs['name'],kwargs['hardware'],kwargs['desc'],kwargs['projectId'],kwargs['version']])
		conn.commit()
		c.execute("SELECT ObjectId FROM Objects WHERE ObjectName=? AND ObjectHardware=? AND ObjectDesc=? AND ProjectId=? AND ObjectVersion=?",[kwargs['name'],kwargs['hardware'],kwargs['desc'],kwargs['projectId'],kwargs['version']])
		ObjectID=c.fetchone()
		conn.commit()
		for k in kwargs['areas']:
			c.execute("INSERT INTO Area_Object (AreaId,ObjecId) VALUES (?,?)",[k,ObjectID[0]])
			conn.commit()
		return ObjectID[0]
	
	def updateObject(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Objects SET ObjectName=?,ObjectHardware=?,ObjectDesc=?,ObjectVersion=? WHERE ObjectId=?",[kwargs['name'],kwargs['hardware'],kwargs['desc'],kwargs['version'],kwargs['objectId']])
		conn.commit()
		c.execute("SELECT AreaId FROM Area_Object WHERE ObjectId=?",[kwargs['objectId']])
		areas=c.fetchall()
		conn.commit()
		temp=[]
		for k in areas:
			temp.append(k[0])
		allArea=[]
		for k in kwargs['areas']:
			allArea.append(int(k))
		for k in allArea:
			if temp.count(k) == 0:
				c.execute("INSERT INTO Area_Object (AreaId,ObjectId) VALUES (?,?)",[k,kwargs['objectId']])
				conn.commit()
		for j in temp:
			if allArea.count(j) == 0:
				c.execute("DELETE FROM Area_Object WHERE AreaId=? AND ObjectId=?",[j,kwargs['objectId']])
				conn.commit()
		return
	
	def get_object_parameters(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Objects WHERE ObjectId=? AND ProjectId=?",[kwargs['id'],kwargs['projectId']])
		result=c.fetchone()
		conn.commit()
		return result
	
	def deleteObject(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("DELETE FROM Objects WHERE ObjectId=? AND ProjectId=?",[kwargs['id'],kwargs['projectId']])
		conn.commit()
		c.execute("DELETE FROM Area_Object WHERE ObjectId=?",[kwargs['id']])
		conn.commit()
	
	#-----set-----
	def get_set(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT SetId,SetName FROM Sets WHERE ProjectId=?",[kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def save_set(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("INSERT INTO Sets (SetName,SetDate,SetPriority,ProjectId) VALUES (?,?,?,?)",[kwargs['name'],kwargs['date'],kwargs['priority'],kwargs['projectId']])
		conn.commit()
		c.execute("SELECT SetId FROM Sets WHERE SetName=? AND ProjectId=?",[kwargs['name'],kwargs['projectId']])
		setID=c.fetchone()
		conn.commit()
		for k in kwargs['areas']:
			c.execute("INSERT INTO Area_Set (AreaId,SetId) VALUES (?,?)",[k,setID[0]])
		return setID[0]
	
	def updateSet(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Sets SET SetName=?,ProjectId=?,SetDate=?,SetPriority=? WHERE SetId=?",[kwargs['name'],kwargs['projectId'],kwargs['date'],kwargs['priority'],kwargs['setId']])
		conn.commit()
		c.execute("SELECT AreaId FROM Area_Set WHERE SetId=?",[kwargs['setId']])
		areas=c.fetchall()
		conn.commit()
		temp=[]
		for k in areas:
			temp.append(k[0])
		allArea=[]
		for k in kwargs['areas']:
			allArea.append(int(k))
		for k in allArea:
			if temp.count(k) == 0:
				c.execute("INSERT INTO Area_Set (AreaId,SetId) VALUES (?,?)",[k,kwargs['setId']])
				conn.commit()
		for j in temp:
			if allArea.count(j) == 0:
				c.execute("DELETE FROM Area_Set WHERE AreaId=? AND SetId=?",[j,kwargs['setId']])
				conn.commit()
		c.execute("SELECT CaseId FROM Set_Case WHERE SetId=?",[kwargs['setId']])
		caseIds=c.fetchall()
		conn.commit()
		temp=[]
		for k in caseIds:
			temp.append(k[0])
		allCases=[]
		for k in kwargs['ID']:
			allCases.append(int(k))
		for k in allCases:
			if temp.count(k) == 0:
				c.execute("INSERT INTO Set_Case (SetId,CaseId) VALUES (?,?)",[kwargs['setId'],k])
				conn.commit()
		for j in temp:
			if allArea.count(j) == 0:
				c.execute("DELETE FROM Set_Case WHERE CaseId=? AND SetId=?",[j,kwargs['setId']])
				conn.commit()
		return
	
	def saveSetCase(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		for k in kwargs['ID']:
			c.execute("INSERT INTO Set_Case (SetId,CaseId) VALUES (?,?)",[kwargs['setID'],k])
			conn.commit()
	
	def get_set_parameters(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Sets WHERE SetId=?",[kwargs['id']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getSetCases(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT CaseId FROM Set_Case WHERE SetId=?",[kwargs['id']])
		result=c.fetchall()
		conn.commit()
		cases = []
		for k in result:
			c.execute("SELECT * FROM Cases WHERE CaseId=?",[k[0]])
			cases.append(c.fetchone())
			conn.commit()
		return cases
	
	def deleteSet(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("DELETE FROM Sets WHERE SetId=?",[kwargs['id']])
		conn.commit()
		c.execute("DELETE FROM Set_Case WHERE SetId=?",[kwargs['id']])
		conn.commit()
		c.execute("DELETE FROM Area_Set WHERE SetId=?",[kwargs['id']])
		conn.commit()
	
	#-----execution-----
	def getExecution(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ExecutionId,ExeName FROM Execution WHERE ProjectId=?",[kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
		
	def saveExe(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		#c.execute("INSERT INTO Execution (ExeName,ExeDate) VALUES (?,?)",[kwargs['name'],kwargs['date']])
		c.execute("INSERT INTO Execution (ExeName,ProjectId) VALUES (?,?)",[kwargs['name'],kwargs['projectId']])
		conn.commit()
		c.execute("SELECT ExecutionId FROM Execution WHERE ExeName=? AND ProjectId=?",[kwargs['name'],kwargs['projectId']])
		ExeID=c.fetchone()
		conn.commit()
		c.execute("INSERT INTO Exe_Object (ExecutionId,ObjectId) VALUES (?,?)",[ExeID[0],kwargs['testObject']])
		conn.commit()
		for k in kwargs['areas']:
			c.execute("INSERT INTO Area_Execution (AreaId,ExecutionId) VALUES(?,?)",[k,ExeID[0]])
			conn.commit()
		return ExeID[0]
	
	def updateExecution(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Execution SET ExeName=?,ProjectId=? WHERE ExecutionId=?",[kwargs['name'],kwargs['projectId'],kwargs['exeId']])
		conn.commit()
		c.execute("UPDATE Exe_Object SET ObjectId=? WHERE ExecutionId=?",[kwargs['testObject'],kwargs['exeId']])
		conn.commit()
		c.execute("SELECT AreaId FROM Area_Execution WHERE ExecutionId=?",[kwargs['exeId']])
		areas=c.fetchall()
		conn.commit()
		temp=[]
		for k in areas:
			temp.append(k[0])
		allArea=[]
		for k in kwargs['areas']:
			allArea.append(int(k))
		for k in allArea:
			if temp.count(k) == 0:
				c.execute("INSERT INTO Area_Execution (AreaId,ExecutionId) VALUES (?,?)",[k,kwargs['exeId']])
				conn.commit()
		for j in temp:
			if allArea.count(j) == 0:
				c.execute("DELETE FROM Area_Execution WHERE AreaId=? AND ExecutionId=?",[j,kwargs['exeId']])
				conn.commit()
		return
	
	def updateCaseExe(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT CaseId,ExecutionId FROM Case_Execution WHERE ExecutionId=?",[kwargs['exeId']])
		caseIds=c.fetchall()
		conn.commit()
		temp=[]
		for k in caseId:
			temp.append(k[0])
		allCases=[]
		for k in kwargs['ID']:
			allCases.append(int(k))
		for k in allCases:
			if temp.count(k) == 0:
				c.execute("SELECT Title FROM Cases WHERE CaseId=?",[k])
				title=c.fetchone()
				conn.commit()
				c.execute("INSERT INTO Case_Execution (ExecutionId,CaseId,Result,title,) VALUES (?,?)",[k,kwargs['exeId'],"NOTRUN",title[0]])
				conn.commit()
		for j in temp:
			if allArea.count(j) == 0:
				c.execute("DELETE FROM Case_Execution WHERE CaseId=? AND ExecutionId=?",[j,kwargs['exeId']])
				conn.commit()
	
	def saveCaseExe(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		for k in kwargs['ID']:
			c.execute("SELECT Title FROM Cases WHERE CaseId=?",[k])
			CaseTitle=c.fetchone()
			conn.commit()
			c.execute("INSERT INTO Case_Execution (ExecutionId,CaseId,Result,title) VALUES (?,?,?,?)",[kwargs['exeID'],k,"NOTRUN",CaseTitle[0]])
			conn.commit()
			c.execute("SELECT Id FROM Case_Execution WHERE ExecutionId=? AND CaseId=? AND title=?",[kwargs['exeID'],k,CaseTitle[0]])
			ID=c.fetchone()
			c.execute("SELECT StepId FROM Case_Step WHERE CaseId=?",[k])
			StepId=c.fetchall()
			conn.commit()
			for l in StepId:
				c.execute("INSERT INTO Step_Execution (StepId,ExecutionId,Case_ExecutionId,Result) VALUES (?,?,?,?)",[l[0],kwargs['exeID'],ID[0],"NOTRUN"])
				conn.commit()
		return
	
	def getExeParameters(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Execution WHERE ExecutionId=?",[kwargs['id']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getExeObject(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ObjectId FROM Exe_Object WHERE ExecutionId=?",[kwargs['id']])
		ObjectId=c.fetchone()
		conn.commit()
		print(ObjectId)
		c.execute("SELECT * FROM Objects WHERE ObjectId=?",[ObjectId[0]])
		Object=c.fetchone()
		conn.commit()
		return Object
	
	def getExeCases(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Case_Execution WHERE ExecutionId=?",[kwargs['id']])
		result=c.fetchall()
		conn.commit()
		cases = []
		for k in result:
			c.execute("SELECT * FROM Cases WHERE CaseId=?",[k[2]])
			cases.append(c.fetchone()+(k[3],))
			conn.commit()
		return cases
	
	def getExeFromCases(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Case_Execution WHERE ExecutionId=?",[kwargs['id']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def deleteExe(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("DELETE FROM Execution WHERE ExecutionId=?",[kwargs['id']])
		conn.commit()
		c.execute("DELETE FROM Case_Execution WHERE ExecutionId=?",[kwargs['id']])
		conn.commit()
		c.execute("DELETE FROM Step_Execution WHERE ExecutionId=?",[kwargs['id']])
		conn.commit()
		c.execute("DELETE FROM Exe_Object WHERE ExecutionId=? AND ObjectId=?",[kwargs['id'],kwargs['obid']])
		conn.commit()
		c.execute("DELETE FROM Area_Execution WHERE ExecutionId=",[kwargs['id']])
		conn.commit()
	
	def getStatusFromStepExe(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT Id FROM Case_Execution WHERE ExecutionId=? AND CaseId=?",[kwargs['exeId'],kwargs['caseId']])
		caseExeId=c.fetchall()
		conn.commit()
		c.execute("SELECT Result,Comment FROM Step_Execution WHERE Case_ExecutionId=?",[caseExeId[0][0]])
		result=c.fetchall()
		conn.commit()
		return result
	
    #-----Projects-----
	def getProjects(self):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ProjectId,Name FROM Projects")
		result=c.fetchall()
		conn.commit()
		return result
		
	def getSelectedProject(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ProjectId FROM Users WHERE UserName=?",[kwargs['user']])
		result=c.fetchone()
		conn.commit()
		return result[0]
		
	def setProjectToUser(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Users SET ProjectId=? WHERE UserName=?",[kwargs['id'],kwargs['user']])
		conn.commit()
		return
    
	#-----test-----
	def saveSetStatus(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		print(kwargs['caseExeId'])
		print(kwargs['stepId'])
		c.execute("UPDATE Step_Execution SET Result=? WHERE StepId=? AND ExecutionId=?",[kwargs['status'],kwargs['stepId'],kwargs['caseExeId']])
		conn.commit()
	
	def saveCaseStatus(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT Id FROM Case_Execution WHERE ExecutionId=? AND CaseId=?",[kwargs['exeId'],kwargs['caseId']])
		caseExeId=c.fetchall()
		conn.commit()
		c.execute("SELECT Result FROM Step_Execution WHERE ExecutionId=? AND Case_ExecutionId=?",[kwargs['exeId'],caseExeId[0][0]])
		Results=c.fetchall()
		conn.commit()
		for k in Results:
			if k[0] == "FAILED":
				c.execute("UPDATE Case_Execution SET Result=? WHERE ExecutionId=? AND CaseId=?",["FAILED",kwargs['exeId'],kwargs['caseId']])
				conn.commit()
				return "FAILED"
			if k[0] == "NOTRUN":
				c.execute("UPDATE Case_Execution SET Result=? WHERE ExecutionId=? AND CaseId=?",["NOTRUN",kwargs['exeId'],kwargs['caseId']])
				conn.commit()
				return "NOTRUN"
			if k[0] == "NOTIMP":
				c.execute("UPDATE Case_Execution SET Result=? WHERE ExecutionId=? AND CaseId=?",["NOTIMP",kwargs['exeId'],kwargs['caseId']])
				conn.commit()
				return "NOTIMP"
		c.execute("UPDATE Case_Execution SET Result=? WHERE ExecutionId=? AND CaseId=?",["RUN",kwargs['exeId'],kwargs['caseId']])
		conn.commit()
		return "RUN"
	
	def getJenkinsData(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT OB.ObjectId,OB.ObjectName,OB.ObjectVersion,Exe.ExecutionId,Exe.ExeName FROM Exe_Object AS EO LEFT JOIN Execution AS Exe ON EO.ExecutionId=Exe.ExecutionId LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId WHERE OB.ProjectId=? AND Exe.ProjectId=? ORDER BY OB.ObjectId DESC",[kwargs['projectId'],kwargs['projectId']])
		ExeObjectIds = c.fetchall()
		conn.commit()
		return ExeObjectIds
		
	def getJenkinsCaseResult(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		request=[]
		for k in kwargs['data']:
			#c.execute("SELECT CE.ExecutionId,CE.Result,CE.CaseId,CA.Title,SE.StepId,SE.Result FROM Case_Execution AS CE LEFT JOIN Cases AS CA ON CE.CaseId=CA.CaseId LEFT JOIN Step_Execution AS SE ON CE.Id=SE.Case_executionId WHERE CA.ProjectId=? AND CE.ExecutionId=?",[kwargs['projectId'],k[3]])
			c.execute("SELECT CE.ExecutionId,CE.Result,CE.CaseId,CA.Title FROM Case_Execution AS CE LEFT JOIN Cases AS CA ON CE.CaseId=CA.CaseId WHERE CA.ProjectId=? AND CE.ExecutionId=? ORDER BY CE.Id DESC",[kwargs['projectId'],k[3]])
			request+=c.fetchall()
			conn.commit()
		return request
		
	#----Charts----
	def getDataForCharts(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT CE.ExecutionId,CE.CaseId,CE.Result,CE.title,EX.ExeName,OB.ObjectId,OB.ObjectName,OB.ObjectVersion FROM Case_Execution AS CE LEFT JOIN Execution AS EX ON CE.ExecutionId=EX.ExecutionId LEFT JOIN Exe_Object AS EO ON CE.ExecutionId=EO.ExecutionId LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId WHERE EX.ProjectId=?",[kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getChartFilterData(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Objects WHERE ProjectId=?",[kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getFilteredPar(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		if kwargs['areaId'] == 0:
			query = "SELECT CE.Result,OB.ObjectName,OB.ObjectVersion,OB.ObjectId,CE.Id FROM Case_Execution AS CE LEFT JOIN Exe_Object AS EO ON CE.ExecutionId=EO.ExecutionId LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId WHERE"
			if kwargs['objectId'] != 0:
				query+=" EO.ObjectId="
				query+=str(kwargs['objectId'])
				query+=" AND"
			else:
				query+=" EO.ObjectId IS NOT NULL AND"
			if kwargs['status'] != "All":
				query+=" CE.Result='"
				query+=str(kwargs['status'])
				query+="'"
			else:
				query+=" CE.Result IS NOT NULL"
				kwargs['status']="NOT NULL"
		else:
			query = "SELECT CE.Result,OB.ObjectName,OB.ObjectVersion,OB.ObjectId,CE.Id FROM Case_Execution AS CE LEFT JOIN Exe_Object AS EO ON CE.ExecutionId=EO.ExecutionId LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId"
			query+= " LEFT JOIN Area_Object AS AO ON OB.ObjectId=AO.ObjectId WHERE"
			if kwargs['objectId'] != 0:
				query+=" EO.ObjectId="
				query+=str(kwargs['objectId'])
				query+=" AND"
			else:
				query+=" EO.ObjectId IS NOT NULL AND"
			if kwargs['status'] != "All":
				query+=" CE.Result='"
				query+=str(kwargs['status'])
				query+="' AND"
			else:
				query+=" CE.Result IS NOT NULL AND"
				kwargs['status']="NOT NULL"
				query+=" AO.AreaId="
				query+=str(kwargs['areaId'])
		c.execute(query)
		result=c.fetchall()
		conn.commit()
		return result
		
	#----Areas----
	def getAreas(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT AreaId,AreaTitle FROM Areas WHERE ProjectId=?",[kwargs['projectId']])
		result = c.fetchall()
		conn.commit()
		return result
	
	def getCaseArea(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT AR.AreaId,AR.AreaTitle FROM Area_Case AS AC LEFT JOIN Areas AS AR ON AC.AreaId=AR.AreaId WHERE AC.CaseId=?",[kwargs['caseId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getExeArea(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT AR.AreaId,AR.AreaTitle FROM Area_Execution AS AE LEFT JOIN Areas AS AR ON AE.AreaId=AR.AreaId WHERE AE.ExecutionId=?",[kwargs['exeId']])
		result=c.fetchall()
		conn.commit()
		return result
		
	def getSetArea(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT AR.AreaId,AR.AreaTitle FROM Area_Set AS ASE LEFT JOIN Areas AS AR ON ASE.AreaId=AR.AreaId WHERE ASE.SetId=?",[kwargs['setId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getObjectArea(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT AR.AreaId,AR.AreaTitle FROM Area_Object AS AO LEFT JOIN Areas AS AR ON AO.AreaId=AR.AreaId WHERE AO.ObjectId=?",[kwargs['objectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
DB = Database()