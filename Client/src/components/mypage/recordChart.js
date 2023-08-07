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

import { getData } from "./myprofile"; // 데이터 가져오기

// const data = getData(); // 데이터 가져오기
const data = [
    {
        name: "월",
        kcal: 2400,
    },
    {
        name: "화",
        kcal: 1398,

    },
    {
        name: "수",
        kcal: 9800,
        amt: 2290,
    },
    {
        name: "목",
        kcal: 3908,
        amt: 2000,
    },
    {
        name: "금",
        kcal: 4800,
        amt: 2181,
    },
    {
        name: "토",
        kcal: 3800,
        amt: 2500,
    },
    {
        name: "일",
        kcal: 4300,
        amt: 2100,
    },
];
export default class Example extends PureComponent {
    // static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

    render() {
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
