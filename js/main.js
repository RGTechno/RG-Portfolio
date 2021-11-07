// import { MouseMeshInteraction } from './three_mmi.js'
//import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js'

new TypeIt('#about', {
  loop: true,
  loopDelay: 500,
  waitUntilVisible: true,
})
  .type('<br>A Comedy Lover !')
  .pause(200)
  .delete(14, { delay: 200 })
  .type('Web Developer')
  .pause(200)
  .delete(13, { delay: 200 })
  .type('Flutter Developer')
  .pause(200)
  .go()

// THREE JS
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x1d1d1d)
const camera = new THREE.PerspectiveCamera(
  75,
  window.outerWidth / window.outerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#app'),
})

camera.position.z = 1
camera.rotation.x = Math.PI / 2

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const cometsGeometry = new THREE.Geometry()

for (let i = 0; i < 8000; i++) {
  const comet = new THREE.Vector3(
    Math.random() * 600 - 300,
    Math.random() * 600 - 300,
    Math.random() * 600 - 300
  )
  comet.velocity = 1
  comet.acceleration = 0.03
  cometsGeometry.vertices.push(comet)
}

var star = new THREE.TextureLoader().load('./images/circle.png')
var starMat = new THREE.PointsMaterial({
  color: 0xaaaaaaa,
  size: 0.7,
  map: star,
})

const comets = new THREE.Points(cometsGeometry, starMat)
scene.add(comets)

const wheelGeometry = new THREE.TorusGeometry(4, 1, 50, 50)
const wheelMaterial = new THREE.MeshBasicMaterial({
  color: 0x918e85,
  wireframe: true,
})
const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)

wheel.rotation.x = Math.PI / 2
wheel.position.set(0, 10, -8)
scene.add(wheel)

//orbit controls
// var controls = new OrbitControls(camera, renderer.domElement)
// controls.minDistance = 150
// controls.maxDistance = 300

var val = 0.005

function animate() {
  requestAnimationFrame(animate)

  cometsGeometry.vertices.forEach((c) => {
    c.velocity += c.acceleration

    c.y -= c.velocity
    if (c.y < -200) {
      c.y = 200
      c.velocity = 0
    }
  })
  cometsGeometry.verticesNeedUpdate = true
  comets.rotation.y += 0.002
  // camera.rotation.y+=0.0003

  if (val < 0) {
    wheel.rotation.z += 2*val
  }
  else wheel.rotation.z += val
  setInterval(() => {
    val = -val
  }, 5000)

  // controls.update() //updates camera pers

  renderer.render(scene, camera)
}

animate()
