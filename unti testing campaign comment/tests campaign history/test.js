let mongoose = require('mongoose')
let { campaign, history } = require('../models')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index.js')
let should = chai.should()
let fs = require('fs')
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMmQwZGMzN2YtOTkyOS00YjY3LWI5ZmUtYzM0MWZhZjhmM2JlIiwiZW1haWwiOiJwdWRqaUBleGFtLmNvbSJ9LCJpYXQiOjE2MTI1Mzg5NTd9.Va6lBBSmtRKuZdNA6x7V0iuAk7ewODWSRQ57UOurtpw'
let admin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZTVkZjhiNDYtYmQzYS00MWNmLTk4MzYtYzIzYzNkNzIyNmQ3IiwiZW1haWwiOiJwdWRqaUBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjEyNTUxMTU5fQ.v9fsH0eejNQg6TTL6HCylv8DJ-lY5-Ee82DxNEX9GXs'
let campaignId = "601d6d70ba4c9418b029dd41"
let campaignDelete = '600f07e77dd7304a51599551'
// let userId = "2d0dc37f-9929-4b67-b9fe-c341faf8f3be"
chai.use(chaiHttp)

describe('CAMPAIGN API', () => {

    describe('/GET all campaign', () => {
        it('It should get all the campaign', (done) => {
            chai.request(server)
                .get('/campaign')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('status').eql('Succes get all the data');
                    res.body.should.have.property('data');
                    res.body.data.should.be.an('array')
                    res.body.should.have.property('totalPages')
                    res.body.should.have.property('currentPage')
                    done()
                })
        })
    })

    describe('/GET all campaign for admin', () => {
        it('It should get all the campaign for admin', (done) => {
            chai.request(server)
                .get('/campaign/byadmin')
                .set({
                    Authorization: `Bearer ${admin}`
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('status').eql('Succes get all the data');
                    res.body.should.have.property('posts');
                    res.body.posts.should.be.an('array')
                    res.body.should.have.property('totalPages')
                    res.body.should.have.property('currentPage')
                    done()
                })
        })
    })

    describe('/GET ONE AXIOS', () => {
        it('It should get one campaign', (done) => {
            chai.request(server)
                .get('/campaign/get/' + campaignId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Success to get one campaign!')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('object')
                    done()
                })
        })
    })

    describe('/GET ONE', () => {
        it('It should get one campaign', (done) => {
            chai.request(server)
                .get('/campaign/getone/' + campaignId)
                .set({
                    Authorization: `Bearer ${token}`
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Success to get one campaign!')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('object')
                    done()
                })
        })
    })

    describe('/GET BY NEWEST CAMPAIGN', () => {
        it('It should get newest campaign', (done) => {
            chai.request(server)
                .get('/campaign/new')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Succes get all the data')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })

    describe('/GET BY MOST URGENT', () => {
        it('It should get most urgent campaign', (done) => {
            chai.request(server)
                .get('/campaign/urgen')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Succes get all the data')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })

    describe('/GET BY MOST POPULER', () => {
        it('It should get most populer campaign', (done) => {
            chai.request(server)
                .get('/campaign/populer')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Succes get all the data')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })

    describe('/GET BY LESS DONATION', () => {
        it('It should get less donation campaign', (done) => {
            chai.request(server)
                .get('/campaign/donation')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Success get all the data')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })

    describe('/GET BY CATEGORY', () => {
        it('It should get campaign by category', (done) => {
            chai.request(server)
                .get('/campaign/category')
                .query({
                    category: "horor",
                    page: 1,
                    limit: 1
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Succes get all the data')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })

    describe('/GET BY TITLE', () => {
        it('It should get campaign by title', (done) => {
            chai.request(server)
                .get('/campaign/title')
                .query({
                    title: "bantu",
                    page: 1,
                    limit: 1
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Succes get all the data')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })

    describe('/GET BY USER', () => {
        it('It should get campaign by user', (done) => {
            chai.request(server)
                .get('/campaign/user')
                .query({
                    user_id: '2d0dc37f-9929-4b67-b9fe-c341faf8f3be',
                    page: 1,
                    limit: 1
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Success get all campaign sort by user!')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })

    describe('/CREATE CAMPAIGN', () => {
        it('It should create camapign', (done) => {
            chai.request(server)
                .post('/campaign/create')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .field('title', 'tsunami afrika')
                .field('goal', 3000000)
                .field('due_date', '2020-01-01')
                .field('category','bencana')
                .field('story','ada desa terkena bencana')
                .attach('images',fs.readFileSync('/home/pudji/Pictures/bencana.png'),'bencana.png')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('success created data')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('object')
                    done()
                })
        })
    })

    describe('/UPDATE CAMPAIGN', () => {
        it('It should update camapign', (done) => {
            chai.request(server)
                .put('/campaign/update/campaign/'+ campaignId)
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    title : "bencana hujan emas",
                    goal : 3000000,
                    due_date:"2020-11-11",
                    category: "bencana",
                    story:"diamana diddesa"
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('success update data')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('object')
                    done()
                })
        })
    })

    describe('/UPDATE IMAGES CAMPAIGN', () => {
        it('It should update images camapign', (done) => {
            chai.request(server)
                .put('/campaign/update/images/'+ campaignId)
                .set({
                    Authorization: `Bearer ${token}`
                })
                .attach('images',fs.readFileSync('/home/pudji/Pictures/bencana.png'),'bencana.png')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('success update image')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('object')
                    done()
                })
        })
    })

    describe('/UPDATE TOTAL SHARE', () => {
        it('It should update total share', (done) => {
            chai.request(server)
                .put('/campaign/update/share/'+ campaignId)
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    total_share: 10
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('success update data')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('object')
                    done()
                })
        })
    })

    describe('/UPDATE STATUS CAMPAIGN', () => {
        it('It should update status camapign', (done) => {
            chai.request(server)
                .put('/campaign/update/status/'+ campaignId)
                .set({
                    Authorization: `Bearer ${admin}`
                })
                .send({
                    status : "open"
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Succes update status')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('object')
                    done()
                })
        })
    })

    describe('/UPDATE WALLET', () => {
        it('It should update wallet', (done) => {
            chai.request(server)
                .put('/campaign/update/wallet/'+ campaignId)
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    wallet : 50000
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Succes update wallet')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('object')
                    done()
                })
        })
    })

    describe('/DELETE campaign', () => {
        it('It should delete a campaign', (done) => {
            chai.request(server)
                .delete('/campaign/delete/' + campaignDelete)
                .set({
                    Authorization: `Bearer ${token}`
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status').eql('Succes delete data')
                    res.body.should.have.property('data').eql(null)
                    done()
                })
        })
    })
    
})

describe('HISTORY API', ()=>{

    describe('/GET all history', () => {
        it('It should get all the history', (done) => {
            chai.request(server)
                .get('/history/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('status').eql('Success get all history data!');
                    res.body.should.have.property('data');
                    res.body.data.should.be.an('array')
                    res.body.should.have.property('totalPages')
                    res.body.should.have.property('currentPage')
                    done()
                })
        })
    })

    describe('/GET one history', () => {
        it('It should get one history', (done) => {
            chai.request(server)
                .get('/history/get')
                .query({
                    history_id : "601022aa0a515b134dead251"
                    })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('status').eql('Success get one history data!');
                    res.body.should.have.property('data');
                    res.body.data.should.be.an('object')
                    done()
                })
        })
    })

    describe('/GET history by user', () => {
        it('It should get history by user', (done) => {
            chai.request(server)
                .get('/history/get/user')
                .query({
                    user_id : "2d0dc37f-9929-4b67-b9fe-c341faf8f3be"
                    })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('status').eql('Success get all the history data sort by user!');
                    res.body.should.have.property('data');
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })

    describe('/GET history by campaign', () => {
        it('It should get history by campaign', (done) => {
            chai.request(server)
                .get('/history/get/campaign')
                .query({
                page : 1,
                limit: 10,
                campaign_id : "600f0ce7e8a472515256771c"   
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('status').eql('Success get all the history data sort by campaign!');
                    res.body.should.have.property('data');
                    res.body.data.should.be.an('array')
                    done()
                })
        })
    })
    
})
