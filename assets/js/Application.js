/**
 * Where the program starts from.
 * @class
 * @classdesc Main Controller for our application
 */

/**
 * Calls all pre-initialization for our application.
 * @constructor
 */
function Application()
{
    if (app.isTouchDevice)
    {
        console.log("Device is Touch Capable");
    }
    else
    {
        console.log("Device is NOT Touch Capable");
    }

    this.prevDt = Date.now();
    this.canvas = new Canvas("game-canvas");
    this.background = new Background();
    this.player = new Player();
    this.score = new Score();
    if (app.isTouchDevice)
    {
        this.touchInput = new TouchInput();
        TouchInput_start(this.touchInput);
    }
    else
    {
        this.keyInput = new KeyboardInput();
        KeyboardInput_start(this.keyInput);
    }
    this.playerInput = {
        moveLeft: false,
        moveRight: false
    };
    this.drops = new Drops();
    this.winCondition = new WinCondition();
}

/**
 * Entry point for application.
 * @param {Application} application Application Game Object
 */
function Application_run(application)
{
    Application_loop(application)
}


/**
 * Main loop logic, contains call to update and draw using fully qualified invocations,
 * in its own function so update and draw maintain the correct this refernce.
 * @param {Application} application Application Game Object
 */
function Application_loop(application)
{
    Application_update(application);
    Application_draw(application);
    window.requestAnimationFrame(Application_loop.bind(this, application));
}


/**
 * Main update logic.
 * @param {Application} application Application Game Object
 */
function Application_update(application)
{
    /**
     * Represents delta time between each update call.
     */
    var dt = Application_calcDeltaTime(application);
    Background_update(application.background, application.score, dt);
    if (app.isTouchDevice) 
    {
        TouchInput_update(application.touchInput, application.playerInput, dt);
    }
    else
    {
        KeyboardInput_update(application.keyInput, application.playerInput, dt);
    }
    WinCondition_update(application.winCondition, application.score, application.player, dt);
    if (!application.winCondition.playing) { return; }
    Drops_update(application.drops, application.player, application.score, dt);
    Player_update(application.player, application.playerInput, dt);
    Score_update(application.score, dt);
}


/**
 * Main rendering logic.
 * @param {Application} application Application Game Object
 */
function Application_draw(application)
{
    Canvas_clear(application.canvas);
    Background_draw(application.background, application.canvas.context2D);
    if (app.isTouchDevice) 
    {
        TouchInput_draw(application.touchInput, application.canvas.context2D);
    }
    else
    {
        KeyboardInput_draw(application.keyInput, application.canvas.context2D);
    }
    Drops_draw(application.drops, application.canvas.context2D);
    Player_draw(application.player, application.canvas.context2D);
    WinCondition_draw(application.winCondition, application.canvas.context2D);
    Score_draw(application.score, application.canvas.context2D);
}


/**
 * Calculates current delta time from last time this was called.
 * @param {Application} application Application Game Object
 * @returns {Number} the current delta time.
 */
function Application_calcDeltaTime(application)
{
    var now = Date.now();
    var dt = now - application.prevDt;
    application.prevDt = now;
    return dt;
}