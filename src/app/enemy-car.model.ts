export class EnemyCar {
    public xPosition: number;
    public yPosition = -4;

    public static image = [
        [true, false, true],
        [false, true, false],
        [true, true, true],
        [false, true, false]
    ];

    /**
     * @param position Left = 0, right = 1
     */
    constructor(position) {
        if (position === 0) this.xPosition = 2;
        else this.xPosition = 5;
    }
    
    public move(): void {
        this.yPosition += 1;
    }
}