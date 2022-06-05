export default class Utils {
    public static radom(x: number = 999, y: number = 1): number {
        return Math.random() * (x - y) + y;
    }
}