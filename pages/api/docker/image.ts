import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
var Docker = require('dockerode');
var docker = new Docker({host: '60.251.156.215'}); //defaults to http
var docker5 = new Docker({
  host: '60.251.156.215',
  port: process.env.DOCKER_PORT || 2375,
  // ca: fs.readFileSync('ca.pem'),
  // cert: fs.readFileSync('cert.pem'),
  // key: fs.readFileSync('key.pem'),
  version: 'v1.39' // required when Docker >= v1.13, https://docs.docker.com/engine/api/version-history/
});

var auth = {
  username: 'username',
  password: 'password',
  auth: '',
  email: 'your@email.email',
  serveraddress: 'https://index.docker.io/v1'
};


// docker.listImages('tag', {'authconfig': auth}, function (err, stream) {
//   console.log()
//   //...
// });

export default async function handler(req: NextApiRequest, res: NextApiResponse<any> ){
  // const fn = docker.listImages();
  const fn = docker5.listImages();
  res.status(200).json(fn);

  axios('http://60.251.156.215/v1.39/images/json')
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err);
  })
  .finally(()=>{
  });

  // console.log(docker.listImages());
  // docker.listContainers(function (err, containers) {
  //   console.log(err)
  //   console.log(containers)
  //   res.status(200).json({'containers': containers});
  // // containers.forEach(function (containerInfo) {
  //   //   docker.getContainer(containerInfo.Id).stop(cb);
  //   // });
  // });
}