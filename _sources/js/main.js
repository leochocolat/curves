require('@shcc/gsap-core');
require('@shcc/environment');

var Superhero = require('@shcc/superhero-js');
var ApplicationRouter = require('routers/ApplicationRouter');
var ApplicationView = require('views/ApplicationView');

var namespace = Superhero.createNameSpace('com.salvatore');

namespace.applicationRouter = new ApplicationRouter();
namespace.applicationView = new ApplicationView({el: document.getElementById('application')});
