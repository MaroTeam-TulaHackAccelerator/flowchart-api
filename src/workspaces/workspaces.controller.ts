import { Body, Controller, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { createReadStream, createWriteStream, readFileSync, ReadStream, writeFile } from 'fs';
import { GoJsModel } from '../gateway/models/go-Js.model';
import { Stream } from 'stream';
import { v4 as uuidv4 } from 'uuid';

const dir = 'src/exports/';

@Controller('workspaces')
export class WorkspacesController {
    
    @Post("file-import")
    @UseInterceptors(FileInterceptor('file'))
    importFile(@UploadedFile() file){
        return JSON.parse(file.buffer.toString());
    }

    @Post("file-export")
    exportFile(@Body() data: GoJsModel): StreamableFile{
        let json = JSON.stringify(data);
        let name = `${uuidv4()}.json`;
        let path = dir + name;
        writeFile(path, json, "utf-8", (err) => {});
        let file = createReadStream(path);
        console.log(file);
        return new StreamableFile(file);
    }    
}