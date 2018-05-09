---
group: "tech"
categories:
- tech
date: 2013-12-18T00:00:00Z
description: ""
tags:
- development
- testing
- C#
- dotnet
title: Auto mocking with AutoMoq
url: /tech/2013/12/18/auto-mocking-with-automoq/
---



AutoMoq is a nice little package I came across today. The AutoMoq home page describes it as follows:

<blockquote>AutoMoq is an &quot;auto-mocking&quot; container that creates objects for you. Just tell it what class to create and it will create it.</blockquote>

Why is this useful? Consider the following scenario. We have a BananaCakeFactory class, that relies on a Banana Repository.
<!--more-->
Here is the constructor:

<pre class="line-numbers"><code class="language-csharp">
public BananaCakeFactory(IBananaRepo bananaRepo);
</code></pre>

If we want to run Unit Tests on methods in BananaCakeFactory, we will have to write all the mocking code to mock IBananaRepo. That's fine.

Time goes on, our app grows more complex. Now our BananaCakeFactory needs to Sugar Repo as well...

<pre class="line-numbers"><code class="language-csharp">
public BananaCakeFactory(IBananaRepo bananaRepo, ISugarRepo sugarRepo);
</code></pre>

We add mocks for our Sugar Repo, and update all our constructor calls for BananaCakeFactory. When we have a large solution, time spent adding new mocks and updating constructors really adds up. AutoMoq can take the pain away.

Here is an example of how we use AutoMoq to create a mocked class, ready for testing:

<pre class="line-numbers"><code class="language-csharp">
// init
mocker = new AutoMoqer();

// mock a Banana Cake Factory
var cakeFac = mocker.Create&lt;BananaCakeFactory&gt;();

// inject our IRepo
mocker.GetMock&lt;IBananaRepo&gt;();

// do work
var result = cakeFac.Bake();
</code></pre>

Now if we want to add our Sugar Repo, all that's needed is the following additional line:

<pre class="line-numbers"><code class="language-csharp">
mocker.GetMock&lt;ISugarRepo&gt;();
</code></pre>

Happy Coding!

<h2>Reference URLs</h2>
<li><a href="https://github.com/darrencauthon/AutoMoq">AutoMoq Homepage</a></li>
<li><a href="http://www.nuget.org/packages/AutoMoq/">AutoMoq Nuget Package</a></li>
