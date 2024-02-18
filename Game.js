export class Game {



  constructor(fps, speed, update) {
    this.speed = speed;// speed with normal , fast
    this.a = 123;
    this.secondToUpdate = fps * speed;
  }
}
