import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import S3Service from "../services/S3Service";
import { GetItemPicUrlIn, GetItemPicUrlOut } from "../types/S3Types";
import { S3ValidationError } from "../exceptions/ValidationError";

@Route('/s3')
@Tags('S3')
export class S3Controller extends Controller {
  @Response<S3ValidationError>(422, '4224 S3ValidationError')
  @SuccessResponse(201, 'Item pic presigned url generated successfully.')
  @Post('/get-item-pic-url')
  public async generatePutItemPicPresignedUrl(@Body() body: GetItemPicUrlIn): Promise<GetItemPicUrlOut> {
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