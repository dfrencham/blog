---
group: "tech"
categories:
- tech
date: 2014-05-26T00:00:00Z
tags:
- package management
- tech-guide
title: Chocolatey - Package Management for Windows
url: /tech/2014/05/26/chocolatey-package-manager/
---



There's finally a package manager for Windows in the same style as Apt-Get, and it is surprisingly good. Lets get [Chocolatey](https://chocolatey.org/).

<!--more-->

## The Original Package Manager - Apt-Get##

If you've spoken to a Debian user for more than 30 seconds, you've no doubt heard of **apt-get** - the all singing, all dancing, Debian package manager. If you need to install something, Apt will:

- check dependencies, download, configure, and install/update them
- install your application
- place all the app components in standard locations within your file system.

Cool, huh? It gets cooler. Apt will even *upgrade your entire operating system* via the dist-upgrade command. Incredible.

There are five reasons apt works so well:

1. Packages must adhere to strict rules about where libraries/config/logs are placed. If they fail to do so, the package is considered to be broken.
2. Repositories are actively maintained.
3. Dependencies are automatically managed.
4. The package repositories contain pretty much anything you can think of.
5. Apt-get is *reliable*.

Knowing what Apt can do, does Chocolatey measure up?

## Just What is Chocolatey?##

Chocolatey describes itself as follows:

>Chocolatey is a global PowerShell execution engine using the NuGet packaging infrastructure. Think of it as the ultimate automation tool for Windows.
>think about Chocolatey as a global silent installer for applications and tools. It can also do configuration tasks and anything that you can do with PowerShell.

Nice.

Chocolatey has 7,636 packages. It is nowhere near the number available in apt-get repositories, but it is growing fast. Like apt, it manages your dependencies, and installs everything in a standard location (c:\Chocolatey). A root c:\ install location may seem bad at first glance, but it makes sense give that it manages packages per machine (not per user), and who wants to navigate to c:\Documents and Settings\All Users\etc\etc ?

Unlike Debian, Chocolatey has no control of the OS - so it is always going to be limited in terms of how strict it can be with the file system.

The way repositories work in Chocolatey is a little different too. Chocolatey doesn't actually maintain binary repositories. It maintains the package files (which includes version information and install/configuration scripts), but the actual binary installer still comes from the "point-of-truth" for that app. This means that winzip will be downloaded from winzip.com and installed. The upside is that you are always getting the "official" version. The downside is that Chocolatey will never be as reliable as apt-get.

## Using Chocolatey##

<a class="fancybox" rel="group" href="/images/choc.png" title="Chocolatey doing its thing"><img class="pure-img img-thumbnail" src="/images/choc.png" alt="Chocolatey in action" /></a>

Chocolatey is pretty straight forward to use. The hardest part is typing the silly name. Here are the basic use cases...

### Installing and Uninstalling###

Installing a package is simple:

	cinst <package name>

You do get prompted during the install to click "ok" due to Windows UAC security. The rest of the install is automatic.

You can install a specific version:

	 chocolatey install <package name> -version x.x.x.x

To remove a package:

	chocolatey uninstall <package name>


### Searching###

List all packages:

	chocolatey list

Find a package:

	chocolatey list <package name>

or:

	chocolatey search <string>

## Other interesting things about Chocolatey##

- Chocolatey has auto-packages, which are automatically created when you check a new version of your app into source control (after the initial set up of course).

- Chocolatey can install Ruby Gems, and Python Packages

- Chocolatey has "meta packages" that have no content, but exist solely for the purpose of keeping packages grouped and organised for dependency management

- Chocolaty uses the Visual Studio package management tool (NuGet) & associated infrastructure

## Summary##

I'm now a huge fan of Chocolatey. It seems reliable, and makes it very quick and easy to find software. It looks to be a huge time saver for automating environment set ups.

This is applicable to both the work place, as well as open source projects. No longer will we need huge wiki pages of instructions to get a new Developer up to speed - just fire off a batch or powershell script with all your Chocolaty calls in it.

Give it a try today: [Chocolatey](https://chocolatey.org/)
