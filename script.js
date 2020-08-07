const decadePageCount = {
  1980: 5973, //89
  1990: 30201, //99
  2000: 58882, //09
  2010: 58822 //19
};
let decades = ['1980','1990','2000','2010'];
let pageCounts = [5973,30201,58882,58822]
let maxOffSet = 0;
let offSet = 0;
let badSet = false;
let wholeBoard = [];
let boardCol = [];
let currentState = [0,0];
let currentQuestion = "";
let currentValue = 0;

const radioOne = document.getElementById("decades");
const radioTwo = document.getElementById("todecades");
const catTitles = document.querySelectorAll('[cattitle]');
const btnsCol1 = document.querySelectorAll('[btncol1]');
const btnsCol2 = document.querySelectorAll('[btncol2]');
const btnsCol3 = document.querySelectorAll('[btncol3]');
const btnsCol4 = document.querySelectorAll('[btncol4]');
const btnsCol5 = document.querySelectorAll('[btncol5]');
const btnsCol6 = document.querySelectorAll('[btncol6]');
const currentAnswer = document.getElementById('currentanswer');
const btnreval = document.getElementById('btnreval');
const btnright = document.getElementById('btnright');
const btnwrong = document.getElementById('btnwrong');
const moneycount = document.getElementById('moneycount');
const loading = document.getElementById('loading');





var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    penColor: 'rgb(255, 255, 255)'
  });

  var signaturePadBoard = new SignaturePad(document.getElementById('signature-pad-board'), {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    penColor: 'rgb(255,255,255)'
  });

  const board = document.getElementById("board-cont")
  const form = document.getElementById("form-cont")




  async function changeScene () {

    if(radioOne.value <= radioTwo.value)
    {

      loading.innerText="Loading...";

      for(let i = decades.indexOf(radioOne.value); i <= decades.indexOf(radioTwo.value); i++)
      {
        maxOffSet = maxOffSet + pageCounts[i];
      }

      // console.log(maxOffSet);

      for(let i = 0; i < 6; i++)
      {
        offSet = (Math.floor(Math.random() * (maxOffSet - 0) + 0)).toString();

        // console.log("http://jservice.io/api/clues?min_date=" + radioOne.value + "-01-01T12:00:00.000Z&max_date=" + (parseInt(radioTwo.value) + 9).toString() + "-12-31T12:00:00.000Z&offset=" + offSet);
        let data = await fetch("http://jservice.io/api/clues?min_date=" + radioOne.value + "-01-01T12:00:00.000Z&max_date=" + (parseInt(radioTwo.value) + 9).toString() + "-12-31T12:00:00.000Z&offset=" + offSet)
          .then(response => response.json())
          .catch(e => console.log(e));
        // console.log(data);


        do
        {
          boardCol = [];
          badSet = false;
          let question = data[Math.floor(Math.random() * (data.length - 0) + 0)];

          let catID = question.category_id;
          let airDate = question.airdate;
          console.log(catID + " " + airDate);

          let catData = await fetch("http://jservice.io/api/category?id=" + catID)
            .then(response => response.json())
            .catch(e => console.log(e));
          console.log(catData);

          catTitles[i].innerText = catData.title;

          catData.clues.forEach(clue => {
            if(clue.airdate == airDate)
            {
              // console.log(clue);
              boardCol.push(clue);
              if(clue.invalid_count != null || clue.question == "" || clue.answer == "" || clue.question == "=" || clue.answer == "=" || clue.question.includes("Audio") || clue.question.includes("audio") || clue.answer.includes("Audio") || clue.answer.includes("audio"))
              {
                badSet = true;
              }
            }
          });
        }
        while(badSet == true);
        wholeBoard.push(boardCol);
        boardCol = new Array();
      }

      console.log(wholeBoard);




      board.style.opacity = 1;
      board.style.zIndex = 1;

      form.style.opacity = 0;
      form.style.zIndex = -1

      // signaturePad.penColor = "rgb(255,255,255)"
      signaturePadBoard.fromData(signaturePad.toData());
      signaturePadBoard.off();
    }

  }

  let questionnum = 0;
  btnsCol1.forEach(function(btn) {
    btn.addEventListener("click", function() {
      if(btn.innerText == "$200")
      {
        questionnum = 0;
        currentValue = 200;
      }
      else if(btn.innerText == "$400")
      {
        questionnum = 1;
        currentValue = 400;
      }
      else if(btn.innerText == "$600")
      {
        questionnum = 2;
        currentValue = 600;
      }
      else if(btn.innerText == "$800")
      {
        questionnum = 3;
        currentValue = 800;
      }
      else if(btn.innerText == "$1000")
      {
        questionnum = 4;
        currentValue = 1000;
      }

      btn.innerText = "";
      currentAnswer.innerText = wholeBoard[0][questionnum].question;
      currentQuestion = (wholeBoard[0][questionnum].answer).replace("<i>","").replace("</i>","");
    });
  })

  btnsCol2.forEach(function(btn) {
    btn.addEventListener("click", function() {
      if(btn.innerText == "$200")
      {
        questionnum = 0;
        currentValue = 200;
      }
      else if(btn.innerText == "$400")
      {
        questionnum = 1;
        currentValue = 400;
      }
      else if(btn.innerText == "$600")
      {
        questionnum = 2;
        currentValue = 600;
      }
      else if(btn.innerText == "$800")
      {
        questionnum = 3;
        currentValue = 800;
      }
      else if(btn.innerText == "$1000")
      {
        questionnum = 4;
        currentValue = 1000;
      }

      btn.innerText = "";
      currentAnswer.innerText = wholeBoard[1][questionnum].question;
      currentQuestion = (wholeBoard[1][questionnum].answer).replace("<i>","").replace("</i>","");
    });
  })

  btnsCol3.forEach(function(btn) {
    btn.addEventListener("click", function() {
      if(btn.innerText == "$200")
      {
        questionnum = 0;
        currentValue = 200;
      }
      else if(btn.innerText == "$400")
      {
        questionnum = 1;
        currentValue = 400;
      }
      else if(btn.innerText == "$600")
      {
        questionnum = 2;
        currentValue = 600;
      }
      else if(btn.innerText == "$800")
      {
        questionnum = 3;
        currentValue = 800;
      }
      else if(btn.innerText == "$1000")
      {
        questionnum = 4;
        currentValue = 1000;
      }

      btn.innerText = "";
      currentAnswer.innerText = wholeBoard[2][questionnum].question;
      currentQuestion = (wholeBoard[2][questionnum].answer).replace("<i>","").replace("</i>","");
    });
  })

  btnsCol4.forEach(function(btn) {
    btn.addEventListener("click", function() {
      if(btn.innerText == "$200")
      {
        questionnum = 0;
        currentValue = 200;
      }
      else if(btn.innerText == "$400")
      {
        questionnum = 1;
        currentValue = 400;
      }
      else if(btn.innerText == "$600")
      {
        questionnum = 2;
        currentValue = 600;
      }
      else if(btn.innerText == "$800")
      {
        questionnum = 3;
        currentValue = 800;
      }
      else if(btn.innerText == "$1000")
      {
        questionnum = 4;
        currentValue = 1000;
      }

      btn.innerText = "";
      currentAnswer.innerText = wholeBoard[3][questionnum].question;
      currentQuestion = (wholeBoard[3][questionnum].answer).replace("<i>","").replace("</i>","");
    });
  })

  btnsCol5.forEach(function(btn) {
    btn.addEventListener("click", function() {
      if(btn.innerText == "$200")
      {
        questionnum = 0;
        currentValue = 200;
      }
      else if(btn.innerText == "$400")
      {
        questionnum = 1;
        currentValue = 400;
      }
      else if(btn.innerText == "$600")
      {
        questionnum = 2;
        currentValue = 600;
      }
      else if(btn.innerText == "$800")
      {
        questionnum = 3;
        currentValue = 800;
      }
      else if(btn.innerText == "$1000")
      {
        questionnum = 4;
        currentValue = 1000;
      }

      btn.innerText = "";
      currentAnswer.innerText = wholeBoard[4][questionnum].question;
      currentQuestion = (wholeBoard[4][questionnum].answer).replace("<i>","").replace("</i>","");
    });
  })

  btnsCol6.forEach(function(btn) {
    btn.addEventListener("click", function() {
      if(btn.innerText == "$200")
      {
        questionnum = 0;
        currentValue = 200;
      }
      else if(btn.innerText == "$400")
      {
        questionnum = 1;
        currentValue = 400;
      }
      else if(btn.innerText == "$600")
      {
        questionnum = 2;
        currentValue = 600;
      }
      else if(btn.innerText == "$800")
      {
        questionnum = 3;
        currentValue = 800;
      }
      else if(btn.innerText == "$1000")
      {
        questionnum = 4;
        currentValue = 1000;
      }

      btn.innerText = "";
      currentAnswer.innerText = wholeBoard[5][questionnum].question;
      currentQuestion = (wholeBoard[5][questionnum].answer).replace("<i>","").replace("</i>","");
    });
  });


  btnreval.addEventListener('click', function() {
    currentAnswer.innerText = currentQuestion;
  });

  btnright.addEventListener('click', function() {
    moneycount.innerText= "$" + (parseInt(moneycount.innerText.replace('$','')) + currentValue).toString();
  });

  btnwrong.addEventListener('click', function() {
    moneycount.innerText= "$" + (parseInt(moneycount.innerText.replace('$','')) - currentValue).toString();
  });
