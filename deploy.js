
var Ship = require('ship');
var project = new Ship({
	root: 'public',
	deployer: 'gh-pages'
});

project.configure({
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	repo: 'axelboc/website-bs'
});
 
project.deploy()
  .progress(console.log.bind(console))
  .done(function(res){
    console.log('successfully deployed!');
    console.log(res);
  }, function(err){
    console.log('deploy failed:');
    console.log(err);
  });
