---
group: "tech"
categories:
- tech
date: 2014-06-07T00:00:00Z
tags:
- how I got burned today
- windows 8
- tech-guide
title: How I Got Burned Today - Windows 8 Install
url: /tech/2014/06/07/how-i-got-burned-win8/
---



Windows 8 polarises people. I've never minded it. It performs well in spite of having a split personality. Shiny new SSD in hand, I attempted a clean install on my laptop. Windows 8 pushed me from my usual slightly agitated states towards a murderous rage.

<!--more-->

## The Install Plan##

My Crucial C500 SSD arrived from Amazon yesterday (coincidently a new improved model was released today), so I planned a fresh OS install on my laptop. My long suffering laptop came complete with a metric ton of Hewlett Packard crapware, which claims to keep my system running smoothly. In the spirit of the HP mothership - it overreaches, and falls flat on its face.

My laptop came with Windows 7, which I upgraded to Windows 8 at some point, so I had a combination of Win7/Win8 along with some lost and confused HP "software". The HP "software" seemed to team up with Skype and push my CPU utilisation to 100%, causing the cooling fan to scream like a jet engine for most of the day.

My re-install plan was simple:

- use the Windows 8 ISO to make a bootable USB installer
- remove old hard drive and place in USB3 enclosure
- install SSD
- install Windows 8 on SSD from USB stick
- restore data from USB3 enclosure

Windows 8 had other ideas.

## Trying to Partition Your Drive? No.##

At about 9pm last night I was at the point of installing Windows 8. The installer booted up, and things seemed to be going well.

Then it came time to partition the drive. I created the partitions, then clicked next.

An ominous message appeared:

<div class="bg-danger has-error" style="padding:5px; margin-bottom:10px;"><span class="glyphicon glyphicon-remove form-control-feedback" style="margin-right:10px;"></span>We couldn't create a new partition or locate an existing one.</div>

I figured I'd done something wrong, so I restarted the whole process (twice!) only to be greated with the same message. No luck.

The next step was to try creating the partitions manually. It didn't work, but here is the process:

<pre><code class="language-powershell">

// Boot up the command prompt (boot off DVD/USB, press shift-f10 when you get past the welcome screen) run these commands:

DISKPART
LIST DISK 	(identify your SSD disk number (from 0 to n disks))
SELECT DISK &lt;n&gt;  (where &lt;n&gt; is your SSD disk number)
CLEAN
CREATE PARTITION PRIMARY
ACTIVE
FORMAT FS=NTFS QUICK
ASSIGN

// now reboot
</code></pre>

I fired up the installer again.

<div class="bg-danger has-error" style="padding:5px; margin-bottom:10px;"><span class="glyphicon glyphicon-remove form-control-feedback" style="margin-right:10px;"></span>We couldn't create a new partition or locate an existing one.</div>

Argh!

<div id="wrapper" style="width:100%; text-align:center"><img class="pure-img img-thumbnail" src="/images/failboat.jpg" alt="toot toot" /></div>

### Windows 8 won't install off of a USB stick###

I did a bit of research and discovered that Windows 8 won't install off a USB stick!

Is this really such an uncommon scenario? Windows 7 will install off of anything. I could whack a DVD against the screen of my laptop and Windows 7 will magically end up installed. Even geriatric old Windows XP would happily install from USB.

What on earth have Microsoft done to break the Windows 8 installer so badly?

Windows 8.1 [appears to be fixed](http://windows.microsoft.com/en-AU/windows-8/create-reset-refresh-media), but that's no help because *a Windows 8 key is not valid to install Windows 8.1*. On what planet did Microsoft think this would be a good idea?

I suspect there is probably some obscure technical reason, but wow.

So, what is the solution?

You can try creating the partitions manually, as I tried above. It didn't work for me, but apparently did work for some smug people on the internet. What did work for me, was copying the installation files to the SSD.

Yes, you read that correctly. You have to copy the installation files onto the SSD... then the SSD can install Windows 8 on itself. Winception?

<div id="wrapper" style="width:100%; text-align:center"><img class="pure-img img-thumbnail" src="/images/winception.jpg" alt="You're not in Expansys anymore, Toto." /></div>

To do this, start the repair option in the installer, and head back to the command prompt. Then do this:

<pre><code class="language-powershell">
//Boot up the command prompt (boot off DVD/USB, press shift-f10 when you get past the welcome screen) and do this:

// use DIR commands to figure out which drive is your USB drive, and which is your SSD
DIR /A C:
DIR /A D:
DIR /A E:

// copy USB drive files to your SSD
// in my case the command was XCOPY /E /H /R E:\ C:\
XCOPY /E /H /R &lt;source&gt; &lt;target&gt;

// now take the USB drive out and reboot. You should be in a working window 8 setup!
</code></pre>

Problem solved, Windows 8 installed. [Here is a page](http://forum.notebookreview.com/samsung/697841-guide-how-install-windows-7-8-via-usb-np700z.html) with lots of solutions (including the above) for problems you may face installing Windows from a USB stick. Check them out.

Now, time to activate.

### The Windows Activation Process Hates You###

I tried personalising a few things in Windows 8. Turns out you can't until you have activated. No worries, I have my own legit Windows 8 key that I paid for. Windows 8 disagrees:

<div class="bg-danger has-error" style="padding:5px; margin-bottom:10px;"><span class="glyphicon glyphicon-remove form-control-feedback" style="margin-right:10px;"></span>Windows cannot be activated.</div>

Turns out you can't do a fresh install from a Windows 8 upgrade edition. Of course, the Windows 8 installer doesn't share this nugget when you type in your licence key.

<div id="wrapper" style="width:100%; text-align:center"><img class="pure-img img-thumbnail" src="/images/failroad.jpg" alt="chuga chugga derp derp" /></div>

The Microsoft Website [cheerfully recommends](http://windows.microsoft.com/en-AU/windows-8/why-activate-windows) blowing away your fresh Windows 8 install, installing Windows 7, then upgrading to Windows 8.

<blockquote>
  <p>If you formatted or replaced your hard drive, you won't be able to use a product key to update to Windows 8.1 or Windows 8. You'll need to install your previous version of Windows, and then reinstall Windows 8.1 or Windows 8.</p>
  <footer><cite title="Source Title">Some Microsoft employee who hates you</cite></footer>
</blockquote>

Back in Windows 7 or earlier, an upgrade edition was fine, you just had to point the installer in the direction of your Windows XP DVD/folder/whatever to prove you owned it.

At 1am, that seemed about as fun as setting myself on fire, so I searched for another solution.

[This kind person](http://www.ghacks.net/2012/10/27/windows-8-upgrade-clean-install-possible/) found a solution:

1. Open regedit by pressing Windows-q, entering regedit and selecting the result from the list of hits.
2. Navigate to **HKEY_LOCAL_MACHINE/Software /Microsoft/Windows/CurrentVersion/Setup/OOBE/**
3. Change MediaBootInstall from 1 to 0
4. Go back to the start screen and enter cmd there.
5. Right-click Command Prompt and select to run it as administrator.
6. Type slmgr /rearm on the command line and hit enter.
7. Reboot Windows now.
8. Run the activation utility afterwards, enter your product key to activate Windows.

As soon as I followed those instructions, I could activate!

## Summary##

Microsoft, fix your installer. The installer may be the first experience a user has with your product, especially the upgrade edition. It is the first step in building a positive relationship with your user.

The areas that need improvement are

1. Your installer needs to work with a USB stick plugged in.
2. Windows 8 and 8.1 keys should be cross compatible with each other.
3. Even if I own the upgrade edition, there needs to be a method of doing a clean install. Sure, you may need a validation step (enter your old product key, or insert old boot media for example), but make it straight forward. Keep in mind that many users do not get installation media when they buy a pc. When they do, it is often loaded up with crap-ware. A fresh install will give the best possible experience.
4. Please have a look at your product activation. I shouldn't have to edit a registry entry to activate a product I have legally purchased.
5. If I have a Windows 8 licence, let me download a Windows 8.1 iso with all the latest security patches. This would have saved me hours.

If installing and activating is too difficult, many users will run a pirate copy instead - or worse, defect to a competitor. My coworker Json is Windows guy from way back (he even remembers all the old Win32 system calls). He switched to a MacBook Pro. Since changing, the only issue he has is that the machine refuses to boot if it feels he isn't smug enough. Json was making fun of my installation woes yesterday. You don't give Json any more ammunition, do you? (no, you don't).

It isn't all bad news. The installer (when it works), looks slick. It is fast. Under the hood Windows 8.1 is great. I like the OS. Your service is improving too. I whinged about the Win8 installer on Twitter, and quickly received a response from ^Helen - who seems wonderful. Please give her a pay rise.

<div id="wrapper" style="width:100%; text-align:center"><img class="pure-img img-thumbnail" src="/images/wintwitter.png" alt="chuga chugga derp derp" /></div>
