import cmd from 'node-cmd';

after('TEAR DOWN MIGRATIONS AFTER TESTING', (done) => {
	console.log(`RUNNING MIGRATIONS [${process.env.NODE_ENV}] DOWN`);
	cmd.get('npm run migrate:down', (err, data) => {
		if (err) {
			console.log('An error occured', err);
			process.exit(1);
		} else {
			console.log(data);
			console.log('MIGRATION DOWN');
			done();
		}
	});
});
