import '@shcc/environment';

import Superhero from '@shcc/superhero-js';
import ApplicationRouter from 'routers/ApplicationRouter';
import ApplicationView  from 'views/ApplicationView';

import { CSSPlugin }  from 'gsap/all';
// NOTE: Without this line, CSSPlugin may get dropped by your bundler...
const plugins = [CSSPlugin];

const namespace = Superhero.createNameSpace('com.projectname');
namespace.applicationRouter = new ApplicationRouter();
namespace.applicationView = new ApplicationView({ el: document.getElementById('application') });
