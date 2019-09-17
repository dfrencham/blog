---
categories:
- tech
group: "tech"
date: 2015-11-27T00:00:00Z
tags:
- swift
- programming
title: Calling pcap from Swift (using a closure)
url: /tech/2015/11/27/swift-pcap/
---



Swift is Apple's clever new language. It is designed to be intuitive, modern, and read-able. Which it is, until you want to make a call to a C library - such as pcap.h.

<!--more-->

PCap (Packet Capture) is a C library for sniffing network packets. I wanted to try some packet sniffing on my Mac, so a command line app written in Swift seemed like a good way to try out a new language.

## The Bridging Header

To interoperate with C (and C-derivatives), Apple have the concept of a "[Bridging Header](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html)". A bridging header is simply a C header file referencing any libraries you need to have available in your Swift app.

To add one, add a new Objective-C file to your Project. XCode will prompt you to create a bridging header. Let it create one, then you can delete the objective-C file you added.

Here is my bridging header:


<pre><code class="language-c">//
//  This nifty file lets us interop with C libraries
//  (or C++, or objective C if you have a fetish for square brackets)
//
#import &lt;pcap/pcap.h&gt;
</code></pre>

With that in place, we can call *pcap*.

## Calling a C function

Let's make a call to pcap to create a new pcap session:

<pre><code class="language-swift">
var error: UnsafeMutablePointer&lt;CChar&gt;
error = nil
let device = "en0"

// create a new pcap session via pcap.h
let pcapSession = pcap_create(device,error)
</code></pre>

That's pretty standard stuff. XCode is smart enough to auto complete parameters for us, which is nice.

## Calling a C function with a callback

Where it gets more interesting, is when we have a call back involved. Here is the header of the C function we want to call, along with the typedef:

<pre><code class="language-swift">
int pcap_loop(pcap_t *p, int cnt, pcap_handler callback, u_char *user);
typedef void (*pcap_handler)(u_char *user, const struct pcap_pkthdr *h, const u_char *bytes);
</code></pre>

In the code above, *pcap_handler* is the callback. So, how do we call pcap_loop from Swift? Back in the Swift 1.x days, you had to write your callback handlers in Objective-c - then call that Objective-C from your Swift class. In Swift *2.1* we can do it using [closures](http://fuckingclosuresyntax.com). A closure is simply a self contained block of code (and Apple have made the syntax a little confusing).

<pre><code class="language-swift">
// here is the syntax
{(parameters being passed to closure) -> (returnType from closure) in statements}

// and here is how we use it
pcap_loop(pcapSession, numberOfPackets,
{
    (args: UnsafeMutablePointer&lt;u_char&gt;,
     pkthdr:UnsafePointer&lt;pcap_pkthdr&gt;,
     packet: UnsafePointer&lt;u_char&gt;) -&gt;Void in
            // our code goes here!
            print("packet received!")
},
nil)
</code></pre>

So, in this case we are passing some arguments to **pcap_loop**. The 3rd argument is a closure (the pcap_handler in the C typedef). We pass pointers as parameters for the closure which pcap will assign things to. In our case, it assigns the packet header, the packet payload, and the third is used to pass data into the closure.

At this point, we can run our app, but all we are going to be able to do is print "packet received!" to the console. We can't do anything stateful, as our closure is contained (scoped) and can't access variables or properties outside its own scope.

## Passing data to our closure

There are two ways we can go here. The first way is to pass something into the user argument of *pcap_loop*. That argument is passed to the call back function, and can be a reference to either a variable, or data structure.

The other approach is to reference an object outside of the closure scope. We could reference a global variable, but that isn't very elegant. The singleton pattern fits our need perfectly. It provides an object to maintain state of our packet capture session, and fits more with the style of Swift (vs pointer dereferencing).

Here is our singleton class:

<pre><code class="language-swift">
class PacketAnalyser {

  // this is how we create a singleton in swift
  static let sharedInstance = PacketAnalyser()

  var packetCount: Int = 0;

  // This is a basic test, so lets just print the packet
  // count to the console
  func Process() {
      packetCount++
      print("Packet count " + packetCount.description)
  }
}
</code></pre>

Here is how we call it from within our closure:

<pre><code class="language-swift">
pcap_loop(pcapSession, numberOfPackets,
{
    (args: UnsafeMutablePointer&lt;u_char&gt;,
     pkthdr:UnsafePointer&lt;pcap_pkthdr&gt;,
     packet: UnsafePointer&lt;u_char&gt;) -&gt;Void in

            // singleton call
            let pa = PacketAnalyser.sharedInstance
            pa.Process()
},
nil)
</code></pre>

Now you know how to call a C library from Swift with a callback. :)

You can find the test code here: [SwiftPcap on GitHub](https://github.com/dfrencham/swiftPCap)

Please leave a comment if this was helpful, or if you find any errors.
