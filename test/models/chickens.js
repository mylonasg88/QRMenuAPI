'use strict';

var chai = require('chai');
chai.should();
var config = require('../../config');
var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
var mongooseMock = require('mongoose-mock');
// var expect = chai.expect;
var sinon = require('sinon');
var q = require('q');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var Chicken;
// Testing The Chicken Model
describe('Chicken Model',function(){

    var id;
    var id2;

    before(function(){  /* jslint ignore:line */
        Chicken = require('../../api/src/Models/Chickens');
        var workers = require('../../services/queue/workers');
        var workers1 = require('../../services/queue/workers');
        var workers2 = require('../../services/queue/workers');
        var workers3 = require('../../services/queue/workers');
    });

    describe('Test CRUDS', function(){
        it('should save data', function(done){
            var mychicken = Chicken.create({name: 'femi'});

            mychicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should read data', function(done){
            var mychicken = Chicken.findOne({name: 'femi'});

            mychicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should read all data', function(done){
            var mychicken = Chicken.find();

            mychicken.then(function(res){
                res.should.be.an.array; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should update data', function(done){
            var cb = sinon.spy();
            var mychicken = Chicken.updateMany({name: 'femi'},{name: 'Olaoluwa'});

            mychicken.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should update many data', function(done){
            var cb = sinon.spy();
            var mychicken = Chicken.updateMany({name: 'femi'},{name: 'Olaoluwa Olanipekun'});

            mychicken.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should search data', function(done){
            // Search needs more work for more accuracy
            var mychicken = Chicken.search('femi');

            mychicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should delete data', function(done){
            var cb2 = sinon.spy();
            var ourchicken = Chicken.create([{name:'Olaolu'},{name: 'fola'},{name: 'bolu'}]);

            ourchicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                return Chicken.deleteOne({name: 'bolu'});
            }).then(function(res){
                cb2();
                cb2.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should delete many data', function(done){
            var cb = sinon.spy();
            var mychicken = Chicken.deleteMany({name: 'femi'});

            mychicken.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should add createdAt', function(done){
            var mychicken = Chicken.create({name: 'this is for the gods'});

            mychicken.then(function(res){
                id = res._id;
                res.should.have.property('createdAt');
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should add updatedAt', function(done){
            var mychicken = Chicken.create({name: 'i am a demigod!'});
            mychicken.then(function(res){
                id2 = res._id;
                return Chicken.updateMany({_id: id},{name: 'This is the titan'});
            })
            .then(function(res){
                return Chicken.findById(id);
            })
            .then(function(res){
                res.should.have.property('updatedAt');
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should tag database entries properly', async function(){
            var mychicken = await Chicken.create({name: 'femi',someOtherStringData: 'stuff'});

            return q.Promise(function(resolve, reject) {
            setTimeout(function(){
                Chicken.findById(mychicken._id)
                .then(function(res){
                    console.log(res);
                    res.tags.length.should.equal(2);/* jslint ignore:line */
                    resolve(res);
                })
                .catch(function(err){
                    reject(err);
                });
            },3000);
            });

        });

        it('should count returned records', function(done){
            var mychicken = Chicken.estimatedDocumentCount({name: 'This is the titan'});

            mychicken.then(function(res){
                res.should.be.a.number; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id', function(done){
            var mychicken = Chicken.findById(id);

            mychicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id and delete', function(done){
            var mychicken = Chicken.findByIdAndRemove(id2);

            mychicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id and update', function(done){
            var mychicken = Chicken.findByIdAndUpdate(id,{name: 'fufu'});

            mychicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find the first match from a query', function(done){
            var mychicken = Chicken.findOne({name: 'fufu'});

            mychicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find the first match from a query and update', function(done){
            var mychicken = Chicken.findOneAndUpdate({name: 'fufu'},{name: 'funmi'});

            mychicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find the first match from a query and delete', function(done){
            var mychicken = Chicken.findOneAndRemove({name: 'funmi'});

            mychicken.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

    });
});
