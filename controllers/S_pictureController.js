(function (S_pictureController) {
    
    var services = require("../services");
    
    S_pictureController.init = function (app) {
        
        app.get("/api/getUserPic/:id", function (req, res) {
            //var userId = req.headers.userid;
            var userId = req.params.id;

            //ToDo: check for null
            //if (!userId) {
            //return res.status(401).send({ message : "UserId is not passed in headers" });
            //}
            var config = {
                id: userId,
                writeStream: res
            };
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            var promise = services.getUserPic(config);
            promise.then(function (result) {
                res.end();
            }, function (error) {
                res.status(500).send("Not able to get user display pic error: " + error);
            });

        });
        
        app.post("/api/postUserPic/:id", function (req, res) {
            //var userId = req.headers.userid;
            var userId = req.params.id;
            //if (!userId) {
            //    return res.status(401).send({ message : "UserId is not passed in headers" });
            //}
            res.headers = req.headers;
            
            var promise = services.postUserPic(userId, req);
            promise.then(function (result) {
                res.headers = { 'Content-Type': undefined };
                res.send(200);
            }, function (error) {
                res.send("Not able to post user photo" + picturereq + "error: " + error);
            });

        });

    };
})(module.exports);
