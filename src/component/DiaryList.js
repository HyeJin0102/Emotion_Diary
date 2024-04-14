import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import DiaryItem from './DiaryItem'
import "./DiaryList.css"

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldesr", name: "오래된 순" },
]

const DiaryList = ({ data }) => {

    const [sortType, setSortType] = useState("latest");
    const [sortedDate, setSortedDate] = useState([]);
    const navigate = useNavigate();

    //의존성 배열에의해 일기 데이터나 정렬 기준 변경되면 첫번째 인수인 콜백 함수 다시 실행함.
    useEffect(() => {
        //객체 형태인 data를 최신순 또는 오래된 순으로 정렬하기 위해 만든 별도의 비교 함수
        //sortType이 latest라면 최신순으로 정렬해야 하므로 일기 객체의 date를 내림차순으로 정렬.
        //이때 date값이 문자열이므로 Number 메서드를 이용해 명시적으로 형 변환 후 정렬함.
        const compare = (a, b) => {
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        };
        /*
        sort의 경우 원본 배열을 정렬하므로 정렬 결과를 별도의 배열로 만들어줘야함.
        JSON.parse, JSON.stringify를 통해 동일한 요소로 배열을 복사해 copyList에 저장함
        JSON.stringify : 인수로 전달한 객체를 문자열로 변환하는 함수
        JSON.parse : 문자열로 변환한 값을 다시 객체로 복구하는 함수
        즉, 객체를 JSON.stringify로 문자열로 변환 후 JSON.parse로 복구하면 값은 같지만 참조값이 다른 객체를 만듦.
        */
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare); //정렬의 기준이 되는 인수로 비교함수 compare을 전달함
        setSortedDate(copyList);
    }, [data, sortType])

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };
    const onClickNew = (e) => {
        navigate("/new");
    };

    return (
        <div className="DiaryList">
            <div className='menu_wrapper'>
                <div className='left_col'>
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((item, idx) => (
                            <option key={idx} value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className='right_col'>
                    <Button type={'positive'} text={'새 일기 쓰기'} onClick={onClickNew} />
                </div>
            </div>
            <div className='list_wrapper'>
                {sortedDate.map((item) => (<DiaryItem key={item.id} {...item} />)
                )}
            </div>
        </div>
    )
}

export default DiaryList