---
categories:
- tech
group: "tech"
draft: false
date: 2019-09-18
tags:
- git
- diagram
- programming
title: Make great git diagrams
---

If you're a developer, sooner or later you find yourself having to talk about git branching strategies. Drawing this up in a drawing tool can be very time consuming for most of us mere mortals. Luckily there is a great little javascript library that exists purely for making git branching diagrams.

<!--more-->

See the nice diagram below? it is being created in real time by [gitgraph.js](https://github.com/nicoespeon/gitgraph.js).

<script src="https://cdn.jsdelivr.net/npm/@gitgraph/js" crossorigin="anonymous"></script>
<div id="graph-container" class="add-scroll" style="overflow-x: scroll"></div>

<script>

const graphContainer = document.getElementById("graph-container");

const gitTemplate = GitgraphJS.templateExtend(GitgraphJS.TemplateName.Metro, {
  colors:  ["#979797", "#008fb5", "#009900"],
  commit: {
    message: {
      displayAuthor: false,
      font: "12pt sans-serif",
      displayHash: false
    },
  },
  branch: {
    lineWidth: 8,
    label: {
      font: "12pt sans-serif"
    }
  }
});

// Instantiate the graph.
const gitgraph = GitgraphJS.createGitgraph(graphContainer, {
  template: gitTemplate,
  orientation: "vertical"
});

var master = gitgraph.branch("master");
master.commit("Initial commit");

var develop = gitgraph.branch("develop");
develop.commit("new dev stream").commit("bug fix");

var feature = develop.branch("feature");
feature.commit("Display blog posts in 3d");
feature.commit("Add OpenGL option");
develop.merge(feature, "Pull Request: feature TO develop");

develop.tag("RC1");
master.merge(develop, "Pull Request: develop TO master");


// var m = gitgraph.branch("master");
// var prod = m.branch("production");

// prod.commit("prod commit");

// var iref = prod.branch("1909-q3-iref");
// iref.commit("iref bug fix");
// iref.commit("iref bug fix");

// var mergeb = iref.branch("merges/1909-q3-iref/production-20190916");
// mergeb.commit("");
// mergeb.merge(prod, "merge from production");
// iref.merge(mergeb, "Pull Request back to IREF");

// iref.commit("bug fix");

// prod.commit("prod commit");



</script>

Setting things up is pretty straight forward. You can install with `npm i --save @gitgraph/js`, or simply import the CDN version: 

`<script src="https://cdn.jsdelivr.net/npm/@gitgraph/js" crossorigin="anonymous"></script>`

Add a div to the page, then pass that DOM node into `createGitgraph`. You can roll with the defaults, or pass in customisations via `createGitgraph()`.

Once you graph is created, you draw the diagram in the same way you would work with git branches. 

* Use **.branch()** against an existing branch to create a new branch
* Use **.commit()** against a branch to create a commit
* Use **.tag()** to tag a branch
* Use **destinationBranch.merge(yourBranch)** to merge

## Creating a Custom Template

To create a custom template, call `GitgraphJS.templateExtend(templateName, options)` where template name is one of the 2 defaults: 

- GitgraphJS.TemplateName.Metro
- GitgraphJS.TemplateName.BlackArrow

The options object provides all the overrides. To see which objects you can override, take a look in the [Gitgraph repo](https://github.com/nicoespeon/gitgraph.js/blob/master/packages/gitgraph-core/src/template.ts);

Pass the new template object into the create call: `createGitgraph(container, { template: yourTemplate })`

Check out the code sample for more detail.

## Browser Support

This library supports modern browsers - IE and Edge do not work. Edge will start working once Edge-Chromoium is out in the wild, but for now stick with Chrome or Firefox.

## Code Sample

<pre><code class="language-javascript">
const graphContainer = document.getElementById("graph-container");

const gitTemplate = GitgraphJS.templateExtend(GitgraphJS.TemplateName.Metro, {
  commit: {
    message: {
      displayAuthor: false,
      font: "12pt sans-serif"
    },
  },
  branch: {
    lineWidth: 8,
    label: {
      font: "12pt sans-serif"
    }
  }
});

// Instantiate the graph.
const gitgraph = GitgraphJS.createGitgraph(graphContainer, {
  template: gitTemplate
});

var master = gitgraph.branch("master");
master.commit("Initial commit");

var develop = gitgraph.branch("develop");
develop.commit("new dev stream").commit("bug fix");

var feature = develop.branch("feature");
feature.commit("Display blog posts in 3d");
feature.commit("Add OpenGL option");
develop.merge(feature, "Pull Request: feature TO develop");

develop.tag("RC1");
master.merge(develop, "Pull Request: develop TO master");
</code></pre>