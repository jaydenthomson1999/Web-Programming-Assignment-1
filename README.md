# Git
In this section I will describe the layout of my git repository and my approach to version control.

## Layout
For my repository, I wanted to keep the Angular front-end and the backend Node REST API under the same project so I only needed one package.json to handle my dependent node modules. Additionally I could keep track of commits for both the front end and back end in one git repo. 

In hindsight, this was probably a bad decision because if this project was going to go into production these two ends will be hosted on different servers. I could still keep everything under one repo but I would need to initialise two seperate package.json files in order to make sure both ends dont install packages that they won't need.

## Version Control

My approach for version control in this assignment was to develop the backend API route by creating a new file and linking it to my main server code using require, test it using Postman, and if all my tests passed I would add the new file to my repository, commited all my changes and pushed my local repository to my remote repository. 

After this I would develop the UI in my Angular app and develop Typscript code to send requests for API data that would be displayed in the Angular app. I would then test my request code before making changes to my repository. After testing I would add new files, commit all changes and push the local repository to the remote repository. 

Since there was only one developer I decided I wouldn't need to do any branching however reflecting on the project it would have been more helpful to define milestones for myself and create a branch for each milestone. After each milestone was completed I would merge the branch to the master branch. 

# Data Structures
My main data structure was a list of users which has user info, a list of groups they are a part of and a list they are an admin of. 
```json
"users": [
            {
                "username": "USERNAME",
                "password": "PASSWORD",
                "email": "EMAIL",
                "type": "TYPE",
                "groupList": [
                    {
                        "groupName": "GROUP NAME",
                        "channels": [
                            "main",
                            "OTHER CHANNEL NAME"
                        ]
                    }
                ],
                "adminGroupList": ["GROUP NAME"]
            }
        ]
```
Each group in a group list has a group name and an array of channel names. Each group must have a main channel which cannot be deleted unless the whole group is deleted. If a user is not a group admin, there adminGroupList will be empty. 

# REST API
| Route | Request Type | Parameters | Return Values | Description |
|-------|--------------|-----------|---------------|-------------|
| /api/login | POST | { username: string, password: string } | { ok: boolean, user: json } | Finds user in user.json file and checks to see if there password matches one on record |
| /api/add-user | PUT | { newUser: json } | { add: boolean } | Searches through whole user.json file to see if newUser.username exists, if it doesn't, they will be added as a new user |
| /api/get-users | GET | No Parameters | { ok: boolean, user: json } | |
| /api/add-group | PUT | { username: string, groupName: string } | { add: boolean, comment: string} | |
| /api/get-groups | POST | { username: string } | { ok: boolean, groupList: json[], adminGroupList: string[] } | |
| /api/del-user | DELETE | { username: string } | { delete: boolean, comment: string } | |
| /api/add-channel | PUT | { username: string, groupName: string, channelName: string } | { add: boolean, comment: string } | |
| /api/del-group | DELETE | { username: string, groupName: string } | { delete: boolean, comment: string } | |
| /api/add-user-to-group | PUT | { adminUser: string, addUser: string, groupName: string } | { add: boolean, comment: string } | |
| /api/add-user-to-channel | PUT | { adminUser: string, addUser: string, groupName: string, channelName: string } | { add: boolean, comment: string } | |
| /api/del-user-from-group | DELETE | { adminUser: string, addUser: string, groupName: string } | { delete: boolean, comment: string } | |
| /api/del-user-from-channel | DELETE | { adminUser: string, addUser: string, groupName: string, channelName: string } | { delete: boolean, comment: string } | |

# Angular Architecture

# State Change
