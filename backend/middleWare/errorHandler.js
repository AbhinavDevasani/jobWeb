const constants={
    VALIDATION_ERROR : 400,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    NOT_FOUND: 404
}
const errorHandler=(err,req,res,next)=>{

    const statusCode=err.statusCode||500
    switch(statusCode){
        case constants.FORBIDDEN:
            res.status(statusCode).json({
                title:"FORBIDDEN",
                message:err.message,
                stackTrace:err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.staus(statusCode).json({
                title:"NOT FOUND",
                message:err.message,
                stackTrace:err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({
                title:"UNAUTHORIZED",
                message:err.message,
                stackTrace:err.stack
            });
            break;
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({
                title: "VALIDATION_ERROR",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            res.status(500).json({
                title: "INTERNAL_SERVER_ERROR",
                message: err.message,
                stackTrace: err.stack,
            });
            console.log("Unhandled error:", err);
            break;
    }
}
export default errorHandler