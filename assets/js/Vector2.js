/**
 * Constructs our vector with 2 floats.
 * @constructor
 * @param {Number} x represents x-coordinate (defaults to 0).
 * @param {Number} y represents y-coordinate (defaults to 0).
 */
 function Vector2(x = 0, y = 0)
 {
     this.x = x;
     this.y = y;
 }
 
 /**
  * Constructs string out of this.
  * @param {Vector2} v Vector
  * @param {number} digits Defines the number of digits (defaults to 2), use null for full precision.
  * @returns {string} Returns a string format of the vector (x,y).
  */
 function Vector2_ToString(v, digits = 2)
 {
     if (digits === null)
     {
         return "(" + v.x.toString() + "," + v.y.toString() + ")";
     }
     else
     {
         return "(" + v.x.toFixed(digits).toString() + "," + v.y.toFixed(digits).toString() + ")";
     }
 }
 
 /**
  * Gets the unit vector of this.
  * @param {Vector2} v Vector
  * @returns {Vector2} Returns a unit vector of this.
  */
 function Vector2_unit(v)
 {
     var length = v.len();
     return new Vector2(v.x / length, v.y / length);
 }
 
 /**
  * Gets the length of a vector
  * @param {Vector2} v Vector
  * @returns {Number} returns length of the vector.
  */
 function Vector2_len(v)
 {
     return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
 }
 
 /**
  * 
  * @param {Vector2} lhs left hand side.
  * @param {Vector2} rhs right hand side.
  * @returns {Vector2} New added Vector2.
  */
 function Vector2_add(lhs, rhs)
 {
     return new Vector2(lhs.x + rhs.x, lhs.y + rhs.y);
 }
 
 /**
  * 
  * @param {Vector2} lhs left hand side.
  * @param {Vector2} rhs right hand side.
  * @returns {Vector2} New subtracted Vector2.
  */
 function Vector2_sub(lhs, rhs)
 {
     return new Vector2(lhs.x - rhs.x, lhs.y - rhs.y);
 }
 
 /**
  * 
  * @param {Vector2} lhs left hand side.
  * @param {Vector2} rhs right hand side.
  * @returns {Vector2} New multiplied vector.
  */
 function Vector2_mult(lhs, rhs)
 {
     return new Vector2(lhs.x * rhs.x, lhs.y * rhs.y);
 }
 
 /**
  * 
  * @param {Vector2} vec vector to divide.
  * @param {number} num number to divide our vec by.
  * @returns {Vector2} New divided vector2.
  */
 function Vector2_div(vec, num)
 {
     return new Vector2(vec.x / num, vec.y / num);
 }