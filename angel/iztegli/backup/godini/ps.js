  var cp = require('child_process'),
      psTree = require('ps-tree')

  var child = cp.exec("htop",function () {

  })

  child.kill() //this will not actually kill the child it will kill the `sh` process.