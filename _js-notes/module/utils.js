const utils = {
    warning(mensage) {
        console.warn(mensage);
    },

    error(mensage) {
        console.error(mensage);
    },

    chido(mensage) {
        console.log(
            `%c ${mensage}`,
            "font-size:14px; background:red; text-shadow: 1px 1px 1px #000"
        );
    },

    asecendingOrderArray(arr) {
        return arr.sort((a, b) => {
            return a - b    
        })
    },

    isPrime(num) {
        for(let i = 2; i < num; i++)
          if(num % i === 0) return false;
        return num > 1;
      }
};

Object.freeze(utils);

export default utils;
