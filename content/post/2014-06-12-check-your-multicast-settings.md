---
group: "tech"
categories:
- tech
date: 2014-06-12T00:00:00Z
tags:
- networking
- chromecast
- tech-guide
title: Chromecast issues? Check your Multicast settings
url: /tech/2014/06/12/check-your-multicast-settings/
---



I've had network gremlins for a few months now. Sometimes my WeMo switches are visible, sometimes not. Chromecast is the same. My devices were screaming for attention, but my router wasn't listening. Lets look at Multicasting (and Broadcasting).

<!--more-->

## What is broadcasting?

<img class="img-thumbnail inline textwrap-left" src="/images/broadcast.png" alt="Broadcast" />At a basic level, a network broadcast is when a device spams the whole network with a message.

<blockquote>
  <p>In computer networking, broadcasting refers to transmitting a packet that will be received by every device on the network.</p>
  <footer><cite title="Source Title">Wikipedia</cite></footer>
</blockquote>

Why would a device want to do this? Well, lots of reasons.

Take your home network connection for example. When your laptop connects to your home network, it broadcasts a DHCP request. Your router replies with an ipaddress and off you go.

You should also be aware of Multicast.


## What is multicasting?

<img class="img-thumbnail inline textwrap-left" src="/images/multicast.png" alt="Multicast" />Multicast is similar to broadcast - we are sending a message to multiple nodes, but in this case, we are sending it to a subset of nodes (rather than spamming everyone).

As far as your router is concerned, broadcasts and multicasts are very similar. If you have an issue with one, you probably have an issue with the other.

<br />

## The symptoms of broken Multicasting

In my case, I had two issues that indicated multicasts were not configured properly.

The first issue was my Belkin WeMo light switch and power socket. These are network aware IP devices that can be switched on or off with my phone. I could control them via 3g, but not over my LAN. This seemed odd, but makes sense when you learn how the WeMo devices work.

<div class="img-thumbnail inline textwrap-left" style="margin-right:30px;"><img src="/images/cloud.jpg" alt="Broadcast" /><br /><i>Discovery Protocol in action</i></div>

When away from your home network, WeMo devices register through Belkin's cloud service. They then accept push messages. So, your phone sends a "light on" command to the WeMo cloud, the WeMo cloud then sends a push message to the switch.

On your home network, the cloud is not used - uPnP kicks in. Your phone sends a multicast discovery message along the lines of **"HEY! any WeMo devices out there?"**. The WeMo devices pick that up,  kick off a handshake with your phone, and away you go.

If the initial discovery multicast message is not received, the WeMo devices are not found.

My second issue was with my ChromeCast. Sometimes it would be discovered by my phone, sometimes not. ChromeCast works by using the DIscovery And Launch ([DIAL](http://en.wikipedia.org/wiki/DIscovery_And_Launch)) protocol. The discovery part uses Simple Service Discovery Protocol ([SSDP](http://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol)), sending a multicast message to the address 239.255.255.250. The ChromeCast response is a uPnP UDP message, containing address details for the ChromeCast device.

If the initial Multicast packet is not being sent/received, the ChromeCast will never respond - meaning my phone will never find it.

My router had some multicasting options configured poorly, however uPnP was turned on. This resulted in intermittent discovery of the ChromeCast.

As an interesting side note, the DIAL protocol was co-developed by Netflix and YouTube (with help from Sony and Samsung). My buddy Jase did something similar with discoverable sound hardware a few years back - but he didn't give it a cool name, so no one heard about it.

## Suggested Router Settings

The settings below are the suggested settings for working multicasting on your home WiFi network.

### AP Isolation###

**Possible settings**

- on / **off**

**Description:** If turned on, this will prevent wireless clients from messaging each other directly. This means no fileshares, no network games, no printing, no nothing. All you can talk to is the router. Unless you are an Internet Cafe, this should be off.

### IGMP Snooping###

**Possible settings**

- **on** / off

**Description:** As per Wikipedia: *is the process of listening to Internet Group Management Protocol (IGMP) network traffic. The feature allows a network switch to listen in on the IGMP conversation between hosts and routers. By listening to these conversations the switch maintains a map of which links need which IP multicast streams. Multicasts may be filtered from the links which do not need them and thus controls which ports receive specific multicast traffic.*

Many multicast capable media devices are known to need this setting turned on. This includes the AppleTV, and ChromeCast.

### Multicast Rate###

**Possible settings**

- Auto
- HTMIX - (speed)
- OFDM - (speed)
- CCK - (speed)

**Suggested setting**

- HTMIX 130/144

**Description:**

The first part refers to the *modulation*, the second part the speed. Each modulation is (generally) aligned with a Wireless speed/standard:

- CCK - 802.11b
- OFDM - 802.11g
- CCK - 802.11b

The speed portion is (min Mbit/s)/(max MBit/sec). The general rule is that the minimum should be a little higher than the maximum bandwidth your streaming device will use. Note that the higher setting you use here, the more you will restrict your WiFi range.

### Beacon Interval###

**Possible settings**

- Beacon Interval: (number)

**Suggested setting**

- 50ms

**Description:**

Your router periodically sends a "Beacon" packet. This does several things:

1. Includes a Date/Time used by devices to syncronise
2. Advertises the network capabilities
3. Announce the SSD and presence of the WiFi router.
4. Acts as a "heartbeat" packet

Generally, decreasing the beacon setting will mean more administrative overhead for your network, but you gain increased reliability. Some devices (Apple TV again) require 50ms or less to work.

## Summary##

After the changes have been made above, you will probably need to restart your router. After I made the above changes, I found all WeMo devices were visible and the ChromeCast icon was now appearing in NetFlix. Happy days!

## References##

- [DD-WRT page on advanced wiresless settings](http://www.dd-wrt.com/wiki/index.php/Advanced_wireless_settings)
- [Wikipedia Broadcasting](http://en.wikipedia.org/wiki/Broadcasting_(networking))
- [Wikipedia Multicasting](http://en.wikipedia.org/wiki/Multicast)
- [Cisco Chromecast setup whitepaper](http://www.cisco.com/c/en/us/td/docs/wireless/controller/technotes/7-6/chromecastDG76/ChromecastDG76.html)
- [How Chromecast works](http://computers-solution.com/how-chromecast-works-chromecast-protocol-described/)

The multicast and broadcast images on this page are sourced from [Wikipedia](http://www.wikipedia.org).
