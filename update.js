import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "pages",
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userID: "USER-SUB-1234",
            to: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET #t = :text, #n = :name, tags = :tags, slideshow = :slideshow, #s  = :section , attachments = :attachments", 
        ExpressionAttributeNames: {
            "#t": "text",
            "#n":"name",
            "#s":"section",
        },
        ExpressionAttributeValues: {
            ":text": data.text || "null",
            ":name": data.name || "null",
            ":tags": data.tags || [],
            ":slideshow": data.slideshow || "false",
            ":section": data.section || "null",
            ":attachments": data.attachments || [],
        },
    // 'ReturnValues' specifies if and how to return the item's attributes,// where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        return success(result);
    } catch (e) {
        console.log(e)
        return failure({ error: e });
    }
}