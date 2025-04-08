import { Body, Post, Request, Response, Route, Security, SuccessResponse, Tags } from "tsoa";
import S3Service from "../services/S3Service";
import { GetItemPicUrlIn, GetItemPicUrlOut } from "../types/S3Types";
import { S3ValidationError } from "../exceptions/ValidationError";
import BaseController from "./BaseController";
import { PermissionScope, RolesEnum } from "../types/Enums";
import express from 'express';

@Route('/s3')
@Tags('S3')
export class S3Controller extends BaseController {
  @Response<S3ValidationError>(422, '4224 S3ValidationError')
  @SuccessResponse(201, 'Item pic presigned url generated successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Post('/get-item-pic-url')
  public async generatePutItemPicPresignedUrl(
    @Body() body: GetItemPicUrlIn,
    @Request() req: express.Request
  ): Promise<GetItemPicUrlOut> {
    const { restaurantId, branchId, fileName } = body;
    const bucketName = process.env.S3_BUCKETNAME;

    this.checkPermission(req.session.user, PermissionScope.Restaurant, restaurantId);

    const itemPicKey = `${bucketName}/Restaurants/${restaurantId}/items/${branchId}/${fileName}`;
    const itemPicUrl = await S3Service.generatePutPresignedUrl(itemPicKey);
    return {
      itemPicUrl,
      itemPicKey
    };
  }
}