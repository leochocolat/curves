import '@shcc/gsap-core';
import '@shcc/environment';

import Superhero from '@shcc/superhero-js';
import ApplicationRouter from 'routers/ApplicationRouter';
import ApplicationView  from 'views/ApplicationView';

const namespace = Superhero.createNameSpace('com.projectname');

namespace.applicationRouter = new ApplicationRouter();
namespace.applicationView = new ApplicationView({el: document.getElementById('application')});
