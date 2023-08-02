// 채팅 기능

import React, {useEffect} from "react";
import $ from "jquery";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./Chatting.css"
const Chatting = () => {

useEffect(()=> {
    var stompClient = null;
    var namelist=[];
    var host="두현";
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
            
            // 구독하지 않은 채널은 아예 메시지 전달이 안되므로 모든 클라이언트가 /host 와 /refresh를 구독해야함
            stompClient.subscribe('/topic/chatroom/' + roomNumber + '/host', function (message) {
            // 방장이라면 nameList를 갱신하고 /refresh 채널로 보낸다. 여기에 if(방장) 
             if(randomName===host) {namelist.push({ username: JSON.parse(message.body).content, count: 0 });
              stompClient.send("/app/chatroom/" + roomNumber + "/refresh", {}, JSON.stringify(namelist));
              console.log(JSON.stringify(namelist, null, 2));
             }
            });

            stompClient.subscribe('/topic/chatroom/' + roomNumber + '/refresh', function (message) {
              
              // 방장이 아니라면 갱신해버림
              if(randomName!==host) { namelist = JSON.parse(message.body);
            
              console.log(JSON.stringify(namelist, null, 2)+"이건 갱신된 요청입니다."); }
              showUserInfo(namelist);  
            });
          
            stompClient.send("/app/chatroom/" + roomNumber + "/enter", {}, JSON.stringify({}));
            stompClient.send("/app/chatroom/" + roomNumber + "/join", {}, JSON.stringify({}));
            
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
    console.log('asdfsadffdsa')
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