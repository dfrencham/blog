---
categories:
- tech
group: "tech"
draft: true
date: 2019-11-30
tags:
- alarm
- caddx
title: Unlocking a Caddx Alarm
---

I woke up one day with the thought "Gee, it would be nice to have my house alarm send notifications".... which seems like a simple enough idea in theory. Unfortunately the Alarm industry has other ideas.

It's 2019. I have wifi enabled light bulbs I can control with my phone... yet my home alarm system still doesn't have TCP/IP connectivity. Surely newer models are better? maybe with a nice REST api? 

Nope, still useless. Bosch and Hills systems have TCP/IP add on cards - but those only give us have terrible web interfaces and half baked, buggy apps. I did try a Hills Comnav, but after a year it stopped working when a couple of components overheated and de-soldered themselves from the PCB.

## Konnected, the false messiah

A new product called Konnected seemed like a good idea - it replaces your alarm panel and you wire your sensors into it.

<img class="pure-img blog-img " src="/images/konnected.webp" alt="Konnected alarm derp" />

I started digging into how it works. Konnected sends messages to a SmartThings hub **over the cloud** with the status of your sensors. Cloud issues? no alarm. The cherry on top of this shit sandwich is needing to buy a separate siren driver, because of course it doesn't have one. 


My original alarm was a Hills NetworX NX-4, which is actually a Caddx NX-8. It was also sold as a GE NX-8. It has an IP enabling add on card available (and I use "add-on card" *very* loosely) called a "ComNav" module. I purchased one of these for $250, and had it up and running after much pain and suffering. While it has a web server, it does not have an API, or any sensible integration options other than email. 

After a couple of years of receiving basic email alerts, the ComNav decided to cook a couple of capacitors and spontaneously self destruct.

I discovered there was a model of the NX-8 that included a serial port for home automation and programming - the NX8-E. Sadly this was not available in Australia, but there was one listed on EBay in the US with *priority* international shipping. 2 months later, it arrived. I soon discovered that:

- no installer code was provided, and the seller had no idea what it could be
- unlike Australian NX models, you cannot use a keypad code to default the panel
- I dialled into the panel with a modem (after trying 8 modems, I discovered a US Robotics V.Everything business modem works), but the dial in programming code had also been changed.

There was only one option left - connect directly to the alarm bus.

## Caddx Bus Connection

To connect to the bus you need a [QuikLink Direct Connect module](https://www.amazon.com/Interlogix-NetworX-Quiklink-Connect-NX-586E/dp/B00171FTIY). I was able to borrow one by posting on a local facebook community page and offering a 6 pack of beer in return for borrowing one.

![alarm serial connection](images/alarm-serial.gif)

Once the jumper wires are connected to the alarm bus (using the positive, negative, and data terminals), you communicate with the alarm using either Kermit or PuTTY in serial communication mode.

Note that for PuTTY you probably want to force local echo and local line ending on.

<style>
    .table-req-res {
        border: 1px solid black;
        width: 100%;
        border-spacing: 0;
        border-collapse: separate;
    }
    .table-req-res thead td {
        font-weight: bold;
        background-color: #F9E79F;
    }
    .table-req-res td {
        background-color: #f7f0f0;
        font-family: sans-serif;
        font-size: 16px;
        padding: 0 4px;
    }
    .table-req-res tr.send td {
        background-color: #AED6F1;
    }
    .table-req-res tr.recv td {
        background-color: #bdfbbd;
    }
    .table-req-res .byte td {
        border-top: 1px solid black;
        border-right: 1px solid black;
        width: 40px;
        text-align: center;
        vertical-align: middle;
        background-color: #AED6F1;
    }
    .table-req-res .byte td:last-child {
        border-right: 0;
    }
    .table-req-res .yel td {
        background-color: yellow;
        font-size: 20px;
        padding: 6px;
    }
</style>

## Networx Messaging Format

Networx messages are transmitted in 2 byte hex words, which may be in either ASCII or binary format.

All messages start with a 7E message start flag, followed by a length value. The length value is the number of words following, excluding the checksum. The checksum is a 2 word [Fletcher's checksum](https://en.wikipedia.org/wiki/Fletcher%27s_checksum).

<table class="table-req-res">
    <thead>
        <tr>
            <td colspan="5">NX Message Format</td>
        </tr>
    </thead>
    <tbody>
        <tr class="byte yel">
            <td>7e</td>
            <td>01</td>
            <td>28</td>
            <td>29</td>
            <td>2a</td>
        </tr>
        <tr class="byte">
            <td>Message start delimiter</td>
            <td>Message length (0)</td>
            <td>Message type (Positive acknowledge)</td>
            <td colspan="2">Checksum</td>
        </tr>
    </tbody>
</table>

You can find the complete protocol specification [here](https://www.drivehq.com/folder/p9084843/1816086207.aspx).

## Resetting the panel

Using PuTTY you can send the messages below to unlock the panel, and the expected responses.

What is happening is:

```text 
-----
 user > hello, how are you configured?
alarm > I have these flags set (flags)
 user > what is your status?
alarm > this is my status (status)
 user > program this data
alarm > ok, done it
 user > please send me the programmed data
 -----
```

<table class="table-req-res">
    <thead>
        <tr>
            <td>Direction</td>
            <td>Message</td>
            <td>Type</td>
        </tr>
    </thead>
    <tbody>
        <tr class="send">
            <td>Message</td>
            <td>7e 01 21 22 23</td>
            <td>Interface configuration request</td>
        </tr>
        <tr class="recv">
            <td>Response</td>
            <td>7e 0b 01 32 2e 31 36 00 00 72 01 03 e0 2b dd</td>
            <td>Interface configuration message</td>
        </tr>
        <tr class="send">
            <td>Message</td>
            <td>7e 01 28 29 2a</td>
            <td>System status request</td>
        </tr>
        <tr class="recv">
            <td>Response</td>
            <td>7e 0c 08 04 00 00 00 00 02 00 00 00 01 ad c8 e4</td>
            <td>System status message</td>
        </tr>
        <tr class="send">
            <td>Message</td>
            <td>7e 0d 31 08 a0 53 08 88 88 00 00 08 40 ee ee 79 b4</td>
            <td>Program data command</td>
        </tr>
        <tr class="recv">
            <td>Response</td>
            <td>7e 01 1d 1e 1f</td>
            <td>Positive Ack</td>
        </tr>
        <tr class="send">
            <td>Message</td>
            <td>7e 04 30 08 80 53 10 41</td>
            <td>Program data request</td>
        </tr>
        <tr class="recv">
            <td>Response</td>
            <td>7e 0d 10 08 80 53 0b 88 88 00 00 08 40 ee ee 3b bf</td>
            <td>Program Data Reply</td>
        </tr>
    </tbody>
</table>
