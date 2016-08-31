import sqlite3
import unittest, sys, os, time

class DeleteAll(unittest.TestCase):
	def test_001_delete(self):
		conn = sqlite3.connect("ROB_2016-Tarantula.s3db")
		c = conn.cursor()
		LoopCounter=526
		End=725
		while LoopCounter <= End:
			print((LoopCounter-526)/(End-526)*100)
			c.execute("SELECT COUNT(*) FROM Set_Case WHERE SetId=56 AND CaseId=?",[LoopCounter])
			limit=c.fetchone()
			limit = int(limit[0]) - 1
			if limit != 0:
				c.execute("""
								SELECT Id FROM Set_Case 
								WHERE SetId=56 AND CaseId=? 
								ORDER BY Id ASC LIMIT 
							"""+str(limit),[LoopCounter])
				result=c.fetchall()
				conn.commit()
				for id in result:
					c.execute("DELETE FROM Set_Case WHERE Id=?",[id[0]])
					conn.commit()
				LoopCounter = LoopCounter + 1
			
		
if __name__ == "__main__":
    unittest.main()