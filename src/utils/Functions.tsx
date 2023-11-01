import { formatDistanceToNow } from "date-fns";


export function convertToK(num: number) {
  if (num > 1000000000) {
    const intPart = Math.floor(num / 1000000000);
    const decPart = Math.floor((num % 1000000000) / 100000000);
    if (decPart > 0) {
      return `${intPart},${decPart}B`;
    }
    return `${intPart}B`;
  } else if (num > 1000000) {
    const intPart = Math.floor(num / 1000000);
    const decPart = Math.floor((num % 1000000) / 100000);
    if (decPart > 0) {
      return `${intPart},${decPart}M`;
    }
    return `${intPart}M`;
  } else if (num > 1000) {
    const intPart = Math.floor(num / 1000);
    const decPart = Math.floor((num % 1000) / 100);
    if (decPart > 0) {
      return `${intPart},${decPart}K`;
    }
    return `${intPart}K`;
  } else {
    return `${num}`;
  }
}

export function isLongDescription(description: string) {
  if (description.length > 40) {
    return {
      isLong: true,
      description: description.substring(0, 40).trim() + '...',
    }
  }
  return {
    isLong: false,
    description: description,
  }
}

export function convertDatetime(datetime: string) {
  const date = new Date(datetime);
  const distance = formatDistanceToNow(date, { addSuffix: true });
  // check 'about' in distance
  if (distance.indexOf('about') === 0) {
    return distance.substring(6);
  }
  return distance;
}
export function roundNumber(number) {
  if (number - Math.floor(number) < 0.5) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
}

export function datetimeDelta(from: string | null, to: string) {
  if (from) {
    var fromDatetime = new Date(from);
  } else {
    fromDatetime = new Date();
  }
  var toDatetime = new Date(to);
  var delta = Math.abs(toDatetime.getTime() - fromDatetime.getTime()) / 1000;

  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  var months = Math.floor(days / 30);
  delta -= months * 30 * 86400;

  var years = Math.floor(days / 365);

  if (years > 100) {
    return "Lifetime";
  }

  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  var seconds = Math.floor(delta % 60);

  if (years > 0) {
    return `${years} years`;
  } else if (months > 0) {
    return `${months} months`;
  } else if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
}
