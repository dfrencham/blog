---
group: "tech"
categories:
- tech
date: 2014-01-30T00:00:00Z
description: ""
tags:
- development
- blogging
- ghost
title: Don't switch to Ghost blogging platform (yet)
url: /tech/2014/01/30/dont-switch-to-ghost-blogging-platform-yet/
---



I'm a typical developer. I often can't resist the urge to try different platforms. My current blogging platform (blogger) has numerous limitations. I started looking for alternatives, and Ghost appeared on the radar. 

Ghost is a ground up blogging platform, being developed under the premise that other platforms (such as word press) are becoming overly complex. 

Before I go into too much detail, I should point out that Ghost is beta (maybe even alpha software). 
<!--more-->
The good parts
--------------
Ghost offers some interesting features, such as:

* Handlebar based templating 
* The ability to run on your own server/vm, or via Ghost's own Hosted service 
* A very nice post editor, which has markup based formatting, and a live preview. 
* Open source,&nbsp; so you can hack away at the code base. 
* Node JS based platform

The bad parts
-------------
Ghost's hosting is a paid service. They offer a 30 day trial. I signed up... and then the wheels fell off. 

I tried editing my new blog, but kept being presented with the sign up page. Filling in the sign up page again logs you into the site. 

Once you have logged in, the next mystery is how to actually post. You have to manually append /ghost/ to your blog address. It's not that much effort to provide a link for this. 

Posting was straight forward enough, until I tried to include a code sample. I use [Alex Gorbatchov's syntax highlighter](http://alexgorbatchev.com/SyntaxHighlighter). To enable this on my Ghost blog, I had to edit my template. To do this, I had to download the default template from Github, edit the source, then zip it up and upload it via Ghost's admin page.

I had my template setup, and I tried to add some code to a post, Ghost saved the HTML - but then stubbornly refused to display it. It could be something to do with the highligher using CDATA tags... it could be overly aggressive filtering (why do you need to filter out HTML that **I** add to **my** blog?)... it could be the lunar cycle, who knows.

At least the edit page looks nice.

<img src="http://drive.google.com/uc?export=view&amp;id=0BzEmq4lTwA-sMjV6bm8yb2k0YU0" />  

The next big issue is that Ghost doesn't have an API yet. There is no way to integrate other services. Want to import all your old blogger posts? bad luck. I have seen an import function (for Word Press) mentioned on the Ghost forums, but finding it is like finding the lost ark - and it doesn't seem to work too well anyway.

The lack of an API means that offline editors, (like LiveWriter), can't be used to update your blog. It also rules out the many mobile blogging apps on mobile platforms.

The final problem for me was performance. Ghost Hosted feels slow - at least from Australia. Blogger uses Googles CDN, and feels snappy virtually anywhere. Ghost don't seem to have a solution that is working out here yet. A blog page that takes 5 or more seconds to load is going to translate to a lot of lost readers.

Conclusion
----------
Ghost is a service that shows a lot of promise, but is not a usable option for me as it stands. I wouldn't recommend going with them unless you are prepared to deal with a lot of issues and frustration. That said, they are showing all the signs of being <i>awesome</i> down the track.

If you can, consider contributing to Ghost's code base, and help them get there faster. I look forward to giving them another try in 6 months.

References
----------
* [Ghost Blogging Platform](http://ghost.io/)
* [Ghost Source (Github)](https://github.com/TryGhost%E2%80%8E) 
* [Scott H - Install Ghost on Azure](http://www.hanselman.com/blog/HowToInstallTheNodejsGhostBloggingSoftwareOnAzureWebsites.aspx)
