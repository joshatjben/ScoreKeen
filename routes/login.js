/*
 * GET home page.
 */
exports.landing = function(req, res){
    res.render('login', {
        title: "login"
    });
}