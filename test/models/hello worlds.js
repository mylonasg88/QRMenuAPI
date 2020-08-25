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
var Helloworld;
// Testing The Helloworld Model
describe('Helloworld Model',function(){

    var id;
    var id2;

    before(function(){  /* jslint ignore:line */
        Helloworld = require('../../models/Helloworlds');
        var workers = require('../../services/queue/workers');
        var workers1 = require('../../services/queue/workers');
        var workers2 = require('../../services/queue/workers');
        var workers3 = require('../../services/queue/workers');
    });

    describe('Test CRUDS', function(){
        it('should save data', function(done){
            var myhello world = Helloworld.create({name: 'femi'});

            myhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should read data', function(done){
            var myhello world = Helloworld.findOne({name: 'femi'});

            myhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should read all data', function(done){
            var myhello world = Helloworld.find();

            myhello world.then(function(res){
                res.should.be.an.array; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should update data', function(done){
            var cb = sinon.spy();
            var myhello world = Helloworld.updateMany({name: 'femi'},{name: 'Olaoluwa'});

            myhello world.then(function(res){
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
            var myhello world = Helloworld.updateMany({name: 'femi'},{name: 'Olaoluwa Olanipekun'});

            myhello world.then(function(res){
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
            var myhello world = Helloworld.search('femi');

            myhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should delete data', function(done){
            var cb2 = sinon.spy();
            var ourhello world = Helloworld.create([{name:'Olaolu'},{name: 'fola'},{name: 'bolu'}]);

            ourhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                return Helloworld.deleteOne({name: 'bolu'});
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
            var myhello world = Helloworld.deleteMany({name: 'femi'});

            myhello world.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should add createdAt', function(done){
            var myhello world = Helloworld.create({name: 'this is for the gods'});

            myhello world.then(function(res){
                id = res._id;
                res.should.have.property('createdAt');
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should add updatedAt', function(done){
            var myhello world = Helloworld.create({name: 'i am a demigod!'});
            myhello world.then(function(res){
                id2 = res._id;
                return Helloworld.updateMany({_id: id},{name: 'This is the titan'});
            })
            .then(function(res){
                return Helloworld.findById(id);
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
            var myhello world = await Helloworld.create({name: 'femi',someOtherStringData: 'stuff'});
            
            return q.Promise(function(resolve, reject) {
            setTimeout(function(){
                Helloworld.findById(myhello world._id)
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
            var myhello world = Helloworld.estimatedDocumentCount({name: 'This is the titan'});

            myhello world.then(function(res){
                res.should.be.a.number; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id', function(done){
            var myhello world = Helloworld.findById(id);

            myhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id and delete', function(done){
            var myhello world = Helloworld.findByIdAndRemove(id2);

            myhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id and update', function(done){
            var myhello world = Helloworld.findByIdAndUpdate(id,{name: 'fufu'});

            myhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find the first match from a query', function(done){
            var myhello world = Helloworld.findOne({name: 'fufu'});

            myhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find the first match from a query and update', function(done){
            var myhello world = Helloworld.findOneAndUpdate({name: 'fufu'},{name: 'funmi'});

            myhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find the first match from a query and delete', function(done){
            var myhello world = Helloworld.findOneAndRemove({name: 'funmi'});

            myhello world.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

    });
});
