import app from './app';
import {$on} from './app/helpers';

$on(window, 'load', app.start);
