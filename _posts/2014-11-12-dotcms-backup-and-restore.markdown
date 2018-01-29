---
layout: post
title:  DotCMS Backup and Restore
date:   2014-11-12
description: How to set up dotCMS for backup and restore.
img: backup-and-restore.png
tags: [Blog, AWS, Amazon Web Services, DotCMS, EC2, Technology]
author: Austin Lawless
---
So, a medium AWS server is about $50 / month. That is a little steep. So, I needed to back up dotCMS and restore it to a micro server. First, I needed a place to put my back up data. I used github for two reasons. I can use git to move files from one server to another when restoring, and I will have version control of my back up data. I created a private repository and cloned it to my dotCMS server.

`git clone https://github.com/username/repository-name.git`

Per the dotCMS documentation, I needed to backup a minimum of three things for a full restore: assets, plugins, and the database. So, I navigated to my back up repository, copied the assets and plugins into the repository, dumped the database into the repository, added and committed the files to version control, and pushed the changes to GitHub.

```
cp -a /opt/dotcms/wwwroot/current/dotserver/dotCMS/assets/ .
cp -a /opt/dotcms/wwwroot/current/dotserver/plugins/ .
mysqldump -u root database-name &gt; outputfile.sql
git add -A .
git commit -m "added back up data to repository"
git push origin master
```



Next, I needed to instantiate a micro server. The process was very similar to my post on getting started with dotCMS on AWS servers, but I used a micro instead of a medium. I followed the directions from dotCMS to re-install dotCMS, mostly. I started by running:


```
# connect to the aws instance
ssh -i ~/keys/your-key.pem ec2-user@{servers.amazon.public.ip}

# set admin and update yum
sudo -i
yum update

#install mysql
yum install -y mysql55-server.x86_64

#Start mysql and create database, db user and password
/etc/init.d/mysqld start

mysql
&nbsp;CREATE USER 'dotcms2'@'localhost' IDENTIFIED BY 'some_password';
&nbsp;CREATE USER 'dotcms2'@'127.0.0.1' IDENTIFIED BY 'some_password';
&nbsp;GRANT ALL PRIVILEGES ON *.* TO 'dotcms2'@'127.0.0.1' WITH GRANT OPTION;
&nbsp;GRANT ALL PRIVILEGES ON *.* TO 'dotcms2'@'localhost' WITH GRANT OPTION;
&nbsp;CREATE DATABASE dotcms2 default character set = utf8 default collate = utf8_general_ci;
exit;

#create and switch to parent directory
mkdir -p /opt/dotcms/wwwroot/dotcms-2.5.6
cd /opt/dotcms/wwwroot/dotcms-2.5.6

#get dotcms source zip for desired stable release version - this url changes frequently
wget http://www.dotcms.com/physical_downloads/release_builds/dotcms_2.5.6.zip
unzip dotcms_2.5.6.zip
cd ../
ln -s /opt/dotcms/wwwroot/dotcms-2.5.6 /opt/dotcms/wwwroot/current
cd current/dotserver/

#change the /bin scripts permissions, add execution permission to *.sh in the bin directory
chmod 755 ./bin/*.sh
chmod 755 ./tomcat/bin/*.sh
```

I did NOT run the following command because they are covered by the plugins back up.


```
#Create ROOT Plugin Configuration Directories (Never directly edit dotCMS files as this will break on upgrade)
mkdir -p plugins/com.dotcms.config/ROOT/tomcat/conf/Catalina/localhost/
mkdir -p plugins/com.dotcms.config/ROOT/bin
cp tomcat/conf/Catalina/localhost/ROOT.xml plugins/com.dotcms.config/ROOT/tomcat/conf/Catalina/localhost/

#Copy startup.sh to root plugin
cp bin/startup.sh plugins/com.dotcms.config/ROOT/bin

#OPTIONAL- copy the server xml and configure ports for the Dotcms application
cp tomcat/conf/server.xml plugins/com.dotcms.config/ROOT/tomcat/conf/

#Then edit the server.xml file in your plugins directory and change the port on this line:
#&lt;Connector maxThreads="75" connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443"/&gt;

#Configure db connection and dotCMS db name and password
# comment the postgresql db,
# UNCOMMENT the mysql db AND
# change username to dotcms2 and password to what
# you entered for 'some_password'
vi plugins/com.dotcms.config/ROOT/tomcat/conf/Catalina/localhost/ROOT.xml

# Change -Xmx for better heap size (recommend min 2 Gigs for testing)
vi plugins/com.dotcms.config/ROOT/bin/startup.sh

# The line in the startup.sh file looks like this:
---
JAVA_OPTS="$JAVA_OPTS -Djava.awt.headless=true -Xverify:none -Dfile.encoding=UTF8 -server -Xmx1G -XX:MaxPermSize=256m -XX:+DisableExplicitGC -XX:+UseConcMarkSweepGC -javaagent:dotCMS/WEB-INF/lib/jamm-0.2.5.jar"
---
```
Instead, I copied the assets and plugins from my back up into my dotCMS. Then, complete the installation by:


```
# deploy configuration plugin changes
./bin/deploy-plugins.sh

# start up dotcms and tail the log
touch tomcat/logs/dotcms.log
./bin/startup.sh &amp;&amp; tail -f tomcat/logs/dotcms.log
```

As dotCMS makes clear in their documentation, I needed to run a full re-index. This did not seem to suffice. But, stopping and starting dotCMS did the trick.


```
# shut down dotCMS
./bin/shutdown.sh
# wait for dotCMS to finish shutting down and restart
./bin/startup.sh
```

![re-index](/assets/img/re-index.png)

Lastly, I needed to update my ip address on my record set (see below) and shut down my expensive medium AWS instance.

![record set](/assets/img/record-set.png)
