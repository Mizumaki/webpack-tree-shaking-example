import { soloA } from './solo.js';
import * as all from './all';
import * as all2 from './all2';
import { default as obj } from './object';
import obj2 from './object2';
import obj3 from './object3';

soloA();

all.allA();

all2.allA();

obj.objectA();

obj2.object2A();

console.log(obj3.foo());