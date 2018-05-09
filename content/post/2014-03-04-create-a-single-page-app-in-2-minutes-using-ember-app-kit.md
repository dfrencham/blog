---
group: "tech"
categories:
- tech
date: 2014-03-04T00:00:00Z
description: ""
tags:
- programming
- single page app
- javascript
- ember
title: Create a Single Page App in 2 Minutes using Ember App Kit
url: /tech/2014/03/04/create-a-single-page-app-in-2-minutes-using-ember-app-kit/
---



Single Pages Apps (SPAs) are the current flavour of the month. They have seemingly appeared from nowhere, but now it seems like every developer is talking about them. Wikipedia describes this pattern as follows:

>A single-page application (SPA), also known as single-page interface (SPI), is a web application or web site that fits on a single web page with the goal of providing a more fluid user experience akin to a desktop application.
>In a SPA, either all necessary code – HTML, JavaScript, and CSS – is retrieved with a single page load, or the appropriate resources are dynamically loaded and added to the page as necessary, usually in response to user actions.

In my experience they offer some advantages over traditional apps:

* Very responsive
* Rapid development time
* Data is usually provided via a REST API - making integration to other systems easy

along with some disadvantages:

* Usually implemented with javascript (with all baggage it brings, such as horrendous function passing syntax everywhere)
* Can be harder to debug - you can end up in dependency hell
* Common tasks such as continuous integration is harder than with more mature patterns such as MVC (example: making javascript unit tests play nice with TFS).

The high responsiveness alone makes SPAs worth of investigating. Responsive web apps == happy users!

Now I'm going to show you how to build one.
<!--more-->

Ok, I'm sold. What now?
-----------------------
So, where do we start? The SPA (and javascript) community is fast moving place. I have lost track of the number of new templates and libraries in use... Knockout, Angular, Durandal, Ember, Bootstrap, JQuery, etc, etc, etc. You can attempt to roll your own SPA from the ground up, or you can use a ready made project template - such as the [Ember App Kit](https://github.com/stefanpenner/ember-app-kit).

Ember App Kit gives you:

* A nice project structure
* GruntJS automation for minification, compilation, and deployment
* Ember SPA framework - with Handlebar templates, routing, controllers
* Unit tests with QUnit
* Javascript 6 (ECMA6) modules (this is very very cool- a tool called a <i>transpiler</i> is used. ECMA6 takes Javascript into the realm of modern languages with a proper object model and sane module support)

Esentially, this kit gives us an out-of-the-box ready to go application. You can use it as a starting point to customise and build on for your own application.  

Let's get started
-----------------

1. Go to Ember App Kit's git hub page and either (https://github.com/stefanpenner/ember-app-kit/archive/master.zip">Download the template (and unzip it to a folder) or clone the repo.
2. Install Node JS if you don't already have it. Ember App Kit uses Grunt to automate various tasks, and grunt uses Node.
3. Once you have Node, open a command window and do a global install of Grunt using the following command:
`npm install -g grunt-cli`
4. Now install Bower. Bower is a client side package manager:
`npm install -g bower`
5. Still in the commend window, change to your new folder from step one. Install your npm dependencies:
`npm install`
6. Install your Bower dependencies:
`bower install`

Now run the app
---------------

The following command will run your app in debug mode <b>and</b> watch for file changes (restarting the app as needed):
`grunt server`

...and this is the result:

<img src="http://drive.google.com/uc?export=view&amp;id=0BzEmq4lTwA-sMG5HZUxVX01YVU0" />  

Where to now?
-------------
You now have a fully working Ember app ready to build on. Check out the Ember Sherpas guide as well as the getting started guide to get some in depth detail on some of the features mentioned above. Be sure to leave a comment if you find this helpful (or not so helpful).

References
----------

* [Ember App Kit](https://github.com/stefanpenner/ember-app-kit)
* [Ember App Kit Getting Started Guide](http://iamstef.net/ember-app-kit/guides/getting-started.html)
* [Ember Sherpas - Introduction to Ember App Kit](http://embersherpa.com/articles/introduction-to-ember-app-kit/)
* [EmberJS](http://emberjs.com/)
* [GruntJS](http://gruntjs.com/)
