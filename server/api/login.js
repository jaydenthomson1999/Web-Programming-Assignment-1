module.exports = function(app, fs) {
    app.post('/api/login', (req, res) => {
        let {username, password} = req.body;
        let ok = false;
        
        fs.readFile(__dirname + '/../users.json', (err, data) => {
            if (err) {
                console.log(err);
                res.json({'err': err});
            }
            else {
                let users = JSON.parse(data);
                
                for(user in users.users) {
                    if(users.users[user].username == username) {
                        if(users.users[user].password == password) {
                            ok = true;
                            res.json({'ok': true, 
                            'username': users.users[user].username,  
                            'email': users.users[user].email, 
                            'type': users.users[user].type });
                        }
                        else 
                            break;
                    }
                }
                
                if(!ok)
                    res.json({'ok': false});
            }
        });
    });
}