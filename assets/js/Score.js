function Score()
{
    const windowSize = app.resolution;
    this.position = new Vector2(windowSize.x * 0.005, 30);
    
    this.font = {
        color: new Color(0, 0, 0),
        size: "30px",
        type: "Times New Roman",
        toString: () => {
            return [this.font.size, this.font.type].join(" ");
        }
    };
    this.value = 0;
    this.scoreText = "Score: ";
}

/**
 * Increases current score that is displayed
 * @param {Score} score Score Game Object
 * @param {number} amount Amount to increase by, must be a number (not a string).
 */
function Score_increaseScore(score, amount = 1)
{
    score.value += amount;
}

/**
 * No update for background.
 * @param {Score} score Score Game Object
 * @param {number} deltaTime Represents delta time between each update call.
 */
function Score_update(score, deltaTime)
{
    localStorage.setItem("score", score.value);
}

/**
 * Renders player to the canvas.
 * @param {Score} score Score Game Object
 * @param {CanvasRenderingContext2D} context .
 */
function Score_draw(score, context)
{
    const previous = {
        font: context.font,
        fillStyle: context.fillStyle,
    };
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.rotate(0);

    context.fillStyle = Color_rgba(score.font.color);
    context.font = score.font.toString();
    context.fillText(score.scoreText.concat(score.value), score.position.x, score.position.y);

    context.fillStyle = previous.fillStyle;
    context.font = previous.font;
}