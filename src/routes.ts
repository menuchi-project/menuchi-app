/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { S3Controller } from './controllers/S3Controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RestaurantController } from './controllers/RestaurantController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryNameController } from './controllers/CategoryNameController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryController } from './controllers/CategoryController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BranchController } from './controllers/BranchController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BacklogController } from './controllers/BacklogController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



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
    "UpdateCategoryIn": {
        "dataType": "refObject",
        "properties": {
            "positionInBacklog": {"ref":"Int","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MenuCompleteOut": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "branchId": {"dataType":"union","subSchemas":[{"ref":"UUID"},{"dataType":"enum","enums":[null]}],"required":true},
            "name": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}],"required":true},
            "favicon": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}],"required":true},
            "isPublished": {"dataType":"union","subSchemas":[{"ref":"Boolean"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MenuValidationError": {
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
    "MenuCompactIn": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "favicon": {"dataType":"union","subSchemas":[{"ref":"DefaultString"},{"dataType":"enum","enums":[null]}]},
            "isPublished": {"dataType":"union","subSchemas":[{"ref":"Boolean"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
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
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"silently-remove-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsS3Controller_generatePutPresignedUrl: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"GetItemPicUrlIn"},
        };
        app.post('/s3/get-item-pic-url',
            ...(fetchMiddlewares<RequestHandler>(S3Controller)),
            ...(fetchMiddlewares<RequestHandler>(S3Controller.prototype.generatePutPresignedUrl)),

            async function S3Controller_generatePutPresignedUrl(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsS3Controller_generatePutPresignedUrl, request, response });

                const controller = new S3Controller();

              await templateService.apiHandler({
                methodName: 'generatePutPresignedUrl',
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
        const argsRestaurantController_createRestaurant: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"RestaurantCompactIn"},
        };
        app.post('/restaurants',
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
        };
        app.get('/restaurants/:restaurantId',
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
        const argsCategoryController_updateItem: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"path","name":"categoryId","required":true,"ref":"UUID"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateCategoryIn"},
        };
        app.patch('/categories/:categoryId',
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.updateItem)),

            async function CategoryController_updateItem(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_updateItem, request, response });

                const controller = new CategoryController();

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
        const argsCategoryController_deleteItems: Record<string, TsoaRoute.ParameterSchema> = {
                categoryId: {"in":"path","name":"categoryId","required":true,"ref":"UUID"},
        };
        app.delete('/categories/:categoryId',
            ...(fetchMiddlewares<RequestHandler>(CategoryController)),
            ...(fetchMiddlewares<RequestHandler>(CategoryController.prototype.deleteItems)),

            async function CategoryController_deleteItems(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoryController_deleteItems, request, response });

                const controller = new CategoryController();

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
        const argsBranchController_createMenu: Record<string, TsoaRoute.ParameterSchema> = {
                branchId: {"in":"path","name":"branchId","required":true,"ref":"UUID"},
        };
        app.post('/branches/:branchId/menus',
            ...(fetchMiddlewares<RequestHandler>(BranchController)),
            ...(fetchMiddlewares<RequestHandler>(BranchController.prototype.createMenu)),

            async function BranchController_createMenu(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBranchController_createMenu, request, response });

                const controller = new BranchController();

              await templateService.apiHandler({
                methodName: 'createMenu',
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
        const argsBranchController_updateMenu: Record<string, TsoaRoute.ParameterSchema> = {
                branchId: {"in":"path","name":"branchId","required":true,"ref":"UUID"},
                menuId: {"in":"path","name":"menuId","required":true,"ref":"UUID"},
                body: {"in":"body","name":"body","required":true,"ref":"MenuCompactIn"},
        };
        app.patch('/branches/:branchId/menus/:menuId',
            ...(fetchMiddlewares<RequestHandler>(BranchController)),
            ...(fetchMiddlewares<RequestHandler>(BranchController.prototype.updateMenu)),

            async function BranchController_updateMenu(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBranchController_updateMenu, request, response });

                const controller = new BranchController();

              await templateService.apiHandler({
                methodName: 'updateMenu',
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
                itemId: {"in":"path","name":"itemId","required":true,"ref":"UUID"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateItemIn"},
        };
        app.patch('/backlog/items/:itemId',
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
                body: {"in":"body","name":"body","required":true,"dataType":"array","array":{"dataType":"refAlias","ref":"UUID"}},
        };
        app.delete('/backlog/items',
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

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
