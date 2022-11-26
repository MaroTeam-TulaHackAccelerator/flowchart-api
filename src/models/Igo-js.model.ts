import { LinkData } from "./link-data";
import { NodeData } from "./node-data";

export interface IGoJSModel{
    class: string;
    nodeDataArray: NodeData[];
    linkDataArray: LinkData[];
}