import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

/*
    사용자 정의 훅
    리엑트 훅은 컴포넌트를 위해 제공되는 기능으로 컴포넌트가 아닌 일반 함수에서 사용하면 오류 발생함.
    
    사용자 정의 훅(커스텀 훅)은 프로그래머가 직접 만들어 사용하는 훅으로 일반 자바스크립트 함수가 아니기 때문에
    다른 리액트 훅을 불러올 수 있음. 이때 함수 이름은 훅이란걸 명시하기 위해 'use' 접두사 필요함.
    사용자 정의 훅에서 State의 업데이트가 발생하면 해당 훅을 호출한 컴포넌트도 리렌더 됨.

    사용자 정의 훅은 자신을 호출한 컴포넌트의 라이프 사이클을 따르며,
    여러 컴포넌트에서 동일하게 사용하는 기능을 별도 파일로 분리할 수 있어 중복 코드를 줄이고 재사용성 높혀줌.
*/
const useDiary = (id) => {

    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const matchDiary = data.find((item) => String(item.id) === String(id));
        if (matchDiary) {
            setDiary(matchDiary);
        } else {
            alert("일기가 존재하지 않습니다.");
            navigate("/", { replace: true });
            //replace:true로 인해 페이지를 이동한 후 다시 돌아올 수 없도록 뒤로 가기 아이콘이 비활성화 됨
        }
    }, [id, data]);
    return diary;
}

export default useDiary;