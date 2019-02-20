import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export async function main(event, context) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = event.body;
    for (let i = 0; i < data.length; i++) {
        const params = {
            TableName: "pages",
            // 'Item' contains the attributes of the item to be created
            // - 'userId': user identities are federated through the
            // Cognito Identity Pool, we will use the identity id
            // as the user id of the authenticated user
            // - 'noteId': a unique uuid
            // - 'content': parsed from request body
            // - 'attachment': parsed from request body
            // - 'createdAt': current Unix timestamp
            Item: {
                userID: "USER-SUB-1234",
                name: data[i].name,
                to: data[i].to,
                className: data[i].className,
                slideshow: data[i].slideshow,
                thumbnail: data[i].thumbnail,
                section: data[i].section,
                setNumber: data[i].setNumber.length > 0 ? data[i].setNumber : 'null',
                text: data[i].text.length > 0 ? data[i].text : 'null',
                attachments: data[i].attachments
            }
        };

        try {
            console.log(params)
            await dynamoDbLib.call("put", params);
        } catch(e) {
            console.log(e);
            return failure({ status: false });
        }
    }
    return success( { status: true } )
}