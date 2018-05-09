---
group: "tech"
categories:
- tech
date: 2014-04-04T00:00:00Z
tags:
- regex
- programming
title: Every developer should learn regex
url: /diy/2014/04/04/every-developer-should-learn-regex/
---



Being able to write Regex (otherwise known as Regular Expressions) is a skill every developer should learn. You can use Regex to find very specific text strings, to reformat files, and to do very specific replacements.

When combined with a good text editor, <a class="fancybox" href="http://imgs.xkcd.com/comics/regular_expressions.png">you are unstoppable</a>.

<!--more-->

Developers from the \*nix world are usually familier with regex - they have the sed/awk commands at their fingertips for a very long time. Those with perl experience are all usually regex gurus as well. Perl seems to be a scripting language built on the premise that regex needed a friendly "wrapper", and they tend to use regex to the point of insanity ("hey look at what I can do in a single expression!"). There's no hell quite like mantaining another developers uncommended perl code.

Microsoft stack developers, (on the other hand), generally only learn about regex when they are watching a coworker doing some find replace in a file. The initial reaction is always great.

	Developer1> *triggers the regex*
	Developer2> *eyes go wide*
	Developer2> "How did you do that?"
	Developer1> "What?"
	Developer2> "You know, that..! Replace all those lines at once!"

Developer2 then spends the next hour researching regex and badgering Developer1 for more information.

Back when I was Developer2 regex support used to be pretty rare in most text editors/IDEs. These days pretty much any editor (other than Notepad.exe) probably supports it right out of the box. Here are some details on the common editors:

- [Notepad++](http://blog.creativeitp.com/posts-and-articles/editors/understanding-regex-with-notepad/comment-page-1/)
- Sublime Text uses [Boost regular expression syntax](http://www.boost.org/doc/libs/1_47_0/libs/regex/doc/html/boost_regex/syntax/perl_syntax.html)
- [XCode](http://roadfiresoftware.com/2013/12/replacing-regular-expressions-in-an-xcode-project/)

Visual Studio was - until recently - a special case. All versions up to and including Visual Studio 2010 used a bizarre custom syntax that was originally aimed at C++ developers. If you are using 2010 or earlier... *don't bother using the built in regex*. Just don't. Copy your text to a different editor with *sane* regex support and run your expressions there.

Visual Studio 2013 on the other hand (and 2012) both have [proper regex support](http://msdn.microsoft.com/en-us/library/2k3te2cs.aspx).

### Regex is hard

As much as I love Regex, there is one thing you should be aware of. Regex can be hard. Very hard. Sure, a basic find/replace is easy... but at some point you will want to do more. You'll end up with character classes to restrict matched characters, you'll want to negate matches, you'll learn what the term *greedy* means in the context of pattern matching.

<div class="post-image">
<a class="fancybox" href="http://imgs.xkcd.com/comics/regex_golf.png"><img class="pure-img img-thumbnail" src="http://imgs.xkcd.com/comics/regex_golf.png" alt="Regex golf" /></a><br />
</div>

When you are writing and debugging regular expressions, keep this in mind:

>It should not take longer to write and debug your expression than it would take you to manually do the find/replace.

If it is taking that long - stop. Take a breather, and consider takling the problem another way. Regular expressions are supposed to save you time and effort compared to manually replacing text.

Here is a practical example of using regex:

### Transform comma delimited data into SQL inserts###

I've used this exact case many times before. Given some comma delimited data, like this:

<pre><code class="language-markup">
	34930,Bob,Jones,23 Developer St,Baker
	94084,Anne,Jackson,11 Side St,Plumber
	90385,Jean,Gray,5 Hollywood Place,Engineer
</code></pre>

We can use a regular expression to transform it into SQL inserts.

Here is our match expression:
<pre><code class="language-perl">
^(.*),(.*),(.*),(.*),(.*)\r\n
</code></pre>

Here is our replace rule:

<pre><code class="language-markup">
INSERT INTO ContactDetails (CardNumber,FirstName,LastName,Address,Occupation) Values ($1,'$2','$3','$4','$5')\r\n
</code></pre>

Here is the result:

<pre><code class="language-markup">
INSERT INTO ContactDetails (CardNumber,FirstName,LastName,Address,Occupation) Values (34930,'Bob','Jones','23 Developer St','Baker')
INSERT INTO ContactDetails (CardNumber,FirstName,LastName,Address,Occupation) Values (94084,'Anne','Jackson','11 Side St','Plumber')
INSERT INTO ContactDetails (CardNumber,FirstName,LastName,Address,Occupation) Values (90385,'Jean','Gray','5 Hollywood Place','Engineer')
</code></pre>

<div class="post-image">
<a class="fancybox" href="images/regex.png"><img class="pure-img img-thumbnail" src="/images/regex.png" alt="Regex window in Visual Studio" /></a><br />
</div>

So, where to from here, for the regular expression newbie?

### Guides for getting started

These links should give you a good starting point to learn regex:

- [Regular Expressions Quickstart](http://www.regular-expressions.info/quickstart.html)
- [Wikipedia Article on Regex](http://en.wikipedia.org/wiki/Regular_expression)
- [30 minute regex tutorial](http://www.codeproject.com/Articles/9099/The-Minute-Regex-Tutorial)
- [Perl Regex Tutorial](http://perldoc.perl.org/perlretut.html)

If you know a developer who doesn't know regex - teach them! Spread the love. It's too cool a skill to let other developers miss out on.
