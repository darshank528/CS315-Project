import numpy as np
import pandas as pd
import datetime
import random

sql1 = 'insert into '
sql2 = ' values ('
sql3 = ');\n'

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

		exp = str(int(np.random.uniform(0,age-18)))
		sal = 0
		occ = 0
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
			sal = np.random.choice([20000, 40000, 50000, 100000, 150000, 200000])
			if sal<100000:
				exp = str(int(np.random.uniform(1,5)))
			else:
				exp = str(int(np.random.uniform(5,10)))


		s = "'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s'" % (str(i+1),fn,mn,sn, sex, str(age),str(sal),str(exp),str(occ),role)
		sql = sql1+ "staff" + sql2 + s + sql3
		file.write(sql)

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

with open("contains.sql", 'w') as file:
	for i in range(num_dishes):
		item_per_dish = int(np.random.uniform(5,10))
		ids = random.sample(list(np.arange(num_ingredients)+1),item_per_dish)
		for j in range(len(ids)):
			q = np.random.choice([1,2,3,4,5])
			sql = sql1+"contains"+sql2+str(ids[j])+','+str(i+1)+','+str(q)+sql3
			file.write(sql)

num_orders = 100
dic = {0:'monday',1:'tuesday',2:'wednesday',3:'thursday',4:'friday',5:'saturday',6:'sunday'}
custs = random.sample(list(np.arange(num_customers)+1),num_orders)

sdate = datetime.date(2021, 1, 1)
end_date = datetime.date(2021, 12, 31)

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

with open("payment.sql",'w') as file:
	for i in range(num_orders):
		delt = int(np.random.uniform()*365)
		deltas = datetime.timedelta(days = delt)
		sd = sdate+deltas
		disc = int(np.random.uniform()*26)
		s = "'%s','%s','%s'"%(str(i+1),str(sd),str(disc))
		sql = sql1+"payment"+sql2+s+sql3
		file.write(sql)

with open("delivers.sql",'w') as file:
	for i in range(num_orders):
		# d_id = np.random.choice(list(np.arange(num_dishes)+1))
		j = np.random.choice(list(np.arange(num_waiters)+num_owners+num_managers+num_receptionists))
		completed = "1"
		s = "'%s','%s','%s','%s'" % (str(j),str(i+1),str(d_id),completed)
		sql = sql1+"delivers"+sql2+s+sql3
		file.write(sql)
