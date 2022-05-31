if (process.env.NODE_ENV === 'production') {
  console.log('using prod');
  require('./dist')
} else {
  console.log('using dev.js');
  require('nodemon')({
    script: 'dev.js'
  })
}
