import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class Messenger:
	def EmailSender(sender,smtp,port,address,html):
		"""
			Email sender function uses the local SMTP server in Budapest.
		"""
		me = str(sender)
		
		msg = MIMEMultipart('alternative')
		msg['Subject'] = "ILMS GUI Test Auto Mail - Daily report"
		msg['From'] = me
		
		part = MIMEText(html, 'html')

		msg.attach(part)

		# Send the message via local SMTP server.
		s = smtplib.SMTP(str(smtp),int(port))
		
		for ad in address:
			you = ad
			msg['To'] = you
			s.sendmail(me, you, msg.as_string())
		s.quit()