// 30개의 연습용 질문 (MBTI 성향을 묻는 유사 문항)
const questions = [
  { text: "나는 사람들과 함께 있을 때 에너지를 얻는다", dimension: "E" },
  { text: "나는 혼자 있을 때 에너지를 얻는다", dimension: "I" },
  { text: "나는 새로운 사람을 만나는 것이 즐겁다", dimension: "E" },
  { text: "나는 혼자서 조용히 책 읽는 것을 선호한다", dimension: "I" },
  { text: "나는 사실과 현실을 중시한다", dimension: "S" },
  { text: "나는 아이디어와 가능성을 중시한다", dimension: "N" },
  { text: "나는 세부사항을 꼼꼼히 챙긴다", dimension: "S" },
  { text: "나는 큰 그림과 미래를 먼저 생각한다", dimension: "N" },
  { text: "나는 논리와 객관성을 중시한다", dimension: "T" },
  { text: "나는 감정과 관계를 중시한다", dimension: "F" },
  { text: "나는 결정을 내릴 때 분석을 우선한다", dimension: "T" },
  { text: "나는 결정을 내릴 때 사람들의 기분을 고려한다", dimension: "F" },
  { text: "나는 계획적이고 체계적인 것을 선호한다", dimension: "J" },
  { text: "나는 자유롭고 즉흥적인 것을 선호한다", dimension: "P" },
  { text: "나는 일정표를 세우는 것을 좋아한다", dimension: "J" },
  { text: "나는 상황에 따라 유연하게 움직인다", dimension: "P" },
  { text: "나는 모임에서 먼저 말을 꺼내는 편이다", dimension: "E" },
  { text: "나는 모임에서 듣는 편이 더 편하다", dimension: "I" },
  { text: "나는 현재의 경험을 중시한다", dimension: "S" },
  { text: "나는 미래의 가능성을 더 생각한다", dimension: "N" },
  { text: "나는 규칙과 원칙을 중시한다", dimension: "J" },
  { text: "나는 상황에 따라 즉흥적으로 움직인다", dimension: "P" },
  { text: "나는 논리적 토론을 즐긴다", dimension: "T" },
  { text: "나는 사람들의 감정을 이해하려 한다", dimension: "F" },
  { text: "나는 친구들과 함께 있을 때 활력이 생긴다", dimension: "E" },
  { text: "나는 혼자만의 시간을 꼭 필요로 한다", dimension: "I" },
  { text: "나는 세부적인 사실을 잘 기억한다", dimension: "S" },
  { text: "나는 추상적인 아이디어에 끌린다", dimension: "N" },
  { text: "나는 결정을 내릴 때 객관적 근거를 찾는다", dimension: "T" },
  { text: "나는 결정을 내릴 때 사람들의 마음을 고려한다", dimension: "F" },
];

// 페이지네이션 설정
let currentPage = 0;
const questionsPerPage = 5;
const quizDiv = document.getElementById("quiz");

function renderPage() {
  quizDiv.innerHTML = "";
  const start = currentPage * questionsPerPage;
  const end = start + questionsPerPage;
  const pageQuestions = questions.slice(start, end);

  pageQuestions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <p>${q.text}</p>
      <label><input type="radio" name="q${start+i}" value="${q.dimension}5"> 매우 그렇다</label>
      <label><input type="radio" name="q${start+i}" value="${q.dimension}4"> 그렇다</label>
      <label><input type="radio" name="q${start+i}" value="X"> 잘 모르겠다</label>
      <label><input type="radio" name="q${start+i}" value="${q.dimension}2"> 아니다</label>
      <label><input type="radio" name="q${start+i}" value="${q.dimension}1"> 매우 아니다</label>
    `;
    quizDiv.appendChild(div);
  });
}

document.getElementById("next").addEventListener("click", () => {
  if ((currentPage+1) * questionsPerPage < questions.length) {
    currentPage++;
    renderPage();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }
});

document.getElementById("submit").addEventListener("click", () => {
  const dimensions = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };

  questions.forEach((q, i) => {
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    if (answer && answer.value && answer.value !== "X") {
      const dim = answer.value[0]; // 첫 글자(E/I/S/N/T/F/J/P)
      const score = parseInt(answer.value.slice(1)); // 숫자 점수
      dimensions[dim] += score;
    }
  });

  let result = "";
  result += dimensions.E >= dimensions.I ? "E" : "I";
  result += dimensions.S >= dimensions.N ? "S" : "N";
  result += dimensions.T >= dimensions.F ? "T" : "F";
  result += dimensions.J >= dimensions.P ? "J" : "P";

  document.getElementById("result").innerHTML = `<h2>당신의 MBTI 유형은 ${result} 입니다!</h2>`;
});

// 첫 페이지 렌더링
renderPage();
