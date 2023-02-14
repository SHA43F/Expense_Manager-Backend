const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

exports.uploadToS3 = (data, filename) => {
  const s3Bucket = new AWS.S3({
    accessKeyId: "confidential",
    secretAccessKey: "confidential"
  });

  var params = {
    Bucket: "confidential",
    Key: filename,
    Body: data,
    ACL: "public-read"
  };
  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.Location);
      }
    });
  });
};
