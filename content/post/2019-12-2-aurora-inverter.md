+++
title = "Aurora Inverter Monitoring Done Quick"
date = "2019-12-03T06:00:52+10:00"
draft = false
categories = ["tech"]
tags = ["solar","linux"]
topics = []
description = ""
+++

Last time I set up inverter monitoring for my Aurora solar inverter, it had a lot of moving parts. I had a RaspberryPi ModelB hosting utilities writing to CSV files, which were periodically scooped up by a monitoring service. The monitoring service had a bit of setup and a few issues, but in the end it would get the data up to [PVOutput.org](http://pvoutput.org).

This time around I decided to cut out all the bullshit and write to the PVOutput API with as little fuss as possible.

Note that to set all this up you will require a free account on PVOutput, and you will need to set up an API Key. You will also need to add your solar details which will give you a system Id. 

## Curtronics Aurora ##

Grab this great little utility - [Curtronics Aurora](
http://www.curtronics.com/Solar/AuroraData.html). Download, unzip, and install:

```bash
wget http://www.curtronics.com/Solar/ftp/aurora-1.9.3.tar.gz
tar -xf aurora-1.9.3.tar.gz
cd aurora-1.9.3
make
sudo make install
```

At this point you should try a query and see if you can contact the inverter (keep in mind if it is dark outside the inverter is probably powered down).

Try the following command:

```text
/usr/local/bin/aurora -a 2 /dev/ttyUSB0 -Y15 -e
```

If you are not having any luck, check if /dev/ttyUSB0 is correct (this is your usb-to-serial device). You should be able confirm it by reading through your start up messages with `dmesg`.

## solar-logger.sh ##

Save this script in your home folder as solar-logger.sh.

If you are using the default `pi` user, the path will be `/home/pi/solar-logger.sh`

Make sure you set execute permission: `chmod 755 solar-logger.sh`

```bash
#!/bin/bash

# configuration
apikey="your api key here"
system="your system Id here"

rd=$(date +%Y%m%d)
rt1=$(date +%H)
rt2=$(date +%M)
rt="${rt1}%3A${rt2}"
solarout=`/usr/local/bin/aurora -a 2 /dev/ttyUSB0 -Y15 -e -c | awk '{printf $1}'`
solarwatts=`echo ${solarout} | sed -e "s/\.//"`
url="https://pvoutput.org/service/r2/addstatus.jsp?d=${rd}&t=${rt}&v1=${solarwatts}"

# only make the request if we have a value from the inverter
if [[ ! -z $solarwatts  ]]; then
    result=`curl -H "X-Rate-Limit: 1" -H "X-Pvoutput-Apikey: ${apikey}" -H "X-Pvoutput-SystemId: ${system}" ${url}`
    if [[ $result == *"OK"* ]]; then
        echo "${rd} $(date +%H:%M) : API call successful, power output: ${solarout}"
    else
        echo "${rd} $(date +%H:%M) : API call failed, ${result}"
    fi
else
    echo "${rd} $(date +%H:%M) : Inverter communication failure"
fi
```

## Cron Job ##

Edit your crontab (using `crontab -e`) and add the following record:

```text
*/5 5-18 * * * /home/pi/solar-logger.sh >> /home/pi/solar-log.txt
```

This cron task will run the solar logger every 5 minutes between the hours of 5am and 6pm. You may want to adjust those times depending on your latitude.

This will give you a solar-log.txt file with entries like this:

```text
20191201 18:25 : API call successful, power output: 20.373
20191201 18:30 : API call successful, power output: 20.373
```

Once you start seeing successful API calls you should be able to see your shiny new chart on PVOutput.

<img class="pure-img blog-img " src="/images/solar-mon.jpg" alt="pvoutput live output chart" />

## Troubleshooting ##

If you are having issues, check the permissions on the `aurora` binary (755 should work).