---
group: "tech"
categories:
- tech
date: 2014-01-22T00:00:00Z
description: ""
tags:
- development
- blogging
- javascript
title: Linking to Google Drive images from your Blog
url: /tech/2014/01/22/linking-to-google-drive-images-from-your-blog/
---

A good number of us have content stored on google drive. Wouldn't it be handy if we could reference that content in our blog posts? Good news, you can!

<h2>Steps</h2>

1. Go to your google drive account.
2. Ensure the folder the item is in, is shared (use the option <i>Anyone who has the link can view</i>).
3. Share the item (use the same option as above). Copy the "Link to Share" link.
4. Paste the link in the linkifier below
5. Copy the link produced, and insert it into your blog via any of your usual methods

<!--more-->

<h2>How it works</h2>
A link with this format:
{{< bare >}} http://drive.google.com/file/d/[id number]edit?usp=sharing {{</ bare >}}

is transformed using a regular expression, to this format: 

{{< bare >}} http://drive.google.com/uc?export=view&id=(id number) {{</ bare >}}

<h2>Google Drive Linkifier</h2>
<div id="gdrive_linkifier" style='background-color:#F6FCD4; border:1px solid #FFFACD; padding:7px;'>
<div id='gdrive_messages-error' style='display: none;' class='alert alert-danger'></div>
<div id='gdrive_messages-success' style='display: none;' class='alert alert-success'></div>
Paste your Google Drive Link Here <input type='text' id='gdrive_input' style='width:200px;' /> <br />
<small>Your link should have the format: {{< bare >}} https://drive.google.com/file/d/(id number)/edit?usp=sharing  {{</ bare >}}</small>
</div>
<br />
<p>Please post a comment if you have any problems.</p> 
<script src='/js/gdrive.js'></script>
