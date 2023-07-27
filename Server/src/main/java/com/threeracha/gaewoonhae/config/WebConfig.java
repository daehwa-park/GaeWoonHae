package com.threeracha.gaewoonhae.config;

import com.threeracha.gaewoonhae.interceptor.AuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("OPTIONS","GET","POST","PUT","DELETE");
    }

//    @Override
//    public void addInterceptors(InterceptorRegistry interceptorRegistry) {
//
//        interceptorRegistry.addInterceptor(authInterceptor)
//                            .addPathPatterns("/**")
//                            .excludePathPatterns("/api/oauth/login/**");
//    }
}