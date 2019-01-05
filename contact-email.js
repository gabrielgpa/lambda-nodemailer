var ApiBuilder = require('claudia-api-builder');
var api = new ApiBuilder();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport( smtpTransport({
    service: '<sercice>',
	auth: {
		user: '<access-email>',
		pass: '<access-password>'
	}
}));

api.post('/mail', function (req, res) {
    var params = {
        name: req.post["name"],
        email: req.post["email"],
        phone: req.post["phone"],
        message: req.post["message"]
    };
    var htmlContent = template(params);
	var data = {
		from: '<sender-email>',
		to: '<receptor-email>',
		subject: '<subject>',
		html: '<body content>',
		bcc: '<another-email>'
    };

    return new Promise((resolve, reject) => transporter.sendMail(data,
        function (error, result) { 
            if (error) {
                return reject("error"); 
            } else {
                resolve("success");
            }
        }));
});

function template(params) {
    var html = 
        "<div style='text-align:left !important;'>" +
        "<h2>Novo contato pelo site!</h2>" +
        "<br/>" +
        "<strong>Nome: </strong>" + "<i>"+ params.name +"</i><br />" +
        "<p></p>" +
        "<strong>E-mail: </strong>" + "<i>"+ params.email +"</i><br />" +
        "<p></p>" +
        "<strong>Telefone: </strong>" + "<i>"+ params.phone +"</i><br />" +
        "<p></p>" +
        "<strong>Mensagem: </strong>" + "<i>"+ params.message +"</i>" +
        "</div>" +
        "<br/>";
        
    return html;
}

module.exports = api;
