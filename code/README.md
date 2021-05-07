sudo npm install -g node-modules  
npm install express  
npm install pg  
npm install bcrypt  
npm install ejs  
npm install moment --save
  
SET UP the database.js file, Create a database called "restaurant"  
Run node app.js after starting up postgres in another terminal  
  
If you don't have postgres installed:  
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'  
 wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -  
 sudo apt-get update  
 sudo apt-get -y install postgresql  
  
In case you get an error:  DbDriver "config": /var/cache/debconf/config.dat is locked by another process: Resource temporarily unavailable  
 sudo fuser -v /var/cache/debconf/config.dat  
 sudo kill PID  
  
 STARTING POSTGRES  
 sudo systemctl start postgresql@13-main  
 sudo -i -u postgres  
 psql  
 CHANGE PASSWORD:  \password  
 CREATE database restaurant;  
  
 The server will be live at: http://localhost:3000/  
