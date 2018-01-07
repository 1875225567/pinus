
import { pinus } from 'pinus';
import * as  routeUtil from './app/util/routeUtil';
import { preload } from './preload';

/**
 *  替换全局Promise
 *  自动解析sourcemap
 *  捕获全局错误
 */
preload();

/**
 * Init app for client.
 */
var app = pinus.createApp();
app.set('name', 'chatofpomelo-websocket');

// app configuration
app.configure('production|development', 'connector', function ()
{
	app.set('connectorConfig',
		{
			connector: pinus.connectors.hybridconnector,
			heartbeat: 3,
			useDict: true,
			useProtobuf: true
		});
});

app.configure('production|development', 'gate', function ()
{
	app.set('connectorConfig',
		{
			connector: pinus.connectors.hybridconnector,
			useProtobuf: true
		});
});

// app configure
app.configure('production|development', function ()
{
	// route configures
	app.route('chat', routeUtil.chat);

	// filter configures
	app.filter(new pinus.filters.timeout());
});

// start app
app.start();