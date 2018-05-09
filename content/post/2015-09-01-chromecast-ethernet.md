---
categories:
- tech
group: "tech"
date: 2015-09-01T00:00:00Z
tags:
- ChromeCast
- tech-guide
title: Add Ethernet to your ChromeCast for 12 bucks
url: /tech/2015/09/01/chromecast-ethernet/
---



ChromeCast's are great... as long as your wifi is. I upgraded my router firmware, and my ChromeCast started dropping out. Rather than fixing *that* problem, I figured "why not just hardwire the damn thing?".

<!--more-->

Google offer a ChromeCast ethernet adaptor, which is great except...

1. It is never in stock
2. It isn't available in Australia

I'm sure it will become available in Australia sooner or later, but because we're a country full of suckers surrounded by a huge fucking shark filled moat - it will probably sell for $40. I'm cheap and impatient, so here is my $12 DIY ChromeCast ethernet setup.

## Things you will need

* OTG adaptor with power feed
* USB Network adaptor
* A network point
* Ethernet cable

### OTG Adaptor

OTG means "USB-On-The-Go", which means "you can plug normal USB things into micro-usb devices." This means you can plug your USB drive into your Galaxy Edge, or your gaming mouse into your Motorola Moto-G, or ethernet into your ChromeCast.

There is a catch. Most OTG cables do not provide any way to get power, as they expect the device to provide power. This is no good for a ChromeCast, as a ChromeCast is USB powered. What you need is a "OTG Y-Cable".

I used [this one](http://www.ebay.com.au/itm/121580953692) - $5.99.

### USB Network Adaptor

The next thing you need is a USB Network adaptor.

I used [this model](http://www.ebay.com.au/itm/190894042411) - $6.85.

It works fine **and** it lights up blue to indicate network activity. It also works with a Macbook Pro, which is nice.

The nice folk on the Whirlpool forums have been discussing alternative network adaptors that may work - [Whirlpool Thread](http://forums.whirlpool.net.au/archive/2418159).

## Connecting it together

You won't need your existing ChromeCast micro-USB cable any more. Connect everything else as follows:

1. The OTG micro-USB plug should connect to the ChromeCast.
2. Connect the Ethernet adaptor to the OTG USB female end.
3. Connect the USB plug to either a powered USB port on your TV, or the ChromeCast power brick.
4. Plug the ChromeCast HDMI plug into your TV.
5. Plug your ethernet cable into the network adaptor.

<img class="pure-img blog-img " src="/images/cc-otg1.jpg" alt="how to connect stuff" />

**Note that you still need to use WiFi to configure your ChromeCast initially. If your ChromeCast is already configured, it will work over ethernet without any changes.**

Everything should now work.

<img class="pure-img blog-img " src="/images/cc-otg2.jpg" alt="activity indicator" />
*Look at the neat activity indicator!*

## Verifying

For the tech minded readers, if you jump on your router configuration page you should notice a new device. The ChromeCast will have two IP addresses allocated, one for wifi, and one for ethernet.

If you fire up NMap, and run a port scan, you will get something similar to this:

<pre><code style="color:#f0f0f0;">
$ sudo nmap -sV 192.168.1.72

Starting Nmap 6.49BETA3 ( https://nmap.org ) at 2015-08-31 20:29 AEST
Nmap scan report for 192.168.1.72
Host is up (0.0030s latency).
Not shown: 998 closed ports

PORT     STATE SERVICE    VERSION
8008/tcp open  http       Google ChromeCast httpd
8009/tcp open  ssl/castv2 Ninja Sphere ChromeCast driver

MAC Address: 00:E0:4C:36:00:00 (Realtek Semiconductor)
Service Info: Device: media device
</code></pre>

Nice.

If you're Australian, and running a VPN or DNS redirect (for delicious international netflix), don't forget to block the Google DNS servers (8.8.8.8 and 8.8.4.4) for your ChromeCast IP address.

Time to fire up Netflix and relax.
