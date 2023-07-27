package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.chat.Chat;
import com.threeracha.gaewoonhae.chat.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class MessageController {
    @MessageMapping("/chatroom/{roomNumber}/enter")
    @SendTo("/topic/chatroom/{roomNumber}/messages")
    public Message enter(Chat message, StompHeaderAccessor session) throws Exception {
        System.out.println("누가 들어왔음");
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
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date now = new Date();
        String currentTime = format.format(now);
        String roomNumber = session.getSessionAttributes().get("roomNumber").toString();
        String senderName = session.getSessionAttributes().get("name").toString();
        return new Message(HtmlUtils.htmlEscape("[" + roomNumber + "] " + senderName + " : " + message.getChat() + " [" + currentTime + "]"));
    }


}