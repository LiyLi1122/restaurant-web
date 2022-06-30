const FormData = require('form-data')

function make_API_config(imageBuffer) {
  //image API rules
  const data = new FormData();
  data.append('image', imageBuffer);

  const config = {
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    headers: {
      'Authorization': `Client-ID ${process.env.ClientID}`,
      ...data.getHeaders()
    },
    data: data
  };

  return config
}

module.exports = make_API_config