function WinCondition()
{
    const windowSize = app.resolution;
    this.position = new Vector2(windowSize.x * 0, windowSize.y * 0);
    
    this.size = new Vector2(windowSize.x, windowSize.y);
    this.spritesheets = {
        textureWinning: new Image(),
        textureLosing: new Image(),
        textureRect: new Rectangle(0,0,1366,768),
        origin: new Vector2(this.size.x * -0.5,this.size.y * -0.5),
        opacityWinning: 0.0,
        opacityLosing: 0.0
    };
    this.timer = 0;
    this.interval = 50; // in milliseconds
    this.spritesheets.textureWinning.src = "assets/img/Victory.png";
    this.spritesheets.textureLosing.src = "assets/img/Game_Over.png";

    this.winning = false;
    this.losing = false;
    this.playing = true;
}

/**
 * Updates victory when score is high enough.
 * @param {WinCondition} winCondition Background Game Object
 * @param {Score} score Reference to score.
 * @param {Player} player Reference to player.
 * @param {number} deltaTime Represents delta time between each update call.
 */
function WinCondition_update(winCondition, score, player, deltaTime)
{
    winCondition.winning = score.value >= 100;
    winCondition.losing = player.hitBomb;

    if (winCondition.winning || winCondition.losing)
    {
        winCondition.playing = false;
        winCondition.timer += deltaTime;
        while (winCondition.timer > winCondition.interval)
        {
            if (winCondition.winning)
            {
                winCondition.spritesheets.opacityWinning += 0.01;
            }
            else if (winCondition.losing)
            {
                winCondition.spritesheets.opacityLosing += 0.01
            }
            winCondition.timer -= winCondition.interval;
        }
        if (winCondition.spritesheets.opacityWinning < 0)
        {
            winCondition.spritesheets.opacityWinning = 1;
        }
        if (winCondition.spritesheets.opacityLosing < 0)
        {
            winCondition.spritesheets.opacityLosing = 1;
        }
    }
}

/**
 * Renders player to the canvas.
 * @param {WinCondition} winCondition Background Game Object
 * @param {CanvasRenderingContext2D} context .
 */
function WinCondition_draw(winCondition, context)
{
    context.setTransform(1, 0, 0, 1, winCondition.position.x + (winCondition.size.x * 0.5), winCondition.position.y + (winCondition.size.y * 0.5));
    context.rotate(0);
    if (winCondition.winning)
    {
        context.globalAlpha = winCondition.spritesheets.opacityWinning;
        context.drawImage(
            winCondition.spritesheets.textureWinning,
            winCondition.spritesheets.textureRect.position.x,
            winCondition.spritesheets.textureRect.position.y,
            winCondition.spritesheets.textureRect.width,
            winCondition.spritesheets.textureRect.height,
            winCondition.spritesheets.origin.x,
            winCondition.spritesheets.origin.y,
            winCondition.size.x,
            winCondition.size.y
        );
    }
    else if (winCondition.losing)
    {
        context.globalAlpha = winCondition.spritesheets.opacityLosing;
        context.drawImage(
            winCondition.spritesheets.textureLosing,
            winCondition.spritesheets.textureRect.position.x,
            winCondition.spritesheets.textureRect.position.y,
            winCondition.spritesheets.textureRect.width,
            winCondition.spritesheets.textureRect.height,
            winCondition.spritesheets.origin.x,
            winCondition.spritesheets.origin.y,
            winCondition.size.x,
            winCondition.size.y
        );
    }

    context.globalAlpha = 1;
}