/**
* load data from server
* @param callback function to be called when done
* @param args args to be sent to the callback function
*/

var cbArgs;

function load_data(callback, args)
{
  if(args != null){
    cbArgs = args;
  }
  var baseUrl = 'http://localhost:8888/shp80_2/cockpit/api';
  var complementUrl = '/collections/get/plant';

  var finalUrl = baseUrl + complementUrl + '?token=0d1b3633d28a0d9a589c094f508ddd';
  var params = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filter: {},
      /*sort: {_created:-1},*/
      populate: 1, // resolve linked collection items
    })
  };

  fetch(finalUrl, params)
  .then(res => res.json())
  .then(res => callback(res, args));
}

function test(data){
  console.log(data);
}

load_data(test);

/**
*   save new item
*   @param  data        data describing the item
*   @param  callback    function to be call when done
*   @param  args        args to be sent to the callback function
*/
function save_data(data, callback, args)
{
  if(args != null){
    cbArgs = args;
  }

  var baseUrl = 'http://localhost:8888/shp80_2/cockpit/api';
  var complementUrl = '/collections/save/plant';

  var finalUrl = baseUrl + complementUrl + '?token=0d1b3633d28a0d9a589c094f508ddd';
  var params = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: data
    })
  };
  fetch(finalUrl, params)
  .then(res => res.json())
  .then(res => callback(res, args));
}

/**
*   remove item
*   @param  data        data describing the item
*   @param  callback    function to be call when done
*   @param  args        args to be sent to the callback function
*/
function remove_data(data, callback, args)
{
  if(args != null){
    cbArgs = args;
  }

  var baseUrl = 'http://localhost:8888/shp80_2/cockpit/api';
  var complementUrl = '/collections/remove/plant';

  var finalUrl = baseUrl + complementUrl + '?token=0d1b3633d28a0d9a589c094f508ddd';
  var params = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filter: {_id:data._id}
    })
  };

  fetch(finalUrl, params)
  .then(res => res.json())
  .then(res => callback(res, args));
}

// save_data({
//   date: "2020-06-03",
//   png: {path: "favicon-32x32.png"},
//   svg: "<svg>okok</svg>"
// }, test)
