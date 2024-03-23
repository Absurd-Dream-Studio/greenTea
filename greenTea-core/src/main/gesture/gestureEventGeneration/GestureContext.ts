import { injectable } from "inversify";

@injectable()
export class GestureContext {
    dx: number = 0
    dy: number = 0
    sx: number = 1
    sy: number = 1
}