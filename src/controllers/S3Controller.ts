import { Body, Controller, Post, Route, Tags } from "tsoa";
import S3Service from "../services/S3Service";
import { GetItemPicUrlIn, GetItemPicUrlOut } from "../types/S3Types";

@Route('/s3')
@Tags('S3')
export class S3Controller extends Controller {
  @Post('/get-item-pic-url')
  public async generatePutPresignedUrl(@Body() body: GetItemPicUrlIn): Promise<GetItemPicUrlOut> {
    const { restaurantId, branchId, fileName } = body;
    const bucketName = process.env.S3_BUCKETNAME;

    const itemPicKey = `${bucketName}/Restaurants/${restaurantId}/items/${branchId}/${fileName}`;
    const itemPicUrl = await S3Service.generatePutPresignedUrl(itemPicKey);
    return {
      itemPicUrl,
      itemPicKey
    };
  }
}