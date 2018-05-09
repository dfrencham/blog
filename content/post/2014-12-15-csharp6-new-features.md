---
group: "tech"
categories:
- tech
date: 2014-12-15T00:00:00Z
tags:
- dotnet
- programming
title: 3 Awesome New C# Features
url: /tech/2014/12/15/csharp6-new-features/
---



A new version of C# is on the way. Here are 3 new features to make your life easier.

<!--more-->

New additions in C# 6 are focused on making developers more productive - getting more done with less code. Let's start with a nice new operator.

## Null Propogation Operator

Most C# devs will be familiar with this sort of code:

<pre class="line-numbers"><code class="language-csharp">
if (businessThing != null) && (businessThing.OtherThing != null) {
  if (businessThing.OtherThing.NestedThing != null) {
    businessThing.OtherThing.NestedThing.DoThings();
  }
}
</code></pre>

A common repetitive task is to check that an object is not null, and if it is not null, do somthing with one of the objects properties.

Now we have this shiny new operator:

<div style="font-size:72px">?.</div>

This is the null propation operator. It does a null check of a property, and if that null check passes, it then accesses the property. If the null check doesn't pass, it jumps out of the statement and continues program execution without throwing an exception.

Our ugly block of code above, becomes this:

<pre class="line-numbers"><code class="language-csharp">businessThing?.OtherThing?.NestedThing.DoThings();</code></pre>

It really improves readability, as well as making your code more consise.

## Nameof Expression

This tells us the name of a variable. Here's a use case:

<pre class="line-numbers"><code class="language-csharp">
public void PrintFavourites(string animal, string food) {
  // using nameof
  if (animal == null)
    throw new ArgumentNullException(nameof(animal));

  // using magic strings, bad
  if (food == null)
    throw new ArgumentNullException("food");

  // do stuff
}  
</code></pre>

Cool huh?

## Auto Property Initialisers

Auto properties are great, but up until now we can't auto initialise them, which is less than great for a read only property. Currently we need to:

1. Create backing field
2. Initialise the backing field in our constructor
3. Explicitly create the property, referencing the backing field

C#6 brings us auto property initialisers, allowing declaration and initialisation in a single line:

<pre class="line-numbers"><code class="language-csharp">public string Bob { get; } = "Dave";</code></pre>

Bam. Done.

## How long do I have to wait?!?!

C#6 will be shipping with VS2015, which recently had the developer preview released. The release date isn't finalised yet.

You can get more details on C#6 [here](http://msdn.microsoft.com/en-us/magazine/dn802602.aspx), and more detail on VS2015 [here](http://www.visualstudio.com/en-us/news/vs2015-preview-vs.aspx).
