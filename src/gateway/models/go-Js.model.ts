import { ILinkDataModel } from "./link-data.model";
import { INodeDataModel } from "./node-data.model";

export interface IGoJsModel{
    class: string;
    nodeDataArray: INodeDataModel[];
    linkDataArray: ILinkDataModel[];
}