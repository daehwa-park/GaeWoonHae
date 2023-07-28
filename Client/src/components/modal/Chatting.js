import React, {useEffect} from "react";
import $ from "jquery";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./Chatting.css"
const Chatting = () => {

    useEffect(()=> {
        var stompClient = null;
        const roomname = 'SessionA';
        function setConnected(connected) {
            $("#connect").prop("disabled", connected);
            $("#disconnect").prop("disabled", !connected);
            if (connected) {
                $("#conversation").show();
            }
            else {
                $("#conversation").hide();
            }
            $("#messages").html("");
        }

        function connect() {
            const availableNames = ['정원', '두현', '수빈', '대화', '승빈']; // 사용 가능한 이름 리스트
            const randomName = availableNames[Math.floor(Math.random() * availableNames.length)]; // 랜덤하게 이름 선택
            var socket = new SockJS('/gs-guide-websocket');
            stompClient = Stomp.over(socket);
            var headers = {
                name: randomName,
                roomNumber: roomname
                // name: $("#name").val(),
                // roomNumber: $("#roomNumber").val()
            };
            console.log(headers,'헤더 확인')
            var roomNumber = roomname; // 채팅방 번호를 입력 받습니다. // "SessionA" <=> "#roomNumber"
            // var roomNumber = $("#roomNumber").val(); // 채팅방 번호를 입력 받습니다. // "SessionA" <=> "#roomNumber"
            stompClient.connect(headers, function (frame) {  // 서버연결시도
                setConnected(true);
                console.log('Connected: ' + frame+ '확인@@@@@@@@@@@@@');
                stompClient.subscribe('/topic/chatroom/' + roomNumber + '/messages', function (message) {
                    showMessage(JSON.parse(message.body).content);
                });
                stompClient.send("/app/chatroom/" + roomNumber + "/enter", {}, JSON.stringify({}));
            });
        }

        function disconnect() {
            if (stompClient !== null) {
                exit();
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        }

        function sendChat() {
            var roomNumber = roomname; // 채팅방 번호를 가져옵니다.
            stompClient.send("/app/chatroom/" + roomNumber + "/chat", {}, JSON.stringify({'chat': $("#chat").val()}));
        }
        // function enter(){
        //     var roomNumber = $("#roomNumber").val(); // 채팅방 번호를 가져옵니다.
        //     stompClient.send("/app/chatroom/" + roomNumber + "/enter", {},  JSON.stringify({}));
        // }
        function exit(){
            var roomNumber = $("#roomNumber").val(); // 채팅방 번호를 가져옵니다.
            stompClient.send("/app/chatroom/" + roomNumber + "/exit", {},  JSON.stringify({}));
        }

        function showMessage(message) {
            $("#messages").append("<tr><td>" + message + "</td></tr>");
        }

        $(function () {
            $("form").on('submit', function (e) {
                e.preventDefault();
            });
            $( "#connect" ).click(function() { connect(); });
            $( "#disconnect" ).click(function() { disconnect(); });
            $( "#send" ).click(function() { sendChat(); });
        }); 

        connect();
        console.log('asdfsadffdsa')
    },[]);


    return (
        <div>
          {/* <form className="form-inline">
            <div className="form-group">
              <label htmlFor="connect">소켓을 연결하시오:</label>
              <button id="connect" className="btn btn-default" type="submit">Connect</button>
              <button id="disconnect" className="btn btn-default" type="submit" disabled="disabled">Disconnect</button>
            </div>
          </form> */}
{/*     
          <div className="form-group">
            <label htmlFor="roomNumber">채팅방 이름 넣어라:</label>
            <input type="text" id="roomNumber" className="form-control" placeholder="Chatroom number..." />
          </div>
          <div className="form-group">
            <label htmlFor="name">이름 넣어라:</label>
            <input type="text" id="name" className="form-control" placeholder="name .." />
          </div>
     */}
          <div className="rowchat">
            <div className="conversation">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>대화창</th>
                  </tr>
                </thead>
                {/* 메세지 */}
                <tbody id="messages">
                </tbody>
              </table>
            </div>
          </div>



          <form className="form-inline">
            <div className="chat-button" style={{borderRadius:'5px'}}>
              {/* <label htmlFor="chat">chat 쳐라</label> */}
                <input type="text" id="chat" className="form-control" placeholder="채팅 입력" />
                <button id="send" className="btn btn-default" type="submit">Send</button>
            </div>
          </form>
        </div>
      );
}

export default Chatting;