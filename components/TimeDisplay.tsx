import { useEffect, useState } from "react"
import { timeDifferenceForDate } from "../utils/timeDiff";

export const TimeDisplay = ({ time }: { time: string }) => {
    const timeWithT = time.replace(/\s/, 'T')
    const [currentTime, setCurrentTime] = useState(timeWithT);
  
    useEffect(() => {
        setCurrentTime(timeDifferenceForDate(timeWithT));
    }, [timeWithT]);

  
    return <>{currentTime}</>
  };