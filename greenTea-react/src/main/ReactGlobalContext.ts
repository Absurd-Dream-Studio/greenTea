import { Container, inject, injectable } from "inversify";
import { ReactScope } from "./ReactScope.js";

@injectable()
export class ReactGlobalContext {
    globalScope: ReactScope
}