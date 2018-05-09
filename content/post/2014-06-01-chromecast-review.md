---
group: "tech"
categories:
- tech
date: 2014-06-01T00:00:00Z
tags:
- chromecast
- review
title: Chrome Cast (Australian) Review
url: /tech/2014/06/01/chromecast-review/
---



In July 2013, Google released the ChromeCast in the US. This allowed Google to finally make the jump to the TV, and provide some competition for the AppleTV (and other media streamers).

After a long wait, the ChromeCast has finally launched in Australia. The Australia tax has raised the price from $35 to $50. Is it worthy of your hard earned dollars? Here's the low down.

<!--more-->

<div class="bg-warning"><h2>Updated</h2>This post has been updated since my original review. The original issues I had were resolved <a href="/tech/2014/06/12/check-your-multicast-settings/">as detailed here</a>.</div>

## Meet the ChromeCast##

The ChromeCast has the following specs:

- Marvell 88DE3005 SOC (System On a Chip) with hardware decoding of the VP8 and H.264 video compression formats
- AzureWave NH–387 Wi-Fi which supports 802.11b/g/n (2.4 GHz). 
- 512Mb RAM
- 2Gb storage
- HDMI port
- MicroUSB power

It works a little differently to how you might expect. When you fling a video to the ChromeCast, it does not stream *from* your phone/pc. The ChromeCast sets up a connection back to the source of the video (YouTube for example), and streams directly. This means you can flick a video to your TV, then go back to looking at cat pics or whatever.

## Appearance, Initial Impressions##

<a class="fancybox" rel="group" href="/images/chromecast03.jpg" title="Who's a sexy dongle? you're a sexy dongle!"><img class="pure-img img-thumbnail inline" src="/images/sm_chromecast03.jpg" alt="" /></a>
<a class="fancybox" rel="group" href="/images/chromecast01.jpg" title="Comparing the ChromeCast to an analogue device"><img class="pure-img img-thumbnail inline" src="/images/sm_chromecast01.jpg" alt="" /></a>

The ChromeCast is small, matt black, and has a gold plated connector. It has a single activity indicator light, and a micro-usb port for power. It is about as sexy as a dongle can get without getting into some seriously risqué territory.

As far as size goes, you can see it sitting next to a pencil. It is small enough to fit behind the average TV. For those of you with poorly designed TVs with rear facing HDMI ports - Google's got you covered. They provide a small HDMI extension cable.

For people with a decent TV (which includes USB ports), you can plug a micro USB cable straight into your TV, hiding all the cabling. For those of you who buy your TVs from Aldi, Google include a USB power plug.

## Setting Up##

Powering up for the first time, we get a screen on the TV saying "set me up". I downloaded the ChromeCast app on my phone, and tried connecting. My phone found the ChromeCast. Success!

<a class="fancybox" rel="group" href="/images/chromecastphone01.png"><img class="pure-img img-thumbnail inline" src="/images/sm_chromecastphone01.png" alt="Set me up" /></a><a class="fancybox" rel="group" href="/images/chromecastphone02.png"><img class="pure-img img-thumbnail inline" src="/images/sm_chromecastphone02.png" alt="Nice spinny circle" /></a><a class="fancybox" rel="group" href="/images/chromecastphone03.png"><img class="pure-img img-thumbnail inline" src="/images/sm_chromecastphone03.png" alt="Pairing code" /></a>

I typed in a pairing code (matched on the TV). I chose a name for my ChromeCast (ChromeBro). Things are going well! Time to try playing some music. I fire up Google Music and start playing. Life is great. Then this happens:

<a class="fancybox" rel="group" href="/images/chromecastphone04.png" title="Google Music Fail"><img class="pure-img img-thumbnail textwrap-left" src="/images/sm_chromecastphone04.png" alt="Google Music Fail" /></a>

I could no longer control the ChromeCast. ChromeBro? Ok, no problem, let's fire up the ChromeCast app.

<br style="clear:both" />

<a class="fancybox" rel="group" href="/images/chromecastphone05.png" title="All aboard the fail boat. Toot toot."><img class="pure-img img-thumbnail textwrap-left" src="/images/sm_chromecastphone05.png" alt="ChromeCast Fail" /></a>

The next half hour I got to see this screen a lot. I tried factory defaulting, and a fresh set up. I tried running off the power plug instead of the TVs USB power.

The problem? the timezone was wrong. WHY CAN'T CHROMECAST USE MY NETWORK TIME? or even use a Time (NTP) Server? Advanced NTP technology has [only been around since 1985, after all](http://en.wikipedia.org/wiki/Network_Time_Protocol).

Things were much smoother sailing from this point onwards.

<br style="clear:both" />


## Cast me baby, all night long##

When I turn on my TV, I am greeted with this nice screen. If I choose not to cast, and just stare at this screen, it helpfully hides the text and switches between soothing images. The ChromeCast is a great way to turn your 60" into a handy photo frame (as long as you are happy to see random pictures taken by strangers).

<a class="fancybox" rel="group" href="/images/chromecast04.jpg" title="If you're wondering why the screen is reflective, it's a custom perspex cover. I have two boys. They've already destroyed one 50 plasma. Yes I cried a little. :("><img class="pure-img img-thumbnail" src="/images/sm_chromecast04.jpg" alt="Ready to cast!" /></a>

### Phone Casting (Nexus 4)###

Once connected (via the ChromeCast app), supported apps have a little TV icon appear. Performance is surprisingly great. I flicked a YouTube video to the TV. The YouTube icon appeared on the TV, and within 10 seconds the video was running - and in glorious 1020p high def. The quality seemed better than my existing Western Digital Live HD, and there was only the occasional pause for buffering (maybe once in a 10 minute video). For reference, I have a 20MBit ADSL2+ connection. 

<a class="fancybox" rel="group" href="/images/chromecast05.jpg" title="Shaun the Sheep"><img class="pure-img img-thumbnail" src="/images/sm_chromecast05.jpg" alt="Shaun the Sheep" /></a>

Once casting, you can play/pause from your phone - most of the time. Sometimes the phone loses the connection, and the movie plays on regardless. *This means you have no way to control the TV via the phone*, until you relaunch the ChromeCast app and reconnect. This seems to happen at the worst possible time - for example it happened when I was watching Ninja Turtles with my 4 year old... and a cat was exposed to radioactive slime. The cat then grotesquely pulsed, then melted while making disturbing sounds. Meanwhile, I was desperately trying to stop playback, while my kid was recoiling in terror. 

On my phone, I found I could cast from the following apps:

- You Tube
- Google Play Movies
- Google Music
- Netflix (more info further down)
- Hulu Plus (more info further down)

For a complete list of apps [look here](http://www.reddit.com/r/chromecast/wiki/apps). Amusingly, the stock version of Chrome can't ChromeCast. Surprisingly, Google+ and the Photos app can't cast. If I film a home movie on my phone, I can't cast it to the TV? 

*Google, did you not think that maybe one of the main use cases of ChromeCast would be to fling a home movie to my TV? Between that, and the lack of Chrome being able to cast - it makes the product feel very half done.*

I can't help but think if an Apple Engineer had tried to release an Apple product with a similar limitation - zombie Steve Jobs would have crucified them.

<div class="bg-warning"><h2>Update!</h2>The Android Photos/movies/Google+ app has had an update. You can now cast your home movies. Thanks Google.</div>

### PC###

Casting from the PC is a little different. I had to install the ChromeCast app in Chrome. From there, I can flick any browser tab to my TV. There is about 1 second of lag - not terrible. Movies can be played this way, but the quality seems lower than using the "Cast" button on the YouTube site. 

YouTube, Play Movies, and Play Music all get a new icon - the Cast button. I found it to be fast, reliable, and always there.

## Yes, Netflix and Hulu work in Australia##

Yes, Netflix and Hulu do work - but not out of the box. The ChromeCast has hard coded DNS servers. This will stop Australian devices from connecting to Netflix/Hulu. To work around it, I had to set static routes for Google's DNS servers (I routed them to my router), then I set the routers firewall to drop any outgoing packets destined for those DNS servers.

If the last paragraph made no sense to you, then this is probably not the device for you (if you want to watch Netflex at least).

## The Competition##

There are a fair few competing devices out there, like the Apple TV (pictured), Western Digital Live (pictured), Roku, etc.

<img class="pure-img" src="/images/chromecast_competition.png" alt="Yay, photoshop!" />

I've got a Western Digital Live. It retails for $100, and here is how it compares to the ChromeCast:

#### Western Digital Positives####

- I can control playback at any time via the remote
- Large range of existing apps
- Netflix works without having static routes and other rubbish

#### Western Digital Negatives####

- It costs $50 more than the ChromeCast
- It takes nearly 5 minutes from boot up to actually streaming a Netflix movie

My wealthy co-worker Json has an Apple TV, so I'll compare based on his feedback. Also, let's all take a moment to boo Json for not including me on his awesome side project. Boo! Json, if you're reading this, you're bad and you should feel bad. You're awesome otherwise. Moving along.

Lets compare the Apple TV:

#### Apple TV Positives####

- Huge range of apps
- You can screen share anything. ANYTHING. Playing MineCraft? flick it to the TV with AirPlay. Angry Birds? AirPlay. Amazingly, it is low latency enough to actually game with.

#### Apple TV Negatives####

- $110 
- Doesn't work with anything other than Apple devices

## Conclusion##

### The Good###

- For $50, it is pretty hard to go past
- If you have Android or Apple devices, it is going to integrate nicely. All 3 windows phone users (including famous Swede [@larsklint](https://twitter.com/larsklint)) will be excited to hear of Windows Phone support - but note that it is not as mature as other platforms, so your mileage may vary.
- It's a very compact unit, and if your TV has powered USB ports, all cords are nicely hidden away.
- The quality of video play back is fantastic. It is sharp, it is smooth, and it is *fast*.

### The Bad###

- Setup was far more painful than I would have liked
- Hardcoded DNS makes it a pain in the backside to bypass geo-blocking (Netflix,Hulu)
- Some apps have a bad habit of constantly losing communication with the ChromeCast. Hulu for instance. This makes it difficult to pause/resume.
- My phone (Nexus4) sometimes can't see the ChromeCast until I reboot it (the ChromeCast, not the phone).
- No AppleTv style screen casting... ala AirPlay. This is a killer feature.

### Overall###

The ChromeCast is a great device. If we got the same price as the US ($35) it would be a no brainer. Even at $50, it is hard to go past. If it had something similar to AirPlay, and didn't lose connection to my phone regularly, it would be 5/5.

<p style="text-decoration:line-through;">As it stands, I rate the ChromeCast 3.5 bananas.</p>

<div class="bg-warning"><h2>Updated</h2>My main issues were patchy connectivity, and troublesome setup. Since resolving these issues (and letting me cast my home movies) - I've raised my rating to 4.5 bananas.</div>
<br />
<img class="inline nana" src="/images/b1.png" alt="nanananana" /><img class="inline nana" src="/images/b1.png" alt="nanananana" /><img class="inline nana" src="/images/b1.png" alt="nanananana" /><img class="inline nana" src="/images/b1.png" alt="nanananana" /><img class="inline nana" src="/images/b2.png" alt="nanananana" />
