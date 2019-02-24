// mandelbrot visualization in an complex plain
// new version added the julia set to the visu
//
// mandelbrot set
// given a canvas as an coordinate system [x,y]
// and the mandelbrot function fc(z) = z² + c,
// where c is a complex number,
// it is feasible to depict the function values
// in the canvas, where the x-axis is assoziated
// with the real-component and the y-axis with the
// imaginary-component of the result, respectivly.
//
// basic approach:
// z0 = 0 -> starting condition
// z1 = (z0)² + c = c
// z2 = (z1)² + c = c² + c
// z3 = (z2)² + c = (c² + c)² + c
// ...


var iterLimit = 50;
	
var minRange = -2;
var maxRange = 2;


// setup
function setup()
{
	createCanvas(500,500);
	pixelDensity(1);
}


// draw
function draw()
{
	loadPixels();

	// iterating through all pixels and assign
	// a corresponding color value
	// based on the results of the mandelbrot function
	for (var x = 0; x < width; x++)
	{
		for (var y = 0; y < height; y++)
		{
			// mandelbrot complex number c = a + ib;
			// map them to the canvas
			var a = map(x, 0, width,  minRange, maxRange);
			var b = map(y, 0, height, minRange, maxRange);

			// store starting values
			var startA = map(mouseX, 0, width,  -1, 1);	//a;
			var startB = map(mouseY, 0, height, -1, 1);	//b;

			// compute the mandelbrot number
			// upto the given iterating limit
			var iterNum;
			for(iterNum = 0; iterNum < iterLimit; iterNum++)
			{
				// c² = (a + ib)² = a² + 2(iab) + (ib)²
				// 	  = a² - b² + 2(iab)
				// aa = a² - b² => real component
				// bb = 2(iab)  => imaginary component
				var aa = (a * a);
				var bb = (b * b)
				var ab = 2 * a * b;

				if ((aa + bb) > 4.0)
				{
					break; // bail
				}

				a = aa - bb + startA;
				b = ab + startB;
			}

			// brightness = map the current iteration
			// number to the color range from [0, 255]
			var bright = map(iterNum, 0, iterLimit, 0, 255)

			// if the iteration reached its limit
			// what is basically assoziated with the
			// mandelbrot figure, then color the pixel
			// with a certein value
			if (iterNum === iterLimit)
				bright = 0;

			// get current pixel (position in memory)
			// each pixel information is 4 bytes long
			// according to ARBG-color-convention
			var pix = (x + y * width) * 4;

			pixels[pix + 0] = bright;	// R
			pixels[pix + 1] = bright;	// B
			pixels[pix + 2] = bright;	// G
			pixels[pix + 3] = 255;		// A
		}
	}
	updatePixels();
}