---
categories:
- tech
group: "tech"
draft: true
date: 2016-03-11T00:00:00Z
tags:
- blogging
- programming
title: Help - my Jekyll blog assets are broken!
url: /tech/2016/03/11/my-jekyll-assets-are-broken/
---



If you've just pushed a post to your github pages blog and discovered your css and scripts are all broken, don't worry! It's a Jekyll issue.

<!--more-->

This [bug right here](https://github.com/plusjade/jekyll-bootstrap/issues/113) is the reason why.

## How to fix it

In your **_config.yml** file, there is an ASSET_PATH variable:

````#ASSET_PATH : false````

By default, it should use the value:

````[BASE_PATH]/assets/themes/[THEME-NAME]````

Note that by default the BASE_PATH is: /

Unfortunately the version github have deployed is not correctly deriving the asset path. In some cases, it does not derive your theme - resulting in broken paths for all your assets. To fix it, specify the full path to your assets, including your theme name ("mytheme" for example):

````ASSET_PATH: /assets/themes/mytheme````

If running Jekyll locally, you will need to restart Jekyll so a full build happens after updating your config file.

Now commit your change to git, push it up to github, and all will be well.
