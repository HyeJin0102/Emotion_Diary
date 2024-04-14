import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiraryDispatchContext } from '../App';
import Button from '../component/Button';
import Editor from '../component/Editor';
import Header from '../component/Header';
import useDiary from '../hooks/useDiary';
import { setPageTitle } from '../util';

const Edit = () => {

  const { onDelete, onUpdate } = useContext(DiraryDispatchContext);
  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시는 복구되지 않아요!")) {
      //window.confirm은 사용자에게 인수로 전달한 텍스트와 함께 경고 대화상자를 출력하는 브라우저 메서드
      onDelete(id);
      navigate("/", { replace: true });
    }
  }

  const onSubmit = (data) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      const { date, content, emotionId } = data;
      onUpdate(id, date, content, emotionId);
      navigate("/", { replace: true });
    }
  };

  const { id } = useParams();
  const data = useDiary(id);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setPageTitle(`${id}번 일기 수정하기`)
  }, [])

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>;
  } else {
    return (
      <div>
        <Header
          title={'일기 수정하기'}
          leftChild={<Button text={'< 뒤로가기'} onClick={goBack} />}
          rightChild={<Button type={'negative'} text={'삭제하기'} onClick={onClickDelete} />}
        />
        <Editor initDate={data} onSubmit={onSubmit} />
      </div>
    )
  }
}

export default Edit