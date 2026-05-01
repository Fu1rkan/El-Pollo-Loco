/**
 * Represents the current keyboard and action input state
 */
class Keyboard {
    /**
     * Indicates whether left movement is active
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Indicates whether right movement is active
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Indicates whether up movement is active
     * @type {boolean}
     */
    UP = false;

    /**
     * Indicates whether down movement is active
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Indicates whether the jump key is active
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Indicates whether the throw action key is active
     * @type {boolean}
     */
    E = false;

    /**
     * Stores one requested throw action
     * @type {boolean}
     */
    THROW = false;

    /**
     * Indicates whether keyboard input is enabled
     * @type {boolean}
     */
    KEY = true;

    /**
     * Indicates whether escape is active
     * @type {boolean}
     */
    ESCAPE = false;
};
