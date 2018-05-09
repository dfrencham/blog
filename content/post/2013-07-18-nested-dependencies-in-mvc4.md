---
group: "tech"
categories:
- tech
date: 2013-07-18T00:00:00Z
description: ""
tags:
- MVC4
- development
- C#
- dotnet
title: Nested Dependencies in MVC4
url: /tech/2013/07/18/nested-dependencies-in-mvc4/
---



Given how complex the average MVC4 application can become, it is likely that you are going to come across the situation where you build up a dependency chain. It may look like this: Controller -&gt; Provider/Manager -&gt; Dependency<br />

&nbsp;A common scenario may be that your controller needs a Lookup Manager, and that manager needs a cached query passed in.

In this scenario, the Unity.Mvc4 nuGet package comes into play.
<!--more-->

Here is our home controller:

<pre class="line-numbers"><code class="language-csharp">
// Home controller
public class HomeController : AsyncController
{
    private ILookupManager&lt;StatusLookup&gt; statusLookup;

	// constructor with lookup dependency
	public HomeController(ILookupManager&lt;StatusLookup&gt; statusLookup)
	{
		this.statusLookup = statusLookup;
	}
}
</code></pre>

Notice that the constructor requires the StatusLookup.

Here is the Status Manager implementation. Observe that it is a generic class, expecting a StatusLookup object. The constructor requires a query passed in (of type IQuery).

<pre class="line-numbers"><code class="language-csharp">
//LookupManager.cs
public class LookupManager&lt;T&gt; : ILookupManager&lt;T&gt; where T : ILookupField
{
	private IQuery&lt;T&gt; _query;

	// lookup manager has a Query dependency
	public LookupManager(IQuery&lt;T&gt; query)
	{
		_query = query;
	}

	public List&lt;T&gt; Lookup()
	{
		// return lookup query result
		return _query.Get();
	}
}
</code></pre>

This is where life gets easy. After installing the Unity.Mvc4 nuGet package, our MVC project gains a "boostrapper" class.&nbsp;This provides us with a simple mechanism to get any dependency into any class in our MVC app. It works by utilising the Unity&nbsp;Dependency Injection container.

<pre class="line-numbers"><code class="language-csharp">
// Boostrapper.cs
// Added by the Unity.Mvc4 NuGet package
private static IUnityContainer BuildUnityContainer()
{
	var container = new UnityContainer();

	// initialise Status lookup
	container.RegisterType&lt;IQuery&lt;StatusLookup&gt;, QueryStatusLookup&gt;();

	// make Status lookup available to mvc4 controllers
	container.RegisterType&lt;ILookupManager&lt;StatusLookup&gt;, LookupManager&lt;StatusLookup&gt;&gt;();

	RegisterTypes(container);
	return container;
}
</code></pre>

If we have a look at the BuildUnityContainer() method, there are two calls to container.RegisterType(). The first is to provide the IQuery dependency to StatusLookup. The second is to provide the StatusLookup dependency to our HomeController.

To keep it all manageable, make sure your dependencies are passed using an interface (ILookupManager, and IQuery in my case).
