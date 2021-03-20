import numpy as np
import pandas as pd
import datetime
import random

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


#FOR Ingredients
with open("ingredients.sql",'w') as file:
	with open("ingredients.txt",'r') as ifile:
		for line in ifile:
			l2 = line[:-1]
			l = l2.split(',')
			sql = sql1 + "ingredients" + sql2 + l[0] + ',' + '\'' +l[1] + '\'' + sql3
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

#FOR THE STAFF

num_chefs = 5
num_waiters = 5
num_receptionists = 3
num_managers = 3
num_owners = 2
num_staff = num_owners+num_managers+num_receptionists+num_waiters+num_chefs+10
with open("staff.sql",'w') as file:
	for i in range(num_staff):
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

		exp = str(int(np.random.uniform(0,age-18,1)))
		sal = 0
		occ = 0
		tcdm = 1
		role = "unspecified"
		if(i<num_owners):
			role = "owner"
		elif(num_owners<=i and i<num_owners+num_managers):
			role = "manager"
			sal = np.random.choice([20000, 40000, 50000, 100000, 150000, 200000])
		elif(num_owners+num_managers<=i and i<num_owners+num_managers+num_receptionists):
			role = "receptionist"
			sal = np.random.choice([10000, 20000, 30000, 400000, 50000])
		elif(num_owners+num_managers+num_receptionists<=i and i<num_owners+num_managers+num_receptionists+num_waiters):
			role = "waiter"
			sal = np.random.choice([5000,7000,10000,15000,20000,30000])
		elif(num_owners+num_managers+num_receptionists+num_waiters<=i and i<num_owners+num_managers+num_receptionists+num_waiters+num_chefs):
			role = "chef"
			tcdm = int(np.random.normal(5000, 1000, 1))
			sal = np.random.choice([20000, 40000, 50000, 100000, 150000, 200000])
			if sal<100000:
				exp = str(int(np.random.uniform(1,5,1)))
			else:
				exp = str(int(np.random.uniform(5,10,1)))


		s = "'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s'" % (str(i+1),fn,mn,sn, sex, str(age),str(sal),str(exp),str(occ),str(tcdm),role)
		sql = sql1+ "staff" + sql2 + s + sql3
		file.write(sql)

# cum = num_owners
# with open("owners.sql",'w') as file:
# 	for i in range(cum):
# 		sql = sql1 + "owners" + sql2 + str(i+1) + sql3
# 		file.write(sql)

# with open("receptionist.sql",'w') as file:
# 	for i in range(cum,cum+num_receptionists):
# 		sal = np.random.choice([10000, 20000, 30000, 400000, 50000])
# 		sql = sql1 + "receptionist" + sql2 + str(i+1) + ',' + str(sal) + sql3
# 		file.write(sql)

# cum = cum+num_receptionists

# #FOR Chef
# with open("chef.sql",'w') as file:
# 	for i in range(cum, cum+num_chefs):
# 		sal = np.random.choice([20000, 40000, 50000, 100000, 150000, 200000])
# 		if sal<100000:
# 			exp = str(int(np.random.uniform(1,5,1)))
# 		else:
# 			exp = str(int(np.random.uniform(5,10,1)))
# 		exp = '\'' + exp + '\''
# 		sal = '\'' + str(sal) + '\''
# 		tcdm = int(np.random.normal(5000, 1000, 1))
# 		#tcdm = np.where(tcdm>0 && tcdm<10000, tcdm, 5000)
# 		tcdm = '\'' + str(tcdm) + '\''
# 		sql = sql1 + "chef" + sql2 + str(i+1) + ',' + str(sal) +',' + exp + ',' + tcdm +sql3
# 		file.write(sql)

# cum = cum+num_chefs

# with open("waiter.sql",'w') as file:
# 	for i in range(cum,cum + num_waiters):
# 		sal = np.random.choice([5000,7000,10000,15000,20000,30000])
# 		occupied = 0
# 		sql = sql1 + "waiter" + sql2 + str(i+1) + ',' + str(sal) + sql3
# 		file.write(sql)

# cum = cum + num_waiters

with open("staff_contact.sql",'w') as file:
	for i in range(num_staff):
		first = str(random.randint(700, 999))
		second = str(random.randint(1, 888)).zfill(3)
		last = (str(random.randint(1, 9998)).zfill(4))
		while last in ['1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888']:
			last = (str(random.randint(1, 9998)).zfill(4))
		contact = '{}{}{}'.format(first, second, last)
		contact = '\'' + contact + '\''
		sql = sql1 + "staff_contact" + sql2 + contact + ',' + str(i+1)
		file.write(sql)






