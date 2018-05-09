---
group: "tech"
categories:
- tech
date: 2015-05-30T00:00:00Z
tags:
- javascript
- programming
title: Finding a javascript performance gremlin
url: /tech/2015/05/30/finding-a-javascript-performance-gremlin/
---



Performance issues in a JS app can be frustrating... especially when your app is convoluted soup of data-bound observables. Today I discovered a performance gremlin. I'll walk you through the process of finding it and rectifying it.

<!--more-->

## The Symptoms

My team have been working on a large javascript application. We deployed it to a new environment, and started going through some shakedown tests. All seemed to be going well... until I loaded a certain view. Then I waited... and waited. 7 seconds later, the view loaded. I reloaded with a different set of test data. This time the wait was 12 seconds.

That view had worked fine in our lower level environments (loading in under 1 second), what was going on?

## Investigation

The first order of business was to fire up the Chrome profiler. The profiler has an option for tracking heap allocations. The way it works is by taking a snap shot of js objects currently in memory, and comparing it to a 2nd snapshot taken at the end of the profile.

The profiler gives us a way to examine all objects retained (not cleaned up by the garbage collector). This is advantageous in two scenarios:

1. We have a memory leak
2. The app is spending an unexpectedly long time doing something

With the profiler fired up, and a profile completed - I started examining the output. The **Total Cost** column shows us the **%** of total profiled time spent on a line of code. With this in mind, I started at the top (100%) and looked for any large sudden drops in that value. A large drop in value indicates that (for the given line) a function call made in that code path has consumed a large amount of your total cost.

My culprit quickly became obvious:

<img class="pure-img blog-img " src="/images/dev/perf4.png" alt="chrome profiler">

Notice the sudden drop from 100% to 50.52%? and a bit further down we can see the second code path - at 49.26%.

In both cases, out problem line is the **place()** method in the boot bootstrap-datetimepicker.js library.

## The Cause

Here is the function concerned. I've highlighted the problem line:

<pre class="line-numbers" data-line="3"><code class="language-javascript">
if (!this.zIndex) {
				var index_highest = 0;
				$('div').each(function () {
					var index_current = parseInt($(this).css("zIndex"), 10);
					if (index_current > index_highest) {
						index_highest = index_current;
					}
				});
				this.zIndex = index_highest + 10;
			}
</code></pre>

That line shows a jQuery selector querying **every single div** on the page to get the z-index. Once it finds it, the datepicker adds 10 to the value and uses that as its own z-index. Why would it do that? Simple - so the popup calendar will always display on top of any other page content.

There are some problems with this approach:

* the date picker calendar is going to display on top of all other elements - including dialogs, overlays, or any other obnoxious controls you are using.
* block elements other than divs can have a z-index too, so the code might not get the highest z-index anyway.
* Single page apps typically have a ton of views in memory at any time, which are in the DOM, but not currently visible. That could be a lot of divs to iterate through!

Just how many divs could this thing be looking at?

<img class="blog-img " src="/images/dev/perf3.png" alt="oh dear">

1746.

Now consider that the jQuery selector is being run for *every date picker on the page*. Life gets painful fast.

## The Fix

The current version of the date picker has a way to set the z-index via a property. If we set a z-index, we bypass that problematic jQuery selector.

I went ahead set the z-index to a suitably high value, and reloaded the view.

**BAM!**

The view loaded in under 1 second, and I rode off into the sunset.
