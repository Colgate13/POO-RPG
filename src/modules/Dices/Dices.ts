export default class Utils {
    public static d20(x: number = 0): number {
        return x + Math.random() * (20 - 1) + 1;
    }
}