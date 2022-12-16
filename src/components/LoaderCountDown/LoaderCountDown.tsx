import { Loader } from "@components";
import { modalStyles } from "@utils/cx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Modal from "react-modal";

interface IProps {
  onFinish?: () => void;
  countdown: number;
  text?: string;
  endedText?: string
}

export const LoaderCountDown: React.FC<IProps> = ({
  countdown,
  onFinish,
  text,
  endedText
}) => {
  const [count, setCount] = useState(countdown);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0));
    }, 1000);
    const timer = setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
      onFinish?.();
    }, (countdown + 1.2) * 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  useLayoutEffect(() => {
    ref.current?.animate(
      [
        { transform: "scale(1.2)", opacity: 1 },
        { transform: "scale(2.2)", opacity: 0.7 },
        { transform: "scale(0.7)", opacity: 1 },
        { transform: "scale(0.9)" },
        { transform: "scale(1)" },
      ],
      {
        duration: 500,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    );
  }, [count]);

  return (
    <Modal isOpen={true} onRequestClose={() => null} style={modalStyles}>
      <div className="flex flex-col gap-3 items-center justify-center w-[50vw] h-[50vh]">
        {loading ? (
          <>
            <div ref={ref} className='text-blue text-8xl'>{count}</div>
            {text && <p className="text-dark-very-soft text-3xl">{text}</p>}
          </>
        ) : (
          <>
            <Loader />
            {endedText && <p className="text-dark-very-soft text-3xl">{endedText}</p>}
          </>
        )}
      </div>
    </Modal>
  );
};

export default LoaderCountDown;
