## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|text|null: false, foreign_key: true|
|email|integer|null: false, foreign_key: true|
|password|integer|null: false, foreign_key: true|

### Association
- has_many   :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false, foreign_key: true|

### Association
- has_many   :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text|null: false,foreign_key: true|
|image|string|foreign_key: true|

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