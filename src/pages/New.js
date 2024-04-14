import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiraryDispatchContext } from '../App';
import Button from '../component/Button';
import Editor from '../component/Editor';
import Header from '../component/Header';
import { setPageTitle } from '../util';

const New = () => {

    const navigate = useNavigate();
    const { onCreate } = useContext(DiraryDispatchContext);
    //구조 분해 할당을 통해 제공되는 함수 객체 중 onCreate만 꺼냄

    const onSubmit = (data) => {
        const { date, content, emotionId } = data;
        onCreate(date, content, emotionId);
        navigate("/", { replace: true });
    }

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        setPageTitle("새 일기 작성하기");
    }, [])

    return (
        <div>
            <Header title={'새 일기 쓰기'} leftChild={<Button text={'< 뒤로가기'} onClick={goBack} />} />
            <Editor onSubmit={onSubmit} />
        </div>
    )
}

export default New;