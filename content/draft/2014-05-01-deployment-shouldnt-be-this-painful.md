---
categories:
- tech
date: 2014-05-01T00:00:00Z
draft: true
tags:
- development
- op-ed
- deployment
title: Deployment shouldn't be this painful
url: /2014/05/01/deployment-shouldnt-be-this-painful/
---



I've spent a lot of hours lately on deployment, and most of it has been wasted time. Most of that has been spent asking Ops staff for logs and config files, or dealing with process related issues. Those of you who have deployed your applications in large organisations or government departments will know exactly the level of pain I'm having.

<!--more-->

## The Theory##

The theory a lot of large organisations have is as follows: "All of our environments will be the same. A developer will only have access to the lowest level. If they can successfully deploy there, all higher levels will be problem free."

On the face of it - it makes sense. Why should a developer care about the higher levels anyway. Configure it once, then promote through the environments. That's why my **Environments for Dummies** book recommends.

## The Reality##

Our developer hero gets ready to promote his app from the APPTEST environment to the UAT environment. Things are breaking everywhere. The Chrome console is showing a disturbing amount of errors. All of the app styles have packed up and left. Worst of all, all of our REST/SOAP services are returning an ominous error 500.

"Ok, no problem", our developer thinks, "I'll just grab the logs and have a look". The developer rings the ops staff.

<div class="talk-box">
<div class="talk-actor1"><div>DeveloperDave</div><p>Hi, this is Developer Dave. Can you please send me the logs for NewApp? I don't have access. </p></div>
<div class="talk-actor2"><div>OpsPerson</div><p>  Hi Dave, which server?</p></div>
<div class="talk-actor1"><div>DeveloperDave</div><p> Damn, not sure. Hang on. *paper rustling* ok, app servers VM1 and VM2</p></div>
<div class="talk-actor2"><div>OpsPerson</div><p> No problem Dave, but I'm going to need a service request.</p></div>
<div class="talk-actor1"><div>DeveloperDave</div><p> What? really? ok.</p></div>
</div>

One service request, 2 approvals, and half a day later - DeveloperDave is back on the phone.

<div class="talk-box">
<div class="talk-actor1"><div>DeveloperDave</div><p> Hi again, I've found the first problem! We need to update one of our endpoint addresses that calls....</p></div>
<div class="talk-actor2"><div>OpsPerson</div><p>  You're going to need to lodge a change request. </p></div>
<div class="talk-actor1"><div>DeveloperDave</div><p> Can we give it a try and see if it works first?</p></div>
<div class="talk-actor2"><div>OpsPerson</div><p>  Sorry the procedure is a change request. I'll get my butt kicked if I don't follow procedure.</p></div>
<div class="talk-actor1"><div>DeveloperDave</div><p> Ok thanks.</p></div>
</div>

DeveloperDave lodges his change request, and sends it to the Change Manager. The Change Manager notices that Dave didn't set the "risk level" value to correct value, and rejects the request.

<div class="talk-box">
<div class="talk-actor1"><div>DeveloperDave</div><p> Hi, are you able to approve my change? I've put a value in the risk field.</p></div>
<div class="talk-actor3"><div>ChangeManager</div><p>  Hi Dave, sorry, you've categorised this as a low risk change. It could break NewApp.</p></div>
<div class="talk-actor1"><div>DeveloperDave</div><p> But that app is already broken, I'm trying to fix it.</p></div>
<div class="talk-actor3"><div>ChangeManager</div><p>  If the app wasn't broken, this could potentially break it. As such, it is a high risk change. Do you see where I am coming from Dave?</p></div>
<div class="talk-actor1"><div>DeveloperDave</div><p> but... the app is already broken... I need to fix it..?</p></div>
</div>

After an hour of back and forth, multiple managerial approvals, and multiple calls to the the Ops staff - Developer Dave's change is finally though. The app is still broken - but now one of the services is kind of working. It seems to be getting mangled data.

<div class="talk-box">
<div class="talk-actor1"><div>DeveloperDave</div><p> Hi, NewApp's WhichWhatsit service is getting mangled data, any ideas?</p></div>
<div class="talk-actor2"><div>OpsPerson</div><p>  Oh yeah, that'll be the firewall configuration for that environment.</p></div>
<div class="talk-actor1"><div>DeveloperDave</div><p> but that environment is supposed to be the same as the lower environment?</p></div>
<div class="talk-actor2"><div>OpsPerson</div><p>  No mate, it is closer to Production, so it has a similar firewall setup. You'll need to send a service request to the Firewall team so they can log a Change Request. There's a 2 day turn around</p></div>
<div class="talk-actor1"><div>DeveloperDave</div><p> ... </p></div>
</div>

This is not made up. It is paraphrased from a deployment I was recently involved in. 

Trying to debug the environment was like playing "marco polo". I didn't have direct access to any of the logs or configuration files. Every time I needed them, I had a lodge a service request. Every change required a change request *before making the change* - even just a temporary change for debugging purposes.

Each Change/Service request had a turn around of between 1 hour and **1 day**. What should have been a single day job resolving the environmental issues turned into a multiple week adventure.

### Why is it like this?###

So, why is it like this? Devs and Sys Admins have different goals. Us Devs want our app deployed, and we want it done ASAP. SysAdmins want their servers to stay stable. Uncontrolled change is the enemy of stability. This is a SysAdmin's view of Developer attitudes:

<img class="pure-img img-thumbnail" src="/images/devops.jpg" alt="Devs vs Ops" />

On the flip side, Ops staff are often viewed as obstructionists, or road blocks to deploying an app. 


### What can we do?###

So, is there a happy medium? The DevOps movement/doctrine/religion would have you believe you can have mixed teams or devs in mixed roles. There certainly something to be said for that - but in many large conservative organisations - it is not an option.

There are some steps we can take to make life easier:

1. Request read access to environments, and request it early. By early, I mean at Project start up. If your developers can physically see and validate web.configs and other deployment objects - you are going to save yourself a lot of pain.
2. Access to log files. Many organisations have centralised logging. Again, try to get access to this. If you can't - at least try to get remote access to view event viewer.
3. Develop your


