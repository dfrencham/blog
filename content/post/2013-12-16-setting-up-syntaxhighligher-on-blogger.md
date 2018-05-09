---
group: "tech"
categories:
- tech
date: 2013-12-16T00:00:00Z
description: ""
tags:
- development
- blogging
- syntax highligher
title: Setting up SyntaxHighligher on Blogger
url: /tech/2013/12/16/setting-up-syntaxhighligher-on-blogger/
---


As a technical blogger, one of my first questions was: <blockquote>how do I add syntax highlighting to my blog?</blockquote> I discovered  [Syntax Highlighter](http://alexgorbatchev.com/SyntaxHighlighter/).
Syntax Highlighter is a fantastic tool. It looks good, it is easy to set up, and it supports a large number of languages.
<!--more-->

I am going to walk you through setting up Syntax Highlighter on the Blogger platform. The first thing you need to do, is go to your blog template, and choose "Edit HTML".

We are going to use the CDN (shared hosting) version of the scripts. Paste this code block in the HEAD section:

<pre class="line-numbers"><code class="language-markup">
&lt;link href="http://alexgorbatchev.com/pub/sh/current/styles/shCore.css"
    rel="stylesheet" type="text/css" /&gt;
&lt;link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css"
    rel="stylesheet" type="text/css" /&gt;
&lt;script src="http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js"
    type="text/javascript" /&gt;
&lt;script src="http://alexgorbatchev.com/pub/sh/current/scripts/shAutoloader.js"
    type="text/javascript"/&gt;
&lt;script src="http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJScript.js"
    type="text/javascript"/&gt;
&lt;script src="http://alexgorbatchev.com/pub/sh/current/scripts/shBrushXml.js"
    type="text/javascript"/&gt;
&lt;script src="http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCSharp.js"
    type="text/javascript"/&gt;&lt;/script&gt;
</code></pre>

This gives us the Syntax Highligher styles, core scripts, and support for HTML/C#/Javascript. If you need additional languages, simply copy the last line, and change the .js to one of the <a href="http://alexgorbatchev.com/SyntaxHighlighter/manual/brushes/">available brushes</a>.

Next, go to the bottom of the page, above the  tag. Add the following:

<pre class="line-numbers"><code class="language-markup">
&lt;script type='text/javascript'&gt;
    // code highlight
    SyntaxHighlighter.config.bloggerMode = true;
    SyntaxHighlighter.all()
&lt;/script&gt;</code></pre>

This causes Syntax Highlighter parse your code samples. Syntax highligher is now configured. So, how do we post code samples?

There are a number of ways, but I have found this is the most reliable way:

<pre class="line-numbers"><code class="language-markup">
&lt;script type="syntaxhighlighter" class="brush: xml"&gt;&lt;![CDATA[
 // Your code goes here!
]]&gt;&lt;/script&gt;</code></pre>
Note that the brush type needs to match one of the brushes you added in the .js imports further up.

Why do we use that odd CDATA syntax? It turns out that embedding code in code (such as this page) is harder than you might think. The browser will try to interpret the code. We can change all the code characters to character codes - but that alters the original code and quickly gets tiresome.

Using &lt;script&gt; tags allows syntax highlighter to find your code sample. CDATA is a special tag that prevents XML/HTML parsers (such as your browser) from trying to parse that code block.

If you do use Syntax Highlighter, make sure you provide a link to the <a href="http://alexgorbatchev.com/SyntaxHighlighter/">author's site</a>, as he provides it free of charge.

**Reference URLs**
* Syntax Highlighter - [http://alexgorbatchev.com/SyntaxHighlighter/](http://alexgorbatchev.com/SyntaxHighlighter/)
* What is CData? - [http://stackoverflow.com/questions/7092236/what-is-cdata-in-html](http://stackoverflow.com/questions/7092236/what-is-cdata-in-html)
