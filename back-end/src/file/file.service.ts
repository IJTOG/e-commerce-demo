import { Injectable } from "@nestjs/common";
const { Storage } = require("@google-cloud/storage");

import * as del from "del";
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

@Injectable()
export class FileService {
  public uploadToGCP = async file => {
    const { filename, path, mimetype } = file;
    return await new Promise((resolve, reject) =>
      fs
        .createReadStream(path)
        .pipe(
          coolFilesBucket.file(filename).createWriteStream({
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
          const _path = this.getPublicUrl(filename);
          this.deleteFile(path);
          resolve(_path);
        })
    );
  };

  private getPublicUrl = fileName => {
    return `https://storage.googleapis.com/bucket_1_got/${fileName}`;
  };

  public deleteFile = async path => {
    await del([path], { force: true });
    return true;
  };
}
