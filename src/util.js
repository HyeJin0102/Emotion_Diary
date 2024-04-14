import emotion1 from './Img/emotion1.png';
import emotion2 from './Img/emotion2.png';
import emotion3 from './Img/emotion3.png';
import emotion4 from './Img/emotion4.png';
import emotion5 from './Img/emotion5.png';

export const getEmotionImgById = (emotionId) => {

    const targetEmotionId = String(emotionId);

    switch (targetEmotionId) {
        case "1":
            return emotion1;
        case "2":
            return emotion2;
        case "3":
            return emotion3;
        case "4":
            return emotion4;
        case "5":
            return emotion5;
        default:
            return null;
    };
};

export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};

//getEmotionImgById의 경우 화살표 함수로 호이스팅의 대상이 아니므로 emotionList 작성시
//getEmotionImgById보다 먼저 작성하게 되면 선언전 배열에 접근해야해서 오류 발생하니 작성 위치 유의해야함
export const emotionLiist = [
    {
        id: 1,
        name: "완전 좋음",
        img: getEmotionImgById(1),
    },
    {
        id: 2,
        name: "좋음",
        img: getEmotionImgById(2),
    },
    {
        id: 3,
        name: "그럭저럭",
        img: getEmotionImgById(3),
    },
    {
        id: 4,
        name: "나쁨",
        img: getEmotionImgById(4),
    },
    {
        id: 5,
        name: "끔찍함",
        img: getEmotionImgById(5),
    },
]

export const getMonthRangeByDate = (date) => {
    const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endTimeStamp = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime();
    return { beginTimeStamp, endTimeStamp };
};

export const setPageTitle = (title) => {
    const titleElement = document.getElementsByTagName("title")[0];
    //인수로 전달한 태그를 돔에서 모두 찾아 배열로 반환하는 getElementsByTagName.
    //이때 title을 인수로 전달하면 반환 배열의 0번 요소에는 페이지 제목을 설정하는 <head>의 <title> 태그를 불러옴
    titleElement.innerText = title;
    //innerText를 통해 함수 setPageTitle에서 매개변수로 저장한 title을 설정함
}