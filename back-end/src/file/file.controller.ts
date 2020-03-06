import {
  Controller,
  Post,
  HttpStatus,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
const { Storage } = require("@google-cloud/storage");
import * as path from "path";
import * as fs from "fs";

const gc = new Storage({
  keyFilename: path.join(
    __dirname,
    "../my-project-2018-206114-07270400a695.json"
  ),
  projectId: "my-project-2018-206114"
});

const coolFilesBucket = gc.bucket("bucket_1_got");

const getPublicUrl = fileName => {
  return `https://storage.googleapis.com/bucket_1_got/${fileName}`;
};

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("files")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file) {
    const { originalname, path, mimetype } = file;
    return await new Promise((resolve, reject) =>
      fs
        .createReadStream(path)
        .pipe(
          coolFilesBucket.file(originalname).createWriteStream({
            metadata: {
              contentType: mimetype
            },
            resumable: false
          })
        )
        .on("error", error => {
          reject({ success: false, error });
        })
        .on("finish", async () => {
          await coolFilesBucket.makePublic();
          const _path = getPublicUrl(originalname);
          resolve(_path);
        })
    );
  }
}
