---
group: "tech"
categories:
- tech
date: 2015-04-30T00:00:00Z
tags:
- tech
- csharp
- javascript
- css
- programming
title: My first few hours with Visual Studio Code
url: /tech/2015/04/30/microsoft-code/
---



Microsoft have released a new editor. This is Microsoft's take on Sublime/Atom. It looks nice, it feels fast, and it can run on OSX or Linux (as well as Windows). I've been using it for work this morning - here are my impressions.

<!--more-->

## Visual Studio Code

You can download it here: [Visual Studio Code Preview](https://code.visualstudio.com/).

The big news is that Code is **cross platform**. It can run natively under OSX and Ubuntu, showing just how much Microsoft has changed direction. It will also excite my OSX-using co-worker - Jason - who constantly moans about having to start his Windows vm to run Visual Studio.

### First Impressions

This is what you see when Code starts:

<img class="pure-img blog-img " src="/images/dev/code-main.png" alt="code main" />

My first thought is that it looks very much like Atom - which looks very much like Sublime.

When I jump in to update settings, Code takes me to a JSON file:

<img class="pure-img blog-img " src="/images/dev/code-settings.png" alt="code settings" />

Settings are updated by overriding prperties in either user or workspace based settings files. Very sublime-like, and very nice.

To the left, we have a sidebar with our file explorer, search box, git integration, and debugger. Interestingly I didn't see any options for TFS source control.

<img class="pure-img blog-img " src="/images/dev/code-sidebar.png" alt="sidebar" />

The explorer is split into your *working files* and *project view*. Double clicking a file will open it and place it in your working files. Code has done away with tabs and is a much better editor because of it.

### The Editor

The editor has syntax highlighting (as expected). It also has fantastic intellisense support. My last few projects have been javascript based, and I've found that in Sublime/Atom getitng intellisense style completion going is very hit and miss. When it does work, it has always felt like a hand-me-down half hearted effort compared to the joy of Visual Studio Intellisense.

Code's intellisense is brilliant. It can negotiate require.js dependency trees. "Go to Definition" works. Peek works. "Go to symbol" works.

<img class="pure-img blog-img " src="/images/dev/code-intellisense.png" alt="intellisense" />

I did find one annoyance. Code wasn't quite sure about ES6, and gave some warnings about TypeScript (which I'm not using).

<img class="pure-img blog-img " src="/images/dev/code-es6.png" alt="es6 intellisense" />

Given how fast the Javascript community moves, this should be fixed fairly quickly.

Looking to the top right of the editor, we see this row of buttons:

<img class="pure-img blog-img " src="/images/dev/code-editbuttons.png" alt="editor buttons" />

The buttons are:

- split editor
- Changes view
- open preview

Splitting the editor gives you 2 panes (side by side). Change view displays differences compared to the checked in version in source control - **a built in diff tool** -  awesome!

Preview is enabled if you are in a html or markdown file. It splits the view, and gives you a preview pane on the right which updates as you make code changes.

<img class="pure-img blog-img " src="/images/dev/code-split.png" alt="split view" />

### What about column editing?

It's in there! If you hold alt and click, you get a second cursor... and a third... and a forth... etc:

<img class="pure-img blog-img " src="/images/dev/code-multi-cursor.png" alt="multi-cursor" />

This is the main feature that pulled me into Sublime editor. Code has a decent implementation (but I do miss being able to middle-click and drag - Sublime style).

### Other nifty things

Here are a few other items I noticed:

- there is a debugger, but only for node and mono. ASP5 support is coming soon. The debugger seemed to work ok when I gave it a test with a node.js app.
- the search pane is great - better than any other editor I have tried. I can use regex, I can exclude and include files or folders and apply a filter - and I can do all of those things at the same time, easily.
- it is built on [Github Electron Shell](https://github.com/atom/electron), the same base Atom uses.
- themes are supported

## Overall

How is Code in general use? If you use Atom or Sublime, you're going to be right at home. I haven't found anything that has pissed me off. Code looks nice, and the defaults are sane.

The only thing I can really fault it for is the name. Try searching "Microsoft Code" in a search engine. Go on. Just try.

I like that I can take Code with me if I move to a different OS.

Code uses the same base as Atom (Electron), but unlike Atom - it doesn't have issues of random lock ups or slow down. Code *feels* like a native editor. It feels fast.

In summary - I love Code! I wrote this blog post in Code, I previewed it in Code, and I checked it in in Code. If you're a front-end developer, go get Code. Go!
