export function debounce(func, wait = 300, immediate = false) {
  let timeout = null;

  return function (...args) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && timeout === null;

    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}