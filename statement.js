function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `<h1>청구 내역 (고객명: ${invoice.customer})</h1>\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
  result += "<ul>\n";
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
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
      default:
        throw new Error(`<li>알 수 없는 장르: ${play.type}</li>`);
    }

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += `<li>${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)</li>\n`;
    totalAmount += thisAmount;
  }
  result += "</ul>\n";
  result += `<span>총액: ${format(totalAmount / 100)}</span>\n`;
  result += `<span>적립 포인트: ${volumeCredits}점</span>`;
  return result;
}

module.exports = { statement };
