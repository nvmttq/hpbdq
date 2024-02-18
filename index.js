const Game = {
  fps: 60,
  speed: {
    normal: 0.007,
    fast: 0.06,
  },
  secondsToUpdate: (fps, speed) => {
    return fps * speed;
  },
  trip: 0,
};

class HeroSprite {
  constructor({
    pathImg,
    xPos,
    yPos,
    frameSize,
    frameIndex,
    scale,
    nameCharacter,
  }) {
    this.frameIndex = frameIndex ?? 0;
    this.frameCount = 0;
    this.sheet = new Image();
    this.sheet.src = pathImg;
    this.frameWidth = frameSize.w ?? 1;
    this.frameHeight = frameSize.h ?? 1;
    this.xPos = xPos ?? 0;
    this.yPos = yPos ?? 0;
    this.scale = scale ?? 1;
    this.State = { girl: {}, boy: {} };
    this.nameCharacter = nameCharacter;
    if (nameCharacter === "girl") this.buildGirlState();
    if (nameCharacter === "boy") this.buildBoyState();
  }

  drawImg(ctx, x, y, direction, secondsToUpdate) {
    const state = this.State[this.nameCharacter].getState(direction);
    console.log(state);
    ctx.drawImage(
      this.sheet,
      state.frameIndex * this.frameWidth,
      state.spriterIndex * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      x,
      y,
      this.frameWidth * this.scale,
      this.frameHeight * this.scale
    );

    this.frameCount++;
    if (this.frameCount > secondsToUpdate) {
      state.frameIndex++;
      this.frameCount = 0;
    }
    if (state.frameIndex > state.endIndex) {
      state.frameIndex = state.startIndex;
    }
  }
  buildGirlState() {
    const move = {
      init: { index: 0, speed: 0 },
      down: { index: 0, speed: -SPEED },
      left: { index: 1, speed: -SPEED },
      right: { index: 2, speed: SPEED },
      up: { index: 3, speed: SPEED },
    };

    this.State["girl"] = {
      states: {},
      generateState: function (name, startIndex, endIndex) {
        if (!this.states[name]) {
          this.states[name] = {
            frameIndex: startIndex,
            startIndex: startIndex,
            endIndex: endIndex,
            moveStart: endIndex,
            moveEnd: startIndex,
            spriterIndex: move[name].index,
          };
        }
      },
      getState: function (name) {
        if (this.states[name]) {
          return this.states[name];
        }
      },
    };
    this.State["girl"].generateState("init", 1, 1);
    this.State["girl"].generateState("down", 0, 2);
    this.State["girl"].generateState("left", 0, 2);
    this.State["girl"].generateState("right", 0, 2);
    this.State["girl"].generateState("up", 0, 2);
  }

  buildBoyState() {
    const move = {
      init: { index: 0, speed: 0 },
      down: { index: 0, speed: -SPEED },
      left: { index: 0, speed: -SPEED },
      right: { index: 1, speed: SPEED },
      up: { index: 0, speed: SPEED },
    };

    this.State["boy"] = {
      states: {},
      generateState: function (name, startIndex, endIndex) {
        if (!this.states[name]) {
          this.states[name] = {
            frameIndex: startIndex,
            startIndex: startIndex,
            endIndex: endIndex,
            spriterIndex: move[name].index,
          };
        }
      },
      getState: function (name) {
        if (this.states[name]) {
          return this.states[name];
        }
      },
    };
    this.State["boy"].generateState("init", 1, 1);
    this.State["boy"].generateState("down", 0, 6);
    this.State["boy"].generateState("left", 0, 6);
    this.State["boy"].generateState("right", 0, 6);
    this.State["boy"].generateState("up", 0, 6);
  }

  resetFrameIndex(curDirect) {
    ["down", "left", "right", "up", "init"].forEach((direct) => {
      if (direct === curDirect) return;
      const state = this.State[this.nameCharacter].getState(direct);
      state.frameIndex = state.startIndex;
    });
  }

  stopCharacter() {
    this.resetFrameIndex("");
    Object.keys(this.State[this.nameCharacter].states).forEach((state) => {
      this.State[this.nameCharacter].states[state].endIndex =
        this.State[this.nameCharacter].states[state].moveEnd;
    });
  }

  startCharacter() {
    Object.keys(this.State[this.nameCharacter].states).forEach((state) => {
      this.State[this.nameCharacter].states[state].endIndex =
        this.State[this.nameCharacter].states[state].moveStart;
    });
  }
}

class SkySprite {
  constructor({ pathImg, xPos, yPos, frameSize }) {
    this.frameIndex = 0;
    this.frameCount = 0;
    this.sheet = new Image();
    this.sheet.src = pathImg;
    this.frameWidth = frameSize.w ?? 1;
    this.frameHeight = frameSize.h ?? 1;
    this.xPos = xPos ?? 0;
    this.yPos = yPos ?? 0;
    this.scale = 1;
  }

  drawImg(ctx, x, y, secondsToUpdate) {
    ctx.drawImage(
      this.sheet,
      0 * this.frameWidth,
      0 * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      x,
      y,
      this.frameWidth * this.scale,
      this.frameHeight * this.scale
    );

    // this.frameCount++;
    // if (this.frameCount > secondsToUpdate) {
    //   state.frameIndex++;
    //   this.frameCount = 0;
    // }
    // if (state.frameIndex > state.endIndex) {
    //   state.frameIndex = state.startIndex;
    // }
  }
}

class GrassSprite {
  // 500 100 w , h
  constructor({ pathImg, xPos, yPos, frameSize, frameIndex }) {
    this.frameIndex = frameIndex ?? 0;
    this.frameCount = 0;
    this.sheet = new Image();
    this.sheet.src = pathImg;
    this.frameWidth = frameSize.w ?? 1;
    this.frameHeight = frameSize.h ?? 1;
    this.xPos = xPos ?? 0;
    this.yPos = yPos ?? 0;
    this.scale = 1;
  }

  drawImg(ctx, x, y, secondsToUpdate) {
    // const state = this.State.getState();
    ctx.drawImage(
      this.sheet,
      0 * this.frameWidth,
      0 * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      x,
      y,
      this.frameWidth * this.scale,
      this.frameHeight * this.scale
    );

    // this.frameCount++;
    // if (this.frameCount > secondsToUpdate) {
    //   state.frameIndex++;
    //   this.frameCount = 0;
    // }
    // if (state.frameIndex > state.endIndex) {
    //   state.frameIndex = state.startIndex;
    // }
  }
}

class EventSprite {
  constructor({ pathImg, xPos, yPos, frameSize, frameIndex, scale }) {
    this.frameIndex = frameIndex ?? 0;
    this.frameCount = 0;
    this.sheet = new Image();
    this.sheet.src = pathImg;
    this.frameWidth = frameSize.w ?? 1;
    this.frameHeight = frameSize.h ?? 1;
    this.xPos = xPos ?? 0;
    this.yPos = yPos ?? 0;
    this.scale = scale ?? 1;
  }

  drawImg(ctx, x, y, secondsToUpdate) {
    // const state = this.State.getState();
    ctx.drawImage(
      this.sheet,
      this.frameIndex * this.frameWidth,
      this.frameIndex * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      x,
      y,
      this.frameWidth * this.scale,
      this.frameHeight * this.scale
    );

    // this.frameCount++;
    // if (this.frameCount > secondsToUpdate) {
    //   state.frameIndex++;
    //   this.frameCount = 0;
    // }
    // if (state.frameIndex > state.endIndex) {
    //   state.frameIndex = state.startIndex;
    // }
  }

  bonusDisplay() {}
}

const gameDiv = document.getElementById("game");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = 320);
const height = (canvas.height = 150);
const SPEED = 5;
let cutPerSecond = 5;
let cutPerSecondEvent = {};
const stateKey = {
  direction: "",
  keyCode: "",
};
const resources = {
  character: "assets/images/girl.png",
  sky: "assets/images/sky.png",
};
let fps = 60;
const listTextGameSay = {
  happyBirthday: [
    "Xin chào! Hãy dừng lại một chút !!!",
    "Bạn có biết vì sao bạn nhìn thấy bánh sinh nhật ở đây không?",
    "Vì hôm nay là ngày sinh nhật của bạn đó!",
    "Dù sao thì chúc mừng bạn có một sinh nhật thật tuyệt vời nhé!",
    "Tôi có món quà nhỏ dành cho bạn",
    "Cùng tôi đi nào!",
  ],
  boyFriendSayHPBD: [
    "Tuy khoảng cách có xa nhưng anh đã tạo ra trò này để giúp chúng ta gặp nhau!",
    "Chúc mừng sinh nhật em bé iu của anh!",
    "Mong em sẽ luôn vui tươi, xinh đẹp, hạnh phúc và thành công trong cuộc sống!",
    "Mong chúng ta sẽ ở bên nhau thêm nhiều sinh nhật nữa!",
    "Anh yêu em!",
  ],
};
const movePerSecond = {
  normal: 0.007,
  fast: 0.07,
};
let secondsToUpdate = movePerSecond.normal * fps;

canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";

const hero = new HeroSprite({
  pathImg: "assets/images/girl.png",
  xPos: 85,
  yPos: 85,
  frameSize: { w: 31, h: 49 },
  nameCharacter: "girl",
});
const boy = new HeroSprite({
  pathImg: "assets/images/boy.png",
  xPos: 4*320 + 200,
  yPos: 61,
  frameSize: { w: 50, h: 85 },
  nameCharacter: "boy",
});

let skys = Array.from({ length: 3 }).map((v, i) => {
  return new SkySprite({
    pathImg: "assets/images/sky.png",
    xPos: i * 320,
    yPos: 0,
    frameSize: { w: 320, h: 150 },
  });
});
let grassSprites = Array.from({ length: 4 }).map((v, i) => {
  return new GrassSprite({
    pathImg: "assets/images/grass.png",
    xPos: i * 320,
    yPos: 85,
    frameSize: { w: 320, h: 100 },
  });
});

const events = {
  birthday: {
    cake: new EventSprite({
      pathImg: "assets/images/birthday_cake.gif",
      xPos: 3*320,
      yPos: 85,
      frameSize: { w: 10000, h: 10000 },
      scale: 0.1,
    }),
  },
  boyMetGirl: new EventSprite({
    pathImg: "assets/images/heart.png",
    xPos: 1000,
    yPos: 50,
    frameSize: { w: 10000, h: 10000 },
    scale: 0.07,
  }),
  quynhPictrues: Array.from({ length: 2 }).map((v, i) => {
    return new EventSprite({
      pathImg: `assets/images/q${i + 1}.jpg`,
      xPos: (i+1) * 320,
      yPos: 50,
      frameSize: { w: 10000, h: 10000 },
      scale: 0.05,
    });
  }),
};

function loadSkys(key) {
  if (!skys || skys.length === 0) return;
  Array.from({ length: skys.length }).forEach((v, i) => {
    v = i;
    skys[v].xPos += key === "left" ? cutPerSecond : -cutPerSecond;
  });
  Array.from({ length: skys.length }).forEach((v, i) => {
    v = i;
    if (skys[v].xPos + skys[v].frameWidth <= 0) {
      skys[v].xPos = skys[(v + 2) % 3].xPos + skys[(v + 2) % 3].frameWidth;
    }
  });

  console.log(skys);
  skys.forEach((s) => {
    s.drawImg(context, s.xPos, s.yPos, secondsToUpdate);
  });
}

function loadGrass(key) {
  if (!grassSprites || grassSprites.length === 0) return;
  Array.from({ length: grassSprites.length }).forEach((v, i) => {
    v = i;
    grassSprites[v].xPos += key === "left" ? cutPerSecond : -cutPerSecond;
  });
  Array.from({ length: grassSprites.length }).forEach((v, i) => {
    v = i;
    if (grassSprites[v].xPos + grassSprites[v].frameWidth <= 0) {
      grassSprites[v].xPos =
        grassSprites[(v + 3) % 4].xPos + grassSprites[(v + 3) % 4].frameWidth;
    }
  });

  console.log(grassSprites);
  grassSprites.forEach((grass) => {
    grass.drawImg(context, grass.xPos, grass.yPos, secondsToUpdate);
  });
}

let countgameSayBirthday = 0;
async function gameSayBirthday(list) {
  let i = 0;
  const textList = list;
  const divText = document.getElementById("text");

  function displayNextText() {
    const text = textList[i];

    // Add class for animation
    divText.classList.add("text");

    // Set the text content
    divText.textContent = text;

    // Remove the class after a short delay
    setTimeout(() => {
      divText.classList.remove("text");
      i++;

      // Check if there are more texts to display
      if (i < textList.length) {
        // Call the function recursively after a delay
        setTimeout(displayNextText, 2000); // Adjust the delay as needed
      }
    }, 1000); // Adjust the delay as needed
  }
  displayNextText();
  divText.textContent = "";
}
async function happyBirthday() {
  if (Math.abs(events.birthday.cake.xPos - hero.xPos) <= 50) {
    console.log("HAPPY BIRTHDAY");
    hero.stopCharacter();
    cutPerSecond = 0;
    const audio = document.querySelector("#audio_hpbd");
    const note = document.querySelector("#note");
    setTimeout(() => {
      cutPerSecond = 5;
      audio.pause();
      document.getElementById("text").textContent = "";
    }, 19000);
    if (countgameSayBirthday === 0) {
      audio.play();
      await gameSayBirthday(listTextGameSay.happyBirthday);

      countgameSayBirthday++;
    }
  }
}

async function boyMetGirl() {
  cutPerSecond = 0;
}

function loadQuynhPictures() {
  Array.from({ length: events.quynhPictrues.length }).forEach((v, i) => {
    v = i;
    events.quynhPictrues[v].xPos -= cutPerSecond;
  });
  events.quynhPictrues.forEach((q) => {
    q.drawImg(context, q.xPos, q.yPos, secondsToUpdate);
  });
}
async function frame(key) {
  console.log(key);
  context.clearRect(0, 0, width, height);

  events.birthday.cake.xPos += key === "left" ? cutPerSecond : -cutPerSecond;
  boy.xPos -= cutPerSecond;
  if (Math.abs(boy.xPos - hero.xPos) <= 50) {
    clearInterval(heroTrip);
    boy.stopCharacter();
    setTimeout(() => {
      document.getElementById("text").textContent = "";
      events.boyMetGirl.drawImg(
        context,
        boy.xPos - 30,
        events.boyMetGirl.yPos,
        secondsToUpdate
      );
    }, 14000);
    await gameSayBirthday(listTextGameSay.boyFriendSayHPBD);
  } else if (Math.abs(boy.xPos - hero.xPos) <= 100) {
    // clearInterval(heroTrip);
    hero.stopCharacter();
    boyMetGirl();
    boy.xPos -= 5;
  }
  loadSkys(key);
  loadGrass(key);
  if (countgameSayBirthday === 0) {happyBirthday();}
  loadQuynhPictures();
  events.birthday.cake.drawImg(
    context,
    events.birthday.cake.xPos,
    events.birthday.cake.yPos,
    secondsToUpdate
  );
  events.boyMetGirl.drawImg(
    context,
    events.boyMetGirl.xPos,
    events.boyMetGirl.yPos,
    secondsToUpdate
  );
  boy.drawImg(context, boy.xPos, boy.yPos, "left", secondsToUpdate);
  hero.drawImg(context, hero.xPos, hero.yPos, key, secondsToUpdate);

  // requestAnimationFrame(frame);
}

// frame("down");

const heroTrip = setInterval(() => {
  secondsToUpdate = movePerSecond.fast * fps;
  frame("right");
}, 50);
window.addEventListener("keydown", (e) => {
  const key = e.key;
  const moveDirection = key.replace("Arrow", "").toLowerCase();
  console.log(e);
  if (key.startsWith("Arrow")) {
    if (stateKey.direction === moveDirection && stateKey.keyCode === "down") {
      secondsToUpdate = movePerSecond.fast * fps;
    }
    (stateKey.direction = moveDirection), (stateKey.keyCode = "down");
    frame(moveDirection);
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key;
  console.log("UP", key);

  if (key.startsWith("Arrow")) {
    hero.resetFrameIndex(stateKey.direction);
    (stateKey.direction = ""), (stateKey.keyCode = "up");
    secondsToUpdate = movePerSecond.normal * fps;
  }
});
