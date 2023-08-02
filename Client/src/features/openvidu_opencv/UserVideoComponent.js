// openvidu 영상 송출 컴포넌트 
// => 유저 이름 정보  , 비디오 컴포넌트

import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        {/* <div><p>{this.getNicknameTag()}</p></div> */}
                    </div>
                ) : null}
            </div>
        );
    }
}
