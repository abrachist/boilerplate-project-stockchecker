const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
     let likes;

    suite('GET /api/stock-prices => stockData object', function() {
      
     test('Viewing one stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){

          //complete this one too
          assert.equal(res.status, 200);
          assert.property(res.body, 'stockData');
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.property(res.body.stockData, 'likes');
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.isNumber(res.body.stockData.price);
          assert.isNumber(res.body.stockData.likes);

          done();
        });
      });

     test('Viewing one stock and liking it', function(done) {

        chai.request(server)
          .get('/api/stock-prices')
          .query({stock: 'goog', like: true})
          .end(function(err, res){
            
            assert.equal(res.status, 200);
            assert.property(res.body, 'stockData');
            assert.property(res.body.stockData, 'stock');
            assert.property(res.body.stockData, 'price');
            assert.property(res.body.stockData, 'likes');
            assert.equal(res.body.stockData.stock, 'GOOG');
            assert.isNumber(res.body.stockData.price);
            assert.isNumber(res.body.stockData.likes);
            assert.isAtLeast(res.body.stockData.likes, 1);
            likes=res.body.stockData.likes;

            done();
          });
      });

     test('Viewing the same stock and liking it again', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({stock: 'goog', like: true})
          .end(function(err, res){

            assert.equal(res.status, 200);
            assert.property(res.body, 'stockData');
            assert.property(res.body.stockData, 'stock');
            assert.property(res.body.stockData, 'price');
            assert.property(res.body.stockData, 'likes');
            assert.equal(res.body.stockData.stock, 'GOOG');
            assert.isNumber(res.body.stockData.price);
            assert.isNumber(res.body.stockData.likes);
                        
            done();
          });
    });

     test('Viewing two stocks', function(done) {

        chai.request(server)
          .get('/api/stock-prices')
          .query({stock: ['goog', 'msft']})
          .end(function(err, res){
            
            assert.equal(res.status, 200);
            assert.property(res.body, 'stockData');
            assert.property(res.body.stockData[0], 'stock');
            assert.property(res.body.stockData[0], 'price');
            assert.property(res.body.stockData[0], 'rel_likes');
            assert.equal(res.body.stockData[0].stock, 'GOOG');
            assert.isNumber(res.body.stockData[0].price);
            assert.isNumber(res.body.stockData[0].rel_likes);

            assert.property(res.body.stockData[1], 'stock');
            assert.property(res.body.stockData[1], 'price');
            assert.property(res.body.stockData[1], 'rel_likes');
            assert.equal(res.body.stockData[1].stock, 'MSFT');
            assert.isNumber(res.body.stockData[1].price);
            assert.isNumber(res.body.stockData[1].rel_likes);

            done();
          });
      });

     test('Viewing two stocks and liking them', function(done) {

        chai.request(server)
          .get('/api/stock-prices')
          .query({stock: ['goog', 'msft'], like: true})
          .end(function(err, res){

            assert.equal(res.status, 200);
            assert.property(res.body, 'stockData');
            assert.property(res.body.stockData[0], 'stock');
            assert.property(res.body.stockData[0], 'price');
            assert.property(res.body.stockData[0], 'rel_likes');
            assert.equal(res.body.stockData[0].stock, 'GOOG');
            assert.isNumber(res.body.stockData[0].price);
            assert.isNumber(res.body.stockData[0].rel_likes);

            assert.property(res.body.stockData[1], 'stock');
            assert.property(res.body.stockData[1], 'price');
            assert.property(res.body.stockData[1], 'rel_likes');
            assert.equal(res.body.stockData[1].stock, 'MSFT');
            assert.isNumber(res.body.stockData[1].price);
            assert.isNumber(res.body.stockData[1].rel_likes);

            done();
          });
      });
      
    })
});
