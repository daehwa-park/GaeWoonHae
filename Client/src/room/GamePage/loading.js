import React from 'react';
// import {Background, LoadingText} from './Styles';
// import Spinner from './assets/spinner.gif';
import './loading.css'


const Loading =() => {

    return (
        <div class="loader-wrapper">
            <div class="truck-wrapper">
                <div class="truck">
                    <div class="truck-container"></div>
                    <div class="glases"></div>
                    <div class="bonet"></div>

                    <div class="base"></div>

                    <div class="base-aux"></div>
                    <div class="wheel-back"></div>
                    <div class="wheel-front"></div>

                    <div class="smoke"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading