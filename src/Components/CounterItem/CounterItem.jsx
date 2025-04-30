import React, { useEffect, useState, useRef } from "react";

const CounterItem = ({ target }) => {
        
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounter();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated, target]);

  const animateCounter = () => {
    let current = 0;
    const increment = target / (1000 / 20); // 1000ms duration

    const update = () => {
      if (current < target) {
        current += increment;
        setCount(Math.ceil(current));
        setTimeout(update, 20);
      } else {
        setCount(target);
      }
    };

    update();
  };

  return (
    <>
     <h4
      ref={ref}
      className={`${
        target === 15
          ? "text-[9rem] max-[450px]:text-[8rem] max-[350px]:text-[7rem] max-[450px]:h-[145px] max-[350px]:h-[125px] h-[210px] font-extrabold text-orange-600"
          : "text-6xl font-extrabold text-black tracking-wide"
      }`}
    >
      {count}{target === 50 ? "k" : ""}
    </h4>
    </>
  );
};

export default CounterItem;

//     <div ref={ref} className="text-5xl font-bold text-center">
//       {count}
//     </div>
