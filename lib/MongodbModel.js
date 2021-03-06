/**

	MongodbModel
	lujun
	https://github.com/jserme/node-mongoskin#quickstart


*/

var config = require('../config');
var WebStatus = require('./WebStatus');
var mongodb = require('mongodb');

var MongodbModel = module.exports = function( collection ){
	this.collection = collection;
};

MongodbModel.prototype = {
	constructor:MongodbModel,
	mongodb:mongodb,
	objectId:function( id ){
		return new mongodb.ObjectID( String(id) );
	},
	opendb:function( callback, w ){
	
		var server = new mongodb.Server(config.db, config.port, {});
		var db = new mongodb.Db('webchat', server, {w:w||1});
		var collection = this.collection;
		
		db.open(function( err, client ){
			callback(new mongodb.Collection(client, collection), db );
		});
	},
	
	insert:function( json , callback ){
		this.opendb(function( collection, db ){
			collection.insert( json, function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result[0]) );
				}
				db.close();
			});
		});
	},
	
	find:function( selecter, callback ){
	
		this.opendb(function( collection, db ){
			collection.find( selecter ).toArray(function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result || []) );
				}
				db.close();
			});
		});
		
	},

	findFilter:function( selecter, json, callback ){
	
		this.opendb(function( collection, db ){
			collection.find( selecter, json ).toArray(function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
		
	},


	findLimit:function(selecter, limit){
		this.opendb(function( collection, db ){
			collection.find( selecter ).limit( limit ).toArray(function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
	},
	findSort:function(selecter, sorter, callback){
	
		this.opendb(function( collection, db ){
			collection.find( selecter ).sort( sorter ).toArray(function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
		
	},
	findLimitSort:function(selecter, limiter, sorter, callback){
		this.opendb(function( collection, db ){
			collection.find( selecter ).limit( limiter ).sort( sorter ).toArray(function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
	},
	findLimitSkip:function(selecter, limiter, skip, callback){
		this.opendb(function( collection, db ){
			collection.find( selecter ).limit( limiter ).skip( skip ).toArray(function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
	},
	findLimitSkipSort:function(selecter, limiter, skip, sort, callback){
		this.opendb(function( collection, db ){
			collection.find( selecter ).limit( limiter ).skip( skip ).sort( sort ).toArray(function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
	},
	findOne:function( selecter ,callback){
	
		this.opendb(function( collection, db ){
			collection.findOne( selecter , function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else if(result){
					callback( new WebStatus().setResult(result) );
				}else{
					callback( new WebStatus("404") );	
				}
				db.close();
			});
		});
		
	},
	update:function( selecter, updater , callback){

		this.opendb(function( collection, db ){
			collection.update( selecter , {"$set":updater}, {multi:true}, function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
		
	},
	updateOne:function(selecter, updater, callback){
		this.opendb(function( collection, db ){
			collection.update( selecter , {"$set":updater}, function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
	},
	remove:function(selecter, callback){
		this.opendb(function( collection, db ){
			collection.remove( selecter , function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
	},
	count:function( selecter,  callback){
		this.opendb(function( collection, db ){
			collection.count( selecter , function(err, result){
				if( err ){
					callback( new WebStatus("601") );
				}else{
					callback( new WebStatus().setResult(result) );
				}
				db.close();
			});
		});
	}
	
}

