import $ from "jquery";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { roomActions } from "../../redux/reducer/roomInfoReducer";

function getStompClient(hostName, sessionId, myName, setUserList) {
  return async (dispatch, getState) => {
    console.log("채팅 실행중", hostName);
    console.log("세션채팅", sessionId);
    console.log("채팅 내 닉넴", myName);
    var stompClient = null;
    var userList = [];
    // redux에서 가져오는 hostName

    async function connect() {
      var socket = new SockJS("/gwh-websocket");
      stompClient = Stomp.over(socket);
      var headers = {
        name: myName,
        roomNumber: sessionId,
      };
      stompClient.connect(headers, function (frame) {
        // 서버연결시도
        // setConnected(true);
        stompClient.subscribe(
          // 채팅방 채널 구독
          "/topic/chatroom/" + sessionId + "/messages",
          function (message) {
            showMessage(JSON.parse(message.body).content);
          } // 구독한 곳으로 메세지가 오면 펑션 메세지가 실행 된다.
        );

        // 구독하지 않은 채널은 아예 메시지 전달이 안되므로 모든 클라이언트가 /host 와 /refresh를 구독해야함
        stompClient.subscribe(
          "/topic/chatroom/" + sessionId + "/host",
          function (message) {
            // 방장이라면 nameList를 갱신하고 /refresh 채널로 보낸다. 여기에 if(방장)
            if (myName !== hostName) {
              userList.push({
                username: JSON.parse(message.body).content,
                count: 0,
              });
              // 상위 컴포넌트의 userList에 이 값을 추가
              stompClient.send(
                "/app/chatroom/" + sessionId + "/refresh",
                {},
                JSON.stringify(userList)
              );
              console.log(JSON.stringify(userList, null, 2));
            }
          }
        );

        stompClient.subscribe(
          "/topic/chatroom/" + sessionId + "/refresh",
          function (message) {
            // 방장이 아니라면 갱신해버림
            if (myName !== "hostName") {
              userList = JSON.parse(message.body);

              console.log(
                JSON.stringify(userList, null, 2) + "이건 갱신된 요청입니다."
              );
            }

            showUserInfo(userList);
          }
        );

        stompClient.send(
          "/app/chatroom/" + sessionId + "/enter",
          {},
          JSON.stringify({})
        );
        stompClient.send(
          "/app/chatroom/" + sessionId + "/join",
          {},
          JSON.stringify({})
        );
      });
    }

    function disconnect() {
      if (stompClient !== null) {
        exit();
        stompClient.disconnect();
      }
      //   setConnected(false);
      console.log("Disconnected");
    }

    function sendChat() {
      console.log(stompClient);
      stompClient.send(
        "/app/chatroom/" + sessionId + "/chat",
        {},
        JSON.stringify({ chat: $("#chat").val() })
      );
      dispatch(roomActions.getGameInfo({ stompClient }));
    }

    function exit() {
      stompClient.send(
        "/app/chatroom/" + sessionId + "/exit",
        {},
        JSON.stringify({})
      );
    }

    function showMessage(message) {
      $("#messages").append("<tr><td>" + message + "</td></tr>");
    }

    function showUserInfo(namelist) {
      var resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      // namelist 배열을 반복하여 결과를 <div> 태그에 출력
      namelist.forEach(function (item) {
        var div = document.createElement("div");
        div.textContent =
          "사용자 이름: " + item.username + ", 카운트: " + item.count;
        resultDiv.appendChild(div);
      });
    }

    $(function () {
      $("form").on("submit", function (e) {
        e.preventDefault();
      });
      $("#connect").click(function () {
        connect();
      });
      $("#disconnect").click(function () {
        disconnect();
      });
      $("#send").click(function () {
        sendChat();
      });
    });

    await connect();
    await setUserList(userList);
  };
}

export const chattingAction = { getStompClient };
