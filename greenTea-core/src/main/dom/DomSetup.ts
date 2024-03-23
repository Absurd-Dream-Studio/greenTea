import { EntityCollectionEventEnum } from "greentea-infrastructure/ecs/entity/EntityCollectionEventEnum";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { DomElementComponent } from "./DomElementComponent.js";

export const DomSetup =  {
    setup(ec: IEntityCollection) {
        let el = ec.GetListenerManager();
        el.addListener(EntityCollectionEventEnum.CREATE, (e) => {
            let com = e.components.get(DomElementComponent)

            if (!com) {
                return
            }

            this.mainContainer.appendChild(com.element.domNode)


        });
        el.addListener(EntityCollectionEventEnum.DESTROY, (e) => {
            let htmlCom = e.components.get(DomElementComponent) as DomElementComponent
            if (!htmlCom) {
                return
            }

            if (!htmlCom.element) {
                return
            }

            // this.mainContainer.removeChild(htmlCom.element.domNode)
            htmlCom.element.domNode.remove()
            htmlCom.element = undefined
        });
    }
};