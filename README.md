# mixmax-request-a-file
request a file from recipient(s) without having them reply with attachments

# Components
* nodejs server on heroku
  * editor page that gives info to render the templates, this is when we put in the [variables](http://sdk.mixmax.com/docs/variables-in-templates) for recipient and file info
  * upload page that takes the upload to S3
* an AWS Lambda job that kicks in when S3 write happens and sends email back to the sender with download link

# Setup
Add an enhancement with following information:

* Editor URL: https://mixmax-file-requests.herokuapp.com/editor
* Resolver API URL: https://mixmax-file-requests.herokuapp.com/api/resolver

# Next Steps
* Editor accepting the edit query with data feedback
* General UX of the whole feature, can request more text fields in the editor and make the file upload more sensible
* Styling (Editor, Resolver Template, and the return email with file)
* AWS IAM management (currently the IAM setup is a little messy, could clean up a bit and make it more secure)
  * Use AWS Cognito service to allow requester to pre-sign a URL for the uploader to upload, so only the requester can download
