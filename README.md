# ishmael-server-final
![ishmael-logo](https://github.com/howelldean81/ishmael-server-final/blob/main/assets/ishmael.png)


## Dependencies
Ishmael requires the following libraries to run:

* accesscontrol
* aws-sdk
* bcryptjs
* cors
* dotenv
* express
* jsonwebtoken
* multer
* multer-s3
* path
* pg
* pg-hstore
* sequelize
* sequelize-cli
* url
* uuid

## Install dependencies
npm install

## Uploading books
This server uses a middleware build from multer in order to upload files. It is configured to connect to an S3 bucket (or other compatible S3 buckets like those from Digital Ocean). 

In order to upload files, you will need to provide your own AWS bucket. To configure the bucket, you must configure proper access through IAM, which is out of the scope of this document. Once completed, add the following lines to your .env file:

ACCESS_KEY = YOU_ACCESS_KEY

SECRET_ACCESS_KEY = YOUR_SECRET_ACCESS_KEY

BUCKET_NAME = your-bucket-name

REGION = your-aws-region (eg: us-east-2)

That's it!