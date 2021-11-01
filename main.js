import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.outerWidth / window.outerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#app'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

// camera.position.x = 30
camera.position.y = 45
camera.position.z = 135

const geometry = new THREE.BoxGeometry(10, 10, 20, 30, 20)
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
})

// const cube = new THREE.Mesh(geometry, material)
// cube.position.set(15,0,15)
// scene.add(cube)
const rahul_image = new THREE.TextureLoader().load('./images/rahul.jpg')
const twinklebg = new THREE.TextureLoader().load('./images/twinklebg.jpg')
const github = new THREE.TextureLoader().load('./images/github.png')
const linkedin = new THREE.TextureLoader().load('./images/linkedin.png')
const twitter = new THREE.TextureLoader().load('./images/twitter.png')
const instagram = new THREE.TextureLoader().load('./images/instagram.png')
const email = new THREE.TextureLoader().load('./images/email.jpg')
const medium = new THREE.TextureLoader().load('./images/medium.png')

const rahulMesh = new THREE.Mesh(
  new THREE.BoxGeometry(40, 40, 40),
  new THREE.MeshBasicMaterial({ map: rahul_image })
)
const githubMesh = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: github, color: 0xffffff })
)
const linkedinMesh = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: linkedin, color: 0xffffff })
)
const mediumMesh = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: medium, color: 0xffffff })
)
const emailMesh = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: email, color: 0xffffff })
)
const twitterMesh = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: twitter, color: 0xffffff })
)
const instagramMesh = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: instagram, color: 0xffffff })
)

rahulMesh.position.set(0, 20, -100)
emailMesh.position.set(-40, -5, 20)
githubMesh.position.set(-20, -5, 20)
linkedinMesh.position.set(0, -5, 20)
mediumMesh.position.set(20, -5, 20)
twitterMesh.position.set(40, -5, 20)
instagramMesh.position.set(60, -5, 20)

scene.background = twinklebg

scene.add(
  rahulMesh,
  githubMesh,
  mediumMesh,
  emailMesh,
  twitterMesh,
  //   instagramMesh,
  linkedinMesh
)

// point light
var pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0, 0, 0)
scene.add(pointLight)

//point light helper
// var pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

//ambient light
var ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

//grid helper
// var gridHelper = new THREE.GridHelper(200, 50)
// scene.add(gridHelper)

//orbit controls
var controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  let geometry = new THREE.SphereGeometry(0.05, 24, 24)
  let material = new THREE.MeshStandardMaterial({ color: 0xffffff })

  let star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(500).fill().forEach(addStar)

function animate() {
  requestAnimationFrame(animate)

  rahulMesh.rotation.x += 0.002
  rahulMesh.rotation.y -= 0.01
  rahulMesh.rotation.z += 0.003

  controls.update() //updates camera pers

  renderer.render(scene, camera)
}

animate()
