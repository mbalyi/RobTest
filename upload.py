import sqlite3

class Upload:
	def getTestFiles(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT UT.UploadTestId,UT.File_URL,UT.FileName,UT.Extension,UT.Step_ExecutionId FROM Uploads_Test AS UT LEFT JOIN Step_Execution AS SE ON SE.Id=UT.Step_ExecutionId WHERE SE.ExecutionId=? AND StepId=?",[kwargs['exeId'],kwargs['stepId']])
		result=c.fetchall()
		conn.commit()
		return result
		
	def saveTestFile(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("INSERT INTO Uploads_Test (Step_ExecutionId,File_URL,FileName,Extension) VALUES (?,?,?,?)",[kwargs['stepexeId'],kwargs['url'],kwargs['filename'],kwargs['extension']])
		conn.commit()
		c.execute("SELECT * FROM Uploads_Test WHERE Step_ExecutionId=? AND File_URL=? AND FileName=? AND Extension=?",[kwargs['stepexeId'],kwargs['url'],kwargs['filename'],kwargs['extension']])
		result = c.fetchone()
		conn.commit()
		return result
	
	def deleteFileTest(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("DELETE FROM Uploads_Test WHERE UploadTestId=?",[kwargs['fileId']])
		conn.commit()
		return "success"
	
UP = Upload()