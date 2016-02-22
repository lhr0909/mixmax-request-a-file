# mixmax-request-a-file
request a file from recipient(s) without having them reply with attachments

# Components
* nodejs server on elastic beanstalk
  * editor page that gives info to render the templates, this is when we put in the [variables](http://sdk.mixmax.com/docs/variables-in-templates) for recipient and file info
  * upload page that takes the upload to S3
* a lambda job will kick in when S3 write happens and sends email back to the sender with download link
