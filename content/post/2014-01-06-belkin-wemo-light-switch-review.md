---
group: "tech"
categories:
- tech
date: 2014-01-06T00:00:00Z
description: ""
tags:
- belkin
- automation
- review
title: Belkin WeMo Light Switch Review
url: /diy/2014/01/06/belkin-wemo-light-switch-review/
---



I recently purchased a Belkin WeMo light switch. I've been eyeing these off for a while. The general premise is pretty cool. It is a IP enabled light switch, with Iphone/Android control.    

Install was pretty easy. It was simply a matter of cutting a hole in the gyprock (plaster board), and running some wires to my existing switch. Belkin provided some twist-on electrical connectors, which made the job very easy. Note that this *will not* use any sort of standard Australian wall plate - so it is not going to look like your Clipsal switches. It does fit into a standard plasterboard C-Clip, so that is nice.

Once running, it was fairly easy to setup. After installing the WeMo app, I connected my phone to a new Wifi access point provided by the WeMo switch. The WeMo app then prompted me to enter my existing WiFi network details. From there, the switch connected to my home network and performed a firmware update, and we were in business. 
<!--more-->

Controlling the switch worked on my home network, or remotely - and it responded fast. There is an audible click from the switch when triggered remotely.  

The switch lights up to indicate status, with a small green icon showing on/off state. This is really handy at night. There is also a soft white LED showing a network connection.

## Legal & Safety Note 

If you live here in Australia, you MUST have the switch installed by a licenced electrician. It is a legal requirement. You should also keep in mind that you are dealing with 240v power. You could do yourself a serious injury or manage to electrocute yourself. Don?t become a Darwin Award.

## Issues  

So far, I have had two problems. The first is that the switch has stopped responding to my phone over wifi. If I connect to it over the cell network, it works fine. I suspect this is a quirk of the NAT setup for my home network rather than an issue with the switch itself.

The second issue I have had is that I setting up [IFTTT](https://ifttt.com) integration was difficult. The WeMo app was unable to generate a PIN for IFTTT. Belkin were very quick to respond on twitter. They suggested performing a factory reset of the switch (which I did). Within 24 hours it was working. It may have been a server side issue at Belkin.

## Integration

As a software developer, I was keen to attempt to integrate with the WeMo switch. Unfortunately Belkin don?t provide a public API! I was hoping there would be a REST or SOAP service I could work with. That means our options for integration are limited to third party services supported by the WeMo - which includes IFTTT (mentioned above).

For my integration test, I integrated my home alarm system with the switch. When my alarm is armed at night time, the WeMo Switch turns on my outside light.
In more detail, when I arm my alarm, an email is sent saying "Alarm Armed at (time)". I added a Google script to my Gmail account to check if it is after sunset, and if it is, send a second email saying "Alarm Armed (Night)".

IFTTT picks up this second email, and turns on my outside light! 

## Conclusion

Overall I'm happy with the WeMo switch. The price was $60, which seems ok considering some of the fancier standard light switches are up near that price. If integration was friendlier, I?d rate it higher.

Rating: 4/5 Stars - Highly recommended

## Photos 
------
<img style="margin: 0px" src="http://drive.google.com/uc?export=view&amp;id=0BzEmq4lTwA-sZDBRcVp6bkFfNEk" />   The installed switch
<img src="http://drive.google.com/uc?export=view&amp;id=0BzEmq4lTwA-sMnUyVjVhc19GRms" />
Front of switch and connectors
<img src="http://drive.google.com/uc?export=view&amp;id=0BzEmq4lTwA-sOElVdGVpcXNmaGM" />
Back of switch, showing wires

## References  

 * [IFTTT - IF That Then This](http://ifttt.com)
 * [Belkin WeMo Home Automation](http://www.belkin.com/au/Products/home-automation/c/wemo-home-automation/)
