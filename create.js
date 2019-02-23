import uuid from 'uuid';
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export async function main(event, context) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);
    const params = {
        TableName: "pages",     
        // 'Item' contains the attributes of the item to be created
        // - 'userId': user identities are federated through the
        // Cognito Identity Pool, we will use the identity id
        // as the user id of the authenticated user
        // - 'noteId': a unique uuid
        // - 'content': parsed from request body
        // - 'attachment': patersed from request body
        // - 'createdAt': current Unix timestamp
        Item: {
            userID: "USER-SUB-1234",
            to: data.to,
            className:"default",
            slideshow: data.slideshow,
            thumbnail: data.thumbnail,
            setNumber: "null",
            text: data.text ,
            section: data.section,
            attachments: data.attachments ? data.attachments : [],
            name: data.name,
            tags: data.tags ? data.tags : [],
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);

    } catch(e) {
        console.log(e);
        return failure({"error":e});
    }
}