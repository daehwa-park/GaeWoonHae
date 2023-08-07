// 게임 정보 통신 기능

import React, {useEffect} from "react";
import $ from "jquery";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./Chatting.css"
const Chatting = () => {

useEffect(()=> {
    var stompClient = null;
    var namelist=[];

    // redux에서 가져오는 hostName
    var host="두현";

    // redux에서 가져오는 user 객체의 Nickname
    var userName="두현";

    // redux에서 가져오는 sessionId
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
        var socket = new SockJS('/gwh-websocket');
        stompClient = Stomp.over(socket);
        var headers = {
            name: userName,
            roomNumber: roomname
        };
        var roomNumber = roomname; // 채팅방 번호를 입력 받습니다. // "SessionA" <=> "#roomNumber"
        // var roomNumber = $("#roomNumber").val(); // 채팅방 번호를 입력 받습니다. // "SessionA" <=> "#roomNumber"
        stompClient.connect(headers, function (frame) {  // 서버연결시도

            setConnected(true);
            // 구독하지 않은 채널은 아예 메시지 전달이 안되므로 모든 클라이언트가 /host 와 /refresh를 구독해야함
            stompClient.subscribe('/topic/chatroom/' + roomname + '/host', function (message) {

            // 방장이라면 nameList를 갱신하고 /refresh 채널로 보낸다. 여기에 if(방장) 
             if(randomName===host) {namelist.push({ username: JSON.parse(message.body).content, count: 0 });
              stompClient.send("/app/chatroom/" + roomname + "/refresh", {}, JSON.stringify(namelist));
              console.log(JSON.stringify(namelist, null, 2));
             }
            });

            stompClient.subscribe('/topic/chatroom/' + roomname + '/refresh', function (message) {
              
              // 방장이 아니라면 갱신해버림
              if(randomName!==host) { namelist = JSON.parse(message.body); }

              showUserInfo(namelist);  
            });

            stompClient.send("/app/chatroom/" + roomname + "/join", {}, JSON.stringify({}));
            
          });
    }

    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    }


    function showUserInfo(namelist) {
      var resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '';

      // namelist 배열을 반복하여 결과를 <div> 태그에 출력
      namelist.forEach(function(item) {
          var div = document.createElement('div');
          div.textContent = '사용자 이름: ' + item.username + ', 카운트: ' + item.count;
          resultDiv.appendChild(div);
      });
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
},[]);


return (
    <div>
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
        <div id="result">
         
        </div>
      </form>
    </div>
  );
}

export default Chatting;