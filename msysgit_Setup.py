# --------------------this is test for local---------------
from pywinauto import application
import time

app = application.Application()
app.start(r"d:\\msysgit\\Git-1.8.3-preview20130601.exe")

time.sleep(8)
app.Connect_(best_match="Git SetUp")
# Welcome infomation
time.sleep(8)
app.GitSetup.Next.Click()
time.sleep(5)
#-----------------------------------
#GNU license
app.GitSetup.Next.Click()
time.sleep(5)

#Install location
app.GitSetup.Next.Click()
time.sleep(10)

#Select component  app.GitSetup.print_control_identifiers()
#choose 'Additional icons'
app.GitSetup.CheckListBox1.ClickInput(coords=(10,10))
#Scroll down
app.GitSetup.CheckListBox1.Scroll(direction='down',amount='line',count=1)
time.sleep(2)
#choose 'use a TrueType font in all console windows'
app.GitSetup.CheckListBox1.ClickInput(coords=(10,160))
time.sleep(2)
app.GitSetup.Next.Click()
time.sleep(5)

#Creat a start menu folder
app.GitSetup.CheckBox0.Click()
app.GitSetup.Next.Click()
time.sleep(5)

#use Git Bash only 
app.GitSetup.Next.Click()
time.sleep(5)

#Configurating the line ending conversions
app.GitSetup.Next.Click()

# wait for the installation
time.sleep(20)

#Complete
app.GitSetup.CheckListBox0.Click()
app.GitSetup.Finish.Click()
