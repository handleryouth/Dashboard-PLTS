import { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState(new Date().toLocaleString("id-ID"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString("id-ID"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p className="prose">{time}</p>;
}
