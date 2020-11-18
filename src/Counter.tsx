import React, { useRef, useState, useEffect } from "react";

const Counter = () => {
  const frame = useRef<number | undefined>();
  const last = useRef(performance.now());
  const [counter, setCounter] = useState(0);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    const animate = () => {
      const now = performance.now();
      const delta = (now - last.current) / 1000;
      setCounter((prev) => prev + delta);
      setFps(1 / delta);
      last.current = now;
      frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current as number);
  }, [counter, fps]);
  return (
    <>
      <div>{counter.toFixed(1)} s</div>
      <div>{fps.toFixed(0)} fps</div>
    </>
  );
};

export default Counter;
