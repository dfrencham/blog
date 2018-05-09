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
title: OCR Solar Meter Reader - Part 2
url: /tech/2014/05/19/ocr-solar-meter-reader-part2/
---

Continuation of Raspberry Pi Solar Data Logger article. In this part I detail the software side of the OCR solar data logger. Perl, APIs, C. Hooray!

<!--more-->


## The Software Part##

With the hardware part sorted, now comes the easy part - software.

Getting inverter data is easy enough, but reading the meter is more of a challenge.

There are 3 basic parts to this:

1. Take photos
2. OCR the photos and store the values
3. Send it to the PVOutput.com API

We also need something to tie it all together. I'd usually use my beloved DotNet stack, but this is Linux so that means Mono... and getting Mono working on a Raspberry Pi requires some form of animal sacrifice... or a prayer to Zeus... or something.

I considered using shell script, but then I remembered how much I hate shell scripting. I fired up my editor and hacked up some Perl. Why Perl? Perl is tried and tested, has good library support, and is available pretty much everywhere. Also, this is valid perl code which amuses me far more than it should:

<pre class="language-perl"><code class="language-perl">
	print'````'^RPQT
</code></pre>

How can you not love a language where that is valid code? [source](http://www.perlmonks.org/?node=Obfuscated%20Code). The only language sillier than that is BrainF*ck... god help anyone trying to do something productive with that.

### Process Overview###

Here is an flow chart of the process.

<a class="fancybox" rel="group" href="/images/solar-process.png" title="Physical layout"><img class="pure-img img-thumbnail" src="/images/solar-process.png" alt="Physical Layout" /></a><br />

Essentially, the pseudo-code version goes like this:

<pre><code style="color:white;">At 11:45pm take 20 photos
For each photo
	OCR photo
	If (value -ve) store export
	Else store import
If we don't have import/export explode, and notify admin
Store import/export in CSV
Calculate daily import/export by subtracting previous days values
Send daily import/export to PVI Output REST API
</code></pre>


## Taking Photos##

I found a handy little command line tool for taking snaps - [uvccapture](http://manpages.ubuntu.com/manpages/natty/man1/uvccapture.1.html). All it needs is a camera location and resolution and away it goes.

This is a photo taken with uvccapture:

<img class="pure-img img-thumbnail" src="/images/solar-webcam.jpg" alt="Web cam photo" />

## OCR time!###

Figuring out how to OCR the display proved a bit tougher than I'd hoped. I found this great little app -[Seven Segment Optical Character Recognition](http://www.unix-ag.uni-kl.de/~auerswal/ssocr/), SSOCR for short.

SSOCR was developed with the intent of reading RSA security tokens, allowing one token to be easily shared by a group of people - which completely circumvents the point of having a RSA token.

The gentleman who wrote it is a stern German who appears to still live in 2005, in a world devoid of joy, happiness, and code sharing tools such as GitHub. He's aware of GitHub, but refuses to use it. I'm sure he's a very nice guy, but he needs to be slapped into 2014.

Moving along.

SSOCR is written in C, and has the source code available - allowing us to modify it to work with something other than an ancient RSA token.

The changes I had to make are:

- option to ignore decimal points
- option to allow minus signs (for negative numbers). Only the first character is checked.
- option to allow blank characters
- recognise a 9 with the lower segment not set

I emailed the stern German with a list of the changes I made, but neglected to email my patch through (I did intend to!). In efficient German fashion he has implemented all of those things on his own (they are all in the latest version of SSOCR).

SSOCR is really cool. It scans the image, line by line, and attempts to identify line segments. It then uses the segment data to figure out which number was discovered.

Here is some debug output from SSOCR:

<img class="pure-img img-thumbnail" src="/images/solar-output.png" alt="OCR Output" />

The different coloured lines show where SSOCR has identified line segments. Neat.

Once I have the SSOCR output, my perl script store it in a CSV file.

## Hello, PVOutput API##

PVOutput provide a handy REST API for pushing your data in. As much as REST is straightforward enough, why can't the damn thing provide a WSDL like SOAP? instead, I have to type out all my requests like some sort of neandrathal. On the plus side, I don't have to deal with 3 miles of XML gibberish, so there's that.

This is how easy it is to submit data:

<pre class="language-perl"><code class="language-perl">
	my $ua = LWP::UserAgent->new;
	$ua->default_header(
					"X-Pvoutput-Apikey" => $pvoutput_apikey,
					"X-Pvoutput-SystemId" => $pvoutput_sysid,
					"Content-Type" => "application/x-www-form-urlencoded");

	my $pvoutput_url = "http://pvoutput.org/service/r2/addoutput.jsp";
	my $request = POST $pvoutput_url, [ d => $date, e => $export*1000), ip => ($import*1000) ];

	my $res = $ua->request($request);

	if (! $res->is_success) {
		die "Couldn't submit data to pvoutput.org:" . $res->status_line . "\n";
	}
</code></pre>

There is another reason to love perl. If things go wrong, we don't exit, or error like lesser languages. No, we commit seppiku. "I can't fulfil this task you ask of me, so I'm going to die".

Perl is great.


## Getting Inverter Data##

I use [Curtronics Aurora](http://www.curtronics.com/Solar/AuroraData.html) program to retrieve statistics from the inverter, once per minute. These statistics are logged and stored in daily CSV files.

Data is sent to [PVOutput](http://pvoutput.org) every two minutes, using the [pvoutput-integration-service](https://bitbucket.org/pvoutput/pvoutput-integration-service).

Once running, this service is set and forget. Just remember to add a start up script for it, so it comes back up if the Pi goes down for any reason.

So, between the pvoutput integration service - and my OCR magic above, both the inverter data and meter data are being sent to the pvoutput portal. Hooray!

## When it all goes wrong##

Did you know the Raspberry Pi has a hardware Watchdog Timer? Overview:

>A watchdog timer is a special kind of timer commonly found on embedded systems that is used to detect when the running software is hung up on some task. The watchdog timer is basically a countdown timer that counts from some initial value down to zero. When zero is reached, the watchdog timer understands that the system is hung up and resets it.

The quote above is from [Ricardo's Workbench](http://blog.ricardoarturocabral.com/2013/01/auto-reboot-hung-raspberry-pi-using-on.html). He explains how to run it on your Pi. So, now my Pi reboots itself if it hangs.

Very nice.

## Conclusion##

It has taken a long time, and lots of experimenting to get the solar meter reader working reliably. I've had a lot of fun doing it, and learned a few things.

I went up the garden path a few times. For example: when I was having trouble getting the OCR to work reliably, I wrote a Node.js based site for selecting photos from the meter and updating pvoutput. That's a future blog post.

I'm really blown away by how far things have come in the last few years. x86 PCs the size of a mouse? Incredible. I can't wait to see what the next few years bring.
