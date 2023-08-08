import React, { Component, useEffect, useState } from 'react';

const CommonUI = ({props}) => {

    const count = props.count;
    const timer = props.timer;
    const userList = props.userList;
    
    const [sortedUserList, setSortedUserList] = useState([]);



    useEffect(() => {
        if (userList) {

            let users = userList.sort((a, b) => (b.count - a.count));

            setSortedUserList(users);
        }
    }, [userList])





    return(
        <div>
            <div>
                My count : {count}
            </div>
            <div>
                timer : {timer}
            </div>
            {userList.map((user) => (
                <div>
                    <div>NickName : {user.username}</div>
                    <div>count : {user.count}</div>
                </div>
            ))}
        </div>
    );

}

export default CommonUI;