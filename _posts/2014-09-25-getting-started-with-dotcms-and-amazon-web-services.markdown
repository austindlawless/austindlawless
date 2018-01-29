---
layout: post
title:  Getting Started with DotCMS and Amazon Web Services
date:   2014-08-25
description: How to run DotCMS in an ec2 instance.
img: dotcms.png
tags: [AWS, DotCMS, EC2, Technology]
author: Austin Lawless
---

I am starting a website to put the things that I learn on the web. The first will be how to host my own website using  [Amazon Web Services](http://aws.amazon.com/){:title="Amazon Web Services Link" target="_blank"} and [DotCMS](http://dotcms.com/){:title="dotCMS" target="_blank"}. I chose AWS because it offers a lot of flexibility and customization (learning opportunities), and I chose dotCMS because we use it at work and I want to get as familiar with it as possible.

Using the [tutorial](http://dotcms.com/docs/latest/amazonLinuxEc2DotcmsRecipe){:title="tutorial" target="_blank"} from dotCMS I was able to create an AWS [ec2](http://aws.amazon.com/ec2/){:title="ec2 target="_blank"} instance, get dotCMS up and running, and associate my domain name ([austindlawless.com](http://austindlawless.com/){:title="austindlawless.com" target="_blank"}) with the public ip address.

I chose the Amazon Linux AMI 2014.03.2 (HVM) as my operating system.

![operating system choice](/assets/img/operating-system-choice.png)

I used a `m3.meduim` instance (3.75GB memory).

![aws instance size](/assets/img/aws-instance-size.png)

I increased the default 8GB of disk space to 20GB.

![upgrade memory](/assets/img/upgrade-memory.png)

I opened up ssh and html on my server with these two security group rules.

![set security groups](/assets/img/set-security-groups.png)

Once I had the AWS instance up. I connected to it via ssh and followed the [dotCMS AWS instructions](http://dotcms.com/docs/latest/amazonLinuxEc2DotcmsRecipe){:title="dotCMS aws instructions" target="_blank"} given by dotCMS with one update. The version given is 2.5.4, but it is no longer available. So, I went to the downloads page and clicked the drop down for the community edition. I replaced the 2.5.4 version using the version number from the 'Linux / OSX / Unix' line, 2.5.6.

![check for current downloads](/assets/img/check-for-current-downloads.png)

`wget http://www.dotcms.com/physical_downloads/release_builds/dotcms_2.5.4.zip`

became

`wget http://www.dotcms.com/physical_downloads/release_builds/dotcms_2.5.6.zip`

Once I had dotCMS running on the AWS instance I needed to get my domain name translated to my public ip address (54.86.67.18). So, I went to set up my Amazon [Route53](http://aws.amazon.com/route53/){:title="route 53" target="_blank"} service. First, I created a Hosted Zone for my domain.

![create a hosted zone](/assets/img/create-a-hosted-zone.png)

The delegation set toward the right of the screen shot needed to be entered as the name servers for my domain on [godaddy](http://www.godaddy.com/){:title="go daddy" target="_blank"}. I also needed to add my public ip address as a record set for the hosted zone.

![create an a recored](/assets/img/create-an-a-record.png)

The name is defaulted to the domain for the hosted zone, [austindlawless.com](http://austindlawless.com){:target="_blank"}. That is what I want. The type should be 'A - IPv4 address'. And, I need to add my pubic ip for my server as the value.

Once that was done and I waited about 20 minutes, everything worked. Now that I've got the server connections all set up, I need to learn how to make my site look reasonable.
