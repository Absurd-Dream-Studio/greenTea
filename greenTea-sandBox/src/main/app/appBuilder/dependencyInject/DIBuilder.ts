import { Container } from "inversify"
import { DIConfiguration } from "./DIConfiguration.js"

export class DIBuilder{

  private readonly diContainer:Container

  constructor()
  {
    this.diContainer = new Container()
  }

  Build():DIBuilder
  {
    DIConfiguration(this.diContainer)
    return this
  }

  GetContainer():Container
  {
    return this.diContainer
  }
}