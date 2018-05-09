/*
script: 	rainChar.js
author: 	Danny Frencham
licence:  BSD 2 clause
description: This script runs a HTML5 animation of a raining character.
						 To work, you need to add a Canvas element to your page, with id='c'

Copyright (c) 2014, Danny Frencham
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those
of the authors and should not be interpreted as representing official policies,
either expressed or implied, of the FreeBSD Project.
*/

/* User configurable parameters ***********/

var fontSizeList = [4,4,4,4,4,6,6,6,6,7,7,7,8,8,9,9,10,10,11,12,15];
var rainDropSmall = 6; // small rain drop size (px)
var rainDropLarge = 12; // large drop size (px)
var baseColour = "#B0B0B0"; // colour for small drops, others are calculated
var dropText = "$"; // character to rain

/*****************************************/

// initialise
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var bigColour = shadeColor1(baseColour,30);
var mediumColour = shadeColor1(baseColour,15);
var rainDrops = [];

// pregenerated random numbers
var fakeRand = [0.7947429970372468,0.48162365215830505,0.7388542008120567,0.06405388447456062,0.4297212415840477,0.25519705237820745,0.16993128624744713,0.05358747881837189,0.9979340615682304,0.09488047729246318,0.004961555590853095,0.6442236299626529,0.6656058642547578,0.7548978091217577,0.15922398772090673,0.45855936617590487,0.2588190813548863,0.2592281471006572,0.7317792470566928,0.627765042707324,0.2961430689319968,0.5883673974312842,0.25150219327770174,0.7387937726452947,0.8845873167738318,0.18235921091400087,0.47051095170900226,0.5843434047419578,0.6906223380938172,0.730487538035959,0.32684346940368414,0.6106004274915904,0.5064118173904717,0.7762727420777082,0.7470506310928613,0.8746084042359143,0.8338628083001822,0.4097494927700609,0.4894172016065568,0.11049166740849614,0.09998287260532379,0.8846930575091392,0.9560199684929103,0.3975054023321718,0.627926959656179,0.9911879661958665,0.014886150835081935,0.1296270522288978,0.612781424773857,0.3232327988371253,0.4965252885594964,0.018280100543051958,0.1694301445968449,0.7863371740095317,0.6768277031369507,0.7300458336248994,0.2371119901072234,0.847409711452201,0.5487597840838134,0.5784771342296153,0.6440771599300206,0.31610790686681867,0.2945141321979463,0.6673253662884235,0.8856636572163552,0.6801036035176367,0.7048682211898267,0.17866699653677642,0.9450371540151536,0.447474823333323,0.7729696803726256,0.5046665600966662,0.756802162155509,0.9673240552656353,0.970321558881551,0.6784938285127282,0.17315403441898525,0.0034411116503179073,0.7836470324546099,0.5575476526282728,0.16325283702462912,0.013038364006206393,0.1611000068951398,0.5470556635409594,0.15884667844511569,0.7088319058530033,0.5275389305315912,0.6958690073806792,0.6300619812682271,0.1097171981818974,0.9191788493189961,0.10063682892359793,0.09960834844969213,0.9113473908510059,0.06117305555380881,0.05893740151077509,0.8347783407662064,0.9117562477476895,0.5155819137580693,0.43336670217104256];
var fakePos = 0;

function getDropSize(fSize)
{
	if (rainDropSmall <= fSize)
		return 'small';
	if (fSize >= rainDropLarge)
		return 'big';
	return 'reg';
}

function getDropColour(dSize)
{
	if (dSize == 'small')
			return baseColour;
	if (dSize == 'big')
			return bigColour;
	return mediumColour;
}

// http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor1(color, percent) {
		var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
		return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

function draw()
{
	// randomly choose a spot for the drop
	var dropX = Math.floor((c.width-10) * fakeRand[fakePos+1]);
	var dropY = 0;
	var fontSize = fontSizeList[Math.floor(fakeRand[fakePos]*fontSizeList.length)]

	var drop = { dropX:dropX,
							dropY:dropY,
							fontSize:fontSize,
							dropSize:getDropSize(fontSize),
							dropColour:getDropColour(getDropSize(fontSize))
							};
	rainDrops.push(drop);
	ctx.clearRect(0,0,c.width,c.height);

	//looping over drops
	for(var i = 0; i < rainDrops.length; i++)
	{
		ctx.fillStyle = rainDrops[i].dropColour;
		ctx.font = rainDrops[i].fontSize + "px \"Courier New Bold\", \"Courier New\", fixed";
		ctx.fillText(dropText, rainDrops[i].dropX, rainDrops[i].dropY);

		if (rainDrops[i].dropSize == 'small')
			rainDrops[i].dropY = rainDrops[i].dropY + 4;
		if (rainDrops[i].dropSize == 'reg')
			rainDrops[i].dropY = rainDrops[i].dropY + 2;
		if (rainDrops[i].dropSize == 'big')
			rainDrops[i].dropY = rainDrops[i].dropY + 1;

		if (rainDrops[i].dropY > (c.height+20)){
			rainDrops.splice(i, 1);
		}
	}
	fakePos++;
	if (fakePos >= 98)
		fakePos = 0;
}

// only run the animation if the canvas is visible
// I use this to hide it from mobile devices :)
if ($(c).is(':visible')) {
	setInterval(draw, 60);
}
