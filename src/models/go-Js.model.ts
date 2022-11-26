import { LinkDataModel } from "./link-data.model";
import { NodeDataModel } from "./node-data.model";

export class GoJsModel{
    class: string;
    nodeDataArray: NodeDataModel[];
    linkDataArray: LinkDataModel[];
}