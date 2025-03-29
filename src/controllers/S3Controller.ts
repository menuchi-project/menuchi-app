import { Body, Controller, Post, Route, Tags, UploadedFile } from "tsoa";
import { URL } from "../types/TypeAliases";
import S3Service from "../services/S3Service";
import { GetPicUrlIn } from "../types/S3Types";
import multer from "multer";

@Route('/s3')
@Tags('S3')
export class S3Controller extends Controller {
  @Post('/get-item-pic-url')
  public async generatePutPresignedUrl(@Body() body: GetPicUrlIn): Promise<URL> {
    const { restaurantId, branchId, fileName } = body;
    const bucketName = process.env.S3_BUCKETNAME;
    const keyName = `${bucketName}/Restaurants/${restaurantId}/items/${branchId}/${fileName}`;
    return S3Service.generatePutPresignedUrl(keyName);
  }
}