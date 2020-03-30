import moment from "moment";

export const isTimeBlocked = data => {
  const today = new Date();
  const hr = today.getHours();
  const min = today.getMinutes();
  const [start, stop] = data.split(", ")[1].split("to ");
  const { hr: startHr, min: startMin } = getHourMin(start);
  const { hr: stoptHr, min: stopMin } = getHourMin(stop);
  const ct = getRelTime(hr, min);
  const st = getRelTime(startHr, startMin);
  const stp = getRelTime(stoptHr, stopMin);
  if (ct > st && ct < stp && today.getDay() > 0 && today.getDay() < 5)
    return false;
  else return true;
};

const getHourMin = stringTime => {
  const [time, meridian] = stringTime.split(" ");
  let [hr, min] = time.split(".");
  hr =
    meridian.includes("AM") || meridian.includes("12")
      ? parseInt(hr)
      : parseInt(hr) + 12;
  min = parseInt(min);
  return { hr, min };
};

const getRelTime = (hr, min) => {
  return hr * 60 + min;
};

export const arrayReformat = (list, batchList) => {
  const batchArray = [];
  if (list.length > 0 && batchList.length > 0) {
    for (let i = 0; i < list.length; i++)
      if (list[i].batchDetails.length > 0)
        list[i].batchDetails.map(batch => {
          const batchName = batchList.filter(
            data => data._id === batch.batchId
          );
          batchArray.push({
            ...batch,
            ...list[i],
            batchDetails: [],
            batchName: batchName[0].batchName
          });
        });
      else {
        batchArray.push({ ...list[i] });
      }
  }

  return batchArray;
};

export const deleteVideoCheck = (lastPlayed, data) => {
  const now = moment(new Date());
  const [start, stop] = data.split(", ")[1].split("to ");
  const { hr: stoptHr, min: stopMin } = getHourMin(stop);
  let courseEnd = new Date();
  courseEnd.setHours(stoptHr);
  courseEnd.setMinutes(stopMin);
  const today = new Date();
  courseEnd.setFullYear(today.getFullYear());
  courseEnd.setMonth(today.getMonth());
  courseEnd.setDate(today.getDate());
  courseEnd.setSeconds("00");
  courseEnd.setMilliseconds("00");
  courseEnd = moment(new Date(courseEnd));
  const nowAndCourseEnd = moment.duration(courseEnd.diff(now)).asMinutes();
  console.log(nowAndCourseEnd);
  if (lastPlayed) {
    if (nowAndCourseEnd > 0) {
      return [false, (60 -nowAndCourseEnd)*60];
    } else {
      return [true, 0];
    }
  } else {
    return [false, (60 - nowAndCourseEnd)*60];
  }
};
