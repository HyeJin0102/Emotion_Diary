import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';
import New from './pages/New';
import Notfound from './pages/Notfound';

/*
  컴포넌트는 함수이기 때문에 state 업데이트, 부모 컴포넌트의 리렌더 등의 이유로 다시 호출될 수 있음.
  별도로 useCallback, useMemo를 적용하지 않는 이상 함수 내부에 선언되 함수와 값은 다시 생성됨.
  따라서 컴포넌트의 라이프 사이클과 관련 없고, 컴포넌트가 리렌더할 때 다시 생성할 필요
  없는 값이나 함수는 컴포넌트 외부에 선언해야 불필요한 연산 줄일 수 있음.
 */
const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
  },
]


/**
   * 웹 스토리지
  웹 브라우저가 제공하는 데이터 베이스로 사용자의 pc를 활용해 데이터를 저장하는 HTML5의 기능 중 하나.
  쿠키 기능과 유사하지만 쿠키보다 더 큰 5MB의 데이터 저장 가능
  자바스크립트 객체처럼 키(key)와 값(value)의 쌍으로 이루어진 데이터를 저ㅏㅇ하며, 데이터의 유효기간 따로 없음.
  -로컬 스토리지
    별도의 라이브러리 없이 window 객체 이용. window.localStorage 명령 사용하며, 로컬 스토리지에 저장된 데이터는 브라우저 종료해도 유지됨.
    즉, 직접 삭제하지 않는 한, 저장된 데이터는 반영구적으로 보관 가능함.
    도메인별로 로컬 스토리지를 만들 수 있으며, 메인 주소만 같으면 어디서든 같은 로컬 스토리지 사용 가능(주소 다르면 해당 도메인의 로컬 스토리지 접근 불가)
  -세션 스토리지
    별도의 라이브러리 없이 window 객체 이용. window.sessionStorage 명령 이용하며 탭 단위로 데이터를 보관하여 탭 종료시 데이터 삭제됨.
    브라우저 종료시 세션 스토리지에 보관된 데이터 모두 삭제됨. 새로고침 발생해도 탭 종료하지 않는 한 데이터 보관됨.
    보통 사용자의 인증 정보나 입력 폼에 입력한 데이터를 보관할 때 사용함.
    --사용법 (로컬, 세션 모두 동일)
    --데이터 생성/수정
      setItem 호출 후 key와 value를 전달. 이때 key는 반드시 문자열이여야 하며, 값 역시 문자열이여야 함. value가 참조형 객체라면 JSON.stringify 이용해 객체를 문자열로 변환하는 메서드 사용. 저장된 데이터는 삭제하지 않는 이상 반영구적으로 보관되지만, 중복된 key를 인수로 전달하면 데이터를 덮어씀(수정가능)
    --데이터 꺼내기
      getItem에 인수로 key 전달. 이때 key는 문자열이여야 하며, 일치하는 값이 없을 경우 undefind를 반환함. 스토리지에서 꺼내려는 데이터의 value가 JSON.stringify로 문자열로 변환한 값이라면 JSON.parse메서드로 문자열을 원래 객체 상태로 돌리기 가능.
    --데이터 지우기
      removeItem에 인수로 key 전달.
  리액트 앱의 state와 변수는 브라우저 탭에 저장됨 
  브라우저의 경우 사용자가 여러 페이지를 동시에 탐색하도록 복수의 탭을 지원하지만 탭을 새로고침하면 해당 탭에 보관중인 데이터를 삭제하고 페이지를 다시 불러옴.
*/
function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((item) => String(item.id) === String(action.data.id) ? { ...action.data } : item);
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter((item) => String(item.id) !== String(action.targetId));
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
}

export const DiaryStateContext = React.createContext();
export const DiraryDispatchContext = React.createContext();

function App() {

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    localData.sort((a, b) => Number(b.id) - Number(a.id)); //id 기준으로 내림차순 정렬
    idRef.current = localData[0].id + 1; //idRef의 현재값을 일기 id에서 가장 큰 값에 1 더한 값으로 설정
    dispatch({ type: "INIT", data: localData }); //인수로 action 객체와 데이터 전달. data는 로컬 스토리지에서 불러온 일기 데이터(localData)
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      // data에 새롭게 생성한 일기 아이템을 객체로 만들어 전달함
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        {/* value로 일기의 state값인 data를 넘겨줌으로써 Props Drilling 없이 useContext 이용해 일기 state 꺼내쓸 수 있음 */}
        <DiraryDispatchContext.Provider
          value={{ onCreate, onUpdate, onDelete, }}>
          <div className="App">
            {/* js의 switch 문법과 비슷함. Routes는 자식인 Route 컴포넌트에서 설정한 경로와 
              요청 url을 비교하고, 정확히 일치하는 컴포넌트를 element 속성에 전달해 렌더링함.
              설정되지 않은 경로로 접근시 아무것도 렌더링 하지 않음*/}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              {/* 동적 경로가 포함된 페이지 라우팅을 위해서는 url 파라미터 방식으로 전달 필요
                url 표기법은 주로 id나 이름을 이용해 특정 데이터를 조회할 때 사용 */}
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
            {/*<div>
             리액트 라우터로 페이지 라우팅한 앱에서는 Link 사용해 페이지 이동함.
            <Link to='이동할 경로'>링크이름</Link> 으로 사용하는 클라이언트 사이드 렌더링 방식.
            <a> 이용시 브라우저가 현재 페이지 지우고 새로운 페이지 불러오므로 페이지 일부 교체로 빠르게 이동하기 불가
            <Link to={"/"}>Home</Link>
            <Link to={"/new"}>New</Link>
            <Link to={"/diary"}>Diary</Link>
            <Link to={"/edit"}>Edit</Link>
          </div>*/}
          </div>
        </DiraryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
