import { Container } from "inversify";
import { BuidlResult } from "./BuildResult.js";
import { DIBuilder } from "./dependencyInject/DIBuilder.js";

import { EntityEventListenerContext } from "greentea-core/entity/entityEventListener/EntityEventListenerContext";
import EntityEventHandlerConfiguration from "./ecs/entityEvent/EntityEventHandlerConfiguration.js";
import SystemInitailizer from "./ecs/system/SystemInitailizer.js";
import { ISystemContext } from "greentea-infrastructure/app/ecs/system/ISystemContext";
import TypeConfiguration from "./dependencyInject/TypeConfiguration.js";

export class AppBuilder
{
  private result:BuidlResult

  constructor()
  {
    this.result = {
      diContainer: undefined,
    }
  }

  async Build():Promise<AppBuilder>
  {
    let diContainer = new DIBuilder().Build().GetContainer()

    EntityEventHandlerConfiguration(
      diContainer.resolve(EntityEventListenerContext),
      diContainer
    )

    SystemInitailizer.Init(diContainer)

    this.result ={
      diContainer : diContainer,
    }
    return this
  }

  GetResult():BuidlResult
  {
    return this.result
  }
}