function createdWs () {
            var conn;
            let chatRoom;
            var msg = document.getElementById("msg");
            var log = document.getElementById("chatLog");
            let Obtn = document.getElementById("btn")

            function appendLog(item) {
                var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
                log.appendChild(item);
                if (doScroll) {
                    log.scrollTop = log.scrollHeight - log.clientHeight;
                }
            }
            // 连接 webSocket
            if (window["WebSocket"]) {
                conn = new WebSocket("ws://192.168.3.77:8001/ws");
                // conn = new WebSocket("ws://127.0.0.1:8030");
                conn.onopen = function (ev) {
                	chatRoom = new CreateChatRoom()
                  	var sendData = {
                        FromId:"1", // ？？？
                        ToId:"1", // 对话用户
                        AppId:"3", // ？？？
                        UserId:chatRoom.user.UserId, // 用户
                        Content:"1", // 消息
                        MsgType:"register", // 消息类型
                    }
                    conn.send(JSON.stringify(sendData))
                   
                }
                conn.onclose = function (evt) {
                    var item = document.createElement("div");
                    item.innerHTML = "<b>Connection closed.</b>";
                    appendLog(item);
                };
                conn.onmessage = function (evt) {
                    var messages = evt.data.split('\n');
                    for (var i = 0; i < messages.length; i++) {
                        var item = document.createElement("div");
                        item.innerText = messages[i];
                        appendLog(item);
                    }
                };
            } else {
                var item = document.createElement("div");
                item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
                appendLog(item);
            }
            // 发送消息
            Obtn.onclick = function () {
            	console.log(msg.value)
                if (!conn) {
                    return false;
                }
                if (!msg.value) {
                    return false;
                }
                if(!chatRoom) {
                	return false;
                }
                let type = sessionStorage.getItem("type")
                let Content = msg.value
                if (type === "group") {
                	chatRoom.sendGroup(Content)
                } else if (type === "one") {
                	let ToId = sessionStorage.getItem("ToId")
                	chatRoom.sendOne(ToId,Content)
                }
                msg.value = ''
                return false;
            };
            /**
             * 聊天室
             */
            function CreateChatRoom() {
            	this.allUserLists = [
	            		{UserId: '1'},
	            		{UserId: '2'},
	            		{userId: '3'}
            		]
            	this.groupId = '1'	
            	this.user = {
            		UserId: sessionStorage.getItem("USERID")
            	}
            }
            /**
             * 单聊
             * {
            		FromId:"1",
                    ToId:ToId,
                    AppId:"3",
                    UserId:"1",
                    Content:Content,
                    MsgType:"",
            	}
             */
            CreateChatRoom.prototype.sendOne = function(ToId,Content){
            	let sendData = {
            		FromId:"1",
                    ToId:ToId,
                    AppId:"3",
                    UserId:this.user.UserId,
                    Content:Content,
                    MsgType:"one",
            	}
            	conn.send(JSON.stringify(sendData))
            }
            /**
             * 群聊
             * {
            		FromId:"1",
                    GroupId:this.groupId,
                    AppId:"3",
                    UserId:"1",
                    Content:Content,
                    MsgType:"",
            	}
             */
            CreateChatRoom.prototype.sendGroup = function(Content){
            	let sendData = {
            		FromId:"1",
                    GroupId:this.groupId,
                    AppId:"3",
                    UserId:this.user.UserId,
                    Content:Content,
                    MsgType:"group",
            	}
            	conn.send(JSON.stringify(sendData))
            }

        }
        