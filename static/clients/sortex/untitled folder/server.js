var express = require('express'),
        app = express.createServer(),
    request = require('request'),
    bind = require('bind');
    

         function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

// configuration
app.configure(function() {
  app.use(express.logger());
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser()); // form parsing
  app.use(express.methodOverride()); // for restful actions overriding post to put in update etc..
});

// development
app.configure('development', function() {
 
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

var json = {
  "upnav" : [
    {
      "file" : "intro.html",
      "name" : "Начало",
      "slug" : "home"
    },
    {
      "file" : "link2.html",
      "name" : "Линк 2",
      "slug" : "link2"
    },
  ],  "dunav" : [
    {
      "file" : "intro.html",
      "name" : "Начало",
      "slug" : "home"
    },
    {
      "file" : "link2.html",
      "name" : "Линк 2",
      "slug" : "go-link2"
    },
  ]
}


app.get('/slavian/', function(req, res) {
 
   
      bind.toFile(__dirname+"/indexa.html", json,
            function callback(data) { 
              res.end(data);
            });
});


app.get('/slavian/:id-html', function(req, res) {
 
   
      bind.toFile(__dirname+"/indexa.html", json,
            function callback(data) { 
              res.end(data);
            });
});


 

app.all('/posts', function(req, res) {
  console.log(req.method);
  if(req.method == "POST") {
  post = req.body.post;
  post.slug = convertToSlug.post.title;
  db.insert(post, function(err, body, headers) {
    if (!err) {
      console.log("Something went wrong. Error: " + err);
  
      res.end('ok')
    }
 
  });

      } else {

       bind.toFile(__dirname+"/admin.html", {},
            function callback(data) { 
              res.end(data);
            });
    }
});

app.get('/posts/:id', function(req, res) {
  db.get(req.params.id, function(err, data) {
    if (err) {
      console.log("ERRORS: ", err);
      res.render('shared/404.jade', { title: "404 Not found" });
    }
    post = data
    res.render('posts/show.jade', { title: post.title, post: post });
  });
});

app.listen(93);

