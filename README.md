## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|integer|null: false, foreign_key: true|
|password|integer|null: false, foreign_key: true|

### Association
- has_many   :messages
- belongs_to :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group|text|null: false|

### Association
- has_many   :messages
- belongs_to :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text|
|image|string|

### Association
- belongs_to :group
- belongs_to :user


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user