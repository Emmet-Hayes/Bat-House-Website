//in javascript i am drawing to the canvas the animation for the bat,
//this language reminds me alot of java and C#, but more generic and the weak typing
//is something i'd have to get used to.

	var sizeX, //these get set by the width and height in the attribute
	sizeY,
	frameRate = 24.0, //this variable determines the framerate of the animation
    ctx, //this variable will hold the canvas context to draw to on the page. 
    img, //this variable will initialize a new image to store the BAT image
    numBats = 25, //this variable WILL DETERMINE THE NUMBER OF BATS ON THE SCREEN
    x =  [],//this variable will be used to determine x position of bat, inital zero
    y = []; //this variable will be used to determine y position, initially zero

    //setup function called at load of the page from the body tag in the HTML. 
    function setup() {

    	//get the Element from HTML that is a canvas type
        var canvas = document.getElementById('BatCanvas');
        //check to see if the canvas element has a context in the body tag, 
        if (canvas.getContext) { //if its true, then
            ctx = canvas.getContext('2d'); // get the context and set it to 2d saved in ctx
            sizeX = document.getElementById('BatCanvas').getAttribute("width");
            sizeY = document.getElementById('BatCanvas').getAttribute("height");
            initBats();
            setInterval('draw();', 1000.0/frameRate); //2nd param is in ms, I am converting ms to fps
            img = new Image(); //create a new image object
            img.src = 'images/BatInSky.png'; //set the source file of the image to the bat
        }
    }

    function initBats() { //initialize the positions of the bats on the screen
    	for (i = 0; i < numBats; i++) { //foreach bat in the set of bats (size determined above)
    		x.push(-(Math.random() * sizeX/8)); //add a new random x coordinate into the array
    		y.push((i+1)*(sizeY/numBats)); //add a new sensible y coordinate into the array
    	}
    }

    //draw function gets called every interval to draw the background and the image.
    function draw()	{
        drawBackground(); //calls drawBackground which is below this function
        for (i = 0; i < x.length; i++) {
        	ctx.drawImage(img, x[i], y[i]);
        	x[i] += 3 //move the bat 3 pixels
        	y[i] += (Math.random() * 6) - 3;
        	if (+x[i] > +sizeX) { //if the bat is off the canvas, (using + to make sure they are treated as number)
            	x[i] = (-120 * Math.random()) - 60; //set the bat back to behind the canvas to the left
            	y[i] = Math.random() * sizeY; //randomize the y path the bat takes (Math.random generates random numbers)
        	}
        }
    }

    //drawBackground function draws the night sky using a gradient, and the stars using circles.
    function drawBackground(){
    	var avgSize = Math.round((+sizeX + +sizeY)/2.0);
        //the night sky
        //linear gradient from (1, 2) to (3,4)
        var lineGrad = ctx.createLinearGradient(sizeX/2, 0, sizeX/2, sizeY);
        lineGrad.addColorStop(0, 'black'); //top is black
        lineGrad.addColorStop(1, '#FF99EC'); //bottom is this
        ctx.fillStyle = lineGrad;
        ctx.fillRect(0, 0, sizeX, sizeY);

        //setting our fill to white for the stars
        ctx.fillStyle = 'white';

        //beginPath lets you start a new object being drawn, these are all stars
        //(circle) with arc being drawn and then filled. 
        ctx.beginPath();
        ctx.arc(Math.round(sizeX/5.455), Math.round(sizeX/5.172), avgSize/100, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(Math.round(sizeX/1.322), Math.round(sizeY/2.344), avgSize/150, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(Math.round(sizeX/1.402), Math.round(sizeY/6.0), avgSize/300, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(Math.round(sizeX/2.174), Math.round(sizeY/2.564), avgSize/300, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(Math.round(sizeX/6.976), Math.round(sizeY/1.538), avgSize/300, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(Math.round(sizeX/1.020), Math.round(sizeY/20.0), avgSize/150, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(Math.round(sizeX/1.622), Math.round(sizeY/1.345), avgSize/300, 0, Math.PI*2, false);
        ctx.fill();

        //adding a Moon
        ctx.beginPath();
        ctx.arc(Math.round(sizeX/20.3), Math.round(sizeY/16.3), avgSize/10, 0, Math.PI*2, false);
        ctx.fill();
    }