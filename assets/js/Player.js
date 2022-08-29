function Player()
{
    this.windowSize = app.resolution;
    const startingPosition = new Vector2(this.windowSize.x * 0.5, this.windowSize.y * 0.57);
    this.position = new Vector2(startingPosition.x, startingPosition.y);

    const scaledPlayerSize = new Vector2(this.windowSize.x * 0.2, this.windowSize.y * 0.2);
    // Pick same smallest value for width and height to maintain image aspect ratio
    const scaledSize = Math.min(scaledPlayerSize.x, scaledPlayerSize.y);
    this.size = new Vector2(scaledSize, scaledSize);

    this.spritesheet = {
        texture: new Image(),
        textureRect: new Rectangle(0,0,80,80),
        origin: new Vector2(this.size.x * -0.5,this.size.y * -0.5), 
    };

    // Contains the various animations with pre-calculated animation frame values.
    // Interval for each animation (only need one for all)
    // Contains other necessary components for running animations, namely a timer and
    //  current index of the current animation to cycle through the frames.
    this.animation = {
        interval: 100, // in milliseconds
        timer: 0,
        frameIndex: 0,
        idle: {
            rectangle: new Rectangle(80 * 0, 80 * 0, 80, 80)
        },
        walkLeft: {
            rectangles: [
                new Rectangle(80 * 0, 80 * 1, 80, 80),
                new Rectangle(80 * 1, 80 * 1, 80, 80),
                new Rectangle(80 * 2, 80 * 1, 80, 80),
                new Rectangle(80 * 3, 80 * 1, 80, 80)
            ]
        },
        walkRight: {
            rectangles: [
                new Rectangle(80 * 0, 80 * 2, 80, 80),
                new Rectangle(80 * 1, 80 * 2, 80, 80),
                new Rectangle(80 * 2, 80 * 2, 80, 80),
                new Rectangle(80 * 3, 80 * 2, 80, 80)
            ]
        }
    };
    this.isMovingLeft = false;
    this.isMovingRight = false;

    this.spritesheet.texture.src = "assets/img/Player.png";

    this.hitBomb = false;
}

/**
 * Update the players position based on input.
 * @param {Player} player Player Game Object
 * @param {{ moveLeft: boolean, moveRight: boolean }} input reference to input so we can use the appropriate movement booleans.
 * @param {number} deltaTime Represents delta time between each update call.
 */
function Player_update(player, input, deltaTime)
{
    const moveSpeed = 1.1 * deltaTime;
    player.isMovingLeft = input.moveLeft;
    player.isMovingRight = input.moveRight;
    if (input.moveLeft)
    {
        player.position.x -= moveSpeed;
    }
    if (input.moveRight)
    {
        player.position.x += moveSpeed;
    }
    if (!player.isMovingLeft && !player.isMovingRight)
    {
        // Player is standing still, therefore reset animation frame index.
        player.animation.frameIndex = 0;
    }
    // If the player is moving at all, increment animation timer.
    player.animation.timer = (player.isMovingLeft || player.isMovingRight)
        ? player.animation.timer + deltaTime 
        : 0;
    Player_boundaryCollisions(player);
}

/**
 * Renders player to the canvas.
 * @param {Player} player Player Game Object
 * @param {CanvasRenderingContext2D} context .
 */
function Player_draw(player, context)
{
    context.setTransform(1, 0, 0, 1, player.position.x + (player.size.x * 0.5), player.position.y + (player.size.y * 0.5));
    context.rotate(0);

    // Check if player is moving
    if (player.isMovingLeft || player.isMovingRight)
    {
        // Check if enough time has passed.
        if (player.animation.timer > player.animation.interval)
        {
            // Enough time has passed, increment animation frame index.
            player.animation.timer = 0;
            // Modulus operator maintains value from 0 to 3 (does not include 4)
            player.animation.frameIndex = (player.animation.frameIndex + 1) % 4;
        }
        // Apply appropriate texture rectangle, according to spritesheet and
        //  whether moving left or right.
        player.spritesheet.textureRect = player.isMovingLeft
            ? player.animation.walkLeft.rectangles[player.animation.frameIndex]
            : player.animation.walkRight.rectangles[player.animation.frameIndex];
    }
    else
    {
        // We are not moving therefore set to idle frame.
        player.spritesheet.textureRect = player.animation.idle.rectangle;
    }
    context.drawImage(
        player.spritesheet.texture,
        player.spritesheet.textureRect.position.x,
        player.spritesheet.textureRect.position.y,
        player.spritesheet.textureRect.width,
        player.spritesheet.textureRect.height,
        player.spritesheet.origin.x,
        player.spritesheet.origin.y,
        player.size.x,
        player.size.y,
    );
}

/**
 * Process collisions by preventing player from moving out of the screen.
 * Calculate bounding box (no rotations keeps this simple),
 * Only x-axis movement means only x-axis boundary verifcations.
 * @param {Player} player Player Game Object
 */
function Player_boundaryCollisions(player)
{
    const boundary = {
        left: 0,
        top: 0,
        right: player.windowSize.x,
        bottom: player.windowSize.y
    };
    const playerBoundary = {
        left: player.position.x,
        top: player.position.y,
        right: player.position.x + player.size.x,
        bottom: player.position.y + player.size.y
    };
    player.position.x = playerBoundary.left < boundary.left
        ? boundary.left
        : player.position.x;
    player.position.x = playerBoundary.right > boundary.right
        ? boundary.right - player.size.x
        : player.position.x;
    //player.position.y = playerBoundary.top < boundary.top
    //    ? boundary.top
    //    : player.position.y;
    //player.position.y = playerBoundary.bottom > boundary.bottom
    //    ? boundary.bottom - player.size.y
    //    : player.position.y;
}