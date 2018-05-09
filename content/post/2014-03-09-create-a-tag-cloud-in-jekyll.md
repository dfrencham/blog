---
group: "tech"
categories:
- tech
date: 2014-03-09T00:00:00Z
description: ""
tags:
- programming
- blogging
- jekyll
title: Create a tag cloud using Jekyll
url: /tech/2014/03/09/create-a-tag-cloud-in-jekyll/
---



I've recently switched from Blogger to Github pages, and I'm using the very cool Jekyll app to manage my blog posts. For those that don't know, Jekyll allows you to end your blog pages locally using Markup syntax, then it translates your post to HTML. From there, you commit it to a git repository.

One feature missing from Jekyll is Word Clouds. I will show you how to add one.

<!--more-->
### Create a Jekyll Helper
----------------------

To do the grunt work, we need to create a Jekyll helper. In your \_includes/JB folder, create a new file called "tag_cloud".

Copy and paste this into the file:
<pre><code class="language-markup">
{% raw %}
	{% comment %}
		Creates a tag cloud on your page.
	{% endcomment %}
	{% for tag in site.tags %}
	  &lt;span class="tag-cloud-{{ tag | last | size | times: 10 | divided_by: site.tags.size }}"&gt;
	  	&lt;a href="{{ BASE_PATH }}{{ site.JB.tags_path }}#{{ tag | first | slugize] }}-ref">{{ tag | first }}&lt;/a&gt;
	  &lt;/span&gt;
	{% endfor %}
{% endraw %}
</code></pre>

There is nothing too clever here. We just iterate through all the tags on your site, then output a span with a link in it. To give different weighting for each number, we:
1. Get the percentage the tag makes up of the total
2. Round down to the nearest 10 (eg, 43% becomes 4)
3. Append that number to the style name. In this case, 43% becomes 4 becomes "tag-cloud-4"

That oddly named function - slugize - converts the human readable form of the URL into a shortened URL.

### Add the styles to your CSS file

Go to your CSS file (check your themes folder, in my case it was styles.css). Append the following to the bottom of the file:

<pre><code class="language-markup">
/* tag cloud */
.tag-cloud-0 { font-size: 1em; }
.tag-cloud-1 { font-size: 1.5em; }
.tag-cloud-2 { font-size: 1.5em; font-weight: bold; }
.tag-cloud-3 { font-size: 2em; }
.tag-cloud-4 { font-size: 2em; font-weight: bold; }
.tag-cloud-5 { font-size: 2.5em; }
.tag-cloud-6 { font-size: 2.5em; font-weight: bold; }
.tag-cloud-7 { font-size: 2.75em; }
.tag-cloud-8 { font-size: 2.75em; font-weight: bold; }
.tag-cloud-9 { font-size: 2.75em;
	font-weight: bold;
	font-style: italic;
}
.tag-cloud-10 { font-size: 3em; }
/* end tag cloud */
</code></pre>

Feel free to tweak these styles to change the look and feel of your tag cloud.

Now update your template
------------------------

Now you can add the tag cloud to your page. Open your default.html template file. Place the following where you want the tag cloud to appear:
<pre><code class="language-markup">
{% raw %}
	&lt;div&gt;
		&lt;h2 class='title'>Tag Cloud&lt;/h2&gt;
		{% include JB/tag_cloud %}
		&lt;div class='clear'&gt;&lt;/div&gt;
	&lt;/div&gt;
{% endraw %}
</code></pre>
Now you can build your site, and enjoy your shiny new tag cloud. :)
