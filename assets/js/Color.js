/**
 * Represents the red, green, blue and alpha.
 * @class
 * @classdesc Will contain red, green, blue, alpha values clamped between (0, 255)
 */

/**
     * Constructs a 
     * @constructor
     * @param {number} r assigned red value clamped between (0, 255)
     * @param {number} g assigned green value clamped between (0, 255)
     * @param {number} b assigned blue value clamped between (0, 255)
     * @param {number} a assigned alpha value clamped between (0, 255), defaults to 255 if undefined
     */
function Color(r, g, b, a)
{
    var clamp = function (value)
    {
        var max = 255;
        var min = 0;
        if (value > max)
        {
            return max;
        }
        if (value < min)
        {
            return min;
        }
        return value;
    };

    this.red = clamp(r);
    this.green = clamp(g);
    this.blue = clamp(b);

    // check if a is undefined,
    //  true: default alpha to 255
    //  false: clamp a param and set to alpha.
    if (a === undefined)
    {
        this.alpha = 255;
    }
    else
    {
        this.alpha = clamp(a);
    }
}

/**
 * Will return a canvas acceptable fill style.
 * @param {Color} color Color Game Object
 * @returns {string} Meant for canvas' 2d context color style using the format "rgba(,,,)".
 */
function Color_rgba(color)
{
    return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
}