---
group: "tech"
categories:
- tech
date: 2014-09-19T00:00:00Z
tags:
- html
- css
- how I got burned today
- programming
title: Yes, the doc-type is still important
url: /diy/2014/09/19/the-doctype-is-still-important/
---



or... "why don't my before/after pseudo elements work in IE8?". It may be 2014, but doc types still matter.

<!--more-->

If you have been a web developer longer than 3 minutes, you may remember the HTML doc type tag at the top of all your HTML markup. You probably just set it to &lt;!DOCTYPE html&gt; - and moved on with your life. That's usually fine, but not always.

## How I got burned today
For the last couple fo weeks, I've been rectifying some HTML written under Dot Net **1.0** (Yes, you did read that correctly). This code gets used by thousands of people every day. It is mostly reliable, but it is not accessible, and due to a change in government policy - my team needs to make it accessible (WCAG2 AA compliant).

Have you seen the movie Inception? This app is like thats that, but with never ending levels of nested tables. One of my co-workers replaced most of the tables with DIVs, but jury is out on whether that made things better or worse.

While bringing the CSS to modern standards, I used the CSS "before" attribute, as follows:

The style was quite simple:

```
.spiffy-form input.required-field:before {
    content: "*";
    font-weight: bold;
}
```

In Firefox, I had a nice star displayed.

Strangely, IE8 had no star.

IE8 *does* support the **:before** and **:after** pseudo-elements, what was going on?

It turns out that IE8 doesn't support **:before** and **:after** if it's rendering engine is in quirks mode.

## Feeling Quirky

In the dark days of the web IE and Netscape Navigator rendered things a little differently to each other. Each browser had a partial implementation of the HTML (and later, CSS) specification - as well as custom extensions to it. This continued well into the time Netscape died and FireFox emerged.

The IE team had to move closer to standards compliance, but couldn't risk breaking thousands (millions?) of sites to do so. The solution from the IE team (and later, other browsers) - was to implement "Quirks mode". For IE, this means loading an earlier version of the rendering engine - one that has a bad/old/loose HTML compliance. You essentially get IE 5.5 with support for a few later features jammed in.

I'm going to emphasise that:

<div class="bs-callout bs-callout-info">
  <p>Quirks Mode == Internet Explorer 5</p>
</div>

Obviously we don't want to be using IE5.5 - because IE5.5 is crap.

## Moving Forward

If it is a new(ish) site/app, go for the HTML5 doctype:

<pre><code class="language-html"><!DOCTYPE html></pre></code>

If you are updating some godawful mess from 2003, you are going to want the HTML4 doctype with loose standards compliance:

<pre><code class="language-html"><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"></pre></code>

If you want to stick with HTML4, but you care about accessibility, this doctype will let you use ARIA attributes:

<pre><code class="language-html"><!DOCTYPE html PUBLIC "-//W3C//DTD HTML+ARIA 1.0//EN" "http://www.w3.org/WAI/ARIA/schemata/html4-aria-1.dtd"></pre></code>

Apply any of those doc types, and your before/after pseudo elements will start working. You will also have a more maintainable site and more consistent rendering.

Happy coding!

## Further Reading

[This great site](https://hsivonen.fi/doctype/) goes into various DocTypes and their effects in a good level of detail.
