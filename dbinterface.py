import sqlite3
	
class Database:	
	def login_querry(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT COUNT(*) FROM Users WHERE UserName=? AND UserPassword=? AND Active=?",[kwargs['title'],kwargs['pw'],1])
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
		c.execute("SELECT CaseId,Title FROM Cases WHERE ProjectId=? AND Active=? AND CaseUpdated=? ORDER BY Title ASC",[kwargs['projectId'],kwargs['active'],kwargs['update']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def get_case_name(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT Title FROM Cases WHERE CaseId=?",[kwargs['caseId']])
		result=c.fetchone()
		conn.commit()
		return result
	
	def save_case(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("INSERT INTO Cases (Title,Priority,Data,ProjectId,CaseUpdated,Active) VALUES (?,?,?,?,?,?)",[kwargs['title'],kwargs['priority'],kwargs['data'],kwargs['projectId'],0,1])
		conn.commit()
		c.execute("""
			SELECT CaseId 
			FROM Cases 
			WHERE Title=? 
			AND Priority=? 
			AND Data=? 
			AND ProjectId=? 
			AND Active=? 
			AND CaseUpdated=? 
			ORDER BY CaseId DESC""",
			[kwargs['title'],kwargs['priority'],kwargs['data'],kwargs['projectId'],1,0])
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
			c.execute("SELECT StepId FROM Steps WHERE Action=? AND Result=? AND ProjectId=? ORDER BY StepId DESC",[k,l,kwargs['projectId']])
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
		if result != None:
			for k in result:
				c.execute("SELECT * FROM Steps WHERE StepId=? AND ProjectId=?",[k[0],kwargs['projectId']])
				tupleList=c.fetchone()
				strList=list(tupleList)
				strList[1]=strList[1].encode('ascii', 'replace').decode("utf-8", "replace")
				strList[2]=strList[2].encode('ascii', 'replace').decode("utf-8", "replace")
				tupleList=tuple(strList)
				case_parameter.append(tupleList)
				conn.commit()
			return case_parameter
		else:
			return False
	
	def get_case_step(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT CA.Title,CA.Priority,CA.Data,ST.Action,ST.Result
			FROM Cases AS CA
			LEFT JOIN Case_Step AS CS ON CA.CaseId=CS.CaseId
			LEFT JOIN Steps AS ST ON ST.StepId=CS.StepId
			WHERE CA.CaseId=? 
			AND CA.ProjectId=?
			ORDER BY CA.CaseId ASC
			""",
			[kwargs['caseId'],kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def deleteCase(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("DELETE FROM Cases WHERE CaseId=? AND ProjectId=?",[kwargs['id'],kwargs['projectId']])
		conn.commit()
		c.execute("DELETE FROM Uploads_Case WHERE CaseId=?",[kwargs['id']])
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
	
	def deleteCaseLogic(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Cases SET Active=0 WHERE CaseId=? AND ProjectId=?",[kwargs['id'],kwargs['projectId']])
		conn.commit()
		return
	
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
	
	def updateCaseLogic(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Cases SET CaseUpdated=1 WHERE CaseId=?",[kwargs['caseId']])
		conn.commit()
		return
	
	def caseUpdateFlag(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Cases SET UpdateFromId=? WHERE CaseId=?",[kwargs['oldCaseId'],kwargs['newCaseId']])
		conn.commit()
		return
	
	def getCaseFiles(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Uploads_Case WHERE CaseId=?",[kwargs['caseId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getStepPics(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		result=[]
		if isinstance(kwargs['stepIds'], list):
			for k in kwargs['stepIds']:
				c.execute("SELECT * FROM Uploads_Step WHERE StepId=?",[k])
				result.append(c.fetchall())
				conn.commit()
		else:
			c.execute("SELECT * FROM Uploads_Step WHERE StepId=?",[kwargs['stepIds']])
			result.append(c.fetchall())
			conn.commit()
		return result
	
	#-----object-----
	def get_object(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ObjectId,ObjectName FROM Objects WHERE ProjectId=? AND Active=? ORDER BY ObjectId DESC",[kwargs['projectId'],kwargs['active']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def save_object(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			INSERT INTO Objects 
			(ObjectName,ObjectHardware,ObjectDesc,ProjectId,ObjectVersion,Active) 
			VALUES (?,?,?,?,?,?)""",
			[kwargs['name'],kwargs['hardware'],kwargs['desc'],kwargs['projectId'],kwargs['version'],1])
		conn.commit()
		c.execute("""
			SELECT ObjectId 
			FROM Objects 
			WHERE ObjectName=? 
			AND ObjectHardware=? 
			AND ObjectDesc=? 
			AND ProjectId=? 
			AND ObjectVersion=? 
			AND Active=?
			ORDER BY ObjectId DESC""",
			[kwargs['name'],kwargs['hardware'],kwargs['desc'],kwargs['projectId'],kwargs['version'],1])
		ObjectID=c.fetchone()
		conn.commit()
		for k in kwargs['areas']:
			c.execute("INSERT INTO Area_Object (AreaId,ObjectId) VALUES (?,?)",[k,ObjectID[0]])
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
		c.execute("DELETE FROM Uploads_Object WHERE ObjectId=?",[kwargs['id']])
		conn.commit()
	
	def deleteObjectLogical(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Objects SET Active=0 WHERE ObjectId=? AND ProjectId=?",[kwargs['id'],kwargs['projectId']])
		conn.commit()
	
	def getObjectFiles(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Uploads_Object WHERE ObjectId=?",[kwargs['obId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def checkFileInObjects(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Uploads_Object WHERE ObjectId=? AND FileName=?",[kwargs['objectId'],kwargs['filename']])
		result=c.fetchone()
		conn.commit()
		return result
	
	#-----set-----
	def get_set(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT SetId,SetName FROM Sets WHERE ProjectId=? AND Active=? AND SetUpdated=? ORDER BY SetId DESC",[kwargs['projectId'],kwargs['active'],kwargs['update']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def save_set(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("INSERT INTO Sets (SetName,SetDate,SetPriority,ProjectId,Active,SetUpdated) VALUES (?,?,?,?,?,?)",[kwargs['name'],kwargs['date'],kwargs['priority'],kwargs['projectId'],1,0])
		conn.commit()
		c.execute("SELECT SetId FROM Sets WHERE SetName=? AND ProjectId=? AND Active=? AND SetUpdated=?",[kwargs['name'],kwargs['projectId'],1,0])
		setID=c.fetchone()
		conn.commit()
		for k in kwargs['areas']:
			c.execute("INSERT INTO Area_Set (AreaId,SetId) VALUES (?,?)",[k,setID[0]])
			conn.commit()
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
	
	def updateSetLogical(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Sets SET SetUpdated=? WHERE SetId=?",[1,kwargs['setId']])
		conn.commit()
		
	def setUpdateFlag(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Sets SET UpdateFromId=? WHERE SetId=?",[kwargs['oldSetId'],kwargs['newSetId']])
		conn.commit()
	
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
		c.execute("DELETE FROM Uploads_Set WHERE SetId=?",[kwargs['id']])
		conn.commit()
	
	def deleteSetLogical(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Sets SET Active=? WHERE SetId=?",[0,kwargs['id']])
		conn.commit()
	
	def checkFileInSets(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Uploads_Set WHERE SetId=? AND FileName=?",[kwargs['setId'],kwargs['filename']])
		result=c.fetchone()
		conn.commit()
		return result
	
	def getSetFiles(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Uploads_Set WHERE SetId=?",[kwargs['setId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	#-----execution-----
	def getExecution(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ExecutionId,ExeName FROM Execution WHERE ProjectId=? ORDER BY ExecutionId DESC",[kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
		
	def saveExe(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("INSERT INTO Execution (ExeName,ProjectId) VALUES (?,?)",[kwargs['name'],kwargs['projectId']])
		conn.commit()
		c.execute("SELECT ExecutionId FROM Execution WHERE ExeName=? AND ProjectId=? ORDER BY ExecutionId DESC",[kwargs['name'],kwargs['projectId']])
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
		c.execute("DELETE FROM Area_Execution WHERE ExecutionId=?",[kwargs['id']])
		conn.commit()
		c.execute("DELETE FROM Uploads_Execution WHERE ExecutionId=?",[kwargs['id']])
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
	
	def getExeResult(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT Id,title,Result,CaseId,ExecutionId FROM Case_Execution WHERE ExecutionId=? ORDER BY CaseId DESC",[kwargs['exeId']])
		caseExeId=c.fetchall()
		conn.commit()
		return caseExeId
	
	def getOneExe(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ExecutionId,ExeName FROM Execution WHERE ExecutionId=?",[kwargs['exeId']])
		ExeId=c.fetchone()
		conn.commit()
		return ExeId
	
	def getExeOBHist(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT EX.ExecutionId,EX.ExeName,OB.ObjectName 
			FROM Execution AS EX 
			LEFT JOIN Exe_Object AS EO ON EX.ExecutionId=EO.ExecutionId 
			LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId 
			WHERE OB.Active=1 
			AND EX.ProjectId=? 
			AND EX.ExecutionId=?""",
			[kwargs['projectId'],kwargs['exeId']])
		result=c.fetchone()
		conn.commit()
		return result
		
	def getExeOBLimit(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		query="""
			SELECT EX.ExecutionId,EX.ExeName,OB.ObjectName 
			FROM Execution AS EX 
			LEFT JOIN Exe_Object AS EO ON EX.ExecutionId=EO.ExecutionId 
			LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId 
			LEFT JOIN Case_Execution AS CE ON CE.ExecutionId=EX.ExecutionId 
			WHERE OB.Active=1 
			AND EX.ProjectId=? 
			AND CE.CaseId=? 
			ORDER BY OB.ObjectId 
			LIMIT """+str(kwargs['limit'])
		c.execute(query,[kwargs['projectId'],kwargs['caseIds'][0][0]])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getStepExeId(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT Id FROM Step_Execution WHERE StepId=? AND ExecutionId=?",[kwargs['stepId'],kwargs['exeId']])
		id=c.fetchone()
		conn.commit()
		return id[0]
	
	def checkFileInExes(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Uploads_Execution WHERE ExecutionId=? AND FileName=?",[kwargs['exeId'],kwargs['filename']])
		result=c.fetchone()
		conn.commit()
		return result
	
	def getExeFiles(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Uploads_Execution WHERE ExecutionId=?",[kwargs['exeId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getExeComments(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT SE.ExecutionId,SE.Comment,CE.CaseId,CE.Id 
			FROM Step_Execution AS SE 
			LEFT JOIN Case_Execution AS CE ON CE.Id=SE.Case_ExecutionId 
			WHERE SE.ExecutionId=?""",
			[kwargs['exeId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getExeStepFiles(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT UT.UploadTestId,UT.File_URL,UT.FileName,CE.CaseId,CE.Id 
			FROM Uploads_Test AS UT 
			LEFT JOIN Step_Execution AS SE ON UT.Step_ExecutionId=SE.Id 
			LEFT JOIN Case_Execution AS CE ON CE.Id=SE.Case_ExecutionId 
			WHERE SE.ExecutionId=?""",
			[kwargs['exeId']])
		result=c.fetchall()
		conn.commit()
		return result
	
    #-----Projects-----
	def getProjects(self):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ProjectId,Name,Active FROM Projects")
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
			if k[0] == "SKIPPED":
				c.execute("UPDATE Case_Execution SET Result=? WHERE ExecutionId=? AND CaseId=?",["SKIPPED",kwargs['exeId'],kwargs['caseId']])
				conn.commit()
				return "SKIPPED"
		c.execute("UPDATE Case_Execution SET Result=? WHERE ExecutionId=? AND CaseId=?",["RUN",kwargs['exeId'],kwargs['caseId']])
		conn.commit()
		return "RUN"
	
	def saveComment(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Step_Execution SET Comment=? WHERE ExecutionId=? AND StepId=?",[kwargs['comment'],kwargs['exeId'],kwargs['stepId']])
		conn.commit()
		return
	
	def deleteFilesInTest(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT Id FROM Step_Execution WHERE ExecutionId=?",[kwargs['exeId']])
		Ids=c.fetchall()
		conn.commit()
		for k in Ids:
			c.execute("DELETE FROM Uploads_Test WHERE Step_ExecutionId=?",[k[0]])
			conn.commit()
		return
	
	
	#-----Jenkins----
	def getJenkinsData(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		objectLimit="SELECT ObjectId FROM Objects WHERE Active=1 ORDER BY ObjectId DESC LIMIT "+str(kwargs['limit'])
		c.execute(objectLimit)
		objectId=c.fetchall()
		objectId=objectId[-1]
		conn.commit()
		query="""
			SELECT OB.ObjectId,OB.ObjectName,OB.ObjectVersion,Exe.ExecutionId,Exe.ExeName 
			FROM Exe_Object AS EO 
			LEFT JOIN Execution AS Exe ON EO.ExecutionId=Exe.ExecutionId 
			LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId 
			WHERE OB.ProjectId=? 
			AND Exe.ProjectId=? 
			AND OB.ObjectId>=? 
			ORDER BY OB.ObjectId DESC"""
		c.execute(query,[kwargs['projectId'],kwargs['projectId'],objectId[0]])
		ExeObjectIds = c.fetchall()
		conn.commit()
		return ExeObjectIds
		
	def getJenkinsCaseResult(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		request=[]
		for k in kwargs['data']:
			c.execute("""
				SELECT CE.ExecutionId,CE.Result,CE.CaseId,CA.Title 
				FROM Case_Execution AS CE 
				LEFT JOIN Cases AS CA ON CE.CaseId=CA.CaseId 
				WHERE CA.ProjectId=? 
				AND CE.ExecutionId=? 
				ORDER BY CE.Id DESC""",
				[kwargs['projectId'],k[3]])
			request+=c.fetchall()
			conn.commit()
		return request
	
	def getExeOBTest(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT EX.ExecutionId, EX.ExeName, OB.ObjectId, OB.ObjectName
			FROM Execution AS EX
			LEFT JOIN Exe_Object AS EO ON EX.ExecutionId=EO.ExecutionId
			LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId
			WHERE OB.Active=1 AND EX.ProjectId=?
			ORDER BY EX.ExecutionId DESC
			""",
			[kwargs['projectId']]
		)
		result=c.fetchall()
		conn.commit()
		return result
	
	#----Charts----
	def getDataForCharts(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		objectLimit="SELECT ObjectId FROM Objects ORDER BY ObjectId DESC LIMIT "+str(kwargs['interval'])
		c.execute(objectLimit)
		objectId=c.fetchall()
		objectId=objectId[-1]
		conn.commit()
		query="""
			SELECT CE.ExecutionId,CE.CaseId,CE.Result,CE.title,
			EX.ExeName,OB.ObjectId,OB.ObjectName,OB.ObjectVersion 
			FROM Case_Execution AS CE 
			LEFT JOIN Execution AS EX ON CE.ExecutionId=EX.ExecutionId 
			LEFT JOIN Exe_Object AS EO ON CE.ExecutionId=EO.ExecutionId 
			LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId 
			WHERE EX.ProjectId=? 
			AND OB.ObjectId>=? 
			ORDER BY OB.ObjectId DESC"""
		c.execute(query,[kwargs['projectId'],objectId[0]])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getChartFilterData(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Objects WHERE ProjectId=? AND Active=1 ORDER BY ObjectId DESC LIMIT 20",[kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def reloadChartFilterData(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		if kwargs['obId'] != 0:
			c.execute("""
				SELECT EO.Id,EO.ExecutionId,EX.ExeName,EO.ObjectId,OB.ObjectName 
				FROM Exe_Object AS EO 
				LEFT JOIN Execution AS EX ON EX.ExecutionId=EO.ExecutionId 
				LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId 
				WHERE OB.ProjectId=? 
				AND OB.Active=1 
				AND OB.ObjectId=? 
				ORDER BY OB.ObjectId DESC""",
				[kwargs['projectId'],kwargs['obId']])
		else:
			c.execute("""
				SELECT EO.Id,EO.ExecutionId,EX.ExeName,EO.ObjectId,OB.ObjectName 
				FROM Exe_Object AS EO 
				LEFT JOIN Execution AS EX ON EX.ExecutionId=EO.ExecutionId 
				LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId 
				WHERE OB.ProjectId=? 
				AND OB.Active=1 
				AND OB.ObjectId IS NOT NULL 
				ORDER BY OB.ObjectId DESC""",
				[kwargs['projectId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getFilteredPar(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		objectLimit="SELECT ObjectId FROM Objects ORDER BY ObjectId DESC LIMIT "+str(kwargs['interval'])
		c.execute(objectLimit)
		objectId=c.fetchall()
		objectId=objectId[-1]
		conn.commit()
		if kwargs['areaId'] == 0:
			query = """
				SELECT CE.Result,OB.ObjectName,OB.ObjectVersion,OB.ObjectId,CE.Id FROM Case_Execution AS CE 
				LEFT JOIN Exe_Object AS EO ON CE.ExecutionId=EO.ExecutionId 
				LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId 
				WHERE"""
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
			query = """
				SELECT CE.Result,OB.ObjectName,OB.ObjectVersion,OB.ObjectId,CE.Id 
				FROM Case_Execution AS CE 
				LEFT JOIN Exe_Object AS EO ON CE.ExecutionId=EO.ExecutionId 
				LEFT JOIN Objects AS OB ON EO.ObjectId=OB.ObjectId
				LEFT JOIN Area_Object AS AO ON OB.ObjectId=AO.ObjectId 
				WHERE"""
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
		query+=" AND OB.ObjectId>="
		query+=str(objectId[0])
		if kwargs['exeId'] != 0:
			query+=" AND CE.ExecutionId="
			query+=str(kwargs['exeId'])
		query+=" ORDER BY OB.ObjectId DESC"
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
		c.execute("""
			SELECT AR.AreaId,AR.AreaTitle FROM Area_Case AS AC 
			LEFT JOIN Areas AS AR ON AC.AreaId=AR.AreaId 
			WHERE AC.CaseId=?""",
			[kwargs['caseId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getExeArea(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT AR.AreaId,AR.AreaTitle 
			FROM Area_Execution AS AE 
			LEFT JOIN Areas AS AR ON AE.AreaId=AR.AreaId 
			WHERE AE.ExecutionId=?""",
			[kwargs['exeId']])
		result=c.fetchall()
		conn.commit()
		return result
		
	def getSetArea(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT AR.AreaId,AR.AreaTitle 
			FROM Area_Set AS ASE 
			LEFT JOIN Areas AS AR ON ASE.AreaId=AR.AreaId 
			WHERE ASE.SetId=?""",
			[kwargs['setId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getObjectArea(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT AR.AreaId,AR.AreaTitle 
			FROM Area_Object AS AO 
			LEFT JOIN Areas AS AR ON AO.AreaId=AR.AreaId 
			WHERE AO.ObjectId=?""",
			[kwargs['objectId']])
		result=c.fetchall()
		conn.commit()
		return result
		
	#------Admin------
	def updatePw(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT UserPassword FROM Users WHERE UserId=?",[kwargs['id']])
		username=c.fetchone()
		conn.commit()
		if username[0] == kwargs['oldPw']:
			c.execute("UPDATE Users SET UserPassword=? WHERE UserId=?",[kwargs['newPw'],kwargs['id']])
			conn.commit()
			return "success"
		return "false"
	
	def isAdmin(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT RO.RoleName FROM Users AS US LEFT JOIN Roles AS RO ON US.RoleId=RO.RoleId WHERE US.UserName=?",[kwargs['user']])
		result=c.fetchone()
		conn.commit()
		return result[0]
	
	def getUsers(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT US.UserId,US.UserName,US.Active,Us.ProjectId,US.RoleId,RO.RoleName 
			FROM Users AS US 
			LEFT JOIN Roles AS RO ON US.RoleId=RO.RoleId
			""")
		result=c.fetchall()
		conn.commit()
		return result;
	
	def getRoles(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT RoleId,RoleName FROM Roles")
		result=c.fetchall()
		conn.commit()
		return result
		
	def updateUserRole(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Users SET RoleId=? WHERE UserId=?",[kwargs['roleId'],kwargs['userId']])
		conn.commit()
		return "OK"
	
	def userActive(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		if kwargs['userStatus'] == "active":
			c.execute("UPDATE Users SET Active=? WHERE UserId=?",[1,kwargs['userId']])
		else:
			c.execute("UPDATE Users SET Active=? WHERE UserId=?",[0,kwargs['userId']])
		conn.commit()
		return "OK"
	
	def deleteUser(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("DELETE FROM Users WHERE UserId=?",[kwargs['userId']])
		conn.commit()
		return
	
	def saveUser(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT UserId FROM Users WHERE UserName=?",[kwargs['userName']])
		result=c.fetchone()
		conn.commit()
		if result == None:
			projectId=int(kwargs['projectId'])
			roleId=int(kwargs['roleId'])
			c.execute("INSERT INTO Users (UserName,UserPassword,ProjectId,RoleId,Active) VALUES (?,?,?,?,?)",[kwargs['userName'],kwargs['pw'],projectId,roleId,1])
			conn.commit()
			return "success"
		return "failed"
		
	def projectActive(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		if kwargs['projectStatus'] == "active":
			c.execute("UPDATE Projects SET Active=? WHERE ProjectId=?",[1,kwargs['projectId']])
		else:
			c.execute("UPDATE Projects SET Active=? WHERE ProjectId=?",[0,kwargs['projectId']])
		conn.commit()
		return "OK"
	
	def deleteProject(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("DELETE FROM Projects WHERE ProjectId=?",[kwargs['projectId']])
		conn.commit()
		return
	
	def saveProject(self,**kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT ProjectId FROM Projects WHERE Name=?",[kwargs['projectName']])
		result=c.fetchone()
		conn.commit()
		if result == None:
			c.execute("INSERT INTO Projects (Name,Active) VALUES (?,?)",[kwargs['projectName'],1])
			conn.commit()
			c.execute("SELECT ProjectId FROM Projects WHERE Name=? AND Active=?",[kwargs['projectName'],1])
			id=c.fetchone()
			conn.commit()
			return id[0]
		return "failed"
	
	
	def updateStepExeCorrectWay(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT CE.ExecutionId,CE.Id FROM Case_Execution AS CE LEFT JOIN Step_Execution AS SE ON SE.Case_ExecutionId=CE.Id")
		result=c.fetchall()
		conn.commit()
		j=1
		count=len(list(result))
		for k in result:
			c.execute("UPDATE Step_Execution SET ExecutionId=? WHERE Case_ExecutionId=?",[k[0],k[1]])
			conn.commit()
			j=j+1
		return
	
	def getLastExes(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		query1="SELECT ExecutionId FROM Case_Execution WHERE CaseId=? ORDER BY ExecutionId DESC LIMIT "+str(kwargs['limit'])
		c.execute(query1,[kwargs['caseIds'][0][0]])
		exeIds = c.fetchall()
		conn.commit()
		exes=[]
		for k in exeIds:
			query="""
				SELECT EO.ExecutionId,EX.ExeName,OB.ObjectName 
				FROM Exe_Object AS EO 
				LEFT JOIN Execution AS EX ON EO.ExecutionId=EX.ExecutionId 
				LEFT JOIN Objects AS OB ON OB.ObjectId=EO.ObjectId 
				WHERE EX.ExecutionId=?"""
			c.execute(query,[k[0]])
			exes.append(c.fetchall())
			conn.commit()
		for j in exes:
			for l in j:
				tupList=list(l)
				tupList[1]=tupList[1].encode('ascii', 'backslashreplace').decode("utf-8", "replace")
				tupList[2]=tupList[2].encode('ascii', 'backslashreplace').decode("utf-8", "replace")
				l=tupList
		return exes
	
	def getExeTitles(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		temp=[]
		for j in kwargs['exeIds']:
			for k in j:
				c.execute("SELECT title FROM Case_Execution WHERE ExecutionId=?",[k[0]])
				temp.append(c.fetchall())
				conn.commit()
		return temp
	
	def getCaseHistory(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		exeIds=kwargs['exeIds']
		temp=[]
		iterator=0
		for j in exeIds:
			for k in j:
				c.execute("SELECT Result FROM Case_Execution WHERE ExecutionId=?",[k[0]])
				res=c.fetchall()
				temp.append(res)
				conn.commit()
				for l in temp[iterator]:
					tupList=list(l)
					tupList[0]=tupList[0].encode('ascii', 'backslashreplace').decode("utf-8", "replace")
					l=tupList
				iterator=iterator+1
		result=[]
		it2=0
		for j in temp[0]:
			it3=0
			result.append([])
			for l in exeIds:
				result[it2].append(temp[it3][it2][0])
				it3=it3+1
			it2=it2+1
		return result
	
	def getStepHistory(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		exeIds=kwargs['exeIds']
		temp=[]
		iterator=0
		for j in exeIds:
			for k in j:
				c.execute("SELECT Result FROM Step_Execution WHERE ExecutionId=?",[k[0]])
				res=c.fetchall()
				temp.append(res)
				conn.commit()
				for l in temp[iterator]:
					tupList=list(l)
					tupList[0]=tupList[0].encode('ascii', 'backslashreplace').decode("utf-8", "replace")
					l=tupList
				iterator=iterator+1
		result=[]
		it2=0
		for j in temp[1]:
			it3=0
			result.append([])
			for l in exeIds:
				result[it2].append(temp[it3][it2][0])
				it3=it3+1
			it2=it2+1
		return result
	
	def getStepTitles(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		temp=[]
		for j in kwargs['exeIds']:
			for k in j:
				c.execute("""
					SELECT ST.Action 
					FROM Steps AS ST 
					LEFT JOIN Case_Step AS CS ON ST.StepId=CS.StepId 
					LEFT JOIN Case_Execution AS CE ON CE.CaseId=CS.CaseId 
					WHERE CE.ExecutionId=?""",
					[k[0]])
				temp.append(c.fetchall())
				conn.commit()
		temp2=[]
		for j in temp:
			for l in j:
				tupList=list(l)
				tupList[0]=tupList[0].encode('ascii', 'backslashreplace').decode("utf-8", "replace")
				l=tupList[0]
				temp2.append(tupList[0])
		return temp2
	
	def getResultCases(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		temp=[]
		for k in kwargs['exes']:
			c.execute("SELECT CaseId,Result FROM Case_Execution WHERE ExecutionId=?",[k[0]])
			temp.append(c.fetchall())
			conn.commit()
		it1=0
		sortedTemp=[]
		for k in temp[0]:
			sortedTemp.append([k[0],[]])
			it2=0
			for j in kwargs['exes']:
				sortedTemp[it1][1].append(temp[it2][it1][1])
				it2=it2+1
			it1=it1+1
		result=[]
		for k in sortedTemp:
			failed=0
			for j in k[1]:
				if j == "FAILED":
					failed=failed+1
			calc=failed/5
			result.append([k[0],calc])
		return result
	
	def getCaseResHist(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("""
			SELECT ExecutionId,CaseId,Result,title 
			FROM Case_Execution 
			WHERE CaseId=? 
			ORDER BY ExecutionId DESC""",
			[kwargs['caseId']])
		result=c.fetchall()
		conn.commit()
		return result
	
	def getExesForCases(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		result=[]
		for k in kwargs['cases']:
			c.execute("""
				SELECT EX.ExeName,OB.ObjectName 
				FROM Case_Execution AS CE 
				LEFT JOIN Execution AS EX ON CE.ExecutionId=EX.ExecutionId 
				LEFT JOIN Exe_Object AS EO ON EX.ExecutionId=EO.ExecutionId 
				LEFT JOIN Objects AS OB ON OB.ObjectId=EO.ObjectId 
				WHERE CE.CaseId=? 
				AND CE.ExecutionId=?""",
				[k[1],k[0]])
			result.append(c.fetchall())
			conn.commit()
		return result
	
DB = Database()