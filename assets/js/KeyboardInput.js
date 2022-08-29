/**
 * Construct input class.
 * @constructor
 */
function KeyboardInput()
{
    this.events = {
        onKeyDown: KeyboardInput_onKeyDown.bind(this),
        onKeyUp: KeyboardInput_onKeyUp.bind(this)
    };
    this.isLeftKeyDown = false;
    this.isRightKeyDown = false;
}

/**
 * Initialize event callbacks, appended to the document
 * @param {KeyboardInput} keyInput KeyboardInput Game Object
 */
function KeyboardInput_start(keyInput)
{
    document.addEventListener("keyup", keyInput.events.onKeyUp, false);
    document.addEventListener("keydown", keyInput.events.onKeyDown, false);
}

/**
 * Revmove event callbacks, appended to the document
 * @param {KeyboardInput} keyInput KeyboardInput Game Object
 */
function KeyboardInput_stop(keyInput)
{
    document.removeEventListener("keyup", keyInput.events.onKeyUp, false);
    document.removeEventListener("keydown", keyInput.events.onKeyDown, false);
}

/**
 * Update input's elements.
 * @param {KeyboardInput} keyInput KeyboardInput Game Object
 * @param {{ moveLeft: boolean, moveRight: boolean }} input reference to input so we can set appropriate movement booleans.
 * @param {number} dt delta time between each update call.
 */
function KeyboardInput_update(keyInput, input, dt)
{
    input.moveLeft = keyInput.isLeftKeyDown;
    input.moveRight = keyInput.isRightKeyDown;
}

/**
 * Draw the input's elements to the canvas.
 * @param {KeyboardInput} keyInput KeyboardInput Game Object
 * @param {CanvasRenderingContext2D} context2D the canvas' 2d context used as target for drawing.
 */
function KeyboardInput_draw(keyInput, context2D)
{
}

/**
 * Callback function occurred when key is pressed down.
 * Key values retrieved according to
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 * @param {KeyboardEvent} event Holds key event data.
 */
function KeyboardInput_onKeyDown(event)
{
    switch (event.key)
    {
        case "a":
        case "Left": // IE/Edge browser specific value
        case "ArrowLeft":
            this.isLeftKeyDown = true;
            break;
        case "d":
        case "Right": // IE/Edge browser specific value
        case "ArrowRight":
            this.isRightKeyDown = true;
            break;
        default:
            return; // Quit function on input we don't handle
    }
    event.preventDefault();
}

/**
 * Callback function occurred when key is released.
 * @param {KeyboardEvent} event Holds key event data.
 */
function KeyboardInput_onKeyUp(event)
{
    switch (event.key)
    {
        case "a":
        case "Left": // IE/Edge browser specific value
        case "ArrowLeft":
            this.isLeftKeyDown = false;
            break;
        case "d":
        case "Right": // IE/Edge browser specific value
        case "ArrowRight":
            this.isRightKeyDown = false;
            break;
        default:
            return; // Quit function on input we don't handle
    }
    // Cancel default action to avoid it being handled twice.
    event.preventDefault();
}