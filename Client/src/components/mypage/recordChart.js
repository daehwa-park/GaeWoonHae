// 칼로리 차트관리

import React, { PureComponent } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// import { getData } from "./myprofile"; // 데이터 가져오기

export default class Example extends PureComponent {
    // static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

    render() {
        const data = this.props.data; 
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="kcal"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
