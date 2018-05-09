---
categories:
- tech
date: 2015-07-30T00:00:00Z
draft: true
tags:
- reviews
title: Review - Macbook Pro 13&ldquo; (with ForceTouch)
url: /2015/07/30/macbookpro-review/
---



Here is my review of the Macbook Pro 13", from the perspective of a Windows user.

<!--more-->

## Summary

Here's the quick version:

**Good**

<ul class="fa-good">
<li>Premium feel</li>
<li>Fantastic battery life</li>
<li>Force Touch is handy</li>
<li>SSD is ludicrously fast</li>
</ul>

**Bad**

<ul class="fa-bad">
<li>It's a $2000 laptop with no touch screen</li>
<li>RAM is not upgradable</li>
</ul>

<img class="pure-img blog-img " src="/images/dev/mbp1.jpg" alt="macbook pro, hooray">

## Upgrade Time

My old HP laptop sucked. The battery lasted 2 hours on a good day. The viewing angle of the glorious 720p screen was about 3 degrees - beyond which the contrast washes out. It also sounds like a vacuum cleaner when something taxing is loaded - such as notepad. Even worse than the vacuum like noise, is when it stopped. Ever had to replace a heat sink on a HP laptop? You need to literally dismantle the entire laptop and spend $70 on the replacement part. After going through that ordeal, I felt I'd earned a new laptop.

Doing a bit of research, the three choices for Ultrabooks seemed to be:

- Apple Macbook Pro 13"
- HP Spectre convertible tablet-ultrabook
- Dell XPS 13

I checked out the XPS 13, but it felt as though it had been designed by accountants, then had carbon fibre patterns slapped on to make it seem cool. It was ok, but didn't seem interesting.

My Debian loving Canadian co-worker bought a HP Spectre, which is a great machine. It converts between a tablet and ultrabook, and is one of the best Windows devices on the market... which is why he runs Debian on it. Meanwhile, one of my other coworkers has spent 18 months trying to convince me that a Macbook Pro is the way to go ("Because they 'just work'!" he would say, before heading down to the Apple store to get broken display replaced).

So, on the face of it - both the HP Spectre and the Macbook Pro are great machines. Why did I go for the Mac?

1. The MBP allows me to do cross platform development.
2. The terminal environment is great. I write a ton of Javascript, so this makes me a happy developer.

## Macbook Pro 13 - Initial Impressions

One of the first things I noticed about the Mac Book Pro (MBP) was the build quality. Apple use the "Unibody" manufacturing process, which consists of getting a block of aluminium, and using a CNC machine to cut out the case. This gives a case with no seams - other than access panels added for installing components. The end result is a laptop that feels like a solid object, rather than a collection of parts.

> The end result is a laptop that feels like a solid object, rather than a collection of parts.

Everything about this machine gives the impression that someone has put a lot of thought into it.  Here are some examples:

- the cooling vent is hidden behind the hinge
- the power adaptor has two unfolding brackets for wrapping the cord around
- the power adaptor comes with a short plug and a swappable long extension cord
- the screen has a small rubber gasket running around it (rather than small rubber pads - which tend to fall off and get lost). This makes the close mechanism feel nicer
- the keyboard backlighting is fully adjustable, rather than just on or off

All parts of this machine feel premium. Take the keyboard as an example. The keys are plastic (in contrast to the aluminium case), and I wondered why they didn't try to make them match the case. The HP Spectre shows why. It has "faux metal" keys - and it just doesn't quite look right (in all other respects, the Spectre is a beautiful machine).

## The Hardware

The specs of this particular MBP are:

**CPU:** Intel Core I5 2.7GHz (turbo boost to 3.4GHz)<br />
**Memory:** 8GB DDR3 <br />
**Graphics:** Intel Iris 6100 1.5GB VRAM<br />
**Storage:** 256MB SSD <br />
**Display:** 13.3" 2560 x 1600 IPS panel<br />
**Network:** 802.11ac<br />
**Optical Drive:** Not included<br />
**Camera:** 720p

Overall, that is not bad. The only real weak point is the Intel graphics. The MBP can run Portal 2 just fine, and Minecraft (as long as you don't get carried away with shaders). If you fire up something like Battlefield 4, expect a low frame rate.

### Retina Display

Apple fans have been harping on about the retina display for years. It quickly becomes apparent why. At the default scaling setting, roughly twice as many pixels are used as a non-retina display. The result is that screen elements are the same size, but everything has a sharper look. OSX seems to do a much better job of anti-aliased fonts than Windows - making writing code much easier on the eyes.

<img class="pure-img blog-img " src="/images/dev/mbp7.jpg" alt="ity bity pixels">

The only fault the screen has, is that it isn't a touch screen. A touch screen would be nice - but OSX just isn't built for touch at this point. The main two competitors for the MBP - the HP Spectre and the Dell XPS 13 - both offer retina class touch displays, but as extra cost options that push the price past that of the MBP (note that even the cheaper low res Spectre screen has touch).

### Force Touch

Force Touch is a nifty feature you may have heard about. Apple have removed the moving 'click' assembly from their track pads, and replaced it with a simulated 'click'. They achieved this using small motors capable of generating haptic feedback - the same tech offered in some smart phones.

<img class="pure-img blog-img " src="/images/dev/mbp2.jpg" alt="track pad">

I was initially skeptical but in day-to-day use, I can't tell the difference between force touch and a 'real' track pad. No big deal right? the draw card is that the track pad can sense the amount of force being used. Apple have used this to enable the strength of the track pad click to be configurable - which is nice. Additionally, they have provided an extra type of input. If you hold your finger on the pad after clicking, and push a little harder - you feel a deeper click (which apple call a Force Touch).

The Force Touch option is context sensitive. In finder it will preview the file you have selected. If you force touch a docked app, it will reveal the window. Although these short cuts are nice, the big draw card will be pressure sensitivity. Being able to sketch in Photoshop with a stylus is a a killer feature for art/design type people.

### Ports ports ports

After Apple released the MacBook (with a single USB-C port), it seemed they'd gone mad. "You want to charge your laptop **and** use a USB device? Bah!" The madness has **not** been extended to the MBP.

Apple has provided:

- 2 USB 3 ports (on opposite sides, so double USB external hard drives will be less than great)
- 1 HDMI port
- SD Card reader
- 2 Thunderbolt2 ports

While on paper Thunderbolt2 sounds awesome for video, external drives, and docking stations - in practice anything carrying the Thunderbolt badge costs a bloody fortune. Good thing we have USB3 ports as well!

<img class="pure-img blog-img " src="/images/dev/mbp3.jpg" alt="useful ports, and firewire">

## Software

On first boot, Windows users are taken to a strange and confusing place where we add all of our external accounts. OSX is nice enough to integrate with Google, Twitter, Facebook, and Linked In. Unfortunetely OSX does not like 2 step auth on a Google account, so I had to force kill Safari to progress.

### Free Apple Software

Having had none of the anti-trust problems Microsoft have dealt with, Apple are free to bundle free things. Out of the box, you get:

- Photos (replaces "iPhoto" apparently)
- iTunes (don't worry, it's actually really nice on a mac)
- Garage Band (makes music, but not good music when I use it)
- Office Software (not MS Office, but seems ok)
- iMovie
- Maps

Maps is surprisingly great, and shows off the visual prowess of OSX. It spins, scales, and zooms around with none of the disjointed choppyness of Google Maps (or that other one... Bong Maps or something).

One odd omission is drawing software. There is nothing like MSPaint, and apparently nothing like Paint.Net exists for OSX.

### The App Store

All of your software purchases and updates happen via the app store - which seems a bit more competent than Windows Update. Don't think you've escaped reboots though. OSX still needs a restart after some patches.

The app store is virtually identical to what you have in IOS. It takes most of the pain away from installing and updating. For apps you can't find on the app store, OSX can run \*nix apps.

## The 2 month update

I neglected to post this review for 2 months. Mostly because I thought the last thing the internet needs is another person gushing about Apple Hardware. On the upside, I can now give an update of how the MBP has performed after 2 months.

The issues I've encountered are:

* Safari decided to download 2Gb of data over my tethered phone yesterday. Why? Who knows. It may be something to do with Gmail. In the meantime, I'm back to using Chrome. I've discovered this app - [Tripwire](https://www.tripmode.ch/), which allows me to selectively block/allow apps internet access.
* Sometimes gestures stop working on resume. The log provides no help. Putting the MBP to sleep and waking it up again seems to fix the issue.

That's it. 2 months after completely changing hardware and operating systems, those are the only issues I have had.

## Overall

This laptop is the best purchase I have ever made. I have absolutely no regrets. I rate this 5/5 bananas.

<img class="inline nana" src="/images/b1.png" alt="nanananana" /><img class="inline nana" src="/images/b1.png" alt="nanananana" /><img class="inline nana" src="/images/b1.png" alt="nanananana" /><img class="inline nana" src="/images/b1.png" alt="nanananana" /><img class="inline nana" src="/images/b1.png" alt="nanananana" />
