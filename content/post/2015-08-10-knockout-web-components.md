---
group: "tech"
categories:
- tech
date: 2015-08-10T00:00:00Z
tags:
- javascript
- knockout
- programming
title: Nestable knockout web components
url: /tech/2015/08/10/knockout-web-components/
---



Web Components are the Next-Big-Thing&trade;, the second-coming, etc etc etc. Yeah, so we've all been hearing about web components. How can we use them in a nestable, compatible way?

<!--more-->

## Background

A few years back the Javascript community discovered databinding. KnockoutJS (a pretty great data binding library) was the in thing. Then AngularJS came onto the scene and I stopped hearing about Knockout. Recently, people have been talking about web components. Web Components are a great way to make your code modular, more readable, and solve all your problems. Unfortunately Chrome is the only browser with a native implementation.

A search for "Web Components" takes you to Google's Polymer framework, which isn't a framework - but does give you Web Components. Unfortunately you need IE10 or better. Those of us working for large corporations or government departments generally have to support IE9. What to do?

Well, good news! Knockout implements Web Components - but we can't call them web components, they are "web component inspired" components that happen to behave indistinguishably from web components, and they also happen to work in IE9. Great!

## Why do I want web components?

Simply put, you can write code that looks like this:

<pre><code class="language-markup">
&lt;html&gt;
  &lt;body&gt;
    &lt;todo-list params="color: green;"&gt;
      &lt;checkable-item&gt;Write blog post&lt;/checkable-item&gt;
      &lt;checkable-item&gt;De-clutter house&lt;/checkable-item&gt;
    &lt;/todo-list&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>

Nice, readable code - with nestable custom HTML elements.

## How to do it

### checkable-item web component

This is the view for our checkable list web-component, which will be displayed in our to-do list web component.

<pre><code class="language-markup">
&lt;!-- checkable-item-view.html --&gt;
&lt;div style="border:1px solid blue; margin: 5px; padding: 5px;"&gt;
  &lt;label data-bind="text: labelText"&gt;&lt;/label&gt;
  &lt;input data-bind="checked: checkbox" type="checkbox" /&gt;
  &lt;input data-bind="value: textField" type="text" /&gt;
&lt;/div&gt;
</code>
<code class="language-javascript">
// checkable-item-viewmodel.js
define(['knockout'], function(ko) {
    function CheckableItemViewModel(params) {
        this.labelText = params.labelText;
        this.textField = ko.observable();
        this.checkbox = ko.observable();
    }
    return CheckableItemViewModel;
});
</code></pre>

### todo-list web component

Here is our 'container' web component. Notice that knockout template binding in the viewmodel? That allows us to pass through HTML elements. It allows for the nesting of HTML within components. The $componentTemplateNodes contains the DOM nodes nested in the markup.

<pre><code class="language-markup">
&lt;!-- todo-list-view.html --&gt;
&lt;div style="border:1px solid red; margin: 5px; padding: 5px;"&gt;
  &lt;strong&gt;
    &lt;div data-bind="text: componentText"&gt;
    &lt;/div&gt;
  &lt;/strong&gt;
  &lt;!-- The line below this is where the magic happens --&gt;
  &lt;!-- ko template: { nodes: $componentTemplateNodes } --&gt;&lt;!-- /ko --&gt;
&lt;/div&gt;
</code>
<code class="language-javascript">
// todo-list-viewmodel.js
define(['knockout'], function(ko) {
    function ToDoListViewModel(params) {
        this.componentText = params.componentText;
    }
    return ToDoListViewModel;
});
</code></pre>

### Host Page

Here is our HTML page. Note that for it to work, it depends on requireJS, textJS, and KnockoutJS. I've placed my web components under a "/Components/" folder. I've omitted the dependencies and requireJS configuration from the example below, to keep things brief.

The important part is the component registration.

<pre><code class="language-markup">
&lt;html&gt;
  &lt;body&gt;

    &lt;h1&gt;How to create knockout nested components&lt;/h1&gt;

    &lt;checkable-item params='labelText:"component that isnt nested"'&gt;&lt;/checkable-item&gt;

    &lt;todo-list params='componentText:"text passed to component"'&gt;
      &lt;checkable-item params='labelText:"nested component"'&gt;&lt;/checkable-item&gt;
    &lt;/todo-list&gt;

    &lt;script&gt;
    // this is how we register components
    ko.components.register('todo-list', {
      viewModel: { require: 'components/todo-list/viewmodel' },
      template: { require: 'text!components/todo-list/view.html' }
    });
    ko.components.register('checkable-item', {
      viewModel: { require: 'components/checkable-item/viewmodel' },
      template: { require: 'text!components/checkable-item/view.html' }
    });
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>

There you have it. Go forth and create Web Components.
