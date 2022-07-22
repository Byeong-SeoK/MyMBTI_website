const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;//이 변수는 총 질문의 개수를 가지고 있는 변수이다.
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //사용자가 질문에 대해 어떤 답을 하였는지 저장하는 배열이다.

/*
function calResult(){
    var pointArray= [
        {name: 'mouse', value: 0 , key: 0},
        {name: 'cow', value: 0 , key: 1},
        {name: 'tiger', value: 0 , key: 2},
        {name: 'rabbit', value: 0 , key: 3},
        {name: 'dragon', value: 0 , key: 4},
        {name: 'snake', value: 0 , key: 5},
        {name: 'horse', value: 0 , key: 6},
        {name: 'sheep', value: 0 , key: 7},
        {name: 'monkey', value: 0 , key: 8},
        {name: 'chick', value: 0 , key: 9},
        {name: 'dog', value: 0 , key: 10},
        {name: 'pig', value: 0 , key: 11},
    ]

    for(let i = 0; i < endPoint; i++){
        var target = qnaList[i].a[select[i]];
        //위 qnaList[i].a[select[i]]를 통해서 target에 qnaList안의 a태그에 대해
        //select배열에 저장된 사용자가 선택한 값에 해당하는 것이 target 변수에 담긴다.

        for(let j = 0; j < target.type.length; j++){ //target안에 들어간 배열안에서 우리가 원하는 값을 찾는다.
            for(let k = 0; k < pointArray.length; k++){
                //pointArray와 targe간의 정보를 비교하여 value값을 올릴지말지의 for문 이다.
                if(target.type[j] === pointArray[k].name){
                    pointArray[k].value = pointArray[k].value+1;
                    //값이 같으면 value를 하나 올려줌으로써 해당 답변이 몇번 선택되었는지 알 수 있게 해준다.
                }
            }
        }
    }

    var resultArray = pointArray.sort(function(a,b){//pointArray를 value를 기준으로 내림차순으로 정렬한다.
        if(a.value > b.value){
            return -1;
        }
        else if(a.value < b.value){
            return 1;
        }
        else{
            return 0;
        }
    });

    let resultword = resultArray[0].key;//0번째의 key가 value가 가장 높은 것에 해당하고 이를 반환하도록 한다.
    return resultword;
}
위 코드는 addAnswer함수에서 개선한 알고리즘 때문에 필요없게 되었다.
*/

function calResult(){
    var result = select.indexOf(Math.max(...select));
    //indexOf는 select의 특정 인덱스의 값을 반환해주는 함수이다.
    //Math.max는 가장 큰 값을 반환해주는 함수이고 파라미터로 배열을 받은 상태이다.
    //...은 전개 구문으로 select 배열을 컴파일 도중 펼칠 수 있도록 해주는 것이다.
    return result;
}

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

    calResult();
}

function addAnswer(answerText, qIdx, idx){
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
            var target = qnaList[qIdx].a[idx];
            //qnaList[qIdx]는 qIdx번째 질문을 의미하고 a[Idx]는 사용자가 고른 답변의 a태그 값에 해당한다.
            for(let j = 0; j < target.type.length; j++){
                select[target[j]] = select[target[j]]+1;
                //a태그의 type배열에 저장된 번호에 해당되는 select 배열의 인덱스의 값을 1씩 증가시킨다.
                //이 코드를 통해서 위의 calResult의 복잡한 알고리즘이 필요없게 된다.
            }

            //select[qIdx] = idx; 
            //사용자가 qidx번째 질문에 대해 idx번째 답변을 하였음을 저장한다.
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';//버튼을 사라지게 만들기 위해 각 버튼에게 none값을 부여한다.
            }
            goNext(++qIdx);//다음 질문을 호출하는 것이다.
        }, 450)
    }, false);
}

function goNext(qIdx){
    if(qIdx === endPoint){//질문을 끝까지 다했을 때 결과 창으로 넘기는 함수 호출
        return goResult();
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);//사용자에게 선택지를 보여주게하는 함수
        //안의 파라미터는 data.js의 qnalist에서 qIdx번째의 질문에 대한 답변 태그 a에 대해
        //i라는 for문 변수를 통해서 하나씩 접근하여 그 배열안의 answer 키값에 접근하는 것이다.
        //해당 함수는 또 i라는 파라미터를 통해서 사용자가 어떤 답변을 선택하였는지 알 수 있게 해준다.
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