   var db = require('../src/db.js');


   function register(data) {
     if (data.location) {
       var location = data.location.name.split(', ')
       var country = location[1];
       var city = location[0];
       // console.log(data.id + ' ' + data.gender + ' ' + country + ' ' + data.first_name + ' ' + city);

       if (country && country.length > 4) {
         db.put({
           key: data.gender + '' + country,
           id: data.id,
           name: data.first_name
         }, function(data) {

         })
         db.put({
           key: data.gender,
           id: data.id,
           name: data.first_name,
           country: country
         }, function(data) {

         })
         if (city && city.length > 4) {
           db.put({
             key: data.gender + '' + city,
             id: data.id,
             name: data.first_name
           }, function(data) {

           })
           db.get(city, function(value) {
             if (value.message) {
               db.put({
                 key: country,
                 val: city
               }, function(data) {

               });

               db.put(city, 'ok', function(err, merr) {});
               db.put({
                 key: country,
                 val: city
               }, function(data) {

               })

             }

           });
         }
         db.get(country, function(value) {
           if (value.message) {
             db.put({
               key: "countryz",
               val: country
             }, function(data) {
               db.put(country, 'ok', function(err, merr) {});
             });
           };
         });
       };

       db.put(data.id, data);

     };

   }

   function locations(data, callback) {
     if (data.location) {
       var json = {}
       var location = data.location.name.split(', ')
       json.country = location[1];
       json.city = location[0];
       json.gender = data.gender;
    callback(json)
     } else {
       callback(null)
     }

   }
   exports.locations = locations
    exports.register = register