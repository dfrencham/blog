---
group: "tech"
categories:
- tech
date: 2014-06-20T00:00:00Z
description: ""
tags:
- programming
- single page app
- javascript
title: 'Get Angular Running in 5 minutes '
url: /tech/2014/06/20/angular-in-5-minutes/
---



Want to try some [Angular](https://angularjs.org/) development? Need to get a dev environment set up? With a couple of automation tools, I'll have you up and going in 5 minutes.

<!--more-->

## Prerequisites

You need the following two apps installed:

1. Git
2. [Chocolately](https://chocolatey.org/) package manager.

## Instructions

We are going to use the [Angular Seed](https://github.com/angular/angular-seed) project template.

Fire up a command window, then run the following commands:

<pre><code class="language-markup">cd\git   (change this to the folder you intend to use)
git clone https://github.com/angular/angular-seed.git
cd angular-seed
cinst nodejs.install
"c:\Program Files\nodejs\npm" install
"c:\Program Files\nodejs\npm" start</code></pre>

You should now be able to open **http://localhost:8000/app/** in your web browser.

What just happened?

<pre><code class="language-markup">git clone https://github.com/angular/angular-seed.git</code></pre>

This cloned Angular Seed to your local drive.

<pre><code class="language-markup">cinst nodejs.install</code></pre>

Chocolatey installed nodejs and npm (node package manager).

<pre><code class="language-markup">"c:\Program Files\nodejs\npm" install</code></pre>

NPM found the node based project in your current folder, and automatically installed the node dependencies.

<pre><code class="language-markup">"c:\Program Files\nodejs\npm" start</code></pre>

NPM launched the node.js instance, which happens to be available at **http://localhost:8000/app/**

Too easy! :)

For a full run down of how to use the template, go here: [angular-seed on github](https://github.com/angular/angular-seed).
