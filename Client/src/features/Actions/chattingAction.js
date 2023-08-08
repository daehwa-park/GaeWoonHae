// 채팅기능

// Api요청 => 채팅(stomp)클라이언트 요청,         
//                (getStompClient)   

import $ from "jquery";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { roomActions } from "../../redux/reducer/roomInfoReducer";

function getStompClient(
  hostName,
  sessionId,
  myName,
  setUserList,
  navigate,
  gameType,
) {
  return async (dispatch, getState) => {
    console.log("호스트명", hostName);
    console.log("세션ID", sessionId);
    console.log("내이름", myName);
    var stompClient = null;
    var userList = [];
    // redux에서 가져오는 hostName
    // 카메라 시작
    const video = document.getElementById("videoElement");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // 비디오 스트림 가져오기
    async function startVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        video.srcObject = stream;
      } catch (err) {
        console.error("비디오 스트림을 가져오는데 실패하였습니다.", err);
      }
    }

    // 비디오 스트림에서 프레임을 캔버스에 렌더링하는 함수
    function drawCanvas() {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 웹캠 필터 - 그레이스케일 필터 적용
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        const average = (red + green + blue) / 3;

        data[i] = data[i + 1] = data[i + 2] = average;
      }

      ctx.putImageData(imageData, 0, 0);

      requestAnimationFrame(drawCanvas);
    }
    function wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    (async () => {
      await startVideo();
      await wait(10);
    })();

    // 비디오 캡처 후 실시간 렌더링
    video.addEventListener("play", drawCanvas);

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
            await dispatch(
              roomActions.getGameUserList({
                userList,
              })
            )
            console.log("다음 페이지로 넘아감");
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
          function (message) {
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
            setUserList(userList);
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
        // exit();
        stompClient.disconnect();
      }

      console.log("Disconnected");
    }

    function sendChat() {
      console.log(stompClient);
      stompClient.send(
        "/app/chatroom/" + sessionId + "/chat",
        {},
        JSON.stringify({ chat: $("#chat").val() })
      );
    }

    function gameStart() {
      if(userList.length>=1) {
        

      stompClient.send(
        "/app/gameroom/" + sessionId + "/gamestart",
        {},
        JSON.stringify({})
      );}
      else {
        console.log("방에 사람이 다 안찼어요");
      }
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
      $("#gameStart").click(function () {
        gameStart();
      });
    });

      await connect();
      await setUserList(userList);
  };
}

export const chattingAction = { getStompClient };
