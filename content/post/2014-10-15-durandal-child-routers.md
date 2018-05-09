---
group: "tech"
categories:
- tech
date: 2014-10-15T00:00:00Z
tags:
- spa
- javascript
- programming
title: SPA within a SPA? Durandal child routers
url: /tech/2014/10/15/durandal-child-routers/
---



My current project had an interesting requirement come through: "We want the app to navigate to another single page app when the user clicks next on this page, but still have our widgets at the top". The client wanted to utilise an existing durandal SPA inside a new durandal spa.

<!--more-->

<div class="bg-info messagebox round"><strong>Note</strong><br />This post is relates to the Durandal single page app framework. If you are not working with Durandal you are probably going to find it very dull.</div>

This is the requirement I was given:

<div id="wrapper" style="width:100%; text-align:center"><img class="pure-img img-thumbnail" src="/images/durandal1.png" alt="Ez-Anchor" /></div>

A SPA within a SPA using Durandal. Why? well, we have some existing SPAs that the client wants to reuse, but they need to run within a new SPA - as part of a multi-step process.

There are two ways we can achieve this:

1. Use Compose and directly load the view in your current SPA
2. Use a child router

Using compose is easier and faster, is only useful if you only want to use a single view. If you have a bit of complexity in the 2nd SPA, child routers are going to give you far more flexibility.

### Child routers?

Exactly what they sound like! A router that is logically a child of another router. They allow you to include an entire navigation structure from one spa, in a second SPA. As an added bonus you can raise events from one SPA to the other.

As I have multiple pages and some complexity to deal with, I've gone with a child router (rather than trying to jam in multiple views with compose).

Here is my folder structure:


  - Website
    - Apps
      - SPA1
        - Views
          - spa1_page1.html (spa2 host)
          - spa1_page2.html
          - spa1_shell.html
        - ViewModels
          - spa1_shell.js (router is here)
          - spa1_page1.js (child router is here)
          - spa1_page2.js
        - DataModels
      - SPA2
        - Views
          - spa2_view1.html
        - ViewModels
          - spa2_view1.js
        - DataModels
      - Shared
        - Services


Here is the sequence of events when the user loads the SPA:

1. User navigates to app/SPA2/page1.
2. The router notices that the route matches a splat route: /SPA2/&#42;. The splat route points to a page containing a child router. The router is intelligent enough to determine that it should hand off to the child router.
3. The second SPA hosted on the page attempts to load its default route.

Easy as that.

## Notes

- Your child router should logically be set up as a sub folder (meaning if your site is logically under /, your child router will need routes for /derp/) - if you try to use a flat structure, you are going to see "route not found" a lot, even when it should work. If you do get it to work, you may find that when you try to navigate out of your child SPA you get stuck in the child SPA, ending up with nested child SPAs. It's like dividing by 0, and can cause the end of the world. No one wants that.
- SPA2 needs to be hosted within a block element in a view in SPA1.
- The child router can be configured to pre-append a path to all route destinations, allowing them to all be relative to a given page.
- You may need to update your require.js conf to allow any services needed by SPA2 to be resolved.
- If both SPAs rely on **different** libraries with the same name (for instance, both have a common.js within the SPA, with different content) you are going to have to refactor a little and give these libraries different names/Ids. Otherwise you will end up in dependency hell.

## Code Sample

Here is the code we need to make it all work.

### spa1_shell.js (Main Router)
<pre class="line-numbers"><code class="language-css">
define(function(require) {
  "use strict";

      var router = require('plugins/router');
      var system = require("durandal/system"),

      return {
        activate: activate
      };

      function activate() {

        var routes = [
            // Default view is the one with the empty string route
            { route: '', moduleId: 'Splash', title: 'Splash', nav: true },
            { route: '/SPA2/*', moduleId: 'PersonalDetailsHost', title: 'PD SPA', nav: true },
        ];

        return router.map(routes)
          .buildNavigationModel()
            .activate();
      }
</code></pre>

### spa1_page1.js (Child Router)

<pre class="line-numbers"><code class="language-css">
define(['plugins/router', 'knockout'], function (router, ko) {

  var childRouter = router.createChildRouter()
      .makeRelative({
        moduleId: '../../../../apps/SPA2/viewmodels',
        fromParent: true
      }).map([
            { route: '*SPA2', moduleId: 'spa2_view1', title: 'This is SPArta' },
      ]).buildNavigationModel();
  return {
    router: childRouter, //the property on the view model should be called router
    continueClick: continueClick // we still want to capture this event
  };
</code></pre>

### spa1_page1.html (Second SPA host)

<pre class="line-numbers"><code class="language-css">
<div class="underlined">
  <h2>Heading</h2>
</div>

<h3>SPA 1</h3>

<div>Look, I could be a SPA 1 widget</div>

<!-- second SPA lives in here -->
<section id="content" data-bind="router: { transition: 'entrance', cacheViews: true }">
</section>

<button type="button" role="button" class="btn btn-primary" title="Save and Continue" data-bind="click: continueClick">Save and Continue</button>

</code></pre>
