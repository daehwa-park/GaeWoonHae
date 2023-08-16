package com.threeracha.gaewoonhae.interceptor;

import com.threeracha.gaewoonhae.exception.CustomException;
import com.threeracha.gaewoonhae.exception.CustomExceptionList;
import com.threeracha.gaewoonhae.utils.jwt.AuthTokensGenerator;
import com.threeracha.gaewoonhae.utils.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthInterceptor implements HandlerInterceptor {

    private final AuthTokensGenerator authTokensGenerator;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (CorsUtils.isPreFlightRequest(request)) {
            return true;
        }

        if (request.getRequestURI().contains("gwh-websocket")) {
            return true;
        }

        String token = request.getHeader("token");
        if (token != null && authTokensGenerator.verifyToken(token)) {
            log.info("access confirmed");
            return true;
        }
        log.error("access denied");
        log.error(request.getRequestURI());
        throw new CustomException(CustomExceptionList.ACCESS_TOKEN_ERROR);
    }
}