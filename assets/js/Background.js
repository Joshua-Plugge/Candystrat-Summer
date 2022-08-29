function Background()
{
    const windowSize = app.resolution;
    this.position = new Vector2(windowSize.x * 0, windowSize.y * 0);
    
    this.size = new Vector2(windowSize.x, windowSize.y);
    this.spritesheets = {
        texture: new Image(),
        textureRect: new Rectangle(0, 0, 1440, 405),
        origin: new Vector2(this.size.x * -0.5, this.size.y * -0.5),
        opacityGoodCity: 0.0
    };
    this.timer = 0;
    this.interval = 50; // in milliseconds
    this.spritesheets.texture.src = "assets/img/Background.png";
}

/**
 * Updates background.
 * @param {Background} background Background Game Object
 * @param {Score} score Reference to score.
 * @param {number} deltaTime Represents delta time between each update call.
 */
function Background_update(background, score, deltaTime)
{
}

/**
 * Renders player to the canvas.
 * @param {Background} background Background Game Object
 * @param {CanvasRenderingContext2D} context .
 */
function Background_draw(background, context)
{
    context.setTransform(1, 0, 0, 1, background.position.x + (background.size.x * 0.5), background.position.y + (background.size.y * 0.5));
    context.rotate(0);

    context.drawImage(
        background.spritesheets.texture,
        background.spritesheets.textureRect.position.x,
        background.spritesheets.textureRect.position.y,
        background.spritesheets.textureRect.width,
        background.spritesheets.textureRect.height,
        background.spritesheets.origin.x,
        background.spritesheets.origin.y,
        background.size.x,
        background.size.y
    );
}