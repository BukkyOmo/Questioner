import cmd from 'node-cmd';

before('SETUP MIGRATIONS BEFORE TESTING', (done) => { 
    console.log('RUNNING MIGRATIONS [' + process.env.NODE_ENV + '] + UP');
    cmd.get('npm run migrate:up', (err, data) => {
        if (err) {
            console.log('An error occured', err);
            process.exit(1);
        } else {          
            console.log(data);
            console.log('MIGRATION COMPLETE')
            done();
        }
    });
});
