---
group: "tech"
categories:
- tech
date: 2014-01-14T00:00:00Z
description: ""
tags:
- development
- caching
title: Entity Tags (Etags)... what they are and why they rock
url: /tech/2014/01/14/entity-tags-etags-what-they-are-and-why-they-rock/
---

Last week, a coworker asked me a question about Etags. I'd never heard of of Etags - in spite of them being around since 1999! 

>>In a nutshell, an etag is an identifier assigned to a specific version of a hosted object by a webserver - for the purposes of caching.

Etags operate as follows:

1. A client sends a HTTP request for an object.
2. The server returns the object to the client, along with the ETag value (as an Etag field, eg: <i>ETag: "686897696a7c876b7e"</i>). The client caches the object.
3. When the client needs re-display the object, a it sends a HTTP request along with a If-None-Match field, eg: <i>If-None-Match: "686897696a7c876b7e"</i>. 
4. If the If-None-Match field matches the Etag for the resource, a HTTP 304 (NOT MODIFIED) response is sent. If the If-None-Match field does not match, a HTTP 200 (OK) response is sent along with the updated resource.


<p>This mechanism allows objects to be transmitted only when they have changed - saving on bandwidth. What's even better, is that Etags are on be default in IIS and Apache and supported by all major browsers. Sounds like a win-win!</p>

## Notes

- Etags work with all major browsers (IE8+,FF,Chrome,Safari)
- Etags work along side other cache headers (such as expiry)
- Etags are usually generated based on timestamps
- Etags can be used as a tracking mechanism


## References
   
- [Detecting the Lost Update Problem Using Unreserved Checkout (W3C 1999)](http://www.w3.org/1999/04/Editing/#2)
- [Wikipedia ETag article](http://en.wikipedia.org/wiki/HTTP_ETag)
- [HTTP 1.1 If-None-Match](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html)
