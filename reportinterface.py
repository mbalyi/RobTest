import sqlite3
from datetime import datetime

class ReportDatabase:
	def login_querry(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT COUNT(*) FROM Users WHERE UserName = ? AND UserPassword= ?",[kwargs['title'],kwargs['pw']])
		result=c.fetchone()
		return result[0]
	
	def getRecords(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Records ORDER BY RecDate DESC")
		result=c.fetchall()
		return result;
	
	def save_report(self, **kwargs):
		currentDate = datetime.now();
		now=currentDate.year
		now+=currentDate.month
		now+=currentDate.day
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("INSERT INTO Records (Title,User,RecDate,Report) VALUES (?,?,?,?)",[kwargs['title'],kwargs['user'],kwargs['date'],kwargs['report']])
		conn.commit()
	
	def getRepPar(self, **kwargs):
		conn = sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT * FROM Records WHERE RecordId=?",[kwargs['ID']])
		result=c.fetchone()
		return result
		
	def save_edited_record(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("UPDATE Records SET Title=?,User=?,RecDate=?,Report=? WHERE RecordId=?",[kwargs['title'],kwargs['user'],kwargs['date'],kwargs['report'],kwargs['ID']])
		conn.commit()
	
	def saveNewUser(self, **kwargs):
		num=0;
		active=0;
		bann=0;
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		for k,v in zip(kwargs['name'],kwargs['password']):
			for l in kwargs['active']:
				if (int(l) == num):
					active=1;
			for l in kwargs['bann']:
				if (int(l) == num):
					bann=1;
			c.execute("INSERT INTO Users (Username,UserPassword,Active,Banned) VALUES (?,?,?,?)",[k,v,active,bann])
			conn.commit()
			num=num+1;
			active=0;
			bann=0;
			
	def deleteUser(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		for k in kwargs['ID']:
			c.execute("DELETE FROM Users WHERE UserId=?",[int(k)])
			conn.commit()
			
	def updatePw(self, **kwargs):
		conn= sqlite3.connect("ROB_2016.s3db")
		c = conn.cursor()
		c.execute("SELECT UserPassword FROM Users WHERE UserId=?",[kwargs['ID']])
		result=c.fetchone()
		if (kwargs['oldPw'] == result[0]):
			c.execute("UPDATE Users SET UserPassword=? WHERE UserId=?",[kwargs['newPw'],kwargs['ID']])
			conn.commit()
	
Report = ReportDatabase()