(() => {
    "use strict";

    // Include only specified properties.
    const sieve = (objectOrArray, sieve) => {
        // Sieve operates in two ways:
        // 1. if the thing is an object: -> Behaves as if an array of length 1 is passed in.
        // 2. if the thing is an array: -> Return an array with all subobjects plucked

        // Base implementation
        const sieveObject = (obj, props) => {
            // Use all the props and iterate the object
            const sievedObj = {};
            for(let i = 0; i < props.length; ++i) {
                if(props[i] in obj) {
                    sievedObj[props[i]] = obj[props[i]];
                }
            }

            return sievedObj;
        };

        // Form Logic
        if(objectOrArray instanceof Array) {
            return objectOrArray.map(o => sieveObject(o, sieve));
        }

        else {
            return sieveObject(objectOrArray, sieve);
        }
    };

    // Exclude the specified properties. Opposite of Sieve function.
    const pluck = (objectOrArray, pluck) => {
        const pluckObject = (obj, props) => {
            const pluckedObj = Object.assign({}, obj);
            for(let i = 0; i < props.length; ++i) {
                if(pluckedObj.hasOwnProperty(props[i])) {
                    delete pluckedObj[props[i]];
                }
            }

            return pluckedObj;
        };

        if(objectOrArray instanceof Array) {
            return objectOrArray.map(o => pluckObject(o, pluck));
        }
        else {
            return pluckObject(objectOrArray, pluck);
        }
    };

    module.exports = {
        pluck: pluck,
        sieve: sieve
    };
})();

