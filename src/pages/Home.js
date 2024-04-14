import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import { getMonthRangeByDate, setPageTitle } from '../util';
import Button from '../component/Button';
import DiaryList from '../component/DiaryList';
import Header from '../component/Header';

const Home = () => {
    /*
    쿼리 스트링은 url다음에 ? 로 구분하므로 페이지 라우팅을 위한 별도의 설정 필요 없음.
    useSearchParams 훅을 통해 url에 있는 쿼리 스트링 값을 꺼내 사용할 수 있음.
    useState처럼 배열 형태로 값을 반환하고, 반환 값의 첫번째 요소는 조회, 수정이 가능한 메서드를
    포함하고 있는 쿼리 스트링 객체, 두번째 요소는 이 객체를 업데이트 하는 함수임.
    */
    // const [params, setParams] = useSearchParams();
    // console.log(params.get("value"));

    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredDate, setFilteredDate] = useState([]);

    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    useEffect(() => {
        //인수로 전달되는 의존성 배열에 data와 pivotData를 전달하여 일기 데이터가 바뀌거나 
        //Home 컴포넌트에서 현재 조회중인 날짜가 변경되면 첫 번째 인수로 전달한 콜백함수 다시 수행함.
        if (data.length >= 1) { //data.length가 1 이상이 아니면 등록할 일기 없는 것이므로 filteredData의 값을 빈 배열로 업데이트함
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredDate(
                data.filter(
                    (item) => beginTimeStamp <= item.date && item.date <= endTimeStamp
                )
            );
        } else {
            setFilteredDate([]);
        }
    }, [data, pivotDate]);

    useEffect(() => {
        setPageTitle("감성 일기장");
    }, [])

    return (
        // <div>
        //     <Editor
        //         initDate={{
        //             date: new Date().getTime(),
        //             // 현재 날짜를 타임 스탬프 값으로 전달함. 추후 월 단위로 일기 보여줄 때 날짜 비교 연산을 수월하게 하기 위함
        //             emotionId: 1,
        //             content: "이전에 작성했던 일기",
        //         }}
        //         onSubmit={() => { alert("작성 완료"); }}
        //     />
        // </div>

        <div>
            <Header
                title={headerTitle}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
                rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
            />
            <DiaryList data={filteredDate} />
        </div>
    );
};

export default Home;

