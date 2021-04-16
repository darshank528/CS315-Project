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
sdate = start_date
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
num_ingredients = 0
with open("ingredients.sql",'w') as file:
	with open("ingredients.txt",'r') as ifile:
		for line in ifile:
			num_ingredients = num_ingredients + 1
			l2 = line[:-1]
			l = l2.split(',')
			sql = sql1 + "ingredients" + sql2 + l[0] + ',' + '\'' +l[1] + '\'' + sql3
			file.write(sql)


#For dishes
i = 1
num_dishes = 0
with open("dishes.sql", 'w') as file:
	with open("dishes.txt",'r') as ifile:
		for line in ifile:
			#print(line)
			num_dishes = num_dishes +1
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
num_customers = 1000
with open("customer_contact.sql",'w') as f2:
	with open("customers.sql",'w') as file:
		for i in range(num_customers):
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
			first = str(random.randint(700, 999))
			second = str(random.randint(1, 888)).zfill(3)
			last = (str(random.randint(1, 9998)).zfill(4))
			while last in ['1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888']:
				last = (str(random.randint(1, 9998)).zfill(4))
			contact = '{}{}{}'.format(first, second, last)
			contact = '\'' + contact + '\''
			sql = sql1 + "customers_contact" + sql2 + contact + ',' + str(i+1) + sql3
			f2.write(sql)


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
		sql = sql1 + "staff_contact" + sql2 + contact + ',' + str(i+1) + sql3
		file.write(sql)

gbl = []
num_waiting = 30
num_not_waiting = 200
pay = [ "credit card","upi","debit card" ,"cash" ,"other"]
with open("customers.sql",'a') as file:
	ids = random.sample(list(np.arange(num_customers)+1),num_waiting+num_not_waiting)
	gbl = ids[num_waiting:]
	for i in range(num_waiting+num_not_waiting):
		if(i<num_waiting):
			sql = sql1 + "waiting_customer" + sql2 + str(ids[i]) + ',' + str(i+1) + sql3
			file.write(sql)
		else:
			p = np.random.choice(pay)
			sql = sql1 + "non_waiting_customer" + sql2 + str(ids[i]) + ',' + str(i+1) + ',\'' + p + '\'' +sql3
			file.write(sql)

num_tables = 10
size = [2,2,2,4,4,4,6,6,8,8]
status = "finished"
with open("sitting.sql",'w') as file:
	for i in range(num_tables):
		loc = np.random.choice(["windows_side","centre","edge"])
		s = str(i+1)+','+str(size[i])+',\''+status+'\',\''+loc+'\''
		sql = sql1+"sit_table"+sql2+s+sql3
		file.write(sql)
	for i in range(50):
		t_id = str(int(np.random.uniform()*10)+1)
		sql = sql1 + "sitting" + sql2 + str(gbl[i]) + ',' + t_id + sql3
		file.write(sql)

with open("contains.sql", 'w') as file:
	for i in range(num_dishes):
		item_per_dish = int(np.random.uniform(5,10,1))
		ids = random.sample(list(np.arange(num_ingredients)+1),item_per_dish)
		for j in range(len(ids)):
			q = np.random.choice([1,2,3,4,5])
			sql = sql1+"contains"+sql2+str(ids[j])+','+str(i+1)+','+str(q)+sql3
			file.write(sql)

num_orders = 100
dic = {0:'monday',1:'tuesday',2:'wednesday',3:'thursday',4:'friday',5:'saturday',6:'sunday'}
custs = random.sample(list(np.arange(num_customers)+1),num_orders)

d_id = np.random.choice(list(np.arange(num_dishes)+1))
with open("orders.sql",'w') as file:
	for i in range(num_orders):
		
		rev = np.random.choice([1,2,3,4,5])
		quan = np.random.choice([1,2,3,4])
		cost = np.random.choice(list(np.arange(40,500,10)))
		delt = int(np.random.uniform()*365)
		delta = datetime.timedelta(days = delt)
		sd = sdate+delta
		day = dic[int(np.random.uniform()*6+1)]
		h = int(np.random.uniform()*13)+9
		m = int(np.random.uniform()*60)
		time = datetime.time(h,m)
		s = "'%s','%s','%s','%s','%s','%s','%s','%s','%s'" % (str(i+1),str(gbl[i]),str(d_id),str(sd),str(time),day,str(quan),str(rev),str(cost))
		sql = sql1+"orders"+sql2+s+sql3
		file.write(sql)

with open("cooks.sql",'w') as file:
	for i in range(num_orders):
		# d_id = np.random.choice(list(np.arange(num_dishes)+1))
		j = np.random.choice(list(np.arange(num_chefs)+num_owners+num_managers+num_receptionists+num_waiters))
		completed = "1"
		s = "'%s','%s','%s','%s'" % (str(j),str(i+1),str(d_id),completed)
		sql = sql1+"cooks"+sql2+s+sql3
		file.write(sql)

with open("pay_by.sql",'w') as file:
	for i in range(num_orders):
		p = np.random.choice(pay)
		i_id = 10000+i
		i_des = "lorem ipsum"
		status = np.random.choice(["paid","paid","paid","paid","paid","paid","paid","in progress","in progress","in progress","in progress","failed"])
		s = "'%s','%s','%s','%s','%s','%s'" % (str(gbl[i]),str(i+1),p,str(i_id),i_des,status)
		sql = sql1+"pay_by"+sql2+s+sql3
		file.write(sql)

with open("payment.sql",'w') as file:
	for i in range(num_orders):
		delt = int(np.random.uniform()*365)
		deltas = datetime.timedelta(days = delt)
		sd = sdate+deltas
		disc = int(np.random.uniform()*26)
		s = "'%s','%s','%s'"%(str(i+1),str(sd),str(disc))
		sql = sql1+"payment"+sql2+s+sql3
		file.write(sql)


delta = datetime.timedelta(days = 1)
with open("tracks.sql",'w') as file:
	stdt = sdate
	while stdt<=end_date:
		ids = random.sample(list(np.arange(num_staff)+1),4)
		for i in range(4):
			s = "'%s','%s'"%(str(ids[i]),str(stdt))
			sql = sql1+"tracks"+sql2+s+sql3
			file.write(sql)
		stdt+=delta

with open("delivers.sql",'w') as file:
	for i in range(num_orders):
		# d_id = np.random.choice(list(np.arange(num_dishes)+1))
		j = np.random.choice(list(np.arange(num_waiters)+num_owners+num_managers+num_receptionists))
		completed = "1"
		s = "'%s','%s','%s','%s'" % (str(j),str(i+1),str(d_id),completed)
		sql = sql1+"delivers"+sql2+s+sql3
		file.write(sql)







