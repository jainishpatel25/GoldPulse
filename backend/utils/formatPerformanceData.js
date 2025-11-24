// function formatPerformanceData(investments, range) {
//   const grouped = {};

//   investments.forEach((inv) => {
//     const date = new Date(inv.date);
//     let key;

//     switch (range) {
//       case "1D":
//         key = `${date.getHours()}h`;
//         break;
//       case "1W":
//         key = date.toLocaleDateString("en-IN", { weekday: "short" });
//         break;
//       case "1M":
//         key = `Week ${Math.ceil(date.getDate() / 7)}`;
//         break;
//       case "6M":
//         key = date.toLocaleDateString("en-IN", { month: "short" });
//         break;
//       case "1Y":
//         key = `Q${Math.floor(date.getMonth() / 3) + 1}`;
//         break;
//       case "ALL":
//       default:
//         key = date.getFullYear().toString();
//         break;
//     }

//     grouped[key] = (grouped[key] || 0) + inv.totalValue;
//   });

//   return Object.entries(grouped).map(([name, value]) => ({ name, value }));
// }

// module.exports = formatPerformanceData;
function formatPerformanceData(investments, range) {
  const now = new Date();
  let startDate;

  switch (range) {
    case "1D":
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case "1W":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "1M":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "6M":
      startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      break;
    case "1Y":
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
      break;
    case "ALL":
    default:
      startDate = null;
      break;
  }

  const filtered = startDate
    ? investments.filter((inv) => new Date(inv.date) >= startDate)
    : investments;

  const grouped = {};

  filtered.forEach((inv) => {
    const date = new Date(inv.date);
    let key;

    switch (range) {
      case "1D":
        key = `${date.getHours()}h`;
        break;
      case "1W":
        key = date.toLocaleDateString("en-IN", { weekday: "short" });
        break;
      case "1M":
        key = `Week ${Math.ceil(date.getDate() / 7)}`;
        break;
      case "6M":
        key = date.toLocaleDateString("en-IN", { month: "short" });
        break;
      case "1Y":
        key = `Q${Math.floor(date.getMonth() / 3) + 1}`;
        break;
      case "ALL":
      default:
        key = date.getFullYear().toString();
        break;
    }

    grouped[key] = (grouped[key] || 0) + inv.totalValue;
  });

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}

module.exports = formatPerformanceData;