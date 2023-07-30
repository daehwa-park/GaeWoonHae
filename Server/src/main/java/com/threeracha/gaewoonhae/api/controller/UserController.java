package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.NicknameRequest;
import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.UserInfoResponse;
import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.domain.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "사용자관리 API", description = "사용자 정보 조회와 닉네임 변경")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    static final String SUCCESS = "success";

    @Operation(summary = "사용자 정보 조회", description = "파라미터로 받은 userId와 일치하는 사용자 정보를 전달.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = UserInfoResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = UserInfoResponse.class)))
    })
    @Parameter(name = "userId", description = "조회할 사용자의 userId")
    @GetMapping("/userinfo/{userId}")
    public ResponseEntity<CommonResponse<UserInfoResponse>> getUserInfo (@PathVariable("userId") Long userId) {

        User userInfo = userService.getUserInfo(userId);

        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, new UserInfoResponse(userInfo)), HttpStatus.OK);
    }

    @Operation(summary = "사용자 닉네임 변경", description = "파라미터로 받은 userId에 해당하는 사용자의 닉네임을 파라미터 nickname으로 변경하고" +
            "변경한 닉네임을 반환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = UserInfoResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = UserInfoResponse.class)))
    })
    @Parameter(name = "userId", description = "조회할 사용자의 userId")
    @PutMapping("/nickname")
    public ResponseEntity<CommonResponse<String>> changeNickname (@RequestBody NicknameRequest nicknameReq) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, userService.changeNickname(nicknameReq)), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
