package com.threeracha.gaewoonhae.api.controller;

import com.threeracha.gaewoonhae.api.dto.request.NicknameRequest;
import com.threeracha.gaewoonhae.api.dto.request.ResignUserRequest;
import com.threeracha.gaewoonhae.api.dto.response.CommonResponse;
import com.threeracha.gaewoonhae.api.dto.response.UserInfoResponse;
import com.threeracha.gaewoonhae.api.service.UserService;
import com.threeracha.gaewoonhae.db.domain.User;
import com.threeracha.gaewoonhae.exception.ExceptionResponse;
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
    final String SUCCESS = "success";

    @Operation(summary = "사용자 정보 조회", description = "파라미터로 받은 userId와 일치하는 사용자 정보를 전달.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = UserInfoResponse.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @Parameter(name = "userId", description = "조회할 사용자의 userId")
    @GetMapping("/userinfo/{userId}")
    public ResponseEntity<CommonResponse<UserInfoResponse>> getUserInfo (@PathVariable("userId") Long userId) {
        System.out.println("유저 조회 실행됨");
        User userInfo = userService.getUserInfo(userId);
        System.out.println(userInfo);
        return new ResponseEntity<>(
                makeCommonResponse(SUCCESS, new UserInfoResponse(userInfo)), HttpStatus.OK);
    }

    @Operation(summary = "사용자 닉네임 변경", description = "파라미터로 받은 userId에 해당하는 사용자의 닉네임을 파라미터 nickname으로 변경하고" +
            "변경한 닉네임을 반환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @PutMapping("/nickname")
    public ResponseEntity<CommonResponse<String>> changeNickname (@RequestBody NicknameRequest nicknameReq) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, userService.changeNickname(nicknameReq)), HttpStatus.OK);
    }

    @Operation(summary = "사용자 회원 탈퇴", description = "유저 Id와 직접 입력받은 닉네임, refresh 토큰을 비교하여 교차 검증 후 회원 정보를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "bad request operation", content = @Content(schema = @Schema(implementation = ExceptionResponse.class)))
    })
    @PostMapping("/resign")
    public ResponseEntity<CommonResponse<String>> resignUser(@RequestBody ResignUserRequest resignUserReq) {

        return new ResponseEntity<>(makeCommonResponse(SUCCESS, userService.removeUser(resignUserReq)), HttpStatus.OK);
    }

    private <T> CommonResponse<T> makeCommonResponse(String message, T data) {
        return CommonResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

}
