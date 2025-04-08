/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './controllers/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { S3Controller } from './controllers/S3Controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RestaurantController } from './controllers/RestaurantController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryNameController } from './controllers/CategoryNameController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BacklogController } from './controllers/BacklogController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './controllers/AuhController';
import { expressAuthentication } from './middlewares/Auth';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "URL": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"errorMsg":"is not a valid URL","value":"^(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LongString": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"isString":{"errorMsg":"should be a string"},"minLength":{"errorMsg":"length must be between 2 and 300","value":2},"maxLength":{"errorMsg":"length must be between 2 and 300","value":300}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetItemPicUrlOut": {
        "dataType": "refObject",
        "properties": {
            "itemPicUrl": {"ref":"URL","required":true},
            "itemPicKey": {"ref":"LongString","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorDetail": {
        "dataType": "refObject",
        "properties": {
            "field": {"dataType":"string"},
            "message": {"dataType":"string","required":true},
            "value": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "S3ValidationError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UUID": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"errorMsg":"is not a valid UUID","value":"[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ImageFilename": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"value":"^[a-zA-Z0-9-_]+\\.(jpg|jpeg|png|webp|svg)$"},"minLength":{"errorMsg":"length must be between 5 and 255","value":5},"maxLength":{"errorMsg":"length must be between 5 and 255","value":255}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetItemPicUrlIn": {
        "dataType": "refObject",
        "properties": {
            "restaurantId": {"ref":"UUID","required":true},
            "branchId": {"ref":"UUID","required":true},
            "fileName": {"ref":"ImageFilename","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DefaultString": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"isString":{"errorMsg":"should be a string"},"minLength":{"errorMsg":"length must be between 2 and 50","value":2},"maxLength":{"errorMsg":"length must be between 2 and 50","value":50}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Slug": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"value":"^[a-zA-Z0-9-]+$"},"minLength":{"errorMsg":"length must be between 2 and 50","value":2},"maxLength":{"errorMsg":"length must be between 2 and 50","value":50}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Boolean": {
        "dataType": "refAlias",
        "type": {"dataType":"boolean","validators":{"isBoolean":{"errorMsg":"should be boolean"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BacklogCompactOut": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "branchId": {"dataType":"union","subSchemas":[{"ref":"UUID"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BranchCompleteOut": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "restaurantId": {"dataType":"union","subSchemas":[{"ref":"UUID"},{"dataType":"enum","enums":[null]}],"required":true},
            "name": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "displayName": {"dataType":"union","subSchemas":[{"ref":"Slug"},{"dataType":"enum","enums":[null]}]},
            "iOpen": {"dataType":"union","subSchemas":[{"ref":"Boolean"},{"dataType":"enum","enums":[null]}]},
            "status": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "rating": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"validators":{"minimum":{"value":0},"maximum":{"value":5}}},
            "showRating": {"dataType":"union","subSchemas":[{"ref":"Boolean"},{"dataType":"enum","enums":[null]}]},
            "instagram": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "telegram": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "twitter": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "youtube": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "eitaa": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "backlog": {"dataType":"union","subSchemas":[{"ref":"BacklogCompactOut"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantCompleteOut": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "name": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}],"required":true},
            "displayName": {"dataType":"union","subSchemas":[{"ref":"Slug"},{"dataType":"enum","enums":[null]}],"required":true},
            "branches": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"BranchCompleteOut"}},{"dataType":"enum","enums":[null]}]},
            "slang": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "instagram": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "telegram": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "twitter": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "youtube": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "eitaa": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "avatarUrl": {"dataType":"union","subSchemas":[{"ref":"URL"},{"dataType":"enum","enums":[null]}]},
            "coverUrl": {"dataType":"union","subSchemas":[{"ref":"URL"},{"dataType":"enum","enums":[null]}]},
            "logoUrl": {"dataType":"union","subSchemas":[{"ref":"URL"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConstraintsDatabaseError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantValidationError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantCompactIn": {
        "dataType": "refObject",
        "properties": {
            "name": {"ref":"DefaultString","required":true},
            "displayName": {"ref":"Slug","required":true},
            "slang": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}],"validators":{"pattern":{"value":"^[a-zA-Z0-9]*$"}}},
            "instagram": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "telegram": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "twitter": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "youtube": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "eitaa": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "avatarKey": {"dataType":"union","subSchemas":[{"ref":"LongString"},{"dataType":"enum","enums":[null]}]},
            "coverKey": {"dataType":"union","subSchemas":[{"ref":"LongString"},{"dataType":"enum","enums":[null]}]},
            "logoKey": {"dataType":"union","subSchemas":[{"ref":"LongString"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RestaurantNotFound": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryNameCompleteOut": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "name": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryNameValidationError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryNameCompactIn": {
        "dataType": "refObject",
        "properties": {
            "name": {"ref":"DefaultString","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Int": {
        "dataType": "refAlias",
        "type": {"dataType":"integer","validators":{"isInt":{"errorMsg":"number should be integer"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ItemCompleteOut": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "categoryId": {"dataType":"union","subSchemas":[{"ref":"UUID"},{"dataType":"enum","enums":[null]}]},
            "categoryName": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "subCategoryId": {"dataType":"union","subSchemas":[{"ref":"UUID"},{"dataType":"enum","enums":[null]}]},
            "name": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "ingredients": {"dataType":"union","subSchemas":[{"ref":"LongString"},{"dataType":"enum","enums":[null]}]},
            "price": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "picUrl": {"dataType":"union","subSchemas":[{"ref":"URL"},{"dataType":"enum","enums":[null]}]},
            "positionInItemsList": {"dataType":"union","subSchemas":[{"ref":"Int"},{"dataType":"enum","enums":[null]}]},
            "positionInCategory": {"dataType":"union","subSchemas":[{"ref":"Int"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryNameNotFound": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BacklogNotFound": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ItemValidationError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ItemCompactIn": {
        "dataType": "refObject",
        "properties": {
            "categoryNameId": {"ref":"UUID","required":true},
            "name": {"ref":"DefaultString","required":true},
            "ingredients": {"dataType":"union","subSchemas":[{"ref":"LongString"},{"dataType":"enum","enums":[null]}]},
            "price": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "picKey": {"dataType":"union","subSchemas":[{"ref":"LongString"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryCompleteOut": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "backlogId": {"dataType":"union","subSchemas":[{"ref":"UUID"},{"dataType":"enum","enums":[null]}],"required":true},
            "categoryName": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}],"required":true},
            "positionInBacklog": {"dataType":"union","subSchemas":[{"ref":"Int"},{"dataType":"enum","enums":[null]}]},
            "items": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ItemCompleteOut"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BacklogCompleteOut": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "branchId": {"dataType":"union","subSchemas":[{"ref":"UUID"},{"dataType":"enum","enums":[null]}],"required":true},
            "categories": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"CategoryCompleteOut"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateItemIn": {
        "dataType": "refObject",
        "properties": {
            "categoryId": {"dataType":"union","subSchemas":[{"ref":"UUID"},{"dataType":"enum","enums":[null]}]},
            "subCategoryId": {"dataType":"union","subSchemas":[{"ref":"UUID"},{"dataType":"enum","enums":[null]}]},
            "name": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "ingredients": {"dataType":"union","subSchemas":[{"ref":"LongString"},{"dataType":"enum","enums":[null]}]},
            "price": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "picKey": {"dataType":"union","subSchemas":[{"ref":"LongString"},{"dataType":"enum","enums":[null]}]},
            "positionInItemsList": {"dataType":"union","subSchemas":[{"ref":"Int"},{"dataType":"enum","enums":[null]}]},
            "positionInCategory": {"dataType":"union","subSchemas":[{"ref":"Int"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateCategoryIn": {
        "dataType": "refObject",
        "properties": {
            "positionInBacklog": {"ref":"Int","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IranPhoneNumber": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"errorMsg":"is not a valid phone number","value":"^0?9\\d{9}$"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Username": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"value":"^[a-zA-Z0-9_-]{3,30}$"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Email": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"errorMsg":"is not a valid email","value":"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserCompleteOut": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "phoneNumber": {"dataType":"union","subSchemas":[{"ref":"IranPhoneNumber"},{"dataType":"enum","enums":[null]}]},
            "username": {"dataType":"union","subSchemas":[{"ref":"Username"},{"dataType":"enum","enums":[null]}]},
            "email": {"dataType":"union","subSchemas":[{"ref":"Email"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserValidationError": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StrongPassword": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"value":"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,64}$"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserCompactIn": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": {"ref":"IranPhoneNumber","required":true},
            "password": {"ref":"StrongPassword","required":true},
            "username": {"ref":"Username"},
            "email": {"ref":"Email"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserNotFound": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "stack": {"dataType":"string"},
            "status": {"dataType":"double","required":true},
            "code": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ErrorDetail"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLogin": {
        "dataType": "refObject",
        "properties": {
            "phoneNumber": {"ref":"IranPhoneNumber","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"silently-remove-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_getProfile: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/users/profile',
            authenticateMiddleware([{"":["RESTAURANT_OWNER"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getProfile)),

            async function UserController_getProfile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getProfile, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getProfile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsS3Controller_generatePutItemPicPresignedUrl: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"GetItemPicUrlIn"},
        };
        app.post('/s3/get-item-pic-url',
            ...(fetchMiddlewares<RequestHandler>(S3Controller)),
            ...(fetchMiddlewares<RequestHandler>(S3Controller.prototype.generatePutItemPicPresignedUrl)),

            async function S3Controller_generatePutItemPicPresignedUrl(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsS3Controller_generatePutItemPicPresignedUrl, request, response });

                const controller = new S3Controller();

              await templateService.apiHandler({
                methodName: 'generatePutItemPicPresignedUrl',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRestaurantController_createRestaurant: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"RestaurantCompactIn"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/restaurants',
            authenticateMiddleware([{"":["RESTAURANT_OWNER"]}]),
            ...(fetchMiddlewares<RequestHandler>(RestaurantController)),
            ...(fetchMiddlewares<RequestHandler>(RestaurantController.prototype.createRestaurant)),

            async function RestaurantController_createRestaurant(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRestaurantController_createRestaurant, request, response });

                const controller = new RestaurantController();

              await templateService.apiHandler({
                methodName: 'createRestaurant',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRestaurantController_getRestaurant: Record<string, TsoaRoute.ParameterSchema> = {
                restaurantId: {"in":"path","name":"restaurantId","required":true,"ref":"UUID"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/restaurants/:restaurantId',
            authenticateMiddleware([{"":["RESTAURANT_OWNER"]}]),
            ...(fetchMiddlewares<RequestHandler>(RestaurantController)),
            ...(fetchMiddlewares<RequestHandler>(RestaurantController.prototype.getRestaurant)),

            async function RestaurantController_getRestaurant(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRestaurantController_getRestaurant, request, response });

                const controller = new RestaurantController();

              await templateService.apiHandler({
                methodName: 'getRestaurant',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryNameController_createCategoryName: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CategoryNameCompactIn"},
        };
        app.post('/category-names',
            ...(fetchMiddlewares<RequestHandler>(CategoryNameController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryNameController.prototype.createCategoryName)),

            async function CategoryNameController_createCategoryName(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryNameController_createCategoryName, request, response });

                const controller = new CategoryNameController();

              await templateService.apiHandler({
                methodName: 'createCategoryName',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoryNameController_getAllCategoryNames: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/category-names',
            ...(fetchMiddlewares<RequestHandler>(CategoryNameController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryNameController.prototype.getAllCategoryNames)),

            async function CategoryNameController_getAllCategoryNames(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryNameController_getAllCategoryNames, request, response });

                const controller = new CategoryNameController();

              await templateService.apiHandler({
                methodName: 'getAllCategoryNames',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBacklogController_createItem: Record<string, TsoaRoute.ParameterSchema> = {
                backlogId: {"in":"path","name":"backlogId","required":true,"ref":"UUID"},
                body: {"in":"body","name":"body","required":true,"ref":"ItemCompactIn"},
        };
        app.post('/backlog/:backlogId/items',
            ...(fetchMiddlewares<RequestHandler>(BacklogController)),
            ...(fetchMiddlewares<RequestHandler>(BacklogController.prototype.createItem)),

            async function BacklogController_createItem(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBacklogController_createItem, request, response });

                const controller = new BacklogController();

              await templateService.apiHandler({
                methodName: 'createItem',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBacklogController_geBacklog: Record<string, TsoaRoute.ParameterSchema> = {
                backlogId: {"in":"path","name":"backlogId","required":true,"ref":"UUID"},
        };
        app.get('/backlog/:backlogId',
            ...(fetchMiddlewares<RequestHandler>(BacklogController)),
            ...(fetchMiddlewares<RequestHandler>(BacklogController.prototype.geBacklog)),

            async function BacklogController_geBacklog(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBacklogController_geBacklog, request, response });

                const controller = new BacklogController();

              await templateService.apiHandler({
                methodName: 'geBacklog',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBacklogController_getItems: Record<string, TsoaRoute.ParameterSchema> = {
                backlogId: {"in":"path","name":"backlogId","required":true,"ref":"UUID"},
        };
        app.get('/backlog/:backlogId/items',
            ...(fetchMiddlewares<RequestHandler>(BacklogController)),
            ...(fetchMiddlewares<RequestHandler>(BacklogController.prototype.getItems)),

            async function BacklogController_getItems(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBacklogController_getItems, request, response });

                const controller = new BacklogController();

              await templateService.apiHandler({
                methodName: 'getItems',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBacklogController_updateItem: Record<string, TsoaRoute.ParameterSchema> = {
                backlogId: {"in":"path","name":"backlogId","required":true,"ref":"UUID"},
                itemId: {"in":"path","name":"itemId","required":true,"ref":"UUID"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateItemIn"},
        };
        app.patch('/backlog/:backlogId/items/:itemId',
            ...(fetchMiddlewares<RequestHandler>(BacklogController)),
            ...(fetchMiddlewares<RequestHandler>(BacklogController.prototype.updateItem)),

            async function BacklogController_updateItem(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBacklogController_updateItem, request, response });

                const controller = new BacklogController();

              await templateService.apiHandler({
                methodName: 'updateItem',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBacklogController_deleteItems: Record<string, TsoaRoute.ParameterSchema> = {
                backlogId: {"in":"path","name":"backlogId","required":true,"ref":"UUID"},
                body: {"in":"body","name":"body","required":true,"dataType":"array","array":{"dataType":"refAlias","ref":"UUID"}},
        };
        app.delete('/backlog/:backlogId/items',
            ...(fetchMiddlewares<RequestHandler>(BacklogController)),
            ...(fetchMiddlewares<RequestHandler>(BacklogController.prototype.deleteItems)),

            async function BacklogController_deleteItems(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBacklogController_deleteItems, request, response });

                const controller = new BacklogController();

              await templateService.apiHandler({
                methodName: 'deleteItems',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBacklogController_updateCategory: Record<string, TsoaRoute.ParameterSchema> = {
                backlogId: {"in":"path","name":"backlogId","required":true,"ref":"UUID"},
                categoryId: {"in":"path","name":"categoryId","required":true,"ref":"UUID"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateCategoryIn"},
        };
        app.patch('/backlog/:backlogId/categories/:categoryId',
            ...(fetchMiddlewares<RequestHandler>(BacklogController)),
            ...(fetchMiddlewares<RequestHandler>(BacklogController.prototype.updateCategory)),

            async function BacklogController_updateCategory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBacklogController_updateCategory, request, response });

                const controller = new BacklogController();

              await templateService.apiHandler({
                methodName: 'updateCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBacklogController_deleteCategory: Record<string, TsoaRoute.ParameterSchema> = {
                backlogId: {"in":"path","name":"backlogId","required":true,"ref":"UUID"},
                categoryId: {"in":"path","name":"categoryId","required":true,"ref":"UUID"},
        };
        app.delete('/backlog/:backlogId/categories/:categoryId',
            ...(fetchMiddlewares<RequestHandler>(BacklogController)),
            ...(fetchMiddlewares<RequestHandler>(BacklogController.prototype.deleteCategory)),

            async function BacklogController_deleteCategory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBacklogController_deleteCategory, request, response });

                const controller = new BacklogController();

              await templateService.apiHandler({
                methodName: 'deleteCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_restaurantOwnerSignup: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserCompactIn"},
        };
        app.post('/auth/res-signup',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.restaurantOwnerSignup)),

            async function AuthController_restaurantOwnerSignup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_restaurantOwnerSignup, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'restaurantOwnerSignup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_restaurantOwnerSignin: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserLogin"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/auth/res-signin',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.restaurantOwnerSignin)),

            async function AuthController_restaurantOwnerSignin(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_restaurantOwnerSignin, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'restaurantOwnerSignin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
