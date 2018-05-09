---
group: "tech"
categories:
- tech
date: 2014-07-29T00:00:00Z
description: ""
tags:
- programming
- css
title: Quick mobile optimisation for your blog
url: /tech/2014/07/29/mobile-optimisation-for-your-blog/
---

Here are some quick changes to make your blog (or other site) more readable on mobile devices. TLDR: viewport and mediaqueries.

<!--more-->

## Where to begin?

Here is my starting point:

<img src="/images/acc/blog_before.png" style="width:300px;height:500px;border:1px solid black;" class="pure-img" alt="Ugly mobile site" />

Straight away, we can identify the following issues:

- The title is too small and hard to read
- There are excessive side margins
- The columns are too small to be readable

Not a good impression for a first time visitor.

## Fix the Viewport

The viewport meta tag was originally introduced in Safari, by Apple. It is not part of any standards, but all major browsers now support it.

In a nutshell, the viewport meta tag allows developers to control the size and the scale of the web site display area. Mobile browsers have long used a "view port" to render the visible portion of a page. On larger websites, this allowed the viewport to be larger than the actual device - enabling the user to pan and zoom. This was browser controlled, and was usually a good thing. As most websites (at the time) were designed with 1024px wide screens as a minimum - the viewport enabled the user to have a good web experience.

Things were fine - until Apple introduced the Retina display. This upped the pixel density and other manufacturers soon followed. Websites that looked fine on mobile were suddenly one third smaller.

To deal with this, the CSS 2.1 spec included this line...

> If the pixel density of the output device is very different from that of a typical computer display, the user agent should rescale pixel values

In other words, if a device has a display with a high pixel density, the browser should scale the page to allow it to display correctly.

Add this line to the HEAD section of your page:

<pre class="line-numbers"><code class="language-markup">
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
</code></pre>

The line above enables caling to occur. Once we provide an initial scale, the device can scale - determined by device resolution and size (a high res phone for exampke, may have a scale of 1.75 device pixels = one "CSS" pixel).

Additionally, we have given the viewport a starting width based on the device screen width.

Please note that you should only use viewport if your site is *responsive*.

Now that our view port is properly set up, we can use Media Queries...

## Media Queries are great

Media queries are very very awesome. They allow use to target our CSS according to screen size. To see how useful this is, check this out. Say we have some CSS in our main content area that adds a 50px margin to each side:

<pre class="line-numbers"><code class="language-css">
.padSides {
  padding-left: 50px;
  padding-right: 50px;
}
</code></pre>

Well crap, now our mobile viewers have margins that are too big. Lets fix our margins by adding a media query:

<pre class="line-numbers"><code class="language-css">
@media (min-width: 800px)
{
  .padSides {
    padding-left: 50px;
    padding-right: 50px;
  }
}
</code></pre>

The @media part indicates a media query. It is followed by a condition. In this case, the style(s) will be overridden when the viewport is 800px wide or greater. Remember that order is important in CSS. You need to put your media-query rules **after** your default rules - otherwise the media query rules will never be applied!

Media queries can have rules for:

- width/height
- device type (TV or Handheld for example)
- device orientation
- and more...!

## The Result

What does my blog look like now?

<img src="/images/acc/blog_after.png" style="width:300px;height:500px;border:1px solid black;" class="pure-img" alt="Nice looking mobile site" />

Much better, eh?

<div class="highlight">Note: To get the final result I fixed a few other items in my media query CSS (title sizes, columns). I have excluded the details to keep it simple.</div>

## References

- [Mozilla Docs on the viewport meta tag.](https://developer.mozilla.org/en/docs/Mozilla/Mobile/Viewport_meta_tag)
- [Mozilla Guide on Media Queries](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries)
