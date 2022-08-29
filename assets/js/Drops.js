function Drops()
{
    this.windowSize = app.resolution;
    this.spawnLocationY = this.windowSize.y * -0.1;
    /** @type {Array<{imageIndex: number, position: Vector2>} */
    this.items = [];
    this.spawn = {
        timer: 0,
        interval: 1000 // in milliseconds
    };
    this.size = new Vector2(this.windowSize.x * 0.1, this.windowSize.y * 0.15);
    this.spritesheet = {
        textures: [new Image(), new Image(), new Image(), new Image()],
        textureRects: [new Rectangle(0, 0, 173, 176)
            , new Rectangle(0, 0, 48, 49)
            , new Rectangle(0, 0, 54, 53)
            , new Rectangle(0, 0, 54, 55)],
        origin: new Vector2(this.size.x * -0.5, this.size.y * -0.5),
    };
    this.collisions = {
        width: this.size.x * 0.7,
        height: this.size.y * 0.7
    };
    this.badDrop = 0; // Defines index of the bomb drop
    this.spritesheet.textures[0].src = "assets/img/bomb.png";
    this.spritesheet.textures[1].src = "assets/img/candy1.png";
    this.spritesheet.textures[2].src = "assets/img/candy2.png";
    this.spritesheet.textures[3].src = "assets/img/candy3.png";
}


/**
 * No update for background.
 * @param {Drops} drops Drops Game Object
 * @param {Player} player Reference to player game Object.
 * @param {number} deltaTime Represents delta time between each update call.
 */
function Drops_update(drops, player, score, deltaTime)
{
    const moveSpeed = 0.5 * deltaTime;
    drops.items.forEach((item, index, array) =>
    {
        item.position.y += moveSpeed;
        if (item.position.y > drops.windowSize.y + drops.size.y)
        {
            array = array.splice(index, 1);
        }
        if (item.position.y + drops.collisions.height > player.position.y + (player.size.y * 0.1)
            && item.position.y < player.position.y + (player.size.y * 0.7)
            && !(item.position.x + drops.collisions.width < player.position.x + (player.size.x * 0.1)
            || item.position.x > player.position.x + (player.size.x * 0.6)))
        {
            if (item.imageIndex === drops.badDrop)
            {
                player.hitBomb = true;
            }
            else
            {
                Score_increaseScore(score, 5);
            }
            array = array.splice(index, 1);
        }
    });
    drops.spawn.timer += deltaTime;
    if (drops.spawn.timer > drops.spawn.interval)
    {
        drops.spawn.timer -= drops.spawn.interval;
        drops.items.push(Drops_generateItem(drops));
    }
}


/**
 * Generates item
 * @param {Drops} drops Drops Game Object
 */
function Drops_generateItem(drops)
{
    // Generates a random number from 0 to 3 (inclusive)
    const randomIndex = Math.floor(Math.random() * 100) % 4;
    return { imageIndex: randomIndex, position: Drops_generateSpawnPosition(drops) };
}


/**
 * Generates a spawn position
 * @param {Drops} drops Drops Game Object
 */
function Drops_generateSpawnPosition(drops)
{
    const posX = (drops.windowSize.x * 0.2) + Math.random() * (drops.windowSize.x * 0.6);
    return new Vector2(posX, drops.spawnLocationY);
}


/**
 * Renders player to the canvas.
 * @param {Drops} drops Drops Game Object
 * @param {CanvasRenderingContext2D} context .
 */
function Drops_draw(drops, context)
{
    for (const item of drops.items)
    {
        context.setTransform(1, 0, 0, 1, item.position.x + (drops.size.x * 0.5), item.position.y + (drops.size.y * 0.5));
        context.rotate(0);
        context.drawImage(
            drops.spritesheet.textures[item.imageIndex],
            drops.spritesheet.textureRects[item.imageIndex].position.x,
            drops.spritesheet.textureRects[item.imageIndex].position.y,
            drops.spritesheet.textureRects[item.imageIndex].width,
            drops.spritesheet.textureRects[item.imageIndex].height,
            drops.spritesheet.origin.x,
            drops.spritesheet.origin.y,
            drops.size.x,
            drops.size.y
        );
    }
}