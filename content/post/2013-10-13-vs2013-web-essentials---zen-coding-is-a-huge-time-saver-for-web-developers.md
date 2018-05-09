---
group: "tech"
categories:
- tech
date: 2013-10-13T00:00:00Z
description: ""
tags:
- development
- html
- visual studio
- javascript
title: VS2013 Web Essentials   Zen Coding is a huge time saver for web developers
url: /tech/2013/10/13/vs2013-web-essentials---zen-coding-is-a-huge-time-saver-for-web-developers/
---



As a web developer, I have regularly found myself needing to type a large amount of HTML layout code. Your page starts to grow, and your eyes begin to glaze over as you type DIV after DIV.

Enter <a href="https://code.google.com/p/zen-coding/">Zen Coding</a>. In a nutshell, ZenCoding is a set of editor extensions, allowing a developer to use shorthand for common tasks. Microsoft have incorporated these extensions into <a href="http://visualstudiogallery.msdn.microsoft.com/56633663-6799-41d7-9df7-0f2a504ca361">Web Essentials</a> for Visual Studio 2013.
<!--more-->

I can't overstate how awesome this feature is. For example, if I type:

<pre class="language-markup"><code class="language-markup">
div
</code></pre>

...and then hit the tab key, I get:

<pre class="language-markup"><code class="language-markup">
&lt;div&gt;
&lt;/div&gt;
</code></pre>

A div has been added for me. But what if I need to add a CSS Id?

<pre class="language-markup"><code class="language-markup">
div#mainContent

// tab...
&lt;div id="mainContent"&gt;
&lt;/div&gt;
</code></pre>

We can add a CSS class too:

<pre class="language-markup"><code class="language-markup">
div#mainContent.redbox

// tab...
&lt;div id="mainContent" class="redbox"&gt;
&lt;/div&gt;
</code></pre>

Maybe we need some test data to check our layout? Zen even supports Lorem Ipsum!

<pre class="language-markup"><code class="language-markup">
div>lorem

// tab...
&lt;div&gt;
    Lorem ipsum dolor sit amet, consectetur adipiscing elit fusce vel sapien elit in malesuada semper mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus.
&lt;/div&gt;
</code></pre>

This part is cool. What if we want 3 table rows, each with 2 columns? (yes, I know, you all use pure CSS now - not tables)..

<pre class="language-markup"><code class="language-markup">
table>tr*3>td*2

// tab...
&lt;table&gt;
&lt;tr&gt;
        &lt;td&gt;&lt;/td&gt;
        &lt;td&gt;&lt;/td&gt;
    &lt;/tr&gt;
&lt;tr&gt;
        &lt;td&gt;&lt;/td&gt;
        &lt;td&gt;&lt;/td&gt;
    &lt;/tr&gt;
&lt;tr&gt;
        &lt;td&gt;&lt;/td&gt;
        &lt;td&gt;&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
</code></pre>

If you find it isn't working after installing Web Extensions, make sure you are using the release copy of Visual Studio 2013 (the latest version of Web Extensions doesn't work with VS2013 pre-release). Let me know if you find more handy short cuts.<br />
