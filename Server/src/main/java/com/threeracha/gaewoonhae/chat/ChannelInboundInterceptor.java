package com.threeracha.gaewoonhae.chat;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class ChannelInboundInterceptor implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor header = StompHeaderAccessor.wrap(message);
        if (StompCommand.CONNECT.equals(header.getCommand())) {
            //connect라면 name값을 꺼내서 sessionAttributes에 넣기.
            Map<String, Object> attributes = header.getSessionAttributes();
            attributes.put("name", header.getFirstNativeHeader("name"));
            attributes.put("roomNumber", header.getFirstNativeHeader("roomNumber"));
            header.setSessionAttributes(attributes);
        }
        return message;
    }
}