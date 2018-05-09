---
group: "tech"
categories:
- tech
date: 2014-04-10T00:00:00Z
tagline: '...but it can be fixed'
tags:
- accessibility
- opinion
- programming
title: Developing for Screen Readers is a special kind of hell
url: /tech/2014/04/10/developing-for-screen-readers-is-a-special-kind-of-hell/
---

Picture the scenario.... your manager asks you add support for assistive technologies to your shiny new SPA (Single-Page-App is a development pattern that can be roughly described as a highly responsive javascript explosion). Your client wants to implement the W3C-AA Accessibility Standard.

You are going to pull out your IDE, make a few tweaks to the app, and the screen reader will happily read your web application out to appreciative users.

After adding a few ARIA tags, you fire up a screen reader....

<!--more-->

You'll likely discover that your screen reader will miss half of your content, read out things it shouldn't, and spend a surprising amount of time making funny noises on punctuation symbols.

### The Internet Sucks for Blind People

Until I started running a screen reader over a few random sites, I had no idea just how much the internet *really really sucks* for visually impaired users.

This is the internet for blind people:

<div class="post-image">
<img src="/images/assistive-technology.jpg" alt="How the internet feels for blind people" />
</div>

Most websites are not structured properly (those H1, H2, H3 in the wrong places, tab order not used, etc), and they have terrible keyboard navigation. You might be surprised at just how many websites have buttons and widgets bound to mouse clicks and no keyboard bindings.

Blind users often have to switch between multiple screen readers or browsers on the same website. Imagine how annoying that must be.

Scott Hanselman has an excellent interview with a blind technologist - Katherine Moss. <a href="http://hanselminutes.com/413/im-a-blind-software-technician-ask-me-anything-with-katherine-moss">Listen to it here</a>. Katherine gives a good account of what the internet is like for the visually impaired.

### How a screen reader works

A screen reader (such as JAWS or NVDA) is a complex beast. I had always assumed a screen reader would work by using a browser hook to retrieve a rendered HTML document, then parse it and iterate through all the visible text on the page. This is not quite right.

Here is how it actually works (this example uses a javascript triggered change):

<div class="post-image">
<a class="fancybox" href="images/accessibility_current.png"><img class="pure-img img-thumbnail" src="/images/accessibility_current.png" alt="Current state of accessibility" /></a><br />
</div>

**In the browser....**

1. A page item is updated
2. As a result, the DOM is updated
3. The DOM change *might* raise an event to the Browser's accessibility API, as long as:
- does the browser support the associated accessibility API? (such as an Aria tag on the item)
- does the change involve something we care about? (for example, ignore hidden objects)
- should we randomly ignore it? The same type of DOM change that raised an event may not actually raise the event again, which is very frustrating.
4. If an accessibility event is raised, pass it to subscribed screen readers or other tools.

**In the screen reader.....**

5. Do we understand this API call? if no, discard it.
6. Is the user configured to hear this event? if no, discard it.
7. Is the context still relevant, or has the user moved past it? if no, discard it.
8. Read it.

There are a whole lot of events that can stop a screen reader from reading something. As mentioned at step 3, sometimes the browser behaviour is inconsistent (I'm looking you, Chrome) - at other times the screen reader just gets into a bad state and needs to be restarted.

###... and along came Single Page Apps###

Things get worse as we mix in more javascript.

Screen readers come from those quaint old times when javascript was only used for the occasional dialog and pages were generally static. In recent years, we have seen the rise of AJAX, JQuery, and the Single Page App pattern.

Consider the following: Your nice new single page app is dynamically loading a widget. You want to inform the user when that widget is ready. In theory, aria-live attributes should take care of it. In practice, browser support is patchy.

You would think that there is a method to have a screen reader read a given piece of text via a javascript call.

Nope.

There is no way to *directly* raise an event to the browsers accessibility API. Instead, you have to do something like this:

<pre class="line-numbers"><code class="language-css">
//screen reader only, hide from everyone else
    .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
}
</code></pre>

<pre class="line-numbers"><code class="language-markup">
&lt;div class="sr-only" id="screen-reader-text"&gt;
 &lt;span role='alert' aria-live='assertive'&gt;Accessibility Helper&lt;/span&gt;
&lt;/div&gt;

&lt;script&gt;
function readMessage(msg)
{
    $('#screen-reader-text').empty();
    $('#screen-reader-text').append("<span role='alert'>" + msg + "</a>");
    &lt;/script&gt;
}

readMessage("Something happened");
readMessage("Something else happened");
&lt;/script&gt;
</code></pre>

The code above initialises an aria-live area (which is hidden off screen via CSS). We then clear it and re-insert a SPAN element to hopefully trigger an event the accessibility API will catch.

This is... less than ideal.

### How to fix it###

In some instances, it makes sense for a developer to **directly** interact with the browsers' accessibility API. Why not give them a means to do so?

Extend the BOM (Browser Object Model), and expose the accessibility API, allowing developers this additional path:

<pre class="line-numbers"><code class="language-javascript">
    // don't actually try this, because it won't work
    browser.accessibility.readtext("Your phone number has been updated");
</code></pre>

It could work like this:

<div class="post-image">
<a class="fancybox" href="images/accessibility_better.png"><img class="pure-img img-thumbnail" src="/images/accessibility_better.png" alt="Current state of accessibility" /></a><br />
</div>

The diagram shows how a developer could use Javascript, calling the BOM to directly signal the Accessibility API. This new feature would not replace the existing accessibility functionality - it would compliment it. The screen reader would still make the final decision on how to present those events to the user.

The reason we do not have the ability to do this already is a ideological reason - not a technical one. The committee who come up with these accessibility standards have the view that a vision impaired user should be served exactly the same content as a sighted person - with some additional HTML attributes for a screen reader.

That is nice in theory, but the problem is that as technology and patterns change and move forward, there will be more and more instances where messages/events do not get to the browsers accessibility API.

Many developers will find hacky work-arounds. Many won't bother. Either way, Accessibility will suffer.

How about extending some trust to developers, and giving us the option to directly message the Accessibility API when we need to? that way we can provide the best possible experience to our users - which is what application development is all about.

### References###
* [Mozilla Accessibility Architecture](https://developer.mozilla.org/en-US/docs/Mozilla/Accessibility/Accessibility_architecture)
* [Jaws Screen Reader](http://www.freedomscientific.com/products/fs/jaws-product-page.asp)
* [NVDA Screen Reader](http://www.nvaccess.org/)
* [Scott Hanselman interviews Katherine Moss](http://hanselminutes.com/413/im-a-blind-software-technician-ask-me-anything-with-katherine-moss)
