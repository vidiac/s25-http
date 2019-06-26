## Installation
    $ npm install --save s25-http

## Usage
    import http from 's25-http'

    http('/your-url').get().then(response => console.log(response))
    http('/your-url').get({paramKey: paramValue}).then(response => console.log(response))
    http('/your-url').post({paramKey: paramValue}).then(response => console.log(response))



    const formData = new FormData()
    formData.append('message', 'CustomText')

    http('/your-url').post(formData).then(response => console.log(response))

## CustomHeaders
    const headers = {
        'header-name1': 'HeaderValue1',
        'header-name2': 'HeaderValue2',
    }

    http('/your-url', { headers })
        .get()
        .then(response => console.log(response))
