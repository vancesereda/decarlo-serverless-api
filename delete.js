import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
export async function main(event, context) {
    const params = {
        TableName: "pages",
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
        Key: {
            userID: "USER-SUB-1234",
            to: event.pathParameters.id
        }
    };
    try {
        const result = await dynamoDbLib.call("delete", params);    
        return success({ status: true });   
    } catch (e) {
        console.log(e)
        return failure({ error: e });  
    }
}