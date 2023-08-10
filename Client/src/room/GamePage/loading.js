import React from 'react';
// import {Background, LoadingText} from './Styles';
// import Spinner from './assets/spinner.gif';
import './loading.css'


const Loading =() => {

    return (
        <div className="loader-wrapper">
            <div className="truck-wrapper">
                <div className="truck">
                    <div className="truck-container"></div>
                    <div className="glases"></div>
                    <div className="bonet"></div>

                    <div className="base"></div>

                    <div className="base-aux"></div>
                    <div className="wheel-back"></div>
                    <div className="wheel-front"></div>

                    <div className="smoke"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading