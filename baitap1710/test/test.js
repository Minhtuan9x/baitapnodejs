process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../app');
var Blob = require("../models/student");
var should = chai.should();
chai.use(chaiHttp);


var student = {
    'id': 123,
    'firstName': 'Do Minh',
    'lastName': 'Tuan',
    'birthDay': '24/08/99',
    'address': {
        'homeAddress': 'Dak Ha',
        'city': 'Kon Tum'
    }
}

var tescase1 = {//TIM KIEM
    "SUCCESS": {
        'id': 123,
        'firstName': 'Do Minh',
        'lastName': 'Tuan',
        'birthDay': '24/08/99',
        'address': {
            'homeAddress': 'Dak Ha',
            'city': 'Kon Tum'
        }
    }
}
var tescase2 = {//THEM
    "SUCCESS": {
        'message': 'Them thanh cong!!',
        'data': {
            'id': 123,
            'firstName': 'Do Minh',
            'lastName': 'Tuan',
            'birthDay': '24/08/99',
            'address': {
                'homeAddress': 'Dak Ha',
                'city': 'Kon Tum'
            }
        }
    }
}
var tescase3 = {//XOA
    "SUCCESS": {
        'message': 'Da xoa sv!!!',
    }
}
var tescase4 = {//find All
    "SUCCESS": [
        {
            'id': 123,
            'firstName': 'Do Minh',
            'lastName': 'Tuan',
            'birthDay': '24/08/99',
            'address': {
                'homeAddress': 'Dak Ha',
                'city': 'Kon Tum'
            }
        }
    ]
}

it('tim kiem sinh vien', function (done) {
    chai.request(server)
        .get('/student/:id')
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('SUCCESS');
            res.body.SUCCESS.should.be.a('object');
            res.body.SUCCESS.should.have.property('id');
            res.body.SUCCESS.should.have.property('firstName');
            res.body.SUCCESS.should.have.property('lastName');
            res.body.SUCCESS.should.have.property('birthDay');
            res.body.SUCCESS.should.have.property('address').should.be.a('array');
            res.body.SUCCESS.should.have.property('address').property('homeAddress');
            res.body.SUCCESS.should.have.property('address').property('city');
            res.body.SUCCESS.id.should.equal(123);
            res.body.SUCCESS.firstName.should.equal('Do Minh');
            res.body.SUCCESS.lastName.should.equal('Tuan');
            done();
        });
});



it('them 1 sinh vien', function (done) {
    chai.request(server)
        .post('/student')
        .send(student)
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('SUCCESS');
            res.body.SUCCESS.should.be.a('object');
            res.body.SUCCESS.should.have.property('message');
            res.body.SUCCESS.message.should.equal('Them thanh cong!!')
            res.body.SUCCESS.should.have.property('data');
            res.body.SUCCESS.data.should.be.have.a('object');
            res.body.SUCCESS.data.should.have.property('id');
            res.body.SUCCESS.data.should.have.property('firstName');
            res.body.SUCCESS.data.should.have.property('lastName');
            res.body.SUCCESS.data.should.have.property('birthDay');
            res.body.SUCCESS.data.address.should.be.a('array');
            res.body.SUCCESS.data.address.property('homeAddress');
            res.body.SUCCESS.data.address.property('city');
            res.body.SUCCESS.data.id.should.equal(123);
            res.body.SUCCESS.data.firstName.should.equal('Do Minh');
            res.body.SUCCESS.data.lastName.should.equal('Tuan');
            done();
        });
});

it('xoa 1 sinh vien', function (done) {
    chai.request(server)
        .delete('/student/:id')
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('SUCCESS');
            res.body.SUCCESS.should.be.a('object');
            res.body.SUCCESS.should.have.property('message');
            res.body.SUCCESS.should.have.property('message').equal('Da xoa sv!!!');
            done();
        });
});

it('get All SV', (done) => {
    chai.request(server)
        .get('/student')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.SUCCESS.be.a('array');
            done();
        });
});