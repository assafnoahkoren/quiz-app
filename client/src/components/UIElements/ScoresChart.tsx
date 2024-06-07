import "./ScoresChart.scss";

type ScoresChartProps = {
  firstNum: number;
  secondNum: number;
  thirdNum: number;
  total: number;
};

const ScoresChart: React.FC<ScoresChartProps> = ({
  firstNum,
  secondNum,
  thirdNum,
  total,
}) => {
  return (
    <div className="scores-chart-wrapper">
      {firstNum > 0 && (
        <div
          className="scores-chart-wrapper_section"
          style={{ flex: firstNum / total }}
        >
          <div className="bgg correct-answers bg-lime-200 text-lime-600">{firstNum} <i className="ms-1 fas fa-circle-check opacity-50"></i></div>
        </div>
      )}
      {secondNum > 0 && (
        <div
          className="scores-chart-wrapper_section"
          style={{ flex: secondNum / total }}
        >
          <div className="bgg wrong-answers bg-red-200 text-red-500">{secondNum} <i className="ms-1 fas fa-circle-xmark opacity-50"></i></div>
        </div>
      )}
      {thirdNum > 0 && (
        <div
          className="scores-chart-wrapper_section"
          style={{ flex: thirdNum / total }}
        >
          <div className="bgg no-answers bg-slate-200 text-slate-500">{thirdNum} <i className="ms-1 fas fa-circle-question opacity-50"></i></div>
        </div>
      )}
    </div>
  );
};

export default ScoresChart;
