console.log('Loading function');

var aws = require('aws-sdk');
var s3 = new aws.S3({ apiVersion: '2006-03-01' });
var nodemailer = require('nodemailer');

// fill out transport with your own email config
var transport = '';

var transporter = nodemailer.createTransport(transport);

var generateMailOptions = function(s3Key, preSignedUrl) {
    var keyComponents = s3Key.split('_');

    if (keyComponents.length < 4) {
        return undefined;
    }

    var time = new Date(parseInt(keyComponents[0]));
    var recipient = keyComponents[1];
    var sender = keyComponents[2];
    var fileName = keyComponents[3];

    return {
        from: 'no.lhr0909+mixmax-file-requests@gmail.com',
        to: recipient,
        subject: sender + ' sent you ' + fileName,
        text: 'You can download from the link below (expires in 24 hours): \n' + preSignedUrl
    };
}

var sendEmail = function(s3Key, preSignedUrl, successCallback, failCallback) {
    var mailOptions = generateMailOptions(s3Key, preSignedUrl);

    if (!mailOptions) {
        return failCallback("S3 key error! missing components");
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return failCallback(error);
        } else {
            return successCallback('Message sent: ' + info.response);
        }
    });
};

var getS3PreSignedUrl = function(s3EventRecord, successCallback, failCallback) {
    var bucket = s3EventRecord.bucket.name;
    var key = decodeURIComponent(s3EventRecord.object.key.replace(/\+/g, ' '));
    var params = {
        Bucket: bucket,
        Key: key,
        Expires: 86400 //24 hours
    };
    s3.getSignedUrl('getObject', params, function(err, url) {
        if (err) {
            console.log(err);
            var message = "Error getting object " + key + " from bucket " + bucket +
                ". Make sure they exist and your bucket is in the same region as this function.";
            return failCallback(message, err);
        }
        if (url) {
            return successCallback(key, url);
        }
    });
};

exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    var failCallback = function(message, err) {
        if (err) {
            console.log(err);
        }

        console.log(message);
        context.fail(message);
    };

    getS3PreSignedUrl(event.Records[0].s3, function(key, url) {
        sendEmail(key, url, context.succeed, failCallback);
    }, failCallback);
};
