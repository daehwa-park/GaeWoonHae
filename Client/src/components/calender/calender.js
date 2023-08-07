import React from "react";
import { motion } from "framer-motion";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko';
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';

const Calender = ({ startDate, chosenDates }) => {
    registerLocale("ko", ko); //한국어 설정

    const formatDate = (d) => { //달력 년, 월, 일 header 
        const date = new Date(d);
        const monthIndex = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="">
            <DatePicker
                //selected={startDate}
                highlightDates={[...chosenDates]}
                disabledKeyboardNavigation //다른 월의 같은 날짜시 자동 selected 되는 현상 방지
                locale="ko"
                inline
                maxDate={new Date()}
                popperModifiers={{ //화면을 벗어나지 않도록 하는 설정 
                    preventOverflow: { enabled: true }
                }}
                popperPlacement="auto" //화면 중앙에 팝업이 출현
                renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => ( //header 커스텀 설정
                    <div>
                        <div onClick={decreaseMonth}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <div>{formatDate(date)}</div>
                        <div onClick={dayjs(date).format('YY-MM') >= dayjs(new Date()).format('YY-MM') ? null : increaseMonth}>
                            {dayjs(date).format('YY-MM') >= dayjs(new Date()).format('YY-MM') ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ddd">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>}
                        </div>
                    </div>)}
            />
        </motion.div >
    );
};

export default Calender;
