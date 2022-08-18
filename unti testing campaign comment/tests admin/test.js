let mongoose = require('mongoose')
let { admin } = require('../models')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index.js')
let should = chai.should()
let fs = require('fs')
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzBlYTAyZDAtNmZlYi00OGI0LWI5ZWUtMjhjMjc3ZjhkZGE3IiwiZW1haWwiOiJ1c2VyMkBleGFtLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2MTI2NjU3ODN9.88TBEPU-e85qc87WvdnShFtk3eBTvu5Ftk8hNQCnESE"
let tokenUpdatePass = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMmM3MDBmOWEtODhkYi00M2IyLThlMjEtMmI0NTU0NWEwOGYzIiwiZW1haWwiOiJ1c2VyMTBAZXhhbS5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjEyNjcwMTY4fQ.5PJB0Nclv7S2cnxKcSWtAe5GtpV8DhYzGJCiqyVfgmQ"
let tokenDelete = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMzJiN2M3NTAtZGU1Ny00ZDZlLWE5NDctOTY0Nzg5MTFlM2Q0IiwiZW1haWwiOiJkZWxldGVAZXhhbS5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjEyNjcxMTU1fQ.5I3E-X6shUqcZgXEF7lpO0EY3GRXQCGHoGo5ZUUPf3g"
let tokenEmail = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYmJkMmFhZjEtMjA4NS00Njg1LThhOWYtM2E5YTY2MDFhYTY5IiwiZW1haWwiOiJlbWFpbEBleGFtLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2MTI2NzE0MTl9.Dyv1W9H0AAJjwYJ15AXBM1jHAjZD9XMkUwPNw_dlg9w"
chai.use(chaiHttp)

describe('ADMIN API', () => {

    describe('/POST SIGNUP', () => {
        it('It should signup', (done) => {
            chai.request(server)
                .post('/admin/signup')
                .send({
                    name : "create",
                    email : "create@exam.com",
                    password : "12345678",
                    passwordConfirmation : "12345678"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Signup success!');
                    res.body.should.have.property('token')
                    done()
                })
        })
    })

    describe('/POST LOGIN', () => {
        it('It should login', (done) => {
            chai.request(server)
                .post('/admin/login')
                .send({
                    email : "user9@exam.com",
                    password : "12345678",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Login success!');
                    res.body.should.have.property('token')
                    done()
                })
        })
    })

    describe('/POST AUTHORIZATION', () => {
        it('It should authorization', (done) => {
            chai.request(server)
                .get('/admin/authorization')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('status').eql('Success!');
                    res.body.should.have.property('message').eql('Authorized!');
                    res.body.should.have.property('user')
                    res.body.user.should.have.be.an('object')
                    done()
                })
        })
    })

    describe('/GET ONE', () => {
        it('It should get one', (done) => {
            chai.request(server)
                .get('/admin/get')
                .query({
                    admin_id : "70ea02d0-6feb-48b4-b9ee-28c277f8dda7"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Success!');
                    res.body.should.have.property('data')
                    res.body.data.should.have.be.an('object')
                    done()
                })
        })
    })

    describe('/GET ALL', () => {
        it('It should get all', (done) => {
            chai.request(server)
                .get('/admin/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Success!');
                    res.body.should.have.property('data')
                    res.body.data.should.have.be.an('array')
                    done()
                })
        })
    })

    describe('/GET PROFILE', () => {
        it('It should get profile', (done) => {
            chai.request(server)
                .get('/admin/profile')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Success!');
                    res.body.should.have.property('data')
                    res.body.data.should.have.be.an('object')
                    done()
                })
        })
    })

    describe('/UPDATE PROFILE', () => {
        it('It should update profile', (done) => {
            chai.request(server)
                .put('/admin/update/profile')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    name : "new user",
                    bank_name :"BANK X",
                    bank_account_number: "123456789"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Update profile success!');
                    res.body.should.have.property('data')
                    res.body.data.should.have.be.an('object')
                    done()
                })
        })
    })

    describe('/UPDATE EMAIL', () => {
        it('It should update email', (done) => {
            chai.request(server)
                .put('/admin/update/email')
                .set({
                    Authorization: `Bearer ${tokenEmail}`
                })
                .send({
                 email : "newemail@exam.com"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql("Update email success!");
                    res.body.should.have.property('data')
                    res.body.data.should.have.be.an('object')
                    done()
                })
        })
    })

    describe('/UPDATE PASSWORD', () => {
        it('It should update password', (done) => {
            chai.request(server)
                .put('/admin/update/password')
                .set({
                    Authorization: `Bearer ${tokenUpdatePass}`
                })
                .send({
                 password : "87654321",
                 passwordConfirmation : "87654321"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql("Update password success!");
                    res.body.should.have.property('data')
                    res.body.data.should.have.be.an('object')
                    done()
                })
        })
    })

    describe('/DELETE PROFILE', () => {
        it('It should delete profile', (done) => {
            chai.request(server)
                .delete('/admin/delete')
                .set({
                    Authorization: `Bearer ${tokenDelete}`
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql("Delete profile success!");
                    res.body.should.have.property('data').eql(null)
                    done()
                })
        })
    })

})

