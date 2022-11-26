import { GoJsModel } from "src/gateway/models/go-Js.model";

export class NewMessageDto {
    roomId: string;
    model: GoJsModel;
}