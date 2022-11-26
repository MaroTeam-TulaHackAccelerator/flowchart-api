import { LinkDataModel } from "./link-data.model";
import { NodeDataModel } from "./node-data.model";

export interface IGoJsModel{
    class: string;
    nodeDataArray: NodeDataModel[];
    linkDataArray: LinkDataModel[];
}