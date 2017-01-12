<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <script type="text/javascript">
        function setConnected(connected) {
            document.getElementById('connect').disabled = connected;
            document.getElementById('disconnect').disabled = !connected;
            document.getElementById('response').innerHTML = '';
        }

        function connect() {
            if ('WebSocket' in window){
                console.log('Websocket supported');
                var url = "ws://" + window.location.host;
                if(""==window.location.port)
                {
                    url = url + ":" + window.location.port
                }
                url = url + "/hello/websocket";
                socket = new WebSocket(url);

                console.log('Connection attempted');

                socket.onopen = function(){
                    console.log('Connection open!');
                    setConnected(true);
                }

                socket.onclose = function(){
                    setConnected(false);
                    console.log('Disconnecting connection');
                    alert("断开服务器！")
                }

                socket.onmessage = function (evt)
                {
                    var received_msg = evt.data;
                    console.log(received_msg);
                    console.log('message received!');
                    showMessage(received_msg);
                }
            } else {
                console.log('Websocket not supported');
            }
        }

        function disconnect() {
            setConnected(false);
            console.log("Disconnected");
            socket.close();
            socket = null;
        }

        function sendName() {
            if(typeof(socket) == "undefined" || null == socket)
            {
                alert("请先连接服务器！");
                return;
            }
            try {
                var message = document.getElementById('message').value;
                socket.send(JSON.stringify({ 'message': message }));
                var response = document.getElementById('response');
                response.innerHTML = "";
            }
            catch(err) {
                alert("请先连接服务器！");
                setConnected(false);
            }
        }

        function showMessage(message) {
            var response = document.getElementById('response');
            var p = document.createElement('p');
            p.style.wordWrap = 'break-word';
            p.appendChild(document.createTextNode(message));
            response.appendChild(p);
        }
    </script>
</head>
<body>

<button id="connect" onclick="connect()">连接服务器</button>
<button id="disconnect" onclick="disconnect()"/>断开服务器</button><br>
<input id="message" value="" size="100"/>
<button onclick="sendName()">开始解析url</button>
<div id="response"></div>
</body>
</html>