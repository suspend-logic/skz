"use strict";

const pluck = require("../").pluck;
const should = require("chai").should();

describe("pluck", () => {
    describe("single object", () => {
        it("Removes all properties specified with Object.keys", () => {
            const obj = {a: 10, b: 20};
            const result = pluck(obj, Object.keys(obj));
            should.exist(result);

            Object.keys(obj).forEach(key => {
                result.should.not.have.property(key);
            });
        });

        
        it("Pluckes just one specified property", () => {
            const obj = {a: 10, b: false};
            const result = pluck(obj, ["a"]);

            should.exist(result);
            result.should.have.property("b").eq(obj.b);
            result.should.not.have.property("a")
        });

        
        it("Plucks multiple specified properties", () => {
            const obj = {a: {p: 1}, b: false, c: 0};
            const result = pluck(obj, ["a", "b"]);

            should.exist(result);
            result.should.not.have.property("a");
            result.should.not.have.property("b");
            result.should.have.property("c").eq(obj.c);
        });
        
        it("Plucks multiple specified properties, even if overlap is not perfect", () => {
            const obj = {a: {p: 1}, b: false, c: 0};
            const result = pluck(obj, ["a", "b", "f"]);

            should.exist(result);
            result.should.not.have.property("a");
            result.should.not.have.property("b");
            result.should.not.have.property("f");
            result.should.have.property("c").eq(obj.c);
        });
    });

    
    describe("Arrays", () => {
        it("Removes all properties on an array of objects, specified with Object.keys", () => {
            const objArr = [{a: 10, b: 25}, {a: 20, b: 25}, {a: 35, b: 55}];
            const result = pluck(objArr, Object.keys(objArr[0]));

            should.exist(result);
            result.should.be.an("array");
            
            result.forEach((o, ix) => {
                Object.keys(objArr[ix]).forEach(key => {
                    o.should.not.have.property(key);
                });
            });
        });

        
        it("Removes just one specified property", () => {
            const objArr = [{a: 10, b: 25}, {a: 20, b: 25}, {a: 35, b: 55}];
            const result = pluck(objArr, ["a"]);

            should.exist(result);
            result.should.be.an("array");

            result.forEach((o, ix) => {
                Object.keys(objArr[ix]).forEach(key => {
                    if(key !== "b") {
                        o.should.not.have.property(key);
                    }
                    else {
                        o.should.have.property(key).eq(objArr[ix][key]);
                    }
                });
            });
        });
        
        it("Returns multiple specified properties, even if overlap is not perfect", () => {
            const objArr = [{a: 10, b: 25, c: false}, {a: 20, b: 25, c: true, f: 20}, {a: 35, b: 55, c: null}];

            const result = pluck(objArr, ["a", "c", "f"]);

            should.exist(result);
            result.should.be.an("array");

            result.forEach((o, ix) => {
                Object.keys(objArr[ix]).forEach(key => {
                    if(key !== "b") {
                        o.should.not.have.property(key);
                    }
                    else {
                        o.should.have.property(key).eq(objArr[ix][key]);
                    }
                });
            });
        });
    });
});