import { soloA } from './solo.js';
import * as all from './all';
import * as all2 from './all2';
import { all3 } from './all3';
import { all4 } from './all4';
import obj from './object';
import { default as obj2 } from './object2';
import obj3 from './object3';

soloA();

all.allA();

all2.all2A();
all2.soloA();

all3.all3A();

all4.all4A();

obj.objectA();

obj2.object2A();

console.log(obj3.foo());