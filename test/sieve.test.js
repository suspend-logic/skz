"use strict";

const sieve = require("../").sieve;
const should = require("chai").should();

describe("sieve", () => {
    describe("single object", () => {
        it("Allows all properties specified with Object.keys", () => {
            const obj = {a: 10, b: 20};
            const result = sieve(obj, Object.keys(obj));
            should.exist(result);
            result.should.deep.equals(obj);
        });

        it("Returns just one specified property", () => {
            const obj = {a: 10, b: false};
            const result = sieve(obj, ["a"]);

            should.exist(result);
            result.should.have.property("a").eq(obj.a);
        });

        it("Returns multiple specified properties", () => {
            const obj = {a: {p: 1}, b: false, c: 0};
            const result = sieve(obj, ["a", "b"]);

            should.exist(result);
            result.should.have.property("a").eq(obj.a);
            result.should.have.property("b").eq(obj.b);
        });

        it("Returns specified properties, even if overlap is not perfect", () => {
            const obj = {a: {p: 1}, b: false, c: 0};
            const result = sieve(obj, ["a", "b", "f"]);

            should.exist(result);
            result.should.have.property("a").eq(obj.a);
            result.should.have.property("b").eq(obj.b);
            result.should.not.have.property("f");
        })
    });

    describe("Arrays", () => {
        it("Allows all properties on an array of objects, specified with Object.keys", () => {
            const objArr = [{a: 10, b: 25}, {a: 20, b: 25}, {a: 35, b: 55}];
            const result = sieve(objArr, Object.keys(objArr[0]));

            should.exist(result);
            result.should.be.an("array");
            
            result.forEach((o, ix) => {
                o.should.deep.eq(objArr[ix]);
            });
        });

        it("Returns just one specified property", () => {
            const objArr = [{a: 10, b: 25}, {a: 20, b: 25}, {a: 35, b: 55}];
            const result = sieve(objArr, ["a"]);

            should.exist(result);
            result.should.be.an("array");

            result.forEach((o, ix) => {
                o.should.have.property("a").eq(objArr[ix].a);
            });
        });

        it("Returns multiple specified properties", () => {
            const objArr = [{a: 10, b: 25, c: false}, {a: 20, b: 25, c: true}, {a: 35, b: 55, c: null}];

            const result = sieve(objArr, ["a", "c"]);

            should.exist(result);
            result.should.be.an("array");

            result.forEach((o, ix) => {
                o.should.have.property("a").eq(objArr[ix].a);
                o.should.have.property("c").eq(objArr[ix].c);
            });
        });
    });
});