import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {
  const [value, setValue] = useState(new Date());
  const [plans, setPlans] = useState({});
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const onDayClick = (date) => {
    setSelectedDate(date.toDateString());
    setInput(plans[date.toDateString()] || "");
  };

  const savePlan = () => {
    const updated = { ...plans, [selectedDate]: input };
    setPlans(updated);
    localStorage.setItem("plans", JSON.stringify(updated));
    setSelectedDate(null);
    setInput("");
  };

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("plans") || "{}");
    setPlans(saved);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📅 道徳授業 年間計画ナビ（試作）</h1>
      <Calendar onClickDay={onDayClick} value={value} />

      {selectedDate && (
        <div style={{ marginTop: 20 }}>
          <h2>{selectedDate} の授業内容</h2>
          <textarea
            rows="3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "100%" }}
          />
          <button onClick={savePlan}>保存</button>
        </div>
      )}

      <h2 style={{ marginTop: 40 }}>📚 登録された授業一覧</h2>
      <ul>
        {Object.entries(plans).map(([date, text]) => (
          <li key={date}>
            <strong>{date}</strong>: {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
