import { IEntityIterator } from "./IEntityIterator.js"

export interface IEntityQuery {
  WithAll(components:Array<Function>): IEntityQuery
  GetIterator(): IEntityIterator
}