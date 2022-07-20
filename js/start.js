const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

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
    }, 450);
}