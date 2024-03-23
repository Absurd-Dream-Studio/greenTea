import { Entity } from "./Entity.js"

export interface IEntityIterator
{
  hasNext():boolean
  next():Entity
}