package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.chat.Chat;
import com.threeracha.gaewoonhae.chat.Message;
import com.threeracha.gaewoonhae.chat.UserInfo;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class MessageController {
    @MessageMapping("/gameroom/{roomNumber}/gamefinish")
    @SendTo("/topic/gameroom/{roomNumber}/gamefinish")
    public Message userGameFinish(Chat message, StompHeaderAccessor session) throws Exception {
        return new Message(message.getChat());
    }
    @MessageMapping("/gameroom/{roomNumber}/gameinfo")
    @SendTo("/topic/gameroom/{roomNumber}/gameinfo")
    public UserInfo gameInfoUpdate(UserInfo userInfo, StompHeaderAccessor session) throws Exception {
        return userInfo;
    }

    @MessageMapping("/gameroom/{roomNumber}/gamestart")
    @SendTo("/topic/gameroom/{roomNumber}/gamestart")
    public Message gameStart(Chat message, StompHeaderAccessor session) throws Exception {
        return new Message(message.getChat());
    }

    @MessageMapping("/chatroom/{roomNumber}/alive")
    @SendTo("/topic/chatroom/{roomNumber}/aliveCheck")
    public Message checkAliveUser(Chat chat, StompHeaderAccessor session) throws Exception {
        return new Message((String) session.getSessionAttributes().get("name"));
    }

    @MessageMapping("/chatroom/{roomNumber}/refresh")
    @SendTo("/topic/chatroom/{roomNumber}/refresh")
    public List<UserInfo> userListRefresh(List<UserInfo> namelist, StompHeaderAccessor session) throws Exception {
        return namelist;
    }
    @MessageMapping("/chatroom/{roomNumber}/join")
    @SendTo("/topic/chatroom/{roomNumber}/host")
    public Message userListUpdate(Chat message, StompHeaderAccessor session) throws Exception {
        return new Message((String) session.getSessionAttributes().get("name"));
    }
    @MessageMapping("/chatroom/{roomNumber}/enter")
    @SendTo("/topic/chatroom/{roomNumber}/messages")
    public Message enter(Chat message, StompHeaderAccessor session) throws Exception {
        return new Message(HtmlUtils.htmlEscape(session.getSessionAttributes().get("name") + "님께서 입장하셨습니다!"));
    }
    @MessageMapping("/chatroom/{roomNumber}/exit")
    @SendTo("/topic/chatroom/{roomNumber}/messages")
    public Message exit(Chat message, StompHeaderAccessor session) throws Exception {
        return new Message(HtmlUtils.htmlEscape(session.getSessionAttributes().get("name") + "님께서 퇴장하셨습니다!"));
    }
    @MessageMapping("/chatroom/{roomNumber}/chat")
    @SendTo("/topic/chatroom/{roomNumber}/messages")
    public Message chat(Chat message, StompHeaderAccessor session) throws Exception {
        String senderName = session.getSessionAttributes().get("name").toString();
        return new Message(HtmlUtils.htmlEscape(senderName + " : " + message.getChat()));
    }

}
