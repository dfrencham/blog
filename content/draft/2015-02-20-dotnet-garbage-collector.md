---
categories:
- tech
date: 2015-02-20T00:00:00Z
draft: true
tags:
- tech
- dotnet
title: The Dot Net Garbage Collector
url: /2015/02/20/dotnet-garbage-collector/
---



One of the great things about the dot net runtime has always been the garbage collector. I'm going to demonstrate life without a garbage collector, and then into the dotnet  garbage collector.

<!--more-->

## Manual Memory Management

A few years back I was writing an IOS app. It ran great on the iPhone simulator, so I deployed it to my trusty iPod touch. Things did not go well. The app was a 2d game with a few things going on. In some cases, the player would kill an enemy character... which would then disappear... but would mysteriously remain in the game and - *completely invisible!*

What was going on? turns out that the IOS simulator was using garbage collection. The actual physical device (ipod, iphone), did not have a garbage collector. So, how do you manage memory in a language without garbage collection?

Generally, you manage a count of pointers to that object. In IOS, this is the *retain count*.

1. You allocate (alloc) memory to new items (setting the retain count to 1)
2. You call retain if you want to keep the object around in another context (put simply, you are using in another object). This increases the retain count by 1.
3. You call release when the object you retained it for no longer requires it (reducing the item's retain count by 1).
4. When an object's retain count hits 0, it is automatically deallocated.

Here is some code:

<pre class="line-numbers"><code class="language-csharp">
// a constructor with a call to 'alloc' (allocate) memory
NSNumber *zero = [[NSNumber alloc] initWithInteger:0];

// we're setting something to a new value
// note that we retain the new item, and release the old
- (void)setThing:(NSNumber *)newThingCount {
    [newThingCount retain];
    [_thingCount release];
    // new assignment.
    _thingCount = newThingCount;
}

// here is a clean up method that releases the _thingCount variable, then
// calls the super class and explicitly deallocates itself
- (void)dealloc {
    [_thingCount release];
    [super dealloc];
}

</code></pre>

Seems straight forward enough, but just wait until you ramp up the complexity. Manual memory management is another thing to keep track of, and potentially - a large source of bugs. That said, there are some very valid scenarios where you can make gains. Embedded programs are a good example (the device may have very little storage and memory).

## The DotNet garbage collector

In basic terms, this is how the dot net runtime manages memory:

*When objects are created, the runtime automatically allocates memory on the managed heap for those objects. The garbage collector algorithmically determines the best time to perform a collection. During a collection, objects in the heap that are no longer referenced are deallocated.*

The simplified version is... if you were a boat - the DotNet garbage collector trundles along in your wake, grabbing and smashing things you are finished with, and making sure your boat does not run out of space.

To understand how the GC works, you need to know about it in the context of the runtime heap.

### The Runtime Heap

The runtime heap has 3 generations of objects, with objects being allocated to the first (gen 0), and being promoted to higher generations if they survive garbage collection. The generations are:

* **Generation 0** temp or short term items. Any items surviving a GC collect are promoted to....
* **Generation 1** not temporary, but not considered long term. Survivors are promoted to...
* **Generation 2** long term items, such as static variables.

If any of these generations have a high number of survivors, the threshold for that generation may be adjusted - causing a larger number of items to be removed during the next garbage collection.

Generations 0 and 1 are known as *Ephemeral generations*. The term "Ephemeral" (pronounced "iff-em-eral") means "transitory written or printed matter" which is not intended to be retained - in other words, all our short term items. There is a section of memory allocated for Ephemeral objects called the "Ephemeral segment". Note that Generation 2 objects can be allocated within the ephemeral memory segment.

Now that we know the basics, when does a garbage collection occur?

**Conditions for a garbage collection run**

* The system is low on memory, or
* The runtime heap has exceeded a (continually adjusted) threshold for memory use, or
* The GC.Collect() method has been explicitly called

### Garbage Collector Options

The garbage collector has 2 options configurable at run time. They are:

- the **server** setting (gcServer)
- the **concurrent** setting

These settings can be configured as follows:

    <configuration>
     <runtime>
      <gcServer enabled="true/false" />
      <gcConcurrent enabled="true/false"/>
     </runtime>
    </configuration>

Here are the defaults in the latest CLR versions:

|--------------------
| CLR Version &nbsp; | GC Mode &nbsp; | Default GC Type &nbsp; |
|:------------|---------|-----------------|
| 4.0 | Workstation &nbsp;| Concurrent |
| 4.0 | Server | Non-concurrent (multi-threaded) |
| 4.5 | Workstation | Concurrent |
| 4.5 | Server |Background (multi-threaded) |
|-----------------------------------

**Server Collection**

By default the CLR uses Workstation style garbage collection. In Server mode, a heap and a dedicated garbage collection thread are provided for each CPU. These GC threads work together, and achieve faster collections compared to Workstation style collection. This *will* use more resources. For instance, if you have a quad core system, running 10 processes - that will give you 40 GC threads (10 processes * 4 CPUs).

**Concurrent garbage collection**

By default (in Workstation mode), concurrent garbage collection is enabled. This provides a dedicated thread for GC, that can perform collections while running concurrently (not blocking) other managed threads. Note that this only apples to generation 2 objects, gen 1 and 0 are still collected non concurrently.

**Background Garbage Collection**

In the case of background garbage collection, generation 0 & 1 objects are collected while the gen 2 garbage collection is running. In workstation mode, there is a single dedicated thread (the same as in Concurrent garbage collection). In server mode, multiple threads are used. Note that in server mode, this is the default.

To enable background garbage collection in workstation mode, set gcConcurrent to "false".

## Writing Code with the Garbage Collector in Mind

### 1. Dispose your disposable objects

If you are working with an object which implements IDisposable, call dispose() - either explicitly or implicitly. If you reference the object via a using statement, dispose() is called automatically. So - if you can, use Using statements, and keep life easy.

Considering implementing IDisposable in your classes (if appropriate).

### 2. Don't null local variables

You do not need to start setting your local variables to null all over the place. You'll fall down the trap of premature optimisation, and achieve very little. The JIT compiler is able to statically determine when local variables are no longer referenced, and GC them as needed.

### 3. Use the Server setting on Servers

As detailed earlier, for a server based app, ensure you set the GC mode to "server".

---

## Neat things

### Manual invocation

Microsoft do not recommend doing so, but you can manually call [GC.Collect()](https://msdn.microsoft.com/en-us/library/system.gc.collect.aspx). I find that to be pretty neat, but maybe I'm just not a complicated guy....

### Register for notifications

Have you ever wanted to print the string "OM NOM NOM" when the garbage collector runs? Well, now you can! Using [GC.RegisterForFullGCNotification](https://msdn.microsoft.com/en-us/library/system.gc.registerforfullgcnotification(v=vs.110).aspx).

> Specifies that a garbage collection notification should be raised when conditions favor full garbage collection and when the collection has been completed.

The two parameters are:

- *maxGenerationThreshold* : A number between 1 and 99 that specifies when the notification should be raised based on the objects surviving in generation 2.
- *largeObjectHeapThreshold* : A number between 1 and 99 that specifies when the notification should be raised based on objects allocated in the large object heap.

Essentially, the higher you make the thresholds - the more time you will have between the GC notification occurring, and garbage collection actually taking place. Why would you want this? well, if you using these notifications to try and clean up objects (to prevent GC occurring, or manage load, or something else) - then this gives you some lead time to do it before collection actually occurs. You will probably want to have these thresholds at the same value, giving equal priority for a notification in either scenario.

The notifications raised are:

- *onFullGCApproachNotify* - we're about to garbage collect
- *OnFullGCCompleteNotify* - we have completed a garbage collection


## Further Reading

- [Dot Net Garbage Collector source](https://github.com/dotnet/coreclr/tree/cbf46fb0b6a0b209ed1caf4a680910b383e68cba/src/gc)
- [Dot Net Garbage Collector source (main class)](https://github.com/dotnet/coreclr/blob/cbf46fb0b6a0b209ed1caf4a680910b383e68cba/src/mscorlib/src/System/GC.cs)
- [4 Essential Tips for High-Performance Garbage Collection on Servers](http://www.philosophicalgeek.com/2012/06/04/4-essential-tips-for-high-performance-garbage-collection-on-servers/)
- [DotNet 4.5 GC enhancements](http://blogs.msdn.com/b/dotnet/archive/2012/07/20/the-net-framework-4-5-includes-new-garbage-collector-enhancements-for-client-and-server-apps.aspx)
