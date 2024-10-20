function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `<h1>청구 내역 (고객명: ${invoice.customer})</h1>`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  result += "<ul>";

  invoice.performances.map((perf) => {
    const play = plays[perf.playID];
    const thisAmount = getAmount(play, perf);
    volumeCredits += getVolumeCredit(play, perf);

    // 청구 내역을 출력한다.
    result += `
    <li>
    ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)
    </li>`;
    totalAmount += thisAmount;
  });

  result += "</ul>";
  result += `<h2>총액: ${format(totalAmount / 100)}</h2>`;
  result += `<h2>적립 포인트: ${volumeCredits}점</h2>`;
  return result;
}

function getAmount(play, perf) {
  let thisAmount = 0;

  switch (play.type) {
    case "tragedy": // 비극
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy": // 희극
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    case "history": //사극
      thisAmount = 10000 + 1500 * perf.audience;
      break;
    default:
      throw new Error(`<li>알 수 없는 장르: ${play.type}</li>`);
  }
  return thisAmount;
}

function getVolumeCredit(play, perf) {
  let thisVolumeCredits = Math.max(perf.audience - 30, 0);
  // 희극 관객 5명마다 추가 포인트를 제공한다.
  if ("comedy" === play.type)
    thisVolumeCredits += Math.floor(perf.audience / 5);
  // 사극 장르 20명 이상일 경우 추가 포인트 제공한다.
  if (play.type === "history" && perf.audience > 20) thisVolumeCredits += 10;
  return thisVolumeCredits;
}

export { statement };
