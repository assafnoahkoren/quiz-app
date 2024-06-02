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
          <div className="bgg correct-answers">{firstNum}</div>
          <div className="correct-answers_title">נכון</div>
        </div>
      )}
      {secondNum > 0 && (
        <div
          className="scores-chart-wrapper_section"
          style={{ flex: secondNum / total }}
        >
          <div className="bgg wrong-answers">{secondNum}</div>
          <div className="wrong-answers_title">לא נכון</div>
        </div>
      )}
      {thirdNum > 0 && (
        <div
          className="scores-chart-wrapper_section"
          style={{ flex: thirdNum / total }}
        >
          <div className="bgg no-answers">{thirdNum}</div>
          <div className="no-answers_title">לא נענו</div>
        </div>
      )}
    </div>
  );
};

export default ScoresChart;
