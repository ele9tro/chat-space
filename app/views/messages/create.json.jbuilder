json.(@message, :content, :image)
json.created_at @message.created_at.to_s(:datetime)
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id

# 復習用
# json.id           @message.id
# json.user_name    @message.user.name
# json.content      @message.content
# json.image        @message.image.url
# json.created_at   @message.created_at.to_s(:datetime)