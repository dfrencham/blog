---
group: "tech"
categories:
- tech
date: 2014-04-24T00:00:00Z
tags:
- social media
- ifttt
- automation
- tech-guide
title: Automatically post your blog to social media
url: /tech/2014/04/24/automatically-post-your-blog-to-social-media/
---



A good friend of mine recently said "it's a pity I can't just automatically post my blog entries on social media". Good news! You can - with one caveat... you can everywhere except Google+.

If-That-Then-This ([IFTTT](http://ifttt.com)) is a fantastic (free!) integration tool. I'll show you how to leverage it.

<!--more-->

First, a note on google. How can a company founded, staffed, and loved by developers be so terrible at APIs? A good public API allows developers to integrate. We make tools, we automate things, we develop apps that automatically post a picture of a cat on twitter when your WiFi aware light switch is turned on or off (true story).

So, if any Googlers read this - please, *please* open your APIs!

### Automatically post to Twitter using IFTTT - Step By Step###

Go to [IFTTT](http://ifttt.com) and sign up. Before starting, you are going to need to activate the Twitter and Feed channels. When you activate a channel, you need to configure all the associated settings for the service. In the case of twitter, you need to sign in your twitter account.

IFTTT organises all of your tasks into recipes. We are going to create a new recipe.

1. The **IF** part of If-This-Then-That refers to a trigger condition. In our case, it is a new blog post appearing in our blog's ATOM feed. Choose the "Feed" channel.
<img class="pure-img img-rounded post-image-inline " src="/images/ifft_02.png" alt="Feed Channel" />

2. Choose "New Feed Item" as the trigger.
<img class="pure-img img-rounded post-image-inline " src="/images/ifft_03.png" alt="Choosing the trigger" />

3. Enter your blog Feed URL. <img class="pure-img img-rounded post-image-inline " src="/images/ifft_04.png" alt="Trigger Details" />

4. Set "Twitter" - "Post new Tweet" as the action. This is the **That** part of If-This-Then-That.
<img class="pure-img img-rounded post-image-inline " src="/images/ifft_05.png" alt="Set an action" />

5. Add some descriptive text. You can reference the title and URL using variables, as pictured.
<img class="pure-img img-rounded post-image-inline " src="/images/ifft_06.png" alt="Add the title and URL" />

6. Confirm your new recipe, and you are good to go. Add a new blog post as a test.
<img class="pure-img img-rounded post-image-inline " src="/images/ifft_07.png" alt="Confirm it" />

You can add a recipe for Facebook following the exact same process. IFTTT really is a great service. Here are some other things I do with it:

- Sending a push message to my phone when my porch light is turned on
- Sending a push message to my phone when my irrigation pump is turned on or off
- Sending an email to me if it is going to rail tomorrow
- Turning my porch light off at Sunrise.

Happy automating!
