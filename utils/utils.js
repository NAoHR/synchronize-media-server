exports.errorHandler = (errorMessage) => {
    console.log(errorMessage);

    switch(errorMessage?.name){
        case "ValidationError":
            return {
                code : 403,
                errorData : {
                    ok : false,
                    name : errorMessage.name,
                    message : errorMessage?.message || "validation error"
                }
            }
        case "MongoServerError":
            switch(errorMessage.code){
                case 11000:
                    let keyValue = Object.keys(errorMessage.keyValue);
                    return {
                        code : 403,
                        errorData : {
                            ok : false,
                            name : errorMessage.name,
                            message : `there ${keyValue.length > 1 ? "are" : "is"} duplicate in ${keyValue.join(",")}`
                        }
                    }
                default:
                    return {
                        code : 501,
                        errorData : {
                            ok : false,
                            message : "Internal Error"
                        }
                    }
            }
        case "CastError":
            return {
                code : 403,
                errorData : {
                    ok : false,
                    name : errorMessage.name,
                    messgae : "request not valid"
                }
            }
        default:
            return {
                code : 501,
                errorData : {
                    ok : false,
                    message : "Internal Error"
                }
            }
    }
}

exports.publicUserParser = (userDetail) => {
    const {profilePict,username,fullname} = userDetail
    return {
        profilePict,
        username,
        fullname,
    }
}

exports.publicPostParser = (postDetail) => {
    const {image,description,comments,likes} = postDetail;
    return {
        image,description,
        comments: comments.length,
        likes : likes.length
    }
}