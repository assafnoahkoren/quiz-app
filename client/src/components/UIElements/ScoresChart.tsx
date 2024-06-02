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
        <div className="correct-answers" style={{ flex: firstNum / total }}>
          {firstNum}
        </div>
      )}
      {secondNum > 0 && (
        <div className="wrong-answers" style={{ flex: secondNum / total }}>
          {secondNum}
        </div>
      )}
      {thirdNum > 0 && (
        <div className="no-answers" style={{ flex: thirdNum / total }}>
          {thirdNum}
        </div>
      )}
    </div>
  );
};

export default ScoresChart;
