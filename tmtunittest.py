import unittest, sys, os, time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

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
		
	def NavigateToCaseMenu(driver):
		"""
				Navigate to Design / Case menu.
		"""
		driver.find_element_by_link_text('Design').click()
		time.sleep(2)
		driver.find_element_by_link_text('Cases').click()
		time.sleep(2)
		return driver

class CaseTest(unittest.TestCase):
	def setUp(self):
		self.driver = webdriver.Firefox()
		time.sleep(2)
	
	def test_001_AddCase(self):
		driver = Backend.Login(self.driver)
		driver = Backend.NavigateToCaseMenu(driver)
		driver.find_element_by_id('newCase').click()
		title = driver.find_element_by_name('title')
		title.clear()
		title.send_keys('New Case By AutoTest')
		driver.find_element_by_id('saveCase').click()
		self.driver = driver
	
	def test_002_EditCase(self):
		
		driver = Backend.NavigateToCaseMenu(Backend.Login(self.driver))
		
		driver.find_element_by_partial_link_text('AutoTest').click()
		
		driver.find_element_by_name('edit_case').click()
		time.sleep(1)
		data = driver.find_element_by_name('data')
		data.clear()
		data.send_keys("Short description from Robot.")
		
		action = driver.find_element_by_name('action[]')
		action.clear()
		action.send_keys('Default Action')
		result = driver.find_element_by_name('result[]')
		result.clear()
		result.send_keys('Default Result')
		
		driver.find_element_by_id('saveCase').click()
		
		self.driver=driver
	
	def test_003_DeleteCase(self):
		driver = Backend.Login(self.driver)
		driver = Backend.NavigateToCaseMenu(driver)
		driver.find_element_by_partial_link_text('AutoTest').click()
		
		driver.find_element_by_name('deleteCase').click()
		
		self.driver=driver
	
	def tearDown(self):
		self.driver.close()
		
if __name__ == "__main__":
    unittest.main()