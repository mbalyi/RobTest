import unittest, sys, os, time, datetime
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select

class Backend:
	def Login(driver):
		"""
				Login into Test Management Tool.
		"""
		driver.get("http://127.0.0.1:5000/")
		
		name = driver.find_element_by_name('user')
		name.send_keys('admin')
		
		password = driver.find_element_by_name('password')
		password.send_keys('admin')
		
		driver.find_element_by_id('login').click()
		time.sleep(2)
		return driver
		
	def NavigateToObject(driver):
		"""
				Navigate to Design / Object menu.
		"""
		driver.find_element_by_link_text('Design').click()
		time.sleep(2)
		driver.find_element_by_link_text('Objects').click()
		time.sleep(2)
		return driver
	
	def NavigateToExecution(driver):
		"""
				Navigate to Design / Execution menu.
		"""
		driver.find_element_by_link_text('Design').click()
		time.sleep(2)
		driver.find_element_by_link_text('Executions').click()
		time.sleep(2)
		return driver
	
	def NavigateToTest(driver):
		"""
				Navigate to Test.
		"""
		driver.find_element_by_link_text('Test').click()
		time.sleep(2)
		return driver
	
	def currentDate():
		today = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
		return str(today)
	
class TestMenu(unittest.TestCase):
	def setUp(self):
		self.driver = webdriver.Chrome('C:\Program Files (x86)\Google\Chrome\chromedriver.exe')
		#self.driver = webdriver.Firefox()
		self.driver.set_window_size(1920, 1000)
		time.sleep(2)
	
	def test_001_AddObject(self):
		driver = Backend.Login(self.driver)
		driver = Backend.NavigateToObject(driver)
		driver.find_element_by_id('newObject').click()
		time.sleep(0.2)
		title = driver.find_element_by_name('name')
		title.clear()
		name = 'ILMS GUI Test - '+Backend.currentDate() 
		title.send_keys(name)
		time.sleep(0.2)
		version = driver.find_element_by_name('version')
		version.clear()
		version.send_keys('v2.1')
		driver.find_element_by_xpath("//input[@data-dbid='38']").click()
		driver.find_element_by_id('saveObject').click()
		self.driver = driver
	
	def test_002_AddExecution(self):
		driver = Backend.Login(self.driver)
		driver = Backend.NavigateToExecution(driver)
		driver.find_element_by_id('newExe').click()
		title = driver.find_element_by_name('title')
		title.clear()
		title.send_keys('Unit Test')
		driver.find_element_by_xpath("//input[@data-dbid='37']").click()
		"""
		el = driver.find_element_by_class_name('userSelector')
		for option in el.find_elements_by_tag_name('option'):
			if option.text == 'AutoTest':
				option.click()
				break
		"""
		select = Select(driver.find_element_by_class_name('userSelector'))
		select.select_by_visible_text("AutoTest")
		#element = driver.find_element_by_link_text('Unit Test')
		
		driver.find_element_by_css_selector("[data-clickid='addSet77']").click()
		time.sleep(0.5)
	
		driver.find_element_by_id('saveExe').click()
		self.driver = driver
	
	def test_003_Test(self):
		driver = Backend.Login(self.driver)
		driver = Backend.NavigateToTest(driver)
		
		driver.find_element_by_id('RUN').click()
		time.sleep(0.5)
		driver.find_element_by_id('RUN').click()
		time.sleep(0.5)
		driver.find_element_by_id('RUN').click()
		time.sleep(0.5)
		driver.find_element_by_id('BACK').click()
		time.sleep(0.5)
		driver.find_element_by_id('BACK').click()
		time.sleep(0.5)
		driver.find_element_by_id('NEXTCASE').click()
		time.sleep(0.5)
		driver.find_element_by_id('RUN').click()
		time.sleep(0.5)
		driver.find_element_by_id('RUN').click()
		time.sleep(0.5)
		driver.find_element_by_id('RUN').click()
		time.sleep(0.5)
		driver.find_element_by_id('NEXTCASE').click()
		time.sleep(0.5)
		try:
			buttons = BY.xpath("button")
			for btn in buttons:
				btn.click()
			variables = driver.find_element_by_partial_link_text("Variable")
			for var in variables:
				var.click()
				driver.find_element_by_link_text("x").filter(visible=True).click()
		except:
			print("qrva buttons")
		driver.find_element_by_id('RUN').click()
		time.sleep(0.5)
		driver.find_element_by_id('RUN').click()
		time.sleep(0.5)
		driver.find_element_by_id('RUN').click()
		time.sleep(0.5)
		driver.find_element_by_id('RUN').click()
		
	def tearDown(self):
		self.driver.close()
		
if __name__ == "__main__":
    unittest.main()