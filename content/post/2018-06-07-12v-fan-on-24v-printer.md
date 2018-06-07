---
categories:
- tech
group: "tech"
draft: false
date: 2018-06-07T00:00:00Z
tags:
- 3dprinter
- electronics
title: Put a 12v fan on a 24v 3d printer
url: /tech/2018/06/07/12v-fan-on-24v-printer/
---

More and more 3d printers are coming with 24 volt fans... which can be a problem
because 24v fans can be hard to find. Here is how you can attach a 12 volt Noctua fan.

<!--more-->

If you want a great, quiet hot-end fan... look no further than the <a target="_blank" href="https://www.amazon.com/gp/product/B009NQLT0M/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B009NQLT0M&linkCode=as2&tag=dide00-20&linkId=1d6e2ba2aa4b6fdb8ae5a887fe5121fd">Noctua (NF-A4x10 FLX)</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=dide00-20&l=am2&o=1&a=B009NQLT0M" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />. It is 12volt, practically silent, and comes with some handy adaptors.

The OmniJoin adaptor is the black connector in the first photo with 2 wires attached. You'll also need: 

- a cheap buck converter
- a 2 pin JST plug (for the printer end)
- soldering iron
- multi meter

<img class="pure-img blog-img " src="/images/i3plusfan1.jpg" alt="parts" />
*Parts needed*

## Steps

1. Solder the positive and negative wires from the JST connector to the input terminals of your buck converter.
2. Ensure the printer is off, connect your multi-meter to the output terminals of the buck converter (set the multimeter for DC voltage)
3. Plug in the jst cable to your hot end fan header
4. Power up the printer, and check the voltage on the multimeter. Use a small flathead screw driver to adjust the buck converter voltage down to 12volts
5. Power down the printer, disconnect the buck converter and solder the OmniJoin adaptor to the output terminals of the buck converter
6. Mount the buck converter near your hot end. Note that you will need to insulate the back of it if you are fixing it on a metal surface. Electrical tape is fine for this.

You are now able to run 12 volt fans on your printer.

## Gallery

<img class="pure-img blog-img " src="/images/i3plusfan2.jpg" alt="adjusting the voltage" />
*Adjusting the voltage*

<img class="pure-img blog-img " src="/images/i3plusfan3.jpg" alt="mounted buck converter" />
*Buck converter in place*