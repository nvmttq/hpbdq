export class HeroSprite {
  constructor() {
    this.frameIndex = 0;
    this.frameCount = 0;
    this.sheet = new Image();
    this.sheet.src = "assets/images/girl.png";
    this.frameWidth = 31;
    this.frameHeight = 49;
    this.xPos = 130;
    this.yPos = 160;
    this.scale = 1;
    this.buildState();
  }

  drawImg(ctx, x, y, direction) {
    const state = this.State.getState(direction);
    ctx.drawImage(
      this.sheet,
      state.frameIndex * frameWidth,
      state.spriterIndex * frameHeight,
      this.frameWidth,
      this.frameHeight,
      x,
      y,
      this.frameWidth * this.scale,
      this.frameHeight * this.scale
    );

    state.frameIndex++;

  }
  buildState() {
    const move = {
      init: { index: 0, speed: 0 },
      down: { index: 0, speed: -SPEED },
      left: { index: 1, speed: -SPEED },
      right: { index: 2, speed: SPEED },
      up: { index: 3, speed: SPEED },
    };

    this.State = {
      states: {},
      generateState: function (name, startIndex, endIndex) {
        if (!this.states[name]) {
          this.states[name] = {
            frameIndex: startIndex,
            startIndex: startIndex,
            endIndex: endIndex,
            spriterIndex: move[name].index,
            speed: move[name].speed,
          };
        }
      },
      getState: function (name) {
        if (this.states[name]) {
          return this.states[name];
        }
      },
    };
    this.State.generateState("init", 0, 1);
    this.State.generateState("down", 0, 2);
    this.State.generateState("left", 0, 2);
    this.State.generateState("right", 0, 2);
    this.State.generateState("up", 0, 2);
  }
}
