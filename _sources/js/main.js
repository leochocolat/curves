require('@shcc/gsap-core');
require('@shcc/environment');

const Superhero = require('@shcc/superhero-js');
const ApplicationRouter = require('routers/ApplicationRouter');
const ApplicationView = require('views/ApplicationView');

const namespace = Superhero.createNameSpace('com.projectname');

namespace.applicationRouter = new ApplicationRouter();
namespace.applicationView = new ApplicationView({el: document.getElementById('application')});
