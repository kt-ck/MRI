import { useState,useEffect } from 'react';

const TextRunning = () => {
  const alphaList = ['/','|', '-', '·','\\'];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setTimeout(()=>{
      setIndex((index + 1) % alphaList.length)
    }, 500)
  }, [index])
  return <span>&nbsp;{alphaList[index]}</span>;
};

export default TextRunning;
