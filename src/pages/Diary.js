import { useNavigate, useParams } from 'react-router-dom';
import Button from '../component/Button';
import Header from '../component/Header';
import useDiary from '../hooks/useDiary';
import { getFormattedDate, setPageTitle } from '../util';
import Viewer from '../component/Viewer';
import { useEffect } from 'react';

const Diary = () => {

    const { id } = useParams();
    //useParams 훅은 브라우저에서 URL을 입력하면 이 경로에 포함된 URL 파라미터를 객체 형태로 반환함
    // console.log(params); //현재 경로의 URL 파라미터를 콘솔에 출력

    const data = useDiary(id)
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    useEffect(() => {
        setPageTitle(`${id}번 일기`)
    }, [])

    if (!data) {
        return <div>일기를 불러오고 있습니다...</div>;
    } else {
        const { date, emotionId, content } = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
        return (
            <div>
                <Header
                    title={title}
                    leftChild={<Button text={'< 뒤로가기'} onClick={goBack} />}
                    rightChild={<Button text={'수정하기'} onClick={goEdit} />}
                />
                <Viewer content={content} emotionId={emotionId} />
            </div>
        );
    }
};

export default Diary;