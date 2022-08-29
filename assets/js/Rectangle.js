/**
 * Construct a rectangle,
 * with defined parameters.
 * @param {number} x defines the top-left x position of the rectangle.
 * @param {number} y defines the top-left y position of the rectangle.
 * @param {number} width defines the width along x-axis of the rectangle.
 * @param {number} height defines the height along y-axis of the rectangle.
 */
function Rectangle(x, y, width, height)
{
    this.position = new Vector2(x, y);
    this.width = width;
    this.height = height;
}

/**
 * get the center of a rectangle shape.
 * @param {Rectangle} rect Rectangle Game Object
 * @returns {Vector2} returns the center position of the rectangle.
 */
function Rectangle_getCenter(rect)
{
    return new Vector2(rect.position.x + (rect.width / 2), rect.position.y + (rect.height / 2));
}
