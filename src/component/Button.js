import './Button.css';

import React from 'react';

const Button = ({ text, type, onClick }) => {

    const btnType = ["positive", "negative"].includes(type) ? type : "default";
    // type에 전달된 배열 내의 특정 요소가 있는지 판별(includes). 포함된다면 해당 값을, 없다면 default를 btnTyoe에 저장
    return (
        // type을 결정하는 내용에 따라 스타일 변경해주기 위해 className을 복수로 지정하기 위해 배열과 join 메서드 이용. 
        <button className={["Button", `Button_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
};

Button.defaultProps = {
    type: "default",
};

export default Button;