import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { emotionLiist, getFormattedDate } from '../util';
import Button from './Button';
import './Editor.css';
import EmotionItem from './EmotionItem';

//initDate는 Edit 페이지에서 사용할 때 기존에 작성한 일기를 페이지에 보여줄 목적
//onSubmit은 일기를 모두 작성하고 <작성완료>버튼을 클릭했을 때 호출할 이벤트 핸들러
const Editor = ({ initDate, onSubmit }) => {

    //state의 초깃값을 설정하기 위해 date, emotionId, content를 프로퍼티로 하는 객체 생성
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });

    const navigate = useNavigate();

    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    const handleSubmit = () => {
        onSubmit(state);
    };

    const handleOnGoBack = () => {
        navigate(-1);
    };

    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId,
        }));
    }, []);

    useEffect(() => {
        if (initDate) {
            setState({
                ...initDate,
                date: getFormattedDate(new Date(parseInt(initDate.date))),
            });
        }
    }, [initDate]);

    return (
        <div className='Editor'>
            <div className='editor_section'>
                {/*날짜*/}
                <h4>오늘의 날짜</h4>
                <div className='input_wrapper'>
                    <input type='date' value={state.date} onChange={handleChangeDate} />
                </div>
            </div>
            <div className='editor_section'>
                {/*감정*/}
                <h4>오늘의 감정</h4>
                <div className='input_wrapper emotion_list_wrapper'>
                    {emotionLiist.map((item) => (
                        <EmotionItem key={item.id} {...item} onClick={handleChangeEmotion} isSelected={state.emotionId === item.id} />
                    ))}
                </div>
            </div>
            <div className='editor_section'>
                {/*일기*/}
                <h4>오늘의 일기</h4>
                <div className='input_Wrapper'>
                    <textarea
                        placeholder='오늘은 어땠나요?'
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>
            <div className='editor_section button_section'>
                {/*작성 완료, 취소*/}
                <Button text={'취소하기'} onClick={handleOnGoBack} />
                <Button text={'작성완료'} type={'positive'} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Editor