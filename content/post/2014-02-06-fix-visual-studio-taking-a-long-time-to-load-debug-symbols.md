---
group: "tech"
categories:
- tech
date: 2014-02-06T00:00:00Z
description: ""
tags:
- programming
- visual studio
- argh
- C#
title: Fix Visual Studio taking a long time to load debug symbols
url: /tech/2014/02/06/fix-visual-studio-taking-a-long-time-to-load-debug-symbols/
---



I lost a good couple of hours tracking this one down. If Visual Studio is taking a very long time to load debug symbols when debugging (think 5 minutes to 30 minutes), try this...

**Delete all break points** (Debug - &gt; Delete All Break Points).

Sometimes something small like this can be a lot more frustrating than a big issue. Hopefully this saves someone from going crazy.
