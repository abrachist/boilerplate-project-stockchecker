'use strict';

module.exports = function (app) {
  let dataBase = [{"stock":"MSFT","price":62.30,"likes":1},{"stock":"GOOG","price":786.90,"likes":1}];

  app.route('/api/stock-prices')
    .get(function (req, res){

      if(Array.isArray(req.query.stock)){
        let result = [];
        let likes =[];
        
        for (let i=0; i < req.query.stock.length; i++){
            // console.log(req.query.stock[i]); 
            dataBase.find(val => {
                let stockName = req.query.stock[i];
                if(val.stock == stockName.toUpperCase() ) {
                result.push({"stock": val.stock,
                  "price": val.price,
                  "rel_likes": val.likes
                });
                likes.push(val.likes);
              }
            })
        }
        
        result[0].rel_likes = result[0].rel_likes - likes[1];
        result[1].rel_likes = result[1].rel_likes - likes[0];
        
        res.json({
           "stockData": result
        });

        return;
        
      } else {
          dataBase.find(val => {     
            let stockName = req.query.stock;
            if(val.stock == stockName.toUpperCase()) {
                let increment = req.query.like ? 1:0;
                 val.likes= val.likes + increment;
                  
                  res.json({
                    "stockData": {"stock": val.stock,
                          "price": val.price,
                          "likes": val.likes
                    } });
                  return;
            }});         
      
      }
    
  });

}
