---
group: "tech"
categories:
- tech
date: 2014-10-30T00:00:00Z
tags:
- family
title: Digital Death - Saving your family's digital life
url: /tech/2014/10/30/digital-death/
---



I look after all of my family's digital needs. Internet, Netflix, photos, backups.... but what happens if I get hurt? or killed?

<!--more-->

## Digital Lockout

I've been doing a bit of planning for the future lately, including what happens in the event of my death. It's a scenario most couples will have to plan for sooner or later. What happens to your family if you die? or worse, you and your partner die - leaving your children behind. Who would look after them? and what happens to your assets? Those sorts of issues are solved (well, helped) by making a will. Now, what about your digital world?

Think about just how much of your life is online. Think about all the accounts you have for various service providers. Look around your house. How many devices are there? modems, routers, air-ports, smart-TVs, IP aware alarm systems. What would your family do if anything happened to you?

If I was hit by a bus tomorrow, my wife would look after the home network. As wonderful is she is, my wife wouldn't know what to do if she ran into any issues - like, say the DSL starts acting up. She wouldn't know that she needs to call our service provider to get help. Even after that, she wouldn't know the IP Address she needs to login to the router with - and even if she did, she wouldn't know the password.

Even if my wife is able to stay online, what if she wants to get to our online backups or find something in my email? - she isn't going know any of those account credentials either. She could ring Google/Amazon/Apple, but your guess is as good as mine as to whether they will help her.

My wife would be locked out of our digital life. I need to put a plan in place to ensure that doesn't happen.

## You need a Digital Plan

These problems can be solved, but only if you plan ahead. Let's look at how to do it.

### Accounts and Passwords

There are two ways you can handle accounts and password - online and/or offline. For an online solution, a password manager like [LastPass](http://www.lastpass.com) fits the bill. Lastpass gives you a secure location to store all your password details, and even better - it provides a way to share these details with other LastPass users. You can either share all your details with your partner, or leave your last pass credentials somewhere (somewhere secure!) on paper.

If you want to skip the password manager option and go offline, you will need to find a spot that is secure (really damn secure!) - preferably with a lock. Then give a trusted person the key. Put passwords for your email accounts (the accounts you use to reset *other* passwords) somewhere safe. If you have a gmail account, even better - they provide [printable account reset codes](https://support.google.com/accounts/answer/1187538). Keep in mind that if you put these printed passwords somewhere - and someone can access them unexpectedly - they have access to pretty much your whole life.

Besides security, another downside of offline password storage is keeping things up to date. If you don't keep your offline passwords up to date then this whole exercise is pointless. My personal preference is to ensure my wife has access to my google account reset codes, and my lastpass credentials.

### Home Network

You can think of this as a network handover. If someone dropped a network in your lap and asked you to be the admin, what are you going to need?

Here are the documents you will need to put together:

- a simple to understand network device list
- information sheet for each device

At my house there is everything from Solar Loggers to IP Enabled light switches. Without a list, it would be hell to find everything.

For your network device list, write a list of all your devices, along with their location and a brief description. For example:

<table class="padded-table">
<tr><th colspan="2"><h1>Network Device List</h1></th></tr>
<tr><th>Item</th><th>Details</th></tr>
<tr><td> DSL Modem </td><td> Kitchen bench  | Handles internet connection </td></tr>
<tr><td> Media Streamer </td><td> TV Unit (WD Live written on it) | Plays Netflix </td></tr>
<tr><td> Network storage </td><td> Network rack in laundry (white box thing) Holds our photos  </td></tr>
</table>

Each device should have a summary sheet, with the following fields:

- Host Name
- Description
- Location
- How it is physically connected
- How to connect to it (SSH? HTTP? where is the password stored?)
- Notes (for example, plays up sometimes and needs to be rebooted)

For example:

<table class="padded-table highlight-first-col">
<tr><th colspan="2"><h1>Network Device Summary</h1></th></tr>
<tr><td> Host Name </td><td> RadNAS </td></tr>
<tr><td> Description </td>
  <td> Network storage device (QNAP 210-Turbo). Holds all of our photos and music. </td></tr>
<tr><td> Location </td><td> Network cabinet  </td></tr>
<tr><td> Connection </td><td> Hard-wired to gigabit switch  </td></tr>
<tr><td> How to connect </td><td> In your web browser go to http://radnas<br />
or, in Windows Explorer go to \\radnas.<br />
Use the username and password in lastpass to login </td></tr>
<tr><td> Notes </td><td> Automatically backs up to Amazon (password is in LastPass)  </td></tr>
</table>


### Getting help

It's a good idea to identify someone with good technical skills as a point of contact for providing help. Make sure you give them a heads up first ("mate, if I get hit by a bus, can my family get in touch with you for help with our home network?").

In my case I'm friends with a clued up 'nix sysadmin. Given the documentation above, he would find everything on my home network, fix any issues, and still be finished well before lunch. That's the sort of person you want watching your back.

## Final Things

If you do put together a plan similar to the one above, make sure that you let your significant other know where the documentation is stored - and also notify a backup person (probably the same person who will sort out your affairs if both you and your significant other are gone), as well as your technical point of contact.

Hopefully all this planning will never be needed, but it may make you sleep a little easier.
