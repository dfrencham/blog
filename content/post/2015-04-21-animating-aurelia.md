---
group: "tech"
categories:
- tech
date: 2015-04-21T00:00:00Z
tags:
- programming
- aurelia
- javascript
- css
title: Animating Aurelia
url: /tech/2015/04/21/animating-aurelia/
---



Have you heard of Aurelia? It's Rob Eisenberg's new framework. If you travelled forward in time two years and wrote a framework based on cutting edge tech, Aurelia would be the result. Aurelia is built on technology so new that the standards haven't been ratified yet. I'm talking ES6, ES7, transpiling, a proper module loader, lambda expressions (arrow functions), computed properties, and more.

<img class="pure-img blog-img " src="/images/aurelia-logo.png" alt="Aurelia" />

Now let's use this massively powerful framework to animate a few boxes.

<!--more-->

{% raw %}
<div class="bg-info messagebox round"><strong>2015-04-28 Article Updated</strong>
<p>This article had some incorrect code listed, and was not making proper use of the Aurelia-Animator. I have corrected the text and updated the code samples. Thanks to commenter "firens" for giving me a heads up.</p></div>
{% endraw %}

## Applying CSS Animations in Aurelia

What we are going to do is this:

> Have new databound elements fade in as they are added to the DOM, using CSS transitions. Then, we will update a counter and animate it.

To achieve our goal, we start by installing Aurelia's animation library. Open a command prompt and add it to your project as follows:

<pre><code class="language-markup">
$ jspm install aurelia-animator-css
</code></pre>

If you haven't seen jspm before, check it out. It isn't limited to jspm packages. Jspm can also install and manage npm packages, as well as pulling modules down from github repositories.

### CSS Animations

If you're unfamiliar with CSS animations - don't worry. They are straight forward. You define the key points in the animation - the starting state (0%) and the end state (100%). Apply CSS styles for those key points. The browser will extrapolate the rest. Here are the definitions for our "fade-in" and "flash" animations:

<pre class="line-numbers"><code class="language-css">
@keyframes fade-in {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
/* for compatibility with older browsers */
@-webkit-keyframes fade-in{
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

@-webkit-keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0;
  }
}

/* Credit goes to http://daneden.github.io/animate.css/ */
@keyframes flash {
  0%, 50%, 100% {
    opacity: 1;
  }

  25%, 75% {
    opacity: 0;
  }
}</code></pre>

To use our new animations we need to create a CSS class to apply to our new DOM elements, and we need to define a class to animate our counter.

<pre class="line-numbers"><code class="language-css">
.fade-in-box {
  -webkit-animation: 0.5s fade-in;
  animation: 0.5s fade-in;

  border: 1px solid black;
  background: yellow;
}

.au-attention {
  -webkit-animation: 0.5s flash;
  animation:  0.5s flash;
}</code></pre>

### Aurelia .js class

This is our view model.

<pre class="line-numbers"><code class="language-javascript">
import {inject} from 'aurelia-framework';
import {CssAnimator} from 'aurelia-animator-css';

// Use this decorator to inject the animator
@inject(CssAnimator)
export class ListExample{

  heading = 'List Example';

  listItems = [
    { listItem: 'pencils', qty: 2 },
    { listItem: 'glue', qty: 1 },
  ];

  // The inject decorator needs an appropriate constructor
  // to inject the animator.
  constructor(animator) {
    this.animator = animator;
  }

  addListItem() {
     this.listItems.push({listItem: 'packing tape',  qty: 1 });

     // then removeClass method returns a promise. We can use "then"
     // to chain it to addClass. This allows us to 'toggle' the class on the
     // element - and fire the animation
     this.animator.removeClass(this.elGridCount, 'au-attention')
        .then(this.animator.addClass(this.elGridCount, 'au-attention'));
  }

}</code></pre>

The code above creates a list of items and a button - which we bind our view to. Notice the nice ES6 syntax?

### Aurelia .html view

This is our view.

<pre class="language-markup line-numbers"><code class="language-markup">
&lt;template&gt;
  &lt;section&gt;
    &lt;h2&gt;${heading}&lt;/h2&gt;

    &lt;div&gt;&lt;button click.trigger="addListItem()"&gt;Add List Item&lt;/button&gt;&lt;/div&gt;

    &lt;div role="grid"&gt;
      &lt;div repeat.for="row of listItems" style="display: flex;"&gt;
        &lt;div style="flex: 1 auto;" class="fade-in-box" &gt;${row.listItem}&lt;/div&gt;
        &lt;div style="flex: 1 100px;" class="fade-in-box" &gt;${row.qty}&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    Count: &lt;div ref="elGridCount"&gt;${listItems.length}&lt;/div&gt;

  &lt;/section&gt;
&lt;/template&gt;</code></pre>

In the view, we've defined a list, and used "repeat.for" to bind it to our view model list items. The button is bound to addListItem().

We've also added a count of our list items. Note the "ref" attribute on the counter. This attribute is used in the model to reference the element in the view.

## Click!

When the user clicks the button, the following events occur:

**Events related to new item addition**

1. The view model method *addListItem()* adds a new item to the list.
2. Aurelia observes the new item being added, and triggers a DOM insert to add it to the grid.
3. The browser begins the fade in animation for the new element

**Events related to the counter**

1. The view model method *addListItem()* calls the aurelia animator with the removeClass method, and passes in addClass via a promise..
2. The Aurelia-Animator removes the "au-attention" class (if it exists), then follows the next function in the promise chain (addClass).
3. The Aurelia-animator adds the "au-attention" class to the "elGridCount" element in the view.
4. The browser renders the "flash" animation referenced in the "au-attention" css class.


Pretty cool, huh? Some subtle, unobtrusive animations can really make a page seem slick. Just don't go overboard, or you'll take us back to the hellish days of animated gif wall papers.

You may be thinking *"all the animator has done is add a css class to an element - the browser handled the animation part. What is the point of the animator?"*.

Good question. The animator:

- gives us events (such as animation start/end)
- allows us to chain multiple animations together using promises
- can also set/change the speed of animations
- can stagger animations - one after the other

The animator uses Aurelia's animator service - which provides an animation interface. The interface allows the animator service to have alternative implementations swapped in. For example, an implementation of the [famo.us animation library](http://famo.us)) could be integrated. Exciting times ahead!

### Aurelia-animator Supported Events

The DOM events supported by Aurelia's animator are:

- **enter** - Element enters view
- **leave** - Element leaves view
- **removeClass** - Class removed from DOM
- **addClass** - Class added to DOM

The "move" event is defined, but not currently supported. It will return a failed result if you try.

## Links

- [Aurelia](http://aurelia.io/)
- [Aurelia-animator](https://github.com/aurelia/animator-css)
- [Animate.css](http://daneden.github.io/animate.css/)
