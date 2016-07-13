import sqlite3

class Upload:
	def getTestFiles(self,**kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT UT.UploadTestId,UT.File_URL,UT.FileName,UT.Extension FROM Uploads_Test AS UT LEFT JOIN Step_Execution AS SE ON SE.Id=UT.Step_ExecutionId WHERE SE.ExecutionId=? AND StepId=?",[kwargs['exeId'],kwargs['stepId']])
		result=c.fetchall()
		conn.commit()
		return result
		
UP = Upload()