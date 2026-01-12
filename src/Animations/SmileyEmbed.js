import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const smileyEmbedAnimation = () => {
  const container = document.querySelector('.smiley-embed')
  if (!container) return

  // Get wrapper dimensions
  const wrapper = container.parentElement
  const width = wrapper.clientWidth || container.clientWidth || 800
  const height = wrapper.clientHeight || container.clientHeight || 600

  // Create scene
  const scene = new THREE.Scene()

  // Create camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  // Load GLTF model
  const loader = new GLTFLoader()
  let model = null

  loader.load(
    '/smiley.gltf',
    (gltf) => {
      model = gltf.scene
      scene.add(model)

      // Center and scale model if needed
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 3 / maxDim
      model.scale.multiplyScalar(scale)
      model.position.sub(center.multiplyScalar(scale))
    },
    undefined,
    (error) => {
      console.error('Error loading GLTF model:', error)
    }
  )

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate)
    if (model) {
      model.rotation.y += 0.01
    }
    renderer.render(scene, camera)
  }

  // Handle resize
  const handleResize = () => {
    const newWidth = wrapper.clientWidth || container.clientWidth || 800
    const newHeight = wrapper.clientHeight || container.clientHeight || 600
    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
    renderer.setSize(newWidth, newHeight)
  }

  window.addEventListener('resize', handleResize)

  // Start animation
  animate()

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize)
    if (model) {
      scene.remove(model)
      model.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose())
          } else {
            child.material?.dispose()
          }
        }
      })
    }
    renderer.dispose()
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement)
    }
  }
}
