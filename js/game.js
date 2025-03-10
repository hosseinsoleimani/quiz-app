
const loader = document.getElementById("loader");
const container = document.getElementById("container");
const URL="https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

let formattedData=null;

const fetchData = async ()=>{
    const response = await fetch(URL);
    const json= await response.json();
    formattedData=formatData(json.results);
    console.log(formattedData);
    start();
    }

const start = ()=>{
        loader.style.display="none";
        container.style.display="block";
        }
        
window.addEventListener("load",fetchData);
const formatData=(questionData)=>{
    const result = questionData.map((item)=>{
        const questionObject={question:item.question};
        const answers=[...item.incorrect_answers];
        const correctAnswerIndex=Math.floor(Math.random()*4);
        answers.splice(correctAnswerIndex,0,item.correct_answer);
        questionObject.answer=answers;
        questionObject.correctAnswerIndex=correctAnswerIndex;
        return questionObject;
    });
    return result;
}





