---
group: "tech"
categories:
- tech
date: 2014-05-19T00:00:00Z
tags:
- solar
- meter
- ocr
- raspberry pi
- tech-guide
title: OCR Solar Meter Reader - Part 1
url: /tech/2014/05/19/ocr-solar-meter-reader-part1/
---

I had some solar panels installed last year. I wanted to read my inverter statistics, but I also wanted to log exactly how much power I import/export. Challenge - I can't physically plug anything into the meter (power company regulations). What to do?

How about a web cam, raspberry pi, and OCR?

<!--more-->

## The Goal##

The goal is to get all my data to log auto-magically to the PVOutput portal (pictured). [Here is my PVOutput page](http://pvoutput.org/list.jsp?userid=20825).

<a class="fancybox" rel="group" href="/images/solar-pvoutput.jpg" title="PVOutput Portal"><img class="pure-img img-thumbnail" src="/images/sm-solar-pvoutput.jpg" alt="Physical Layout" /></a>

## The Problem##

I have an array of PV panels on my roof, which are connected to an inverter. The inverter feeds generated power back into the power grid via my power meter (the power company pays me for this).

I decided I would use a Raspberry Pi to read data directly from the solar inverter. That gives me stats such as *the amount of power produced* by the array. It doesn't give me how much I actually export to the power grid - as that figure comes from the power meter.

The formula for exported power is:

<div class="box-green pad10">Exported Power = Generated Power - Power Used by my house</div>

So, how do I interface with my EM1000 power meter? The meter has a couple of ports:

1. RS232 Serial Link
2. Optical Port

Should be easy right?

Not quite.

The power company seal the RS232 port. Breaking those seals is a criminal offence. I did try to get permission to do it, but my provider (Energex) kept saying no. That leaves the Optical Port. Optical Readers are expensive, but a bigger problem is that Energex doesn't use a standard protocol. They came up with their own (figure that one out, existing protocols just aren't good enough read a number from a meter. I wonder how many hallucinogenic mushrooms were consumed to reach *that* decision).

So, what to do? The only other place data was visible was the LCD. Surely we can't just take photos and OCR (Optical Character Recognition) the result? It can't be that simple? Well.... kind of.

### Physical Diagram###

Let's skip ahead to the physical diagram, and then look at how I got there. This is the physical set up of the system:

<a class="fancybox" rel="group" href="/images/solar-physical.png" title="Physical layout"><img class="pure-img img-thumbnail" src="/images/solar-physical.png" alt="Physical Layout" /></a><br />

## Physical Setup##

<a class="fancybox inline" rel="group" href="//images/solar03.jpg" title="Raspberry Pi"><img class="img-thumbnail inline textwrap-left" src="/images/sm_solar03.jpg" alt="Raspberry Pi" /></a>A power box is fairly small, so I expected a challenge fitting everything in.

Getting the Pi in there was fairly easy. A piece of velcro tape keeps it firmly in place.

The Pi's USB port does not provide enough juice to power anything more than a keyboard, so I have added a powered USB hub. That lets us power a light and a webcam.

For the webcam, I am using a Logitech C270. Due to the short distance between the cam and the display, I had trouble getting the camera to focus. For my first attempt, I mounted the camera above the power meter and used a mirror mounted on the door to get enough focus distance. This did work, but wasn't great, so I took apart the camera and manually refocused it. Here is a guide on how to refocus the camera: [YouTube: Refocus Logitech Webcam](www.youtube.com/watch?v=vq71ihE7Ng8). It is easy, but you can kiss your warranty goodbye.

With the focus fixed, I was able to mount the camera properly. I used some cheap metal strapping from Bunnings, which I bent into an "L" shape. This was screwed into the top of the meter box. To secure the camera, I removed the camera clip and then screwed the camera directly into my home made bracket.

### Lighting###

Lighting was a particular challenge. For the display to be readable via OCR, there needs to be a consistent brightness across the entire display. There also needs to be enough contrast to clearly differentiate the characters against the background.

<img class="img-thumbnail inline textwrap-left" src="/images/solar-led-strip.jpg" alt="Fail Light" />I tried a flexible stick on strip light - but there were too many light sources, and they were too bright. I then tried an el-cheapo goose-neck USB light in a "fake lightbulb" housing - but that was too inconsistant. One side was dark, the other light!

<a class="fancybox inline" rel="group" href="//images/solar01.jpg" title="Lighting up the box"><img class="img-thumbnail inline textwrap-right" src="/images/sm_solar01.jpg" alt="Lighting up the box" /></a>I settled on a USB goose-neck reading light (found by accident in Myer). I mounted it higher than the LED display to minimise reflections. I was nearly there, but not quite, I was *still* getting too much glare. My first eureka moment was spraying the inside of the power box lid with matt black paint. That cut down the glare, but I still had contrast issues. My second eureka moment was moving the camera down, so it looks up at the display on a 15 degree angle. Suddenly I had a razor sharp well lit image! nice!

### Network###

I tried WiFi first, but found that putting a wifi adaptor in a big metal box makes reception near impossible (not too surprising, I guess). I didn't want to run Cat6 cable to my power box (too much 240v power in the ceiling/wall cavities around there).

As luck would have it, I had some spare Netcomm Ethernet-Over-Power EoP adaptors sitting around. I plugged one in and away we went. If you haven't seen these before, they are really neat. They use your existing electrical wiring and give speeds anywhere up to 500Mbit (half duplex!). Like everything, they have a catch. If your electrical wiring is bad, or you try to run them across circuits - performance will be abysmal. Certain appliances can also interfere with them. Have you ever tried troubleshooting a network where turning on a kettle (jug) kills connectivity?

## Part 2##

The next part details the software side of the project.

