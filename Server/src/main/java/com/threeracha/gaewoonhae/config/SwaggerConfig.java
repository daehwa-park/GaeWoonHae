package com.threeracha.gaewoonhae.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/*
 * Swagger Address
 * http://localhost:5000/swagger-ui/index.html#/%EC%82%AC%EC%9A%A9%EC%9E%90%EA%B4%80%EB%A6%AC%20API/userInfo
 */

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("GWH project swagger")
                .description("여러분들의 무궁한 테스트를 위한 swagger 페이지입니다^^")
                .version("1.0.0");
    }
}