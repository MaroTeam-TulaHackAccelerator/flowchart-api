import { IGoJsModel } from "src/gateway/models/go-Js.model";

export interface INewMessageDto {
    roomId: string;
    model: IGoJsModel;
}
