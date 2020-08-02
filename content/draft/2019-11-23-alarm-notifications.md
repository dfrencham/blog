---
categories:
- tech
group: "tech"
draft: true
date: 2019-11-23
tags:
- alarm
- caddx
title: Hills alarm notifications are a trip to hell
---

TLDR; I have alarm notifications set up on a linux box.

My home alarm is from a time when an alert meant "dial a security company". Having email alerts instead makes sense.... at least to me. Unfortunately the Alarm industry has other ideas.

IoT has exploded. I have wifi enabled light bulbs I can control with my phone... yet my home alarm system still doesn't have TCP/IP connectivity. Surely newer models include a web interface? maybe with a nice REST api? 

Nope, still useless. Bosch and Hills systems have TCP/IP add on cards - but those only give us have terrible web interfaces and half baked, buggy apps. I did try a Hills Comnav, but after a year it stopped working when a couple of components overheated and de-soldered themselves from the PCB.

## Konnected, the false messiah

A new product called Konnected seemed like a good idea - it replaces your alarm panel and you wire your sensors into it.

<img class="pure-img blog-img " src="/images/konnected.webp" alt="Konnected alarm derp" />

I started digging into how it works. Konnected sends messages to a SmartThings hub **over the cloud** with the status of your sensors. Cloud issues? no alarm. The cherry on top of this shit sandwich is needing to buy a separate siren driver, because of course it doesn't have one. 

Last time I looked it didn't have a sensible way to trigger the alarm, you had to set up a series of SmartThings workflow rules to make it act like an alarm system. Every workflow system I've dared to touch ends up being less fun than sitting through a meeting full of UX people with a fetish for sliding panels.

## Hills ComNav

My original alarm panel was a Hills NX-8, which has an add-on for IP communication called the "ComNav". I purchased one of these for $250, and had it up and running after much pain and suffering. While it has a web server, it does not have an API, or any sensible integration options other than email. 

After a couple of years of receiving basic email alerts, the ComNav decided to cook a couple of capacitors and spontaneously self destruct.

## Same model, now with serial port

I discovered there was a variant of the NX-8 that included a serial port for home automation and programming - the NX-8E. Sadly this was not available in Australia, but there was one listed on EBay in the US with *priority* international shipping. 2 months later, it arrived.

After going through hell and back to get the serial port enabled, I needed a cable. The board uses an IDC connector for serial output, presumably because some engineer was smoking crack at design time and decided a standard DB9 port would be too easy. 

You have two options here:

1. The easy way. Search for "interlogix networx serial cable" and buy one for $25 US from Ebay.
2. Make your own.

I chose to make my own. [This wonderful guide](http://www.increa.com/reverse/nx-8e/index.html) has all the details on making a cable. 

Once you have the created a cable, you need a USB to serial converter. Go for something with an FTDI chipset (more reliable than the knock off version). I use a version built into a cable.

![FTDI cable](images/alarm-serial-cable.jpg)

## Home Server Connection

[pynx584](https://github.com/kk7ds/pynx584) is a handy little library for communicating with NX series alarms.

You can install it via Docker, or install as a linux service.

Once you have it installed, you can start the server like this:

```
nx584_server --serial /dev/ttyUSB0 --baud 38400
```

If you see failures, check the following items:

1. Your serial port is /dev/ttyUSS0 You can check this by comparing `lsusb` output.
2. Your baud rate is connect. Some standard rates you can try are: 4800, 9600, 14400, 19200, 38400, 57600, 115200
3. Your alarm serial port is connected and the alarm is turned on.






## References 

- [Konnected's shitty solution](http://konnected.io)
- [Making a serial cable for the NX series alarm](http://www.increa.com/reverse/nx-8e/index.html)