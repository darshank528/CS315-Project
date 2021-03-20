import numpy as np
import pandas as pd
import datetime

sql1 = 'insert into '
sql2 = ' values ('
sql3 = ');\n'

#FOR Accounts:

date = []
start_date = datetime.date(2020,1,1)
end_date = datetime.date(2020,12,31)
delta = datetime.timedelta(days = 1)
count = 0
while start_date<=end_date:
	date.append(start_date)
	start_date+=delta
	count = count + 1

expenditure = [int(i) for i in np.random.normal(60000, 7500,count)]
profit = [int(i) for i in np.random.normal(2500, 2500, count)]
food_wasted = [int(i) for i in (np.random.exponential(20, count) + 50)]

with open("accounts.sql",'w') as file:
	for i in range(count):
		dstr = '\'' + str(date[i]) + '\''
		estr = '\'' + str(expenditure[i]) + '\''
		pstr = '\'' + str(profit[i]) + '\''
		fstr = '\'' + str(food_wasted[i]) + '\''
		sql = sql1 + "accounts" + sql2 + dstr + ',' + pstr +',' + estr + ',' + fstr +sql3
		file.write(sql)

#FOR Chef
with open("chef.sql",'w') as file:
	for i in range(5):
		sal = np.random.choice([20000, 40000, 50000, 100000, 150000, 200000])
		if sal<100000:
			exp = str(int(np.random.uniform(1,5,1)))
		else:
			exp = str(int(np.random.uniform(5,10,1)))
		exp = '\'' + exp + '\''
		sal = '\'' + str(sal) + '\''
		tcdm = int(np.random.normal(5000, 1000, 1))
		#tcdm = np.where(tcdm>0 && tcdm<10000, tcdm, 5000)
		tcdm = '\'' + str(tcdm) + '\''
		sql = sql1 + "chef" + sql2 + str(i+1) + ',' + sal +',' + exp + ',' + tcdm +sql3
		file.write(sql)

#FOR Ingredients
with open("ingedients.sql",'w') as file:
	for i in range(20):
		qual = '\'' + str(np.random.choice([1,2,3,4,5,6,7,8,9,10])) + '\''
		sql = sql1 + "ingedients" + sql2 + str(i+1) + ',' + qual + sql3
		file.write(sql)


#For dishes
i = 1
with open("dishes.sql", 'w') as file:
	with open("dishes.txt",'r') as ifile:
		for line in ifile:
			#print(line)
			l2 = line[:-1]
			l = l2.split(',')
			#print(l)
			s = "'%s','%s','%s','%s'" % (l[1],l[2],l[3],l[0])
			s = str(i) + ',' + s
			sql = sql1 + "dishes" + sql2 + s + sql3
			file.write(sql)
			i = i + 1

#For customers

m_name = np.loadtxt("male_name.txt", dtype = str)
f_name = np.loadtxt("female_name.txt", dtype = str)
s_name = np.loadtxt("surname.txt", dtype = str)

with open("customers.sql",'w') as file:
	for i in range(1000):
		g = np.random.uniform()
		if(g<0.5):
			fn = np.random.choice(m_name)
			sex = 'm'
		else:
			fn = np.random.choice(f_name)
			sex = 'f'
		sn = np.random.choice(s_name)
		age = int(np.random.uniform()*60) + 18  
		g = np.random.uniform()
		if(g<0.5):
			mn = np.random.choice(f_name)
		else:
			mn = np.random.choice(m_name)
		of = int(np.random.uniform()*10)
		s = "'%s','%s','%s','%s','%s','%s','%s'" % (str(i+1),fn,mn,sn, sex, str(age),str(of))
		sql = sql1+ "customers" + sql2 + s + sql3
		file.write(sql)







