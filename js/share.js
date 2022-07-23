const url = 'https://typeoflove.netlify.app/';

function setShare(){ 
    //이 함수는 나의 결과 페이지에 대한 url을 만들기 위한 함수이다.
    //그리고 만들어진 url을 통해서 나의 결과를 다른 사람과 공유할 수 있다.
    
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;
    //id가 resultImg div태그의 alt값만 추출하여 resultAlt에 담은 것이다. 

    const shareTitle = '십이간지 연애유형 결과';
    const shareDes = infoList[resultAlt].name;
    const shareImage = url + 'img/image-' + resultAlt + '.png';
    const shareURL = url + 'page/result-' + resultAlt + '.html';

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
        title: shareTitle,
        description: shareDes,
        imageUrl: shareImage,
        link: {
            mobileWebUrl: shareURL,
            webUrl: shareURL
        },
    },

    buttons: [
        {
            title: '결과 확인하기',
            link: {
                mobileWebUrl: shareURL,
                webUrl: shareURL
            },
        },
        ]
    });
}