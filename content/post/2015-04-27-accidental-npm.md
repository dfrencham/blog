---
group: "tech"
categories:
- tech
date: 2015-04-27T00:00:00Z
tags:
- programming
- aurelia
- javascript
- css
title: Accidental NPM Packaging (and JSPM!)
url: /tech/2015/04/27/accidental-npm/
---



Last week I created a package - an NPM. I didn't *intend* to. I just wanted to use the Microsoft Signal-R javascript client, and I was surprised to see it wasn't listed in the Node package repository.

<!--more-->

## How hard can it be to create a package anyway?

There are two great motivators for developers. Laziness and annoyance.

- **Laziness**: *"I bet I can automate this, so I can spend more time doing interesting things"*.
- **Annoyance**:*"Why isn't there an NPM package for this? what is this, the dark ages?!"*.

I found myself annoyed when I decided to use [Microsoft's SignalR Javascript client](https://github.com/SignalR/SignalR/wiki/SignalR-JS-Client). There was no JSPM or NPM package.

The package manager I was using is [JSPM](http://jspm.io) - a wonderful bundle of joy that can use either NPMs or git repos as a package source. Lets make packages!

## Pre Conditions

You need:

- npm (node package manager)
- jspm (javascript package manager)
- a git client
- github & npm accounts

## Make a JSPM github package

<pre><code class="language-markup">
c:\\github&gt; mkdir mypackage
c:\\github&gt; cd mypackage
c:\\github\\mypackage&gt; git init
</code></pre>

Add a .gitignore file, and setup your github remote repo as your origin.

Now you need a package.json file. This file defines what your package is, what it depends on, who maintains it, and where it lives. It can define a lot of other things too, as defined by the [package.json spec](http://gndn). We can create one with npm.

<pre><code class="language-markup">
c:\\github\\mypackage&gt; npm init

name: (mypackage)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to C:\github\mypackage\package.json:

{
  "name": "mypackage",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes)
</code></pre>

Edit your package.json to suit your project. Run it through a json validator. Once you're happy with it, commit and push it to github:

<pre><code class="language-markup">
c:\\github\\mypackage&gt; git commit -a
c:\\github\\mypackage&gt; git push origin master
</code></pre>

Now you can test it. Add trying adding it to another project, directly from your github repo:

<pre><code class="language-markup">
c:\\github\\mypackage&gt; jspm install github:[youraccount]/[your repo]
</code></pre>

Ok, hopefully that went well.

## Create NPM package & add to NPM repo

<pre><code class="language-markup">
c:\\github\\mypackage&gt; npm publish
</code></pre>

## Update NPM package
