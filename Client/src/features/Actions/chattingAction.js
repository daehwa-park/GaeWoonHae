
// Api요청 => 채팅(stomp)클라이언트 요청,
//                (getStompClient)

import $ from "jquery";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { roomActions } from "../../redux/reducer/roomInfoReducer";
import { enterRoomAction } from "./enterRoomAction";
function getStompClient(
  setModalOpen,
  hostName,
  sessionId,
  myName,
  setUserList,
  updateUser,
  navigate,
  gameType,
  limitTime,
  userId,
) {
  return async (dispatch, getState) => {
    window.addEventListener('beforeunload',  function (event) {
      // 특정 함수 실행
      // 사용자에게 경고 메시지 표시 (옵션)
      
      checkAliveUser();
      event.returnValue = '변경 사항이 저장되지 않을 수 있습니다.';
    });
    console.log("호스트명", hostName);
    console.log("세션ID", sessionId);
    console.log("내이름", myName);
    var stompClient = null;
    var userList = [];
    // redux에서 가져오는 hostName

    // 카메라 끝
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
          "/topic/gameroom/" + sessionId + "/gamestart",
          async function (message) {
            const ParsedMessage = JSON.parse(message.body);
            const limitTime = ParsedMessage.content;
            console.log("현재 제한시간", limitTime);
            await dispatch(
              roomActions.getGameUserList({
                userList,
              })
            );
            await dispatch(
              roomActions.getLimitTime({
                limitTime,
              })
            );
            console.log("다음 페이지로 넘아감");
            console.log("제한시간 확인", limitTime);
            await navigate(`/gamepage`);
            // 게임 시작 페이지로 이동함.
          } // 구독한 곳으로 메세지가 오면 펑션 메세지가 실행 된다.
        );
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
          async function (message) {
            // 방장이라면 nameList를 갱신하고 /refresh 채널로 보낸다. 여기에 if(방장)
            if (myName === hostName) {
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
              updateUser(userList);
              setUserList(userList);

              console.log(JSON.stringify(userList, null, 2));
            }
          }
        );

        stompClient.subscribe(
          "/topic/chatroom/" + sessionId + "/refresh",
          function (message) {
            // 방장이 아니라면 갱신해버림
            if (myName !== hostName) {
              userList = JSON.parse(message.body);

              console.log(
                JSON.stringify(userList, null, 2) + "이건 갱신된 요청입니다."
              );
            }
            updateUser(userList);
            setUserList(userList);
            showUserInfo(userList);
          }
        );

        stompClient.subscribe(
          "/topic/chatroom/" + sessionId + "/aliveCheck",
          async function (message) {
            // 방장이 아니라면 갱신해버림
            if (myName === hostName) {
              const updateUserList = userList.filter((user) => {
                return user.username !== JSON.parse(message.body).content; // 특정 조건을 만족하지 않는 경우만 반환
              });
                userList = updateUserList;
                updateUser(userList);
                stompClient.send(
                  "/app/chatroom/" + sessionId + "/refresh",
                  {},
                  JSON.stringify(userList)
                  
                );
                stompClient.send(
                  "/topic/chatroom/" + sessionId + "/messages",
                  {},
                  JSON.stringify({content : JSON.parse(message.body).content+"님이 퇴장하셨습니다!"})
                  
                );
            }
            else {
              // to 준영이형 if문 안에 로비 페이지로 이동.
              if(JSON.parse(message.body).content===hostName) {
                stompClient.disconnect();
                // window.alert("방장이 나가서 방이 사라졌습니다.");
                setModalOpen(true);
                // await navigate(`/main`);
              }
            } 
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

    function sendChat() {
      stompClient.send(
        "/app/chatroom/" + sessionId + "/chat",
        {},
        JSON.stringify({ chat: $("#chat").val() })
      );
    }

    const startedGame = async () => {
      const requestData = {
        sessionId,
        gameType: gameType,
      };
      await dispatch(enterRoomAction.startedRoom(requestData));
    };

    const leaveLobby = async () => {
      console.log(userId);
      const requestData = {
        // userId 수정해야 함. 받아오는 값으로
        userId,
        sessionId,
      };
      await dispatch(enterRoomAction.leaveRoom(requestData));
    };

    const arriveLobby = async () => {
      const requestData = {
        sessionId,
      };
      await dispatch(enterRoomAction.arriveRoom(requestData));
    };
    
    function checkAliveUser() {
      leaveLobby();
      stompClient.send(
        "/app/chatroom/" + sessionId + "/alive",
        {},
        JSON.stringify({})
      );
       stompClient.disconnect();
      
    }

    function gameStart() {
      const currentLimitTime = getState().roomInfo.limitTime;
      if (userList.length >= 1) {
        stompClient.send(
          "/app/gameroom/" + sessionId + "/gamestart",
          {},
          JSON.stringify({chat: currentLimitTime})
        );
        startedGame();
      } else {
        console.log("방에 사람이 다 안찼어요");
      }
    }

    function showMessage(message) {
      let sender, content;
      let messageClass = "message-other";
        
      var chatBox = document.getElementById("messages");
      chatBox.scrollTop = chatBox.scrollHeight;
      // 메시지에 ':'가 있는 경우
      if (message.includes(":")) {
        [sender, content] = message.split(":");

        if (sender.trim() === myName) {
          messageClass = "message-own";
          $("#messages").append(
            `<tr><td class="message ${messageClass}" style="background-color:purple; color:white">` +
              content +
              "</td></tr>"
          );
        } else {
          $("#messages").append(
              "<tr>"+`<td class="message ${messageClass}" style="background-color:#77838F; color:black">` +
            `${sender} :` + content +
              "</td></tr>"
          );
    }
  } else {
    // 메시지에 ':'가 없는 경우
    content = message;
    $("#messages").append(
      "<tr><td class='welcome-ms' style='text-align: center; line-height: 4vh;'>" + content + "</td></tr>"
    );
  }

  // $("#messages").append(
  //   `<tr><td class="message ${messageClass}">` + content + "</td></tr>"
  // );
}

    async function showUserInfo(namelist) {
      var resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      // namelist 배열을 반복하여 결과를 <div> 태그에 출력
      await namelist.forEach(function (item) {
        var div = document.createElement("div");
        div.textContent =
          "사용자 이름: " + item.username + ", 카운트: " + item.count;
        resultDiv.appendChild(div);
      });
      updateUser(userList);
    }

    $(function () {
      $("form").on("submit", function (e) {
        e.preventDefault();
      });
      $("#connect").click(function () {
        connect();
        updateUser(userList);
      });
      $("#send").click(function () {
        sendChat();
        leaveLobby();
      });
      $("#gameStart").click(function () {
        gameStart();
      });
    });

    await connect();
    updateUser(userList);
    arriveLobby();
  };
}

export const chattingAction = { getStompClient };