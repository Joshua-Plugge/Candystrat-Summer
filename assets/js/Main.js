/**
 * True or False, supports touch operations
 */
var app = {
    isTouchDevice: "ontouchstart" in window,
    resolution: new Vector2(window.innerWidth, window.innerHeight),
};

/**
 * main entry point for Javascript
 * called from index html
 */
function main()
{
    app.application = new Application();
    Application_run(app.application);
}