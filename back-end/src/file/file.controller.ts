import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("files")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file) {
    return this.fileService.uploadToGCP(file);
  }
}
