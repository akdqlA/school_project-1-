const foods = [
    { name: "밥", c: 63, s: 0 },
    { name: "김밥", c: 46, s: 0 },
    { name: "라면", c: 79, s: 4 },
    { name: "피자", c: 41, s: 12 },
    { name: "햄버거", c: 47, s: 8 },
    { name: "치킨", c: 55, s: 0 },
    { name: "콜라", c: 38, s: 38 },
    { name: "사이다", c: 39, s: 39 },
    { name: "몬스터(에너지 음료)", c: 44, s: 41 }
];
/*
위랑 아래 이 출처는 chatgpt한테 구했음
밥·김밥·피자: 식약처 식품영양성분 DB
라면: 농심 신라면 1봉지
햄버거: 맥도날드의 기본 햄버거 1개
치킨: 대표 프랜차이즈의 후라이드치킨 1회분
콜라: 코카콜라 오리지널 355㎖
사이다: 칠성사이다 355㎖
에너지 음료: 몬스터 에너지 오리지널 355㎖
USDA FoodData Central
*/
var btns = [];

var List = [];

var R1 = [];
var R2 = [];
var R3 = [];

List.push(R1);
List.push(R2);
List.push(R3);

var isit = false;

function Choose(a){
    if(isit)
        AF(-1,-1);
    else
        choose(a);
}

function choose(a){
    isit=true;
    for(let i = 0 ; i < foods.length; i ++)
    {
        const b = document.createElement("button");
        b.innerText=foods[i].name;
        b.addEventListener("click", () => 
        {
            AF(a,i);
        });

        btns.push(b);

        b.className="btn";

        b.style.position = "absolute";
        b.style.left = "1768px";
        b.style.top = `${(i % 4) * 80 + 100}px`;
        if(i > 3)
            b.style.left="1925px";
        if(i > 7)
            b.style.left="2083px";

        document.body.appendChild(b);
    }
}

function AF(a,b){
    btns.forEach((B) =>{
        B.remove();
    });
    btns.length=0;
    if(a==-1 && b == -1){
        isit=false; return;}
    const c = document.createElement("p");
    if(List[a-1].length != 0){
        c.innerText="," + foods[b].name; console.log("A");}
    else{
        c.innerText=foods[b].name;}
    c.addEventListener("click" ,function(ts) {
        Remove(a,ts.currentTarget,b);
    });
    const e = document.getElementById(`idk${a}`);
    List[a-1].push(foods[b]);
    c.style.textAlign = "left";
    e.appendChild(c);
    isit=false;
    Result();
}
function Remove(a,IDK,b){
    IDK.remove();
    const f = foods[b];
    const index = List[a-1].indexOf(f);
    List[a-1].splice(index, 1);
    var e = document.getElementById(`idk${a}`);
    if (e && e.firstElementChild)//뒤에 꺼가 이해가 아리송한데 자바에선 걍 저것만 넣고 비어있지 않으면 true값을 줌
        e.firstElementChild.innerText = e.firstElementChild.innerText.replace(/^,/, "");//왼쪽꺼가 //사이가 바꿀 곳인데 ^이거가 맨 앞이라는 뜻이고 ,는 찾을 것 그다음은 바꿀 문장은 널로 해놓음
    Result();
}
function Result(){
    var p1 = [];
    var p2 = [];
    var RESULT = document.getElementById("Result");
    var R1 = {value:0,danger:0};
    var R2 = {value:0,danger:0};
    for(let i = 0 ; i < 3 ; i ++){
        p1[i] = document.getElementById(`c${i+1}`);
        p2[i] = document.getElementById(`s${i+1}`);
        if(List[i].length == 0){
            p1[i].innerText="당:0"
            p2[i].innerText="탄수화물:0"
            continue;
        }
        else{
            var res1 = 0;
            var res2 = 0;
            for(let j = 0 ; j < List[i].length; j ++)
            {
                res1 += List[i][j].c;
                res2 += List[i][j].s;
                R1.value += List[i][j].c;
                R2.value += List[i][j].s;
            }
            p1[i].innerText=`당:${res1}`;
            p2[i].innerText=`탄수화물${res2}`;
        }
    }
    //대략 200,275,325,400,400초과 //25,40,50,75,75초과가 WHO 당류 섭취 지침으로 사람마다 다름
    //이건 ai 설명 //다만 이 기준은 의료적인 당뇨병 판정 기준이 아니라 프로그램용 식단 부담도 기준이야. 당류 50g은 2,000kcal 식단에서 열량의 10%에 해당하는 대략적인 값이며, WHO도 유리당을 총열량의 10% 미만으로 권고해.
    //
    if (R1.value <= 200) {
        R1.danger=1;
    } else if (R1.value <= 275) {
        R1.danger=2;
    } else if (R1.value <= 325) {
        R1.danger=3;
    } else if (R1.value <= 400) {
        R1.danger=4;
    } else {
        R1.danger=5;
    }
    //
    if (R2.value <= 25) {
        R2.danger=1;
    } else if (R2.value <= 40) {
        R2.danger=2;
    } else if (R2.value <= 50) {
        R2.danger=3;
    } else if (R2.value <= 75) {
        R2.danger=4;
    } else {
        R2.danger=5;
    }
    const finalDanger = Math.max(R1.danger, R2.danger);
    if (finalDanger === 1) {
        RESULT.innerText = "안전한 식단";
        RESULT.style.color = "green";
    } else if (finalDanger === 2) {
        RESULT.innerText = "무난한 식단";
        RESULT.style.color = "blue";
    } else if (finalDanger === 3) {
        RESULT.innerText = "조금 주의가 필요한 식단.";
        RESULT.style.color = "orange";
    } else if (finalDanger === 4) {
        RESULT.innerText = "위험한 식단(경고)";
        RESULT.style.color = "red";
    } else {
        RESULT.innerText = "매우 위험한 식단(경고)";
        RESULT.style.color = "darkred";
    }
}
Result();