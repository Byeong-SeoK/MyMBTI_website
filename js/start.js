const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;//이 변수는 총 질문의 개수를 가지고 있는 변수이다.

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";

    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";

        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        },450);
    }, 450);
}

function addAnswer(answerText, qIdx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');//button이라는 것을 js를 통해서 만드는 것이다.
    answer.classList.add('answerList');//버튼을 사용하기 위해 버튼에 대해 id값을 부여하는 것이다.
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    //위 3개 코드는 js에서 padding과 margin에 대해 값을 넣는 코드이다.
    answer.classList.add('fadeIn');
    
    a.appendChild(answer);
    //answer를 통해서 만든 버튼을 a라는 변수에 추가될 수 있도록 하는 것이다.
    //즉, 만든 버튼들을 answerBox라는 id값을 가진 태그를 통해 보여주기 위해
    //answerBox와 연결된 a라는 변수에 answer를 추가하는 것이다.
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        //우리는 js를 통해서 button을 만들었으므로 addEventListener를 통해서
        //해당 버튼을 클릭하면 다음 질문으로 넘어갈 수 있도록 만들어야 한다.

        var children = document.querySelectorAll('.answerList');
        //위 children이라는 변수는 버튼 3개를 가지고 있는 변수이다.
        
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;//사용자가 클릭한 다음 버튼을 비활성화되게 만드는 것이다.
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';//버튼을 사라지게 만들기 위해 각 버튼에게 none값을 부여한다.
            }
            goNext(++qIdx);//다음 질문을 호출하는 것이다.
        }, 450)
    }, false);
}

function goNext(qIdx){
    if(qIdx+1 === endPoint){//질문을 끝까지 다했을 때 결과 창으로 넘기는 함수 호출
        return goResult();
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);//사용자에게 선택지를 보여주게하는 함수
        //안의 파라미터는 data.js의 qnalist에서 qIdx번째의 질문에 대한 답변 태그 a에 대해
        //i라는 for문 변수를 통해서 하나씩 접근하여 그 배열안의 answer 키값에 접근하는 것이다.
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint)*(qIdx+1)+'%';//상태 바가 질문 하나 끝날때마다 차오르는 방식이다.
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";

    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        //위의 코드는 main에서 qna로 넘어갈 때의 애니메이션 효과를 주는 코드이다.

        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
            //qna를 display 시키기 위해서 block 상태가 main이 none이 되고 난 이후 여야한다.
        },450);
        let qIdx = 0;
        goNext(qIdx);//사용자에게 질문지를 보여주는 함수
    }, 450);
}