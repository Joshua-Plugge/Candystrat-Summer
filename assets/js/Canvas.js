/**
 * Represents our target canvas for all draw calls.
 * @class
 * @classdesc Uses the html canvas tag as the target for all draw calls.
 */

/**
 * Construct a canvas with the passed id.
 * @constructor
 * @param {String} canvasID Defines the canvas' ID.
 */
function Canvas(canvasID)
{
   this.htmlCanvas = Canvas_createHTMLCanvas(canvasID);
   this.context2D = this.htmlCanvas.getContext("2d");
   this.backgroundColor = new Color(0, 0, 0, 255);
   this.resolution = {
       x: this.htmlCanvas.width, 
       y: this.htmlCanvas.height
   };
}


/**
 * Initialises the canvas - the drawing surface. The canvas
 * is added to the document. When a HTML document is loaded into a
 * browser, it becomes a document object. This document object is
 * the root node of the HTML document and is considered the 'owner' of all other
 * nodes such as forms, buttons, the canvas etc.
 * @param {String} canvasID Defines the id of the canvas.
 * @returns {HTMLCanvasElement} returns reference to the created canvas.
 */
function Canvas_createHTMLCanvas(canvasID)
{
    // Use the document object to create a new element canvas.
    var canvas = document.createElement("canvas");
    // Assign the canvas an id so we can reference it elsewhere.
    canvas.id = canvasID;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Adds the canvas element to the document.
    document.body.appendChild(canvas);
    return canvas;
}


/**
 * Clears the html canvas' current content.
 * @param {Canvas} canvas Canvas Game Object
 */
function Canvas_clear(canvas)
{
    canvas.context2D.setTransform(1, 0, 0, 1, 0, 0);
    canvas.context2D.fillStyle = Color_rgba(canvas.backgroundColor);
    canvas.context2D.clearRect(0, 0, canvas.resolution.x, canvas.resolution.y);
}