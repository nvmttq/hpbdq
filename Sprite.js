


export class Sprite {
    constructor({
        frameIndex,
        frameWidth,
        frameHeight,
        xPos,
        yPos,
        scale,
        sheet,
        move,
        frameStartIndex,
        frameEndIndex,
    }) {
        this.frameIndex = frameIndex ?? 0
        this.frameHeight = frameHeight ?? 1;
        this.frameWidth = frameWidth ?? 1
        this.frameStartIndex = frameStartIndex ?? 0
        this.frameEndIndex = frameEndIndex ?? 0
        this.xPos = xPos ?? 0 // position
        this.yPos = yPos ?? 0 // position
        this.scale = scale ?? 1
        this.sheet = sheet
        this.move = move ?? {}
        this.frameCount = 0;
    }

    buildFrame() {
    }
}