---
group: "tech"
categories:
- tech
date: 2015-05-13T00:00:00Z
tags:
- tech-guide
- windows
title: How to Upgrade Windows 8 to Windows 10
url: /tech/2015/05/13/upgrading-windows-81-to-windows-10/
---



The Windows 10 consumer preview is here! If you're already running Windows 8, the upgrade is simple. If you have a spare couple of hours and would like to run a slightly-buggy pre-release operating system - you're in luck. Here is how you do it.

<!--more-->

## The Windows 10 Upgrade Process

The installer can be downloaded here: [Windows 10 Preview](http://windows.microsoft.com/en-au/windows/preview-faq).

After running the installer file, this is how the install will progress:

1. Installer splash screen, click the **"Start Upgrade"** button.
2. Windows update runs and downloads a couple of GB of updates. Press the **"Get Started"** button.
3. Eula, click the **"I accept"** button.
4. Windows update will load, click the **"Restart now"** button.
5. Your current version of Windows boots back up. Click the **"Start the upgrade now"** button.
6. Finally, we boot into the OS installer. Expect to be here for one hour plus, even if you have an SSD.
7. Windows 10 boots and asks basic setup questions. Note that the "Express Setup" option will send your data (web browsing, crash reports etc) to Microsoft. If that worries you, choose "Customise".
8. After answering the questions you will finally be able to log in. Hooray!
9. Windows 10 will spend 5-10 minutes building caches, installing drivers, and doing other under-the-hood things. My laptop went from low resolution back to normal native res after about 5 minutes. Before attempting any serious work, **reboot!** I experienced out-of-memory errors and other oddities until I rebooted.

Welcome to Windows 10!

<img class="pure-img blog-img " src="/images/dev/windows10setup_4.jpg" alt="Windows 10 setup screen" />

## Errors / Items Encountered

### Customise vs Express
If you choose "Customise" instead of express setup, one of the questions asked is "can we send your browsing history/requests to Microsoft to allow pages to be preloaded for faster browsing". So, all your odd fetish porn habits will be sent to Microsoft, but on the upside your disturbing turn-ons will pre-load for you. Good news?

### Ignore the Percentage Bar

When you reboot to the Windows 10 installer, the percentage bar doesn't operate on normal time. I spent a long time at 39%.

### Memory Errors

On first boot, Spartan was broken (wouldn't load anything), and I got "out of memory" warnings. A reboot fixed all that.

<img class="pure-img blog-img " src="/images/dev/windows10setup_5.png" alt="" />

### Stuck in Low Resolution

Windows 10 initially displayed in glorious 1024x768. Wait for 5 - 10 minutes, Windows should find and load the right driver. Note that Windows 8/8.1 drivers should work in Windows 10.

### Windows 8 Start Screen Items

If you are a Windows 8/8.1 user, everything you pinned to your start screen is gone (the shortcuts are gone, not the apps). You can still find your short cuts using the Search function on the start menu. If you right click the search result item, you can pin it to your new start menu.

### Setup Screen Shots

Here are some photos from the upgrade process.

<img class="pure-img blog-img " src="/images/dev/windows10setup_1.png" alt="Click the button to download the installer." />

<img class="pure-img blog-img " src="/images/dev/windows10setup_2.png" alt="*Windows Update doing its thing.*" />

<img class="pure-img blog-img " src="/images/dev/windows10setup_3.png" alt="You're going to spend a lot of time here. At least 1 hour, probably more" />
