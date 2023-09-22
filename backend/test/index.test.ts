import request from 'supertest';
import {describe, expect, it} from "@jest/globals";
import app from "../src/app";


describe('GET => API root /', () => {
    it('should return text response', function () {
        return request(app).get('/')
            .expect(200)
            .then(res => {
                expect(res.text).toBe('basic stuff bro');
            })

        // expect(res.text).toBe('basic stuff bro');
    });
})